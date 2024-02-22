import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mail: { type: String, required: true },
    password: { type: String, required: true },
    upcomingEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "events" }],
    previousEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "events" }],
    clubOwnerAt: { type: mongoose.Schema.Types.ObjectId, ref: "clubs" }
})

const User = mongoose.model("users", userSchema)

export default User