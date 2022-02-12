import {HDB} from "./HandleDB.js";
import {HL} from "./HandleLanguage.js";
import {HAFK} from "./HandleAFK.js";

export class HT {
    static async checkTags(client, bodyText, chatID, messageID, authorID, quotedMsgID, groupsDict, usersDict, afkPersons) {
        bodyText = bodyText.replace(await HL.getGroupLang(groupsDict, chatID, "tag_person"), "").trim();
        const tags = groupsDict[chatID].tags;
        let counter = 0;
        for (const tag in tags) {
            if (bodyText.includes(tag)) {
                const index = bodyText.indexOf(tag);
                if ((index <= 0 || (/[\sו,]/.test(bodyText[index - 1]))) &&
                    (index + tag.length >= bodyText.length || (/[\sו,]/.test(bodyText[index + tag.length])))) {
                    counter += 1;
                    if (typeof (tags[tag]) === "object") {
                        const taggingGroup = tags[tag];
                        for (let i = 0; i < taggingGroup.length; i++) {
                            const personID = taggingGroup[i] + "@c.us";
                            if (!usersDict[personID].afk)
                                bodyText = bodyText.substring(0, bodyText.indexOf(tag)) + "@" + taggingGroup[i] + " " + tag + bodyText.substring(bodyText.indexOf(tag) + tag.length);
                            if (usersDict[personID].messagesTaggedIn[chatID] === undefined)
                                usersDict[personID].messagesTaggedIn[chatID] = [];
                            if (authorID.replace("@c.us", "") !== taggingGroup[i])
                                usersDict[personID].messagesTaggedIn[chatID].push(messageID);
                            await HDB.delArgsFromDB(chatID, usersDict[personID].personID, "lastTagged", function () {
                                HDB.addArgsToDB(chatID, usersDict[personID].personID, usersDict[personID].messagesTaggedIn[chatID], null, "lastTagged", function () {
                                });
                            });
                        }
                        bodyText = bodyText.replace(tag, "");
                    } else {
                        const personID = tags[tag] + "@c.us";
                        if (!usersDict[personID].afk)
                            bodyText = bodyText.replace(tag, "@" + tags[tag]);
                        if (usersDict[personID].messagesTaggedIn[chatID] === undefined)
                            usersDict[personID].messagesTaggedIn[chatID] = [];
                        usersDict[personID].messagesTaggedIn[chatID].push(messageID);
                        await HAFK.afkPersonTagged(client, chatID, messageID, personID, afkPersons, groupsDict, usersDict);
                        await HDB.delArgsFromDB(chatID, personID, "lastTagged", function () {
                            HDB.addArgsToDB(chatID, personID, usersDict[personID].messagesTaggedIn[chatID], null, "lastTagged", function () {

                            });
                        });
                    }
                }
            }
        }
        if (counter !== 0) {
            try {
                bodyText += await HL.getGroupLang(groupsDict, chatID, "someone_not_tagged_because_afk_reply");
                await client.sendReplyWithMentions(chatID, bodyText, quotedMsgID);
            } catch (err) {
                console.log("error occurred while tagging: " + err);
                for (const tag in groupsDict[chatID].tags) {
                    await HDB.delArgsFromDB(chatID, tag, "tags", function () {
                        groupsDict[chatID].tags = ["delete", tag];
                    });
                }
                await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "tags_removed_problematic_tag_error"), messageID);
            }
        } else await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "tag_person_doesnt_exist_error"), messageID);
    }

    static async addTag(client, bodyText, chatID, messageID, groupsDict) {
        if (bodyText.includes("-")) {
            bodyText = bodyText.replace(await HL.getGroupLang(groupsDict, chatID, "add_tag"), "");
            bodyText = bodyText.split("-");
            const tag = bodyText[0].trim(),
                phoneNumber = bodyText[1].trim().match(/@?\d+/) ? bodyText[1].trim().match(/@?\d+/)[0].replace("@", "") : bodyText[1];
            const isIDEqualPersonID = (person) => phoneNumber === person.personID.replace("@c.us", "");
            if (groupsDict[chatID].personsIn && groupsDict[chatID].personsIn.some(isIDEqualPersonID)) {
                if (!groupsDict[chatID].doesTagExist(tag)) {
                    await HDB.addArgsToDB(chatID, tag, phoneNumber, null, "tags", async function () {
                        groupsDict[chatID].tags = ["add", tag, phoneNumber];
                        await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "add_tag_reply", tag), messageID);
                    });
                } else await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "add_tag_already_exists_error", tag), messageID);
            } else client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "add_tag_doesnt_exist_error"), messageID);
        } else client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "hyphen_reply"), messageID);
    }

    static async remTag(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(await HL.getGroupLang(groupsDict, chatID, "remove_tag"), "");
        const tag = bodyText.trim();
        if (groupsDict[chatID].tags) {
            if (groupsDict[chatID].doesTagExist(tag)) {
                await HDB.delArgsFromDB(chatID, tag, "tags", async function () {
                    groupsDict[chatID].tags = ["delete", tag]
                    await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "remove_tag_reply", tag), messageID);
                });
            } else client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "remove_tag_doesnt_exist_error"), messageID);
        } else client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_tags_error"), messageID);
    }

    static async tagEveryone(client, bodyText, chatID, quotedMsgID, groupsDict) {
        bodyText = bodyText.replace(await HL.getGroupLang(groupsDict, chatID, "tag_all"), "");
        let stringForSending = bodyText + "\n\n";
        for (const person of groupsDict[chatID].personsIn) {
            if (!person.afk)
                stringForSending += "@" + person.personID.replace("@c.us", "") + "\n";
        }
        stringForSending += await HL.getGroupLang(groupsDict, chatID, "someone_not_tagged_because_afk_reply");
        try {
            await client.sendReplyWithMentions(chatID, stringForSending, quotedMsgID);
        } catch (err) {
            for (const person of groupsDict[chatID].personsIn) {
                await HDB.delArgsFromDB(chatID, person.personID, "personIn", function () {
                    groupsDict[chatID].personsIn = ["delete", person[1].personID];
                });
            }
            console.log("error occurred while tagging everyone: " + err);
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "personIn_removed_problematic_error"), quotedMsgID);
        }
    }

    static async showTags(client, chatID, messageID, groupsDict) {
        const group = groupsDict[chatID];
        if (Object.keys(group.tags).length) {
            let stringForSending = "";
            Object.entries(group.tags).forEach(([name, tag]) => {
                if (typeof (tag) === "object") {
                    stringForSending += name + " - ";
                    for (let i = 0; i < Object.keys(tag).length; i++) {
                        let tempPhoneNumber = tag[i];
                        for (const personName in group.tags) {
                            if (group.tags[personName] === tempPhoneNumber)
                                tempPhoneNumber = personName;
                        }
                        stringForSending += i !== (Object.keys(tag).length - 1) ? tempPhoneNumber + ", " : tempPhoneNumber;
                    }
                    stringForSending += "\n";
                } else
                    stringForSending += `${name} - ${tag}\n`;
            });
            await client.reply(chatID, stringForSending, messageID);
        } else await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_tags_error"), messageID);
    }

    static async logMessagesWithTags(client, message, bodyText, chatID, messageID, usersDict, groupsDict, afkPersons) {
        const tagsFound = bodyText.match(/@\d+/g);
        if (tagsFound) {
            for (let tag in tagsFound) {
                const personID = tagsFound[tag].replace("@", "") + "@c.us";
                if (personID in usersDict) {
                    const person = usersDict[personID];
                    if (person.messagesTaggedIn[chatID] === undefined)
                        person.messagesTaggedIn[chatID] = [];
                    person.messagesTaggedIn[chatID].push(messageID);
                    await HAFK.afkPersonTagged(client, chatID, messageID, personID, afkPersons, groupsDict, usersDict);
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
                    await HAFK.afkPersonTagged(client, chatID, messageID, quotedAuthorID, afkPersons, groupsDict, usersDict);
                }
            }
        }
    }

    static async whichMessagesTaggedIn(client, chatID, messageID, authorID, groupsDict, usersDict) {
        if (usersDict[authorID].messagesTaggedIn[chatID] !== undefined && usersDict[authorID].messagesTaggedIn[chatID].length !== 0) {
            for (const messageID of usersDict[authorID].messagesTaggedIn[chatID])
                client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "check_tags_reply"), messageID)
            await HDB.delArgsFromDB(chatID, authorID, "lastTagged", function () {
                delete usersDict[authorID].messagesTaggedIn[chatID];
            });
        } else await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "check_tags_no_messages_error"), messageID);
    }

    static async clearTaggedMessaged(client, chatID, messageID, authorID, groupsDict, usersDict) {
        if (usersDict[authorID].messagesTaggedIn[chatID] !== undefined && usersDict[authorID].messagesTaggedIn[chatID].length !== 0) {
            await HDB.delArgsFromDB(chatID, authorID, "lastTagged", async function () {
                delete usersDict[authorID].messagesTaggedIn[chatID];
                client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "clear_tags_reply"), messageID);
            });
        } else await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "check_tags_no_messages_error"), messageID);
    }

    static async addTaggingGroup(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(await HL.getGroupLang(groupsDict, chatID, "add_tagging_group"), "");
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
                        await HDB.addArgsToDB(chatID, tag, phoneNumbersArray, null, "tags", async function () {
                            groupsDict[chatID].tags = ["add", tag, phoneNumbersArray];
                            await client.reply(chatID, (await HL.getGroupLang(groupsDict, chatID, "add_tagging_group_reply", tag)), messageID);
                        });
                    } else await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "add_tagging_group_already_exists_error", tag), messageID);
                } else client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "add_tagging_group_invalid_phone_numbers_error"), messageID);
            } else client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "add_tagging_group_no_phone_numbers_error"), messageID);
        } else client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "hyphen_reply"), messageID);
    }

    static async removeTaggingGroup(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(await HL.getGroupLang(groupsDict, chatID, "remove_tagging_group"), "");
        if (groupsDict[chatID].tags) {
            const tag = bodyText.trim();
            if (groupsDict[chatID].doesTagExist(tag)) {
                await HDB.delArgsFromDB(chatID, tag, "tags", async function () {
                    groupsDict[chatID].tags = ["delete", tag]
                    await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "remove_tagging_group_reply", tag), messageID);
                });
            } else client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "remove_tagging_group_does_not_exist_error"), messageID);
        } else client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_tags_error"), messageID);
    }

    static async addPersonToTaggingGroup(client, bodyText, chatID, messageID, groupsDict) {
        const matched = bodyText.match(await HL.getGroupLang(groupsDict, chatID, "add_person_to_tagging_group"));
        if (matched) {
            const tagPersonName = matched[1].trim(), tagGroupName = matched[2].trim();
            if (groupsDict[chatID].tags) {
                if (tagGroupName in groupsDict[chatID].tags && typeof (groupsDict[chatID].tags[tagGroupName]) === "object") {
                    if (tagPersonName in groupsDict[chatID].tags && typeof (groupsDict[chatID].tags[tagPersonName]) === "string") {
                        const phoneNumber = groupsDict[chatID].tags[tagPersonName];
                        if (!(groupsDict[chatID].tags[tagGroupName].includes(phoneNumber))) {
                            groupsDict[chatID].tags[tagGroupName].push(phoneNumber);
                            await HDB.delArgsFromDB(chatID, tagGroupName, "tags", async function () {
                                await HDB.addArgsToDB(chatID, tagGroupName, groupsDict[chatID].tags[tagGroupName], null, "tags", async function () {
                                    await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "add_person_to_tagging_group_reply", tagPersonName, tagGroupName), messageID);
                                });
                            });
                        } else await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "add_person_to_tagging_group_already_exists_error", tagPersonName, tagGroupName), messageID);
                    } else await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "person_doesnt_exist_in_this_group_error", tagPersonName), messageID);
                } else await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "tagging_group_group_doesnt_exist_error", tagGroupName), messageID);
            } else await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_tags_error"), messageID);
        }
    }

    static async removePersonFromTaggingGroup(client, bodyText, chatID, messageID, groupsDict) {
        const matched = bodyText.match(await HL.getGroupLang(groupsDict, chatID, "remove_person_from_tagging_group"));
        if (matched) {
            const tagPersonName = matched[1].trim(), tagGroupName = matched[2].trim();
            if (groupsDict[chatID].tags) {
                if (tagGroupName in groupsDict[chatID].tags && typeof (groupsDict[chatID].tags[tagGroupName]) === "object") {
                    if (tagPersonName in groupsDict[chatID].tags) {
                        const phoneNumber = groupsDict[chatID].tags[tagPersonName];
                        if (groupsDict[chatID].tags[tagGroupName].includes(phoneNumber)) {
                            groupsDict[chatID].tags[tagGroupName].splice(groupsDict[chatID].tags[tagGroupName].indexOf(phoneNumber), 1);
                            await HDB.delArgsFromDB(chatID, tagGroupName, "tags", async function () {
                                if (groupsDict[chatID].tags[tagGroupName].length !== 0) {
                                    await HDB.addArgsToDB(chatID, tagGroupName, groupsDict[chatID].tags[tagGroupName], null, "tags", async function () {
                                        await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "remove_person_from_tagging_group_reply", tagPersonName, tagGroupName), messageID);
                                    });
                                } else {
                                    delete groupsDict[chatID].tags[tagGroupName];
                                    await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "tagging_group_no_more_persons_error", tagGroupName), messageID);
                                }
                            });
                        } else await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "remove_person_from_tagging_group_does_not_exist_error", tagPersonName, tagGroupName), messageID);
                    } else await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "person_doesnt_exist_in_this_group_error", tagPersonName), messageID);
                } else await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "tagging_group_group_doesnt_exist_error", tagGroupName), messageID);
            } else await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_tags_error"), messageID);

        }
    }

    static async createTagList(client, bodyText, chatID, groupsDict) {
        if (groupsDict[chatID].tagStack.length === 0) {
            let matchTags = bodyText.match(/@\d+/g);
            if (!matchTags)
                await client.sendText(chatID, await HL.getGroupLang(groupsDict, chatID, "create_tag_list_empty_error"));
            else {
                for (let i = 0; i < matchTags.length; i++)
                    groupsDict[chatID].addNumberToTagStack(matchTags[i]);
                groupsDict[chatID].tagStack = groupsDict[chatID].tagStack.reverse();
                await client.sendText(chatID, await HL.getGroupLang(groupsDict, chatID, "create_tag_list_reply"));
            }
        }
    }

    static async nextPersonInList(client, chatID, messageID, groupsDict) {
        const tagStack = groupsDict[chatID].tagStack;
        if (tagStack.length !== 0) {
            if (tagStack.length === 1)
                await client.sendReplyWithMentions(chatID, await HL.getGroupLang(groupsDict, chatID, "tag_list_last_reply", tagStack.pop()), messageID);
            else if (tagStack.length > 1)
                await client.sendReplyWithMentions(chatID, await HL.getGroupLang(groupsDict, chatID, "tag_list_next_reply", tagStack.pop(), tagStack[tagStack.length - 1]), messageID)
        }
    }
}
