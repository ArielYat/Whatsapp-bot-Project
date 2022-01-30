import {HL} from "../ModulesDatabase/HandleLanguage.js";
import nvt from "node-virustotal";
import {apiKeys} from "../apiKeys.js";

export class HURL {
    static async stripLinks(client, message, chatID, messageID, groupsDict) {
        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }

        message = message.quotedMsgObj ? message.quotedMsgObj : message;
        const bodyText = message.body;
        const urlsInMessage = bodyText.match(/(([hH])ttps?:\/\/[^\s]+)/g);
        if (urlsInMessage) {
            urlsInMessage.forEach(function (url) {
                url.slice(-1) !== "/" ? url += "/" : console.log("moshe");
                url = url.charAt(0).toLowerCase() + url.slice(1);
                client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "scan_link_checking_reply", url), messageID);
                const defaultTimedInstance = nvt.makeAPI();
                defaultTimedInstance.setKey(apiKeys.virusAPI);
                defaultTimedInstance.urlLookup(nvt.sha256(url), function (err, res) {
                    if (err) {
                        defaultTimedInstance.initialScanURL(url, function (err, res) {
                            if (err)
                                client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "scan_link_upload_error"), messageID);
                            else if (res) {
                                sleep(1000 * 90);
                                const id = JSON.parse(res.toString('utf8').replace(/^\uFFFD/, '')).data.id;
                                const newHashed = id.match("-(.)+-")[0].replace(/-/g, "");
                                defaultTimedInstance.urlLookup(newHashed, function (err, res) {
                                    if (err)
                                        client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "scan_link_checking_error"), messageID);
                                    else if (res)
                                        HURL.parseAndSendResults(client, chatID, res, url, messageID, groupsDict);
                                });
                            }
                        });
                    } else HURL.parseAndSendResults(client, chatID, res, url, messageID, groupsDict);
                });
            });
        } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "link_validity_error"), messageID);
    }

    static async parseAndSendResults(client, chatID, res, url, messageID, groupsDict) {
        let prettyAnswerString = "";
        try {
            const parsedRes = JSON.parse(res.toString('utf8').replace(/^\uFFFD/, ''));
            const dataParsed = parsedRes.data.attributes.last_analysis_results;
            let counter = 0;
            for (let attribute in dataParsed) {
                if (dataParsed[attribute].result !== "clean" && dataParsed[attribute].result !== "unrated") {
                    prettyAnswerString += (attribute + ": " + dataParsed[attribute].result) + "\n";
                    counter++;
                }
            }
            prettyAnswerString += "\n" + HL.getGroupLang(groupsDict, chatID, "scan_link_result_reply", counter.toString());
            client.reply(chatID, url + "\n" + prettyAnswerString, messageID);
        } catch (err) {
            client.reply(chatID, "" + err, messageID);
        }
    }
}