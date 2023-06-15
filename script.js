// Hamburger Menu
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Dark Mode and Light Mode Toggle
const toggleButton = document.querySelector('.toggle-button');
const body = document.querySelector('body');

toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
});

// Chatbox
const chatForm = document.querySelector('.chat-form');
const chatInput = document.querySelector('.chat-form input[type="text"]');
const chatMessages = document.querySelector('.chat-messages');

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = chatInput.value.trim();

  if (message !== '') {
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('message');
    chatMessage.textContent = message;
    chatMessages.appendChild(chatMessage);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});
