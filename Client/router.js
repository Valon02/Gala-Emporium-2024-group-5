import home from "./pages/home.js";
import about from "./Pages/about.js";

function route() {
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
        default:
            console.log("404");
            break;
    }
}

window.onhashchange = route
window.onload = route