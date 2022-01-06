const HDB = require("./HandleDB.js"), Strings = require("../Strings.js").strings, util = require("util");

class HL {
    static async changeGroupLang(client, bodyText, chatID, messageID, groupsDict) {
        let lang, textArray = bodyText.split(" ");

        lang = textArray.includes("לעברית") || textArray.includes("Hebrew") || textArray.includes("Hebraica")
            ? "he" : textArray.includes("לאנגלית") || textArray.includes("English") || textArray.includes("Anglico")
                ? "en" : textArray.includes("ללטינית") || textArray.includes("Latin") || textArray.includes("Latina")
                    ? "la" : null;

        if (lang) {
            groupsDict[chatID].groupLanguage = lang;
            await HDB.delArgsFromDB(chatID, null, "lang", function () {
                HDB.addArgsToDB(chatID, lang, null, null, "lang", function () {
                    if (lang === "he")
                        client.sendText(chatID, Strings["language_change_reply"]["he"]);
                    else if (lang === "en")
                        client.sendText(chatID, Strings["language_change_reply"]["en"]);
                    else if (lang === "la")
                        client.sendText(chatID, Strings["language_change_reply"]["la"]);
                });
            });
        } else client.reply(chatID, Strings["language_change_error"][groupsDict[chatID].groupLanguage], messageID);
    }

    static getGroupLang(groupDict, chatID, parameter, value1 = null, value2 = null) {
        let lang;
        if (chatID in groupDict)
            lang = groupDict[chatID].groupLanguage;
        else lang = "he";

        if (parameter === "add_filter_already_exists_error")
            return util.format(Strings[parameter][lang], value1, value1, value2);
        if (value1 != null && value2 != null)
            return util.format(Strings[parameter][lang], value1, value2);
        if (value1 != null)
            return util.format(Strings[parameter][lang], value1);
        return Strings[parameter][lang];
    }
}

module.exports = HL;
