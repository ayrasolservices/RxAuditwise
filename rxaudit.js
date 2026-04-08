 // Demo section js start
 const demoData = {
      A: {
        claimValue: "$1.8M",
        growth: "▲ 30.5%",
        matched: 847,
        short: 23,
        excess: 15,
        lines: {
          A: [42, 48, 46, 58, 53, 65, 68, 63, 74, 79, 85, 92],
          B: [28, 32, 38, 35, 42, 48, 44, 52, 56, 60, 68, 75],
          C: [22, 19, 25, 30, 26, 31, 38, 34, 40, 46, 50, 56]
        },
        rows: [
          ["00169-6339-10", "IBUPROFEN 200MG", "820", "650", "2 pkg short", "short"],
          ["00378-0125-50", "METFORMIN 500MG", "280", "300", "1 pkg surp.", "surplus"],
          ["55390-1701-01", "OMEPRAZOLE 20MG", "180", "0", "6 pkg short", "short"],
          ["00093-7180-01", "LISINOPRIL 10MG", "420", "420", "Match", "match"]
        ]
      },
      B: {
        claimValue: "$1.5M",
        growth: "▲ 21.8%",
        matched: 692,
        short: 34,
        excess: 12,
        lines: {
          A: [38, 42, 40, 48, 52, 56, 61, 58, 64, 68, 71, 77],
          B: [30, 34, 37, 41, 45, 49, 52, 55, 59, 66, 72, 79],
          C: [18, 23, 21, 26, 30, 33, 35, 39, 44, 48, 53, 60]
        },
        rows: [
          ["00310-0751-39", "ATORVASTATIN 20MG", "500", "500", "Match", "match"],
          ["65862-0420-90", "GABAPENTIN 300MG", "620", "580", "1 pkg short", "short"],
          ["13668-0118-10", "PANTOPRAZOLE 40MG", "210", "225", "1 pkg surp.", "surplus"],
          ["00591-0461-01", "LOSARTAN 50MG", "300", "300", "Match", "match"]
        ]
      },
      C: {
        claimValue: "$2.1M",
        growth: "▲ 36.2%",
        matched: 915,
        short: 18,
        excess: 26,
        lines: {
          A: [44, 47, 45, 54, 57, 63, 66, 61, 69, 74, 80, 86],
          B: [26, 29, 31, 36, 40, 44, 48, 51, 57, 61, 66, 71],
          C: [24, 26, 28, 34, 38, 42, 46, 49, 54, 58, 63, 69]
        },
        rows: [
          ["59762-3720-01", "ALBUTEROL HFA", "190", "220", "2 pkg surp.", "surplus"],
          ["00074-6620-13", "SERTRALINE 50MG", "410", "410", "Match", "match"],
          ["65862-0186-99", "ESCITALOPRAM 10MG", "275", "240", "1 pkg short", "short"],
          ["55111-0683-01", "CETIRIZINE 10MG", "330", "330", "Match", "match"]
        ]
      },
      all: {
        claimValue: "$5.4M",
        growth: "▲ 29.4%",
        matched: 2454,
        short: 75,
        excess: 53,
        lines: {
          A: [42, 48, 46, 58, 53, 65, 68, 63, 74, 79, 85, 92],
          B: [28, 32, 38, 35, 42, 48, 44, 52, 56, 60, 68, 75],
          C: [22, 19, 25, 30, 26, 31, 38, 34, 40, 46, 50, 56]
        },
        rows: [
          ["00169-6339-10", "IBUPROFEN 200MG", "820", "650", "2 pkg short", "short"],
          ["00378-0125-50", "METFORMIN 500MG", "280", "300", "1 pkg surp.", "surplus"],
          ["55390-1701-01", "OMEPRAZOLE 20MG", "180", "0", "6 pkg short", "short"],
          ["00093-7180-01", "LISINOPRIL 10MG", "420", "420", "Match", "match"],
          ["00310-0751-39", "ATORVASTATIN 20MG", "500", "500", "Match", "match"],
          ["59762-3720-01", "ALBUTEROL HFA", "190", "220", "2 pkg surp.", "surplus"]
        ]
      }
    };

    const runDemoBtn = document.getElementById("runDemoBtn");
    const demoStatus = document.getElementById("demoStatus");
    const rxDashboard = document.getElementById("rxDashboard");
    const reportTableBody = document.getElementById("reportTableBody");
    const claimValue = document.getElementById("claimValue");
    const claimGrowth = document.getElementById("claimGrowth");
    const topMatched = document.getElementById("topMatched");
    const topShort = document.getElementById("topShort");
    const topExcess = document.getElementById("topExcess");
    const tabButtons = document.querySelectorAll(".rx-tab-btn");
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const step3 = document.getElementById("step3");

    function buildPath(data, width = 1000, height = 250) {
      const stepX = width / (data.length - 1);
      let d = "";
      data.forEach((val, index) => {
        const x = index * stepX;
        const y = height - (val / 100) * (height - 10);
        d += index === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
      });
      return d;
    }

    function buildAreaPath(data, width = 1000, height = 250) {
      const stepX = width / (data.length - 1);
      let d = "";
      data.forEach((val, index) => {
        const x = index * stepX;
        const y = height - (val / 100) * (height - 10);
        d += index === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
      });
      d += ` L ${width} ${height} L 0 ${height} Z`;
      return d;
    }

    function renderTable(rows) {
      reportTableBody.innerHTML = "";
      rows.forEach(row => {
        let statusClass = "";
        if (row[5] === "short") statusClass = "rx-status-short";
        if (row[5] === "surplus") statusClass = "rx-status-surplus";
        if (row[5] === "match") statusClass = "rx-status-match";

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${row[0]}</td>
          <td>${row[1]}</td>
          <td>${row[2]}</td>
          <td>${row[3]}</td>
          <td class="${statusClass}">${row[4]}</td>
        `;
        reportTableBody.appendChild(tr);
      });
    }

    function updateDashboard(key) {
      const data = demoData[key];
      claimValue.textContent = data.claimValue;
      claimGrowth.textContent = data.growth;
      topMatched.textContent = data.matched;
      topShort.textContent = data.short;
      topExcess.textContent = data.excess;

      document.getElementById("lineA").setAttribute("d", buildPath(data.lines.A));
      document.getElementById("lineB").setAttribute("d", buildPath(data.lines.B));
      document.getElementById("lineC").setAttribute("d", buildPath(data.lines.C));
      document.getElementById("areaA").setAttribute("d", buildAreaPath(data.lines.A));

      renderTable(data.rows);
    }

    function resetSteps() {
      [step1, step2, step3].forEach(step => {
        step.classList.remove("active", "done");
      });
    }

    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        tabButtons.forEach(item => item.classList.remove("active"));
        btn.classList.add("active");
        updateDashboard(btn.dataset.tab);
      });
    });

    runDemoBtn.addEventListener("click", () => {
      resetSteps();
      demoStatus.textContent = "Uploading files...";
      runDemoBtn.disabled = true;

      step1.classList.add("active");

      setTimeout(() => {
        step1.classList.remove("active");
        step1.classList.add("done");
        step2.classList.add("active");
        demoStatus.textContent = "Matching and analyzing billing data...";
      }, 1200);

      setTimeout(() => {
        step2.classList.remove("active");
        step2.classList.add("done");
        step3.classList.add("active");
        demoStatus.textContent = "Preparing reconciliation report...";
      }, 2400);

      setTimeout(() => {
        step3.classList.remove("active");
        step3.classList.add("done");

        rxDashboard.classList.add("show");
        updateDashboard("A");

        tabButtons.forEach(item => item.classList.remove("active"));
        document.querySelector('.rx-tab-btn[data-tab="A"]').classList.add("active");

        demoStatus.textContent = "Demo completed successfully. Dashboard loaded below.";
        runDemoBtn.disabled = false;
        runDemoBtn.textContent = "Run Again";

        rxDashboard.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 3600);
    });

    updateDashboard("A");


// Demo Section js end


    // Footer Js Start 

     
    const rxaMenuToggle = document.getElementById("rxaMenuToggle");
    const rxaNav = document.getElementById("rxaNav");

    rxaMenuToggle.addEventListener("click", function () {
      rxaNav.classList.toggle("active");
    });

    // Footer Js End

    // NDC Swap Demo Section JS Start
  document.addEventListener("DOMContentLoaded", function () {
  const detectBtn = document.getElementById("detectSwapBtn");
  const cardsWrap = document.getElementById("ndcCardsWrap");
  const result = document.getElementById("ndcResult");

  let detected = false;
  let scanning = false;

  detectBtn.addEventListener("click", function () {
    if (scanning) return;

    if (!detected) {
      scanning = true;
      detectBtn.disabled = true;
      detectBtn.textContent = "Scanning NDC...";

      result.classList.remove("show");
      cardsWrap.classList.remove("detected");
      cardsWrap.classList.add("scanning");

      setTimeout(function () {
        cardsWrap.classList.remove("scanning");
        cardsWrap.classList.add("detected");
        result.classList.add("show");

        detectBtn.disabled = false;
        detectBtn.textContent = "Reset Demo";

        detected = true;
        scanning = false;
      }, 2600);
    } else {
      cardsWrap.classList.remove("detected", "scanning");
      result.classList.remove("show");

      detectBtn.textContent = "Detect The Swap";
      detectBtn.disabled = false;

      detected = false;
      scanning = false;
    }
  });
});
// NDC Swap Demo Section JS End

//FAQ Section JS Start

document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".rxs-faq-item");

  faqItems.forEach((item) => {
    const button = item.querySelector(".rxs-faq-question");
    const toggle = item.querySelector(".rxs-faq-toggle");

    button.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      faqItems.forEach((faq) => {
        faq.classList.remove("active");
        faq.querySelector(".rxs-faq-toggle").textContent = "+";
      });

      if (!isActive) {
        item.classList.add("active");
        toggle.textContent = "−";
      }
    });
  });
});
// FAQ Section JS End