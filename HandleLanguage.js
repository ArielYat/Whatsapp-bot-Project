const HDB = require("./HandleDB"), stringLang = require("./StringLang");
const util = require("util");

class HandleLanguage {
    static async changeGroupLang(client, message, groupsDict) {
        const chatID = message.chat.id;
        let text = message.body;
        let langCode;
        let textArray = text.split(" ");
        if (chatID in groupsDict) {
            if (textArray[2] === "לעברית" || textArray[3] === "Hebrew") {
                langCode = "he";
                await client.sendText(chatID, "השפה שונתה בהצלחה");
            } else if (textArray[3] === "English" || textArray[2] === "לאנגלית") {
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

    static getGroupLang(groupDict, chatID, parameter, value1 = null, value2 = null) {
        let lang;
        let strToReturn;
        if (chatID in groupDict) {
            const group = groupDict[chatID];
            lang = group.language;
        } else {
            lang = "he";
        }
        let str = stringLang.strings[parameter][lang];
        if (parameter === "add_filter_reply_exists") {
            strToReturn = util.format(str, value1, value1, value2);
        } else if (value1 != null && value2 != null) {
            strToReturn = util.format(str, value1, value2);
        } else if (value1 != null) {
            strToReturn = util.format(str, value1);
        } else {
            strToReturn = str;
        }
        return strToReturn
    }
}

module.exports = HandleLanguage;