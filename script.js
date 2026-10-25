document.addEventListener("DOMContentLoaded", () => {
  const chatHeader = document.getElementById("chatHeader");
  const chatMessages = document.getElementById("chatMessages");
  const userInput = document.getElementById("userInput");
  const promptBox = document.getElementById("promptBox");
  const generatedImage = document.getElementById("generatedImage");
  const imgIcon = document.getElementById("imgIcon");
  const imgPlaceholderText = document.getElementById("imgPlaceholderText");

  // Clear Chat button click handler
  // Event delegation allows it to work after switching feature tabs.
  if (chatHeader) {
    chatHeader.addEventListener("click", (event) => {
      const clearButton = event.target.closest("#clearChatBtn");

      if (!clearButton) return;

      // Confirm before clearing
      const confirmClear = window.confirm(
        "Are you sure you want to clear the chat?"
      );

      if (!confirmClear) return;

      // Clear visible messages
      if (chatMessages) {
        chatMessages.innerHTML = "";
      }

      // Clear conversation history for all features
      if (typeof chatHistories !== "undefined") {
        Object.keys(chatHistories).forEach((feature) => {
          chatHistories[feature] = [];
        });
      }

      // Clear text inputs
      if (userInput) {
        userInput.value = "";
      }

      if (promptBox) {
        promptBox.value = "";
      }

      // Reset generated image preview
      if (generatedImage) {
        generatedImage.removeAttribute("src");
        generatedImage.style.display = "none";
      }

      // Restore image placeholder
      if (imgIcon) {
        imgIcon.className = "fa-solid fa-wand-magic-sparkles";
        imgIcon.style.display = "block";
      }

      if (imgPlaceholderText) {
        imgPlaceholderText.textContent =
          "Your generated image will appear here";
        imgPlaceholderText.style.display = "block";
      }

      // Stop any ongoing speech
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }

      // Reset voice status
      const voiceStatusText = document.getElementById("voiceStatusText");

      if (voiceStatusText) {
        voiceStatusText.textContent =
          'Click "Start Speaking" or use mic in chat to talk.';
      }

      console.log("Chat cleared successfully!");
    });
  }
});