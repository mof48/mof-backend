const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  uploadCredential,
  getUserCredentialStatus,
  getAllCredentialRequests,
  verifyCredential,
  rejectCredential,
} = require("../controllers/credentialController");

// all require auth middleware before
router.post("/upload", upload.single("credential"), uploadCredential);
router.get("/status", getUserCredentialStatus);
router.get("/requests", getAllCredentialRequests);
router.post("/verify/:id", verifyCredential);
router.post("/reject/:id", rejectCredential);

module.exports = router;
