document.addEventListener("DOMContentLoaded", () => {
  const circleCharts = document.querySelectorAll(".circle-chart");
  circleCharts.forEach((chart) => {
    const percent = parseInt(chart.dataset.percent);
    const color = chart.dataset.color;

    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - percent / 100);

    const svg = `
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="${radius}" stroke="#333" stroke-width="8" fill="none"/>
        <circle cx="40" cy="40" r="${radius}" stroke="${color}" stroke-width="8" fill="none"
          stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}" stroke-linecap="round"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#fff" font-size="16">${percent}%</text>
      </svg>
    `;
    chart.innerHTML = svg;

    const animatedCircle = chart.querySelectorAll("circle")[1];
    setTimeout(() => {
      animatedCircle.style.transition = "stroke-dashoffset 1s ease";
      animatedCircle.style.strokeDashoffset = offset;
    }, 100);
  });

  // Animate bar fill
  const barFill = document.querySelector(".bar-fill");
  if (barFill) {
    barFill.style.width = "100%"; // full width bar
  }
});
