document.addEventListener("DOMContentLoaded", function () {
    // Handle the user waitlist form (trader/investor)
    const userForm = document.getElementById("waitlistForm");
    if (userForm) {
        userForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("name")?.value.trim();
            const email = document.getElementById("email")?.value.trim();

            if (!name || !email) {
                showPopup("Please fill in all required fields.");
                return;
            }

            const userData = { name, email };

            fetch("https://lbex-backend.onrender.com/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            })
            .then(response => response.json())
            .then(data => {
                console.log("Server Response:", data);
                if (data.error) {
                    showPopup(`Error: User already registered`);
                } else {
                    showPopup(data.message || "Successfully added to the waitlist!", userForm);
                }
            })
            .catch(error => console.error("Error:", error));
        });
    }

    // Handle Business Waitlist Form
    const businessForm = document.getElementById("businessForm");
    if (businessForm) {
        businessForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("businessName")?.value.trim();
            const email = document.getElementById("businessEmail")?.value.trim();
            const industry = document.getElementById("industry")?.value.trim();
            const location = document.getElementById("location")?.value.trim();

            if (!name || !email || !industry || !location) {
                showPopup("Please fill in all required fields.");
                return;
            }

            const businessData = { name, email, industry, location };

            console.log("Sending Business Data:", businessData);

            fetch("https://lbex-backend.onrender.com/register-business", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(businessData),
            })
            .then(response => response.json())
            .then(data => {
                console.log("Server Response:", data);
                if (data.error) {
                    showPopup(`Error:Business already Registered`);
                } else {
                    showPopup(data.message || "Business successfully registered!", businessForm);
                }
            })
            .catch(error => console.error("Error:", error));
        });
    }

    // Function to display the popup message
    function showPopup(message) {
        const overlay = document.createElement("div");
        overlay.classList.add("popup-overlay");
    
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.innerHTML = `
            <div class="popup-content">
                <p>${message}</p>
                <button onclick="closePopup()">OK</button>
            </div>
        `;
    
        document.body.appendChild(overlay);
        document.body.appendChild(popup);
    }
    
    // Close popup and remove overlay
    window.closePopup = function () {
        document.querySelector(".popup")?.remove();
        document.querySelector(".popup-overlay")?.remove();
    };
    
});
