const util = require('util');

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
            "en": `The filter %s has been added successfully`
        },
        "add_filter_reply_exists": {
            "he": "הפילטר %s כבר קיים במאגר של קבוצה זו \n  אם אתה רוצה לערוך אותו תכתוב \n ערוך %s - %s",
            "en": "The filter %s already exists in this group \n If u want to edit the filter please write" +
                "\n Edit filter %s - %s"
        },
        "remove_filter": {
            "he": "הסר פילטר",
            "en": "Remove filter"
        },
        "remove_filter_reply": {
            "he": "הפילטר %s הוסר בהצלחה",
            "en": "The filter %s} removed successfully"
        },
        "remove_filter_doesnt_exist": {
            "he": "רק אלוהים יכול למחוק פילטר לא קיים",
            "en": "Only the god of light and all that is good can can delete a filter which doesn't exist"
        },
        "group_doesnt_have_filters": {
            "he": "אין פילטרים בקבוצה זו",
            "en": "This group don't have any filters"
        },
        "edit_filter": {
            "he": "ערוך פילטר",
            "en": "Edit filter"
        },
        "edit_filter_reply": {
            "he": "הפילטר %s נערך בהצלחה",
            "en": "The filter %s edited successfully"
        },
        "edit_filter_doesnt_exist": {
            "he": "סליחה כבודו אבל אי אפשר לערוך פילטר שלא קיים במאגר",
            "en": "Apologies, good sir, but you tried to edit a filter which doesn't exit in this group"
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
            "en": "The person %s already exists in this group"
        },
        "add_tag_reply_doesnt_exist": {
            "he": "מספר הטלפון לא קיים בקבוצה זו",
            "en": "This phone number does not exist on this group"
        },
        "remove_tag": {
            "he": "הסר חבר מתיוג",
            "en": "Remove Tag buddy"
        },
        "remove_tag_reply": {
            "he": "מספר הטלפון של האדם %s הוסר בהצלחה",
            "en": "The phone number of the person %s removed successfully"
        },
        "remove_tag_doesnt_exist": {
            "he": "רק נפוליאון יכול למחוק אנשים לא קיימים",
            "en": "Only Napoleon can remove people who don't exist"
        },
        "group_doesnt_have_tags": {
            "he": "אין תיוגים לקבוצה זו",
            "en": "This group don't have any tags"
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
            "he": "מזל טוב ל־%s! הוא/היא בן/בת %s!",
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
            "he": "תראה אתה אמור לעשות להשתמש בנקודות כשאתה כותב תאריך אבל מי אני שאשפוט",
            "en": "Yeah that's not how you write a date"
        },
        "remove_birthDay": {
            "he": "הסר יום הולדת",
            "en": "Remove birthday"
        },
        "remove_birthDay_reply": {
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
            "en": "Make into Sticker"
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
        //language
        "change_language": {
            "he": "שנה שפה",
            "en": "Change language"
        },
        "show_help": {
            "he": "הראה עזרה",
            "en": "Show help"
        },
        "help_message": {
            "he": "",
            "en": "" //TODO
        }
    }

    static getGroupLang(groupDict, chatID, parameter, value1 = null, value2 = null) {
        let lang;
        let strToReturn;
        if (chatID in groupDict) {
            const group = groupDict[chatID];
            lang = group.language;
        } else {
            lang = "he";
        }
        let str = this.strings[parameter][lang];
        if (value2 != null) {
            strToReturn = util.format(str, value1, value2);
        } else if (value1 != null) {
            strToReturn = util.format(str, value1);
        } else {
            strToReturn = str;
        }
        return strToReturn
    }
}

module.exports = stringLang;