export default async function nattklubb() {
    $("main").attr("id", "nattklubb")
    const clubIdKomedi = "65d31920f938356ae734e46d";


    const response = await fetch(`/api/events/clubs/${clubIdKomedi}`);
    const result = await response.json()

    console.log(result)



    let eventString = "";
    for (let event of result) {
        // Hämtar datumet som en sträng
        const dateString = event.date;
        // Konverterar datumet till ett datum objekt
        const dateObject = new Date(dateString);
        // Använder datum objektet för att få fram vilken månad det är (förkortat)
        const month = dateObject.toLocaleDateString("sv-SE", { month: "short" }).toUpperCase().replace('.', '')
        const day = dateObject.toLocaleDateString("sv-SE", { day: "numeric" })
        eventString += `
        <div class="kommande-event" data-event-id="${event._id}">
            <div class="event-date">
                <span>${day}</span>
                <b>${month}</b>
            </div>
            <div class="nattklubb-event-content">
            <h3>${event.club ? event.club.name : 'Default Club Name'}</h3>
                <p class="-nattklubbevent-content-about">${event.about}</p>
                <p class="nattklubb-event-content-platser">Platser kvar: ${event.availableTickets}</p>
            </div>
            <div class="nattklubb-event-button">
                <b>BOKA</b>
            </div>
        </div>
        `;
    }

    // Lägg till en klickhändelse för knapparna med klassen "event-button"
    $(document).on("click", ".nattklubb-event-button", async function () {
        // Hämta det specifika eventets id från det närliggande DOM-elementet
        const eventId = $(this).closest(".kommande-event").data("event-id");

        // Gör något baserat på eventets id
        console.log("Klickade på knappen för event med id:", eventId);

        try {
            const response = await fetch(`/api/bookings/events/${eventId}`, {
                method: "POST",
            });
            const result = await response.json();
            console.log(result.message);
            $("dialog p").text(result.message);
            document.querySelector("dialog").showModal();
        } catch (error) {
            console.log(
                res.status(500).json({
                    message: "Något gick fel vid skapandet av användaren",
                    error: error.message,
                })
            );
        }
    });

    // Close modal
    $(document).on("click", "#close-dialog", function () {
        document.querySelector("dialog").close();
    });

    return `
    <div id="logga-container">
        <h1 id="logga">Zachary's Nattklubb</h1>
    </div>


    <dialog>
    <div>
        <p></p>
        <button id="close-dialog">Close</button>
   </div>
</dialog>

    <section class="nattklubb-grid-container">
        <div class="nattklubb-grid-item">
        <img id="nattklubb-img1" src="images/nattklubb1.jpg">
        </div>
        <div class="nattklubb-grid-item">
        <h2>Välkommna till <span id="nattklubb-red-color">Zachary's nattklubb</span>!</h2>
        <p>Zachary’s Nattklubb är en pulserande oas i hjärtat av staden, en plats där nattlivet kommer till liv.
         Med en sofistikerad atmosfär, toppmodern ljus- och ljudteknik och en rad exklusiva drycker, 
         erbjuder Zachary’s en oförglömlig upplevelse. Här kan du dansa natten lång till tonerna av våra begåvade DJ:s,
          njuta av liveframträdanden och koppla av i våra lyxiga VIP-områden. Zachary’s är mer än bara en nattklubb -
           det är din destination för en oförglömlig kväll. Välkommen till Zachary’s, där natten aldrig tar slut.mosfär, toppmodern ljus- och ljudteknik och en rad exklusiva drycker, 
         erbjuder Zachary’s en oförglömlig upplevelse. Här kan du dansa natten lång till tonerna av våra begåvade DJ:s,
          njuta av liveframträdanden och koppla av i våra lyxiga VIP-områden. Zachary’s är mer än bara en nattklubb -
           det är din destination för en oförglömlig kväll. Välkommen till Zachary’
        </p>
        </div>

         <div class="nattklubb-grid-item">
            <h2>Opening Hours</h2>
            <p>Monday - Friday: 10:00 - 22:00</p>
            <p>Saturday - Sunday: 12:00 - 23:00</p>
        </div>

        <div class="nattklubb-grid-item">
             <img id="img2" src="images/nattklubb2.jpg">
        </div>
       
        <div class="nattklubb-grid-item">
             <img id="img3" src="images/nattklubb3.jpg">

        </div>
        <div class="nattklubb-grid-item">
            <h2>Rules!!!!!</h2>
            <p>-OnlyHotPeople.</p>
            <p>-OnlyHotPeople.</p>
            <p>-OnlyHotPeople.</p>
            <p>-OnlyHotPeople.</p>
            <p>-OnlyHotPeople.</p>
            <p>-OnlyHotPeople.</p>
            <p>-OnlyHotPeople.</p>
            <p>-OnlyHotPeople.</p>
             <p>-OnlyHotPeople.</p>
        </div>
    </section>

    <section class="nattklubb-kommande-event-container">
        <h3 id="nattklubb-kommande-event-titel">Kommande event:</h3>
        <div class="kommande-event-test">
            ${eventString}
        </div>
    </section>
    `;
}

/*nattklubb().then(function(result) {
    $('body').append(result);
});*/
