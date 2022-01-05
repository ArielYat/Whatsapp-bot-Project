const HDB = require("./HandleDB"), Strings = require("../Strings.js").strings;
const util = require("util");

class HL {
    static async changeGroupLang(client, bodyText, chatID, messageID, groupsDict) {
        let lang, textArray = bodyText.split(" ");

        lang = textArray.includes("לעברית") || textArray.includes("Hebrew") || textArray.includes("Hebraica")
            ? "he" : textArray.includes("לאנגלית") || textArray.includes("English") || textArray.includes("Anglico")
                ? "en" : textArray.includes("ללטינית") || textArray.includes("Latin") || textArray.includes("Latina")
                    ? "la" : null;

        if (lang) {
            await HDB.chaArgsInDB(chatID, lang, null, null, "lang", async function () {
                groupsDict[chatID].groupLanguage = lang;
                if (lang === "he")
                    await client.sendText(chatID, Strings["language_change_reply"]["he"]);
                else if (lang === "en")
                    await client.sendText(chatID, Strings["language_change_reply"]["en"]);
                else if (lang === "la")
                    await client.sendText(chatID, Strings["language_change_reply"]["la"]);
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
