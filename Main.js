const group = require("./group");
const DBH = require("./DBHandle");
const FIH = require("./HandleFIlters");
const TAG = require("./tagHandling");
const HURL = require("./URLHandle");
const wa = require("@open-wa/wa-automate");
let groupsDict = {};
let restGroups = [];
let restUsers = [];
const the_interval = 5 * 60 * 1000;
const limitFilter = 25;

DBH.GetAllGroupsFromDB(groupsDict, function (groupsDict){
    wa.create({headless: false}).then(client => start(client));
});

async function handleFilters(client, message) {
    let bodyText = message.body;
    const chatID = message.chat.id;
    const messageID = message.id;

    if(bodyText.startsWith("הוסף פילטר")){
        await FIH.add(client, bodyText, chatID, messageID, groupsDict);
    }
    else if(bodyText.startsWith("הסר פילטר")){
        await FIH.rem(client, bodyText, chatID, messageID, groupsDict);
    }
    else if(bodyText.startsWith("ערוך פילטר")){
        await FIH.edit(client, bodyText, chatID, messageID, groupsDict);
    }
    else if(bodyText.startsWith("הראה פילטרים")) {
        await FIH.showFilters(client, chatID, messageID, groupsDict);
    }

    else{
        if(groupsDict[chatID].filterCounter < limitFilter) {
            await FIH.checkFilters(client, bodyText, chatID, messageID, groupsDict);
        }
        else if(groupsDict[chatID].filterCounter === limitFilter){
            await client.sendText(chatID, "וואי וואי כמה פילטרים שולחים פה אני נח ל5 דקות מפילטרים");
            groupsDict[chatID].addToFilterCounter();
        }
    }
}

async function handleTags(client, message) {
    let bodyText = message.body;
    const chatID = message.chat.id;
    const messageID = message.id;
    let quotedMsgID = messageID;
    if(message.quotedMsg != null){
        quotedMsgID = message.quotedMsg.id;
    }
    let groupMembersArray = null;
    if(message.chat.isGroup) {
        groupMembersArray = await client.getGroupMembersId(message.chat.id);
    }

    if(bodyText.startsWith("הוסף חבר לתיוג")){
        await TAG.addTag(client, bodyText, chatID, messageID, groupsDict, groupMembersArray);
    }
    else if(bodyText.startsWith("הסר חבר מתיוג")){
        await TAG.remTag(client, bodyText, chatID, messageID, groupsDict);
    }
    else if(bodyText.startsWith("הראה רשימת חברים לתיוג")) {
        await TAG.showTags(client, chatID, messageID, groupsDict);
    }
    else if(bodyText.startsWith("תייג כולם")){
        await TAG.tagEveryOne(client, bodyText, chatID, quotedMsgID, messageID, groupsDict);
    }
    else if (bodyText.startsWith("תייג ")){
        await TAG.checkTags(client, bodyText, chatID, quotedMsgID, messageID, groupsDict);
    }
}
async function handleStickers(client, message) {
    const textMessage = message.body;

    if(textMessage.startsWith("הפוך לסטיקר")){
        if (message.quotedMsg != null) {
            const quotedMsg = message.quotedMsg;
            if (message.quotedMsg.type === "image") {
                const mediaData = await client.decryptMedia(quotedMsg);
                await client.sendImageAsSticker(
                    message.from,
                    mediaData
                )
            }
            else{
                client.reply(message.from, "טיפש אי אפשר להפוך משהו שהוא לא תמונה לסטיקר", message.id);
            }
        }
        else{
            client.reply(message.from, "אתה אומר לי להפוך משהו לסטיקר אבל אתה לא אומר לי את מה", message.id);
        }
    }
}

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
                await client.sendReplyWithMentions(chatID,  "המשתמש @" + responseAuthor + "\n נחסם בהצלחה \n, May God have mercy on your soul", messageId);
            }
            else {
                client.reply(chatID, "רק כבודו יכול לחסום אנשים", messageId);
            }
        }

        if(textMessage.startsWith("אפשר גישה למשתמש")) {
            if (userID === "972543293155@c.us") {
                const userIdIndex = restUsers.indexOf(responseAuthor);
                restUsers.splice(userIdIndex, 1);
                await client.sendReplyWithMentions(chatID,  "המשתמש @" + responseAuthor + "\n שוחרר בהצלחה", messageId);
            }
            else{
                await client.reply(chatID, "רק כבודו יכול לשחרר אנשים", messageId);
            }
        }
    }
}
async function handleGroupRest(client, message) {
    const textMessage = message.body;
    const chatID = message.chat.id;
    const messageId = message.id;
    const responseGroupId = message.chat.id;
    const userID = message.sender.id;
    if (textMessage.startsWith("חסימת קבוצה")) {
        if (userID === "972543293155@c.us") {
            restGroups.push(responseGroupId);
            await client.reply(chatID,  "הקבוצה נחסמה בהצלחה", messageId);
        }
        else {
            client.reply(chatID, "רק ארדואן בכבודו ובעצמו יכול לחסום קבוצות", messageId);
        }
    }

    if(textMessage.startsWith("שחרור קבוצה")) {
        if (userID === "972543293155@c.us") {
            const groupIdIndex = restGroups.indexOf(responseGroupId);
            restGroups.splice(groupIdIndex, 1);
            await client.reply(chatID,  "הקבוצה שוחררה בהצלחה", messageId);
        }
        else{
            await client.reply(chatID, "רק ארדואן יכול לשחרר קבוצות", messageId);
        }
    }
}

setInterval(function() {
    for(let group in groupsDict){
        groupsDict[group].filterCounterRest();
    }
}, the_interval);

async function sendHelp(client, message) {
    let messageID = null;
    if(message.quotedMsg != null){
        messageID = message.quotedMsg.id;
    }
    else{
        messageID = message.id;
    }
    if(message.body.startsWith("רשימת פקודות"))
    {
        await client.reply("הוסף פילטר [פילטר] - [תשובה]" +
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
            "\n הוסף פילטר משה - אוכל [יוסי] יענה למשה אוכל @יוסי ויתייג את יוסי", messageID);
    }
}

function start(client) {
    client.onMessage(async message => {
        if(message != null) {
            await handleUserRest(client, message);
            await handleGroupRest(client, message);
            if (!restUsers.includes(message.author) && !restGroups.includes(message.chat.id)) {
                await handleFilters(client, message);
                await handleTags(client, message);
                await handleStickers(client, message);
                await HURL.stripLinks(client, message);
                await sendHelp(client, message);
            }
        }
    });
}