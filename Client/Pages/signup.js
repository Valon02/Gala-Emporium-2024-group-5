
export default async function signup() {
    $("main").attr("id", "signup")




    return `
        <div id="signup-main-container">
        
            <div id="signup-container">

                <h3>SKAPA KONTO</h3>
                
                <p id="meddelande"></p>

                <form id="signup-container-form">
                    <input type="text" placeholder="Förnamn" name="firstName"></input>
                    <input type="text" placeholder="Efternamn" name="lastName"></input>
                    <input type="text" placeholder="Email" name="email"></input>
                    <input type="password" placeholder="Lösenord" name="password"></input>
                    <button type="submit" id="submit-signup">SKAPA</button>
                </form>
            </div>

        </div>
    
    `
}


// Hämta det som står i input fälten och skickar in det i post metoden till 
// att skapa en ny användare.
$(document).on('submit', '#signup-container-form', async function (event) {
    event.preventDefault()

    // Input fält värden
    var formData = {
        firstName: $('[name=firstName]').val(),
        lastName: $('[name=lastName]').val(),
        mail: $('[name=email]').val(),
        password: $('[name=password]').val()
    };

    try {
        const response = await fetch(`/api/users`, {
            method: "POST", 
            headers: { "Content-Type": "application/json"}, 
            body: JSON.stringify(formData)
        })

                if (response.ok) {
                    const result = await response.json()
                    console.log(result.message);
                    $("#meddelande").text("Du har nu skapat ett nytt konto. Välkommen!")
                    
                } else {
                    console.log('statuskod:', response);
                    $("#meddelande").text("Något gick fel!")

                }

    } catch (error) {
        console.error('Något gick fel:', error);
    }
})