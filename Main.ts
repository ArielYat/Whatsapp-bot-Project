//version 2.8

//Bot Modules Written by the bot devs
import {HURL} from "./ModulesImmediate/HandleURLs.js";
import {HDB} from "./ModulesDatabase/HandleDB.js";
import {HF} from "./ModulesDatabase/HandleFilters.js";
import {HT} from "./ModulesDatabase/HandleTags.js";
import {HB} from "./ModulesDatabase/HandleBirthdays.js";
import {HSt} from "./ModulesImmediate/HandleStickers.js";
import {HAF} from "./ModulesDatabase/HandleAdminFunctions.js";
import {HL} from "./ModulesDatabase/HandleLanguage.js";
import {HSu} from "./ModulesImmediate/HandleSurveys.js";
import {HP} from "./ModulesDatabase/HandlePermissions.js";
import {HAPI} from "./ModulesImmediate/HandleAPIs.js";
import {HW} from "./ModuleWebsite/HandleWebsite.js";
import {HUS} from "./ModulesImmediate/HandleUserStats.js";
import {HR} from "./ModulesDatabase/HandleReminders.js";
import {HAFK} from "./ModulesDatabase/HandleAFK.js";
import {Group} from "./Classes/Group.js";
import {Person} from "./Classes/Person.js";
import {Strings} from "./Strings.js";
//Open-Whatsapp and Schedule libraries
import wa from "@open-wa/wa-automate";
import IsraelSchedule from "node-schedule";
//Local storage of data to not require access to the database at all times ("cache")
let groupsDict = {}, usersDict = {}, restGroups = [], restPersons = [], restGroupsFilterSpam = [],
    restPersonsCommandSpam = [], personsWithReminders = [], afkPersons = [];
const botDevs = ["972543293155@c.us", "972586809911@c.us"];
IsraelSchedule.tz = 'Israel'; //Bot devs' time zone

process.on('uncaughtException', err => {
    console.log(err);
});

//Start the bot - get all the groups from mongoDB (cache) and make an instance of every group object in every group
HDB.GetAllGroupsFromDB(groupsDict, usersDict, restPersons, restGroups, personsWithReminders, afkPersons, function () {
    wa.create({headless: false, useChrome: true, multiDevice: true}).then(client => start(client));
}).then(_ => console.log("Bot started successfully at " + new Date().toString()));

