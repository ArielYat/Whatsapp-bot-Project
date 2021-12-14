# Whatsapp Group Bot

## Features
- Multilanguage Support - each command can be typed in whatever language the user wants (Currently available: Hebrew, English, Latin)
- Tags - The bot is able to tag people via a group assigned dictionary when issued the command.

- Filters - The bot responds to certain words via a group assigned dictionary.

- Birthdays - The bot notifies the group on someone's birthday via a group assigned dictionary.

- Creating Stickers - The bot is able to create a sticker out of any given image.

- Creating Surveys - The bot is able to create a whatsapp survey from a command.

- Scanning URLs - The bot is able to scan any URL given to it for viruses.

- The bot autobans groups or users who are spamming it for a short period of time.

## Usage
Add the bot's phone number to your Whatsapp group and start sending out commands - As simple as that!

## Dependencies
@open-wa/wa-automate for the WhatsApp "link". 

mongodb for storing our database.

node-schedule for timing the birthday checking. 

node-virustotal for scanning links for viruses. 

usleep for timing out the bot while the antivirus scan takes place.

util for formatting strings.

## Credits
@ArielYat for the idea, starting the project and adding most of the functionality.

@TheBooker66 for helping greatly with development, expanding the bot, documentation and grammar.

@Arbel99 for the Latin support.
