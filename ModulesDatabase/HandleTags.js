const group = require("../Group"), HDB = require("./HandleDB"), HL = require("./HandleLanguage");

class HT {
    static async checkTags(client, bodyText, chatID, quotedMsgID, messageID, groupsDict) {
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
        if (counter !== 0) {
            await client.sendReplyWithMentions(chatID, bodyText, quotedMsgID);
        } else {
            await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "tag_person_doesnt_exist"), messageID);
        }
    }

    static async addTag(client, bodyText, chatID, messageID, groupsDict, groupMembersArray) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "add_tag"), "");
        if (bodyText.includes("-")) {
            bodyText = bodyText.split("-");
            const tag = bodyText[0].trim();
            const phoneNumber = bodyText[1].trim();
            //make new group and insert tag + phone number if group isn't in DB otherwise just insert tag and phone number
            if (!(chatID in groupsDict)) {
                groupsDict[chatID] = new group(chatID);
            }
            //check if tag exists in DB if it does return false otherwise add tag to DB
            if (groupMembersArray != null && groupMembersArray.includes(phoneNumber + "@c.us")) {
                if (groupsDict[chatID].addTag(tag, phoneNumber)) {
                    await HDB.addArgsToDB(tag, phoneNumber, null, null, chatID, "tags", function () {
                        client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_tag_reply", tag), messageID);
                    });
                } else {
                    client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_tag_reply_already_exists", tag), messageID);
                }
            } else {
                client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_tag_reply_doesnt_exist"), messageID);
            }
        } else {
            client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "hyphen"), messageID);
        }
    }

    static async remTag(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "remove_tag"), "");
        const tag = bodyText.trim();
        if (chatID in groupsDict) {
            if (groupsDict[chatID].delTag(tag)) {
                await HDB.delArgsFromDB(tag, chatID, "tags", function () {
                    client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_tag_reply", tag), messageID);
                });
            } else {
                client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_tag_doesnt_exist"), messageID);
            }
        } else {
            client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_tags"), messageID);
        }
    }

    static async tagEveryOne(client, bodyText, chatID, quotedMsgID, messageID, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "tag_all"), "");
        if (chatID in groupsDict) {
            let stringForSending = "";
            let tags = groupsDict[chatID].tags;
            Object.entries(tags).forEach(([key, value]) => {
                stringForSending += "@" + value + "\n";
            });
            stringForSending += bodyText;
            await client.sendTextWithMentions(chatID, stringForSending, quotedMsgID);
        } else {
            await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "group_dont_have_tags"), messageID);
        }
    }

    static async showTags(client, chatID, messageID, groupsDict) {
        if (chatID in groupsDict) {
            let stringForSending = "";
            let tags = groupsDict[chatID].tags;
            Object.entries(tags).forEach(([key, value]) => {
                stringForSending += key + " - " + value + "\n";
            });
            await client.reply(chatID, stringForSending, messageID);
        }
    }
}

module.exports = HT;