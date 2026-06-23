const express = require("express");

const router = express.Router();

const {
    createEvent,
    getEvents,
    deleteEvent
} = require("../controllers/eventController");

router.post(
    "/",
    createEvent
);

router.get(
    "/",
    getEvents
);

router.delete(
    "/:id",
    deleteEvent
);

module.exports = router;