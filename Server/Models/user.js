import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    mail: String,
    password: String,
    upcomingEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "events" }],
    previousEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "events" }],
    clubOwnerAt: { type: mongoose.Schema.Types.ObjectId, ref: "clubs" }
})

const User = mongoose.model("users", userSchema)

export default User