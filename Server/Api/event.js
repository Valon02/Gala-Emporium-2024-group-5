import Event from "../Models/event.js"
import Club from "../Models/club.js"

export default function (server) {

    // Get all events
    server.get("/api/events", async (req, res) => {
        const events = await Event.find().populate("club")
        res.json(events)
    })

    // Get all events within a specific club
    server.get("/api/events/clubs/:id", async (req, res) => {
        const clubId = req.params.id

        const events = await Event.find({ club: clubId }).populate("club")
        res.json(events)
    })

    // Get one event
    server.get("/api/events/:id", async (req, res) => {
        const id = req.params.id
        const event = await Event.findById(id).populate("club")
        res.json(event)
    })

    // Create new event
    server.post("/api/events", async (req, res) => {
        try {
            const newEvent = new Event({
                name: req.body.name,
                about: req.body.about,
                date: req.body.date,
                participantLimit: req.body.participantLimit,
                availableTickets: req.body.availableTickets,
                club: req.body.clubId
            })
            const savedEvent = await newEvent.save()

            const club = await Club.findById(req.body.clubId)
            club.events.push(newEvent._id)
            await club.save()

            res.status(201).json(savedEvent)
        }   catch (err) {
            res.status(400).json({ message: "Något gick fel."}, err)
        }
    })

    // Update one event
    server.put('/api/events/:id', async (req, res) => {
        const id = req.params.id;
        const updatedItem = req.body;

        const result = await Event.findByIdAndUpdate(id, updatedItem, { new: true });

        res.status(200).json(updatedItem);
    })

    // Delete event
    server.delete('/api/events/:id', async (req, res) => {
        const id = req.params.id;

        const result = await Event.findByIdAndDelete(id);

        res.status(204).send();
    })

}