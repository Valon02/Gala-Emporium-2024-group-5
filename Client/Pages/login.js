export default async function renderlogin() {
  // Set the main ID
  $("header").attr("id", "login")};
 
  // login.js

// Importera eller inkludera den checkIfUserLoggedIn-funktionen här

// Funktion för att hantera inloggningssidan
function login() {
  // Kolla om användaren är inloggad
  checkIfUserLoggedIn().then((isLoggedIn) => {
    if (isLoggedIn) {
      // Användaren är redan inloggad, visa inloggat innehåll
      $("header").html(loggedInHeader()); // Använd loggedInHeader-funktionen för att visa inloggat header-innehåll
      $("main").html(loggedInContent()); // Använd loggedInContent-funktionen för att visa inloggat huvudinnehåll
    } else {
      // Användaren är inte inloggad, visa inloggningsformulär
      $("header").html(loginFormHeader()); // Använd loginFormHeader-funktionen för att visa header för inloggningsformulär
      $("main").html(loginFormContent()); // Använd loginFormContent-funktionen för att visa inloggningsformulär
    }
  });
}

// Används för att bygga inloggat header-innehåll
function loggedInHeader() {
  // Implementera din inloggade header här
}

// Används för att bygga inloggat huvudinnehåll
function loggedInContent() {
  // Implementera ditt inloggade huvudinnehåll här
}

// Används för att bygga header för inloggningsformulär
function loginFormHeader() {
  // Implementera din header för inloggningsformulär här
}

// Används för att bygga inloggningsformulär
function loginFormContent() {
  // Implementera ditt inloggningsformulär här
}

// Andra relevanta funktioner kan också läggas till beroende på ditt behov

  