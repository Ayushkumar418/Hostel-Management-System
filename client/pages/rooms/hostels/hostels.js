const occupancyCtx = document.getElementById('occupancyChart').getContext('2d');
    new Chart(occupancyCtx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [50, 50],
          backgroundColor: ['#00FFFF', '#1a1a1a'],
          borderWidth: 0,
        }]
      },
      options: {
        cutout: '80%',
        plugins: { legend: { display: false } },
      }
    });

    const collectionCtx = document.getElementById('collectionChart').getContext('2d');
    new Chart(collectionCtx, {
      type: 'doughnut',
      data: {
        labels: ['Collected', 'Remaining', 'Overdue', 'Expected'],
        datasets: [{
          data: [25, 35, 20, 20],
          backgroundColor: ['#00FFFF', '#FFD700', '#FF00FF', '#1a1a1a'],
          borderWidth: 0,
        }]
      },
      options: {
        cutout: '70%',
        plugins: { legend: { display: false } },
      }
    });