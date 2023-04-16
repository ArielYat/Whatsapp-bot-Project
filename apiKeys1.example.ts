// noinspection SpellCheckingInspection

import {ChatId, ContactId, ConfigObject} from "@open-wa/wa-automate";

export default class apiKeys {
    static virusAPI = ""; //API key for virus total
    static cryptoAPI = ""; //API key for CoinMarketCap
    static stockAPI = ""; //API key for AlphaVantage
    static transcriptionAPI = "Bearer "; // API key for Open-AI Whisper
    static botDevs: ContactId[] = [<ContactId>"", <ContactId>""]; //People who can use the bot's admin commands
    static originalGroup: ChatId = <ChatId>""; //Some chat the bot can send a message to when it's turned on to fix a bug with replying and notify people it's online
    static secondGroup: ChatId = <ChatId>""; //Not really needed, but if you want to send a message to a second group when the bot is turned on, you can
    static region = ""; //For the schedule library, the region of the bot's users
    static DBurl = ""; //URL for the MongoDB database (can be local or remote)
    static configObj: ConfigObject = {
        headless: true, //If you want to run the bot in headless mode (no browser window)
        licenseKey: "", //If you have a license key for @open-wa/wa-automate, you can put it here. Some of the functions won't work without it.
        sessionData: "e30=", //If you want to use a pre-existing session
        skipSessionSave: true //If you want to use a pre-existing session
    };
}