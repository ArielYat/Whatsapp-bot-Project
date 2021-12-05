const HDB = require("./HandleDB"), HL = require("./HandleLanguage"), HURL = require("./HandleURL"),
    HF = require("./HandleFilters"), HT = require("./HandleTags"), HB = require("./HandleBirthdays"),
    HR = require("./HandleRest"), HSi = require("./HandleStickers"), HSu = require("./HandleSurveys");
//Whatsapp module
const wa = require("@open-wa/wa-automate");
//Schedule module
const schedule = require('node-schedule');
const rule = new schedule.RecurrenceRule();
rule.tz = 'Israel'; //time zone

let groupsDict = {}, restUsers = [], restGroups = [], restGroupsSpam = [];
//Group rest constants
const groupCommandResetInterval = 15 * 60 * 1000 // time limit for groups(in ms)
const groupRestResetInterval = 5 * 60 * 1000; //reset filters counter (in ms)
const limitFilter = 15;

//Get all the groups from mongoDB and make an instance of every group object in every group
HDB.GetAllGroupsFromDB(groupsDict, function () {
    wa.create({headless: false}).then(client => start(client));
});

/*
Handle filters - add filter, remove filter, edit filters and show filters
Input: client and message
Output: None
 */
async function handleFilters(client, message) {
    let bodyText = message.body;
    const chatID = message.chat.id;
    const messageID = message.id;
    if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "add_filter"))) { //Handle add filter
        await HF.addFilter(client, bodyText, chatID, messageID, groupsDict, limitFilter, restGroupsSpam);
    }
    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "remove_filter"))) { //Handle remove filter
        await HF.remFilter(client, bodyText, chatID, messageID, groupsDict, limitFilter, restGroupsSpam);
    }
    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "edit_filter"))) { //handle edit filter
        await HF.editFilter(client, bodyText, chatID, messageID, groupsDict, limitFilter, restGroupsSpam);
    }
    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "show_filters"))) { //show filters
        await HF.showFilters(client, chatID, messageID, groupsDict);
    }
    else {
        if (chatID in groupsDict) {
            if (groupsDict[chatID].filterCounter < limitFilter) {
                await HF.checkFilters(client, bodyText, chatID, messageID, groupsDict, limitFilter, restGroupsSpam);
            }
            else if (groupsDict[chatID].filterCounter === limitFilter) {
                await client.sendText(chatID, HL.getGroupLang(groupsDict, chatID, "filter_spamming"));
                groupsDict[chatID].addToFilterCounter();
                restGroupsSpam.push(chatID);
            }
        }
    }
}

//Handle Tags - add & remove tags, show all of them and respond to them (either single tag/tag everyone)
async function handleTags(client, message) {
    let bodyText = message.body;
    const chatID = message.chat.id;
    const messageID = message.id;
    let quotedMsgID = messageID;

    if (message.quotedMsg != null)
        quotedMsgID = message.quotedMsg.id;
    let groupMembersArray = null;
    if (message.chat.isGroup)
        groupMembersArray = await client.getGroupMembersId(message.chat.id);

    if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "tag_all"))) {
        await HT.tagEveryOne(client, bodyText, chatID, quotedMsgID, messageID, groupsDict);
    }
    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "tag"))) {
        await HT.checkTags(client, bodyText, chatID, quotedMsgID, messageID, groupsDict);
    }
    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "add_tag"))) {
        await HT.addTag(client, bodyText, chatID, messageID, groupsDict, groupMembersArray);
    }
    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "remove_tag"))) {
        await HT.remTag(client, bodyText, chatID, messageID, groupsDict);
    }
    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "show_tags"))) {
        await HT.showTags(client, chatID, messageID, groupsDict);
    }
}

//Handle birthdays - add & remove birthdays, and show all of them
async function handleBirthdays(client, message) {
    let bodyText = message.body;
    const chatID = message.chat.id;
    const messageID = message.id;

    if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "add_birthday"))) {
        await HB.addBirthday(client, bodyText, chatID, messageID, groupsDict);
    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "remove_birthday"))) {
        await HB.remBirthday(client, bodyText, chatID, messageID, groupsDict);
    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "show_birthDays"))) {
        await HB.showBirthdays(client, chatID, messageID, groupsDict);
    }
}

//Handle language - change group language and show help message
async function handleLanguage(client, message) {
    let bodyText = message.body;
    const chatID = message.chat.id;
    const messageID = message.id;

    if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "change_language"))) {
        await HL.changeGroupLang(client, message, groupsDict);
    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "handle_Help"))) {
        await client.reply(message.chat.id, HL.getGroupLang(groupsDict, message.chat.id, "handle_help_reply"), messageID);
    }
}

//Reset filter counter for all groups every [groupCommandResetInterval] minutes
setInterval(function () {
    for (let group in groupsDict)
        groupsDict[group].filterCounterReset();
}, groupCommandResetInterval);

//Remove all groups from rest list every [groupRestResetInterval] minutes
setInterval(function () {
    while (restGroupsSpam.length > 0)
        restGroupsSpam.pop();
}, groupRestResetInterval);

function start(client) {
    //Check if there are birthdays everyday at 6 am
    schedule.scheduleJob('01 00 * * *', () => {
        HB.checkBirthday(client, groupsDict)
    });
    //Check every function every time a message is received
    client.onMessage(async message => {
        if (message != null) {
            await HR.handleUserRest(client, message, restUsers);
            await HR.handleGroupRest(client, message, restGroups, restGroupsSpam);
            if (!restUsers.includes(message.author) && !restGroups.includes(message.chat.id) &&
                !restGroupsSpam.includes(message.chat.id)) {
                await handleFilters(client, message);
                await handleTags(client, message);
                await handleBirthdays(client, message);
                await handleLanguage(client, message);
                await HSi.handleStickers(client, message, groupsDict);
                await HURL.stripLinks(client, message, groupsDict);
                await HSu.makeButton(client, message, groupsDict);
            }
        }
    });
}