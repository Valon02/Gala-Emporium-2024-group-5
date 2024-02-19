export default async function renderdatingklubb() {
    // Set the main ID
    $("main").attr("id", "datingklubb");

    // Fetch event data
    const response = await fetch("/api/events");
    const result = await response.json();

    // Generate event strings
    let eventString = "";
    for (let event of result) {
        if (event.date) {
            const dateString = event.date.substring(0, 10);

            eventString += `<p id="hello">${event.name}</p>
        <p>${dateString}</p>
        <p>Participant limit: ${event.participantLimit}</p>
        <p>Available tickets: ${event.availableTickets}</p>
        <br>`;
        }
    }


    // Construct the main content
    const mainContent = `
    ${eventString}
    <main>
        <div class="datingklubb-site-title-container">
            <h1 class="Gnistan"></h1>
        </div>
        <section class="datingklubb-about">
            <h2 class="datingklubb-about-title">Gnistan datingklubben</h2>
            <p class="datingklubb-about-description">
            Välkommen till Gnista, en datingklubb för dig som vill tända gnistan med någon speciell. Här kan du träffa andra singlar som söker efter kärlek, vänskap och gemenskap. 
            </p>
        </section>

        <div class="break-line"></div>

        <h2 class="datingklubb-upcoming-events-title">Kommande evenemang!</h2>
        <section class="datingklubb-upcoming-events">
            <div class="event-card">
                <div class="event-card-date">15 Maj</div>
                <div class="event-card-time">20:00 - 23:00</div>
                <div class="event-card-description"></div>
                <a href="/"><button class="bn632-hover bn27">Button</button></a>
            </div>

            <div class="event-card">
                <div class="event-card-date">15 Maj</div>
                <div class="event-card-time">20:00 - 23:00</div>
                <div class="event-card-description">This event...</div>
                <a href="/"><button class="bn632-hover bn27">Button</button></a>
            </div>

            <div class="event-card">
                <div class="event-card-date">15 Maj</div>
                <div class="event-card-time">20:00 - 23:00</div>
                <div class="event-card-description">person1 person2 person3</div>
                <a href="/"><button class="bn632-hover bn27">Button</button></a>
            </div>

            <a href="/"><button class="bn632-hover bn27">Button</button></a>
        </section>
        </main>
        `;

    return mainContent;
}


