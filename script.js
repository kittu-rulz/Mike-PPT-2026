(() => {
  const presentationRoot = document.getElementById("presentation");
  const progressBar = document.getElementById("progress-bar");
  const currentSectionLabel = document.getElementById("current-section-label");
  const tocToggle = document.querySelector("[data-toc-toggle]");
  const tocClose = document.querySelector("[data-toc-close]");
  const tocPanel = document.getElementById("toc-panel");
  const tocBody = document.getElementById("toc-body");
  const tocScrim = document.getElementById("toc-scrim");
  const backToTop = document.querySelector("[data-back-to-top]");
  const liveRegion = document.getElementById("live-region");
  const rawDeckData = Array.isArray(window.deckData) ? window.deckData : [];
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  const clone = (value) =>
    typeof structuredClone === "function"
      ? structuredClone(value)
      : JSON.parse(JSON.stringify(value));

  const pptxMedia = (file) => `assets/pptx-media/${file}`;

  const currency0 = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });

  const percent1 = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });

  const percent0 = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  const demoLinksBySlide = {
    11: [
      "https://elearning.aptaracorp.com/AT&T_2023/POC/understanding_5G_how_it_works_capability_responsive/content/index.html#/lessons/LiiKgofYGiYV3dw5k2lUrdnhKX0jR_qR",
      "https://salesportal.aptaracorp.com/Unity_Demos/Fire_Extinguisher/index.html",
      "https://salesportal.aptaracorp.com/Aptara/Time_Management/Story.html",
      "https://elearning.aptaracorp.com/AT&T_2023/POC/Welcome_to_5G_technology/story.html"
    ],
    12: [
      "https://salesportal.aptaracorp.com/COSM/PoC/story.html",
      "https://elearning.aptaracorp.com/AYP/BEDigital/index_u.html",
      "https://aptaracorp.wistia.com/medias/oik64qjc29",
      "https://salesportal.aptaracorp.com/LifesaverCPR_Fundamentals/index.html"
    ],
    13: [
      "https://aptaracorp.wistia.com/medias/8ii31a8dbd",
      "https://salesportal.aptaracorp.com/QuestGenius/Video/QuestGeniusMicrolearningVideo.mp4",
      "https://aptaracorp.wistia.com/medias/o8y4agp9xc",
      "https://red-beach-01b90d70f-preview.eastus2.3.azurestaticapps.net/main/profile"
    ],
    15: [
      "https://aptaracorp.wistia.com/medias/gutl6gjm59",
      "https://aptaracorp.wistia.com/medias/flya9hc2d0",
      "https://aptaracorp.wistia.com/medias/0luvpxucby",
      "https://aptaracorp.wistia.com/medias/33nnk935sh"
    ],
    18: [
      "https://salesportal.aptaracorp.com/ProtectingOurPlanet/index.html",
      "https://salesportal.aptaracorp.com/Merck/PoCs/Merc_Poc_Flipbook/index.html",
      "https://share.articulate.com/lOkrrXaw-BIGYBfyJchpE",
      "https://aptaracorp.wistia.com/medias/4260nf63k8"
    ],
    26: [
      "https://xd.adobe.com/view/ff3a3e46-ab1b-4ed4-9993-4d851d9897e0-aa69/",
      "https://xd.adobe.com/view/7f09a624-e715-42c5-bb0d-a88a12906308-2a5a/",
      "https://xd.adobe.com/view/20be884c-fdb1-40f6-9d15-c96e31de605f-75ed/"
    ],
    28: [
      "https://aptaracoin.sharepoint.com/sites/ATT_Internal/_layouts/15/stream.aspx?id=%2Fsites%2FATT%5FInternal%2FShared%20Documents%2FATT%5FEngagement%2FJoint%5FShowcase%2FXR%5FTeaser%2Emp4&nav=eyJwbGF5YmFja09wdGlvbnMiOnsic3RhcnRUaW1lSW5TZWNvbmRzIjoyOC4wMzA4OTZ9fQ%3D%3D&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2Eaeb898b5%2Dda13%2D4a64%2D90eb%2D4e323164388d",
      "https://elearning.aptaracorp.com/ATT_Media/Internal_Testing/PFEA_PoC/Aptara_v1/",
      "https://salesportal.aptaracorp.com/Unity_Demos/Machine_Installation/index.html",
      "https://salesportal.aptaracorp.com/Unity_Demos/Wind_Turbine/index.html"
    ]
  };

  function normalizeDeckData(rawSlides) {
    const renumberByTitle = new Map([
      ["AR/VR/XR & AI Capabilities Built", 17],
      ["AI in Action", 18],
      ["How FY’26 Initiatives Support FY’27 Growth", 29],
      ["Challenges Faced in FY’26", 30],
      ["FY’27 Strategy to Achieve Budget", 31],
      ["Thank you!", 32]
    ]);

    const normalized = rawSlides.map((slideItem) => {
      const next = clone(slideItem);
      if (renumberByTitle.has(next.title)) {
        next.number = renumberByTitle.get(next.title);
      }
      return next;
    });

    const supplementalSlides = [
      {
        number: 16,
        chromeTitle: "Automation Use Cases",
        title: "Quest Genius",
        kicker: "Automation in Content Development Process: Use Cases",
        kind: "questSpotlight",
        headline:
          "The in-house advanced AI tool, Quest Genius, is designed to fast-track content development.",
        cta: "View the Video",
        points: [
          "It transforms large amount of content into clear, concise summaries.",
          "It helps generate well-crafted assessment questions, with multiple options and feedback for learners."
        ]
      },
      {
        number: 19,
        chromeTitle: "Client Proof",
        title: "Making an Impact for Our Clients",
        kicker: "Client impact snapshots",
        kind: "impactStories",
        stories: [
          {
            client: "AT&T",
            logo: pptxMedia("image58.png"),
            lines: [
              "Extended Development Team of 140 design, media and support resources",
              "Dedicated end to end learning services including AR/VR supporting 141,000 learners"
            ],
            tags: ["DEDICATED TEAM"]
          },
          {
            client: "FIFA",
            logo: pptxMedia("image59.png"),
            lines: [
              "Developing a cutting-edge learning program that delivers 2,100+ hours of eLearning across 70+ modules for their volunteers spread globally",
              "Successful adoption of anytime, anywhere training resulted into new training development for FIFA’s main workforce"
            ],
            tags: ["FIXED BID PROJECTS"]
          },
          {
            client: "Tempur + Sealy",
            logo: pptxMedia("image60.png"),
            lines: [
              "Started with a New Hire Onboarding program - 3 eLearning modules",
              "High-quality products in quick turnaround helping us with: 3 more modules and maintenance of the existing modules",
              "Upcoming 2 more training programs–Backoffice and frontend store staff"
            ],
            tags: ["FIXED BID PROJECTS"]
          },
          {
            client: "CGI",
            logo: pptxMedia("image61.png"),
            lines: [
              "Blended learning design for onboarding training",
              "Developed PowerPoint based templates for creating simulations",
              "Extended Development Team of 2 members for 2025-26"
            ],
            tags: ["FIXED BID AND DEDICATED TEAM"]
          },
          {
            client: "UL Solutions",
            logo: pptxMedia("image63.png"),
            lines: [
              "Started with redesign of 12 courses under fixed-bid project",
              "Extended Development Team of 4 team members for 6 months",
              "Recommended to a new business unit at UL for design and development 20 courses"
            ],
            tags: ["DEDICATED TEAM", "FIXED BID PROJECTS"]
          },
          {
            client: "Walmart",
            logo: pptxMedia("image62.jpeg"),
            lines: [
              "18 Member DEDICATED TEAM to support Walmart in developing trainings using multiple tools and on subjects like INTERNATIONAL COMPLIANCE, ETHICS, COMMUNICATION, PACKAGING and more"
            ],
            tags: ["DEDICATED TEAM"]
          }
        ],
        detailTrail: [
          "A 200-page Mergers and Acquisitions handbook is designed into an engaging 15-minute gamified e-learning module",
          "Successful adoption of the module helped us with 3 additional projects",
          "Learning content on EMERGING TECHNOLOGIES",
          "Meeting learning demands for UPSKILLING AND RESKILLING",
          "Developed a 30-minute e-learning module focused on Personally Identifiable Information (PII) - a critical compliance topic for their workforce",
          "Successful adoption of the module helped us with 5 additional projects"
        ]
      },
      {
        number: 20,
        chromeTitle: "Client Testimonials",
        title: "Client Testimonials",
        kicker: "Voices from the partnership",
        kind: "testimonialGrid",
        quotes: [
          {
            client: "AT&T | Project - Ask AT&T Academy",
            quote:
              "This accomplishment wouldn’t have been possible without the team and the many contributors behind the scenes. As Gen AI continues to gain momentum, the partnership and dedication shown in delivering this critical learning are truly valued."
          },
          {
            client: "AT&T | Project - SE - OM & ASE/ADE Training Projects",
            quote:
              "The output looks fantastic. Thanks to the team for staying with the project through to completion. The results speak to the team’s dedication and quality standards."
          },
          {
            client: "SHELL",
            quote:
              "A heartfelt thank you to Aptara and the team for bringing this crucial training to life."
          },
          {
            client: "SHELL | Project - M&A Antitrust Animation Video",
            quote:
              "Thank you for the excellent work on the M&A video. Despite some process challenges, the team delivered a well-designed and impressive outcome. Your support is truly appreciated, and we look forward to future collaboration."
          },
          {
            client: "MyComputerCareer",
            quote:
              "Very pleased with the final product! Aptara kept to the timeline wonderfully and liked the weekly touch base. Really liked the look and feel of the Instructor Guide."
          },
          {
            client: "COMCAST",
            quote:
              "Aptara did a fabulous job capturing our brand perfectly, and the look and feel of the training brings our vision to life."
          },
          {
            client: "PEPSICO",
            quote:
              "Thank you so much to the team for all the great support we have received in creating this Franchise Portal!!!"
          },
          {
            client: "BLUE CROSS NC | Project - Vision 2030 - Leadership Action Plan",
            quote:
              "Thank you for delivering high-quality collateral within a tight timeline. The layout received great feedback and will be incredibly helpful for upcoming leadership conversations. The visual design was outstanding, reflecting excellent teamwork and dedication."
          },
          {
            client: "BCBSNC",
            quote:
              "Aptara's onboarding and Know Your Blue courses have been invaluable. They provided a comprehensive understanding of the industry, BCBSNC’s operations, and facilitated seamless integration into the team. The content's relevance, accessibility, and user-friendliness are unparalleled."
          },
          {
            client: "CONOCO PHILLIPS",
            quote:
              "Thanks for your team’s hard work and partnership in creating great learning tools for our employees! We feel ‘supported’ for this next go-live due to all we’ve been able to cover in the job aids and videos. They look amazing in Workday Help and we’re able to see the usage come to life via article metrics now!"
          },
          {
            client: "FIFA",
            quote:
              "We really appreciate the time your team has taken to create our eLearnings and really bring to life what we have had in our minds for a while. It has been amazing for us to be able to test the different modules created and be able to look into how we will roll the modules out."
          }
        ]
      }
    ];

    supplementalSlides.push(
      {
        number: 21,
        chromeTitle: "Service Expansion",
        title: "Innovation in Service Offerings",
        kicker: "New service opportunities",
        kind: "imageDivider",
        image: pptxMedia("image73.jpeg")
      },
      {
        number: 22,
        chromeTitle: "AI POCs / Client Projects",
        title: "Integrating AI: POCs/Client Projects",
        kicker: "Avatar-led concept work",
        kind: "aiProjectSet",
        featureImage: pptxMedia("image75.jpeg"),
        thumbnails: [pptxMedia("image76.png"), pptxMedia("image77.png")],
        items: [
          {
            lead: "An AI avatar (IVY) from the HeyGen platform has been integrated for simplified learning.",
            details: [
              "The HeyGen Interactive AI Avatar (Waynel) is utilized as Chatbot for enhanced engagement.",
              "The POC demonstrates innovative and creative instructional and media design strategies to ensure a seamless learning experience. The concepts, storyboards, and media elements were created from scratch, with some functionalities inspired by our earlier FSC POC.",
              "We aim to develop technology-driven learning approaches that resonate with our clients and promote adoption."
            ]
          },
          {
            lead:
              "This eLearning POC was created for the Wadhwani Foundation using a generative AI avatar as a lifelike narrator.",
            details: [
              "The video blends real-life footage, visual design, and dynamic transitions to enhance engagement and comprehension.",
              "It’s easy to scale and adapt for different languages and cultures."
            ]
          },
          {
            lead:
              "Task-based eLearning helps learners to actively participate, acquire knowledge and to practice skills by performing various activities.",
            details: [
              "AI-generated video included for personalizing and enhancing the learning experience.",
              "Contemporary UI with high-fidelity visuals are added to maximize learning retention.",
              "AI-generated voiceover audio is included to save time and cost."
            ]
          }
        ]
      },
      {
        number: 23,
        chromeTitle: "AI POCs / Client Projects",
        title: "Integrating AI: POCs/Client Projects",
        kicker: "Production-ready creative experiments",
        kind: "aiProjectSet",
        featureImage: pptxMedia("image78.png"),
        thumbnails: [pptxMedia("image79.png")],
        items: [
          {
            lead:
              "This solution was developed using the Colossyan tool, for the Employbridge ITAR project, to showcase the performance of a realistic AI character.",
            details: [
              "AI-generated avatars offer a cost-effective and highly realistic way to create conversation-based learning experiences.",
              "With multiple viewing angles and customizable backgrounds, they enable dynamic storytelling across various scenarios.",
              "This approach ensures faster production, reusability across modules, and strong engagement for modern learners."
            ]
          },
          {
            lead: "This video that uses illustration assets was developed for the CGI project.",
            details: [
              "Using AI, we can animate highly realistic illustrated characters with accurate lip-sync and natural head movements by simply providing an image and audio script.",
              "This drastically reduces production time and cost, while preserving the original art style.",
              "It’s a scalable and engaging solution ideal for multi-language or character-rich eLearning content."
            ]
          }
        ]
      }
    );

    supplementalSlides.push(
      {
        number: 24,
        chromeTitle: "Capability Buildout",
        title: "New Service Opportunities",
        kicker: "UI/UX and XR services",
        kind: "imageDivider",
        image: pptxMedia("image80.jpeg")
      },
      {
        number: 25,
        chromeTitle: "UI/UX Center of Excellence",
        title: "UI/UX Center of Excellence: Team & Process Foundation",
        kicker: "User experience design process",
        kind: "foundationBlock",
        businessNeed:
          "Business Need: PepsiCo was seeking a partner to redesign its PEP U learning platform, a key part of PepsiCo's digital employee experience (dEEX) initiative that offers a learning centric platform for employees to work, grow, belong, and make an impact. Considering our capabilities and potential in this service offering, Aptara took this opportunity and partnered with PepsiCo to meet their requirements. It was a new line of business, therefore, we set the team and processes from scratch.",
        roles:
          "Roles Recruited: UX Researcher, UI Designers, UX Designers, and Interaction Designers",
        tools: "Tool Involved: Figma, Adobe XD and usability testing platforms",
        solution:
          "Solution: For PepsiCo, our UI/UX design strategy aimed to create a user-centric, accessible, and engaging platform for PEP U. This strategy focused on user research and design principles to simplify navigation, ensure consistency, and enhance the user experience. In addition, it covered information architecture, design systems, and interactive graphics. Using this strategy, we developed, tested, and refined the platform in phases.",
        outro:
          "Here’s a brief overview of our journey in establishing the UI/UX design strategy as a core capability and enabling our team to deliver projects seamlessly.",
        phases: ["START", "Meet the user", "Research", "Empathize", "Create", "Test", "Develop"],
        processNotes: [
          "Be the user",
          "Make it simple",
          "Data Don’t Lie",
          "Stick to the Design",
          "User Demographics",
          "Define User Goals",
          "Define User Challenges",
          "Define Metrics & Form Hypothesis",
          "User Persona",
          "User Scenarios",
          "User Testing",
          "User Experience Map",
          "Wireframes",
          "Mood-board",
          "Mock-ups",
          "Style Guide",
          "Usability Tests",
          "Review Metrics",
          "Track Usage",
          "Inform Next Interaction"
        ]
      },
      {
        number: 26,
        chromeTitle: "UI/UX Design Services",
        title: "UI/UX Design Services: Samples",
        kicker: "Portal redesign work",
        kind: "sampleGallery",
        description:
          "Aptara leveraged Experience Hub's smart, sleek, and simple functionality to provide a transformed learning experience that made PEP U faster, stronger, and better. The solution addressed the current challenges and additional enhancements of PEP U including the end-to-end UI/UX processes. The client realized the benefit of enhanced portal and assigned more sub portals for redesign.",
        labels: ["Pep U", "Myeducation", "Pep University Main portal", "Franchise Onboarding"],
        ctas: ["View the XD File", "View the XD File", "View the XD File"],
        images: [pptxMedia("image88.png"), pptxMedia("image89.png"), pptxMedia("image90.png")]
      },
      {
        number: 27,
        chromeTitle: "XR Services",
        title: "XR Services: Team & Infrastructure Setup",
        kicker: "Team and infrastructure foundation",
        kind: "foundationBlock",
        businessNeed:
          "Business Need: With increasing demand of AR/VR/XR related services from various clients in domains such as manufacturing, healthcare, and field services requiring immersive experience as well as AT&T, an existing client, we found this as an opportunity to build our capabilities and extend our service offerings in this niche area. To reduce our dependencies on third party vendors, we set up an internal team and related processes.",
        roles:
          "Roles Recruited: 3D Artist, Animators Unity Developers, and XR Leads with relevant skills",
        tools:
          "Tool Involved: 3D Max, Maya, Blender, Unity, Different AR VR Plugins, 3D Plugins, High end machines with GPU, testing devices, VR headsets etc.",
        solution:
          "Solution: Our AR/VR/XR team has designed solutions that enable learners to learn, explore and troubleshoot problems, by experiencing real life scenarios in an immersive environment. We provided solutions that help learners on how to interact with customers, work safely in confined spaces and in hazardous situations. We also created POCs to showcase for perspective clients as our capability.",
        outro:
          "Here’s a brief overview of our journey in establishing AR/VR as a core capability and enabling our team to deliver projects seamlessly.",
        tokens: [
          "Templates",
          "Trainings",
          "Asset Library",
          "Infrastructure",
          "Development",
          "Estimation",
          "Proposals",
          "Storyboards",
          "PM plans",
          "Headset Comparison",
          "Headset customization",
          "Onboarding",
          "eLearning domain",
          "User Experience",
          "Built reusable modular assets",
          "scripts for faster development cycles",
          "Platform targets",
          "device matrix",
          "Test workflows",
          "POCs for different domains",
          "AT&T Projects"
        ]
      },
      {
        number: 28,
        chromeTitle: "XR / AR / VR Samples",
        title: "XR/AR/VR Samples",
        kicker: "Immersive application samples",
        kind: "xrSamples",
        samples: [
          {
            title: "Equipment Installation PoC (Web App)",
            image: pptxMedia("image92.png"),
            details: [
              "An app designed to instruct technicians on how to install a Honeywell C300 operations controller.",
              "It offers an experience of simulated environment for equipment installation, providing users with valuable skills and confidence for real-world scenarios.",
              "Similar instructive learning apps can be integrated to a VR headset experience to allow for a much more immersive learning experience."
            ]
          },
          {
            title: "Portable fire extinguisher awareness (VR)",
            image: "assets/media/image23.png",
            details: [
              "A virtual reality (VR) application designed to make AT&T employees aware of different types of fire extinguishers.",
              "The app gives immersive experience of a fire situation and a short scenario training of how to handle the same."
            ]
          },
          {
            title: "The AT&T Fiber Network (AR)",
            image: pptxMedia("image93.png"),
            details: [
              "An Augmented Reality (AR) course designed to provide field technicians with improved understanding of the network, impairments, safety measures, and related skills.",
              "It offers an immersive environment to comprehend the intricate details of fiber impairments and their effects, the TRUE Fiber tests’ interpretations and the relationship between different network elements."
            ]
          },
          {
            title: "Wind Turbine PoC Mobile/Web",
            image: pptxMedia("image94.png"),
            details: [
              "The model was designed in 3D AR/VR to showcase our capability to Shell.",
              "The model offers an experience to look at the various components of the wind turbines in a safe environment.",
              "This also includes the details of the different parts of wind turbines."
            ]
          }
        ]
      }
    );

    return [...normalized, ...supplementalSlides].sort((a, b) => a.number - b.number);
  }

  const slides = normalizeDeckData(rawDeckData);
  const slidesByNumber = new Map(slides.map((item) => [item.number, item]));
  const slide = (number) => slidesByNumber.get(number);

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttr(value) {
    return escapeHtml(value);
  }

  function formatCurrency(value) {
    return currency0.format(value ?? 0);
  }

  function formatPercent(value) {
    return percent1.format(value ?? 0);
  }

  function pad(number) {
    return String(number).padStart(2, "0");
  }

  function buildNarrative() {
    const hero = slide(1);
    const financial = slide(2);
    const xdt = slide(3);
    const dealValue = slide(4);
    const invoicing = slide(5);
    const newClients = slide(6);
    const winMetrics = slide(7);
    const trend = slide(8);
    const achievements = slide(9);
    const innovation = slide(10);
    const innovationEdge = slide(11);
    const innovationEdgeMore = slide(12);
    const inHouse = slide(13);
    const automation = slide(14);
    const automationCases = slide(15);
    const questGenius = slide(16);
    const xrAi = slide(17);
    const aiInAction = slide(18);
    const clientImpact = slide(19);
    const testimonials = slide(20);
    const aiPocA = slide(22);
    const aiPocB = slide(23);
    const uxFoundation = slide(25);
    const uxSamples = slide(26);
    const xrFoundation = slide(27);
    const xrSamples = slide(28);
    const growthBridge = slide(29);
    const challenges = slide(30);
    const strategy = slide(31);
    const closing = slide(32);

    const topInvoicing = invoicing.entries.slice(0, 5);
    const topDealValue = dealValue.entries.slice(0, 5);
    const selectedObservations = [
      trend.observations[0],
      trend.observations[1],
      trend.observations[2],
      trend.observations[3],
      trend.observations[5],
      trend.observations[6]
    ];

    const buildCaseCards = (slideNumber, cases) =>
      cases.map((item, index) => ({
        title: item.title,
        topic: item.topic || "",
        bullets: item.bullets || [],
        metaLine: item.metaLine || "",
        image: item.image,
        buttonLabel: "Demo",
        href: demoLinksBySlide[slideNumber]?.[index] || ""
      }));

    const innovationSections = [
      {
        id: "innovation-edge",
        title: innovationEdge.title,
        cards: buildCaseCards(11, innovationEdge.cases)
      },
      {
        id: "innovation-edge-contd",
        title: innovationEdgeMore.title,
        cards: buildCaseCards(12, innovationEdgeMore.cases)
      },
      {
        id: "in-house-capabilities",
        title: inHouse.title,
        cards: buildCaseCards(13, inHouse.cases)
      }
    ];

    const proofSections = [
      {
        id: "automation-use-cases",
        title: automationCases.title,
        cards: buildCaseCards(15, automationCases.cases)
      },
      {
        id: "ai-in-action",
        title: aiInAction.title,
        cards: buildCaseCards(18, aiInAction.cases)
      },
      {
        id: "uiux-samples",
        title: uxSamples.title,
        cards: [
          {
            title: "Pep University Main portal",
            text: uxSamples.description,
            image: uxSamples.images[0],
            buttonLabel: uxSamples.ctas[0],
            href: demoLinksBySlide[26]?.[0] || ""
          },
          {
            title: "Pep U | Myeducation",
            text: uxSamples.description,
            image: uxSamples.images[1],
            buttonLabel: uxSamples.ctas[1],
            href: demoLinksBySlide[26]?.[1] || ""
          },
          {
            title: "Franchise Onboarding",
            text: uxSamples.description,
            image: uxSamples.images[2],
            buttonLabel: uxSamples.ctas[2],
            href: demoLinksBySlide[26]?.[2] || ""
          }
        ]
      },
      {
        id: "xr-samples",
        title: xrSamples.title,
        cards: xrSamples.samples.map((sample, index) => ({
          title: sample.title,
          bullets: sample.details,
          image: sample.image,
          buttonLabel: "Demo",
          href: demoLinksBySlide[28]?.[index] || ""
        }))
      }
    ];

    return [
      {
        id: "opening",
        label: "Opening",
        title: hero.title,
        tone: "dark",
        template: "hero",
        data: { hero }
      },
      {
        id: "financial-performance",
        label: "Financial Performance",
        title: financial.title,
        tone: "light",
        template: "financial",
        data: {
          financial,
          xdt,
          newClients,
          winMetrics,
          kpis: [
            {
              label: financial.panels[0].label,
              value: financial.panels[0].points[4].value,
              note: financial.panels[0].points[4].label
            },
            {
              label: financial.panels[1].label,
              value: financial.panels[1].points[4].value,
              note: financial.panels[1].points[4].label
            },
            {
              label: "Total Won",
              value: winMetrics.revenueWon[2].amount,
              note: "Revenue Won | FY’26"
            }
          ]
        }
      },
      {
        id: "revenue-quality",
        label: "Revenue Quality",
        title: dealValue.title,
        tone: "dark",
        template: "concentration",
        data: {
          dealValue,
          invoicing,
          topInvoicing,
          topDealValue,
          takeaway: "New clients replacing old ones, but not always at same scale."
        }
      },
      {
        id: "what-changed",
        label: "What Changed",
        title: trend.title,
        tone: "light",
        template: "observations",
        data: {
          trend,
          achievements,
          selectedObservations
        }
      },
      {
        id: "growth-themes",
        label: "Growth Themes",
        title: innovation.title,
        tone: "dark",
        template: "themes",
        data: {
          innovation,
          automation,
          xrAi,
          innovationSections,
          moreProof: [
            ...innovationEdge.cases,
            ...innovationEdgeMore.cases,
            ...inHouse.cases
          ]
        }
      },
      {
        id: "capability-proof",
        label: "Capability Proof",
        title: xrAi.title,
        tone: "light",
        template: "capabilities",
        data: {
          proofSections,
          aiPocA,
          aiPocB,
          uxFoundation,
          xrFoundation,
          automation,
          questGenius
        }
      },
      {
        id: "next-steps",
        label: "Next Steps",
        title: strategy.title,
        tone: "dark",
        template: "close",
        data: {
          clientImpact,
          testimonials,
          growthBridge,
          challenges,
          strategy,
          closing,
          featuredStories: [clientImpact.stories[0], clientImpact.stories[1], clientImpact.stories[4]],
          featuredQuote: testimonials.quotes[0],
          implications: [
            {
              title: "Expand predictable revenue",
              items: [strategy.items[0], growthBridge.items[0], strategy.items[4]]
            },
            {
              title: "Increase delivery speed and margin",
              items: [strategy.items[1], strategy.items[2], growthBridge.items[1]]
            },
            {
              title: "Differentiate and convert",
              items: [strategy.items[3], strategy.items[5], strategy.items[6]]
            }
          ]
        }
      }
    ];
  }

  const chapters = buildNarrative();

  function renderNarrative() {
    presentationRoot.innerHTML = chapters.map((chapter, index) => renderChapter(chapter, index)).join("");
  }

  function renderChapter(chapter, index) {
    const content = {
      hero: () => renderHeroChapter(chapter),
      financial: () => renderFinancialChapter(chapter, index),
      concentration: () => renderConcentrationChapter(chapter, index),
      observations: () => renderObservationChapter(chapter, index),
      themes: () => renderThemeChapter(chapter, index),
      capabilities: () => renderCapabilitiesChapter(chapter, index),
      close: () => renderCloseChapter(chapter, index)
    }[chapter.template]();

    return `
      <section
        class="chapter chapter--${escapeAttr(chapter.template)} chapter--${escapeAttr(chapter.tone)}"
        id="${escapeAttr(chapter.id)}"
        data-label="${escapeAttr(chapter.label)}"
        data-tone="${escapeAttr(chapter.tone)}"
        data-index="${index}"
      >
        ${content}
      </section>`;
  }

  function renderChapterShell(index, title) {
    return `
      <div class="wrap">
        <div class="chapter-band grid-12" data-reveal>
          <div class="chapter-band__meta">
            <span class="chapter-band__index">${pad(index + 1)}</span>
          </div>
          <div class="chapter-band__copy">
            <h2 class="chapter-band__title">${stylizeTitle(title)}</h2>
          </div>
        </div>
      </div>`;
  }

  function renderHeroChapter(chapter) {
    const { hero } = chapter.data;

    return `
      ${
        hero.backgroundVideo
          ? `<div class="hero__media" aria-hidden="true">
              <video class="hero__video" autoplay muted loop playsinline preload="auto">
                <source src="${escapeAttr(hero.backgroundVideo)}" type="video/mp4">
              </video>
            </div>`
          : ""
      }
      <div class="wrap hero">
        <div class="hero__grid grid-12">
          <div class="hero__copy" data-reveal>
            ${hero.brandImage ? `<div class="hero__brandmark"><img src="${escapeAttr(hero.brandImage)}" alt="Aptara"></div>` : ""}
            <p class="hero__marker">${escapeHtml(hero.kicker)}</p>
            <h1 class="hero__title" aria-label="${escapeAttr(hero.title)}">${renderHeroTitle(hero.title)}</h1>
            <p class="hero__framing">ENT Digital Presentation</p>
            <div class="hero__scrollcue" data-reveal>
              <span>Scroll to begin</span>
            </div>
          </div>
          <div class="hero__visual" aria-hidden="true">
            <span class="hero__visual-orb hero__visual-orb--a"></span>
            <span class="hero__visual-orb hero__visual-orb--b"></span>
            <span class="hero__visual-ring hero__visual-ring--a"></span>
            <span class="hero__visual-ring hero__visual-ring--b"></span>
            <span class="hero__visual-line hero__visual-line--a"></span>
            <span class="hero__visual-line hero__visual-line--b"></span>
          </div>
          <div class="hero__meta" data-reveal>
            <div class="hero__meta-block">
              <span class="hero__meta-name">${escapeHtml(hero.presenter)}</span>
              <span class="hero__meta-role">${escapeHtml(hero.role)}</span>
            </div>
            <div class="hero__meta-block">
              <span class="hero__meta-date">${escapeHtml(hero.date)}</span>
            </div>
          </div>
        </div>
      </div>`;
  }

  function renderHeroTitle(title) {
    if (title === "ENT: FY’26 Performance & FY’27 Growth Strategy") {
      return `
        <span class="hero__line hero__line--lead">ENT:</span>
        <span class="hero__line">FY’26 Performance</span>
        <span class="hero__line">&amp; FY’27 Growth</span>
        <span class="hero__line hero__line--accent">Strategy</span>`;
    }

    return stylizeTitle(title);
  }

  function renderFinancialChapter(chapter, index) {
    const { financial, xdt, newClients, winMetrics, kpis } = chapter.data;

    return `
      ${renderChapterShell(index, chapter.title)}
      <div class="wrap">
        <div class="finance-kpis grid-12" data-reveal>
          ${kpis
            .map(
              (kpi) => `
                <article class="metric metric--core">
                  <span class="metric__label">${escapeHtml(kpi.label)}</span>
                  <strong class="metric__value">${escapeHtml(formatCurrency(kpi.value))}</strong>
                  <span class="metric__note">${escapeHtml(kpi.note)}</span>
                </article>`
            )
            .join("")}
        </div>

        <div class="finance-visual grid-12" data-reveal>
          <div class="finance-visual__chart">
            <div class="finance-visual__intro">
              <p class="section-caption">${escapeHtml(xdt.shareTitle)}</p>
            </div>
            <div class="financial-react-mount" data-financial-chart-app hidden></div>
            <div class="financial-fallback" data-financial-chart-fallback>
              ${renderFinancialExplorer(financial, xdt, winMetrics)}
            </div>
          </div>
          <div class="finance-visual__annotations">
            <article class="annotation-line">
              <span class="annotation-line__label">${escapeHtml(xdt.absoluteTitle)}</span>
              <strong>${escapeHtml(formatPercent(xdt.xdtGrowth[xdt.xdtGrowth.length - 1]))}</strong>
            </article>
            <article class="annotation-line">
              <span class="annotation-line__label">New Clients Addition</span>
              <strong>${escapeHtml(formatCurrency(newClients.total))}</strong>
            </article>
            <article class="annotation-line">
              <span class="annotation-line__label">Avg. Deal Size Won | FY’26</span>
              <strong>${escapeHtml(formatCurrency(winMetrics.avgDealSize[2].amount))}</strong>
            </article>
          </div>
        </div>

        ${renderDetailDrawer(
          "View detailed financials",
          `
            <div class="financial-react-mount" data-financial-detail-app hidden></div>
            <div class="financial-fallback" data-financial-detail-fallback>
              ${renderFinancialDetailExplorer(financial, xdt, newClients, winMetrics)}
            </div>`
        )}
      </div>`;
  }

  function renderConcentrationChapter(chapter, index) {
    const { dealValue, invoicing, topInvoicing, topDealValue, takeaway } = chapter.data;
    const leader = topInvoicing[0];
    const secondary = topInvoicing.slice(1);

    return `
      ${renderChapterShell(index, chapter.title)}
      <div class="wrap concentration">
        <div class="concentration__grid grid-12">
          <div class="concentration__copy" data-reveal>
            <p class="section-kicker">${escapeHtml(invoicing.subheading)}</p>
            <h3 class="concentration__title">${escapeHtml(leader.client)}</h3>
            <p class="concentration__hero-value">${escapeHtml(formatCurrency(leader.amount))}</p>
            <p class="concentration__takeaway">${escapeHtml(takeaway)}</p>
            <div class="concentration__quiet-note">
              <span>${escapeHtml(dealValue.subheading)}</span>
              <strong>${escapeHtml(topDealValue[0].client)} · ${escapeHtml(formatCurrency(topDealValue[0].amount))}</strong>
            </div>
          </div>
          <div class="concentration__rankings" data-reveal>
            <ol class="rank-list">
              ${secondary
                .map((entry, idx) => {
                  const scale = (entry.amount / leader.amount) * 100;
                  return `
                    <li class="rank-list__item">
                      <div class="rank-list__meta">
                        <span class="rank-list__index">${pad(idx + 2)}</span>
                        <span class="rank-list__name">${escapeHtml(entry.client)}</span>
                      </div>
                      <strong class="rank-list__value">${escapeHtml(formatCurrency(entry.amount))}</strong>
                      <span class="rank-list__bar"><span style="width:${scale.toFixed(1)}%"></span></span>
                    </li>`;
                })
                .join("")}
            </ol>
          </div>
        </div>

        ${renderDetailDrawer(
          "View full client rankings",
          `
            <div class="drawer-columns">
              <div class="drawer-block">
                <h3>${escapeHtml(dealValue.subheading)}</h3>
                ${renderMatrixTable(
                  ["Rank", "Client", "Amount"],
                  dealValue.entries.map((entry, idx) => [pad(idx + 1), entry.client, formatCurrency(entry.amount)])
                )}
              </div>
              <div class="drawer-block">
                <h3>${escapeHtml(invoicing.subheading)}</h3>
                ${renderMatrixTable(
                  ["Rank", "Client", "Amount"],
                  invoicing.entries.map((entry, idx) => [pad(idx + 1), entry.client, formatCurrency(entry.amount)])
                )}
              </div>
            </div>`
        )}
      </div>`;
  }

  function renderObservationChapter(chapter, index) {
    const { trend, achievements, selectedObservations } = chapter.data;

    return `
      ${renderChapterShell(index, chapter.title)}
      <div class="wrap observations">
        <div class="observations__grid grid-12">
          <div class="observations__lead" data-reveal>
            <p class="observations__lede">${escapeHtml(trend.keyMessage)}</p>
          </div>
          <div class="observations__list" data-reveal>
            ${selectedObservations
              .map(
                (item, idx) => `
                  <article class="observation">
                    <span class="observation__index">${pad(idx + 1)}</span>
                    <p class="observation__text">${escapeHtml(item)}</p>
                  </article>`
              )
              .join("")}
          </div>
        </div>

        ${renderDetailDrawer(
          "Read supporting detail",
          `
            <div class="drawer-stack">
              <div class="drawer-block">
                <h3>${escapeHtml(trend.title)}</h3>
                ${renderMatrixTable(
                  ["Client", ...trend.years],
                  trend.rows.map((row) => [row.client, ...row.values.map((value) => formatCurrency(value))])
                )}
              </div>
              <div class="drawer-block">
                <h3>${escapeHtml(achievements.title)}</h3>
                <ul class="detail-list detail-list--stacked">
                  ${achievements.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                </ul>
              </div>
            </div>`
        )}
      </div>`;
  }

  function renderThemeChapter(chapter, index) {
    const { innovationSections, innovation, automation, xrAi, moreProof } = chapter.data;

    return `
      ${renderChapterShell(index, chapter.title)}
      <div class="wrap themes">
        <div class="demo-section-stack">
          ${innovationSections
            .map((section, idx) => renderDemoSection(`innovation-${idx + 1}`, section, "dark"))
            .join("")}
        </div>

        ${renderDetailDrawer(
          "Open full opportunity proof",
          `
            <div class="drawer-columns">
              <div class="drawer-block">
                <h3>${escapeHtml(innovation.title)}</h3>
                <ul class="detail-list">
                  ${innovation.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                </ul>
                <h3>${escapeHtml(automation.title)}</h3>
                <ul class="detail-list">
                  ${automation.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                </ul>
                <h3>${escapeHtml(xrAi.title)}</h3>
                <ul class="detail-list">
                  ${xrAi.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                </ul>
              </div>
              <div class="drawer-block">
                <h3>Additional Proof</h3>
                <ul class="detail-list detail-list--stacked">
                  ${moreProof.map((item) => `<li>${escapeHtml(item.title)}</li>`).join("")}
                </ul>
              </div>
            </div>`
        )}
      </div>`;
  }

  function renderCapabilitiesChapter(chapter, index) {
    const { proofSections, aiPocA, aiPocB, uxFoundation, xrFoundation, automation, questGenius } = chapter.data;

    return `
      ${renderChapterShell(index, chapter.title)}
      <div class="wrap capabilities">
        <div class="demo-section-stack demo-section-stack--light">
          ${proofSections.map((section, idx) => renderDemoSection(`proof-${idx + 1}`, section, "light")).join("")}
        </div>

        ${renderDetailDrawer(
          "Open additional capability proof",
          `
            <div class="drawer-stack">
              <div class="drawer-columns">
                <div class="drawer-block">
                  <h3>${escapeHtml(aiPocA.title)}</h3>
                  <ul class="detail-list">
                    ${aiPocA.items
                      .map(
                        (item) => `
                          <li>
                            <strong>${escapeHtml(item.lead)}</strong>
                            <ul class="detail-sublist">
                              ${item.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join("")}
                            </ul>
                          </li>`
                      )
                      .join("")}
                  </ul>
                </div>
                <div class="drawer-block">
                  <h3>${escapeHtml(aiPocB.title)}</h3>
                  <ul class="detail-list">
                    ${aiPocB.items
                      .map(
                        (item) => `
                          <li>
                            <strong>${escapeHtml(item.lead)}</strong>
                            <ul class="detail-sublist">
                              ${item.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join("")}
                            </ul>
                          </li>`
                      )
                      .join("")}
                  </ul>
                </div>
              </div>
              <div class="drawer-columns">
                <div class="drawer-block">
                  <h3>${escapeHtml(automation.title)}</h3>
                  <ul class="detail-list detail-list--stacked">
                    ${automation.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                  </ul>
                  <h3>${escapeHtml(questGenius.title)}</h3>
                  <p class="detail-paragraph">${escapeHtml(questGenius.headline)}</p>
                  <ul class="detail-list detail-list--stacked">
                    ${questGenius.points.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                  </ul>
                </div>
                <div class="drawer-block">
                  <h3>${escapeHtml(uxFoundation.title)}</h3>
                  <p class="detail-paragraph">${escapeHtml(uxFoundation.businessNeed)}</p>
                  <p class="detail-paragraph">${escapeHtml(uxFoundation.solution)}</p>
                  <h3>${escapeHtml(xrFoundation.title)}</h3>
                  <p class="detail-paragraph">${escapeHtml(xrFoundation.businessNeed)}</p>
                  <p class="detail-paragraph">${escapeHtml(xrFoundation.solution)}</p>
                </div>
              </div>
            </div>`
        )}
      </div>`;
  }

  function renderCloseChapter(chapter, index) {
    const { featuredStories, featuredQuote, implications, clientImpact, testimonials, challenges, strategy, growthBridge, closing } =
      chapter.data;

    return `
      ${renderChapterShell(index, chapter.title)}
      <div class="wrap final-chapter">
        <div class="validation-strip grid-12" data-reveal>
          <div class="validation-strip__stories">
            ${featuredStories
              .map(
                (story) => `
                  <article class="validation-story">
                    <img src="${escapeAttr(story.logo)}" alt="${escapeAttr(story.client)}">
                    <div class="validation-story__copy">
                      <strong>${escapeHtml(story.client)}</strong>
                      <p>${escapeHtml(story.lines[0])}</p>
                    </div>
                  </article>`
              )
              .join("")}
          </div>
          <blockquote class="quote-pull">
            <p>${escapeHtml(featuredQuote.quote)}</p>
            <footer>${escapeHtml(featuredQuote.client)}</footer>
          </blockquote>
        </div>

        <div class="implication-grid" data-reveal>
          ${implications
            .map(
              (group) => `
                <article class="implication">
                  <h3>${escapeHtml(group.title)}</h3>
                  <ul class="detail-list detail-list--stacked">
                    ${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                  </ul>
                </article>`
            )
            .join("")}
        </div>

        <div class="closing-lockup" data-reveal>
          <p class="closing-lockup__eyebrow">${escapeHtml(closing.kicker)}</p>
          <h2 class="closing-lockup__title">${escapeHtml(closing.title)}</h2>
          <p class="closing-lockup__meta">${escapeHtml(slide(1).presenter)} | ${escapeHtml(slide(1).role)} | ${escapeHtml(slide(1).date)}</p>
        </div>

        ${renderDetailDrawer(
          "Open validation archive",
          `
            <div class="drawer-stack">
              <div class="drawer-block">
                <h3>${escapeHtml(clientImpact.title)}</h3>
                <div class="archive-grid">
                  ${clientImpact.stories
                    .map(
                      (story) => `
                        <article class="archive-story">
                          <img src="${escapeAttr(story.logo)}" alt="${escapeAttr(story.client)}">
                          <div>
                            <strong>${escapeHtml(story.client)}</strong>
                            <ul class="detail-list detail-list--stacked">
                              ${story.lines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
                            </ul>
                          </div>
                        </article>`
                    )
                    .join("")}
                  <ul class="detail-list detail-list--stacked">
                    ${clientImpact.detailTrail.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                  </ul>
                </div>
              </div>
              <div class="drawer-columns">
                <div class="drawer-block">
                  <h3>${escapeHtml(testimonials.title)}</h3>
                  <ul class="detail-list detail-list--stacked">
                    ${testimonials.quotes
                      .map(
                        (item) => `
                          <li>
                            <strong>${escapeHtml(item.client)}</strong>
                            <span>${escapeHtml(item.quote)}</span>
                          </li>`
                      )
                      .join("")}
                  </ul>
                </div>
                <div class="drawer-block">
                  <h3>${escapeHtml(challenges.title)}</h3>
                  <ul class="detail-list detail-list--stacked">
                    ${challenges.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                  </ul>
                  <h3>${escapeHtml(growthBridge.title)}</h3>
                  <ul class="detail-list detail-list--stacked">
                    ${growthBridge.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                  </ul>
                  <h3>${escapeHtml(strategy.title)}</h3>
                  <ul class="detail-list detail-list--stacked">
                    ${strategy.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                  </ul>
                </div>
              </div>
            </div>`
        )}
      </div>`;
  }

  function renderPerformanceChart(revenuePoints, xdtShare) {
    const width = 1100;
    const height = 420;
    const top = 44;
    const right = 48;
    const bottom = 80;
    const left = 38;
    const chartWidth = width - left - right;
    const chartHeight = height - top - bottom;
    const maxRevenue = Math.max(...revenuePoints.map((point) => point.value)) * 1.08;
    const step = chartWidth / revenuePoints.length;
    const barWidth = step * 0.58;

    const linePoints = revenuePoints
      .map((point, index) => {
        const x = left + step * index + step / 2;
        const y = top + chartHeight - xdtShare[index] * chartHeight;
        return `${x},${y}`;
      })
      .join(" ");

    const bars = revenuePoints
      .map((point, index) => {
        const x = left + step * index + (step - barWidth) / 2;
        const barHeight = (point.value / maxRevenue) * chartHeight;
        const y = top + chartHeight - barHeight;
        return `
          <g>
            <rect class="chart-bar" x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="10" ry="10"></rect>
            <text class="chart-value" x="${x + barWidth / 2}" y="${y - 10}" text-anchor="middle">${escapeHtml(
              formatCurrency(point.value)
            )}</text>
            <text class="chart-label" x="${x + barWidth / 2}" y="${height - 26}" text-anchor="middle">${escapeHtml(
              point.label
            )}</text>
          </g>`;
      })
      .join("");

    const markers = revenuePoints
      .map((point, index) => {
        const x = left + step * index + step / 2;
        const y = top + chartHeight - xdtShare[index] * chartHeight;
        return `
          <g>
            <circle class="chart-dot" cx="${x}" cy="${y}" r="5"></circle>
            ${
              index === revenuePoints.length - 1
                ? `<text class="chart-share" x="${x}" y="${y - 14}" text-anchor="middle">${escapeHtml(
                    formatPercent(xdtShare[index])
                  )}</text>`
                : ""
            }
          </g>`;
      })
      .join("");

    return `
      <svg class="performance-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Revenue trend and XDT contribution chart">
        <defs>
          <linearGradient id="barGradient" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stop-color="rgba(16, 33, 54, 0.92)"></stop>
            <stop offset="100%" stop-color="rgba(16, 33, 54, 0.18)"></stop>
          </linearGradient>
          <linearGradient id="lineGradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stop-color="#b9894c"></stop>
            <stop offset="100%" stop-color="#1d5c63"></stop>
          </linearGradient>
        </defs>
        <text class="chart-heading" x="${left}" y="18">Revenue</text>
        <text class="chart-heading chart-heading--right" x="${width - right}" y="18" text-anchor="end">XDT Contribution</text>
        <line class="chart-baseline" x1="${left}" y1="${top + chartHeight}" x2="${width - right}" y2="${top + chartHeight}"></line>
        ${bars}
        <polyline class="chart-line" points="${linePoints}"></polyline>
        ${markers}
      </svg>`;
  }

  function renderFinancialExplorer(financial, xdt, winMetrics) {
    return `
      <div class="finance-explorer" data-financial-explorer>
        <div class="finance-explorer__toolbar">
          <div class="finance-explorer__copy">
            <p class="finance-explorer__eyebrow" data-financial-kicker>Revenue & EBITDA</p>
            <p class="finance-explorer__caption" data-financial-caption>Interactive performance view across FY’22–FY’26.</p>
          </div>
          <div class="finance-explorer__tabs" role="tablist" aria-label="Financial chart views">
            <button class="finance-explorer__tab is-active" type="button" data-financial-view="overview" aria-selected="true">Overview</button>
            <button class="finance-explorer__tab" type="button" data-financial-view="mix" aria-selected="false">Mix Shift</button>
            <button class="finance-explorer__tab" type="button" data-financial-view="wins" aria-selected="false">Deal Quality</button>
          </div>
        </div>
        <div class="finance-explorer__panels">
          <section class="finance-explorer__panel is-active" data-financial-panel="overview">
            ${renderPerformanceChart(financial.panels[0].points, xdt.xdtGrowth)}
          </section>
          <section class="finance-explorer__panel" data-financial-panel="mix" hidden>
            ${renderMixShiftChart(xdt)}
          </section>
          <section class="finance-explorer__panel" data-financial-panel="wins" hidden>
            ${renderWinQualityChart(winMetrics)}
          </section>
        </div>
      </div>`;
  }

  function renderMixShiftChart(xdt) {
    const width = 1100;
    const height = 420;
    const top = 36;
    const right = 52;
    const bottom = 72;
    const left = 42;
    const chartWidth = width - left - right;
    const chartHeight = height - top - bottom;
    const totals = xdt.years.map((_, idx) => xdt.absoluteSeries.reduce((sum, series) => sum + series.values[idx], 0));
    const maxTotal = Math.max(...totals) * 1.08;
    const step = chartWidth / xdt.years.length;
    const barWidth = step * 0.48;

    const shareLine = xdt.years
      .map((_, index) => {
        const x = left + step * index + step / 2;
        const y = top + chartHeight - xdt.shareSeries[1].values[index] * chartHeight;
        return `${x},${y}`;
      })
      .join(" ");

    const bars = xdt.years
      .map((year, index) => {
        const x = left + step * index + (step - barWidth) / 2;
        let currentY = top + chartHeight;

        const stack = xdt.absoluteSeries
          .map((series, seriesIndex) => {
            const value = series.values[index];
            const segmentHeight = (value / maxTotal) * chartHeight;
            currentY -= segmentHeight;
            const radius =
              seriesIndex === 0
                ? "0 0 10 10"
                : seriesIndex === xdt.absoluteSeries.length - 1
                  ? "10 10 0 0"
                  : "0 0 0 0";

            return `
              <g>
                <rect x="${x}" y="${currentY}" width="${barWidth}" height="${segmentHeight}" rx="10" ry="10" fill="${["#d9d6ce", "#245a61", "#8ea1d6"][seriesIndex]}"></rect>
                <title>${escapeHtml(`${year} · ${series.name}: ${formatCurrency(value)}`)}</title>
              </g>`;
          })
          .join("");

        return `
          <g>
            ${stack}
            <text class="chart-label" x="${x + barWidth / 2}" y="${height - 24}" text-anchor="middle">${escapeHtml(year)}</text>
          </g>`;
      })
      .join("");

    const markers = xdt.years
      .map((year, index) => {
        const x = left + step * index + step / 2;
        const y = top + chartHeight - xdt.shareSeries[1].values[index] * chartHeight;
        return `
          <g>
            <circle class="chart-dot" cx="${x}" cy="${y}" r="5"></circle>
            <title>${escapeHtml(`${year} · XDT Contribution: ${formatPercent(xdt.shareSeries[1].values[index])}`)}</title>
          </g>`;
      })
      .join("");

    return `
      <svg class="performance-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="XDT revenue mix shift chart">
        <text class="chart-heading" x="${left}" y="18">Revenue Mix</text>
        <text class="chart-heading chart-heading--right" x="${width - right}" y="18" text-anchor="end">XDT Contribution</text>
        <line class="chart-baseline" x1="${left}" y1="${top + chartHeight}" x2="${width - right}" y2="${top + chartHeight}"></line>
        ${bars}
        <polyline class="chart-line" points="${shareLine}"></polyline>
        ${markers}
      </svg>`;
  }

  function renderWinQualityChart(winMetrics) {
    const revenueMax = Math.max(...winMetrics.revenueWon.map((entry) => entry.amount));
    const avgMax = Math.max(...winMetrics.avgDealSize.map((entry) => entry.amount));

    return `
      <div class="finance-split-charts finance-split-charts--static">
        <article class="finance-mini-chart finance-mini-chart--static">
          <div class="finance-mini-chart__header">
            <p class="finance-mini-chart__title">Revenue Won</p>
          </div>
          <div class="finance-mini-chart__rows">
            ${winMetrics.revenueWon
              .map(
                (entry) => `
                  <div class="finance-row-bar">
                    <div class="finance-row-bar__meta">
                      <span>${escapeHtml(entry.label)}</span>
                      <strong>${escapeHtml(formatCurrency(entry.amount))}</strong>
                    </div>
                    <span class="finance-row-bar__track"><span style="width:${((entry.amount / revenueMax) * 100).toFixed(1)}%"></span></span>
                  </div>`
              )
              .join("")}
          </div>
        </article>
        <article class="finance-mini-chart finance-mini-chart--static">
          <div class="finance-mini-chart__header">
            <p class="finance-mini-chart__title">Avg. Deal Size</p>
          </div>
          <div class="finance-mini-chart__rows">
            ${winMetrics.avgDealSize
              .map(
                (entry) => `
                  <div class="finance-row-bar">
                    <div class="finance-row-bar__meta">
                      <span>${escapeHtml(entry.label)}</span>
                      <strong>${escapeHtml(formatCurrency(entry.amount))}</strong>
                    </div>
                    <span class="finance-row-bar__track"><span style="width:${((entry.amount / avgMax) * 100).toFixed(1)}%"></span></span>
                  </div>`
              )
              .join("")}
          </div>
        </article>
      </div>`;
  }

  function renderFinancialDetailExplorer(financial, xdt, newClients, winMetrics) {
    const yearlyRows = financial.panels[0].points.map((point, idx) => ({
      year: point.label,
      revenue: point.value,
      ebitda: financial.panels[1].points[idx].value
    }));

    const mixRows = xdt.years.map((year, idx) => ({
      year,
      fixedBid: xdt.absoluteSeries[0].values[idx],
      xdt: xdt.absoluteSeries[1].values[idx],
      tm: xdt.absoluteSeries[2].values[idx],
      xdtContribution: xdt.shareSeries[1].values[idx]
    }));

    const newClientRows = newClients.entries.map((entry) => ({
      client: entry.client,
      amount: entry.amount
    }));

    const dealRows = [
      ...winMetrics.revenueWon.map((entry) => ({
        measure: "Revenue Won",
        segment: entry.label,
        amount: entry.amount
      })),
      ...winMetrics.avgDealSize.map((entry) => ({
        measure: "Avg. Deal Size",
        segment: entry.label,
        amount: entry.amount
      }))
    ];

    return `
      <div class="financial-detail-explorer" data-financial-detail>
        <div class="financial-detail-explorer__tabs" role="tablist" aria-label="Detailed financial views">
          <button class="financial-detail-explorer__tab is-active" type="button" data-financial-detail-view="yearly" aria-selected="true">Yearly Financials</button>
          <button class="financial-detail-explorer__tab" type="button" data-financial-detail-view="mix" aria-selected="false">XDT Growth</button>
          <button class="financial-detail-explorer__tab" type="button" data-financial-detail-view="clients" aria-selected="false">New Clients</button>
          <button class="financial-detail-explorer__tab" type="button" data-financial-detail-view="wins" aria-selected="false">Deal Quality</button>
        </div>
        ${renderInteractiveTable(
          "yearly",
          "Yearly Financials",
          [
            { key: "year", label: "Year", type: "text" },
            { key: "revenue", label: "Revenue", type: "number", formatter: "currency" },
            { key: "ebitda", label: "EBITDA", type: "number", formatter: "currency" }
          ],
          yearlyRows
        )}
        ${renderInteractiveTable(
          "mix",
          "XDT Growth",
          [
            { key: "year", label: "Year", type: "text" },
            { key: "fixedBid", label: "Fixed Bid", type: "number", formatter: "currency" },
            { key: "xdt", label: "XDT", type: "number", formatter: "currency" },
            { key: "tm", label: "T&M", type: "number", formatter: "currency" },
            { key: "xdtContribution", label: "XDT Contribution", type: "number", formatter: "percent" }
          ],
          mixRows,
          true
        )}
        ${renderInteractiveTable(
          "clients",
          newClients.title,
          [
            { key: "client", label: "Client", type: "text" },
            { key: "amount", label: "Amount", type: "number", formatter: "currency" }
          ],
          newClientRows,
          true
        )}
        ${renderInteractiveTable(
          "wins",
          winMetrics.title,
          [
            { key: "measure", label: "Measure", type: "text" },
            { key: "segment", label: "Segment", type: "text" },
            { key: "amount", label: "Amount", type: "number", formatter: "currency" }
          ],
          dealRows,
          true
        )}
      </div>`;
  }

  function renderInteractiveTable(id, title, columns, rows, hidden = false) {
    return `
      <section class="table-explorer" data-financial-detail-panel="${escapeAttr(id)}"${hidden ? " hidden" : ""}>
        <div class="table-explorer__toolbar">
          <div>
            <p class="table-explorer__title">${escapeHtml(title)}</p>
            <p class="table-explorer__meta">${escapeHtml(String(rows.length))} rows</p>
          </div>
          <label class="table-explorer__search">
            <span class="visually-hidden">Search ${escapeHtml(title)}</span>
            <input type="search" placeholder="Search" data-financial-table-search>
          </label>
        </div>
        <div class="table-explorer__surface">
          <div class="table-explorer__scroll">
            <table class="interactive-table" data-sort-direction="desc" data-sort-key="${escapeAttr(columns[0].key)}">
              <thead>
                <tr>
                  ${columns
                    .map(
                      (column) => `
                        <th class="${column.type === "number" ? "is-right" : ""}">
                          <button type="button" data-financial-sort="${escapeAttr(column.key)}" data-sort-type="${escapeAttr(column.type)}">
                            <span>${escapeHtml(column.label)}</span>
                            <span>↕</span>
                          </button>
                        </th>`
                    )
                    .join("")}
                </tr>
              </thead>
              <tbody>
                ${rows
                  .map((row) => {
                    const searchText = Object.values(row).join(" ").toLowerCase();
                    return `
                      <tr data-search="${escapeAttr(searchText)}">
                        ${columns
                          .map((column) => {
                            const value = row[column.key];
                            const display =
                              column.formatter === "currency"
                                ? formatCurrency(value)
                                : column.formatter === "percent"
                                  ? formatPercent(value)
                                  : String(value);
                            return `<td class="${column.type === "number" ? "is-right" : ""}" data-key="${escapeAttr(column.key)}" data-sort="${escapeAttr(
                              String(value)
                            )}">${escapeHtml(display)}</td>`;
                          })
                          .join("")}
                      </tr>`;
                  })
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
      </section>`;
  }

  function renderDemoSection(id, section, tone = "light") {
    return `
      <section class="demo-section demo-section--${escapeAttr(tone)}" id="${escapeAttr(id)}" data-reveal>
        <div class="demo-section__layout grid-12">
          <div class="demo-section__header">
            <h3 class="demo-section__title">${stylizeTitle(section.title)}</h3>
          </div>
          <div class="demo-section__stage">
            ${renderDemoGrid(section.cards, tone)}
          </div>
        </div>
      </section>`;
  }

  function renderDemoGrid(items, tone = "light") {
    return `
      <div class="demo-grid demo-grid--${escapeAttr(tone)}">
          ${items
            .map(
              (item) => `
                <article class="demo-card demo-card--${escapeAttr(tone)}">
                  <div class="demo-card__media">
                    <img src="${escapeAttr(item.image)}" alt="${escapeAttr(item.title)}">
                  </div>
                  <div class="demo-card__body">
                    ${item.topic ? `<p class="demo-card__topic">${escapeHtml(item.topic)}</p>` : ""}
                    <strong class="demo-card__title">${escapeHtml(item.title)}</strong>
                    ${
                      Array.isArray(item.bullets) && item.bullets.length
                        ? `<ul class="demo-card__bullets">${item.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>`
                        : `<p class="demo-card__text">${escapeHtml(item.text || "")}</p>`
                    }
                    ${item.metaLine ? `<p class="demo-card__meta">${escapeHtml(item.metaLine)}</p>` : ""}
                  </div>
                  ${
                    item.href
                      ? `<a class="demo-card__button" href="${escapeAttr(item.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(
                          item.buttonLabel || "Demo"
                        )}</a>`
                      : ""
                  }
                </article>`
            )
            .join("")}
      </div>`;
  }

  function renderMatrixTable(headers, rows) {
    return `
      <div class="table-scroll">
        <table class="matrix-table">
          <thead>
            <tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${rows
              .map(
                (row) => `
                  <tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>`;
  }

  function renderDetailDrawer(label, content) {
    return `
      <details class="detail-drawer" data-reveal>
        <summary class="detail-drawer__summary">${escapeHtml(label)}</summary>
        <div class="detail-drawer__body">${content}</div>
      </details>`;
  }

  function stylizeTitle(text) {
    const accentRules = new Map([
      ["ENT Financial Overview – (FY’22 – FY’26)", [{ token: "(FY’22 – FY’26)", variant: "year" }]],
      ["FY’26 – YTD - Enterprise Closed – Top 10 Clients", [{ token: "Top 10 Clients" }]],
      ["ENT – Top 10 Client Trend Analysis (FY’21–FY’26)", [{ token: "(FY’21–FY’26)", variant: "year" }]],
      ["Innovation Investments", [{ token: "Investments" }]],
      ["Innovation Edge", [{ token: "Edge" }]],
      ["Innovation Edge (Contd.)", [{ token: "Edge" }]],
      ["In-House Capabilities", [{ token: "Capabilities" }]],
      ["AR/VR/XR & AI Capabilities Built", [{ token: "Capabilities Built" }]],
      ["AI in Action", [{ token: "Action" }]],
      ["UI/UX Design Services: Samples", [{ token: "Samples" }]],
      ["XR/AR/VR Samples", [{ token: "Samples" }]],
      [
        "FY’27 Strategy to Achieve Budget",
        [{ token: "Strategy" }, { token: "Achieve Budget" }]
      ]
    ]);

    const rules = accentRules.get(text);
    if (!rules) {
      return escapeHtml(text);
    }

    let cursor = 0;
    let output = "";
    let matchedAny = false;

    for (const rule of rules) {
      const start = text.indexOf(rule.token, cursor);
      if (start === -1) {
        continue;
      }

      matchedAny = true;
      output += escapeHtml(text.slice(cursor, start));
      const variantClass = rule.variant ? ` title-accent--${rule.variant}` : "";
      output += `<span class="title-accent${variantClass}">${escapeHtml(rule.token)}</span>`;
      cursor = start + rule.token.length;
    }

    if (!matchedAny) {
      return escapeHtml(text);
    }

    output += escapeHtml(text.slice(cursor));
    return output;
  }

  function buildTableOfContents() {
    tocBody.innerHTML = chapters
      .map(
        (chapter, index) => `
          <button class="toc-link" type="button" data-target="${escapeAttr(chapter.id)}">
            <span class="toc-link__index">${pad(index + 1)}</span>
            <span class="toc-link__copy">
              <span class="toc-link__label">${escapeHtml(chapter.label)}</span>
              <span class="toc-link__title">${escapeHtml(chapter.title)}</span>
            </span>
          </button>`
      )
      .join("");

    tocBody.querySelectorAll("[data-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = document.getElementById(button.dataset.target);
        closeToc();
        if (target) {
          target.scrollIntoView({ behavior: reducedMotionQuery.matches ? "auto" : "smooth", block: "start" });
        }
      });
    });
  }

  function openToc() {
    document.body.classList.add("is-toc-open");
    tocPanel.setAttribute("aria-hidden", "false");
    tocToggle.setAttribute("aria-expanded", "true");
    tocScrim.hidden = false;
  }

  function closeToc() {
    document.body.classList.remove("is-toc-open");
    tocPanel.setAttribute("aria-hidden", "true");
    tocToggle.setAttribute("aria-expanded", "false");
    tocScrim.hidden = true;
  }

  function bindToc() {
    tocToggle?.addEventListener("click", () => {
      if (document.body.classList.contains("is-toc-open")) {
        closeToc();
      } else {
        openToc();
      }
    });

    tocClose?.addEventListener("click", closeToc);
    tocScrim?.addEventListener("click", closeToc);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeToc();
      }
    });
  }

  function bindTabs() {
    document.querySelectorAll("[data-tabset]").forEach((tabset) => {
      const buttons = [...tabset.querySelectorAll("[data-tab-button]")];
      const panels = [...tabset.querySelectorAll("[data-tab-panel]")];

      const activate = (id) => {
        buttons.forEach((button) => {
          const active = button.dataset.tabButton === id;
          button.classList.toggle("is-active", active);
          button.setAttribute("aria-selected", active ? "true" : "false");
        });

        panels.forEach((panel) => {
          const active = panel.dataset.tabPanel === id;
          panel.classList.toggle("is-active", active);
          panel.hidden = !active;
        });

        requestAnimationFrame(() => {
          window.dispatchEvent(new Event("resize"));
        });
      };

      buttons.forEach((button) => {
        button.addEventListener("click", () => activate(button.dataset.tabButton));
      });
    });
  }

  function bindCarousels() {
    document.querySelectorAll("[data-carousel]").forEach((carousel) => {
      const viewport = carousel.querySelector("[data-carousel-viewport]");
      const prev = carousel.querySelector("[data-carousel-prev]");
      const next = carousel.querySelector("[data-carousel-next]");

      if (!viewport || !prev || !next) {
        return;
      }

      const getStep = () => {
        const firstCard = viewport.querySelector(".sample-card");
        if (!firstCard) {
          return viewport.clientWidth * 0.85;
        }

        const styles = window.getComputedStyle(viewport);
        const gapValue = parseFloat(styles.columnGap || styles.gap || "0");
        return firstCard.getBoundingClientRect().width + gapValue;
      };

      const updateState = () => {
        const maxScroll = viewport.scrollWidth - viewport.clientWidth - 4;
        prev.disabled = viewport.scrollLeft <= 4;
        next.disabled = viewport.scrollLeft >= maxScroll;
      };

      prev.addEventListener("click", () => {
        viewport.scrollBy({
          left: -getStep(),
          behavior: reducedMotionQuery.matches ? "auto" : "smooth"
        });
      });

      next.addEventListener("click", () => {
        viewport.scrollBy({
          left: getStep(),
          behavior: reducedMotionQuery.matches ? "auto" : "smooth"
        });
      });

      viewport.addEventListener("scroll", updateState, { passive: true });
      window.addEventListener("resize", updateState);
      updateState();
    });
  }

  function bindFinancialExplorers() {
    const viewMeta = {
      overview: {
        kicker: "Revenue & EBITDA",
        caption: "Interactive performance view across FY’22–FY’26."
      },
      mix: {
        kicker: "XDT Growth",
        caption: "Compare the revenue mix and XDT contribution over time."
      },
      wins: {
        kicker: "Deal Quality",
        caption: "See revenue won and average deal size together."
      }
    };

    document.querySelectorAll("[data-financial-explorer]").forEach((explorer) => {
      const tabs = [...explorer.querySelectorAll("[data-financial-view]")];
      const panels = [...explorer.querySelectorAll("[data-financial-panel]")];
      const kicker = explorer.querySelector("[data-financial-kicker]");
      const caption = explorer.querySelector("[data-financial-caption]");

      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          const target = tab.dataset.financialView;
          tabs.forEach((button) => {
            const active = button === tab;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-selected", active ? "true" : "false");
          });

          panels.forEach((panel) => {
            const active = panel.dataset.financialPanel === target;
            panel.hidden = !active;
            panel.classList.toggle("is-active", active);
          });

          if (kicker && viewMeta[target]) {
            kicker.textContent = viewMeta[target].kicker;
          }

          if (caption && viewMeta[target]) {
            caption.textContent = viewMeta[target].caption;
          }
        });
      });
    });
  }

  function bindFinancialDetailTables() {
    document.querySelectorAll("[data-financial-detail]").forEach((detail) => {
      const tabs = [...detail.querySelectorAll("[data-financial-detail-view]")];
      const panels = [...detail.querySelectorAll("[data-financial-detail-panel]")];

      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          const target = tab.dataset.financialDetailView;
          tabs.forEach((button) => {
            const active = button === tab;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-selected", active ? "true" : "false");
          });

          panels.forEach((panel) => {
            const active = panel.dataset.financialDetailPanel === target;
            panel.hidden = !active;
          });
        });
      });
    });

    document.querySelectorAll("[data-financial-table-search]").forEach((input) => {
      input.addEventListener("input", () => {
        const panel = input.closest("[data-financial-detail-panel]");
        if (!panel) {
          return;
        }

        const query = input.value.trim().toLowerCase();
        panel.querySelectorAll("tbody tr").forEach((row) => {
          row.hidden = query ? !row.dataset.search.includes(query) : false;
        });
      });
    });

    document.querySelectorAll("[data-financial-sort]").forEach((button) => {
      button.addEventListener("click", () => {
        const table = button.closest("table");
        if (!table) {
          return;
        }

        const key = button.dataset.financialSort;
        const sortType = button.dataset.sortType || "text";
        const currentKey = table.dataset.sortKey;
        const currentDirection = table.dataset.sortDirection || "desc";
        const nextDirection = currentKey === key && currentDirection === "desc" ? "asc" : "desc";
        const rows = [...table.querySelectorAll("tbody tr")];

        rows.sort((a, b) => {
          const aCell = a.querySelector(`[data-key="${key}"]`);
          const bCell = b.querySelector(`[data-key="${key}"]`);
          const aValue = aCell?.dataset.sort ?? "";
          const bValue = bCell?.dataset.sort ?? "";

          if (sortType === "number") {
            return nextDirection === "asc" ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
          }

          return nextDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        });

        const tbody = table.querySelector("tbody");
        rows.forEach((row) => tbody.appendChild(row));
        table.dataset.sortKey = key;
        table.dataset.sortDirection = nextDirection;

        table.querySelectorAll("th button span:last-child").forEach((icon) => {
          icon.textContent = "↕";
          icon.classList.remove("is-active");
        });

        const icon = button.querySelector("span:last-child");
        if (icon) {
          icon.textContent = nextDirection === "asc" ? "↑" : "↓";
          icon.classList.add("is-active");
        }
      });
    });
  }

  function bindRevealObserver() {
    const revealTargets = [...document.querySelectorAll("[data-reveal]")];
    if (!revealTargets.length) {
      return;
    }

    if (reducedMotionQuery.matches) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    revealTargets.forEach((target) => observer.observe(target));
  }

  function bindSectionObserver() {
    const sections = [...document.querySelectorAll(".chapter")];
    if (!sections.length) {
      return;
    }

    const tocLinks = [...tocBody.querySelectorAll(".toc-link")];

    const updateActiveSection = () => {
      const trigger = window.innerHeight * 0.24;
      let active = sections[0];

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= trigger) {
          active = section;
        }
      });

      currentSectionLabel.textContent = active.dataset.label || "";
      document.body.dataset.tone = active.dataset.tone || "dark";
      document.body.dataset.section = active.id || "";

      tocLinks.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.target === active.id);
      });

      if (liveRegion) {
        liveRegion.textContent = active.dataset.label || "";
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
  }

  function bindProgress() {
    const update = () => {
      const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = window.scrollY / scrollable;
      progressBar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  function bindBackToTop() {
    if (!backToTop) {
      return;
    }

    const updateVisibility = () => {
      const visible = window.scrollY > Math.max(window.innerHeight * 0.85, 520);
      backToTop.classList.toggle("is-visible", visible);
      backToTop.setAttribute("aria-hidden", visible ? "false" : "true");
    };

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: reducedMotionQuery.matches ? "auto" : "smooth"
      });
    });

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
  }

  function handleInitialHash() {
    const hash = window.location.hash.replace("#", "");
    if (!hash) {
      return;
    }

    const target = document.getElementById(hash);
    if (!target) {
      return;
    }

    const syncToTarget = () => {
      currentSectionLabel.textContent = target.dataset.label || currentSectionLabel.textContent;
      document.body.dataset.tone = target.dataset.tone || document.body.dataset.tone || "dark";
      document.body.dataset.section = target.id || document.body.dataset.section || "";
      target.scrollIntoView({
        behavior: "auto",
        block: "start"
      });
    };

    requestAnimationFrame(syncToTarget);
    window.setTimeout(syncToTarget, 180);
  }

  async function initFinancialInteractives() {
    return Promise.resolve();
  }

  renderNarrative();
  buildTableOfContents();
  bindToc();
  bindTabs();
  bindCarousels();
  bindFinancialExplorers();
  bindFinancialDetailTables();
  bindRevealObserver();
  bindSectionObserver();
  bindProgress();
  bindBackToTop();
  handleInitialHash();
  initFinancialInteractives();
})();
