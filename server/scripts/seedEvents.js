require("dotenv").config();
const mongoose = require("mongoose");
const Event = require("../src/models/Event");
const User = require("../src/models/User");

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const organizer = await User.findOne();
  if (!organizer) {
    console.log("Create at least one user first.");
    process.exit(0);
  }

  const categories = ["Tech", "Music", "Business", "Sports"];
  const locations = ["Hyderabad", "Bangalore", "Delhi", "Mumbai"];

  const events = Array.from({ length: 15 }).map((_, i) => ({
    name: `Sample Event ${i + 1}`,
    organizer: organizer._id,
    location: locations[i % locations.length],
    date: new Date(Date.now() + i * 86400000),
    description: "Seeded event for testing",
    capacity: 20,
    category: categories[i % categories.length],
  }));

  await Event.deleteMany();
  await Event.insertMany(events);

  console.log("Seed data inserted");
  process.exit();
};

run();
