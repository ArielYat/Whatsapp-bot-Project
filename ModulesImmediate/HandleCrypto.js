const HL = require("../ModulesDatabase/HandleLanguage");
const requestInfo = require("node-fetch");

class HC {
    static async fetchCryptocurrency(client, chatID, messageID, groupsDict) {
        if (!groupsDict[chatID].cryptoCheckedToday) {
            try {
                let response = await requestInfo(
                    'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
                        method: 'GET',
                        headers: {
                            'X-CMC_PRO_API_KEY': '342e0747-1402-4df4-98f2-bdf12e3dd8d2',
                            'Accept': 'application/json'
                        },
                    }
                );
                response = await response.json()
                let stringForSending = "";
                for (let i = 0; i < 10; i++)
                    stringForSending += "1 [" + response.data[i].symbol + "] = " + response.data[i].quote.USD.price + "$\n";
                groupsDict[chatID].cryptoCheckedToday = true;
                client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "crypto_check_reply", stringForSending), messageID);
            } catch (err) {
                client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "crypto_api_error"), messageID);
            }
        } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "crypto_limit_error"), messageID);
    }
}

module.exports = HC;