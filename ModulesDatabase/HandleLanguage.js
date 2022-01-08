const HDB = require("./HandleDB.js"), Strings = require("../Strings.js").strings, util = require("util");

class HL {
    static async changeGroupLang(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.split(" ");
        const lang = bodyText.includes("לעברית") || bodyText.includes("Hebrew") || bodyText.includes("Hebraica")
            ? "he" : bodyText.includes("לאנגלית") || bodyText.includes("English") || bodyText.includes("Anglico")
                ? "en" : bodyText.includes("ללטינית") || bodyText.includes("Latin") || bodyText.includes("Latina")
                    ? "la" : null;
        if (lang) {
            await HDB.delArgsFromDB(chatID, null, "lang", function () {
                HDB.addArgsToDB(chatID, lang, null, null, "lang", function () {
                    groupsDict[chatID].groupLanguage = lang;
                    client.sendText(chatID, Strings["language_change_reply"][lang]);
                });
            });
        } else client.reply(chatID, Strings["language_change_error"][groupsDict[chatID].groupLanguage], messageID);
    }

    static getGroupLang(groupDict, chatID, parameter, value1 = null, value2 = null) {
        if (parameter === "add_filter_already_exists_error")
            return util.format(Strings[parameter][groupDict[chatID].groupLanguage], value1, value1, value2);
        if (value1 && value2)
            return util.format(Strings[parameter][groupDict[chatID].groupLanguage], value1, value2);
        if (value1)
            return util.format(Strings[parameter][groupDict[chatID].groupLanguage], value1);
        return Strings[parameter][groupDict[chatID].groupLanguage];
    }
}

module.exports = HL;
