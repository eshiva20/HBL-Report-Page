document.addEventListener("DOMContentLoaded", function () {
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
});
