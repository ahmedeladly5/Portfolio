
document.addEventListener("DOMContentLoaded", function () {


    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const typingRole = document.getElementById("typing-role");
    const progressBar = document.querySelector(".scroll-progress");
    const topButton = document.querySelector(".back-to-top");

    const navItems = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("main section[id]");



    if (typingRole) {

        const roles = [
            "Junior Structural BIM Engineer",
            "BIM Coordination Enthusiast",
            "Planning & Scheduling Enthusiast",
            "Construction Management Enthusiast"
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {

            const currentRole = roles[roleIndex];

            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            typingRole.textContent =
                currentRole.substring(0, charIndex);

            let delay = isDeleting ? 45 : 90;

            if (!isDeleting && charIndex === currentRole.length) {

                delay = 1500;
                isDeleting = true;

            } else if (isDeleting && charIndex === 0) {

                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                delay = 400;

            }

            setTimeout(typeEffect, delay);
        }

        typeEffect();
    }



    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("open");

            const isOpen = navLinks.classList.contains("open");

            menuToggle.textContent = isOpen ? "✕" : "☰";

            menuToggle.setAttribute("aria-expanded", isOpen);

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

        });

        navItems.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("open");

                menuToggle.textContent = "☰";

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

            });

        });
    }



    const revealElements = document.querySelectorAll(
        ".section-heading, .about-image-container, " +
        ".about-content, .overview-card, .skill-card, .project-card, " +
        ".education-card, .course-card, " +
        ".other-skills, .contact-container"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {

            element.classList.add("reveal");
            revealObserver.observe(element);

        });

    }



    function updateActiveNavigation() {

        let currentSection = "home";

        sections.forEach(function (section) {

            const sectionTop =
                section.getBoundingClientRect().top + window.scrollY - 160;

            if (window.scrollY >= sectionTop) {

                currentSection = section.id;

            }

        });

        navItems.forEach(function (link) {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {

                link.classList.add("active");

            }

        });
    }



    function updateProgressBar() {

        if (!progressBar) return;

        const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        if (totalHeight <= 0) {

            progressBar.style.width = "0%";
            return;

        }

        const progress =
            (window.scrollY / totalHeight) * 100;

        progressBar.style.width = progress + "%";

    }



    if (topButton) {

        topButton.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }



    let isScrolling = false;

    function handleScroll() {

        if (isScrolling) return;

        isScrolling = true;

        window.requestAnimationFrame(function () {

            updateActiveNavigation();
            updateProgressBar();

            if (topButton) {

                topButton.classList.toggle(
                    "show",
                    window.scrollY > 350
                );

            }

            isScrolling = false;

        });

    }

    window.addEventListener("scroll", handleScroll, {
        passive: true
    });



    const currentYear = document.getElementById("current-year");

    if (currentYear) {

        currentYear.textContent = new Date().getFullYear();

    }



    updateActiveNavigation();
    updateProgressBar();



    console.log("Ahmed El-Adly Portfolio Loaded Successfully!");


const conceptHeading = document.getElementById("concept-heading");

const conceptWords = [
    "Software & Tools",
    "BIM Coordination",
    "Planning & Scheduling",
    "Problem Solving"
];

let conceptIndex = 0;
let charIndex = 0;
let deleting = false;

function animateConcepts() {
    if (!conceptHeading) return;

    const currentWord = conceptWords[conceptIndex];

    if (!deleting) {
        conceptHeading.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;
            setTimeout(animateConcepts, 1200);
            return;
        }
    } else {
        conceptHeading.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            conceptIndex = (conceptIndex + 1) % conceptWords.length;
        }
    }

    setTimeout(animateConcepts, deleting ? 50 : 100);
}

animateConcepts();

    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");
        const submitBtn = document.getElementById("submit-btn");
        const formStatus = document.getElementById("form-status");

        contactForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const name = nameInput ? nameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const message = messageInput ? messageInput.value.trim() : "";

            if (!name || !email || !message) {
                if (formStatus) {
                    formStatus.textContent = "Please fill in all fields.";
                    formStatus.className = "form-status error";
                }
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                if (formStatus) {
                    formStatus.textContent = "Please enter a valid email address.";
                    formStatus.className = "form-status error";
                }
                return;
            }

            if (formStatus) {
                formStatus.textContent = "";
                formStatus.className = "form-status";
            }

            const originalBtnText = submitBtn ? submitBtn.textContent : "Send Message";
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Sending...";
            }

            try {
                const response = await fetch("https://formsubmit.co/ajax/ahmed.eladly53a@gmail.com", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message,
                        _subject: "New Message from " + name + " via Portfolio",
                        _captcha: "false"
                    })
                });

                const data = await response.json();

                if (response.ok && (data.success === "true" || data.success === true)) {
                    if (formStatus) {
                        formStatus.textContent = "Thank you! Your message has been sent successfully.";
                        formStatus.className = "form-status success";
                    }
                    contactForm.reset();
                } else if (data.message) {
                    if (formStatus) {
                        formStatus.textContent = data.message;
                        formStatus.className = "form-status " + (data.success === "true" || data.success === true ? "success" : "error");
                    }
                } else {
                    if (formStatus) {
                        formStatus.textContent = "Submission failed. Please try again later.";
                        formStatus.className = "form-status error";
                    }
                }
            } catch (err) {
                if (formStatus) {
                    formStatus.textContent = "Failed to send message. Please check your internet connection.";
                    formStatus.className = "form-status error";
                }
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                }
            }
        });
    }

});


