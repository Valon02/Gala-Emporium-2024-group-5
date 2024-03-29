import Club from "../Models/club.js"
import Event from "../Models/event.js"

export default function (server) {

    // Get all clubs
    server.get("/api/clubs", async (req, res) => {
        const clubs = await Club.find().populate("events")
        res.json(clubs)
    })

    // Get one club
    server.get("/api/clubs/:id", async (req, res) => {
        const id = req.params.id;
        const club = await Club.findById(id).populate("events");
        res.json(club)
    })

    // Create new club
    server.post("/api/clubs", async (req, res) => {
        try {
            const newClub = new Club({
                name: req.body.name,
                about: req.body.about
            })
            const savedClub = await newClub.save()

            res.status(201).json(savedClub)
        }   catch (err) {
            res.status(500).json({ message: "Något gick fel."})
        }
    })

    // Update club
    server.put("/api/clubs/:id", async (req, res) => {
        const id = req.params.id;
        const updatedItem = req.body;

        const result = await Club.findByIdAndUpdate(id, updatedItem, { new: true });

        res.status(200).json(updatedItem);
    })

    // Delete club
    server.delete("/api/clubs/:id", async (req, res) => {
        const id = req.params.id;

        // Raderar klubben
        const result = await Club.findByIdAndDelete(id);

        // Raderar alla events i klubben
        await Event.deleteMany({ club: id })

        res.status(204).send();
    })


}