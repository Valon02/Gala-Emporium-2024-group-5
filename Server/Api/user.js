import User from "../Models/user.js"
import Event from "../Models/event.js"
import Club from "../Models/club.js"
import crypto from "crypto"
const salt = "detsaltigastesaltet"

function getHash(password) {
    let hash = crypto.pbkdf2Sync(password, salt, 1000, 32, `sha512`).toString(`hex`)
    return hash
}

export default function (server) {

    // Get all users
    server.get("/api/users", async (req, res) => {
        const users = await User.find()
        res.json(users)
    })

    // Get one user
    server.get("/api/users/:id", async (req, res) => {
        const id = req.params.id
        const user = await User.findById(id).populate("clubOwnerAt")
        res.json(user)
    })

    // Create user
    server.post("/api/users", async (req, res) => {
        try {

            // Om det finns en användare med samma mail som skrivits i bodyn så sparas den som existingUser.
            const existingUser = await User.findOne({ mail: req.body.mail })

            // Om existingUser existerar så får man ett felmeddelande.
            if (existingUser) {
                return res.status(400).json({ message: "Användare med samma mail finns redan." })
            }

            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                mail: req.body.mail,
                password: getHash(req.body.password),
                clubOwnerAt: req.body.clubOwnerAt
            })
            
            const savedUser = await newUser.save()

            res.status(201).json(savedUser);
        } catch (error) {
            res.status(500).json({ message: "Något gick fel vid skapandet av användaren", error: error.message })
        }
    })

    // Login funktion
    server.post("/api/login", async (req, res) => {
        try {
            if (req.session.login) {
                res.json({ message: "Det finns redan en användare inloggad." })
            } else {
                const user = await User.findOne({
                    mail: req.body.mail,
                    password: getHash(req.body.password)
                }, "-password")
                if (user) {
                    // Sparar den inloggade användaren i req.session.login
                    req.session.login = user
                    console.log(req.session.login);
                    res.json({ message: `Du har loggat in som ${user.mail}.` })
                } else {
                    res.json({ message: "Fel användare eller lösenord." })
                }
            }
        } catch (error) {
            res.status(500).json({ message: "Något gick fel."}, error)
        }
    })

    // Kollar om någon är inloggad
    server.get("/api/login", async (req, res) => {
        if (req.session.login) {
            return true
        } else {
            return false
        }
    })

    // Logout funktion
    server.delete("/api/login", async (req, res) => {
        if (req.session.login) {
            const user = await User.findById(req.session.login)
            delete req.session.login
            res.json({ message: `Hejdå ${user.firstName}, Du har nu loggat ut.` })
        } else {
            res.json({ message: "Fel, ingen är inloggad." })
        }
    })

    // Update one user
    server.put('/api/users/:id', async (req, res) => {
        const id = req.params.id;
        const updatedItem = req.body;

        const result = await User.findByIdAndUpdate(id, updatedItem, { new: true });

        res.status(200).json(updatedItem);
    })

    // Delete user
    server.delete("/api/users/:id", async (req, res) => {
        const id = req.params.id

        const result = await User.findByIdAndDelete(id);

        res.status(204).send();
    })



}