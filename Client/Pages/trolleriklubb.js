export default async function trolleriKlubb() {
    $("main").attr("id", "trolleriklubb")

    const response = await fetch('/api/events')
    const result = await response.json()

    console.log(result)



    let eventString = "";
    for (let event of result ){
        eventString += `
        <div class="kommande-event">
        <h3>${event.club.name}</h3>
        <p>${event.name}</p>
        <br>
        <p>Participant limit: ${event.participantLimit}</p>
        <br>
        <p>${event.date}</p>
        <button>Boka</button>
        </div>
        `
    }

    //<img id="trolleri-background" draggable="false" src="../Images/trolleriklubb.jpg">
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
            Miss inte chansen att delta i "Simsalabims" veckovisa evenemang och låt dig bli förtrollad av den magiska världen som klubben har att erbjuda!
            </p>
    
        </div>
    </section>


    <section class="kommande-event-container">
        <h3 id="kommande-event-titel">Kommande event:</h3>
        <div class="kommande-event-test">
            ${eventString}
        </div>
    </section>
    `
}
