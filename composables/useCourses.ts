import { ref, computed } from 'vue'

export interface Course {
  id: string
  title: string
  slug: string
  category: string
  price: number
  original_price: number
  duration: string
  level: string
  description: string
  editor_email: string
  editor_name: string
  enrolled_count: number
  rating: number
  status: 'Published' | 'Draft' | 'Archived'
  badge?: string
  tags?: string[]
}

export const INITIAL_30_COURSES: Course[] = [
  {
    id: 'c-01',
    title: 'Full-Stack PHP 8.3 & Modern MVC Frameworks (Laravel & CodeIgniter)',
    slug: 'php-fullstack-laravel',
    category: 'Web Development',
    price: 4999,
    original_price: 9999,
    duration: '8 Weeks (80 Hrs)',
    level: 'Beginner to Advanced',
    description: 'Master PHP 8.3 fundamentals, Object-Oriented Architecture, MySQL database normalization, Composer, REST APIs, and enterprise web application development with Laravel 11.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'Lead Web Architect',
    enrolled_count: 142,
    rating: 4.9,
    status: 'Published',
    badge: 'Popular',
    tags: ['PHP', 'Laravel', 'MySQL', 'MVC', 'OOP']
  },
  {
    id: 'c-02',
    title: 'WordPress Core, Custom Theme & Plugin Engineering',
    slug: 'wordpress-theme-plugin-dev',
    category: 'CMS & E-Commerce',
    price: 3999,
    original_price: 7999,
    duration: '6 Weeks (60 Hrs)',
    level: 'Beginner to Intermediate',
    description: 'Build enterprise custom WordPress themes, custom post types, Gutenberg blocks, and commercial WooCommerce extensions from scratch with hooks and PHP.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'WordPress Solutions Architect',
    enrolled_count: 188,
    rating: 4.8,
    status: 'Published',
    badge: 'Best Value',
    tags: ['WordPress', 'PHP', 'WooCommerce', 'Gutenberg']
  },
  {
    id: 'c-03',
    title: 'MERN Stack Engineering (MongoDB, Express, React 19, Node.js)',
    slug: 'mern-stack-engineering',
    category: 'Web Development',
    price: 6999,
    original_price: 12999,
    duration: '10 Weeks (100 Hrs)',
    level: 'Intermediate',
    description: 'End-to-end multi-tenant web application development with React 19, Node.js, Express, MongoDB aggregation pipelines, JWT authentication, and Docker deployment.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'Lead Full-Stack Engineer',
    enrolled_count: 245,
    rating: 4.9,
    status: 'Published',
    badge: 'Bestseller',
    tags: ['React', 'Node.js', 'MongoDB', 'Express']
  },
  {
    id: 'c-04',
    title: 'Vue 3 & Nuxt 3 Full-Stack Enterprise Architecture',
    slug: 'vue3-nuxt3-enterprise',
    category: 'Web Development',
    price: 6499,
    original_price: 11999,
    duration: '8 Weeks (80 Hrs)',
    level: 'Intermediate to Advanced',
    description: 'Server-Side Rendering (SSR), Nitro server engines, Pinia state management, Tailwind CSS, TypeScript, and high-performance production apps on Vercel.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'Frontend Architect',
    enrolled_count: 116,
    rating: 4.9,
    status: 'Published',
    badge: 'Featured',
    tags: ['Nuxt 3', 'Vue 3', 'SSR', 'TypeScript']
  },
  {
    id: 'c-05',
    title: 'Next.js 15 & React Server Components Production Architecture',
    slug: 'nextjs-production-architecture',
    category: 'Web Development',
    price: 7499,
    original_price: 13999,
    duration: '8 Weeks (80 Hrs)',
    level: 'Advanced',
    description: 'Next.js 15 App Router, React Server Components (RSC), Server Actions, Prisma ORM, streaming SSR, dynamic caching strategies, and Supabase integration.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'Senior Frontend Lead',
    enrolled_count: 194,
    rating: 4.9,
    status: 'Published',
    tags: ['Next.js', 'React', 'TypeScript', 'Prisma']
  },
  {
    id: 'c-06',
    title: 'Python for Web, Automation & Backend APIs (FastAPI & Django)',
    slug: 'python-web-apis-fastapi',
    category: 'Programming Languages',
    price: 5499,
    original_price: 10999,
    duration: '8 Weeks (80 Hrs)',
    level: 'All Levels',
    description: 'Modern asynchronous Python, Pydantic type validation, FastAPI high-performance microservices, Django ORM, background queues with Celery & Redis.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'Python Lead Specialist',
    enrolled_count: 310,
    rating: 4.9,
    status: 'Published',
    badge: 'High Demand',
    tags: ['Python', 'FastAPI', 'Django', 'Celery']
  },
  {
    id: 'c-07',
    title: 'Generative AI & LLM Systems Engineering (LangChain, Gemini & RAG)',
    slug: 'generative-ai-llm-engineering',
    category: 'AI & Machine Learning',
    price: 9999,
    original_price: 18999,
    duration: '10 Weeks (100 Hrs)',
    level: 'Advanced',
    description: 'Build production RAG pipelines, fine-tune embedding spaces, vector databases (Chroma, Pinecone), autonomous agent workflows, and Gemini 3.8 Live API.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'Principal AI Scientist',
    enrolled_count: 228,
    rating: 5.0,
    badge: 'Hot Technology',
    status: 'Published',
    tags: ['GenAI', 'LLM', 'LangChain', 'Gemini', 'RAG']
  },
  {
    id: 'c-08',
    title: 'Applied Machine Learning & Deep Learning with PyTorch',
    slug: 'machine-learning-pytorch',
    category: 'AI & Machine Learning',
    price: 8999,
    original_price: 16999,
    duration: '10 Weeks (100 Hrs)',
    level: 'Intermediate to Advanced',
    description: 'Supervised & unsupervised learning, CNNs, Transformers, PyTorch model training loops, Scikit-learn feature engineering, and model deployment.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'ML Research Engineer',
    enrolled_count: 175,
    rating: 4.8,
    status: 'Published',
    tags: ['PyTorch', 'Machine Learning', 'Deep Learning']
  },
  {
    id: 'c-09',
    title: 'Flutter & Dart Cross-Platform Mobile App Engineering',
    slug: 'flutter-dart-mobile-apps',
    category: 'Mobile Development',
    price: 5999,
    original_price: 11999,
    duration: '8 Weeks (80 Hrs)',
    level: 'Beginner to Intermediate',
    description: 'Build native iOS and Android apps with a single Flutter codebase. State management with Riverpod, offline caching, push notifications, and App Store releases.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'Mobile Solutions Architect',
    enrolled_count: 160,
    rating: 4.9,
    status: 'Published',
    tags: ['Flutter', 'Dart', 'Android', 'iOS', 'Riverpod']
  },
  {
    id: 'c-10',
    title: 'Native Android App Development with Kotlin & Jetpack Compose',
    slug: 'android-kotlin-jetpack-compose',
    category: 'Mobile Development',
    price: 6499,
    original_price: 12499,
    duration: '8 Weeks (80 Hrs)',
    level: 'Intermediate',
    description: 'Modern declarative Android UI with Jetpack Compose, Coroutines, Flow, MVVM architecture, Room database, and Google Play Console release practices.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'Android Tech Lead',
    enrolled_count: 135,
    rating: 4.8,
    status: 'Published',
    tags: ['Android', 'Kotlin', 'Jetpack Compose']
  },
  {
    id: 'c-11',
    title: 'iOS & iPadOS App Development with Swift & SwiftUI',
    slug: 'ios-swift-swiftui-apps',
    category: 'Mobile Development',
    price: 7999,
    original_price: 14999,
    duration: '8 Weeks (80 Hrs)',
    level: 'Intermediate',
    description: 'Modern iOS application development with SwiftUI, Swift Concurrency (async/await), CoreData, URLSession network layers, and App Store submission.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'iOS Staff Engineer',
    enrolled_count: 104,
    rating: 4.9,
    status: 'Published',
    tags: ['iOS', 'Swift', 'SwiftUI', 'Apple']
  },
  {
    id: 'c-12',
    title: 'DevOps Engineering (Docker, Kubernetes & CI/CD Pipelines)',
    slug: 'devops-docker-kubernetes-cicd',
    category: 'Cloud & DevOps',
    price: 8499,
    original_price: 15999,
    duration: '10 Weeks (100 Hrs)',
    level: 'Intermediate to Advanced',
    description: 'Containerization with Docker, multi-stage builds, Kubernetes pod orchestration, Helm charts, GitHub Actions automation, and Prometheus monitoring.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'Lead DevOps Architect',
    enrolled_count: 215,
    rating: 4.9,
    badge: 'Industry Essential',
    status: 'Published',
    tags: ['DevOps', 'Docker', 'Kubernetes', 'CI/CD']
  },
  {
    id: 'c-13',
    title: 'AWS Certified Cloud Solutions Architect & Serverless Systems',
    slug: 'aws-cloud-solutions-architect',
    category: 'Cloud & DevOps',
    price: 7999,
    original_price: 14999,
    duration: '8 Weeks (80 Hrs)',
    level: 'Intermediate',
    description: 'Architecting resilient cloud infrastructures on AWS: EC2, VPC networking, S3, RDS, Lambda serverless, API Gateway, IAM security policies, and cost optimization.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'AWS Certified Specialist',
    enrolled_count: 190,
    rating: 4.9,
    status: 'Published',
    tags: ['AWS', 'Cloud', 'Serverless', 'Lambda']
  },
  {
    id: 'c-14',
    title: 'Cyber Security & Ethical Hacking Industrial Bootcamp',
    slug: 'cybersecurity-ethical-hacking',
    category: 'Cybersecurity',
    price: 8999,
    original_price: 16999,
    duration: '10 Weeks (100 Hrs)',
    level: 'Beginner to Advanced',
    description: 'Network penetration testing, OWASP Top 10 web vulnerabilities, Burp Suite, Kali Linux tools, privilege escalation, SOC fundamentals, and incident reporting.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'Certified Security Analyst',
    enrolled_count: 182,
    rating: 4.9,
    badge: 'High Placement',
    status: 'Published',
    tags: ['Cybersecurity', 'Ethical Hacking', 'Penetration Testing']
  },
  {
    id: 'c-15',
    title: 'Shopify Store Development, Liquid Architecture & Custom Apps',
    slug: 'shopify-store-development-liquid',
    category: 'CMS & E-Commerce',
    price: 4499,
    original_price: 8999,
    duration: '6 Weeks (60 Hrs)',
    level: 'Beginner to Intermediate',
    description: 'Create high-converting e-commerce storefronts with Shopify CLI, Liquid templating language, theme customizations, checkout extensions, and GraphQL Storefront APIs.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'E-Commerce Tech Lead',
    enrolled_count: 120,
    rating: 4.8,
    status: 'Published',
    tags: ['Shopify', 'Liquid', 'E-Commerce']
  },
  {
    id: 'c-16',
    title: 'PostgreSQL Database Administration, High Availability & RLS Security',
    slug: 'postgresql-dba-security',
    category: 'Data Science & Databases',
    price: 4999,
    original_price: 9499,
    duration: '6 Weeks (60 Hrs)',
    level: 'Intermediate to Advanced',
    description: 'Deep dive into PostgreSQL query optimization, EXPLAIN ANALYZE, indexing strategies (B-Tree, GIN, BRIN), Row Level Security (RLS), replication, and Supabase integration.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'Database Administrator Lead',
    enrolled_count: 98,
    rating: 4.9,
    status: 'Published',
    tags: ['PostgreSQL', 'SQL', 'Databases', 'RLS']
  },
  {
    id: 'c-17',
    title: 'Data Analytics & Business Intelligence (SQL, Power BI & Tableau)',
    slug: 'data-analytics-power-bi-sql',
    category: 'Data Science & Databases',
    price: 5499,
    original_price: 10499,
    duration: '8 Weeks (80 Hrs)',
    level: 'All Levels',
    description: 'Extract business insights using advanced SQL (window functions, CTEs), transform data with Python Pandas, build interactive executive dashboards in Power BI and Tableau.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'Senior BI Consultant',
    enrolled_count: 210,
    rating: 4.8,
    status: 'Published',
    tags: ['Data Analytics', 'Power BI', 'SQL', 'Tableau']
  },
  {
    id: 'c-18',
    title: 'Golang Backend Microservices & gRPC High-Concurrency Systems',
    slug: 'golang-backend-microservices',
    category: 'Programming Languages',
    price: 7499,
    original_price: 13999,
    duration: '8 Weeks (80 Hrs)',
    level: 'Intermediate to Advanced',
    description: 'Build blazingly fast backend services with Go: goroutines, channels, memory management, gRPC protocol buffers, Gin web framework, and distributed caching with Redis.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'Go Systems Architect',
    enrolled_count: 129,
    rating: 4.9,
    status: 'Published',
    tags: ['Golang', 'Microservices', 'gRPC', 'Concurrency']
  },
  {
    id: 'c-19',
    title: 'Java Enterprise Systems & Spring Boot Microservices Architecture',
    slug: 'java-spring-boot-microservices',
    category: 'Web Development',
    price: 6999,
    original_price: 12999,
    duration: '10 Weeks (100 Hrs)',
    level: 'Intermediate to Advanced',
    description: 'Enterprise Java 21, Spring Boot 3, Spring Data JPA, Spring Security with OAuth2/JWT, RabbitMQ message brokers, and enterprise microservices patterns.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'Enterprise Java Lead',
    enrolled_count: 195,
    rating: 4.8,
    status: 'Published',
    tags: ['Java', 'Spring Boot', 'Microservices']
  },
  {
    id: 'c-20',
    title: 'C++ Systems Programming, Data Structures & Algorithms (DSA)',
    slug: 'cpp-systems-dsa-mastery',
    category: 'Programming Languages',
    price: 4999,
    original_price: 9999,
    duration: '8 Weeks (80 Hrs)',
    level: 'Beginner to Advanced',
    description: 'C++20 features, pointers, custom memory allocators, STL library internals, graph algorithms, dynamic programming, and competitive FAANG coding interview prep.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'Competitive Programming Lead',
    enrolled_count: 320,
    rating: 4.9,
    badge: 'Interview Prep',
    status: 'Published',
    tags: ['C++', 'DSA', 'Algorithms', 'Interview Prep']
  },
  {
    id: 'c-21',
    title: 'Rust Systems Engineering, Memory Safety & WebAssembly',
    slug: 'rust-systems-engineering-wasm',
    category: 'Programming Languages',
    price: 7999,
    original_price: 14999,
    duration: '8 Weeks (80 Hrs)',
    level: 'Advanced',
    description: 'Master Rust ownership, borrowing, lifetimes, fearless concurrency, Tokio async runtime, CLI tool building, and compiling high-speed modules to WebAssembly (Wasm).',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'Rust Core Engineer',
    enrolled_count: 92,
    rating: 5.0,
    status: 'Published',
    tags: ['Rust', 'WebAssembly', 'Async', 'Tokio']
  },
  {
    id: 'c-22',
    title: 'UI/UX Product Design with Figma, Prototyping & Design Systems',
    slug: 'ui-ux-figma-design-systems',
    category: 'Design & Creative',
    price: 3999,
    original_price: 7999,
    duration: '6 Weeks (60 Hrs)',
    level: 'All Levels',
    description: 'Design production-grade web & mobile applications in Figma. Auto-layout 5.0, design tokens, interactive component states, user research, wireframing, and developer handoff.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'Principal Product Designer',
    enrolled_count: 205,
    rating: 4.9,
    status: 'Published',
    tags: ['Figma', 'UI/UX', 'Design Systems', 'Product Design']
  },
  {
    id: 'c-23',
    title: 'Web3, Solidity & Smart Contract Blockchain Development',
    slug: 'web3-solidity-smart-contracts',
    category: 'Web Development',
    price: 8999,
    original_price: 16999,
    duration: '8 Weeks (80 Hrs)',
    level: 'Advanced',
    description: 'Ethereum Virtual Machine (EVM), Solidity smart contracts, Hardhat testing environment, OpenZeppelin security standards, DeFi mechanics, and Ethers.js integration.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'Blockchain Protocol Lead',
    enrolled_count: 85,
    rating: 4.7,
    status: 'Published',
    tags: ['Web3', 'Solidity', 'Blockchain', 'Ethereum']
  },
  {
    id: 'c-24',
    title: 'Software QA Automation (Selenium, Cypress & Playwright)',
    slug: 'software-qa-automation-testing',
    category: 'Testing & QA',
    price: 4999,
    original_price: 9499,
    duration: '6 Weeks (60 Hrs)',
    level: 'Beginner to Intermediate',
    description: 'Automate modern web and API testing with Playwright and Cypress. Page Object Models, headless CI integration, load testing with k6, and test execution reporting.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'QA Automation Lead',
    enrolled_count: 115,
    rating: 4.8,
    status: 'Published',
    tags: ['QA', 'Playwright', 'Cypress', 'Testing']
  },
  {
    id: 'c-25',
    title: 'Linux Systems Administration & Bash Shell Scripting Mastery',
    slug: 'linux-sysadmin-bash-scripting',
    category: 'Cloud & DevOps',
    price: 2999,
    original_price: 5999,
    duration: '4 Weeks (40 Hrs)',
    level: 'All Levels',
    description: 'Master the Linux terminal, user permissions, systemd services, SSH hardening, network troubleshooting with iptables/ufw, cron jobs, and production bash automation scripts.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'Linux Infrastructure Specialist',
    enrolled_count: 270,
    rating: 4.9,
    badge: 'Essential',
    status: 'Published',
    tags: ['Linux', 'Bash', 'SysAdmin', 'Terminal']
  },
  {
    id: 'c-26',
    title: 'GraphQL & Microservices API Architecture with Node & Redis',
    slug: 'graphql-microservices-node-redis',
    category: 'Web Development',
    price: 5499,
    original_price: 10499,
    duration: '6 Weeks (60 Hrs)',
    level: 'Intermediate to Advanced',
    description: 'Design flexible schemas with Apollo Server and GraphQL, solve the N+1 problem with DataLoader, rate limit with Redis, and implement real-time subscriptions with WebSockets.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'Backend API Architect',
    enrolled_count: 98,
    rating: 4.8,
    status: 'Published',
    tags: ['GraphQL', 'Node.js', 'Redis', 'APIs']
  },
  {
    id: 'c-27',
    title: 'Digital Marketing, Technical SEO & Performance Ads for Tech',
    slug: 'digital-marketing-seo-tech',
    category: 'Digital Marketing',
    price: 2499,
    original_price: 4999,
    duration: '4 Weeks (40 Hrs)',
    level: 'Beginner to Intermediate',
    description: 'Grow SaaS products and websites: Technical SEO audits, Google Core Web Vitals optimization, Google Ads search campaigns, programmatic marketing, and Google Analytics 4.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'Growth Marketing Lead',
    enrolled_count: 140,
    rating: 4.7,
    status: 'Published',
    tags: ['SEO', 'Digital Marketing', 'Growth', 'Google Ads']
  },
  {
    id: 'c-28',
    title: 'Google Cloud Platform (GCP) Data Engineering & BigQuery',
    slug: 'gcp-data-engineering-bigquery',
    category: 'Cloud & DevOps',
    price: 8499,
    original_price: 15999,
    duration: '8 Weeks (80 Hrs)',
    level: 'Intermediate to Advanced',
    description: 'Design cloud data warehouses with Google BigQuery, build ETL pipelines with Cloud Dataflow (Apache Beam), Cloud Pub/Sub streaming, and Cloud Composer Airflow orchestration.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'Cloud Data Architect',
    enrolled_count: 108,
    rating: 4.9,
    status: 'Published',
    tags: ['GCP', 'BigQuery', 'Data Engineering', 'Google Cloud']
  },
  {
    id: 'c-29',
    title: 'Robotics & IoT Embedded Systems with ESP32 & MicroPython',
    slug: 'robotics-iot-esp32-micropython',
    category: 'Embedded Systems',
    price: 6499,
    original_price: 11999,
    duration: '8 Weeks (80 Hrs)',
    level: 'Beginner to Intermediate',
    description: 'Program microcontrollers with MicroPython and C++. Connect sensor arrays, MQTT communication protocols, edge analytics, Bluetooth Low Energy (BLE), and IoT cloud dashboards.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'Robotics Systems Engineer',
    enrolled_count: 82,
    rating: 4.8,
    status: 'Published',
    tags: ['IoT', 'Robotics', 'ESP32', 'Hardware']
  },
  {
    id: 'c-30',
    title: 'Final Semester Capstone Project & NOC Industrial Training (3 & 6 Months)',
    slug: 'final-semester-capstone-noc-training',
    category: 'Industrial Internship',
    price: 12999,
    original_price: 24999,
    duration: '3 to 6 Months (320 Hrs)',
    level: 'All Levels',
    description: 'Official university-compliant industrial training program. Complete an IEEE-standard capstone project with daily signed timesheets, viva voce coaching deck, and verifiable completion certificate.',
    editor_email: 'extractionevolution@gmail.com',
    editor_name: 'Dean of Industrial Programs',
    enrolled_count: 420,
    rating: 5.0,
    badge: 'University Compliant',
    status: 'Published',
    tags: ['Internship', 'Capstone', 'NOC', 'Viva', 'IEEE']
  }
]

