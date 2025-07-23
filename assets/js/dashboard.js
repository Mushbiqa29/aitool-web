document.addEventListener('DOMContentLoaded', function() {
    // Sample data for dashboard (in a real app, this would come from an API)
    const savedTools = [
        {
            id: 1,
            name: 'ChatGPT',
            logo: 'images/tools/chatgpt.png',
            category: 'Chatbots',
            description: 'Advanced AI chatbot capable of natural conversations and task assistance.'
        },
        {
            id: 2,
            name: 'Midjourney',
            logo: 'images/tools/midjourney.png',
            category: 'Image Generation',
            description: 'AI-powered art generation tool that creates images from text prompts.'
        },
        {
            id: 3,
            name: 'Grammarly',
            logo: 'images/tools/grammarly.png',
            category: 'Writing',
            description: 'AI writing assistant that checks grammar, spelling, and style.'
        }
    ];
    
    const submittedTools = [
        {
            id: 101,
            name: 'AI Tool X',
            category: 'Productivity',
            date: '2023-05-15',
            status: 'approved',
            views: 1245
        },
        {
            id: 102,
            name: 'AI Tool Y',
            category: 'Video Editing',
            date: '2023-06-22',
            status: 'pending',
            views: 0
        },
        {
            id: 103,
            name: 'AI Tool Z',
            category: 'Data Analysis',
            date: '2023-04-10',
            status: 'rejected',
            views: 0
        }
    ];
    
    // Load saved tools
    const savedToolsContainer = document.querySelector('.saved-tools-grid');
    if (savedToolsContainer) {
        savedTools.forEach(tool => {
            const toolCard = document.createElement('div');
            toolCard.className = 'tool-card';
            toolCard.innerHTML = `
                <div class="tool-card-header">
                    <div class="tool-logo">
                        <img src="${tool.logo}" alt="${tool.name} logo">
                    </div>
                    <div class="tool-info">
                        <h3>${tool.name}</h3>
                        <span class="tool-category">${tool.category}</span>
                    </div>
                </div>
                <div class="tool-description">${tool.description}</div>
                <div class="tool-meta">
                    <span class="tool-pricing">Free</span>
                    <span class="tool-rating">
                        <i class="fas fa-star"></i> 4.8
                    </span>
                </div>
                <button class="btn btn-secondary" style="width: 100%; margin-top: 15px;">Remove</button>
            `;
            
            savedToolsContainer.appendChild(toolCard);
        });
    }
    
    // Load submitted tools
    const submittedToolsTable = document.querySelector('.submitted-tools-table tbody');
    if (submittedToolsTable) {
        submittedTools.forEach(tool => {
            const row = document.createElement('tr');
            
            let statusClass = '';
            let statusText = '';
            
            switch (tool.status) {
                case 'approved':
                    statusClass = 'status-approved';
                    statusText = 'Approved';
                    break;
                case 'pending':
                    statusClass = 'status-pending';
                    statusText = 'Pending';
                    break;
                case 'rejected':
                    statusClass = 'status-rejected';
                    statusText = 'Rejected';
                    break;
            }
            
            row.innerHTML = `
                <td>${tool.name}</td>
                <td>${tool.category}</td>
                <td>${tool.date}</td>
                <td><span class="${statusClass}">${statusText}</span></td>
                <td>${tool.views}</td>
                <td>
                    <button class="action-btn btn-primary">Edit</button>
                    <button class="action-btn btn-secondary">Delete</button>
                </td>
            `;
            
            submittedToolsTable.appendChild(row);
        });
    }
    
    // Tab functionality for dashboard sections
    const dashboardSections = document.querySelectorAll('.dashboard-section');
    const dashboardNavLinks = document.querySelectorAll('.dashboard-nav a');
    
    if (dashboardNavLinks.length) {
        // Hide all sections except the first one
        dashboardSections.forEach((section, index) => {
            if (index !== 0) {
                section.style.display = 'none';
            }
        });
        
        // Set first nav link as active
        dashboardNavLinks[0].classList.add('active');
        
        // Add click event to nav links
        dashboardNavLinks.forEach((link, index) => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                dashboardNavLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Hide all sections
                dashboardSections.forEach(section => {
                    section.style.display = 'none';
                });
                
                // Show corresponding section
                if (dashboardSections[index]) {
                    dashboardSections[index].style.display = 'block';
                }
            });
        });
    }
    
    // Profile form submission
    const profileForm = document.querySelector('.profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--danger)';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // In a real app, you would send this data to the server
                alert('Profile updated successfully!');
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
    
    // Avatar upload
    const avatarUpload = document.querySelector('.profile-avatar-upload input');
    if (avatarUpload) {
        avatarUpload.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                const avatarImg = document.querySelector('.profile-avatar-img img');
                
                reader.onload = function(e) {
                    avatarImg.src = e.target.result;
                };
                
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
});