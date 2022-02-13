# WhatsApp Bot - John the Legendary

<summary>Table of Contents</summary>

- [Description](#Description)
- [Commands and Features the bot responds to](#commands-and-features-the-bot-responds-to)
  - [Language](ModulesDatabase/HandleLanguage.ts)
  - [Filters](ModulesDatabase/HandleFilters.ts)
  - [Tags](ModulesDatabase/HandleTags.ts)
  - [Birthdays](ModulesDatabase/HandleBirthdays.ts)
  - [Permissions](ModulesDatabase/HandlePermissions.ts)
  - [Reminders](ModulesDatabase/HandleReminders.ts)
  - [Stickers](ModulesImmediate/HandleStickers.ts)
  - [Internet Commands](ModulesImmediate/HandleAPIs.ts)
  - [Miscellaneous Commands](#Miscellaneous Commands)
  - [Commands limited to the bot developers](ModulesDatabase/HandleAdminFunctions.ts)
- [Dependencies and APIs used](#dependencies-and-apis-used)
  - [Dependencies](#Dependencies)
  - [APIs](#APIs)
- [Acknowledgements](#Acknowledgements)
- [License](#License)

---

## Description

This is a Whatsapp Bot which is built with TypeScript and Node.js.

It has a lot of different functions and features and is currently in development.

If you have any questions, feel free to contact ArielYat or TheBooker66.

## Commands and Features the bot responds to

### [Language](ModulesDatabase/HandleLanguage.ts)

- `Change language to [language]` - changes the language the bot receives and sends messages in.
  - For example: Change language to Hebrew.
  - This command can be used at all times in every language.
  - Languages currently supported: Hebrew, English, French.
- `Help [-|language|filters|tags|birthdays|permissions|reminders|stickers|internet|others]` - shows the various help
  messages, which in total list all the commands (except those available only to bot devs).

### [Filters](ModulesDatabase/HandleFilters.ts)

_Filters can be text, images or videos_

- `Add filter [filter] - [bot reply]` - adds a filter to the group.
  - For example: Add filter food - banana.
- `Remove filter [filter]` - removes the specified filter from the group.
  - For example: Remove filter food.
- `Edit filter [existing filter] - [new reply]` - edits the specified filter.
  - For example: Edit filter food - peach.
- `Show filters` - displays the list of all filter and their replies in the group.
- Special Tip: When adding a filter you can use `[name]` to tag someone when the filter is invoked.
  - For example: `Add filter food - [Joseph]` will make the bot tag Joseph whenever "food" is said.

### [Tags](ModulesDatabase/HandleTags.ts)

- `Tag [person]` - tags someone so that they get a notification even if the group is muted on their phone.
  - For example: Tag Joseph.
- `Tag everyone` - tags all people in the group.
- `Add tag buddy [name] - [phone number in international format]` - adds the person to the list of taggable people.
  - For example: Add tagging buddy Joseph - 972501234567.
- `Remove tag buddy [name]` - removes the person from the list of taggable people.
  - For example: Remove tagging buddy Joseph.
- `Add tagging group [tagging group name] - [names of people in the group, divided by commas]` - Adds a tagging group
  which can be used to tag multiple people at once
  - For example: Add tagging group Banana - Moshe, Joseph, Aviram
- `Remove tagging group [tagging group name]` - removed the mentioned tagging group
- `Show tag buddies` - displays the list of all taggable people in the group
- `Check where I've been tagged` - replies to all the messages in which the author has been tagged, bringing them to the
  front of the chat.
- `Clear my tags` - clears the saved tags of the message's author.

### [Birthdays](ModulesDatabase/HandleBirthdays.ts)

- `Add birthday [date in international format with periods]` - adds a birthday for message's author.
  - For example: Add birthday 1.11.2011.
- `Remove birthday` - removes the author's birthday.
- `Show birthdays` - displays the birthdays of the group members.
- `Add group to the birthday distribution list` - adds the group the message was sent in to the author's birthday
  message broadcast.
- `Remove group from the birthday distribution list` - removes the group the message was sent in from the author's
  birthday message broadcast.

### [Permissions](ModulesDatabase/HandlePermissions.ts)

- `Define permission for [permission type] - [Admin/Regular/Muted]` - defines the permission level required for a
  certain type of commands.
    - For example: Define permission filters - Admin.
    - Permission types: filters, tags, handle_Filters, handle_Tags, handle_Birthdays, handle_Shows, handle_Other.
- `Mute [person tag]` - mutes the tagged person, so they aren't able to use commands.
    - For example: Mute @Joseph.
- `Unmute person [person tag]` - unmutes the tagged person.
    - For example: Unmute @Joseph.
- `Show function permissions` - displays the permissions levels of the different types of commands.
- `Show people permissions` - displays the permissions levels of the people in the group.

### [Reminders](ModulesDatabase/HandleReminders.ts)

_All the reminder related commands work only in a private chat with the bot. Reminders can be text, images or videos The
date in the commands is optional (if no date is inputted the assumption is that the reminder is for the same date the
message was written in) and can include or not include a year._

- `Add reminder [repeat] [date] [time] [text]` - adds a reminder to the message's author.
  - For example: Add reminder 2.5.2023 7:34 Walk the cat
  - The optional parameter "repeat" creates a repeating reminder every day from the first date specified at the
    specified hour.
  - Reminders can be text, images or videos.
- `Remove reminder [date] [hour]` - deletes the reminder set at the specified time.
  - For example: Remove reminder 7:34
- `Show reminders` - Shows the author's reminders.

### [Stickers](ModulesImmediate/HandleStickers.ts)

- `Create sticker [without cropping] [High Quality/Medium Quality]` - creates a sticker out of a message or a media file
  and sends it
  - This command can be used in the message the media was sent in and as a reply to it
  - `without cropping` is an optional parameter which creates the sticker without cropping it
  - `high quality` and `medium quality` and option parameter which control the sticker's resolution; the default is
    medium quality
- `Create text sticker [colour] - [text]` - creates a sticker without a background with the given text
  - If the parameter "colour" isn't given, the default is black

### [Internet Commands](ModulesImmediate/HandleAPIs.ts)

_All of the commands below have a certain daily limit_

- `Check Crypto` - sends a message with the exchange rates of ten different cryptocurrencies compared to the Dollar.
- `Check stock [stock symbol]` - sends a message with the current info about the stock.
- `Internet definition [word]` - searches for the word in the website Urban Dictionary and returns the search result.
  - For example: Internet definition chair
- `Translate to [some language] [words]` - translates the words to the given language via Google Translate.
  - For example: Translate to Hebrew chair
  - In the translation text only one sentence can be written due to Google Translate restrictions.
- `Download music [link to youtube]` - downloads a song from youtube and sends it as voice message.
- [`Scan [link]`](ModulesImmediate/HandleURLs.ts) - scans the given link for viruses.
  - For example: Scan https://www.google.com/

### Miscellaneous Commands

- Links can be scanned in the message the command is sent in or in a quoted message
- [`Profile`](ModulesImmediate/HandleUserStats.ts) - shows the bot's information about the message's author
- [`Activate do not disturb` or `!afk`](ModulesDatabase/HandleAFK.ts) - sets the the user's status to "afk", which means
  they won't get pings
- [Create a WhatsApp survey](ModulesImmediate/HandleSurveys.ts):
- `Create survey Title - [survey title]
  Subtitle - [survey subtitle]
  Third Title - [third title]
  Button 1 - [first option]
  Button 2 - [second option]
  Button 3 - [third option]`
  - (The third title and buttons 1 and 2 aren't required)
- [`Send link`](ModuleWebsite/HandleWebsite.ts) - sends a link to the bots webpage (work in progress)

<!--
### [Deletion from the database](ModulesDatabase/HandleDB.ts)

- `Delete this group from the database` - deletes all of the group's information from the database.
- `Delete me from the database` - deletes all of the author's information from the database.

**Use these commands with caution, their effects are irreversible**
-->

### [Commands limited to the bot developers](ModulesDatabase/HandleAdminFunctions.ts)

- `/Ban [user]` & `/Unban [user]` - ban a user from using the bot.
- `/Block group` & `/Unblock group` - block a group's members from using the bot.
- `Join [link to Whatsapp group]` - Invite the bot to a group via a link.
- `!Ping` - shows the ping, the current chat amount, the total chat amount, the total user amount, the current muted
  group amount, the current muted user amount and the time since startup.
- `/exec [command]` - executes the given command.

The bot also autotempbans groups or users who are spamming it for a short time period.

## Dependencies and APIs used

### Dependencies

[@open-wa/wa-automate](https://www.npmjs.com/package/@open-wa/wa-automate) for the WhatsApp "link".

[mongodb](https://www.npmjs.com/package/mongodb) for storing our database.

[node-fetch](https://www.npmjs.com/package/node-fetch) for sending some requests to APIs

[node-schedule](https://www.npmjs.com/package/node-schedule) for timing the birthday checking.

[node-virustotal](https://www.npmjs.com/package/node-virustotal) for scanning links for viruses.

[util](https://www.npmjs.com/package/util) for formatting strings.

### APIs

[CoinMarketCap](https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest) for checking cryptocurrency prices.

[Urban Dictionary](https://api.urbandictionary.com/v0/define?term=) for Urban dictionary.

[Google Translate](https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=query) for the
translations.

## Acknowledgements

[@ArielYat](https://github.com/ArielYat) - Ariel - Starting the project and developing most of the bot's functionality

[@TheBooker66](https://github.com/TheBooker66) - Ethan - Developing a lot of the bot's functionality and English support

[@Arbel99](https://github.com/Arbel99) - Arbel - Latin support

Maayan Ranson - French Support

[@Lainad27](https://github.com/Lainad27) - Daniel - Developing the message to a sticker functionality
## License

This project is licensed under the GPL-3.0 license.

See [LICENSE](LICENSE) for more information.

## RIP

- Moshe
- Aviram
- Alexander The Great