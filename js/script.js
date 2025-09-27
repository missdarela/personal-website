document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');
    
    hamburger.addEventListener('click', () => {
        // Toggle mobile menu
        navLinks.classList.toggle('active');
        
        // Animate hamburger to X
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when a nav link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Parallax scroll system removed

    // Scroll-triggered reveal animations with Intersection Observer
    const initScrollReveal = () => {
        const revealElements = document.querySelectorAll('.project-card, .skill-item, .stat-item, .about-text, .contact-info, .section-title, .hero-content, .hero-image, .footer-content');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                        entry.target.classList.add('revealed');
                    }, index * 150);
                    
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Initialize elements
        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px) scale(0.9)';
            element.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            revealObserver.observe(element);
        });
    };

    // Mouse parallax removed

    // Initialize non-parallax effects only
    initScrollReveal();

    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === current) {
                item.classList.add('active');
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Animate elements on scroll using Intersection Observer
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Add animation classes to elements
    const addAnimationClasses = () => {
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            const sectionChildren = section.children;
            Array.from(sectionChildren).forEach((child, childIndex) => {
                if (child.classList.contains('container')) {
                    const containerChildren = child.children;
                    Array.from(containerChildren).forEach((containerChild, containerChildIndex) => {
                        containerChild.classList.add('animate-on-scroll');
                        containerChild.style.animationDelay = `${(childIndex * 0.1) + (containerChildIndex * 0.1)}s`;
                    });
                } else if (!child.classList.contains('section-title')) {
                    child.classList.add('animate-on-scroll');
                    child.style.animationDelay = `${index * 0.1}s`;
                }
            });
        });
    };
    
    // Initialize animations
    addAnimationClasses();
    animateOnScroll();
    
    // Add animation for skills bars
    const animateSkills = () => {
        const skillBars = document.querySelectorAll('.skill-level');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.width = entry.target.parentElement.previousElementSibling.textContent;
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.transition = 'width 1.5s ease-in-out';
                observer.observe(bar);
            }, 100);
        });
    };
    
    // Initialize skill animations
    animateSkills();
    
    // Enhanced scroll reveal animation with staggered effects
    const scrollReveal = () => {
        const revealElements = document.querySelectorAll('.reveal, .project-card, .skill-item, .stat-item');
        
        const revealOnScroll = () => {
            revealElements.forEach((element, index) => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 100;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    setTimeout(() => {
                        element.classList.add('active');
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0) scale(1)';
                    }, index * 100); // Staggered animation
                }
            });
        };
        
        // Initialize elements with hidden state
        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px) scale(0.95)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Check on page load
    };
    
    // Remove legacy scrollReveal (was duplicate) – using initScrollReveal instead
    
    // Add animation for project cards on hover
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
            card.style.boxShadow = `${-angleY}px ${angleX}px 30px rgba(0, 0, 0, 0.1)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // Add animation for the hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }

    // Parallax effects removed
    
    // Add animation for section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });
        
        observer.observe(title);
    });

    // Advanced parallax background effect removed

    // Floating animation for elements
    const addFloatingAnimation = () => {
        const floatingElements = document.querySelectorAll('.tech-tag, .profile-image');
        
        floatingElements.forEach((element, index) => {
            element.style.animation = `float ${3 + (index % 3)}s ease-in-out infinite`;
            element.style.animationDelay = `${index * 0.2}s`;
        });
    };

    // Initialize visual effects
    addFloatingAnimation();
    // Advanced floating animations
    const initFloatingEffects = () => {
        const floatingElements = document.querySelectorAll('.tech-tag, .profile-image, .project-card img');
        
        floatingElements.forEach((element, index) => {
            const delay = index * 0.3;
            const duration = 4 + (index % 3);
            
            element.style.animation = `float ${duration}s ease-in-out infinite`;
            element.style.animationDelay = `${delay}s`;
        });
    };

    // Scroll-based background color transitions
    const initScrollColorTransitions = () => {
        const sections = document.querySelectorAll('section');
        
        const handleColorTransition = () => {
            const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
            
            // Subtle background color shift based on scroll
            const hue = 320 + (scrollPercent * 40); // Pink to purple range
            document.body.style.background = `linear-gradient(135deg, hsl(${hue}, 20%, 98%) 0%, hsl(${hue + 10}, 25%, 95%) 100%)`;
        };

        let colorTicking = false;
        window.addEventListener('scroll', () => {
            if (!colorTicking) {
                requestAnimationFrame(() => {
                    handleColorTransition();
                    colorTicking = false;
                });
                colorTicking = true;
            }
        }, { passive: true });
    };

    // Initialize advanced effects
    initFloatingEffects();
    initScrollColorTransitions();
});

// Enhanced CSS animations
const advancedStyle = document.createElement('style');
advancedStyle.textContent = `
    @keyframes float {
        0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
        }
        25% { 
            transform: translateY(-8px) rotate(0.5deg) scale(1.02); 
        }
        50% { 
            transform: translateY(-15px) rotate(-0.5deg) scale(1.01); 
        }
        75% { 
            transform: translateY(-5px) rotate(0.3deg) scale(1.02); 
        }
    }
    
    @keyframes parallaxFade {
        0% {
            opacity: 0;
            transform: translateY(60px) scale(0.8);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    .revealed {
        animation: parallaxFade 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }
    
    .parallax-element {
        will-change: transform;
        backface-visibility: hidden;
        perspective: 1000px;
    }
    
    .hero-content, .hero-image {
        transition: transform 0.1s ease-out;
    }
    
    @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(advancedStyle);

// Add loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    document.body.style.overflow = 'auto';
});
