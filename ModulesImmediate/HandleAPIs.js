import {HL} from "../ModulesDatabase/HandleLanguage";
import {apiKeys} from "../apiKeys.js";
import nodeFetch from "node-fetch";
import youtubeDL from "youtube-dl-exec";
import fs from "fs";

export class HAPI {
    static async fetchCryptocurrency(client, chatID, messageID, groupsDict) {
        if (!groupsDict[chatID].cryptoCheckedToday) {
            try {
                let response = await nodeFetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
                    method: 'GET', headers: {
                        'X-CMC_PRO_API_KEY': apiKeys.cryptoAPI, 'Accept': 'application/json'
                    },
                });
                response = await response.json();
                let stringForSending = "";
                for (let i = 0; i < 10; i++) stringForSending += `1 [${response.data[i].symbol}] = ${response.data[i].quote.USD.price.toFixed(3)}$\n`;
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
            const url = `https://api.urbandictionary.com/v0/define?term=${bodyText}`;
            let response = await nodeFetch(url, {
                method: 'GET', headers: {
                    'Accept': 'application/json'
                },
            });
            response = await response.json();
            let stringForSending = "";
            if (response.list.length !== 0) {
                for (let i = 0; i < response.list.length && i < 10; i++)
                    stringForSending += `*${HL.getGroupLang(groupsDict, chatID, "search_in_urban_reply")} ${i + 1}:* \n
                    ${response.list[i].definition.replace(/\[/g, "").replace(/\]/g, "")} 
                    \nDefinition by: ${response.list[i].author} \n\n`;
                await client.reply(chatID, stringForSending, messageID);
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "urban_word_not_found_error"), messageID);
        } catch (err) {
            client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "urban_api_error"), messageID);
        }
    }

    static async translate(client, message, bodyText, chatID, messageID, groupsDict) {
        if (groupsDict[chatID].translationCounter < 10) {
            bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "translate_to"), "").trim();
            let textToTranslate = message.quotedMsgObj ? message.quotedMsgObj.body :
                bodyText.replace(bodyText.split(" ")[0], "").trim();

            try {
                const url = encodeURI(`https://en.wikipedia.org/w/api.php?action=languagesearch&search=${bodyText.split(" ")[0]}&format=json`);
                let langResponse = await nodeFetch(url, {
                    method: 'GET', headers: {
                        'Accept': 'application/json'
                    },
                });
                langResponse = await langResponse.json();
                const langCode = Object.keys(langResponse.languagesearch)[0];
                if (langCode) {
                    const url = encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${langCode}&dt=t&q=${textToTranslate}`);
                    let response = await nodeFetch(url, {
                        method: 'GET', headers: {
                            'Accept': 'application/json'
                        },
                    });
                    response = await response.json();
                    groupsDict[chatID].translationCounter++;
                    let stringForSending = "";
                    if (response[0][0][1].includes(textToTranslate)) {
                        stringForSending = response[0][0][0];
                    } else {
                        for (let i = 0; i < response[0].length; i++) {
                            let j = 0;
                            while (response[0][i]) {
                                if (response[0][i][j] == null) {
                                    break;
                                }
                                stringForSending += response[0][i][j];
                                j++;
                            }

                        }
                    }
                    await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "translate_reply", stringForSending, response[2]), messageID);
                } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "translate_language_error"), messageID);
            } catch (err) {
                await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "translate_language_api_error"), messageID);
            }
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "translate_language_limit"), messageID);
    }

    static async downloadMusic(client, bodyText, chatID, messageID, groupsDict) {
        if (groupsDict[chatID].downloadMusicCounter < 5) {
            const regex = /https?:\/\/(.)+\.youtube\.com\/(.)+/;
            const link = bodyText.match(regex);
            let fileName;
            if (link) {
                try {
                    await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "download_music_downloading_reply"), messageID);
                    groupsDict[chatID].downloadMusicCounter++;
                    await youtubeDL(link[0], {
                        format: "bestaudio[filesize<20M]",
                        exec: "ffmpeg -i {}  -codec:a libmp3lame -qscale:a 0 {}.mp3",
                        restrictFilenames: true
                    }).then(output => fileName = output.match(/ffmpeg -i(.)+-codec/)[0].replace("ffmpeg -i", "").replace("-codec", "").trim());
                    if (fileName) {
                        await client.sendPtt(chatID, fileName + ".mp3", messageID);
                        fs.unlink(fileName, (err) => {
                            if (err) {
                                console.error(err)
                            }
                        });
                        fs.unlink(fileName + ".mp3", (err) => {
                            if (err) {
                                console.error(err)
                            }
                        });
                    }
                } catch (error) {
                    await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "download_music_unknown_error"), messageID);
                }
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "download_music_not_found_error"), messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "download_music_limit_error"), messageID);

    }
}