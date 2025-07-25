document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    // Mobile Search Toggle
    const searchToggle = document.querySelector('.search-toggle');
    const mobileSearch = document.querySelector('.mobile-search');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            // Close search if open
            if (mobileSearch) mobileSearch.classList.remove('active');
        });
    }
    
    if (searchToggle && mobileSearch) {
        searchToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileSearch.classList.toggle('active');
            // Close menu if open
            if (mainNav) mainNav.classList.remove('active');
            if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
        });
    }
    
    // Close menus when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.header-actions') && 
            !e.target.closest('.main-nav') && 
            !e.target.closest('.mobile-search')) {
            if (mainNav) mainNav.classList.remove('active');
            if (mobileSearch) mobileSearch.classList.remove('active');
            if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
        }
    });
    
    // Prevent search form from closing when clicking inside
    if (mobileSearch) {
        mobileSearch.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Dropdown menus for mobile
    const dropdownToggles = document.querySelectorAll('.has-dropdown > a');
    
    dropdownToggles.forEach(toggle => {
        const dropdown = toggle.nextElementSibling;
        
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // Close dropdown when clicking outside (for mobile)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    dropdown.style.display = 'none';
                }
            });
        }
    }); 
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentElement;
            item.classList.toggle('active');
            
            // Close other open items
            faqQuestions.forEach(q => {
                if (q !== this && q.parentElement.classList.contains('active')) {
                    q.parentElement.classList.remove('active');
                }
            });
        });
    });
    
    // Screenshot Carousel
    const screenshotThumbs = document.querySelectorAll('.screenshot-thumb');
    const screenshotMain = document.querySelector('.screenshot-main');
    
    if (screenshotThumbs.length && screenshotMain) {
        screenshotThumbs.forEach((thumb, index) => {
            thumb.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all thumbs
                screenshotThumbs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked thumb
                this.classList.add('active');
                
                // Update main image
                const imgSrc = this.querySelector('img').getAttribute('src');
                screenshotMain.innerHTML = `<img src="${imgSrc}" alt="Tool screenshot ${index + 1}">`;
            });
        });
        
        // Activate first thumb by default
        if (screenshotThumbs.length > 0) {
            screenshotThumbs[0].click();
        }
    }
    
    // Tool Comparison Selector
    if (document.querySelector('.tool-selector')) {
        // This would be enhanced in comparison.js
        console.log('Comparison page loaded');
    }
    
    // Form Validation
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let valid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.style.borderColor = 'var(--danger)';
                    
                    // Add error message if not exists
                    if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                        const errorMsg = document.createElement('span');
                        errorMsg.className = 'error-message';
                        errorMsg.style.color = 'var(--danger)';
                        errorMsg.style.fontSize = '0.8rem';
                        errorMsg.style.display = 'block';
                        errorMsg.style.marginTop = '5px';
                        errorMsg.textContent = 'This field is required';
                        field.insertAdjacentElement('afterend', errorMsg);
                    }
                } else {
                    field.style.borderColor = '';
                    const errorMsg = field.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                }
            });
            
            if (!valid) {
                e.preventDefault();
                
                // Scroll to first error
                const firstError = this.querySelector('[required]:invalid');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            }
        });
    });
    
    // File Upload Preview
    const fileUploads = document.querySelectorAll('.file-upload');
    
    fileUploads.forEach(upload => {
        const input = upload.querySelector('input[type="file"]');
        const icon = upload.querySelector('i');
        const text = upload.querySelector('p');
        
        if (input) {
            input.addEventListener('change', function() {
                if (this.files && this.files[0]) {
                    const fileName = this.files[0].name;
                    if (text) {
                        text.textContent = fileName;
                    }
                    
                    if (icon) {
                        icon.className = 'fas fa-check-circle';
                        icon.style.color = 'var(--success)';
                    }
                    
                    // Preview for images
                    if (this.files[0].type.match('image.*')) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            upload.style.backgroundImage = `url(${e.target.result})`;
                            upload.style.backgroundSize = 'cover';
                            upload.style.backgroundPosition = 'center';
                        }
                        reader.readAsDataURL(this.files[0]);
                    }
                }
            });
        }
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
    
    // Lazy Loading for Images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img.lazy');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Dark/Light Theme Toggle (optional)
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '20px';
    themeToggle.style.right = '20px';
    themeToggle.style.zIndex = '1000';
    themeToggle.style.width = '50px';
    themeToggle.style.height = '50px';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.backgroundColor = 'var(--primary-color)';
    themeToggle.style.color = 'white';
    themeToggle.style.border = 'none';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Initialize tooltips
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(el => {
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.textContent = el.getAttribute('data-tooltip');
        el.appendChild(tooltip);
        
        el.addEventListener('mouseenter', function() {
            tooltip.style.visibility = 'visible';
            tooltip.style.opacity = '1';
        });
        
        el.addEventListener('mouseleave', function() {
            tooltip.style.visibility = 'hidden';
            tooltip.style.opacity = '0';
        });
    });

    // Get tool parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const toolId = urlParams.get('tool');
    
    if (toolId) {
        loadToolData(toolId);
    }
});

