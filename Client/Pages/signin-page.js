export default async function signinPage() {
  $("main").attr("id", "signup");

  return `
        <div id="signin-main-container">
        
            <div id="signin-container">

                <h3>Logga In</h3>
                
                <p id="meddelande"></p>

                <form id="signin-container-form">
                    <input type="text" placeholder="Email" name="email"></input>
                    <input type="password" placeholder="Lösenord" name="password"></input>
                    <button type="submit" id="submit-signup">LOGGA IN</button>
                </form>
            </div>

        </div>

    `;
}

$(document).on("submit", "#signin-container-form", async function (event) {
  event.preventDefault();

  // Input fält värden
  var formData = {
    mail: $("[name=email]").val(),
    password: $("[name=password]").val(),
  };

  try {
    const response = await fetch(`/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const userData = await response.json();
    console.log(userData);
    
    $("#meddelande").text(userData.message);
    setTimeout(function() {
      location.reload(true);
  }, 2000);
  } catch (error) {
    console.error("Något gick fel:", error);
  }
});
