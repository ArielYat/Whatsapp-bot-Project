//version 2.5

//Command Modules
const HURL = require("./ModulesImmediate/HandleURLs"), HDB = require("./ModulesDatabase/HandleDB"),
    HF = require("./ModulesDatabase/HandleFilters"), HT = require("./ModulesDatabase/HandleTags"),
    HB = require("./ModulesDatabase/HandleBirthdays"), HSt = require("./ModulesImmediate/HandleStickers"),
    HAF = require("./ModulesDatabase/HandleAdminFunctions"), HL = require("./ModulesDatabase/HandleLanguage"),
    HSu = require("./ModulesImmediate/HandleSurveys"), HP = require("./ModulesDatabase/HandlePermissions"),
    HAPI = require("./ModulesImmediate/HandleAPIs"), HW = require("./ModuleWebsite/HandleWebsite"),
    HUS = require("./ModulesImmediate/HandleUserStats"), HR = require("./ModulesDatabase/HandleReminders"),
    Group = require("./Classes/Group"), Person = require("./Classes/Person"), Strings = require("./Strings.js").strings;
//Open-Whatsapp and Schedule libraries
const wa = require("@open-wa/wa-automate"), IsraelSchedule = require('node-schedule');
//Local storage of data to not require access to the database at all times ("cache")
let groupsDict = {}, usersDict = {}, restGroups = [], restPersons = [], restGroupsFilterSpam = [],
    restPersonsCommandSpam = [], personsWithReminders = [];
const botDevs = ["972543293155@c.us", "972586809911@c.us"];
IsraelSchedule.tz = 'Israel'; //Bot devs' time zone

//Start the bot - get all the groups from mongoDB (cache) and make an instance of every group object in every group
HDB.GetAllGroupsFromDB(groupsDict, usersDict, restPersons, restGroups, personsWithReminders, function () {
    wa.create({headless: false, multiDevice: false, useChrome: true}).then(client => start(client));
});

async function HandlePermissions(client, bodyText, chatID, authorID, messageID) {
    if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "set_permissions"))) { //Handle setting function permissions
        groupsDict[chatID].groupAdmins = await client.getGroupAdmins(chatID);
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
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "clear_tags"))) { //Handle clearing tagged messages
        await HT.clearTaggedMessaged(client, chatID, messageID, authorID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
    }
}

async function HandleImmediate(client, message, bodyText, chatID, authorID, messageID) {
    if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "make_sticker"))) { //Handle stickers
        await HSt.handleStickers(client, message, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "scan_link"))) { //Handle scanning URLs
        await HURL.stripLinks(client, message, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "check_crypto"))) { //Handle showing crypto
        await HAPI.fetchCryptocurrency(client, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "search_in_urban"))) { //Handle searching words in Urban Dictionary
        await HAPI.searchUrbanDictionary(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "translate_to"))) { //Handle translating words on Google Translate
        await HAPI.translate(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "show_webpage"))) { //Handle sending webpage link
        await HW.sendLink(client, chatID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "create_survey"))) { //Handle creating surveys
        await HSu.makeButton(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "show_profile"))) { //Show author's stats
        await HUS.ShowStats(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict);
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
        await HF.addFilter(client, message, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "remove_filter"))) { //Handle removing filters
        await HF.remFilter(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "edit_filter"))) { //Handle editing filters
        await HF.editFilter(client, message, bodyText, chatID, messageID, groupsDict);
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

async function HandleReminders(client, bodyText, chatID, messageID, authorID, message) {
    if (chatID === authorID) {
        if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "add_reminder"))) {
            await HR.addReminder(client, bodyText, chatID, messageID, usersDict[authorID], groupsDict, message, personsWithReminders);
            usersDict[authorID].commandCounter++;
        } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "remove_reminder"))) {
            await HR.removeReminder(client, bodyText, chatID, messageID, usersDict[authorID], groupsDict, personsWithReminders);
            usersDict[authorID].commandCounter++;
        } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "show_reminders"))) {
            await HR.showReminders(client, usersDict[authorID], groupsDict, messageID, chatID);
            usersDict[authorID].commandCounter++;
        }
    }
}

