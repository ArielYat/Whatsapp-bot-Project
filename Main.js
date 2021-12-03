const group = require("./Group"), HDB = require("./HandleDB"), HF = require("./HandleFilters"),
    HT = require("./HandleTags"), HB = require("./HandleBirthdays"), HURL = require("./HandleURL");

//whatsapp module
const wa = require("@open-wa/wa-automate"), schedule = require('node-schedule');
//strings lang
const stringsHelp = require("./stringLang");
const HandleLang = require("./HandleLang");
//time schedule module
const rule = new schedule.RecurrenceRule();
rule.tz = 'Israel';

let groupsDict = {};
let restGroups = [];
let restUsers = [];
let restGroupsAuto = [];
const the_interval_pop = 10 * 60 * 1000; //in ms
const the_interval_reset = 3 * 60 * 1000; //in ms
const limitFilter = 15;

//Get all the groups from mongoDB and make an instance of every group object in every group
HDB.GetAllGroupsFromDB(groupsDict, function (groupsDict) {
    wa.create({ headless: false }).then(client => start(client));
});

//Handle filters - add, remove & edit filters and respond to them
async function handleFilters(client, message) {
    let bodyText = message.body;
    const chatID = message.chat.id;
    const messageID = message.id;
    if (bodyText.startsWith(stringsHelp.getGroupLang(groupsDict, chatID, "add_filter"))) {
        await HF.addFilter(client, bodyText, chatID, messageID, groupsDict);
    }
    else if (bodyText.startsWith(stringsHelp.getGroupLang(groupsDict, chatID, "remove_filter"))) {
        await HF.remFilter(client, bodyText, chatID, messageID, groupsDict);
    }
    else if (bodyText.startsWith(stringsHelp.getGroupLang(groupsDict, chatID, "edit_filter"))) {
        await HF.editFilter(client, bodyText, chatID, messageID, groupsDict);
    }
    else if (bodyText.startsWith(stringsHelp.getGroupLang(groupsDict, chatID, "show_filters"))) {
        await HF.showFilters(client, chatID, messageID, groupsDict);
    }
    else {
        if (chatID in groupsDict) {
            if (groupsDict[chatID].filterCounter < limitFilter) {
                await HF.checkFilters(client, bodyText, chatID, messageID, groupsDict, limitFilter, restGroupsAuto);
            }
            else if (groupsDict[chatID].filterCounter === limitFilter) {
                await client.sendText(chatID, stringsHelp.getGroupLang(groupsDict, chatID, "filter_spamming"));
                groupsDict[chatID].addToFilterCounter();
                restGroupsAuto.push(chatID);
            }
        }
    }
}

//Handle Tags - add & remove tags to/from dict, tag everyone and answer to them
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

    if (bodyText.startsWith(stringsHelp.getGroupLang(groupsDict, chatID, "tag"))) {
        await HT.checkTags(client, bodyText, chatID, quotedMsgID, messageID, groupsDict);
    }
    else if (bodyText.startsWith(stringsHelp.getGroupLang(groupsDict, chatID, "add_tag"))) {
        await HT.addTag(client, bodyText, chatID, messageID, groupsDict, groupMembersArray);
    }
    else if (bodyText.startsWith(stringsHelp.getGroupLang(groupsDict, chatID, "remove_tag"))) {
        await HT.remTag(client, bodyText, chatID, messageID, groupsDict);
    }
    else if (bodyText.startsWith(stringsHelp.getGroupLang(groupsDict, chatID, "tag_all"))) {
        await HT.tagEveryOne(client, bodyText, chatID, quotedMsgID, messageID, groupsDict);
    }
    else if (bodyText.startsWith(stringsHelp.getGroupLang(groupsDict, chatID, "show_tags"))) {
        await HT.showTags(client, chatID, messageID, groupsDict);
    }
}

