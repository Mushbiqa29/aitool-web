document.addEventListener('DOMContentLoaded', function() {
    const toolSelects = document.querySelectorAll('.tool-select');
    
    // Sample tool data (in a real app, this would come from an API)
    const toolsData = [
        {
            id: 1,
            name: 'ChatGPT',
            logo: 'images/tools/chatgpt.png',
            category: 'Chatbots',
            pricing: 'Freemium',
            features: ['Natural conversations', 'Code generation', 'Content creation'],
            platforms: ['Web', 'iOS', 'Android'],
            rating: 4.8,
            pros: ['Versatile', 'Easy to use', 'Free tier available'],
            cons: ['Limited knowledge', 'Can produce incorrect info']
        },
        {
            id: 2,
            name: 'Midjourney',
            logo: 'images/tools/midjourney.png',
            category: 'Image Generation',
            pricing: 'Paid',
            features: ['AI art generation', 'Multiple styles', 'High resolution'],
            platforms: ['Discord'],
            rating: 4.5,
            pros: ['High quality results', 'Creative options', 'Active community'],
            cons: ['Requires Discord', 'No free tier', 'Steep learning curve']
        },
        {
            id: 3,
            name: 'Grammarly',
            logo: 'images/tools/grammarly.png',
            category: 'Writing',
            pricing: 'Freemium',
            features: ['Grammar checking', 'Style suggestions', 'Plagiarism detection'],
            platforms: ['Web', 'Desktop', 'Browser extension'],
            rating: 4.7,
            pros: ['Accurate suggestions', 'Multi-platform', 'Free version useful'],
            cons: ['Premium expensive', 'Can be overly aggressive']
        }
    ];
    
    // Initialize each tool selector
    toolSelects.forEach((select, index) => {
        const input = select.querySelector('input');
        const suggestions = select.querySelector('.suggestions');
        
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            if (searchTerm.length < 2) {
                suggestions.innerHTML = '';
                suggestions.classList.remove('active');
                return;
            }
            
            const filteredTools = toolsData.filter(tool => 
                tool.name.toLowerCase().includes(searchTerm)
            );
            
            suggestions.innerHTML = '';
            
            if (filteredTools.length === 0) {
                suggestions.innerHTML = '<div class="suggestion-item">No tools found</div>';
            } else {
                filteredTools.forEach(tool => {
                    const item = document.createElement('div');
                    item.className = 'suggestion-item';
                    item.innerHTML = `
                        <img src="${tool.logo}" alt="${tool.name} logo">
                        <span>${tool.name}</span>
                    `;
                    
                    item.addEventListener('click', function() {
                        input.value = tool.name;
                        suggestions.classList.remove('active');
                        updateComparisonTable();
                    });
                    
                    suggestions.appendChild(item);
                });
            }
            
            suggestions.classList.add('active');
        });
        
        // Close suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!select.contains(e.target)) {
                suggestions.classList.remove('active');
            }
        });
    });
    
    // Update comparison table based on selected tools
    function updateComparisonTable() {
        const selectedTools = [];
        const inputs = document.querySelectorAll('.tool-select input');
        
        inputs.forEach(input => {
            if (input.value) {
                const tool = toolsData.find(t => t.name === input.value);
                if (tool) selectedTools.push(tool);
            }
        });
        
        const comparisonTable = document.querySelector('.comparison-table tbody');
        if (!comparisonTable) return;
        
        // Clear existing rows except headers
        comparisonTable.innerHTML = '';
        
        if (selectedTools.length === 0) {
            comparisonTable.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align: center;">Select tools to compare</td>
                </tr>
            `;
            return;
        }
        
        // Add rows for each comparison category
        addComparisonRow('Pricing', selectedTools, 'pricing');
        addComparisonRow('Rating', selectedTools, 'rating', true, true);
        addComparisonRow('Platforms', selectedTools, 'platforms', false, false, true);
        
        // Features row
        const featuresRow = document.createElement('tr');
        featuresRow.className = 'feature-row';
        featuresRow.innerHTML = `<td>Key Features</td>`;
        
        selectedTools.forEach(tool => {
            const cell = document.createElement('td');
            const featuresList = document.createElement('ul');
            
            tool.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
            
            cell.appendChild(featuresList);
            featuresRow.appendChild(cell);
        });
        
        comparisonTable.appendChild(featuresRow);
        
        // Pros row
        const prosRow = document.createElement('tr');
        prosRow.className = 'feature-row';
        prosRow.innerHTML = `<td>Pros</td>`;
        
        selectedTools.forEach(tool => {
            const cell = document.createElement('td');
            const prosList = document.createElement('ul');
            
            tool.pros.forEach(pro => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-check"></i> ${pro}`;
                prosList.appendChild(li);
            });
            
            cell.appendChild(prosList);
            prosRow.appendChild(cell);
        });
        
        comparisonTable.appendChild(prosRow);
        
        // Cons row
        const consRow = document.createElement('tr');
        consRow.className = 'feature-row';
        consRow.innerHTML = `<td>Cons</td>`;
        
        selectedTools.forEach(tool => {
            const cell = document.createElement('td');
            const consList = document.createElement('ul');
            
            tool.cons.forEach(con => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-times"></i> ${con}`;
                consList.appendChild(li);
            });
            
            cell.appendChild(consList);
            consRow.appendChild(cell);
        });
        
        comparisonTable.appendChild(consRow);
    }
    
    function addComparisonRow(label, tools, property, isNumeric = false, isRating = false, isArray = false) {
        const row = document.createElement('tr');
        row.className = 'feature-row';
        row.innerHTML = `<td>${label}</td>`;
        
        tools.forEach(tool => {
            const cell = document.createElement('td');
            cell.className = 'feature-value';
            
            if (isArray) {
                const value = tool[property].join(', ');
                cell.textContent = value;
            } else if (isRating) {
                const rating = tool[property];
                cell.innerHTML = `
                    ${rating} 
                    <span class="stars">
                        ${'<i class="fas fa-star"></i>'.repeat(Math.floor(rating))}
                        ${rating % 1 >= 0.5 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                    </span>
                `;
            } else if (isNumeric) {
                cell.textContent = tool[property];
            } else {
                cell.textContent = tool[property];
            }
            
            row.appendChild(cell);
        });
        
        document.querySelector('.comparison-table tbody').appendChild(row);
    }
    
    // Initialize empty comparison table
    updateComparisonTable();
});