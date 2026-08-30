import logging
import uuid
from datetime import datetime, timezone
from app.core.database import get_database
from app.core.security import get_password_hash

logger = logging.getLogger("careerplus.seed")

DEFAULT_CAREERS = [
    {
        "id": 1,
        "title": "React Native Developer",
        "emoji": "📱",
        "color": "#53B8FF",
        "level": "Intermediate",
        "duration": "4-6 months",
        "salaryRange": "$1.8k - $4.5k",
        "demand": 94,
        "category": "engineering",
        "skills": ["JavaScript", "TypeScript", "React", "React Native", "Native APIs", "UI Performance", "Redux"],
        "description": "Build stunning iOS and Android apps from one codebase with polished mobile experiences.",
        "roadmap": [
            "Master JavaScript & TypeScript fundamentals",
            "Learn React deeply (Components, Hooks, State Management)",
            "Build reusable mobile components & responsive layouts",
            "Connect REST APIs, WebSocket, and local Async storage",
            "Publish a production-ready mobile portfolio application"
        ]
    },
    {
        "id": 2,
        "title": "UI/UX Designer",
        "emoji": "🎨",
        "color": "#B57BFF",
        "level": "Beginner",
        "duration": "3-5 months",
        "salaryRange": "$1.2k - $3.2k",
        "demand": 88,
        "category": "design",
        "skills": ["Figma", "Research", "Wireframes", "Design Systems", "Prototyping", "User Testing"],
        "description": "Create memorable user experiences with elegant interfaces, prototypes and design systems.",
        "roadmap": [
            "Learn visual hierarchy and typography principles",
            "Practice Figma design systems and auto-layout daily",
            "Conduct user research and study UX case studies",
            "Create end-to-end mobile & web app redesign projects",
            "Curate a high-impact design portfolio on Behance/Dribbble"
        ]
    },
    {
        "id": 3,
        "title": "Data Analyst",
        "emoji": "📊",
        "color": "#31D0AA",
        "level": "Beginner",
        "duration": "3-4 months",
        "salaryRange": "$1.5k - $3.8k",
        "demand": 91,
        "category": "data",
        "skills": ["Excel", "SQL", "Python", "Dashboards", "PowerBI", "Tableau", "Statistics"],
        "description": "Transform raw data into useful insights, dashboards and high-value business decisions.",
        "roadmap": [
            "Learn advanced Excel modeling and data reporting",
            "Study SQL queries, joins, window functions and aggregation",
            "Use Python (Pandas, NumPy, Matplotlib) for exploratory analysis",
            "Build interactive BI visual dashboards (PowerBI / Tableau)",
            "Present data-driven insights clearly to business stakeholders"
        ]
    },
    {
        "id": 4,
        "title": "Digital Marketer",
        "emoji": "📢",
        "color": "#FF6FAF",
        "level": "Beginner",
        "duration": "2-4 months",
        "salaryRange": "$900 - $2.8k",
        "demand": 82,
        "category": "marketing",
        "skills": ["SEO", "Ads", "Content Strategy", "Analytics", "Copywriting", "Social Media"],
        "description": "Grow brands using content, paid media, social strategy and funnel analytics.",
        "roadmap": [
            "Understand modern brand positioning & customer persona strategy",
            "Learn technical SEO and PPC paid ad campaigns (Meta / Google Ads)",
            "Create multi-channel content strategy and copywriting assets",
            "Measure conversion rates and performance analytics (GA4)",
            "Build end-to-end growth campaign case studies"
        ]
    },
    {
        "id": 5,
        "title": "Full-Stack Engineer",
        "emoji": "💻",
        "color": "#FFB347",
        "level": "Advanced",
        "duration": "6-9 months",
        "salaryRange": "$2.5k - $5.5k",
        "demand": 96,
        "category": "engineering",
        "skills": ["TypeScript", "React", "Node.js", "Python", "FastAPI", "MongoDB", "PostgreSQL", "Docker"],
        "description": "Architect scalable backend services and responsive modern web and mobile frontends.",
        "roadmap": [
            "Solidify frontend frontend architecture with React & TypeScript",
            "Build RESTful & GraphQL APIs with FastAPI and Node.js",
            "Master database design with MongoDB and relational SQL",
            "Containerize microservices with Docker and deploy to Cloud",
            "Implement CI/CD automated pipelines and monitoring"
        ]
    },
    {
        "id": 6,
        "title": "AI & ML Engineer",
        "emoji": "🧠",
        "color": "#4FD1FF",
        "level": "Advanced",
        "duration": "6-10 months",
        "salaryRange": "$3.0k - $6.5k",
        "demand": 98,
        "category": "data",
        "skills": ["Python", "PyTorch", "TensorFlow", "NLP", "LLMs", "Vector DBs", "FastAPI"],
        "description": "Build cutting-edge AI systems, fine-tuned LLM pipelines, and computer vision models.",
        "roadmap": [
            "Deepen linear algebra, calculus, and probability for ML",
            "Master classical ML algorithms with Scikit-learn",
            "Train deep neural networks using PyTorch & HuggingFace",
            "Implement RAG architectures and LLM agent systems",
            "Deploy performant ML models using FastAPI and Docker"
        ]
    }
]

