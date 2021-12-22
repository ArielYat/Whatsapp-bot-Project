const HDB = require("./HandleDB"), HL = require("./HandleLanguage");

class HT {
    static async checkTags(client, bodyText, chatID, messageID, quotedMsgID, groupsDict) {
        if (chatID in groupsDict) {
            bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "tag"), "");
            bodyText = bodyText.trim();
            let splitText = bodyText.split(" ");
            let counter = 0;
            const tags = groupsDict[chatID].tags;
            for (let i = 0; i < splitText.length; i++) {
                for (const tag in tags) {
                    let splitTextForChecking = splitText[i];
                    if (splitText[i].charAt(0) === "ו" && tag.charAt(0) !== "ו") {
                        splitTextForChecking = splitText[i].slice(1);
                    }
                    if (splitTextForChecking === tag) {
                        counter += 1;
                        bodyText = bodyText.replace(tag, "@" + tags[tag]);
                    }
                }
            }
            if (counter !== 0 && quotedMsgID === null)
                await client.sendReplyWithMentions(chatID, bodyText, quotedMsgID);
            else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "tag_person_error_doesnt_exist"), messageID);
        }
    }

    static async addTag(client, bodyText, chatID, messageID, groupsDict, allGroupMembers) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "add_tag"), "");
        if (bodyText.includes("-")) {
            bodyText = bodyText.split("-");
            const tag = bodyText[0].trim();
            const phoneNumber = bodyText[1].trim();
            if (allGroupMembers != null && allGroupMembers.includes(phoneNumber + "@c.us")) {
                if ((groupsDict[chatID].tags = ["add", tag, phoneNumber] === true)) {
                    await HDB.addArgsToDB(chatID, tag, phoneNumber, null, "tags", function () {
                        client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_tag_reply", tag), messageID);
                    });
                } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_tag_error_already_exists", tag), messageID);
            } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_tag_error_doesnt_exist"), messageID);
        } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "hyphen_reply"), messageID);
    }

    static async remTag(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "remove_tag"), "");
        const tag = bodyText.trim();
        if (chatID in groupsDict) {
            if ((groupsDict[chatID].tags = ["delete", tag]) === true) {
                await HDB.delArgsFromDB(chatID, tag, "tags", function () {
                    client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_tag_reply", tag), messageID);
                });
            } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_tag_error_doesnt_exist"), messageID);
        } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_tags_error"), messageID);
    }

    static async tagEveryOne(client, bodyText, chatID, messageID, quotedMsgID, groupsDict, allGroupMembers) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "tag_all"), "");
        if (chatID in groupsDict) {
            let stringForSending = "";
            Object.entries(allGroupMembers).forEach(([, value]) => {
                stringForSending += "@" + value + "\n";
            });
            stringForSending += bodyText;
            await client.sendTextWithMentions(chatID, stringForSending, quotedMsgID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_tags_error"), messageID);
    }

    static async showTags(client, chatID, messageID, groupsDict) {
        if (chatID in groupsDict) {
            if (groupsDict[chatID].tags) {
                let stringForSending = "";
                let tags = groupsDict[chatID].tags;
                Object.entries(tags).forEach(([key, value]) => {
                    stringForSending += key + " - " + value + "\n";
                });
                await client.reply(chatID, stringForSending, messageID);
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_tags_error"), messageID);
        }
    }
}

module.exports = HT;