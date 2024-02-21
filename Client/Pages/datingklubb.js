export default async function renderDatingKlubb() {
    // Set the main ID
    $("main").attr("id", "datingklubb-datingklubb");

    // Construct the static part of the main content, focusing on layout updates
    const mainContent = `
        <div class="datingklubb-site-title-container">
            <h1 class="datingklubb-Gnistan">Datingklubben Gnistan</h1>
        </div>
        <section class="datingklubb-about">
            <h2 class="datingklubb-about-title">Om Gnistan</h2>
            <p class="datingklubb-about-description">
            Välkommen till Gnistan, en datingklubb för dig som vill tända gnistan med någon speciell. Här kan du träffa andra singlar som söker efter kärlek, vänskap och gemenskap. 
            </p>
        </section>
        <div class="datingklubb-break-line"></div>
        <h2 class="datingklubb-upcoming-events-title">Kommande evenemang!</h2>
        <section class="datingklubb-upcoming-events" id="datingklubb-upcoming-events"></section>
    `;

    // Set the static part of the main content
    $('main').html(mainContent);

    // Fetch event data and generate dynamic event content
    try {
        // Ersätt 'clubId' nedan med den faktiska ID:et för klubben du vill hämta evenemang för
        const clubId = 'clubId';
        
        const response = await fetch(`/api/events/clubs/${clubId}`);
        if (!response.ok) throw new Error("Failed to fetch events");
        const events = await response.json();

        let eventString = "";
        events.forEach(event => {
            if (event.date) {
                const dateString = event.date.substring(0, 10);
                eventString += `
                    <div class="datingklubb-event-card">
                        <div class="datingklubb-event-date">${dateString}</div>
                        <h3 class="datingklubb-event-name">${event.name}</h3>
                        <p>Participant limit: ${event.participantLimit}</p>
                        <p>Available tickets: ${event.availableTickets}</p>
                        <a href="/event/${event.id}" class="datingklubb-event-info-button">Mer Information</a>
                    </div>`;
            }
        });

        // Append the dynamic event content to the 'upcoming-events' section
        $('#datingklubb-upcoming-events').html(eventString);
    } catch (error) {
        console.error("Error:", error);
    }

    // Add the detailed club description for SEO
    const seoText = `
        <section class="datingklubb-more-info">
            <h2>Upptäck Mer Om Gnistan</h2>
            <p>Välkommen till Datingklubben Gnistan – Där Kärleksfulla Äventyr Börjar...</p>
            <span>På jakt efter den där speciella gnistan? 
            ... (resten av din SEO-text) ...
            Varmt välkommen till Datingklubben Gnistan – där varje möte har potential att bli början på något underbart.</span>
        </section>
    `;

    // Append the SEO text to the main content
    $('main').append(seoText);

    return $('main').html();
}
