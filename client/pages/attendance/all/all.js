const studentList = document.getElementById('studentList');

const studentData = [
  { name: "Ramakant Sharma", time: "12:30", status: "in", room: "101", hostel: "H1", img: "https://i.pravatar.cc/150?img=1" },
  { name: "John Doe", time: "12:45", status: "out", room: "102", hostel: "H1", img: "https://i.pravatar.cc/150?img=2" },
  { name: "Sarah Wilson", time: "13:00", status: "in", room: "103", hostel: "H1", img: "https://i.pravatar.cc/150?img=3" },
  { name: "Mike Johnson", time: "13:15", status: "out", room: "104", hostel: "H1", img: "https://i.pravatar.cc/150?img=4" },
  { name: "Emily Brown", time: "13:30", status: "in", room: "105", hostel: "H1", img: "https://i.pravatar.cc/150?img=5" },
  { name: "Alex Turner", time: "13:45", status: "out", room: "106", hostel: "H1", img: "https://i.pravatar.cc/150?img=6" },
  { name: "Lisa Anderson", time: "14:00", status: "in", room: "107", hostel: "H1", img: "https://i.pravatar.cc/150?img=7" },
  { name: "David Clark", time: "14:15", status: "out", room: "108", hostel: "H1", img: "https://i.pravatar.cc/150?img=8" },
];

studentData.forEach(student => {
  const card = document.createElement('div');
  card.className = 'student-card';

  const inOutIcon = student.status === 'in' 
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
         <path d="M11 16l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m2-2l2 2" stroke="#00FFFF" stroke-width="2" stroke-linecap="round"/>
         <circle cx="12" cy="12" r="11" stroke="#00FFFF" stroke-width="2"/>
       </svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
         <path d="M12 4v8M8 8l4-4 4 4" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/>
         <circle cx="12" cy="12" r="11" stroke="#FFD700" stroke-width="2"/>
       </svg>`;

  card.innerHTML = `
    <div class="profile-section">
      <img src="${student.img}" alt="profile" class="student-img" />
      <span class="student-name">${student.name}</span>
      <span class="student-time ${student.status}-status">
        ${inOutIcon} ${student.time}
      </span>
    </div>
    <div class="info-section">
      <span class="room-info">
        <i class="bed-icon">🛏</i> Room : ${student.room}
      </span>
      <span class="hostel-info">
        <i class="building-icon">🏢</i> Hostel : ${student.hostel}
      </span>
    </div>
  `;
  studentList.appendChild(card);
});
