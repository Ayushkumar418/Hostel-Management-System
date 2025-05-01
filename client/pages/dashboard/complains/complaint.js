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
        renderComplaints();
    },

    updateStatus(id, status) {
        if (database.complaints[id]) {
            database.complaints[id].status = status;
            renderComplaints();
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderComplaints();
    
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

    // Close modal when clicking outside
    window.onclick = (e) => {
        if (e.target === document.getElementById('complaint-modal')) {
            closeModal();
        }
    };
});
