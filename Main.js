const group = require("./Group");
const HDB = require("./HandleDB");
const HF = require("./HandleFilters");
const HT = require("./HandleTags");
const HURL = require("./HandleURL");
const wa = require("@open-wa/wa-automate");
let groupsDict = {};
let restGroups = [];
let restUsers = [];
let restGroupsAuto = [];
const the_interval_pop = 10 * 60 * 1000;
const the_interval_reset = 3 * 60 * 1000;
const limitFilter = 15;

//get all groups from mongoDB and make instance of group object to every group
HDB.GetAllGroupsFromDB(groupsDict, function (groupsDict) {
    wa.create({ headless: false, multiDevice: true }).then(client => start(client));
});

//input client message
//handling filters - add filters, remove filter, edit filters and response to filters
async function handleFilters(client, message) {
    let bodyText = message.body;
    const chatID = message.chat.id;
    const messageID = message.id;

    if (bodyText.startsWith("הוסף פילטר")) {
        await HF.add(client, bodyText, chatID, messageID, groupsDict);
    }
    else if (bodyText.startsWith("הסר פילטר")) {
        await HF.rem(client, bodyText, chatID, messageID, groupsDict);
    }
    else if (bodyText.startsWith("ערוך פילטר")) {
        await HF.edit(client, bodyText, chatID, messageID, groupsDict);
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

//handling Tags - add tag to dict remove tag  tag everyone and answer to tag
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

//convertPhotoToASticker
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
//handle User Rest
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
//handle group Rest
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
//reset counter of filters of all groups every 3 min
setInterval(function () {
    for (let group in groupsDict) {
        groupsDict[group].filterCounterRest();
    }
}, the_interval_pop);

//unlock all groups from rest list every 10 min
setInterval(function () {
    while (restGroupsAuto.length > 0) {
        restGroupsAuto.pop();
    }
}, the_interval_reset);

//send all options of the bot menu
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

function start(client) {
    client.onMessage(async message => {
        if (message != null) {
            await handleUserRest(client, message);
            await handleGroupRest(client, message);
            if (!restUsers.includes(message.author) && !restGroups.includes(message.chat.id) &&
                !restGroupsAuto.includes(message.chat.id)) {
                await handleFilters(client, message);
                await handleTags(client, message);
                await handleStickers(client, message);
                await HURL.stripLinks(client, message);
                await sendHelp(client, message);
            }
        }
    });
}