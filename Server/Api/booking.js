import User from "../Models/user.js";
import Event from "../Models/event.js";
import Booking from "../Models/booking.js";

export default function (server) {

    // Get all bookings
    server.get("/api/bookings", async (req, res) => {
        const bookings = await Booking.find()
        res.json(bookings)
    })

    // Get one booking
    server.get("/api/bookings/:id", async (req, res) => {
        try {
            const id = req.params.id
        const bookings = await Booking.findById(id).populate("user").populate("event")
        res.json(bookings)
        } catch (error) {
            res.json({ message: "Något gick fel.", error: error })
        }
        
    })



    // Book an event
    server.post("/api/bookings/events/:id", async (req, res) => {
        // Om användaren är inloggad.
        if (req.session.login) {

            try {
                // Hämtar eventet man vill boka fråm parametern.
                const eventId = req.params.id
                const event = await Event.findById(eventId)

                // Hämtar användaren
                const userId = req.session.login
                const user = await User.findById(userId)

                // Skapar en ny bokning
                const newBooking = new Booking({
                    user: req.session.login,
                    event: event,
                    quantity: req.body.quantity
                })

                // Om det inte finns tillräckligt många platser kvar så får man ett felmeddelande
                if (event.availableTickets < newBooking.quantity) {
                    return res.json({ message: `Det finns bara såhär många platser lediga: ${event.availableTickets}` })
                }

                // Pushar eventet till kommande event i användaren
                user.upcomingEvents.push(eventId)

                // Minskar antalet platser som finns kvar
                event.availableTickets -= newBooking.quantity

                // Sparar allt
                await user.save()
                await event.save()
                const savedBooking = await newBooking.save()

                res.json({ message: "Du har nu bokat eventet.", savedBooking: savedBooking})


            } catch (error) {
                return res.json({ message: "Något gick fel vid bokning av eventet." })
            }
        // Om man inte är inloggad.
        } else {
            return res.json({ message: "Du måste logga in för att boka." })
        }
    })




    // Update booking
    server.put("/api/bookings/:id", async (req, res) => {
        const id = req.params.id;
        const updatedItem = req.body;

        const result = await Booking.findByIdAndUpdate(id, updatedItem, { new: true });

        res.status(200).json(updatedItem);
    })

    // Delete booking
    server.delete("/api/bookings/:id", async (req, res) => {
        const id = req.params.id;

        // Raderar bokningen
        const result = await Booking.findByIdAndDelete(id);

        res.status(204).send();
    })

}