import home from "./Pages/home.js";
import matKlubb from "./Pages/matklubb.js";

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
      $("main").html(await matKlubb())
      break;

    default:
      console.log("404");
      break;
  }
}



//window.onhashchange = route;
//window.onload = route;
