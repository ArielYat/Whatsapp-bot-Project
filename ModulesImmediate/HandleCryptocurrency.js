const requestInfo = require("node-fetch");
const HL = require("../ModulesDatabase/HandleLanguage");

class HC {
    static async fetchCryptocurrency(client, chatID, messageID, groupsDict) {
        try {
            const response = (await requestInfo(
                'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
                    method: 'POST',
                    body: "'X-CMC_PRO_API_KEY': '342e0747-1402-4df4-98f2-bdf12e3dd8d2'"
                },
            )).json();
            client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "crypto_check_reply", response), messageID);
        } catch (err) {
            client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "crypto_check_error"), messageID);
        }
    }
}

module.exports = HC;