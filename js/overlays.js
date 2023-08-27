
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.getElementById("button_ids");
    const buttonArray = buttons.textContent.split(" ");

    for (let i = 0; i < buttonArray.length; i++) {
        let isOverlayOpen = false;

        const buttonId = buttonArray[i];

        const openOverlayButton = document.getElementById(buttonId);
        const overlayId = openOverlayButton.getAttribute("overlay_id");

        const overlay = document.getElementById(overlayId);
        const overlayContent = overlay.querySelector(".overlay-content");

        const overlayUrl = overlay.getAttribute("overlay_ref");

        openOverlayButton.addEventListener("click", function () {
            // Load the content from another HTML file using AJAX
            const xhr = new XMLHttpRequest();
            xhr.open("GET", overlayUrl, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        overlayContent.innerHTML = xhr.responseText;
                        overlay.style.display = "block";
                        isOverlayOpen = true;
                        document.body.style.overflow = "hidden";
                    } else {
                        console.error("Failed to load overlay content.");
                    }
                }
            };
            xhr.send();
        });

        overlay.addEventListener("click", function (event) {
            if (event.target === overlay) {
                overlay.style.display = "none";
            }
        });



        overlay.addEventListener("click", function (event) {
            if (event.target === overlay) {
                overlay.style.display = "none";
                isOverlayOpen = false;
                document.body.style.overflow = "auto"; // Allow scrolling of main page
            }
        });

        // Prevent scrolling of main page when hovering over the overlay
        overlay.addEventListener("mouseover", function () {
            if (isOverlayOpen) {
                document.body.style.overflow = "hidden";
            }
        });

        overlay.addEventListener("mouseout", function () {
            if (isOverlayOpen) {
                document.body.style.overflow = "auto";
            }
        });
    };

});
