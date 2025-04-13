const createChart = (ctxId, value, color) => {
    const ctx = document.getElementById(ctxId).getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [value, 100 - value],
          backgroundColor: [color, '#333'],
          borderWidth: 0,
        }]
      },
      options: {
        cutout: '70%',
        plugins: {
          tooltip: {enabled: false},
          legend: {display: false},
          title: {
            display: true,
            text: `${value}%`,
            color: 'white',
            position: 'center',
            font: {
              size: 18
            }
          }
        }
      }
    });
  };

  createChart('hostel1Chart', 10, '#00FFFF');
  createChart('hostel2Chart', 75, '#FFD700');
  createChart('hostel3Chart', 95, '#FF00FF');
  createChart('feesChart', 50, '#00FFFF');