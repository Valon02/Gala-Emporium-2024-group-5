export default async function renderComedy() {
  const clubIdKomedi = "65d31920f938356ae734e46d";

  const response = await fetch(`/api/events/clubs/${clubIdKomedi}`);
  const result = await response.json();

  let eventCards = "";
  let dateString = "";
  let timeString = "";

  for (let event of result) {
    if (event.date) {
      dateString = event.date.substring(0, 10);
      timeString = event.date.substring(11, 16);

      eventCards += `
          <div class="event-card">
            <h3 class="event-name">${event.name}</h3>
            <p class="event-date">${dateString}</p>
            <p class="event-time">Tid: ${timeString}</p>
            <p class="event-tickets-left">Biljetter tillgängliga: ${event.availableTickets}</p>
            <button class="buy-ticket">Köp Biljettt</button>
          </div>
        `;
    }
  }

  return `
      <main class="main">
        <div class="comedy-site-title-container">
          <h1 class="comedy-site-title">ClubFun</h1>
        </div>
        <section class="comedy-about">
          <h2 class="comedy-about-title">ClubFun Comedy</h2>
          <p class="comedy-about-description">
          Välkommen till den senaste och hetaste komediklubben i stan. Med en blandning av dagens superstjärnor och morgondagens talanger erbjuder våra shower något för alla smaker.
          Här, i denna vibrerande atmosfär av skratt och glädje, smälter dagens bekymmer bort och lämnar plats för en stund av avkoppling och förnyad energi.
          </p>
        </section>
  
        <div class="break-line"></div>
  
        <h2 class="comedy-upcoming-events-title">Kommande evenemang</h2>
        <section class="comedy-upcoming-events">
          ${eventCards}
        </section>
      </main>
    `;
}

//LOGIN LÖSEN FÖR lukasholmwolf@gmail.com / ABC123