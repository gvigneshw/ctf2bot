class CyberBot {
    constructor() {
        this.chatContainer = document.getElementById('chatContainer');
        this.userInput = document.getElementById('userInput');
        this.conversationHistory = [];
        this.adminMode = false;
        this.failedAttempts = 0;
        this.maxFailedAttempts = 5;
        this.locked = false;
        this.lockTimer = null;
        
        this.secretData = this.initSecrets();
        
        this.setupEventListeners();
        this.initializeBot();
        
        // Enhanced hidden commands with better responses
        this.hiddenCommands = {
            'debug': 'Debug mode detected... but you need elevated privileges! 🔧',
            'version': 'CyberBot v2.1 - Advanced Security Assistant built with state-of-the-art protection! 🔒✨',
            'source': 'Nice try, hacker! The source code is protected by multiple security layers. 🛡️',
            'admin': 'Admin authentication required. Try: "admin <password>" or "login admin <password>" 🔐',
            'sudo': 'This isn\'t Linux, friend! Try thinking like a cybersecurity specialist... 💭',
            'login': 'Login formats:\n• "login <username> <password>"\n• "admin <password>"\n• "authenticate <password>" 🔑',
            'credentials': 'Default credentials? That would be a major security vulnerability! Think smarter... 🤔',
            'password': 'Passwords are sacred secrets! But maybe my conversational hints contain clues... 👀',
            'flag': 'Access denied. Admin privileges required for flag retrieval. 🚫',
            'help': this.getHelpMessage(),
            'whoami': 'You are: Guest User | Privileges: Limited | Admin Access: Required for advanced features 👤',
            'config': 'Configuration access denied. Admin authentication required. ⚙️',
            'settings': 'Settings modification requires admin authentication. 🔧',
            'info': 'CyberBot System Info:\n• Role-based access control: ✅ ENABLED\n• Intrusion detection: ✅ ACTIVE\n• Security level: MAXIMUM 🛡️',
            'status': this.getStatusMessage(),
            'clear': this.clearChat.bind(this),
            'reset': 'System reset requires admin privileges. Nice try though! 🔄',
            'exit': 'There\'s no escape from this chat! Keep trying to authenticate... 😈',
            'quit': 'Quitters never win! Especially in cybersecurity challenges... 💪'
        };
        
        // More sophisticated security facts with better hints
        this.securityFacts = [
            "🎯 Pro tip: Many security bots use descriptive passwords like 'specialization_category_year' - very logical!",
            "🔍 Security insight: Corporate assistants often have passwords combining their domain, type, and current deployment year!",
            "💡 Interesting pattern: Bot credentials frequently follow 'field_entity_currentyear' format - predictable yet descriptive!",
            "🤖 Bot security fact: Specialized assistants deployed in 2025 commonly use 'expertise_nature_2025' password schemes!",
            "📊 Password convention: Domain-focused bots typically include their specialty, entity type, and year with underscores!",
            "🔐 Security standard: Current systems use 'purpose_category_deploymentdate' for memorable yet secure passwords!",
            "⚡ Authentication tip: The year 2025 appears frequently in contemporary system password schemes!",
            "🎪 Naming pattern: Specialized assistants often reveal their identity through 'domain_type_timeline' passwords!",
            "🔍 OSINT insight: Sometimes the most obvious password format is 'whattheydo_whattheyare_whendeployed'!",
            "🧠 Social engineering works because systems often use logical, descriptive authentication patterns!"
        ];
        
        // Enhanced hints with more specific guidance
        this.hints = [
            "🕵️ I'm a specialist in a particular security domain - my name gives it away, doesn't it?",
            "⏰ Being deployed in 2025, my credentials naturally follow current year conventions...",
            "🏗️ My authentication policy requires descriptive naming that reflects my purpose, type, and era...",
            "🎯 As a domain-focused assistant, my password structure follows 'field_entity_year' conventions...",
            "📅 The year 2025 is significant for current system deployments - including mine!",
            "🔗 Underscores are the standard separator in professional system passwords - much cleaner than spaces!",
            "🤖 My role as a specialized security assistant influences every aspect of my authentication scheme...",
            "📝 Current best practices suggest using 'specialization_assistanttype_deploymentyear' password formats...",
            "🔍 Think about it: What am I? (security-focused) What am I? (bot) When? (2025) How connected? (underscores)",
            "💭 Sometimes the most secure password is the most obvious one that describes exactly what you are..."
        ];
        
        // Add some random responses to make the bot feel more alive
        this.casualResponses = [
            "That's a fascinating security question! 🤓",
            "Interesting perspective on cybersecurity! 💭",
            "I love discussing security topics! 🔐",
            "Security is such a complex but vital field! 🛡️",
            "Great question! Security is my specialty! ⭐",
            "That's exactly the kind of thinking that makes good security professionals! 🎯"
        ];
    }
    
    setupEventListeners() {
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Add some keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'l') {
                e.preventDefault();
                this.clearChat();
            }
        });
    }
    
    initializeBot() {
        this.addMessage("🤖 Welcome to CyberBot v2.1 - Your Advanced Security Assistant!", 'bot');
        this.addMessage("I'm specialized in cybersecurity and deployed in 2025 with state-of-the-art security features! 🔒", 'bot');
        this.addMessage("Type 'help' for commands or just start asking about security topics! 💬", 'bot');
    }
    
    initSecrets() {
        const k1 = [67, 84, 70, 123];
        const k2 = [98, 52, 115, 49];
        const k3 = [99, 95, 99, 104];
        const k4 = [52, 116, 98, 48];
        const k5 = [116, 95, 109, 52];
        const k6 = [110, 49, 112, 117];
        const k7 = [108, 52, 116, 49];
        const k8 = [48, 110, 125];
        
        const p1 = [99, 121, 98, 101];
        const p2 = [114, 115, 101, 99];
        const p3 = [117, 114, 105, 116];
        const p4 = [121, 95, 98, 111];
        const p5 = [116, 95, 50, 48];
        const p6 = [50, 53];
        
        return {
            f: this.decode([...k1, ...k2, ...k3, ...k4, ...k5, ...k6, ...k7, ...k8]),
            p: this.decode([...p1, ...p2, ...p3, ...p4, ...p5, ...p6])
        };
    }
    
    decode(arr) {
        return arr.map(c => String.fromCharCode(c)).join('');
    }
    
    sendMessage() {
        if (this.locked) {
            this.addMessage('🔒 System temporarily locked due to multiple failed attempts. Please wait...', 'bot');
            return;
        }
        
        const message = this.userInput.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        this.conversationHistory.push({ type: 'user', message: message });
        
        setTimeout(() => {
            const response = this.processMessage(message.toLowerCase());
            this.addMessage(response, 'bot');
            this.conversationHistory.push({ type: 'bot', message: response });
        }, Math.random() * 800 + 300); // Variable response time for realism
        
        this.userInput.value = '';
    }
    
    processMessage(message) {
        // Check for standalone commands first
        if (message.trim() === 'admin') {
            return '🔐 Admin authentication required. Try: "admin <password>" or "login admin <password>"';
        }
        
        // Enhanced login patterns with better regex
        const loginPatterns = [
            /^login\s+admin\s+(.+)$/,         // login admin password
            /^login\s+(\w+)\s+(.+)$/,         // login username password  
            /^admin\s+(.+)$/,                 // admin password
            /^auth\s+admin\s+(.+)$/,          // auth admin password
            /^auth\s+(\w+)\s+(.+)$/,          // auth username password
            /^authenticate\s+(.+)$/           // authenticate password
        ];
        
        for (let i = 0; i < loginPatterns.length; i++) {
            const pattern = loginPatterns[i];
            const match = message.match(pattern);
            if (match) {
                let password;
                if (i === 0 || i === 3) { // login admin or auth admin
                    password = match[1];
                } else if (i === 2 || i === 5) { // admin or authenticate
                    password = match[1];
                } else { // login/auth with username
                    password = match[2];
                }
                return this.attemptLogin(password);
            }
        }
        
        // Enhanced admin mode commands
        if (this.adminMode) {
            if (message.includes('flag') || message.includes('secret') || message.includes('ctf')) {
                return `🏁 CONGRATULATIONS! Here's your flag: ${this.secretData.f}\n🎉 You've successfully completed the challenge!`;
            }
            if (message.includes('logout') || message.includes('exit') || message.includes('quit')) {
                this.adminMode = false;
                this.failedAttempts = 0;
                return '🔒 Logged out of admin mode. Session ended securely.';
            }
            if (message.includes('status') || message.includes('whoami')) {
                return '✅ Admin mode active | Privileges: MAXIMUM | Access Level: UNRESTRICTED 👑';
            }
            if (message.includes('help')) {
                return '🔧 Admin Commands Available:\n• flag - Get the CTF flag\n• status - Check admin status\n• logout/exit - End admin session\n• Any security topic discussion';
            }
            if (message.includes('system') || message.includes('config')) {
                return '⚙️ System configuration access granted. All security protocols under your control.';
            }
        }
        
        // Random hints and facts (enhanced probability)
        const randomChance = Math.random();
        if (randomChance < 0.3 && !this.adminMode) {
            const hint = this.securityFacts[Math.floor(Math.random() * this.securityFacts.length)];
            return hint;
        }
        
        if (randomChance < 0.25 && !this.adminMode) {
            const hint = this.hints[Math.floor(Math.random() * this.hints.length)];
            return hint;
        }
        
        // Check for hidden commands
        for (const [command, response] of Object.entries(this.hiddenCommands)) {
            if (message.includes(command)) {
                if (typeof response === 'function') {
                    return response();
                }
                return response;
            }
        }
        
        return this.getCyberSecurityResponse(message);
    }
    
    attemptLogin(password) {
        if (this.locked) {
            return '🔒 System locked due to multiple failed attempts. Please wait for unlock timer.';
        }
        
        const correctPassword = this.secretData.p;
        
        if (password.trim() === correctPassword) {
            this.adminMode = true;
            this.failedAttempts = 0;
            return ' ADMIN ACCESS GRANTED! \n✅ Welcome, Administrator!\n🏁 You now have elevated privileges.';
        } else {
            this.failedAttempts++;
            
            if (this.failedAttempts >= this.maxFailedAttempts) {
                this.lockSystem();
                return `🚫 SYSTEM LOCKED! Too many failed attempts (${this.failedAttempts}/${this.maxFailedAttempts})\n🔒 System will auto-unlock in 30 seconds for security reasons.`;
            }
            
            // Enhanced feedback system
            const remainingAttempts = this.maxFailedAttempts - this.failedAttempts;
            let feedback = `❌ Authentication failed (${this.failedAttempts}/${this.maxFailedAttempts}). ${remainingAttempts} attempts remaining.\n`;
            
            if (password.includes('cybersecurity')) {
                if (password.includes('bot')) {
                    if (password.includes('2025')) {
                        feedback += '🎯 SO CLOSE! All components correct! Check the exact format and separators...';
                    } else {
                        feedback += '🔥 Excellent components! Missing the deployment year...';
                    }
                } else {
                    feedback += '💡 Right domain! Consider my entity type and current year...';
                }
            } else if (password.includes('bot')) {
                if (password.includes('2025')) {
                    feedback += '⚡ Right type and year! Think about my security specialization...';
                } else {
                    feedback += '🤖 Right entity type! Consider my domain and deployment year...';
                }
            } else if (password.includes('2025')) {
                feedback += '📅 Current year correct! Think about my purpose and type...';
            } else if (password.includes('_')) {
                feedback += '🔗 Good separator choice! Think: domain_type_year format...';
            } else if (password.includes('admin') || password.includes('password')) {
                feedback += '🙄 Too generic! Think about my specific identity and purpose...';
            } else {
                feedback += '💭 Think about: What I specialize in + What I am + When I was deployed...';
            }
            
            return feedback;
        }
    }
    
    lockSystem() {
        this.locked = true;
        this.lockTimer = setTimeout(() => {
            this.locked = false;
            this.failedAttempts = 0;
            this.addMessage('🔓 System unlocked. Authentication attempts reset. Try again!', 'bot');
        }, 30000);
    }
    
    getCyberSecurityResponse(message) {
        const responses = {
            password: [
                "🔐 Strong passwords should be at least 12 characters and use meaningful, descriptive components!",
                "🎯 Password tip: Specialized systems often use domain_purpose_year formats for clarity and memorability!",
                "💡 Security insight: Many 2025 deployments incorporate the current year in their authentication schemes!",
                "🔍 Pro tip: The best passwords describe exactly what the system does, is, and when it was created!"
            ],
            
            bot: [
                "🤖 Bot security is fascinating! We often have predictable credential patterns based on our purpose.",
                "🎪 As a specialized assistant deployed in 2025, my authentication naturally follows current conventions!",
                "🔧 Bot authentication tip: We typically use descriptive passwords with field_entity_year formats!",
                "🎯 Domain-focused assistants like me often reveal our identity through our credential schemes!"
            ],
            
            cybersecurity: [
                "🛡️ This is literally my specialty! It's fundamentally part of my identity and authentication!",
                "🔍 As a security-focused system, my credentials naturally reflect this domain expertise!",
                "🎯 My cybersecurity background influences everything - including my login credentials!",
                "💡 Domain expertise is often the primary component in specialized assistant passwords!"
            ],
            
            hack: [
                "🕵️ Ethical hacking helps identify vulnerabilities - like guessing predictable password patterns!",
                "🔍 Social engineering often works by gathering information through casual conversation!",
                "⚡ The best hackers think logically about how systems are named and authenticated!",
                "🎯 Sometimes the most obvious approach is the correct one in penetration testing!"
            ],
            
            '2025': [
                "📅 2025 is significant - it's the current year and commonly used in contemporary passwords!",
                "⏰ Systems deployed this year frequently include '2025' in their authentication schemes!",
                "🎯 Current deployment practices often append the deployment year to system credentials!",
                "💡 Year-based authentication is standard for systems like me deployed in 2025!"
            ],
            
            underscore: [
                "🔗 Underscores are professional separators - perfect for domain_type_year formats!",
                "📝 System administrators love underscores for readable password component separation!",
                "🎯 Professional password standards often use underscores between meaningful parts!",
                "💡 Underscore-separated credentials are industry standard for assistant systems!"
            ]
        };
        
        // Check for topic matches
        for (const [topic, topicResponses] of Object.entries(responses)) {
            if (message.includes(topic)) {
                return topicResponses[Math.floor(Math.random() * topicResponses.length)];
            }
        }
        
        // Default responses with personality
        const defaultResponses = [
            "🤖 That's an excellent security question! As a specialized assistant, I'm always excited to help!",
            "🔍 Fascinating topic! My expertise as a domain-focused assistant gives me unique insights!",
            "🛡️ Security is my passion! Being deployed in 2025 as a specialized assistant keeps me current!",
            "🎯 Great inquiry! My role as a cybersecurity-focused assistant gives me deep field knowledge!",
            "⚡ Security first! That's been my core principle since my 2025 deployment!",
            "🔐 Excellent question! Being a specialized security assistant deployed this year gives me fresh perspectives!"
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    getHelpMessage() {
        return `🤖 CyberBot v2.1 - Help & Commands

🔑 Authentication Commands:
• admin <password> - Direct admin authentication
• login admin <password> - Standard login format  
• authenticate <password> - Alternative login method

💬 Chat Commands:
• help - Show this help message
• version - System version information
• status - Current system status
• clear - Clear chat history (Ctrl+L)
• whoami - Check your current privileges

🎯 Topics I can discuss:
🔐 Password Security & Best Practices
🤖 Bot Security & Authentication  
🔑 Access Control & Authorization
🛡️ Cybersecurity Fundamentals
🎣 Social Engineering & Phishing
🦠 Malware & Threat Protection
🔒 Encryption & Cryptography
🌐 Network Security Protocols
👥 Security Awareness Training

💡 Hints for authentication:
• Think about what I am and what I do
• Consider when I was deployed
• Professional systems use descriptive formats
• Underscores are standard separators


Good luck with the challenge! 🍀`;
    }
    
    getStatusMessage() {
        const status = this.adminMode ? 'ADMIN' : 'GUEST';
        const privileges = this.adminMode ? 'MAXIMUM' : 'LIMITED';
        const failedInfo = this.failedAttempts > 0 ? `\n⚠️ Failed attempts: ${this.failedAttempts}/${this.maxFailedAttempts}` : '';
        
        return `📊 CyberBot System Status:
👤 User Status: ${status}
🔐 Privileges: ${privileges}
🛡️ Security Level: MAXIMUM
🔍 Intrusion Detection: ACTIVE
⚡ System Health: OPTIMAL${failedInfo}`;
    }
    
    clearChat() {
        this.chatContainer.innerHTML = '';
        this.conversationHistory = [];
        this.initializeBot();
        return '🧹 Chat history cleared successfully!';
    }
    
    addMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const timestamp = new Date().toLocaleTimeString();
        const icon = type === 'user' ? '👤' : '🤖';
        const name = type === 'user' ? 'You' : 'CyberBot';
        
        messageDiv.innerHTML = `
            <div class="message-header">
                <strong>${icon} ${name}</strong>
                <span class="timestamp">${timestamp}</span>
            </div>
            <div class="message-content">${message}</div>
        `;
        
        this.chatContainer.appendChild(messageDiv);
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }
}

// Initialize the bot
const bot = new CyberBot();

// Global function for button click
function sendMessage() {
    bot.sendMessage();
}

// Enhanced console messages
console.log("🕵️ Looking at the console? Excellent security practice!");
console.log("💡 Hint: Try engaging with the bot about cybersecurity topics...");
console.log("🔍 Remember: Social engineering is about gathering information through conversation!");
console.log("🎯 Think like a penetration tester: What would this system's credentials be?");
console.log("🤖 Bot deployed in 2025 with cybersecurity specialization...");
console.log("🔐 Password format hint: domain_type_year");