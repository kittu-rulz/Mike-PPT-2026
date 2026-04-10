(() => {
  const media = (file) => `assets/media/${file}`;
  const slideImage = (file) => `assets/pptx-slides-20260402/${file}`;
  const aprilMedia = (file) => `assets/pptx-media-20260402/${file}`;

  window.deckData = {
    brandImage: media("aptara-logo.svg"),
    heroVideo: media("hero-video.mp4"),
    chapters: [
      {
        id: "opening",
        number: 1,
        tone: "dark",
        template: "hero",
        title: "ENT: FY’26 Performance & FY’27 Growth Strategy",
        accentPhrases: ["Strategy"],
        data: {
          kicker: "Global Enterprise",
          lines: ["ENT: FY’26 Performance", "& FY’27 Growth Strategy"],
          name: "Mike Stacy",
          role: "President - Global Enterprise",
          date: "April 2026",
          posterImage: slideImage("Slide1.PNG")
        }
      },
      {
        id: "financial-overview",
        number: 2,
        tone: "light",
        template: "financial",
        title: "ENT Financial Overview: (FY’22 – FY’27)",
        accentPhrases: ["(FY’22 – FY’27)"],
        data: {
          revenueWon: 14941656,
          avgDealSize: 65247,
          revenueSeries: {
            label: "Revenue",
            growthLabel: "Revenue Growth %",
            years: ["2021-22", "2022-23", "2023-24", "2024-25", "2025-26 (Forecast)", "2026-27 (Budget)"],
            values: [15917061.61, 14635064.67, 17429911.52, 18388579.53, 17350000, 18400000],
            growth: [-0.0063604911682727302, -0.08054231185450564, 0.19096921763038591, 0.05500131247941078, -0.056479595300203216, 0.06051873198847262]
          },
          ebitdaSeries: {
            label: "EBITDA",
            growthLabel: "EBITDA Growth %",
            years: ["2021-22", "2022-23", "2023-24", "2024-25", "2025-26 (Forecast)", "2026-27 (Budget)"],
            values: [1212594.2354759872, 482102.37276322953, 2005592.1961352453, 2314461.325541405, 1638637.8205633778, 2267066.4613220654],
            growth: [-0.43300187161409587, -0.60242069551486288, 3.1600960904629964, 0.1540039545433749, -0.29200034475405923, 0.38350673521170681]
          },
          mixSeries: {
            label: "Contribution of XDT to Total Revenue",
            years: ["FY'21", "FY'22", "FY'23", "FY'24", "FY'25", "FY'26", "FY'27"],
            series: [
              { name: "Fixed Bid", values: [0.6885644711336378, 0.5783106318197103, 0.5490538852207321, 0.2961497715587238, 0.283819561366958, 0.2812156233426225, 0.25] },
              { name: "XDT", values: [0.20803577634947923, 0.34777850845900443, 0.3700186490745136, 0.6575261640061434, 0.6826600129395967, 0.7121249281809793, 0.73] },
              { name: "T&M", values: [0.10339975251688291, 0.07391085972128525, 0.0809274657047543, 0.0463240644351328, 0.033520425693445315, 0.006659448476398374, 0.02] }
            ]
          },
          slideSnapshot: slideImage("Slide2.PNG")
        }
      },
      {
        id: "confirmed-revenue",
        number: 3,
        tone: "light",
        template: "revenueWins",
        title: "Confirmed Revenue Comparison",
        accentPhrases: [],
        data: {
          note: "Amounts in ’000",
          columns: ["FY’24", "FY’25", "FY’26", "FY’27"],
          budgetRows: [
            { label: "Confirmed", values: ["$2,249", "$6,765", "$7,537", "$5,575"] },
            { label: "Projected", values: ["$-", "$-", "$-", "$-"] },
            { label: "Sales Goal", values: ["$15,250", "$10,819", "$11,302", "$12,332"] },
            { label: "Open-Existing", values: ["$109", "$376", "$134", "$170"] },
            { label: "Open-New", values: ["$92", "$290", "$126", "$323"] },
            { label: "Total (Budget)", values: ["$17,700", "$18,250", "$19,100", "$18,400"], emphasis: true }
          ],
          deltaRows: [
            { label: "Confirmed", values: ["", "$4,516", "$772", "$(1,963)"] },
            { label: "Confirmed %", values: ["", "201%", "11%", "-26%"] },
            { label: "Sales Goals", values: ["", "$(3,966)", "$78", "$1,263"] },
            { label: "Sales Goals %", values: ["", "-26%", "1%", "11%"] }
          ],
          winsTitle: "Wins and New Clients Addition – Financial Year 2025 - 26",
          wins: [
            { client: "Digidrub", amount: "$376,868", logo: "assets/logos/Digidrub.svg" },
            { client: "McCarthy", amount: "$167,000", logo: "assets/logos/McCarthy.png" },
            { client: "CoBANK", amount: "$113,400", logo: "assets/logos/CoBank.png" },
            { client: "Walbridge", amount: "$66,000", logo: "assets/logos/Wallbridge.png" },
            { client: "KBS", amount: "$38,900", logo: "assets/logos/KBS.svg" },
            { client: "CE2NMD", amount: "$12,600", logo: "assets/logos/CE2NMD.svg" },
            { client: "ASAP Elearning Solutions Ltd.", amount: "$6,000", logo: "assets/logos/ASAP.png" },
            { client: "Qatar Airways", amount: "$0", logo: "assets/logos/Qatar.jpg" },
            { client: "Merck", amount: "$0", logo: "assets/logos/Merck.svg" }
          ],
          winsTotal: "$780,768",
          slideSnapshots: [slideImage("Slide3.PNG"), slideImage("Slide5.PNG")]
        }
      },
      {
        id: "client-trend",
        number: 4,
        tone: "dark",
        template: "trendMatrix",
        title: "ENT – Top Client Trend Analysis (FY’21–FY’26)",
        accentPhrases: ["(FY’21–FY’26)"],
        data: {
          note: "Amounts in ’000",
          years: ["FY’21", "FY’22", "FY’23", "FY’24", "FY’25", "FY’26"],
          rows: [
            { client: "Ernst & Young", values: [{ rank: 1, amount: 4080 }, { rank: 1, amount: 3112 }, { rank: 2, amount: 1301 }, { rank: 14, amount: 381 }, { rank: 14, amount: 335 }, { rank: 10, amount: 395 }] },
            { client: "PricewaterhouseCoopers", values: [{ rank: 2, amount: 2869 }, { rank: 2, amount: 1185 }, { rank: 1, amount: 2010 }, { rank: 16, amount: 316 }, { rank: 10, amount: 592 }, { rank: 30, amount: 60 }] },
            { client: "KPMG LLP", values: [{ rank: 3, amount: 1179 }, { rank: 6, amount: 929 }, { rank: 4, amount: 924 }, { rank: 9, amount: 525 }, { rank: 12, amount: 566 }, { rank: 12, amount: 373 }] },
            { client: "Freddie Mac", values: [{ rank: 4, amount: 890 }, { rank: 7, amount: 830 }, { rank: 11, amount: 434 }, { rank: 15, amount: 370 }, { rank: 44, amount: 33 }, { rank: 0, amount: 0 }] },
            { client: "Walmart", values: [{ rank: 5, amount: 725 }, { rank: 14, amount: 274 }, { rank: 14, amount: 241 }, { rank: 4, amount: 1038 }, { rank: 3, amount: 936 }, { rank: 6, amount: 666 }] },
            { client: "Blue Cross Blue Shield NC", values: [{ rank: 6, amount: 615 }, { rank: 9, amount: 612 }, { rank: 6, amount: 731 }, { rank: 7, amount: 808 }, { rank: 5, amount: 781 }, { rank: 4, amount: 782 }] },
            { client: "Health Management Systems", values: [{ rank: 7, amount: 481 }, { rank: 11, amount: 397 }, { rank: 31, amount: 98 }, { rank: 0, amount: 0 }, { rank: 0, amount: 0 }, { rank: 0, amount: 0 }] },
            { client: "Dassault Systèmes", values: [{ rank: 8, amount: 411 }, { rank: 16, amount: 194 }, { rank: 13, amount: 272 }, { rank: 35, amount: 59 }, { rank: 19, amount: 124 }, { rank: 25, amount: 100 }] },
            { client: "Vertex Professional Services", values: [{ rank: 9, amount: 380 }, { rank: 5, amount: 944 }, { rank: 3, amount: 969 }, { rank: 3, amount: 1059 }, { rank: 6, amount: 698 }, { rank: 7, amount: 661 }] },
            { client: "Red Hat", values: [{ rank: 10, amount: 304 }, { rank: 15, amount: 229 }, { rank: 43, amount: 49 }, { rank: 38, amount: 52 }, { rank: 0, amount: 0 }, { rank: 0, amount: 0 }] },
            { client: "EMERITUS Institute of Management", values: [{ rank: 13, amount: 221 }, { rank: 8, amount: 719 }, { rank: 9, amount: 572 }, { rank: 32, amount: 67 }, { rank: 81, amount: 0 }, { rank: 0, amount: 0 }] },
            { client: "AT&T", values: [{ rank: 18, amount: 124 }, { rank: 0, amount: 0 }, { rank: 0, amount: 0 }, { rank: 1, amount: 4457 }, { rank: 1, amount: 6301 }, { rank: 1, amount: 5452 }] },
            { client: "WORKIVA INC", values: [{ rank: 23, amount: 106 }, { rank: 10, amount: 403 }, { rank: 5, amount: 850 }, { rank: 2, amount: 1132 }, { rank: 4, amount: 819 }, { rank: 8, amount: 550 }] },
            { client: "Intuit", values: [{ rank: 30, amount: 69 }, { rank: 4, amount: 972 }, { rank: 0, amount: 0 }, { rank: 0, amount: 0 }, { rank: 0, amount: 0 }, { rank: 0, amount: 0 }] },
            { client: "Honeywell", values: [{ rank: 33, amount: 55 }, { rank: 13, amount: 287 }, { rank: 10, amount: 486 }, { rank: 12, amount: 476 }, { rank: 11, amount: 573 }, { rank: 13, amount: 348 }] },
            { client: "Uber", values: [{ rank: 40, amount: 45 }, { rank: 3, amount: 1060 }, { rank: 7, amount: 643 }, { rank: 5, amount: 999 }, { rank: 16, amount: 310 }, { rank: 16, amount: 220 }] },
            { client: "Pacific Gas & Electric", values: [{ rank: 0, amount: 0 }, { rank: 48, amount: 40 }, { rank: 8, amount: 622 }, { rank: 6, amount: 853 }, { rank: 2, amount: 1159 }, { rank: 3, amount: 903 }] },
            { client: "PMI", values: [{ rank: 0, amount: 0 }, { rank: 0, amount: 0 }, { rank: 0, amount: 0 }, { rank: 11, amount: 480 }, { rank: 7, amount: 680 }, { rank: 2, amount: 2100 }] },
            { client: "Takeda Pharmaceuticals", values: [{ rank: 0, amount: 0 }, { rank: 0, amount: 0 }, { rank: 18, amount: 207 }, { rank: 8, amount: 598 }, { rank: 8, amount: 656 }, { rank: 5, amount: 759 }] },
            { client: "New York Life Insurance Company", values: [{ rank: 0, amount: 0 }, { rank: 0, amount: 0 }, { rank: 0, amount: 0 }, { rank: 28, amount: 81 }, { rank: 9, amount: 595 }, { rank: 9, amount: 485 }] },
            { client: "Mohela", values: [{ rank: 0, amount: 0 }, { rank: 0, amount: 0 }, { rank: 0, amount: 0 }, { rank: 10, amount: 513 }, { rank: 0, amount: 0 }, { rank: 0, amount: 0 }] }
          ],
          slideSnapshot: slideImage("Slide4.PNG")
        }
      },
      {
        id: "top-clients",
        number: 5,
        tone: "light",
        template: "rankings",
        title: "FY’26 – YTD - Enterprise Closed – Top 10 Clients",
        accentPhrases: ["Top 10 Clients"],
        data: {
          tabs: [
            {
              key: "deal",
              label: "Deal value",
              subheading: "Top 10 Clients As per Deal value (ZOHO)",
              entries: [
                { client: "PMI", amount: 2772140 },
                { client: "Blue Cross Blue Shield NC", amount: 2027240 },
                { client: "Walmart Inc", amount: 968868 },
                { client: "Raytheon Company", amount: 846358 },
                { client: "PG&E Corporation", amount: 797865 },
                { client: "KPMG LLP", amount: 792255 },
                { client: "Takeda Pharmaceuticals", amount: 613200 },
                { client: "WORKIVA INC", amount: 519960 },
                { client: "AT&T Inc", amount: 515608 },
                { client: "Honeywell", amount: 443885 }
              ],
              slideSnapshot: slideImage("Slide8.PNG")
            },
            {
              key: "invoice",
              label: "Invoicing",
              subheading: "Top 10 Clients As per Invoicing",
              entries: [
                { client: "AT&T", amount: 5451514 },
                { client: "PMI", amount: 2099945 },
                { client: "Pacific Gas & Electric", amount: 902731 },
                { client: "Blue Cross Blue Shield NC", amount: 781876 },
                { client: "Takeda Pharmaceuticals", amount: 759168 },
                { client: "Walmart", amount: 665690 },
                { client: "Vertex Professional Services", amount: 660654 },
                { client: "Wolters Kluwer", amount: 624523 },
                { client: "WORKIVA INC", amount: 550488 },
                { client: "New York Life Insurance Company", amount: 485102 }
              ],
              slideSnapshot: slideImage("Slide9.PNG")
            }
          ]
        }
      },
      {
        id: "initiatives",
        number: 6,
        tone: "dark",
        template: "initiatives",
        title: "FY’26 - Initiatives",
        accentPhrases: ["Initiatives"],
        data: {
          automation: [
            "Adoption of client platforms like Ask AT&T",
            "Automated storyboard-to-development workflows",
            "Template-driven rapid course development",
            "Automated quality checks and review cycles",
            "Script-based publishing and LMS packaging",
            "AI-driven voiceover and media generation",
            "Automated content conversion from legacy formats",
            "Reduced manual effort and improved turnaround time"
          ],
          capabilitiesBuilt: [
            "Immersive XR learning solutions for complex training scenarios",
            "Interactive simulations for experiential learning",
            "AI-powered content transformation and modernization",
            "AI-assisted image, audio, and video generation",
            "Microlearning and adaptive learning framework pilots",
            "Differentiated innovation-led solution positioning"
          ]
        }
      },
      {
        id: "growth-plan",
        number: 7,
        tone: "light",
        template: "growthPlan",
        title: "Growth Plan",
        accentPhrases: ["Growth Plan", "Achieve Budget"],
        data: {
          columns: [
            {
              title: "FY’27 Strategy to Achieve Budget",
              bullets: [
                "Launch AI XDT model",
                "Train and certify AI resources",
                "Leverage AI for business development and sales support",
                "Focus on existing accounts for additional services",
                "Increase RFP win ratio",
                "Adding additional services and offerings",
                "Drive business growth by promoting webinars and innovation showcases"
              ]
            },
            {
              title: "Challenges Faced in FY’26",
              bullets: [
                "Large clients such as AT&T, Walmart, Workiva, PG&E, PwC, Honeywell, and KPMG have declined.",
                "Client budget constraints and phased project approvals",
                "Delayed conversion of large RFP opportunities",
                "Shift from large fixed projects to smaller engagements",
                "Increased pricing pressure and competition",
                "Upskilling requirement for emerging technologies"
              ]
            },
            {
              title: "FY’26 - How FY’26 Initiatives Support FY’27 Growth",
              bullets: [
                "XDT model ensures predictable monthly revenue",
                "Automation improves delivery efficiency and margins",
                "AI accelerates development and reduces turnaround time",
                "AR/VR/XR enables premium high-value offerings",
                "Reusable assets support scalable delivery",
                "Stronger client relationships improve upselling and cross-selling opportunities"
              ]
            }
          ]
        }
      }
    ]
  };
})();
