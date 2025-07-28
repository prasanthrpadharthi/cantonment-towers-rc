const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require('../middleware/authMiddleware');

// GET /api/events?from=YYYY-MM-DD (public)
router.get('/', async (req, res) => {
  try {
    const from = req.query.from ? new Date(req.query.from) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const events = await Event.find({ date: { $gte: from } }).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events', error: err.message });
  }
});

// GET all events (admin, paginated) - protected
router.get('/all', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const events = await Event.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await Event.countDocuments();
    res.json({ events, total });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events', error: err.message });
  }
});

// POST create event - protected
router.post('/', auth, async (req, res) => {
  try {
    console.log('Creating event:', req);
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create event', error: err.message });
  }
});

// PATCH update event - protected
router.patch('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update event', error: err.message });
  }
});

// PATCH disable event (future events only) - protected
router.patch('/:id/disable', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.date < new Date()) return res.status(400).json({ message: 'Cannot disable past events' });
    event.isActive = false;
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: 'Failed to disable event', error: err.message });
  }
});

// PATCH /api/events/update/:id - update event (admin only, for frontend compatibility)
router.patch('/update/:id', auth, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update event', error: err.message });
  }
});

module.exports = router;
