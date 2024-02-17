import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "events" },
    quantity: Number
})

const Booking = mongoose.model("bookings", bookingSchema)

export default Booking