const HDB = require("./HandleDB"), Strings = JSON.parse(require("../Strings.json"));
const util = require("util");

class HandleLanguage {
    static async changeGroupLang(client, message, groupsDict) {
        const chatID = message.chat.id;
        let text = message.body;
        let langCode;
        let textArray = text.split(" ");
        if (chatID in groupsDict) {
            langCode = langCode = textArray.find(element => element === "לעברית") !== null ? "he" : null;
            langCode = langCode === null ? langCode = textArray.find(element => element === "Hebrew") !== null ? "he" : null : {};
            langCode = langCode === null ? langCode = textArray.find(element => element === "Hebraice") !== null ? "he" : null : {};
            langCode = langCode === null ? langCode = textArray.find(element => element === "לאנגלית") !== null ? "en" : null : {};
            langCode = langCode === null ? langCode = textArray.find(element => element === "English") !== null ? "en" : null : {};
            langCode = langCode === null ? langCode = textArray.find(element => element === "Anglicus") !== null ? "en" : null : {};
            langCode = langCode === null ? langCode = textArray.find(element => element === "ללטינית") !== null ? "la" : null : {};
            langCode = langCode === null ? langCode = textArray.find(element => element === "Latin") !== null ? "la" : null : {}
            langCode = langCode === null ? langCode = textArray.find(element => element === "Latinus") !== null ? "la" : null : {}

            if (langCode !== null) {
                await HDB.delArgsFromDB(langCode, chatID, "lang", function () {
                    HDB.addArgsToDB(langCode, null, null, null,
                        chatID, "lang", function () {
                            groupsDict[chatID].language(langCode);
                        })
                });
                if (langCode === "he")
                    await client.sendText(chatID, Strings["language_change_reply"]["he"]);
                else if (langCode === "en")
                    await client.sendText(chatID, Strings["language_change_reply"]["en"]);
                else if (langCode === "en")
                    await client.sendText(chatID, Strings["language_change_reply"]["la"]);
            } else {
                let groupLang = groupsDict[chatID].language;
                client.reply(chatID, Strings["language_change_error_reply"][groupLang], message.id);
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
        let str = Strings[parameter][lang];
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