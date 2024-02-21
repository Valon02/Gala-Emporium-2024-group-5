export default async function renderDatingKlubb() {
    // Set the main ID
    $("main").attr("id", "datingklubb");

    // Construct the static part of the main content, focusing on layout updates
    const mainContent = `
        <div class="datingklubb-site-title-container">
            <h1 class="Gnistan">Gnistan</h1>
        </div>
        <section class="datingklubb-about">
            <h2 class="datingklubb-about-title">Om Gnistan</h2>
            <p class="datingklubb-about-description">
            Välkommen till Gnista, en datingklubb för dig som vill tända gnistan med någon speciell. Här kan du träffa andra singlar som söker efter kärlek, vänskap och gemenskap. 
            </p>
        </section>
        <div class="break-line"></div>
        <h2 class="datingklubb-upcoming-events-title">Kommande evenemang!</h2>
        <section class="datingklubb-upcoming-events" id="upcoming-events"></section>
    `;

    // Set the static part of the main content
    $('main').html(mainContent);

    // Fetch event data and generate dynamic event content
    try {
        const response = await fetch("/api/events");
        if (!response.ok) throw new Error("Failed to fetch events");
        const events = await response.json();

        let eventString = "";
        events.forEach(event => {
            if (event.date) {
                const dateString = event.date.substring(0, 10);
                eventString += `
                    <div class="event-card">
                        <div class="event-date">${dateString}</div>
                        <h3 class="event-name">${event.name}</h3>
                        <p>Participant limit: ${event.participantLimit}</p>
                        <p>Available tickets: ${event.availableTickets}</p>
                        <a href="/event/${event.id}" class="event-info-button">Mer Information</a>
                    </div>`;
            }
        });

        // Append the dynamic event content to the 'upcoming-events' section
        $('#upcoming-events').html(eventString);
    } catch (error) {
        console.error("Error loading events:", error);
        $('#upcoming-events').html("<p>Problem att ladda evenemang. Försök igen senare.</p>");
    }

    return $('main').html();
}
