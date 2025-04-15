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
  const reports = [
    {
      reportName: "Contract Mfg.",
      amount: "₹ 3,00,000",
      style: {
        color: "#1E508D",
        background: "#E6F1FF",
      },
    },
    {
      reportName: "Direct Govt. Inst.",
      amount: "₹ 4,00,000",
      style: {
        color: "#FF3A6F",
        background: "#FFEBE3",
      },
    },
    {
      reportName: "Indirect Govt. Inst.",
      amount: "₹ 5,00,000",
      style: {
        color: "#A7B817",
        background: "#FAFFCF",
      },
    },
    {
      reportName: "PCD Sales",
      amount: "₹ 6,00,000",
      style: {
        color: "#FF9504",
        background: "#FFEDD3",
      },
    },
    {
      reportName: "Ethical Sales",
      amount: "₹ 7,00,000",
      style: {
        color: "#F6D913",
        background: "#FFFCE7",
      },
    },
    {
      reportName: "Direct Export",
      amount: "₹ 8,00,000",
      style: {
        color: "#0BB1B7",
        background: "#D9FEFF",
      },
    },
    {
      reportName: "Deemed Export",
      amount: "₹ 9,00,000",
      style: {
        color: "#556179",
        background: "#E9E9E9",
      },
    },
  ];

  const allCards = document.getElementById("all-cards");
  allCards.innerHTML = reports
    .map(
      (
        report
      ) => `<div style="background-color: ${report.style.background}" style class="report-card">
      <p style="border-bottom: 2px solid ${report.style.color}">${report.reportName}</p>
      <h2>${report.amount}</h2>
    </div>`
    )
    .join("");
});
