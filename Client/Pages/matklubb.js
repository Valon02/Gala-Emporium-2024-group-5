export default async function matKlubb() {
        $("main").attr("id", "matklubb")

        const response = await fetch('/api/events')
        const result = await response.json()

        console.log(result)

        let eventString = "";
        for (let event of result) {
                // Hämtar datumet som en sträng
                const dateString = event.date;
                // Konverterar datumet till ett datum objekt
                const dateObject = new Date(dateString);
                // Använder datum objektet för att få fram vilken månad det är (förkortat)
                const month = dateObject.toLocaleDateString("sv-SE", { month: "short" }).toUpperCase().replace('.', '')
                const day = dateObject.toLocaleDateString("sv-SE", { day: "numeric" })
                eventString += `
                <div class="kommande-event">
                        <div class="event-date">
                                <span>${day}</span>
                                <b>${month}</b>

                        </div>

                        <div class="event-content">
                                <h3>${event.name}</h3>
                                <p class="event-content-about">${event.about}</p>
                                <p>Platser kvar: ${event.availableTickets}</p>
                        </div>

                        <div class="event-button">
                        <b>BOKA</b>
                        </div>
                </div>
                `
        }


        return `
                <div id="main-container">


                        <div id="home-container">
                                <img src="Images/mat2.jpeg" id="mainImg">
                                <div id="welcome-container">
                                        <div>
                                                <h3>MAT KLUBBEN</h3>
                                                <p>Sammansmältning av passion och smak,<br> vår matlagningsklubb skapar<br> kulinariska äventyr!</p>
                                        </div>
                                        <button>Boka nu</button>
                                </div>
                        </div>
                        

                        <div id="main-event-container">
                                <div id="event-container">
                                        <div id="event-container-header">
                                                <h3>Kommande evenemang!</h3>
                                        </div>
                                        <div id="event-container-main">
                                                <div id="event-container-main-content">${eventString}</div>
                                        </div>
                                </div>
                        </div>
                
                
                </div>


        `

}

{/* <div id="logga-container">
    <h1 id="logga">Trolleri</h1>
    </div>

    <h3>Kommande event:</h3>
    <div class="kommande-event-container">
    ${eventString}
    </div> */}