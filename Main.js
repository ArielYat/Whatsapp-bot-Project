//version 2.2

//Command Modules
const HURL = require("./ModulesImmediate/HandleURLs"), HDB = require("./ModulesDatabase/HandleDB"),
    HF = require("./ModulesDatabase/HandleFilters"), HT = require("./ModulesDatabase/HandleTags"),
    HB = require("./ModulesDatabase/HandleBirthdays"), HSt = require("./ModulesImmediate/HandleStickers"),
    HAF = require("./ModulesDatabase/HandleAdminFunctions"), HL = require("./ModulesDatabase/HandleLanguage"),
    HSu = require("./ModulesImmediate/HandleSurveys"), HP = require("./ModulesDatabase/HandlePermissions"),
    HC = require("./ModulesImmediate/HandleCrypto"), HD = require("./ModulesImmediate/HandleDictionary"),
    HW = require("./ModuleWebsite/HandleWebsite"),
    Group = require("./Classes/Group"), Person = require("./Classes/Person"), Strings = require("./Strings.js").strings;
//Open-Whatsapp and Schedule libraries
const wa = require("@open-wa/wa-automate"), IsraelSchedule = require('node-schedule');
//Local storage of data to not require access to the database at all times ("cache")
let groupsDict = {}, usersDict = {}, restUsers = [], restGroups = [], restGroupsFilterSpam = [],
    restUsersCommandSpam = [];
//Group & user rest intervals
const groupFilterCounterResetInterval = 5 * 60 * 1000, //When to reset the filters counter (in ms); 5 min
    userCommandCounterResetInterval = 5 * 60 * 1000, //When to reset the command counter (in ms); 5 min
    groupFilterRestResetInterval = 15 * 60 * 1000, //When to reset the groups in rest by filters spamming (in ms); 15 min
    userCommandRestResetInterval = 15 * 60 * 1000, //When to reset the users in rest by command spamming (in ms); 15 min
    groupFilterLimit = 15, userCommandLimit = 10; //Filter & Command Limit
//The bot developer's whatsapp IDs
const botDevs = ["972586809911@c.us", "972543293155@c.us"];

//Start the bot - get all the groups from mongoDB (cache) and make an instance of every group object in every group
HDB.GetAllGroupsFromDB(groupsDict, usersDict, restUsers, restGroups, function () {
    wa.create({headless: false, multiDevice: false, useChrome: true}).then(client => start(client));
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

async function HandlePermissions(client, bodyText, chatID, authorID, messageID) {
    if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "set_permissions"))) { //Handle setting function permissions
        groupsDict[chatID].groupAdmins = await client.getGroupAdmins();
        await HP.checkGroupUsersPermissionLevels(groupsDict, chatID);
        await HP.setFunctionPermissionLevel(client, bodyText, chatID, messageID, usersDict[authorID].permissionLevel[chatID], groupsDict[chatID].functionPermissions, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "mute_participant"))) { //Handle muting persons
        await HP.muteParticipant(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "unmute_participant"))) { //Handle unmuting persons
        await HP.unmuteParticipant(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
    }
}

async function Tags(client, bodyText, chatID, authorID, messageID, quotedMsgID) {
    if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "tag_all"))) { //Handle tagging everyone
        await HT.tagEveryone(client, bodyText, chatID, messageID, quotedMsgID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "tag"))) { //Handle tagging someone
        await HT.checkTags(client, bodyText, chatID, messageID, authorID, quotedMsgID, groupsDict, usersDict, usersDict);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "check_tags"))) { //Handle checking tagged messages
        await HT.whichMessagesTaggedIn(client, chatID, messageID, authorID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
    }
}

async function HandleImmediate(client, message, bodyText, chatID, authorID, messageID) {
    if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "make_sticker"))) { //Handle stickers
        if (message.quotedMsgObj)
            await HSt.handleStickers(client, message.quotedMsgObj, chatID, messageID, message.quotedMsgObj.type, groupsDict);
        else
            await HSt.handleStickers(client, message, chatID, messageID, message.type, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "scan_link"))) { //Handle scanning URLs
        await HURL.stripLinks(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "check_crypto"))) { //Handle showing crypto
        await HC.fetchCryptocurrency(client, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "search_word_in_urban"))) { //Handle searching words in https://www.urbandictionary.com
        await HD.searchUrbanDictionary(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "show_webpage"))) { //Handle sending webpage link
        await HW.sendLink(client, chatID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "create_survey"))) { //Handle creating surveys
        await HSu.makeButton(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    }
}

