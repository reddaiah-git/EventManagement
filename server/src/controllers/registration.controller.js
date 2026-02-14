const Registration = require("../models/Registration");
const Event = require("../models/Event");

exports.register = async (req, res) => {
  const userId = req.userId;
  const { eventId } = req.body;

  // already registered?
  const existing = await Registration.findOne({ userId, eventId });
  if (existing) return res.status(409).json({ message: "Already registered" });

  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: "Event not found" });

  const count = await Registration.countDocuments({ eventId });

  if (count >= event.capacity)
    return res.status(400).json({ message: "Event is full" });

  const registration = await Registration.create({
    userId,
    eventId,
  });

  res.status(201).json(registration);
};
