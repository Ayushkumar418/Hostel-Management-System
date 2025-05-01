// Dummy Data (baad me yahi API se ayega)
const dashboardData = {
    stats: [
      { label: "Total", value: "45,689", color: "" },
      { label: "Utilized", value: "24,569", color: "#00f0ff" },
      { label: "Unutilized", value: "21,120", color: "#ffee00" },
      { label: "Damaged", value: "569", color: "#ff00d4" },
    ],
    categories: 56,
    expense: {
      totalExpense: "₹ 5,24,45,685",
      unpaidPayments: "₹ 5,24,45,685",
      highest: { item: "Beds", amount: "₹ 24,45,685" },
      lowest: { item: "Irons", amount: "₹ 4,45,685" }
    }
  };
  
  // Cards Injection
  const cardsContainer = document.getElementById("cards-container");
  dashboardData.stats.forEach(stat => {
    const card = document.createElement("div");
    card.classList.add("card");
  
    let h2Style = stat.color ? `style="color:${stat.color}"` : "";
  
    card.innerHTML = `
      <p>${stat.label}</p>
      <h2 ${h2Style}>${stat.value}</h2>
    `;
    cardsContainer.appendChild(card);
  });
  
  // Categories Card
  const catCard = document.createElement("div");
  catCard.classList.add("card", "categories");
  catCard.innerHTML = `
    <p>Categories : ${dashboardData.categories}</p>
    <button>View All</button>
  `;
  cardsContainer.appendChild(catCard);
  
  // Expense Monitor Injection
  const expenseMonitor = document.getElementById("expense-monitor");
  expenseMonitor.innerHTML = `
    <div class="expense-left">
      <h3>Expense Monitor</h3>
      <p>Total Expense</p>
      <h2 class="yellow">${dashboardData.expense.totalExpense}</h2>
      <p>Unpaid Payments</p>
      <h2 class="red">${dashboardData.expense.unpaidPayments}</h2>
    </div>
    <div class="expense-right">
      <div class="highest">
        <p>Highest Expense</p>
        <h4>${dashboardData.expense.highest.item}</h4>
        <h2 class="pink">${dashboardData.expense.highest.amount}</h2>
      </div>
      <div class="lowest">
        <p>Lowest Expense</p>
        <h4>${dashboardData.expense.lowest.item}</h4>
        <h2 class="cyan">${dashboardData.expense.lowest.amount}</h2>
      </div>
    </div>
  `;
  