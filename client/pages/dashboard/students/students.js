const database = {
    students: {
        "STU001": { 
            id: "STU001",
            name: 'Abhinav Srivastva',
            avatar: 'https://i.pravatar.cc/40?img=5',
            status: 'active'
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
            roomNo: studentData.roomNo,
            course: studentData.course,
            avatar: 'https://i.pravatar.cc/40?img=' + Math.floor(Math.random() * 70),
            status: 'active'
        };
        this.addUpdate(id, 'added');
        renderStudents();
        return true;
    },

    removeStudent(id, reason) {
        if (database.students[id]) {
            database.students[id].status = 'removed';
            database.students[id].removalReason = reason;
            database.students[id].removalDate = new Date().toLocaleDateString();
            this.addUpdate(id, `removed - ${reason}`);
            renderStudents();
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
        }
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
    }
};

const listStudents = id => document.getElementById(id);

function renderStudents(filter = '') {
    const container = listStudents('list-students');
    container.innerHTML = '';
    Object.values(database.students)
        .filter(s => s.status === 'active' && s.name.toLowerCase().includes(filter))
        .forEach(s => {
            const div = document.createElement('div');
            div.className = 'list-item';
            div.innerHTML = `
                <div class="item-info">
                    <img src="${s.avatar}"/>
                    <span>${s.name}</span>
                </div>
                <button class="eye-btn">
                    <svg viewBox="0 0 24 24">
                        <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>
                    </svg>
                </button>`;
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
                <div>
                    <button class="remove-def-btn">Remove Defaulter</button>
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
        div.innerHTML = `
            <div class="update-info">
                <img src="${u.avatar}"/>
                <span>${u.name}</span>
                <div class="update-time">↩<span>${u.time}</span></div>
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

// Initialize renders
renderStudents();
renderDefaulters();
renderUpdates();

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

    // Close modal when clicking outside
    window.onclick = (e) => {
        if (e.target === document.getElementById('student-modal')) {
            closeStudentModal();
        }
        if (e.target === document.getElementById('remove-student-modal')) {
            closeRemoveModal();
        }
    };
});