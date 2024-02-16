export default async function trolleriKlubb() {
    $("main").attr("id", "trolleriklubb")

    const response = await fetch('/api/events')
    const result = await response.json()

    console.log(result)



    let eventString = "";
    for (let event of result.splice(0, 6) ){
        eventString += `
        <div class="kommande-event">
        <h3>${event.club.name}</h3>
        <p>${event.name}</p>
        <br>
        <p>Participant limit: ${event.participantLimit}</p>
        </div>
        `
    }

    //<img id="trolleri-background" draggable="false" src="../Images/trolleriklubb.jpg">
    return `
    <div id="logga-container">
    <h1 id="logga">Trolleri</h1>
    </div>

    <h3>Kommande event:</h3>
    <div class="kommande-event-container">
    ${eventString}
    </div>
    `
}
