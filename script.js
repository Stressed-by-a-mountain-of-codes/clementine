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

    const thumbIcons = document.createElement('div');
    thumbIcons.classList.add('thumb-icons');

    const likeIcon = document.createElement('span');
    likeIcon.classList.add('thumb-icon', 'like-icon');
    likeIcon.innerHTML = '&#x1F44D;'; // Thumb up icon

    const hateIcon = document.createElement('span');
    hateIcon.classList.add('thumb-icon', 'hate-icon');
    hateIcon.innerHTML = '&#x1F44E;'; // Thumb down icon

    thumbIcons.appendChild(likeIcon);
    thumbIcons.appendChild(hateIcon);

    chatMessage.appendChild(thumbIcons);
    chatMessages.appendChild(chatMessage);

    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    simulateTyping(); // Simulate chatbot typing

    // Scroll to the bottom after the chatbot responds
    setTimeout(() => {
      scrollToBottom();
    }, 1000);
  }
});

// Loading Animation
const loadingAnimation = document.querySelector('.loading-animation');

function showLoadingAnimation() {
  loadingAnimation.style.display = 'block';
}

function hideLoadingAnimation() {
  loadingAnimation.style.display = 'none';
}

// Simulate Chatbot Typing
function simulateTyping() {
  showLoadingAnimation();
  setTimeout(() => {
    hideLoadingAnimation();
    generateChatbotResponse(); // Generate chatbot response here
  }, 1500);
}

// Generate Chatbot Response
function generateChatbotResponse() {
  const chatMessage = document.createElement('div');
  chatMessage.classList.add('message', 'sender');
  chatMessage.textContent = 'This is a chatbot response';

  const thumbIcons = document.createElement('div');
  thumbIcons.classList.add('thumb-icons');

  const likeIcon = document.createElement('span');
  likeIcon.classList.add('thumb-icon', 'like-icon');
  likeIcon.innerHTML = '&#x1F44D;'; // Thumb up icon

  const hateIcon = document.createElement('span');
  hateIcon.classList.add('thumb-icon', 'hate-icon');
  hateIcon.innerHTML = '&#x1F44E;'; // Thumb down icon

  thumbIcons.appendChild(likeIcon);
  thumbIcons.appendChild(hateIcon);

  chatMessage.appendChild(thumbIcons);
  chatMessages.appendChild(chatMessage);

  scrollToBottom();
}

// Scroll to the bottom of the chat messages
function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// User Feedback
chatMessages.addEventListener('click', (e) => {
  const target = e.target;

  if (target.classList.contains('like-icon')) {
    // Handle like feedback
    console.log('User liked the message');
  } else if (target.classList.contains('hate-icon')) {
    // Handle hate feedback
    console.log('User hated the message');
  }
});
