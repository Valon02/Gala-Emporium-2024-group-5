export default async function newMyPages() {
    $("main").attr("id", "new-my-pages");

    return `
    <div class="my-pages-main-container">
        <div id="my-pages-container">
            <h3>Mina sidor</h3>
            <button class="my-pages-create-new-event">Nytt event</button>
            <button class="my-pages-view-current-event">Nuvarande event</button>
            <button class="logout-btn">Logga ut</button>
        </div>
    </div>




    <div class="my-pages-main-container-test hidden">
          <div id="my-pages-container">
              <h3>Mina sidor</h3>
              <p>Här visas nuvarande events från databasen...</p>
              <form>
                <select class="club-id-dropdown">
                  <option value="" disabled selected>Välj klubb</option>
                  <option value="65d326f62d34b531073334fb">Kodklubben</option>
                  <option value="65d230f506faf47f74e55504">Matklubben</option>
                  <option value="65d316622d34b531073334e3">Trolleriklubben</option>
                  <option value="65d31920f938356ae734e46d">Komediklubben</option>
                </select>
              </form>
              <button class="my-pages-go-back">Gå tillbaka</button>
          </div>
      </div>





      <div class="my-pages-main-container-create-event hidden">
        <div id="my-pages-container">
            <h3>Mina sidor</h3>
            <form id="skapa-event-form">
                <select id="check-club-event">
                  <option value="" disabled selected>Välj klubb</option>
                    <option value="65d326f62d34b531073334fb">Kodklubben</option>
                    <option value="65d230f506faf47f74e55504">Matklubben</option>
                    <option value="65d316622d34b531073334e3">Trolleriklubben</option>
                    <option value="65d31920f938356ae734e46d">Komediklubben</option>
                </select>
                <div id="event-list">
                
                </div>
                <input class="new-event-name" type="text" placeholder="eventnamn"></input>
                <input class="new-event-about" type="text" placeholder="eventabout"></input>
                <input class="new-event-date" type="datetime-local"></input>
                
                <button class="my-pages-go-back">Gå tillbaka</button>
                <input type="submit" value="skicka event" class="skapa-event-btn"></input>
            </form>
        </div>
    </div>
    `
    
    ;
}


$("main").on("click", ".my-pages-view-current-event", function() {
    $(".my-pages-main-container").hide();
    $(".my-pages-main-container-test").removeClass("hidden");
});

$("main").on("click", ".my-pages-create-new-event", function() {
    $(".my-pages-main-container").hide();
    $(".my-pages-main-container-create-event").removeClass("hidden")
    
})

$("main").on("click", ".my-pages-go-back", function(){
    $(".my-pages-main-container").show();
    $(".my-pages-main-container-test").addClass("hidden")
    $(".my-pages-main-container-create-event").addClass("hidden")
})


function createEvent() {
    //event.preventDefault();

    const eventName = document.querySelector(".new-event-name").value;
    const eventAbout = document.querySelector(".new-event-about").value;
    const eventDateTime = document.querySelector(".new-event-date").value;
    const clubId = document.querySelector("#check-club-event").value; // Hämta klubbidet från select-elementet

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


  $(document).on("click", ".skapa-event-btn", function () {
    $("#skapa-event-form").submit(function (event) {
      // Din funktion test() som ska köras när formuläret skickas
      console.log("YES");
      createEvent();
    });
  });

  
    $(document).on("click", ".logout-btn", function(){
        fetch("/api/login",{
            method: "DELETE"
        })
    })
  