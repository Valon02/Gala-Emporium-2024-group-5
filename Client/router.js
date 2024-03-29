import home from "./Pages/home.js";
import datingklubb from "./Pages/datingklubb.js";
import kodklubben from "./Pages/kodklubben.js";
import trolleriKlubb from "./Pages/trolleriklubb.js";
import matKlubb from "./Pages/matklubb.js";
import signup from "./Pages/signup.js";
import renderComedy from "./Pages/comedy.js";
import signinPage from "./Pages/signin-page.js";
import newMyPages from "./Pages/new-my-pages.js";
import nattklubb from "./Pages/nattklubb.js";

async function route() {

    switch(location.hash.replace("#", "")) {
        case "about":
            console.log("about");
            $("main").html(about())
            break;
        
        case "":
            console.log("Home", home());
            $("main").html(await home())
            break;

        case "datingklubb":
            $("main").html(await datingklubb())
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

    case "signin":
      $("main").html(await signinPage());
      break;

    case "comedy":
      console.log("comedy");
      $("main").html(await renderComedy());
      break;

    case "kodklubben":
      $("main").html(await kodklubben());
      break;

    case "nattklubb":
      $("main").html(await nattklubb())
      break;

    case "minaSidor":
      console.log("my-pages");
      $("main").html(await newMyPages());
            break;
        
        default:
            console.log("404");
            break;
    }
}

window.onhashchange = route;
window.onload = route;