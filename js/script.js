// Show/hide button
window.onscroll = function () {
  const btn = document.querySelector('.scroll-top-btn');
  btn.style.display = (document.documentElement.scrollTop > 300) ? 'flex' : 'none';
};

// Scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Contact form submission
document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("formStatus");

  status.classList.add("d-none"); // Hide before retry

  try {
    const response = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const result = await response.json();

    if (response.ok) {
      status.textContent = result.message;
      status.className = "alert alert-success mt-3 animate__animated animate__fadeIn";
      document.getElementById("contactForm").reset();
    } else {
      status.textContent = result.message || "Something went wrong.";
      status.className = "alert alert-danger mt-3 animate__animated animate__fadeIn";
    }
  } catch (error) {
    console.error("Error:", error);
    status.textContent = "Server error. Please try again later.";
    status.className = "alert alert-danger mt-3 animate__animated animate__fadeIn";
  }

  // Show alert
  status.classList.remove("d-none");

  // Hide after 5 seconds
  setTimeout(() => {
    status.classList.add("d-none");
  }, 5000);
});
