import { Collection, MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

interface IUserDocument {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export class CredentialsProvider {
  private readonly collection: Collection<IUserDocument>;

  constructor(mongoClient: MongoClient) {
    const COLLECTION_NAME = process.env.CREDS_COLLECTION_NAME;
    if (!COLLECTION_NAME) {
      throw new Error("Missing CREDS_COLLECTION_NAME from env file");
    }
    this.collection = mongoClient
      .db()
      .collection<IUserDocument>(COLLECTION_NAME);
  }

  /* Registers a new user with the provided details. */
  async registerUser(
    email: string,
    plaintextPassword: string,
    firstName: string,
    lastName: string
  ): Promise<boolean> {
    try {
      // Check if the email already exists
      const existingUser = await this.collection.findOne({ email });
      if (existingUser) {
        return false; // User already exists
      }

      // Generate salt and hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(plaintextPassword, salt);

      // Store the new user credentials and additional details
      await this.collection.insertOne({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });

      return true; // Successfully registered
    } catch (error) {
      console.error("Error during user registration:", error);
      throw new Error("Failed to register user");
    }
  }

  /* Verifies the user's password */
  async verifyPassword(
    email: string,
    plaintextPassword: string
  ): Promise<boolean> {
    try {
      const user = await this.collection.findOne({ email });
      if (!user) {
        return false; // User not found
      }

      // Compare the provided password with the stored hash
      return await bcrypt.compare(plaintextPassword, user.password);
    } catch (error) {
      console.error("Error during password verification:", error);
      throw new Error("Failed to verify password");
    }
  }
}
