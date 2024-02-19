import home from "./Pages/home.js";
import datingklubb from "./Pages/datingklubb.js";

async function route() {
  //console.log(location)

    switch(location.hash.replace("#", "")) {
        case "about":
            console.log("about");
            $("main").html(about())
            break;
        
        case "":
            console.log("Home", home());
            $("main").html(home())
            break;

        case "datingklubb":
            $("main").html(await datingklubb())
            break;
        
        default:
            console.log("404");
            break;
    }
}

window.onhashchange = route;
window.onload = route;