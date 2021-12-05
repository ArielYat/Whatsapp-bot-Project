const group = require("../Group"), HDB = require("./HandleDB"), HL = require("./HandleLanguage");
const regex = new RegExp('\\[(.*?)\\]', "g");

class HF {
    static async checkFilters(client, bodyText, chatID, messageID, groupsDict, limitFilter, restGroupsAuto) {
        if (chatID in groupsDict) {
            const filters = groupsDict[chatID].filters;
            for (const word in filters) {
                const location = bodyText.indexOf(word);
                if (bodyText.includes(word)) {
                    if ((location <= 0 || !((/[A-Z\a-z\u0590-\u05fe]/).test(bodyText[location - 1]))) &&
                        (location + word.length >= bodyText.length ||
                            !((/[A-Z\a-z\u0590-\u05fe]/).test(bodyText[location + word.length])))) {
                        groupsDict[chatID].addToFilterCounter();
                        if (groupsDict[chatID].filterCounter < limitFilter) {
                            await client.sendReplyWithMentions(chatID, filters[word], messageID);
                        } else if (groupsDict[chatID].filterCounter === limitFilter) {
                            await client.sendText(chatID,
                                HL.getGroupLang(groupsDict, chatID, "filter_spamming"));
                            groupsDict[chatID].addToFilterCounter();
                            restGroupsAuto.push(chatID);
                        }
                    }
                }
            }
        }
    }

    static async addFilter(client, bodyText, chatID, messageID, groupsDict, limitFilter, restGroupsAuto) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "add_filter"), "");
        if (bodyText.includes("-")) {
            bodyText = bodyText.split("-");
            const filter = bodyText[0].trim();
            let filter_reply = bodyText[1].trim();
            //make new group and insert filter + filter replay if group not in DB otherwise
            // just insert filter + filter reply to DB and to group
            if (!(chatID in groupsDict)) {
                groupsDict[chatID] = new group(chatID);
            }
            let regexTemp = filter_reply.match(regex);
            if (regexTemp != null) {
                for (let j = 0; j < regexTemp.length; j++) {
                    let regexTempTest = regexTemp[j].replace("[", "");
                    regexTempTest = regexTempTest.replace("]", "");
                    if (regexTempTest in groupsDict[chatID].tags) {
                        filter_reply = filter_reply.replace(regexTemp[j], "@" + groupsDict[chatID].tags[regexTempTest]);
                    }
                }
            }
            if (groupsDict[chatID].filterCounter < limitFilter) {
                groupsDict[chatID].addToFilterCounter();
                //check if filter exist on DB if it does return false otherwise add filters to DB
                if (groupsDict[chatID].addFilter(filter, filter_reply)) {
                    await HDB.addArgsToDB(filter, filter_reply, null, null, chatID, "filters", function () {
                        client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_filter_reply",
                            filter), messageID);

                    });
                } else {
                    client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_filter_reply_exists",
                        filter, filter_reply), messageID);
                }
            }
            else if (groupsDict[chatID].filterCounter === limitFilter) {
                await client.sendText(chatID,
                    HL.getGroupLang(groupsDict, chatID, "filter_spamming"));
                groupsDict[chatID].addToFilterCounter();
                restGroupsAuto.push(chatID);
            }
        }
        else {
                client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "hyphen"), messageID);
        }
    }

    static async remFilter(client, bodyText, chatID, messageID, groupsDict, limitFilter, restGroupsAuto) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "remove_filter"), "");
        const filter = bodyText.trim();
        if (chatID in groupsDict) {
            if (groupsDict[chatID].filterCounter < limitFilter) {
                groupsDict[chatID].addToFilterCounter();
                if (groupsDict[chatID].delFilter(filter)) {
                    await HDB.delArgsFromDB(filter, chatID, "filters", function () {
                        client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_filter_reply",
                            filter), messageID);
                    });
                } else {
                    client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_filter_doesnt_exist"), messageID);
                }
            }
            else if (groupsDict[chatID].filterCounter === limitFilter) {
                await client.sendText(chatID,
                    HL.getGroupLang(groupsDict, chatID, "filter_spamming"));
                groupsDict[chatID].addToFilterCounter();
                restGroupsAuto.push(chatID);
            }
        } else {
            client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_filters"), messageID);
        }


    }

    static async editFilter(client, bodyText, chatID, messageID, groupsDict, limitFilter, restGroupsAuto) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "edit_filter"), "");
        if (bodyText.includes("-")) {
            bodyText = bodyText.split("-");
            const filter = bodyText[0].trim();
            let filter_reply = bodyText[1].trim();
            if (chatID in groupsDict) {
                if (groupsDict[chatID].filterCounter < limitFilter) {
                    let regexTemp = filter_reply.match(regex);
                    if (regexTemp != null) {
                        for (let j = 0; j < regexTemp.length; j++) {
                            let regexTempTest = regexTemp[j].replace("[", "");
                            regexTempTest = regexTempTest.replace("]", "");
                            if (regexTempTest in groupsDict[chatID].tags) {
                                filter_reply = filter_reply.replace(regexTemp[j], "@" + groupsDict[chatID].tags[regexTempTest]);
                            }
                        }
                    }
                    groupsDict[chatID].addToFilterCounter();
                    if (groupsDict[chatID].delFilter(filter)) {
                        await HDB.delArgsFromDB(filter, chatID, "filters", function () {
                            groupsDict[chatID].addFilter(filter, filter_reply);
                            HDB.addArgsToDB(filter, filter_reply, null, null, chatID, "filters", function () {
                                client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "edit_filter_reply",
                                    filter), messageID);
                            });
                        });
                    } else {
                        client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "edit_filter_doesnt_exist"), messageID);
                    }
                }
                else if (groupsDict[chatID].filterCounter === limitFilter) {
                    await client.sendText(chatID,
                        HL.getGroupLang(groupsDict, chatID, "filter_spamming"));
                    groupsDict[chatID].addToFilterCounter();
                    restGroupsAuto.push(chatID);
                }
            } else {
                client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "group_dont_have_filters"), messageID);
            }
        } else {
            client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "hyphen"), messageID);
        }
    }

    static async showFilters(client, chatID, messageID, groupsDict) {
        if (chatID in groupsDict) {
            let stringForSending = "";
            let filters = groupsDict[chatID].filters;
            Object.entries(filters).forEach(([key, value]) => {
                stringForSending += key + " - " + value + "\n";
            });
            await client.reply(chatID, stringForSending, messageID);
        }
    }
}

module.exports = HF;
