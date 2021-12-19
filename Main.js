//Files for the different modules
const HDB = require("./ModulesDatabase/HandleDB"), HL = require("./ModulesDatabase/HandleLanguage"),
    HURL = require("./ModulesImmediate/HandleURLs"), HF = require("./ModulesDatabase/HandleFilters"),
    HT = require("./ModulesDatabase/HandleTags"), HB = require("./ModulesDatabase/HandleBirthdays"),
    HSi = require("./ModulesImmediate/HandleStickers"), HSu = require("./ModulesImmediate/HandleSurveys"),
    HAF = require("./ModulesMiscellaneous/HandleAdminFunctions"), HW = require("./Website/HandleWebsite"),
    Strings = require("./Strings.js").strings;
//Whatsapp API module
const wa = require("@open-wa/wa-automate");
//Schedule module and its configuration
const schedule = require('node-schedule');
const rule = new schedule.RecurrenceRule();
rule.tz = 'Israel'; //Time zone
//Local storage of data to not require access to the database at all times (cache)
let groupsDict = {}, restUsers = [], restGroups = [], restGroupsFilterSpam = [], restUsersCommandSpam = [];
//Group & user rest intervals
const groupFilterCounterResetInterval = 15 * 60 * 1000; //When to reset the filter counter (in ms); 15 min
const userCommandCounterResetInterval = 20 * 60 * 1000; //When to reset the command counter (in ms); 20 min
const groupFilterRestResetInterval = 5 * 60 * 1000; //When  reset the groups in rest by filter spamming (in ms); 5 min
const userCommandRestResetInterval = 5 * 60 * 1000; //When to reset the users in rest by command spamming (in ms); 5 min
const groupFilterLimit = 15, userCommandLimit = 5; //Filter & Command Limit

//Start the bot - get all the groups from mongoDB (cache) and make an instance of every group object in every group
await HDB.GetAllGroupsFromDB(groupsDict, async function () {
    await wa.create({headless: true, multiDevice: true}).then(client => start(client));
});

//Reset filter counter for all groups every [groupFilterCounterResetInterval] minutes (automatic)
setInterval(function () {
    for (let group in groupsDict)
        groupsDict[group].filterCounter = 0;
}, groupFilterCounterResetInterval);

//Remove all groups from filter rest list every [groupFilterRestResetInterval] minutes (automatic)
setInterval(function () {
    while (restGroupsFilterSpam.length > 0)
        restGroupsFilterSpam.pop();
}, groupFilterRestResetInterval);

//Main function
function start(client) {
    //Check if there are birthdays everyday at 4 am
    schedule.scheduleJob('4 0 * * *', async () => {
        await HB.checkBirthdays(client, groupsDict);
    });
    //Sends a starting help message when added to a group
    client.onAddedToGroup().then(async chat => {
        await client.sendText(chat.id, Strings["start_message"]["all"]);
    });
    //Check every module every time a message is received
    client.onMessage().then(async message => {
            if (message != null) {
                const chatID = message.chat.id, messageID = message.id, messageAuthor = message.author,
                    messageType = message.type;
                let bodyText, quotedMsgID = null, quotedMsgAuthor = null, allGroupMembers = null;
                //define bodyText depending on messaged type
                if (message.body !== null && typeof message.body === "string")
                    bodyText = message.body; //if text message
                else
                    bodyText = message.caption; //if media
                //check if a message was quoted define its id and author
                if (message.quotedMsg) {
                    quotedMsgID = message.quotedMsg.id;
                    quotedMsgAuthor = message.quotedMsg.author;
                }
                //check if a chat is a group get its members
                if (message.chat.isGroup)
                    allGroupMembers = await client.getGroupMembersId(message.chat.id);

                //Handle admin functions
                await HAF.handleUserRest(client, bodyText, chatID, messageID, messageAuthor, quotedMsgID, quotedMsgAuthor, restUsers);
                await HAF.handleGroupRest(client, bodyText, chatID, messageID, messageAuthor, restGroups, restGroupsFilterSpam);
                await HAF.handleBotJoin(client, bodyText, chatID, messageID, messageAuthor);
                await HAF.ping(client, bodyText, chatID, messageID, messageAuthor)
                //If both the user who sent the message and group the message was sent in are aren't blocked,
                //proceed to regular modules
                if (!restUsers.includes(messageAuthor) && !restGroups.includes(chatID) && !restGroupsFilterSpam.includes(chatID)) {
                    await HF.checkFilters(client, bodyText, chatID, messageID, groupsDict, groupFilterLimit, restGroupsFilterSpam)
                    if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "tag_all"))) //Handle tag everyone
                        await HT.tagEveryOne(client, bodyText, chatID, messageID, quotedMsgID, groupsDict);
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "tag"))) //Handle tag someone
                        await HT.checkTags(client, bodyText, chatID, messageID, quotedMsgID, groupsDict);
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "make_sticker"))) //Handle stickers
                        await HSi.handleStickers(client, message, chatID, messageID, messageType, groupsDict);
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
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "show_birthDays"))) //Handle show birthdays
                        await HB.showBirthdays(client, chatID, messageID, groupsDict);
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "add_filter"))) //Handle add filter
                        await HF.addFilter(client, bodyText, chatID, messageID, groupsDict);
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "remove_filter"))) //Handle remove filter
                        await HF.remFilter(client, bodyText, chatID, messageID, groupsDict);
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "edit_filter"))) //Handle edit filter
                        await HF.editFilter(client, bodyText, chatID, messageID, groupsDict);
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "add_tag"))) //Handle add tag
                        await HT.addTag(client, bodyText, chatID, messageID, groupsDict, allGroupMembers);
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "remove_tag"))) //Handle remove tag
                        await HT.remTag(client, bodyText, chatID, messageID, groupsDict);
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "add_birthday"))) //Handle add birthday
                        await HB.addBirthday(client, bodyText, chatID, messageID, groupsDict);
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "remove_birthday"))) //Handle remove birthday
                        await HB.remBirthday(client, bodyText, chatID, messageID, groupsDict);
                    else if (bodyText.startsWith(HL.getGroupLang(groupsDict, chatID, "show_webpage"))) //Handle webpage link
                        await HW.sendLink(client, chatID, groupsDict);
                    else if (bodyText.startsWith(Strings["change_language"]["he"]) ||
                        bodyText.startsWith(Strings["change_language"]["en"]) ||
                        bodyText.startsWith(Strings["change_language"]["la"])) //Handle language change
                        await HL.changeGroupLang(client, bodyText, chatID, messageID, groupsDict);
                }
            }
        }
    );
}
//TODO: something to Alex's about
//TODO: cleaner function for groups that Alex isn't in anymore
//TODO: function to check where a user was last tagged
//TODO: options for images/gifs/videos/stickers as filters
//TODO: Dictionary/translations
//TODO: permissions
//TODO: a function to reset a group's DB/part of it
