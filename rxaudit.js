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
          ["73059000160", "ACCRUFER - 30MG - CAP", "180", "60", "SHORT - (120.0)"],
          ["00024592410", "ADMELOG - 100U\ML - INJ", "60", "60",  "	OK - (0.0)"],
          ["00032301613", "CREON - 36-114-180 - CAP", "200", "300",  "OVER - (100.0)"],
          
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
          ["04351078810", "AEROCHAMBER", "1", "0", "SHORT - (1.0)"],
          ["00003089421", "ELIQUIS - 5MG - TAB", "780", "780", "	OK - (0.0)"],
          ["00002882427", "HUMULIN R - 500U\ML - INJ", "200", "300", "OVER - (100.0)"],
          
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
          ["08290326895", "BD ALCOHOL SWAB - EA", "100", "0", "SHORT - (100)"],
          ["00003089321", "ELIQUIS - 2.5MG - TAB", "180", "180", "OK - (0.0)"],
          ["00310621030", "FARXIGA - 10MG - TAB", "200", "300", "OVER - (100.0)"],
          
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
          ["73059000160", "ACCRUFER - 30MG - CAP", "180", "60", "SHORT - (120.0)"],
          ["00024592410", "ADMELOG - 100U\ML - INJ", "60", "60",  "	OK - (0.0)"],
          ["00032301613", "CREON - 36-114-180 - CAP", "200", "300",  "OVER - (100.0)"],
          ["04351078810", "AEROCHAMBER", "1", "0", "SHORT - (1.0)"],
          ["00003089421", "ELIQUIS - 5MG - TAB", "780", "780", "	OK - (0.0)"],
          ["00002882427", "HUMULIN R - 500U\ML - INJ", "200", "300", "OVER - (100.0)"],
           ["08290326895", "BD ALCOHOL SWAB - EA", "100", "0", "SHORT - (100)"],
          ["00003089321", "ELIQUIS - 2.5MG - TAB", "180", "180", "OK - (0.0)"],
          ["00310621030", "FARXIGA - 10MG - TAB", "200", "300", "OVER - (100.0)"]
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

const aboutCard = document.getElementById("aboutCard");

    function revealOnScroll() {
      const top = aboutCard.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (top < windowHeight - 100) {
        aboutCard.classList.add("show");
      }
    }

    window.addEventListener("scroll", revealOnScroll);
    window.addEventListener("load", revealOnScroll);


    //How it Works Section JS Start
    const howHeader = document.getElementById("howHeader");
    const revealCards = document.querySelectorAll(".reveal-card");

    function revealHowSection() {
      const triggerBottom = window.innerHeight - 80;

      if (howHeader.getBoundingClientRect().top < triggerBottom) {
        howHeader.classList.add("show");
      }

      revealCards.forEach((card, index) => {
        if (card.getBoundingClientRect().top < triggerBottom) {
          setTimeout(() => {
            card.classList.add("show");
          }, index * 120);
        }
      });
    }

    window.addEventListener("scroll", revealHowSection);
    window.addEventListener("load", revealHowSection);

    //How it Works Section JS End


    //One Smart Platform for Pharmacy Audits & Reconciliation Section JS Start

    document.querySelectorAll('.flip-card').forEach(card => {
      card.addEventListener('click', function () {
        if (window.innerWidth <= 768) {
          const inner = this.querySelector('.flip-card-inner');
          inner.style.transform =
            inner.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
        }
      });
    });
    //One Smart Platform for Pharmacy Audits & Reconciliation Section JS End


//Works With Your best Supplier and Files Section JS Start
 const dealerTags = document.querySelectorAll(".dealer-tag");

  dealerTags.forEach(tag => {
    tag.addEventListener("click", function () {
      dealerTags.forEach(item => item.classList.remove("active-dealer"));
      this.classList.add("active-dealer");
    });
  });
  //Works With Your best Supplier and Files Section JS End

  //Testimonial Section JS Start
   const track = document.getElementById("testimonialsTrack");
  const slides = document.querySelectorAll(".testimonial-slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("testimonialDots");
  const slider = document.getElementById("testimonialsSlider");

  let currentIndex = 0;
  let autoSlide;

  function createDots() {
    dotsContainer.innerHTML = "";
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("testimonial-dot");
      if (index === currentIndex) dot.classList.add("active");

      dot.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
        restartAutoSlide();
      });

      dotsContainer.appendChild(dot);
    });
  }

  function updateDots() {
    const dots = document.querySelectorAll(".testimonial-dot");
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[currentIndex]) {
      dots[currentIndex].classList.add("active");
    }
  }

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlide = setInterval(nextSlide, 3500);
  }

  function stopAutoSlide() {
    if (autoSlide) clearInterval(autoSlide);
  }

  function restartAutoSlide() {
    startAutoSlide();
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      restartAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      restartAutoSlide();
    });
  }

  if (slider) {
    slider.addEventListener("mouseenter", stopAutoSlide);
    slider.addEventListener("mouseleave", startAutoSlide);

    slider.addEventListener("touchstart", stopAutoSlide, { passive: true });
    slider.addEventListener("touchend", startAutoSlide, { passive: true });
  }

  createDots();
  updateSlider();
  startAutoSlide();
  //Testimonial Section JS End

  //FAQ Section JS Start
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (item.classList.contains("active")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      faqItems.forEach(faq => {
        faq.classList.remove("active");
        faq.querySelector(".faq-answer").style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
  //FAQ Section JS End
