export default async function home() {
  $("main").attr("id", "homepage");

  const response = await fetch("/api/events/");
  const result = await response.json();

  let eventString = "";
  for (let event of result) {
    const dateString = event.date;
    // Konverterar datumet till ett datum objekt
    const dateObject = new Date(dateString);
    // Använder datum objektet för att få fram vilken månad det är (förkortat)
    const month = dateObject
      .toLocaleDateString("sv-SE", { month: "short" })
      .toUpperCase()
      .replace(".", "");
    const day = dateObject.toLocaleDateString("sv-SE", { day: "numeric" });

    eventString += `
        <div class="home-kommande-event" data-event-id="${event._id}">
          <div class="home-date-container">
            <p>${day}</p>
            <p>${month}</p>
          </div>
          <div class="home-about-container">
            <p>${event.name}</p>
            <p>${event.about}</p>
          </div>
        
        </div>
        `;
  }

  return `

    <main>
        <section class="home-main">
          <img class="home-title-image" src="../Images/party.jpg"></img>
          <div class="home-title-container">
            <h1 class="home-title">GALA EMPORIUM</h1>
            <h5 class="home-sub-title">Skapa minnen. Dela Glädjen! <br> Vårt Event. Din Upplevelse!</h5>          
          </div>
          <div class="home-upcoming-events-title">
            <h2>Kommande Event</h2>
          </div>
          <div class="home-upcoming-events-container">

            
              ${eventString}
          </div>
        </section>

        <div class="break-part"></div>

        <section class="home-main-next">
          <img class="home-about-image" src="../Images/aboutimg.jpg"></img>
          <div class="home-about-us-container">
            <h3 class="home-about-us-title">Om oss</h3>
            <p class="home-about-us-text">
            Välkommen till Gala Emporium - din plats för mångflad och kulturella upplevelser! Upptäck våra unika klubbar som erbjuder alt från elektronisk musik till poesi. Varje klibb har sin egen atmosfär och kommande evenemang. Från livliga konserter till intima kostutställningar, varje evenemang är en chans att fördjupa dig i konstens värld. Besök vår evenmangskalender för att hålla dig uppdaterad. Gala Emporium - Varje Evenemang är en Upplevelse!
            </p>
          </div>
        </section>
    </main>

    `;
}
