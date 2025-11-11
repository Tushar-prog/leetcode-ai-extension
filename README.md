# 🧠 LeetCode AI Analyzer

Analyze your LeetCode solutions using AI — get accurate **Time & Space Complexity** instantly inside LeetCode!

---

## 🚀 Features
- 🧩 Adds an “Analyze with AI” button on LeetCode problem pages  
- 🤖 Uses AI to analyze your submitted code for **Time & Space Complexity**  
- 🧠 Supports multiple languages (Python, Java, C++, etc.)  
- ⚡ Works directly on LeetCode — no extra setup needed  
- 🌐 Backend hosted on Render (free & always online)

---

## 🛠️ Installation (Manual)

Since this extension is not yet published on the Chrome Web Store, you can install it manually in 1 minute:

1. **Download the extension**
   - Option 1: [Download ZIP](https://github.com/Tushar-prog/leetcode-ai-extension/archive/refs/heads/main.zip)
   - Option 2: Clone using Git  
   
     command->>  git clone https://github.com/Tushar-prog/leetcode-ai-extension.git
    
2. **Extract the ZIP file**

3. **Open Chrome Extensions page**

4. **Enable Developer mode**  
Toggle the switch in the top right.

5. **Click “Load unpacked”**  
Then select the extracted folder (`leetcode-ai-extension`).

6. You’ll see the **LeetCode AI Analyzer** icon appear in your extensions bar 🎉

---

## ⚙️ Folder Structure
leetcode-ai-extension/
├── backend/ # Express.js backend hosted on Render
├── extension/ # Chrome extension frontend
│ ├── manifest.json
│ ├── content.js
│ ├── popup/
│ ├── styles/
│ └── icons/
└── README.md


---

## 🧩 How It Works
1. The **extension** injects an AI “Analyze” button into LeetCode pages.  
2. When clicked, it sends your code to the **backend** server.  
3. The backend uses AI (via OpenAI or Groq API) to estimate **Time & Space Complexity**.  
4. The result appears in a styled modal overlay on the LeetCode page.

🧠 Author

Tushar Verma


