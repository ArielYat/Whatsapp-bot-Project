const HDB = require("./HandleDB"), HL = require("./HandleLanguage");

class HT {
    static async checkTags(client, bodyText, chatID, messageID, authorID, quotedMsgID, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "tag"), "");
        bodyText = bodyText.trim();
        let splitText = bodyText.split(" ");
        let counter = 0;
        const tags = groupsDict[chatID].tags;
        for (let i = 0; i < splitText.length; i++) {
            for (const tag in tags) {
                let splitTextForChecking = splitText[i];
                if (splitText[i].charAt(0) === "ו" && tag.charAt(0) !== "ו")
                    splitTextForChecking = splitText[i].slice(1);
                if (splitTextForChecking === tag) {
                    counter += 1;
                    bodyText = bodyText.replace(tag, "@" + tags[tag]);
                }
            }
        }
        if (counter !== 0)
            await client.sendReplyWithMentions(chatID, bodyText, quotedMsgID);
        else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "tag_person_doesnt_exist_error"), messageID);
    }

    static async addTag(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "add_tag"), "");
        if (bodyText.includes("-")) {
            bodyText = bodyText.split("-");
            const tag = bodyText[0].trim(), phoneNumber = bodyText[1].trim();
            const isIDEqualPersonID = (person) => phoneNumber === person.personID.replace("@c.us", "");
            if (groupsDict[chatID].personsIn != null && (groupsDict[chatID].personsIn.some(isIDEqualPersonID))) {
                if (!groupsDict[chatID].doesTagExist(tag)) {
                    groupsDict[chatID].tags = ["add", tag, phoneNumber];
                    await HDB.addArgsToDB(chatID, tag, phoneNumber, null, "tags", function () {
                        client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_tag_reply", tag), messageID);
                    });
                } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_tag_already_exists_error", tag), messageID);
            } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_tag_doesnt_exist_error"), messageID);
        } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "hyphen_reply"), messageID);
    }

    static async remTag(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "remove_tag"), "");
        const tag = bodyText.trim();
        if (groupsDict[chatID].tags) {
            if (groupsDict[chatID].doesTagExist(tag)) {
                groupsDict[chatID].tags = ["delete", tag]
                await HDB.delArgsFromDB(chatID, tag, "tags", function () {
                    client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_tag_reply", tag), messageID);
                });
            } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_tag_doesnt_exist_error"), messageID);
        } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_tags_error"), messageID);
    }

    static async tagEveryone(client, bodyText, chatID, messageID, quotedMsgID, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "tag_all"), "");
        let stringForSending = "";
        Object.entries(groupsDict[chatID].personsIn).forEach(person => {
            stringForSending += "@" + person[1].personID.replace("@c.us", "") + "\n";
        });
        stringForSending += "\n" + bodyText;
        await client.sendTextWithMentions(chatID, stringForSending, quotedMsgID);
    }

    static async logMessagesWithTags(bodyText, chatID, messageID, usersDict) {
        const tagsFound = bodyText.match(/@[\d]+/g);
        if (tagsFound) {
            for (let tag in tagsFound) {
                usersDict[tag.replace("@", "") + "@c.us"].messagesTaggedIn.push({
                    chatID: chatID,
                    messageID: messageID
                });
            }
        }
    }

    static async whichMessagesTaggedIn(client, chatID, messageID, authorID, groupsDict, usersDict) {
        for (const {chat, message} in usersDict[authorID].messagesTaggedIn) {
            if (chat === chatID) {
                await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "check_tags_reply"), message);
                delete usersDict[authorID].messagesTaggedIn[chatID];
                return;
            }
        }
        await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "check_tags_no_messages_error"), usersDict[authorID].messagesTaggedIn[chatID]);
    }

    static async showTags(client, chatID, messageID, groupsDict) {
        if (Object.keys(groupsDict[chatID].tags).length) {
            let stringForSending = "";
            let tags = groupsDict[chatID].tags;
            Object.entries(tags).forEach(([key, value]) => {
                stringForSending += key + " - " + value + "\n";
            });
            await client.reply(chatID, stringForSending, messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_tags_error"), messageID);
    }
}

module.exports = HT;