const database = {
    students: {
        "STU001": { 
            id: "STU001",
            name: 'Abhinav Srivastva',
            avatar: 'https://i.pravatar.cc/40?img=5',
            status: 'active',
            assignedRoom: '101',
            roomNo: '101'
        },
        // Add more students with unique IDs
    },
    defaulters: {
        "DEF001": {
            id: "DEF001",
            studentId: "STU001",
            name: 'Abhinav Srivastva',
            avatar: 'https://i.pravatar.cc/40?img=5',
            note: 'Broke 4 Test Tubes in Hostel Mess',
            fine: '₹ 1,500',
            date: '12 Nov 2022'
        },
        // Add more defaulters with unique IDs
    },
    updates: {
        "UPD001": {
            id: "UPD001",
            studentId: "STU001",
            name: 'Ramakant Sharma',
            avatar: 'https://i.pravatar.cc/40?img=15',
            time: '12:30',
            action: 'checked-in'
        },
        // Add more updates with unique IDs
    },
    removedStudents: {} // Add this to track removed students
};

const dashboardStats = {
    updateStats() {
        const stats = {
            total: 0,
            inHostel: 0,
            outHostel: 0,
            assigned: 0,
            removed: Object.keys(database.removedStudents).length // Count removed students
        };

        // Count active students
        Object.values(database.students).forEach(student => {
            stats.total++;
            if (student.status === 'in') {
                stats.inHostel++;
                stats.assigned++;
            } else {
                stats.outHostel++;
            }
        });

        // Add defaulters count
        stats.defaulters = Object.keys(database.defaulters).length;

        // Update dashboard numbers
        const dashboardNumbers = document.querySelectorAll('.card h2');
        dashboardNumbers[0].textContent = stats.total;
        dashboardNumbers[1].textContent = stats.inHostel;
        dashboardNumbers[2].textContent = stats.outHostel;
        dashboardNumbers[3].textContent = stats.defaulters;
        dashboardNumbers[4].textContent = stats.assigned;
        dashboardNumbers[5].textContent = stats.removed;
    }
};

// Database management methods
const dbManager = {
    addStudent(studentData) {
        const id = studentData.studentId;
        // Check if ID already exists
        if (database.students[id]) {
            alert('Student ID already exists!');
            return false;
        }
        
        database.students[id] = {
            id,
            name: studentData.name,
            rollNo: studentData.rollNo,
            assignedRoom: studentData.roomNo, // Store as assigned room
            roomNo: studentData.roomNo,       // Current room (same as assigned initially)
            status: 'in',                     // Initial status is 'in'
            course: studentData.course,
            avatar: 'https://i.pravatar.cc/40?img=' + Math.floor(Math.random() * 70)
        };
        this.addUpdate(id, 'added');
        dashboardStats.updateStats();
        renderStudents();
        return true;
    },

    removeStudent(id, reason) {
        if (database.students[id]) {
            // Store in removedStudents before deleting
            database.removedStudents[id] = {
                ...database.students[id],
                removalReason: reason,
                removalDate: new Date().toISOString()
            };
            
            this.addUpdate(id, `removed - ${reason}`);
            delete database.students[id];
            
            renderStudents();
            dashboardStats.updateStats();
            return true;
        }
        alert('Student ID not found!');
        return false;
    },

    addDefaulter(studentId, note, fine) {
        const id = `DEF${Object.keys(database.defaulters).length + 1}`.padStart(6, '0');
        const student = database.students[studentId];
        if (student) {
            database.defaulters[id] = {
                id,
                studentId,
                name: student.name,
                avatar: student.avatar,
                note,
                fine,
                date: new Date().toLocaleDateString()
            };
            this.addUpdate(studentId, 'defaulter-added');
            renderDefaulters();
            dashboardStats.updateStats();
        }
    },

    removeDefaulter(id) {
        const defaulter = database.defaulters[id];
        if (defaulter) {
            delete database.defaulters[id];
            this.addUpdate(defaulter.studentId, 'defaulter-removed');
            renderDefaulters();
            dashboardStats.updateStats();
            return true;
        }
        return false;
    },

    addUpdate(studentId, action) {
        const id = `UPD${Object.keys(database.updates).length + 1}`.padStart(6, '0');
        const student = database.students[studentId];
        if (student) {
            database.updates[id] = {
                id,
                studentId,
                name: student.name,
                avatar: student.avatar,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                action
            };
            renderUpdates();
        }
    },

    updateRoomStatus(studentId, roomNo, status) {
        if (database.students[studentId]) {
            database.students[studentId].status = status;
            // roomNo stays the same, we just toggle the status
            this.addUpdate(studentId, status === 'in' ? 'checked-in' : 'checked-out');
            renderStudents();
            dashboardStats.updateStats();
        }
    }
};

