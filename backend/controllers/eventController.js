const pool = require("../config/db");

// Create Event

exports.createEvent = async (req, res) => {

    try {

        const {
            event_name,
            venue,
            event_date,
            event_time,
            description
        } = req.body;

        const event = await pool.query(
            `
            INSERT INTO events
            (
                event_name,
                venue,
                event_date,
                event_time,
                description
            )
            VALUES ($1,$2,$3,$4,$5)
            RETURNING *
            `,
            [
                event_name,
                venue,
                event_date,
                event_time,
                description
            ]
        );

        res.status(201).json({
            success: true,
            message: "Event Created Successfully",
            data: event.rows[0]
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};


// Get All Events

exports.getEvents = async (req, res) => {

    try {

        const events = await pool.query(
            "SELECT * FROM events ORDER BY event_date ASC"
        );

        res.status(200).json({
            success: true,
            count: events.rows.length,
            data: events.rows
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};


// Delete Event

exports.deleteEvent = async (req, res) => {

    try {

        const id = req.params.id;

        await pool.query(
            "DELETE FROM events WHERE id=$1",
            [id]
        );

        res.status(200).json({
            success: true,
            message: "Event Deleted Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};