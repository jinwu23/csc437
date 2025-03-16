import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { UserProvider } from "../providers/UserProvider";
import { EventProvider } from "../providers/EventProvider";
import { verifyAuthToken } from "./auth";
import { ObjectId } from "mongodb";

// Register user routes
export function registerEventRoutes(
  app: express.Application,
  mongoClient: MongoClient
) {
  const userProvider = new UserProvider(mongoClient);
  const eventProvider = new EventProvider(mongoClient);

  app.get("/api/events", async (req: Request, res: Response) => {
    try {
      const events = await eventProvider.getAllEvents();

      // Transform to IEventData format
      const eventData = events.map((event) => ({
        id: event.id?.toString() || "",
        title: event.title,
        date: event.date,
        location: {
          country: event.location.country,
          city: event.location.city,
          address: event.location.address,
        },
        startTime: event.startTime,
        endTime: event.endTime,
        registeredVolunteers: event.registeredVolunteers.map((id) =>
          id.toString()
        ),
        description: event.description,
      }));

      res.status(200).json({
        type: "success",
        data: eventData,
      });
    } catch (error) {
      console.error("Error getting upcoming events:", error);
      res.status(500).json({
        type: "error",
        message: "Internal server error",
      });
    }
  });
}
