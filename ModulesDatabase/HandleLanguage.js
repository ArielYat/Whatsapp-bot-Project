const HDB = require("./HandleDB.js"), Strings = require("../Strings.js").strings, util = require("util");

class HL {
    static async changeGroupLang(client, bodyText, chatID, messageID, groupsDict) {
        const lang = bodyText.match(/לעברית/) || bodyText.match(/hebrew/i) || bodyText.match(/hebraica/i)
            ? "he" : bodyText.match(/לאנגלית/) || bodyText.match(/english/i) || bodyText.match(/Anglico/i)
                ? "en" : bodyText.match(/ללטינית/) || bodyText.match(/latin/i) || bodyText.match(/latina/i)
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

    static async sendHelpMessage(client, bodyText, chatID, messageID, groupsDict) {
        switch (true) {
            case !!(bodyText.match(HL.getGroupLang(groupsDict, chatID, "help_general"))):
                await client.sendReplyWithMentions(chatID, HL.getGroupLang(groupsDict, chatID, "help_general_reply"), messageID);
                break;
            case !!(bodyText.match(HL.getGroupLang(groupsDict, chatID, "help_language"))):
                await client.sendReplyWithMentions(chatID, HL.getGroupLang(groupsDict, chatID, "help_language_reply"), messageID);
                break;
            case !!(bodyText.match(HL.getGroupLang(groupsDict, chatID, "help_filters"))):
                await client.sendReplyWithMentions(chatID, HL.getGroupLang(groupsDict, chatID, "help_filters_reply"), messageID);
                break;
            case !!(bodyText.match(HL.getGroupLang(groupsDict, chatID, "help_tags"))):
                await client.sendReplyWithMentions(chatID, HL.getGroupLang(groupsDict, chatID, "help_tags_reply"), messageID);
                break;
            case !!(bodyText.match(HL.getGroupLang(groupsDict, chatID, "help_birthdays"))):
                await client.sendReplyWithMentions(chatID, HL.getGroupLang(groupsDict, chatID, "help_birthdays_reply"), messageID);
                break;
            case !!(bodyText.match(HL.getGroupLang(groupsDict, chatID, "help_permissions"))):
                await client.sendReplyWithMentions(chatID, HL.getGroupLang(groupsDict, chatID, "help_permissions_reply"), messageID);
                break;
            case !!(bodyText.match(HL.getGroupLang(groupsDict, chatID, "help_reminders"))):
                await client.sendReplyWithMentions(chatID, HL.getGroupLang(groupsDict, chatID, "help_reminders_reply"), messageID);
                break;
            case !!(bodyText.match(HL.getGroupLang(groupsDict, chatID, "help_immediate"))):
                await client.sendReplyWithMentions(chatID, HL.getGroupLang(groupsDict, chatID, "help_immediate_reply"), messageID);
                break;
        }
    }
}

module.exports = HL;
