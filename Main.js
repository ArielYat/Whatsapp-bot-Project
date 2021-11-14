const group = require("./group");
const DBH = require("./DBHandle");
const FIH = require("./HandleFIlters");
const TAG = require("./tagHandling");
const HURL = require("./URLHandle");
const wa = require("@open-wa/wa-automate");
let groupsDict = {};
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
        await FIH.checkFilters(client, bodyText, chatID, messageID, groupsDict);
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
    else if (bodyText.startsWith("תייג")){
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
                client.reply(message.from, "אני חושש שאי אפשר להפוך הודעה זו לסטיקר", message.id);
            }
        }
        else{
            client.reply(message.from, "אתה אומר לי להפוך משהו לסטיקר אבל אתה לא אומר לי את מה", message.id);
        }
    }
}

function start(client) {
    client.onMessage(async message => {
        await handleFilters(client, message);
        await handleTags(client, message);
        await handleStickers(client, message);
        await HURL.stripLinks(client, message);
    });
}