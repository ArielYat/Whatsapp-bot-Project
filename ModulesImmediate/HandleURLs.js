const nvt = require('node-virustotal'), time = require("usleep"), HL = require("../ModulesDatabase/HandleLanguage");
const urlRegex = /(([hH])ttps?:\/\/[^\s]+)/g;

class HURL {
    static async stripLinks(client, bodyText, chatID, messageID, groupsDict) {
        const found = bodyText.match(urlRegex);
        if (found != null) {
            found.forEach(function (url) {
                url.slice(-1) !== "/" ? url += "/" : console.log("moshe");
                url = url.charAt(0).toLowerCase() + url.slice(1);
                client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "scan_link_checking_reply", url), messageID);
                const defaultTimedInstance = nvt.makeAPI();
                defaultTimedInstance.setKey("b7e76491b457b5c044e2db87f6644a471c40dd0c3229e018968951d9ddc2408f");
                defaultTimedInstance.urlLookup(nvt.sha256(url), function (err, res) {
                    if (err) {
                        defaultTimedInstance.initialScanURL(url, function (err, res) {
                            if (err)
                                client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "scan_link_upload_error"), messageID);
                            else if (res) {
                                time.sleep(10);
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
            let counter = 0;
            const dataParsed = parsedRes.data.attributes.last_analysis_results;
            for (let attribute in dataParsed) {
                if (dataParsed[attribute].result !== "clean" && dataParsed[attribute].result !== "unrated") {
                    prettyAnswerString += (attribute + ": " + dataParsed[attribute].result) + "\n";
                    counter++;
                }
            }
            prettyAnswerString += "\n" + HL.getGroupLang(groupsDict, chatID, "scan_link_result_reply", counter);
            client.reply(chatID, url + "\n" + prettyAnswerString, messageID);
        } catch (err) {
            client.reply(chatID, "" + err, messageID);
        }
    }
}

module.exports = HURL;