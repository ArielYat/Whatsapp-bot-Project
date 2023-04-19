//version 2.14.0

//Bot Modules Written by the bot devs
import HDB from "./ModulesDatabase/HandleDB.js";
import HF from "./ModulesDatabase/HandleFilters.js";
import HT from "./ModulesDatabase/HandleTags.js";
import HB from "./ModulesDatabase/HandleBirthdays.js";
import HS from "./ModulesImmediate/HandleStickers.js";
import HAF from "./ModulesDatabase/HandleAdminFunctions.js";
import HL from "./ModulesDatabase/HandleLanguage.js";
import HP from "./ModulesDatabase/HandlePermissions.js";
import HAPI from "./ModulesImmediate/HandleAPIs.js";
import HR from "./ModulesDatabase/HandleReminders.js";
import HAFK from "./ModulesDatabase/HandleAFK.js";
import HO from "./ModulesImmediate/HandleOther.js";
import Group from "./Classes/Group.js";
import Person from "./Classes/Person.js";
import apiKeys from "./apiKeys.js";
import {Strings} from "./Strings.js";
//Open-Whatsapp and Schedule libraries
import {create, Chat, Message, Client} from "@open-wa/wa-automate";
import {ChatId, ContactId} from "@open-wa/wa-automate/dist/api/model/aliases";
import Schedule from "node-schedule";

//The bot devs' phone numbers
const botDevs: ContactId[] = apiKeys.botDevs;

//Local storage of data to not require access to the database at all times ("cache")
let groupsDict: { [key: ChatId]: Group } = {}, usersDict: { [key: ContactId]: Person } = {};
let restGroups: ChatId[] = [], restPersons: ContactId[] = [],
    restGroupsFilterSpam: ChatId[] = [], restPersonsCommandSpam: ContactId[] = [];
let chatsWithReminders: ChatId[] = [], afkPersons: ContactId[] = [];

//The bot devs' time zone
Schedule.tz = apiKeys.region;

//Helper type for the Group and Person objects' properties
export type TillZero<N extends number> = HelpType<N, []>;
type HelpType<N extends number, A extends unknown[]> = A['length'] extends N ? A[number] : HelpType<N, [A['length'], ...A]>;

process.on('uncaughtException', err => {
    console.log(err);
});

async function HandleImmediate(client, message, bodyText, chatID, authorID, messageID) {
    if ((await HL.getGroupLang(groupsDict, chatID, "make_sticker")).test(bodyText)) {
        await HS.handleStickers(client, message, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "create_text_sticker")).test(bodyText)) {
        await HS.createTextSticker(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((Strings["help_me_pwease"]["he"]).test(bodyText) || (Strings["help_me_pwease"]["en"]).test(bodyText) || (Strings["help_me_pwease"]["la"]).test(bodyText) || (Strings["help_me_pwease"]["fr"]).test(bodyText)) {
        await HL.sendHelpMessage(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "translate_to")).test(bodyText)) {
        await HAPI.translate(client, message, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "scan_link")).test(bodyText)) {
        await HAPI.scanLinks(client, message, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "change_link_type")).test(bodyText)) {
        await HO.changeLinkType(client, message, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "fetch_stock")).test(bodyText)) {
        await HAPI.fetchStock(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "search_in_urban")).test(bodyText)) {
        await HAPI.searchUrbanDictionary(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "check_crypto")).test(bodyText)) {
        await HAPI.fetchCryptocurrency(client, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "show_profile")).test(bodyText)) {
        await HO.ShowStats(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "afk_me_pwease")).test(bodyText)) {
        await HAFK.afkOn(client, chatID, messageID, authorID, groupsDict, usersDict, afkPersons);
        usersDict[authorID].commandCounter++;
        return false;
        /* } else if ((await HL.getGroupLang(groupsDict, chatID, "init_tic_tac_toe")).test(bodyText)) {
               await H3T.TicTacToe(client, bodyText, chatID, messageID, authorID, groupsDict);
               usersDict[authorID].commandCounter++;
               return true; */
    } else if ((await HL.getGroupLang(groupsDict, chatID, "download_music")).test(bodyText)) {
        await HAPI.downloadMusic(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "create_survey")).test(bodyText)) {
        await HO.makeButtons(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "wordle_game")).test(bodyText)) {
        await HO.wordleGame(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "stable_diffusion_create")).test(bodyText)) {
        await HAPI.stableDiffusion(client, message, bodyText, chatID, authorID, messageID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "transcribe_audio")).test(bodyText)) {
        await HAPI.transcribeAudio(client, message, chatID, authorID, messageID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if (bodyText.match(Strings["change_language"]["he"]) || bodyText.match(Strings["change_language"]["en"]) || bodyText.match(Strings["change_language"]["la"]) || bodyText.match(Strings["change_language"]["fr"])) {
        await HL.changeGroupLang(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } return true;
}

async function HandleShows(client, bodyText, chatID, authorID, messageID) {
    if ((await HL.getGroupLang(groupsDict, chatID, "show_filters")).test(bodyText)) {
        await HF.showFilters(client, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "show_tags")).test(bodyText)) {
        await HT.showTags(client, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "show_birthdays")).test(bodyText)) {
        await HB.showBirthdays(client, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "show_group_function_permissions")).test(bodyText)) {
        await HP.showGroupFunctionsPermissions(client, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "show_group_user_permissions")).test(bodyText)) {
        await HP.showGroupPersonsPermissions(client, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } return true;
}

