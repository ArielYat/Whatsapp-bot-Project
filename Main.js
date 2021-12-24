//version 2.0

//Files for the different modules
const HDB = require("./ModulesDatabase/HandleDB"), HL = require("./ModulesDatabase/HandleLanguage"),
    HURL = require("./ModulesImmediate/HandleURLs"), HF = require("./ModulesDatabase/HandleFilters"),
    HT = require("./ModulesDatabase/HandleTags"), HB = require("./ModulesDatabase/HandleBirthdays"),
    HSi = require("./ModulesImmediate/HandleStickers"), HSu = require("./ModulesImmediate/HandleSurveys"),
    HAF = require("./ModulesMiscellaneous/HandleAdminFunctions"), HP = require("./ModulesDatabase/HandlePermissions"),
    Group = require("./Group"), Person = require("./Person"),
    Strings = require("./Strings.js").strings; //HW = require("/Website/HandleWebsite")

//Whatsapp API module
const wa = require("@open-wa/wa-automate");
//Schedule module
const IsraelSchedule = require('node-schedule');

//Local storage of data to not require access to the database at all times (cache)
let groupsDict = {}, usersDict = {}, restUsers = [], restGroups = [], restGroupsFilterSpam = [],
    restUsersCommandSpam = [];
//Group & user rest intervals
const groupFilterCounterResetInterval = 15 * 60 * 1000; //When to reset the filters counter (in ms); 15 min
const userCommandCounterResetInterval = 15 * 60 * 1000; //When to reset the command counter (in ms); 20 min
const groupFilterRestResetInterval = 5 * 60 * 1000; //When to reset the groups in rest by filters spamming (in ms); 5 min
const userCommandRestResetInterval = 5 * 60 * 1000; //When to reset the users in rest by command spamming (in ms); 5 min
const groupFilterLimit = 15, userCommandLimit = 10; //Filter & Command Limit
const botDevs = ["972586809911@c.us"]; //The bot developer's IDs "972543293155@c.us"

//Start the bot - get all the groups from mongoDB (cache) and make an instance of every group object in every group
HDB.GetAllGroupsFromDB(groupsDict, usersDict, function () {
    wa.create({headless: false, multiDevice: true}).then(client => start(client));
});

//Reset filters counter for all groups every [groupFilterCounterResetInterval] minutes (automatic)
setInterval(function () {
    for (let group in groupsDict)
        groupsDict[group].filterCounter = 0;
}, groupFilterCounterResetInterval);

//Remove all groups from filters rest list every [groupFilterRestResetInterval] minutes (automatic)
setInterval(function () {
    restGroupsFilterSpam = [];
    for (let group in groupsDict)
        groupsDict[group].filterCounter = 0;
}, groupFilterRestResetInterval);

//Reset command counter for all users every [userCommandCounterResetInterval] minutes (automatic)
setInterval(function () {
    for (let person in usersDict)
        usersDict[person].commandCounter = 0;
}, userCommandCounterResetInterval)

//Remove all users from command rest list every [userCommandRestResetInterval] minutes (automatic)
setInterval(function () {
    restUsersCommandSpam = [];
    for (let person in usersDict)
        usersDict[person].commandCounter = 0;
}, userCommandRestResetInterval)

