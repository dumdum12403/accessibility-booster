/**
 * AccessibilityBooster - Production Version
 * Makes any website instantly accessible
 * Version: 1.0.0
 * License: MIT
 */

(function() {
    'use strict';
    
    console.log('🚀 AccessibilityBooster v1.0.0 loading...');
    
    // Prevent multiple instances
    if (window.accessibilityBoosterActive) {
        console.log('⚠️ AccessibilityBooster already active');
        showMessage('AccessibilityBooster is already running!', '#ffc107');
        return;
    }
    
    // Global state
    window.accessibilityBoosterActive = true;
    let currentMode = null;
    let panelElement = null;
    
    // Configuration
    const CONFIG = {
        version: '1.0.0',
        panelId: 'ab-panel-v1',
        stylePrefix: 'ab-style-',
        messageId: 'ab-message',
        zIndex: 2147483647,
        feedbackEmail: 'your-email@gmail.com',
        githubRepo: 'YOUR_GITHUB_USERNAME/accessibility-booster'
    };
    
    // Utility functions
    const utils = {
        // Create unique IDs
        generateId: (prefix) => `${prefix}${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
        
        // Safe element creation
        createElement: (tag, attributes = {}, styles = {}) => {
            const element = document.createElement(tag);
            Object.entries(attributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
            Object.entries(styles).forEach(([key, value]) => {
                element.style[key] = value;
            });
            return element;
        },
        
        // Remove elements safely
        removeElements: (selector) => {
            document.querySelectorAll(selector).forEach(el => {
                try {
                    el.remove();
                } catch (e) {
                    console.warn('Could not remove element:', e);
                }
            });
        },
        
        // Check if element exists and is visible
        isVisible: (element) => {
            return element && element.offsetWidth > 0 && element.offsetHeight > 0;
        },
        
        // Detect website framework
        detectFramework: () => {
            const frameworks = {
                react: !!window.React || !!document.querySelector('[data-reactroot]'),
                angular: !!window.angular || !!window.ng,
                vue: !!window.Vue,
                jquery: !!window.jQuery || !!window.$,
                bootstrap: !!document.querySelector('link[href*="bootstrap"]'),
                shopify: !!window.Shopify,
                wordpress: !!window.wp || document.querySelector('meta[name="generator"][content*="WordPress"]')
            };
            return frameworks;
        }
    };
    
    // Main panel creation
    function createControlPanel() {
        try {
            // Remove any existing panels
            utils.removeElements(`#${CONFIG.panelId}`);
            
            const panel = utils.createElement('div', {
                id: CONFIG.panelId
            });
            
            panel.innerHTML = `
                <div style="
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
                    border: 3px solid #007cba;
                    border-radius: 16px;
                    padding: 24px;
                    z-index: ${CONFIG.zIndex};
                    box-shadow: 0 10px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(0,124,186,0.1);
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
                    font-size: 14px;
                    max-width: 320px;
                    min-width: 280px;
                    backdrop-filter: blur(10px);
                    animation: slideInRight 0.3s ease-out;
                ">
                    <style>
                        @keyframes slideInRight {
                            from {
                                opacity: 0;
                                transform: translateX(100%);
                            }
                            to {
                                opacity: 1;
                                transform: translateX(0);
                            }
                        }
                        
                        .ab-button {
                            width: 100%;
                            padding: 14px 20px;
                            margin: 6px 0;
                            border: none;
                            border-radius: 10px;
                            cursor: pointer;
                            font-size: 14px;
                            font-weight: 600;
                            transition: all 0.2s ease;
                            text-align: left;
                            display: flex;
                            align-items: center;
                            gap: 12px;
                        }
                        
                        .ab-button:hover {
                            transform: translateY(-2px);
                            box-shadow: 0 6px 20px rgba(0,0,0,0.15);
                        }
                        
                        .ab-button:active {
                            transform: translateY(0);
                        }
                        
                        .ab-button.active {
                            box-shadow: inset 0 2px 8px rgba(0,0,0,0.2);
                        }
                    </style>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <div>
                            <h3 style="margin: 0; color: #007cba; font-size: 18px; font-weight: 700;">
                                🚀 AccessibilityBooster
                            </h3>
                            <p style="margin: 4px 0 0 0; color: #6c757d; font-size: 12px;">
                                v${CONFIG.version} • Choose your mode:
                            </p>
                        </div>
                        <button id="ab-close" style="
                            background: linear-gradient(135deg, #dc3545, #c82333);
                            color: white;
                            border: none;
                            border-radius: 50%;
                            width: 32px;
                            height: 32px;
                            cursor: pointer;
                            font-size: 16px;
                            font-weight: bold;
                            box-shadow: 0 2px 8px rgba(220,53,69,0.3);
                            transition: all 0.2s ease;
                        " title="Close AccessibilityBooster">×</button>
                    </div>
                    
                    <button id="ab-focus" class="ab-button" style="
                        background: linear-gradient(135deg, #28a745, #20c997);
                        color: white;
                        box-shadow: 0 4px 12px rgba(40,167,69,0.2);
                    ">
                        <span style="font-size: 18px;">🎯</span>
                        <div>
                            <div style="font-weight: 700;">Focus Mode</div>
                            <div style="font-size: 11px; opacity: 0.9;">ADHD-friendly, reduces distractions</div>
                        </div>
                    </button>
                    
                    <button id="ab-senior" class="ab-button" style="
                        background: linear-gradient(135deg, #fd7e14, #e55353);
                        color: white;
                        box-shadow: 0 4px 12px rgba(253,126,20,0.2);
                    ">
                        <span style="font-size: 18px;">👴</span>
                        <div>
                            <div style="font-weight: 700;">Senior Mode</div>
                            <div style="font-size: 11px; opacity: 0.9;">Larger text and buttons</div>
                        </div>
                    </button>
                    
                    <button id="ab-contrast" class="ab-button" style="
                        background: linear-gradient(135deg, #6f42c1, #5a32a8);
                        color: white;
                        box-shadow: 0 4px 12px rgba(111,66,193,0.2);
                    ">
                        <span style="font-size: 18px;">🔆</span>
                        <div>
                            <div style="font-weight: 700;">High Contrast</div>
                            <div style="font-size: 11px; opacity: 0.9;">Dark theme, better visibility</div>
                        </div>
                    </button>
                    
                    <button id="ab-reset" class="ab-button" style="
                        background: linear-gradient(135deg, #6c757d, #5a6268);
                        color: white;
                        box-shadow: 0 4px 12px rgba(108,117,125,0.2);
                    ">
                        <span style="font-size: 18px;">↻</span>
                        <div>
                            <div style="font-weight: 700;">Reset to Normal</div>
                            <div style="font-size: 11px; opacity: 0.9;">Remove all modifications</div>
                        </div>
                    </button>
                    
                    <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e9ecef; text-align: center;">
                        <div style="display: flex; gap: 10px; justify-content: center; font-size: 12px;">
                            <a href="#" id="ab-feedback" style="
                                color: #007cba; 
                                text-decoration: none; 
                                font-weight: 600;
                                padding: 8px 12px;
                                border-radius: 6px;
                                transition: all 0.2s ease;
                            ">📝 Feedback</a>
                            <a href="#" id="ab-help" style="
                                color: #6c757d; 
                                text-decoration: none; 
                                font-weight: 600;
                                padding: 8px 12px;
                                border-radius: 6px;
                                transition: all 0.2s ease;
                            ">❓ Help</a>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(panel);
            panelElement = panel;
            
            // Add event listeners
            setupEventListeners();
            
            console.log('✅ AccessibilityBooster panel created successfully');
            return panel;
            
        } catch (error) {
            console.error('❌ Error creating panel:', error);
            showMessage('Error creating AccessibilityBooster panel', '#dc3545');
            return null;
        }
    }
    
    // Event listeners setup
    function setupEventListeners() {
        const elements = {
            close: document.getElementById('ab-close'),
            focus: document.getElementById('ab-focus'),
            senior: document.getElementById('ab-senior'),
            contrast: document.getElementById('ab-contrast'),
            reset: document.getElementById('ab-reset'),
            feedback: document.getElementById('ab-feedback'),
            help: document.getElementById('ab-help')
        };
        
        // Null checks and event binding
        if (elements.close) {
            elements.close.onclick = closePanel;
        }
        
        if (elements.focus) {
            elements.focus.onclick = () => enableMode('focus');
        }
        
        if (elements.senior) {
            elements.senior.onclick = () => enableMode('senior');
        }
        
        if (elements.contrast) {
            elements.contrast.onclick = () => enableMode('contrast');
        }
        
        if (elements.reset) {
            elements.reset.onclick = () => enableMode('reset');
        }
        
        if (elements.feedback) {
            elements.feedback.onclick = (e) => {
                e.preventDefault();
                openFeedback();
            };
        }
        
        if (elements.help) {
            elements.help.onclick = (e) => {
                e.preventDefault();
                showHelp();
            };
        }
        
        // Close panel on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && panelElement) {
                closePanel();
            }
        });
    }
    
    // Close panel function
    function closePanel() {
        if (panelElement) {
            panelElement.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (panelElement) {
                    panelElement.remove();
                    panelElement = null;
                }
                window.accessibilityBoosterActive = false;
            }, 300);
        }
    }
    
    // Message display system
    function showMessage(text, backgroundColor = '#28a745', duration = 3500) {
        // Remove existing messages
        utils.removeElements(`#${CONFIG.messageId}`);
        
        const message = utils.createElement('div', {
            id: CONFIG.messageId
        });
        
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: ${backgroundColor};
            color: white;
            padding: 20px 32px;
            border-radius: 12px;
            z-index: ${CONFIG.zIndex + 1};
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            font-size: 16px;
            font-weight: 600;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            max-width: 90vw;
            text-align: center;
            animation: messageSlideIn 0.3s ease-out;
        `;
        
        // Add animation styles
        const messageStyles = document.createElement('style');
        messageStyles.textContent = `
            @keyframes messageSlideIn {
                from {
                    opacity: 0;
                    transform: translate(-50%, -60%);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
            }
            @keyframes messageSlideOut {
                from {
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
                to {
                    opacity: 0;
                    transform: translate(-50%, -40%);
                }
            }
        `;
        document.head.appendChild(messageStyles);
        
        document.body.appendChild(message);
        
        // Auto-remove with animation
        setTimeout(() => {
            if (message.parentNode) {
                message.style.animation = 'messageSlideOut 0.3s ease-out';
                setTimeout(() => {
                    if (message.parentNode) {
                        message.remove();
                    }
                    messageStyles.remove();
                }, 300);
            }
        }, duration);
    }
    
    // Style management
    function removeAllStyles() {
        utils.removeElements(`[id^="${CONFIG.stylePrefix}"]`);
        currentMode = null;
        updateButtonStates();
    }
    
    function updateButtonStates() {
        const buttons = ['focus', 'senior', 'contrast', 'reset'];
        buttons.forEach(buttonId => {
            const button = document.getElementById(`ab-${buttonId}`);
            if (button) {
                if (buttonId === currentMode) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            }
        });
    }
    
    // Mode implementations
    const modes = {
        focus: {
            name: 'Focus Mode',
            emoji: '🎯',
            description: 'ADHD-friendly mode activated! Distractions removed.',
            styles: `
                /* Remove animations and distractions */
                *, *::before, *::after {
                    animation-duration: 0.01s !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.1s !important;
                    scroll-behavior: auto !important;
                }
                
                /* Hide potentially distracting elements */
                .ad, .ads, .advertisement, .sidebar, .widget, .popup, .modal,
                [class*="ad-"], [class*="banner"], [class*="popup"], [class*="overlay"],
                [id*="ad"], [id*="banner"], [id*="popup"], iframe[src*="doubleclick"],
                iframe[src*="googlesyndication"], .carousel, .slider, .autoplay {
                    opacity: 0.2 !important;
                    pointer-events: none !important;
                }
                
                /* Enhance main content areas */
                main, .main, .content, article, .post, .entry-content,
                [role="main"], [role="article"] {
                    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%) !important;
                    padding: 24px !important;
                    border: 3px solid #007cba !important;
                    border-radius: 12px !important;
                    margin: 16px !important;
                    box-shadow: 0 4px 20px rgba(0,124,186,0.1) !important;
                }
                
                /* Make buttons more prominent */
                button, .button, input[type="submit"], input[type="button"],
                .btn, [role="button"], a.btn {
                    background: linear-gradient(135deg, #007cba, #0056b3) !important;
                    color: white !important;
                    border: 2px solid #005a87 !important;
                    padding: 14px 24px !important;
                    border-radius: 8px !important;
                    font-weight: 700 !important;
                    font-size: 16px !important;
                    cursor: pointer !important;
                    text-decoration: none !important;
                    display: inline-block !important;
                    transition: all 0.2s ease !important;
                    box-shadow: 0 4px 12px rgba(0,124,186,0.2) !important;
                }
                
                button:hover, .button:hover, .btn:hover {
                    transform: translateY(-2px) !important;
                    box-shadow: 0 6px 16px rgba(0,124,186,0.3) !important;
                }
                
                /* Improve text readability */
                p, li, span, div, td {
                    line-height: 1.7 !important;
                    font-size: 16px !important;
                    color: #333 !important;
                }
                
                h1, h2, h3, h4, h5, h6 {
                    color: #007cba !important;
                    margin: 24px 0 12px 0 !important;
                    padding: 8px 0 !important;
                    border-bottom: 2px solid #e9ecef !important;
                }
                
                /* Highlight important links */
                a:not(.btn):not(.button) {
                    background: linear-gradient(135deg, #fff3cd, #ffeaa7) !important;
                    padding: 2px 6px !important;
                    border-radius: 4px !important;
                    text-decoration: underline !important;
                    font-weight: 600 !important;
                    color: #856404 !important;
                    border: 1px solid #ffc107 !important;
                }
                
                /* Improve form elements */
                input[type="text"], input[type="email"], input[type="password"],
                textarea, select {
                    border: 2px solid #007cba !important;
                    border-radius: 6px !important;
                    padding: 12px !important;
                    font-size: 16px !important;
                    background: white !important;
                }
                
                /* Reduce visual noise */
                .comments, .related, .tags, .meta, .share-buttons {
                    opacity: 0.6 !important;
                }
            `
        },
        
        senior: {
            name: 'Senior Mode',
            emoji: '👴',
            description: 'Senior-friendly mode activated! Larger text and buttons.',
            styles: `
                /* Larger fonts everywhere */
                *, *::before, *::after {
                    font-size: 20px !important;
                    line-height: 1.8 !important;
                }
                
                h1 { font-size: 42px !important; font-weight: bold !important; }
                h2 { font-size: 36px !important; font-weight: bold !important; }
                h3 { font-size: 30px !important; font-weight: bold !important; }
                h4 { font-size: 26px !important; font-weight: bold !important; }
                h5 { font-size: 22px !important; font-weight: bold !important; }
                h6 { font-size: 20px !important; font-weight: bold !important; }
                
                /* Much larger, more clickable elements */
                button, .button, input[type="submit"], input[type="button"],
                .btn, [role="button"], a.btn {
                    padding: 20px 32px !important;
                    font-size: 24px !important;
                    border-radius: 12px !important;
                    margin: 12px 8px !important;
                    min-height: 60px !important;
                    min-width: 140px !important;
                    font-weight: 700 !important;
                    background: linear-gradient(135deg, #28a745, #20c997) !important;
                    color: white !important;
                    border: 3px solid #1e7e34 !important;
                    text-decoration: none !important;
                    display: inline-block !important;
                    cursor: pointer !important;
                    box-shadow: 0 6px 20px rgba(40,167,69,0.2) !important;
                    transition: all 0.2s ease !important;
                }
                
                button:hover, .button:hover, .btn:hover {
                    transform: translateY(-3px) !important;
                    box-shadow: 0 8px 25px rgba(40,167,69,0.3) !important;
                }
                
                /* Larger clickable links */
                a:not(.btn):not(.button) {
                    font-size: 22px !important;
                    padding: 8px 12px !important;
                    margin: 4px 2px !important;
                    border-radius: 8px !important;
                    text-decoration: underline !important;
                    font-weight: 600 !important;
                    background: #e3f2fd !important;
                    color: #1976d2 !important;
                    border: 2px solid #bbdefb !important;
                    display: inline-block !important;
                }
                
                /* Larger form inputs */
                input[type="text"], input[type="email"], input[type="password"],
                input[type="search"], input[type="tel"], input[type="url"],
                textarea, select {
                    font-size: 22px !important;
                    padding: 16px 20px !important;
                    border: 3px solid #6c757d !important;
                    border-radius: 8px !important;
                    min-height: 50px !important;
                    margin: 8px 4px !important;
                }
                
                /* More spacing everywhere */
                p, div, section, li, td {
                    margin: 16px 0 !important;
                    padding: 12px !important;
                }
                
                /* Simplify navigation */
                nav ul, .nav ul, .menu ul, .navbar-nav {
                    display: flex !important;
                    flex-direction: column !important;
                }
                
                nav li, .nav li, .menu li, .nav-item {
                    margin: 12px 0 !important;
                    list-style: none !important;
                }
                
                nav a, .nav a, .menu a, .nav-link {
                    padding: 16px 20px !important;
                    font-size: 22px !important;
                    border-radius: 8px !important;
                    background: #f8f9fa !important;
                    border: 2px solid #dee2e6 !important;
                    margin: 4px 0 !important;
                    display: block !important;
                }
                
                /* Hide complex UI elements that might confuse */
                .dropdown-menu, .submenu, .carousel, .slider, .accordion,
                .tabs, .modal, .tooltip, .popover {
                    display: none !important;
                }
                
                /* Larger checkboxes and radio buttons */
                input[type="checkbox"], input[type="radio"] {
                    width: 24px !important;
                    height: 24px !important;
                    margin: 8px !important;
                }
                
                /* Improve table readability */
                table {
                    font-size: 20px !important;
                }
                
                th, td {
                    padding: 16px 20px !important;
                    border: 2px solid #dee2e6 !important;
                }
                
                /* Better contrast for text */
                p, span, div, li, td, th {
                    color: #212529 !important;
                    text-shadow: 0 1px 1px rgba(255,255,255,0.5) !important;
                }
            `
        },
        
        contrast: {
            name: 'High Contrast Mode',
            emoji: '🔆',
            description: 'High contrast mode activated! Dark theme with bright text.',
            styles: `
                /* Dark theme with high contrast */
                *, *::before, *::after {
                    background-color: #000000 !important;
                    color: #ffffff !important;
                    border-color: #ffffff !important;
                    text-shadow: none !important;
                    box-shadow: none !important;
                }
                
                html, body {
                    background-color: #000000 !important;
                    color: #ffffff !important;
                }
                
                /* High contrast links */
                a, a:link, a:visited {
                    color: #00ff00 !important;
                    background-color: #003300 !important;
                    text-decoration: underline !important;
                    padding: 4px 8px !important;
                    border: 2px solid #00ff00 !important;
                    border-radius: 4px !important;
                    font-weight: 700 !important;
                }
                
                a:hover, a:focus, a:active {
                    color: #000000 !important;
                    background-color: #00ff00 !important;
                    border-color: #00ff00 !important;
                }
                
                /* High contrast buttons */
                button, .button, input[type="submit"], input[type="button"],
                .btn, [role="button"] {
                    background-color: #ffffff !important;
                    color: #000000 !important;
                    border: 3px solid #ffffff !important;
                    font-weight: 700 !important;
                    padding: 16px 24px !important;
                    font-size: 18px !important;
                    border-radius: 6px !important;
                }
                
                button:hover, .button:hover, .btn:hover {
                    background-color: #ffff00 !important;
                    color: #000000 !important;
                    border-color: #ffff00 !important;
                }
                
                /* Form inputs with high contrast */
                input, textarea, select {
                    background-color: #333333 !important;
                    color: #ffffff !important;
                    border: 3px solid #ffffff !important;
                    font-size: 18px !important;
                    padding: 12px 16px !important;
                    border-radius: 4px !important;
                }
                
                input:focus, textarea:focus, select:focus {
                    background-color: #000000 !important;
                    border-color: #ffff00 !important;
                    outline: 2px solid #ffff00 !important;
                }
                
                /* Images with high contrast borders */
                img, video, iframe {
                    border: 3px solid #ffffff !important;
                    filter: contrast(150%) brightness(120%) !important;
                    background-color: #000000 !important;
                }
                
                /* High contrast headings */
                h1, h2, h3, h4, h5, h6 {
                    color: #ffff00 !important;
                    background-color: #333333 !important;
                    padding: 12px 16px !important;
                    border: 2px solid #ffff00 !important;
                    border-radius: 6px !important;
                    margin: 16px 0 !important;
                    font-weight: 700 !important;
                }
                
                /* Ensure text is readable */
                p, span, div, li, td, th, label {
                    color: #ffffff !important;
                    font-size: 18px !important;
                    line-height: 1.8 !important;
                    background-color: transparent !important;
                }
                
                /* High contrast tables */
                table {
                    border: 3px solid #ffffff !important;
                    background-color: #000000 !important;
                }
                
                th {
                    background-color: #333333 !important;
                    color: #ffff00 !important;
                    border: 2px solid #ffffff !important;
                    font-weight: 700 !important;
                }
                
                td {
                    border: 1px solid #666666 !important;
                    padding: 12px !important;
                }
                
                /* Remove background images that might interfere */
                * {
                    background-image: none !important;
                }
                
                /* Special handling for code elements */
                code, pre {
                    background-color: #333333 !important;
                    color: #00ff00 !important;
                    border: 2px solid #00ff00 !important;
                    padding: 8px !important;
                    border-radius: 4px !important;
                }
                
                /* Navigation elements */
                nav, .navbar, .navigation {
                    background-color: #000000 !important;
                    border: 2px solid #ffffff !important;
                }
                
                /* Ensure sufficient contrast for all text */
                .text-muted, .text-secondary, .text-light {
                    color: #ffffff !important;
                }
                
                /* Hide decorative elements that might cause confusion */
                .bg-image, .background-image, [style*="background-image"] {
                    background-image: none !important;
                }
            `
        }
    };
    
    // Enable accessibility mode
    function enableMode(modeName) {
        try {
            // Remove all existing styles first
            removeAllStyles();
            
            if (modeName === 'reset') {
                currentMode = null;
                showMessage('↻ Reset complete! Page returned to normal.', '#6c757d');
                updateButtonStates();
                trackUsage('reset');
                return;
            }
            
            const mode = modes[modeName];
            if (!mode) {
                console.error('Unknown mode:', modeName);
                return;
            }
            
            // Create and inject the stylesheet
            const styleId = `${CONFIG.stylePrefix}${modeName}`;
            const styleElement = utils.createElement('style', {
                id: styleId,
                type: 'text/css'
            });
            
            styleElement.textContent = mode.styles;
            document.head.appendChild(styleElement);
            
            currentMode = modeName;
            updateButtonStates();
            
            // Show success message
            showMessage(`${mode.emoji} ${mode.description}`, '#28a745');
            
            // Track usage
            trackUsage(modeName);
            
            console.log(`✅ ${mode.name} enabled successfully`);
            
        } catch (error) {
            console.error(`❌ Error enabling ${modeName} mode:`, error);
            showMessage(`Error enabling ${modeName} mode`, '#dc3545');
        }
    }
    
    // Usage tracking (privacy-friendly)
    function trackUsage(mode) {
        try {
            const data = {
                mode: mode,
                url: window.location.hostname,
                timestamp: Date.now(),
                version: CONFIG.version,
                userAgent: navigator.userAgent.slice(0, 50),
                framework: utils.detectFramework()
            };
            
            console.log('📊 AccessibilityBooster usage:', data);
            
            // Store in sessionStorage for debugging (not persistent)
            sessionStorage.setItem('ab_last_usage', JSON.stringify(data));
            
        } catch (error) {
            console.warn('Could not track usage:', error);
        }
    }
    
    // Auto-detection and suggestions
    function autoDetectAndSuggest() {
        setTimeout(() => {
            try {
                const suggestions = [];
                
                // Check browser preferences
                if (window.matchMedia('(prefers-contrast: high)').matches) {
                    suggestions.push('🔆 High Contrast Mode recommended for your system settings');
                }
                
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    suggestions.push('🎯 Focus Mode recommended (reduced motion preference detected)');
                }
                
                // Check page complexity
                const elementCount = document.querySelectorAll('*').length;
                if (elementCount > 500) {
                    suggestions.push('🎯 This page looks complex - Focus Mode might help!');
                }
                
                // Check font size
                const bodyFontSize = parseInt(window.getComputedStyle(document.body).fontSize) || 16;
                if (bodyFontSize < 16) {
                    suggestions.push('👴 Senior Mode recommended for larger, more readable text');
                }
                
                // Check for known problematic patterns
                const hasSmallText = document.querySelectorAll('[style*="font-size"], .small, .text-sm').length > 10;
                if (hasSmallText) {
                    suggestions.push('👴 Lots of small text detected - Senior Mode can help');
                }
                
                // Show first suggestion if any
                if (suggestions.length > 0) {
                    showMessage(`💡 ${suggestions[0]}`, '#17a2b8', 4000);
                }
                
            } catch (error) {
                console.warn('Auto-detection error:', error);
            }
        }, 2500);
    }
    
    // Feedback and help functions
    function openFeedback() {
        const subject = encodeURIComponent('AccessibilityBooster Feedback');
        const body = encodeURIComponent(`Hi! I'm providing feedback about AccessibilityBooster.

Mode I tried: ${currentMode || 'None yet'}
Website: ${window.location.hostname}
Browser: ${navigator.userAgent.slice(0, 50)}

My feedback:
[Please share your experience, suggestions, or report any issues]

Overall rating (1-5): 

Would you recommend this to others? 

Any other thoughts:
`);
        
        const mailtoUrl = `mailto:${CONFIG.feedbackEmail}?subject=${subject}&body=${body}`;
        
        try {
            window.open(mailtoUrl);
        } catch (error) {
            // Fallback: copy email to clipboard and show message
            showMessage('Please email your feedback to: ' + CONFIG.feedbackEmail, '#17a2b8', 5000);
        }
    }
    
    function showHelp() {
        showMessage(`🎯 Focus Mode: Removes distractions, highlights content
👴 Senior Mode: Larger text and buttons  
🔆 High Contrast: Dark theme with bright text
↻ Reset: Return to normal

Press ESC to close this panel anytime!`, '#17a2b8', 6000);
    }
    
    // Error handling and compatibility checks
    function checkCompatibility() {
        const issues = [];
        
        // Check for Content Security Policy issues
        try {
            const testScript = document.createElement('script');
            testScript.textContent = '// CSP test';
            document.head.appendChild(testScript);
            document.head.removeChild(testScript);
        } catch (error) {
            issues.push('Content Security Policy may block some features');
        }
        
        // Check for conflicting stylesheets
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"], style');
        if (stylesheets.length > 20) {
            issues.push('Many stylesheets detected - some features may not work perfectly');
        }
        
        // Warn about issues if any
        if (issues.length > 0) {
            console.warn('⚠️ Compatibility issues detected:', issues);
        }
        
        return issues.length === 0;
    }
    
    // Main initialization function
    window.initAccessibilityBooster = function() {
        try {
            console.log('🚀 Initializing AccessibilityBooster...');
            
            // Compatibility check
            const isCompatible = checkCompatibility();
            
            // Create the main panel
            const panel = createControlPanel();
            if (!panel) {
                throw new Error('Failed to create control panel');
            }
            
            // Set up auto-detection
            autoDetectAndSuggest();
            
            // Show welcome message
            setTimeout(() => {
                showMessage('🚀 AccessibilityBooster ready! Choose a mode above.', '#007cba', 3000);
            }, 500);
            
            // Log framework detection for debugging
            const frameworks = utils.detectFramework();
            const detectedFrameworks = Object.entries(frameworks)
                .filter(([key, value]) => value)
                .map(([key]) => key);
            
            if (detectedFrameworks.length > 0) {
                console.log('🔍 Detected frameworks:', detectedFrameworks.join(', '));
            }
            
            console.log('✅ AccessibilityBooster fully initialized!');
            
        } catch (error) {
            console.error('❌ AccessibilityBooster initialization failed:', error);
            
            // Fallback: show simple alert
            alert(`AccessibilityBooster encountered an error: ${error.message}\n\nPlease try refreshing the page or contact support.`);
            
            // Clean up
            window.accessibilityBoosterActive = false;
        }
    };
    
    // Auto-initialize if DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.initAccessibilityBooster);
    } else {
        // DOM is already ready
        setTimeout(window.initAccessibilityBooster, 100);
    }
    
    // Add slide-out animation styles
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
    `;
    document.head.appendChild(animationStyles);
    
})();
