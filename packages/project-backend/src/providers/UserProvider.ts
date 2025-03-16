import { Collection, MongoClient, ObjectId } from "mongodb";

export interface IUserDocument {
  _id?: ObjectId;
  type: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  totalEvents: number;
  totalHours: number;
  eventsAttended: Array<ObjectId>;
  eventsAttending: Array<ObjectId>;
}

export interface IUserData {
  id: string;
  type: string;
  email: string;
  firstName: string;
  lastName: string;
  totalEvents: number;
  totalHours: number;
  eventsAttended: Array<string>;
  eventsAttending: Array<string>;
}

export class UserProvider {
  private readonly collection: Collection<IUserDocument>;

  constructor(mongoClient: MongoClient) {
    const COLLECTION_NAME = process.env.USERS_COLLECTION_NAME;
    if (!COLLECTION_NAME) {
      throw new Error("Missing USERS_COLLECTION_NAME from env file");
    }
    this.collection = mongoClient
      .db()
      .collection<IUserDocument>(COLLECTION_NAME);
  }

  async getUserByEmail(email: string): Promise<IUserData | null> {
    try {
      const user = await this.collection.findOne(
        { email },
        { projection: { password: 0 } } // Exclude password
      );

      if (!user) {
        return null;
      }

      // Transform to IUserData format
      return {
        id: user._id?.toString() || "",
        type: user.type,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        totalEvents: user.totalEvents,
        totalHours: user.totalHours,
        eventsAttended: user.eventsAttended.map((id) => id.toString()),
        eventsAttending: user.eventsAttending.map((id) => id.toString()),
      };
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw new Error("Failed to retrieve user data");
    }
  }

  async getUserById(_id: ObjectId): Promise<IUserData | null> {
    try {
      const user = await this.collection.findOne(
        { _id },
        { projection: { password: 0 } } // Exclude password
      );

      if (!user) {
        return null;
      }

      // Transform to IUserData format
      return {
        id: user._id?.toString() || "",
        type: user.type,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        totalEvents: user.totalEvents,
        totalHours: user.totalHours,
        eventsAttended: user.eventsAttended.map((id) => id.toString()),
        eventsAttending: user.eventsAttending.map((id) => id.toString()),
      };
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw new Error("Failed to retrieve user data");
    }
  }

  async updateUserInfo(
    id: ObjectId,
    updates: { firstName?: string; lastName?: string; email?: string }
  ): Promise<IUserData | null> {
    try {
      // Validate updates object
      if (!updates.firstName && !updates.lastName && !updates.email) {
        throw new Error("No valid fields provided for update");
      }

      // Perform the update operation
      const result = await this.collection.findOneAndUpdate(
        { _id: id }, // Filter by user ID
        { $set: updates }, // Update the specified fields
        {
          returnDocument: "after", // Return the updated document
          projection: { password: 0 }, // Exclude the password field
        }
      );

      // Check if the user was found and updated
      if (!result) {
        return null; // User not found
      }

      // Transform the updated document into IUserData format
      return {
        id: result._id?.toString() || "",
        type: result.type,
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName,
        totalEvents: result.totalEvents,
        totalHours: result.totalHours,
        eventsAttended: result.eventsAttended.map((id) => id.toString()),
        eventsAttending: result.eventsAttending.map((id) => id.toString()),
      };
    } catch (error) {
      console.error("Error updating user information:", error);
      throw new Error("Failed to update user information");
    }
  }
}