async function HandleShows(client, bodyText, chatID, authorID, messageID) {
    if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "show_filters"))) {//Handle showing filters
        await HF.showFilters(client, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "show_tags"))) { //Handle showing tags
        await HT.showTags(client, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "show_birthdays"))) { //Handle showing birthdays
        await HB.showBirthdays(client, chatID, messageID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "show_group_function_permissions"))) { //Handle showing people permissions
        await HP.showGroupFunctionsPermissions(client, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "show_group_user_permissions"))) { //Handle showing function permissions
        await HP.showGroupUsersPermissions(client, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    }
}

async function HandleFilters(client, message, bodyText, chatID, authorID, messageID) {
    if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "add_filter"))) { //Handle adding filters
        await HF.addFilter(client, message, bodyText, chatID, messageID, message.type, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "remove_filter"))) { //Handle removing filters
        await HF.remFilter(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "edit_filter"))) { //Handle editing filters
        await HF.editFilter(client, message, bodyText, chatID, messageID, message.type, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else return true;
}

async function HandleTags(client, bodyText, chatID, authorID, messageID) {
    if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "add_tag"))) { //Handle adding tags
        await HT.addTag(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "remove_tag"))) { //Handle removing tags
        await HT.remTag(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    }
}

async function HandleBirthdays(client, bodyText, chatID, authorID, messageID) {
    if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "add_birthday"))) { //Handle adding birthday
        await HB.addBirthday(client, bodyText, chatID, authorID, messageID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "remove_birthday"))) { //Handle removing birthday
        await HB.remBirthday(client, bodyText, authorID, chatID, messageID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "add_birthday_to_group"))) { //Handle add this group birthday
        await HB.addCurrentGroupToBirthDayBroadcastList(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "remove_birthday_from_group"))) { //Handle remove this group birthday
        await HB.remCurrentGroupFromBirthDayBroadcastList(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
    }
}

async function HandleHelp(client, bodyText, chatID, authorID, messageID) {
    if (bodyText === (HL.getGroupLang(groupsDict, chatID, "help"))) { //Handle show help
        await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "help_reply"), messageID);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(Strings["change_language"]["he"]) ||
        bodyText.match(Strings["change_language"]["en"]) ||
        bodyText.match(Strings["change_language"]["la"])) { //Handle language change
        await HL.changeGroupLang(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    }
}

