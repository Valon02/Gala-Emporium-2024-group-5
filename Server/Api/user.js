import User from "../Models/user.js"
import Event from "../Models/event.js"
import Club from "../Models/club.js"

export default function (server) {

    // Get all users
    server.get("/api/users", async (req, res) => {
        const users = await User.find()
        res.json(users)
    })

    // Get one user
    server.get("/api/users/:id", async (req, res) => {
        const id = req.params.id
        const user = await User.findById(id).populate("club")
        res.json(user)
    })

    server.post("/api/users", async (req, res) => {
        try {
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                mail: req.body.mail,
                password: req.body.password,
                clubOwnerAt: req.body.clubId
            })
            const savedUser = await newUser.save()

            res.status(201).json(savedUser);
        } catch (error) {
            res.status(500).json({ message: "Något gick fel vid skapandet av användaren", error: error.message })
        }

    })

}