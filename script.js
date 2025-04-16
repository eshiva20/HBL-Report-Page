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
      mostBuying: [
        "Paracetmol",
        "Crocin",
        "Product",
        "Paracetmol",
        "Crocin",
        "Product",
      ],
      salePersonName: "Manish Kumar",
    },
    {
      customerName: "Sunpharma pvt. ltd.",
      revenueAmt: "2,50,000",
      revenueCount: "2436",
      mostBuying: [
        "Paracetmol",
        "Crocin",
        "Product",
        "Paracetmol",
        "Crocin",
        "Product",
      ],
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
      mostBuying: [
        "Paracetmol",
        "Crocin",
        "Product",
        "Paracetmol",
        "Crocin",
        "Product",
      ],
      salePersonName: "Manish Kumar",
    },
    {
      customerName: "Sunpharma pvt. ltd.",
      revenueAmt: "2,50,000",
      revenueCount: "2436",
      mostBuying: [
        "Paracetmol",
        "Crocin",
        "Product",
        "Paracetmol",
        "Crocin",
        "Product",
      ],
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
      mostBuying: [
        "Paracetmol",
        "Crocin",
        "Product",
        "Paracetmol",
        "Crocin",
        "Product",
      ],
      salePersonName: "Manish Kumar",
    },
    {
      customerName: "Sunpharma pvt. ltd.",
      revenueAmt: "2,50,000",
      revenueCount: "2436",
      mostBuying: [
        "Paracetmol",
        "Crocin",
        "Product",
        "Paracetmol",
        "Crocin",
        "Product",
      ],
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
  const paginationWrapper = document.querySelector(".pagination");
  const pageDisplay = paginationWrapper.querySelector("p");
  const pageContainer = paginationWrapper.querySelector(".pages");

  const customersPerPage = 10;
  let currentPage = 1;

  function renderCustomers() {
    const startIndex = (currentPage - 1) * customersPerPage;
    const endIndex = startIndex + customersPerPage;
    const visibleCustomers = allCustomers.slice(startIndex, endIndex);

    allCustomersList.innerHTML = visibleCustomers
      .map(
        (customer, idx) => `
      <div class="single-customer">
        <div class="rank">
          <p>Rank</p>
          <h1>${startIndex + idx + 1}</h1>
        </div>
        <div class="customer">
          <div class="customer-detail">
            <div>
              <span>Customer Name</span>
              <p class="customer-name">${customer.customerName}</p>
            </div>
            <div class="most-buying-lists">
              <label>Most Buying</label>
              <span>
                ${customer.mostBuying.slice(0, 3).join(", ")}${
          customer.mostBuying.length > 3 ? ", ..." : ""
        }
              </span>
              <button class="view-detail-btn">View All</button>
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

    pageDisplay.textContent = `Showing ${startIndex + 1}-${Math.min(
      endIndex,
      allCustomers.length
    )} of ${allCustomers.length}`;

    renderPagination(
      Math.ceil(allCustomers.length / customersPerPage),
      currentPage
    );
  }

  function renderPagination(totalPages, currentPage) {
    let pagesHTML = "";

    pagesHTML += `<span class="arrow ${
      currentPage === 1 ? "disabled" : ""
    }" data-page="${
      currentPage - 1
    }"> <i class="fa-solid fa-angles-left prev"></i></span>`;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pagesHTML += getPageHTML(i, currentPage);
      }
    } else {
      pagesHTML += getPageHTML(1, currentPage);
      pagesHTML += getPageHTML(2, currentPage);

      if (currentPage > 4) {
        pagesHTML += `<span class="dots">...</span>`;
      }

      if (currentPage > 2 && currentPage < totalPages - 1) {
        pagesHTML += getPageHTML(currentPage, currentPage);
      }

      if (currentPage < totalPages - 3) {
        pagesHTML += `<span class="dots">...</span>`;
      }

      pagesHTML += getPageHTML(totalPages - 1, currentPage);
      pagesHTML += getPageHTML(totalPages, currentPage);
    }

    pagesHTML += `<span class="arrow ${
      currentPage === totalPages ? "disabled" : ""
    }" data-page="${
      currentPage + 1
    }"> <i class="fa-solid fa-angles-right next"></i></span>`;

    pageContainer.innerHTML = pagesHTML;
  }

  function getPageHTML(page, currentPage) {
    return `<span class="${
      page === currentPage ? "active-page" : ""
    }" data-page="${page}">${page}</span>`;
  }

  pageContainer.addEventListener("click", (e) => {
    if (e.target.dataset.page) {
      currentPage = parseInt(e.target.dataset.page);
      renderCustomers();
      document
        .getElementById("customers")
        .scrollIntoView({ behavior: "smooth" });
    }
  });

  renderCustomers();

  //Leads Graph

  const leadsGraph = document.getElementById("monthlyChart").getContext("2d");

  new Chart(leadsGraph, {
    type: "bar",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "April",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Monthly Sales",
          data: [90, 40, 80, 60, 70, 25, 65, 50, 75, 55, 85, 45],
          backgroundColor: "#344BFD",
          borderRadius: {
            topLeft: 10,
            topRight: 10,
          },
          barThickness: 15,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            color: "#333",
            font: {
              size: 13,
              weight: "500",
            },
          },
        },
        y: {
          display: false,
          grid: { display: false },
        },
      },
    },
  });

  const leadBtns = document.querySelectorAll(".lead-label");
  leadBtns.forEach((li) => {
    li.addEventListener("click", () => {
      leadBtns.forEach((item) => item.classList.remove("active"));
      li.classList.add("active");
    });
  });

  // Trade Wise Distribution

  const tradeWiseDistribution = document
    .getElementById("tradeWiseDistributionChart")
    .getContext("2d");

  new Chart(tradeWiseDistribution, {
    type: "bar",
    data: {
      labels: [
        "Unset",
        "Domestic",
        "Export",
        "Domestic-PCD",
        "Export Merchant",
      ],
      datasets: [
        {
          label: "Sales",
          data: [60, 90, 70, 110, 50],
          backgroundColor: "#344BFD",
          borderRadius: {
            topLeft: 10,
            topRight: 10,
          },
          barThickness: 15,
        },
      ],
    },
    options: (options = {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            maxRotation: 45,
            minRotation: 45,
          },
          border: { display: false },
        },
        y: {
          grid: { display: false },
          border: { display: false },
          ticks: { display: false },
        },
      },
    }),
  });

  // Order Operational Status

  const orderLists = [
    {
      openOrders: "70",
      departmentName: "Contract Mfg.",
      lessThan25Days: "20",
      greaterThan25: "40",
      greaterThan45: "10",
    },
    {
      openOrders: "55",
      departmentName: "Direct Govt. Inst.",
      lessThan25Days: "20",
      greaterThan25: "25",
      greaterThan45: "10",
    },
    {
      openOrders: "60",
      departmentName: "Indirect Govt. Inst.",
      lessThan25Days: "20",
      greaterThan25: "30",
      greaterThan45: "10",
    },
    {
      openOrders: "10",
      departmentName: "PCD Sales",
      lessThan25Days: "3",
      greaterThan25: "5",
      greaterThan45: "2",
    },
    {
      openOrders: "90",
      departmentName: "Ethical Sales",
      lessThan25Days: "30",
      greaterThan25: "40",
      greaterThan45: "20",
    },
    {
      openOrders: "100",
      departmentName: "Direct Export",
      lessThan25Days: "40",
      greaterThan25: "40",
      greaterThan45: "20",
    },
    {
      openOrders: "88",
      departmentName: "Deemed Export",
      lessThan25Days: "30",
      greaterThan25: "40",
      greaterThan45: "18",
    },
  ];

  const allOrdersList = document.getElementById("all-orders");

  allOrdersList.innerHTML = orderLists
    .map(
      (order, id) => `<div ${
        orderLists.length === id + 1 && "style=border:none"
      }  class="single-order">
          <div class="open-orders">
            <p>Open Orders</p>
            <h1>${order.openOrders}</h1>
          </div>
          <div class="order">
            <span>Department name</span>
            <p class="department-name">${order.departmentName}</p>
            <div class="days-count">
              <div class="lessThan25Days">
                <span class="days">0-25 days</span>
                <div class="border-line">
                  <div style="width:${
                    (order.lessThan25Days / order.openOrders) * 100
                  }%"></div>
                </div>
                <span class="count">${order.lessThan25Days}</span>
              </div>
              <div class="greaterThan25">
                <span class="days">>25 days</span>
                <div class="border-line">
                  <div style="width:${
                    (order.greaterThan25 / order.openOrders) * 100
                  }%"></div>
                </div>
                <span class="count">${order.greaterThan25}</span>
              </div>
              <div class="greaterThan45">
                <span class="days">>45 days</span>
                <div class="border-line">
                  <div style="width:${
                    (order.greaterThan45 / order.openOrders) * 100
                  }%"></div>
                </div>
                <span class="count">${order.greaterThan45}</span>
              </div>
            </div>
          </div>
        </div>`
    )
    .join("");
});
