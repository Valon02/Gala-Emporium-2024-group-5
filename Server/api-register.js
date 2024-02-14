
import club from "./Api/club.js";
import event from "./Api/event.js";

export default function (server) {
  club(server)
  event(server)
}