import {HDB} from "./HandleDB.js";
import {HL} from "./HandleLanguage.js";

const tagRegex = new RegExp('\\[(.*?)\]', "g");

export class HF {
    static async checkFilters(client, bodyText, chatID, messageID, groupsDict, groupFilterLimit, restGroupsAuto) {
        const filters = groupsDict[chatID].filters;
        for (const filter in filters) {
            if (bodyText.includes(filter)) {
                const index = bodyText.indexOf(filter);
                if ((index <= 0 || (/[\s|ו]/.test(bodyText[index - 1]))) &&
                    (index + filter.length >= bodyText.length || (/[\s|,!?]/.test(bodyText[index + filter.length])))) {
                    if (groupsDict[chatID].filterCounter < groupFilterLimit) {
                        if (filters[filter].startsWith("image"))
                            await client.sendImage(chatID, filters[filter].replace("image", ""), null, null, messageID);
                        else if (filters[filter].startsWith("video"))
                            await client.sendVideoAsGif(chatID, filters[filter].replace("video", ""), null, null, messageID);
                        else {
                            try {
                                await client.sendReplyWithMentions(chatID, filters[filter], messageID);
                            } catch (e) {
                                console.log("error occurred on filter reply");
                                await HDB.delArgsFromDB(chatID, filter, "filters", async function () {
                                    groupsDict[chatID].filters = ["delete", filter];
                                    client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "filter_removed_problematic_tag_error"), messageID);
                                });
                            }
                        }
                        groupsDict[chatID].filterCounter += 1;
                    } else if (groupsDict[chatID].filterCounter === groupFilterLimit) {
                        groupsDict[chatID].filterCounter += 1;
                        let bannedDate = new Date();
                        bannedDate.setMinutes(bannedDate.getMinutes() + 15);
                        bannedDate.setSeconds(0);
                        bannedDate.setMilliseconds(0);
                        groupsDict[chatID].autoBanned = bannedDate;
                        restGroupsAuto.push(chatID);
                        await client.sendText(chatID, await HL.getGroupLang(groupsDict, chatID, "filter_spam_reply",
                            bannedDate.getHours().toString(), bannedDate.getMinutes() > 10 ?
                                bannedDate.getMinutes().toString() : "0" + bannedDate.getMinutes().toString()));
                    }
                }
            }
        }
    }

    static async addFilter(client, message, bodyText, chatID, messageID, groupsDict) {
        const messageType = message.quotedMsgObj ? message.quotedMsgObj.type : message.type;
        message = message.quotedMsgObj ? message.quotedMsgObj : message;
        bodyText = bodyText.replace(await HL.getGroupLang(groupsDict, chatID, "add_filter"), "");
        let filter = bodyText.trim(), filterReply = "", existError = null;
        if (messageType === "image") {
            filterReply = "image" + await client.decryptMedia(message);
            existError = await HL.getGroupLang(groupsDict, chatID, "filter_type_image");
        } else if (messageType === "video") {
            filterReply = "video" + await client.decryptMedia(message);
            existError = await HL.getGroupLang(groupsDict, chatID, "filter_type_video");
        } else if (messageType === "chat") {
            if (bodyText.includes("-")) {
                bodyText = bodyText.split("-");
                filter = bodyText[0].trim();
                filterReply = bodyText[1].trim();
                existError = filterReply;
                const regexMatch = filterReply.match(tagRegex);
                if (regexMatch) {
                    for (let j = 0; j < regexMatch.length; j++) {
                        let testTag = regexMatch[j].replace("[", "").replace("]", "");
                        if (testTag in groupsDict[chatID].tags)
                            filterReply = filterReply.replace(regexMatch[j], "@" + groupsDict[chatID].tags[testTag]);
                    }
                }
            } else client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "hyphen_reply"), messageID);
        }
        if (filterReply) {
            if (!groupsDict[chatID].doesFilterExist(filter)) {
                await HDB.addArgsToDB(chatID, filter, filterReply, null, "filters", async function () {
                    groupsDict[chatID].filters = ["add", filter, filterReply];
                    client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "add_filter_reply", filter), messageID);
                });
            } else client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "add_filter_already_exists_error", filter, existError), messageID);
        }
    }

    static async remFilter(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(await HL.getGroupLang(groupsDict, chatID, "remove_filter"), "");
        const filter = bodyText.trim();
        if (groupsDict[chatID].filters) {
            if (groupsDict[chatID].doesFilterExist(filter)) {
                await HDB.delArgsFromDB(chatID, filter, "filters", async function () {
                    groupsDict[chatID].filters = ["delete", filter];
                    client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "remove_filter_reply", filter), messageID);
                });
            } else client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "remove_filter_doesnt_exist_error"), messageID);
        } else client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_filters_error"), messageID);
    }

    static async editFilter(client, message, bodyText, chatID, messageID, groupsDict) {
        const messageType = message.quotedMsgObj ? message.quotedMsgObj.type : message.type;
        message = message.quotedMsgObj ? message.quotedMsgObj : message;
        bodyText = bodyText.replace(await HL.getGroupLang(groupsDict, chatID, "edit_filter"), "");
        let filter = bodyText.trim(), filterReply = "";
        if (messageType === "image")
            filterReply = "image" + await client.decryptMedia(message);
        else if (messageType === "video")
            filterReply = "video" + await client.decryptMedia(message);
        else if (messageType === "chat") {
            if (bodyText.includes("-")) {
                bodyText = bodyText.split("-");
                filter = bodyText[0].trim();
                filterReply = bodyText[1].trim();
                if (groupsDict[chatID].filters) {
                    let regexTemp = filterReply.match(tagRegex);
                    if (regexTemp != null) {
                        for (let j = 0; j < regexTemp.length; j++) {
                            let regexTempTest = regexTemp[j].replace("[", "");
                            regexTempTest = regexTempTest.replace("]", "");
                            if (regexTempTest in groupsDict[chatID].tags)
                                filterReply = filterReply.replace(regexTemp[j], "@" + groupsDict[chatID].tags[regexTempTest]);
                        }
                    }
                }
            } else client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "hyphen_reply"), messageID);
        }
        if (filterReply) {
            if (groupsDict[chatID].doesFilterExist(filter)) {
                await HDB.delArgsFromDB(chatID, filter, "filters", function () {
                    HDB.addArgsToDB(chatID, filter, filterReply, null, "filters", async function () {
                        groupsDict[chatID].filters = ["edit", filter, filterReply]
                        client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "edit_filter_reply", filter), messageID);
                    });
                });
            } else client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "edit_filter_not_existent_error"), messageID);
        }
    }

    static async showFilters(client, chatID, messageID, groupsDict) {
        if (Object.keys(groupsDict[chatID].filters).length) {
            let stringForSending = "";
            Object.entries(groupsDict[chatID].filters.forEach(await (async ([filter, filterReply]: [string, string]) => {
                if (filterReply.startsWith("image"))
                    stringForSending += filter + " - " + await HL.getGroupLang(groupsDict, chatID, "filter_type_image") + "\n";
                else if (filterReply.startsWith("video"))
                    stringForSending += filter + " - " + await HL.getGroupLang(groupsDict, chatID, "filter_type_video") + "\n";
                else
                    stringForSending += filter + " - " + filterReply + "\n";
            })));
            await client.reply(chatID, stringForSending, messageID);
        } else await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_filters_error"), messageID);
    }
}