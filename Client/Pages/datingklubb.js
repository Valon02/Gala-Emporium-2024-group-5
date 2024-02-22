export default async function renderDatingKlubb() {
    // Set the main ID with "dk" prefix
    $("main").attr("id", "dkdatingklubb");

    // Construct the static part of the main content, focusing on layout updates with "dk" prefix in classes
    const mainContent = `
        <div class="dkdatingklubb-site-title-container">
            <h1 class="dkGnistan">Gnistan</h1>
        </div>
        <section class="dkdatingklubb-about">
            <h2 class="dkdatingklubb-about-title">Om Gnistan</h2>
            <p class="dkdatingklubb-about-description">
            Välkommen till Gnista, en datingklubb för dig som vill tända gnistan med någon speciell. Här kan du träffa andra singlar som söker efter kärlek, vänskap och gemenskap. 
            </p>
        </section>
        <div class="dkbreak-line"></div>
        <h2 class="dkdatingklubb-upcoming-events-title">Kommande evenemang!</h2>
        <section class="dkdatingklubb-upcoming-events" id="dkupcoming-events"></section>
    `;

    // Set the static part of the main content with updated class and ID names
    $('main').html(mainContent);

    // Fetch event data and generate dynamic event content with "dk" prefix in classes
    try {
        const response = await fetch("/api/events");
        if (!response.ok) throw new Error("Failed to fetch events");
        const events = await response.json();

        let eventString = "";
        events.forEach(event => {
            if (event.date) {
                const dateString = event.date.substring(0, 10);
                eventString += `
                    <div class="dk-event-card">
                        <div class="dk-event-date">${dateString}</div>
                        <h3 class="dk-event-name">${event.name}</h3>
                        <p>Participant limit: ${event.participantLimit}</p>
                        <p>Available tickets: ${event.availableTickets}</p>
                        <a href="/event/${event.id}" class="dk-event-info-button">Mer Information</a>
                    </div>`;
            }
        });

        // Append the dynamic event content to the 'dkupcoming-events' section with updated ID
        $('#dkupcoming-events').html(eventString);
    } catch (error) {
        console.error("Error loading events:", error);
        $('#dkupcoming-events').html("<p>Problem att ladda evenemang. Försök igen senare.</p>");
    }

    return $('main').html();
}
