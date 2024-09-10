

const Calendar = require('../models/Calendar');


const createCalendar = async (req, res) => {
    const { date, huntingArea } = req.body;
    const userId = req.user.id;  

    try {
        const newCalendar = new Calendar({
            date,
            huntingArea,
            userId
        });

        
        await newCalendar.save();
        res.status(201).json({ message: 'Calendar entry created', newCalendar });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};


const getUserCalendars = async (req, res) => {
    const userId = req.user.id;

    try {
        const calendar = await Calendar.find({ userId });
        res.json(calendar);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateCalendar = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const { date, huntingArea } = req.body;

    try {
        const calendar = await Calendar.findOne({ _id: id, userId });
        if (!calendar) {
            return res.status(404).json({ message: 'Calendar entry not found' });
        }

        calendar.date = date || calendar.date;
        calendar.huntingArea = huntingArea || calendar.huntingArea;

        await calendar.save();
        res.json({ message: 'Calendar entry updated', calendar });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteCalendar = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const calendar = await Calendar.findOneAndDelete({ _id: id, userId });
        if (!calendar) {
            return res.status(404).json({ message: 'Calendar entry not found' });
        }

        res.json({ message: 'Calendar entry deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createCalendar, getUserCalendars, updateCalendar, deleteCalendar };
