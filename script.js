// Mobile Navigation Toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Close menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Works filter functionality
const categoryBtns = document.querySelectorAll(".category-btn");
const workCards = document.querySelectorAll(".work-card");

categoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    categoryBtns.forEach((b) => b.classList.remove("active"));
    // Add active class to clicked button
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");

    workCards.forEach((card) => {
      if (
        category === "all" ||
        card.getAttribute("data-category") === category
      ) {
        card.style.display = "block";
        card.style.animation = "fadeInUp 0.5s ease-out";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Blog category filter functionality
const blogCategoryBtns = document.querySelectorAll(".blog-category-btn");
const blogPosts = document.querySelectorAll(".blog-post");

blogCategoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    blogCategoryBtns.forEach((b) => b.classList.remove("active"));
    // Add active class to clicked button
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");

    blogPosts.forEach((post) => {
      const postCategory = post.getAttribute("data-category");
      
      if (category === "all" || postCategory === category) {
        post.style.display = "block";
        post.style.animation = "fadeInUp 0.5s ease-out";
      } else {
        post.style.display = "none";
      }
    });
  });
});

// Modal functionality for blog posts
const modal = document.getElementById("blogModal");
const closeBtn = document.querySelector(".close");
const readMoreLinks = document.querySelectorAll(".read-more");

// Open modal when clicking "Read More"
readMoreLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const title = link.getAttribute("data-title");
    const content = link.getAttribute("data-content");
    
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalContent").textContent = content;
    
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  });
});

// Close modal when clicking the close button
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
});

// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Close modal on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "block") {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Contact Form Submission
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const formData = new FormData(contactForm);

    // Show success message (in real application, you would send this to a server)
    alert("Thank you for your message! I will get back to you soon. 🎵");

    // Reset form
    contactForm.reset();
  });
}

// Scroll animations (excluding hero section)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all sections except hero
document.querySelectorAll("section:not(#home)").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});

// Animate cards on scroll
const animateOnScroll = (selector) => {
  const elements = document.querySelectorAll(selector);

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);
      }
    });
  }, observerOptions);

  elements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    cardObserver.observe(element);
  });
};

// Apply animations to different card types
animateOnScroll(".work-card");
animateOnScroll(".album-card");
animateOnScroll(".award-card");
animateOnScroll(".gallery-item");
animateOnScroll(".stat-item");
animateOnScroll(".blog-post");

// Add loading animation (without affecting hero section)
window.addEventListener("load", () => {
  // No page load animation for cleaner appearance
});

// Active nav link on scroll
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Add hover sound effect simulation (visual feedback)
const buttons = document.querySelectorAll(
  "button, .btn-primary, .btn-secondary"
);
buttons.forEach((button) => {
  button.addEventListener("mouseenter", () => {
    button.style.transform = "scale(1.05)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "scale(1)";
  });
});

// Console greeting
console.log(
  "%c🎵 Welcome to Prem Ananda's Music Website! 🎵",
  "font-size: 20px; color: #ff6b35; font-weight: bold;"
);
console.log(
  "%cExplore the beautiful world of Odia music",
  "font-size: 14px; color: #004e89;"
);

// Lazy loading for images (if you add actual images later)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  const lazyImages = document.querySelectorAll("img.lazy");
  lazyImages.forEach((img) => imageObserver.observe(img));
}
