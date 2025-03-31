document.addEventListener("DOMContentLoaded", function () {
    // to handle the user waitlist form (trader / investor)
    const userForm = document.getElementById("waitlistForm");
    if (userForm) {
        userForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const userData = {
                name: document.getElementById("name").value,
                email:document.getElementById("email").value,
            };

            fetch("https://lbex-backend.onrender.com/waitlist", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(userData),
            })
            .then(response => response.json())
            .then(data => showPopup(data.message))
            .catch(error => console.error("Error:", error));
        });
    }

    //Handling Business Waitlist Form
    const businessForm = document.getElementById("businessForm");
    if (businessForm) {
        businessForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const businessData = {
                name: document.getElementById("businessName").value,
                email:document.getElemntById("businessEmail").value,
                industry: document.getElementById("industry").value,
                location: document.getElementById("location").value,
            };
            fetch("https://lbex-backend.onrender.com/register-business", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(businessData),
            })
            .then(response => response.json())
            .then(data => showPopup(data.message))
            .catch(error => console.error("Error:", error))
        });
    }

    //Function to display the popup message

    function showPopup(message) {
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.innerHTML = `
        <div class="popup-content">
           <p>${message}</p>
           <button onclick="closePopup()">OK</button>
        </div>
        `;
        document.body.appendChild(popup);
    }

    //Function to close the popup

    window.closePopup = function () {
        const popup = document.querySelector(".popup");
        if (popup) {
            popup.remove();
        }
    };
});