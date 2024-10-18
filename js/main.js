(function ($) {
    "use strict";

    // Function to load external HTML files
    function loadHTML(elementId, file) {
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById(elementId).innerHTML = data; // Insert content into the specified element

                // Call the function to set the active link
                setActiveNavLink();
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }

    // Function to set the active navigation link based on the current URL
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop(); // Get the current page name
        $('.navbar-nav a').removeClass('active'); // Remove active class from all links

        // Add active class to the current page link
        $('.navbar-nav a').each(function () {
            if ($(this).attr('href') === currentPage) {
                $(this).addClass('active');
            }
        });

        // Check if the current page is a services section
        const serviceSections = [
            'software-development.html', 
            'web-development.html', 
            'digital-marketing.html',
            'app-development.html',
            'web-hosting.html',
            'software-maintenance.html',
            'api-integration.html',
            'technical-consultancy.html'
        ]; // Replace with your service section file names

        if (serviceSections.includes(currentPage)) {
            // If on any service section page, set the "Services" link as active
            $('.nav-item.dropdown .nav-link').addClass('active');
        }
    }

    // Load header and footer when the document is ready
    $(document).ready(function () {
        loadHTML('header', 'header.html');
        loadHTML('footer', 'footer.html');

        // Spinner
        var spinner = function () {
            setTimeout(function () {
                if ($('#spinner').length > 0) {
                    $('#spinner').removeClass('show');
                }
            }, 1);
        };
        spinner(0);

        // Initiate the WOW.js
        new WOW().init();

        // Sticky Navbar
        $(window).scroll(function () {
            if ($(this).scrollTop() > 45) {
                $('.navbar').addClass('sticky-top shadow-sm');
            } else {
                $('.navbar').removeClass('sticky-top shadow-sm');
            }
        });

        // Hero Header carousel
        $(".header-carousel").owlCarousel({
            animateOut: 'fadeOut',
            items: 1,
            margin: 0,
            stagePadding: 0,
            autoplay: true,
            smartSpeed: 500,
            dots: true,
            loop: true,
            nav: true,
        });

        // Attractions carousel
        $(".blog-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            center: false,
            dots: false,
            loop: true,
            margin: 25,
            nav: true,
            navText: [
                '<i class="fa fa-angle-right"></i>',
                '<i class="fa fa-angle-left"></i>'
            ],
            responsiveClass: true,
            responsive: {
                0: { items: 1 },
                576: { items: 1 },
                768: { items: 2 },
                992: { items: 2 },
                1200: { items: 3 }
            }
        });

        // Testimonial carousel
        $(".testimonial-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            center: false,
            dots: true,
            loop: true,
            margin: 25,
            nav: true,
            navText: [
                '<i class="fa fa-angle-right"></i>',
                '<i class="fa fa-angle-left"></i>'
            ],
            responsiveClass: true,
            responsive: {
                0: { items: 1 },
                576: { items: 1 },
                768: { items: 2 },
                992: { items: 2 },
                1200: { items: 3 }
            }
        });

        // Facts counter
        $('[data-toggle="counter-up"]').counterUp({
            delay: 5,
            time: 2000
        });

        // Back to top button
        $(window).scroll(function () {
            if ($(this).scrollTop() > 200) {
                $('.back-to-top').fadeIn('slow');
            } else {
                $('.back-to-top').fadeOut('slow');
            }
        });
        $('.back-to-top').click(function () {
            $('html, body').animate({ scrollTop: 0 }, 1000, 'easeInOutExpo');
            return false;
        });
    });
})(jQuery);
