const Credential = require("../models/Credential");
const path = require("path");

exports.uploadCredential = async (req, res) => {
  try {
    const fileUrl = `/uploads/credentials/${req.file.filename}`;

    const existing = await Credential.findOne({ doctor: req.user._id });
    if (existing) await existing.deleteOne(); // one credential per doctor

    const credential = await Credential.create({
      doctor: req.user._id,
      fileUrl,
    });

    res.status(201).json(credential);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserCredentialStatus = async (req, res) => {
  try {
    const credential = await Credential.findOne({ doctor: req.user._id });
    res.json({ status: credential?.status || "not_submitted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCredentialRequests = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).send("Forbidden");

    const requests = await Credential.find()
      .populate("doctor", "name email")
      .sort({ uploadedAt: -1 });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyCredential = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).send("Forbidden");

    await Credential.findByIdAndUpdate(req.params.id, { status: "verified" });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.rejectCredential = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).send("Forbidden");

    await Credential.findByIdAndUpdate(req.params.id, { status: "rejected" });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
