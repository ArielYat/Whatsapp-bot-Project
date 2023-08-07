import HDB from "./HandleDB.js";
import {Strings} from "../Strings.js";
import util from "util";

export default class HL {
    static async changeGroupLang(client, bodyText, chatID, messageID, groupsDict) {
        const lang = bodyText.match(/לעברית/) || bodyText.match(/Hebrew/i) || bodyText.match(/Hébreu/i)
            ? "he" : bodyText.match(/לאנגלית/) || bodyText.match(/English/i) || bodyText.match(/Anglais/i)
                ? "en" : bodyText.match(/לצרפתית/) || bodyText.match(/France/i) || bodyText.match(/Français/i)
                    ? "fr" : null;
        if (!lang) {
            client.reply(chatID, Strings["language_change_error"][groupsDict[chatID].groupLanguage], messageID);
            return;
        }
        await HDB.delArgsFromDB(chatID, null, "lang", function () {
            HDB.addArgsToDB(chatID, lang, null, null, "lang", function () {
                groupsDict[chatID].groupLanguage = lang;
                client.sendText(chatID, Strings["language_change_reply"][lang]);
            });
        });
    }


    static async getGroupLang(groupDict, chatID, parameter, value1 = null, value2 = null, value3 = null, value4 = null) {
        if (parameter === "add_filter_already_exists_error")
            return util.format(Strings[parameter][groupDict[chatID].groupLanguage], value1, value1, value2);
        if (value1 && value2 && value3 && value4)
            return util.format(Strings[parameter][groupDict[chatID].groupLanguage], value1, value2, value3, value4);
        if (value1 && value2 && value3)
            return util.format(Strings[parameter][groupDict[chatID].groupLanguage], value1, value2, value3);
        if (value1 && value2)
            return util.format(Strings[parameter][groupDict[chatID].groupLanguage], value1, value2);
        if (value1)
            return util.format(Strings[parameter][groupDict[chatID].groupLanguage], value1);
        return Strings[parameter][groupDict[chatID].groupLanguage];
    }

    static async sendHelpMessage(client, bodyText, chatID, messageID, groupsDict) {
        switch (true) {
            case Strings["help_general"]["he"].test(bodyText) || Strings["help_general"]["en"].test(bodyText) || Strings["help_general"]["la"].test(bodyText) || Strings["help_general"]["fr"].test(bodyText):
                await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "help_general_reply"), messageID);
                break;
            case (await HL.getGroupLang(groupsDict, chatID, "help_language")).test(bodyText):
                await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "help_language_reply"), messageID);
                break;
            case (await HL.getGroupLang(groupsDict, chatID, "help_filters")).test(bodyText):
                await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "help_filters_reply"), messageID);
                break;
            case (await HL.getGroupLang(groupsDict, chatID, "help_tags")).test(bodyText):
                await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "help_tags_reply"), messageID);
                break;
            case (await HL.getGroupLang(groupsDict, chatID, "help_birthdays")).test(bodyText):
                await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "help_birthdays_reply"), messageID);
                break;
            case (await HL.getGroupLang(groupsDict, chatID, "help_permissions")).test(bodyText):
                await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "help_permissions_reply"), messageID);
                break;
            case (await HL.getGroupLang(groupsDict, chatID, "help_reminders")).test(bodyText):
                await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "help_reminders_reply"), messageID);
                break;
            case (await HL.getGroupLang(groupsDict, chatID, "help_stickers")).test(bodyText):
                await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "help_stickers_reply"), messageID);
                break;
            case (await HL.getGroupLang(groupsDict, chatID, "help_internet")).test(bodyText):
                await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "help_internet_reply"), messageID);
                break;
            case (await HL.getGroupLang(groupsDict, chatID, "help_others")).test(bodyText):
                await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "help_others_reply"), messageID);
                break;
        }
    }

    static async sendStartMessage(client, chatID) {
        let stringForSending = "";
        for (const [, startMessage] of Object.entries(Strings["start_message"]))
            stringForSending += `${startMessage}\n\n\n`;
        await client.sendText(chatID, stringForSending);
    }
}