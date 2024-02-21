export default async function nattklubb() {
    $("main").attr("id", "nattklubb")



    const clubId = "nr"
    const response = await fetch('/api/events') //${clubId}`)
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
            <div class="event-content">
                <h3>${event.club.name}</h3>
                <p class="event-content-about">${event.about}</p>
                <p class="event-content-platser">Platser kvar: ${event.availableTickets}</p>
            </div>
            <div class="event-button">
                <b>BOKA</b>
            </div>
        </div>
        `;
    }

 //  "event-button"
        $(document).on('click', '.event-button', function () {
                // Hämta det specifika eventets id från det närliggande DOM-elementet
                const eventId = $(this).closest('.kommande-event').data('event-id');

                // Gör något baserat på eventets id
                console.log('Klickade på knappen för event med id:', eventId);
        });


    return `
    <div id="logga-container">
        <h1 id="logga">Zachary's Nattklubb</h1>
    </div>

    <section class="grid-container">
        <div class="grid-item">
        <img id="img1" src="images/nattklubb1.jpg">
        </div>
        <div class="grid-item">
        <h2>Välkommna till <span id="red-color">Zachary's nattklubb</span>!</h2>
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

         <div class="grid-item">
            <h2>Opening Hours</h2>
            <p>Monday - Friday: 10:00 - 22:00</p>
            <p>Saturday - Sunday: 12:00 - 23:00</p>
        </div>

        <div class="grid-item">
             <img id="img2" src="images/nattklubb2.jpg">
        </div>
       
        <div class="grid-item">
             <img id="img3" src="images/nattklubb3.jpg">

        </div>
        <div class="grid-item">
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

    <section class="kommande-event-container">
        <h3 id="kommande-event-titel">Kommande event:</h3>
        <div class="kommande-event-test">
            ${eventString}
        </div>
    </section>
    `;
}

/*nattklubb().then(function(result) {
    $('body').append(result);
});*/
