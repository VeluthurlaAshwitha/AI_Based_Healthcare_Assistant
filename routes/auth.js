import express from "express";
import { Register, Login } from "../controllers/auth.js";
import Validate from "../middleware/validate.js";
import { check } from "express-validator";
import { Verify } from "../middleware/verify.js";
import HealthRecord from "../models/HealthRecord.js";

const router = express.Router();

// Register route -- POST request
router.post(
  "/register",
  check("email")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),
  check("first_name")
    .not()
    .isEmpty()
    .withMessage("You first name is required")
    .trim()
    .escape(),
  check("last_name")
    .not()
    .isEmpty()
    .withMessage("You last name is required")
    .trim()
    .escape(),
  check("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Must be at least 8 chars long"),
  Validate,
  Register
);

// Login route == POST request
router.post(
  "/login",
  check("email")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),
  check("password").not().isEmpty(),
  Validate,
  Login
);


// submit health records

router.post('/healthrecord', Verify, async (req, res) => {
  try {
      const { date, symptoms, diagnosis, treatment } = req.body;
      const userId = req.user._id;

      // Create a new health record
      const newRecord = new HealthRecnpmord({
          user: userId,
          date,
          symptoms,
          diagnosis,
          treatment
      });

      // Save the record to the database
      await newRecord.save();

      res.status(201).json({
        "status":"success",
        "message":"Record is added Successfully."
      });
  } catch (error) {
      res.status(500).json({ error: 'Failed to create health record' });
  }
});



export default router;
