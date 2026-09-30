# Akshay Rathod — Personal 3D Portfolio Website

> **Data & AI Engineer**  
> *Turning raw data into intelligent solutions through engineering, analytics, and AI.*

An award-level (Awwwards / FWA standard) personal portfolio designed with Next.js 14 App Router, TypeScript, React Three Fiber, Three.js, Framer Motion, GSAP, Lenis Smooth Scroll, and Tailwind CSS.

---

## 🚀 Key Highlights & Capabilities

- **Ultra-Realistic 3D Hero Data Orb**: Physically-based refractive glass sphere rendered with `@react-three/drei`'s `MeshTransmissionMaterial` (chromatic aberration, thickness, IOR 1.42), inner glowing neural lattice with pulsing data nodes, cool cyan rim lighting, violet key lighting, and soft ground contact shadows. Damped mouse tracking with lerp, slow orbital idle rotation, and WebGL fallback.
- **Single Source of Truth Configuration (`src/data/site.ts`)**: All personal info, links, GitHub repos, certifications, and skills reside in one clean configuration file.
- **Interactive 3D About Visual**: Draggable wireframe data-globe with inertia and formal education card for **Dr. Babasaheb Ambedkar Technological University (B.Tech AI & ML)**.
- **Interactive Skills Constellation**: 5 reactive clusters (*GenAI & LLM Engineering*, *Data Engineering*, *Analytics & BI*, *Cloud & Big Data*, *Software Engineering*) with dynamic architecture focus panels and accessible semantic fallbacks.
- **3D Tilt Project Showcases**:
  1. **GenAI RAG Data Analytics Agent** (Flagship card with custom neural AST flowchart).
  2. **Customer Churn Analysis** (SQLite relational staging + churn hazard metrics).
  3. **DataMind AI** (FastAPI backend + Next.js reactive chart explorer).
  - Expandable repository drawer featuring *CyberSaathi AI*, *Smart Safety Tourist*, and *Virtual Eye Mouse*.
- **Dynamic Project Detail Pages (`/projects/[slug]`)**: Static-site generated architecture blueprints for each system.
- **Animated Experience Timeline**: ExcelR Edtech (Data Analyst & Scientist Intern) and Humming Byte Technologies (Full Stack Developer).
- **Credentials & Trophy Milestones**: Google Cloud Professional Data Engineer hero card + 1st Rank 100 Days Hard Challenge (CodeXpress 2.0) trophy card.
- **Production Contact Hub**: Working form with Zod validation, anti-spam honeypot, click-to-copy email/phone toasts, and resume download.
- **Accessibility & Performance**: Automatic `prefers-reduced-motion` detection, manual toggle in footer, DPR capping, lazy-loaded 3D canvases, SEO metadata, JSON-LD Person schema, robots.txt, and sitemap.xml.

---

## 🛠 Tech Stack

| Technology | Purpose |
| --- | --- |
| **Next.js 14 (App Router)** | Framework & SSG Routing |
| **TypeScript** | Type Safety & Interfaces |
| **Tailwind CSS** | Styling, Glassmorphism, Design Tokens |
| **React Three Fiber & Three.js** | 3D Scenes, Materials & Shaders |
| **@react-three/drei** | MeshTransmissionMaterial, Float, ContactShadows |
| **Framer Motion** | UI Staggers, Transitions & Hover States |
| **Lenis & GSAP** | Smooth Inertia Scrolling & ScrollTrigger |
| **Lucide React** | Modern Iconography |
| **Zod** | Contact Validation Schema |

---

## 📁 Project Structure

```
├── public/
│   ├── og-image.png             # 1200x630 OpenGraph / Twitter preview card
│   └── resume.pdf               # Downloadable resume PDF
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts # Zod-validated contact handler
│   │   ├── projects/[slug]/     # Dynamic project blueprint route
│   │   ├── globals.css          # Design system tokens & glassmorphism
│   │   ├── layout.tsx           # SEO metadata, JSON-LD Person schema & fonts
│   │   ├── page.tsx             # Main assembled portfolio page
│   │   ├── robots.ts            # SEO robots.txt
│   │   └── sitemap.ts           # Dynamic XML sitemap
│   ├── components/
│   │   ├── about/               # Editorial bio & 3D data-globe
│   │   ├── certifications/      # Google Cloud PDE & trophy cards
│   │   ├── contact/             # Form, clipboard toasts & 3D polyhedron
│   │   ├── experience/          # Animated vertical timeline
│   │   ├── hero/                # Refractive glass Data Orb & Hero UI
│   │   ├── navigation/          # Navbar with AR monogram & Footer
│   │   ├── projects/            # 3D tilt cards & algorithmic SVG visuals
│   │   ├── providers/           # Lenis smooth scroll & motion context
│   │   ├── skills/              # Reactive 5-cluster constellation
│   │   └── ui/                  # Custom spring cursor & cinematic preloader
│   └── data/
│       └── site.ts              # Single source of truth configuration
├── tailwind.config.ts           # Custom color palette & blur utilities
└── package.json
```

---

## 💻 Local Setup & Execution

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Test
```bash
npm run build
npm run start
```

---

## 🌐 Deploy to Vercel

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete personal 3D portfolio website"
   git remote add origin https://github.com/Akshay-Notfound/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```

2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset will be automatically detected as **Next.js**.
5. Set environment variables from `.env.example` if utilizing an email API key.
6. Click **Deploy**.

### Custom Domain Setup:
1. In the Vercel Project Dashboard, navigate to **Settings > Domains**.
2. Add your custom domain (e.g. `akshayrathod.dev`).
3. Follow the DNS records instructions (A record pointing to `76.76.21.21` or CNAME to `cname.vercel-dns.com`).

---

## 👤 Author

**Akshay Shivaji Rathod**  
- **Role**: Data & AI Engineer  
- **Email**: [rathod4520@gmail.com](mailto:rathod4520@gmail.com)  
- **Phone**: +91 8454842474  
- **GitHub**: [github.com/Akshay-Notfound](https://github.com/Akshay-Notfound)  
- **LinkedIn**: [linkedin.com/in/akshay-rathod-aaab52206](https://www.linkedin.com/in/akshay-rathod-aaab52206/)
