import home from "./Pages/home.js";
import renderComedy from "./Pages/comedy.js";

function route() {
  //console.log(location);

  switch (location.hash.replace("#", "")) {
    case "about":
      console.log("about");
      $("main").html(about());
      break;

    case "":
      console.log("Home", home());
      $("main").html(home());
      break;

    case "yes":
      console.log("comedy");
      $("main").html(renderComedy());
      break;
    default:
      console.log("404");
      break;
  }
}

window.onhashchange = route;
window.onload = route;
