const HL = require("../ModulesDatabase/HandleLanguage");

class HW {
    static async sendLink(client, chatID, groupsDict) {
        await client.sendText(chatID, HL.getGroupLang(groupsDict, chatID, "show_webpage_reply", "~TBD~"));
    }
}

module.exports = HW