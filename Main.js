//Files for the different modules
const HDB = require("./ModulesDatabase/HandleDB"), HL = require("./ModulesDatabase/HandleLanguage"),
      HURL = require("./ModulesImmediate/HandleURL"), HF = require("./ModulesDatabase/HandleFilters"),
      HT = require("./ModulesDatabase/HandleTags"), HB = require("./ModulesDatabase/HandleBirthdays"),
      HSi = require("./ModulesImmediate/HandleStickers"), HSu = require("./ModulesImmediate/HandleSurveys"),
      HR = require("./ModulesMiscellaneous/HandleRest");
//Whatsapp control module
const wa = require("@open-wa/wa-automate");
//Schedule module and it's configuration
const schedule = require('node-schedule');
const rule = new schedule.RecurrenceRule();
rule.tz = 'Israel'; //Time zone

//TODO: add something to the bot's about section
//TODO: add a function to reset a group's DB
//TODO: add function to allow select users of a group to modify it's DB
//TODO: add an option for a private link in a user's DMs to modify info in the group's DB
//Local storage of data to not require access to the database at all times
let groupsDict = {}, restUsers = [], restGroups = [], restGroupsSpam = [];
//Group rest intervals
const groupCommandResetInterval = 15 * 60 * 1000 //When to reset the filter counter (in ms)
const groupRestResetInterval = 5 * 60 * 1000; //When to reset the groups muted (in ms)
const limitFilter = 15; //Filter Limit

//Get all the groups from mongoDB and make an instance of every group object in every group
HDB.GetAllGroupsFromDB(groupsDict, function () {
    wa.create({headless: false}).then(client => start(client));
});

/*
Handle filters - add filter, remove filter, edit filters, show filters and respond to filter
Input: client and message
Output: None
*/
async function handleFilters(client, message) {
    let bodyText = message.body;
    const chatID = message.chat.id;
    const messageID = message.id;
    if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "add_filter"))) { //Handle add filter
        await HF.addFilter(client, bodyText, chatID, messageID, groupsDict, limitFilter, restGroupsSpam);
    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "remove_filter"))) { //Handle remove filter
        await HF.remFilter(client, bodyText, chatID, messageID, groupsDict, limitFilter, restGroupsSpam);
    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "edit_filter"))) { //Handle edit filter
        await HF.editFilter(client, bodyText, chatID, messageID, groupsDict, limitFilter, restGroupsSpam);
    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "show_filters"))) { //Handle show filters
        await HF.showFilters(client, chatID, messageID, groupsDict);
    } else { //Handle responding to filters
        if (chatID in groupsDict) {
            if (groupsDict[chatID].filterCounter < limitFilter) {
                await HF.checkFilters(client, bodyText, chatID, messageID, groupsDict, limitFilter, restGroupsSpam);
            } else if (groupsDict[chatID].filterCounter === limitFilter) {
                await client.sendText(chatID, HL.getGroupLang(groupsDict, chatID, "filter_spamming"));
                groupsDict[chatID].addToFilterCounter();
                restGroupsSpam.push(chatID);
            }
        }
    }
}

/*
Handle tags - add tag, remove tag, tag persons, tag everyone and show tags
Input: client and message
Output: None
*/
async function handleTags(client, message) { //TODO: add function to check where a user was last tagged
    let bodyText = message.body;
    const chatID = message.chat.id;
    const messageID = message.id;
    let quotedMsgID = messageID;

    if (message.quotedMsg != null)
        quotedMsgID = message.quotedMsg.id;
    let groupMembersArray = null;
    if (message.chat.isGroup)
        groupMembersArray = await client.getGroupMembersId(message.chat.id);

    if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "add_tag"))) { //Handle add tag
        await HT.tagEveryOne(client, bodyText, chatID, quotedMsgID, messageID, groupsDict);
    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "remove_tag"))) { //Handle remove tag
        await HT.checkTags(client, bodyText, chatID, quotedMsgID, messageID, groupsDict);
    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "tag"))) { //Handle tag someone
        await HT.addTag(client, bodyText, chatID, messageID, groupsDict, groupMembersArray);
    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "tag_everyone"))) { //Handle tag everyone
        await HT.remTag(client, bodyText, chatID, messageID, groupsDict);
    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "show_tags"))) { //Handle show tags
        await HT.showTags(client, chatID, messageID, groupsDict);
    }
}

/*
Handle birthdays - add birthday, remove birthday and show birthdays
Input: client and message
Output: None
*/
async function handleBirthdays(client, message) {
    let bodyText = message.body;
    const chatID = message.chat.id;
    const messageID = message.id;

    if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "add_birthday"))) { //Handle add birthday
        await HB.addBirthday(client, bodyText, chatID, messageID, groupsDict);
    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "remove_birthday"))) { //Handle remove birthday
        await HB.remBirthday(client, bodyText, chatID, messageID, groupsDict);
    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "show_birthDays"))) { //Handle show birthdays
        await HB.showBirthdays(client, chatID, messageID, groupsDict);
    }
}

/*
Handle tags - change language and show help
Input: client and message
Output: None
*/
async function handleLanguage(client, message) {
    let bodyText = message.body;
    const chatID = message.chat.id;
    const messageID = message.id;

    if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "change_language"))) { //Handle change language
        await HL.changeGroupLang(client, message, groupsDict);
    } else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "handle_Help"))) { //Handle show help
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

//Main function
function start(client) {
    schedule.scheduleJob('01 00 * * *', () => { //Check if there are birthdays everyday at 6 am
        HB.checkBirthday(client, groupsDict)
    });
    client.onAddedToGroup(async chat => { //Sends a starting help message when added to a group
        await client.sendText(chat,
            "*Hello, I'm Alex!*" +
            "\n To change my language type 'Change language to [language you want to change to]'" +
            "\n The default language is Hebrew" +
            "\n To display a help message type 'Show help' in the default language" +
            "\n שלום, אני אלכס!" +
            "\n כדי לשנות שפה כתבו 'שנה שפה ל[שפה שאתם רוצים לשנות לה]'" +
            "\n השפה בררת המחדל היא עברית" +
            "\n כדי להציג את הודעת העזרה כתבו 'הראה עזרה' בשפה בררת המחדל")
    });
    client.onMessage(async message => { //Check every function every time a message is received
        if (message != null) {
            //Handle user rest due to admin
            await HR.handleUserRest(client, message, restUsers);
            //Handle group rest due to admin or due to spam
            await HR.handleGroupRest(client, message, restGroups, restGroupsSpam);
            //If both the user who sent the message and group the message was sent in are allowed, proceed to the functions
            if (!restUsers.includes(message.author) && !restGroups.includes(message.chat.id) &&
                !restGroupsSpam.includes(message.chat.id)) {
                await handleFilters(client, message); //Handle filters
                await handleTags(client, message); //Handle tags
                await handleBirthdays(client, message); //Handle birthdays
                await handleLanguage(client, message); //Handle language and help
                await HSi.handleStickers(client, message, groupsDict); //Handle stickers
                await HURL.stripLinks(client, message, groupsDict); //Handle URLs
                await HSu.makeButton(client, message, groupsDict); //Handle surveys
            }
        }
    });
}
