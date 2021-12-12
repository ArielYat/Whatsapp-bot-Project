const nvt = require('node-virustotal');
const defaultTimedInstance = nvt.makeAPI();
const time = require("usleep");
const HL = require("../ModulesDatabase/HandleLanguage");
const urlRegex = /(([hH])ttps?:\/\/[^\s]+)/g; // (h/H) == ([hH])

class HURL {
    static async stripLinks(client, bodyText, chatID, messageID, groupsDict) {
        const found = bodyText.match(urlRegex);
        if (found == null)
            return;
        found.forEach(function (url) {
            url.slice(-1) != "/" ? url = url + "/" : console.log("moshe");
            url = url.charAt(0).toLowerCase() + url.slice(1);
            HURL.checkUrls(client, chatID, url, messageID, groupsDict);
        });
    }

    static async checkUrls(client, chatID, url, messageId, groupsDict) {
        await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "scan_link_checking", url), messageId);
        const hashed = nvt.sha256(url)
        //TODO: make this code pretty
        const theSameObject = defaultTimedInstance.urlLookup(hashed, function (err, res) {
            if (err) {
                const theSameObject = defaultTimedInstance.initialScanURL(url, function (err, res) {
                    if (err) {
                        client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "scan_link_upload_error"), messageId);
                    } else if (res) {
                        time.sleep(10);
                        const id = JSON.parse(res.toString('utf8').replace(/^\uFFFD/, '')).data.id;
                        const hashed = id.match("-(.)+-")[0];
                        const hashedAfterRegex = hashed.replace(/-/g, "");
                        const theSameObject = defaultTimedInstance.urlLookup(hashedAfterRegex, function (err, res) {
                            if (err) {
                                client.reply(chatID, HL.getGroupLang(groupsDict, chatID,
                                    "scan_link_checking_error"), messageId);
                            } else if (res) {
                                HURL.parseAndAnswerResults(client, chatID, res, url, messageId, groupsDict);
                            }
                        });
                    }
                });
            } else
                HURL.parseAndAnswerResults(client, chatID, res, url, messageId, groupsDict);
        });
    }

    static async parseAndAnswerResults(client, chatID, res, url, messageId, groupsDict) {
        let prettyStringForAnswer = "";
        try {
            const parsedRes = JSON.parse(res.toString('utf8').replace(/^\uFFFD/, ''));
            let counter = 0;
            const dataParsed = parsedRes.data.attributes.last_analysis_results;
            for (let attribute in dataParsed) {
                if (dataParsed[attribute].result != "clean" && dataParsed[attribute].result != "unrated") {
                    prettyStringForAnswer += (attribute + ": " + dataParsed[attribute].result) + "\n";
                    counter++;
                }
            }
            prettyStringForAnswer += "\n" + HL.getGroupLang(groupsDict, chatID, "scan_link_result", counter);
            client.reply(chatID, url + "\n" + prettyStringForAnswer, messageId);
        } catch (error) {
            client.reply(chatID, "" + error, messageId);
        }
    }
}

module.exports = HURL;