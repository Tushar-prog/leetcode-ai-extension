console.log('🚀 LeetCode AI Analyzer content script loaded');

// Initialize modal instance
let analysisModal = null;

async function getCode() {
  await new Promise(resolve => setTimeout(resolve, 500));

  // Try Monaco editor
  try {
    const models = window.monaco?.editor?.getModels();
    if (models?.length) return models[0].getValue();
  } catch (e) {
    console.warn('Monaco method failed, trying fallback...', e);
  }

  // Try textarea fallback
  const editor = document.querySelector('.monaco-editor textarea');
  return editor ? editor.value : null;
}

async function analyzeWithAI(code) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { action: 'analyzeCode', code },
      (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }
        if (response.success) {
          resolve(response.data);
        } else {
          reject(new Error(response.error));
        }
      }
    );
  });
}

function showError(message) {
  // Fallback to alert if modal fails
  alert(`❌ ${message}`);
}

function createAnalyzeButton() {
  if (document.getElementById('ai-analyze-btn')) return;

  // Find the top IDE button bar
  const buttonBar = document.getElementById('ide-top-btns');
  if (!buttonBar) {
    console.log('⚠️ Could not find #ide-top-btns, retrying...');
    return;
  }

  // Create the button
  const button = document.createElement('button');
  button.id = 'ai-analyze-btn';
  button.textContent = '🤖 Analyze';
  button.className = 'ai-btn';

  button.onclick = async () => {
    button.disabled = true;
    button.classList.add('analyzing');
    button.textContent = '⏳ Analyzing...';

    try {
      // Get code from editor
      const code = await getCode();
      if (!code?.trim()) {
        showError('No code found! Make sure you have written code in the editor.');
        return;
      }

      console.log('📝 Code found, analyzing...');
      
      // Analyze with AI
      const result = await analyzeWithAI(code);
      console.log('✅ Analysis result:', result);

      // Initialize modal if not exists
      if (!analysisModal) {
        analysisModal = new window.AnalysisModal();
      }

      // Show modal with results
      analysisModal.open(result);

    } catch (err) {
      console.error('❌ Analysis failed:', err);
      showError(`Analysis failed!\n\n${err.message}`);
    } finally {
      button.disabled = false;
      button.classList.remove('analyzing');
      button.textContent = '🤖 Analyze';
    }
  };

  buttonBar.appendChild(button);
  console.log('✅ AI Analyze button added!');
}

function init() {
  // Try to add button after page loads
  setTimeout(createAnalyzeButton, 2000);
  
  // Keep retrying in case page structure changes
  setInterval(createAnalyzeButton, 5000);
}

init();