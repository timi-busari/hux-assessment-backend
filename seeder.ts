import mongoose, { Types } from "mongoose";
import User, { IUser } from "./src/models/user.model";
import Contact, { IContact } from "./src/models/contact.model";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config(); // To load environment variables, such as DB connection string

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI as string);

    console.log("Connected to MongoDB");

    // Clear existing users and contacts
    await User.deleteMany({});
    await Contact.deleteMany({});

    // Create a user
    const hashedPassword = await bcrypt.hash("password123", 10);
    const user: IUser = new User({
      username: "testuser",
      password: hashedPassword,
    });

    const savedUser = await user.save();
    console.log("User created:", savedUser);

    const userId = savedUser._id as Types.ObjectId;

    // Create multiple contacts for this user
    const contactsData = [
      {
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "+2349043235652",
        user: userId,
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        phoneNumber: "+2349043235653",
        user: userId,
      },
      {
        firstName: "Alice",
        lastName: "Johnson",
        phoneNumber: "+2349043235655",
        user: userId,
      },
    ];

    const contacts = await Contact.insertMany(contactsData);
    console.log("Contacts created:", contacts);

    // Close the MongoDB connection
    mongoose.connection.close();
    console.log("Database seeding completed and connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
