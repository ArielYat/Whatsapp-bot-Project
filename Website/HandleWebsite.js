const HL = require("../ModulesDatabase/HandleLanguage");

class HW {
    static async sendLink(client, chatID, groupsDict) {
        const link = "~TBD~";
        await client.sendText(chatID, HL.getGroupLang(groupsDict, chatID, "show_webpage_reply", link));
    }
}

module.exports = HW