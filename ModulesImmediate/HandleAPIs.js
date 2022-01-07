const HL = require("../ModulesDatabase/HandleLanguage");
const requestInfo = require("node-fetch"), request = require("request");

class HAPI {
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
                    stringForSending += `1 [${response.data[i].symbol}] = "${response.data[i].quote.USD.price}$\n`;
                groupsDict[chatID].cryptoCheckedToday = true;
                client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "crypto_check_reply", stringForSending), messageID);
            } catch (err) {
                client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "crypto_api_error"), messageID);
            }
        } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "crypto_limit_error"), messageID);
    }

    static async searchUrbanDictionary(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "search_in_urban"), "").trim();
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
            let stringForSending = HL.getGroupLang(groupsDict, chatID, "search_in_urban_reply") + "\n\n";
            if (response.list.length !== 0) {
                for (let i = 0; i < response.list.length && i < 100; i++)
                    stringForSending += `*Definition ${i}* \n - ${response.list[i].definition}\n Definition by: ${response.list[i].author} \n\n`;
                await client.reply(chatID, stringForSending, messageID);
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "search_in_urban_error"), messageID);
        } catch (err) {
            client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "search_in_urban_error"), messageID);
        }
    }

    static async Translate(client, bodyText, chatID, messageID, groupsDict) {
        if (groupsDict[chatID].translateCounter < 5) {
            bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "translate"), "").trim();
            let lang, textToTranslate;
            if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "english_lang"))) {
                lang = "en";
                textToTranslate = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "english_lang"), "").trim();
            } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "hebrew_lang"))) {
                lang = "he";
                textToTranslate = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "hebrew_lang"), "").trim();
            } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "chinese_lang"))) {
                lang = "zh";
                textToTranslate = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "chinese_lang"), "").trim();
            } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "mandarin_lang"))) {
                lang = "zh";
                textToTranslate = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "mandarin_lang"), "").trim();
            } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "hindi_lang"))) {
                lang = "hi";
                textToTranslate = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "hindi_lang"), "").trim();
            } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "indian_lang"))) {
                lang = "hi";
                textToTranslate = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "indian_lang"), "").trim();
            } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "spanish_lang"))) {
                lang = "es";
                textToTranslate = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "spanish_lang"), "").trim();
            } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "french_lang"))) {
                lang = "fr";
                textToTranslate = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "french_lang"), "").trim();
            } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "arabic_lang"))) {
                lang = "ar";
                textToTranslate = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "arabic_lang"), "").trim();
            } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "bengali_lang"))) {
                lang = "bn";
                textToTranslate = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "bengali_lang"), "").trim();
            } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "russian_lang"))) {
                lang = "ru";
                textToTranslate = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "russian_lang"), "").trim();
            } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "portuguese_lang"))) {
                lang = "pt";
                textToTranslate = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "portuguese_lang"), "").trim();
            } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "indonesian_lang"))) {
                lang = "id";
                textToTranslate = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "indonesian_lang"), "").trim();
            } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "urdu_lang"))) {
                lang = "ur";
                textToTranslate = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "urdu_lang"), "").trim();
            } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "italian_lang"))) {
                lang = "it";
                textToTranslate = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "italian_lang"), "").trim();
            } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "persian_lang"))) {
                lang = "fa";
                textToTranslate = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "persian_lang"), "").trim();
            } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "romanian_lang"))) {
                lang = "ro";
                textToTranslate = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "romanian_lang"), "").trim();
            } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "greek_lang"))) {
                lang = "el";
                textToTranslate = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "greek_lang"), "").trim();
            } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "german_lang"))) {
                lang = "de";
                textToTranslate = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "german_lang"), "").trim();
            } else if (bodyText.match(HL.getGroupLang(groupsDict, chatID, "esperanto_lang"))) {
                lang = "eo";
                textToTranslate = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "esperanto_lang"), "").trim();
            }
            if (lang != null) {
                let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${textToTranslate}`
                url = encodeURI(url);
                request.get(url, async function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        const arrayWord = body.split(",");
                        const translateWord = arrayWord[0].replace("[[[", "");
                        groupsDict[chatID].translateCounter += 1;
                        await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "translate_reply") + translateWord, messageID);
                    }
                }, null);
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "translate_language_error"), messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "translate_language_limit"), messageID);
    }
    }

module.exports = HAPI;