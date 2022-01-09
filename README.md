# WhatsApp Bot Project - John the Legendary

## Commands

### [Language](ModulesDatabase/HandleLanguage.js)

- `Change language to [language]` - changes the language the bot receives and sends messages in.
  - For example: Change language to Hebrew.
  - This command can be used at all times in every language. Languages currently supported: Hebrew, English & Latin.
- `Help` - shows the help message.

### [Filters](ModulesDatabase/HandleFilters.js)

- `Add filter [filter] - [bot reply]` - adds a filter to the group.
  - For example: Add filter food - banana.
  - Filters can be text, images or videos.
- `Remove filter [filter]` - removes the specified filter from the group.
  - For example: Remove filter food.
- `Edit filter [existing filter] - [new reply]` - edits the specified filter.
  - For example: Edit filter food - peach.
- `Show filters` - displays the list of all filter and their replies in the group.

### [Tags](ModulesDatabase/HandleTags.js)

- `Tag [person]` - tags someone so that they get a notification even if the group is muted on their phone.
  - For example: Tag Joseph.
- `Add tag buddy [name] - [phone number in international format]` - adds the person to the list of taggable people.
  - For example: Add tagging buddy Joseph - 972501234567.
- `Remove tag buddy [name]` - removes the person from the list of taggable people.
  - For example: Remove tagging buddy Joseph.
- `Tag everyone` - tags all people in the group.
- `Show tag buddies` - displays the list of all taggable people in the group.
- `Check where I've been tagged` - replies to all the messages in which the author has been tagged, bringing them to the front of the chat.
- `Clear my tags` - clears the saved tags of the message's author.

### [Birthdays](ModulesDatabase/HandleBirthdays.js)

- `Add birthday [date in international format with periods]` - adds a birthday for message's author.
  - For example: Add birthday 1.11.2011.
- `Remove birthday` - removes the author's birthday.
  - For example: Remove birthday.
- `Add group to birthday message` - adds the group the message was sent in to the author's birthday message broadcast.
- `Remove group from birthday message` - removes the group the message was sent in from the author's birthday message broadcast.
- `Show birthdays` - displays the birthdays of the group members.

### [Permissions & Muting](ModulesDatabase/HandlePermissions.js)

- `Define permission for [permission type] - [number from 0 to 3]` - defines the permission level required for a certain type of commands.
  - For example: Define permission filters - 1.
  - Permission types: filters, tags, handleShows, handleFilters, handleTags, handleBirthdays, handleOthers. 
  - Number meaning: 0 - muted member, 1 - regular member, 2 - group admin, 3 - no one can use the commands with this this permission level.
- `Mute [person tag]` - mutes the tagged person so they aren't able to use commands.
  - For example: Mute @Joseph.
- `Unmute person [person tag]` - unmutes the tagged person.
  - For example: Unmute @Joseph.
- `Show function permissions` - displays the permissions levels of the different types of commands.
- `Show people permissions` - displays the permissions levels of the people in the group.

### [Miscellaneous](ModulesImmediate)

- [`Create sticker [without cropping/-]`](ModulesImmediate/HandleStickers.js) - creates a sticker out of a media file and sends it.
  - This command can be used in the message the media was sent in and as a reply to it.
  - "without cropping" is an optional parameter which creates the sticker without cropping it. 
- [`Check Crypto`](ModulesImmediate/HandleAPIs.js) - sends a message with the exchange rates of ten different cryptocurrencies compared to the Dollar.
- [`Internet definition [word]`](ModulesImmediate/HandleAPIs.js) - searches for the word on the website Urban Dictionary and returns the search result.
- [`Translate to [some language] [text]`](ModulesImmediate/HandleAPIs.js) - translates the text with Google Translate to the desired language.
- [`Scan [link]`](ModulesImmediate/HandleURLs.js) - scans the given link for viruses.
  - For example: Scan https://www.google.com/.
- [`Send link`](ModuleWebsite/HandleWebsite.js) - sends a link to the bots webpage (work in progress).
- [Create a WhatsApp survey](ModulesImmediate/HandleSurveys.js):
  ```
  Create survey
  Title - [survey title]
  Subtitle - [survey subtitle]
  Third Title - [third title]
  Button 1 - [first option]
  Button 2 - [second option]
  Button 3 - [third option]
  ```
  - (The third title and buttons 1 and 2 aren't required).

<!---
### [Deletion from the database](ModulesDatabase/HandleDB.js)

- `Delete this group from the database` - deletes all of the group's information from the database.
- `Delete me from the database` - deletes all of the author's information from the database.

**Use these commands with caution, their effects are irreversible**
--->

### Special tip

- When adding a filter you can use [name] to tag someone when the filter is invoked. For
  example: `Add filter food - [Joseph]` will make the bot tag Joseph whenever "food" is said.

### [Commands limited to bot developers](ModulesDatabase/HandleAdminFunctions.js)

- Blocking/unblocking a user or group from using the bots commands.
- Inviting the bot to a group via a link.
- `Ping!` command to check the bot's status and stats.

The bot also autotempbans groups or users who are spamming it for a short time period.

## Dependencies and APIs used

[@open-wa/wa-automate](https://www.npmjs.com/package/@open-wa/wa-automate) for the WhatsApp "link".

[mongodb](https://www.npmjs.com/package/mongodb) for storing our database.

[node-schedule](https://www.npmjs.com/package/node-schedule) for timing the birthday checking.

[node-virustotal](https://www.npmjs.com/package/node-virustotal) for scanning links for viruses.

[node-fetch](https://www.npmjs.com/package/node-fetch) for sending requests to the APIs

[usleep](https://www.npmjs.com/package/usleep) for timing out the bot while the antivirus scan takes place.

[util](https://www.npmjs.com/package/util) for formatting strings.

[CoinMarketCap](https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest) for checking cryptocurrencies
prices'

[Urban Dictionary](https://api.urbandictionary.com/v0/define?term=) for Urban dictionary.

[Google Translate](https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=query) for the translations.

## Credits

[@ArielYat](https://github.com/ArielYat) - Starting the project and developing the bot

[@TheBooker66](https://github.com/TheBooker66) - developing the bot and English support

[@Arbel99](https://github.com/Arbel99) - Latin support

## RIP

- Moshe
- Aviram
- Alexander The Great