export const useCourses = () => {
  const courses = useState<Course[]>('pta_courses', () => INITIAL_30_COURSES)
  const isLoaded = useState<boolean>('pta_courses_loaded', () => false)
  const isSaving = useState<boolean>('pta_courses_saving', () => false)

  // Initialize and hydrate courses from database/localStorage
  const initCourses = async () => {
    if (process.server) return

    // 1. Try local storage for instant hydration
    try {
      const cached = localStorage.getItem('pta_courses_v1')
      if (cached) {
        courses.value = JSON.parse(cached)
      }
    } catch (e) {
      console.warn('Error hydrating cached courses:', e)
    }

    // 2. Fetch fresh courses from server API
    try {
      const res = await $fetch<{ success: boolean; data: Course[] }>('/api/courses')
      if (res?.success && res.data && res.data.length > 0) {
        courses.value = res.data
        if (process.client) {
          localStorage.setItem('pta_courses_v1', JSON.stringify(res.data))
        }
      }
    } catch (err) {
      console.warn('Could not sync courses with server, using local store:', err)
    } finally {
      isLoaded.value = true
    }
  }

  // Persist courses locally and push to API
  const persistCourses = (updated: Course[]) => {
    courses.value = [...updated]
    if (process.client) {
      try {
        localStorage.setItem('pta_courses_v1', JSON.stringify(courses.value))
      } catch (e) {
        console.warn('Could not persist courses to local storage:', e)
      }
    }
  }

  // Check if a specific user email can edit a course
  const canUserEditCourse = (course: Course, userEmail?: string, userRole?: string): boolean => {
    if (!userEmail) return false
    if (userEmail === 'extractionevolution@gmail.com' || userRole === 'super_admin') return true
    return course.editor_email?.toLowerCase() === userEmail.toLowerCase()
  }

  // Create a new course
  const createCourse = async (newCourseData: Partial<Course>, creatorEmail: string) => {
    isSaving.value = true
    try {
      const newCourse: Course = {
        id: `c-${Date.now()}`,
        title: newCourseData.title || 'New Course',
        slug: newCourseData.slug || `course-${Date.now()}`,
        category: newCourseData.category || 'Web Development',
        price: Number(newCourseData.price) || 4999,
        original_price: Number(newCourseData.original_price) || 9999,
        duration: newCourseData.duration || '6 Weeks',
        level: newCourseData.level || 'Beginner to Advanced',
        description: newCourseData.description || 'Comprehensive industrial technology training curriculum.',
        editor_email: newCourseData.editor_email || creatorEmail,
        editor_name: newCourseData.editor_name || 'Chief Super Admin',
        enrolled_count: 0,
        rating: 5.0,
        status: newCourseData.status || 'Published',
        tags: newCourseData.tags || ['Industrial Training']
      }

      const updated = [newCourse, ...courses.value]
      persistCourses(updated)

      // Sync with backend API
      await $fetch('/api/admin/courses', {
        method: 'POST',
        body: { action: 'create', course: newCourse }
      }).catch(e => console.warn('Saved course locally:', e))

      return { success: true, course: newCourse }
    } finally {
      isSaving.value = false
    }
  }

  // Update existing course
  const updateCourse = async (courseId: string, updates: Partial<Course>) => {
    isSaving.value = true
    try {
      const idx = courses.value.findIndex(c => c.id === courseId)
      if (idx === -1) throw new Error('Course not found')

      const updatedCourse = {
        ...courses.value[idx],
        ...updates
      }

      const newCourses = [...courses.value]
      newCourses[idx] = updatedCourse
      persistCourses(newCourses)

      // Sync with backend API
      await $fetch('/api/admin/courses', {
        method: 'POST',
        body: { action: 'update', courseId, updates }
      }).catch(e => console.warn('Updated course locally:', e))

      return { success: true, course: updatedCourse }
    } finally {
      isSaving.value = false
    }
  }

  // Delete course
  const deleteCourse = async (courseId: string) => {
    isSaving.value = true
    try {
      const updated = courses.value.filter(c => c.id !== courseId)
      persistCourses(updated)

      // Sync with backend API
      await $fetch('/api/admin/courses', {
        method: 'POST',
        body: { action: 'delete', courseId }
      }).catch(e => console.warn('Deleted course locally:', e))

      return { success: true }
    } finally {
      isSaving.value = false
    }
  }

  return {
    courses,
    isLoaded,
    isSaving,
    initCourses,
    canUserEditCourse,
    createCourse,
    updateCourse,
    deleteCourse
  }
}

