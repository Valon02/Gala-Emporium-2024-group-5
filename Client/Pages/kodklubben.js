export default function kodklubben(){
    $("main").attr("id", "kodklubben");

    // Hämta evenemang och visa dem på sidan
    fetchEvents();

    return `
        <h1>Kodklubben</h1>
        <section id="event-section">
            <h2>Kommande evenemang</h2>
            <div id="event-container">
                <!-- Evenemangsinlägg kommer att fyllas här -->
            </div>
        </section>
    `;
}

async function fetchEvents() {
    try {
        let response = await fetch("/api/events"); // Använd rätt endpoint
        let events = await response.json();
        displayEvents(events);
    } catch (error) {
        console.error("Error fetching events:", error);
    }
}
function displayEvents(events) {
    let eventContainer = $("#event-container");
    eventContainer.empty();
    events.forEach(event => {
        let eventDiv = $("<div>").addClass("event");
        let eventName = $("<h2>").text(event.name);
        let eventAbout = $("<p>").html(`<strong>About:</strong> ${event.about}`);
        let eventDate = $("<p>").html(`<strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}`);
        let eventParticipantLimit = $("<p>").html(`<strong>Participant Limit:</strong> ${event.participantLimit}`);
        let eventAvailableTickets = $("<p>").html(`<strong>Available Tickets:</strong> ${event.availableTickets}`);
        let bookButton = $("<button>").addClass("book-btn").attr("data-event-id", event._id).text("Book Now");
        
        eventDiv.append(eventName, eventAbout, eventDate, eventParticipantLimit, eventAvailableTickets, bookButton);
        eventContainer.append(eventDiv);
    });
}
