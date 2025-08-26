document.addEventListener('DOMContentLoaded', function () {
    // Variables
    var CSmodal = document.getElementById("cs-modal-1605");
    var CScloseButton = document.getElementById("cs-close-1605");
    var CSsubmitButton = document.getElementById("cs-submit-1605");
    var CSopenButton = document.getElementById("cs-open-1605"); // Add your trigger button in HTML
    var CSmodalContent = document.querySelector("#cs-modal-1605 .cs-modal-content"); // Adjust selector if needed

    // Hide modal initially
    CSmodal.classList.add('cs-closed');
    CSmodal.classList.remove('cs-loaded');
    CSmodal.style.zIndex = -10000;

    // Show modal on button press
    CSopenButton.addEventListener('click', function () {
        CSmodal.classList.add('cs-loaded');
        CSmodal.classList.remove('cs-closed');
        CSmodal.style.zIndex = 12000;
        localStorage.setItem('modalClosed', 'false'); // Reset closed state if needed
    });

    // Close button event listener
    CScloseButton.addEventListener('click', function () {
        CSmodal.classList.add('cs-closed');
        CSmodal.classList.remove('cs-loaded');
        CSmodal.style.zIndex = -1000;
        localStorage.setItem('modalClosed', 'true');
    });

    // Close modal when clicking outside the modal content
    CSmodal.addEventListener('mousedown', function (event) {
        if (event.target === CSmodal && !CSmodalContent.contains(event.target)) {
            CSmodal.classList.add('cs-closed');
            CSmodal.classList.remove('cs-loaded');
            CSmodal.style.zIndex = -1000;
            localStorage.setItem('modalClosed', 'true');
        }
    });
});