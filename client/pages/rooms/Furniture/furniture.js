// Data structure
let furnitureData = {
    items: [],
    damageReports: [],
    totalExpense: 0
};

// Modal handling
const addModal = document.getElementById('addFurnitureModal');
const reportModal = document.getElementById('reportDamageModal');
const addBtn = document.querySelector('.add-btn');
const reportBtn = document.querySelector('.report-btn');
const closeAddBtn = document.querySelector('.modal-close');
const closeReportBtn = document.querySelector('.modal-close-report');

// Button event listeners
addBtn.addEventListener('click', () => {
    addModal.classList.remove('hidden');
});

reportBtn.addEventListener('click', () => {
    updateFurnitureSelect();
    reportModal.classList.remove('hidden');
});

closeAddBtn.addEventListener('click', () => addModal.classList.add('hidden'));
closeReportBtn.addEventListener('click', () => reportModal.classList.add('hidden'));

// Form handling
document.getElementById('addFurnitureForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Validate form
    if (!validateAddForm(formData)) return;

    const newItem = {
        id: Date.now(),
        name: formData.get('name'),
        quantity: parseInt(formData.get('quantity')),
        price: parseFloat(formData.get('price')),
        status: formData.get('status'),
        dateAdded: new Date(),
        damagedCount: 0
    };

    furnitureData.items.push(newItem);
    furnitureData.totalExpense += newItem.price * newItem.quantity;
    
    updateDashboard();
    addModal.classList.add('hidden');
    e.target.reset();
});

document.getElementById('reportDamageForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Validate form
    if (!validateReportForm(formData)) return;

    const damageReport = {
        id: Date.now(),
        furnitureId: parseInt(formData.get('furnitureId')),
        description: formData.get('damageDescription'),
        quantity: parseInt(formData.get('damagedQuantity')),
        damageLevel: formData.get('damageLevel'),
        reportDate: new Date()
    };

    const furniture = furnitureData.items.find(item => item.id === damageReport.furnitureId);
    if (furniture) {
        furniture.quantity -= damageReport.quantity;
        furniture.damagedCount += damageReport.quantity;
        if (furniture.quantity === 0) furniture.status = 'damaged';
    }

    furnitureData.damageReports.push(damageReport);
    updateDashboard();
    reportModal.classList.add('hidden');
    e.target.reset();
});

function validateAddForm(formData) {
    const errors = [];
    if (!formData.get('name').trim()) errors.push('Name is required');
    if (!formData.get('quantity') || formData.get('quantity') <= 0) errors.push('Valid quantity is required');
    if (!formData.get('price') || formData.get('price') <= 0) errors.push('Valid price is required');
    if (!formData.get('status')) errors.push('Status is required');

    if (errors.length > 0) {
        alert(errors.join('\n'));
        return false;
    }
    return true;
}

function validateReportForm(formData) {
    const errors = [];
    if (!formData.get('furnitureId')) errors.push('Select furniture');
    if (!formData.get('damageDescription').trim()) errors.push('Description is required');
    if (!formData.get('damagedQuantity') || formData.get('damagedQuantity') <= 0) errors.push('Valid quantity is required');
    if (!formData.get('damageLevel')) errors.push('Damage level is required');

    const furniture = furnitureData.items.find(item => item.id === parseInt(formData.get('furnitureId')));
    if (furniture && parseInt(formData.get('damagedQuantity')) > furniture.quantity) {
        errors.push('Damaged quantity cannot exceed available quantity');
    }

    if (errors.length > 0) {
        alert(errors.join('\n'));
        return false;
    }
    return true;
}

function updateFurnitureSelect() {
    const select = document.querySelector('select[name="furnitureId"]');
    select.innerHTML = '<option value="">Select Furniture</option>' +
        furnitureData.items
            .filter(item => item.quantity > 0)
            .map(item => `
                <option value="${item.id}">
                    ${item.name} (Available: ${item.quantity})
                </option>
            `).join('');
}

// Search functionality
const searchInput = document.querySelector('.search-box input');
let searchQuery = '';

searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    updateDashboard();
});

function updateDashboard() {
    // Filter items based on search
    const filteredItems = furnitureData.items.filter(item => 
        item.name.toLowerCase().includes(searchQuery)
    );

    // Update stats based on filtered items
    document.getElementById('totalItems').textContent = 
        filteredItems.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('totalExpense').textContent = 
        '₹' + filteredItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toLocaleString();
    document.getElementById('damagedItems').textContent = 
        filteredItems.reduce((acc, item) => acc + item.damagedCount, 0);

    // Update furniture cards with filtered items
    const container = document.getElementById('cards-container');
    if (filteredItems.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center text-gray-400 py-8">
                No furniture items found matching "${searchQuery}"
            </div>
        `;
    } else {
        container.innerHTML = filteredItems.map(item => `
            <div class="bg-[#1a1a1a] p-4 rounded-xl hover:bg-[#222] transition-colors">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold">${item.name}</h3>
                    <span class="status-badge ${item.status}">${item.status}</span>
                </div>
                <div class="grid grid-cols-2 gap-4 text-gray-400">
                    <div>Available: <span class="text-white">${item.quantity}</span></div>
                    <div>Damaged: <span class="text-red-400">${item.damagedCount}</span></div>
                    <div>Price: <span class="text-white">₹${item.price.toLocaleString()}</span></div>
                    <div>Total: <span class="text-white">₹${(item.price * item.quantity).toLocaleString()}</span></div>
                </div>
                ${item.quantity > 0 ? `
                    <button onclick="reportDamage(${item.id})" 
                        class="mt-4 bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm transition-colors">
                        Report Damage
                    </button>
                ` : ''}
            </div>
        `).join('');
    }
}

function reportDamage(id) {
    document.querySelector('select[name="furnitureId"]').value = id;
    reportModal.classList.remove('hidden');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', updateDashboard);
