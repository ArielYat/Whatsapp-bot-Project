import HL from "./HandleLanguage.js";
import HDB from "./HandleDB.js";

export default class HR {
    static async checkReminders(client, usersDict, groupsDict, personsWithReminders, currentDate) {
        for (const person of personsWithReminders) {
            const personID = usersDict[person].personID;
            for (const reminder in usersDict[person].reminders) {
                if (reminder.toString() !== currentDate.toString()) continue;

                const oldReminder = usersDict[person].reminders[reminder];
                const doRepeat = oldReminder.startsWith("repeatReminder");
                let stringForSending = doRepeat ? oldReminder.replace(/repeatReminder\d/, "") : oldReminder;
                switch (true) {
                    case stringForSending.startsWith("Video"):
                        await client.sendFile(personID, stringForSending.replace("Video", ""), "reminder",
                            await HL.getGroupLang(groupsDict, personID, "reminder_reminding"));
                        break;
                    case stringForSending.startsWith("Image"):
                        await client.sendImage(personID, stringForSending.replace("Image", ""), "reminder",
                            await HL.getGroupLang(groupsDict, personID, "reminder_reminding"));
                        break;
                    default:
                        await client.sendText(personID, stringForSending);
                        break;
                }
                const reminderDate = new Date(reminder);
                await HDB.delArgsFromDB(personID, reminderDate, "reminders", function () {
                    usersDict[person].reminders = ["delete", reminderDate];
                });
                if (!doRepeat) continue;

                let newReminderDate = new Date(reminder);
                newReminderDate.setDate(newReminderDate.getDate() + parseInt(oldReminder.match(/repeatReminder\d/)[0].replace("repeatReminder", "")));
                await HDB.addArgsToDB(personID, newReminderDate, oldReminder, null, "reminders", function () {
                    usersDict[person].reminders = ["add", newReminderDate, oldReminder];
                });
            }
        }
    }

