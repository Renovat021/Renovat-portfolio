/* ==========================================================================
   RENOVAT ISEZERANO BAYAVUGE - INTERACTIVE PORTFOLIO SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. THEME TOGGLE SYSTEM (Deep Emerald Night / Warm Cream Light)
    // ----------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const htmlElement = document.documentElement;

    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('renovat_portfolio_theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('renovat_portfolio_theme', newTheme);
        });
    }

    // ----------------------------------------------------------------------
    // 2. STICKY NAVBAR & ACTIVE SECTION HIGHLIGHTER
    // ----------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar blur on scroll
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (scrollY > 400) {
            backToTopBtn?.classList.add('visible');
        } else {
            backToTopBtn?.classList.remove('visible');
        }

        // Active link highlighting
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ----------------------------------------------------------------------
    // 3. MOBILE HAMBURGER MENU
    // ----------------------------------------------------------------------
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');

    hamburgerBtn?.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // ----------------------------------------------------------------------
    // 4. TYPEWRITER EFFECT FOR HERO TAGLINE
    // ----------------------------------------------------------------------
    const typewriterElement = document.getElementById('typewriter');
    const phrases = [
        "7th-Semester IT Student @ AUCA",
        "A2SV Scholar (Jan 2026)",
        "Python Developer (89/100)",
        "120+ LeetCode Solved",
        "Aspiring Back-End Developer & AI Enthusiast"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeWriter() {
        if (!typewriterElement) return;

        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 90;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    typeWriter();

    // ----------------------------------------------------------------------
    // 5. INTERACTIVE IDE TERMINAL & BASH CONSOLE
    // ----------------------------------------------------------------------
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(`tab-${targetTab}`)?.classList.add('active');
        });
    });

    // Copy Code Button
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    copyCodeBtn?.addEventListener('click', () => {
        const activeTabContent = document.querySelector('.tab-content.active pre');
        if (activeTabContent) {
            navigator.clipboard.writeText(activeTabContent.innerText).then(() => {
                const originalHTML = copyCodeBtn.innerHTML;
                copyCodeBtn.innerHTML = '<i class="fa-solid fa-check text-emerald"></i>';
                setTimeout(() => {
                    copyCodeBtn.innerHTML = originalHTML;
                }, 2000);
            });
        }
    });

    // Interactive Terminal Logic
    const consoleInput = document.getElementById('consoleInput');
    const consoleOutput = document.getElementById('consoleOutput');
    const cmdPills = document.querySelectorAll('.cmd-pill');

    const commands = {
        help: "Available commands: <span class='highlight'>about</span>, <span class='highlight'>a2sv</span>, <span class='highlight'>skills</span>, <span class='highlight'>projects</span>, <span class='highlight'>education</span>, <span class='highlight'>contact</span>, <span class='highlight'>clear</span>",
        about: "Renovat Isezerano Bayavuge — 7th Semester IT Student at AUCA & A2SV Scholar. Focused on Back-End Dev & AI.",
        a2sv: "A2SV (Africa to Silicon Valley) Scholar — Joined Jan 2026. Intensive software engineering & algorithms program targeting top global tech opportunities (Google, Amazon, Bloomberg).",
        skills: "Languages: Python (89%), Java, JavaScript, C | Databases: MySQL, Oracle | Problem Solving: 120+ LeetCode solved.",
        projects: "5 Featured Projects: 1. Lost and Found Portal | 2. GoRent Car Rental | 3. AI Code Inspector | 4. AlgoVisualizer | 5. Smart Campus Portal",
        education: "AUCA (BSc IT 2024-2027, 7th Sem) | Ecole des Sciences de Nyamagabe (MCB) | Petit Séminaire Gikongoro",
        contact: "Phone: +250 789 610 141 | Email: renovatisezerano@gmail.com | Location: Kigali, Rwanda",
        clear: "CLEAR"
    };

    function executeCommand(cmdText) {
        if (!consoleOutput) return;

        const trimmed = cmdText.trim().toLowerCase();
        
        if (trimmed === 'clear') {
            consoleOutput.innerHTML = `
                <div class="log-line text-muted">Renovat OS v2.4 (x86_64-auca-rwanda)</div>
                <div class="log-line">Console cleared. Type <span class="highlight">help</span> for commands.</div>
            `;
            return;
        }

        // Echo prompt
        const promptLine = document.createElement('div');
        promptLine.className = 'log-line';
        promptLine.innerHTML = `<span class="prompt-symbol">renovat@kigali:~$</span> ${cmdText}`;
        consoleOutput.appendChild(promptLine);

        // Result
        const responseLine = document.createElement('div');
        responseLine.className = 'log-line';
        if (commands[trimmed]) {
            responseLine.innerHTML = commands[trimmed];
        } else if (trimmed === '') {
            return;
        } else {
            responseLine.innerHTML = `Command not found: '<span class="text-muted">${cmdText}</span>'. Type <span class="highlight">help</span> for valid options.`;
        }
        consoleOutput.appendChild(responseLine);

        // Scroll to bottom
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    consoleInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            executeCommand(consoleInput.value);
            consoleInput.value = '';
        }
    });

    cmdPills.forEach(pill => {
        pill.addEventListener('click', () => {
            const cmd = pill.getAttribute('data-cmd');
            if (cmd) executeCommand(cmd);
        });
    });

    // ----------------------------------------------------------------------
    // 6. SKILLS FILTERING & ANIMATED PROGRESS BARS
    // ----------------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => { card.style.display = 'none'; }, 300);
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // 7. SCROLL REVEAL ANIMATIONS
    // ----------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Animate progress bars inside entry if any
                const progressFills = entry.target.querySelectorAll('.progress-bar-fill');
                progressFills.forEach(fill => {
                    const targetWidth = fill.style.width;
                    fill.style.width = '0%';
                    setTimeout(() => {
                        fill.style.width = targetWidth;
                    }, 200);
                });
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ----------------------------------------------------------------------
    // 8. MODAL SYSTEM (Projects & Resume Preview)
    // ----------------------------------------------------------------------
    const modalBackdrops = document.querySelectorAll('.modal-backdrop');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const openResumeBtns = [
        document.getElementById('openResumeModalBtn'),
        document.getElementById('heroResumeBtn')
    ];
    const closeModalBtns = document.querySelectorAll('.modal-close-btn, .modal-close-action');

    // Open project modal
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            if (modalId) {
                document.getElementById(modalId)?.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Open Resume Modal
    openResumeBtns.forEach(btn => {
        btn?.addEventListener('click', () => {
            document.getElementById('resumeModal')?.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close Modal
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modalBackdrops.forEach(mb => mb.classList.remove('active'));
            document.body.style.overflow = 'auto';
        });
    });

    modalBackdrops.forEach(backdrop => {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) {
                backdrop.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Print Resume Button
    const printResumeBtn = document.getElementById('printResumeBtn');
    printResumeBtn?.addEventListener('click', () => {
        window.print();
    });

    // ----------------------------------------------------------------------
    // 9. COPY TO CLIPBOARD FUNCTIONALITY
    // ----------------------------------------------------------------------
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const icon = btn.querySelector('i');
                    if (icon) {
                        icon.className = 'fa-solid fa-check text-emerald';
                        setTimeout(() => {
                            icon.className = 'fa-regular fa-copy';
                        }, 2000);
                    }
                });
            }
        });
    });

    // ----------------------------------------------------------------------
    // 10. CONTACT FORM HANDLING
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contactName')?.value;
        const email = document.getElementById('contactEmail')?.value;

        if (formStatus) {
            formStatus.className = 'form-status success';
            formStatus.innerHTML = `
                <i class="fa-solid fa-circle-check"></i> Thank you, <strong>${name}</strong>! Your message has been received. Renovat will get back to you shortly at <strong>${email}</strong>.
            `;

            contactForm.reset();

            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 6000);
        }
    });

    // Dynamic current year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});
