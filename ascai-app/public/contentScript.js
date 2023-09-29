// Listen for Metamask interaction events
window.addEventListener("metamaskInteraction", (event) => {
  const contractDetails = event.detail;
  chrome.runtime.sendMessage({ type: "contractInteraction", contractDetails });
});
