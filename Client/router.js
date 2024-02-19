// Importera "home"-sidan från filen "./Pages/home.js"
import home from "./Pages/home.js";

// Kontrollera om någon är inloggad via en serverförfrågan till "/api/user"
server.get("/api/user", async (req, res) => {
  try {
    if (req.session.login) {
      // Om någon är inloggad, skicka tillbaka information om den inloggade användaren utan att inkludera lösenordet
      res.json({ user: req.session.login.mail, message: "Inloggad användare information." });
    } else {
      // Om ingen är inloggad, skicka ett meddelande om detta
      res.json({ message: "Ingen användare är för närvarande inloggad." });
    }
  } catch (error) {
    // Om det uppstår ett fel, skicka en statuskod 400 och ett felmeddelande
    res.status(400).json({ message: "Något gick fel." }, error);
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

// Anropa funktionen för att kontrollera om användaren är inloggad och hantera resultatet
checkIfUserLoggedIn().then((isLoggedIn) => {
  console.log("Är användaren inloggad?", isLoggedIn);

  // Hämta referenser till HTML-elementen för inloggad och utloggad header
  const headerLoggedIn = document.getElementById("header-logged-in");
  const headerLoggedOut = document.getElementById("header-logged-out");

  // Uppdatera visningen av header beroende på om användaren är inloggad eller inte
  if (isLoggedIn) {
    headerLoggedIn.style.display = "block"; // Visa inloggad header
    headerLoggedOut.style.display = "none"; // Dölj utloggad header
  } else {
    headerLoggedIn.style.display = "none"; // Dölj inloggad header
    headerLoggedOut.style.display = "block"; // Visa utloggad header
  }
});

// Funktion för att ruttväxla beroende på URL-hashen
function route() {
  switch (location.hash.replace("#", "")) {
    case "about":
      console.log("about");
      $("main").html(about()); // Uppdatera huvudinnehållet med "about"-sidan
      break;
    case "":
      console.log("Home", home());
      $("main").html(home()); // Uppdatera huvudinnehållet med "home"-sidan
      break;
    default:
      console.log("404"); // Om ingen matchande route hittas, logga en 404
      break;
  }
}

// Lyssna på ändringar i URL-hashen och ladda om sidan
window.onhashchange = route;
window.onload = route; // Ladda om sidan när den har laddats
