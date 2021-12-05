const HDB = require("./HandleDB"), HL = require("HandleLanguage"), stringLang = require("../Strings");
const util = require("util");

class HandleLanguage {
    static async changeGroupLang(client, message, groupsDict) {
        const chatID = message.chat.id;
        let text = message.body;
        let langCode;
        let textArray = text.split(" ");
        if (chatID in groupsDict) {
            langCode = textArray.find(element => element === "לעברית") !== null ? "he" : null;
            if (langCode === null) {
                langCode = textArray.find(element => element === "Hebrew") !== null ? "he" : null;
                if (langCode === null) {
                    langCode = textArray.find(element => element === "לאנגלית") !== null ? "en" : null;
                    if (langCode === null) {
                        langCode = textArray.find(element => element === "English") !== null ? "en" : null;
                    }
                }
            }
            if (langCode !== null) {
                await HDB.delArgsFromDB(langCode, chatID, "lang", function () {
                    HDB.addArgsToDB(langCode, null, null, null,
                        chatID, "lang", function () {
                            groupsDict[chatID].language(langCode);
                        })
                });
                if (langCode === "he")
                    await client.sendText(chatID, stringLang.strings["language_change_reply"]["he"]);
                if (langCode === "en")
                    await client.sendText(chatID, stringLang.strings["language_change_reply"]["en"]);
            } else {
                client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "language_change_error_reply"), message.id);
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