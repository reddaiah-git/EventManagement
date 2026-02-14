const Event = require("../models/Event");

exports.search = async (req, res) => {
  try {
    const { q, location, category } = req.query;

    const filter = {};

    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    if (location) filter.location = location;
    if (category) filter.category = category;

    const events = await Event.find(filter).sort({ date: 1 });

    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Search failed" });
  }
};
