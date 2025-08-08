// Global variables
let settings = {
    theme: 'dark',
    animations: true,
    saveHistory: true,
    analytics: true
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Create star background
    createStarBackground();
    
    // Initialize Firebase
    initializeFirebase();
    
    // Load settings from localStorage
    loadSettings();
    
    // Apply current theme
    applyTheme(settings.theme);
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup mouse glow effect
    setupMouseGlow();
    
    // Add ripple effect to buttons
    setupRippleEffect();
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('Welcome to Humizez AI!', 'info');
    }, 1000);
    
    // Initialize the chat functionality
    initializeChat();
    
    // Initialize tier controls
    initializeTierControls();
});

// Star background animation
function createStarBackground() {
    try {
        if (!settings?.animations) return;
        
        const starBackground = document.getElementById('starBackground');
        if (!starBackground) return;
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const starCount = Math.floor((windowWidth * windowHeight) / 10000); // Adjust star density based on screen size
        
        starBackground.innerHTML = '';
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random position
            const x = Math.random() * windowWidth;
            const y = Math.random() * windowHeight;
            
            // Random size based on window dimensions
            const size = Math.random() * (windowWidth / 500) + 1;
            
            // Random animation duration and delay
            const duration = Math.random() * 5 + 3; // 3-8 seconds
            const delay = Math.random() * 5; // 0-5 seconds
            const brightness = Math.random() * 0.7 + 0.3; // 0.3-1.0 opacity
            
            star.style.cssText = `
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                --duration: ${duration}s;
                --delay: ${delay}s;
                --brightness: ${brightness};
            `;
            
            starBackground.appendChild(star);
        }
    } catch (e) {
        console.error('Error creating star background:', e);
    }
}

// Mouse following glow effect
function setupMouseGlow() {
    try {
        if (!settings?.animations) return;
        
        const mouseGlow = document.getElementById('mouseGlow');
        if (!mouseGlow) return;
        
        document.addEventListener('mousemove', (e) => {
            mouseGlow.style.left = e.clientX + 'px';
            mouseGlow.style.top = e.clientY + 'px';
        });
    } catch (e) {
        console.error('Error setting up mouse glow:', e);
    }
}

// Setup event listeners with error handling
function setupEventListeners() {
    try {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
        
        // Settings button
        const settingsButton = document.getElementById('settingsButton');
        if (settingsButton) {
            settingsButton.addEventListener('click', () => {
                const settingsModal = document.getElementById('settingsModal');
                if (settingsModal) {
                    settingsModal.style.display = 'block';
                    populateSettingsForm();
                }
            });
        }
        
        // About button
        const aboutButton = document.getElementById('aboutButton');
        if (aboutButton) {
            aboutButton.addEventListener('click', () => {
                const aboutModal = document.getElementById('aboutModal');
                if (aboutModal) {
                    aboutModal.style.display = 'block';
                    updateVisitorStats();
                }
            });
        }
        
        // Presets button
        const presetsButton = document.getElementById('presetsButton');
        if (presetsButton) {
            presetsButton.addEventListener('click', () => {
                const presetsModal = document.getElementById('presetsModal');
                if (presetsModal) {
                    presetsModal.style.display = 'block';
                    loadPresets();
                }
            });
        }
        
        // Save preset button (in controls)
        const savePresetButton = document.getElementById('savePresetButton');
        if (savePresetButton) {
            savePresetButton.addEventListener('click', () => {
                const presetsModal = document.getElementById('presetsModal');
                const presetName = document.getElementById('presetName');
                if (presetsModal && presetName) {
                    presetsModal.style.display = 'block';
                    presetName.focus();
                    loadPresets();
                }
            });
        }
        
        // Save preset button (in modal)
        const savePresetBtn = document.getElementById('savePresetBtn');
        if (savePresetBtn) {
            savePresetBtn.addEventListener('click', savePreset);
        }
        
        // Clear chat button
        const clearChatButton = document.getElementById('clearChatButton');
        if (clearChatButton) {
            clearChatButton.addEventListener('click', clearChat);
        }
        
        // Close modals
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', function() {
                const modal = this.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });
        
        // Close modals when clicking outside
        window.addEventListener('click', function(event) {
            document.querySelectorAll('.modal').forEach(modal => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
        
        // Theme selector in settings
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const theme = this.getAttribute('data-theme');
                if (theme) {
                    applyTheme(theme);
                    settings.theme = theme;
                    saveSettings();
                    
                    // Update active state
                    document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
        
        // Animation toggle
        const animationToggle = document.getElementById('animationToggle');
        if (animationToggle) {
            animationToggle.addEventListener('change', function() {
                settings.animations = this.checked;
                saveSettings();
                
                if (settings.animations) {
                    createStarBackground();
                    setupMouseGlow();
                } else {
                    const starBackground = document.getElementById('starBackground');
                    const mouseGlow = document.getElementById('mouseGlow');
                    if (starBackground) starBackground.innerHTML = '';
                    if (mouseGlow) mouseGlow.style.display = 'none';
                }
            });
        }
        
        // Save history toggle
        const saveHistoryToggle = document.getElementById('saveHistoryToggle');
        if (saveHistoryToggle) {
            saveHistoryToggle.addEventListener('change', function() {
                settings.saveHistory = this.checked;
                saveSettings();
            });
        }
        
        // Analytics toggle
        const analyticsToggle = document.getElementById('analyticsToggle');
        if (analyticsToggle) {
            analyticsToggle.addEventListener('change', function() {
                settings.analytics = this.checked;
                saveSettings();
            });
        }
        
        // Window resize handler for stars
        window.addEventListener('resize', () => {
            // Debounce the resize event
            clearTimeout(window.resizeTimeout);
            window.resizeTimeout = setTimeout(() => {
                if (settings.animations) {
                    createStarBackground();
                }
            }, 250);
        });
    } catch (e) {
        console.error('Error setting up event listeners:', e);
    }
}

// Setup ripple effect for buttons
function setupRippleEffect() {
    try {
        document.querySelectorAll('.btn, .about-btn, .theme-btn, .preset-btn, .action-btn, .tier-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                if (!settings.animations) return;
                
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    } catch (e) {
        console.error('Error setting up ripple effect:', e);
    }
}

// Toggle theme
function toggleTheme() {
    try {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        applyTheme(newTheme);
        settings.theme = newTheme;
        saveSettings();
    } catch (e) {
        console.error('Error toggling theme:', e);
    }
}

// Apply theme
function applyTheme(theme) {
    try {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update theme toggle icon
        const themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        
        // Update theme buttons in settings
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
            }
        });
    } catch (e) {
        console.error('Error applying theme:', e);
    }
}