const listStudents = id => document.getElementById(id);

// Add at the top with other state management
let currentFilters = {
    status: '',
    course: ''
};

function renderStudents(filter = '') {
    const container = listStudents('list-students');
    container.innerHTML = '';
    
    Object.values(database.students)
        .filter(s => {
            const matchesSearch = s.name.toLowerCase().includes(filter.toLowerCase());
            const matchesStatus = !currentFilters.status || 
                (currentFilters.status === 'in' && s.status === 'in') ||
                (currentFilters.status === 'out' && s.status === 'out');
            const matchesCourse = !currentFilters.course || s.course === currentFilters.course;
            return matchesSearch && matchesStatus && matchesCourse;
        })
        .forEach(s => {
            const div = document.createElement('div');
            div.className = 'list-item';
            div.innerHTML = `
                <div class="item-info">
                    <img src="${s.avatar}"/>
                    <span>${s.name}</span>
                    <span class="room-info">Room: ${s.assignedRoom}</span>
                </div>
                <div class="student-actions">
                    <button onclick="toggleRoomStatus('${s.id}')" 
                            class="status-btn ${s.status === 'in' ? 'checked-in' : 'checked-out'}">
                        ${s.status === 'in' ? 'Check Out' : 'Check In'}
                    </button>
                </div>`;
            container.appendChild(div);
        });
}

function renderDefaulters(filter = '') {
    const container = listStudents('list-defaulters');
    container.innerHTML = '';
    Object.values(database.defaulters)
        .filter(d => d.name.toLowerCase().includes(filter))
        .forEach(d => {
            const div = document.createElement('div');
            div.className = 'list-def-item';
            div.dataset.defaulterId = d.id;  // Add data attribute for identification
            div.innerHTML = `
                <div class="item-info">
                    <img src="${d.avatar}"/>
                    <span>${d.name}</span>
                </div>
                <div class="def-info">${d.note}</div>
                <div class="def-tags">
                    <span>Fine: ${d.fine}</span>
                    <span>📅 ${d.date}</span>
                </div>
                <div class="def-actions">
                    <button class="remove-def-btn" data-id="${d.id}">Remove Defaulter</button>
                    <button class="send-link-btn">Send Payment Link</button>
                </div>`;
            container.appendChild(div);
        });
}

function renderUpdates() {
    const container = listStudents('list-updates');
    container.innerHTML = '';
    Object.values(database.updates).forEach(u => {
        const div = document.createElement('div');
        div.className = 'list-update-item';
        const isCheckIn = u.action.includes('in');
        div.innerHTML = `
            <div class="update-info">
                <img src="${u.avatar}"/>
                <span>${u.name}</span>
                <div class="update-time ${isCheckIn ? 'check-in' : 'check-out'}">
                    ${isCheckIn ? '↙' : '↗'}<span>${u.time}</span>
                </div>
            </div>`;
        container.appendChild(div);
    });
}

function showStudentModal() {
    document.getElementById('student-modal').style.display = 'block';
}

function closeStudentModal() {
    document.getElementById('student-modal').style.display = 'none';
}

function showRemoveModal() {
    document.getElementById('remove-student-modal').style.display = 'block';
}

