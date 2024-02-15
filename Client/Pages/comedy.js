export default function renderComedy() {
  $("main").attr("id", "homepage");

  return `
    
        <main>
            <h1 class="comedy-site-title">ClubFun</h1>

            <section class="comedy-about">
                <h2 class="comedy-about-title">ClubFun Comedy</h2>
                <p class="comedy-about-description">
                    Welcome to the newest hottest comedyclub in town.
                    With a mix of todays superstars and tomorrows talants, our shows has something for everyone.
                </p>
            </section>

            <div class="break-line"></div>

            <h2 class="comedy-upcomming-events-title">Upcomming Events</h2>
            <section class="comedy-upcoming-events">
                <div class="event-card">
                    <div class="event-card-date">15 Maj</div>
                    <div class="event-card-time">20:00 - 23:00</div>
                    <div class="event-card-description">Tonight...</div>
                    <button class="buy-ticket">Buy Ticket</button>

                </div>

                <div class="event-card">
                    <div class="event-card-date">15 Maj</div>
                    <div class="event-card-time">20:00 - 23:00</div>
                    <div class="event-card-description">This event...</div>
                    <button class="buy-ticket">Buy Ticket</button>

                </div>

                <div class="event-card">
                    <div class="event-card-date">15 Maj</div>
                    <div class="event-card-time">20:00 - 23:00</div>
                    <div class="event-card-description">person1 person2 person3</div>
                    <button class="buy-ticket">Buy Ticket</button>

                </div>

                <button class="all-events">Click here to view all upcomming events</button>
            </section>

            
            
            

        </main>


    `;
}
