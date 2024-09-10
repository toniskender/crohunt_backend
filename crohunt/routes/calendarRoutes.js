const express = require('express');
const { createCalendar, getUserCalendars, updateCalendar, deleteCalendar } = require('../controllers/calendarController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createCalendar);
router.get('/', authMiddleware, getUserCalendars);
router.put('/:id', authMiddleware, updateCalendar);
router.delete('/:id', authMiddleware, deleteCalendar);

module.exports = router;
