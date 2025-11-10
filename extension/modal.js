// modal.js - Reusable Modal Component for Analysis Results

class AnalysisModal {
  constructor() {
    this.modal = null;
    this.isOpen = false;
  }

  create() {
    if (this.modal) return;

    const modalHTML = `
      <div id="ai-analysis-modal" class="ai-modal-overlay">
        <div class="ai-modal-container">
          <div class="ai-modal-header">
            <h2>🤖 AI Code Analysis</h2>
            <button class="ai-modal-close" aria-label="Close">×</button>
          </div>
          
          <div class="ai-modal-body">
            <div class="ai-complexity-grid">
              <div class="ai-complexity-card time">
                <div class="ai-card-icon">⏱️</div>
                <div class="ai-card-content">
                  <h3>Time Complexity</h3>
                  <p class="ai-complexity-value" id="ai-time-complexity">-</p>
                </div>
              </div>
              
              <div class="ai-complexity-card space">
                <div class="ai-card-icon">💾</div>
                <div class="ai-card-content">
                  <h3>Space Complexity</h3>
                  <p class="ai-complexity-value" id="ai-space-complexity">-</p>
                </div>
              </div>
            </div>
            
            <div class="ai-explanation-section">
              <h3>📊 Detailed Explanation</h3>
              <div class="ai-explanation-content" id="ai-explanation">
                Loading...
              </div>
            </div>
          </div>
          
          <div class="ai-modal-footer">
            <button class="ai-btn-secondary" id="ai-copy-btn">
              📋 Copy Analysis
            </button>
            <button class="ai-btn-primary" id="ai-close-btn">
              Got it!
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modal = document.getElementById('ai-analysis-modal');
    this.attachEventListeners();
  }

  attachEventListeners() {
    // Close button
    const closeBtn = this.modal.querySelector('.ai-modal-close');
    const closeBtnFooter = this.modal.querySelector('#ai-close-btn');
    const copyBtn = this.modal.querySelector('#ai-copy-btn');

    closeBtn.addEventListener('click', () => this.close());
    closeBtnFooter.addEventListener('click', () => this.close());
    
    // Copy button
    copyBtn.addEventListener('click', () => this.copyAnalysis());

    // Click outside to close
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });
  }

  open(analysisData) {
    if (!this.modal) this.create();

    // Populate data
    document.getElementById('ai-time-complexity').textContent = 
      analysisData.timeComplexity || 'N/A';
    document.getElementById('ai-space-complexity').textContent = 
      analysisData.spaceComplexity || 'N/A';
    document.getElementById('ai-explanation').textContent = 
      analysisData.explanation || 'No explanation provided.';

    // Store for copying
    this.currentAnalysis = analysisData;

    // Show modal with animation
    this.modal.style.display = 'flex';
    setTimeout(() => {
      this.modal.classList.add('ai-modal-visible');
      this.isOpen = true;
    }, 10);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.modal) return;

    this.modal.classList.remove('ai-modal-visible');
    setTimeout(() => {
      this.modal.style.display = 'none';
      this.isOpen = false;
    }, 300);

    // Restore body scroll
    document.body.style.overflow = '';
  }

  copyAnalysis() {
    if (!this.currentAnalysis) return;

    const text = `
🤖 AI Code Analysis

⏱️ Time Complexity: ${this.currentAnalysis.timeComplexity}
💾 Space Complexity: ${this.currentAnalysis.spaceComplexity}

📊 Explanation:
${this.currentAnalysis.explanation}
    `.trim();

    navigator.clipboard.writeText(text).then(() => {
      const copyBtn = document.getElementById('ai-copy-btn');
      const originalText = copyBtn.textContent;
      copyBtn.textContent = '✅ Copied!';
      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
      alert('Failed to copy to clipboard');
    });
  }
}

// Export for use in content.js
window.AnalysisModal = AnalysisModal;