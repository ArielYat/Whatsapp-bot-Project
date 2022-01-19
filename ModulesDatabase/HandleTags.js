const HDB = require("./HandleDB"), HL = require("./HandleLanguage");

class HT {
    static async checkTags(client, bodyText, chatID, messageID, authorID, quotedMsgID, groupsDict, usersDict) {
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
                    if (usersDict[tags[tag] + "@c.us"].messagesTaggedIn[chatID] === undefined) {
                        usersDict[tags[tag] + "@c.us"].messagesTaggedIn[chatID] = [];
                    }
                    usersDict[tags[tag] + "@c.us"].messagesTaggedIn[chatID].push(messageID);
                    await HDB.delArgsFromDB(chatID, usersDict[tags[tag] + "@c.us"].personID, "lastTagged", function () {
                        HDB.addArgsToDB(chatID, usersDict[tags[tag] + "@c.us"].personID, usersDict[tags[tag] + "@c.us"].messagesTaggedIn[chatID], null, "lastTagged", function () {

                        });
                    });
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
                    await HDB.addArgsToDB(chatID, tag, phoneNumber, null, "tags", function () {
                        groupsDict[chatID].tags = ["add", tag, phoneNumber];
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
                await HDB.delArgsFromDB(chatID, tag, "tags", function () {
                    groupsDict[chatID].tags = ["delete", tag]
                    client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_tag_reply", tag), messageID);
                });
            } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_tag_doesnt_exist_error"), messageID);
        } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_tags_error"), messageID);
    }

    static async tagEveryone(client, bodyText, chatID, quotedMsgID, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "tag_all"), "");
        let stringForSending = "";
        Object.entries(groupsDict[chatID].personsIn).forEach(person => {
            stringForSending += "@" + person[1].personID.replace("@c.us", "") + "\n";
        });
        stringForSending += "\n" + bodyText;
        await client.sendReplyWithMentions(chatID, stringForSending, quotedMsgID);
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

    static async logMessagesWithTags(bodyText, chatID, messageID, usersDict) {
        const tagsFound = bodyText.match(/@\d+/g);
        if (tagsFound) {
            for (let tag in tagsFound) {
                const ID = tagsFound[tag].replace("@", "") + "@c.us";
                if (ID in usersDict) {
                    const person = usersDict[ID];
                    if (person.messagesTaggedIn[chatID] === undefined)
                        person.messagesTaggedIn[chatID] = [];
                    person.messagesTaggedIn[chatID].push(messageID);
                    await HDB.delArgsFromDB(chatID, person.personID, "lastTagged", function () {
                        HDB.addArgsToDB(chatID, person.personID, person.messagesTaggedIn[chatID], null, "lastTagged", function () {
                        });
                    });
                }
            }
        }
    }

    static async whichMessagesTaggedIn(client, chatID, messageID, authorID, groupsDict, usersDict) {
        if (usersDict[authorID].messagesTaggedIn[chatID] !== undefined && usersDict[authorID].messagesTaggedIn[chatID].length !== 0) {
            usersDict[authorID].messagesTaggedIn[chatID].forEach(messageID =>
                client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "check_tags_reply"), messageID),
            );
            await HDB.delArgsFromDB(chatID, authorID, "lastTagged", function () {
                delete usersDict[authorID].messagesTaggedIn[chatID];
            });
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "check_tags_no_messages_error"), messageID);
    }

    static async clearTaggedMessaged(client, chatID, messageID, authorID, groupsDict, usersDict) {
        if (usersDict[authorID].messagesTaggedIn[chatID] !== undefined && usersDict[authorID].messagesTaggedIn[chatID].length !== 0) {
            await HDB.delArgsFromDB(chatID, authorID, "lastTagged", function () {
                delete usersDict[authorID].messagesTaggedIn[chatID];
                client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "clear_tags_reply"), messageID);
            });
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "check_tags_no_messages_error"), messageID);
    }

    static async createTagList(client, bodyText, chatID, groupsDict, tagsList) {
        if (tagsList[chatID]) {
            let tagStack = [];
            for (const tag in bodyText.match(/@\d+/))
                tagStack.push(tag);
            if (tagStack.length !== 0) {
                await client.sendText(chatID, HL.getGroupLang(groupsDict, chatID, "create_tag_list_reply"));
                tagsList[chatID] = tagStack;
            } else {
                await client.sendText(chatID, HL.getGroupLang(groupsDict, chatID, "create_tag_list_empty_error"));
                tagsList[chatID] = null;
            }
        }
    }

    static async nextPersonInList(client, chatID, messageID, groupsDict, tagLists) {
        const tagStack = tagLists[chatID];
        if (tagStack) {
            if (tagStack.length === 1)
                client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "tag_list_last_reply", tagStack.pop()), messageID);
            else if (tagStack.length > 1)
                client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "tag_list_next_reply", tagStack.pop(), tagStack[tagStack.length - 1]), messageID)
        }
    }
}

module.exports = HT;