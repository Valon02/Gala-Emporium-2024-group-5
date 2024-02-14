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
        const user = await User.findById(id)
        res.json(user)
    })

    server.post("/api/users", async (req, res) => {
        const newUsers = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mail: req.body.mail,
            password: req.body.password,
            upcomingEvents: req.body.upcomingEvents,
            previousEvents: req.body.previousEvents,
            
        })
    })

}