//Handle birthdays - add, remove & edit birthdays and announce them
async function handleBirthdays(client, message) {
    let bodyText = message.body;
    const chatID = message.chat.id;
    const messageID = message.id;

    if (bodyText.startsWith(stringsHelp.getGroupLang(groupsDict, chatID, "add_birthDay"))) {
        await HB.addBirthday(client, bodyText, chatID, messageID, groupsDict);
    }
    else if (bodyText.startsWith(stringsHelp.getGroupLang(groupsDict, chatID, "remove_birthDay"))) {
        await HB.remBirthday(client, bodyText, chatID, messageID, groupsDict);
    }
    else if (bodyText.startsWith(stringsHelp.getGroupLang(groupsDict, chatID, "show_birthDays"))) {
        await HB.showBirthdays(client, chatID, messageID, groupsDict);
    }
}

//Convert photo to a sticker
async function handleStickers(client, message) {
    const textMessage = message.body;

    if (textMessage.startsWith(stringsHelp.getGroupLang(groupsDict, message.chat.id, "make_sticker"))) {
        if (message.quotedMsg != null) {
            const quotedMsg = message.quotedMsg;
            if (message.quotedMsg.type === "image") {
                const mediaData = await client.decryptMedia(quotedMsg);
                await client.sendImageAsSticker(
                    message.from,
                    mediaData, { author: "אלכסנדר הגדול", pack: "חצול" }
                )
            }
            else {
                client.reply(message.from,
                    stringsHelp.getGroupLang(groupsDict, message.chat.id, "make_sticker_not_image"), message.id);
            }
        }
        else {
            client.reply(message.from,
                stringsHelp.getGroupLang(groupsDict, message.chat.id, "make_sticker_not_not_reply_to_a_message"),
                message.id);
        }
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
            }
            else {
                client.reply(chatID, "רק כבודו יכול לחסום אנשים", messageId);
            }
        }

        if (textMessage.startsWith("אפשר גישה למשתמש")) {
            if (userID === "972543293155@c.us") {
                const userIdIndex = restUsers.indexOf(responseAuthor);
                restUsers.splice(userIdIndex, 1);
                await client.sendReplyWithMentions(chatID, "המשתמש @" + responseAuthor + "\n שוחרר בהצלחה", messageId);
            }
            else {
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
        }
        else {
            client.reply(chatID, "רק ארדואן בכבודו ובעצמו יכול לחסום קבוצות", messageId);
        }
    }

    if (textMessage.startsWith("שחרר קבוצה")) {
        if (userID === "972543293155@c.us") {
            const groupIdIndex = restGroups.indexOf(responseGroupId);
            restGroups.splice(groupIdIndex, 1);
            restGroupsAuto.splice(groupIdIndex, 1);
            await client.reply(chatID, "הקבוצה שוחררה בהצלחה", messageId);
        }
        else {
            await client.reply(chatID, "רק ארדואן יכול לשחרר קבוצות", messageId);
        }
    }
}

