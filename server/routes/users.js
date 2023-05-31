import express from "express";
import { verifyToken } from "../middleware/auth";
import {
    getUser,
    getUserFriends,
    addRemoveFriends
} from "../controllers/users";

const router= express.Router();

// Read Routes
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

// Update Routes
router.patch("/:id/:friendId", verifyToken, addRemoveFriends);

export default router;

