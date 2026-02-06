document.addEventListener("DOMContentLoaded", () => {
    // --- Helper: Show Popup ---
    function showPopup(message) {
        // Remove existing popup if any
        document.querySelector(".popup")?.remove();
        document.querySelector(".popup-overlay")?.remove();

        const overlay = document.createElement("div");
        overlay.className = "popup-overlay";

        const popup = document.createElement("div");
        popup.className = "popup";
        popup.innerHTML = `
            <div class="popup-content">
                <p>${message}</p>
                <button id="popupCloseBtn">OK</button>
            </div>
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(popup);

        document.getElementById("popupCloseBtn").addEventListener("click", () => {
            popup.remove();
            overlay.remove();
        });
    }

    // --- Handle User Waitlist Form ---
    const userForm = document.getElementById("waitlistForm");
    if (userForm) {
        userForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("name")?.value.trim();
            const email = document.getElementById("email")?.value.trim();

            if (!name || !email) {
                showPopup("Please fill in all required fields.");
                return;
            }

            try {
                const response = await fetch("http://127.0.0.1:5000/waitlist", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email }),
                });

                const data = await response.json();

                if (data.error) {
                    showPopup(`Error: ${data.error}`);
                } else {
                    showPopup(data.message || "Successfully added to the waitlist!");
                    userForm.reset();
                }
            } catch (err) {
                console.error(err);
                showPopup("Network error. Please try again later.");
            }
        });
    }

    // --- Handle Business Waitlist Form ---
    const businessForm = document.getElementById("businessForm");
    if (businessForm) {
        businessForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("businessName")?.value.trim();
            const email = document.getElementById("businessEmail")?.value.trim();
            const industry = document.getElementById("industry")?.value.trim();
            const location = document.getElementById("location")?.value.trim();

            if (!name || !email || !industry || !location) {
                showPopup("Please fill in all required fields.");
                return;
            }

            try {
                const response = await fetch("http://127.0.0.1:5000/register-business", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, industry, location }),
                });

                const data = await response.json();

                if (data.error) {
                    showPopup(`Error: ${data.error}`);
                } else {
                    showPopup(data.message || "Business successfully registered!");
                    businessForm.reset();
                }
            } catch (err) {
                console.error(err);
                showPopup("Network error. Please try again later.");
            }
        });
    }
});