/* ===== Added: project filters, project details and certificate modals ===== */
document.addEventListener("DOMContentLoaded", function () {

    /* Edit the text below to change what shows in each project popup.
       "images" = how many pictures are in images/projects/<id>/ (named 1.jpg, 2.jpg ...).
       Certificates: images/certificates/<id>/1.jpg ... and data-count="N" on the course card in index.html. */
    const PROJECTS = {
        "graduation": {
            "images": 14,
            "meta": "Bani Mazar, El Minya, Egypt · Graduation Project",
            "title": "Bani Mazar Hospital",
            "role": [
                "Team leader",
                "Created project scheduling with Primavera P6 and Excel",
                "Prepared/reviewed shop drawings, model and material submittals",
                "QS with AutoCAD and Revit",
                "Cost estimation, pricing and cashflow",
                "Clash detection with Navisworks; collaboration via ACC",
                "4D and 5D simulation with Navisworks",
                "6D with Autodesk Forma"
            ],
            "software": [
                "AutoCAD",
                "Primavera P6",
                "Revit",
                "ACC",
                "Dynamo",
                "Navisworks",
                "Notepad++",
                "Primavera Risk Analysis",
                "Autodesk Forma",
                "Excel"
            ]
        },
        "marble-factory": {
            "images": 7,
            "meta": "Cairo, Egypt",
            "title": "Marble Factory",
            "role": [
                "Prepared/reviewed shop drawings, model and material submittals"
            ],
            "software": [
                "Revit",
                "Dynamo",
                "ACC"
            ]
        },
        "villa-shopdrawings": {
            "images": 8,
            "meta": "Cairo, Egypt",
            "title": "Villa Shopdrawings",
            "role": [
                "Prepared/reviewed shop drawings and model",
                "Reinforcement modeling and detailing"
            ],
            "software": [
                "Revit",
                "Dynamo",
                "ACC"
            ]
        },
        "kaitech-school": {
            "images": 17,
            "meta": "Cairo, Egypt",
            "title": "Kaitech School",
            "role": [
                "Prepared/reviewed shop drawings, model and material submittals",
                "QS with Revit",
                "Clash detection with Navisworks; collaboration via ACC",
                "4D and 5D simulation with Navisworks",
                "6D with Autodesk Forma",
                "7D with COBie",
                "VR and AR with Lumion and Augin"
            ],
            "software": [
                "Revit",
                "ACC",
                "Dynamo",
                "Navisworks",
                "Notepad++",
                "Autodesk Forma",
                "Lumion",
                "Augin",
                "Excel"
            ]
        },
        "jubailah-oasis": {
            "images": 8,
            "meta": "Al-Riyadh, KSA",
            "title": "Al-Jubailah Oasis",
            "role": [
                "Ground floor beams reinforcement modeling and detailing"
            ],
            "software": [
                "Revit",
                "Dynamo"
            ]
        }
    };

    const body = document.body;
    let lastFocus = null;

    /* ---- helpers ---- */
    function openModal(modal) {
        lastFocus = document.activeElement;
        modal.hidden = false;
        body.classList.add("modal-open");
        const btn = modal.querySelector(".modal-close");
        if (btn) btn.focus();
    }

    function closeModal(modal) {
        modal.hidden = true;
        if (document.querySelectorAll(".modal:not([hidden])").length === 0) {
            body.classList.remove("modal-open");
        }
        if (lastFocus && modal.id === "project-modal") lastFocus.focus();
    }

    function fillList(ul, items) {
        ul.innerHTML = "";
        items.forEach(function (t) {
            const li = document.createElement("li");
            li.textContent = t;
            ul.appendChild(li);
        });
    }

    const projectModal = document.getElementById("project-modal");
    const certModal = document.getElementById("cert-modal");
    if (!projectModal || !certModal) return;

    [projectModal, certModal].forEach(function (m) {
        m.querySelectorAll("[data-close]").forEach(function (el) {
            el.addEventListener("click", function () { closeModal(m); });
        });
    });

    document.addEventListener("keydown", function (e) {
        if (e.key !== "Escape") return;
        if (!certModal.hidden) closeModal(certModal);
        else if (!projectModal.hidden) closeModal(projectModal);
    });

    /* ---- image / certificate viewer ---- */
    function showImages(title, srcs) {
        document.getElementById("cm-title").textContent = title;
        const holder = document.getElementById("cm-body");
        holder.innerHTML = "";
        if (srcs.length) {
            srcs.forEach(function (src, i) {
                const img = document.createElement("img");
                img.src = src;
                img.alt = title + (srcs.length > 1 ? " " + (i + 1) : "");
                holder.appendChild(img);
            });
        } else {
            const p = document.createElement("p");
            p.textContent = "Certificate image will be added soon.";
            holder.appendChild(p);
        }
        certModal.querySelector(".modal-panel").scrollTop = 0;
        openModal(certModal);
    }

    /* ---- projects: filter (chips are built from each card's data-tags) ---- */
    const LABELS = { revit: "Revit", navisworks: "Navisworks", dynamo: "Dynamo", planning: "Planning", visualization: "Visualization", "shop-drawings": "Shop Drawings", rebar: "Rebar" };
    const cards = document.querySelectorAll(".project-card");
    const bar = document.getElementById("project-filters");
    const tagList = [];
    cards.forEach(function (card) {
        (card.getAttribute("data-tags") || "").split(" ").forEach(function (tag) {
            if (tag && tagList.indexOf(tag) === -1) tagList.push(tag);
        });
    });

    if (bar && tagList.length > 0) {
        ["all"].concat(tagList).forEach(function (key) {
            const b = document.createElement("button");
            b.type = "button";
            b.className = "filter-chip" + (key === "all" ? " active" : "");
            b.setAttribute("data-filter", key);
            b.setAttribute("aria-pressed", key === "all" ? "true" : "false");
            b.textContent = key === "all" ? "All" : (LABELS[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, " "));
            bar.appendChild(b);
        });
    } else if (bar) {
        bar.hidden = true;
    }

    document.querySelectorAll(".filter-chip").forEach(function (chip, _i, chips) {
        chip.addEventListener("click", function () {
            const f = chip.getAttribute("data-filter");
            chips.forEach(function (c) {
                const on = c === chip;
                c.classList.toggle("active", on);
                c.setAttribute("aria-pressed", on ? "true" : "false");
            });
            cards.forEach(function (card) {
                const tags = (card.getAttribute("data-tags") || "").split(" ");
                card.hidden = !(f === "all" || tags.indexOf(f) !== -1);
            });
        });
    });

    /* ---- projects: details popup ---- */
    function loadGallery(id) {
        const wrap = document.getElementById("pm-gallery-wrap");
        const grid = document.getElementById("pm-gallery");
        grid.innerHTML = "";
        const count = PROJECTS[id].images || 0;
        wrap.hidden = count === 0;
        for (let n = 1; n <= count; n++) {
            const src = "images/projects/" + id + "/" + n + ".jpg";
            const img = document.createElement("img");
            img.src = src;
            img.alt = PROJECTS[id].title + " image " + n;
            img.loading = "lazy";
            img.addEventListener("click", function () {
                showImages(PROJECTS[id].title, [src]);
            });
            grid.appendChild(img);
        }
    }

    function openProject(id) {
        const d = PROJECTS[id];
        if (!d) return;
        projectModal.dataset.current = id;
        const metaEl = document.getElementById("pm-meta");
        metaEl.textContent = d.meta;
        metaEl.hidden = !d.meta;
        document.getElementById("pm-role-wrap").hidden = d.role.length === 0;
        document.getElementById("pm-software-wrap").hidden = d.software.length === 0;
        document.getElementById("pm-title").textContent = d.title;
        fillList(document.getElementById("pm-role"), d.role);
        const sw = document.getElementById("pm-software");
        sw.innerHTML = "";
        d.software.forEach(function (t) {
            const s = document.createElement("span");
            s.textContent = t;
            sw.appendChild(s);
        });
        projectModal.querySelector(".modal-panel").scrollTop = 0;
        openModal(projectModal);
        loadGallery(id);
    }

    function activate(el, fn) {
        el.addEventListener("click", fn);
        el.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fn();
            }
        });
    }

    cards.forEach(function (card) {
        activate(card, function () { openProject(card.getAttribute("data-project")); });
    });

    /* ---- courses: certificate popup ---- */
    document.querySelectorAll(".course-card[data-cert]").forEach(function (card) {
        activate(card, function () {
            const id = card.getAttribute("data-cert");
            const count = parseInt(card.getAttribute("data-count"), 10) || 0;
            const title = card.querySelector("h3").textContent.trim();
            const srcs = [];
            for (let n = 1; n <= count; n++) srcs.push("images/certificates/" + id + "/" + n + ".jpg");
            showImages(title, srcs);
        });
    });
});
