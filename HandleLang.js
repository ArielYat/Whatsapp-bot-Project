const HDB = require("./HandleDB");

class HandleLang {
    static async changeGroupLang(client, message, groupsDict) {
        const chatID = message.chat.id;
        let text = message.body;
            let langCode;
            let textArray = text.split(" ");
            if (chatID in groupsDict) {
                if (textArray[2] === "עברית" || textArray[3] === "Hebrew") {
                    langCode = "he";
                    await client.sendText(chatID, "השפה שונתה בהצלחה");
                }
                else if(textArray[3] === "English" || textArray[2] === "אנגלית") {
                    langCode = "en";
                    await client.sendText(chatID, "language changed successfully");
                }

                if (langCode != null) {
                    await HDB.delArgsFromDB(langCode, chatID, "lang", function () {
                        HDB.addArgsToDB(langCode, null, null, null,
                            chatID, "lang", function () {
                                groupsDict[chatID].changeLang(langCode);
                            })
                    });
                } else {
                    client.reply(chatID, "Only English or Hebrew are currently supported by the bot", message.id);
                }
            }
        }
}

module.exports = HandleLang;