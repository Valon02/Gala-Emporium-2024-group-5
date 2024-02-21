export default async function myPages() {
  $("main").attr("id", "lukas-my-pages");

  // HTML content for creating a new event
  const createNewEventHTML = `
      <div id="my-pages-main-container">
          <div id="my-pages-container">
              <h3>Mina sidor</h3>
              <button class="my-pages-create-new-event">Nytt event</button>
              <button class="my-pages-view-current-event">Nuvarande event</button>
          </div>
      </div>
    `;

  // HTML content for displaying current events (to be populated from database)
  const currentEventsHTML = `
      <div id="my-pages-main-container">
          <div id="my-pages-container">
              <h3>Mina sidor</h3>
              <p>Här visas nuvarande events från databasen...</p>
              <button class="my-pages-create-new-event">Nytt event</button>
              <button class="my-pages-view-current-event">Nuvarande event</button>
          </div>
      </div>
    `;

  const createNewEventFormHTML = `
    <div id="my-pages-main-container">
        <div id="my-pages-container">
            <h3>Mina sidor</h3>
            <form id="skapa-event-form">
                <select class="club-id-dropdown">
                    <option value="" disabled selected>Välj klubb</option>
                    <option value="65d326f62d34b531073334fb">Kodklubben</option>
                    <option value="65d230f506faf47f74e55504">Matklubben</option>
                    <option value="65d316622d34b531073334e3">Trolleriklubben</option>
                    <option value="65d31920f938356ae734e46d">Komediklubben</option>
                </select>
                
                <input class="new-event-name" type="text" placeholder="eventnamn"></input>
                <input class="new-event-about" type="text" placeholder="eventabout"></input>
                <input class="new-event-date" type="datetime-local"></input>
                
                <button class="my-pages-view-current-event">Nuvarande event</button>
                <input type="submit" value="skicka event" class="skapa-event-btn"></input>
            </form>
        </div>
    </div>
    `;

  const btn = document.getElementById("skapa-event-form");
  function test(event) {
    //event.preventDefault();

    const eventName = document.querySelector(".new-event-name").value;
    const eventAbout = document.querySelector(".new-event-about").value;
    const eventDateTime = document.querySelector(".new-event-date").value;
    const clubId = document.querySelector(".club-id-dropdown").value; // Hämta klubbidet från select-elementet

    console.log(eventName);
    console.log(eventAbout);
    console.log(eventDateTime);
    console.log(clubId);

    fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: eventName,
        about: eventAbout,
        date: eventDateTime,
        clubId: clubId, // Inkludera klubbidet i den skickade datan
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Event created successfully:", data);
        // Uppdatera gränssnittet eller visa ett meddelande för användaren att evenemanget skapades framgångsrikt
      })
      .catch((error) => {
        console.error("There was a problem creating the event:", error);
        // Visa ett felmeddelande för användaren
      });
  }

  // Return a function that generates the HTML content dynamically based on button clicks
  return function () {
    // Event listener for creating a new event

    $(document).on("click", ".my-pages-create-new-event", function () {
      $("main").html(createNewEventFormHTML);
      $("form").submit(function (event) {
        // Din funktion test() som ska köras när formuläret skickas
        console.log("YES");
        test();
      });
    });

    // Event listener for viewing current events
    $(document).on("click", ".my-pages-view-current-event", function () {
      $("main").html(currentEventsHTML);
      // Here you can fetch current events from the database and populate the placeholder
    });

    // Initial rendering of the page with buttons to create or view events
    $("main").html(createNewEventHTML);
  };
}
