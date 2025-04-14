function makeDonutChart(id, percent, color) {
    new Chart(document.getElementById(id), {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [percent, 100 - percent],
          backgroundColor: [color, '#2a2a2a'],
          borderWidth: 0
        }]
      },
      options: {
        cutout: '70%',
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      }
    });
  }
  
  // Create all hostel charts
  makeDonutChart('h1', 50, '#00FFFF');  // Cyan
  makeDonutChart('h2', 75, '#FFFF00');  // Yellow
  makeDonutChart('h3', 95, '#FF00FF');  // Pink
  