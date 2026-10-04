/* =========================================================
   BRIGHTSMILE DENTAL CLINIC
   Main JavaScript
   ========================================================= */

/* =========================================================
   1. MOBILE MENU
   ========================================================= */

const menuButton = document.querySelector(".menu-button");
const navbar = document.querySelector(".navbar");

if (menuButton && navbar) {
  menuButton.addEventListener("click", () => {
    navbar.classList.toggle("active");

    const isOpen = navbar.classList.contains("active");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.textContent = isOpen ? "✕" : "☰";
  });
}

/* =========================================================
   2. CLOSE MOBILE MENU AFTER CLICKING A LINK
   ========================================================= */

const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navbar) {
      navbar.classList.remove("active");
    }

    if (menuButton) {
      menuButton.textContent = "☰";

      menuButton.setAttribute("aria-expanded", "false");
    }
  });
});

/* =========================================================
   3. APPOINTMENT FORM
   ========================================================= */

const appointmentForm = document.querySelector(".appointment-form");

if (appointmentForm) {
  appointmentForm.addEventListener("submit", function (event) {
    /*
     * Stop the browser from refreshing
     * the page when the form is submitted.
     */

    event.preventDefault();

    /* -----------------------------------------
               Get form values
            ----------------------------------------- */

    const name = appointmentForm
      .querySelector('input[name="name"]')
      ?.value.trim();

    const phone = appointmentForm
      .querySelector('input[name="phone"]')
      ?.value.trim();

    const email = appointmentForm
      .querySelector('input[name="email"]')
      ?.value.trim();

    const service = appointmentForm.querySelector(
      'select[name="service"]',
    )?.value;

    const date = appointmentForm.querySelector('input[name="date"]')?.value;

    /* -----------------------------------------
               Basic validation
            ----------------------------------------- */

    if (!name || !phone || !email || !service || !date) {
      showAppointmentMessage("Please fill in all appointment fields.", "error");

      return;
    }

    /* -----------------------------------------
   Prevent past appointment date
----------------------------------------- */

if (date) {

    const selectedDate =
        new Date(date + "T00:00:00");

    const today =
        new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );

    if (selectedDate < today) {

        showAppointmentMessage(
            "Please select today or a future appointment date.",
            "error"
        );

        return;

    }

}
    /* -----------------------------------------
               Email validation
            ----------------------------------------- */

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      showAppointmentMessage("Please enter a valid email address.", "error");

      return;
    }

    /* -----------------------------------------
               Success message
            ----------------------------------------- */

    showAppointmentMessage(
      `Thank you, ${name}! Your appointment request has been received. Our dental team will contact you shortly.`,
      "success",
    );

 /* =========================================================
   PREVENT PAST APPOINTMENT DATES
   ========================================================= */

const appointmentDate = document.querySelector("#date");

if (appointmentDate) {

    // Get today's date using the user's local time
    const today = new Date();

    const year = today.getFullYear();

    const month = String(
        today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        today.getDate()
    ).padStart(2, "0");

    const todayString =
        `${year}-${month}-${day}`;

    // Prevent selecting a date before today
    appointmentDate.min = todayString;

}

    /* -----------------------------------------
               Reset form
            ----------------------------------------- */

    appointmentForm.reset();
  });
}

/* =========================================================
   4. APPOINTMENT MESSAGE FUNCTION
   ========================================================= */

function showAppointmentMessage(message, type) {
  /*
   * Remove an existing message first.
   */

  const existingMessage = document.querySelector(".appointment-message");

  if (existingMessage) {
    existingMessage.remove();
  }

  /*
   * Create message element.
   */

  const messageElement = document.createElement("div");

  messageElement.className = `appointment-message ${type}`;

  messageElement.textContent = message;

  /*
   * Insert message before the form.
   */

  appointmentForm.parentNode.insertBefore(messageElement, appointmentForm);

  /*
   * Scroll to the message.
   */

  messageElement.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

  /*
   * Automatically remove success
   * message after 8 seconds.
   */

  setTimeout(() => {
    if (messageElement) {
      messageElement.remove();
    }
  }, 8000);
}

/* =========================================================
   5. CURRENT YEAR
   ========================================================= */

const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* =========================================================
   6. ACTIVE NAVIGATION LINK
   ========================================================= */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;

    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    const href = link.getAttribute("href");

    if (href === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});
