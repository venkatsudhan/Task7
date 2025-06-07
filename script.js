const userList = document.getElementById("userList");
const errorMessage = document.getElementById("errorMessage");
const reloadBtn = document.getElementById("reloadBtn");
const reloadMessage = document.getElementById("reloadMessage");

function fetchIndianUsers() {
    userList.innerHTML = "";
    errorMessage.textContent = "";
    reloadMessage.textContent = "";

    const url = "https://randomuser.me/api/?results=10&nat=in&seed=" + Math.random();

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network error");
            }
            return response.json();
        })
        .then(data => {
            data.results.forEach(user => {
                const userDiv = document.createElement("div");
                userDiv.className = "user-card";
                userDiv.innerHTML = `
                    <h3>${user.name.title} ${user.name.first} ${user.name.last}</h3>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Phone:</strong> ${user.phone}</p>
                    <p><strong>Location:</strong> ${user.location.city}, ${user.location.state}, ${user.location.country}</p>
                    <p><strong>Postal Code:</strong> ${user.location.postcode}</p>
                `;
                userList.appendChild(userDiv);
            });
            reloadMessage.textContent = "Reloaded!";
        })
        .catch(error => {
            errorMessage.textContent = "⚠️ Unable to fetch data. Please check your internet.";
            console.error("Fetch error:", error);
        });
}

reloadBtn.addEventListener("click", fetchIndianUsers);

fetchIndianUsers();
