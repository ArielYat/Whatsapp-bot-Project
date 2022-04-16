import HL from "../ModulesDatabase/HandleLanguage.js";

export default class HSu {
    static async makeButtons(client, bodyText, chatID, messageID, groupsDict) {
        let title = bodyText.match(await HL.getGroupLang(groupsDict, chatID, "survey_title")),
            secondTitle = bodyText.match(await HL.getGroupLang(groupsDict, chatID, "survey_subtitle")),
            thirdTitle = bodyText.match(await HL.getGroupLang(groupsDict, chatID, "third_survey_title"));
        const button1 = bodyText.match(await HL.getGroupLang(groupsDict, chatID, "survey_button_1")),
            button2 = bodyText.match(await HL.getGroupLang(groupsDict, chatID, "survey_button_2")),
            button3 = bodyText.match(await HL.getGroupLang(groupsDict, chatID, "survey_button_3"));
        if (title && secondTitle && button1) {
            title = title[0].replace(await HL.getGroupLang(groupsDict, chatID, "survey_title_replace"), "").trim();
            secondTitle = secondTitle[0].replace(await HL.getGroupLang(groupsDict, chatID, "second_survey_title_replace"), "").trim();
            const buttonArray = [];
            if (button1) {
                buttonArray.push({
                    id: "1",
                    "text": button1[0].replace(await HL.getGroupLang(groupsDict, chatID, "survey_button_1_replace"), "").trim()
                });
            }
            if (button2) {
                buttonArray.push({
                    id: "2",
                    "text": button2[0].replace(await HL.getGroupLang(groupsDict, chatID, "survey_button_2_replace"), "").trim()
                });
            }
            if (button3) {
                buttonArray.push({
                    id: "3",
                    "text": button3[0].replace(await HL.getGroupLang(groupsDict, chatID, "survey_button_3_replace"), "").trim()
                });
            }
            if (thirdTitle) {
                thirdTitle = thirdTitle[0].replace(await HL.getGroupLang(groupsDict, chatID, "third_survey_title_replace"), "").trim();
                await client.sendButtons(chatID, secondTitle, buttonArray, title, thirdTitle);
            } else await client.sendButtons(chatID, secondTitle, buttonArray, title);
        } else await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "survey_creation_error"), messageID);
    }
}