DEFAULT_JOBS = [
    {
        "id": 1,
        "company": "Google",
        "position": "UI/UX Designer",
        "location": "Colombo",
        "salary": "$2,500",
        "color": "#B57BFF",
        "type": "Full-time",
        "category": "design",
        "rating": 4.9,
        "applicants": 142,
        "tags": ["Figma", "Prototyping", "Research", "Design Systems"],
        "postedDays": 2,
        "description": "Design intuitive digital experiences for next-generation products with a world-class team.",
        "requirements": [
            "3+ years UX design experience across web and mobile",
            "Strong Figma design systems and interactive prototyping skills",
            "Portfolio demonstrating real problem solving and case studies",
            "Excellent collaboration with product and engineering teams"
        ],
        "isFeatured": True,
        "isSaved": False
    },
    {
        "id": 2,
        "company": "Microsoft",
        "position": "Software Engineer",
        "location": "Remote",
        "salary": "$3,200",
        "color": "#53B8FF",
        "type": "Full-time",
        "category": "engineering",
        "rating": 4.8,
        "applicants": 289,
        "tags": ["TypeScript", "Azure", "React", "Node.js"],
        "postedDays": 5,
        "description": "Build scalable cloud-native solutions on modern engineering teams serving millions of global users.",
        "requirements": [
            "Strong command of JavaScript or TypeScript",
            "Frontend or fullstack experience with React and modern APIs",
            "Understanding of cloud platforms (Azure/AWS) and CI/CD",
            "Problem-solving mindset and passion for clean architecture"
        ],
        "isFeatured": False,
        "isSaved": True
    },
    {
        "id": 3,
        "company": "Spotify",
        "position": "Frontend Developer",
        "location": "Kandy",
        "salary": "$2,900",
        "color": "#31D0AA",
        "type": "Hybrid",
        "category": "engineering",
        "rating": 4.7,
        "applicants": 98,
        "tags": ["React", "TypeScript", "Performance", "CSS"],
        "postedDays": 1,
        "description": "Craft music experiences for users through modern interfaces and smooth performance.",
        "requirements": [
            "3+ years frontend web/app development experience",
            "Expert React and TypeScript knowledge",
            "Strong CSS and animation skills",
            "Track record in performance optimization and web vitals"
        ],
        "isFeatured": True,
        "isSaved": False
    },
    {
        "id": 4,
        "company": "Netflix",
        "position": "Mobile Developer",
        "location": "Remote",
        "salary": "$3,800",
        "color": "#FF7272",
        "type": "Full-time",
        "category": "engineering",
        "rating": 4.9,
        "applicants": 412,
        "tags": ["React Native", "iOS", "Android", "TypeScript"],
        "postedDays": 3,
        "description": "Deliver beautiful mobile entertainment experiences at global scale with low-latency media players.",
        "requirements": [
            "Strong React Native expertise with TypeScript",
            "Native iOS/Android build and deployment experience",
            "Deep understanding of mobile rendering performance",
            "Production-level app store delivery experience"
        ],
        "isFeatured": False,
        "isSaved": False
    },
    {
        "id": 5,
        "company": "Airbnb",
        "position": "Product Designer",
        "location": "Colombo",
        "salary": "$2,700",
        "color": "#FF6FAF",
        "type": "Contract",
        "category": "design",
        "rating": 4.6,
        "applicants": 76,
        "tags": ["Product Design", "Figma", "Design Systems", "User Testing"],
        "postedDays": 7,
        "description": "Shape elegant guest and host product experiences across multiple platforms and locales.",
        "requirements": [
            "2+ years experience in product design",
            "Strong mastery of design systems and typography",
            "Cross-platform responsive design thinking",
            "Keen eye for detail, micro-interactions and usability"
        ],
        "isFeatured": False,
        "isSaved": False
    },
    {
        "id": 6,
        "company": "Meta",
        "position": "Data Scientist",
        "location": "Remote",
        "salary": "$4,100",
        "color": "#31D0AA",
        "type": "Full-time",
        "category": "data",
        "rating": 4.8,
        "applicants": 234,
        "tags": ["Python", "Machine Learning", "SQL", "Statistics"],
        "postedDays": 4,
        "description": "Drive product decisions from data, experimentation, machine intelligence, and causal inference.",
        "requirements": [
            "Strong Python and complex SQL data modeling",
            "Applied machine learning and predictive modeling",
            "A/B experimentation and statistical hypothesis testing",
            "Ability to translate data findings into executive insights"
        ],
        "isFeatured": False,
        "isSaved": True
    },
    {
        "id": 7,
        "company": "Stripe",
        "position": "Full-Stack Developer",
        "location": "Remote",
        "salary": "$3,900",
        "color": "#7C5CFF",
        "type": "Full-time",
        "category": "engineering",
        "rating": 4.9,
        "applicants": 180,
        "tags": ["React", "FastAPI", "Python", "MongoDB", "TypeScript"],
        "postedDays": 2,
        "description": "Build high-throughput developer infrastructure and payment portals for millions of businesses worldwide.",
        "requirements": [
            "Proficiency in Python/FastAPI and React/TypeScript",
            "Database design and query optimization experience",
            "Understanding of secure financial transaction protocols",
            "Experience building public-facing developer APIs"
        ],
        "isFeatured": True,
        "isSaved": False
    },
    {
        "id": 8,
        "company": "HubSpot",
        "position": "Growth Marketing Specialist",
        "location": "Colombo",
        "salary": "$2,200",
        "color": "#FF9F5A",
        "type": "Full-time",
        "category": "marketing",
        "rating": 4.6,
        "applicants": 85,
        "tags": ["SEO", "Content Strategy", "Google Ads", "Analytics"],
        "postedDays": 3,
        "description": "Scale inbound pipeline and optimize organic and paid customer acquisition channels across Asia-Pacific.",
        "requirements": [
            "2+ years experience in B2B growth marketing",
            "Demonstrated SEO organic ranking growth results",
            "Data-driven experimentation with PPC and conversion rate optimization",
            "Excellent storytelling and copywriting abilities"
        ],
        "isFeatured": False,
        "isSaved": False
    }
]

