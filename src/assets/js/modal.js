document.addEventListener('DOMContentLoaded', function () {
    // Find all modal containers (add data-modal attribute to each modal element)
    var modals = document.querySelectorAll('[data-modal]');

    modals.forEach(function (modal) {
        var id = modal.id || modal.getAttribute('data-modal-id');
        if (!id) return; // each modal should have an id or data-modal-id

        var openers = document.querySelectorAll('[data-modal-open="' + id + '"]');
        var closers = modal.querySelectorAll('[data-modal-close]');
        var content = modal.querySelector('[data-modal-content]') || modal.querySelector('.cs-modal-content');
        var storageKey = 'modalClosed:' + id;

        function openModal() {
            modal.classList.add('cs-loaded');
            modal.classList.remove('cs-closed');
            modal.style.zIndex = 12000;
            localStorage.setItem(storageKey, 'false');
        }

        function closeModal() {
            modal.classList.add('cs-closed');
            modal.classList.remove('cs-loaded');
            modal.style.zIndex = -1000;
            localStorage.setItem(storageKey, 'true');
        }

        // initial state: hidden
        modal.classList.add('cs-closed');
        modal.classList.remove('cs-loaded');
        modal.style.zIndex = -10000;

        // wire open buttons
        openers.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                openModal();
            });
        });

        // wire close buttons inside modal
        closers.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                closeModal();
            });
        });

        // click outside content closes modal
        modal.addEventListener('mousedown', function (event) {
            // If clicking the overlay (the modal container itself), close.
            if (event.target === modal) {
                closeModal();
            }
        });

        // Escape key closes modal
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('cs-loaded')) {
                closeModal();
            }
        });
    });
});