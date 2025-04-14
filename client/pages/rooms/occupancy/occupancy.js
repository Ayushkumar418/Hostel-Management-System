const ctx = document.getElementById('donutChart').getContext('2d');
new Chart(ctx, {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [50, 50],
      backgroundColor: ["#00fff7", "#333"],
      borderWidth: 0
    }]
  },
  options: {
    cutout: '80%',
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  }
});
