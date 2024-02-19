export default async function renderlogin() {
  // Set the main ID
  $("header").attr("id", "login")};
  
  // Anropa funktionen för att kontrollera om användaren är inloggad och hantera resultatet
checkIfUserLoggedIn().then((isLoggedIn) => {
  console.log("Är användaren inloggad?", isLoggedIn)});

  // Funktionen renderHeader tar en parameter isLoggedIn som indikerar om användaren är inloggad eller inte
  async function renderHeader(isLoggedIn) {
    // Sätt id för header-elementet baserat på om användaren är inloggad eller inte
    const headerId = isLoggedIn ? "logged-in" : "logged-out";

    const isLoggedIn = checkIfUserLoggedIn(); // Anta att checkIfUserLoggedIn returnerar true eller false
    
    let mainContent;
    
    if (isLoggedIn) {
      mainContent = `
        <header id="${headerId}">
          <div id="header-logged-in">
            <h3>hej</h3>
            <a href="logout.js">Logga ut</a>
          </div>
        </header>
      `;
    } else {
      mainContent = `
        <header id="${headerId}">
          <div id="header-logged-out">
            Ditt utloggade header-innehåll här
            <a href="login.js">Logga in</a>
          </div>
        </header>
      `;
    }
    
    // Nu kan du använda mainContent som du vill, till exempel sätta det som innerHTML på en element i DOM:
    // document.getElementById("some-container").innerHTML = mainContent;
    

    // Returnera det konstruerade huvudinnehållet för header
    return mainContent;
  }

// Assuming this code is within an async function or an environment that supports top-level await





