// script.js

// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const umbrella = document.getElementById("umbrella-image");
    const logoUpload = document.getElementById("logo-upload");
    let rotation = 0; // Initialize rotation angle

    // Function to change the umbrella color based on the selected color
    function changeColor(color) {
        umbrella.src = `images/${color}-umbrella.png`;
    }

    // Event listeners for color switch buttons
    document.querySelectorAll(".switch").forEach(button => {
        button.addEventListener("click", (e) => {
            // Hide loader after 2 seconds
            showLoader();
            setTimeout(function () {
                hideLoader();
                const colorClass = e.target.classList[1]; // Get the color class from the clicked button
                changeColor(colorClass); // Change the umbrella color
            }, 2000); // Wait for 2 seconds before hiding the loader
        });
    });

    // Function to show loader
    function showLoader() {
        document.getElementById("loaderContainer").style.display = "block"; // Show loader container
        document.getElementById("content").classList.add("hide"); // Hide main content
        document.getElementById("uploaded-image").classList.add("hide"); // Hide uploaded image
        document.getElementById("hidden-loader").style.visibility = "visible"; // Show hidden loader
        document.querySelector(".upload-logo").style.display = "none"; // Hide upload logo
    }

    // Function to hide loader
    function hideLoader() {
        document.getElementById("loaderContainer").style.display = "none"; // Hide loader container
        document.getElementById("content").classList.remove("hide"); // Show main content
        document.getElementById("uploaded-image").classList.remove("hide"); // Show uploaded image
        document.getElementById("hidden-loader").style.visibility = "hidden"; // Hide hidden loader
        document.querySelector(".upload-logo").style.display = "block"; // Show upload logo
    }

    // Event listener for uploading logo
    logoUpload.addEventListener("change", function () {
        const file = this.files[0]; // Get the uploaded file
        const reader = new FileReader();
        reader.onload = function (e) {
            const logoPreview = document.createElement("img"); // Create an image element for logo preview
            logoPreview.src = e.target.result; // Set the source of the preview image
            logoPreview.classList.add('logo-preview'); // Add class for easier selection
            logoPreview.style.position = "absolute"; // Position the preview image absolutely
            logoPreview.style.bottom = "10px"; // Position the preview image 10px from the bottom
            logoPreview.style.left = "50%"; // Position the preview image at the center horizontally
            logoPreview.style.transform = "translateX(-50%) rotate(-" + rotation + "deg)"; // Rotate the preview image
            logoPreview.style.maxWidth = "80px"; // Set maximum width of the preview image
            logoPreview.style.maxHeight = "80px"; // Set maximum height of the preview image
            umbrella.parentNode.appendChild(logoPreview); // Append the preview image to the umbrella container
        };
        reader.readAsDataURL(file); // Read the uploaded file as a data URL
    });
});

// Event listener for custom upload button
document.getElementById('custom-upload-btn').addEventListener('click', function () {
    const fileInput = document.createElement('input'); // Create a new input element
    fileInput.type = 'file'; // Set input type to file
    fileInput.accept = 'image/*'; // Accept only image files
    fileInput.style.display = 'none'; // Hide the file input
    fileInput.addEventListener('change', handleFileSelect); // Add event listener for file input change
    document.body.appendChild(fileInput); // Append the file input to the body
    fileInput.click(); // Simulate click on the file input
});

// Function to handle file selection from custom upload button
function handleFileSelect(event) {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
            const uploadedImage = document.getElementById('uploaded-image'); // Get the uploaded image element
            uploadedImage.src = this.result; // Set the source of the uploaded image
            uploadedImage.classList.remove('upload-image-view'); // Remove the upload image view class
            uploadedImage.display = "block"; // Display the uploaded image
            uploadedImage.style.height = '68px'; // Set height of the uploaded image
            uploadedImage.style.position = "absolute"; // Position the uploaded image absolutely
            uploadedImage.style.top = "60vh"; // Position the uploaded image at 60% from the top of the viewport
            uploadedImage.style.width = "120px"; // Set width of the uploaded image
        });
        reader.readAsDataURL(file); // Read the selected file as a data URL
    }
}
