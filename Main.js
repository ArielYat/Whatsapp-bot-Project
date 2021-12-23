//version 2.0

//Files for the different modules
const HDB = require("./ModulesDatabase/HandleDB"), HL = require("./ModulesDatabase/HandleLanguage"),
    HURL = require("./ModulesImmediate/HandleURLs"), HF = require("./ModulesDatabase/HandleFilters"),
    HT = require("./ModulesDatabase/HandleTags"), HB = require("./ModulesDatabase/HandleBirthdays"),
    HSi = require("./ModulesImmediate/HandleStickers"), HSu = require("./ModulesImmediate/HandleSurveys"),
    HAF = require("./ModulesMiscellaneous/HandleAdminFunctions"), HW = require("./Website/HandleWebsite"),
    Group = require("./Group"), Person = require("./Person"), Strings = require("./Strings.js").strings;
//Whatsapp API module
const wa = require("@open-wa/wa-automate");
//Schedule module and its configuration
const schedule = require('node-schedule');

//Local storage of data to not require access to the database at all times (cache)
let groupsDict = {}, usersDict = {}, restUsers = [], restGroups = [], restGroupsFilterSpam = [],
    restUsersCommandSpam = [];
//Group & user rest intervals
const groupFilterCounterResetInterval = 15 * 60 * 1000; //When to reset the filters counter (in ms); 15 min
const userCommandCounterResetInterval = 15 * 60 * 1000; //When to reset the command counter (in ms); 20 min
const groupFilterRestResetInterval = 5 * 60 * 1000; //When to reset the groups in rest by filters spamming (in ms); 5 min
const userCommandRestResetInterval = 5 * 60 * 1000; //When to reset the users in rest by command spamming (in ms); 5 min
const groupFilterLimit = 15, userCommandLimit = 5; //Filter & Command Limit
const botDevs = ["972543293155@c.us", "972586809911@c.us"]; //The bot developer's IDs

