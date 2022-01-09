const HL = require("../ModulesDatabase/HandleLanguage");

class HSt {
    static async handleStickers(client, message, chatID, messageID, groupsDict) {
        const messageType = message.quotedMsgObj ? message.quotedMsgObj.type : message.type;
        message = message.quotedMsgObj ? message.quotedMsgObj : message;
        if (messageType === "image") {
            const mediaData = await client.decryptMedia(message);
            await client.sendImageAsSticker(chatID, mediaData, {author: "אלכסנדר הגדול", pack: "חצול"})
        } else if (messageType === "video") {
            const mediaData = await client.decryptMedia(message);
            await client.sendMp4AsSticker(chatID, mediaData, null, {author: "אלכסנדר הגדול", pack: "חצול"})
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "not_sticker_material_error"), messageID);
    }
}

module.exports = HSt;