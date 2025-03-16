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

  // Create event endpoint - POST /api/events
  app.post(
    "/api/events",
    verifyAuthToken,
    async (req: Request, res: Response) => {
      try {
        // Validate required fields
        const {
          title,
          date,
          location,
          startTime,
          endTime,
          description,
          createdBy,
        } = req.body;

        // Get the authenticated user's ID from the request
        const userId = createdBy;
        if (!userId) {
          res.status(401).json({
            type: "error",
            message: "Unauthorized: User not authenticated",
          });
          return;
        }

        // Verify user is an admin
        const userObjectId = new ObjectId(userId);
        const user = await userProvider.getUserById(userObjectId);

        if (!user || user.type !== "admin") {
          res.status(403).json({
            type: "error",
            message: "Forbidden: Only admins can create events",
          });
          return;
        }

        if (
          !title ||
          !date ||
          !location ||
          !startTime ||
          !endTime ||
          !description
        ) {
          res.status(400).json({
            type: "error",
            message: "Missing required event fields",
          });
          return;
        }

        // Validate location fields
        if (!location.country || !location.city || !location.address) {
          res.status(400).json({
            type: "error",
            message: "Missing required location fields",
          });
          return;
        }

        // Create the event
        const newEvent = await eventProvider.createEvent({
          title,
          date: new Date(date),
          location: {
            country: location.country,
            city: location.city,
            address: location.address,
          },
          startTime,
          endTime,
          registeredVolunteers: [], // Start with empty array
          description,
        });

        if (!newEvent) {
          res.status(500).json({
            type: "error",
            message: "Failed to create event",
          });
          return;
        }

        res.status(201).json({
          type: "success",
          message: "Event created successfully",
          data: newEvent,
        });
        return;
      } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({
          type: "error",
          message: "Internal server error",
        });
        return;
      }
    }
  );
}
