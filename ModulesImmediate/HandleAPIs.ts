// noinspection SpellCheckingInspection

import HL from "../ModulesDatabase/HandleLanguage.js";
import apiKeys from "../apiKeys.js";
import nvt from "node-virustotal";
import nodeFetch from "node-fetch";
import youtubeDL from "youtube-dl-exec";
import chidProcess from "child_process";
import FormData from "form-data";
import fs from "fs";

const defaultTimedInstance = nvt.makeAPI();
defaultTimedInstance.setKey(apiKeys.virusAPI);

export default class HAPI {
    static async scanLinks(client, message, bodyText, chatID, messageID, groupsDict) {
        async function sleep(ms) {
            return new Promise(resolve => {
                setTimeout(resolve, ms);
            });
        }

        async function parseAndSendResults(client, chatID, res, url, messageID, groupsDict) {
            let prettyAnswerString = "";
            try {
                const dataParsed = JSON.parse(res.toString('utf8').replace(/^\uFFFD/, '')).data.attributes.last_analysis_results;
                let counter = 0;
                for (let attribute in dataParsed) {
                    if (dataParsed[attribute].result !== "clean" && dataParsed[attribute].result !== "unrated") {
                        prettyAnswerString += (attribute + ": " + dataParsed[attribute].result) + "\n";
                        counter++;
                    }
                }
                prettyAnswerString += "\n" + await HL.getGroupLang(groupsDict, chatID, "scan_link_result_reply", counter.toString());
                client.reply(chatID, url + "\n" + prettyAnswerString, messageID);
            } catch (err) {
                client.reply(chatID, "" + err, messageID);
            }
        }

        bodyText = message.quotedMsgObj ? message.quotedMsgObj.body : bodyText;
        const urlsInMessage = bodyText.match(/([hH]ttps?:\/\/\S+)/g);
        if (!urlsInMessage) {
            client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "link_validity_error"), messageID);
            return;
        }

        for (let url of urlsInMessage) {
            url.slice(-1) !== "/" ? url += "/" : console.log("moshe");
            url = url.charAt(0).toLowerCase() + url.slice(1);
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "scan_link_checking_reply", url), messageID);
            defaultTimedInstance.urlLookup(nvt.sha256(url), async function (err, res) {
                if (err) {
                    defaultTimedInstance.initialScanURL(url, async function (err, res) {
                        if (err)
                            client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "scan_link_upload_error"), messageID);
                        else if (res) {
                            await sleep(1000 * 60);
                            const id = JSON.parse(res.toString('utf8').replace(/^\uFFFD/, '')).data.id;
                            const newHashed = id.match(/-(.)+-/)[0].replace(/-/g, "");
                            defaultTimedInstance.urlLookup(newHashed, async function (err, res) {
                                if (err)
                                    await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "scan_link_checking_error"), messageID);
                                else if (res)
                                    await parseAndSendResults(client, chatID, res, url, messageID, groupsDict);
                            });
                        }
                    });
                } else await parseAndSendResults(client, chatID, res, url, messageID, groupsDict);
            });
        }
    }

    static async fetchCryptocurrency(client, chatID, messageID, groupsDict) {
        if (groupsDict[chatID].cryptoChecked) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "crypto_limit_error"), messageID);
            return;
        }
        try {
            let response: any = await nodeFetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
                method: 'GET', headers: {
                    'X-CMC_PRO_API_KEY': apiKeys.cryptoAPI, 'Accept': 'application/json'
                },
            });
            response = await response.json();
            let stringForSending = "";
            for (let i = 0; i < 10; i++)
                stringForSending += `1 [${response.data[i].symbol}] = ${response.data[i].quote.USD.price.toFixed(3)}$\n`;
            groupsDict[chatID].cryptoChecked = true;
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "crypto_check_reply", stringForSending), messageID);
        } catch (err) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "crypto_api_error"), messageID);
        }
    }

    static async searchUrbanDictionary(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(await HL.getGroupLang(groupsDict, chatID, "search_in_urban"), "").trim();
        try {
            const url = `https://api.urbandictionary.com/v0/define?term=${bodyText}`;
            let response: any = await nodeFetch(url, {
                method: 'GET', headers: {
                    'Accept': 'application/json'
                },
            });
            response = await response.json();
            let stringForSending = "";
            if (response.list.length !== 0) {
                for (let i = 0; i < response.list.length && i < 10; i++)
                    stringForSending += `*${await HL.getGroupLang(groupsDict, chatID, "search_in_urban_reply")} ${i + 1}:* \n
                    ${response.list[i].definition.replace(/\[/g, "").replace(/]/g, "")} 
                  \nDefinition by: ${response.list[i].author} \n\n`;
                await client.reply(chatID, stringForSending, messageID);
            } else await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "urban_word_not_found_error"), messageID);
        } catch (err) {
            client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "urban_api_error"), messageID);
        }
    }

    static async translate(client, message, bodyText, chatID, messageID, groupsDict) {
        if (groupsDict[chatID].translationCounter >= 10) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "translate_language_limit_error"), messageID);
            return;
        }
        bodyText = bodyText.replace(await HL.getGroupLang(groupsDict, chatID, "translate_to"), "").trim();
        let textToTranslate = message.quotedMsgObj ? message.quotedMsgObj.body : bodyText.replace(bodyText.split(" ")[0], "").trim();
        try {
            const urlWiki = encodeURI(`https://en.wikipedia.org/w/api.php?action=languagesearch&search=${bodyText.split(" ")[0].replace("\n", "")}&format=json`);
            let langResponse: any = await nodeFetch(urlWiki, {
                method: 'GET', headers: {
                    'Accept': 'application/json'
                },
            });
            langResponse = await langResponse.json();
            const langCode = Object.keys(langResponse.languagesearch)[0];
            if (!langCode) {
                await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "translate_language_error"), messageID);
                return;
            }

            const urlTrans = encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${langCode}&dt=t&q=${textToTranslate}`);
            let response: any = await nodeFetch(urlTrans, {
                method: 'GET', headers: {
                    'Accept': 'application/json'
                },
            });
            response = await response.json();
            groupsDict[chatID].translationCounter++;
            let stringForSending = "";
            if (response[0][0][1].includes(textToTranslate))
                stringForSending = response[0][0][0];
            else {
                for (let i = 0; i < response[0].length; i++) {
                    for (let j = 0; response[0][i]; j += 2) {
                        if (response[0][i][j] == null) {
                            break;
                        }
                        stringForSending += response[0][i][j];
                    }

                }
            }
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "translate_reply", stringForSending, response[2]), messageID);
        } catch (err) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "translate_language_api_error"), messageID);
        }
    }

    static async downloadMusic(client, bodyText, chatID, messageID, groupsDict) {
        if (groupsDict[chatID].downloadMusicCounter >= 5) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "download_music_limit_error"), messageID);
            return;
        }
        const link = bodyText.match(/https?:\/\/(.)+\.youtube\.com\/(.)+/);
        let fileName = "";
        if (!link) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "download_music_not_found_error"), messageID);
            return;
        }

        try {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "download_music_downloading_reply"), messageID);
            // noinspection SpellCheckingInspection
            await youtubeDL(link[0], {
                format: "bestaudio[filesize<20M]",
                exec: "ffmpeg -i {}  -codec:a libmp3lame -qscale:a 0 {}.mp3",
                restrictFilenames: true,
                output: "%(id)s.%(ext)s"
            }).then((output: any) => fileName = output.match(/ffmpeg -i(.)+-codec/)[0].replace("ffmpeg -i", "").replace("-codec", "").replace("/Whatsapp-bot-Project/", "").trim());
            if (!fileName) return;

            groupsDict[chatID].downloadMusicCounter++;
            await client.sendPtt(chatID, fileName + ".mp3", messageID);
            fs.unlink(process.cwd().toString() + "/" + fileName, (err) => {
                if (err)
                    console.error("error while deleting music file" + err);
            });
            fs.unlink(process.cwd().toString() + "/" + fileName + ".mp3", (err) => {
                if (err)
                    console.error("error while deleting music file" + err);
            });
        } catch (error) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "download_music_unknown_error"), messageID);
            console.log(error.toString());
        }
    }

    static async fetchStock(client, bodyText, chatID, messageID, groupsDict) {
        if (groupsDict[chatID].stockCounter >= 3) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "check_stock_limit_error"), messageID);
            return;
        }
        bodyText = bodyText.replace(await HL.getGroupLang(groupsDict, chatID, "fetch_stock"), "").trim();
        try {
            const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${bodyText}&interval=30min&apikey=${apiKeys.stockAPI}`;
            let response: any = await nodeFetch(url, {
                method: 'GET', headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'request'
                },
            });
            response = await response.json();
            response = response["Time Series (30min)"];
            response = Object.values(response)[0];
            response = JSON.stringify(response);
            response = response.replace("{", "").replace("}", "").replace(/"/g, "").replace(/:/g, ": ").replace(/,/g, ",\n").trim();
            groupsDict[chatID].stockCounter++;
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "fetch_stock_reply", bodyText, response), messageID);
        } catch (err) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "fetch_stock_api_error"), messageID);
        }
    }

    static async stableDiffusion(client, message, bodyText, chatID, authorID, messageID, groupsDict, usersDict) {
        async function generateImage(client, bodyText, chatID, messageID, groupsDict) {
            let payload = {
                prompt: undefined,
                steps: 28,
                negative_prompt: "",
                seed: -1,
                sampler_index: "DPM++ 2M Karras",
                cfg_scale: 8,
                override_settings: {"sd_model_checkpoint": "realisticVisionV13_v13.safetensors [c35782bad8]"}
            };

            const prompt = bodyText.match(await HL.getGroupLang(groupsDict, chatID, "stable_diffusion_prompt")),
                steps = bodyText.match(await HL.getGroupLang(groupsDict, chatID, "stable_diffusion_sampling_steps")),
                negative_prompt = bodyText.match(await HL.getGroupLang(groupsDict, chatID, "stable_diffusion_negative_prompt")),
                sampling_method = bodyText.match(await HL.getGroupLang(groupsDict, chatID, "stable_diffusion_sampling_method")),
                model = bodyText.match(await HL.getGroupLang(groupsDict, chatID, "stable_diffusion_model"));

            if (prompt === null) {
                await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "stable_diffusion_prompt_error"), messageID);
                return
            } else if ((prompt[1].trim().split(" ")).length > 75) {
                await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "stable_diffusion_prompt_length_error"), messageID);
                return;
            }
            payload.prompt = prompt[1].trim();

            if (steps !== null) {
                if (parseInt(steps[1]) > 50 && parseInt(steps[1]) < 28) {
                    await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "stable_diffusion_sampling_steps_error"), messageID);
                    return;
                }
                payload.steps = parseInt(steps[1]);
            }

            if (negative_prompt !== null) {
                payload.negative_prompt = negative_prompt[1].trim();
                if ((payload.negative_prompt.split(" ")).length > 75) {
                    await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "stable_diffusion_negative_prompt_length_error"), messageID);
                    return;
                }
            }

            if (sampling_method !== null) {
                if (sampling_method[1].trim() === "DPM++ 2M Karras" || sampling_method[1].trim() === "Euler a") {
                    payload.sampler_index = sampling_method[1].trim();
                } else {
                    await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "stable_diffusion_sampling_method_error"), messageID);
                    return;
                }
            }

            if (model !== null) {
                if (model[1].trim() === "Realistic Vision") {
                    payload.override_settings["sd_model_checkpoint"] = "realisticVisionV13_v13.safetensors [c35782bad8]";
                } else if (model[1].trim() === "Inkpunk_Diffusion") {
                    payload.override_settings["sd_model_checkpoint"] = "Inkpunk_Diffusion.safetensors [7c973d48cc]";
                } else if (model[1].trim() === "DreamShaper") {
                    payload.override_settings["sd_model_checkpoint"] = "dreamshaper_331BakedVae.safetensors [1dceefec07]";
                } else {
                    await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "stable_diffusion_model_error"), messageID);
                    return;
                }
            }

            try {
                await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "stable_diffusion_create_reply_waiting"), messageID);
                const response = await nodeFetch("http://appban:7860" + "/sdapi/v1/txt2img", {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {'Content-Type': 'application/json'},
                });
                const data = await response.json();
                const image = Buffer.from(data["images"][0], 'base64');
                await client.sendImage(chatID, image, 'image.png',
                    await HL.getGroupLang(groupsDict, chatID, "stable_diffusion_create_reply"));
            } catch (err) {
                await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "stable_diffusion_create_error"), messageID);
            }
        }

        if (chatID === apiKeys.originalGroup || chatID === apiKeys.secondGroup) {
            await generateImage(client, bodyText, chatID, messageID, groupsDict);
        } else if (usersDict[authorID].permissionLevel[chatID] === 3) {
            client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "stable_diffusion_unauthorized_group_error_resolve"), messageID);
            await generateImage(client, bodyText, chatID, messageID, groupsDict);
        } else
            client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "stable_diffusion_unauthorized_group_error"), messageID);
    }

    static async transcribeAudio(client, message, chatID, authorID, messageID, groupsDict, usersDict) {
        if (usersDict[authorID].voiceTranscriptCounter >= 2) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "transcribe_audio_limit_error"), messageID);
            return;
        }
        if (message.quotedMsgObj === undefined) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "transcribe_audio_no_audio_error"), messageID);
            return;
        }
        if (message.quotedMsgObj.type !== "audio" && message.quotedMsgObj.type !== "ptt") {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "transcribe_audio_not_audio_error"), messageID);
            return;
        }
        if (message.quotedMsgObj.duration > 600) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "transcribe_audio_duration_error"), messageID);
            return;
        }

        const buffer = Buffer.from((await client.decryptMedia(message.quotedMsgObj)).split('base64,')[1], 'base64');
        const form = new FormData();
        const fileName = messageID + '_' + authorID;

        fs.writeFile("/app/" + (fileName + '.ogg'), buffer, (err) => {
            if (err) console.log(err);
        });
        chidProcess.exec(`ffmpeg -i /app/${fileName}.ogg -acodec libmp3lame /app/${fileName}.mp3`, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            form.append('model', 'whisper-1');
            fs.readFile(fileName + '.mp3', async (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                //TODO: check how to convert Buffer to Blob
                form.append('file', data, {
                    contentType: 'text/plain',
                    filename: fileName + '.mp3',
                });
                usersDict[message.sender.id].voiceTranscriptCounter++;
                nodeFetch('https://api.openai.com/v1/audio/transcriptions', {
                    method: 'POST',
                    headers: {'Authorization': apiKeys.transcriptionAPI},
                    body: form
                }).then(resp => resp.json())
                    .then(async (inference) =>
                        await client.reply(chatID, (await HL.getGroupLang(groupsDict, chatID, "transcribe_audio_reply", inference['text'])), messageID));

                //Remove audio files from server
                fs.rm(fileName + '.ogg', {force: true}, (err) => {
                    if (err) console.log(err);
                });
                fs.rm(fileName + '.mp3', {force: true}, (err) => {
                    if (err) console.log(err);
                });
            });
        });
    }
}