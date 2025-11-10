// background.js
console.log('LeetCode AI Analyzer background script loaded');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyzeCode') {
    console.log('Background: Received code to analyze');
    
    fetch("http://localhost:3000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: request.code })
    })
    .then(res => res.json())
    .then(data => {
      console.log('Background: Analysis complete', data);
      sendResponse({ success: true, data });
    })
    .catch(err => {
      console.error('Background: Fetch error', err);
      sendResponse({ success: false, error: err.message });
    });
    
    return true; // Keep channel open for async response
  }
});