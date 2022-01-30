import {HDB} from "./HandleDB.js";
import {HL} from "./HandleLanguage.js";

export class HR {
    static async addReminder(client, bodyText, chatID, messageID, person, groupsDict, message, personsWithReminders) {
        const messageType = message.quotedMsgObj ? message.quotedMsgObj.type : message.type;
        message = message.quotedMsgObj ? message.quotedMsgObj : message;
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "add_reminder"), "").trim();
        let time = bodyText.match(/\d{1,2}:\d{2}/g);
        if (time) {
            time = time[0];
            const timeArray = time.split(":")
            const hour = parseInt(timeArray[0]);
            const minutes = parseInt(timeArray[1]);
            if (hour >= 0 && minutes >= 0 && hour <= 24 && minutes < 60) {
                const date = new Date();
                const matchedDateWithYear = bodyText.match(/^\d{1,2}\.\d{1,2}\.\d{4}/g);
                const matchedDateWithoutYear = bodyText.match(/^\d{1,2}\.\d{1,2}/g);
                const dayOfTheWeekAndBodyText = await this.getDayOfTheWeek(bodyText, groupsDict, chatID);
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
                const repeatReminder = !!(bodyText.match(HL.getGroupLang(groupsDict, chatID, "repeat_reminder")));
                const reminder =
                    messageType === "image" ? repeatReminder ? `repeatReminder${reminderInterval}Image` + await client.decryptMedia(message) : "Image" + await client.decryptMedia(message) :
                        messageType === "video" ? repeatReminder ? `repeatReminder${reminderInterval}Video` + +await client.decryptMedia(message) : "Video" + await client.decryptMedia(message) :
                            messageType === "chat" ? repeatReminder ? "repeatReminder" + reminderInterval + bodyText.replace(time, "").trim().replace(HL.getGroupLang(groupsDict, chatID, "repeat_reminder"), "") : bodyText.replace(time, "").trim() :
                                null;
                if (reminder) {
                    if (!person.doesReminderExist(reminderDate)) {
                        await HDB.addArgsToDB(chatID, reminderDate, reminder, null, "reminders", function () {
                            person.reminders = ["add", reminderDate, reminder];
                            !(personsWithReminders.includes(chatID)) ? personsWithReminders.push(chatID) : {};
                            HDB.delArgsFromDB("personsWithReminders", null, "rested", function () {
                                HDB.addArgsToDB("personsWithReminders", personsWithReminders, null, null, "rested", function () {
                                    client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_reminder_reply", time), messageID);
                                });
                            });
                        });
                    } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "reminder_already_exists_error"), messageID);
                }
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "reminder_time_error"), messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "reminder_time_error"), messageID);
    }

    static async removeReminder(client, bodyText, chatID, messageID, person, groupsDict, personsWithReminders) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "remove_reminder"), "").trim();
        let time = bodyText.match(/\d{1,2}:\d{2}/g);
        if (time) {
            const date = new Date();
            const matchedDateWithYear = bodyText.match(/^\d{1,2}\.\d{1,2}\.\d{4}/g);
            const matchedDateWithoutYear = bodyText.match(/^\d{1,2}\.\d{1,2}/g);
            const dayOfTheWeek = (await this.getDayOfTheWeek(bodyText, groupsDict, chatID))[0];
            time = time[0];
            let timeArray = time.split(":");
            let hour = parseInt(timeArray[0]), minutes = parseInt(timeArray[1]), month, day, year;
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
            if (person.doesReminderExist(reminderDate)) {
                await HDB.delArgsFromDB(chatID, reminderDate, "reminders", function () {
                    person.reminders = ["delete", reminderDate];
                    client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_reminder_reply", time), messageID);
                    if (Object.keys(person.reminders).length === 0) {
                        personsWithReminders.splice(personsWithReminders.indexOf(chatID), 1);
                        HDB.delArgsFromDB("personsWithReminders", null, "rested", function () {
                            HDB.addArgsToDB("personsWithReminders", personsWithReminders, null, null, "rested", function () {
                            });
                        });
                    }
                });
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "reminder_doesnt_exist_error"), messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "reminder_time_error"), messageID);
    }

    static async getDayOfTheWeek(bodyText, groupsDict, chatID) {
        let dayOfTheWeek;
        switch (true) {
            case !!(bodyText.match(HL.getGroupLang(groupsDict, chatID, "day_Sunday"))):
                dayOfTheWeek = 1;
                bodyText = bodyText.replace(bodyText.match(HL.getGroupLang(groupsDict, chatID, "day_Sunday"))[0], "").trim();
                return [dayOfTheWeek, bodyText];
            case !!(bodyText.match(HL.getGroupLang(groupsDict, chatID, "day_Monday"))):
                dayOfTheWeek = 2;
                bodyText = bodyText.replace(bodyText.match(HL.getGroupLang(groupsDict, chatID, "day_Monday"))[0], "").trim();
                return [dayOfTheWeek, bodyText];
            case !!(bodyText.match(HL.getGroupLang(groupsDict, chatID, "day_Tuesday"))):
                dayOfTheWeek = 3;
                bodyText = bodyText.replace(bodyText.match(HL.getGroupLang(groupsDict, chatID, "day_Tuesday"))[0], "").trim();
                return [dayOfTheWeek, bodyText];
            case !!(bodyText.match(HL.getGroupLang(groupsDict, chatID, "day_Wednesday"))):
                dayOfTheWeek = 4;
                bodyText = bodyText.replace(bodyText.match(HL.getGroupLang(groupsDict, chatID, "day_Wednesday"))[0], "").trim();
                return [dayOfTheWeek, bodyText];
            case !!(bodyText.match(HL.getGroupLang(groupsDict, chatID, "day_Thursday"))):
                dayOfTheWeek = 5;
                bodyText = bodyText.replace(bodyText.match(HL.getGroupLang(groupsDict, chatID, "day_Thursday"))[0], "").trim();
                return [dayOfTheWeek, bodyText];
            case !!(bodyText.match(HL.getGroupLang(groupsDict, chatID, "day_Friday"))):
                dayOfTheWeek = 6;
                bodyText = bodyText.replace(bodyText.match(HL.getGroupLang(groupsDict, chatID, "day_Friday"))[0], "").trim();
                return [dayOfTheWeek, bodyText];
            case !!(bodyText.match(HL.getGroupLang(groupsDict, chatID, "day_Saturday"))):
                dayOfTheWeek = 7;
                bodyText = bodyText.replace(bodyText.match(HL.getGroupLang(groupsDict, chatID, "day_Saturday"))[0], "").trim();
                return [dayOfTheWeek, bodyText];
            default:
                dayOfTheWeek = null;
                return [dayOfTheWeek, bodyText];
        }
    }

    static async showReminders(client, person, groupsDict, messageID, chatID) {
        let stringForSending = "";
        if (Object.keys(person.reminders).length !== 0) {
            for (let reminder in person.reminders) {
                const reminderDate = new Date(reminder);
                let reminderData = person.reminders[reminder];
                if (reminderData.startsWith("repeatReminder")) {
                    stringForSending += "*repeat* \n";
                    stringForSending = reminderData.replace(/repeatReminder\d/, "")
                }
                if (reminderData.startsWith("Video"))
                    stringForSending += `${reminderDate.getDate()}.${reminderDate.getMonth() + 1}.${reminderDate.getFullYear()} ${reminderDate.getHours()}:${reminderDate.getMinutes()} - ${HL.getGroupLang(groupsDict, chatID, "filter_type_video")}\n`;
                else if (reminderData.startsWith("Image"))
                    stringForSending += `${reminderDate.getDate()}.${reminderDate.getMonth() + 1}.${reminderDate.getFullYear()} ${reminderDate.getHours()}:${reminderDate.getMinutes()} - ${HL.getGroupLang(groupsDict, chatID, "filter_type_image")}\n`;
                else
                    stringForSending += `${reminderDate.getDate()}.${reminderDate.getMonth() + 1}.${reminderDate.getFullYear()} ${reminderDate.getHours()}:${reminderDate.getMinutes()} - ${reminderData.trim()}\n`;
            }
            await client.reply(chatID, stringForSending, messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "show_reminder_error"), messageID);
    }
}