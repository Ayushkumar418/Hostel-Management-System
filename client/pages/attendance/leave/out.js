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

    const studentsOnLeave = [
      {
        name: "Ramakant Sharma",
        photo: "https://randomuser.me/api/portraits/men/10.jpg",
        outTime: "12:30",
        room: "101",
        hostel: "H1",
        leaveDate: "26 Feb 2023",
        duration: "7 Days",
        expectedArrival: "5 Mar 2023"
      },
      {
        name: "Anjali Verma",
        photo: "https://randomuser.me/api/portraits/women/12.jpg",
        outTime: "10:00",
        room: "203",
        hostel: "H2",
        leaveDate: "25 Feb 2023",
        duration: "5 Days",
        expectedArrival: "1 Mar 2023"
      },
      {
        name: "Yash Mehra",
        photo: "https://randomuser.me/api/portraits/men/8.jpg",
        outTime: "15:45",
        room: "305",
        hostel: "H3",
        leaveDate: "27 Feb 2023",
        duration: "3 Days",
        expectedArrival: "2 Mar 2023"
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
              <span><i class="fas fa-sign-out-alt" style="color: yellow;"></i> ${student.outTime}</span>
              <span><i class="fas fa-bed"></i> Room: ${student.room}</span>
              <span><i class="fas fa-building"></i> Hostel: ${student.hostel}</span>
            </div>
            <div class="info-line">
              <span>Leave Taken on: ${student.leaveDate}</span>
              <span>Duration: ${student.duration}</span>
              <span>Expected Arrival: ${student.expectedArrival}</span>
            </div>
          </div>
          <button class="view-btn">View Details</button>
        </div>
      `;
    });