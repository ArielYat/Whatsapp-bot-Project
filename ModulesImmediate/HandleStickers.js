const HL = require("../ModulesDatabase/HandleLanguage");

class HSi {
    static async handleStickers(client, bodyText, chatID, messageID, quotedMsg, groupsDict) {
        if (quotedMsg != null) {
            if (quotedMsg.type === "image") {
                const mediaData = await client.decryptMedia(quotedMsg);
                await client.sendImageAsSticker(chatID, mediaData, {author: "אלכסנדר הגדול", pack: "חצול"})
            } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "not_image_error"), messageID);
        } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "no_quoted_message_error"), messageID);
    }
}

module.exports = HSi;