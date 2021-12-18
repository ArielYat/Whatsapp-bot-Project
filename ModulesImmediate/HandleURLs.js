const nvt = require('node-virustotal'), time = require("usleep"), HL = require("../ModulesDatabase/HandleLanguage");
const defaultTimedInstance = nvt.makeAPI();
const urlRegex = /((h|H)ttps?:\/\/[^\s]+)/g;

class HURL {
    static async stripLinks(client, bodyText, chatID, messageID, groupsDict) {
        const found = bodyText.match(urlRegex);
        if (found != null) {
            found.forEach(function (url) {
                url.slice(-1) !== "/" ? url += "/" : console.log("moshe");
                url = url.charAt(0).toLowerCase() + url.slice(1);
                client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "scan_link_checking", url), messageID);
                const hashed = nvt.sha256(url);
                defaultTimedInstance.urlLookup(hashed, function (err, res) {
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
                    } else
                        HURL.parseAndSendResults(client, chatID, res, url, messageID, groupsDict);
                });

            });
        }
    }
    static async parseAndSendResults(client, chatID, res, url, messageID, groupsDict) {
        let prettyAnswerString = "";
        try {
            const parsedRes = JSON.parse(res.toString('utf8').replace(/^\uFFFD/, ''));
            let counter = 0;
            const dataParsed = parsedRes.data.attributes.last_analysis_results;
            for (let attribute in dataParsed) {
                if (dataParsed.attribute.result !== "clean" && dataParsed.attribute.result !== "unrated") {
                    prettyAnswerString += (attribute + ": " + dataParsed.attribute.result) + "\n";
                    counter++;
                }
            }
            prettyAnswerString += "\n" + HL.getGroupLang(groupsDict, chatID, "scan_link_result", counter);
            client.reply(chatID, url + "\n" + prettyAnswerString, messageID);
        } catch (err) {
            client.reply(chatID, "" + err, messageID);
        }
    }
}

module.exports = HURL;