export default async function kodklubben() {
    $("main").attr("id", "kodklubben");

    const response = await fetch(`/api/events/clubs/65d326f62d34b531073334fb`);
    const result = await response.json();
    console.log(result);
    let eventId = "";

    // Hämtar alla eventen och lägger till rätt styling för kommande evenemang
    let eventString = "";
    for (let event of result) {
        const dateString = event.date;
        const dateObject = new Date(dateString);
        const month = dateObject.toLocaleDateString("sv-SE", { month: "short" }).toUpperCase().replace('.', '');
        const day = dateObject.toLocaleDateString("sv-SE", { day: "numeric" });

        eventString += `
            <div class="kod-kommande-event" data-event-id="${event._id}">
                <div class="kod-event-date">
                    <span>${day}</span>
                    <b>${month}</b>
                </div>
                <div class="kod-event-content">
                    <h3>${event.name}</h3>
                    <p class="kod-event-content-about">${event.about}</p>
                    <p class="-kod-event-content-platser">Platser kvar: ${event.availableTickets}</p>
                </div>
                <div class="kod-main-page">
                    <h3>Kommande evenemang!</h3>
                </div>
                <div class="kod-event-button">
                    <b class="kod-event-button">BOKA</b>
                </div>
            </div>`;
    }

    // Lägg till en klickhändelse för knapparna med klassen "event-button"
    $(document).on('click', '.kod-event-button', async function () {
        // Hämta det specifika eventets id från det närliggande DOM-elementet
        eventId = $(this).closest('.kod-kommande-event').data('event-id');
        console.log('Klickade på knappen för event med id:', eventId);

        try {
            // Open modal
            $('dialog').get(0).showModal();
        } catch (error) {
            console.log(res.status(500).json({ message: "Något gick fel vid bokningen av eventet.", error: error }));
        }
    });

    // Submit
    $(document).on('click', '#kod-submit', async function (event) {
        event.preventDefault();

        // Input fält värden
        var formData = {
            quantity: $('[name=quantity]').val()
        };

        // Fetch
        const response = await fetch(`/api/bookings/events/${eventId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const bookingData = await response.json();
        console.log(bookingData);
        $("#meddelande").text(bookingData.message);
    });

    // Close modal
    $(document).on('click', '#close-dialog', function () {
        $('dialog').get(0).close();
    });

    // Returnerar HTML-strängen med alla sektioner och innehåll
    return `
        <div id="kodsidan">
            <div id="kode-main container">
                <img src="Images/kodklubb-foto/computer-background.webp" id="Imgtop">
                <div id="kod-landing-container">
                    <div>
                        <h3>Kodklubben</h3>
                        <p>Platsen där programmering kan göras lätt,<br>vi lär dig det viktigaste inom programmering såsom att centrera en div!</p>
                    </div>
                </div>
            </div>

            <div id="kod-main-event">
                <div id="kod-event-container">
                    <div id="kod-event-container-main">${eventString}</div>
                </div>
            </div>

            <dialog id="kod-dialog">
                <div>
                    <p id="meddelande">BOKA</p>
                    <form onsubmit="return false">
                        <label for="quantity">Antal:</label>
                        <input type="number" id="quantity" name="quantity" min="1" max="100"></input>
                        <input type="submit" id="kod-submit" value="Boka"></input>
                    </form>
                    <button id="close-dialog">Close</button>
                </div>
            </dialog>

            <div id="leaderboard-section">
                <div id="leaderboard-container">
                    <div id="leaderboard-image">
                        <img src="Images/kodklubb-foto/leetcode.png" id="leaderboard-image">
                    </div>
                    <div id="content-boxes">
                        <div class="content-box">
                            <h2>Rankning för mest leetcode problem gjorda</h3>
                            <ul class=leaderboard-ranks>
                                <li><span class="rank">1.</span> Linus - 5120</li>
                                <li><span class="rank">2.</span> Jakob - 4430</li>
                                <li><span class="rank">3.</span> Kempe - 3230</li>
                                <li><span class="rank">4.</span> Hoffman - 2054</li>
                            </ul>
                        </div>
                            <div class="content-box">>
                            <h2>Snabbaste centrering av div</h3>
                            <ul class=leaderboard-ranks>
                                <li><span class="rank">1.</span> Jakob - 10 sec</li>
                                <li><span class="rank">2.</span> Linus - 20 sec</li>
                                <li><span class="rank">3.</span> Kempe - 40 sec </li>
                                <li><span class="rank">4.</span> Hoffman - 2 dagar</li>
                            </ul>
                        </div>
                        <div class="content-box">
                        <h2>bästa guidesen gjorda</a></h3>
                        <ul class=leaderboard-ranks>
                        <li><span class="rank">1.</span> Hoffman - Hur man hittar LIA som IT-student!</li>
                        <li><span class="rank">2.</span> Linus - Undvik jobba i main branchen</li>
                        <li><span class="rank">3.</span> Jakob - Back-end utveckling till en ny nivå</li>
                        <li><span class="rank">4.</span> Kempe - Bli en .NET utvecklare i din sömn </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <div id="about-container">
                <div id="kod-about-text">
                    <h2>Om oss</h2>
                    <p>Välkommen till Gala Emporium Kodningsklubb!
                    Vi är en passionerad grupp av kodare och teknikentusiaster som samlas för att dela vår kärlek till programmering och allt som har med teknik att göra.<br><br>
                    Oavsett om du är nybörjare som precis har börjat utforska världen av kodning eller en erfaren utvecklare som söker nya utmaningar, så är du varmt välkommen att vara med oss.<br><br>
                    Vår klubb bildades med syftet att skapa en inkluderande och stödjande miljö där medlemmar kan lära av varandra, dela kunskap och erfarenheter samt utforska den ständigt föränderliga världen av programutveckling.</p><br><br>
                </div>
                <div id="about-img-container">
                    <img src="Images/kodklubb-foto/kat-programer.png" id="aboutImg">
                </div>
            </div>
        </div>`;
}
