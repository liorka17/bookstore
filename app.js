const dotenv = require('dotenv');            // מייבא את dotenv כדי לקרוא משתני סביבה מקובץ .env
dotenv.config();                             // טוען את משתני הסביבה לתוך process.env

const express = require('express');          // מייבא את Express – פריימוורק ליצירת שרת
const app = express();                       // יוצר מופע של אפליקציית Express

const routes = require('./routes/route');    // מייבא את קובץ הנתבים (routes) מהנתיב שציינת
const { connectToDb } = require('./db');     // מייבא את פונקציית החיבור למסד הנתונים

app.use(express.json());                     // מאפשר לאפליקציה לקבל בקשות עם JSON בגוף הבקשה

connectToDb((err) => {                       // מנסה להתחבר למסד הנתונים ומעביר callback לקבלת שגיאה אם יש
    if (!err) {                              
        console.log("✅ Connected to DB");    // הצליח להתחבר למסד – מדפיס הודעה מתאימה
        app.use('/', routes);                // מפעיל את הראוטים רק אם החיבור למסד הצליח
    } else {
        console.log("❌ Failed to connect to DB"); // אם החיבור נכשל – מדפיס שגיאה
    }
});

module.exports = app;                        // מייצא את האובייקט app לשימוש בקובץ אחר (כמו server.js)
