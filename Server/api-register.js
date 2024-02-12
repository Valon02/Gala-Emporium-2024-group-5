import about from "./Api/about.js";
import club from "./Api/club.js";
import event from "./Api/event.js";

export default function (server) {
  about(server)
  club(server)
  event(server)
}