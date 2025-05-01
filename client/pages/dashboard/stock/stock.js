const database = {
    stock: {
        "STK001": {
            id: "STK001",
            name: "Study Table",
            quantity: 50,
            price: 2500,
            category: "furniture",
            lastUpdated: "2024-01-15"
        }
        // More items will be added dynamically
    }
};

const dbManager = {
    addItem(itemData) {
        const id = `STK${Object.keys(database.stock).length + 1}`.padStart(6, '0');
        database.stock[id] = {
            id,
            ...itemData,
            lastUpdated: new Date().toISOString().split('T')[0]
        };
        this.updateDashboard();
        renderStock();
        return true;
    },

    updateDashboard() {
        const stats = Object.values(database.stock).reduce((acc, item) => {
            acc.total++;
            if (item.quantity === 0) acc.outOfStock++;
            else if (item.quantity < 10) acc.lowStock++;
            acc.totalValue += item.quantity * item.price;
            return acc;
        }, { total: 0, lowStock: 0, outOfStock: 0, totalValue: 0 });

        document.querySelectorAll('.card h2').forEach((el, i) => {
            if (i === 0) el.textContent = stats.total;
            if (i === 1) el.textContent = stats.lowStock;
            if (i === 2) el.textContent = stats.outOfStock;
        });
        
        // Format total value with commas
        document.getElementById('total-value').textContent = 
            stats.totalValue.toLocaleString('en-IN');
    }
};

let currentFilters = {
    category: '',
    status: ''
};

function showFilterModal() {
    document.getElementById('filter-modal').style.display = 'block';
    document.querySelector('.filter-btn').classList.add('active');
}

function closeFilterModal() {
    document.getElementById('filter-modal').style.display = 'none';
    if (!currentFilters.category && !currentFilters.status) {
        document.querySelector('.filter-btn').classList.remove('active');
    }
}

function showUpdateModal(id) {
    const item = database.stock[id];
    const form = document.getElementById('update-form');
    
    form.itemId.value = id;
    form.name.value = item.name;
    form.quantity.value = item.quantity;
    form.price.value = item.price;
    form.category.value = item.category;
    
    document.getElementById('update-modal').style.display = 'block';
}

function closeUpdateModal() {
    document.getElementById('update-modal').style.display = 'none';
}

function updateItem(id, itemData) {
    if (database.stock[id]) {
        database.stock[id] = {
            ...database.stock[id],
            ...itemData,
            lastUpdated: new Date().toISOString().split('T')[0]
        };
        dbManager.updateDashboard();
        renderStock();
        return true;
    }
    return false;
}

// Update renderStock function to exclude update quantity functionality
function renderStock(searchFilter = '') {
    const container = document.getElementById('list-stock');
    container.innerHTML = '';
    
    Object.values(database.stock)
        .filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchFilter.toLowerCase());
            const matchesCategory = !currentFilters.category || item.category === currentFilters.category;
            const matchesStatus = !currentFilters.status || (
                currentFilters.status === 'outOfStock' && item.quantity === 0 ||
                currentFilters.status === 'lowStock' && item.quantity > 0 && item.quantity < 10 ||
                currentFilters.status === 'inStock' && item.quantity >= 10
            );
            return matchesSearch && matchesCategory && matchesStatus;
        })
        .forEach(item => {
            const div = document.createElement('div');
            div.className = 'list-item';
            div.innerHTML = `
                <div class="stock-info">
                    <span class="stock-name">${item.name}</span>
                    <span class="stock-meta">
                        Quantity: ${item.quantity} | Price: ₹${item.price} | 
                        Category: ${item.category}
                    </span>
                </div>
                <div class="stock-actions">
                    <button onclick="showUpdateModal('${item.id}')" class="action-btn">
                        Update Details
                    </button>
                </div>`;
            container.appendChild(div);
        });
}

// Modal functions
function showStockModal() {
    document.getElementById('stock-modal').style.display = 'block';
}

function closeStockModal() {
    document.getElementById('stock-modal').style.display = 'none';
}

function showDetailsModal() {
    const stats = Object.values(database.stock).reduce((acc, item) => {
        const itemValue = item.quantity * item.price;
        acc.total++;
        acc.totalValue += itemValue;
        
        if (itemValue > acc.highestValue.value) {
            acc.highestValue = { 
                name: item.name, 
                value: itemValue,
                quantity: item.quantity,
                price: item.price 
            };
        }
        return acc;
    }, { 
        total: 0, 
        totalValue: 0, 
        highestValue: { name: 'None', value: 0, quantity: 0, price: 0 }
    });

    document.getElementById('detail-total').textContent = stats.total;
    document.getElementById('detail-value').textContent = 
        `₹ ${stats.totalValue.toLocaleString('en-IN')}`;
    
    const avgValue = stats.total > 0 ? Math.round(stats.totalValue / stats.total) : 0;
    document.getElementById('detail-average').textContent = 
        `₹ ${avgValue.toLocaleString('en-IN')}`;
    
    const highest = stats.highestValue;
    document.getElementById('detail-highest').textContent = highest.value > 0 ?
        `${highest.name} (${highest.quantity} × ₹${highest.price})` : 'None';

    document.getElementById('details-modal').style.display = 'block';
}

function closeDetailsModal() {
    document.getElementById('details-modal').style.display = 'none';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    renderStock();
    dbManager.updateDashboard();

    document.querySelector('.add-btn').addEventListener('click', showStockModal);

    document.getElementById('search-stock').addEventListener('input', e => 
        renderStock(e.target.value.toLowerCase())
    );

    document.getElementById('stock-form').addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const itemData = {
            name: formData.get('name'),
            quantity: parseInt(formData.get('quantity')),
            price: parseFloat(formData.get('price')),
            category: formData.get('category')
        };
        
        if (dbManager.addItem(itemData)) {
            closeStockModal();
            e.target.reset();
        }
    });

    // Update window click handler to handle all modals
    window.addEventListener('click', (event) => {
        const modals = {
            'stock-modal': closeStockModal,
            'filter-modal': closeFilterModal,
            'details-modal': closeDetailsModal,
            'update-modal': closeUpdateModal
        };

        Object.entries(modals).forEach(([modalId, closeFunction]) => {
            const modal = document.getElementById(modalId);
            if (event.target === modal) {
                closeFunction();
            }
        });
    });

    document.querySelector('.filter-btn').addEventListener('click', showFilterModal);

    document.getElementById('filter-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        currentFilters = {
            category: formData.get('filterCategory'),
            status: formData.get('filterStatus')
        };
        
        // Keep filter button active if filters are applied
        const filterBtn = document.querySelector('.filter-btn');
        if (currentFilters.category || currentFilters.status) {
            filterBtn.classList.add('active');
        } else {
            filterBtn.classList.remove('active');
        }
        
        renderStock(document.getElementById('search-stock').value);
        closeFilterModal();
    });

    document.getElementById('update-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const id = formData.get('itemId');
        const itemData = {
            name: formData.get('name'),
            quantity: parseInt(formData.get('quantity')),
            price: parseFloat(formData.get('price')),
            category: formData.get('category')
        };
        
        if (updateItem(id, itemData)) {
            closeUpdateModal();
            e.target.reset();
        }
    });

    // Add view details button listener
    const viewBtn = document.querySelector('.view-btn');
    viewBtn?.addEventListener('click', showDetailsModal);

    // Add close button listener
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDetailsModal);
    }
});
