export default async function renderDatingKlubb() {
    // Set the main ID
    $("main").attr("id", "datingklubb");

    // Construct the static part of the main content, focusing on layout updates
    const mainContent = `
        <div class="datingklubb-site-title-container">
            <h1 class="Gnistan">Datingklubben Gnistan</h1>
        </div>
        <section class="datingklubb-about">
            <h2 class="datingklubb-about-title">Om Gnistan</h2>
            <p class="datingklubb-about-description">
            Välkommen till Gnistan, en datingklubb för dig som vill tända gnistan med någon speciell. Här kan du träffa andra singlar som söker efter kärlek, vänskap och gemenskap. 
            </p>
        </section>
        <div class="break-line"></div>
        <h2 class="datingklubb-upcoming-events-title">Kommande evenemang!</h2>
        <section class="datingklubb-upcoming-events" id="upcoming-events"></section>
    `;

    // Set the static part of the main content
    $('main').html(mainContent);

// Fetch event data and generate dynamic event content
try {
    // Ersätt 'clubId' nedan med den faktiska ID:et för klubben du vill hämta evenemang för
    const clubId = 'clubId';
    
    const response = await fetch(`/api/events/clubs/${clubId}`);
    if (!response.ok) throw new Error("Failed to fetch events");
    const events = await response.json();

    let eventString = "";
    events.forEach(event => {
        if (event.date) {
            const dateString = event.date.substring(0, 10);
            eventString += `
                <div class="event-card">
                    <div class="event-date">${dateString}</div>
                    <h3 class="event-name">${event.name}</h3>
                    <p>Participant limit: ${event.participantLimit}</p>
                    <p>Available tickets: ${event.availableTickets}</p>
                    <a href="/event/${event.id}" class="event-info-button">Mer Information</a>
                </div>`;
        }
    });

    // Append the dynamic event content to the 'upcoming-events' section
    $('#upcoming-events').html(eventString);
} catch (error) {
    console.error("Error:", error);
}

        // Add the detailed club description for SEO
        const seoText = `
            <section class="datingklubb-more-info">
                <h2>Upptäck Mer Om Gnistan</h2>
                <p>Välkommen till Datingklubben Gnistan – Där Kärleksfulla Äventyr Börjar...</p>
                <span>På jakt efter den där speciella gnistan? 
                <br><br>
                Välkommen till Datingklubben Gnistan, en unik mötesplats skapad för att tända lågor av passion och kamratskap i hjärtat av Evenemangsstad. Hos oss hittar du en varm gemenskap där singlar kan utforska nya relationer, vänskap, och äventyr, allt inom en stödjande och välkomnande atmosfär.
                <br><br>
                Vad Gör Gnistan Så Speciell?
                <br><br>
                Datingklubben Gnistan skiljer sig från mängden genom att erbjuda en mångfald av evenemang och aktiviteter som uppmuntrar till äkta samtal och meningsfulla möten. Från romantiska middagar under stjärnorna till spännande utflykter, workshops i personlig utveckling, och danskvällar, har vi något för alla. Varje evenemang är noggrant planerat för att skapa en avslappnad och trygg miljö där kärlekens lågor kan flamma upp naturligt.
                <br><br>
                Varför Bli Medlem i Gnistan?
                <br><br>
                Personliga Möten: I en digital värld tror vi på kraften i personliga möten. Gnistan är platsen där blickar kan mötas och samtal flöda fritt.
                Djupare Anslutningar: Vi fokuserar på att skapa möjligheter för våra medlemmar att knyta djupare band, bortom den första gnistan av attraktion.
                Säker och Inkluderande Miljö: Din trygghet är vår prioritet. Gnistan är en klubb där alla kan känna sig välkomna, respekterade och värderade.
                Unika Evenemang: Med ett brett utbud av evenemang är ingen vecka den andra lik. Upptäck nya intressen medan du söker efter den där speciella någon.
                Gå med i Gemenskapen
                <br><br>
                Är du redo att tända gnistan? Gå med i vår gemenskap idag och börja ditt nya äventyr. Hos Gnistan finns det alltid chansen att träffa någon speciell, skapa nya vänner och uppleva oförglömliga ögonblick. Besök vår hemsida för att lära dig mer om våra kommande evenemang och hur du kan bli en del av denna spännande resa. Tillsammans skapar vi minnen som varar livet ut.
                <br><br>
                Kontakta Oss
                <br><br>
                För mer information om medlemskap, kommande evenemang, eller hur du kan bidra till vår gemenskap, tveka inte att kontakta oss. Vår dörr står alltid öppen för nya medlemmar och idéer.
                <br><br>
                Varmt välkommen till Datingklubben Gnistan – där varje möte har potential att bli början på något underbart.</span>
            </section>
        `;

        // Append the SEO text to the main content
        $('main').append(seoText);
    } catch (error) {
        console.error("Error loading events:", error);
        $('#upcoming-events').html("<p>Problem att ladda evenemang. Försök igen senare.</p>");
    }

    return $('main').html();
}
