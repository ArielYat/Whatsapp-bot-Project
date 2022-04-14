import {HL} from "../ModulesDatabase/HandleLanguage.js";
import nvt from "node-virustotal";
import {apiKeys} from "../apiKeys.js";

const defaultTimedInstance = nvt.makeAPI();
defaultTimedInstance.setKey(apiKeys.virusAPI);

export class HURL {
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
        if (urlsInMessage) {
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
        } else client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "link_validity_error"), messageID);
    }

    static async changeYoutubeLinkType(client, message, bodyText, chatID, messageID, groupsDict) {
        const urlsInMessage = bodyText.match(/https:\/\/www\.youtube\.com\/shorts\/\S+/g);
        if (urlsInMessage) {
            let prettyAnswerString = "";
            for (let url of urlsInMessage)
                prettyAnswerString += url.replace("shorts/", "watch?v=") + "\n";
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "change_youtube_link_type_reply", prettyAnswerString), messageID);
        } else {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "link_validity_error"), messageID);
        }
    }
}