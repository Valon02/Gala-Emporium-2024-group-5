import Club from "../Models/club.js"

export default function (server) {

    server.get("/api/clubs", async (req, res) => {
        const clubs = await Club.find()
        res.json(clubs)
    })

    server.post("/api/clubs", async (req, res) => {
        try {
            const newClub = new Club({
                name: req.body.name,
                about: req.body.about,
                events: req.body.eventId
            })
            const savedClub = await newClub.save()

            const event = await Event.findById(req.body.authorId)
            event.clubs.push(newClub._id)
            await event.save()

            res.status(201).json(savedClub)
        }   catch (err) {
            res.status(500).json({ message: "Något gick fel."})
        }
    })

    server.post("/api/clubs/:id", async (req, res) => {
        const id = req.params.id;
        const updatedItem = req.body;

        const result = await Club.findByIdAndUpdate(id, updatedItem, { new: true });

        res.status(200).json(updatedItem);
    })


    server.delete("/api/clubs/:id", async (req, res) => {
        const id = req.params.id;

        const result = await Event.findByIdAndDelete(id);

        res.status(204).send();
    })


}