import mongoose from "mongoose"

const eventSchema = mongoose.Schema({
    name: String,
    about: String,
    date: Date,
    participantLimit: Number,
    availableTickets: Number,
    club: { type: mongoose.Schema.Types.ObjectId, ref: "clubs" }

})

const Event = mongoose.model("events", eventSchema)

export default Event