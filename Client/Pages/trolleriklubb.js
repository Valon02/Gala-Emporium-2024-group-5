export default async function trolleriKlubb() {
    $("main").attr("id", "trolleriklubb")

    const response = await fetch('/api/events/clubs/65d316622d34b531073334e3')
    const result = await response.json()

    



    let eventString = "";
    for (let event of result ){
        const dateString = event.date;
                // Konverterar datumet till ett datum objekt
                const dateObject = new Date(dateString);
                // Använder datum objektet för att få fram vilken månad det är (förkortat)
                const month = dateObject.toLocaleDateString("sv-SE", { month: "short" }).toUpperCase().replace('.', '')
                const day = dateObject.toLocaleDateString("sv-SE", { day: "numeric" })

        eventString += `
        <div class="kommande-event" data-event-id="${event._id}">
        <h3>${event.name}</h3>
        <p>${event.about}</p>
        <br>
        <p>Participant limit: ${event.participantLimit}</p>
        <br>
        <p>${day}</p>
        <p>${month}</p>
        <button id="boka-btn">Boka</button>
        </div>
        `
    }

    $(document).on('click', '#boka-btn', async function () {
        // Hämta det specifika eventets id från det närliggande DOM-elementet
        const eventId = $(this).closest('.kommande-event').data('event-id');
    
        // Gör något baserat på eventets id
        console.log('Klickade på knappen för event med id:', eventId);

        try {
            const response = await fetch(`/api/bookings/events/${eventId}`, { method: "POST"})
            const result = await response.json();
            $("#trolleri-dialog-h3").text(result.message)
            document.querySelector("dialog").showModal()
        }
        catch(error) {
            console.log(res.status(500).json({message: "Något gick fel"}))
        }
    });

    $(document).on("click", "#trolleri-close-dialog", function (){
        document.getElementById("trolleri-dialog").close()
    })
    


    return `
    <div id="logga-container">
        <h1 id="logga">SimSalaBim</h1>
    </div>



    <section class="trolleri-info-container">
        <div class="trolleri-info">

            <img id="trolleri-hatt" src="../Images/trolleri-hatt.png">
            <h2>Välkommna till <span id="orange-color">SimSalaBim</span>!</h2>
            <p>"Simsalabim" är en förtrollande klubb som bjuder in människor att upptäcka magins värld. Varje vecka anordnar klubben spännande och underhållande evenemang där besökare får uppleva en mix av illusioner, trolleri och magiska uppträdanden.
            Klubben, med sin unika atmosfär och charm, är en samlingsplats för både amatörer och professionella magiker samt för alla som älskar att bli förvånade och underhållna. Med sitt engagerade team av magiska talanger strävar "Simsalabim" efter att skapa minnesvärda upplevelser för alla sina gäster.
            Missa inte chansen att delta i "Simsalabims" veckovisa evenemang och låt dig bli förtrollad av den magiska världen som klubben har att erbjuda!
            </p>
    
        </div>
    </section>

    


    <section class="kommande-event-container">
        <h3 id="kommande-event-titel">Kommande event:</h3>
        <div class="kommande-event-test">
            ${eventString}
        </div>
    </section>

    <dialog id="trolleri-dialog">
        <div id="trolleri-dialog-div">
            <h3 id="trolleri-dialog-h3">test</h3>
            <button id="trolleri-close-dialog">Stäng</button>
        </div>
        </dialog>
    `
}

