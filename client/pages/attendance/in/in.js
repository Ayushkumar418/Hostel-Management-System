const ctx = document.getElementById('donutChart').getContext('2d');
    const donutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Inside Hostel', 'On Leave', 'Others'],
        datasets: [{
          data: [4852, 105, 589],
          backgroundColor: ['#00ffff', '#ff00ff', '#ffee00'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: false,
        cutout: '70%',
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                const value = context.parsed;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${context.label}: ${percentage}% (${value})`;
              }
            }
          },
          legend: {
            display: false
          }
        }
      }
    });

    const studentsInfo = [
      {
        name: "John Doe",
        photo: "https://randomuser.me/api/portraits/men/15.jpg",
        room: "101",
        hostel: "03",
        joined: "Jan 2022",
        course: "Computer Science",
        contact: "9876543210"
      },
      {
        name: "Sara Khan",
        photo: "https://randomuser.me/api/portraits/women/25.jpg",
        room: "203",
        hostel: "02",
        joined: "March 2023",
        course: "Mechanical Engineering",
        contact: "9876543211"
      },
      {
        name: "Ravi Sharma",
        photo: "https://randomuser.me/api/portraits/men/2.jpg",
        room: "305",
        hostel: "01",
        joined: "July 2021",
        course: "Electrical Engineering",
        contact: "9876543212"
      }
    ];

    const container = document.getElementById("studentContainer");
    studentsInfo.forEach(student => {
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
              <span>Joined: ${student.joined}</span>
              <span>Course: ${student.course}</span>
              <span>Contact: ${student.contact}</span>
            </div>
          </div>
          <button class="view-btn">View Details</button>
        </div>
      `;
    });