async function HandleImmediate(client, message, bodyText, chatID, authorID, messageID) {
    if (HL.getGroupLang(groupsDict, chatID, "make_sticker").test(bodyText)) {
        await HSt.handleStickers(client, message, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "create_text_sticker").test(bodyText)) {
        await HSt.createTextSticker(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "help_me_pwease").test(bodyText)) {
        await HL.sendHelpMessage(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "translate_to").test(bodyText)) {
        await HAPI.translate(client, message, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "fetch_stock").test(bodyText)) {
        await HAPI.fetchStock(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "search_in_urban").test(bodyText)) {
        await HAPI.searchUrbanDictionary(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "check_crypto").test(bodyText)) {
        await HAPI.fetchCryptocurrency(client, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "scan_link").test(bodyText)) {
        await HURL.stripLinks(client, message, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "show_profile").test(bodyText)) {
        await HUS.ShowStats(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "afk_me_pwease").test(bodyText)) {
        await HAFK.afkOn(client, chatID, messageID, authorID, groupsDict, usersDict, afkPersons);
        usersDict[authorID].commandCounter++;
        /* } else if (HL.getGroupLang(groupsDict, chatID, "init_tic_tac_toe").test(bodyText)) {
               await H3T.TicTacToe(client, bodyText, chatID, messageID, authorID, groupsDict);
               usersDict[authorID].commandCounter++; */
    } else if (HL.getGroupLang(groupsDict, chatID, "download_music").test(bodyText)) {
        await HAPI.downloadMusic(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "create_survey").test(bodyText)) {
        await HSu.makeButton(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "show_webpage").test(bodyText)) {
        await HW.sendLink(client, chatID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (bodyText.match(Strings["change_language"]["he"]) || bodyText.match(Strings["change_language"]["en"]) || bodyText.match(Strings["change_language"]["la"]) || bodyText.match(Strings["change_language"]["fr"])) {
        await HL.changeGroupLang(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    }
}

async function HandleShows(client, bodyText, chatID, authorID, messageID) {
    if (HL.getGroupLang(groupsDict, chatID, "show_filters").test(bodyText)) {
        await HF.showFilters(client, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "show_tags").test(bodyText)) {
        await HT.showTags(client, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "show_birthdays").test(bodyText)) {
        await HB.showBirthdays(client, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "show_group_function_permissions").test(bodyText)) {
        await HP.showGroupFunctionsPermissions(client, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "show_group_user_permissions").test(bodyText)) {
        await HP.showGroupPersonsPermissions(client, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    }
}

async function Tags(client, bodyText, chatID, authorID, messageID, quotedMsgID) {
    if (HL.getGroupLang(groupsDict, chatID, "tag_all").test(bodyText)) {
        await HT.tagEveryone(client, bodyText, chatID, quotedMsgID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "tag_person").test(bodyText)) {
        await HT.checkTags(client, bodyText, chatID, messageID, authorID, quotedMsgID, groupsDict, usersDict, afkPersons);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "check_tags").test(bodyText)) {
        await HT.whichMessagesTaggedIn(client, chatID, messageID, authorID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "clear_tags").test(bodyText)) {
        await HT.clearTaggedMessaged(client, chatID, messageID, authorID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "next_tag_list").test(bodyText)) {
        await HT.nextPersonInList(client, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    }
}

async function HandleFilters(client, message, bodyText, chatID, authorID, messageID) {
    if (HL.getGroupLang(groupsDict, chatID, "add_filter").test(bodyText)) {
        await HF.addFilter(client, message, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if (HL.getGroupLang(groupsDict, chatID, "remove_filter").test(bodyText)) {
        await HF.remFilter(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if (HL.getGroupLang(groupsDict, chatID, "edit_filter").test(bodyText)) {
        await HF.editFilter(client, message, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else return true;
}

async function HandleTags(client, bodyText, chatID, authorID, messageID) {
    if (HL.getGroupLang(groupsDict, chatID, "add_tag").test(bodyText)) {
        await HT.addTag(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "remove_tag").test(bodyText)) {
        await HT.remTag(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "create_tag_list").test(bodyText)) {
        await HT.createTagList(client, bodyText, chatID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "add_tagging_group").test(bodyText)) {
        await HT.addTaggingGroup(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "remove_tagging_group").test(bodyText)) {
        await HT.removeTaggingGroup(client, bodyText, chatID, messageID, groupsDict)
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "add_person_to_tagging_group").test(bodyText)) {
        await HT.addPersonToTaggingGroup(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "remove_person_from_tagging_group").test(bodyText)) {
        await HT.removePersonFromTaggingGroup(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
    }
}

async function HandleBirthdays(client, bodyText, chatID, authorID, messageID) {
    if (HL.getGroupLang(groupsDict, chatID, "add_birthday").test(bodyText)) {
        await HB.addBirthday(client, bodyText, chatID, authorID, messageID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "remove_birthday").test(bodyText)) {
        await HB.remBirthday(client, bodyText, authorID, chatID, messageID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "add_birthday_to_group").test(bodyText)) {
        await HB.addCurrentGroupToBirthDayBroadcastList(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "remove_birthday_from_group").test(bodyText)) {
        await HB.remCurrentGroupFromBirthDayBroadcastList(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
    }
}

async function HandlePermissions(client, bodyText, chatID, authorID, messageID) {
    if (HL.getGroupLang(groupsDict, chatID, "set_permissions").test(bodyText)) {
        await HP.updateGroupAdmins(client, chatID, groupsDict);
        await HP.setFunctionPermissionLevel(client, bodyText, chatID, messageID, usersDict[authorID].permissionLevel[chatID], groupsDict[chatID].functionPermissions, groupsDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "mute_participant").test(bodyText)) {
        await HP.muteParticipant(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
    } else if (HL.getGroupLang(groupsDict, chatID, "unmute_participant").test(bodyText)) {
        await HP.unmuteParticipant(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
    }
}

async function HandleReminders(client, bodyText, chatID, messageID, authorID, message) {
    if (chatID === authorID) {
        if (HL.getGroupLang(groupsDict, chatID, "add_reminder").test(bodyText)) {
            await HR.addReminder(client, bodyText, chatID, messageID, usersDict[authorID], groupsDict, message, personsWithReminders);
            usersDict[authorID].commandCounter++;
        } else if (HL.getGroupLang(groupsDict, chatID, "remove_reminder").test(bodyText)) {
            await HR.removeReminder(client, bodyText, chatID, messageID, usersDict[authorID], groupsDict, personsWithReminders);
            usersDict[authorID].commandCounter++;
        } else if (HL.getGroupLang(groupsDict, chatID, "show_reminders").test(bodyText)) {
            await HR.showReminders(client, usersDict[authorID], groupsDict, messageID, chatID);
            usersDict[authorID].commandCounter++;
        }
    }
}

async function HandleAdminFunction(client, message, bodyText, chatID, authorID, messageID, groupsDict, usersDict) {
    usersDict[authorID].permissionLevel[chatID] = 3;
    if (/^\/Ban/i.test(bodyText) || /^\/Unban/i.test(bodyText))
        await HAF.handleUserRest(client, bodyText, chatID, messageID, message.quotedMsgObj, restPersons, restPersonsCommandSpam, usersDict[authorID]);
    else if (/^\/Block group/i.test(bodyText) || /^\/Unblock group/i.test(bodyText))
        await HAF.handleGroupRest(client, bodyText, chatID, messageID, restGroups, restGroupsFilterSpam, groupsDict[chatID]);
    else if (/^Join /.test(bodyText))
        await HAF.handleBotJoin(client, bodyText, chatID, messageID);
    else if (/^!ping$/i.test(bodyText))
        await HAF.ping(client, message, bodyText, chatID, messageID, groupsDict, usersDict, restGroups, restPersons, restGroupsFilterSpam, restPersonsCommandSpam);
    else if (/^\/exec/i.test(bodyText))
        await HAF.execute(client, bodyText, message, chatID, messageID, groupsDict, usersDict, restGroups, restPersons, restGroupsFilterSpam, restPersonsCommandSpam, botDevs, HURL, HF, HT, HB, HSt, HAF, HL, HSu, HP, HAPI, HW, HUS, HR, HAFK, Group, Person, Strings);
}

//Main function
function start(client) {
    //Check if there are birthdays everyday at 5 am
    IsraelSchedule.scheduleJob('0 5 * * *', async () => {
        await HB.checkBirthdays(client, usersDict, groupsDict);
    });
    //Reset all group counters everyday at midnight
    IsraelSchedule.scheduleJob('0 0 * * *', async () => {
        for (const group in groupsDict)
            groupsDict[group].resetCounters();
    });
    //Reset the filter & command counters for all the groups & persons
    setInterval(function () {
        for (const group in groupsDict)
            groupsDict[group].filterCounter = 0;
        for (const person in usersDict)
            usersDict[person].commandCounter = 0;
    }, 5 * 60 * 1000); //in ms; 5 min
    //Check if a group/person need to be freed from prison (if 15 minutes passed) and check reminders
    setInterval(async function () {
        const currentDate = new Date();
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
        //Remove users from command rest list
        for (let i = 0; i < restPersonsCommandSpam.length; i++) {
            const personID = restPersonsCommandSpam[i];
            if (usersDict[personID].autoBanned.toString() === currentDate.toString()) {
                usersDict[personID].autoBanned = null;
                usersDict[personID].commandCounter = 0;
                restPersonsCommandSpam.splice(restPersonsCommandSpam.indexOf(personID), 1);
            }
        }
        //Remove groups from filters rest list
        for (let i = 0; i < restGroupsFilterSpam.length; i++) {
            const chatID = restGroupsFilterSpam[i];
            if (groupsDict[chatID].autoBanned.toString() === currentDate.toString()) {
                groupsDict[chatID].autoBanned = null;
                groupsDict[chatID].filterCounter = 0;
                restGroupsFilterSpam.splice(restGroupsFilterSpam.indexOf(chatID), 1);
            }
        }
        //Check reminders
        await HR.checkReminders(client, usersDict, groupsDict, personsWithReminders, currentDate);
    }, 60 * 1000); //in ms; 1 min
    //Send a starting help message when the bot is added to a group
    client.onAddedToGroup(async chat => {
        await HL.sendStartMessage(client, chat.id);
    });
    //Check every command each time a message is received
    client.onMessage(async message => {
        if (message !== null) {
            //Define basic message properties: its ID, the ID of its sender and the ID of chat it was sent in
            const chatID = message.chat.id, authorID = message.sender.id, messageID = message.id;
            //Define quotedMsgID properties depending on if a message was quoted
            const quotedMsgID = message.quotedMsg ? message.quotedMsg.id : message.id;
            //Define bodeText depending on if the message a text message or a media message
            let bodyText = message.type === "image" || message.type === "video" ? message.caption : message.text;
            bodyText = bodyText === undefined ? message.text : bodyText;
            //Boolean to check if a filter altering command was used and if not check if the message contains filters
            let checkFilters = true;
            //Create new group/person if they don't exist in the DB
            if (!(chatID in groupsDict))
                groupsDict[chatID] = await new Group(chatID);
            if (!(authorID in usersDict))
                usersDict[authorID] = await new Person(authorID);
            //Add author to group's DB if not already in it
            if (!(groupsDict[chatID].personsIn.some(person => authorID === person.personID))) {
                await HDB.addArgsToDB(chatID, authorID, null, null, "personIn", function () {
                    groupsDict[chatID].personsIn = ["add", usersDict[authorID]];
                });
            }
            //Update group admins if they don't exist
            if (groupsDict[chatID].groupAdmins.length === 0)
                await HP.updateGroupAdmins(client, chatID, groupsDict);
            //If the author lacks a permission level give them one
            if (!(chatID in usersDict[authorID].permissionLevel))
                await HP.autoAssignPersonPermissions(groupsDict[chatID], usersDict[authorID], chatID);
            //Handle bot developer functions if the author is a dev
            if (botDevs.includes(authorID) || usersDict[authorID].permissionLevel[chatID] === 3)
                await HandleAdminFunction(client, message, bodyText, chatID, authorID, messageID, groupsDict, usersDict);
            //Log messages with tags for later use in HT.whichMessagesTaggedIn()
            await HT.logMessagesWithTags(client, message, bodyText, chatID, messageID, usersDict, groupsDict, afkPersons);
            //Remove a person from afk
            if (afkPersons.includes(authorID) && !(HL.getGroupLang(groupsDict, chatID, "afk_me_pwease").test(bodyText)))
                await HAFK.afkOff(client, chatID, messageID, authorID, groupsDict, usersDict, afkPersons);
            //If the group the message was sent in isn't blocked, check for commands
            if (!restGroups.includes(chatID)) {
                //If the user who sent the message isn't blocked, check for commands
                if (!restPersons.includes(authorID) && !restPersonsCommandSpam.includes(authorID)) {
                    //Check if you user handled a reminder in a DM
                    await HandleReminders(client, bodyText, chatID, messageID, authorID, message);
                    //Check all functions for commands if the user has a high enough permission level to use them
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
                        await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "command_spam_reply",
                            bannedDate.getHours().toString(), bannedDate.getMinutes() > 10 ?
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

//TODO: add male/female strings
//TODO: website
//TODO: search on ME
//TODO: stock checking
//TODO: send bus stop times
//TODO: chess - lichess API?
//TODO: XO against John?
