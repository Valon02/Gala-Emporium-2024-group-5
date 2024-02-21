export default async function renderComedy() {
  const clubIdKomedi = "65d31920f938356ae734e46d";

  const response = await fetch(`/api/events/clubs/${clubIdKomedi}`);
  const result = await response.json();

  let eventCards = "";
  let dateString = "";
  let timeString = "";
  let eventId = "";

  for (let event of result) {
    if (event.date) {
      dateString = event.date.substring(0, 10);
      timeString = event.date.substring(11, 16);

      eventCards += `
          <div class="event-card" data-event-id="${event._id}">
            <h3 class="comedy-event-name">${event.name}</h3>
            <p class="comedy-event-date">${dateString}</p>
            <p class="comedy-event-time">Tid: ${timeString}</p>
            <p class="event-tickets-left">Biljetter tillgängliga: ${event.availableTickets}</p>
            <button class="buy-ticket">Köp Biljettt</button>
          </div>
        `;
    }
  }

  // Lägg till en klickhändelse för knapparna med klassen "event-button"
  $(document).on("click", ".buy-ticket", async function () {
    // Hämta det specifika eventets id från det närliggande DOM-elementet
    eventId = $(this).closest(".event-card").data("event-id");
    console.log("Klickade på knappen för event med id:", eventId);

    try {
      // Open modal
      $("dialog").get(0).showModal();
    } catch (error) {
      console.log(
        res.status(500).json({
          message: "Något gick fel vid bokningen av eventet.",
          error: error,
        })
      );
    }
  });

  // Submit
  $(document).on("click", "#comedy-submit", async function (event) {
    event.preventDefault();

    // Input fält värden
    var formData = {
      quantity: $("[name=quantity]").val(),
    };

    // Fetch
    const response = await fetch(`/api/bookings/events/${eventId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const bookingData = await response.json();
    console.log(bookingData);
    $("#meddelande").text(bookingData.message);

    //console.log(formData.quantity);
    //console.log(bookingData.message);
  });

  // Close modal
  $(document).on("click", "#close-dialog", function () {
    $("dialog").get(0).close();
  });

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

        <dialog id="comedy-dialog">
         <div>
           <p id="meddelande">BOKA</p>
                                                <form onsubmit="return false">
                    <label for="quantity">Antal:</label>
                                                        <input type="number" id="quantity" name="quantity" min="1" max="100"></input>
                                                        <input type="submit" id="comedy-submit" value="Boka"></input>
                                                </form>
                                                <button id="close-dialog">Close</button>
                                        </div>
                                </dialog>
  
        <h2 class="comedy-upcoming-events-title">Kommande evenemang</h2>
        <section class="comedy-upcoming-events">
          ${eventCards}
        </section>
      </main>
    `;
}

//LOGIN LÖSEN FÖR lukasholmwolf@gmail.com / ABC123