async function Tags(client, bodyText, chatID, authorID, messageID, quotedMsgID) {
    if ((await HL.getGroupLang(groupsDict, chatID, "tag_all")).test(bodyText)) {
        await HT.tagEveryone(client, bodyText, chatID, quotedMsgID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "tag_person")).test(bodyText)) {
        await HT.checkTags(client, bodyText, chatID, messageID, authorID, quotedMsgID, groupsDict, usersDict, afkPersons);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "check_tags")).test(bodyText)) {
        await HT.whichMessagesTaggedIn(client, chatID, messageID, authorID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "clear_tags")).test(bodyText)) {
        await HT.clearTaggedMessaged(client, chatID, messageID, authorID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "next_tag_list")).test(bodyText)) {
        await HT.nextPersonInList(client, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } return true;
}

async function HandleFilters(client, message, bodyText, chatID, authorID, messageID) {
    if ((await HL.getGroupLang(groupsDict, chatID, "add_filter")).test(bodyText)) {
        await HF.addFilter(client, message, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return [false, false];
    } else if ((await HL.getGroupLang(groupsDict, chatID, "remove_filter")).test(bodyText)) {
        await HF.remFilter(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return [false, false];
    } else if ((await HL.getGroupLang(groupsDict, chatID, "edit_filter")).test(bodyText)) {
        await HF.editFilter(client, message, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return [false, false];
    } return [true, true];
}

async function HandleTags(client, bodyText, chatID, authorID, messageID) {
    if ((await HL.getGroupLang(groupsDict, chatID, "add_tag")).test(bodyText)) {
        await HT.addTag(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "remove_tag")).test(bodyText)) {
        await HT.remTag(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "create_tag_list")).test(bodyText)) {
        await HT.createTagList(client, bodyText, chatID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "add_tagging_group")).test(bodyText)) {
        await HT.addTaggingGroup(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "remove_tagging_group")).test(bodyText)) {
        await HT.removeTaggingGroup(client, bodyText, chatID, messageID, groupsDict)
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "add_person_to_tagging_group")).test(bodyText)) {
        await HT.addPersonToTaggingGroup(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "remove_person_from_tagging_group")).test(bodyText)) {
        await HT.removePersonFromTaggingGroup(client, bodyText, chatID, messageID, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } return true;
}

async function HandleBirthdays(client, bodyText, chatID, authorID, messageID) {
    if ((await HL.getGroupLang(groupsDict, chatID, "add_birthday")).test(bodyText)) {
        await HB.addBirthday(client, bodyText, chatID, authorID, messageID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "remove_birthday")).test(bodyText)) {
        await HB.remBirthday(client, bodyText, authorID, chatID, messageID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "add_birthday_to_group")).test(bodyText)) {
        await HB.addCurrentGroupToBirthDayBroadcastList(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "remove_birthday_from_group")).test(bodyText)) {
        await HB.remCurrentGroupFromBirthDayBroadcastList(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
        return false;
    } return true;
}

async function HandlePermissions(client, bodyText, chatID, authorID, messageID) {
    if ((await HL.getGroupLang(groupsDict, chatID, "set_permissions")).test(bodyText)) {
        await HP.updateGroupAdmins(client, chatID, groupsDict);
        await HP.setFunctionPermissionLevel(client, bodyText, chatID, messageID, usersDict[authorID].permissionLevel[chatID], groupsDict[chatID].functionPermissions, groupsDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "mute_participant")).test(bodyText)) {
        await HP.muteParticipant(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "unmute_participant")).test(bodyText)) {
        await HP.unmuteParticipant(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict);
        usersDict[authorID].commandCounter++;
        return false;
    } return true;
}

async function HandleReminders(client, message, bodyText, chatID, messageID, authorID) {
    if ((await HL.getGroupLang(groupsDict, chatID, "add_reminder")).test(bodyText)) {
        await HR.addReminder(client, message, bodyText, chatID, messageID, groupsDict, chatsWithReminders);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "remove_reminder")).test(bodyText)) {
        await HR.removeReminder(client, bodyText, chatID, messageID, groupsDict, chatsWithReminders);
        usersDict[authorID].commandCounter++;
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "show_reminders")).test(bodyText)) {
        await HR.showReminders(client, groupsDict, messageID, chatID);
        usersDict[authorID].commandCounter++;
        return false;
    } return true;
}

