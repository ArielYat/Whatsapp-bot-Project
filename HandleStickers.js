const HL = require("./HandleLanguage");

class HSi {
    static async handleStickers(client, message, groupsDict) {
        const textMessage = message.body;

        if (textMessage.startsWith(HL.getGroupLang(groupsDict, message.chat.id, "make_sticker"))) {
            if (message.quotedMsg != null) {
                const quotedMsg = message.quotedMsg;
                if (message.quotedMsg.type === "image") {
                    const mediaData = await client.decryptMedia(quotedMsg);
                    await client.sendImageAsSticker(
                        message.from,
                        mediaData, {author: "אלכסנדר הגדול", pack: "חצול"}
                    )
                } else {
                    client.reply(message.from,
                        HL.getGroupLang(groupsDict, message.chat.id, "not_image"), message.id);
                }
            } else {
                client.reply(message.from,
                    HL.getGroupLang(groupsDict, message.chat.id, "no_quoted_message"),
                    message.id);
            }
        }
    }
}

module.exports = HSi;