export default async function renderHeader(isLoggedIn) {
    // Set the main ID
    $("header").attr("id", isLoggedIn ? "logged-in" : "logged-out");

    // Construct the main content
    const mainContent = `
        ${eventString}
        <header>
            <div class="logo">GE</div>
            <nav>
                <ul>
                    <li><a href="#" class="home">Home</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropbtn">Clubs <span class="material-symbols-outlined"> expand_more </span></a>
                        <div class="dropdown-content">
                            <a href="#">Nattklubben</a>
                            <a href="#">Komediklubben</a>
                            <a href="#">Matlagningsklubben</a>
                            <a href="#">Trolleriklubben</a>
                            <a href="#">Dejtingklubben</a>
                            <a href="#">Kodningsklubben</a>
                        </div>
                    </li>
                    ${isLoggedIn ? '<li><a href="#" class="bn3637 bn36">Logout</a></li>' : '<li><a href="#" class="bn3637 bn36">Login</a></li>'}
                </ul>
            </nav>
        </header>
    `;

    return mainContent;
}
