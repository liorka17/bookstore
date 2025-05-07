
const http = require('http'); // מייבא את המודול 'http' שמובנה ב-Node.js כדי ליצור שרת HTTP
const app = require('./app'); // מייבא את הקובץ app.js שמכיל את ההגדרות של האפליקציה (למשל Express)
const PORT = process.env.PORT || 5000; 
const { connectToDb } = require('./db');
const routes = require('./routes/route');

connectToDb((err) => {
    if (!err) {
        console.log("✅ Connected to DB");
        app.use('/', routes);
    } else {
        console.log("❌ Failed to connect to DB");
    }
});
const server = http.createServer(app); // יוצר מופע של שרת HTTP שמשתמש באפליקציה שייבאנו (בדר"כ Express)
server.listen(PORT, '0.0.0.0', () => { // מפעיל את השרת שיאזין על כל כתובות ה-IP של השרת ('0.0.0.0') בפורט שהגדרנו
    console.log(`Server started on port ${PORT}`); // מדפיס ללוג שהשרת התחיל לפעול עם מספר הפורט
    
});


