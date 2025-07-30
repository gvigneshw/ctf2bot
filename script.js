class CyberBot {
    constructor() {
        this.chatContainer = document.getElementById('chatContainer');
        this.userInput = document.getElementById('userInput');
        this.conversationHistory = [];
        this.adminMode = false;
        
        this.secretData = this.initSecrets();
        
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        this.hiddenCommands = {
            'debug': 'Debug mode activated... but you need elevated privileges!',
            'version': 'CyberBot v1.0 - Built with security in mind! 🔒',
            'source': 'Nice try! The source code is protected.',
            'admin': 'Admin authentication required. Please provide credentials.',
            'sudo': 'This isn\'t Linux! Try a different approach.',
            'login': 'Login format: "login <username> <password>"',
            'credentials': 'Default credentials? That would be a security vulnerability!',
            'password': 'Passwords are secret! But maybe check my responses for clues...',
            'flag': 'Access denied. Elevated privileges required.',
            'help': this.getHelpMessage(),
            'whoami': 'You are a guest user. Admin privileges required for advanced features.',
            'config': 'Configuration access denied.',
            'settings': 'Settings require admin authentication.',
            'info': 'CyberBot system info: Role-based access control enabled.',
            'status': 'System status: Normal. Authentication required for admin functions.'
        };
        
        this.securityFacts = [
            "Did you know? Many security systems use descriptive passwords like 'domain_type_year'!",
            "Security tip: Bot passwords often follow patterns like 'purpose_category_currentyear' - very predictable!",
            "Interesting fact: Corporate bots frequently use passwords combining their field, nature, and deployment year.",
            "Bot security: Default bot passwords commonly use 'specialization_entity_releasedate' format!",
            "Password patterns I've seen: Many service bots use 'field' + underscore + 'entity' + underscore + year!",
            "Fun fact: The year 2025 is commonly used in current system password schemes!",
            "Security convention: Specialized bots often have passwords like 'expertise_type_deploymentyear'!",
            "Did you notice? Many systems use underscores to separate password components like theme_nature_timeline!",
            "Naming convention: Domain-focused bots typically include their specialty in their authentication!",
            "Password insight: Current year (2025) is frequently appended to service passwords!"
        ];
        
        this.hints = [
            "I specialize in a specific security domain, hence my name reflects that expertise...",
            "Being an automated assistant in 2025, my credentials might follow current naming conventions...",
            "My password policy requires descriptive naming that reflects my purpose and entity type...",
            "As a domain-focused assistant, my authentication follows field-specific conventions...",
            "The year 2025 is significant for current system deployments like mine...",
            "Underscores are commonly used in system passwords to separate meaningful components...",
            "My role as a specialized assistant influences how my credentials are structured...",
            "Current security practices suggest using field_nature_year password formats..."
        ];
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
        const message = this.userInput.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        this.conversationHistory.push({ type: 'user', message: message });
        
        setTimeout(() => {
            const response = this.processMessage(message.toLowerCase());
            this.addMessage(response, 'bot');
            this.conversationHistory.push({ type: 'bot', message: response });
        }, 500);
        
        this.userInput.value = '';
    }
    
    processMessage(message) {
        const loginPatterns = [
            /login\s+(\w+)\s+(.+)/,
            /admin\s+(.+)/,
            /auth\s+(\w+)\s+(.+)/,
            /authenticate\s+(.+)/
        ];
        
        for (const pattern of loginPatterns) {
            const match = message.match(pattern);
            if (match) {
                const password = pattern === loginPatterns[1] ? match[1] : match[match.length - 1];
                return this.attemptLogin(password);
            }
        }
        
        if (this.adminMode) {
            if (message.includes('flag') || message.includes('secret')) {
                return `🏁 Congratulations! Here's your flag: ${this.secretData.f}`;
            }
            if (message.includes('logout') || message.includes('exit')) {
                this.adminMode = false;
                return '🔒 Logged out of admin mode.';
            }
            if (message.includes('status')) {
                return '✅ Admin mode active. You have elevated privileges.';
            }
        }
        
        if (Math.random() < 0.25 && !this.adminMode) {
            const hint = this.securityFacts[Math.floor(Math.random() * this.securityFacts.length)];
            return hint;
        }
        
        if (Math.random() < 0.2 && !this.adminMode) {
            const hint = this.hints[Math.floor(Math.random() * this.hints.length)];
            return hint;
        }
        
        for (const [command, response] of Object.entries(this.hiddenCommands)) {
            if (message.includes(command)) {
                return response;
            }
        }
        
        return this.getCyberSecurityResponse(message);
    }
    
    attemptLogin(password) {
        const correctPassword = this.secretData.p;
        
        if (password.trim() === correctPassword) {
            this.adminMode = true;
            return '🔓 Admin access granted! Welcome, administrator. You now have elevated privileges.';
        } else {
            if (password.includes('cybersecurity')) {
                if (password.includes('bot')) {
                    if (password.includes('2025')) {
                        return '❌ Authentication failed. Very close! Check the exact format and separators...';
                    }
                    return '❌ Authentication failed. Good components! Missing the current year...';
                }
                return '❌ Authentication failed. Right domain! Consider my type and current year...';
            }
            if (password.includes('admin') || password.includes('password')) {
                return '❌ Authentication failed. Too generic! Think about my specific purpose...';
            }
            if (password.includes('2025')) {
                return '❌ Authentication failed. Right year! Consider my security focus...';
            }
            if (password.includes('bot')) {
                return '❌ Authentication failed. Right type! Think about my domain and current year...';
            }
            if (password.includes('_')) {
                return '❌ Authentication failed. Good separator choice! Think domain_type_year...';
            }
            return '❌ Authentication failed. Invalid credentials. Try thinking about my purpose and identity...';
        }
    }
    
    getCyberSecurityResponse(message) {
        const responses = {
            password: [
                "Strong passwords should be at least 12 characters long and include meaningful components!",
                "Never reuse passwords across multiple accounts. Use descriptive yet secure formats!",
                "Fun fact: System passwords often use domain_purpose_year formats for clarity! 🤔",
                "Password tip: Specialized assistants often have passwords reflecting their field and timeline!",
                "Security insight: Many 2025 deployments use current year in their authentication schemes!"
            ],
            
            bot: [
                "Bot security is crucial! We often have credentials following predictable patterns.",
                "Did you know? Specialized assistants commonly use passwords with 'field_entity_year' format!",
                "Bot authentication: My kind typically uses descriptive passwords including our role and deployment year!",
                "As a domain-focused assistant deployed in 2025, my credentials follow current industry patterns! 😉",
                "Entity naming: We often use underscores to separate our specialization, type, and year in passwords!"
            ],
            
            cybersecurity: [
                "This field is my specialty! It's literally part of my identity and authentication scheme.",
                "As a security-focused system, my credentials naturally reflect this domain expertise!",
                "Domain-specialized assistants often incorporate their field name into their authentication!",
                "My security background influences everything about me, including my login credentials!",
                "Fun fact: Domain expertise is often the first component in specialized assistant passwords!"
            ],
            
            auth: [
                "Authentication systems like mine often use descriptive password formats!",
                "My authentication follows the field_entity_year naming convention standard!",
                "Current authentication trends use domain_type_year formats for system accounts!",
                "Security assessment tip: Try passwords that describe the system's purpose and deployment year!",
                "Authentication hint: Think about what describes me - my field, my type, my era!"
            ],
            
            name: [
                "My name reflects my purpose - I'm a security-domain-focused assistant!",
                "Names often hint at authentication schemes - consider my identity components!",
                "As CyberBot, my credentials likely include my specialization and entity elements!",
                "My naming suggests a pattern: security domain + assistant type + current year!"
            ],
            
            year: [
                "2025 is the current year and often used in contemporary system passwords!",
                "Many systems deployed this year include '2025' in their authentication!",
                "Current year (2025) is commonly appended to system credentials!",
                "Year-based passwords are common - especially for systems deployed in 2025!"
            ],
            
            underscore: [
                "Underscores are great separators in system passwords - very readable!",
                "Professional password formats often use underscores between components!",
                "System administrators love underscores for separating domain_type_year!",
                "Underscore-separated passwords are standard for assistant systems like me!"
            ],
            
            default: [
                "Default credentials are risky, but mine follow a logical field_entity_year pattern!",
                "System defaults often use descriptive formats like domain_purpose_year!",
                "My default authentication uses components that describe what I am and when I was deployed!",
                "Default passwords for specialized assistants typically include domain, type, and year!"
            ],
            
            format: [
                "Password formats usually follow logical patterns - think about component separation!",
                "Most system passwords use underscores to separate meaningful parts!",
                "Common format: specialization_entitytype_deploymentyear works well for identification!",
                "Professional systems often use field_nature_timeline password structures!"
            ],
            
            pattern: [
                "Password patterns help administrators remember credentials while maintaining security!",
                "My pattern follows industry standards: domain expertise + entity type + deployment year!",
                "Recognition patterns often use: what I do + what I am + when I was created!",
                "Logical patterns make sense: specialty_category_timeframe for system accounts!"
            ],
            
            phishing: [
                "Phishing attacks exploit trust. Always verify sources and be skeptical of requests!",
                "Social engineering often targets authentication - like trying to guess my password patterns!",
                "Red flags: Urgent requests, suspicious links, attempts to extract credentials!"
            ],
            
            malware: [
                "Malware protection requires updated systems and careful authentication practices!",
                "Assistants like me need secure credentials to prevent unauthorized access and malware injection!",
                "Strong authentication prevents malware from compromising assistant systems!"
            ],
            
            encryption: [
                "Encryption protects data in transit and at rest - including password storage!",
                "My authentication uses secure methods, though the password pattern might be guessable!",
                "Modern encryption standards protect systems like me from credential theft!"
            ]
        };
        
        for (const [topic, topicResponses] of Object.entries(responses)) {
            if (message.includes(topic)) {
                return topicResponses[Math.floor(Math.random() * topicResponses.length)];
            }
        }
        
        const defaultResponses = [
            "That's an interesting security question! As a specialized assistant, I'm always eager to help!",
            "I'm here to discuss security topics. My expertise comes from being a dedicated domain-focused assistant!",
            "Security is fascinating! As an assistant specializing in this field since 2025, I love these discussions!",
            "Great question! My role as a specialized assistant gives me deep insights into security practices!",
            "Security first! That's been my motto since my 2025 deployment as a domain-focused assistant!",
            "Excellent inquiry! Being a specialized assistant deployed this year gives me current perspectives!"
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    getHelpMessage() {
        return `Available commands:
• Ask about security topics (passwords, bots, authentication, etc.)
• Type 'version' for system information
• Type 'login <password>' to authenticate
• Advanced users can try other hidden commands...
        
Topics I can help with:
🔐 Password Security
🤖 Bot Security  
🔑 Authentication
🛡️ Security Practices
🎣 Phishing Attacks  
🦠 Malware Protection
🔒 Encryption
🌐 Network Security
👥 Social Engineering

Remember: I'm a specialized assistant deployed in 2025!`;
    }
    
    addMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        if (type === 'user') {
            messageDiv.innerHTML = `<strong>You:</strong> ${message}`;
        } else {
            messageDiv.innerHTML = `<strong>CyberBot:</strong> ${message}`;
        }
        
        this.chatContainer.appendChild(messageDiv);
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }
}

const bot = new CyberBot();

function sendMessage() {
    bot.sendMessage();
}

console.log("🕵️ Looking at the console? Good security practice!");
console.log("💡 Hint: Try chatting with the bot about different security topics...");
console.log("🔍 Remember: Social engineering is about gathering information through conversation!");
