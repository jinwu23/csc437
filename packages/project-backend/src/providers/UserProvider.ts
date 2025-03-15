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
}
