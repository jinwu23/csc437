import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { UserProvider } from "../providers/UserProvider";
import { verifyAuthToken } from "./auth";
import { ObjectId } from "mongodb";

// Register user routes
export function registerUserRoutes(
  app: express.Application,
  mongoClient: MongoClient
) {
  const userProvider = new UserProvider(mongoClient);

  // Update user information endpoint
  app.post(
    "/user/edit",
    verifyAuthToken,
    async (req: Request, res: Response) => {
      const { id, email, firstName, lastName } = req.body;

      // Validate input
      if (!id || !email || !firstName || !lastName) {
        res.status(400).json({
          type: "error",
          message: "Missing required fields: id, email, firstName, lastName",
        });
        return;
      }

      try {
        const userId = new ObjectId(id);
        const updates = { email, firstName, lastName };

        // Update user information
        const updatedUser = await userProvider.updateUserInfo(userId, updates);

        if (!updatedUser) {
          res.status(404).json({
            type: "error",
            message: "User not found",
          });
          return;
        }

        res.status(200).json({
          type: "success",
          message: "User information updated successfully",
          data: updatedUser,
        });
      } catch (error) {
        console.error("Error updating user information:", error);
        res.status(500).json({
          type: "error",
          message: "Internal server error",
        });
      }
    }
  );
}
