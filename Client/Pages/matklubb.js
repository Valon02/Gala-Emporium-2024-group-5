export default async function matKlubb() {
        $("main").attr("id", "matklubb")

        const response = await fetch('/api/events')
        const result = await response.json()

        console.log(result)

        let eventString = "";
        for (let event of result) {
                eventString += `
                <div class="kommande-event">
                        <h3>${event.club.name}</h3>
                        <p>${event.name}</p>
                        <br>
                        <p>Totala platser: ${event.participantLimit}</p>
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