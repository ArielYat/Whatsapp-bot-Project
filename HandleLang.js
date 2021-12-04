class HandleLang {
    static async changeGroupLang(client, message, groupsDict) {
        const chatID = message.chat.id;
        let text = message.body;
        if (text.startsWith("שנה שפה") || text.startsWith("Change lang")) {
            let langCode;
            let textArray = text.split(" ");
            if (chatID in groupsDict) {
                if (textArray[2] === "עברית") {
                    langCode = "he";
                } else if (textArray[2] === "English") {
                    langCode = "en";
                }
                if (langCode != null) {
                    groupsDict[chatID].changeLang(langCode);
                } else {
                    client.reply(chatID, "Only English or עברית are currently supported by the bot", message.id);
                }
            }
        }
    }
}

module.exports = HandleLang;