// Load settings from localStorage
function loadSettings() {
    try {
        const savedSettings = localStorage.getItem('humizezAISettings');
        if (savedSettings) {
            settings = JSON.parse(savedSettings);
        }
    } catch (e) {
        console.error('Failed to parse settings:', e);
    }
}

// Save settings to localStorage
function saveSettings() {
    try {
        localStorage.setItem('humizezAISettings', JSON.stringify(settings));
    } catch (e) {
        console.error('Failed to save settings:', e);
    }
}

// Populate settings form with current settings
function populateSettingsForm() {
    try {
        // Theme
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === settings.theme) {
                btn.classList.add('active');
            }
        });
        
        // Animations
        const animationToggle = document.getElementById('animationToggle');
        if (animationToggle) {
            animationToggle.checked = settings.animations;
        }
        
        // Save history
        const saveHistoryToggle = document.getElementById('saveHistoryToggle');
        if (saveHistoryToggle) {
            saveHistoryToggle.checked = settings.saveHistory;
        }
        
        // Analytics
        const analyticsToggle = document.getElementById('analyticsToggle');
        if (analyticsToggle) {
            analyticsToggle.checked = settings.analytics;
        }
    } catch (e) {
        console.error('Error populating settings form:', e);
    }
}

// Firebase configuration and visitor tracking
function initializeFirebase() {
    try {
        // Your Firebase configuration - REPLACE WITH YOUR OWN FIREBASE CONFIG
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
            databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_PROJECT_ID.appspot.com",
            messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
            appId: "YOUR_APP_ID"
        };

        // Check if Firebase is already initialized
        if (typeof firebase !== 'undefined' && !firebase.apps.length) {
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            
            // Track visitor
            trackVisitor();
        }
    } catch (error) {
        console.error("Firebase initialization error:", error);
        // Continue without Firebase
    }
}

// Add notification system
function showNotification(message, type = 'info') {
    try {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 18px;
            background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : type === 'error' ? 'rgba(239, 68, 68, 0.9)' : type === 'warning' ? 'rgba(245, 158, 11, 0.9)' : 'rgba(139, 92, 246, 0.9)'};
            color: white;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            z-index: 10000;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        // Add icon based on type
        const icon = document.createElement('i');
        icon.className = `fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}`;
        
        notification.appendChild(icon);
        notification.appendChild(document.createTextNode(message));
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    } catch (e) {
        console.error('Error showing notification:', e);
    }
}

