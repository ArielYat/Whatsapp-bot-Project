const HL = require("../ModulesDatabase/HandleLanguage");

class HSt {
    static async handleStickers(client, message, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "make_sticker"), "");
        const messageType = message.quotedMsgObj ? message.quotedMsgObj.type : message.type;
        message = message.quotedMsgObj ? message.quotedMsgObj : message;
        const noCrop = !!bodyText.match(HL.getGroupLang(groupsDict, chatID, "crop_sticker"));
        if (messageType === "image") {
            const mediaData = await client.decryptMedia(message);
            await client.sendImageAsSticker(chatID, mediaData, {author: "אלכסנדר הגדול", pack: "חצול", keepScale: noCrop})
        } else if (messageType === "video") {
            const mediaData = await client.decryptMedia(message);
            await client.sendMp4AsSticker(chatID, mediaData, null, {author: "אלכסנדר הגדול", pack: "חצול", keepScale: noCrop})
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "not_sticker_material_error"), messageID);
    }
}

module.exports = HSt;