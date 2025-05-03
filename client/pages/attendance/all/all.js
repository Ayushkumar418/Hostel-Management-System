const studentList = document.getElementById('studentList');

const studentsData = [
    {
        name: "Ramakant Sharma",
        photo: "https://randomuser.me/api/portraits/men/1.jpg",
        time: "12:30",
        status: "in",
        room: "101",
        hostel: "H1"
    },
    {
        name: "John Doe",
        photo: "https://randomuser.me/api/portraits/men/2.jpg",
        time: "12:45",
        status: "out",
        room: "102",
        hostel: "H1"
    },
    {
        name: "Sarah Wilson",
        photo: "https://randomuser.me/api/portraits/women/1.jpg",
        time: "13:00",
        status: "in",
        room: "103",
        hostel: "H1"
    },
    {
        name: "Mike Johnson",
        photo: "https://randomuser.me/api/portraits/men/3.jpg",
        time: "13:15",
        status: "out",
        room: "104",
        hostel: "H1"
    }
];

studentsData.forEach(student => {
    studentList.innerHTML += `
        <div class="student-card">
            <div class="student-profile">
                <img src="${student.photo}" alt="${student.name}">
                <span class="student-name">${student.name}</span>
            </div>
            <div class="student-info">
                <div class="status-indicator status-${student.status}">
                    <i class="fas ${student.status === 'in' ? 'fa-sign-in-alt' : 'fa-sign-out-alt'}"></i>
                    ${student.status === 'in' ? 'Inside' : 'Outside'}
                </div>
                <div class="time-badge">
                    <i class="far fa-clock"></i>
                    ${student.time}
                </div>
                <div class="room-info">
                    <i class="fas fa-door-open"></i>
                    Room: ${student.room}
                    <i class="fas fa-building"></i>
                    Hostel: ${student.hostel}
                </div>
            </div>
        </div>
    `;
});

// Initialize donut chart
const ctx = document.getElementById('donutChart').getContext('2d');
const donutChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Inside', 'Outside'],
    datasets: [{
      data: [4852, 694],
      backgroundColor: ['#00ffff', '#ff00ff'],
      borderWidth: 0,
      cutout: '80%'
    }]
  },
  options: {
    plugins: {
      legend: {
        display: false
      }
    },
    responsive: true,
    maintainAspectRatio: false
  }
});

// Update stats
function updateStats(data) {
  document.querySelector('.stat-card:nth-child(2) .value').textContent = data.totalStudents;
  document.querySelector('.stat-card:nth-child(3) .value').textContent = data.insideHostel;
  document.querySelector('.stat-card:nth-child(4) .value').textContent = data.onLeave;
  
  const percentage = Math.round((data.insideHostel / data.totalStudents) * 100);
  document.querySelector('.center-text').textContent = `${percentage}%`;
  
  // Update chart data
  donutChart.data.datasets[0].data = [data.insideHostel, data.onLeave];
  donutChart.update();
}
