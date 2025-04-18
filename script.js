document.addEventListener("DOMContentLoaded", function () {
  // Constants

  function formatCurrency(amount) {
    return "₹" + amount.toLocaleString("en-IN");
  }

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

  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((item) => item.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // Collection report Cards

  const reportAmounts = {
    Yesterday: {
      contract: "100000",
      directGovt: "150000",
      indirectGovt: "200000",
      pcd: "250000",
      ethical: "300000",
      directExport: "350000",
      deemedExport: "400000",
    },
    Weekly: {
      contract: "500000",
      directGovt: "550000",
      indirectGovt: "600000",
      pcd: "650000",
      ethical: "700000",
      directExport: "750000",
      deemedExport: "800000",
    },
    Monthly: {
      contract: "1000000",
      directGovt: "1100000",
      indirectGovt: "200000",
      pcd: "1300000",
      ethical: "1400000",
      directExport: "1500000",
      deemedExport: "1600000",
    },
  };

  function renderCards(filter) {
    const allCards = document.getElementById("all-cards");
    allCards.innerHTML = reportBase
      .map((report) => {
        const amount = reportAmounts[filter][report.key];
        return `
          <div class="report-card" style="background-color: ${
            report.style.background
          }">
            <p style="border-bottom: 2px solid ${report.style.color}">${
          report.reportName
        }</p>
           <h2>${formatCurrency(Number(amount))}</h2>
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

  //Monthly Sales Graph

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

  // const barGradients = [
  //   "linear-gradient(179.23deg, #587CEC -16.04%, #82C7F2 99.33%)",
  //   "linear-gradient(178.98deg, #FF4D50 -14.94%, #FFBCBD 127.73%)",
  //   "linear-gradient(179.33deg, #A8B346 -19.27%, #DEEF81 99.42%)",
  //   "linear-gradient(178.66deg, #F8C333 -36.3%, #DD932E 98.86%)",
  //   "linear-gradient(180deg, #FF9500 0%, #FFBD62 100%)",
  //   "linear-gradient(178.76deg, #21C292 -17.83%, #9CFEE3 122.86%)",
  //   "linear-gradient(179.52deg, #64728A -9.73%, #AFAFAF 111.38%)",
  // ];

  function createCards() {
    slider.innerHTML = "";
    Object.entries(monthlyData).forEach(([month, values], index) => {
      const card = document.createElement("div");
      card.className = "month-card";

      const canvasId = `chart-${index}`;
      card.innerHTML = `
        <canvas id="${canvasId}" height="180"></canvas>
        <div class="month-name">${month}</div>
      `;
      slider.appendChild(card);

      const ctx = document.getElementById(canvasId).getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Contract Mfg.",
            "Direct Govt. Inst.",
            "Indirect Govt. Inst.",
            "PCD Sales",
            "Ethical Sales",
            "Direct Export",
            "Deemed Export",
          ],
          datasets: [
            {
              data: values,
              backgroundColor: [
                "#1E508D",
                "#FF3A6F",
                "#A7B817",
                "#FF9504",
                "#F6D913",
                "#0BB1B7",
                "#556179",
              ],
              borderRadius: 10,
              barPercentage: 0.6,
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
              display: false,
            },
            y: {
              display: false,
            },
          },
        },
      });
    });
  }

  const slider = document.getElementById("monthly-slider");
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
      achieveAmt: "5200000",
      targetAmt: "20000000",
    },
    {
      name: "Direct Govt. Inst.",
      achieveAmt: "9000000",
      targetAmt: "15000000",
    },
    {
      name: "Indirect Govt. Inst.",
      achieveAmt: "7000000",
      targetAmt: "10000000",
    },
    {
      name: "PCD Sales",
      achieveAmt: "15000000",
      targetAmt: "25000000",
    },
    {
      name: "Ethical Sales",
      achieveAmt: "20000000",
      targetAmt: "30000000",
    },
    {
      name: "Direct Export",
      achieveAmt: "8000000",
      targetAmt: "15000000",
    },
    {
      name: "Deemed Export",
      achieveAmt: "6000000",
      targetAmt: "10000000",
    },
  ];

  function hexToRGBA(hex, alpha = 1) {
    let r = 0,
      g = 0,
      b = 0;

    // for 3-digit hex
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    }
    // for 6-digit hex
    else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const cardsContainer = document.getElementById("cards-container");

  function getTotalAmount(type) {
    return saleVsTarget.reduce((acc, curr) => {
      const amount = parseInt(curr[type]);
      return acc + amount;
    }, 0);
  }

  const overallTarget = document.querySelector("#over-all-target h3");
  const overallAchieve = document.querySelector("#over-all-sale h3");
  overallTarget.textContent = formatCurrency(getTotalAmount("targetAmt"));
  overallAchieve.textContent = formatCurrency(getTotalAmount("achieveAmt"));

  cardsContainer.innerHTML = reportBase
    .map((item) => {
      const matched = saleVsTarget.find(
        (elem) => elem.name === item.reportName
      );

      const achieve = parseInt(matched.achieveAmt);
      const target = parseInt(matched.targetAmt);
      const percentage = Math.round((achieve / target) * 100);

      return `
      <div style="background:${
        item.style.background
      }" class="sales-vs-target-card">
        <h4>${item?.reportName}</h4>
        <div class="labels">
          <span>Achieve</span>
          <span>Target</span>
        </div>
        <div style="background: ${hexToRGBA(
          item.style.color,
          0.3
        )}" class="border-line">
          <div style="background: ${
            item.style.color
          }; width: ${percentage}%"></div>
        </div>
        <div class="amts">
          <span>${formatCurrency(Number(matched.achieveAmt))}</span>
          <span>${formatCurrency(Number(matched.targetAmt))}</span>
        </div>
      </div>`;
    })
    .join("");

  // products

  fetch("products_with_details.json")
    .then((response) => response.json())
    .then((products) => {
      const allProductsList = document.getElementById("all-products");
      const viewMoreBtn = document.querySelector(".view-more-products-btn");
      let showAll = false;
      let filteredProducts = products;

      const maxUnitSold = Math.max(...products.map((p) => p.unitSold));
      const maxRevenue = Math.max(...products.map((p) => p.revenue));

      function renderProducts() {
        const visibleProducts = showAll
          ? filteredProducts
          : filteredProducts.slice(0, 5);

        allProductsList.innerHTML = visibleProducts
          .map(
            (product, id) => `<div ${
              visibleProducts.length === id + 1 ? 'style="border:none"' : ""
            } class="single-product">
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
                <button class="view-detail-btn" data-index="${id}">View Detail</button>
              </div>
              <div class="unit-revenue">
                <div class="unit">
                  <p>Unit Sold - ${Number(product.unitSold).toLocaleString(
                    "en-IN"
                  )}</p>
                  <div class="border-line">
                    <div style="width:${
                      (product.unitSold / maxUnitSold) * 100
                    }%"></div>
                  </div>
                </div>
                <div class="revenue">
                  <p>Revenue - ${formatCurrency(product.revenue)}</p>
                  <div class="border-line">
                    <div style="width:${
                      (product.revenue / maxRevenue) * 100
                    }%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>`
          )
          .join("");

        if (filteredProducts.length <= 5) {
          viewMoreBtn.style.display = "none";
        } else {
          viewMoreBtn.style.display = "inline-block";
        }

        viewMoreBtn.querySelector("p").textContent = showAll
          ? "Show Less"
          : "View More";
        viewMoreBtn
          .querySelector("i")
          .classList.toggle("fa-chevron-up", showAll);
        viewMoreBtn
          .querySelector("i")
          .classList.toggle("fa-chevron-down", !showAll);
      }

      viewMoreBtn.addEventListener("click", () => {
        showAll = !showAll;
        if (!showAll) {
          document
            .getElementById("products")
            .scrollIntoView({ behavior: "smooth" });
        }
        renderProducts();
      });

      document.addEventListener("click", function (e) {
        if (e.target.classList.contains("view-detail-btn")) {
          const index = e.target.dataset.index;
          const product = filteredProducts[index];
          const modal = document.querySelector(".modal");
          const modalOverlay = document.querySelector(".modal-overlay");
          const modalTitle = document.querySelector(".modal-title");
          const modalTableBody = document.querySelector(".modal-table tbody");
          const modalTableHead = document.querySelector(
            ".modal-table thead tr"
          );
          modal.classList.add("products-details-modal");
          modalTitle.innerHTML = `
              <label>Product Name</label>
              <h3>${product.productName}</h3>
            `;

          modalTableHead.innerHTML = [
            "Order Number",
            "Date",
            "Quantity Purchased",
            "Sales Agent",
            "Customer",
            "Order Value",
          ]
            .map((h) => `<th>${h}</th>`)
            .join("");
          modalTableBody.innerHTML = product.details
            .map(
              (d) => `
                <tr>
                  <td>${d.orderNumber}</td>
                  <td>${d.date}</td>
                  <td>${Number(d.qty).toLocaleString("en-IN")}</td>
                  <td>
                    <img src="${d.salesAgentImg}" alt="${
                d.salesAgentName
              }" class="avatar">
                    ${d.salesAgentName}
                  </td>
                  <td>${d.customerName}</td>
                  <td>${formatCurrency(d.orderValue)}</td>
                </tr>`
            )
            .join("");

          modalOverlay.classList.remove("hidden");
          document.body.classList.add("modal-open");
        }

        if (
          e.target.classList.contains("modal-close") ||
          e.target.classList.contains("modal-overlay")
        ) {
          document.querySelector(".modal-overlay").classList.add("hidden");
          document.body.classList.remove("modal-open");
        }
      });

      renderProducts();
    })
    .catch((error) => {
      console.error("Error loading Products JSON:", error);
    });

  // customers

  fetch("customers_with_details.json")
    .then((response) => response.json())
    .then((allCustomers) => {
      const allCustomersList = document.getElementById("all-customers");
      const paginationWrapper = document.querySelector(".pagination");
      const pageDisplay = paginationWrapper.querySelector("p");
      const pageContainer = paginationWrapper.querySelector(".pages");

      const customersPerPage = 10;
      let currentPage = 1;

      const maxRevenue = Math.max(...allCustomers.map((p) => p.revenue));

      function renderCustomers() {
        const startIndex = (currentPage - 1) * customersPerPage;
        const endIndex = startIndex + customersPerPage;
        const visibleCustomers = allCustomers.slice(startIndex, endIndex);

        allCustomersList.innerHTML = visibleCustomers
          .map(
            (customer, idx) => `
          <div ${
            visibleCustomers.length === idx + 1 && "style=border:none"
          } class="single-customer">
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
                <button data-index="${
                  customer.id
                }" class="view-customer-detail-btn">View</button>
              </div>
              <div class="revenue-sales">
                <div class="revenue">
                  <p>Revenue- ${formatCurrency(customer.revenue)}</p>
                  <div class="border-line">
                    <div style="width:${
                      (customer.revenue / maxRevenue) * 100
                    }%"></div>
                  </div>
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

      document.addEventListener("click", function (e) {
        if (e.target.classList.contains("view-customer-detail-btn")) {
          const index = e.target.dataset.index;
          const customer = allCustomers[index - 1];
          const modal = document.querySelector(".modal");
          const modalOverlay = document.querySelector(".modal-overlay");
          const modalTitle = document.querySelector(".modal-title");
          const modalTableBody = document.querySelector(".modal-table tbody");
          const modalTableHead = document.querySelector(
            ".modal-table thead tr"
          );

          modal.classList.add("products-details-modal");
          modalTitle.innerHTML = `
              <label>Customer Name</label>
              <h3>${customer.customerName}</h3>
            `;

          modalTableHead.innerHTML = [
            "Order Number",
            "Date",
            "Product Name",
            "Product Quantity",
            "Order Value",
          ]
            .map((h) => `<th>${h}</th>`)
            .join("");

          modalTableBody.innerHTML = customer.details
            .map(
              (d) => `
                <tr>
                  <td>${d.orderNumber}</td>
                  <td>${d.date}</td>
                  <td>${d.productName}</td>
                  <td>${d.productQty}</td>
                  <td>${formatCurrency(d.orderValue)}</td>
                </tr>`
            )
            .join("");

          modalOverlay.classList.remove("hidden");
          document.body.classList.add("modal-open");
        }

        if (
          e.target.classList.contains("modal-close") ||
          e.target.classList.contains("modal-overlay")
        ) {
          document.querySelector(".modal-overlay").classList.add("hidden");
          document.body.classList.remove("modal-open");
        }
      });

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
        const pageEl = e.target.closest("[data-page]");
        if (!pageEl) return;

        const targetPage = parseInt(pageEl.dataset.page);
        const totalPages = Math.ceil(allCustomers.length / customersPerPage);

        if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= totalPages) {
          currentPage = targetPage;
          renderCustomers();
          document
            .getElementById("customers")
            .scrollIntoView({ behavior: "smooth" });
        }
      });

      renderCustomers();
    })
    .catch((error) => {
      console.error("Error loading Products JSON:", error);
    });

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
    options: {
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
    },
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

  // Existing vs First Time Customers

  const allExistingVsFirstTimeCustomers = [
    {
      totalOrders: "70",
      departmentName: "Contract Manufacturing",
      existingCustomers: "20",
      newCustomers: "40",
      newCustomersAdded: "10",
    },
    {
      totalOrders: "70",
      departmentName: "PCD Sales",
      existingCustomers: "20",
      newCustomers: "40",
      newCustomersAdded: "10",
    },
    {
      totalOrders: "70",
      departmentName: "Direct Export",
      existingCustomers: "20",
      newCustomers: "40",
      newCustomersAdded: "10",
    },
    {
      totalOrders: "70",
      departmentName: "Deemed Export",
      existingCustomers: "20",
      newCustomers: "40",
      newCustomersAdded: "10",
    },
  ];

  const allExistingVsNewCustomersList = document.getElementById(
    "all-existing-vs-first-time-customers"
  );

  allExistingVsNewCustomersList.innerHTML = allExistingVsFirstTimeCustomers
    .map(
      (department, id) => `<div ${
        allExistingVsFirstTimeCustomers.length === id + 1 && "style=border:none"
      }  class="single-department">
          <div class="total-orders">
            <p>Total Orders</p>
            <h1>${department.totalOrders}</h1>
          </div>
          <div class="order">
            <p class="department-name">${department.departmentName}</p>
            <span>Department name</span>
            <div class="customers-count">
              <div class="existingCustomers">
                <span class="days">Existing Cust.</span>
                <div class="border-line">
                  <div style="width:${
                    (department.existingCustomers / department.totalOrders) *
                    100
                  }%"></div>
                </div>
                <span class="count">${department.existingCustomers}</span>
              </div>
              <div class="newCustomers">
                <span class="days">New Cust.</span>
                <div class="border-line">
                  <div style="width:${
                    (department.newCustomers / department.totalOrders) * 100
                  }%"></div>
                </div>
                <span class="count">${department.newCustomers}</span>
              </div>
              <div class="newCustomersAdded">
                <span class="days">New Cust. Added</span>
                <div class="border-line">
                  <div style="width:${
                    (department.newCustomersAdded / department.totalOrders) *
                    100
                  }%"></div>
                </div>
                <span class="count">${department.newCustomersAdded}</span>
              </div>
            </div>
          </div>
        </div>`
    )
    .join("");

  //Payment Projection

  const paymentProjectionDetails = [
    {
      month: "Jan",
      projected: "2.1",
      projectedCount: "30",
      acheived: "1.1",
      acheivedCount: "40",
    },
    {
      month: "Feb",
      projected: "2.1",
      projectedCount: "30",
      acheived: "1.1",
      acheivedCount: "40",
    },
    {
      month: "Mar",
      projected: "2.1",
      projectedCount: "30",
      acheived: "1.1",
      acheivedCount: "40",
    },
    {
      month: "Apr",
      projected: "2.1",
      projectedCount: "30",
      acheived: "1.1",
      acheivedCount: "40",
    },
  ];

  const listOfMonths = document.getElementById("list-of-months");

  listOfMonths.innerHTML = paymentProjectionDetails
    .map(
      (item) => `<div class="month">
          <div class="current-month">
            <p>Month</p>
            <h1>${item.month}</h1>
          </div>
          <div class="projection-detail">
              <div class="projected">
                <span class="type">Projected</span>
                <div class="border-line">
                  <div style="width:${item.projectedCount}%"></div>
                </div>
                <span class="count">${item.projected} L</span>
              </div>
              <div class="achieved">
                <span class="type">Achived</span>
                <div class="border-line">
                  <div style="width:${item.acheivedCount}%"></div>
                </div>
                <span class="count">${item.acheived} L</span>
              </div>
          </div>
      </div>`
    )
    .join("");

  //Query Remark

  const queryRemarks = [
    {
      number: "45904",
      date: "Dec 29, 2012",
      status: "Work in progress",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Dianne Russell",
      customer: "Jacob Jones",
      orderValue: "14.81",
    },
    {
      number: "93457",
      date: "Aug 7, 2017",
      status: "Pending",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Cameron Williamson",
      customer: "Robert Fox",
      orderValue: "8.99",
    },
    {
      number: "28200",
      date: "Nov 28, 2015",
      status: "Pending",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Jenny Wilson",
      customer: "Esther Howard",
      orderValue: "17.84",
    },
    {
      number: "13671",
      date: "Nov 7, 2017",
      status: "Pending",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Courtney Henry",
      customer: "Devon Lane",
      orderValue: "11.70",
    },
    {
      number: "50364",
      date: "May 12, 2019",
      status: "Work in progress",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Arlene McCoy",
      customer: "Arlene McCoy",
      orderValue: "6.48",
    },
    {
      number: "10708",
      date: "Oct 24, 2018",
      status: "Work in progress",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Darrell Steward",
      customer: "Jane Cooper",
      orderValue: "8.99",
    },
    {
      number: "74875",
      date: "May 31, 2015",
      status: "Work in progress",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Savannah Nguyen",
      customer: "Courtney Henry",
      orderValue: "5.22",
    },
    {
      number: "23340",
      date: "Jul 14, 2015",
      status: "Pending",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Theresa Webb",
      customer: "Darrell Steward",
      orderValue: "11.70",
    },
    {
      number: "45904",
      date: "Dec 29, 2012",
      status: "Work in progress",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Dianne Russell",
      customer: "Jacob Jones",
      orderValue: "14.81",
    },
    {
      number: "93457",
      date: "Aug 7, 2017",
      status: "Pending",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Cameron Williamson",
      customer: "Robert Fox",
      orderValue: "8.99",
    },
    {
      number: "28200",
      date: "Nov 28, 2015",
      status: "Pending",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Jenny Wilson",
      customer: "Esther Howard",
      orderValue: "17.84",
    },
    {
      number: "13671",
      date: "Nov 7, 2017",
      status: "Pending",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Courtney Henry",
      customer: "Devon Lane",
      orderValue: "11.70",
    },
    {
      number: "50364",
      date: "May 12, 2019",
      status: "Work in progress",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Arlene McCoy",
      customer: "Arlene McCoy",
      orderValue: "6.48",
    },
    {
      number: "10708",
      date: "Oct 24, 2018",
      status: "Work in progress",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Darrell Steward",
      customer: "Jane Cooper",
      orderValue: "8.99",
    },
    {
      number: "74875",
      date: "May 31, 2015",
      status: "Work in progress",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Savannah Nguyen",
      customer: "Courtney Henry",
      orderValue: "5.22",
    },
    {
      number: "23340",
      date: "Jul 14, 2015",
      status: "Pending",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Theresa Webb",
      customer: "Darrell Steward",
      orderValue: "11.70",
    },
    {
      number: "45904",
      date: "Dec 29, 2012",
      status: "Work in progress",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Dianne Russell",
      customer: "Jacob Jones",
      orderValue: "14.81",
    },
    {
      number: "93457",
      date: "Aug 7, 2017",
      status: "Pending",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Cameron Williamson",
      customer: "Robert Fox",
      orderValue: "8.99",
    },
    {
      number: "28200",
      date: "Nov 28, 2015",
      status: "Pending",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Jenny Wilson",
      customer: "Esther Howard",
      orderValue: "17.84",
    },
    {
      number: "13671",
      date: "Nov 7, 2017",
      status: "Pending",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Courtney Henry",
      customer: "Devon Lane",
      orderValue: "11.70",
    },
    {
      number: "50364",
      date: "May 12, 2019",
      status: "Work in progress",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Arlene McCoy",
      customer: "Arlene McCoy",
      orderValue: "6.48",
    },
    {
      number: "10708",
      date: "Oct 24, 2018",
      status: "Work in progress",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Darrell Steward",
      customer: "Jane Cooper",
      orderValue: "8.99",
    },
    {
      number: "74875",
      date: "May 31, 2015",
      status: "Work in progress",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Savannah Nguyen",
      customer: "Courtney Henry",
      orderValue: "5.22",
    },
    {
      number: "23340",
      date: "Jul 14, 2015",
      status: "Pending",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Theresa Webb",
      customer: "Darrell Steward",
      orderValue: "11.70",
    },
  ];

  const allQueries = document.getElementById("all-queries");
  const queryPaginationWrapper = document.querySelector(".query-pagination");
  const queryPageDisplay = queryPaginationWrapper.querySelector("p");
  const queryPageContainer =
    queryPaginationWrapper.querySelector(".query-pages");

  const queriesPerPage = 10;
  let currentQueryPage = 1;

  function renderQueries() {
    const startIndex = (currentQueryPage - 1) * queriesPerPage;
    const endIndex = startIndex + queriesPerPage;
    const visibleQueries = queryRemarks.slice(startIndex, endIndex);

    allQueries.innerHTML = visibleQueries
      .map(
        (query, id) => `
      <tr>
        <td>${query.number}</td>
        <td>${query.date}</td>
        <td>${query.status}</td>
        <td>
          <img src="${query.salesAgentImg}" alt="${query.salesAgentName}" class="avatar">
          ${query.salesAgentName}
        </td>
        <td>${query.customer}</td>
        <td>$${query.orderValue}</td>
      </tr> `
      )
      .join("");

    queryPageDisplay.textContent = `Showing ${startIndex + 1}-${Math.min(
      endIndex,
      queryRemarks.length
    )} of ${queryRemarks.length}`;

    renderQueryPagination(
      Math.ceil(queryRemarks.length / queriesPerPage),
      currentQueryPage
    );
  }

  function renderQueryPagination(totalPages, currentQueryPage) {
    let pagesHTML = "";

    pagesHTML += `<span class="arrow ${
      currentQueryPage === 1 ? "disabled" : ""
    }" data-page="${
      currentQueryPage - 1
    }"> <i class="fa-solid fa-angles-left prev"></i></span>`;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pagesHTML += getQueryPageHTML(i, currentQueryPage);
      }
    } else {
      pagesHTML += getQueryPageHTML(1, currentQueryPage);
      pagesHTML += getQueryPageHTML(2, currentQueryPage);

      if (currentQueryPage > 4) {
        pagesHTML += `<span class="dots">...</span>`;
      }

      if (currentQueryPage > 2 && currentQueryPage < totalPages - 1) {
        pagesHTML += getQueryPageHTML(currentQueryPage, currentQueryPage);
      }

      if (currentQueryPage < totalPages - 3) {
        pagesHTML += `<span class="dots">...</span>`;
      }

      pagesHTML += getQueryPageHTML(totalPages - 1, currentQueryPage);
      pagesHTML += getQueryPageHTML(totalPages, currentQueryPage);
    }

    pagesHTML += `<span class="arrow ${
      currentQueryPage === totalPages ? "disabled" : ""
    }" data-page="${
      currentQueryPage + 1
    }"> <i class="fa-solid fa-angles-right next"></i></span>`;

    queryPageContainer.innerHTML = pagesHTML;
  }

  function getQueryPageHTML(page, currentQueryPage) {
    return `<span class="${
      page === currentQueryPage ? "active-page" : ""
    }" data-page="${page}">${page}</span>`;
  }

  queryPageContainer.addEventListener("click", (e) => {
    const pageEl = e.target.closest("[data-page]");
    if (!pageEl) return;

    const targetPage = parseInt(pageEl.dataset.page);
    const totalPages = Math.ceil(queryRemarks.length / queriesPerPage);

    if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= totalPages) {
      currentQueryPage = targetPage;
      renderQueries();
      document
        .getElementById("query-remark")
        .scrollIntoView({ behavior: "smooth" });
    }
  });

  renderQueries();

  // Added new customers

  const newCustomers = [
    {
      name: "Wade Warren",
      contactNumber: "Dec 29, 2012",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Dianne Russell",
    },
    {
      name: "Arlene McCoy",
      contactNumber: "Aug 7, 2017",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Cameron Williamson",
    },
    {
      name: "Bessie Cooper",
      contactNumber: "Nov 28, 2015",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Jenny Wilson",
    },
    {
      name: "Ronald Richards",
      contactNumber: "Nov 7, 2017",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Courtney Henry",
    },
    {
      name: "Courtney Henry",
      contactNumber: "May 12, 2019",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Arlene McCoy",
    },
    {
      name: "Jenny Wilson",
      contactNumber: "Oct 24, 2018",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Darrell Steward",
    },
    {
      name: "Leslie Alexander",
      contactNumber: "May 31, 2015",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Savannah Nguyen",
    },
    {
      name: "Marvin McKinney",
      contactNumber: "Jul 14, 2015",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Theresa Webb",
    },
    {
      name: "Wade Warren",
      contactNumber: "Dec 29, 2012",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Dianne Russell",
    },
    {
      name: "Arlene McCoy",
      contactNumber: "Aug 7, 2017",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Cameron Williamson",
    },
    {
      name: "Bessie Cooper",
      contactNumber: "Nov 28, 2015",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Jenny Wilson",
    },
    {
      name: "Ronald Richards",
      contactNumber: "Nov 7, 2017",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Courtney Henry",
    },
    {
      name: "Courtney Henry",
      contactNumber: "May 12, 2019",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Arlene McCoy",
    },
    {
      name: "Jenny Wilson",
      contactNumber: "Oct 24, 2018",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Darrell Steward",
    },
    {
      name: "Leslie Alexander",
      contactNumber: "May 31, 2015",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Savannah Nguyen",
    },
    {
      name: "Marvin McKinney",
      contactNumber: "Jul 14, 2015",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Theresa Webb",
    },
    {
      name: "Wade Warren",
      contactNumber: "Dec 29, 2012",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Dianne Russell",
    },
    {
      name: "Arlene McCoy",
      contactNumber: "Aug 7, 2017",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Cameron Williamson",
    },
    {
      name: "Bessie Cooper",
      contactNumber: "Nov 28, 2015",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Jenny Wilson",
    },
    {
      name: "Ronald Richards",
      contactNumber: "Nov 7, 2017",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Courtney Henry",
    },
    {
      name: "Courtney Henry",
      contactNumber: "May 12, 2019",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Arlene McCoy",
    },
    {
      name: "Jenny Wilson",
      contactNumber: "Oct 24, 2018",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Darrell Steward",
    },
    {
      name: "Leslie Alexander",
      contactNumber: "May 31, 2015",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Savannah Nguyen",
    },
    {
      name: "Marvin McKinney",
      contactNumber: "Jul 14, 2015",
      salesAgentImg: "./assets/sales-agent.png",
      salesAgentName: "Theresa Webb",
    },
  ];

  const allNewCustomers = document.getElementById("all-new-added-customers");
  const newCustomersPaginationWrapper = document.querySelector(
    ".new-customers-pagination"
  );
  const newCustomersPageDisplay =
    newCustomersPaginationWrapper.querySelector("p");
  const newCustomersPageContainer = newCustomersPaginationWrapper.querySelector(
    ".new-customers-pages"
  );

  const newCustomersPerPage = 10;
  let currentNewCustomersPage = 1;

  function renderNewCustomers() {
    const startIndex = (currentNewCustomersPage - 1) * newCustomersPerPage;
    const endIndex = startIndex + newCustomersPerPage;
    const visibleNewCustomers = newCustomers.slice(startIndex, endIndex);

    allNewCustomers.innerHTML = visibleNewCustomers
      .map(
        (customer) => `
      <tr>
        <td>${customer.name}</td>
        <td>${customer.contactNumber}</td>
        <td>
          <img src="${customer.salesAgentImg}" alt="${customer.salesAgentName}" class="avatar">
          ${customer.salesAgentName}
        </td>
      </tr> `
      )
      .join("");

    newCustomersPageDisplay.textContent = `Showing ${startIndex + 1}-${Math.min(
      endIndex,
      newCustomers.length
    )} of ${newCustomers.length}`;

    renderNewCustomersPagination(
      Math.ceil(newCustomers.length / newCustomersPerPage),
      currentNewCustomersPage
    );
  }

  function renderNewCustomersPagination(totalPages, currentNewCustomersPage) {
    let pagesHTML = "";

    pagesHTML += `<span class="arrow ${
      currentNewCustomersPage === 1 ? "disabled" : ""
    }" data-page="${
      currentNewCustomersPage - 1
    }"> <i class="fa-solid fa-angles-left prev"></i></span>`;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pagesHTML += getNewCustomersPageHTML(i, currentNewCustomersPage);
      }
    } else {
      pagesHTML += getNewCustomersPageHTML(1, currentNewCustomersPage);
      pagesHTML += getNewCustomersPageHTML(2, currentNewCustomersPage);

      if (currentNewCustomersPage > 4) {
        pagesHTML += `<span class="dots">...</span>`;
      }

      if (
        currentNewCustomersPage > 2 &&
        currentNewCustomersPage < totalPages - 1
      ) {
        pagesHTML += getNewCustomersPageHTML(
          currentNewCustomersPage,
          currentNewCustomersPage
        );
      }

      if (currentNewCustomersPage < totalPages - 3) {
        pagesHTML += `<span class="dots">...</span>`;
      }

      pagesHTML += getNewCustomersPageHTML(
        totalPages - 1,
        currentNewCustomersPage
      );
      pagesHTML += getNewCustomersPageHTML(totalPages, currentNewCustomersPage);
    }

    pagesHTML += `<span class="arrow ${
      currentNewCustomersPage === totalPages ? "disabled" : ""
    }" data-page="${
      currentNewCustomersPage + 1
    }"> <i class="fa-solid fa-angles-right next"></i></span>`;

    newCustomersPageContainer.innerHTML = pagesHTML;
  }

  function getNewCustomersPageHTML(page, currentNewCustomersPage) {
    return `<span class="${
      page === currentNewCustomersPage ? "active-page" : ""
    }" data-page="${page}">${page}</span>`;
  }

  newCustomersPageContainer.addEventListener("click", (e) => {
    const pageEl = e.target.closest("[data-page]");
    if (!pageEl) return;

    const targetPage = parseInt(pageEl.dataset.page);
    const totalPages = Math.ceil(newCustomers.length / newCustomersPerPage);

    if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= totalPages) {
      currentNewCustomersPage = targetPage;
      renderNewCustomers();
      document
        .getElementById("new-customers")
        .scrollIntoView({ behavior: "smooth" });
    }
  });

  renderNewCustomers();

  //top three sales performer

  const topThreeSalesPerformer = [
    {
      img: "./assets/sales-agent.png",
      name: "Robert Fox",
      sales: "1200",
      orders: "40",
      newCustomersAdded: "10",
      salesPercentage: "85",
      ordersPercentage: "30",
      newCustomersAddedPercentage: "40",
    },
    {
      img: "./assets/sales-agent.png",
      name: "Annette Black",
      sales: "800",
      orders: "40",
      newCustomersAdded: "10",
      salesPercentage: "70",
      ordersPercentage: "30",
      newCustomersAddedPercentage: "40",
    },
    {
      img: "./assets/sales-agent.png",
      name: "Jerome Bell",
      sales: "600",
      orders: "40",
      newCustomersAdded: "10",
      salesPercentage: "50",
      ordersPercentage: "30",
      newCustomersAddedPercentage: "40",
    },
  ];

  const topThreePerformerList = document.getElementById("top-three-performer");
  topThreePerformerList.innerHTML = topThreeSalesPerformer
    .map(
      (performer, id) => `<div class="performer">
        <div class="performer-img-cover">
            ${
              id === 0
                ? ` <img src="./assets/icons/stars.png" alt="Stars icon" class="stars-icon"/>`
                : ""
            }
              <img src="${performer.img}" alt="${
        performer.name
      }" class="performer-img"/>
              <span class="position">${id + 1}</span>
        </div>
        <div>
          <p class="performer-name">${performer.name}</p>
          <p class="performer-sales-amt">$${performer.sales}</p>
        </div>
        <div class="sales-orders-customers">
          <div class="sales">
            <label>Sales</label>
            <div class="border-line">
              <div style="width:${performer.salesPercentage}%"></div>
            </div>
            <span>$${performer.sales}</span>
          </div>
          <div class="orders">
            <label>Orders</label>
            <div class="border-line">
              <div style="width:${performer.ordersPercentage}%"></div>
            </div>
            <span>${performer.orders}</span>
          </div>
          <div class="new-customers-added">
            <label>New Cust. Added</label>
            <div class="border-line">
              <div style="width:${
                performer.newCustomersAddedPercentage
              }%"></div>
            </div>
            <span>${performer.newCustomersAdded}</span>
          </div>    
        </div>
      </div>`
    )
    .join("");
});
