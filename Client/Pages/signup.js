export default async function signup() {
    $("main").attr("id", "signup")




    return `
        <div id="signup-main-container">
        
            <div id="signup-container">

                <h3>SKAPA KONTO</h3>

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

$(document).on('submit', '#signup-container-form', function (event) {
    console.log(1);
    event.preventDefault()

    var formData = {
        firstName: $('[name=firstName]').val(),
        lastName: $('[name=lastName]').val(),
        email: $('[name=email]').val(),
        password: $('[name=password]').val()
    };

    console.log(formData);
})