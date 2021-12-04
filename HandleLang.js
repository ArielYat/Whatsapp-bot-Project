class HandleLang {
    static async changeGroupLang(client, message, groupsDict) {
        const chatID = message.chat.id;
        let text = message.body;
            let langCode;
            let textArray = text.split(" ");
            if (chatID in groupsDict) {
                if (textArray[2] === "עברית" || textArray[2] === "Hebrew") {
                    langCode = "he";
                }
                else if(textArray[2] === "English" || textArray[2] === "אנגלית"){
                    langCode = "en";
                    await client.sendText(chatID, "language changed successfully");
                }
                if (langCode != null) {
                    groupsDict[chatID].changeLang(langCode);
                } else {
                    client.reply(chatID, "Only English or Hebrew are currently supported by the bot", message.id);
                }
            }
        }
}

module.exports = HandleLang;