function closeRemoveModal() {
    document.getElementById('remove-student-modal').style.display = 'none';
}

// Add these functions
function showFilterModal() {
    document.getElementById('student-filter-modal').style.display = 'block';
    document.querySelector('.filter-btn').classList.add('active');
}

function closeFilterModal() {
    document.getElementById('student-filter-modal').style.display = 'none';
    if (!currentFilters.status && !currentFilters.course) {
        document.querySelector('.filter-btn').classList.remove('active');
    }
}

// Add room status toggle functionality
function toggleRoomStatus(studentId) {
    const student = database.students[studentId];
    if (student) {
        // Toggle between in/out without asking for room number
        if (student.status === 'out') {
            // Check in - use assigned room number
            dbManager.updateRoomStatus(studentId, student.assignedRoom, 'in');
        } else {
            // Check out - keep assigned room number but mark as out
            dbManager.updateRoomStatus(studentId, student.assignedRoom, 'out');
        }
    }
}

function removeDefaulter(id) {
    const defaulter = database.defaulters[id];
    if (!defaulter) return;

    const element = document.querySelector(`[data-defaulter-id="${id}"]`);
    if (!element) return;

    // Add fade out animation
    element.classList.add('fade-out');

    // Wait for animation to complete
    setTimeout(() => {
        delete database.defaulters[id];
        dbManager.addUpdate(defaulter.studentId, 'defaulter-removed');
        renderDefaulters();
        dashboardStats.updateStats();
    }, 300);
}

// Initialize renders
renderStudents();
renderDefaulters();
renderUpdates();
dashboardStats.updateStats();

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-students').addEventListener('input', e => 
        renderStudents(e.target.value.toLowerCase())
    );

    document.getElementById('search-defaulters').addEventListener('input', e => 
        renderDefaulters(e.target.value.toLowerCase())
    );

    document.querySelector('.add-btn.ar-btn').addEventListener('click', showStudentModal);

    document.querySelector('.remove-btn.ar-btn').addEventListener('click', showRemoveModal);

    document.querySelector('.filter-btn').addEventListener('click', showFilterModal);

    document.getElementById('add-def').addEventListener('click', () => {
        const studentId = prompt('Enter student ID:');
        if (studentId) {
            dbManager.addDefaulter(studentId, 'New violation', '₹ 500');
        }
    });

    document.getElementById('student-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const studentData = {
            studentId: formData.get('studentId'),
            name: formData.get('name'),
            rollNo: formData.get('rollNo'),
            roomNo: formData.get('roomNo'),
            course: formData.get('course')
        };
        
        if (dbManager.addStudent(studentData)) {
            closeStudentModal();
            e.target.reset();
        }
    });

    document.getElementById('remove-student-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const studentId = formData.get('studentId');
        const reason = formData.get('reason');
        
        if (dbManager.removeStudent(studentId, reason)) {
            closeRemoveModal();
            e.target.reset();
        }
    });

    document.getElementById('student-filter-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        currentFilters = {
            status: formData.get('filterStatus'),
            course: formData.get('filterCourse')
        };
        
        const filterBtn = document.querySelector('.filter-btn');
        if (currentFilters.status || currentFilters.course) {
            filterBtn.classList.add('active');
        } else {
            filterBtn.classList.remove('active');
        }
        
        renderStudents(document.getElementById('search-students').value);
        closeFilterModal();
    });

    // Add confirmation for defaulter removal
    document.getElementById('list-defaulters').addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-def-btn')) {
            const id = e.target.dataset.id;
            if (confirm('Are you sure you want to remove this defaulter?')) {
                removeDefaulter(id);
            }
        }
    });

    // Close modal when clicking outside
    window.onclick = (e) => {
        if (e.target === document.getElementById('student-modal')) {
            closeStudentModal();
        }
        if (e.target === document.getElementById('remove-student-modal')) {
            closeRemoveModal();
        }
        if (e.target === document.getElementById('student-filter-modal')) {
            closeFilterModal();
        }
    };
});