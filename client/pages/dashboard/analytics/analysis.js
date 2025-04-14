const makeChart = (id, percent, color) => {
  new Chart(document.getElementById(id), {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [percent, 100 - percent],
        backgroundColor: [color, '#333'],
        borderWidth: 0
      }]
    },
    options: {
      cutout: '70%',
      plugins: { legend: { display: false } }
    }
  });
};

makeChart('h1', 50, '#00FFFF');
makeChart('h2', 75, '#FFFF00');
makeChart('h3', 95, '#FF00FF');
makeChart('fees', 50, '#00FFFF');