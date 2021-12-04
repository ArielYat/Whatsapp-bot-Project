const nvt = require('node-virustotal');
const defaultTimedInstance = nvt.makeAPI();
const theSameKey = defaultTimedInstance.setKey("b7e76491b457b5c044e2db87f6644a471c40dd0c3229e018968951d9ddc2408f");
const time = require("sleep");
const stringsHelp = require("./StringLang");
const urlRegex = /((h|H)ttps?:\/\/[^\s]+)/g;

class HURL {
    static async stripLinks(groupsDict, client, message) {
        const textMessage = message.body;
        const chatID = message.chat.id;
        const messageId = message.id;
        if (textMessage.includes(stringsHelp.getGroupLang(groupsDict, chatID, "scan_link"))) {
            const found = textMessage.match(urlRegex);
            if (found == null) {
                return;
            }
            found.forEach(function (url, index) {
                url.slice(-1) != "/" ? url = url + "/" : console.log("moshe");
                url = url.charAt(0).toLowerCase() + url.slice(1);
                HURL.checkUrls(client, chatID, url, messageId, groupsDict);
            });
        }
    }
    static async parseAndAnswerResults(client, chatID, res, url, messageId) {
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
            prettyStringForAnswer += "\n" + counter + " Anti virus engines detected this link as malicious";
            client.reply(chatID, url + "\n" + prettyStringForAnswer, messageId);
        } catch (error) {
            client.reply(chatID, "" + error, messageId);
        }
    }
    static async checkUrls(client, chatID, url, messageId, groupsDict) {
        await client.reply(chatID, stringsHelp.getGroupLang(groupsDict, chatID, "scan_link_checking", url), messageId);
        const hashed = nvt.sha256(url)
        //TODO: make this code pretty
        const theSameObject = defaultTimedInstance.urlLookup(hashed, function (err, res) {
            if (err) {
                const theSameObject = defaultTimedInstance.initialScanURL(url, function (err, res) {
                    if (err) {
                        client.reply(chatID, stringsHelp.getGroupLang(groupsDict, chatID,
                            "scan_link_error_upload"), messageId);
                    } else if (res) {
                        time.sleep(10);
                        const id = JSON.parse(res.toString('utf8').replace(/^\uFFFD/, '')).data.id;
                        const hashed = id.match("-(.)+-")[0];
                        const hashedAfterRegex = hashed.replace(/-/g, "");
                        const theSameObject = defaultTimedInstance.urlLookup(hashedAfterRegex, function (err, res) {
                            if (err) {
                                client.reply(chatID, stringsHelp.getGroupLang(groupsDict, chatID,
                                    "scan_link_error_checking"), messageId);
                            } else if (res) {
                                HURL.parseAndAnswerResults(client, chatID, res, url, messageId);
                            }
                        });
                    }
                });
            } else
                HURL.parseAndAnswerResults(client, chatID, res, url, messageId);
        });
    }
}

module.exports = HURL;