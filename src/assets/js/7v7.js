// Tryout Table Section
class CS_GalleryFilter {
        filtersSelector = '.cs-button';
        tableSelector = '.cs-table-wrapper';
        activeClass = 'cs-active';
        hiddenClass = 'cs-hidden';

        constructor() {
            this.$galleries = document.querySelectorAll(this.tableSelector);
            const $filters = document.querySelectorAll(this.filtersSelector);

            this.onClick($filters[0]);

            for (const $filter of $filters) {
                $filter.addEventListener('click', () => this.onClick($filter));
            }
        }

        onClick($filter) {
            this.filter($filter.dataset.filter);

            const { activeClass } = this;

            this.$activeFilter?.classList.remove(activeClass);
            $filter.classList.add(activeClass);

            this.$activeFilter = $filter;
        }

        filter(filter) {
            const showAll = filter == 'all';
            const { hiddenClass } = this;

            for (const $gallery of this.$galleries) {
                const show = showAll || $gallery.dataset.category == filter;
                $gallery.classList.toggle(hiddenClass, !show);
            }
        }
    }

    new CS_GalleryFilter();


// Why Choose Us Section
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('#why-choose-1824 .cs-button');
    const boxContents = document.querySelectorAll('#why-choose-1824 .cs-box-content');

    // Function to show the corresponding box content and hide others
    function showBoxContent(button) {
        const filterValue = button.getAttribute('data-filter');

        boxContents.forEach(box => {
            if (box.getAttribute('data-box') === filterValue) {
                box.classList.remove('cs-hidden');
            } else {
                box.classList.add('cs-hidden');
            }
        });

        buttons.forEach(btn => {
            if (btn === button) {
                btn.classList.add('cs-active');
            } else {
                btn.classList.remove('cs-active');
            }
        });
    }

    // Event listeners for screens below 1024px
    if (window.matchMedia('(max-width: 1024px)').matches) {
        buttons.forEach(button => {
            button.addEventListener('click', () => showBoxContent(button));
        });
    }

    // Event listeners for screens above 1024px
    if (window.matchMedia('(min-width: 1024px)').matches) {
        buttons.forEach(button => {
            button.addEventListener('mouseover', () => showBoxContent(button));
        });
    }
});
                                
// Registration Modals

// Initialize modals on the 7v7 page (same behavior as modal.js but scoped here)
document.addEventListener('DOMContentLoaded', function () {
    var modals = document.querySelectorAll('[data-modal]');
    if (!modals.length) return;

    modals.forEach(function (modal) {
        var id = modal.id || modal.getAttribute('data-modal-id');
        if (!id) return;

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

        // ensure hidden at start
        modal.classList.add('cs-closed');
        modal.classList.remove('cs-loaded');
        modal.style.zIndex = -10000;

        // openers
        openers.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                openModal();
            });
        });

        // closers inside modal
        closers.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                closeModal();
            });
        });

        // click outside content closes modal
        modal.addEventListener('mousedown', function (event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    });

    // Escape closes any open modal
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        document.querySelectorAll('[data-modal].cs-loaded').forEach(function (m) {
            m.classList.add('cs-closed');
            m.classList.remove('cs-loaded');
            m.style.zIndex = -1000;
        });
    });
});
