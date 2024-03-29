import HDB from "./HandleDB.js";
import HL from "./HandleLanguage.js";
import {TillZero} from "../Main";

export default class HP {
    static async setFunctionPermissionLevel(client, bodyText, chatID, messageID, personPermission, groupFunctionPermissions, groupsDict) {
        bodyText = bodyText.replace(await HL.getGroupLang(groupsDict, chatID, "set_permissions"), "");
        if (!bodyText.includes("-")) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "hyphen_reply"), messageID);
            return;
        }

        const textArray = bodyText.split("-");
        const permissionType: string = await this.wordToFunctionType(groupsDict, chatID, textArray[0].trim());
        if (!permissionType) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "permission_option_does_not_exist_error"), messageID)
            return;
        }

        const permissionLevel: TillZero<5> = await this.wordToFunctionPermission(groupsDict, chatID, textArray[1].trim());
        if (!permissionLevel) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "permission_level_does_not_exist_error"), messageID);
            return;
        }

        if (permissionLevel >= 0 &&
            ((groupFunctionPermissions[permissionType] <= personPermission && permissionLevel <= personPermission) ||
                (personPermission >= 2 && (permissionLevel === 4 ||
                    (groupFunctionPermissions[permissionType] === 4 && permissionLevel <= personPermission))))) {
            await HDB.delArgsFromDB(chatID, permissionType, "groupPermissions", async function () {
                await HDB.addArgsToDB(chatID, permissionType, permissionLevel, null, "groupPermissions", async function () {
                    groupsDict[chatID].functionPermissions = [permissionType, permissionLevel];
                    client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "set_permissions_reply"), messageID);
                });
            });
        } else await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "set_permissions_error"), messageID);
    }

    static async autoAssignPersonPermissions(group, person, chatID) {
        if (group.groupAdmins.includes(person.personID)) {
            await HDB.delArgsFromDB(chatID, person.personID, "perm", async function () {
                await HDB.addArgsToDB(chatID, person.personID, 2, null, "perm", async function () {
                    person.permissionLevel[chatID] = 2;
                });
            });
        } else {
            await HDB.delArgsFromDB(chatID, person.personID, "perm", async function () {
                await HDB.addArgsToDB(chatID, person.personID, 1, null, "perm", async function () {
                    person.permissionLevel[chatID] = 1;
                });
            });
        }
    }

    static async muteParticipant(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict) {
        bodyText = bodyText.split(" ");
        if (bodyText.length !== 2) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "no_participant_chosen_error"), messageID);
            return;
        }

        const personTag = bodyText[1].trim(), personID = personTag.replace("@", "") + "@c.us";
        if ((groupsDict[chatID].personsIn.some((person) => personID === person.personID))) {
            if (usersDict[authorID].permissionLevel[chatID] > usersDict[personID].permissionLevel[chatID]) {
                await HDB.delArgsFromDB(chatID, personID, "perm", async function () {
                    await HDB.addArgsToDB(chatID, personID, 0, null, "perm", async function () {
                        usersDict[personID].permissionLevel[chatID] = 0;
                        await client.sendReplyWithMentions(chatID, await HL.getGroupLang(groupsDict, chatID, "mute_participant_reply", personTag), messageID);
                    });
                });
            } else await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "set_permissions_error"), messageID);
        } else await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "participant_not_in_group_error"), messageID);
    }

    static async unmuteParticipant(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict) {
        bodyText = bodyText.split(" ");
        if (bodyText.length !== 3) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "no_participant_chosen_error"), messageID);
            return;
        }

        const personTag = bodyText[2].trim(), personID = personTag.replace("@", "") + "@c.us";
        if ((groupsDict[chatID].personsIn.some((person) => personID === person.personID))) {
            if (usersDict[authorID].permissionLevel[chatID] > usersDict[personID].permissionLevel[chatID]) {
                await this.autoAssignPersonPermissions(groupsDict[chatID], usersDict[personID], chatID);
                await client.sendReplyWithMentions(chatID, await HL.getGroupLang(groupsDict, chatID, "unmute_participant_reply", personTag), messageID);
            } else await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "set_permissions_error"), messageID);
        } else await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "participant_not_in_group_error"), messageID);
    }

    static async updateGroupAdmins(client, chatID, groupsDict) {
        groupsDict[chatID].groupAdmins = await client.getGroupAdmins(chatID);
        await HDB.delArgsFromDB(chatID, null, "groupAdmins", async function () {
            await HDB.addArgsToDB(chatID, groupsDict[chatID].groupAdmins, null, null, "groupAdmins", async function () {
                const developerPerm = 3, mutedPerm = 0;
                for (let i = 0; i < groupsDict[chatID].personsIn.length; i++) {
                    if (groupsDict[chatID].personsIn[i].permissionLevel[chatID] === undefined ||
                        (groupsDict[chatID].personsIn[i].permissionLevel[chatID].toString() !== developerPerm.toString() &&
                            groupsDict[chatID].personsIn[i].permissionLevel[chatID].toString() !== mutedPerm.toString())) {
                        await HP.autoAssignPersonPermissions(groupsDict[chatID], groupsDict[chatID].personsIn[i], chatID);
                    }
                }

            });
        });
    }

    static async showGroupFunctionsPermissions(client, chatID, messageID, groupsDict) {
        let stringForSending = "";
        for (let permission in groupsDict[chatID].functionPermissions)
            stringForSending += await this.functionTypeToWord(groupsDict, chatID, permission) + " - " +
                await this.functionPermissionToWord(groupsDict, chatID, groupsDict[chatID].functionPermissions[permission]) + "\n";
        client.reply(chatID, stringForSending, messageID);
    }

    static async showGroupPersonsPermissions(client, chatID, messageID, groupsDict) {
        let stringForSending = "";
        const group = groupsDict[chatID];
        for (const person of group.personsIn) {
            let tempPhoneNumber = person.personID.replace("@c.us", "");
            if (group.tags.length !== 0) {
                for (const name in group.tags) {
                    if (group.tags[name] === tempPhoneNumber)
                        tempPhoneNumber = name;
                }
            }
            stringForSending += tempPhoneNumber + " - " + await this.functionPermissionToWord(groupsDict, chatID, person.permissionLevel[chatID]) + "\n";
        }
        await client.reply(chatID, stringForSending, messageID);
    }

    static async functionPermissionToWord(groupsDict, chatID, permissionNumber: TillZero<5>): Promise<string | null> {
        switch (permissionNumber) {
            case 0:
            case 4:
                return await HL.getGroupLang(groupsDict, chatID, "muted_permission_level_replace");
            case 3:
                return await HL.getGroupLang(groupsDict, chatID, "developer_permission_level_replace");
            case 2:
                return await HL.getGroupLang(groupsDict, chatID, "admin_permission_level_replace");
            case 1:
                return await HL.getGroupLang(groupsDict, chatID, "regular_permission_level_replace");
            default:
                return null;
        }
    }

    private static async wordToFunctionPermission(groupsDict, chatID, text: string): Promise<TillZero<5> | null> {
        switch (true) {
            case (await HL.getGroupLang(groupsDict, chatID, "muted_permission_level")).test(text):
                return 4;
            case (await HL.getGroupLang(groupsDict, chatID, "developer_permission_level")).test(text):
                return 3;
            case (await HL.getGroupLang(groupsDict, chatID, "admin_permission_level")).test(text):
                return 2;
            case (await HL.getGroupLang(groupsDict, chatID, "regular_permission_level")).test(text):
                return 1;
            default:
                return null;
        }
    }

    private static async functionTypeToWord(groupsDict, chatID, permissionType): Promise<string | null> {
        switch (permissionType) {
            case "filters":
                return await HL.getGroupLang(groupsDict, chatID, "filters_permission_type_replace")
            case "tags":
                return await HL.getGroupLang(groupsDict, chatID, "tags_permission_type_replace");
            case "handleFilters":
                return await HL.getGroupLang(groupsDict, chatID, "handleFilters_permission_type_replace");
            case "handleTags":
                return await HL.getGroupLang(groupsDict, chatID, "handleTags_permission_type_replace");
            case "handleBirthdays":
                return await HL.getGroupLang(groupsDict, chatID, "handleBirthdays_permission_type_replace");
            case "HandleReminders":
                return await HL.getGroupLang(groupsDict, chatID, "HandleReminders_permission_type_replace");
            case "handleShows":
                return await HL.getGroupLang(groupsDict, chatID, "handleShows_permission_type_replace");
            case "handleOther":
                return await HL.getGroupLang(groupsDict, chatID, "handleOther_permission_type_replace");
            default:
                return null;
        }
    }

    private static async wordToFunctionType(groupsDict, chatID, text): Promise<string | null> {
        switch (true) {
            case (await HL.getGroupLang(groupsDict, chatID, "filters_permission_type")).test(text):
                return "filters";
            case (await HL.getGroupLang(groupsDict, chatID, "tags_permission_type")).test(text):
                return "tags";
            case (await HL.getGroupLang(groupsDict, chatID, "handleFilters_permission_type")).test(text):
                return "handleFilters";
            case (await HL.getGroupLang(groupsDict, chatID, "handleTags_permission_type")).test(text):
                return "handleTags";
            case (await HL.getGroupLang(groupsDict, chatID, "handleBirthdays_permission_type")).test(text):
                return "handleBirthdays";
            case (await HL.getGroupLang(groupsDict, chatID, "HandleReminders_permission_type")).test(text):
                return "HandleReminders";
            case (await HL.getGroupLang(groupsDict, chatID, "handleShows_permission_type")).test(text):
                return "handleShows";
            case (await HL.getGroupLang(groupsDict, chatID, "handleOther_permission_type")).test(text):
                return "handleOther";
            default:
                return null;
        }
    }
}