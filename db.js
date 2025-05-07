const { MongoClient } = require('mongodb'); // מייבא את MongoClient מתוך ספריית mongodb

let dbConnection; // משתנה גלובלי שישמור את החיבור למסד הנתונים

module.exports = {
    connectToDb: (cb) => { // פונקציה שמבצעת התחברות למסד, ומקבלת callback לסיום
        MongoClient.connect('mongodb://localhost:27017/bookstore') // מתחבר למסד בשם 'bookstore' בריצה מקומית
            .then((client) => {
                dbConnection = client.db(); // שומר את החיבור במסת משתנה לשימוש עתידי
                return cb(); // מפעיל את ה-callback ללא שגיאה – הכל תקין
            })
            .catch(err => {
                console.log(err); // מציג את השגיאה במסוף אם יש כשל בחיבור
                return cb(err); // מפעיל את ה-callback עם השגיאה
            });
    },
    getDb: () => dbConnection // פונקציה שמחזירה את החיבור למסד לשימוש חיצוני
};