async function HandleHelp(client, bodyText, chatID, authorID, messageID) {
    if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "help"))) { //Handle show help
        await client.sendReplyWithMentions(chatID, HL.getGroupLang(groupsDict, chatID, "help_reply"), messageID);
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
    //Check if there are birthdays everyday at 5 am
    IsraelSchedule.scheduleJob('0 5 * * *', async () => {
        await HB.checkBirthdays(client, usersDict, groupsDict);
    });
    //Reset the crypto check everyday at 00:00
    IsraelSchedule.scheduleJob('0 0 * * *', async () => {
        for (const group in groupsDict) {
            groupsDict[group].cryptoCheckedToday = false;
            groupsDict[group].translationCounter = 0;
        }
    });
    //Reset filters counter for all groups
    setInterval(function () {
        for (let group in groupsDict)
            groupsDict[group].filterCounter = 0;
    }, 5 * 60 * 1000); //in ms; 5 min
    //Reset command counter for all persons
    setInterval(function () {
        for (let person in usersDict)
            usersDict[person].commandCounter = 0;
    }, 5 * 60 * 1000); //in ms; 5 min
    //Check if groups/persons need to be freed from prison (if 15 minutes passed) and check reminders
    setInterval(async function () {
        //Remove users from command rest list
        for (let i = 0; i < restPersonsCommandSpam.length; i++) {
            const personID = restPersonsCommandSpam[i];
            const date = new Date(); //Current date
            date.setSeconds(0);
            date.setMilliseconds(0);
            if (usersDict[personID].autoBanned.toString() === date.toString()) {
                usersDict[personID].autoBanned = null;
                usersDict[personID].commandCounter = 0;
                restPersonsCommandSpam.splice(restPersonsCommandSpam.indexOf(personID), 1);
            }
        }
        //Remove groups from filters rest list
        for (let i = 0; i < restGroupsFilterSpam.length; i++) {
            const chatID = restGroupsFilterSpam[i];
            const date = new Date(); //Current date
            date.setSeconds(0);
            date.setMilliseconds(0);
            if (groupsDict[chatID].autoBanned.toString() === date.toString()) {
                groupsDict[chatID].autoBanned = null;
                groupsDict[chatID].filterCounter = 0;
                restGroupsFilterSpam.splice(restGroupsFilterSpam.indexOf(chatID), 1);
            }
        }
        //Check reminders
        for (let i = 0; i < personsWithReminders.length; i++) {
            const person = usersDict[personsWithReminders[i]];
            const personID = person.personID;
            const date = new Date(); //Current date
            date.setSeconds(0);
            date.setMilliseconds(0);
            for (const reminder in person.reminders) {
                if (reminder.toString() === date.toString()) {
                    const oldReminder = person.reminders[reminder];
                    const reminderDate = new Date(reminder);
                    const repeat = !!oldReminder.startsWith("repeatReminder");
                    let stringForSending = repeat ? oldReminder.replace("repeatReminder", "") : oldReminder;
                    switch (true) {
                        case stringForSending.startsWith("Video"):
                            await client.sendFile(personID, stringForSending.replace("Video", ""), "reminder");
                            break;
                        case stringForSending.startsWith("Image"):
                            await client.sendImage(personID, stringForSending.replace("Image", ""), "reminder");
                            break;
                        default:
                            await client.sendText(personID, stringForSending);
                            break;
                    }
                    await HDB.delArgsFromDB(personID, reminderDate, "reminders", function () {
                        person.reminders = ["delete", reminderDate];
                    });
                    if (repeat) {
                        reminderDate.setDate(reminderDate.getDate() + 1);
                        await HDB.addArgsToDB(personID, reminderDate, oldReminder, null, "reminders", function () {
                            person.reminders = ["add", reminderDate, oldReminder];
                        });
                    }
                }
            }
        }
    }, 60 * 1000); //in ms; 1 min
    //Send a starting help message when added to a group
    client.onAddedToGroup(async chat => {
        const stringForSending = `${Strings["start_message"]["he"]}\n\n\n${Strings["start_message"]["en"]}\n\n\n${Strings["start_message"]["la"]}\n\n\n${Strings["start_message"]["ar"]}`
        await client.sendText(chat.id, stringForSending);
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
            bodyText = bodyText === undefined ? message.text : bodyText;
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
            //Update group admins if they don't exist
            if (groupsDict[chatID].groupAdmins.length === 0) {
                groupsDict[chatID].groupAdmins = await client.getGroupAdmins(chatID);
                await HDB.delArgsFromDB(chatID, null, "groupAdmins", function () {
                    HDB.addArgsToDB(chatID, groupsDict[chatID].groupAdmins, null, null, "groupAdmins", function () {
                        HP.checkGroupUsersPermissionLevels(groupsDict, chatID);
                    });
                });
            }
            //Handle bot developer functions if the author is a dev
            if (botDevs.includes(authorID) || usersDict[authorID].permissionLevel[chatID] === 3) {
                usersDict[authorID].permissionLevel[chatID] = 3;
                if (bodyText.startsWith("חסום גישה למשתמש") || bodyText.startsWith("אפשר גישה למשתמש"))
                    await HAF.handleUserRest(client, bodyText, chatID, messageID, message.quotedMsgObj, restPersons, restPersonsCommandSpam, usersDict[authorID]);
                else if (bodyText.startsWith("חסום קבוצה") || bodyText.startsWith("שחרר קבוצה"))
                    await HAF.handleGroupRest(client, bodyText, chatID, messageID, restGroups, restGroupsFilterSpam, groupsDict[chatID]);
                else if (bodyText.match(/^הצטרף לקבוצה/))
                    await HAF.handleBotJoin(client, bodyText, chatID, messageID);
                else if (bodyText.match(/^!ping$/i))
                    await HAF.ping(client, bodyText, chatID, messageID, groupsDict, usersDict, restGroups, restPersons, restGroupsFilterSpam, restPersonsCommandSpam);
                else if (bodyText.match(/^\/exec/i))
                    await HAF.execute(client, bodyText, message, chatID, messageID, groupsDict, usersDict, restGroups, restPersons, restGroupsFilterSpam, restPersonsCommandSpam, botDevs);
            }
            //Log messages with tags for later use in HT.whichMessagesTaggedIn()
            await HT.logMessagesWithTags(bodyText, chatID, messageID, usersDict);
            //If the group the message was sent in isn't blocked, check for commands
            if (!restGroups.includes(chatID)) {
                //If the user who sent the message isn't blocked, check for commands
                if (!restPersons.includes(authorID) && !restPersonsCommandSpam.includes(authorID)) {
                    //Check if you user handled a reminder in a DM
                    await HandleReminders(client, bodyText, chatID, messageID, authorID, message);
                    //Check all functions for commands if the user has a high enough permission level
                    await HandleHelp(client, bodyText, chatID, authorID, messageID);
                    if (usersDict[authorID].permissionLevel[chatID] >= groupsDict[chatID].functionPermissions["tags"])
                        await Tags(client, bodyText, chatID, authorID, messageID, quotedMsgID);
                    if (usersDict[authorID].permissionLevel[chatID] >= groupsDict[chatID].functionPermissions["handleOther"])
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
                    //If the user used too many commands, put them on a cool down
                    if (usersDict[authorID].commandCounter === 15) {
                        let bannedDate = new Date();
                        bannedDate.setMinutes(bannedDate.getMinutes() + 15);
                        bannedDate.setSeconds(0);
                        bannedDate.setMilliseconds(0);
                        usersDict[authorID].autoBanned = bannedDate;
                        restPersonsCommandSpam.push(authorID);
                        await client.reply(chatID, HL.getGroupLang(groupsDict, chatID,
                            "command_spam_reply",
                            bannedDate.getHours().toString(), bannedDate.getMinutes().toString() > 10 ?
                                bannedDate.getMinutes().toString() : "0" + bannedDate.getMinutes().toString()), messageID);
                    }
                }
                //If the group the message was sent in isn't blocked and no filter altering commands were used, check for filters
                if (checkFilters && !restGroupsFilterSpam.includes(chatID)
                    && usersDict[authorID].permissionLevel[chatID] >= groupsDict[chatID].functionPermissions["filters"])
                    await HF.checkFilters(client, bodyText, chatID, messageID, groupsDict, 15, restGroupsFilterSpam);
            }
        } else console.log("error occurred - message was null"); //Shouldn't ever happen
    });
}

//TODO: website
//TODO: search on ME
//TODO: stock checking
//TODO: send bus stop times
//TODO: chess - lichess API?
//TODO: XO against John?