//Main function
function start(client) {
    //Check if there are birthday everyday at 4 am
    IsraelSchedule.tz = 'Israel'; //Time zone
    IsraelSchedule.scheduleJob('0 4 * * *', async () => {
        await HB.checkBirthdays(client, usersDict, groupsDict);
    });
    //Send a starting help message when added to a group
    client.onAddedToGroup(async chat => {
        await client.sendText(chat.id, Strings["start_message"]["all"]);
    });
    //Check every module every time a message is received
    client.onMessage(async message => {
        if (message != null) {
            const chatID = message.chat.id, authorID = message.author, messageID = message.id;
            let bodyText, quotedMsgID;
            let checkFilters = true;
            //define quotedMsgID depending on if a message was quoted
            if (message.quotedMsg != null)
                quotedMsgID = message.quotedMsg.id;
            else
                quotedMsgID = message.id;
            //define bodyText depending on the message type
            if (message.type === "image")
                bodyText = message.caption; //if the message is a text message
            else
                bodyText = message.text; //if the message is a media message

            //create new group/person object if they don't exist
            if (!(chatID in groupsDict))
                groupsDict[chatID] = new Group(chatID);
            if (!(authorID in usersDict))
                usersDict[authorID] = new Person(authorID);
            if (groupsDict[chatID].groupAdmins.length === 0) {
                groupsDict[chatID].groupAdmins = await client.getGroupAdmins(chatID);
                await HDB.delArgsFromDB(chatID, null, "groupAdmins", function () {
                    HDB.addArgsToDB(chatID, groupsDict[chatID].groupAdmins, null, null, "groupAdmins", function () {
                        console.log("groupAdmins added successfully");
                    });
                });
            }
            const isIDEqualPersonID = (person) => authorID === person.personID;
            if (!(groupsDict[chatID].personsIn.some(isIDEqualPersonID))) {
                groupsDict[chatID].personsIn = ["add", usersDict[authorID]];
                await HDB.delArgsFromDB(chatID, authorID, "personIn", function () {
                    HDB.addArgsToDB(chatID, authorID, null, null, "personIn", function () {
                        console.log("person added successfully");
                    });
                });
            }
            if (!(chatID in usersDict[authorID].permissionLevel)) {
                await HP.checkPermissionOfPerson(groupsDict[chatID], usersDict[authorID], chatID);
            }

            //Handle bot developer functions
            if (botDevs.includes(authorID) || usersDict[authorID].permissionLevel[chatID] === 3) {
                usersDict[authorID].permissionLevel[chatID] = 3;
                await HAF.handleUserRest(client, bodyText, chatID, messageID, quotedMsgID, restUsers);
                await HAF.handleGroupRest(client, bodyText, chatID, messageID, restGroups, restGroupsFilterSpam);
                await HAF.handleBotJoin(client, bodyText, chatID, messageID);
                await HAF.ping(client, bodyText, chatID, messageID)
            }

            //If the user who sent the message isn't blocked, proceed to regular modules
            if (!restUsers.includes(authorID) && !restUsersCommandSpam.includes(authorID)) {
                if (usersDict[authorID].permissionLevel[chatID] >= 2) {
                    if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "set_permissions"))) {
                        groupsDict[chatID].groupAdmins = await client.getGroupAdmins(chatID);
                        await HDB.delArgsFromDB(chatID, null, "groupAdmins", function () {
                            HDB.addArgsToDB(chatID, groupsDict[chatID].groupAdmins, null, null, "groupAdmins", function () {
                                console.log("groupAdmins added successfully");
                                HP.checkPermissionLevels(groupsDict, chatID, function () {
                                    HP.setPermissionLevelOfFunctions(client, bodyText, usersDict[authorID].permissionLevel[chatID], groupsDict[chatID].functionPermissions, groupsDict, chatID, messageID);
                                });
                            });
                        });
                    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "mute_participant"))) {
                        await HP.muteParticipant(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict);
                    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "unmute_participant"))) {
                        await HP.unmuteParticipant(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict);
                    }
                }
                if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "show_group_permissions"))) {
                    await HP.getGroupsPermFunc(client, chatID, messageID, groupsDict);
                }
                if (usersDict[authorID].permissionLevel[chatID] >= groupsDict[chatID].functionPermissions["tags"]) {
                    if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "tag_all"))) { //Handle tags everyone
                        await HT.tagEveryone(client, bodyText, chatID, messageID, quotedMsgID, groupsDict);
                        usersDict[authorID].addToCommandCounter();
                    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "tag"))) { //Handle tags someone
                        await HT.checkTags(client, bodyText, chatID, messageID, quotedMsgID, groupsDict);
                        usersDict[authorID].addToCommandCounter();
                    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "show_tags"))) { //Handle show tags
                        await HT.showTags(client, chatID, messageID, groupsDict);
                        usersDict[authorID].addToCommandCounter();
                    }
                }
                if (usersDict[authorID].permissionLevel[chatID] >= groupsDict[chatID].functionPermissions["handleTags"]) {
                    if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "add_tag"))) { //Handle add tags
                        await HT.addTag(client, bodyText, chatID, messageID, groupsDict);
                        usersDict[authorID].addToCommandCounter();
                    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "remove_tag"))) { //Handle remove tags
                        await HT.remTag(client, bodyText, chatID, messageID, groupsDict);
                        usersDict[authorID].addToCommandCounter();
                    }
                }
                if (usersDict[authorID].permissionLevel[chatID] >= groupsDict[chatID].functionPermissions["handleFilters"]) {
                    if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "add_filter"))) { //Handle add filters
                        await HF.addFilter(client, bodyText, chatID, messageID, groupsDict);
                        checkFilters = false;
                        usersDict[authorID].addToCommandCounter();
                    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "remove_filter"))) { //Handle remove filters
                        await HF.remFilter(client, bodyText, chatID, messageID, groupsDict);
                        checkFilters = false;
                        usersDict[authorID].addToCommandCounter();
                    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "edit_filter"))) { //Handle edit filters
                        await HF.editFilter(client, bodyText, chatID, messageID, groupsDict);
                        checkFilters = false;
                        usersDict[authorID].addToCommandCounter();
                    }
                }

                //If the group the message was sent in isn't blocked, proceed to check filters
                if (!restGroups.includes(chatID) && !restGroupsFilterSpam.includes(chatID)) {
                    if (usersDict[authorID].permissionLevel[chatID] >= groupsDict[chatID].functionPermissions["filters"] && checkFilters) {
                        await HF.checkFilters(client, bodyText, chatID, messageID, groupsDict, groupFilterLimit, restGroupsFilterSpam)
                        if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "show_filters"))) //Handle show filters
                            await HF.showFilters(client, chatID, messageID, groupsDict);
                    }
                }

                if (usersDict[authorID].permissionLevel[chatID] >= groupsDict[chatID].functionPermissions["handleBirthdays"]) {
                    if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "add_birthday"))) { //Handle add birthday
                        await HB.addBirthday(client, bodyText, chatID, authorID, messageID, groupsDict, usersDict)
                        usersDict[authorID].addToCommandCounter();
                    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "remove_birthday"))) { //Handle remove birthday
                        await HB.remBirthday(client, bodyText, authorID, chatID, messageID, groupsDict, usersDict);
                        usersDict[authorID].addToCommandCounter();
                    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "add_birthday_to_group"))) {//Handle add this group birthday
                        await HB.addCurrentGroupToBirthDayBroadcastList(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict);
                        usersDict[authorID].addToCommandCounter();
                    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "remove_birthday_from_group"))) { //Handle remove this group birthday
                        await HB.remCurrentGroupFromBirthDayBroadcastList(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict);
                        usersDict[authorID].addToCommandCounter();
                    }
                }
                if (usersDict[authorID].permissionLevel[chatID] >= groupsDict[chatID].functionPermissions["handleOthers"]) {
                    if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "show_birthdays"))) { //Handle show birthday
                        await HB.showBirthdays(client, chatID, messageID, groupsDict, usersDict)
                        usersDict[authorID].addToCommandCounter();
                    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "create_survey"))) { //Handle surveys
                        await HSu.makeButton(client, bodyText, chatID, messageID, groupsDict);
                            usersDict[authorID].addToCommandCounter();
                    } else if (bodyText.includes(HL.getGroupLang(groupsDict, chatID, "scan_link"))) { //Handle URLs
                        await HURL.stripLinks(client, bodyText, chatID, messageID, groupsDict);
                        usersDict[authorID].addToCommandCounter();
                    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "make_sticker"))) { //Handle stickers
                        if(message.quotedMsgObj != null){
                            await HSi.handleStickers(client, message.quotedMsgObj, chatID, messageID, message.quotedMsgObj.type, groupsDict);
                        }
                        else{
                            await HSi.handleStickers(client, message, chatID, messageID, message.type, groupsDict);
                        }
                        usersDict[authorID].addToCommandCounter();
                    } //else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "show_webpage"))) { //Handle webpage link
                    //     await HW.sendLink(client, chatID, groupsDict);
                    //     usersDict[authorID].addToCommandCounter();
                    // }
                }
                if (bodyText === (HL.getGroupLang(groupsDict, chatID, "help"))) { //Handle show help
                    await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "help_reply"), messageID);
                    usersDict[authorID].addToCommandCounter();
                } else if (bodyText.startsWith(Strings["change_language"]["he"]) ||
                    bodyText.startsWith(Strings["change_language"]["en"]) ||
                    bodyText.startsWith(Strings["change_language"]["la"])) {//Handle language change
                    await HL.changeGroupLang(client, bodyText, chatID, messageID, groupsDict);
                    usersDict[authorID].addToCommandCounter();
                }
                if (usersDict[authorID].commandCounter === userCommandLimit) {
                    await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "command_spam_reply"), messageID);
                    restUsersCommandSpam.push(authorID);
                }
            }
        }
    });
    // //clean unneeded groups from cache
    // client.onRemovedFromGroup().then(chat => {
    //     delete groupsDict[chat]; // !! delete does not change array length (remember for the future)
    //     console.log("Alex was removed from" + chat)
    // });
}

//TODO: something to Alex's about
//TODO: function to check where a user was last tagged
//TODO: options for images/gifs/videos/stickers as filters
//TODO: Dictionary/translations
//TODO: check cryptocurrencies
//TODO: a function to reset a group's DB/part of it
