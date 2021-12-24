const HDB = require("./HandleDB"), HL = require("./HandleLanguage");
const regex = new RegExp('\\[(.*?)\\]', "g");

class HF {
    static async checkFilters(client, bodyText, chatID, messageID, groupsDict, groupFilterLimit, restGroupsAuto) {
        const filters = groupsDict[chatID].filters;
        for (const word in filters) {
            const location = bodyText.indexOf(word);
            if (bodyText.includes(word)) {
                if ((location <= 0 || !((/[A-Z\a-z\u0590-\u05fe]/).test(bodyText[location - 1]))) &&
                    (location + word.length >= bodyText.length || !((/[A-Z\a-z\u0590-\u05fe]/).test(bodyText[location + word.length])))) {
                    groupsDict[chatID].addToFilterCounter();
                    if (groupsDict[chatID].filterCounter < groupFilterLimit)
                        await client.sendReplyWithMentions(chatID, filters[word], messageID);
                    else if (groupsDict[chatID].filterCounter === groupFilterLimit) {
                        await client.sendText(chatID, HL.getGroupLang(groupsDict, chatID, "filter_spam_reply"));
                        restGroupsAuto.push(chatID);
                    }
                }
            }
        }
    }

    static async addFilter(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "add_filter"), "");
        if (bodyText.includes("-")) {
            bodyText = bodyText.split("-");
            const filter = bodyText[0].trim();
            let filter_reply = bodyText[1].trim();
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
            if (!groupsDict[chatID].doesFilterExist(filter)) {
                groupsDict[chatID].filters = ["add", filter, filter_reply];
                await HDB.addArgsToDB(chatID, filter, filter_reply, null, "filters", function () {
                    client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_filter_reply", filter), messageID);
                });
            } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_filter_already_exists_error",
                filter, filter_reply), messageID);
        } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "hyphen_reply"), messageID);
    }

    static async remFilter(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "remove_filter"), "");
        const filter = bodyText.trim();
        if (groupsDict[chatID].filters) {
            if (groupsDict[chatID].doesFilterExist(filter)) {
                groupsDict[chatID].filters = ["delete", filter];
                await HDB.delArgsFromDB(chatID, filter, "filters", function () {
                    client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_filter_reply", filter), messageID);
                });
            } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_filter_doesnt_exist_error"), messageID);
        } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_filters_error"), messageID);
    }

    static async editFilter(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "edit_filter"), "");
        if (bodyText.includes("-")) {
            bodyText = bodyText.split("-");
            const filter = bodyText[0].trim();
            let filter_reply = bodyText[1].trim();
            if (groupsDict[chatID].filters) {
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
                if (groupsDict[chatID].doesFilterExist(filter)) {
                    groupsDict[chatID].filters = ["edit", filter, filter_reply]
                    await HDB.delArgsFromDB(chatID, filter, "filters", function () {
                        HDB.addArgsToDB(chatID, filter, filter_reply, null, "filters", function () {
                            client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "edit_filter_reply", filter), messageID);
                        });
                    });
                } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "edit_filter_error"), messageID);
            } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_filters_error"), messageID);
        } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "hyphen_reply"), messageID);
    }

    static async showFilters(client, chatID, messageID, groupsDict) {
        if (groupsDict[chatID].filters) {
            let stringForSending = "";
            let filters = groupsDict[chatID].filters;
            Object.entries(filters).forEach(([key, value]) => {
                stringForSending += key + " - " + value + "\n";
            });
            await client.reply(chatID, stringForSending, messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_filters_error"), messageID);
    }
}

module.exports = HF;
