
let eventString = "";

let userResult = "";

let eventId = "";

let upcomingEventsString = "";

async function viewEvent() {
  const clubIdDropDownValue = userResult.ownerAt;
  console.log(clubIdDropDownValue);

  try {

    if (clubIdDropDownValue != null) {
      const response = await fetch(`/api/events/clubs/${clubIdDropDownValue}`);
      const result = await response.json();

      for (let event of result) {
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
        <div class="my-pages-kommande-event" data-event-id="${event._id}">
        <h3>${event.name}</h3>
        <p>${event.about}</p>
        <br>
        <p>${day} ${month}</p>
        <button class="delete-event">Delete</button>
        </div>
        `;
        $("#view-event-div").html(eventString);
      }
    }
  } catch (error) {
    console.error(error)
  }




}



async function upcomingEvents() {
  await loggedIn()

  try {

    const response = await fetch(`/api/users/${userResult.userId}`);
    const result = await response.json();
    console.log(result.upcomingEvents);

    

    if (result._id != null) {

      for (let upcomingEvents of result.upcomingEvents) {
        const dateString = upcomingEvents.date;
        // Konverterar datumet till ett datum objekt
        const dateObject = new Date(dateString);
        // Använder datum objektet för att få fram vilken månad det är (förkortat)
        const month = dateObject
          .toLocaleDateString("sv-SE", { month: "short" })
          .toUpperCase()
          .replace(".", "");
        const day = dateObject.toLocaleDateString("sv-SE", { day: "numeric" });
  
        upcomingEventsString += `
        <div class="my-pages-kommande-event" data-event-id="${upcomingEvents._id}">
        <h3>${upcomingEvents.name}</h3>
        <p>${upcomingEvents.about}</p>
        <br>
        <p>${day} ${month}</p>
        <button class="delete-event">Delete</button>
        </div>
        `;
        $("#view-event-div-user").html(upcomingEventsString);
      }

    }
    

  } catch (error) {
    console.error(error);
  }



}







async function loggedIn() {
  try {
    const userResponse = await fetch("/api/login", {
      method: "GET",
    });
    userResult = await userResponse.json();
    console.log(userResult);


    if (userResult.isLoggedIn) {
      window.location.href = "#minaSidor"


    } else {
      console.log("Du är inte inloggad");
    }
  } catch (error) {
    console.error('Error during login:', error);
  }

}


export default async function newMyPages() {
  $("main").attr("id", "new-my-pages");



  await loggedIn();


  if (userResult.ownerAt !== undefined) {


    return `
    <div class="my-pages-main-container">
        <div id="my-pages-container">
            <h3>Admin sida</h3>
            <button class="skapa-event-btn">SKAPA EVENT</button>
            <button class="my-pages-view-current-event">NUVARANDE EVENT</button>
            <button class="logout-btn" href="#signin">LOGGA UT</button>
        </div>
    </div>




    <div class="my-pages-main-container-test hidden">
          <div id="my-pages-container">
              <h3>Mina sidor</h3>
              <p>Här visas nuvarande events från databasen...</p>
              

              <div id="view-event-div" >
              
              </div>

              <button class="my-pages-go-back">GÅ TILLBAKA</button>
          </div>
      </div>





      <div class="my-pages-main-container-create-event hidden">
        <div id="my-pages-container">
            <h3>Mina sidor</h3>
            <form id="skapa-event-form">
                <div id="event-list">
                
                </div>
                <input class="new-event-name" type="text" placeholder="eventnamn" name="eventName"></input>
                <input class="new-event-about" type="text" placeholder="eventabout" name="eventAbout"></input>
                <input class="event-limit" type="number" placeholder="eventlimit" name="eventLimit"></input>
                <input class="new-event-date" type="datetime-local" name="eventDate"></input>
                
                <input type="submit" value="skicka event" class="skapa-event-btn"></input>
            </form>
            <button class="my-pages-go-back">GÅ TILLBAKA</button>
        </div>
    </div>
    `;
  } else if (userResult.ownerAt == undefined) {

    console.log("Du är nu inloggad som en icke admin!");

    return `
    
    <div class="my-pages-main-container">
      <div id="my-pages-container">
        <h3>Mina sidor</h3>
        <button class="my-pages-view-current-event">Bokade Event</button>
        <button class="logout-btn" href="#signin">LOGGA UT</button>
      </div>
    </div>




    <div class="my-pages-main-container-test hidden">
          <div id="my-pages-container">
              <h3>Mina sidor</h3>
              <p>Här visas dina bokade event.</p>
              

              <div id="view-event-div" >
              
              </div>

              <button class="my-pages-go-back">GÅ TILLBAKA</button>
          </div>
      </div>

    `

  } else {

    return `

    <div class="my-pages-main-container">
      <div id="my-pages-container">
        <h3>Du måste logga in.</h3>
        <button id="goToLogIn">GÅ TILL LOGGA IN</button>
      </div>
    </div>

    `

  }

}


$("main").on("click", ".my-pages-view-current-event", async function () {
  $(".my-pages-main-container").hide();
  $(".my-pages-main-container-test").removeClass("hidden");
  $("#view-event-div").removeClass("hidden");
  upcomingEventsString = "";
  await upcomingEvents();
});


$('main').on("click", "#goToLogIn", function () {
  window.location.href = "#signin"
})

$("main").on("click", ".my-pages-view-current-event", async function () {
  $(".my-pages-main-container").hide();
  $(".my-pages-main-container-test").removeClass("hidden");
  $("#view-event-div").removeClass("hidden");
  eventString = "";
  await viewEvent();
});

$("main").on("click", ".skapa-event-btn", function () {
  $(".my-pages-main-container").hide();
  $(".my-pages-main-container-create-event").removeClass("hidden");
  $(".my-pages-main-container-create-event").show();
});

$("main").on("click", ".my-pages-go-back", function () {
  $(".my-pages-main-container").show();
  $(".my-pages-main-container-test").addClass("hidden");
  $("#view-event-div").addClass("hidden");
  $(".my-pages-main-container-create-event").hide();
});




async function createEvent() {
  //event.preventDefault()

  // Input fält värden
  var formData = {
    name: $('[name=eventName]').val(),
    about: $('[name=eventAbout]').val(),
    participantLimit: $('[name=eventLimit]').val(),
    date: $('[name=eventDate]').val(),
    clubId: userResult.ownerAt,
  };
  console.log(formData);

  try {
    const response = await fetch(`/api/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })

    if (response.ok) {
      const result = await response.json()
      console.log(result);
      //$("#meddelande").text("Du har nu skapat ett nytt konto. Välkommen!")

    } else {
      console.log('statuskod:', response);
      //$("#meddelande").text("Något gick fel!")

    }

  } catch (error) {
    console.error('Något gick fel:', error);
  }
}




$(document).on("click", ".skapa-event-btn", function () {
  console.log(10);
  $("#skapa-event-form").submit(async function (event) {
    // Din funktion test() som ska köras när formuläret skickas
    await createEvent();
  });
});

// Logga ut funktion
$(document).on("click", ".logout-btn", function () {
  fetch("/api/login", {
    method: "DELETE",
  });
  console.log("logged Out");
  window.location.href = "#signin"
  location.reload(true);
});

// Delete event
$(document).on("click", ".delete-event", async function () {
  // Hämta det specifika eventets id från det närliggande DOM-elementet
  eventId = $(this).closest(".my-pages-kommande-event").data("event-id");
  console.log("Klickade på knappen för event med id:", eventId);

  fetch(`/api/events/${eventId}`, {
    method: "DELETE"
  })
  setTimeout(function () {
    location.reload(true);
  }, 2000);

});

