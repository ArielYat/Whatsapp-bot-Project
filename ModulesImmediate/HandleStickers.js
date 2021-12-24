const HL = require("../ModulesDatabase/HandleLanguage");

class HSi {
    static async handleStickers(client, message, chatID, messageID, messageType, groupsDict) {
        if (messageType === "image") {
            const mediaData = await client.decryptMedia(message);
            await client.sendImageAsSticker(chatID, mediaData, {author: "אלכסנדר הגדול", pack: "חצול"})
        } else if (messageType === "video") {
            const mediaData = await client.decryptMedia(message);
            await client.sendMp4AsSticker(chatID, mediaData, {author: "אלכסנדר הגדול", pack: "חצול"})
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "not_sticker_material_error"), messageID);
    }
}

module.exports = HSi;