//Main function
function start(client) {
    //Check if there are birthdays everyday at 4 am
    IsraelSchedule.tz = 'Israel'; //Time zone
    IsraelSchedule.scheduleJob('0 4 * * *', async () => {
        await HB.checkBirthdays(client, usersDict, groupsDict);
    });
    //Reset the crypto check everyday at 00:00
    IsraelSchedule.scheduleJob('0 0 * * *', async () => {
        for (const group in groupsDict)
            groupsDict[group].cryptoCheckedToday = false;
    })
    //Send a starting help message when added to a group
    client.onAddedToGroup(async chat => {
        await client.sendText(chat.id, Strings["start_message"]["all"]);
    });
    //Check every module every time a message is received
    client.onMessage(async message => {
        if (message != null) {
            const chatID = message.chat.id, authorID = message.sender.id, messageID = message.id;
            let bodyText, quotedMsgID, checkFilters = true;
            //Define quotedMsgID depending on if a message was quoted
            quotedMsgID = message.quotedMsg ? message.quotedMsg.id : message.id;
            //Define bodeText depending on if the message a text message or a media message
            bodyText = message.type === "image" || message.type === "video" ? message.caption : message.text;

            //Create new group/person if they don't exist in the DB
            if (!(chatID in groupsDict))
                groupsDict[chatID] = new Group(chatID);
            if (!(authorID in usersDict))
                usersDict[authorID] = new Person(authorID);
            //Add author to group's DB if not already in it
            if (!(groupsDict[chatID].personsIn.some(person => authorID === person.personID))) {
                await HDB.addArgsToDB(chatID, authorID, null, null, "personIn", function () {
                    groupsDict[chatID].personsIn = ["add", usersDict[authorID]];
                });
            }
            //If the author lacks a permission level give them one
            if (!(chatID in usersDict[authorID].permissionLevel))
                await HP.autoAssignPersonPermissions(groupsDict[chatID], usersDict[authorID], chatID);
            //Update group admins if they aren't updated
            if (groupsDict[chatID].groupAdmins.length === 0) {
                groupsDict[chatID].groupAdmins = client.getGroupAdmins();
                await HDB.delArgsFromDB(chatID, null, "groupAdmins", function () {
                    HDB.addArgsToDB(chatID, groupsDict[chatID].groupAdmins, null, null, "groupAdmins", function () {
                        HP.checkGroupUsersPermissionLevels(groupsDict, chatID);
                    });
                });
            }
            //Handle bot developer functions if the author is a dev
            if (botDevs.includes(authorID) || usersDict[authorID].permissionLevel[chatID] === 3) {
                usersDict[authorID].permissionLevel[chatID] = 3;
                await HAF.handleUserRest(client, bodyText, chatID, messageID, message.quotedMsgObj, restUsers, restUsersCommandSpam, usersDict[authorID]);
                await HAF.handleGroupRest(client, bodyText, chatID, messageID, restGroups, restGroupsFilterSpam, groupsDict[chatID]);
                await HAF.handleBotJoin(client, bodyText, chatID, messageID);
                await HAF.ping(client, bodyText, chatID, messageID)
            }
            //Log messages with tags for later use in HT.whichMessagesTaggedIn()
            await HT.logMessagesWithTags(bodyText, chatID, messageID, usersDict);
            //If the user who sent the message isn't blocked, check for commands
            if (!restUsers.includes(authorID) && !restUsersCommandSpam.includes(authorID)) {
                //If the user used too many commands, put them on a cool down
                if (usersDict[authorID].commandCounter === userCommandLimit) {
                    await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "command_spam_reply"), messageID);
                    restUsersCommandSpam.push(authorID);
                } else { //If not, check all the main subfunctions for commands
                    await HandleHelp(client, bodyText, chatID, authorID, messageID);
                    if (usersDict[authorID].permissionLevel[chatID] >= groupsDict[chatID].functionPermissions["tags"])
                        await Tags(client, bodyText, chatID, authorID, messageID, quotedMsgID);
                    if (usersDict[authorID].permissionLevel[chatID] >= groupsDict[chatID].functionPermissions["handleImmediate"])
                        await HandleImmediate(client, message, bodyText, chatID, authorID, messageID);
                    if (usersDict[authorID].permissionLevel[chatID] >= groupsDict[chatID].functionPermissions["handleShows"])
                        await HandleShows(client, bodyText, chatID, authorID, messageID);
                    if (usersDict[authorID].permissionLevel[chatID] >= groupsDict[chatID].functionPermissions["handleFilters"])
                        checkFilters = await HandleFilters(client, message, bodyText, chatID, authorID, messageID);
                    if (usersDict[authorID].permissionLevel[chatID] >= groupsDict[chatID].functionPermissions["handleTags"])
                        await HandleTags(client, bodyText, chatID, authorID, messageID);
                    if (usersDict[authorID].permissionLevel[chatID] >= groupsDict[chatID].functionPermissions["handleBirthdays"])
                        await HandleBirthdays(client, bodyText, chatID, authorID, messageID);
                    if (usersDict[authorID].permissionLevel[chatID] >= 2)
                        await HandlePermissions(client, bodyText, chatID, authorID, messageID);
                }
            }
            //If the group the message was sent in isn't blocked and no filter altering commands were used, check for filters
            if (checkFilters && !restGroups.includes(chatID) && !restGroupsFilterSpam.includes(chatID)
                && usersDict[authorID].permissionLevel[chatID] >= groupsDict[chatID].functionPermissions["filters"])
                await HF.checkFilters(client, bodyText, chatID, messageID, groupsDict, groupFilterLimit, restGroupsFilterSpam);

        }
    });
    // //clean unneeded groups from cache
    // client.onRemovedFromGroup().then(chat => {
    //     delete groupsDict[chat]; // !! delete does not change array length (remember for the future)
    //     console.log("Alex was removed from" + chat)
    // });
}

//TODO: Dictionary/translations
//TODO: a reminder function
