import mongoose from "mongoose"

const clubSchema = mongoose.Schema({
    name: String,
    about: String,
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "events" }],

})

const Club = mongoose.model("clubs", clubSchema)

export default Club