const HDB = require("./HandleDB"), stringLang = require("./Strings");
const util = require("util");

class HandleLanguage {
    static async changeGroupLang(client, message, groupsDict) {
        const chatID = message.chat.id;
        let text = message.body;
        let langCode;
        let textArray = text.split(" ");
        if (chatID in groupsDict) {
            if (textArray.find(element => element === "לעברית") != null) {
                langCode = "he";
                await client.sendText(chatID, "השפה שונתה בהצלחה");
            }
            if (textArray.find(element => element === "לאנגלית") != null) {
                langCode = "he";
                await client.sendText(chatID, "Language successfully changed");
            }
            if (textArray.find(element => element === "Hebrew") != null) {
                langCode = "he";
                await client.sendText(chatID, "השפה שונתה בהצלחה");
            }
            if (textArray.find(element => element === "English") != null) {
                langCode = "he";
                await client.sendText(chatID, "Language successfully changed");
            }

            if (langCode != null) {
                await HDB.delArgsFromDB(langCode, chatID, "lang", function () {
                    HDB.addArgsToDB(langCode, null, null, null,
                        chatID, "lang", function () {
                            groupsDict[chatID].language(langCode);
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