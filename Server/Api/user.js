import User from "../Models/user.js"
import Event from "../Models/event.js"
import Club from "../Models/club.js"

export default function (server) {

    // Get all users
    server.get("/api/users", async (req, res) => {
        const users = await User.find()
        res.json(users)
    })

}