DEFAULT_SKILLS = [
    {"id": "js", "name": "JavaScript", "category": "engineering", "demand_score": 95, "popular_careers": ["React Native Developer", "Full-Stack Engineer"]},
    {"id": "ts", "name": "TypeScript", "category": "engineering", "demand_score": 96, "popular_careers": ["React Native Developer", "Full-Stack Engineer"]},
    {"id": "react", "name": "React", "category": "engineering", "demand_score": 94, "popular_careers": ["React Native Developer", "Full-Stack Engineer"]},
    {"id": "rn", "name": "React Native", "category": "engineering", "demand_score": 92, "popular_careers": ["React Native Developer"]},
    {"id": "figma", "name": "Figma", "category": "design", "demand_score": 90, "popular_careers": ["UI/UX Designer"]},
    {"id": "wireframing", "name": "Wireframes", "category": "design", "demand_score": 85, "popular_careers": ["UI/UX Designer"]},
    {"id": "design_sys", "name": "Design Systems", "category": "design", "demand_score": 88, "popular_careers": ["UI/UX Designer"]},
    {"id": "python", "name": "Python", "category": "data", "demand_score": 97, "popular_careers": ["Data Analyst", "AI & ML Engineer", "Full-Stack Engineer"]},
    {"id": "sql", "name": "SQL", "category": "data", "demand_score": 93, "popular_careers": ["Data Analyst", "Full-Stack Engineer"]},
    {"id": "fastapi", "name": "FastAPI", "category": "engineering", "demand_score": 89, "popular_careers": ["Full-Stack Engineer", "AI & ML Engineer"]},
    {"id": "mongo", "name": "MongoDB", "category": "engineering", "demand_score": 88, "popular_careers": ["Full-Stack Engineer"]},
    {"id": "seo", "name": "SEO", "category": "marketing", "demand_score": 84, "popular_careers": ["Digital Marketer"]},
    {"id": "ads", "name": "Paid Ads", "category": "marketing", "demand_score": 82, "popular_careers": ["Digital Marketer"]},
    {"id": "powerbi", "name": "PowerBI", "category": "data", "demand_score": 87, "popular_careers": ["Data Analyst"]},
    {"id": "ml", "name": "Machine Learning", "category": "data", "demand_score": 95, "popular_careers": ["AI & ML Engineer"]}
]

