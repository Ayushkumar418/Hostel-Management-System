const maintenanceTasks = [
    {
        id: 1,
        title: "Fix Water Leak",
        location: "Block A - Room 102",
        priority: "high",
        status: "pending",
        assignedTo: "John Smith",
        reportedDate: "2024-01-15"
    },
    {
        id: 2,
        title: "AC Maintenance",
        location: "Block B - Common Area",
        priority: "medium",
        status: "in-progress",
        assignedTo: "Mike Johnson",
        reportedDate: "2024-01-14"
    }
];

const equipmentData = [
    {
        id: 1,
        name: "Air Conditioners",
        total: 48,
        working: 45,
        maintenance: 3,
        category: "electrical"
    },
    {
        id: 2,
        name: "Beds",
        total: 200,
        working: 195,
        maintenance: 5,
        category: "furniture"
    }
    // Add more equipment...
];

const recentComplaints = [
    {
        id: 1,
        title: "Water Leakage",
        location: "Room 102",
        status: "pending",
        priority: "high",
        timestamp: "2024-01-15 10:30 AM"
    }
    // Add more complaints...
];

function renderTasks() {
    const container = document.getElementById('tasksContainer');
    container.innerHTML = maintenanceTasks.map(task => `
        <div class="task-card ${task.priority}-priority">
            <div class="task-header">
                <h3>${task.title}</h3>
                <span class="status-badge ${task.status}">${task.status}</span>
            </div>
            <div class="task-details">
                <p><i class="fas fa-map-marker-alt"></i> ${task.location}</p>
                <p><i class="fas fa-user"></i> ${task.assignedTo}</p>
                <p><i class="fas fa-calendar"></i> ${task.reportedDate}</p>
            </div>
            <div class="task-actions">
                <button class="action-btn"><i class="fas fa-edit"></i></button>
                <button class="action-btn"><i class="fas fa-trash-alt"></i></button>
            </div>
        </div>
    `).join('');
}

function renderEquipment() {
    const container = document.getElementById('equipmentContainer');
    container.innerHTML = equipmentData.map(item => `
        <div class="equipment-card">
            <div class="equipment-icon">
                <i class="fas fa-${getEquipmentIcon(item.category)}"></i>
            </div>
            <div class="equipment-info">
                <h4>${item.name}</h4>
                <div class="equipment-stats">
                    <span class="working">${item.working}/${item.total} Working</span>
                    <span class="maintenance">${item.maintenance} In Maintenance</span>
                </div>
            </div>
        </div>
    `).join('');
}

function renderComplaints() {
    const container = document.getElementById('complaintsContainer');
    container.innerHTML = recentComplaints.map(complaint => `
        <div class="complaint-item ${complaint.priority}">
            <div class="complaint-info">
                <h4>${complaint.title}</h4>
                <p><i class="fas fa-map-marker-alt"></i> ${complaint.location}</p>
            </div>
            <div class="complaint-status ${complaint.status}">
                ${complaint.status.toUpperCase()}
            </div>
        </div>
    `).join('');
}

function getEquipmentIcon(category) {
    const icons = {
        electrical: 'plug',
        furniture: 'chair',
        plumbing: 'faucet'
    };
    return icons[category] || 'box';
}

document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    renderEquipment();
    renderComplaints();
});
