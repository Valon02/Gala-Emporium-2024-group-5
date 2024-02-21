import club from "./Api/club.js";
import event from "./Api/event.js";
import user from "./Api/user.js";
import booking from "./Api/booking.js";

export default function (server) {
  club(server)
  event(server)
  user(server)
  booking(server)
}