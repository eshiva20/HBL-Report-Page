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
});
