// Importera "home"-sidan från filen "./Pages/home.js"
import home from "./Pages/home.js";
// Importera "login"-sidan från filen "./Pages/login.js"
import login from "./Pages/login.js";

// Kontrollera om någon är inloggad via en serverförfrågan till "/api/user"
server.get("/api/user", async (req, res) => {
  try {
    // Använd destructuring för att göra koden mer läsbar
    const { login } = req.session;

    if (await login) {
      // Om någon är inloggad, skicka tillbaka information om den inloggade användaren utan att inkludera lösenordet
      res.json({ user: login.mail, message: "Inloggad användare information." });
    } else {
      // Om ingen är inloggad, skicka ett meddelande om detta
      res.json({ message: "Ingen användare är för närvarande inloggad." });
    }
  } catch (error) {
    // Om det uppstår ett fel, skicka en statuskod 400 och ett felmeddelande
    res.status(400).json({ message: "Något gick fel." });
  }
});


// Funktion för att kontrollera om en användare är inloggad
async function checkIfUserLoggedIn() {
  try {
    const response = await fetch("/api/user");
    const data = await response.json();

    if (response.ok) {
      // Returnera true om användaren är inloggad, annars false
      return !!data.user; 
    } else {
      // Om det uppstår ett fel vid hämtning av användarinformation, logga detta och returnera false
      console.error("Fel vid hämtning av användarinformation:", data.message);
      return false;
    }
  } catch (error) {
    // Om det uppstår ett fel, logga detta och returnera false
    console.error("Något gick fel:", error);
    return false;
  }
}



// Funktion för att ruttväxla beroende på URL-hashen
async function route() {
  switch (location.hash.replace("#", "")) {
    case "about":
      console.log("about");
      $("main").html(about()); // Uppdatera huvudinnehållet med "about"-sidan
      break;
    case "":
      console.log("Home", home());
      $("main").html(home()); // Uppdatera huvudinnehållet med "home"-sidan
      break;
    case "login":
      console.log("login", login());
      $("header").html(login()); // Uppdatera huvudinnehållet med "login"-sidan
      break;
    default:
      console.log("404"); // Om ingen matchande route hittas, logga en 404
      break;
  }
}


// Lyssna på ändringar i URL-hashen och ladda om sidan
window.onhashchange = route;
window.onload = route; // Ladda om sidan när den har laddats
