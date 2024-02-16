export default async function trolleriKlubb() {
    $("main").attr("id", "trolleriklubb")

    const response = await fetch('/api/events')
    const result = await response.json()

    console.log(result)

    let eventString = "";
    for (let event of result ){
        eventString += `
        <div id="testtest">
        <h3 class="club-name">${event.club.name}</h3>
        <p>${event.name}</p>
        <br>
        <p>Participant limit: ${event.participantLimit}</p>
        </div>
        `
    }

    return `
    <img id="trolleri-background" draggable="false" src="../Images/trolleriklubb.jpg">
    <h1 id="test">Test</h1>

    <div id="fetch-test">
    ${eventString}
    </div>
    `
}