DEFAULT_CATEGORIES = [
    {"key": "all", "title": "All", "icon": "🌟", "skills": []},
    {"key": "engineering", "title": "Tech", "icon": "💻", "skills": ["JavaScript", "TypeScript", "React", "React Native", "FastAPI", "MongoDB", "Node.js"]},
    {"key": "design", "title": "Design", "icon": "🎨", "skills": ["Figma", "Prototyping", "Research", "Design Systems", "Wireframes"]},
    {"key": "data", "title": "Data & AI", "icon": "📊", "skills": ["Python", "SQL", "PowerBI", "Machine Learning", "Statistics", "PyTorch"]},
    {"key": "marketing", "title": "Marketing", "icon": "📢", "skills": ["SEO", "Paid Ads", "Content Strategy", "Analytics", "Copywriting"]}
]


async def seed_database():
    """Seed MongoDB with default careers, jobs, skills, and admin demo user."""
    db = get_database()
    if db is None:
        logger.warning("Database unavailable, skipping seed.")
        return

    try:
        # 1. Seed Careers
        for career in DEFAULT_CAREERS:
            await db.careers.update_one(
                {"id": career["id"]},
                {"$set": career},
                upsert=True
            )
        logger.info(f"Seeded {len(DEFAULT_CAREERS)} careers.")

        # 2. Seed Jobs
        for job in DEFAULT_JOBS:
            await db.jobs.update_one(
                {"id": job["id"]},
                {"$set": job},
                upsert=True
            )
        logger.info(f"Seeded {len(DEFAULT_JOBS)} jobs.")

        # 3. Seed Skills
        for skill in DEFAULT_SKILLS:
            await db.skills.update_one(
                {"id": skill["id"]},
                {"$set": skill},
                upsert=True
            )
        logger.info(f"Seeded {len(DEFAULT_SKILLS)} skills.")

        # 4. Seed Demo User if not exists
        demo_email = "demo@careerplus.com"
        existing_user = await db.users.find_one({"email": demo_email})
        if not existing_user:
            demo_user = {
                "_id": str(uuid.uuid4()),
                "email": demo_email,
                "name": "Alex Morgan",
                "hashed_password": get_password_hash("password123"),
                "title": "Mobile & Frontend Explorer",
                "bio": "Passionate about crafting fluid, responsive mobile interfaces and modern full-stack systems.",
                "location": "Colombo, Sri Lanka",
                "skills": ["JavaScript", "React", "TypeScript", "Figma"],
                "interests": ["engineering", "design"],
                "experience_level": "Intermediate",
                "created_at": datetime.now(timezone.utc)
            }
            await db.users.insert_one(demo_user)
            logger.info("Created default demo user: demo@careerplus.com / password123")

    except Exception as e:
        logger.error(f"Error seeding database: {e}")
