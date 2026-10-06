// SPA Router and State Management

// Define routes and corresponding views
const routes = {
  "/": { title: "Home", render: renderHome },
  "/home": { title: "Home", render: renderHome },
  "/about": { title: "About Us", render: renderAbout },
  "/services": { title: "Our Services", render: renderServices },
  "/contact": { title: "Contact Us", render: renderContact }
};

// Route View Definitions
function renderHome() {
  return `
    <h1>Welcome to SPA Simulation</h1>
    <p>This is a single-page application built using pure JavaScript, HTML5 History API, and CSS transitions.</p>
    <p>Navigate through the menu to explore pages loaded dynamically without full browser refreshes.</p>
    <button class="btn" onclick="navigateTo('/services')">Explore Services</button>
  `;
}

function renderAbout() {
  return `
    <h1>About This Project</h1>
    <p>Our objective was to construct an interactive web application using client-side routing mechanisms.</p>
    <p>By capturing navigation events and manipulating the DOM dynamic state, we achieve fast and fluid user interfaces.</p>
  `;
}

function renderServices() {
  return `
    <h1>Our Services</h1>
    <p>We provide modern frontend development solutions.</p>
    <div class="cards-grid">
      <div class="card">
        <h3>Client-Side Routing</h3>
        <p>Seamless navigation handling using browser history.</p>
      </div>
      <div class="card">
        <h3>DOM Manipulation</h3>
        <p>Dynamic content updates without full page reloads.</p>
      </div>
      <div class="card">
        <h3>UI/UX Styling</h3>
        <p>Responsive design with smooth CSS transition effects.</p>
      </div>
    </div>
  `;
}

function renderContact() {
  return `
    <h1>Contact Us</h1>
    <p>Get in touch with us through the form below:</p>
    <form class="contact-form" onsubmit="handleFormSubmit(event)">
      <input type="text" placeholder="Your Name" required>
      <input type="email" placeholder="Your Email" required>
      <textarea rows="4" placeholder="Your Message" required></textarea>
      <button type="submit" class="btn">Send Message</button>
    </form>
  `;
}

function render404() {
  return `
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <button class="btn" onclick="navigateTo('/home')">Back to Home</button>
  `;
}

// Router Function
function router() {
  const appContainer = document.getElementById("app");
  const path = window.location.pathname;
  
  // Resolve view or fallback to 404
  const route = routes[path] || { title: "404 Not Found", render: render404 };

  // Smooth fade-out transition
  appContainer.classList.add("fade-out");

  setTimeout(() => {
    // Update Document Title and Content
    document.title = `${route.title} - SPA Simulation`;
    appContainer.innerHTML = route.render();
    
    // Update active nav link indicator
    updateNavLinks(path);

    // Fade back in
    appContainer.classList.remove("fade-out");
  }, 150);
}

// Navigation Helper
function navigateTo(url) {
  window.history.pushState(null, null, url);
  router();
}

// Update Active Link State
function updateNavLinks(path) {
  document.querySelectorAll("[data-link]").forEach(link => {
    const linkPath = link.getAttribute("href");
    if (linkPath === path || (path === "/" && linkPath === "/home")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Capture click events on navigation links
  document.body.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.getAttribute("href"));
    }
  });

  // Handle browser back/forward buttons
  window.addEventListener("popstate", router);

  // Initial routing load
  router();
});

// Form Submission Event Handler (Simulated)
function handleFormSubmit(event) {
  event.preventDefault();
  alert("Thank you! Your message has been submitted successfully.");
}