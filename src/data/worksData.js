const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getDateSortKey(dateStr) {
  const [monthStr, yearStr] = (dateStr || "").trim().split(" ");
  const month = monthNames.findIndex((m) => m === monthStr) + 1;
  const year = parseInt(yearStr, 10) || 0;
  return year * 100 + month; 
}

const worksDataRaw = [
  {
    id: "01",
    title: "Quizcypher: a simple Quiz App",
    date: "May 2025",
    category: "Web App",
    desc: [
      "Quizcypher is a web-based quiz application designed to deliver an interactive and responsive quiz experience with a clean and modern user interface. The application consumes data from the Open Trivia DB API to provide dynamic, randomized quiz questions across multiple categories and difficulty levels.",
      "The app features a countdown timer for each question, real-time answer validation, and instant feedback to enhance user engagement and challenge. The UI is built using Tailwind CSS to ensure consistency, responsiveness, and fast performance across devices.",
      "Quizcypher also includes authentication features such as login and registration, implemented using local storage to manage user sessions and persist user data on the client side. While it does not rely on a backend server, this approach allows users to experience basic authentication flows and protected routes within the application.",
      "From a technical perspective, the codebase is structured using reusable React components and custom hooks to manage application state, API calls, and quiz logic efficiently. This modular architecture improves maintainability, scalability, and readability of the code. Overall, Quizcypher demonstrates practical implementation of modern React patterns, client-side authentication, API integration, and UI-focused performance optimization.",
    ],
    mainImage: "/works_detail/main/quizc.svg",
    link: {
      route: "/projects/quizcypher",
      github: "https://github.com/umlittlethings/Quizcipher", 
    },
    techStack: [
      "/works_detail/stack/React.svg",
      "/works_detail/stack/JavaScript.svg",
      "/works_detail/stack/Tailwind.svg",
    ],
  },
  {
    id: "02",
    title: "TemuDataku (Reimagined): a SaaS Data Catalog Platform",
    date: "June 2025",
    category: "Web App",
    desc: ["TemuDataku is a recreated web platform built to simulate a data science mentoring and practice ecosystem. This project was developed as a learning and portfolio recreation, focusing on implementing real-world features such as authentication, protected routes, and full-stack architecture—rather than as a production or commercial product.",
    "The application demonstrates a complete user flow, starting from a public landing page (FAQ, testimonials, and marketing content) to a secured learning area accessible only to authenticated users. JWT-based authentication is implemented for user registration and login, with route protection ensuring that only logged-in users can access the mentoring, practice, and bootcamp catalogs.",
    "On the frontend, the platform is built using React (Vite) and Tailwind CSS, emphasizing performance and user experience. Features such as responsive UI, lazy rendering, and scroll-based animations are implemented to simulate modern SaaS behavior and optimize rendering performance.",
    "The backend is developed with Node.js and Express, using PostgreSQL for data persistence and node-postgres (pg) for database interaction. The system includes structured database migration scripts to initialize the database and core tables (users, mentoring, practice, and bootcamp), reflecting real-world backend setup practices.",
    "TemuDataku showcases the ability to recreate and understand end-to-end system design, authentication flows, and frontend–backend integration within a limited timeframe.",
    "Fun fact: This project was fully recreated and completed in 3 days 🚀"],
    mainImage: "/works_detail/main/td.svg",
    link: {
      route: "/projects/temudataku",
      github: "https://github.com/umlittlethings/Temudataku_Reimagined", 
    },
    techStack: [
      "/works_detail/stack/React.svg",
      "/works_detail/stack/Tailwind.svg",
      "/works_detail/stack/node.svg",
      "/works_detail/stack/postgresql-plain.svg",
      "/works_detail/stack/express.svg",
    ],
  },
  {
    id: "03",
    title: "SETARA: CSR for the Disability Community",
    date: "May 2025",
    category: "Mobile App",
    desc: [
      "Developed the backend of SETARA, a mobile application designed to support Corporate Social Responsibility (CSR) programs for the disability community. The system focuses on enabling organizations to manage inclusive CSR initiatives while ensuring accessibility and reliable data delivery for end users.",
      "Responsible for designing and implementing core backend logic to support application features, user interactions, and data workflows. Integrated Supabase to handle authentication, secure API access, and real-time database operations, enabling instant data updates across the application.",
      "Designed and managed relational database schemas using PostgreSQL, ensuring efficient data modeling, scalability, and optimized query performance. Implemented real-time data synchronization to provide seamless user experiences with live updates and minimal latency.",
      "Collaborated with cross-functional teams throughout the development lifecycle, contributing to system design, implementation, and quality assurance. The project was awarded as the Best Capstone Project, recognizing its technical quality, social impact, and successful execution."
    ],
    mainImage: "/works_detail/main/str.svg",
    link: {
      route: "/projects/setaraapp",
    },
    techStack: [
      "/works_detail/stack/Kotlin.svg",
      "/works_detail/stack/sb.svg",
    ],
  },
  {
    id: "04",
    title: "HealthDetectWear: WearOS Heart Rate Monitor",
    date: "September 2025",
    category: "Mobile App",
    desc: ["Developed a full-stack real-time health analytics system integrating Wear OS smartwatches, Android mobile, and backend services as part of a professional internship program. Successfully achieved end-to-end real-time data transmission with an average latency of <100 ms, enabling instant synchronization of health sensor data from smartwatch to backend APIs.",
      "Designed and implemented RESTful APIs using Node.js, Express.js, and PostgreSQL to support Framingham Risk Score, ASCVD Risk Assessment, and Nutrition Scoring. Optimized API execution and database queries, resulting in faster response times and stable performance during continuous data streaming.",
      "Improved overall system performance through payload optimization, efficient data processing, and query tuning, ensuring zero perceptible delay during real-time data delivery. Validated system reliability under continuous sensor updates, maintaining consistent low-latency communication between Wear OS, mobile client, and backend services.",
      "This project demonstrates proven experience in performance optimization, real-time system design, and wearable-to-backend integration, with measurable results delivered in a professional internship environment."
    ],
    mainImage: [
      "/works_detail/main/hd1.svg",
      "/works_detail/main/hd2.svg",
    ],
    link: {
      route: "/projects/healthdetectwear",
      
    },
    techStack: [
      "/works_detail/stack/Kotlin.svg",
      "/works_detail/stack/node.svg",
      "/works_detail/stack/JavaScript.svg",
      "/works_detail/stack/postgresql-plain.svg",
      "/works_detail/stack/express.svg",
    ],
  },
  {
    id: "05",
    title: "Whiskerwise: Virtual Pet Simulator",
    date: "April 2025",
    category: "Web App",
    desc: "Developed an interactive virtual pet simulation game where players take care of a digital cat named Felix, managing actions such as feeding, playing, and resting. Built using modern JavaScript (ES6 Modules) and RxJS to implement reactive state management and event-driven interactions, resulting in smooth and responsive gameplay.",
    mainImage: [
      "/works_detail/main/ww.svg",
    ],
    link: {
      route: "/projects/whiskerwise",
      github: "https://github.com/umlittlethings/WhiskerWise",
      
    },
    techStack: [
      "/works_detail/stack/JavaScript.svg",
      "/works_detail/stack/rx.svg",
      "/works_detail/stack/html.svg",
      "/works_detail/stack/css.svg",
    ],
  },
  {
    id: "06",
    title: "CalmSpace: Mental Wellness Mobile App",
    date: "December 2024",
    category: "Mobile App",
    desc: ["Developed a mobile application focused on mental well-being and self-care, providing users with accessible tools to support emotional health and daily mindfulness practices.",
      "Built the application using Kotlin for Android, implementing both frontend UI and backend logic within a single mobile architecture. Integrated Firebase Authentication for secure user access, Firestore for real-time data storage and synchronization, and Firebase Storage for managing media uploads.",
      "Key features include mood tracking, daily mental health tips, personal journaling, and well-being progress tracking, all designed with a calming and user-friendly UI/UX to promote a positive mental health experience.",
      "This project strengthened my skills in full-stack mobile development, real-time data-driven systems, and user-centered design for health-focused applications."
    ],
    mainImage: [
      "/works_detail/main/cs.svg",
    ],
    link: {
      route: "/projects/calmspace",
      github: "https://github.com/pisjad/papb-calmspace",
      
    },
    techStack: [
      "/works_detail/stack/Kotlin.svg",
      "/works_detail/stack/firebase-plain.svg",

    ],
  },
  {
    id: "07",
    title: "SAMPAH.IN: Smart Neighborhood Waste Management Platform",
    date: "August 2025",
    category: "Web App",
    desc: ["Built Sampah.in, a web-based platform designed to support real-time, data-driven waste management at the neighborhood level. The system helps residents, field officers, and administrators record, monitor, and analyze waste data more efficiently.",
      "Worked primarily on the backend development using Node.js, Express.js, and MySQL, while also assisting with frontend API integration. Implemented core features including citizen waste reporting, real-time dashboards for cleaners and administrators, notifications, and automated monthly reports to support better operational and policy decisions.",
      "The platform provides analytical dashboards displaying aggregated waste statistics such as waste volume, active officers, report counts, and waste collection points, enabling stakeholders to monitor conditions and take action based on real-time data. Sampah.in demonstrates practical experience in building full-stack web applications, handling real-time data workflows, and developing systems with direct environmental and social impact."
    ],
    mainImage: [
      "/works_detail/main/si.svg",
    ],
    link: {
      route: "/projects/sampahin",
      github: "https://sampahin-three.vercel.app/",
      
    },
    techStack: [
      "/works_detail/stack/node.svg",
      "/works_detail/stack/JavaScript.svg",
      "/works_detail/stack/mysql-plain-wordmark.svg",

    ],
  },
  {
    id: "08",
    title: "DILAN: Inclusive UI Design for AI-Based Learning",
    date: "October 2024",
    category: "Design / UI",
    desc: ["This application is a personalized, AI-based learning platform designed to support individuals with dyslexia and dysgraphia in improving their reading and writing skills. By integrating speech recognition technology, the app enables interactive learning experiences with real-time feedback, helping users practice literacy skills in a way that adapts to their individual needs and learning pace. The user interface is designed to be simple, calming, and accessible, minimizing cognitive load and creating a comfortable learning environment.",
      "Reading and writing are fundamental literacy skills that play a crucial role in lifelong learning and personal development. However, individuals with dyslexia and dysgraphia often face challenges in traditional learning environments due to limited accessibility and lack of personalized support. This application aims to address these challenges by providing inclusive and technology-driven learning tools that align with global education initiatives such as SDG 4 (Quality Education), supporting equal access to education and improving learning effectiveness for individuals with disabilities.",
    ],
    mainImage: [
      "/works_detail/main/dl.svg",
    ],
    link: {
      route: "/projects/dilan",
      github: "https://www.figma.com/proto/0421q9KD5HTJ8ZjJbREfKQ/Dilan---Untitled?page-id=1%3A2&node-id=60-1288&node-type=frame&viewport=971%2C1375%2C0.2&t=abUYgTzZv8wb9Iuv-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=175%3A6281",
      
    },
    techStack: [
      "/works_detail/stack/Figma.svg",

    ],
  },
  {
    id: "09",
    title: "HealthDetect API",
    date: "July 2025",
    category: "Backend & API",
    desc: ["HealthDetect API is a backend service built to support the HealthDetect ecosystem, providing reliable and modular health analytics for cardiovascular risk assessment and nutritional evaluation. The API is designed to calculate Framingham and ASCVD heart disease risk scores, as well as comprehensive nutrition and energy metrics including BMI, ideal body weight, BMR, TEE, and daily macronutrient needs.",
      "Built with Node.js and Express, the API follows a RESTful architecture with clean and modular code separation (routes, controllers, services, and utilities), making it easy to maintain and extend. User data is centrally managed and relationally connected to both risk assessment and nutrition records, enabling consistent data synchronization across mobile and web clients.",
      "The system supports full CRUD operations for risk and nutrition data, includes CORS configuration for seamless frontend and mobile integration, and is optimized to act as a scalable backend foundation for real-time health monitoring and analytics within the HealthDetect platform."
    ],
    mainImage: [
      "/works_detail/main/hdapi.svg",
    ],
    link: {
      route: "/projects/HealthDetectAPI",
      github: "https://github.com/umlittlethings/HealthDetect_api",
      
    },
    techStack: [
      "/works_detail/stack/node.svg",
      "/works_detail/stack/express.svg",
      "/works_detail/stack/postgresql-plain.svg"

    ],
  },
  {
    id: "10",
    title: "SampahIn API",
    date: "July 2025",
    category: "Backend & API",
    desc: "Sampah.in API is a backend service that supports the Sampah.in platform by enabling real-time waste data management at the neighborhood level. Built using Node.js and Express, the API handles core functionalities such as citizen waste reports, field officer data input, notifications, and aggregated analytics for dashboards. It is designed with a clean and modular structure to manage relational data efficiently, support real-time updates, and provide reliable endpoints that can be easily consumed by web or mobile clients for monitoring, reporting, and decision-making.",
    mainImage: [
      "/works_detail/main/sph.svg",
    ],
    link: {
      route: "/projects/SampahInAPI",
      github: "https://github.com/umlittlethings/SampahIn_API",
      
    },
    techStack: [
      "/works_detail/stack/node.svg",
      "/works_detail/stack/express.svg",
      "/works_detail/stack/mysql-plain-wordmark.svg"

    ],
  },
  {
    id: "11",
    title: "GAWE: UI Design for UMKM Service Marketplace",
    date: "August 2024",
    category: "Design / UI",
    desc: "GAWE is a service marketplace application designed to connect UMKM service providers and consumers in one integrated platform. As a UI Designer, I designed a user-centered interface based on the Design Thinking process (Empathise, Define, Ideate, Prototype, and Testing), starting from user interviews with UMKM owners and consumers to understand real pain points such as limited time to find services and difficulties in reaching customers. These insights were translated into intuitive user flows, wireframes, and prototypes that prioritize accessibility, clarity, and ease of use, enabling consumers to find services quickly while helping UMKM manage orders and service schedules more effectively, in line with GAWE’s vision: “Bersama GAWE, membangun negeri.”",
    mainImage: [
      "/works_detail/main/gw.svg",
    ],
    link: {
      route: "/projects/gaweapp",
      github: "https://www.figma.com/proto/xqER2n4ih4Qlt5F0lYp0MN/Cuxion?page-id=0%3A1&node-id=8-1239&starting-point-node-id=8%3A1239&t=7XcpFLdAVfNMkyuD-1",
      
    },
    techStack: [
      "/works_detail/stack/Figma.svg",

    ],
  },
];


export const worksData = [...worksDataRaw].sort(
  (a, b) => getDateSortKey(b.date) - getDateSortKey(a.date)
);