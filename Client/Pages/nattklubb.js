export default async function nattklubb() {
    $("main").attr("id", "nattklubb")
    const clubIdNattklubb = "65d32c03270b17a61bf563d5";

    const response = await fetch(`/api/events/clubs/${clubIdNattklubb}`);
    const result = await response.json()

    console.log(result)


    let eventId = ""
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
        <div class="nattklubb-kommande-event" data-event-id="${event._id}">
            <div class="nattklubb-event-date">
                <span>${day}</span>
                <b>${month}</b>
            </div>
            <div class="nattklubb-event-content">
            <h3>${event.name}</h3>
                <p class="-nattklubbevent-content-about">${event.about}</p>
                <p class="nattklubb-event-content-platser">Platser kvar: ${event.availableTickets}</p>
            </div>
            <div class="nattklubb-event-button">
                <b>BOKA</b>
            </div>
        </div>
        `;
    }

    // Add a click event for the buttons with the class "nattklubb-event-button"
    $(document).on('click', '.nattklubb-event-button', async function () {
        // Get the specific event's id from the nearby DOM element
        eventId = $(this).closest('.nattklubb-kommande-event').data('event-id');
        console.log('Clicked on the button for event with id:', eventId);
    
        try {
            const response = await fetch(`/api/bookings/events/${eventId}`, {
              method: "POST",
            });
            const result = await response.json();
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
    

// Submit
$(document).on('click', '#nattklubb-submit', async function (event) {
    event.preventDefault()

    // Input field values
    var formData = {
        quantity: $('[name=quantity]').val()
    };

    // Fetch
    const response = await fetch(`/api/bookings/events/${eventId}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        }
    );

    const bookingData = await response.json();
    console.log(bookingData);
    $("#meddelande").text(bookingData.message)
})

// Close modal
$(document).on('click', '#close-dialog', function () {
    $('dialog').get(0).close()
})




    return `
    <div id="logga-container">
        <h1 id="logga">Zachary's Nattklubb</h1>
    </div>




    <section class="nattklubb-grid-container">
        <div class="nattklubb-grid-item">
        <img id="nattklubb-img1" src="images/nattklubb1.jpg">
        </div>
        <div class="nattklubb-grid-item">
        <h2>Välkommna till <span id="nattklubb-red-color">Club Pulse</span>!</h2>
        <p>Välkommen till Club Pulse, stadsens pulserande nattlivsoas. 
        Med toppmodern teknik och exklusiva drycker erbjuder vi en oförglömlig upplevelse. 
        Dansa till våra DJ:s, njut av liveframträdanden och koppla av i VIP-områden. 
        Club Pulse är mer än en nattklubb - det är din destination för en oförglömlig kväll.
         Där natten aldrig tar slut.
        </p>
        </div>

         <div class="nattklubb-grid-item">
         <h2>Välkommen till vår pulserande värld!</h2>
         <p><strong>Vardagar (Måndag - Fredag)</strong>: Släpp loss din ande från 10:00 till 22:00</p>
         <p><strong>Helgkänslor (Lördag - Söndag)</strong>: Dyk in i extravaganza från 12:00 till 23:00</p>         
        </div>

        <div class="nattklubb-grid-item">
             <img id="img2" src="images/nattklubb2.jpg">
        </div>
       
        <div class="nattklubb-grid-item">
             <img id="img3" src="images/nattklubb3.jpg">

        </div>
        <div class="nattklubb-grid-item">
        <h2>Regler</h2>
        <p>-Alla ska behandlas med respekt.</p>
        <p>-Ingen alkohol får tas med in i klubben.</p>
        <p>-Rökning är endast tillåten på utsedda platser.</p>
        <p>-Inga droger är tillåtna.</p>
        <p>-Respektera personalens anvisningar.</p>
        <p>-Ingen våldsamhet kommer att tolereras.</p>
        <p>-Klädkoden måste följas.</p>
        <p>-Åldersgränsen måste respekteras.</p>
        <p>-Ha roligt och njut av natten!</p>
        </div>
    </section>

    <section class="nattklubb-kommande-event-container">
        <h3 id="nattklubb-kommande-event-titel">Kommande event:</h3>
        <div class="kommande-event-test">
            ${eventString}
        </div>
    </section>


    <dialog id="nattklubb-dialog">
                                        <div>
                                                <p id="meddelande">BOKA</p>
                                                <form onsubmit="return false">
                                                        <label for="quantity">Antal:</label>
                                                        <input type="number" id="quantity" name="quantity" min="1" max="100"></input>
                                                        <input type="submit" id="nattklubb-submit" value="Boka"></input>
                                                </form>
                                                <button id="close-dialog">Close</button>
                                        </div>
                                </dialog>
    
    `;
}

/*nattklubb().then(function(result) {
    $('body').append(result);
});*/
