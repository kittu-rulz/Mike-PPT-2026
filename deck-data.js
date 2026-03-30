(() => {
  const media = (file) => `assets/media/${file}`;

  window.deckData = [
    {
      number: 1,
      chromeTitle: "Opening",
      title: "ENT: FY’26 Performance & FY’27 Growth Strategy",
      typeLabel: "hero/cover slide",
      treatment: "Immersive cover composition with a restrained presenter rail, brand mark, and cinematic negative space.",
      kind: "cover",
      sceneClass: "scene--hero scene--cover",
      layers: [
        { className: "scene__layer--hero-orbit", depth: 18 },
        { className: "scene__layer--hero-beam", depth: 10 },
        { className: "scene__layer--hero-grid", depth: 6 }
      ],
      kicker: "Global Enterprise",
      brandImage: media("aptara-logo.svg"),
      backgroundVideo: media("hero-video.mp4"),
      presenter: "MIKE STACY",
      role: "President - Global Enterprise",
      date: "27 March 2026"
    },
    {
      number: 2,
      chromeTitle: "Financial Overview",
      title: "ENT Financial Overview – (FY’22 – FY’26)",
      typeLabel: "data/metrics slide",
      treatment: "Dual analytic canvases with numeric storytelling, custom chart choreography, and a premium editorial dashboard feel.",
      kind: "financialOverview",
      sceneClass: "scene--overview scene--light",
      layers: [
        { className: "scene__layer--paper-wash", depth: 8 },
        { className: "scene__layer--paper-grid", depth: 4 },
        { className: "scene__layer--spotlight", depth: 12 }
      ],
      kicker: "FY’22 – FY’26",
      panels: [
        {
          label: "Revenue",
          growthLabel: "Revenue Growth %",
          points: [
            { label: "2021-22", value: 15917061.61, growth: -0.0063604911682727302 },
            { label: "2022-23", value: 14635064.67, growth: -0.08054231185450564 },
            { label: "2023-24", value: 17429911.52, growth: 0.19096921763038591 },
            { label: "2024-25", value: 18388579.53, growth: 0.05500131247941078 },
            { label: "2025-26 (Forecast)", value: 17350000, growth: -0.056479595300203216 }
          ]
        },
        {
          label: "EBITDA",
          growthLabel: "EBITDA Growth %",
          points: [
            { label: "2021-22", value: 1212594.24, growth: -0.43300187161409587 },
            { label: "2022-23", value: 482102.37, growth: -0.6024206955148629 },
            { label: "2023-24", value: 2005592.2, growth: 3.1600960904629964 },
            { label: "2024-25", value: 2314461.33, growth: 0.1540039545433749 },
            { label: "2025-26 (Forecast)", value: 1638637.82, growth: -0.29200034475405923 }
          ]
        }
      ]
    },
    {
      number: 3,
      chromeTitle: "XDT Growth",
      title: "XDT Growth",
      typeLabel: "comparison slide",
      treatment: "Split-chart comparison contrasting absolute revenue mix against contribution share, with XDT growth called out as the hero movement.",
      kind: "xdtGrowth",
      sceneClass: "scene--xdt scene--light",
      layers: [
        { className: "scene__layer--paper-wash", depth: 8 },
        { className: "scene__layer--paper-grid", depth: 5 }
      ],
      kicker: "Revenue Mix Shift",
      absoluteTitle: "XDT is Growing as Compared to Fixed Bid",
      shareTitle: "Contribution of XDT to Total Revenue",
      years: ["FY'21", "FY'22", "FY'23", "FY'24", "FY'25", "FY'26"],
      absoluteSeries: [
        { name: "Fixed Bid", tone: "fixed", values: [11030080.73, 9205007.46, 8082285.85, 5161865.31, 5219038.46, 4879091.02] },
        { name: "XDT", tone: "xdt", values: [3332514.97, 5535612.85, 5446817.83, 11460625.07, 12553147.66, 12355367.39] },
        { name: "T&M", tone: "tm", values: [1656355.6, 1176443.9, 1191283.64, 807424.5, 616393, 115541.43] }
      ],
      xdtGrowth: [0.20803577634947923, 0.34777850845900443, 0.3700186490745136, 0.6575261640061434, 0.6826600129395967, 0.7121249281809793],
      shareSeries: [
        { name: "Fixed Bid", tone: "fixed", values: [0.6885644711336378, 0.5783106318197103, 0.5490538852207321, 0.2961497715587238, 0.283819561366958, 0.2812156233426225] },
        { name: "XDT", tone: "xdt", values: [0.20803577634947923, 0.34777850845900443, 0.3700186490745136, 0.6575261640061434, 0.6826600129395967, 0.7121249281809793] },
        { name: "T&M", tone: "tm", values: [0.10339975251688291, 0.07391085972128525, 0.0809274657047543, 0.0463240644351328, 0.033520425693445315, 0.006659448476398374] }
      ]
    },
    {
      number: 4,
      chromeTitle: "Top Clients by Deal Value",
      title: "FY’26 – YTD - Enterprise Closed – Top 10 Clients",
      typeLabel: "data/metrics slide",
      treatment: "Leaderboard treatment with oversized top ranks, visual value bars, and a darker prestige finish for high-value client wins.",
      kind: "ranking",
      sceneClass: "scene--ranking scene--dark",
      layers: [
        { className: "scene__layer--night-mesh", depth: 10 },
        { className: "scene__layer--night-arc", depth: 14 }
      ],
      kicker: "FY’26 – YTD",
      subheading: "Top 10 Clients As per Deal value (ZOHO)",
      variant: "value",
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
      ]
    },
    {
      number: 5,
      chromeTitle: "Top Clients by Invoicing",
      title: "FY’26 – YTD - Enterprise Closed – Top 10 Clients",
      typeLabel: "data/metrics slide",
      treatment: "Revenue-runway composition with a dominant invoicing hero, secondary rank stack, and lighter enterprise dashboard styling.",
      kind: "ranking",
      sceneClass: "scene--ranking scene--light",
      layers: [
        { className: "scene__layer--paper-wash", depth: 8 },
        { className: "scene__layer--paper-grid", depth: 4 }
      ],
      kicker: "FY’26 – YTD",
      subheading: "Top 10 Clients As per Invoicing",
      variant: "invoice",
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
      ]
    },
    {
      number: 6,
      chromeTitle: "New Clients Addition",
      title: "Financial Year 2025 - 26 Wins and New Clients Addition",
      typeLabel: "data/metrics slide",
      treatment: "Sparse acquisition ledger with a commanding total block, staggered win tickets, and a discreet note rail for follow-up.",
      kind: "newWins",
      sceneClass: "scene--new-wins scene--light",
      layers: [
        { className: "scene__layer--paper-wash", depth: 8 },
        { className: "scene__layer--spotlight", depth: 12 }
      ],
      kicker: "Financial Year 2025 - 26",
      total: 780768,
      note: "Need to update the client's names and Logos",
      entries: [
        { client: "Digidrub", amount: 376868 },
        { client: "McCarthy Building Companies", amount: 167000 },
        { client: "Cobank", amount: 113400 },
        { client: "Walbridge", amount: 66000 },
        { client: "KBS", amount: 38900 },
        { client: "CE2NMD", amount: 12600 },
        { client: "ASAP Elearning Solutions Ltd.", amount: 6000 }
      ]
    },
    {
      number: 7,
      chromeTitle: "Closed Won & Deal Size",
      title: "FY’26 – YTD - Enterprise Closed Won & Deal Size",
      typeLabel: "data/metrics slide",
      treatment: "Numeric storytelling layout anchored by one hero total and paired comparisons for revenue won and average deal size.",
      kind: "winMetrics",
      sceneClass: "scene--win-metrics scene--light scene--quiet",
      layers: [
        { className: "scene__layer--paper-wash", depth: 8 },
        { className: "scene__layer--paper-grid", depth: 4 }
      ],
      kicker: "FY’26 – YTD",
      revenueWon: [
        { label: "New- Won", amount: 780768 },
        { label: "Existing - Won", amount: 14160888 },
        { label: "Total Won", amount: 14941656 }
      ],
      avgDealSize: [
        { label: "New-Won", amount: 45928 },
        { label: "Existing -Won", amount: 66797 },
        { label: "Total Won", amount: 65247 }
      ]
    },
    {
      number: 8,
      chromeTitle: "Client Trend Analysis",
      title: "ENT – Top 10 Client Trend Analysis (FY’21–FY’26)",
      typeLabel: "data/metrics slide",
      treatment: "Insight-led split screen with editorial observations on one side and a premium scrollable trend matrix on the other.",
      kind: "trendAnalysis",
      sceneClass: "scene--trend-analysis scene--dark scene--quiet",
      layers: [
        { className: "scene__layer--night-mesh", depth: 10 },
        { className: "scene__layer--night-arc", depth: 14 }
      ],
      kicker: "Key Observations:",
      observations: [
        "The Top 10 client mix has changed significantly year over year, indicating a dynamic revenue portfolio.",
        "Early years (FY’21–FY’23) were heavily dependent on consulting clients such as Ernst & Young, PwC, and KPMG, which have gradually declined. Decline in legacy clients creating recurring revenue gaps.",
        "We also lost big logos in last 3-4 years like Freddie Mac, HMS, Red Hat, Intuit, Emeritus, Mohela etc.",
        "New anchor clients emerged in later years, most notably AT&T and PMI, helping offset the drop from legacy accounts.",
        "New clients replacing old ones, but not always at same scale.",
        "Several mid-tier clients (Workiva, Pacific Gas & Electric, Walmart, Vertex) contributed steadily but did not fully replace large-client scale.",
        "Revenue concentration continues to shift, with dependency moving from one major client to another every few years."
      ],
      years: ["FY'21", "FY'22", "FY'23", "FY'24", "FY'25", "FY'26"],
      rows: [
        { client: "Ernst & Young", values: [4079895, 3111519, 1301013, 381074, 334800, 395111] },
        { client: "PricewaterhouseCoopers", values: [2869379, 1185003, 2009836, 315860, 592290, 59664] },
        { client: "KPMG LLP", values: [1179326, 928513, 924253, 524727, 565971, 372943] },
        { client: "Freddie Mac", values: [889593, 830444, 433615, 369859, 32903, 0] },
        { client: "Walmart", values: [724887, 273922, 241155, 1037540, 935782, 665690] },
        { client: "Blue Cross Blue Shield NC", values: [615221, 612402, 730860, 807984, 781457, 781876] },
        { client: "Health Management Systems", values: [480744, 397376, 98288, 0, 0, 0] },
        { client: "Dassault Systemes", values: [410639, 194189, 271932, 59285, 123684, 99852] },
        { client: "Vertex Professional Services", values: [379771, 944444, 969175, 1058744, 697948, 660654] },
        { client: "Red Hat", values: [303539, 228887, 48968, 52065, 0, 0] },
        { client: "Uber", values: [44720, 1060281, 643435, 998926, 310106, 219560] },
        { client: "Intuit", values: [68746, 971988, 0, 0, 0, 0] },
        { client: "EMERITUS Institute of Management", values: [220721, 719203, 571517, 67497, 201, 0] },
        { client: "WORKIVA INC", values: [106411, 402952, 850242, 1132429, 818858, 550488] },
        { client: "Pacific Gas & Electric", values: [0, 40086, 622049, 852545, 1158511, 902731] },
        { client: "Honeywell", values: [54658, 286763, 485965, 475642, 572751, 347581] },
        { client: "AT&T", values: [123758, 0, 0, 4456665, 6301016, 5451514] },
        { client: "Takeda Pharmaceuticals", values: [0, 0, 207294, 597991, 655732, 759168] },
        { client: "Mohela", values: [0, 0, 0, 512577, 0, 0] },
        { client: "PMI", values: [0, 0, 0, 479557, 680410, 2099945] },
        { client: "New York Life Insurance Company", values: [0, 0, 0, 80594, 595272, 485102] },
        { client: "Wolters Kluwer", values: [259605, 165236, 421637, 429036, 439901, 624523] }
      ],
      keyMessage: "Over the past 6 years, our Top 10 client composition has changed significantly. Large legacy clients such as Ernst & Young, PwC, and KPMG have declined, while new clients like AT&T and PMI have emerged as major contributors. This trend highlights the importance of continuously acquiring new clients to compensate for natural revenue erosion and to maintain steady growth."
    },
    {
      number: 9,
      chromeTitle: "Key Achievements",
      title: "FY’26 Key Achievements",
      typeLabel: "concept explanation slide",
      treatment: "Editorial manifesto layout with one lead achievement rail and a paced cascade of supporting accomplishments.",
      kind: "achievementStack",
      sceneClass: "scene--achievements scene--light",
      layers: [
        { className: "scene__layer--paper-wash", depth: 8 },
        { className: "scene__layer--spotlight", depth: 10 }
      ],
      kicker: "FY’26",
      items: [
        "Strengthened Corporate E-Learning portfolio with focus on scalable delivery.",
        "Converted majority of fixed-bid projects into Extended Development Team (XDT) model.",
        "Improved revenue predictability through long-term client engagements.",
        "Increased utilization through cross-project resource alignment with the support of project management tool.",
        "Expanded engagement with existing clients via value-added services.",
        "Improved operational efficiency through standardized delivery frameworks."
      ]
    },
    {
      number: 10,
      chromeTitle: "Innovation Investments",
      title: "Innovation Investments",
      typeLabel: "section divider",
      treatment: "Cinematic chapter opener with a commanding title and floating investment statements arranged like a premium launch narrative.",
      kind: "sectionBullets",
      sceneClass: "scene--section scene--dark scene--section-innovation",
      layers: [
        { className: "scene__layer--divider-halo", depth: 16 },
        { className: "scene__layer--divider-band", depth: 8 }
      ],
      kicker: "FY’26 -",
      items: [
        "Working on AI-enabled content creation and rapid storyboard development",
        "Automation of production workflows to reduce manual efforts",
        "AR/VR/XR immersive learning pilots for high-impact training",
        "AI-assisted localization and legacy content conversion",
        "Development of reusable templates and rapid development accelerators",
        "Process automation for QA, publishing, and content updates",
        "Upskilling team on AI tools, automation workflows, and immersive technologies"
      ]
    },
    {
      number: 11,
      chromeTitle: "Innovation Edge",
      title: "Innovation Edge",
      typeLabel: "case study slide",
      treatment: "Mosaic showcase using real project imagery, layered cards, and asymmetric spacing to turn proof points into hero moments.",
      kind: "caseGallery",
      sceneClass: "scene--case-gallery scene--light",
      layers: [
        { className: "scene__layer--paper-wash", depth: 8 },
        { className: "scene__layer--spotlight", depth: 12 }
      ],
      layoutVariant: "mosaic-a",
      cases: [
        {
          title: "Aptara: Understanding 5G",
          topic: "Default Articulate Rise course output",
          bullets: [
            "Default lesson structure and layouts",
            "Integrated custom HTML responsive layouts, custom HTML interactivities",
            "Enhanced visual design and media",
            "Manual intervention for enhancements",
            "Articulate Rise AI features with HTML5 interactions"
          ],
          metaLine: "Tool: Articulate Rise 360",
          demo: true,
          image: media("image22.png"),
          feature: true
        },
        {
          title: "Aptara: Portable Fire Extinguisher",
          topic: "AR/VR immersive learning experience",
          bullets: [
            "Includes advanced multimedia elements like high-definition graphics, interactive audio and dynamic video for learning impact",
            "Ability for users to interact with objects and dive deep into immersive environments"
          ],
          metaLine: "Platform: Unity",
          demo: true,
          image: media("image23.png")
        },
        {
          title: "Aptara: Time Management",
          bullets: [
            "Use of AI image generation for faster creation",
            "Enhanced Text-to-Speech feature that covers multiple accents and languages",
            "Rapidly generated content, scripts, and assessments",
            "Follows the standard accessibility guidelines"
          ],
          metaLine: "Tool: Articulate Storyline",
          demo: true,
          image: media("image24.png")
        },
        {
          title: "AT&T: Understanding 5G",
          bullets: [
            "Storyboard created using Ask AT&T",
            "AI-assisted content generation integrated into the custom Storyline templates",
            "AI-generated illustrations and animations created using Adobe Firefly",
            "Storyline-based AI-generated audio for narration",
            "AT&T language guidelines applied"
          ],
          metaLine: "Tool: Articulate Storyline",
          demo: true,
          image: media("image25.png")
        }
      ]
    },
    {
      number: 12,
      chromeTitle: "Innovation Edge (Contd.)",
      title: "Innovation Edge (Contd.)",
      typeLabel: "case study slide",
      treatment: "Continuation gallery with a more spatial composition, allowing immersive and experiential work to feel broader and more cinematic.",
      kind: "caseGallery",
      sceneClass: "scene--case-gallery scene--light",
      layers: [
        { className: "scene__layer--paper-wash", depth: 8 },
        { className: "scene__layer--spotlight", depth: 14 }
      ],
      layoutVariant: "mosaic-b",
      cases: [
        {
          title: "COSM: Experience Center",
          topic: "Topic: Role-based Induction Training",
          bullets: [
            "AI-generated video & audio in a modular approach to address learner profiles",
            "An immersive learning experience with scenario-based, application-driven simulations for hands-on learning.",
            "Interactive and engaging learning experience with deep practice, assessment, and performance support"
          ],
          metaLine: "Tool: Articulate Storyline 360 & AI agent",
          demo: true,
          image: media("image26.png"),
          feature: true
        },
        {
          title: "PwC: Access Your Potential",
          topic: "Topic: Digital Skills Curriculum for Managers",
          bullets: [
            "Game-based approach that includes avatar selection, badges, and audio for enhanced learning experience",
            "Learners need to complete all the challenges to get a perfect score",
            "Visually appealing and enriching, offering a realistic feel and experience"
          ],
          metaLine: "Tool: Custom HTML5",
          demo: true,
          image: media("image28.jpeg")
        },
        {
          title: "Aptara: XR Showreel",
          bullets: [
            "Virtual workspaces and collaborative environments",
            "Individualized experiences for better retention and application",
            "Hand, voice, and eye interactions for a fully immersive experience",
            "Instant feedback and analytics to track progress and refine learning"
          ],
          metaLine: "Tool: Immersive technology",
          demo: true,
          image: media("image29.jpeg")
        },
        {
          title: "Aptara: Lifesaver",
          bullets: [
            "Scenario-based training with AI tutor",
            "Hyperlinked integrated glossary for ready access",
            "Responsive design for seamless learning",
            "Training available as an audio file for learning on-the-go"
          ],
          metaLine: "Custom HTML5",
          demo: true,
          image: media("image30.png")
        }
      ]
    },
    {
      number: 13,
      chromeTitle: "In-House Capabilities",
      title: "In-House Capabilities",
      typeLabel: "case study slide",
      treatment: "Product-card composition that frames internal tools as premium platform capabilities rather than standard feature boxes.",
      kind: "caseGallery",
      sceneClass: "scene--case-gallery scene--dark",
      layers: [
        { className: "scene__layer--night-mesh", depth: 10 },
        { className: "scene__layer--gallery-glow", depth: 16 }
      ],
      layoutVariant: "mosaic-c",
      cases: [
        {
          title: "Aptara – StoryBot",
          topic: "Topic: Automated Storyboarding Tool",
          bullets: [
            "Transforms traditional content development flows through intelligent automation",
            "Shifts the process from manual to AI-driven rapid design",
            "Delivers high-quality, instructionally sound content in minutes",
            "Enables smarter iteration and continuous improvement"
          ],
          demo: true,
          image: media("image31.png"),
          feature: true
        },
        {
          title: "Aptara – Quest Genius",
          topic: "Topic: Summarization/Assessment Generator",
          bullets: [
            "Generates summaries from multiple sources",
            "Automates assessment creation",
            "Offers multiple formats for assessments"
          ],
          demo: true,
          image: media("image32.jpeg")
        },
        {
          title: "Aptara – AI University",
          topic: "Topic: AI for Leaders",
          bullets: [
            "AI strategy curriculum for senior leaders for effective AI adoption",
            "Scenario libraries for hands-on practice",
            "Engaging video content presented with a book-inspired learning format"
          ],
          demo: true,
          image: media("image33.png")
        },
        {
          title: "Aptara – Chatalyst",
          topic: "Topic: AI Chatbot Generator Tool",
          bullets: [
            "Can use customized knowledge base and UI",
            "Multiple chatbots can be created",
            "Various types of documents, webpage URLs can be provided as a knowledge base",
            "This tool follows data-security guidelines"
          ],
          demo: true,
          image: media("image34.png")
        }
      ]
    },
    {
      number: 14,
      chromeTitle: "Automation Initiatives",
      title: "Automation Initiatives",
      typeLabel: "section divider",
      treatment: "Process-oriented chapter opener with directional sequencing and refined motion to set up the automation use-case stories.",
      kind: "sectionBullets",
      sceneClass: "scene--section scene--dark scene--section-automation",
      layers: [
        { className: "scene__layer--divider-halo", depth: 16 },
        { className: "scene__layer--night-arc", depth: 8 }
      ],
      kicker: "FY’26 -",
      items: [
        "Automated storyboard-to-development workflows",
        "Template-driven rapid course development",
        "Automated quality checks and review cycles",
        "Script-based publishing and LMS packaging",
        "AI-driven voiceover and media generation",
        "Automated content conversion from legacy formats",
        "Reduced manual effort and improved turnaround time"
      ]
    },
    {
      number: 15,
      chromeTitle: "Automation Use Cases",
      title: "Automation in Content Development Process: Use Cases",
      typeLabel: "case study slide",
      treatment: "Operational showcase with utility-led card design, real screenshots, and tighter spacing to emphasize efficiency and precision.",
      kind: "caseGallery",
      sceneClass: "scene--case-gallery scene--light",
      layers: [
        { className: "scene__layer--paper-wash", depth: 8 },
        { className: "scene__layer--paper-grid", depth: 4 }
      ],
      layoutVariant: "mosaic-d",
      cases: [
        {
          title: "Aptara: eLearning Extraction",
          topic: "Topic: Maintenance of storyline and Lectora courses",
          bullets: [
            "Extracting media, images and slide-specific content",
            "Converting text in an editable format",
            "Analyzing the structure of published output",
            "Removing duplication"
          ],
          demo: true,
          image: media("image35.jpeg"),
          feature: true
        },
        {
          title: "Aptara: vILT, Podcast Conversion",
          topic: "Topic: Conversion to eLearning",
          bullets: [
            "Integrating video clips extracted from vILT sessions and podcast clips",
            "Including knowledge checks and assessments to the integrated training content",
            "Generating a SCORM-compliant output"
          ],
          demo: true,
          image: media("image36.jpeg")
        },
        {
          title: "Aptara: Data Management",
          topic: "Topic: Automated tool for website data management",
          bullets: [
            "Convert Excel data to JSON using our in-house Node.js-based automated tool that helps in:",
            "Speeding up updates with improved accuracy",
            "Reducing manual efforts and eliminating redundancy"
          ],
          demo: true,
          image: media("image37.jpeg")
        },
        {
          title: "Aptara: Translation",
          topic: "Topic: Content Translation",
          bullets: [
            "Convert .xlf files into a tabular format using our in-house JavaScript utility that enables:",
            "Reading and comprehending the content easily",
            "Generating voiceover scripts",
            "Extracting word count"
          ],
          demo: true,
          image: media("image38.jpeg")
        }
      ]
    },
    {
      number: 16,
      chromeTitle: "AR/VR/XR & AI Capabilities Built",
      title: "AR/VR/XR & AI Capabilities Built",
      typeLabel: "section divider",
      treatment: "A future-facing capability stage built as a high-contrast halo scene with statements orbiting the core section idea.",
      kind: "sectionBullets",
      sceneClass: "scene--section scene--dark scene--section-capabilities",
      layers: [
        { className: "scene__layer--divider-halo", depth: 16 },
        { className: "scene__layer--gallery-glow", depth: 12 }
      ],
      kicker: "FY’26 -",
      items: [
        "Immersive XR learning solutions for complex training scenarios",
        "Interactive simulations for experiential learning",
        "AI-powered content transformation and modernization",
        "AI-assisted image, audio, and video generation",
        "Microlearning and adaptive learning framework pilots",
        "Differentiated innovation-led solution positioning"
      ]
    },
    {
      number: 17,
      chromeTitle: "AI in Action",
      title: "AI in Action",
      typeLabel: "case study slide",
      treatment: "Dark showcase wall with stronger media contrast and more editorial card cropping to spotlight AI-led experience work.",
      kind: "caseGallery",
      sceneClass: "scene--case-gallery scene--dark",
      layers: [
        { className: "scene__layer--night-mesh", depth: 10 },
        { className: "scene__layer--gallery-glow", depth: 18 }
      ],
      layoutVariant: "mosaic-e",
      cases: [
        {
          title: "Aptara: Protecting Our Planet",
          topic: "Topic: Conservation",
          bullets: [
            "AI avatar for personalized guidance",
            "AI interactive chatbot for support",
            "Language selection for learning ease"
          ],
          metaLine: "Tool: Articulate Storyline 360",
          demo: true,
          image: media("image42.png"),
          feature: true
        },
        {
          title: "Merck: Flipbook",
          topic: "Topic: Omnichannel Ecosystem",
          bullets: [
            "Skeuomorphic design – like a real book/magazine",
            "Contemporary styling, layouts, and graphics",
            "Chatbot and language selection for ease of learning",
            "Designed to be read"
          ],
          metaLine: "Tool: Custom HTML 5",
          demo: true,
          image: media("image40.jpeg")
        },
        {
          title: "CWAN: Articulate Rise Innovation",
          topic: "Topic: Sales Enablement Training",
          bullets: [
            "SVG animations to elevate the visual experience",
            "Customized integrated custom HTML blocks to create engaging and unique interactions",
            "Leadership and conceptual videos for value add"
          ],
          metaLine: "Tool: Articulate Rise 360",
          demo: true,
          image: media("image43.png")
        },
        {
          title: "Aptara: Science-Backed Learning",
          topic: "Topic: Aptara’s Learning Strategies",
          bullets: [
            "Support science-backed learning principles",
            "Habit-based learning approach for meaningful learning",
            "Behavioral nudges for continuous impact"
          ],
          metaLine: "Tool: After Effects",
          demo: true,
          image: media("image41.jpeg")
        }
      ]
    },
    {
      number: 18,
      chromeTitle: "Support to FY’27 Growth",
      title: "How FY’26 Initiatives Support FY’27 Growth",
      typeLabel: "framework/model slide",
      treatment: "Cause-and-effect bridge diagram that converts initiative bullets into a premium growth framework with directional pacing.",
      kind: "bridgeFramework",
      sceneClass: "scene--bridge scene--light",
      layers: [
        { className: "scene__layer--paper-wash", depth: 8 },
        { className: "scene__layer--strategy-glow", depth: 12 }
      ],
      kicker: "FY’26 -",
      items: [
        "XDT model ensures predictable monthly revenue",
        "Automation improves delivery efficiency and margins",
        "AI accelerates development and reduces turnaround time",
        "AR/VR/XR enables premium high-value offerings",
        "Reusable assets support scalable delivery",
        "Stronger client relationships improve upsell opportunities"
      ]
    },
    {
      number: 19,
      chromeTitle: "Challenges Faced in FY’26",
      title: "Challenges Faced in FY’26",
      typeLabel: "concept explanation slide",
      treatment: "Quieter asymmetrical pressure map that gives challenge statements more gravity through darker tone and slower pacing.",
      kind: "challengeGrid",
      sceneClass: "scene--challenge-map scene--dark scene--quiet",
      layers: [
        { className: "scene__layer--challenge-shade", depth: 10 },
        { className: "scene__layer--challenge-grid", depth: 6 }
      ],
      items: [
        "Large clients such as AT&T, Walmart, Workiva, PG&E, PwC, Honeywell, and KPMG have declined.",
        "Client budget constraints and phased project approvals",
        "Delayed conversion of large RFP opportunities",
        "Shift from large fixed projects to smaller engagements",
        "Increased pricing pressure and competition",
        "Upskilling requirement for emerging technologies"
      ]
    },
    {
      number: 20,
      chromeTitle: "FY’27 Strategy",
      title: "FY’27 Strategy to Achieve Budget",
      typeLabel: "process slide",
      treatment: "Executive action-plan matrix with numbered strategic moves, clear rhythm, and a premium split between headline and action blocks.",
      kind: "strategyGrid",
      sceneClass: "scene--strategy-canvas scene--light",
      layers: [
        { className: "scene__layer--strategy-split", depth: 10 },
        { className: "scene__layer--strategy-glow", depth: 16 }
      ],
      kicker: "FY’27",
      items: [
        "Expand XDT model across key clients",
        "Leverage AI-led development accelerators",
        "Scale automation across delivery lifecycle",
        "Position AR/VR/XR as premium offerings",
        "Focus on mining existing accounts for additional scope",
        "Improve RFP win ratio through innovation-led differentiation",
        "Strengthen pipeline visibility for next 2 quarters",
        "Optimize resource utilization via cross-skilling"
      ]
    },
    {
      number: 21,
      chromeTitle: "Closing",
      title: "Thank you!",
      typeLabel: "summary/closing slide",
      treatment: "Memorable final visual with a cinematic photographic backdrop, restrained overlay, and a calm closing lockup.",
      kind: "closing",
      sceneClass: "scene--closing-scene scene--dark",
      layers: [
        { className: "scene__layer--closing-orbit", depth: 16 },
        { className: "scene__layer--closing-band", depth: 8 }
      ],
      kicker: "Global Enterprise",
      image: media("image44.jpeg"),
      meta: "MIKE STACY | President - Global Enterprise | 27 March 2026"
    }
  ];
})();
