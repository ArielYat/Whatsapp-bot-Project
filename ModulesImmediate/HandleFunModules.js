const requestInfo = require("node-fetch");
const HL = require("../ModulesDatabase/HandleLanguage");

class HFM {
    static async fetchCryptocurrency(client, chatID, messageID, groupsDict) {
        if(!groupsDict[chatID].cryptoCheckedToday) {
            try {
                let response = await requestInfo(
                    'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
                        method: 'GET',
                        headers: {
                            'X-CMC_PRO_API_KEY': '342e0747-1402-4df4-98f2-bdf12e3dd8d2',
                            'Accept': 'application/json'
                        },
                    },
                );
                response = await response.json()
                let stringForSending = "";
                for (let i = 0; i < 10; i++) {
                    stringForSending += "1 [" + response.data[i].symbol + "] = "
                        + response.data[i].quote.USD.price + " $ \n";
                }
                groupsDict[chatID].cryptoCheckedToday = true;
                client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "crypto_check_reply", stringForSending), messageID);
            } catch (err) {
                client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "crypto_check_error"), messageID);
            }
        }
        else{
            client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "crypto_check_limit"), messageID);
        }
    }
    static async checkWordOnUrbanDictionary(client, chatID, bodyText,messageID, groupsDict){
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "search_word"), "").trim();
        try{
            let url = "https://api.urbandictionary.com/v0/define?term=";
            url+= bodyText;
            let response = await requestInfo(url
                , {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                },
            );
            response = await response.json()
            let stringForSending = HL.getGroupLang(groupsDict, chatID, "search_word_reply") + "\n";
            if(response.list.length !== 0) {
                for (let i = 0; i < response.list.length; i++) {
                    stringForSending += response.list[i].author + " : " + response.list[i].definition + " \n" +
                        "thumbs_up : " + response.list[i].thumbs_up + "\n thumbs_down: " + response.list[0].thumbs_down + "\n\n"
                }
                await client.reply(chatID, stringForSending, messageID);
            }
            else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "search_word_error"), messageID);
        }
        catch (err){
            client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "search_word_error"), messageID);
        }

    }
}

module.exports = HFM;