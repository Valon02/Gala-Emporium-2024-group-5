export default async function renderComedy() {
  const response = await fetch("/api/events");
  const result = await response.json();

  let eventCards = "";
  let dateString = "";
  let timeString = "";
  let count = 0; // Räknare för antal event

  for (let event of result) {
    if (event.date && count < 3) {
      dateString = event.date.substring(0, 10);
      timeString = event.date.substring(11, 16);

      eventCards += `
          <div class="event-card">
            <h3 class="event-name">${event.name}</h3>
            <p class="event-date">${dateString}</p>
            <p class="event-time">Time:${timeString}</p>
            <p class="event-tickets-left">Available tickets: ${event.availableTickets}</p>
            <button class="buy-ticket">Buy Ticket</button>
          </div>
        `;

      count++; // Öka räknaren för varje event som läggs till
    }
  }

  return `
      <main class="test">
        <div class="comedy-site-title-container">
          <h1 class="comedy-site-title">ClubFun</h1>
        </div>
        <section class="comedy-about">
          <h2 class="comedy-about-title">ClubFun Comedy</h2>
          <p class="comedy-about-description">
            Welcome to the newest hottest comedy club in town.
            With a mix of today's superstars and tomorrow's talents, our shows have something for everyone.
          </p>
        </section>
  
        <div class="break-line"></div>
  
        <h2 class="comedy-upcoming-events-title">Next Events</h2>
        <section class="comedy-upcoming-events">
          ${eventCards}
          <button class="all-events">Click here to view all upcoming events</button>
        </section>
      </main>
    `;
}
