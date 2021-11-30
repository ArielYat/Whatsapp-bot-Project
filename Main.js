const group = require("./Group"), HDB = require("./HandleDB"), HF = require("./HandleFilters"),
    HT = require("./HandleTags"), HB = require("./HandleBirthdays"), HURL = require("./HandleURL");
const wa = require("@open-wa/wa-automate");
const schedule = require('node-schedule');
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
    wa.create({ headless: false, multiDevice: true }).then(client => start(client));
});

//Handle filters - add, remove & edit filters and respond to them
async function handleFilters(client, message) {
    let bodyText = message.body;
    const chatID = message.chat.id;
    const messageID = message.id;

    if (bodyText.startsWith("הוסף פילטר")) {
        await HF.addFilter(client, bodyText, chatID, messageID, groupsDict);
    }
    else if (bodyText.startsWith("הסר פילטר")) {
        await HF.remFilter(client, bodyText, chatID, messageID, groupsDict);
    }
    else if (bodyText.startsWith("ערוך פילטר")) {
        await HF.editFilter(client, bodyText, chatID, messageID, groupsDict);
    }
    else if (bodyText.startsWith("הראה פילטרים")) {
        await HF.showFilters(client, chatID, messageID, groupsDict);
    }
    else {
        if (chatID in groupsDict) {
            if (groupsDict[chatID].filterCounter < limitFilter) {
                await HF.checkFilters(client, bodyText, chatID, messageID, groupsDict, limitFilter, restGroupsAuto);
            }
            else if (groupsDict[chatID].filterCounter === limitFilter) {
                await client.sendText(chatID, "וואי וואי כמה פילטרים שולחים פה אני הולך לישון ל10 דקות");
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

    if (message.quotedMsg != null) {
        quotedMsgID = message.quotedMsg.id;
    }
    let groupMembersArray = null;
    if (message.chat.isGroup) {
        groupMembersArray = await client.getGroupMembersId(message.chat.id);
    }
    if (bodyText.startsWith("הוסף חבר לתיוג")) {
        await HT.addTag(client, bodyText, chatID, messageID, groupsDict, groupMembersArray);
    }
    else if (bodyText.startsWith("הסר חבר מתיוג")) {
        await HT.remTag(client, bodyText, chatID, messageID, groupsDict);
    }
    else if (bodyText.startsWith("הראה רשימת חברים לתיוג")) {
        await HT.showTags(client, chatID, messageID, groupsDict);
    }
    else if (bodyText.startsWith("תייג כולם")) {
        await HT.tagEveryOne(client, bodyText, chatID, quotedMsgID, messageID, groupsDict);
    }
    else if (bodyText.startsWith("תייג ")) {
        await HT.checkTags(client, bodyText, chatID, quotedMsgID, messageID, groupsDict);
    }
}

//Handle birthdays - add, remove & edit birthdays and announce them
async function handleBirthdays(client, message) {
    let bodyText = message.body;
    const chatID = message.chat.id;
    const messageID = message.id;

    if (bodyText.startsWith("הוסף יום הולדת")) {
        await HB.addBirthday(client, bodyText, chatID, messageID, groupsDict);
    }
    else if (bodyText.startsWith("הסר יום הולדת")) {
        await HB.remBirthday(client, bodyText, chatID, messageID, groupsDict);
    }
    else if (bodyText.startsWith("הראה ימי הולדת")) {
        await HB.showBirthdays(client, chatID, messageID, groupsDict);
    }
}

//Convert photo to a sticker
async function handleStickers(client, message) {
    const textMessage = message.body;

    if (textMessage.startsWith("הפוך לסטיקר")) {
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
                client.reply(message.from, "טיפש אי אפשר להפוך משהו שהוא לא תמונה לסטיקר", message.id);
            }
        }
        else {
            client.reply(message.from, "אתה אומר לי להפוך משהו לסטיקר אבל אתה לא אומר לי את מה", message.id);
        }
    }
}

//Hande user rest
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
async function sendHelp(client, message) {
    let messageID = null;
    if (message.quotedMsg != null) {
        messageID = message.quotedMsg.id;
    }
    else {
        messageID = message.id;
    }
    if (message.body.startsWith("רשימת פקודות")) {
        await client.reply(message.chat.id, "*פילטרים*" +
            "\n הוסף פילטר[פילטר] - [תשובה]" +
            "\n לדוגמה: הוסף פילטר אוכל - בננה " +
            "\n הסר פילטר [פילטר]" +
            "\n לדוגמה: הסר פילטר אוכל" +
            "\n ערוך פילטר [פילטר ישן] - [תשובה חדשה]" +
            "\n לדוגמה: ערוך פילטר אוכל - אפרסק" +
            "\n הראה פילטרים - מראה את רשימת הפילטרים הקיימים כעת" +
            "*תיוגים*" +
            "\n תייג [אדם]" +
            "\n לדוגמה: תייג יוסי" +
            "\n הוסף חבר לתיוג [אדם] - [מספר טלפון]" +
            "\n לדוגמה: הוסף חבר לתיוג יוסי - 972541234567" +
            "\n הסר חבר מתיוג [אדם]" +
            "\n לדוגמה: הסר חבר מתיוג יוסי" +
            "\n תייג כולם - מתייג את כל האנשים הנמצאים בקבוצה" +
            "\n הראה רשימת חברים לתיוג - מראה את רשימת החברים לתיוג" +
            "*ימי הולדת*" +
            "\n הוסף יום הולדת [אדם] - [חודש.יום]" +
            "\n לדוגמה: הוסף יום הולדת שלומה - 27.6" +
            "\n הסר יום הולדת [אדם]" +
            "\n לדוגמה: הסר יום הולדת יוסי" +
            "\n הראה ימי הולדת - מראה את רשימת ימי ההולדת הקיימים כעת" +
            "*יצירת סטיקרים*" +
            "\n הפוך לסטיקר - הופך לסטיקר את התמונה המסומנת" +
            "*טיפ מיוחד!*" +
            "\n בהוספת פילטר אפשר להשתמש גם ב[שם] בשביל לתייג מישהו בפילטר לדוגמה" +
            "\n הוסף פילטר משה - אוכל [יוסי] יענה אוכל @יוסי ויתייג את יוסי"
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
    //Check if there are birthdays everyday at midnight
    schedule.scheduleJob('0 6 * * *', () => {
        const today = new Date();
        const dayToday = today.getDate();
        const monthToday = today.getMonth() + 1; //+1 'cause January is 0!

        for (let group in groupsDict) {
            let currentGroup = groupsDict[group];
            for (let birthDay in currentGroup.birthdays) {
                if (currentGroup.birthdays[birthDay][0] == dayToday && currentGroup.birthdays[birthDay][1] == monthToday) {
                    let stringForSending = "מזל טוב ל" + birthDay;
                    client.sendText(currentGroup.groupID, stringForSending)
                }
            }
        }
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
                await HURL.stripLinks(client, message);
                await sendHelp(client, message);
            }
        }
    });
}
