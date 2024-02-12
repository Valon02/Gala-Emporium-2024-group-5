import Event from "../Models/event.js"
import Club from "../Models/club.js"

export default function (server) {

    server.get("/api/events", async (req, res) => {
        const events = await Event.find().populate("club")
        res.json(events)
    })

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

    server.put('/api/events/:id', async (req, res) => {
        const id = req.params.id;
        const updatedItem = req.body;

        const result = await Event.findByIdAndUpdate(id, updatedItem, { new: true });

        res.status(200).json(updatedItem);
    })

    server.delete('/api/events/:id', async (req, res) => {
        const id = req.params.id;

        const result = await Event.findByIdAndDelete(id);

        res.status(204).send();
    })

}