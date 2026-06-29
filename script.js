document.addEventListener("DOMContentLoaded", () => {

    // Initial Database Mock Object Arrays
    let taskMatrix = [
        { id: 1, text: "Configure Snort IDS rule sets on internal perimeter routers", completed: false },
        { id: 2, text: "Finalize compliance checking matrices against portfolio objectives", completed: true }
    ];

    // --- Part 1: Bulletproof SPA View Manager Router ---
    function switchPage(targetPageId) {
        const sections = document.querySelectorAll(".page-section");
        const navItems = document.querySelectorAll(".nav-item");

        sections.forEach(section => {
            section.classList.remove("active-page");
        });

        const activeSection = document.getElementById(targetPageId);
        if (activeSection) {
            activeSection.classList.add("active-page");
        }

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("data-page") === targetPageId) {
                item.classList.add("active");
            }
        });

        // Close responsive mobile menu drawers
        const navLinks = document.getElementById("navLinks");
        const burger = document.getElementById("burgerMenu");
        if (navLinks.classList.contains("nav-active")) {
            navLinks.classList.remove("nav-active");
            burger.classList.remove("toggle");
        }

        window.scrollTo(0, 0);
    }

    // Attach click events securely to structural data pages attributes
    document.querySelectorAll("[data-page]").forEach(button => {
        button.addEventListener("click", (e) => {
            const targetPage = e.target.getAttribute("data-page");
            switchPage(targetPage);
        });
    });

    // Handle quick-link buttons on homepage
    document.querySelectorAll("[data-target]").forEach(button => {
        button.addEventListener("click", (e) => {
            const targetPage = e.target.getAttribute("data-target");
            switchPage(targetPage);
        });
    });

    // Mobile Burger UI Menu toggles
    const burgerMenu = document.getElementById("burgerMenu");
    if (burgerMenu) {
        burgerMenu.addEventListener("click", () => {
            document.getElementById("navLinks").classList.toggle("nav-active");
            burgerMenu.classList.toggle("toggle");
        });
    }

    // --- Part 2: Dynamic Task Planner System ---
    function renderTasks() {
        const tbody = document.getElementById("taskTableBody");
        if (!tbody) return;
        
        tbody.innerHTML = "";

        if (taskMatrix.length === 0) {
            tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:#888;">No active security assignments mapped.</td></tr>`;
            return;
        }

        taskMatrix.forEach(task => {
            const row = document.createElement("tr");

            // Text Description Frame
            const textCell = document.createElement("td");
            textCell.textContent = task.text;
            if (task.completed) {
                textCell.classList.add("strike-text");
            }

            // Flag state chips
            const statusCell = document.createElement("td");
            statusCell.style.textAlign = "center";
            const statusChip = document.createElement("span");
            statusChip.className = `status-tag ${task.completed ? "status-complete" : "status-pending"}`;
            statusChip.textContent = task.completed ? "Completed" : "Pending";
            statusCell.appendChild(statusChip);

            // Operation Buttons Frame
            const actionCell = document.createElement("td");
            actionCell.style.textAlign = "center";

            const toggleBtn = document.createElement("button");
            toggleBtn.className = "btn-action btn-success-action";
            toggleBtn.textContent = task.completed ? "Undo" : "Complete";
            toggleBtn.addEventListener("click", () => {
                task.completed = !task.completed;
                renderTasks();
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "btn-action btn-danger-action";
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => {
                taskMatrix = taskMatrix.filter(t => t.id !== task.id);
                renderTasks();
            });

            actionCell.appendChild(toggleBtn);
            actionCell.appendChild(deleteBtn);

            row.appendChild(textCell);
            row.appendChild(statusCell);
            row.appendChild(actionCell);

            tbody.appendChild(row);
        });
    }

    const addTaskBtn = document.getElementById("addTaskBtn");
    if (addTaskBtn) {
        addTaskBtn.addEventListener("click", () => {
            const inputField = document.getElementById("taskInput");
            const taskText = inputField.value.trim();

            if (taskText === "") {
                alert("Target operational parameter description cannot match a null field.");
                return;
            }

            taskMatrix.push({
                id: Date.now(),
                text: taskText,
                completed: false
            });

            inputField.value = "";
            renderTasks();
        });
    }

    // --- Part 3: Contact Integrity Input Validation Form Engine ---
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = document.getElementById("contactName").value.trim();
            const email = document.getElementById("contactEmail").value.trim();
            const phone = document.getElementById("contactPhone").value.trim();
            const message = document.getElementById("contactMessage").value.trim();

            // Clear legacy messages
            document.getElementById("errorName").textContent = "";
            document.getElementById("errorEmail").textContent = "";
            document.getElementById("errorPhone").textContent = "";
            document.getElementById("errorMessage").textContent = "";

            let isValid = true;

            if (name === "") {
                document.getElementById("errorName").textContent = "Full structural name identity string is mandatory.";
                isValid = false;
            }
            if (message === "") {
                document.getElementById("errorMessage").textContent = "Transmission documentation payload body cannot be null.";
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById("errorEmail").textContent = "Provide a valid cryptographic return email coordinate.";
                isValid = false;
            }

            const phoneRegex = /^\d+$/;
            if (phone === "") {
                document.getElementById("errorPhone").textContent = "Direct access verification contact digits required.";
                isValid = false;
            } else if (!phoneRegex.test(phone)) {
                document.getElementById("errorPhone").textContent = "Invalid entry sequence. Numerical input values only [0-9].";
                isValid = false;
            }

            if (isValid) {
                const banner = document.getElementById("successBanner");
                banner.textContent = "Secure transmission broadcast simulated successfully! Excellent work, Emita.";
                banner.style.display = "block";
                contactForm.reset();

                setTimeout(() => {
                    banner.style.display = "none";
                }, 5000);
            }
        });
    }

    // Default initialization boot hook
    renderTasks();
});