function loadToolData(toolId) {
    // In a real app, you would fetch this data from an API
    // For now, we'll use a simple object with tool data
    const tools = {
'chatgpt': {
    name: 'ChatGPT',
    logo: 'assets/img/chat.webp',
    category: 'Chatbots, Text Generation',
    tagline: 'Advanced AI chatbot capable of natural conversations and task assistance',
    platforms: ['Web', 'iOS', 'Android'],
    rating: {
        score: 4.8,
        reviews: 2450
    },
    overview: [
        'ChatGPT is an advanced AI chatbot developed by OpenAI that can engage in natural conversations, answer questions, and assist with a wide range of tasks.',
        'It\'s based on the GPT-4 architecture and can understand and generate human-like text responses.',
        'The tool has revolutionized how people interact with AI, offering capabilities ranging from creative writing to coding assistance and general knowledge queries.'
    ],
    features: [
        {
            title: 'Natural Conversations',
            description: 'Engage in human-like dialogue on virtually any topic',
            icon: 'fas fa-check-circle'
        },
        {
            title: 'Task Assistance',
            description: 'Help with writing, coding, research, and more',
            icon: 'fas fa-check-circle'
        },
        {
            title: 'Multi-language Support',
            description: 'Understands and responds in multiple languages',
            icon: 'fas fa-check-circle'
        },
        {
            title: 'Contextual Understanding',
            description: 'Maintains context throughout conversations',
            icon: 'fas fa-check-circle'
        }
    ],
    screenshots: [
        {
            main: 'assets/img/chat1.webp',
            thumb: 'assets/img/chat1.webp',
            alt: 'ChatGPT Interface'
        },
        {
            main: 'assets/img/chat2.webp',
            thumb: 'assets/img/chat2.webp',
            alt: 'ChatGPT Mobile'
        },
        {
            main: 'assets/img/chat3.webp',
            thumb: 'assets/img/chat3.webp',
            alt: 'ChatGPT Examples'
        }
    ],
    pros: [
        'Highly versatile with many use cases',
        'Free tier available with good capabilities',
        'Continuously improving with updates',
        'Easy to use with simple interface',
        'Good at creative tasks and brainstorming'
    ],
    cons: [
        'Knowledge cutoff (not always up-to-date)',
        'Can produce incorrect or biased information',
        'Limited memory of previous conversations',
        'Advanced features require paid subscription',
        'May refuse some requests based on content policies'
    ],
    pricing: [
        {
            plan: 'Free',
            price: '$0/month',
            features: [
                'Access to GPT-3.5 model',
                'Standard response speed',
                'Limited availability during peak times'
            ]
        },
        {
            plan: 'Plus',
            price: '$20/month',
            features: [
                'Access to GPT-4 model',
                'Faster response times',
                'Priority access to new features',
                'Available even during peak times'
            ]
        }
    ],
    website: 'https://chat.openai.com',
    developer: {
        name: 'OpenAI',
        logo: 'assets/img/companies/openai.png',
        description: 'AI research and deployment company',
        profileUrl: '#'
    },
    relatedTools: [
        {
            id: 'claude',
            name: 'Claude AI',
            logo: 'assets/img/tools/claude.png',
            category: 'Chatbots',
            description: 'AI assistant focused on helpful, harmless, and honest conversations.',
            pricing: 'Freemium',
            rating: 4.6
        },
        {
            id: 'bard',
            name: 'Google Bard',
            logo: 'assets/img/tools/bard.png',
            category: 'Chatbots',
            description: 'Google\'s conversational AI service with internet access.',
            pricing: 'Free',
            rating: 4.3
        },
        {
            id: 'perplexity',
            name: 'Perplexity AI',
            logo: 'assets/img/tools/perplexity.png',
            category: 'Chatbots',
            description: 'AI-powered answer engine with cited sources.',
            pricing: 'Freemium',
            rating: 4.5
        }
    ]
},
'midjourney': {
    name: 'Midjourney',
    logo: 'assets/img/mid.webp',
    category: 'Image Generation',
    tagline: 'AI-powered art generation tool that creates images from text prompts.',
    platforms: ['Web'],
    rating: {
        score: 4.5,
        reviews: 1320
    },
    overview: [
        'Midjourney is an AI art generator that transforms textual prompts into stunning visuals.',
        'It allows creators to explore imaginative designs using generative models.',
        'Popular for artistic image creation and design exploration.'
    ],
    features: [
        { title: 'Text-to-Image', description: 'Generate images from text prompts', icon: 'fas fa-image' },
        { title: 'Style Variations', description: 'Create art in various styles and moods', icon: 'fas fa-palette' },
        { title: 'Community Showcase', description: 'Explore and remix public artwork', icon: 'fas fa-users' }
    ],
     screenshots: [
        {
            main: 'assets/img/mid1.webp',
            thumb: 'assets/img/mid1.webp',
            alt: 'Midjourney Interface'
        },
        {
            main: 'assets/img/mid2.webp',
            thumb: 'assets/img/mid2.webp',
            alt: 'Midjourney Mobile'
        },
        {
            main: 'assets/img/mid3.webp',
            thumb: 'assets/img/mid3.webp',
            alt: 'Midjourney Examples'
        }
    ],
    pros: ['High-quality outputs', 'Flexible creativity', 'Active community'],
    cons: ['No free tier', 'Requires Discord', 'Limited customization'],
    pricing: [
        { plan: 'Basic', price: '$10/month', features: ['Fast GPU time', 'Private visibility', 'Limited images'] },
        { plan: 'Pro', price: '$30/month', features: ['Unlimited personal use', 'Stealth mode', 'More GPU time'] }
    ],
    website: 'https://www.midjourney.com',
    developer: {
        name: 'Midjourney',
        logo: 'images/tools/midjourney.png',
        description: 'Independent research lab exploring new mediums of thought',
        profileUrl: '#'
    },
    relatedTools: []
},
'github-copilot': {
    name: 'GitHub Copilot',
    logo: 'assets/img/git3.webp',
    category: 'Code Generation',
    tagline: 'AI pair programmer that helps you write better code faster.',
    platforms: ['VS Code', 'JetBrains', 'Neovim'],
    rating: {
        score: 4.7,
        reviews: 3100
    },
    overview: [
        'GitHub Copilot is an AI tool developed by GitHub and OpenAI.',
        'It auto-suggests whole lines or blocks of code based on natural language prompts.',
        'Boosts productivity for developers by reducing repetitive tasks.'
    ],
    features: [
        { title: 'Code Completion', description: 'Suggests code as you type', icon: 'fas fa-code' },
        { title: 'Multi-language Support', description: 'Works with Python, JavaScript, TypeScript, and more', icon: 'fas fa-globe' },
        { title: 'Inline Suggestions', description: 'Integrates into your code editor', icon: 'fas fa-terminal' }
    ],
     screenshots: [
        {
            main: 'assets/img/git.webp',
            thumb: 'assets/img/git.webp',
            alt: 'Copilot Interface'
        },
        {
            main: 'assets/img/git1.webp',
            thumb: 'assets/img/git1.webp',
            alt: 'Copilot Mobile'
        },
        {
            main: 'assets/img/git2.webp',
            thumb: 'assets/img/git2.webp',
            alt: 'Copilot Examples'
        }
    ],
    pros: ['Increases coding speed', 'Learns from context', 'Reduces boilerplate code'],
    cons: ['May generate incorrect code', 'Requires internet connection', 'Paid after trial'],
    pricing: [
        { plan: 'Individual', price: '$10/month', features: ['Unlimited code suggestions', 'Supports multiple IDEs'] },
        { plan: 'Business', price: '$19/user/month', features: ['Team management', 'Policy controls', 'Enhanced security'] }
    ],
    website: 'https://github.com/features/copilot',
    developer: {
        name: 'GitHub / OpenAI',
        logo: 'assets/img/companies/openai.png',
        description: 'AI-powered developer tools from GitHub and OpenAI',
        profileUrl: '#'
    },
    relatedTools: []
},
'claude': {
    name: 'Claude AI',
    logo: 'assets/img/claude.webp',
    category: 'Text Generation',
    tagline: 'AI assistant focused on helpful, harmless, and honest conversations.',
    platforms: ['Web'],
    rating: {
        score: 4.6,
        reviews: 1100
    },
    overview: [
        'Claude AI is developed by Anthropic and aims to offer safe, interpretable AI conversations.',
        'Built to prioritize user control, ethical use, and transparent reasoning.'
    ],
    features: [
        { title: 'Ethical AI', description: 'Trained for safety and fairness', icon: 'fas fa-shield-alt' },
        { title: 'Natural Language Chat', description: 'Handles a wide range of queries', icon: 'fas fa-comments' },
        { title: 'Developer Friendly', description: 'Available through APIs and platforms', icon: 'fas fa-plug' }
    ],
     screenshots: [
        {
            main: 'assets/img/claude1.webp',
            thumb: 'assets/img/claude1.webp',
            alt: 'Claude Interface'
        },
        {
            main: 'assets/img/claude2.webp',
            thumb: 'assets/img/claude2.webp',
            alt: 'Claude Mobile'
        },
        {
            main: 'assets/img/claude3.webp',
            thumb: 'assets/img/claude3.webp',
            alt: 'Claude Examples'
        }
    ],
    pros: ['Safe and aligned responses', 'Strong on reasoning tasks', 'User-centered approach'],
    cons: ['Fewer integrations', 'Still evolving', 'Not always deeply creative'],
    pricing: [
        { plan: 'Free', price: '$0/month', features: ['Basic access', 'Limited usage'] },
        { plan: 'Pro', price: '$15/month', features: ['Priority speed', 'Extended usage'] }
    ],
    website: 'https://www.anthropic.com/index/claude',
    developer: {
        name: 'Anthropic',
        logo: 'assets/img/companies/anthropic.png',
        description: 'AI company focused on alignment and interpretability',
        profileUrl: '#'
    },
    relatedTools: []
},
'runway': {
    name: 'Runway ML',
    logo: 'assets/img/run.webp',
    category: 'Video Generation',
    tagline: 'Creative suite with AI tools for video, image, and more.',
    platforms: ['Web'],
    rating: {
        score: 4.4,
        reviews: 870
    },
    overview: [
        'Runway offers generative AI tools for creators to produce video and multimedia content.',
        'Popular among filmmakers, content creators, and digital artists.'
    ],
    features: [
        { title: 'AI Video Editing', description: 'Remove backgrounds, change styles, and more', icon: 'fas fa-video' },
        { title: 'Text-to-Video', description: 'Generate short videos from text input', icon: 'fas fa-file-video' },
        { title: 'Real-Time Collaboration', description: 'Work on projects with others live', icon: 'fas fa-users' }
    ],
     screenshots: [
        {
            main: 'assets/img/run1.webp',
            thumb: 'assets/img/run1-thumb.webp',
            alt: 'Runway Interface'
        },
        {
            main: 'assets/img/run2.webp',
            thumb: 'assets/img/run2-thumb.webp',
            alt: 'Runway Mobile'
        },
        {
            main: 'assets/img/run3.webp',
            thumb: 'assets/img/run3-thumb.webp',
            alt: 'Runway Examples'
        }
    ],
    pros: ['Versatile creative tools', 'Easy to use', 'Expanding AI capabilities'],
    cons: ['Heavy processing needs', 'Paid tiers needed for full features', 'Export limitations'],
    pricing: [
        { plan: 'Standard', price: '$15/month', features: ['Basic creative tools', 'Limited exports'] },
        { plan: 'Pro', price: '$35/month', features: ['Full suite access', 'Priority processing', 'Advanced features'] }
    ],
    website: 'https://runwayml.com',
    developer: {
        name: 'Runway',
        logo: 'images/tools/runway.png',
        description: 'Creative AI platform for content production',
        profileUrl: '#'
    },
    relatedTools: []
},
'dalle': {
    name: 'DALL-E',
    logo: 'assets/img/dall.webp',
    category: 'Image Generation',
    tagline: 'AI system that can create realistic images from text descriptions.',
    platforms: ['Web'],
    rating: {
        score: 4.3,
        reviews: 960
    },
    overview: [
        'DALL·E, developed by OpenAI, generates images based on natural language descriptions.',
        'Used for visual ideation, design concepts, and creative content production.'
    ],
    features: [
        { title: 'Text-to-Image', description: 'Convert prompts into illustrations or photos', icon: 'fas fa-images' },
        { title: 'Inpainting', description: 'Edit parts of existing images', icon: 'fas fa-magic' },
        { title: 'Creative Compositions', description: 'Visualize imaginative concepts', icon: 'fas fa-brain' }
    ],
    screenshots: [
        {
            main: 'assets/img/dall1.webp',
            thumb: 'assets/img/dall1-thumb.webp',
            alt: 'DALL-E Interface'
        },
        {
            main: 'assets/img/dall2.webp',
            thumb: 'assets/img/dall2-thumb.webp',
            alt: 'DALL-E Mobile'
        },
        {
            main: 'assets/img/dall3.webp',
            thumb: 'assets/img/dall3-thumb.webp',
            alt: 'DALL-E Examples'
        }
    ],
    pros: ['Strong realism', 'Creative flexibility', 'Popular integration in ChatGPT'],
    cons: ['Limited credits for free users', 'May misinterpret vague prompts', 'Ethical considerations'],
    pricing: [
        { plan: 'Free', price: '$0', features: ['Limited image generations'] },
        { plan: 'Pay-as-you-go', price: '$15 for 115 credits', features: ['More generations', 'Priority processing'] }
    ],
    website: 'https://openai.com/dall-e',
    developer: {
        name: 'OpenAI',
        logo: 'assets/img/companies/openai.png',
        description: 'Leading AI research and deployment company',
        profileUrl: '#'
    },
    relatedTools: []
}

    };
    const tool = tools[toolId];
    if (tool) {
        // Update the page title
        document.title = `${tool.name} - AI Nexus`;
        
        // Update header section
        document.querySelector('.tool-header-info h1').textContent = tool.name;
        document.querySelector('.tool-tagline').textContent = tool.tagline;
        document.querySelector('.tool-logo-large img').src = tool.logo;
        document.querySelector('.tool-logo-large img').alt = tool.name;
        document.querySelector('.tool-category').textContent = tool.category;
        document.querySelector('.tool-platforms').textContent = tool.platforms.join(', ');
        document.querySelector('.tool-rating').innerHTML = `<i class="fas fa-star"></i> ${tool.rating.score} (${tool.rating.reviews} reviews)`;
        
        // Update overview section
        const overviewContainer = document.querySelector('.tool-overview');
        overviewContainer.innerHTML = tool.overview.map(para => `<p>${para}</p>`).join('');
        
        // Update features section
        const featuresContainer = document.querySelector('.tool-features');
        featuresContainer.innerHTML = tool.features.map(feature => `
            <div class="feature-item">
                <i class="${feature.icon}"></i>
                <div>
                    <h3>${feature.title}</h3>
                    <p>${feature.description}</p>
                </div>
            </div>
        `).join('');
        
        // Update screenshots
        if (tool.screenshots && tool.screenshots.length > 0) {
            const screenshotMain = document.querySelector('.screenshot-main');
            const thumbnailsContainer = document.querySelector('.screenshot-thumbnails');
            
            // Set main screenshot
            screenshotMain.innerHTML = `<img src="${tool.screenshots[0].main}" alt="${tool.screenshots[0].alt}">`;
            
            // Create thumbnails
            thumbnailsContainer.innerHTML = tool.screenshots.map((screenshot, index) => `
                <a href="#" class="screenshot-thumb ${index === 0 ? 'active' : ''}" data-index="${index}">
                    <img src="${screenshot.thumb}" alt="${screenshot.alt}">
                </a>
            `).join('');
        } else {
            document.querySelector('.tool-screenshots-section').style.display = 'none';
        }
        
        // Update pros & cons
        const prosList = document.querySelector('.pros-items');
        const consList = document.querySelector('.cons-items');
        prosList.innerHTML = tool.pros.map(pro => `<li>${pro}</li>`).join('');
        consList.innerHTML = tool.cons.map(con => `<li>${con}</li>`).join('');
        
        // Update sidebar
        document.querySelector('.tool-website').href = tool.website;
        
        // Update pricing
        const pricingContainer = document.querySelector('.pricing-section');
        pricingContainer.innerHTML = `
            <h3>Pricing</h3>
            ${tool.pricing.map(plan => `
                <div class="pricing-plan">
                    <h4>${plan.plan} <span>${plan.price}</span></h4>
                    <ul>
                        ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        `;
        
        // Update platforms
        const platformsList = document.querySelector('.platforms-list');
        platformsList.innerHTML = tool.platforms.map(platform => `
            <li><i class="fas fa-check"></i> ${platform}</li>
        `).join('');
        
        // Update developer info
        const developerSection = document.querySelector('.developer-section');
        developerSection.querySelector('.developer-logo').src = tool.developer.logo;
        developerSection.querySelector('.developer-logo').alt = tool.developer.name;
        developerSection.querySelector('.developer-name').textContent = tool.developer.name;
        developerSection.querySelector('.developer-description').textContent = tool.developer.description;
        developerSection.querySelector('.developer-profile').href = tool.developer.profileUrl;
        
        // Update related tools
        if (tool.relatedTools && tool.relatedTools.length > 0) {
            const relatedToolsContainer = document.querySelector('.related-tools-grid');
            relatedToolsContainer.innerHTML = tool.relatedTools.map(relatedTool => `
                <div class="tool-card" onclick="window.location.href='tool-detail.html?tool=${relatedTool.id}'">
                    <div class="tool-card-header">
                        <div class="tool-logo">
                            <img src="${relatedTool.logo}" alt="${relatedTool.name}">
                        </div>
                        <div class="tool-info">
                            <h3>${relatedTool.name}</h3>
                            <span class="tool-category">${relatedTool.category}</span>
                        </div>
                    </div>
                    <div class="tool-description">${relatedTool.description}</div>
                    <div class="tool-meta">
                        <span class="tool-pricing">${relatedTool.pricing}</span>
                        <span class="tool-rating">
                            <i class="fas fa-star"></i> ${relatedTool.rating}
                        </span>
                    </div>
                </div>
            `).join('');
        } else {
            document.querySelector('.related-tools-section').style.display = 'none';
        }
    }
}
// Dark/Light Theme Toggle (updated version)
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
themeToggle.style.position = 'fixed';
themeToggle.style.bottom = '20px';
themeToggle.style.right = '20px';
themeToggle.style.zIndex = '1000';
themeToggle.style.width = '50px';
themeToggle.style.height = '50px';
themeToggle.style.borderRadius = '50%';
themeToggle.style.backgroundColor = 'var(--primary-color)';
themeToggle.style.color = 'white';
themeToggle.style.border = 'none';
themeToggle.style.cursor = 'pointer';
themeToggle.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');

document.body.appendChild(themeToggle);

// Apply theme based on localStorage or preference
function applyTheme() {
    if (localStorage.getItem('theme') === 'light' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: light)').matches)) {
        document.body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Initial theme application
applyTheme();

// Toggle theme on button click
themeToggle.addEventListener('click', function() {
    if (document.body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
    applyTheme();
});

// Watch for system theme changes
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        applyTheme();
    }
});