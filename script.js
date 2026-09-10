document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.querySelector('.btn-generate');
  const inputField = document.querySelector('.input-wrapper input');
  const chatSection = document.querySelector('.chat-section');
  const imagePreview = document.querySelector('.image-preview img');

  generateBtn.addEventListener('click', handleGenerate);
  inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleGenerate();
  });

  function handleGenerate() {
    const promptText = inputField.value.trim();
    if (!promptText) return;

    // 1. User Message-a Add Seithal
    appendMessage('user', promptText);
    inputField.value = '';

    // 2. Bot Loading Message-a Add Seithal
    const loadingId = 'loading-' + Date.now();
    appendLoadingMessage(loadingId);

    // 3. Image Loading Simulation (2 Seconds Delay)
    setTimeout(() => {
      // Loading Message-a Remove Seithal
      const loadingEl = document.getElementById(loadingId);
      if (loadingEl) loadingEl.remove();

      // Bot Response Message
      appendMessage('bot', 'Here is your generated image:');

      // Random Image Update (Placeholder API)
      const randomSeed = Math.floor(Math.random() * 1000);
      imagePreview.src = `https://picsum.photos/seed/${randomSeed}/500/300`;
    }, 2000);
  }

  function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-message');
    if (sender === 'user') msgDiv.classList.add('user');

    const avatarIcon = sender === 'user' ? 'fa-user' : 'fa-robot';
    const avatarClass = sender === 'user' ? 'user-avatar-msg' : 'bot-avatar';
    const senderName = sender === 'user' ? '' : '<strong>Bot</strong><br>';

    msgDiv.innerHTML = `
      <div class="avatar ${avatarClass}"><i class="fa-solid ${avatarIcon}"></i></div>
      <div class="message-bubble">${senderName}${text}</div>
    `;

    chatSection.appendChild(msgDiv);
    chatSection.scrollTop = chatSection.scrollHeight;
  }

  function appendLoadingMessage(id) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-message');
    msgDiv.id = id;
    msgDiv.innerHTML = `
      <div class="avatar bot-avatar"><i class="fa-solid fa-robot"></i></div>
      <div class="message-bubble">
        <strong>Bot</strong> <i class="fa-solid fa-spinner fa-spin" style="margin-left: 4px;"></i><br>
        Generating image... Please wait.
      </div>
    `;
    chatSection.appendChild(msgDiv);
    chatSection.scrollTop = chatSection.scrollHeight;
  }
});