const http = require('http'); 
// מייבא את המודול 'http' שמובנה ב-Node.js כדי ליצור שרת HTTP

const app = require('./app'); 
// מייבא את הקובץ app.js שמכיל את ההגדרות של האפליקציה (למשל Express)

const PORT = process.env.PORT || 5000; 
// קובע את הפורט שעליו השרת יאזין – אם מוגדר ב־ENV אז ייקח אותו, אחרת ברירת מחדל 5000

const server = http.createServer(app); 
// יוצר מופע של שרת HTTP שמשתמש באפליקציה שייבאנו (בדר"כ Express)

server.listen(PORT, '0.0.0.0', () => { 
// מפעיל את השרת שיאזין על כל כתובות ה-IP של השרת ('0.0.0.0') בפורט שהגדרנו

    console.log(`Server started on port ${PORT}`); 
    // מדפיס ללוג שהשרת התחיל לפעול עם מספר הפורט
});