// Clear all data
function clearAllData() {
    try {
        if (confirm('Are you sure you want to clear all data? This will remove your settings, presets, and chat history.')) {
            localStorage.removeItem('humizezAISettings');
            localStorage.removeItem('visitorId');
            localStorage.removeItem('chatHistory');
            localStorage.removeItem('humizezPresets');
            localStorage.removeItem('humanizeCount');
            
            showNotification('All data has been cleared. The page will now reload.', 'info');
            
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    } catch (e) {
        console.error('Error clearing data:', e);
        showNotification('Failed to clear data', 'error');
    }
}

// Function to track visitor
function trackVisitor() {
    try {
        // This would typically send data to your analytics service
        console.log('Visitor tracked at:', new Date().toISOString());
        
        // Generate a unique visitor ID if not exists
        if (!localStorage.getItem('visitorId')) {
            const visitorId = 'visitor_' + Math.random().toString(36).substring(2, 15);
            localStorage.setItem('visitorId', visitorId);
        }
    } catch (e) {
        console.error('Error tracking visitor:', e);
    }
}

// Function to update visitor stats
function updateVisitorStats() {
    try {
        // This would typically fetch data from your analytics service
        const scanCount = document.getElementById('scanCount');
        if (scanCount) {
            // Get stored count
            let count = parseInt(localStorage.getItem('humanizeCount')) || 0;
            scanCount.textContent = count.toLocaleString();
        }
    } catch (e) {
        console.error('Error updating visitor stats:', e);
    }
}

// Clear chat function
function clearChat() {
    try {
        if (confirm('Are you sure you want to clear the chat history?')) {
            const chatContainer = document.getElementById('chatContainer');
            if (!chatContainer) {
                console.error('Chat container not found');
                return;
            }
            
            // Clear the chat container
            chatContainer.innerHTML = '';
            
            // Add welcome message
            const welcomeMessage = document.createElement('div');
            welcomeMessage.className = 'message ai-message';
            welcomeMessage.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="message-content">
                    <div class="message-text">Chat cleared! Paste AI-generated text below and I'll make it sound more human.</div>
                    <div class="message-time">
                        ${getCurrentTime()}
                        <button class="copy-btn" title="Copy to clipboard" onclick="copyWelcomeMessage()">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </div>
            `;
            chatContainer.appendChild(welcomeMessage);
            
            // Clear local storage if save history is enabled
            if (settings.saveHistory) {
                localStorage.removeItem('chatHistory');
            }
            
            showNotification('Chat history cleared', 'success');
        }
    } catch (e) {
        console.error('Error clearing chat:', e);
        showNotification('Failed to clear chat', 'error');
    }
}

// Function to copy welcome message
function copyWelcomeMessage() {
    const welcomeText = "Welcome to Humizez AI! Paste AI-generated text below and I'll make it sound more human. Choose a humanization level to customize the output.";
    
    navigator.clipboard.writeText(welcomeText).then(() => {
        const copyBtn = document.querySelector('.message.ai-message .copy-btn');
        if (copyBtn) {
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            copyBtn.classList.add('copied');
            
            // Reset button after 2 seconds
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                copyBtn.classList.remove('copied');
            }, 2000);
        }
        
        showNotification('Text copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        showNotification('Failed to copy text', 'error');
    });
}

// Save preset function
function savePreset() {
    try {
        const presetNameInput = document.getElementById('presetName');
        if (!presetNameInput) {
            showNotification('Preset name input not found', 'error');
            return;
        }
        
        const presetName = presetNameInput.value.trim();
        
        if (!presetName) {
            showNotification('Please enter a preset name', 'error');
            return;
        }
        
        // Get current settings
        const humanizeStyle = document.getElementById('humanizeStyle');
        const humanizeStrength = document.getElementById('humanizeStrength');
        const complexityLevel = document.getElementById('complexityLevel');
        const punctuationLevel = document.getElementById('punctuationLevel');
        const allowMisspellings = document.getElementById('allowMisspellings');
        const allowEmojis = document.getElementById('allowEmojis');
        
        if (!humanizeStyle || !humanizeStrength || !complexityLevel || 
            !punctuationLevel || !allowMisspellings || !allowEmojis) {
            showNotification('Some control elements not found', 'error');
            return;
        }
        
        const preset = {
            name: presetName,
            style: humanizeStyle.value,
            strength: humanizeStrength.value,
            complexity: complexityLevel.value,
            punctuation: punctuationLevel.value,
            allowMisspellings: allowMisspellings.checked,
            allowEmojis: allowEmojis.checked,
            timestamp: new Date().toISOString()
        };
        
        // Get existing presets or create new array
        let presets = [];
        try {
            const savedPresets = localStorage.getItem('humizezPresets');
            presets = savedPresets ? JSON.parse(savedPresets) : [];
        } catch (e) {
            console.error('Failed to parse saved presets:', e);
            presets = [];
        }
        
        // Check if preset with same name exists
        const existingIndex = presets.findIndex(p => p.name === presetName);
        if (existingIndex !== -1) {
            if (confirm(`A preset named "${presetName}" already exists. Do you want to replace it?`)) {
                presets[existingIndex] = preset;
            } else {
                return;
            }
        } else {
            presets.push(preset);
        }
        
        // Save presets
        localStorage.setItem('humizezPresets', JSON.stringify(presets));
        
        // Clear input
        presetNameInput.value = '';
        
        // Reload presets
        loadPresets();
        
        showNotification(`Preset "${presetName}" saved successfully`, 'success');
    } catch (e) {
        console.error('Error saving preset:', e);
        showNotification('Failed to save preset', 'error');
    }
}

// Load presets function
function loadPresets() {
    try {
        const presetsList = document.getElementById('presetsList');
        if (!presetsList) {
            console.error('Presets list element not found');
            return;
        }
        
        let presets = [];
        try {
            const savedPresets = localStorage.getItem('humizezPresets');
            presets = savedPresets ? JSON.parse(savedPresets) : [];
        } catch (e) {
            console.error('Failed to parse saved presets:', e);
            presets = [];
        }
        
        // Clear the list
        presetsList.innerHTML = '';
        
        if (presets.length === 0) {
            // Show empty state
            presetsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-bookmark"></i>
                    <p>No presets saved yet. Save your current settings as a preset to see it here.</p>
                </div>
            `;
            return;
        }
        
        // Sort presets by name
        presets.sort((a, b) => a.name.localeCompare(b.name));
        
        // Add each preset to the list
        presets.forEach(preset => {
            const presetItem = document.createElement('div');
            presetItem.className = 'preset-item';
            presetItem.innerHTML = `
                <div class="preset-info">
                    <div class="preset-name">${preset.name}</div>
                    <div class="preset-details">
                        ${preset.style.charAt(0).toUpperCase() + preset.style.slice(1)}, 
                        Strength: ${preset.strength}, 
                        ${preset.complexity.charAt(0).toUpperCase() + preset.complexity.slice(1)}
                    </div>
                </div>
                <div class="preset-actions">
                    <button class="preset-btn-small apply-preset" data-preset="${preset.name}" title="Apply Preset">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="preset-btn-small delete preset-delete" data-preset="${preset.name}" title="Delete Preset">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            presetsList.appendChild(presetItem);
        });
        
        // Add event listeners to buttons
        document.querySelectorAll('.apply-preset').forEach(btn => {
            btn.addEventListener('click', function() {
                const presetName = this.getAttribute('data-preset');
                if (presetName) {
                    applyPreset(presetName);
                }
            });
        });
        
        document.querySelectorAll('.preset-delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const presetName = this.getAttribute('data-preset');
                if (presetName) {
                    deletePreset(presetName);
                }
            });
        });
    } catch (e) {
        console.error('Error loading presets:', e);
    }
}

// Apply preset function
function applyPreset(presetName) {
    try {
        let presets = [];
        try {
            const savedPresets = localStorage.getItem('humizezPresets');
            presets = savedPresets ? JSON.parse(savedPresets) : [];
        } catch (e) {
            console.error('Failed to parse saved presets:', e);
            presets = [];
        }
        
        const preset = presets.find(p => p.name === presetName);
        
        if (!preset) {
            showNotification('Preset not found', 'error');
            return;
        }
        
        // Get control elements
        const humanizeStyle = document.getElementById('humanizeStyle');
        const humanizeStrength = document.getElementById('humanizeStrength');
        const strengthValue = document.getElementById('strengthValue');
        const complexityLevel = document.getElementById('complexityLevel');
        const punctuationLevel = document.getElementById('punctuationLevel');
        const allowMisspellings = document.getElementById('allowMisspellings');
        const allowEmojis = document.getElementById('allowEmojis');
        
        if (!humanizeStyle || !humanizeStrength || !strengthValue || !complexityLevel || 
            !punctuationLevel || !allowMisspellings || !allowEmojis) {
            showNotification('Some control elements not found', 'error');
            return;
        }
        
        // Apply settings
        humanizeStyle.value = preset.style;
        humanizeStrength.value = preset.strength;
        strengthValue.textContent = preset.strength;
        complexityLevel.value = preset.complexity;
        punctuationLevel.value = preset.punctuation;
        allowMisspellings.checked = preset.allowMisspellings;
        allowEmojis.checked = preset.allowEmojis;
        
        // Close modal
        const presetsModal = document.getElementById('presetsModal');
        if (presetsModal) {
            presetsModal.style.display = 'none';
        }
        
        // Show advanced controls if they're hidden
        const advancedControls = document.getElementById('advancedControls');
        if (advancedControls && advancedControls.style.display === 'none') {
            advancedControls.style.display = 'block';
            
            // Update tier buttons to show none active
            document.querySelectorAll('.tier-btn:not(.settings)').forEach(btn => {
                btn.classList.remove('active');
            });
        }
        
        showNotification(`Preset "${presetName}" applied`, 'success');
    } catch (e) {
        console.error('Error applying preset:', e);
        showNotification('Failed to apply preset', 'error');
    }
}

// Delete preset function
function deletePreset(presetName) {
    try {
        if (confirm(`Are you sure you want to delete the preset "${presetName}"?`)) {
            let presets = [];
            try {
                const savedPresets = localStorage.getItem('humizezPresets');
                presets = savedPresets ? JSON.parse(savedPresets) : [];
            } catch (e) {
                console.error('Failed to parse saved presets:', e);
                presets = [];
            }
            
            presets = presets.filter(p => p.name !== presetName);
            localStorage.setItem('humizezPresets', JSON.stringify(presets));
            
            // Reload presets
            loadPresets();
            
            showNotification(`Preset "${presetName}" deleted`, 'success');
        }
    } catch (e) {
        console.error('Error deleting preset:', e);
        showNotification('Failed to delete preset', 'error');
    }
}

// Get current time helper
function getCurrentTime() {
    try {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        return `${hours}:${minutes} ${ampm}`;
    } catch (e) {
        console.error('Error getting current time:', e);
        return 'Unknown time';
    }
}

// Initialize tier controls
function initializeTierControls() {
    try {
        // Set up tier buttons
        const tierButtons = document.querySelectorAll('.tier-btn:not(.settings)');
        const advancedSettingsBtn = document.getElementById('advancedSettings');
        const advancedControls = document.getElementById('advancedControls');
        
        // Preset configurations for each tier
        const tierConfigs = {
            basic: {
                style: 'casual',
                strength: 4,
                complexity: 'simple',
                punctuation: 'normal',
                allowMisspellings: false,
                allowEmojis: false
            },
            enhanced: {
                style: 'casual',
                strength: 7,
                complexity: 'moderate',
                punctuation: 'normal',
                allowMisspellings: true,
                allowEmojis: false
            },
            undetectable: {
                style: 'casual',
                strength: 9,
                complexity: 'moderate',
                punctuation: 'normal',
                allowMisspellings: true,
                allowEmojis: true
            },
            maximumEvasion: {
                style: 'casual',
                strength: 10,
                complexity: 'simple', // Simple is actually better for evasion
                punctuation: 'minimal', // Less consistent punctuation helps evade
                allowMisspellings: true,
                allowEmojis: false,
                // New specialized settings
                useExtremeBurstiness: true,
                usePerplexityEnhancement: true,
                addHumanMarkers: true,
                addSelfReferences: true
            }
        };
        
        // Function to apply tier configuration
        function applyTierConfig(tier) {
            const config = tierConfigs[tier];
            if (!config) return;
            
            // Update UI controls
            const humanizeStyle = document.getElementById('humanizeStyle');
            const humanizeStrength = document.getElementById('humanizeStrength');
            const strengthValue = document.getElementById('strengthValue');
            const complexityLevel = document.getElementById('complexityLevel');
            const punctuationLevel = document.getElementById('punctuationLevel');
            const allowMisspellings = document.getElementById('allowMisspellings');
            const allowEmojis = document.getElementById('allowEmojis');
            
            if (humanizeStyle) humanizeStyle.value = config.style;
            if (humanizeStrength) {
                humanizeStrength.value = config.strength;
                if (strengthValue) strengthValue.textContent = config.strength;
            }
            if (complexityLevel) complexityLevel.value = config.complexity;
            if (punctuationLevel) punctuationLevel.value = config.punctuation;
            if (allowMisspellings) allowMisspellings.checked = config.allowMisspellings;
            if (allowEmojis) allowEmojis.checked = config.allowEmojis;
            
            // Save the current tier in settings
            settings.currentTier = tier;
            saveSettings();
        }
        
        // Set up tier button click handlers
        tierButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const tier = this.getAttribute('data-tier');
                if (!tier) return;
                
                // Update active state
                tierButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Hide advanced controls
                if (advancedControls) {
                    advancedControls.style.display = 'none';
                }
                
                // Apply tier configuration
                applyTierConfig(tier);
                
                showNotification(`${tier.charAt(0).toUpperCase() + tier.slice(1)} humanization level selected`, 'info');
            });
        });
        
        // Set up advanced settings button
        if (advancedSettingsBtn && advancedControls) {
            advancedSettingsBtn.addEventListener('click', function() {
                // Toggle advanced controls
                const isVisible = advancedControls.style.display !== 'none';
                advancedControls.style.display = isVisible ? 'none' : 'block';
                
                // If showing advanced controls, remove active state from tier buttons
                if (!isVisible) {
                    tierButtons.forEach(btn => btn.classList.remove('active'));
                    settings.currentTier = 'custom';
                    saveSettings();
                }
            });
        }
        
        // Apply saved tier or default to basic
        const currentTier = settings.currentTier || 'basic';
        if (currentTier === 'custom') {
            // Show advanced controls and deactivate tier buttons
            if (advancedControls) {
                advancedControls.style.display = 'block';
            }
            tierButtons.forEach(btn => btn.classList.remove('active'));
        } else {
            // Activate the saved tier button
            const tierBtn = document.querySelector(`.tier-btn[data-tier="${currentTier}"]`);
            if (tierBtn) {
                tierBtn.classList.add('active');
                applyTierConfig(currentTier);
            } else {
                // Default to basic if saved tier not found
                const basicBtn = document.querySelector('.tier-btn[data-tier="basic"]');
                if (basicBtn) {
                    basicBtn.classList.add('active');
                    applyTierConfig('basic');
                }
            }
        }
    } catch (e) {
        console.error('Error initializing tier controls:', e);
    }
}

// Initialize chat functionality
function initializeChat() {
    try {
        const chatContainer = document.getElementById('chatContainer');
        const userInput = document.getElementById('userInput');
        const sendButton = document.getElementById('sendButton');
        
        // Check if all required elements exist
        if (!chatContainer || !userInput || !sendButton) {
            console.error('Some chat UI elements not found');
            return;
        }
        
        // Load chat history if enabled
        if (settings.saveHistory) {
            loadChatHistory();
        }
        
        // Auto-resize textarea as user types
        userInput.addEventListener('input', function() {
            try {
                this.style.height = 'auto';
                const newHeight = Math.min(this.scrollHeight, 150);
                this.style.height = newHeight + 'px';
            } catch (e) {
                console.error('Error resizing textarea:', e);
            }
        });
        
        // Send message on Enter key (but allow Shift+Enter for new lines)
        userInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                processText();
            }
        });
        
        // Send button click
        sendButton.addEventListener('click', processText);
                
        function processText() {
            try {
                const text = userInput.value.trim();
                if (!text) {
                    showNotification('Please enter some text to humanize', 'warning');
                    return;
                }
                
                // Add original text to chat
                addMessage(text, 'user');
                
                // Clear input
                userInput.value = '';
                userInput.style.height = 'auto';
                
                // Show processing indicator
                showProcessingIndicator();
                
                // Get all selected options
                const currentTier = settings.currentTier || 'basic';
                let options;
                
                if (currentTier === 'custom') {
                    // Use advanced controls
                    const humanizeStyle = document.getElementById('humanizeStyle');
                    const humanizeStrength = document.getElementById('humanizeStrength');
                    const complexityLevel = document.getElementById('complexityLevel');
                    const punctuationLevel = document.getElementById('punctuationLevel');
                    const allowMisspellings = document.getElementById('allowMisspellings');
                    const allowEmojis = document.getElementById('allowEmojis');
                    
                    options = {
                        style: humanizeStyle ? humanizeStyle.value : 'casual',
                        strength: humanizeStrength ? parseInt(humanizeStrength.value) : 5,
                        complexity: complexityLevel ? complexityLevel.value : 'moderate',
                        punctuation: punctuationLevel ? punctuationLevel.value : 'normal',
                        allowMisspellings: allowMisspellings ? allowMisspellings.checked : false,
                        allowEmojis: allowEmojis ? allowEmojis.checked : false
                    };
                } else {
                    // Use tier configuration
                    const tierConfigs = {
                        basic: {
                            style: 'casual',
                            strength: 4,
                            complexity: 'simple',
                            punctuation: 'normal',
                            allowMisspellings: false,
                            allowEmojis: false,
                            tier: 'basic'
                        },
                        enhanced: {
                            style: 'casual',
                            strength: 7,
                            complexity: 'moderate',
                            punctuation: 'normal',
                            allowMisspellings: true,
                            allowEmojis: false,
                            tier: 'enhanced'
                        },
                        undetectable: {
                            style: 'casual',
                            strength: 9, // Changed from 10 to 9 for better stability
                            complexity: 'moderate',
                            punctuation: 'normal',
                            allowMisspellings: true,
                            allowEmojis: true,
                            tier: 'undetectable'
                        },
                        maximumEvasion: {
                            style: 'casual',
                            strength: 10,
                            complexity: 'simple',
                            punctuation: 'minimal',
                            allowMisspellings: true,
                            allowEmojis: false,
                            tier: 'maximumEvasion',
                            useExtremeBurstiness: true,
                            usePerplexityEnhancement: true,
                            addHumanMarkers: true,
                            addSelfReferences: true
                        }
                    };
                    
                    options = tierConfigs[currentTier] || tierConfigs.basic;
                }
                
                // Process with slight delay to show the processing indicator
                setTimeout(() => {
                    try {
                        // Remove processing indicator
                        removeProcessingIndicator();
                        
                        // Set a timeout to prevent processing from taking too long
                        const timeoutPromise = new Promise((resolve, reject) => {
                            setTimeout(() => {
                                reject(new Error("Processing timed out"));
                            }, 5000); // 5 second timeout
                        });
                        
                        // Process the text with a timeout
                        Promise.race([
                            new Promise(resolve => {
                                // Humanize the text with all options using the unified API
                                const humanizedText = HumanizerEngine.humanizeText(text, options);
                                resolve(humanizedText);
                            }),
                            timeoutPromise
                        ])
                        .then(humanizedText => {
                            // Add humanized text to chat
                            addMessage(humanizedText, 'ai');
                            
                            // Update stats
                            updateHumanizeCount();
                        })
                        .catch(error => {
                            console.error('Error or timeout in text processing:', error);
                            
                            // Use emergency humanization as fallback
                            const fallbackText = "I've tried to humanize your text, but encountered some challenges. Here's a simpler version: \n\n" + 
                                HumanizerEngine.emergencyHumanize(text);
                            
                            addMessage(fallbackText, 'ai');
                        });
                        
                    } catch (e) {
                        console.error('Error processing text:', e);
                        removeProcessingIndicator();
                        
                        // Use emergency humanization
                        const fallbackText = "I've tried to humanize your text, but encountered an error. Here's a simpler version: \n\n" + 
                            HumanizerEngine.emergencyHumanize(text);
                        
                        addMessage(fallbackText, 'ai');
                    }
                }, 800 + Math.random() * 1200); // Random delay between 0.8-2 seconds
            } catch (e) {
                console.error('Error in processText:', e);
                showNotification('An error occurred while processing your text', 'error');
            }
        }

        function addMessage(text, sender) {
            try {
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${sender}-message`;
                
                const avatar = document.createElement('div');
                avatar.className = 'message-avatar';
                
                const icon = document.createElement('i');
                icon.className = sender === 'user' ? 'fas fa-robot' : 'fas fa-user';
                avatar.appendChild(icon);
                
                const content = document.createElement('div');
                content.className = 'message-content';
                
                const messageText = document.createElement('div');
                messageText.className = 'message-text';
                messageText.textContent = text;
                
                const messageTime = document.createElement('div');
                messageTime.className = 'message-time';
                messageTime.textContent = getCurrentTime();
                
                // Add copy button for AI responses only
                if (sender === 'ai') {
                    const copyButton = document.createElement('button');
                    copyButton.className = 'copy-btn';
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                    copyButton.title = 'Copy to clipboard';
                    copyButton.addEventListener('click', function() {
                        navigator.clipboard.writeText(text).then(() => {
                            // Show success feedback
                            copyButton.innerHTML = '<i class="fas fa-check"></i>';
                            copyButton.classList.add('copied');
                            
                            // Reset button after 2 seconds
                            setTimeout(() => {
                                copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                                copyButton.classList.remove('copied');
                            }, 2000);
                            
                            showNotification('Text copied to clipboard!', 'success');
                        }).catch(err => {
                            console.error('Failed to copy text: ', err);
                            showNotification('Failed to copy text', 'error');
                        });
                    });
                    
                    messageTime.appendChild(copyButton);
                }
                
                content.appendChild(messageText);
                content.appendChild(messageTime);
                
                messageDiv.appendChild(avatar);
                messageDiv.appendChild(content);
                
                chatContainer.appendChild(messageDiv);
                
                // Scroll to bottom
                chatContainer.scrollTop = chatContainer.scrollHeight;
                
                // Save to history if enabled
                if (settings.saveHistory) {
                    saveChatMessage(text, sender);
                }
                
                // Track analytics if enabled
                if (settings.analytics) {
                    trackMessageAnalytics(sender);
                }
            } catch (e) {
                console.error('Error adding message:', e);
            }
        }
        
        function showProcessingIndicator() {
            try {
                const processingDiv = document.createElement('div');
                processingDiv.className = 'message ai-message processing-indicator';
                processingDiv.id = 'processingIndicator';
                
                const avatar = document.createElement('div');
                avatar.className = 'message-avatar';
                
                const icon = document.createElement('i');
                icon.className = 'fas fa-user';
                avatar.appendChild(icon);
                
                const content = document.createElement('div');
                content.className = 'message-content';
                
                const dots = document.createElement('div');
                dots.className = 'typing-dots';
                dots.innerHTML = '<span></span><span></span><span></span>';
                
                content.appendChild(dots);
                processingDiv.appendChild(avatar);
                processingDiv.appendChild(content);
                
                chatContainer.appendChild(processingDiv);
                chatContainer.scrollTop = chatContainer.scrollHeight;
            } catch (e) {
                console.error('Error showing processing indicator:', e);
            }
        }
        
        function removeProcessingIndicator() {
            try {
                const processingIndicator = document.getElementById('processingIndicator');
                if (processingIndicator) {
                    processingIndicator.remove();
                }
            } catch (e) {
                console.error('Error removing processing indicator:', e);
            }
        }
        
        // Update humanize count
        function updateHumanizeCount() {
            try {
                let count = parseInt(localStorage.getItem('humanizeCount')) || 0;
                count++;
                localStorage.setItem('humanizeCount', count);
                
                // Update the display in the about modal if it's open
                const scanCount = document.getElementById('scanCount');
                if (scanCount) {
                    scanCount.textContent = count.toLocaleString();
                }
            } catch (e) {
                console.error('Error updating humanize count:', e);
            }
        }
        
        function saveChatMessage(text, sender) {
            try {
                // Get existing history or create new
                let chatHistory = [];
                try {
                    const savedHistory = localStorage.getItem('chatHistory');
                    chatHistory = savedHistory ? JSON.parse(savedHistory) : [];
                } catch (e) {
                    console.error('Failed to parse chat history:', e);
                    chatHistory = [];
                }
                
                // Add new message
                chatHistory.push({
                    text: text,
                    sender: sender,
                    timestamp: new Date().toISOString()
                });
                
                // Limit history to last 50 messages
                if (chatHistory.length > 50) {
                    chatHistory = chatHistory.slice(-50);
                }
                
                // Save back to localStorage
                localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
            } catch (e) {
                console.error('Failed to save chat history:', e);
            }
        }
        
        function loadChatHistory() {
            try {
                let chatHistory = [];
                try {
                    const savedHistory = localStorage.getItem('chatHistory');
                    chatHistory = savedHistory ? JSON.parse(savedHistory) : [];
                } catch (e) {
                    console.error('Failed to parse chat history:', e);
                    chatHistory = [];
                }
                
                // If we have history, clear the default welcome message
                if (chatHistory && chatHistory.length > 0) {
                    chatContainer.innerHTML = '';
                    
                    // Add messages from history
                    chatHistory.forEach(msg => {
                        try {
                            const messageDiv = document.createElement('div');
                            messageDiv.className = `message ${msg.sender}-message`;
                            
                            const avatar = document.createElement('div');
                            avatar.className = 'message-avatar';
                            
                            const icon = document.createElement('i');
                            icon.className = msg.sender === 'user' ? 'fas fa-robot' : 'fas fa-user';
                            avatar.appendChild(icon);
                            
                            const content = document.createElement('div');
                            content.className = 'message-content';
                            
                            const messageText = document.createElement('div');
                            messageText.className = 'message-text';
                            messageText.textContent = msg.text || '';
                            
                            const messageTime = document.createElement('div');
                            messageTime.className = 'message-time';
                            
                            // Format the timestamp
                            try {
                                const date = new Date(msg.timestamp);
                                const hours = date.getHours() % 12 || 12;
                                const minutes = date.getMinutes().toString().padStart(2, '0');
                                const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
                                messageTime.textContent = `${hours}:${minutes} ${ampm}`;
                            } catch (e) {
                                messageTime.textContent = 'Unknown time';
                            }
                            
                            // Add copy button for AI responses
                            if (msg.sender === 'ai') {
                                const copyButton = document.createElement('button');
                                copyButton.className = 'copy-btn';
                                copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                                copyButton.title = 'Copy to clipboard';
                                copyButton.addEventListener('click', function() {
                                    navigator.clipboard.writeText(msg.text).then(() => {
                                        // Show success feedback
                                        copyButton.innerHTML = '<i class="fas fa-check"></i>';
                                        copyButton.classList.add('copied');
                                        
                                        // Reset button after 2 seconds
                                        setTimeout(() => {
                                            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                                            copyButton.classList.remove('copied');
                                        }, 2000);
                                        
                                        showNotification('Text copied to clipboard!', 'success');
                                    }).catch(err => {
                                        console.error('Failed to copy text: ', err);
                                        showNotification('Failed to copy text', 'error');
                                    });
                                });
                                
                                messageTime.appendChild(copyButton);
                            }
                            
                            content.appendChild(messageText);
                            content.appendChild(messageTime);
                            
                            messageDiv.appendChild(avatar);
                            messageDiv.appendChild(content);
                            
                            chatContainer.appendChild(messageDiv);
                        } catch (e) {
                            console.error('Error adding message from history:', e);
                        }
                    });
                    
                    // Scroll to bottom
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }
            } catch (e) {
                console.error('Failed to load chat history:', e);
            }
        }
        
        function trackMessageAnalytics(sender) {
            try {
                // Simple analytics tracking - expand as needed
                console.log(`Message processed by: ${sender} at ${new Date().toISOString()}`);
                // Here you would typically send this data to your analytics service
            } catch (e) {
                console.error('Error tracking message analytics:', e);
            }
        }
    } catch (e) {
        console.error('Error initializing chat:', e);
    }
}

// Add to processText function after humanizing
function evaluateHumanization(original, humanized) {
    // Calculate basic metrics
    const originalWords = original.split(/\s+/).length;
    const humanizedWords = humanized.split(/\s+/).length;
    const wordCountDiff = Math.abs(humanizedWords - originalWords) / originalWords;
    
    // Calculate sentence structure changes
    const originalSentences = original.match(/[^.!?]+[.!?]+/g) || [original];
    const humanizedSentences = humanized.match(/[^.!?]+[.!?]+/g) || [humanized];
    const sentenceCountDiff = Math.abs(humanizedSentences.length - originalSentences.length);
    
    // Calculate effectiveness score (0-100)
    let effectivenessScore = 0;
    
    // Word count changes (0-30 points)
    effectivenessScore += Math.min(30, wordCountDiff * 100);
    
    // Sentence structure changes (0-30 points)
    effectivenessScore += Math.min(30, sentenceCountDiff * 10);
    
    // Style changes (0-40 points)
    const styleChanges = calculateStyleChanges(original, humanized);
    effectivenessScore += Math.min(40, styleChanges);
    
    // Show feedback
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'humanization-feedback';
    
    let feedbackClass, feedbackMessage;
    if (effectivenessScore > 75) {
        feedbackClass = 'excellent';
        feedbackMessage = 'Excellent humanization! This text should easily evade AI detection.';
    } else if (effectivenessScore > 50) {
        feedbackClass = 'good';
        feedbackMessage = 'Good humanization. This text should be difficult to detect as AI-generated.';
    } else if (effectivenessScore > 30) {
        feedbackClass = 'moderate';
        feedbackMessage = 'Moderate humanization. Consider increasing the strength for better results.';
    } else {
        feedbackClass = 'minimal';
        feedbackMessage = 'Minimal humanization. Try a higher strength setting or different style.';
    }
    
    feedbackDiv.innerHTML = `
        <div class="feedback-score ${feedbackClass}">
            <span class="score-value">${Math.round(effectivenessScore)}</span>
            <span class="score-label">Humanization Score</span>
        </div>
        <div class="feedback-message">${feedbackMessage}</div>
    `;
    
    // Add after the AI message
    const lastMessage = document.querySelector('.ai-message:last-child');
    if (lastMessage) {
        lastMessage.appendChild(feedbackDiv);
    }
}

// Helper function to calculate style changes
function calculateStyleChanges(original, humanized) {
    // Calculate formality changes
    const formalWords = /\b(therefore|furthermore|consequently|thus|hence)\b/gi;
    const informalWords = /\b(so|anyway|basically|like|you know)\b/gi;
    
    const originalFormalCount = (original.match(formalWords) || []).length;
    const humanizedFormalCount = (humanized.match(formalWords) || []).length;
    const formalChange = Math.abs(humanizedFormalCount - originalFormalCount);
    
    const originalInformalCount = (original.match(informalWords) || []).length;
    const humanizedInformalCount = (humanized.match(informalWords) || []).length;
    const informalChange = Math.abs(humanizedInformalCount - originalInformalCount);
    
    // Calculate punctuation changes
    const originalPunctCount = (original.match(/[,.;:!?-]/g) || []).length;
    const humanizedPunctCount = (humanized.match(/[,.;:!?-]/g) || []).length;
    const punctChange = Math.abs(humanizedPunctCount - originalPunctCount);
    
    // Return weighted score
    return (formalChange * 5) + (informalChange * 5) + (punctChange * 2);
}

