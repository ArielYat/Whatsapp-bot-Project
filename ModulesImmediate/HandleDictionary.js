const HL = require("../ModulesDatabase/HandleLanguage");
const requestInfo = require("node-fetch");

class HD {
    static async searchUrbanDictionary(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "search_word_in_urban"), "").trim();
        try {
            let url = "https://api.urbandictionary.com/v0/define?term=";
            url += bodyText;
            let response = await requestInfo(url,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                }
            );
            response = await response.json()
            let stringForSending = HL.getGroupLang(groupsDict, chatID, "search_word_reply") + "\n";
            if (response.list.length !== 0) {
                for (let i = 0; i < response.list.length && i < 100; i++)
                    stringForSending += `*Definition* ${i} \n` + response.list[i].definition +
                        "\n definition by: " + response.list[i].definition + " \n\n";
                await client.reply(chatID, stringForSending, messageID);
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "search_word_error"), messageID);
        } catch (err) {
            client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "search_word_error"), messageID);
        }
    }
}

module.exports = HD;