//Send a menu of all of the bot's options 
async function handleHelp(client, message) {
    let messageID;
    if (message.quotedMsg != null) {
        messageID = message.quotedMsg.id;
    }
    else {
        messageID = message.id;
    }
    if (message.body.startsWith("רשימת פקודות" || "Show help")) {
        await client.reply(message.chat.id,
            "*הוראות בעברית (אנגלית בהמשך)*" +                                   //Hebrew Instructions
            "\n לשינוי השפה לאנגלית - Change lang English" +
            "\n _פילטרים_" +
            "\n הוסף פילטר[פילטר] - [תגובת הבוט]" +
            "\n לדוגמה: הוסף פילטר אוכל - בננה" +
            "\n הסר פילטר [פילטר]" +
            "\n לדוגמה: הסר פילטר אוכל" +
            "\n ערוך פילטר [פילטר ישן] - [תשובה חדשה]" +
            "\n לדוגמה: ערוך פילטר אוכל - אפרסק" +
            "\n הראה פילטרים - מראה את רשימת הפילטרים הקיימים כעת" +
            "\n _תיוגים_" +
            "\n תייג [אדם]" +
            "\n לדוגמה: תייג יוסי" +
            "\n הוסף חבר לתיוג [אדם] - [מספר טלפון]" +
            "\n לדוגמה: הוסף חבר לתיוג יוסי - 972501234567" +
            "\n הסר חבר מתיוג [אדם]" +
            "\n לדוגמה: הסר חבר מתיוג יוסי" +
            "\n תייג כולם - מתייג את כל האנשים הנמצאים בקבוצה שיש להם תיוג מוגדר" +
            "\n הראה רשימת חברים לתיוג - מראה את רשימת החברים לתיוג" +
            "\n _ימי הולדת_" +
            "\n הוסף יום הולדת [אדם] - [שנה.חודש.יום]" +
            "\n לדוגמה: הוסף יום הולדת שלמה - 27.6.2021" +
            "\n הסר יום הולדת [אדם]" +
            "\n לדוגמה: הסר יום הולדת יוסי" +
            "\n הראה ימי הולדת - מראה את רשימת ימי ההולדת הקיימים כעת" +
            "\n _יצירת סטיקרים_ " +
            "\n הפוך לסטיקר - הבוט הופך לסטיקר את התמונה שמשיבים אליה" +
            "\n _סריקת קישורים_ "+
            "\n סרוק [קישור] - הבוט יסרוק את הקישור הנתון לוירוסים ויקבע אם הוא בטוח" +
            "\n _טיפ מיוחד!_ " +
            "\n בהוספת פילטר אפשר גם להשתמש ב־[שם] בשביל לתייג מישהו בפילטר" +
            "\n לדוגמה: 'הוסף פילטר אוכל - [יוסי]' יגרום לבוט לענות '@יוסי' ולתייג את יוסי" +
            "\n *English Instructions*" +                                              // English Instructions
            "\n to change lang to hebrew - שנה שפה עברית" +
            "\n _Filters_" +
            "\n Add filter [filter] - [bot response]" +
            "\n For example: Add filter food - banana" +
            "\n Remove filter food" +
            "\n For example: Remove filter food" +
            "\n Edit filter [old filter] - [new response]" +
            "\n For example: Edit filter food - peach" +
            "\n Show filters - displays a list of filters defined in the group" +
            "\n _Tags_" +
            "\n Tag [person]" +
            "\n For example: Tag Joseph" +
            "\n Add tag buddy [person] - [phone number]" +
            "\n For example: Add tag buddy Joseph - 972501234567" +
            "\n Remove tag buddy [person]" +
            "\n For example: Remove tag buddy Joseph" +
            "\n Tag everyone - tags all people in the group who have a set tag" +
            "\n Show tag buddies - displays a list of all tags defined in the group" +
            "\n _Birthdays_" +
            "\n Add birthday [person] - [day.month.year]" +
            "\n For example: Add birthday Joseph - 27.6.2021" +
            "\n Remove birthday [person]" +
            "\n For example: Remove birthday Joseph" +
            "\n Show birthdays - displays a list of all birthdays defined in the group" +
            "\n _Sticker Making_" +
            "\n Make into sticker - the bot makes the replied to image into a sticker and sends it" +
            "\n _Link Scanning_" +
            "\n Scan [link] - Scans the given link for viruses and determines if it's safe" +
            "\n _Special Tip!_" +
            "\n When creating a filter you can also use [person] to tag someone whenever the filter is invoked" +
            "\n For example: 'Add filter food - [Joseph]' will make the bot say 'Joseph' and tag Joseph"
            , messageID);
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
    schedule.scheduleJob('6 0 * * *', () =>
    {
        HB.checkBirthday(client, groupsDict)
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
                await handleStickers(client, message);
                await handleHelp(client, message);``
                await HURL.stripLinks(groupsDict, client, message);
                await HandleLang.changeGroupLang(client, message, groupsDict);
            }
        }
    });
}
