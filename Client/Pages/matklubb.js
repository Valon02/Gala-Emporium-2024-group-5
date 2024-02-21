export default async function matKlubb() {
  $("main").attr("id", "matklubb");

  const clubId = "65d230f506faf47f74e55504";

  const response = await fetch(`/api/events/clubs/${clubId}`);
  const result = await response.json();
  console.log(result);
  let eventId = "";

  // Hämtar alla eventen och lägger till rätt styling
  let eventString = "";
  for (let event of result) {
    // Hämtar datumet som en sträng
    const dateString = event.date;
    // Konverterar datumet till ett datum objekt
    const dateObject = new Date(dateString);
    // Använder datum objektet för att få fram vilken månad det är (förkortat)
    const month = dateObject
      .toLocaleDateString("sv-SE", { month: "short" })
      .toUpperCase()
      .replace(".", "");
    const day = dateObject.toLocaleDateString("sv-SE", { day: "numeric" });
    eventString += `
                <div class="kommande-event" data-event-id="${event._id}">
                        <div class="event-date">
                                <span>${day}</span>
                                <b>${month}</b>

                        </div>

                        <div class="event-content">
                                <h3>${event.name}</h3>
                                <p class="event-content-about">${event.about}</p>
                                <p class="event-content-platser">Platser kvar: ${event.availableTickets}</p>
                        </div>

                        <div class="event-button">
                                <b>BOKA</b>
                        </div>
                </div>
                `;
  }

  // Lägg till en klickhändelse för knapparna med klassen "event-button"
  $(document).on("click", ".event-button", async function () {
    // Hämta det specifika eventets id från det närliggande DOM-elementet
    eventId = $(this).closest(".kommande-event").data("event-id");
    console.log("Klickade på knappen för event med id:", eventId);

    try {
      // Open modal
      $("dialog").get(0).showModal();
    } catch (error) {
      console.log(
        res
          .status(500)
          .json({
            message: "Något gick fel vid bokningen av eventet.",
            error: error,
          })
      );
    }
  });

  // Submit
  $(document).on("click", "#mat-submit", async function (event) {
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

  $(document).on("click", "#scroll-button", function () {
    // Hämta referensen till div med id #main-event-container
    const scrollTo = document.getElementById("main-event-container");

    // Scrolla ner till #main-event-container med smooth scroll-effekt
    scrollTo.scrollIntoView({ behavior: "smooth" });
  });

  return `
                <div id="main-container">


                        <div id="home-container">
                                <img src="Images/mat2.jpeg" id="mainImg">
                                <div id="welcome-container">
                                        <div>
                                                <h3>MAT KLUBBEN</h3>
                                                <p>Sammansmältning av passion och smak,<br> vår matlagningsklubb skapar<br> kulinariska äventyr!</p>
                                        </div>
                                        <a id="scroll-button">Boka nu</a>
                                </div>
                        </div>
                        

                        <div id="main-event-container">

                                <dialog id="mat-dialog">
                                        <div>
                                                <p id="meddelande">BOKA</p>
                                                <form onsubmit="return false">
                                                        <label for="quantity">Antal:</label>
                                                        <input type="number" id="quantity" name="quantity" min="1" max="100"></input>
                                                        <input type="submit" id="mat-submit" value="Boka"></input>
                                                </form>
                                                <button id="close-dialog">Close</button>
                                        </div>
                                </dialog>

                                <div id="event-container">
                                        <div id="event-container-header">
                                                <h3>Kommande evenemang!</h3>
                                        </div>
                                        <div id="event-container-main">
                                                <div id="event-container-main-content">${eventString}</div>
                                        </div>
                                </div>
                        </div>

                        <div id="about-container">
                                <div id="about-text-container">
                                        <h2>Om oss</h2>
                                        <p>Välkommen till vår matlagningsklubb på Gala Emporium - en plats där matälskare samlas för kulinariska äventyr! Vi är din destination för minnesvärda matlagningsupplevelser i en festlig atmosfär.<br><br>

                                        Våra matlagningsevent är en resa genom smakernas värld, oavsett om du är en erfaren kock eller nybörjare. Vi tror på gemenskapen som matlagning skapar och strävar efter att skapa minnesvärda stunder där medlemmar kan dela idéer och utbyta kulinariska tips.<br><br>
                                        
                                        Anslut dig till vår matlagningsklubb på Gala Emporium, låt maten bli en källa till glädje och samhörighet. Vårt team av passionerade kockar ser fram emot att välkomna dig till vårt kök för att dela den kulinariska magin tillsammans!</p><br><br>
                                </div>
                                <div id="about-img-container">
                                        <img src="Images/mat1.jpg" id="aboutImg">
                                </div>
                        </div>
                
                
                </div>


        `;
}

/*let closeDialog = document.getElementById("close-dialog")
        closeDialog.addEventListener("click",() => {
                console.log(1);
        } ) */
