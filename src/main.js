/* ========================================
   NETWORKTH365 - MAIN JAVASCRIPT
   ========================================
   Table of Contents:
   1. DOM Elements & Selectors
   2. Utility Functions
   3. Navigation & Header
   4. Mobile Menu
   5. Smooth Scrolling
   6. Scroll Animations
   7. Statistics Counter
   8. Testimonials Slider
   9. Sticky Contact Widget
   10. Form Validation & Submission
   11. Initialization
   ======================================== */

// Wait for DOM to be fully loaded before running scripts
document.addEventListener("DOMContentLoaded", () => {
    /* ========================================
         1. DOM ELEMENTS & SELECTORS
         ========================================
         Cache DOM elements for better performance
      */
    const elements = {
        // Header & Navigation
        header: document.getElementById("header"),
        navMenu: document.getElementById("nav-menu"),
        navToggle: document.getElementById("nav-toggle"),
        navLinks: document.querySelectorAll(".nav-link"),

        // Testimonials
        testimonialsSlider: document.getElementById("testimonials-slider"),
        testimonialsPrev: document.getElementById("testimonials-prev"),
        testimonialsNext: document.getElementById("testimonials-next"),
        testimonialsDots: document.getElementById("testimonials-dots"),

        // Sticky Widget
        stickyWidget: document.getElementById("sticky-widget"),
        widgetToggle: document.getElementById("widget-toggle"),
        widgetContent: document.getElementById("widget-content"),
        widgetForm: document.getElementById("widget-form"),
        widgetSuccess: document.getElementById("widget-success"),

        // Contact Form
        contactForm: document.getElementById("contact-form"),
        formSuccess: document.getElementById("form-success"),

        // Animations
        animatedElements: document.querySelectorAll(".animate-on-scroll"),

        // Statistics
        statNumbers: document.querySelectorAll(".stat-item-number[data-count]"),

        // Footer
        currentYear: document.getElementById("current-year"),
    }

    /* ========================================
         2. UTILITY FUNCTIONS
         ======================================== */

    /**
     * Debounce function to limit how often a function fires
     * @param {Function} func - Function to debounce
     * @param {number} wait - Time to wait in milliseconds
     * @returns {Function} - Debounced function
     */
    function debounce(func, wait = 10) {
        let timeout
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout)
                func(...args)
            }
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
        }
    }

    /**
     * Throttle function to limit function calls to once per specified time
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function} - Throttled function
     */
    function throttle(func, limit = 100) {
        let inThrottle
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args)
                inThrottle = true
                setTimeout(() => (inThrottle = false), limit)
            }
        }
    }

    /**
     * Check if an element is in the viewport
     * @param {HTMLElement} element - Element to check
     * @param {number} offset - Offset from bottom of viewport (default: 100px)
     * @returns {boolean} - True if element is in viewport
     */
    function isInViewport(element, offset = 100) {
        const rect = element.getBoundingClientRect()
        return rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset
    }

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} - True if valid email format
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    /**
     * Validate phone number format (basic validation)
     * @param {string} phone - Phone number to validate
     * @returns {boolean} - True if valid phone format
     */
    function isValidPhone(phone) {
        // Remove all non-numeric characters
        const cleaned = phone.replace(/\D/g, "")
        // Check if it's between 10-15 digits
        return cleaned.length >= 10 && cleaned.length <= 15
    }

    /* ========================================
         3. NAVIGATION & HEADER
         ========================================
         Handle header scroll effects and active nav states
      */

    /**
     * Update header style on scroll
     * Adds 'is-scrolled' class when page is scrolled down
     */
    elements.header.classList.add("is-scrolled")

    function handleHeaderScroll() {
        // if (window.scrollY > 50) {
        //     elements.header.classList.add("is-scrolled")
        // } else {
        //     elements.header.classList.remove("is-scrolled")
        // }
    }

    /**
     * Update active navigation link based on scroll position
     */
    function updateActiveNavLink() {
        const sections = document.querySelectorAll("section[id]")
        const scrollPosition = window.scrollY + 100

        sections.forEach((section) => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.offsetHeight
            const sectionId = section.getAttribute("id")

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                elements.navLinks.forEach((link) => link.classList.remove("active"))

                // Add active class to corresponding link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)
                if (activeLink) {
                    activeLink.classList.add("active")
                }
            }
        })
    }

    /* ========================================
         4. MOBILE MENU
         ========================================
         Handle mobile navigation toggle
      */

    /**
     * Toggle mobile menu open/closed
     */
    function toggleMobileMenu() {
        const isOpen = elements.navMenu.classList.toggle("is-open")
        elements.navToggle.setAttribute("aria-expanded", isOpen)

        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? "hidden" : ""
    }

    /**
     * Close mobile menu
     */
    function closeMobileMenu() {
        elements.navMenu.classList.remove("is-open")
        elements.navToggle.setAttribute("aria-expanded", "false")
        document.body.style.overflow = ""
    }

    /* ========================================
         5. SMOOTH SCROLLING
         ========================================
         Handle smooth scroll to anchor links
      */

    /**
     * Smooth scroll to target element
     * @param {string} targetId - ID of target element (with #)
     */
    function smoothScrollTo(targetId) {
        const target = document.querySelector(targetId)
        if (target) {
            const headerHeight = elements.header.offsetHeight
            const targetPosition = target.offsetTop - headerHeight

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            })
        }
    }

    /**
     * Handle click on navigation links
     * @param {Event} e - Click event
     */
    function handleNavClick(e) {
        const href = e.currentTarget.getAttribute("href")

        if (href.startsWith("#")) {
            e.preventDefault()
            smoothScrollTo(href)
            closeMobileMenu()
        }
    }

    /* ========================================
         6. SCROLL ANIMATIONS
         ========================================
         Trigger animations when elements enter viewport
      */

    /**
     * Check and trigger animations for elements in viewport
     */
    function handleScrollAnimations() {
        elements.animatedElements.forEach((element) => {
            if (isInViewport(element) && !element.classList.contains("is-visible")) {
                element.classList.add("is-visible")
            }
        })
    }

    /* ========================================
         7. STATISTICS COUNTER
         ========================================
         Animate counting numbers when stats section is visible
      */

    let statsAnimated = false

    /**
     * Animate a number from 0 to target value
     * @param {HTMLElement} element - Element containing the number
     * @param {number} target - Target number to count to
     * @param {number} duration - Animation duration in milliseconds
     */
    function animateNumber(element, target, duration = 2000) {
        let start = 0
        const increment = target / (duration / 16) // 60fps

        function updateNumber() {
            start += increment
            if (start < target) {
                element.textContent = Math.floor(start)
                requestAnimationFrame(updateNumber)
            } else {
                element.textContent = target
            }
        }

        requestAnimationFrame(updateNumber)
    }

    /**
     * Check if stats section is visible and trigger counter animation
     */
    function handleStatsAnimation() {
        if (statsAnimated) return

        const statsSection = document.querySelector(".stats")
        if (statsSection && isInViewport(statsSection)) {
            statsAnimated = true

            elements.statNumbers.forEach((stat) => {
                const target = Number.parseInt(stat.dataset.count, 10)
                animateNumber(stat, target)
            })
        }
    }

    /* ========================================
         8. TESTIMONIALS SLIDER
         ========================================
         Simple testimonial carousel functionality
      */

    let currentTestimonial = 0
    const testimonialCards = document.querySelectorAll(".testimonial-card")
    const testimonialDots = elements.testimonialsDots
        ? elements.testimonialsDots.querySelectorAll(".testimonials-dot")
        : []

    /**
     * Update testimonial slider to show specific slide
     * @param {number} index - Index of slide to show
     */
    function goToTestimonial(index) {
        // Handle index boundaries
        if (index < 0) index = testimonialCards.length - 1
        if (index >= testimonialCards.length) index = 0

        currentTestimonial = index

        // Update dots
        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index)
        })

        // On mobile, scroll to the testimonial (simplified approach)
        // In a full implementation, you might use transform or scroll snap
        if (window.innerWidth <= 768 && testimonialCards[index]) {
            testimonialCards[index].scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
            })
        }
    }

    /**
     * Go to next testimonial
     */
    function nextTestimonial() {
        goToTestimonial(currentTestimonial + 1)
    }

    /**
     * Go to previous testimonial
     */
    function prevTestimonial() {
        goToTestimonial(currentTestimonial - 1)
    }

    /* ========================================
         9. STICKY CONTACT WIDGET
         ========================================
         Handle sticky widget toggle and form
      */

    /**
     * Toggle sticky widget open/closed
     */
    function toggleStickyWidget() {
        const isOpen = elements.stickyWidget.classList.toggle("is-open")
        elements.widgetToggle.setAttribute("aria-expanded", isOpen)
    }

    /**
     * Close sticky widget when clicking outside
     * @param {Event} e - Click event
     */
    function handleWidgetClickOutside(e) {
        if (elements.stickyWidget.classList.contains("is-open") && !elements.stickyWidget.contains(e.target)) {
            elements.stickyWidget.classList.remove("is-open")
            elements.widgetToggle.setAttribute("aria-expanded", "false")
        }
    }

    /* ========================================
         10. FORM VALIDATION & SUBMISSION
         ========================================
         Handle form validation and submission
      */

    /**
     * Validate form fields
     * @param {HTMLFormElement} form - Form to validate
     * @returns {boolean} - True if form is valid
     */
    function validateForm(form) {
        let isValid = true
        const requiredFields = form.querySelectorAll("[required]")

        requiredFields.forEach((field) => {
            const errorElement = document.getElementById(`${field.name}-error`)
            let fieldValid = true
            let errorMessage = ""

            // Check if field is empty
            if (!field.value.trim()) {
                fieldValid = false
                errorMessage = "This field is required"
            }
            // Email validation
            else if (field.type === "email" && !isValidEmail(field.value)) {
                fieldValid = false
                errorMessage = "Please enter a valid email address"
            }
            // Phone validation
            else if (field.type === "tel" && !isValidPhone(field.value)) {
                fieldValid = false
                errorMessage = "Please enter a valid phone number"
            }

            // Update field styling
            if (!fieldValid) {
                isValid = false
                field.style.borderColor = "var(--color-error)"
                if (errorElement) {
                    errorElement.textContent = errorMessage
                }
            } else {
                field.style.borderColor = ""
                if (errorElement) {
                    errorElement.textContent = ""
                }
            }
        })

        return isValid
    }

    /**
     * Handle contact form submission
     * @param {Event} e - Submit event
     */
    function handleContactFormSubmit(e) {
        e.preventDefault()

        if (!validateForm(elements.contactForm)) {
            return
        }

        // Get submit button
        const submitBtn = elements.contactForm.querySelector('button[type="submit"]')

        // Show loading state
        submitBtn.classList.add("is-loading")
        submitBtn.disabled = true

        // Simulate form submission (replace with actual form handling)
        // In production, you would send data to your server or a service like Formspree
        setTimeout(() => {
            // Hide loading state
            submitBtn.classList.remove("is-loading")
            submitBtn.disabled = false


            //TODO: add actual submit func here (formspree or an email handler)
            // Show success message

            var name = document.getElementById("contact-name").value
            var email = document.getElementById("contact-email").value
            var phone = document.getElementById("contact-phone").value
            var service = document.getElementById(document.getElementById("contact-service").value+"-opt").innerText
            var message = document.getElementById("contact-message").value

            phone = `(${phone.substring(0,3)}) ${phone.substring(3,6)}-${phone.substring(6)}`;

            const body = `Hi Nish,%0D%0AI am writing to ask you about ${service}.%0D%0AHere's my message:
            %0D%0A${message}
            %0D%0A%0D%0A–${name} [${email}; ${phone}]`

            // location.href = `mailto:networkth365@gmail.com?subject=${subject}&body=${body}`;
            window.open(`mailto:networkth365@gmail.com?subject=Message%20From%20Networkth365%20Homepage&body=${body}`, "_blank")
            
            elements.formSuccess.classList.add("is-visible")

            // Reset form
            elements.contactForm.reset()

            // Hide success message after 5 seconds
            setTimeout(() => {
                elements.formSuccess.classList.remove("is-visible")
            }, 5000)
        }, 1500)
    }

    /**
     * Handle widget form submission
     * @param {Event} e - Submit event
     */
    //TODO: same as above
    function handleWidgetFormSubmit(e) {
        e.preventDefault()

        // Basic validation
        const fields = elements.widgetForm.querySelectorAll("input[required]")
        let isValid = true

        fields.forEach((field) => {
            if (!field.value.trim()) {
                isValid = false
                field.style.borderColor = "var(--color-error)"
            } else {
                field.style.borderColor = ""
            }
        })

        if (!isValid) return

        // Get submit button
        const submitBtn = elements.widgetForm.querySelector('button[type="submit"]')

        // Show loading state
        submitBtn.classList.add("is-loading")
        submitBtn.disabled = true

        // Simulate form submission
        setTimeout(() => {
            // Hide loading state
            submitBtn.classList.remove("is-loading")
            submitBtn.disabled = false

            // Show success message
            elements.widgetSuccess.classList.add("is-visible")

            // Reset form
            elements.widgetForm.reset()

            // Reset and close widget after delay
            setTimeout(() => {
                elements.widgetSuccess.classList.remove("is-visible")
                elements.stickyWidget.classList.remove("is-open")
            }, 3000)
        }, 1500)
    }

    /**
     * Clear field error on input
     * @param {Event} e - Input event
     */
    function clearFieldError(e) {
        const field = e.target
        const errorElement = document.getElementById(`${field.name}-error`)

        field.style.borderColor = ""
        if (errorElement) {
            errorElement.textContent = ""
        }
    }

    /* ========================================
         11. INITIALIZATION
         ========================================
         Set up event listeners and initialize components
      */

    /**
     * Initialize all event listeners
     */
    function initEventListeners() {
        // Scroll events (throttled for performance)
        window.addEventListener(
            "scroll",
            throttle(() => {
                handleHeaderScroll()
                updateActiveNavLink()
                handleScrollAnimations()
                handleStatsAnimation()
            }, 100),
        )

        // Mobile menu toggle
        if (elements.navToggle) {
            elements.navToggle.addEventListener("click", toggleMobileMenu)
        }

        // Navigation links
        elements.navLinks.forEach((link) => {
            link.addEventListener("click", handleNavClick)
        })

        // All anchor links with hash
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", function (e) {
                const href = this.getAttribute("href")
                if (href !== "#") {
                    e.preventDefault()
                    smoothScrollTo(href)
                }
            })
        })

        // Testimonials navigation
        if (elements.testimonialsPrev) {
            elements.testimonialsPrev.addEventListener("click", prevTestimonial)
        }
        if (elements.testimonialsNext) {
            elements.testimonialsNext.addEventListener("click", nextTestimonial)
        }

        // Testimonial dots
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener("click", () => goToTestimonial(index))
        })

        // Sticky widget
        if (elements.widgetToggle) {
            elements.widgetToggle.addEventListener("click", toggleStickyWidget)
        }
        document.addEventListener("click", handleWidgetClickOutside)

        // Contact form
        if (elements.contactForm) {
            elements.contactForm.addEventListener("submit", handleContactFormSubmit)

            // Clear errors on input
            elements.contactForm.querySelectorAll("input, textarea").forEach((field) => {
                field.addEventListener("input", clearFieldError)
            })
        }

        // Widget form
        if (elements.widgetForm) {
            elements.widgetForm.addEventListener("submit", handleWidgetFormSubmit)
        }

        // Close mobile menu on resize to desktop
        window.addEventListener(
            "resize",
            debounce(() => {
                if (window.innerWidth > 768) {
                    closeMobileMenu()
                }
            }, 250),
        )

        // Close mobile menu on escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                closeMobileMenu()
                if (elements.stickyWidget.classList.contains("is-open")) {
                    elements.stickyWidget.classList.remove("is-open")
                    elements.widgetToggle.setAttribute("aria-expanded", "false")
                }
            }
        })
    }

    /**
     * Initialize the application
     */
    function init() {
        // Set current year in footer
        if (elements.currentYear) {
            elements.currentYear.textContent = new Date().getFullYear()
        }

        // Run initial checks
        handleHeaderScroll()
        handleScrollAnimations()

        // Initialize event listeners
        initEventListeners()

        // Log initialization (remove in production)
        console.log("Networkth365 website initialized successfully!")
    }

    // Start the application
    init()
})
