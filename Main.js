const HDB = require("./HandleDB"), HL = require("./HandleLanguage"), HURL = require("./HandleURL"),
    HF = require("./HandleFilters"), HT = require("./HandleTags"), HBi = require("./HandleBirthdays"),
    HS = require("./HandleStickers"), HBu = require("./ButtonHandling");
//Whatsapp module
const wa = require("@open-wa/wa-automate");
//Schedule module
const schedule = require('node-schedule');
const rule = new schedule.RecurrenceRule();
rule.tz = 'Israel';

let groupsDict = {};
let restGroups = [];
let restUsers = [];
let restGroupsAuto = [];
//Group rest constants
const the_interval_pop = 10 * 60 * 1000; //in ms
const the_interval_reset = 3 * 60 * 1000; //in ms
const limitFilter = 15;

//Get all the groups from mongoDB and make an instance of every group object in every group
HDB.GetAllGroupsFromDB(groupsDict, function () {
    wa.create({headless: false}).then(client => start(client));
});

//Handle filters - add, remove & edit filter, show all of them and respond to them
async function handleFilters(client, message) {
    let bodyText = message.body;
    const chatID = message.chat.id;
    const messageID = message.id;
    if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "add_filter"))) {
        await HF.addFilter(client, bodyText, chatID, messageID, groupsDict);
    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "remove_filter"))) {
        await HF.remFilter(client, bodyText, chatID, messageID, groupsDict);
    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "edit_filter"))) {
        await HF.editFilter(client, bodyText, chatID, messageID, groupsDict);
    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "show_filters"))) {
        await HF.showFilters(client, chatID, messageID, groupsDict);
    } else {
        if (chatID in groupsDict) {
            if (groupsDict[chatID].filterCounter < limitFilter) {
                await HF.checkFilters(client, bodyText, chatID, messageID, groupsDict, limitFilter, restGroupsAuto);
            } else if (groupsDict[chatID].filterCounter === limitFilter) {
                await client.sendText(chatID, HL.getGroupLang(groupsDict, chatID, "filter_spamming"));
                groupsDict[chatID].addToFilterCounter();
                restGroupsAuto.push(chatID);
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
    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "tag"))) {
        await HT.checkTags(client, bodyText, chatID, quotedMsgID, messageID, groupsDict);
    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "add_tag"))) {
        await HT.addTag(client, bodyText, chatID, messageID, groupsDict, groupMembersArray);
    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "remove_tag"))) {
        await HT.remTag(client, bodyText, chatID, messageID, groupsDict);

    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "show_tags"))) {
        await HT.showTags(client, chatID, messageID, groupsDict);
    }
}

//Handle birthdays - add & remove birthdays, and show all of them
async function handleBirthdays(client, message) {
    let bodyText = message.body;
    const chatID = message.chat.id;
    const messageID = message.id;

    if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "add_birthday"))) {
        await HBi.addBirthday(client, bodyText, chatID, messageID, groupsDict);
    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "remove_birthday"))) {
        await HBi.remBirthday(client, bodyText, chatID, messageID, groupsDict);
    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "show_birthDays"))) {
        await HBi.showBirthdays(client, chatID, messageID, groupsDict);
    }
}

//Handle language - change group language and show help message
async function handleLanguage(client, message) {
    let bodyText = message.body;
    const chatID = message.chat.id;
    const messageID = message.id;

    if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "change_language"))) {
        await HL.changeGroupLang(client, message, groupsDict);
    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "handleHelp"))) {
        await client.reply(message.chat.id,
            HL.getGroupLang(groupsDict, message.chat.id, "handleHelp_reply"), messageID);
    }
}

//Handle user rest
async function handleUserRest(client, message) {
    const textMessage = message.body;
    const chatID = message.chat.id;
    const messageId = message.id;

    if (message.quotedMsg != null) {
        const responseAuthor = message.quotedMsg.author;
        const userID = message.sender.id;
        if (textMessage.startsWith("חסום גישה למשתמש")) {
            if (userID === "972543293155@c.us") {
                restUsers.push(responseAuthor);
                await client.sendReplyWithMentions(chatID, "המשתמש @" + responseAuthor + "\n נחסם בהצלחה \n, May God have mercy on your soul", messageId);
            } else {
                client.reply(chatID, "רק כבודו יכול לחסום אנשים", messageId);
            }
        }

        if (textMessage.startsWith("אפשר גישה למשתמש")) {
            if (userID === "972543293155@c.us") {
                const userIdIndex = restUsers.indexOf(responseAuthor);
                restUsers.splice(userIdIndex, 1);
                await client.sendReplyWithMentions(chatID, "המשתמש @" + responseAuthor + "\n שוחרר בהצלחה", messageId);
            } else {
                await client.reply(chatID, "רק כבודו יכול לשחרר אנשים", messageId);
            }
        }
    }
}

//Handle group rest
async function handleGroupRest(client, message) {
    const textMessage = message.body;
    const chatID = message.chat.id;
    const messageId = message.id;
    const responseGroupId = message.chat.id;
    const userID = message.sender.id;
    if (textMessage.startsWith("חסום קבוצה")) {
        if (userID === "972543293155@c.us") {
            restGroups.push(responseGroupId);
            await client.reply(chatID, "הקבוצה נחסמה בהצלחה", messageId);
        } else {
            client.reply(chatID, "רק ארדואן בכבודו ובעצמו יכול לחסום קבוצות", messageId);
        }
    }

    if (textMessage.startsWith("שחרר קבוצה")) {
        if (userID === "972543293155@c.us") {
            const groupIdIndex = restGroups.indexOf(responseGroupId);
            restGroups.splice(groupIdIndex, 1);
            restGroupsAuto.splice(groupIdIndex, 1);
            await client.reply(chatID, "הקבוצה שוחררה בהצלחה", messageId);
        } else {
            await client.reply(chatID, "רק ארדואן יכול לשחרר קבוצות", messageId);
        }
    }
}

//Reset filter counter for all groups every 3 minutes
setInterval(function () {
    for (let group in groupsDict) {
        groupsDict[group].filterCounterRest();
    }
}, the_interval_pop);

//Remove all groups from rest list every 10 minutes
setInterval(function () {
    while (restGroupsAuto.length > 0) {
        restGroupsAuto.pop();
    }
}, the_interval_reset);

////Send Good Morning/Evening messages
//schedule.scheduleJob('0 7 * * *', () => {
//    for (const [chatID, object] of groupsDict.entries(groupsDict)) {
//        client.sendText(chatID, "בוקר טוב!")
//    }
//});
//schedule.scheduleJob('0 18 * * *', () => {
//    for (const [chatID, object] of groupsDict.entries(groupsDict)) {
//        client.sendText(chatID, "ערב נעים!")
//    }
//});

function start(client) {
    //Check if there are birthdays everyday at 6 am
    schedule.scheduleJob('6 0 * * *', () => {
        HBi.checkBirthday(client, groupsDict)
    });
    //Check every function every time a message is received
    client.onMessage(async message => {
        if (message != null) {
            await handleUserRest(client, message);
            await handleGroupRest(client, message);
            if (!restUsers.includes(message.author) && !restGroups.includes(message.chat.id) &&
                !restGroupsAuto.includes(message.chat.id)) {
                await handleFilters(client, message);
                await handleTags(client, message);
                await handleBirthdays(client, message);
                await handleLanguage(client, message);
                await HS.handleStickers(client, message, groupsDict);
                await HURL.stripLinks(client, message, groupsDict);
                await HBu.makeButton(client, message, groupsDict);
            }
        }
    });
}
