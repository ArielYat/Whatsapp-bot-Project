//TODO turn this .js file into a .json file
class stringLang {
    static strings = {
        //hyphen
        "hyphen": {
            "he": "כבודו אתה בטוח שהשתמשת במקף?",
            "en": "Are you sure you used a hyphen correctly?"
        },
        //filters
        "add_filter": {
            "he": "הוסף פילטר",
            "en": "Add filter"
        },
        "add_filter_reply": {
            "he": "הפילטר %s נוסף בהצלחה",
            "en": "The filter %s has been successfully added"
        },
        "add_filter_reply_exists": {
            "he": "הפילטר %s כבר קיים במאגר של קבוצה זו \n  אם אתה רוצה לערוך אותו תכתוב את זה: \n ערוך פילטר %s - %s",
            "en": "The filter %s already exists in this group \n If u want to edit the filter please write this:" +
                "\n Edit filter %s - %s"
        },
        "remove_filter": {
            "he": "הסר פילטר",
            "en": "Remove filter"
        },
        "remove_filter_reply": {
            "he": "הפילטר %s הוסר בהצלחה",
            "en": "The filter %s has been successfully removed"
        },
        "remove_filter_doesnt_exist": {
            "he": "רק אלוהים יכול למחוק פילטר לא קיים",
            "en": "Only the god of light and all that is good can can delete a filter which doesn't exist"
        },
        "group_doesnt_have_filters": {
            "he": "אין פילטרים בקבוצה זו",
            "en": "This group doesn't have any filters"
        },
        "edit_filter": {
            "he": "ערוך פילטר",
            "en": "Edit filter"
        },
        "edit_filter_reply": {
            "he": "הפילטר %s נערך בהצלחה",
            "en": "The filter %s has been successfully edited"
        },
        "edit_filter_doesnt_exist": {
            "he": "סליחה כבודו אבל אי אפשר לערוך פילטר שלא קיים במאגר",
            "en": "Apologies good sir, but you tried to edit a filter which doesn't exit in this group"
        },
        "show_filters": {
            "he": "הראה פילטרים",
            "en": "Show filters"
        },
        "filter_spamming": {
            "he": "כמה פילטרים שולחים פה? אני הולך לישון ל־15 דקות",
            "en": "Wow you're spamming filters, I'm going to sleep for 15 minutes"
        },
        //tags
        "tag": {
            "he": "תייג",
            "en": "Tag"
        },
        "tag_person_doesnt_exist": {
            "he": "אתה בטוח שצדקת בשם? בכל מקרה האדם שניסית לתייג לא נמצא פה",
            "en": "The person you tried to tag doesn't exist",
        },
        "add_tag": {
            "he": "הוסף חבר לתיוג",
            "en": "Add tag buddy"
        },
        "add_tag_reply": {
            "he": "מספר הטלפון של האדם %s נוסף בהצלחה",
            "en": "The phone number of the person %s has been successfully added"
        },
        "add_tag_reply_already_exists": {
            "he": "האדם %s כבר קיים במאגר של קבוצה זו",
            "en": "The person %s already exists in this group's database"
        },
        "add_tag_reply_doesnt_exist": {
            "he": "מספר הטלפון לא קיים בקבוצה זו",
            "en": "This phone number does not exist in this group"
        },
        "remove_tag": {
            "he": "הסר חבר מתיוג",
            "en": "Remove tag buddy"
        },
        "remove_tag_reply": {
            "he": "מספר הטלפון של האדם %s הוסר בהצלחה",
            "en": "The phone number of the person %s has been successfully removed"
        },
        "remove_tag_doesnt_exist": {
            "he": "רק נפוליאון יכול למחוק אנשים לא קיימים",
            "en": "Only Napoleon can remove people who don't exist"
        },
        "group_doesnt_have_tags": {
            "he": "אין תיוגים לקבוצה זו",
            "en": "This group doesn't have any tags"
        },
        "tag_all": {
            "he": "תייג כולם",
            "en": "Tag everyone"
        },
        "show_tags": {
            "he": "הראה רשימת חברים לתיוג",
            "en": "Show tag buddies"
        },
        //birthdays
        "send_birthday": {
            "he": "מזל טוב ל%s! הוא/היא בן/בת %s!",
            "en": "Happy birthday to %s! He/she is %s years old!"
        },
        "add_birthday": {
            "he": "הוסף יום הולדת",
            "en": "Add birthday"
        },
        "add_birthday_reply": {
            "he": "יום ההולדת של האדם %s נוסף בהצלחה",
            "en": "%s' birthday has been successfully added"
        },
        "add_birthday_already_exists": {
            "he": "יום ההולדת של האדם %s כבר קיים במאגר של קבוצה זו",
            "en": "%s' birthday already exists in this group"
        },
        "date_existence": {
            "he": "מה לעזאזל זה השטויות האלה? אתה בטוח שזה תאריך?",
            "en": "Are you sure what you inputted is a date?"
        },
        "date_syntax": {
            "he": "תראה אתה אמור להשתמש בנקודות כשאתה כותב תאריך אבל מי אני שאשפוט",
            "en": "Yeah that's not how you write a date... You should be using periods"
        },
        "remove_birthday": {
            "he": "הסר יום הולדת",
            "en": "Remove birthday"
        },
        "remove_birthday_reply": {
            "he": "יום ההולדת של האדם %s הוסר בהצלחה",
            "en": "%s' birthday has been successfully removed"
        },
        "remove_birthday_doesnt_exist": {
            "he": "רק דוקטור דופנשמירץ יכול למחוק ימי הולדת לא קיימים",
            "en": "Only Dr. Doofenshmirtz can remove birthdays which don't exist"
        },
        "group_doesnt_have_birthdays": {
            "he": "אין לקבוצה זו ימי הולדת",
            "en": "This group don't have any birthdays registered"
        },
        "show_birthDays": {
            "he": "הראה ימי הולדת",
            "en": "Show birthdays"
        },
        //sticker making
        "make_sticker": {
            "he": "הפוך לסטיקר",
            "en": "Make into sticker"
        },
        "not_image": {
            "he": "טיפש אי אפשר להפוך משהו שהוא לא תמונה לסטיקר",
            "en": "The message you replied to isn't an image, you big-fingered individual"
        },
        "no_quoted_message": {
            "he": "אתה בטוח שסימנת הודעה?",
            "en": "Are you sure you replied to a message?"
        },
        //link Scanning
        "scan_link": {
            "he": "סרוק",
            "en": "Scan"
        },
        "scan_link_checking": {
            "he": "%s \n בודק...",
            "en": "%s \n Checking..."
        },
        "scan_link_error_upload": {
            "he": "שגיאה בהעלאת הקישור",
            "en": "Error received while uploading the link"
        },
        "scan_link_error_checking": {
            "he": "שגיאה בבדיקת הקישור",
            "en": "Error received while checking the link"
        },
        //button handling
        "make_survey": {
            "he": "צור סקר",
            "en": "Create survey"
        },
        "survey_title": {
            "he": /כותרת - (.)+/,
            "en": /Title - (.)+/
        },
        "survey_second_title": {
            "he": /כותרת משנה - (.)+/,
            "en": /Body - (.)+/
        },
        "survey_third_title": {
            "he": /כותרת שלישית - (.)+/,
            "en": /Footer - (.)+/
        },
        "survey_button1": {
            "he": /כפתור1 - (.)+/,
            "en": /Button1 - (.)+/
        },
        "survey_button2": {
            "he": /כפתור2 - (.)+/,
            "en": /Button2 - (.)+/
        },
        "survey_button3": {
            "he": /כפתור3 - (.)+/,
            "en": /Button3 - (.)+/
        },
        "survey_title_replace": {
            "he": "כותרת -",
            "en": "Title -"
        },
        "survey_second_title_replace": {
            "he": "כותרת משנה -",
            "en": "Body -"
        },
        "survey_third_title_replace": {
            "he": "כותרת שלישית -",
            "en": "Footer -"
        },
        "survey_button1_replace": {
            "he": "כפתור1 -",
            "en": "Button1 -"
        },
        "survey_button2_replace": {
            "he": "כפתור2 -",
            "en": "Button2 -"
        },
        "survey_button3_replace": {
            "he": "כפתור3 -",
            "en": "Button3 -"
        },
        "survey_reply": {
            "he": "אני צריך כותרת, כותרת משנה ולפחות כפתור 1 בשביל ליצור סקר",
            "en": "I need a title, a body and at least one button to make a survey"
        },
        //language
        "change_language": {
            "he": "שנה שפה",
            "en": "Change language to"
        },
        "handleHelp": {
            "he": "הראה עזרה",
            "en": "Show help"
        },
        "handleHelp_reply": {
            "he": "*הוראות בעברית*" +
                "\n _שינוי שפה_" +
                "\n כדי לשנות את שפת הבוט כתוב 'שנה שפה ל־[איזו שפה שאתה רוצה]'" +
                "\n לדוגמה: שנה שפה לאנגלית" +
                "\n שפות שקיימות כעת: אנגלית, עברית" +
                "\n" +
                "\n _פילטרים_" +
                "\n הוסף פילטר[פילטר] - [תגובת הבוט]" +
                "\n לדוגמה: הוסף פילטר אוכל - בננה" +
                "\n הסר פילטר [פילטר]" +
                "\n לדוגמה: הסר פילטר אוכל" +
                "\n ערוך פילטר [פילטר ישן] - [תשובה חדשה]" +
                "\n לדוגמה: ערוך פילטר אוכל - אפרסק" +
                "\n הראה פילטרים - מראה את רשימת הפילטרים הקיימים כעת" +
                "\n" +
                "\n _תיוגים_" +
                "\n תייג [אדם]" +
                "\n לדוגמה: תייג יוסי" +
                "\n הוסף חבר לתיוג [אדם] - [מספר טלפון]" +
                "\n לדוגמה: הוסף חבר לתיוג יוסי - 972501234567" +
                "\n הסר חבר מתיוג [אדם]" +
                "\n לדוגמה: הסר חבר מתיוג יוסי" +
                "\n תייג כולם - מתייג את כל האנשים הנמצאים בקבוצה שיש להם תיוג מוגדר" +
                "\n הראה רשימת חברים לתיוג - מראה את רשימת החברים לתיוג" +
                "\n" +
                "\n _ימי הולדת_" +
                "\n הוסף יום הולדת [אדם] - [שנה.חודש.יום]" +
                "\n לדוגמה: הוסף יום הולדת שלמה - 27.6.2021" +
                "\n הסר יום הולדת [אדם]" +
                "\n לדוגמה: הסר יום הולדת יוסי" +
                "\n הראה ימי הולדת - מראה את רשימת ימי ההולדת הקיימים כעת" +
                "\n" +
                "\n _יצירת סטיקרים_ " +
                "\n הפוך לסטיקר - הבוט הופך לסטיקר את התמונה שמשיבים אליה" +
                "\n" +
                "\n _סריקת קישורים_" +
                "\n סרוק [קישור] - הבוט יסרוק את הקישור הנתון לוירוסים ויקבע אם הוא בטוח" +
                "\n" +
                "\n _טיפ מיוחד!_ " +
                "\n בהוספת פילטר אפשר גם להשתמש ב־[שם] בשביל לתייג מישהו בפילטר" +
                "\n לדוגמה: 'הוסף פילטר אוכל - [יוסי]' יגרום לבוט לענות '@יוסי' ולתייג את יוסי",

            "en": "*English Instructions*" +
                "\n To change the language type 'Change language to [whatever language you want]'" +
                "\n For example: Change language to Hebrew" +
                "\n Currently available languages are: English and Hebrew" +
                "\n" +
                "\n _Filters_" +
                "\n Add filter [filter] - [bot response]" +
                "\n For example: Add filter food - banana" +
                "\n Remove filter food" +
                "\n For example: Remove filter food" +
                "\n Edit filter [old filter] - [new response]" +
                "\n For example: Edit filter food - peach" +
                "\n Show filters - displays a list of filters defined in the group" +
                "\n" +
                "\n _Tags_" +
                "\n Tag [person]" +
                "\n For example: Tag Joseph" +
                "\n Add tag buddy [person] - [phone number]" +
                "\n For example: Add tag buddy Joseph - 972501234567" +
                "\n Remove tag buddy [person]" +
                "\n For example: Remove tag buddy Joseph" +
                "\n Tag everyone - tags all people in the group who have a set tag" +
                "\n Show tag buddies - displays a list of all tags defined in the group" +
                "\n" +
                "\n _Birthdays_" +
                "\n Add birthday [person] - [day.month.year]" +
                "\n For example: Add birthday Joseph - 27.6.2021" +
                "\n Remove birthday [person]" +
                "\n For example: Remove birthday Joseph" +
                "\n Show birthdays - displays a list of all birthdays defined in the group" +
                "\n" +
                "\n _Sticker Making_" +
                "\n Make into sticker - the bot makes the replied to image into a sticker and sends it" +
                "\n" +
                "\n _Link Scanning_" +
                "\n Scan [link] - Scans the given link for viruses and determines if it's safe" +
                "\n" +
                "\n _Special Tip!_" +
                "\n When creating a filter you can also use [person] to tag someone whenever the filter is invoked" +
                "\n For example: 'Add filter food - [Joseph]' will make the bot say 'Joseph' and tag Joseph"
        }
    }
}

module.exports = stringLang;