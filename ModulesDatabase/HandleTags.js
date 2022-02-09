import {HDB} from "./HandleDB.js";
import {HL} from "./HandleLanguage.js";
import {HA} from "./handleAfk.js";

export class HT {
    static async checkTags(client, bodyText, chatID, messageID, authorID, quotedMsgID, groupsDict, usersDict, afkPersons) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "tag_person"), "");
        bodyText = bodyText.trim();
        const tags = groupsDict[chatID].tags;
        let counter = 0;
        for (const tag in tags) {
            if (bodyText.includes(tag)) {
                const index = bodyText.indexOf(tag);
                if ((index <= 0 || ((/[\s|,ו]/).test(bodyText[index - 1]))) &&
                    (index + tag.length >= bodyText.length || ((/\s/).test(bodyText[index + tag.length])))) {
                    counter += 1;
                    if (typeof (tags[tag]) === "object") {
                        const taggingGroup = tags[tag];
                        for (let i = 0; i < taggingGroup.length; i++) {
                            if (usersDict[taggingGroup[i] + "@c.us"].messagesTaggedIn[chatID] === undefined)
                                usersDict[taggingGroup[i] + "@c.us"].messagesTaggedIn[chatID] = [];
                            bodyText = bodyText.substr(0, bodyText.indexOf(tag)) + " @" + taggingGroup[i] + " " + tag + bodyText.substr(bodyText.indexOf(tag) + tag.length)
                            if (authorID.replace("@c.us", "") !== taggingGroup[i])
                                usersDict[taggingGroup[i] + "@c.us"].messagesTaggedIn[chatID].push(messageID);
                            await HDB.delArgsFromDB(chatID, usersDict[taggingGroup[i] + "@c.us"].personID, "lastTagged", function () {
                                HDB.addArgsToDB(chatID, usersDict[taggingGroup[i] + "@c.us"].personID, usersDict[taggingGroup[i] + "@c.us"].messagesTaggedIn[chatID], null, "lastTagged", function () {
                                });
                            });
                        }
                        bodyText = bodyText.replace(tag, "");
                    } else {
                        if (usersDict[tags[tag] + "@c.us"].messagesTaggedIn[chatID] === undefined)
                            usersDict[tags[tag] + "@c.us"].messagesTaggedIn[chatID] = [];
                        bodyText = bodyText.replace(tag, "@" + tags[tag]);
                        usersDict[tags[tag] + "@c.us"].messagesTaggedIn[chatID].push(messageID);
                        await HA.handleAfkTagged(client, chatID, afkPersons, tags[tag] + "@c.us", groupsDict, usersDict, messageID);
                        await HDB.delArgsFromDB(chatID, usersDict[tags[tag] + "@c.us"].personID, "lastTagged", function () {
                            HDB.addArgsToDB(chatID, usersDict[tags[tag] + "@c.us"].personID, usersDict[tags[tag] + "@c.us"].messagesTaggedIn[chatID], null, "lastTagged", function () {

                            });
                        });
                    }
                }
            }
        }
        if (counter !== 0) {
            try {
                await client.sendReplyWithMentions(chatID, bodyText, quotedMsgID);
            } catch (error) {
                console.log("error occurred on tag");
                for (let tag in groupsDict[chatID].tags) {
                    await HDB.delArgsFromDB(chatID, tag, "tags", function () {
                        groupsDict[chatID].tags = ["delete", tag]
                    });
                }
                await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "tags_removed_problematic_tag_error"), messageID);
            }
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "tag_person_doesnt_exist_error"), messageID);
    }

    static async addTag(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "add_tag"), "");
        if (bodyText.includes("-")) {
            bodyText = bodyText.split("-");
            const tag = bodyText[0].trim(),
                phoneNumber = bodyText[1].trim().match(/@?\d+/) ? bodyText[1].trim().match(/@?\d+/)[0].replace("@", "") : bodyText[1];
            const isIDEqualPersonID = (person) => phoneNumber === person.personID.replace("@c.us", "");
            if (groupsDict[chatID].personsIn != null && groupsDict[chatID].personsIn.some(isIDEqualPersonID)) {
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
        let stringForSending = bodyText + "\n\n";
        Object.entries(groupsDict[chatID].personsIn).forEach(person => {
            stringForSending += "@" + person[1].personID.replace("@c.us", "") + "\n";
        });
        try {
            await client.sendReplyWithMentions(chatID, stringForSending, quotedMsgID);
        } catch (e) {
            Object.entries(groupsDict[chatID].personsIn).forEach(person => {
                HDB.delArgsFromDB(chatID, person[1].personID, "personIn", function () {
                    groupsDict[chatID].personsIn = ["delete", person[1].personID];
                });
            });
            console.log("error occurred at tagging everyone");
            await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "personIn_removed_problematic_error"), quotedMsgID);
        }
    }

    static async showTags(client, chatID, messageID, groupsDict) {
        const group = groupsDict[chatID];
        if (Object.keys(group.tags).length) {
            let stringForSending = "";
            Object.entries(group.tags).forEach(([name, tag]) => {
                if (typeof (tag) === "object") {
                    stringForSending += name + " - ";
                    for (let i = 0; i < tag.length; i++) {
                        let tempPhoneNumber = tag[i];
                        for (const personName in group.tags) {
                            if (group.tags[personName] === tempPhoneNumber)
                                tempPhoneNumber = personName;
                        }
                        //add a comma to every tag in tagging group except the last
                        stringForSending += i !== (tag.length - 1) ? tempPhoneNumber + ", " : tempPhoneNumber;
                    }
                    stringForSending += "\n";
                } else
                    stringForSending += `${name} - ${tag}\n`;
            });
            await client.reply(chatID, stringForSending, messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_tags_error"), messageID);
    }

    static async logMessagesWithTags(client, message, bodyText, chatID, messageID, usersDict, groupsDict, afkPersons) {
        const tagsFound = bodyText.match(/@\d+/g);
        if (tagsFound) {
            for (let tag in tagsFound) {
                const ID = tagsFound[tag].replace("@", "") + "@c.us";
                if (ID in usersDict) {
                    const person = usersDict[ID];
                    if (person.messagesTaggedIn[chatID] === undefined)
                        person.messagesTaggedIn[chatID] = [];
                    person.messagesTaggedIn[chatID].push(messageID);
                    await HA.handleAfkTagged(client, chatID, afkPersons, ID, groupsDict, usersDict, messageID);
                    await HDB.delArgsFromDB(chatID, person.personID, "lastTagged", function () {
                        HDB.addArgsToDB(chatID, person.personID, person.messagesTaggedIn[chatID], null, "lastTagged", function () {
                        });
                    });
                }
            }
        }
        if (message.quotedMsgObj && message.sender.id !== message.quotedMsgObj.sender.id) {
            const quotedAuthorID = message.quotedMsgObj.sender.id;
            if (quotedAuthorID in usersDict) {
                if (afkPersons.includes(quotedAuthorID)) {
                    if (usersDict[quotedAuthorID].messagesTaggedIn[chatID] === undefined)
                        usersDict[quotedAuthorID].messagesTaggedIn[chatID] = [];
                    usersDict[quotedAuthorID].messagesTaggedIn[chatID].push(messageID);
                    await HA.handleAfkTagged(client, chatID, afkPersons, quotedAuthorID, groupsDict, usersDict, messageID);
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

    static async addTaggingGroup(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "add_tagging_group"), "");
        if (bodyText.includes("-")) {
            bodyText = bodyText.split("-");
            const tag = bodyText[0].trim(), nameArray = bodyText[1].includes(",") ? bodyText[1].split(",") : null;
            if (nameArray) {
                let phoneNumbersArray = nameArray.map(function (currentName) {
                    if (currentName.trim() in groupsDict[chatID].tags)
                        return groupsDict[chatID].tags[currentName.trim()];
                });
                phoneNumbersArray = phoneNumbersArray.filter(number => number != null);
                if (phoneNumbersArray.length > 0) {
                    if (!groupsDict[chatID].doesTagExist(tag)) {
                        await HDB.addArgsToDB(chatID, tag, phoneNumbersArray, null, "tags", function () {
                            groupsDict[chatID].tags = ["add", tag, phoneNumbersArray];
                            client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_tagging_group_reply", tag), messageID);
                        });
                    } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_tagging_group_already_exists_error", tag), messageID);
                } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_tagging_group_invalid_phone_numbers_error"), messageID);
            } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_tagging_group_no_phone_numbers_error"), messageID);
        } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "hyphen_reply"), messageID);
    }

    static async removeTaggingGroup(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "remove_tagging_group"), "");
        if (groupsDict[chatID].tags) {
            const tag = bodyText.trim();
            if (groupsDict[chatID].doesTagExist(tag)) {
                await HDB.delArgsFromDB(chatID, tag, "tags", function () {
                    groupsDict[chatID].tags = ["delete", tag]
                    client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_tagging_group_reply", tag), messageID);
                });
            } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_tagging_group_does_not_exist_error"), messageID);
        } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_tags_error"), messageID);
    }

    static async addPersonToTaggingGroup(client, bodyText, chatID, messageID, groupsDict) {
        const matched = bodyText.match(HL.getGroupLang(groupsDict, chatID, "add_person_to_tagging_group"));
        if (matched) {
            const tagPersonName = matched[1].trim(), tagGroupName = matched[2].trim();
            if (groupsDict[chatID].tags) {
                if (tagGroupName in groupsDict[chatID].tags && typeof (groupsDict[chatID].tags[tagGroupName]) === "object") {
                    if (tagPersonName in groupsDict[chatID].tags && typeof (groupsDict[chatID].tags[tagPersonName]) === "string") {
                        const phoneNumber = groupsDict[chatID].tags[tagPersonName];
                        if (!(groupsDict[chatID].tags[tagGroupName].includes(phoneNumber))) {
                            groupsDict[chatID].tags[tagGroupName].push(phoneNumber);
                            await HDB.delArgsFromDB(chatID, tagGroupName, "tags", function () {
                                HDB.addArgsToDB(chatID, tagGroupName, groupsDict[chatID].tags[tagGroupName], null, "tags", function () {
                                    client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_person_to_tagging_group_reply", tagPersonName, tagGroupName), messageID);
                                });
                            });
                        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_person_to_tagging_group_already_exists_error", tagPersonName, tagGroupName), messageID);
                    } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "person_doesnt_exist_in_this_group_error", tagPersonName), messageID);
                } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "tagging_group_group_doesnt_exist_error", tagGroupName), messageID);
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_tags_error"), messageID);
        }
    }

    static async removePersonFromTaggingGroup(client, bodyText, chatID, messageID, groupsDict) {
        const matched = bodyText.match(HL.getGroupLang(groupsDict, chatID, "remove_person_from_tagging_group"));
        if (matched) {
            const tagPersonName = matched[1].trim(), tagGroupName = matched[2].trim();
            if (groupsDict[chatID].tags) {
                if (tagGroupName in groupsDict[chatID].tags && typeof (groupsDict[chatID].tags[tagGroupName]) === "object") {
                    if (tagPersonName in groupsDict[chatID].tags) {
                        const phoneNumber = groupsDict[chatID].tags[tagPersonName];
                        if (groupsDict[chatID].tags[tagGroupName].includes(phoneNumber)) {
                            groupsDict[chatID].tags[tagGroupName].splice(groupsDict[chatID].tags[tagGroupName].indexOf(phoneNumber), 1);
                            await HDB.delArgsFromDB(chatID, tagGroupName, "tags", function () {
                                if (groupsDict[chatID].tags[tagGroupName].length !== 0) {
                                    HDB.addArgsToDB(chatID, tagGroupName, groupsDict[chatID].tags[tagGroupName], null, "tags", function () {
                                        client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_person_from_tagging_group_reply", tagPersonName, tagGroupName), messageID);
                                    });
                                } else {
                                    delete groupsDict[chatID].tags[tagGroupName];
                                    client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "tagging_group_no_more_persons_error", tagGroupName), messageID);
                                }
                            });
                        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_person_from_tagging_group_does_not_exist_error", tagPersonName, tagGroupName), messageID);
                    } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "person_doesnt_exist_in_this_group_error", tagPersonName), messageID);
                } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "tagging_group_group_doesnt_exist_error", tagGroupName), messageID);
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_tags_error"), messageID);

        }
    }

    static async createTagList(client, bodyText, chatID, groupsDict) {
        if (groupsDict[chatID].tagStack.length === 0) {
            let matchTags = bodyText.match(/@\d+/g);
            if (!matchTags)
                await client.sendText(chatID, HL.getGroupLang(groupsDict, chatID, "create_tag_list_empty_error"));
            else {
                for (let i = 0; i < matchTags.length; i++)
                    groupsDict[chatID].addNumberToTagStack(matchTags[i]);
                groupsDict[chatID].tagStack = groupsDict[chatID].tagStack.reverse();
                await client.sendText(chatID, HL.getGroupLang(groupsDict, chatID, "create_tag_list_reply"));
            }
        }
    }

    static async nextPersonInList(client, chatID, messageID, groupsDict) {
        const tagStack = groupsDict[chatID].tagStack;
        if (tagStack.length !== 0) {
            if (tagStack.length === 1)
                await client.sendReplyWithMentions(chatID, HL.getGroupLang(groupsDict, chatID, "tag_list_last_reply", tagStack.pop()), messageID);
            else if (tagStack.length > 1)
                await client.sendReplyWithMentions(chatID, HL.getGroupLang(groupsDict, chatID, "tag_list_next_reply", tagStack.pop(), tagStack[tagStack.length - 1]), messageID)
        }
    }
}