//Start the bot - get all the groups from mongoDB (cache) and make an instance of every group object in every group
await HDB.GetAllGroupsFromDB(groupsDict, usersDict, async function () {
    await wa.create({headless: true, multiDevice: true}).then(client => start(client));
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
    const IsraelSchedule = new schedule.RecurrenceRule();
    IsraelSchedule.tz = 'Israel'; //Time zone
    IsraelSchedule.scheduleJob('4 0 * * *', async () => {
        await HB.checkBirthdays(client, usersDict);
    });
    //Changelog!
    client.setMyStatus(Strings["about"]["all"]).then(aboutMe => console.log('"About me" successfully changed to "%s"', aboutMe));
    //Send a starting help message when added to a group
    client.onAddedToGroup().then(async chat => {
        await client.sendText(chat.id, Strings["start_message"]["all"]);
    });
    //Check every module every time a message is received
    client.onMessage().then(async message => {
        if (message != null) {
            const chatID = message.chat.id, authorID = message.author.id, messageID = message.id;
            let bodyText, quotedMsgID = message.quotedMsg.id;
            //define bodyText depending on messaged type
            if (message.body !== null && typeof message.body === "string")
                bodyText = message.body; //if the message is a text message
            else
                bodyText = message.caption; //if the message is a media message

            if (!(chatID in groupsDict))
                groupsDict[chatID] = new Group(chatID);
            if (!(groupsDict[chatID].personsIn.includes(authorID)))
                groupsDict[chatID].personsIn = ["add", authorID];
            if (!(authorID in usersDict))
                usersDict[authorID] = new Person(authorID);
            if (!chatID in usersDict[authorID].permissionLevel)
                usersDict[authorID].permissionLevel[chatID] = 0; //0 - everyone, 1 - group admin, 2 - group creator, 3 - bot dev
            //Handle bot developer functions
            if (botDevs.includes(authorID) || usersDict[authorID].permissionLevel === 3) {
                usersDict[authorID].permissionLevel[chatID] = 3;
                await HAF.handleUserRest(client, bodyText, chatID, messageID, quotedMsgID, restUsers);
                await HAF.handleGroupRest(client, bodyText, chatID, messageID, restGroups, restGroupsFilterSpam);
                await HAF.handleBotJoin(client, bodyText, chatID, messageID);
                await HAF.ping(client, bodyText, chatID, messageID)
            }

            //If the group the message was sent in isn't blocked, proceed to check filters
            if (!restGroups.includes(chatID) && !restGroupsFilterSpam.includes(chatID)) {
                await HF.checkFilters(client, bodyText, chatID, messageID, groupsDict, groupFilterLimit, restGroupsFilterSpam)
                //If the user who sent the message isn't blocked, proceed to regular modules
                if (!restUsers.includes(authorID) && !restUsersCommandSpam.includes(authorID)) {
                    if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "tag_all"))) //Handle tags everyone
                        await HT.tagEveryOne(client, bodyText, chatID, messageID, quotedMsgID, groupsDict, await client.getGroupMembersId(chatID));
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "tag"))) //Handle tags someone
                        await HT.checkTags(client, bodyText, chatID, messageID, quotedMsgID, groupsDict);
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "make_sticker"))) //Handle stickers
                        await HSi.handleStickers(client, message, chatID, messageID, message.type, groupsDict);
                    else if (bodyText.includes(HL.getGroupLang(groupsDict, chatID, "scan_link"))) //Handle URLs
                        await HURL.stripLinks(client, bodyText, chatID, messageID, groupsDict);
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "create_survey"))) //Handle surveys
                        await HSu.makeButton(client, bodyText, chatID, messageID, groupsDict);
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "help"))) //Handle show help
                        await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "help_reply"), messageID);
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "show_filters"))) //Handle show filters
                        await HF.showFilters(client, chatID, messageID, groupsDict);
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "show_tags"))) //Handle show tags
                        await HT.showTags(client, chatID, messageID, groupsDict);
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "show_birthdays"))) //Handle show birthday
                        await HB.showBirthdays(client, chatID, messageID, groupsDict);
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "add_filter"))) //Handle add filters
                        await HF.addFilter(client, bodyText, chatID, messageID, groupsDict);
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "remove_filter"))) //Handle remove filters
                        await HF.remFilter(client, bodyText, chatID, messageID, groupsDict);
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "edit_filter"))) //Handle edit filters
                        await HF.editFilter(client, bodyText, chatID, messageID, groupsDict);
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "add_tag"))) //Handle add tags
                        await HT.addTag(client, bodyText, chatID, messageID, groupsDict, await client.getGroupMembersId(chatID));
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "remove_tag"))) //Handle remove tags
                        await HT.remTag(client, bodyText, chatID, messageID, groupsDict);
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "add_birthday"))) //Handle add birthday
                        await HB.addBirthday(client, bodyText, chatID, messageID, groupsDict);
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "remove_birthday"))) //Handle remove birthday
                        await HB.remBirthday(client, bodyText, chatID, messageID, groupsDict);
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "add_group_birthDay"))) //Handle add this group birthday
                        await HB.addCurrentGroupToBirthDayBroadcastList(client, bodyText, chatID, messageID, groupsDict);
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "remove_group_birthDay"))) //Handle remove this group birthday
                        await HB.remCurrentGroupFromBirthDayBroadcastList(client, bodyText, chatID, messageID, groupsDict);
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "show_webpage"))) //Handle webpage link
                        await HW.sendLink(client, chatID, groupsDict);

                    else if (bodyText.startsWith(Strings["change_language"]["he"]) ||
                        bodyText.startsWith(Strings["change_language"]["en"]) ||
                        bodyText.startsWith(Strings["change_language"]["la"])) //Handle language change
                        await HL.changeGroupLang(client, bodyText, chatID, messageID, groupsDict);
                    else return;

                    userCommandLimit[authorID].addToCommandCounter();
                    if (usersDict[authorID].commandCounter === userCommandLimit) {
                        await client.sendText(chatID, HL.getGroupLang(groupsDict, chatID, "command_spam"));
                        restUsersCommandSpam.push(authorID);
                    }
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
//TODO: a function to reset a group's DB/part of it
