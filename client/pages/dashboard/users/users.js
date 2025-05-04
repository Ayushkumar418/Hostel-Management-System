// Mock API endpoint (replace with actual API)
const API_URL = 'https://api.example.com/users';

let users = [];
let filteredUsers = [];

async function fetchUsers() {
    try {
        // Simulate API call (replace with actual fetch)
        users = [
            {
                id: 1,
                name: "John Doe",
                role: "Warden",
                email: "john@hostel.com",
                avatar: "https://randomuser.me/api/portraits/men/1.jpg",
                status: "active",
                lastActive: "2 hours ago",
                totalActions: 145,
                hostel: "Block A"
            },
            {
                id: 2,
                name: "Sarah Wilson",
                role: "Staff",
                email: "sarah@hostel.com",
                avatar: "https://randomuser.me/api/portraits/women/2.jpg",
                status: "active",
                lastActive: "5 mins ago",
                totalActions: 89,
                hostel: "Block B"
            }
        ];
        filteredUsers = [...users];
        updateUserCount();
        renderUsers();
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

function updateUserCount() {
    const countElement = document.querySelector('.user-count');
    countElement.textContent = `Total Users: ${filteredUsers.length}`;
}

function filterUsers(searchTerm = '', role = '', status = '') {
    filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = !role || user.role.toLowerCase() === role.toLowerCase();
        const matchesStatus = !status || user.status.toLowerCase() === status.toLowerCase();
        return matchesSearch && matchesRole && matchesStatus;
    });
    updateUserCount();
    renderUsers();
}

function renderUsers() {
    const container = document.getElementById('usersContainer');
    if (filteredUsers.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No users found</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredUsers.map(user => `
        <div class="user-card">
            <div class="user-card-header">
                <img src="${user.avatar}" alt="${user.name}" class="user-avatar">
                <div class="user-info">
                    <h3>${user.name}</h3>
                    <span class="user-role"><i class="fas fa-user-shield"></i> ${user.role}</span>
                </div>
            </div>
            <div class="user-details">
                <p><i class="fas fa-envelope"></i> ${user.email}</p>
                <p><i class="fas fa-building"></i> ${user.hostel}</p>
                <p><i class="fas fa-clock"></i> ${user.lastActive}</p>
            </div>
            <div class="user-stats">
                <div class="stat-item">
                    <div class="stat-value">${user.totalActions}</div>
                    <div class="stat-label">Activities</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value ${user.status === 'active' ? 'text-success' : 'text-warning'}">
                        <i class="fas fa-circle"></i> ${user.status}
                    </div>
                    <div class="stat-label">Status</div>
                </div>
            </div>
        </div>
    `).join('');

    // Add click handlers to cards
    document.querySelectorAll('.user-card').forEach(card => {
        card.addEventListener('click', () => {
            // Handle card click (e.g., show user details)
        });
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();

    const searchInput = document.querySelector('.search-box input');
    const roleSelect = document.querySelector('select:first-of-type');
    const statusSelect = document.querySelector('select:last-of-type');

    searchInput.addEventListener('input', (e) => {
        filterUsers(e.target.value, roleSelect.value, statusSelect.value);
    });

    roleSelect.addEventListener('change', (e) => {
        filterUsers(searchInput.value, e.target.value, statusSelect.value);
    });

    statusSelect.addEventListener('change', (e) => {
        filterUsers(searchInput.value, roleSelect.value, e.target.value);
    });
});

// Optional: Add real-time updates
function startRealtimeUpdates() {
    setInterval(async () => {
        await fetchUsers();
    }, 30000); // Update every 30 seconds
}

startRealtimeUpdates();
