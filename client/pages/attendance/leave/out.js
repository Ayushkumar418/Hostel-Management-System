const studentsOnLeave = [
    {
        name: "Alex Johnson",
        photo: "https://randomuser.me/api/portraits/men/22.jpg",
        room: "104",
        hostel: "02",
        joined: "Feb 2022",
        course: "Civil Engineering",
        contact: "9876543213"
    },
    {
        name: "Priya Patel",
        photo: "https://randomuser.me/api/portraits/women/28.jpg",
        room: "205",
        hostel: "01",
        joined: "Aug 2022",
        course: "Electronics Engineering",
        contact: "9876543214"
    },
    {
        name: "Mike Wilson",
        photo: "https://randomuser.me/api/portraits/men/32.jpg",
        room: "308",
        hostel: "03",
        joined: "Sep 2021",
        course: "Chemical Engineering",
        contact: "9876543215"
    }
];

const container = document.getElementById("leaveContainer");
studentsOnLeave.forEach(student => {
    container.innerHTML += `
        <div class="card">
            <img src="${student.photo}" alt="Student Photo">
            <div class="details">
                <h3>${student.name}</h3>
                <div class="info-line">
                    <span><i class="fas fa-building"></i> Hostel: ${student.hostel}</span>
                    <span><i class="fas fa-bed"></i> Room: ${student.room}</span>
                </div>
                <div class="info-line">
                    <span><i class="fas fa-calendar-alt"></i> Joined: ${student.joined}</span>
                    <span><i class="fas fa-graduation-cap"></i> Course: ${student.course}</span>
                    <span><i class="fas fa-phone"></i> Contact: ${student.contact}</span>
                </div>
            </div>
            <button class="view-btn">View Details</button>
        </div>
    `;
});