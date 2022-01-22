import {HL} from "../ModulesDatabase/HandleLanguage.js";

export class HW {
    static async sendLink(client, chatID, groupsDict) {
        await client.sendText(chatID, HL.getGroupLang(groupsDict, chatID, "show_webpage_reply", "~TBD~"));
    }
}