async function HandleAdminFunctions(client, message, bodyText, chatID, authorID, messageID) {
    usersDict[authorID].permissionLevel[chatID] = 3;
    if (/^\/Ban/i.test(bodyText) || /^\/Unban/i.test(bodyText)) {
        await HAF.handleUserRest(client, bodyText, chatID, messageID, message.quotedMsgObj, restPersons, restPersonsCommandSpam, usersDict[authorID]);
        return false;
    } else if (/^\/Block group/i.test(bodyText) || /^\/Unblock group/i.test(bodyText)) {
        await HAF.handleGroupRest(client, bodyText, chatID, messageID, restGroups, restGroupsFilterSpam, groupsDict[chatID]);
        return false;
    } else if ((/^Join /.test(bodyText)) || (/^הצטרף /.test(bodyText))) {
        await HAF.handleBotJoin(client, bodyText, chatID, messageID);
        return false;
    } else if (/^!ping$/i.test(bodyText)) {
        await HAF.ping(client, message, bodyText, chatID, messageID, groupsDict, usersDict, restGroups, restPersons, restGroupsFilterSpam, restPersonsCommandSpam);
        return false;
    } else if (/^\/exec/i.test(bodyText)) {
        await HAF.execute(client, bodyText, message, chatID, messageID, authorID, groupsDict, usersDict, restGroups, restPersons, restGroupsFilterSpam, restPersonsCommandSpam, afkPersons, botDevs, HDB, HF, HT, HB, HS, HAF, HL, HP, HAPI, HR, HAFK, HO, Group, Person, Strings);
        return false;
    } else if ((await HL.getGroupLang(groupsDict, chatID, "help_admin")).test(bodyText)) {
        await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "help_admin_reply"), messageID);
        return false;
    } return true;
}

