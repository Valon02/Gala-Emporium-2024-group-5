export default async function renderComedy() {
  const clubIdDating = "65d62e6b9ecd2d675421e66e";

  const response = await fetch(`/api/events/clubs/${clubIdDating}`);
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
            <div class="dk-event-card" data-event-id="${event._id}">
              <h3 class="dk-event-name">${event.name}</h3>
              <p class="dk-event-date">${dateString}</p>
              <p class="dk-event-time">Tid: ${timeString}</p>
              <p class="dk-tickets-left">Biljetter tillgängliga: ${event.availableTickets}</p>
              <button class="buy-ticket">Köp Biljettt</button>
            </div>
          `;
    }
  }

  // Lägg till en klickhändelse för knapparna med klassen "event-button"
  $(document).on("click", ".buy-ticket", async function () {
    // Hämta det specifika eventets id från det närliggande DOM-elementet
    eventId = $(this).closest(".dk-event-card").data("event-id");
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
  $(document).on("click", "#dating-submit", async function (event) {
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
  $(document).on("click", "#dating-close-dialog", function () {
    $("dialog").get(0).close();
  });

  return `
    <div class="dkdatingklubb-site-title-container">
    <h1 class="dkGnistan">Gnistan</h1>
</div>
<section class="dkdatingklubb-about">
    <h2 class="dkdatingklubb-about-title">Om Gnistan</h2>
    <p class="dkdatingklubb-about-description">
    Välkommen till Gnista, en datingklubb för dig som vill tända gnistan med någon speciell. Här kan 		du träffa andra singlar som söker efter kärlek, vänskap och gemenskap.
    </p>
    </section>
          </section>
    
          <div class="break-line"></div>
  
          <dialog id=dating-dialog">
           <div>
             <p id="meddelande">BOKA</p>
                        <form onsubmit="return false">
                      <label for="quantity">Antal:</label>
                      <input type="number" id="quantity" name="quantity" min="1" max="100"></input>
                      <input type="submit" id="dating-submit" value="Boka"></input>
                        </form>
                          <button id="dating-close-dialog">Close</button>
                   </div>
             </dialog>
    
             <h2 class="dkdatingklubb-upcoming-events-title">Kommande evenemang!</h2>
          <section class="dkdatingklubb-upcoming-events" id="dkupcoming-events" >
            ${eventCards}
          </section>
        </main>
      `;
}
