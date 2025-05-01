const ctx = document.getElementById('collectionChart').getContext('2d');
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Expected', 'Collected', 'Due', 'Overdue'],
    datasets: [{
      data: [658000, 154500, 300000, 204000],
      backgroundColor: ['#FFD700', '#00FFFF', '#00FF00', '#FF00FF'],
      borderWidth: 0
    }]
  },
  options: {
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    }
  }
});