//Main function
function start(client: Client) {
    //Check if there are birthdays everyday at 5 am
    Schedule.scheduleJob('0 5 * * *', async function () {
        await HB.checkBirthdays(client, usersDict, groupsDict);
    });
    //Reset all group counters everyday at midnight
    Schedule.scheduleJob('0 0 * * *', async function () {
        for (const groupID in groupsDict)
            groupsDict[groupID].resetCounters();
        for (const personID in usersDict)
            usersDict[personID].resetCounters();
    });
    //Reset the filter & command counters for all the groups & persons
    setInterval(function () {
        for (const groupID in groupsDict)
            groupsDict[groupID].filterCounter = 0;
        for (const personID in usersDict)
            usersDict[personID].commandCounter = 0;
    }, 5 * 60 * 1000); /* In ms; 5 min */
    //Check if a group/person need to be freed from prison (if 15 minutes passed) and check reminders
    setTimeout(function() {
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
            await HR.checkReminders(client, groupsDict, chatsWithReminders, currentDate);
        }, 60 * 1000); /* In ms; 1 min */
    }, 60000 - (new Date().getTime() % 60000)); /* to make it run at the start of every minute */

    //Send a message to the original chat cause of a stupid bug not letting the bot reply to messages before it sent a regular message
    client.sendText(apiKeys.originalGroup, "Bot started successfully at " + new Date().toString());
    //Send a starting help message when the bot is added to a group
    client.onAddedToGroup(async (chat: Chat) => {
        await HL.sendStartMessage(client, chat.id);
    });
    //Check every command each time a message is received
    client.onMessage(async (message: Message) => {
        if (message !== null) {
            //Initialize basic message properties: its ID, the ID of its sender and the ID of chat it was sent in
            const chatID = message.chat.id, authorID = message.sender.id, messageID = message.id;
            //Define quotedMsgID properties depending on if a message was quoted
            const quotedMsgID = message.quotedMsg ? message.quotedMsg.id : message.id;
            //Define bodeText depending on if the message a text message or a media message
            let bodyText = message.type === "image" || message.type === "video" ? message.caption : message.text;
            bodyText = bodyText === undefined ? message.text : bodyText;
            //Boolean to check if commands were used to maximize performance
            let checkCommands = true;
            //Boolean to check if a filter altering command was used and if not check if the message contains filters
            let checkFilters = true;
            //Create new group/person if they don't exist in the DB
            if (!(chatID in groupsDict))
                groupsDict[chatID] = new Group(chatID);
            if (!(authorID in usersDict))
                usersDict[authorID] = new Person(authorID);
            //Add author to group's DB if not already in it
            if (!(groupsDict[chatID].personsIn.some(person => authorID === person.personID))) {
                await HDB.addArgsToDB(chatID, authorID, null, null, "personIn", function () {
                    // @ts-ignore
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
                checkCommands = await HandleAdminFunctions(client, message, bodyText, chatID, authorID, messageID);
            //Log messages with tags for later use in HT.whichMessagesTaggedIn()
            await HT.logMessagesWithTags(client, message, bodyText, chatID, messageID, usersDict, groupsDict, afkPersons);
            //Remove a person from afk
            if (afkPersons.includes(authorID) && !((await HL.getGroupLang(groupsDict, chatID, "afk_me_pwease")).test(bodyText)))
                await HAFK.afkOff(client, chatID, messageID, authorID, groupsDict, usersDict, afkPersons);
            //If the group the message was sent in isn't blocked, check for commands
            if (!restGroups.includes(chatID)) {
                //If the user who sent the message isn't blocked, check for commands
                if (!restPersons.includes(authorID) && !restPersonsCommandSpam.includes(authorID)) {
                    //Check all functions for commands if the user has a high enough permission level to use them
                    if (usersDict[authorID].permissionLevel[chatID] >= groupsDict[chatID].functionPermissions["tags"])
                        checkCommands = await Tags(client, bodyText, chatID, authorID, messageID, quotedMsgID);
                    if (usersDict[authorID].permissionLevel[chatID] >= groupsDict[chatID].functionPermissions["handleOther"] && checkCommands)
                        checkCommands = await HandleImmediate(client, message, bodyText, chatID, authorID, messageID);
                    if (usersDict[authorID].permissionLevel[chatID] >= groupsDict[chatID].functionPermissions["handleShows"] && checkCommands)
                        checkCommands = await HandleShows(client, bodyText, chatID, authorID, messageID);
                    if (usersDict[authorID].permissionLevel[chatID] >= groupsDict[chatID].functionPermissions["handleFilters"] && checkCommands)
                        [checkCommands, checkFilters] = await HandleFilters(client, message, bodyText, chatID, authorID, messageID);
                    if (usersDict[authorID].permissionLevel[chatID] >= groupsDict[chatID].functionPermissions["handleTags"] && checkCommands)
                        checkCommands = await HandleTags(client, bodyText, chatID, authorID, messageID);
                    if (usersDict[authorID].permissionLevel[chatID] >= groupsDict[chatID].functionPermissions["HandleReminders"] && checkCommands)
                        checkCommands = await HandleReminders(client, message, bodyText, chatID, messageID, authorID);
                    if (usersDict[authorID].permissionLevel[chatID] >= groupsDict[chatID].functionPermissions["handleBirthdays"] && checkCommands)
                        checkCommands = await HandleBirthdays(client, bodyText, chatID, authorID, messageID);
                    if (usersDict[authorID].permissionLevel[chatID] >= 2 && checkCommands)
                        await HandlePermissions(client, bodyText, chatID, authorID, messageID);
                    //If the user used too many commands, put them on a cool down
                    if (usersDict[authorID].commandCounter === 14) {
                        let bannedDate = new Date();
                        bannedDate.setMinutes(bannedDate.getMinutes() + 15);
                        bannedDate.setSeconds(0);
                        bannedDate.setMilliseconds(0);
                        usersDict[authorID].autoBanned = bannedDate;
                        restPersonsCommandSpam.push(authorID);
                        await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "command_spam_reply",
                            bannedDate.getHours().toString(), bannedDate.getMinutes() > 10 ?
                                bannedDate.getMinutes().toString() : "0" + bannedDate.getMinutes().toString()), messageID);
                    }
                }
                //If the group the message was sent in isn't blocked and no filter altering commands were used, check for filters
                if (checkFilters && !restGroupsFilterSpam.includes(chatID)
                    && usersDict[authorID].permissionLevel[chatID] >= groupsDict[chatID].functionPermissions["filters"])
                    await HF.checkFilters(client, bodyText, chatID, messageID, groupsDict, 15, restGroupsFilterSpam);
            }
        } else console.log("ERROR: the message was (somehow) null"); //Shouldn't ever happen
    });
}

//Start the bot - get all the groups from mongoDB (cache) and make an instance of every group object in every group
await HDB.getAllGroupsFromDB(groupsDict, usersDict, restPersons, restGroups, chatsWithReminders, afkPersons, async function () {
    create(apiKeys.configObj)
        .then(client => start(client))
        .then(_ => console.log("Bot started successfully at " + new Date().toString()));
});

//TODO: pins
//TODO: add male/female strings
//TODO: website
//TODO: search on ME
//TODO: stock checking
//TODO: send bus stop times
//TODO: chess - Lichess API?
//TODO: XO against John?
