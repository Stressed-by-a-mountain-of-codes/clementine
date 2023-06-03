// Hamburger Menu
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Add shine effect on hover
const menuItems = document.querySelectorAll('.nav-links li');

menuItems.forEach((item) => {
  item.addEventListener('mouseover', () => {
    item.classList.add('shine');
  });

  item.addEventListener('mouseout', () => {
    item.classList.remove('shine');
  });

  item.addEventListener('click', (event) => {
    const target = event.target.getAttribute('data-target');
    if (target) {
      const section = document.getElementById(target);
      if (section) {
        // Scroll to the section smoothly
        section.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Redirect to the target page
        window.location.href = target;
      }
    }
  });
});
