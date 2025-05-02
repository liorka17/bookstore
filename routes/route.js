const express = require('express');                      // מייבא את Express
const router = express.Router();                         // יוצר מופע של router כדי להגדיר ראוטים
const { getDb } = require('../db');                      // מייבא את הפונקציה getDb לצורך גישה למסד

router.get('/books', (req, res) => {                     // ראוט GET שמחזיר את כל הספרים
    const db = getDb();                                  // מקבל את החיבור למסד הנתונים

    let books = [];                                      // יוצר מערך ריק שאליו נכניס את הספרים

    db.collection('books')                               // ניגש לאוסף בשם 'books' במסד
        .find()                                          // מבצע שאילתה שמחזירה את כל המסמכים
        .forEach(book => books.push(book))               // עובר על כל ספר ומכניס אותו למערך
        .then(() => {                                    // כשה-loop מסתיים בהצלחה:
            res.status(200).json(books);                 // מחזיר את רשימת הספרים כ-JSON עם סטטוס 200
        })
        .catch(() => {                                   // במקרה של שגיאה:
            res.status(500).json({ error: "Could not fetch the documents." }); // מחזיר סטטוס 500 עם הודעת שגיאה
        });
});

router.post('/books', (req, res) => {                    // ראוט POST ליצירת ספר חדש
    const db = getDb();                                  // מקבל את החיבור למסד

    const newBook = {                                    // יוצר אובייקט חדש מתוך גוף הבקשה
        title: req.body.title,
        author: req.body.author,
        price: req.body.price
    };

    db.collection('books')                               // ניגש לאוסף 'books'
        .insertOne(newBook)                              // מוסיף את הספר החדש למסד
        .then(result => {
            res.status(201).json(result);                // מחזיר את תוצאת ההוספה עם סטטוס 201 (נוצר)
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not create new document' }); // במקרה של שגיאה – סטטוס 500
        });
});

module.exports = router;                                 // מייצא את ה-router כדי לשלב אותו ב־app הראשי
