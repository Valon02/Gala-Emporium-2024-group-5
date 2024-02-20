import home from "./Pages/home.js";
import trolleriKlubb from "./Pages/trolleriklubb.js";
import matKlubb from "./Pages/matklubb.js";
import signup from "./Pages/signup.js";
import renderComedy from "./Pages/comedy.js";

async function route() {
  //console.log(location)

  switch (location.hash.replace("#", "")) {
    case "about":
      console.log("about");
      $("main").html(about());
      break;

    case "":
      console.log("Home", home());
      $("main").html(home());
      break;

    case "matklubb":
      $("main").html(await matKlubb());
      break;

    case "trolleriklubb":
      $("main").html(await trolleriKlubb());
      break;

    case "signup":
      $("main").html(await signup());
      break;

    case "comedy":
      console.log("comedy");
      $("main").html(await renderComedy());
      break;
    default:
      console.log("404");
      break;
  }
}

window.onhashchange = route;
window.onload = route;
