const util = require('util');
class stringLang {
     static strings = {
         //hyphen
         "hyphen" : {
             "he" : "כבודו אתה בטוח שהשתמשת במקף?",
             "en" : "I dont think u use hyphen"
         },
        //filters
        "add_filter" : {
            "he" : "הוסף פילטר",
            "en": "Add filter"
        },
        "add_filter_reply" :{
            "he" : " הפילטר %s נוסף בהצלחה ",
            "en" : `The filter %s added successfully`
        },
        "add_filter_reply_exist" : {
            "he" : " הפילטר %s כבר קיים במאגר של קבוצה זו \n  אם אתה רוצה לערוך אותו תכתוב \n ערוך %s - %s",
            "en" : "The filter %s already exist on this group \n if u want to edit this filter please write " +
                "\n Edit filter %s - %s"
        },
        "remove_filter" : {
            "he" : "הסר פילטר",
            "en": "Remove filter"
        },
        "remove_filter_reply" :{
            "he" : " הפילטר %s הוסר בהצלחה",
            "en" : "The filter %s} removed successfully"
        },
        "remove_filter_dont_not_exist" :{
            "he" : "רק אלוהים יכול למחוק פילטר לא קיים",
            "en" : "only the god of light can can delete filter that isn't exist"
        },
        "group_dont_have_filters" :{
            "he" : "אין פילטרים בקבוצה זו",
            "en" : "group don't have any filters"
        },
        "edit_filter" : {
            "he" : "ערוך פילטר",
            "en": "Edit filter"
        },
        "edit_filter_reply" :{
            "he" : " הפילטר %s נערך בהצלחה ",
            "en" : "The filter %s edited successfully"
        },
        "edit_filter_does_not_exist" :{
            "he" : "סליחה כבודו אבל אי אפשר לערוך פילטר שלא קיים במאגר",
            "en" : "I think u try to edit filter that isn't exist on this group"
        },
        "show_filters" : {
            "he" : "הראה פילטרים",
            "en": "Show filters"
        },
        "filter_spamming" : {
            "he" : "כמה פילטרים שולחים פה? אני הולך לישון ל15 דקות",
            "en" : "Wow you spamming filters, I will mute this group for 15 min"
        },
        //tags
         "tag" : {
            "he" : "תייג",
             "en" : "Tag"
         },
         "tag_person_does_not_exist" : {
            "he" : "אתה בטוח שצדקת בשם? בכל מקרה האדם שניסית לתייג לא נמצא פה",
            "en" : "The person you try to tag isn't exist on this group",
         },
        "add_tag" : {
            "he" : "הוסף חבר לתיוג",
            "en": "Add tag buddy"
        },
        "add_tag_reply" :{
            "he" : "מספר הטלפון של האדם %s נוסף בהצלחה ",
            "en" : "The phone number of the person %s added successfully"
        },
        "add_tag_reply_already_exist" :{
            "he" : "האדם %s כבר קיים במאגר של קבוצה זו",
            "en" : "The person %s already exist on this group"
        },
        "add_tag_reply_does_not_exist" :{
            "he" : "מספר הטלפון לא קיים בקבוצה זו",
            "en" : "This phone number does not exist on this group"
        },
        "remove_tag" : {
            "he" : "הסר חבר מתיוג",
            "en": "Remove Tag buddy"
        },
        "remove_tag_reply" :{
            "he" : "מספר הטלפון של האדם %s הוסר בהצלחה",
            "en" : "The phone number of the person %s removed successfully"
        },
        "remove_tag_does_not_exist" :{
            "he" : "רק נפוליאון יכול למחוק אנשים לא קיימים",
            "en" : "Only Napoléon can remove people aren't exist"
        },
        "group_dont_have_tags" :{
            "he" : "אין תיוגים לקבוצה זו",
            "en" : "This group don't have any tags"
        },
        "tag_all" : {
            "he" : "תייג כולם",
            "en": "Tag everyone"
        },
        "show_tags" : {
            "he" : "הראה רשימת חברים לתיוג",
            "en": "Show tag buddies"
        },
        //birthDays
        "send_birthDay" :{
            "he" : "מזל טוב ל %s הוא/היא בן/בת %s",
            "en" : "Happy birth day to %s He/she is %s years old"
        },
        "add_birthDay" : {
            "he" : "הוסף יום הולדת",
            "en": "Add birthday"
        },
        "add_birthDay_reply" : {
            "he" : "יום ההולדת של האדם %s נוסף בהצלחה",
            "en": "The birth day of the person %s added successfully"
        },
        "add_birthDay_already_exist" :{
            "he" : "יום ההולדת של האדם %s כבר קיים במאגר של קבוצה זו ",
            "en" : "The birth day of the person %s is already exist on this group"
        },
        "add_birthDay_date_isNot_correct" :{
            "he" : "מה לעזאזל זה השטויות האלה? אתה בטוח שזה תאריך?",
            "en" : "Are you sure its a date?"
        },
        "date_syntax" :{
            "he" : "תראה אתה אמור לעשות להשתמש בנקודות שאתה כותב תאריך אבל מי אני שאשפוט",
            "en" : "Yeah that not how you write a date"
        },
        "remove_birthDay" : {
            "he" : "הסר יום הולדת",
            "en": "Remove birthday"
        },
        "remove_birthDay_reply" : {
            "he" : "יום ההולדת של האדם %s הוסר בהצלחה ",
            "en": `The birth day of the person %s removed successfully`
        },
        "remove_birthday_does_not_exist" :{
            "he" : "רק דוקטור דופנשמירץ יכול למחוק ימי הולדת לא קיימים",
            "en" : "Only Dr.Doofenshmirtz can remove birth day that isn't exist"
        },
        "group_dont_have_birthdays" :{
            "he" : "אין לקבוצה זו ימי הולדת",
            "en" : "This group don't have any birth days"
        },
        "show_birthDays" : {
            "he" : "הראה ימי הולדת",
            "en": "Show birthdays"
        },
        //sticker making
        "make_sticker" : {
            "he" : "הפוך לסטיקר",
            "en": "Make into Sticker"
        },
        "make_sticker_not_image" :{
            "he" : "טיפש אי אפשר להפוך משהו שהוא לא תמונה לסטיקר",
            "en" : "I can't make this message into a photo, are you sure its a image?"
        },
        "make_sticker_not_not_reply_to_a_message" :{
            "he" : "אתה בטוח שסימנת הודעה?",
            "en" : "Are you sure you reply to a message?"
        },
        //link Scanning
        "scan_link" : {
            "he" : "סרוק",
            "en": "Scan"
        },
        "scan_link_checking" : {
            "he" : "%s \n בודק",
            "en": "%s \n checking"
        },
        "scan_link_checking_error_upload" : {
            "he" : "שגיאה בהעלאת הקישור",
            "en": "Error while upload the link"
        },
        "scan_link_checking_error_checking" : {
            "he" : "שגיאה בבדיקת הקישור",
            "en": "Error while checking the link"
        }
    }
    static getGroupLang(groupDict, chatID, parameter, value1 = null, value2 = null){
         let lang;
         let strToReturn;
         if(chatID in groupDict) {
             const group = groupDict[chatID];
             lang = group.langOfThisGroup;
         }
         else{
             lang = "he";
         }
        let str = this.strings[parameter][lang];
        if(value2 != null) {
            strToReturn = util.format(str, value1, value2);
        }
        else if (value1 != null){
            strToReturn = util.format(str, value1);
        }
        else{
            strToReturn = str;
        }
        return strToReturn
    }
}
module.exports = stringLang;