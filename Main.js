import schedule from 'node-schedule'
const group = require("./Group"), HDB = require("./HandleDB"), HF = require("./HandleFilters"),
    HT = require("./HandleTags"), HB = require("./HandleBirthdays"), HURL = require("./HandleURL"),
    wa = require("@open-wa/wa-automate");
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
    if (textMessage.startsWith("חסימת קבוצה")) {
        if (userID === "972543293155@c.us") {
            restGroups.push(responseGroupId);
            await client.reply(chatID, "הקבוצה נחסמה בהצלחה", messageId);
        }
        else {
            client.reply(chatID, "רק ארדואן בכבודו ובעצמו יכול לחסום קבוצות", messageId);
        }
    }

    if (textMessage.startsWith("שחרור קבוצה")) {
        if (userID === "972543293155@c.us") {
            const groupIdIndex = restGroups.indexOf(responseGroupId);
            restGroups.splice(groupIdIndex, 1);
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
        await client.reply(message.chat.id, "הוסף פילטר [פילטר] - [תשובה]" +
            " \n לדוגמה: הוסף פילטר אוכל - בננה " +
            "\n הסר פילטר [פילטר]" +
            "\n לדוגמה הסר פילטר אוכל" +
            "\n ערוך פילטר [פילטר ישן] - [תשובה חדשה]" +
            "\n לדוגמה ערוך פילטר אוכל - אפרסק" +
            "\n תייג [אדם]" +
            "\n לדוגמה תייג יוסי" +
            "\n הוסף חבר לתיוג [שם] - [מספר טלפון]" +
            "\n לדוגמה הוסף חבר לתיוג [יוסי] - 972541234567" +
            "\n הסר מחבר תיוג [שם]" +
            "\n לדוגמה הסר חבר מתיוג יוסי" +
            "\n תייג כולם = מתייגת את כל האנשים הנמצאים בקבוצה" +
            "\n הפוך לסטיקר = הופך לסטיקר את התמונה המסומנת" +
            "\n הראה פילטרים = מראה את רשימת הפילטרים" +
            "\n הראה רשימת חברים לתיוג = מראה את רשימת החברים לתיוג" +
            "\n בהוספת פילטר אפשר להשתמש גם ב[שם] בשביל לתייג מישהו בפילטר לדוגמה" +
            "\n הוסף פילטר משה - אוכל [יוסי] יענה אוכל @יוסי ויתייג את יוסי", messageID);
    }
}

//Reset counter of filters of all groups every 3 min
setInterval(function () {
    for (let group in groupsDict) {
        groupsDict[group].filterCounterRest();
    }
}, the_interval_pop);

//Unlock all groups from rest list every 10 min
setInterval(function () {
    while (restGroupsAuto.length > 0) {
        restGroupsAuto.pop();
    }
}, the_interval_reset);

//Check if there are birthdays everyday at midnight
schedule.scheduleJob('0 0 * * *', () => {
    const today = new Date();
    const dayToday = today.getDate();
    const monthToday = today.getDate() + 1; //+1 'cause January is 0!

    for (const [chatID, object] of groupsDict.entries(groupsDict)) {
        for (const [birthdayBoy, day, month] of object.birthdays()) {
            if (day == dayToday && month == monthToday) {
                let stringForSending = "";
                let tags = groupsDict[chatID].tags;
                Object.entries(tags).forEach(([key, value]) => {
                    stringForSending += "@" + value + "\n";
                });
                stringForSending += "ל @" + birthdayBoy + " יש יום הולדת היום!!";
                await client.send(chatID, stringForSending)
            }
        }
    }
});

////Send Good Morning/Evening messages
//{
//    schedule.scheduleJob('0 7 * * *', () => {
//        for (const [chatID, object] of groupsDict.entries(groupsDict)) {
//            client.send(chatID, "בוקר טוב!")
//        }
//    });
//    schedule.scheduleJob('0 18 * * *', () => {
//        for (const [chatID, object] of groupsDict.entries(groupsDict)) {
//            client.send(chatID, "ערב נעים!")
//        }
//    });
//}

function start(client) {
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