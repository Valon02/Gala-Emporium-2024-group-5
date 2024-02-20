export default async function kodklubben() {
    $("main").attr("id", "kodklubben");

    const response = await fetch(`/api/events/clubs/65d326f62d34b531073334fb`);
    const result = await response.json();
    console.log(result);

    // Hämtar alla eventen och lägger till rätt styling för kommande evenemang
    let eventString = "";
    for (let event of result) {
        const dateString = event.date;
        const dateObject = new Date(dateString);
        const month = dateObject.toLocaleDateString("sv-SE", { month: "short" }).toUpperCase().replace('.', '');
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
                <div class="kod-main-page">
                    <img src="Pages/kodklubb-foto/leetcode.png" id="mainImg">
                    <h3>Kommande evenemang!</h3>
                </div>
                <div class="event-button">
                    <b>BOKA</b>
                </div>
            </div>`;
    }

    // Returnerar HTML-strängen med alla sektioner och innehåll
    return `
        <div id="kodsidan">
            <div id="kode-main container">
                <img src="Pages/kodklubb-foto/computer-background.webp" id="mainImg">
                <div id="kod-landing-container">
                    <div>
                        <h3>Kodklubben</h3>
                        <p>Platsen där programmering kan göras lätt,<br>vi lär dig det viktigaste inom programmering såsom att centrera en div!</p>
                    </div>
                    <button>Boka nu</button>
                </div>
            </div>

            <div id="kod-main-event">
                <div id="event-container">
                    <div id="kod-event-header">
                        <h3>Kommande evenemang!</h3>
                    </div>
                    <div id="event-container-main">${eventString}</div>
                </div>
            </div>

            <div id="leaderboard-section">
                <div id="leaderboard-container">
                    <div id="leaderboard-image">
                        <img src="path_to_your_leaderboard_image.png" alt="Leaderboard Image">
                    </div>
                    <div id="content-boxes">
                        <div class="content-box">Content Box 1</div>
                        <div class="content-box">Content Box 2</div>
                        <div class="content-box">Content Box 3</div>
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
                    <img src="Pages/kodklubb-foto/kat-programer.png" id="aboutImg">
                </div>
            </div>
        </div>`;
}