    static async addReminder(client, bodyText, chatID, messageID, person, groupsDict, message, personsWithReminders) {
        bodyText = bodyText.replace(await HL.getGroupLang(groupsDict, chatID, "add_reminder"), "").trim();
        let time = bodyText.match(/\d{1,2}:\d{2}/g);
        if (!time) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "reminder_time_error"), messageID);
            return;
        }

        time = time[0];
        const timeArray = time.split(":")
        const hour = parseInt(timeArray[0]), minutes = parseInt(timeArray[1]);
        if (!(hour >= 0 && minutes >= 0 && hour <= 24 && minutes < 60)) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "reminder_time_error"), messageID);
            return;
        }

        const date = new Date(),
            matchedDateWithYear = bodyText.match(/^\d{1,2}\.\d{1,2}\.\d{4}/g),
            matchedDateWithoutYear = bodyText.match(/^\d{1,2}\.\d{1,2}/g),
            dayOfTheWeekAndBodyText = await this.getDayOfTheWeek(bodyText, groupsDict, chatID);
        const dayOfTheWeek = dayOfTheWeekAndBodyText[0];
        bodyText = dayOfTheWeekAndBodyText[1];
        let month, day, year, reminderInterval = 1;
        switch (true) {
            case (!!matchedDateWithYear):
                const matchedDateWithYearArray = matchedDateWithYear[0].split(".");
                day = parseInt(matchedDateWithYearArray[0]);
                month = parseInt(matchedDateWithYearArray[1]) - 1;
                year = parseInt(matchedDateWithYearArray[2]);
                bodyText = bodyText.replace(matchedDateWithYear[0], "").trim();
                break;
            case (!!matchedDateWithoutYear):
                const matchedDateWithoutYearArray = matchedDateWithoutYear[0].split(".");
                day = parseInt(matchedDateWithoutYearArray[0]);
                month = parseInt(matchedDateWithoutYearArray[1]) - 1;
                year = date.getFullYear();
                bodyText = bodyText.replace(matchedDateWithoutYear[0], "").trim();
                break;
            case (!!dayOfTheWeek):
                let dayToAdd = dayOfTheWeek - 1 < date.getDay() ? 7 - (date.getDay() - (dayOfTheWeek - 1)) :
                    (dayOfTheWeek - 1) - date.getDay();
                day = date.getDate() + dayToAdd;
                month = date.getMonth();
                year = date.getFullYear();
                reminderInterval = 7;
                break;
            default:
                day = date.getDate();
                month = date.getMonth();
                year = date.getFullYear();
        }
        const reminderDate = new Date(year, month, day, hour, minutes);
        const repeatReminder = (await HL.getGroupLang(groupsDict, chatID, "repeat_reminder")).test(bodyText);
        const messageType = message.quotedMsgObj ? message.quotedMsgObj.type : message.type;
        message = message.quotedMsgObj ? message.quotedMsgObj : message;
        const reminder =
            messageType === "image" ? repeatReminder ? `repeatReminder${reminderInterval}Image` + await client.decryptMedia(message) : "Image" + await client.decryptMedia(message) :
                messageType === "video" ? repeatReminder ? `repeatReminder${reminderInterval}Video` + await client.decryptMedia(message) : "Video" + await client.decryptMedia(message) :
                    messageType === "chat" ? repeatReminder ? "repeatReminder" + reminderInterval + bodyText.replace(time, "").trim().replace(await HL.getGroupLang(groupsDict, chatID, "repeat_reminder"), "") : bodyText.replace(time, "").trim() :
                        null;
        if (!reminder) return;
        if (person.doesReminderExist(reminderDate)) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "reminder_already_exists_error"), messageID);
            return;
        }

        await HDB.addArgsToDB(chatID, reminderDate, reminder, null, "reminders", function () {
            person.reminders = ["add", reminderDate, reminder];
            !(personsWithReminders.includes(chatID)) ? personsWithReminders.push(chatID) : {};
            HDB.delArgsFromDB("personsWithReminders", null, "rested", async function () {
                await HDB.addArgsToDB("personsWithReminders", personsWithReminders, null, null, "rested", async function () {
                    await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "add_reminder_reply", time), messageID);
                });
            });
        });
    }

    static async removeReminder(client, bodyText, chatID, messageID, person, groupsDict, personsWithReminders) {
        bodyText = bodyText.replace(await HL.getGroupLang(groupsDict, chatID, "remove_reminder"), "").trim();
        let time = bodyText.match(/\d{1,2}:\d{2}/g);
        if (!time) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "reminder_time_error"), messageID);
            return;
        }

        time = time[0];
        const timeArray = time.split(":");
        let hour = parseInt(timeArray[0]), minutes = parseInt(timeArray[1]), month, day, year;
        const date = new Date(),
            matchedDateWithYear = bodyText.match(/^\d{1,2}\.\d{1,2}\.\d{4}/g),
            matchedDateWithoutYear = bodyText.match(/^\d{1,2}\.\d{1,2}/g),
            dayOfTheWeek = (await this.getDayOfTheWeek(bodyText, groupsDict, chatID))[0];
        switch (true) {
            case (!!matchedDateWithYear):
                const matchedDateWithYearArray = matchedDateWithYear[0].split(".");
                day = matchedDateWithYearArray[0];
                month = matchedDateWithYearArray[1] - 1;
                year = matchedDateWithYearArray[2];
                break;
            case (!!matchedDateWithoutYear):
                const matchedDateWithoutYearArray = matchedDateWithoutYear[0].split(".");
                day = matchedDateWithoutYearArray[0];
                month = matchedDateWithoutYearArray[1] - 1;
                year = date.getFullYear();
                break;
            case (!!dayOfTheWeek):
                let dayToAdd = dayOfTheWeek - 1 < date.getDay() ? 7 - (date.getDay() - (dayOfTheWeek - 1)) :
                    (dayOfTheWeek - 1) - date.getDay();
                day = date.getDate() + dayToAdd;
                month = date.getMonth();
                year = date.getFullYear();
                break;
            default:
                day = date.getDate();
                month = date.getMonth();
                year = date.getFullYear();
        }
        let reminderDate = new Date(year, month, day, hour, minutes);
        if (!person.doesReminderExist(reminderDate)) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "reminder_doesnt_exist_error"), messageID);
            return;
        }

        await HDB.delArgsFromDB(chatID, reminderDate, "reminders", async function () {
            person.reminders = ["delete", reminderDate];
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "remove_reminder_reply", time), messageID);
            if (Object.keys(person.reminders).length === 0) {
                personsWithReminders.splice(personsWithReminders.indexOf(chatID), 1);
                await HDB.delArgsFromDB("personsWithReminders", null, "rested", async function () {
                    await HDB.addArgsToDB("personsWithReminders", personsWithReminders, null, null, "rested", function () {
                    });
                });
            }
        });
    }

    static async getDayOfTheWeek(bodyText, groupsDict, chatID) : Promise<[number, string] | [null, string]> {
        let dayOfTheWeek;
        switch (true) {
            case (await HL.getGroupLang(groupsDict, chatID, "day_Sunday")).test(bodyText):
                dayOfTheWeek = 1;
                bodyText = bodyText.replace(bodyText.match(await HL.getGroupLang(groupsDict, chatID, "day_Sunday"))[0], "").trim();
                return [dayOfTheWeek, bodyText];
            case (await HL.getGroupLang(groupsDict, chatID, "day_Monday")).test(bodyText):
                dayOfTheWeek = 2;
                bodyText = bodyText.replace(bodyText.match(await HL.getGroupLang(groupsDict, chatID, "day_Monday"))[0], "").trim();
                return [dayOfTheWeek, bodyText];
            case (await HL.getGroupLang(groupsDict, chatID, "day_Tuesday")).test(bodyText):
                dayOfTheWeek = 3;
                bodyText = bodyText.replace(bodyText.match(await HL.getGroupLang(groupsDict, chatID, "day_Tuesday"))[0], "").trim();
                return [dayOfTheWeek, bodyText];
            case (await HL.getGroupLang(groupsDict, chatID, "day_Wednesday")).test(bodyText):
                dayOfTheWeek = 4;
                bodyText = bodyText.replace(bodyText.match(await HL.getGroupLang(groupsDict, chatID, "day_Wednesday"))[0], "").trim();
                return [dayOfTheWeek, bodyText];
            case (await HL.getGroupLang(groupsDict, chatID, "day_Thursday")).test(bodyText):
                dayOfTheWeek = 5;
                bodyText = bodyText.replace(bodyText.match(await HL.getGroupLang(groupsDict, chatID, "day_Thursday"))[0], "").trim();
                return [dayOfTheWeek, bodyText];
            case (await HL.getGroupLang(groupsDict, chatID, "day_Friday")).test(bodyText):
                dayOfTheWeek = 6;
                bodyText = bodyText.replace(bodyText.match(await HL.getGroupLang(groupsDict, chatID, "day_Friday"))[0], "").trim();
                return [dayOfTheWeek, bodyText];
            case (await HL.getGroupLang(groupsDict, chatID, "day_Saturday")).test(bodyText):
                dayOfTheWeek = 7;
                bodyText = bodyText.replace(bodyText.match(await HL.getGroupLang(groupsDict, chatID, "day_Saturday"))[0], "").trim();
                return [dayOfTheWeek, bodyText];
            default:
                dayOfTheWeek = null;
                return [dayOfTheWeek, bodyText];
        }
    }

    static async showReminders(client, person, groupsDict, messageID, chatID) {
        let stringForSending = "";
        if (!Object.keys(person.reminders).length) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "show_reminder_error"), messageID);
            return;
        }

        for (let reminder in person.reminders) {
            const reminderDate = new Date(reminder);
            let reminderData = person.reminders[reminder];
            if (reminderData.startsWith("repeatReminder")) {
                stringForSending += "*repeat* \n";
                reminderData = reminderData.replace(/repeatReminder\d/, "");
            }
            const hour = reminderDate.getHours() < 10 ? "0" + reminderDate.getHours() : reminderDate.getHours();
            const minutes = reminderDate.getMinutes() < 10 ? "0" + reminderDate.getMinutes() : reminderDate.getMinutes();
            if (reminderData.startsWith("Video"))
                stringForSending += `${reminderDate.getDate()}.${reminderDate.getMonth() + 1}.${reminderDate.getFullYear()} ${hour}:${minutes} - ${await HL.getGroupLang(groupsDict, chatID, "filter_type_video")}\n`;
            else if (reminderData.startsWith("Image"))
                stringForSending += `${reminderDate.getDate()}.${reminderDate.getMonth() + 1}.${reminderDate.getFullYear()} ${hour}:${minutes} - ${await HL.getGroupLang(groupsDict, chatID, "filter_type_image")}\n`;
            else
                stringForSending += `${reminderDate.getDate()}.${reminderDate.getMonth() + 1}.${reminderDate.getFullYear()} ${hour}:${minutes} - ${reminderData.trim()}\n`;
        }
        await client.reply(chatID, stringForSending, messageID);
    }
}