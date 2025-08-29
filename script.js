document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = '#1f2937';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = '#1f2937;'
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Tariff Calculator
    const carTypeSelect = document.getElementById('carType');
    const dutyHoursSelect = document.getElementById('dutyHours');
    const daysPerMonthSlider = document.getElementById('daysPerMonth');
    const daysValueDisplay = document.getElementById('daysValue');
    const calculateBtn = document.getElementById('calculateBtn');
    const calculatedPriceDisplay = document.getElementById('calculatedPrice');

    // Base prices and hour multipliers
    const basePrices = {
        hatchback: 800,
        suv: 1000,
        sedan: 900,
        luxury: 1200
    };
    const hourMultipliers = {
        8: 1.0,
        10: 1.2,
        12: 1.4
    };

    function calculatePrice() {
        if (carTypeSelect && dutyHoursSelect && daysPerMonthSlider && calculatedPriceDisplay) {
            const carType = carTypeSelect.value;
            const dutyHours = parseInt(dutyHoursSelect.value) || 8;
            const days = parseInt(daysPerMonthSlider.value) || 1;

            const basePrice = basePrices[carType] || 800;
            const hourMultiplier = hourMultipliers[dutyHours] || 1.0;
            const monthlyPrice = Math.round(basePrice * hourMultiplier * days);

            calculatedPriceDisplay.textContent = `₹${monthlyPrice.toLocaleString('en-IN')}`;
        }
    }

    if (daysPerMonthSlider && daysValueDisplay) {
        daysPerMonthSlider.addEventListener('input', () => {
            daysValueDisplay.textContent = `${daysPerMonthSlider.value} days`;
            calculatePrice();
        });
    }

    if (carTypeSelect) carTypeSelect.addEventListener('change', calculatePrice);
    if (dutyHoursSelect) dutyHoursSelect.addEventListener('change', calculatePrice);
    if (daysPerMonthSlider) daysPerMonthSlider.addEventListener('input', calculatePrice);
    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            calculateBtn.textContent = 'Calculating...';
            calculateBtn.classList.add('loading');

            setTimeout(() => {
                calculateBtn.textContent = 'Calculate & Book Your Driver';
                calculateBtn.classList.remove('loading');
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 1000);
        });
    }

    // Initialize calculator if elements exist
    calculatePrice();

    // FAQ Accordion
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        }
    });

    

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // Scroll animations for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.benefit-card, .service-card, .step, .timeline-item, .testimonial-card').forEach(el => {
        observer.observe(el);
    });

    // Phone and email links
    document.querySelectorAll('.contact-item p').forEach(element => {
        if (element.textContent.includes('+91 7892 409 325')) {
            element.innerHTML = element.innerHTML.replace(
                '+91 7892 409 325',
                '<a href="tel:+917892409325" style="color: inherit; text-decoration: none;">+91 7892 409 325</a>'
            );
        }
        if (element.textContent.includes('quickdriverservice8002@gmail.com')) {
            element.innerHTML = element.innerHTML.replace(
                'quickdriverservice8002@gmail.com',
                '<a href="mailto:quickdriverservice8002@gmail.com" style="color: inherit; text-decoration: none;">quickdriverservice8002@gmail.com</a>'
            );
        }
    });

    // Counter animation for stats
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current.toLocaleString('en-IN') + '+';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                if (entry.target.textContent.includes('8,000')) {
                    animateCounter(entry.target, 0, 8000, 2000);
                } else if (entry.target.textContent.includes('10,000')) {
                    animateCounter(entry.target, 0, 10000, 2000);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat span').forEach(stat => {
        statsObserver.observe(stat);
    });

    // CTA button loading animation
    document.querySelectorAll('.cta-primary').forEach(button => {
        button.setAttribute('data-original-text', button.textContent);
        button.addEventListener('click', function(e) {
            if (this.href && this.href.includes('#contact')) {
                e.preventDefault();
                this.classList.add('loading');
                this.textContent = 'Loading...';

                setTimeout(() => {
                    this.classList.remove('loading');
                    this.textContent = this.getAttribute('data-original-text');
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 1000);
            }
        });
    });

    // Scroll-to-top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
        font-size: 1.5rem;
    `;
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Hero title typing animation
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid white';

        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                heroTitle.style.borderRight = 'none';
            }
        }
        setTimeout(typeWriter, 1000);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const stepCards = document.querySelectorAll('.step-card');
    const progressBar = document.querySelector('.progress-bar');
    const stepsContainer = document.querySelector('.steps-container');

    if (!stepCards.length || !progressBar || !stepsContainer) {
        console.warn('Required elements (.step-card, .progress-bar, or .steps-container) not found.');
        return;
    }

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stepCards.forEach((card, index) => {
        observer.observe(card);
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Progress bar animation
    window.addEventListener('scroll', () => {
        const containerRect = stepsContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;

        if (containerTop < windowHeight && containerTop + containerHeight > 0) {
            const scrollProgress = Math.min(
                (windowHeight - containerTop) / containerHeight,
                1
            );
            progressBar.style.width = `${scrollProgress * 100}%`;
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    if (!testimonialCards.length) {
        console.warn('No .testimonial-card elements found in the DOM.');
        return;
    }

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    testimonialCards.forEach((card, index) => {
        observer.observe(card);
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});