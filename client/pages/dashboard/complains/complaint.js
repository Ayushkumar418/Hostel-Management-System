const database = {
    complaints: {
        "CMP001": {
            id: "CMP001",
            title: "Water Leakage in Room 203",
            description: "Continuous water leakage from ceiling causing damage to belongings",
            status: "urgent",
            studentId: "STU156",
            studentName: "Rahul Kumar",
            date: "2024-01-15",
            time: "14:30"
        },
        // Add more complaints
    }
};

const dashboardManager = {
    updateStats() {
        const stats = Object.values(database.complaints).reduce((acc, complaint) => {
            acc.total++;
            
            switch(complaint.status) {
                case 'active':
                    acc.active++;
                    break;
                case 'urgent':
                    acc.urgent++;
                    break;
                case 'resolved':
                    acc.resolved++;
                    break;
            }
            return acc;
        }, { total: 0, active: 0, urgent: 0, resolved: 0 });

        // Update dashboard numbers
        document.querySelectorAll('.card h2').forEach((el, i) => {
            if (i === 0) el.textContent = stats.total;
            if (i === 1) el.textContent = stats.active;
            if (i === 2) el.textContent = stats.resolved;
            if (i === 3) el.textContent = stats.urgent;
        });
    }
};

const dbManager = {
    addComplaint(title, description, studentId) {
        const id = `CMP${Object.keys(database.complaints).length + 1}`.padStart(6, '0');
        database.complaints[id] = {
            id,
            title,
            description,
            status: "active",
            studentId,
            studentName: "Test Student", // Get from student database
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        dashboardManager.updateStats();
        renderComplaints();
    },

    updateStatus(id, status) {
        if (database.complaints[id]) {
            database.complaints[id].status = status;
            dashboardManager.updateStats();
            renderComplaints();
        }
    }
};

const filterHelpers = {
    getDateRange(range) {
        const today = new Date();
        const dates = {
            'today': today.toISOString().split('T')[0],
            'week': new Date(today - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            'month': new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()).toISOString().split('T')[0]
        };
        return dates[range] || '';
    },

    isDateInRange(date, range) {
        if (!range) return true;
        const compareDate = new Date(date);
        const rangeDate = new Date(this.getDateRange(range));
        return compareDate >= rangeDate;
    },

    updateFilterTags() {
        const container = document.querySelector('.filter-tags');
        if (!container) return;

        container.innerHTML = '';
        if (currentFilters.status) {
            container.appendChild(this.createFilterTag('Status', currentFilters.status));
        }
        if (currentFilters.date) {
            container.appendChild(this.createFilterTag('Date', currentFilters.date));
        }
    },

    createFilterTag(label, value) {
        const tag = document.createElement('span');
        tag.className = 'filter-tag';
        tag.innerHTML = `
            ${label}: ${value}
            <button onclick="filterHelpers.removeFilter('${label.toLowerCase()}')">&times;</button>
        `;
        return tag;
    },

    removeFilter(type) {
        currentFilters[type] = '';
        filterHelpers.updateFilterTags();
        renderComplaints(document.getElementById('search-complaints').value);
        if (!currentFilters.status && !currentFilters.date) {
            document.querySelector('.filter-btn').classList.remove('active');
        }
    }
};

function renderComplaints(filter = '') {
    const activeContainer = document.getElementById('list-complaints');
    const urgentContainer = document.getElementById('list-urgent');
    const resolvedContainer = document.getElementById('list-resolved');
    
    [activeContainer, urgentContainer, resolvedContainer].forEach(container => container.innerHTML = '');

    Object.values(database.complaints)
        .filter(c => c.title.toLowerCase().includes(filter))
        .filter(c => {
            const matchesStatus = !currentFilters.status || c.status === currentFilters.status;
            const matchesDate = !currentFilters.date || filterHelpers.isDateInRange(c.date, currentFilters.date);
            return matchesStatus && matchesDate;
        })
        .forEach(c => {
            const div = document.createElement('div');
            div.className = 'list-item';
            div.innerHTML = `
                <div class="complaint-header">
                    <span class="complaint-title">${c.title}</span>
                    <span class="complaint-status status-${c.status}">${c.status.toUpperCase()}</span>
                </div>
                <div class="complaint-content">${c.description}</div>
                <div class="complaint-meta">
                    <span>By: ${c.studentName}</span>
                    <span>${c.date} ${c.time}</span>
                </div>
                <div class="complaint-actions">
                    ${c.status !== 'resolved' ? `
                        <button class="action-btn resolve-btn" onclick="dbManager.updateStatus('${c.id}', 'resolved')">
                            Resolve
                        </button>
                    ` : ''}
                    ${c.status === 'active' ? `
                        <button class="action-btn urgent-btn" onclick="dbManager.updateStatus('${c.id}', 'urgent')">
                            Mark Urgent
                        </button>
                    ` : ''}
                </div>`;

            if (c.status === 'urgent') urgentContainer.appendChild(div.cloneNode(true));
            else if (c.status === 'resolved') resolvedContainer.appendChild(div.cloneNode(true));
            else activeContainer.appendChild(div.cloneNode(true));
        });
}

function showModal() {
    document.getElementById('complaint-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('complaint-modal').style.display = 'none';
}

let currentFilters = {
    status: '',
    date: ''
};

function showFilterModal() {
    document.getElementById('filter-modal').style.display = 'block';
    document.querySelector('.filter-btn').classList.add('active');
}

function closeFilterModal() {
    document.getElementById('filter-modal').style.display = 'none';
    if (!currentFilters.status && !currentFilters.date) {
        document.querySelector('.filter-btn').classList.remove('active');
    }
}

function showUrgentModal() {
    const container = document.getElementById('urgent-list-container');
    container.innerHTML = ''; // Clear existing content

    // Get urgent complaints from database
    const urgentComplaints = Object.values(database.complaints)
        .filter(c => c.status === 'urgent')
        .forEach(complaint => {
            const div = document.createElement('div');
            div.className = 'urgent-item';
            div.innerHTML = `
                <div class="urgent-header">
                    <span class="urgent-title">${complaint.title}</span>
                    <span class="urgent-date">${complaint.date}</span>
                </div>
                <div class="urgent-description">${complaint.description}</div>
                <div class="urgent-meta">
                    <span>Student ID: ${complaint.studentId}</span>
                    <button class="resolve-btn" onclick="resolveComplaint('${complaint.id}')">
                        Resolve Now
                    </button>
                </div>
            `;
            container.appendChild(div);
        });

    document.getElementById('urgent-list-modal').style.display = 'block';
}

function closeUrgentModal() {
    document.getElementById('urgent-list-modal').style.display = 'none';
}

function resolveComplaint(id) {
    dbManager.updateStatus(id, 'resolved');
    closeUrgentModal();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderComplaints();
    dashboardManager.updateStats();
    
    document.getElementById('search-complaints').addEventListener('input', e => 
        renderComplaints(e.target.value.toLowerCase())
    );

    document.querySelector('.add-btn').addEventListener('click', showModal);

    document.getElementById('complaint-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        dbManager.addComplaint(
            formData.get('title'),
            formData.get('description'),
            formData.get('studentId')
        );
        
        closeModal();
        e.target.reset();
    });

    // Add filter button listener
    document.querySelector('.filter-btn').addEventListener('click', showFilterModal);

    // Add urgent list view button listener
    document.querySelector('.view-btn').addEventListener('click', showUrgentModal);

    // Add filter form submit handler
    document.getElementById('filter-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        currentFilters = {
            status: formData.get('filterStatus'),
            date: formData.get('filterDate')
        };
        
        filterHelpers.updateFilterTags();
        document.querySelector('.filter-btn').classList.add('active');
        renderComplaints(document.getElementById('search-complaints').value);
        closeFilterModal();
    });

    // Close modal when clicking outside
    window.onclick = (e) => {
        if (e.target === document.getElementById('complaint-modal')) {
            closeModal();
        }
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            if (e.target.id === 'filter-modal' && !currentFilters.status && !currentFilters.date) {
                document.querySelector('.filter-btn').classList.remove('active');
            }
        }
    };
});
