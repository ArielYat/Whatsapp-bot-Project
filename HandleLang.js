class HandleLang {
    static async changeGroupLang(client, message, groupsDict){
        const chatID = message.chat.id;
        let text = message.body;
        if(text.startsWith("שנה שפה") || text.startsWith("Change lang")) {
            let langCode;
            let textArray = text.split(" ");
            if (chatID in groupsDict) {
                if(textArray[2] === "עברית"){
                    langCode = "he";

                    await client.sendText(chatID, "השפה שונתה בהצלחה");
                }
                else if(textArray[2] === "English"){
                    langCode = "en";
                    await client.sendText(chatID, "language changed successfully");
                }
                if(langCode != null) {
                    groupsDict[chatID].changeLang(langCode);
                }
                else{
                    client.reply(chatID, "only עברית or English exist supported by the bot", message.id);
                }
            }
        }
    }
}
module.exports = HandleLang;