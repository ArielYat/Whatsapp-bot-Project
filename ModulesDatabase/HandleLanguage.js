import {HDB} from "./HandleDB.js";
import {Strings} from "../Strings.js";
import util from "util";

export class HL {
    static async changeGroupLang(client, bodyText, chatID, messageID, groupsDict) {
        const lang = bodyText.match(/לעברית/) || bodyText.match(/Hebrew/i) || bodyText.match(/Hebraica/i) || bodyText.match(/Hébreu/i)
            ? "he" : bodyText.match(/לאנגלית/) || bodyText.match(/English/i) || bodyText.match(/Anglico/i) || bodyText.match(/Anglais/i)
                ? "en" : bodyText.match(/ללטינית/) || bodyText.match(/Latin/i) || bodyText.match(/Latina/i) || bodyText.match(/Latin/i)
                    ? "la" : bodyText.match(/לצרפתית/) || bodyText.match(/France/i) || bodyText.match(/Gallica/i) || bodyText.match(/Français/i)
                        ? "fr" : null;
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
                await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "help_general_reply"), messageID);
                break;
            case !!(bodyText.match(HL.getGroupLang(groupsDict, chatID, "help_language"))):
                await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "help_language_reply"), messageID);
                break;
            case !!(bodyText.match(HL.getGroupLang(groupsDict, chatID, "help_filters"))):
                await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "help_filters_reply"), messageID);
                break;
            case !!(bodyText.match(HL.getGroupLang(groupsDict, chatID, "help_tags"))):
                await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "help_tags_reply"), messageID);
                break;
            case !!(bodyText.match(HL.getGroupLang(groupsDict, chatID, "help_birthdays"))):
                await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "help_birthdays_reply"), messageID);
                break;
            case !!(bodyText.match(HL.getGroupLang(groupsDict, chatID, "help_permissions"))):
                await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "help_permissions_reply"), messageID);
                break;
            case !!(bodyText.match(HL.getGroupLang(groupsDict, chatID, "help_reminders"))):
                await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "help_reminders_reply"), messageID);
                break;
            case !!(bodyText.match(HL.getGroupLang(groupsDict, chatID, "help_immediate"))):
                await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "help_immediate_reply"), messageID);
                break;
        }
    }
}