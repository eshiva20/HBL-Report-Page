document.addEventListener("DOMContentLoaded", function () {
  // Date Range Selector
  flatpickr("#datetime-picker", {
    mode: "range",
    dateFormat: "F, Y",
    onReady: function (selectedDates, dateStr, instance) {
      document
        .querySelector(".fa-calendar-alt")
        .addEventListener("click", function () {
          instance.open();
        });
    },
    onChange: function (selectedDates, dateStr, instance) {
      if (selectedDates.length > 1) {
        const startMonth = selectedDates[0].getMonth();
        const startYear = selectedDates[0].getFullYear();
        const endMonth = selectedDates[1].getMonth();
        const endYear = selectedDates[1].getFullYear();

        if (startMonth !== endMonth || startYear !== endYear) {
          instance.clear();
          alert("Please select dates within the same month.");
          return;
        }
      }

      const datesSelectedDiv = document.querySelector(".dates_selected");
      const datesDisplay = document.querySelector(".dates_display");

      if (selectedDates.length > 0) {
        let displayText = "";

        let selected_dates = selectedDates.map((date) => date.getDate());
        let selected_dates_array = Array.from(
          { length: selected_dates[1] - selected_dates[0] + 1 },
          (_, index) => selected_dates[0] + index
        );

        if (selected_dates_array.length <= 5) {
          displayText = selected_dates_array.map((date) => date).join(" | ");
        } else {
          const firstTwoDates = selected_dates_array
            .slice(0, 2)
            .map((date) => date);
          const lastTwoDates = selected_dates_array
            .slice(-2)
            .map((date) => date);
          displayText = `${firstTwoDates.join(
            " | "
          )} | .... | ${lastTwoDates.join(" | ")}`;
        }

        datesDisplay.textContent = displayText;
        datesSelectedDiv.style.display = "flex";
      } else {
        datesSelectedDiv.style.display = "none";
      }

      if (selectedDates.length > 0) {
        const monthYearText = selectedDates[0].toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
        instance.input.value = monthYearText;
      }
    },

    showMonths: 1,
  });

  document.querySelector(".clear_all").addEventListener("click", function () {
    document.querySelector("#datetime-picker")._flatpickr.clear();
    document.querySelector(".dates_selected").style.display = "none";
  });

  // Collection report Cards
  const reportBase = [
    {
      key: "contract",
      reportName: "Contract Mfg.",
      style: { color: "#1E508D", background: "#E6F1FF" },
    },
    {
      key: "directGovt",
      reportName: "Direct Govt. Inst.",
      style: { color: "#FF3A6F", background: "#FFEBE3" },
    },
    {
      key: "indirectGovt",
      reportName: "Indirect Govt. Inst.",
      style: { color: "#A7B817", background: "#FAFFCF" },
    },
    {
      key: "pcd",
      reportName: "PCD Sales",
      style: { color: "#FF9504", background: "#FFEDD3" },
    },
    {
      key: "ethical",
      reportName: "Ethical Sales",
      style: { color: "#F6D913", background: "#FFFCE7" },
    },
    {
      key: "directExport",
      reportName: "Direct Export",
      style: { color: "#0BB1B7", background: "#D9FEFF" },
    },
    {
      key: "deemedExport",
      reportName: "Deemed Export",
      style: { color: "#556179", background: "#E9E9E9" },
    },
  ];

  const reportAmounts = {
    Yesterday: {
      contract: "₹ 1,00,000",
      directGovt: "₹ 1,50,000",
      indirectGovt: "₹ 2,00,000",
      pcd: "₹ 2,50,000",
      ethical: "₹ 3,00,000",
      directExport: "₹ 3,50,000",
      deemedExport: "₹ 4,00,000",
    },
    Weekly: {
      contract: "₹ 5,00,000",
      directGovt: "₹ 5,50,000",
      indirectGovt: "₹ 6,00,000",
      pcd: "₹ 6,50,000",
      ethical: "₹ 7,00,000",
      directExport: "₹ 7,50,000",
      deemedExport: "₹ 8,00,000",
    },
    Monthly: {
      contract: "₹ 10,00,000",
      directGovt: "₹ 11,00,000",
      indirectGovt: "₹ 12,00,000",
      pcd: "₹ 13,00,000",
      ethical: "₹ 14,00,000",
      directExport: "₹ 15,00,000",
      deemedExport: "₹ 16,00,000",
    },
  };

  function renderCards(filter) {
    const allCards = document.getElementById("all-cards");
    allCards.innerHTML = reportBase
      .map((report) => {
        const amount = reportAmounts[filter][report.key];
        return `
          <div class="report-card" style="background-color: ${report.style.background}">
            <p style="border-bottom: 2px solid ${report.style.color}">${report.reportName}</p>
            <h2>${amount}</h2>
          </div>`;
      })
      .join("");
  }

  const buttons = document.querySelectorAll(".day-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const selected = button.textContent.trim();
      renderCards(selected);
    });
  });

  renderCards("Yesterday");

  // Monthly Sales Graph

  const monthlyData = {
    January: [115, 145, 110, 100, 90, 80, 105],
    February: [105, 135, 100, 90, 80, 70, 95],
    March: [100, 130, 95, 85, 75, 65, 90],
    April: [115, 145, 110, 100, 90, 80, 105],
    May: [90, 120, 85, 75, 65, 55, 80],
    June: [95, 125, 90, 80, 70, 60, 85],
    July: [100, 130, 95, 85, 75, 65, 90],
    August: [102, 132, 98, 88, 78, 68, 92],
    September: [98, 120, 88, 78, 68, 58, 85],
    October: [105, 135, 100, 90, 80, 70, 95],
    November: [110, 140, 105, 95, 85, 75, 100],
    December: [115, 145, 110, 100, 90, 80, 105],
  };

  const barGradients = [
    "linear-gradient(179.23deg, #587CEC -16.04%, #82C7F2 99.33%)",
    "linear-gradient(178.98deg, #FF4D50 -14.94%, #FFBCBD 127.73%)",
    "linear-gradient(179.33deg, #A8B346 -19.27%, #DEEF81 99.42%)",
    "linear-gradient(178.66deg, #F8C333 -36.3%, #DD932E 98.86%)",
    "linear-gradient(180deg, #FF9500 0%, #FFBD62 100%)",
    "linear-gradient(178.76deg, #21C292 -17.83%, #9CFEE3 122.86%)",
    "linear-gradient(179.52deg, #64728A -9.73%, #AFAFAF 111.38%)",
  ];

  const slider = document.getElementById("monthly-slider");

  function createCards() {
    slider.innerHTML = "";
    Object.entries(monthlyData).forEach(([month, values]) => {
      const card = document.createElement("div");
      card.className = "month-card";

      const barsHtml = values
        .map(
          (height, index) =>
            `<div class="bar" style="height: ${height}px; background: ${barGradients[index]}"></div>`
        )
        .join("");

      card.innerHTML = `
        <div class="bar-chart">${barsHtml}</div>
        <div class="month-name">${month}</div>
      `;
      slider.appendChild(card);
    });
  }

  createCards();

  const scrollAmount = 315;

  document.querySelector(".prev").addEventListener("click", () => {
    slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });
  document.querySelector(".next").addEventListener("click", () => {
    slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  // Sales vs target
  const saleVsTarget = [
    {
      name: "Contract Mfg.",
      achieveAmt: "₹1,00,00,000",
      targetAmt: "₹2,00,00,000",
      style: {
        color: "linear-gradient(179.23deg, #587CEC -16.04%, #82C7F2 99.33%);",
        background: "#E6F1FF",
      },
    },
    {
      name: "Direct Govt. Inst.",
      achieveAmt: "₹1,00,00,000",
      targetAmt: "₹2,00,00,000",
      style: {
        color: "linear-gradient(178.98deg, #FF4D50 -14.94%, #FFBCBD 127.73%);",
        background: "#FFEBE3",
      },
    },
    {
      name: "Indirect Govt. Inst.",
      achieveAmt: "₹1,00,00,000",
      targetAmt: "₹2,00,00,000",
      style: {
        color: "linear-gradient(179.33deg, #A8B346 -19.27%, #DEEF81 99.42%);",
        background: "#FAFFCF",
      },
    },
    {
      name: "PCD Sales",
      achieveAmt: "₹1,00,00,000",
      targetAmt: "₹2,00,00,000",
      style: {
        color: "linear-gradient(178.66deg, #F8C333 -36.3%, #DD932E 98.86%);",
        background: "#FFEDD3",
      },
    },
    {
      name: "Ethical Sales",
      achieveAmt: "₹1,00,00,000",
      targetAmt: "₹2,00,00,000",
      style: {
        color: "var(--Colors-Orange, #FF9500);",
        background: "#FFFCE7",
      },
    },
    {
      name: "Direct Export",
      achieveAmt: "₹1,00,00,000",
      targetAmt: "₹2,00,00,000",
      style: {
        color: "linear-gradient(178.76deg, #21C292 -17.83%, #1E9497 122.86%);",
        background: "#D9FEFF",
      },
    },
    {
      name: "Deemed Export",
      achieveAmt: "₹1,00,00,000",
      targetAmt: "₹2,00,00,000",
      style: {
        color: "linear-gradient(179.52deg, #64728A -9.73%, #676A70 111.38%);",
        background: "#E9E9E9",
      },
    },
  ];

  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = saleVsTarget
    .map(
      (item) => `<div style="
            background:${item.style.background}"  class="sales-vs-target-card">
            <h4>${item?.name}</h4>
            <div class="labels">
              <span>Achieve</span>
              <span>Target</span>
            </div>
            <div style="background: ${item.style.color}" class="border-line"></div>
            <div class="amts">
              <span>${item.achieveAmt}</span>
              <span>${item.targetAmt}</span>
            </div>
            </div>`
    )
    .join("");

  // products

  const products = [
    {
      productName: "Paracetamol",
      unitSold: "5,000",
      unitCount: "2436",
      revenue: "2,50,000",
      revenueCount: "2436",
    },
    {
      productName: "Paracetamol",
      unitSold: "5,000",
      unitCount: "2436",
      revenue: "2,50,000",
      revenueCount: "2436",
    },
    {
      productName: "Paracetamol",
      unitSold: "5,000",
      unitCount: "2436",
      revenue: "2,50,000",
      revenueCount: "2436",
    },
    {
      productName: "Paracetamol",
      unitSold: "5,000",
      unitCount: "2436",
      revenue: "2,50,000",
      revenueCount: "2436",
    },
    {
      productName: "Paracetamol",
      unitSold: "5,000",
      unitCount: "2436",
      revenue: "2,50,000",
      revenueCount: "2436",
    },
    {
      productName: "Paracetamol",
      unitSold: "5,000",
      unitCount: "2436",
      revenue: "2,50,000",
      revenueCount: "2436",
    },
    {
      productName: "Paracetamol",
      unitSold: "5,000",
      unitCount: "2436",
      revenue: "2,50,000",
      revenueCount: "2436",
    },
    {
      productName: "Paracetamol",
      unitSold: "5,000",
      unitCount: "2436",
      revenue: "2,50,000",
      revenueCount: "2436",
    },
  ];

  const allProductsList = document.getElementById("all-products");
  const viewMoreBtn = document.querySelector(".view-more-products-btn");

  let showAll = false;

  function renderProducts() {
    const visibleProducts = showAll ? products : products.slice(0, 5);
    allProductsList.innerHTML = visibleProducts
      .map(
        (product, id) => `<div style="
            border:${
              visibleProducts.length === id + 1 ? "none" : ""
            }" class="single-product">
          <div class="rank">
            <p>Rank</p>
            <h1>${id + 1}</h1>
          </div>
          <div class="product">
            <div class="product-detail">
              <div>
                <span>Product Name</span>
                <p class="product-name">${product.productName}</p>
              </div>
              <button class="view-detail-btn">View Detail</button>
            </div>
            <div class="unit-revenue">
              <div class="unit">
                <p>Unit Sold- ${product.unitSold}</p>
                <div class="border-line"></div>
                <span>${product.unitCount} K</span>
              </div>
              <div class="revenue">
                <p>Revenue- ${product.revenue}</p>
                <div class="border-line"></div>
                <span>${product.revenueCount} k</span>
              </div>
            </div>
          </div>
        </div>`
      )
      .join("");

    viewMoreBtn.querySelector("p").textContent = showAll
      ? "Show Less"
      : "View More";
    viewMoreBtn.querySelector("i").classList.toggle("fa-chevron-up", showAll);
    viewMoreBtn
      .querySelector("i")
      .classList.toggle("fa-chevron-down", !showAll);
  }
  viewMoreBtn.addEventListener("click", () => {
    showAll = !showAll;
    renderProducts();
  });

  renderProducts();

  // customers

  const allCustomers = [
    {
      customerName: "Sunpharma pvt. ltd.",
      revenueAmt: "2,50,000",
      revenueCount: "2436",
      mostBuying: ["Paracetmol", "Crocin", "Product"],
      salePersonName: "Manish Kumar",
    },
    {
      customerName: "Sunpharma pvt. ltd.",
      revenueAmt: "2,50,000",
      revenueCount: "2436",
      mostBuying: ["Paracetmol", "Crocin", "Product"],
      salePersonName: "Manish Kumar",
    },
    {
      customerName: "Sunpharma pvt. ltd.",
      revenueAmt: "2,50,000",
      revenueCount: "2436",
      mostBuying: ["Paracetmol", "Crocin", "Product"],
      salePersonName: "Manish Kumar",
    },
    {
      customerName: "Sunpharma pvt. ltd.",
      revenueAmt: "2,50,000",
      revenueCount: "2436",
      mostBuying: ["Paracetmol", "Crocin", "Product"],
      salePersonName: "Manish Kumar",
    },
    {
      customerName: "Sunpharma pvt. ltd.",
      revenueAmt: "2,50,000",
      revenueCount: "2436",
      mostBuying: ["Paracetmol", "Crocin", "Product"],
      salePersonName: "Manish Kumar",
    },
    {
      customerName: "Sunpharma pvt. ltd.",
      revenueAmt: "2,50,000",
      revenueCount: "2436",
      mostBuying: ["Paracetmol", "Crocin", "Product"],
      salePersonName: "Manish Kumar",
    },
    {
      customerName: "Sunpharma pvt. ltd.",
      revenueAmt: "2,50,000",
      revenueCount: "2436",
      mostBuying: ["Paracetmol", "Crocin", "Product"],
      salePersonName: "Manish Kumar",
    },
    {
      customerName: "Sunpharma pvt. ltd.",
      revenueAmt: "2,50,000",
      revenueCount: "2436",
      mostBuying: ["Paracetmol", "Crocin", "Product"],
      salePersonName: "Manish Kumar",
    },
    {
      customerName: "Sunpharma pvt. ltd.",
      revenueAmt: "2,50,000",
      revenueCount: "2436",
      mostBuying: ["Paracetmol", "Crocin", "Product"],
      salePersonName: "Manish Kumar",
    },
    {
      customerName: "Sunpharma pvt. ltd.",
      revenueAmt: "2,50,000",
      revenueCount: "2436",
      mostBuying: ["Paracetmol", "Crocin", "Product"],
      salePersonName: "Manish Kumar",
    },
  ];

  const allCustomersList = document.getElementById("all-customers");
  allCustomersList.innerHTML = allCustomers
    .map(
      (customer, id) => `<div style="
        border:${
          allCustomers.length === id + 1 ? "none" : ""
        }" class="single-customer">
      <div class="rank">
        <p>Rank</p>
        <h1>${id + 1}</h1>
      </div>
      <div class="customer">
        <div class="customer-detail">
          <div>
            <span>Customer Name</span>
            <p class="customer-name">${customer.customerName}</p>
          </div>
          <div class="most-buying-lists">
           <label>Most Buying</label>
           ${customer.mostBuying.map((item) => `<span>${item}</span>`)},...
           <button class="view-detail-btn">View Detail</button>
          </div>
        </div>
        <div class="revenue-sales">
          <div class="revenue">
            <p>Revenue- ${customer.revenueAmt}</p>
            <div class="border-line"></div>
            <span>${customer.revenueCount} k</span>
          </div>
          <div class="sales">
            <p>Sales Person</p>
            <span>${customer.salePersonName}</span>
          </div>
        </div>
      </div>
    </div>`
    )
    .join("");
});
