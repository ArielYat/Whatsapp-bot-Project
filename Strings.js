class Strings {
    static strings = {
        //general
        "hyphen_reply": {
            "he": "כבודו אתה בטוח שהשתמשת במקף?",
            "en": "Are you sure you used a hyphen correctly?",
            "la": "Certusne tu adhibuisse recte eo iungente te?"
        }, "command_spam_reply": {
            "he": "וואי ילד תירגע עם הפקודות. זהו, אני לא מקשיב לך למשך 15 דקות",
            "en": "Chill out with all the commands kid. You won't be getting a responce out of me for the next 15 minutes",
            "la": "Retarda! Eo dormitum quoniam mittabas etiam multos invenientes"
        }, "filter_spam_reply": {
            "he": "כמה פילטרים שולחים פה? אני הולך לישון ל־15 דקות",
            "en": "Wow you're spamming filters, I'm going to sleep for 15 minutes",
            "la": "Retarda! Eo dormitum quoniam mittabas etiam multos invenientes"
        }, //filters
        "add_filter": {
            "he": /^הוסף פילטר/i, "en": /^Add filter/i, "la": "Crea invenientem"
        }, "add_filter_reply": {
            "he": "הפילטר %s נוסף בהצלחה",
            "en": "The filters %s has been successfully added",
            "la": "Invenientem %s creatur feliciter"
        }, "add_filter_already_exists_error": {
            "he": "הפילטר %s כבר קיים במאגר של קבוצה זו \n  אם אתה רוצה לערוך אותו תכתוב את זה: \n ערוך פילטר %s - %s",
            "en": "The filters %s already exists in this group \n If u want to edit the filters please write this: \n Edit filters %s - %s",
            "la": "Reprehendentem %s iam in systemae est \nScribe 'recense invenientem %s - %s' recensitum reprehendentem"
        }, "remove_filter": {
            "he": /^הסר פילטר/i, "en": /^Remove filter/i, "la": "Dele invenientem"
        }, "remove_filter_reply": {
            "he": "הפילטר %s הוסר בהצלחה",
            "en": "The filters %s has been successfully removed",
            "la": "Invenientem %s deletur feliciter"
        }, "remove_filter_doesnt_exist_error": {
            "he": "רק אלוהים יכול למחוק פילטר לא קיים",
            "en": "Only the god of light and all that is good can can delete a filters which doesn't exist",
            "la": "Deus Iupiter solum potest delere invenientem qui non exsistit"
        }, "group_doesnt_have_filters_error": {
            "he": "אין פילטרים בקבוצה זו",
            "en": "This group doesn't have any filters",
            "la": "Coetus hoc non habet invenientes"
        }, "edit_filter": {
            "he": /^ערוך פילטר/i, "en": /^Edit filter/i, "la": "Recense invenientem"
        }, "edit_filter_reply": {
            "he": "הפילטר %s נערך בהצלחה",
            "en": "The filters %s has been successfully edited",
            "la": "Invenientem %s recensetur felicitur"
        }, "edit_filter_error": {
            "he": "סליחה כבודו אבל אי אפשר לערוך פילטר שלא קיים",
            "en": "Apologies good sir, but you tried to edit a filter which doesn't exist in this group",
            "la": "Paenito, mihi amice, sed recensere invenientem non exsistentem impossibile est"
        }, "show_filters": {
            "he": /^הראה פילטרים/i, "en": /^Show filters/i, "la": "Ostende invenientes"
        }, //tags
        "tag": {
            "he": /^תייג /i, "en": /^Tag /i, "la": "Clama ad "
        }, "tag_person_doesnt_exist_error": {
            "he": "אתה בטוח שצדקת בשם? בכל מקרה האדם שניסית לתייג לא נמצא פה",
            "en": "The person you tried to tags doesn't exist",
            "la": "Quem debeo clamare? Is/ea non exsistet"
        }, "add_tag": {
            "he": /^הוסף חבר לתיוג/i, "en": /^Add tag buddy/i, "la": "Adde amicum"
        }, "add_tag_reply": {
            "he": "מספר הטלפון של האדם %s נוסף בהצלחה",
            "en": "The phone number of the person %s has been successfully added",
            "la": "Amicum %s additur feliciter"
        }, "add_tag_already_exists_error": {
            "he": "האדם %s כבר קיים במאגר של קבוצה זו",
            "en": "The person %s already exists in this group's database",
            "la": "Amicum %s iam exsistet in sistema"
        }, "add_tag_doesnt_exist_error": {
            "he": "מספר הטלפון לא קיים בקבוצה זו",
            "en": "This phone number does not exist in this group",
            "la": "Amicum non exsistet in coetu"
        }, "remove_tag": {
            "he": /^הסר חבר מתיוג/i, "en": /^Remove tag buddy/i, "la": "Dele amicum"
        }, "remove_tag_reply": {
            "he": "מספר הטלפון של האדם %s הוסר בהצלחה",
            "en": "The phone number of the person %s has been successfully removed",
            "la": "Amicum %s delitur feliciter"
        }, "remove_tag_doesnt_exist_error": {
            "he": "רק נפוליאון יכול למחוק אנשים לא קיימים",
            "en": "Only Napoleon can remove people who don't exist",
            "la": "Napoleonus solum potest delere amici non exsistentes"
        }, "group_doesnt_have_tags_error": {
            "he": "אין תיוגים לקבוצה זו", "en": "This group doesn't have any tags", "la": "Hoc coetus non habet amici"
        }, "tag_all": {
            "he": /^תייג כולם/i, "en": /^Tag everyone/i, "la": "Clama ad quoque"
        }, "show_tags": {
            "he": /^הראה רשימת חברים לתיוג/i, "en": /^Show tag buddies/i, "la": "Ostende amici"
        }, "check_tags": {
            "he": /^בדוק היכן תייגוני/i, "en": /^Check where I've been tagged/i, "la": null
        }, "check_tags_reply": {
            "he": "הנה תיוגך, אדוני הטוב",
            "en": "You've been tagged here, Good Sir",
            "la": null
        }, "check_tags_no_messages_error": {
            "he": "לא תוייגת מאז ההפעלה האחרונה שלי",
            "en": "You haven't been tagged since the last time I was restarted",
            "la": null
        }, //birthdays
        "birthday_wishes_reply": {
            "he": "מזל טוב ל-- %s! הוא/היא בן/בת %s!",
            "en": "Happy birthday to %s! He/she is %s years old!",
            "la": "%s, felix sit natalis dies! Habes %s annos"
        }, "add_birthday": {
            "he": /^הוסף יום הולדת/i, "en": /^Add birthday/i, "la": "Adde natalis dies"
        }, "add_birthday_reply": {
            "he": "יום ההולדת של הבחור %s נוסף בהצלחה",
            "en": "%s's birthday has been successfully added",
            "la": "Natalis dies %s additur feliciter"
        }, "add_birthday_already_exists_error": {
            "he": "יום ההולדת של הבחור %s כבר קיים",
            "en": "%s's birthday already exists in this group",
            "la": "Natalis dies %s iam exsistet in hoc coetu"
        }, "date_existence_error": {
            "he": "מה לעזאזל זה השטויות האלה? אתה בטוח שזה תאריך מציאותי?",
            "en": "Are you sure what you inputted is a date or something along those lines?",
            "la": "Certusne tu hoc natalis dies esse?"
        }, "date_syntax_error": {
            "he": "תראה אתה אמור להשתמש בשתי נקודות כשאתה כותב תאריך אבל מי אני שאשפוט",
            "en": "Yeah that's not how you write a date... You should be using periods",
            "la": "Rescribe dies cum periodes"
        }, "remove_birthday": {
            "he": /^הסר יום הולדת/i, "en": /^Remove birthday/i, "la": "Dele natalis dies"
        }, "remove_birthday_reply": {
            "he": "יום ההולדת של הבחור %s הוסר בהצלחה",
            "en": "%s's birthday has been successfully removed",
            "la": "%s natalis dies delitur feliciter"
        }, "remove_birthday_doesnt_exist_error": {
            "he": "רק דוקטור דופנשמירץ יכול למחוק ימי הולדת לא קיימים",
            "en": "Only Dr. Doofenshmirtz can remove birthday which don't exist",
            "la": "Doctor Doofenshmirtz solum potest delere natalis dies non exsistentes"
        }, "show_birthdays": {
            "he": /^הראה ימי הולדת/i, "en": /^Show birthdays"/i, "la": "Ostende natalis dies"
        }, "group_doesnt_have_birthdays_error": {
            "he": "אין לקבוצה זו ימי הולדת",
            "en": "This group don't have any birthday registered",
            "la": "Hoc coetus non habet natalis dies"
        }, "add_birthday_to_group": {
            "he": /^הוסף קבוצה לרשימת התפוצה/i, "en": /^Add group to birthday message/i, "la": null
        }, "birthday_added_to_group_reply": {
            "he": "הקבוצה נוספה בהצלחה לרשימת התפוצה של ימי הולדת שלך",
            "en": "The group has been successfully added to this person's birthday message broadcast list",
            "la": null
        }, "birthday_added_to_group_error": {
            "he": "הקבוצה כבר קיימת ברשימת התפוצה של ימי ההולדת שלך",
            "en": "This group is already in your birthday message's broadcast",
            "la": null
        }, "remove_birthday_from_group": {
            "he": /^הסר קבוצה מרשימת התפוצה/i, "en": /^Remove group from birthday message/i, "la": null
        }, "birthday_removed_from_group_reply": {
            "he": "הקבוצה הוסרה בהצלחה מרשימת התפוצה של ימי הולדת של אדם זה",
            "en": "The group has been successfully removed from this person's birthday message broadcast list",
            "la": null
        }, "birthday_removed_from_group_error": {
            "he": "רק סמי יכול להסיר קבוצות שלא קיימות ברשימת התפוצה שלך",
            "en": "Only Sam can remove groups which aren't in your birthday message's broadcast",
            "la": null
        }, "person_doesnt_have_birthday_error": {
            "he": "לבחורצ'יק כאן אין יום הולדת (מוגדר)",
            "en": "This man does not have a birthday (defined)",
            "la": null
        }, //permissions & muting
        "set_permissions": {
            "he": /^קבע הרשאה ל/i, "en": /^Define permission for/i, "la": null
        }, "set_permissions_reply": {
            "he": "ההרשאה שונתה בהצלחה",
            "en": "Permission changed successfully",
            "la": null
        }, "set_permissions_error": {
            "he": "אין לך הרשאה מספיק גבוהה בשביל מה שניסית לעשות",
            "en": "You don't have a high enough clearance level for what you were trying to do",
            "la": null
        }, "permission_option_does_not_exist_error": {
            "he": "רק האיש והאגדה משה יכול לשנות אופציה לא קיימת",
            "en": "Only the man, the myth, the legend Moses can select a nonexistent option",
            "la": null
        }, "filters": {
            "he": /פילטרים/i, "en": /filters/i, "la": null
        }, "tags": {
            "he": /תיוגים/i, "en": /tags/i, "la": null
        }, "handleFilters": {
            "he": /טיפולבפילטרים/i, "en": /handleFilters/i, "la": null
        }, "handleTags": {
            "he": /טיפולבתיוגים/i, "en": /handleTags/i, "la": null
        }, "handleBirthdays": {
            "he": /טיפולבימיהולדת/i, "en": /ihandleBirthdays/i, "la": null
        }, "handleShows": {
            "he": /טיפולבהראה/i, "en": /handleShows/i, "la": null
        }, "handleImmediate": {
            "he": /טיפולבמיידיות/i, "en": /handleImmediate/i, "la": null
        }, "show_group_function_permissions": {
            "he": /^הראה הרשאות פונקציות/i, "en": /^Show function permissions/i, "la": null
        }, "show_group_user_permissions": {
            "he": /^הראה הרשאות אנשים/i, "en": /^Show people permissions/i, "la": null
        }, "mute_participant": {
            "he": /^השתק /i, "en": /^Mute /i, "la": null
        }, "mute_participant_reply": {
            "he": "המשתמש %s לא יכול להשתמש בפקודות יותר",
            "en": "User %s cannot use commands anymore",
            "la": null
        }, "unmute_participant": {
            "he": /^הסר השתקה/i, "en": /^Unmute person/i, "la": null
        }, "unmute_participant_reply": {
            "he": "המשתמש %s יכול להשתמש בפקודות שוב",
            "en": "User %S can use commands again",
            "la": null
        }, "participant_not_in_group_error": {
            "he": "אני יכול להשתיק רק מישהו שכתב בקבוצה פעם. סליחה!",
            "en": "I can only mute someone who has been in this group in the past. Sorry!",
            "la": null
        }, "no_participant_chosen_error": {
            "he": "אני לא יכול להשתיק את אף אחד, אתה חייב לבחור מישהו",
            "en": "I can't mute nobody, you gotta choose someone",
            "la": null
        }, //Immediate commands
        "make_sticker": {
            "he": /^הפוך לסטיקר/i, "en": /^Create sticker/i, "la": "Fac hoc imaginem"
        }, "not_sticker_material_error": {
            "he": "טיפש אי אפשר להפוך משהו שהוא לא תמונה או סרטון לסטיקר",
            "en": "Idiot, a sticker has to be an image or a video",
            "la": "Hoc non est similacrum"
        }, "scan_link": {
            "he": /סרוק /i, "en": /Scan /i, "la": "Examina "
        }, "link_validity_error": {
            "he": "חביבי, זה לא קישור תקין", "en": "bro that's not a valid link", "la": null
        }, "scan_link_checking_reply": {
            "he": "%s \n בודק...", "en": "%s \n Checking...", "la": "%s \n Examino..."
        }, "scan_link_result_reply": {
            "he": " וואלה אחי בדקתי את הקישור כמו שביקשת ומצאתי ש־%s אנטי וירוסים מצאו אותו סאחי",
            "en": "%s antivirus engines detected this link as malicious",
            "la": "%s deprehendentes reperiebant hoc ligentem malum esse"
        }, "scan_link_upload_error": {
            "he": "שגיאה בהעלאת הקישור",
            "en": "Error received while uploading the link",
            "la": "Error #1 in ligente est"
        }, "scan_link_checking_error": {
            "he": "שגיאה בבדיקת הקישור",
            "en": "Error received while checking the link",
            "la": "Error #2 in ligente est"
        }, "create_survey": {
            "he": /^צור סקר/i, "en": /^Create survey/i, "la": "Crea census"
        }, "survey_title": {
            "he": /כותרת - (.)+/,
            "en": /Title - (.)+/,
            "la": /Nomen - (.)+/
        }, "survey_subtitle": {
            "he": /כותרת משנה - (.)+/,
            "en": /Subtitle - (.)+/,
            "la": /Subnomen - (.)+/
        }, "third_survey_title": {
            "he": /כותרת שלישית - (.)+/,
            "en": /Third title - (.)+/,
            "la": /Nomen tertium - (.)+/
        }, "survey_button_1": {
            "he": /כפתור 1 - (.)+/,
            "en": /Button 1 - (.)+/,
            "la": /Buttonus 1 - (.)+/
        }, "survey_button_2": {
            "he": /כפתור 2 - (.)+/,
            "en": /Button 2 - (.)+/,
            "la": /Buttonus 2 - (.)+/
        }, "survey_button_3": {
            "he": /כפתור 3 - (.)+/,
            "en": /Button 3 - (.)+/,
            "la": /Buttonus 3 - (.)+/
        }, "survey_title_replace": {
            "he": "כותרת -", "en": "Title -", "la": "Nomen -"
        }, "second_survey_title_replace": {
            "he": "כותרת משנה -", "en": "Body -", "la": "Subnomen -"
        }, "third_survey_title_replace": {
            "he": "כותרת שלישית -", "en": "Footer -", "la": "Nomen tertium -"
        }, "survey_button_1_replace": {
            "he": "כפתור 1 -", "en": "Button 1 -", "la": "Buttonus 1 -"
        }, "survey_button_2_replace": {
            "he": "כפתור 2 -", "en": "Button 2 -", "la": "Buttonus 2 -"
        }, "survey_button_3_replace": {
            "he": "כפתור 3 -", "en": "Button 3 -", "la": "Buttonus 3 -"
        }, "survey_creation_error": {
            "he": "אני צריך כותרת, כותרת משנה ולפחות כפתור אחד בשביל ליצור סקר",
            "en": "I need a title, a body and at least one button to make a survey",
            "la": "Necessitudines sunt nomen atque subnomen atque buttonus namque census"
        }, "check_crypto": {
            "he": /^בדוק קריפטו/i, "en": /^Check Crypto/i, "la": null
        }, "crypto_check_reply": {
            "he": "הנה השטויות שביקשת: \n %s",
            "en": "Here's the junk you requsted: \n %s",
            "la": "Hoc non est similacrum"
        }, "crypto_check_error": {
            "he": "נתקלתי בבעיה איפהשהו בדרך",
            "en": "I've ran into a problem somewhere along the way",
            "la": "Hoc non est similacrum"
        }, "show_webpage": {
            "he": /^שלח קישור לאתר/i, "en": /^Send website link/i, "la": "Ostende situs texti"
        }, "show_webpage_reply": {
            "he": "קח את הקישור אחי: %s",
            "en": "Here's the link you requested: %s",
            "la": "Hic est ligens quod petitis: %s"
        }, "show_webpage_error": {
            "he": "הקישור לא עבד לי... סליחוש",
            "en": "Sorry bro, the link didn't work...",
            "la": "Paenito frater, sed ligens non oportet..."
        }, //deletion from DB
        "delete_group_from_db": {
            "he": /^מחק קבוצה זו ממסד הנתונים/i, "en": /^Delete this group from the database/i, "la": null
        }, "delete_group_from_db_reply": {
            "he": "הקבוצה נמחקה בהצלחה מסד הנתונים",
            "en": "The group has been successfully deleted",
            "la": null
        }, "delete_person_from_db": {
            "he": /^מחק אותי ממסד הנתונים/i, "en": /^Delete me from the database/i, "la": null
        }, "delete_person_from_db_reply": {
            "he": "האדם נמחק בהצלחה מסד הנתונים",
            "en": "The person has been successfully deleted",
            "la": null
        }, //language
        "change_language": {
            "he": /^שנה שפה/i, "en": /^Change language to/i, "la": "Muta lingua ad"
        }, "language_change_reply": {
            "he": "השפה שונתה בהצלחה", "en": "Language successfully changed", "la": "Lingua mutatur feliciter"
        }, "language_change_error": {
            "he": "בימינו רק עברית, אנגלית ולטינית נתמכות על ידי הבוט",
            "en": "Only Hebrew, English and Latin are currently supported by the bot",
            "la": "Tantum Lingua Hebraice, Anglice et Latine nunc sustentantur per bot."
        }, "help": {
            "he": /^עזרה/i, "en": /^Help"/i, "la": "Auxilium"
        }, "help_reply": {
            "he": `*הוראות בעברית*\n _שפה_: \n "שנה שפה ל[שפה]" - משנה את בה הבוט מקבל ומגיב לפקודות \n לדוגמה: שנה שפה לאנגלית \n  אפשר להשתמש בפקודה הזו בכל שפה\nשפות שנתמכות כעת: עברית, אנגלית ולטינית  \n  \n _פילטרים_: \n"הוסף פילטר [פילטר] - [תגובת הבוט]" - מוסיף פילטר לקבוצה  \n לדוגמה: הוסף פילטר אוכל - בננה \n"הסר פילטר [פילטר]" - מסיר את הפילטר המצויין מהקבוצה  \n לדוגמה: הסר פילטר אוכל \n"ערוך פילטר [פילטר קיים] - [תשובה חדשה]" - עורך פילטר קיים בקבוצה  \n לדוגמה: ערוך פילטר אוכל - אפרסק \n"הראה פילטרים" - מציג את רשימת הפילטרים הקיימים כעת בקבוצה  \n  \n _תיוגים_: \n"תייג [אדם]" - מתייג אדם כך שיקבל התראה גם אם הקבוצה מושתקת אצלו  \n לדוגמה: תייג יוסי \n"הוסף חבר לתיוג [אדם] - [מספר טלפון בפורמט בין לאומי]" - מוסיף אדם לתיוג בקבוצה  \n לדוגמה: הוסף חבר לתיוג יוסי - 972501234567 \n"הסר חבר מתיוג [אדם]" - מסיר אדם מתיוג בקבוצה  \n לדוגמה: הסר חבר מתיוג יוסי \n"תייג כולם" - מתייג את כל האנשים שנמצאים בקבוצה  \n"הראה רשימת חברים לתיוג" - מציג את רשימת החברים לתיוג שמוגדרים בקבוצה  \n  "בדוק היכל תייגוני" - מראה את ההודעה האחרונה בה כותב ההודעה תויג, ניתן לשימוש כמה פעמים\n  \n _ימי הולדת_: \n  "הוסף יום הולדת - [תאריך מנוקד בפורמט בינלאומי הפוך]" - מוסיף יום הולדת לכותב ההודעה\n  לדוגמה: הוסף יום הולדת 1.11.2011\n  "הסר יום הולדת" - מסיר את יום ההולדת של כותב ההודעה\n  "הוסף קבוצה להודעת יום ההולדת" - מוסיף את הקבוצה בה נשלחה ההודעה לרשימת התפוצה של הודעת יום ההולדת של כותב ההודעה\n  "הסר קבוצה מהודעת יום ההולדת" - מסיר את הקבוצה בה נשלחה ההודעה מרשימת התפוצה של הודעת יום ההולדת של כותב ההודעה\n  "הראה ימי הולדת" - מציג את ימי ההולדת של כל חברי הקבוצה\n  \n  _הרשאות והשתקות_:\n  סוגי ההרשאות: פילטרים, תיוגים, טיפולבפילטרים, טיפולבתיוגים, טיפולבימיהולדת, טיפולבהראה, טיפולבמיידיות\n  משמעות המספר: 0 - חבר קבוצה מושתק, 1 - חבר קבוצה רגיל, 2 - מנהל קבוצה\n  "קבע הרשאה ל[סוג הרשאה] - [מספר מ־0 עד 2]" - קובע את רמה ההרשאה הנדרשת לסוג פקודות מסוים\n  לדוגמה: קבע הרשאה לפילטרים - 1\n  "הראה הרשאות פונקציות" - מציג את רמות ההרשאות של סוגי הפקודות השונים\n  "הראה הרשאות אנשים" - מציג את רמות ההרשאות של האנשים בקבוצה\n  "השתק [תיוג של אדם]" - משתיק את האדם המתוייג כך שלא יוכל להשתמש בפקודות\n  לדוגמה: השתק @יוסי\n  "הסר השתקה [תיוג של אדם]" - מבטל את ההשתקה של האדם המתוייג\n  לדוגמה: בטל השתקה @יוסי\n  \n _פונקציות נוספות_ \n "הפוך לסטיקר" - הופך הודעת מדיה לסטיקר ושולח אותו \n ניתן להשתמש בפקודה גם בהודעה בה שולחים את התמונה/סרטון וגם בתור תגובה אליה \n  "בדוק קריפטו" - שולח הודעה עם שערי המטבע של מטבעות קריפטו שונים לעומת הדולר\n  "סרוק [קישור]" - סורק קישור לוירוסים\n  לדוגמה: סרוק https://www.google.com/\n "שלח קישור" - שולח קישור לאתר של הבוט (בתהליך עבודה) \n  יצירת סקר של וואטסאפ:\n "צור סקר \n כותרת - [כותרת סקר] \n כותרת משנה - [כותרת משנה] \n כותרת שלישית - [כותרת שלישית] \n כפתור 1 - [אופציה ראשונה] \n כפתור 2 - [אופציה שנייה] \n כפתור 3 - [אופציה שלישית]" \n (הכותרת השלישית והכפתורים השני והשלישי אופציונליים) \n  \n _טיפ מיוחד!_ \n בהוספת פילטר אפשר גם להשתמש ב[שם] בשביל לתייג מישהו כשהפילטר נקרא \n  לדוגמה: "הוסף פילטר אוכל - [יוסי]" יגרום לבוט לתייג את יוסי כשנאמר "אוכל"\n  \n  _מחיקה ממסד הנתונים_\n  "מחק קבוצה זו ממסד הנתונים" - מוחק את כל נתוני הקבוצה ממסד הנתונים\n  "מחק אותי ממסד הנתונים" - מוחק את כל נותני שולח ההודעה ממסד הנותנים\n  *השתמשו בפונקציות האלו בזהירות, פעולותיהן אינן ניתנות לשחזור*\n  \n  _קרדיטים_\n  מפותח ומתוחזק על ידי אריאל יצקן ואיתן עמירן\n  קישור ל־Github Repository, לסקרנים: https://github.com/ArielYat/Whatsapp-bot-Project`,
            "en": `*English Instructions* \n  _Language_:\n  "Change language to [language]" - changes the language the bot receives and sends messages in\n  For example: Change language to Hebrew\n  This command can be used at all times in every language\n  Languages currently supported: Hebrew, English & Latin\n  \n  _Filters_:\n  "Add filter [filter] - [bot reply]" - adds a filter to the group\n  For example: Add filter food - banana\n  "Remove filter [filter]" - removes the specified filter from the group\n  For example: Remove filter food\n  "Edit filter [existing filter] - [new reply]" - edits the specified filter\n  For example: Edit filter food - peach\n  "Show filters" - displays the list of all filter and their replies in the group\n  \n  _Tags_:\n  "Tag [person]" - tags someone so that they get a notification even if the group is muted on their phone\n  For example: Tag Joseph\n  "Add tag buddy [name] - [phone number in international format]" - adds the person to the list of taggable people\n  For example: Add tagging buddy Joseph - 972501234567\n  "Remove tag buddy [name]" - removes the person from the list of taggable people\n  For example: Remove tagging buddy Joseph\n  "Tag everyone" - tags all people in the group\n  "Show tag buddies" - displays the list of all taggable people in the group\n  "Check where I've been tagged" - shows the last message in which the message author's been tagged, can be used multiple times\n  \n  _Birthdays_:\n  "Add birthday [date in reverse international format with periods]" - adds a birthday for message's author\n  For example: Add birthday 1.11.2011\n  "Remove birthday" - removes the author's birthday\n  "Add group to birthday message" - adds the group the message was sent in to the author's birthday message broadcast\n  "Remove group from birthday message" - removes the group the message was sent in from the author's birthday message broadcast\n  "Show birthdays" - displays the birthdays of the group members  \n  \n  _Permissions & Muting_:\n  Permission types: filters, tags, handleFilters, handleTags, handleBirthdays, handleShows, handleImmediate\n  Number meaning: 0 - muted member, 1 - regular member, 2 - group admin\n  "Define permission for [permission type] - [number from 0 to 2]" - defines the permission level required for a certain type of commands\n  For example: Define permission filters - 1\n  "Show function permissions" - displays the permission levels of the different types of commands\n  "Show people permissions" - displays the permission levels of the people in the group\n  "Mute [person tag]" - mutes the tagged person so they aren't able to use commands\n  For example: Mute @Joseph\n  "Unmute person [person tag]" - unmutes the tagged person\n  For example: Unmute @Joseph  \n  \n  \n  _Miscellaneous_:\n  "Create sticker" - creates a sticker out of a media file and sends it\n  This command can be used in the message the media was sent in and as a reply to it\n  "Check Crypto" - sends a message with the currency rates of different cryptocurrencies compared to the Dollar\n  "Scan [link]" - scans the given link for viruses\n  For example: Scan https://www.google.com/\n  "Send link" - sends a link to the bots webpage (work in progress)\n  Create a WhatsApp survey:\n  "Create survey\n  Title - [survey title]\n  Subtitle - [survey subtitle]\n  Third Title - [third title]\n  Button 1 - [first option]\n  Button 2 - [second option]\n  Button 3 - [third option]"\n  (The third title and buttons 1 and 2 aren't required)\n    \n  _Special tip!_\n  When adding a filter you can use [name] to tag someone when the filter is invoked\n  For example: "Add filter food - [Joseph]" will make the bot tag Joseph whenever "food" is said\n  \n  _Deletion from the database_\n  "Delete this group from the database" - deletes all of the group's information from the database\n  "Delete me from the database" - deletes all of the author's information from the database\n  *Use these commands with caution, their effects are irreversible*\n  \n  _Credits_\n  Developed and maintained by Ariel Yatskan and Ethan Amiran\n  The GitHub repository, for the curious: https://github.com/ArielYat/Whatsapp-bot-Project`,
            "la": null
        }, "start_message": {
            "all": `שלום, אני ג'ון!\nכדי לשנות שפה כתבו "שנה שפה ל[שפה שאתם רוצים לשנות לה]".\nהשפה בררת המחדל היא עברית, והשפות האפשריות כעת הן עברית, אנגלית ולטינית.\nכדי להציג את הודעת העזרה כתבו "עזרה" בשפה הפעילה.\n\n\nHello, I'm John!\nTo change language type "Change language to [language you want to change to]".\nThe default language is Hebrew, and the currently available languages are Hebrew, English and Latin.\nTo display a help message type "Help" in the active language.\n\n\nSalve amici, John sum!\nMea lingua mutatum, scriba "Muta lingua ad [lingua quam desideras]".\nLingua Hebraica defalta est, et in sistema Linguae Anglica et Latina sunt.\nPropter auxilium, scriba "Auxilium" in mea lingua.`
        }
    }
}

module.exports = Strings;