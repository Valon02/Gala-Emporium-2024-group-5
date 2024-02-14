import about from "./Api/about.js";
import club from "./Api/club.js";
import event from "./Api/event.js";
import user from "./Api/user.js";

export default function (server) {
  about(server)
  club(server)
  event(server)
  user(server)
}