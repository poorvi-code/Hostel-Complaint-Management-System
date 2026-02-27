const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const Student = require("./models/Student");
const Complaint = require("./models/Complaint");

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await Complaint.deleteMany();
    await Student.deleteMany();

    const adminPassword = await bcrypt.hash("Admin123", 10);
    const studentPassword = await bcrypt.hash("Password123", 10);

    const users = await Student.insertMany([
      {
        name: "Hostel Admin",
        email: "admin@hostelops.com",
        password: adminPassword,
        role: "admin"
      },
      {
        name: "Student One",
        email: "student1@hostelops.com",
        password: studentPassword,
        role: "student"
      },
      {
        name: "Student Two",
        email: "student2@hostelops.com",
        password: studentPassword,
        role: "student"
      }
    ]);

    const student1 = users.find((u) => u.email === "student1@hostelops.com");
    const student2 = users.find((u) => u.email === "student2@hostelops.com");

    await Complaint.insertMany([
      {
        student: student1._id,
        category: "Electrical",
        description: "Tube light in room 203 is flickering.",
        priority: "High",
        status: "Pending"
      },
      {
        student: student2._id,
        category: "Plumbing",
        description: "Leakage in bathroom tap in room 110.",
        priority: "Medium",
        status: "In Progress"
      },
      {
        student: student1._id,
        category: "Internet",
        description: "WiFi is unstable on the second floor.",
        priority: "High",
        status: "Resolved"
      }
    ]);

    console.log("Seed data inserted successfully");
    process.exit(0);
  } catch (error) {
    console.error(`Seed error: ${error.message}`);
    process.exit(1);
  }
};

seedData();

