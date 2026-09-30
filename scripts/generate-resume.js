const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

async function generateResume() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // Standard A4 points
  const { width, height } = page.getSize();

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Colors
  const darkNavy = rgb(0.06, 0.09, 0.17); // #10182B
  const textDark = rgb(0.12, 0.15, 0.2);
  const primaryBlue = rgb(0.15, 0.4, 0.85);
  const mutedGray = rgb(0.35, 0.4, 0.48);
  const lineGray = rgb(0.85, 0.88, 0.92);

  let y = height - 45;
  const margin = 45;
  const contentWidth = width - margin * 2;

  // Header - Name
  page.drawText("AKSHAY SHIVAJI RATHOD", {
    x: margin,
    y: y,
    size: 22,
    font: fontBold,
    color: darkNavy,
  });
  y -= 20;

  // Title
  page.drawText("DATA & AI ENGINEER", {
    x: margin,
    y: y,
    size: 11,
    font: fontBold,
    color: primaryBlue,
  });
  y -= 16;

  // Contact Info Row
  const contactText = "Thane, Maharashtra, India  |  rathod4520@gmail.com  |  +91 8454842474";
  page.drawText(contactText, {
    x: margin,
    y: y,
    size: 8.5,
    font: fontRegular,
    color: mutedGray,
  });
  y -= 13;

  const linksText = "GitHub: github.com/Akshay-Notfound  |  LinkedIn: linkedin.com/in/akshay-rathod-aaab52206";
  page.drawText(linksText, {
    x: margin,
    y: y,
    size: 8.5,
    font: fontRegular,
    color: mutedGray,
  });
  y -= 16;

  // Divider line
  page.drawLine({
    start: { x: margin, y: y },
    end: { x: width - margin, y: y },
    thickness: 1,
    color: lineGray,
  });
  y -= 18;

  function drawSectionHeading(title) {
    page.drawText(title.toUpperCase(), {
      x: margin,
      y: y,
      size: 10,
      font: fontBold,
      color: primaryBlue,
    });
    y -= 4;
    page.drawLine({
      start: { x: margin, y: y },
      end: { x: width - margin, y: y },
      thickness: 0.5,
      color: primaryBlue,
    });
    y -= 14;
  }

  // Summary
  drawSectionHeading("Professional Summary");
  const summary = "Data & AI Engineer with a background in Artificial Intelligence & Machine Learning. Experienced in developing custom RAG pipelines, data ingestion architectures, analytical KPI dashboards, and full-stack software solutions. Proven track record in translating complex multi-format datasets into actionable intelligence and high-performance applications.";
  
  // Wrap summary
  page.drawText(summary.slice(0, 115), { x: margin, y: y, size: 8.5, font: fontRegular, color: textDark });
  y -= 12;
  page.drawText(summary.slice(115, 235), { x: margin, y: y, size: 8.5, font: fontRegular, color: textDark });
  y -= 12;
  page.drawText(summary.slice(235), { x: margin, y: y, size: 8.5, font: fontRegular, color: textDark });
  y -= 18;

  // Education
  drawSectionHeading("Education");
  page.drawText("Bachelor of Technology (B.Tech) - Artificial Intelligence & Machine Learning", {
    x: margin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: textDark,
  });
  page.drawText("Aug 2022 - May 2026", {
    x: width - margin - 100,
    y: y,
    size: 8.5,
    font: fontOblique,
    color: mutedGray,
  });
  y -= 13;
  page.drawText("Dr. Babasaheb Ambedkar Technological University (DBATU), Maharashtra", {
    x: margin,
    y: y,
    size: 8.5,
    font: fontRegular,
    color: mutedGray,
  });
  y -= 18;

  // Professional Experience
  drawSectionHeading("Professional Experience");

  // Job 1
  page.drawText("Data Analyst & Data Scientist Intern", {
    x: margin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: textDark,
  });
  page.drawText("Feb 2026 - Present", {
    x: width - margin - 90,
    y: y,
    size: 8.5,
    font: fontOblique,
    color: mutedGray,
  });
  y -= 13;
  page.drawText("ExcelR Edtech Pvt. Ltd. | Mumbai, Maharashtra", {
    x: margin,
    y: y,
    size: 8.5,
    font: fontOblique,
    color: primaryBlue,
  });
  y -= 13;

  const job1Bullets = [
    "- Design and maintain analytical models and performance dashboards to track business KPIs and operations.",
    "- Build end-to-end data pipelines and apply data science methods to extract actionable predictive insights.",
    "- Evaluate strategy effectiveness, retention patterns, and resource allocation across business units.",
    "- Translate statistical findings and technical metrics into clear executive narratives for stakeholders.",
  ];
  job1Bullets.forEach((bullet) => {
    page.drawText(bullet, { x: margin + 8, y: y, size: 8.2, font: fontRegular, color: textDark });
    y -= 11.5;
  });
  y -= 6;

  // Job 2
  page.drawText("Full Stack Developer Intern", {
    x: margin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: textDark,
  });
  page.drawText("Apr 2024 - Oct 2024", {
    x: width - margin - 90,
    y: y,
    size: 8.5,
    font: fontOblique,
    color: mutedGray,
  });
  y -= 13;
  page.drawText("Humming Byte Technologies Pvt. Ltd. | Remote", {
    x: margin,
    y: y,
    size: 8.5,
    font: fontOblique,
    color: primaryBlue,
  });
  y -= 13;

  const job2Bullets = [
    "- Developed full-stack web applications and backend microservices using the MEAN/MERN technology stack.",
    "- Integrated high-throughput REST APIs with relational and NoSQL databases ensuring transactional integrity.",
    "- Utilized Python, Java, and SQL for automated data processing, transformation routines, and service endpoints.",
  ];
  job2Bullets.forEach((bullet) => {
    page.drawText(bullet, { x: margin + 8, y: y, size: 8.2, font: fontRegular, color: textDark });
    y -= 11.5;
  });
  y -= 14;

  // Featured Projects
  drawSectionHeading("Key Engineering Projects");

  // Project 1
  page.drawText("GenAI RAG Data Analytics Agent", { x: margin, y: y, size: 9, font: fontBold, color: textDark });
  page.drawText("Python, Pandas, Scikit-learn, OpenAI API, Anthropic Claude, Pytest", { x: margin + 170, y: y, size: 8, font: fontOblique, color: mutedGray });
  y -= 12;
  page.drawText("- Custom RAG agent retrieving relevant schemas via TF-IDF & cosine similarity; translates NL to sandboxed Pandas AST.", { x: margin + 8, y: y, size: 8.2, font: fontRegular, color: textDark });
  y -= 11;
  page.drawText("- Features pluggable OpenAI GPT and Anthropic Claude providers, offline mock provider, and comprehensive Pytest validation.", { x: margin + 8, y: y, size: 8.2, font: fontRegular, color: textDark });
  y -= 14;

  // Project 2
  page.drawText("Customer Churn Analysis Pipeline", { x: margin, y: y, size: 9, font: fontBold, color: textDark });
  page.drawText("Python, SQL, SQLite, Pandas, Plotly, Seaborn", { x: margin + 175, y: y, size: 8, font: fontOblique, color: mutedGray });
  y -= 12;
  page.drawText("- Subscription data pipeline processing user activity to isolate cancellation trends and support retention initiatives.", { x: margin + 8, y: y, size: 8.2, font: fontRegular, color: textDark });
  y -= 11;
  page.drawText("- Conducted feature engineering including tenure days; built interactive Plotly visuals uncovering customer lifetime value drivers.", { x: margin + 8, y: y, size: 8.2, font: fontRegular, color: textDark });
  y -= 14;

  // Project 3
  page.drawText("DataMind AI - Automated BI Platform", { x: margin, y: y, size: 9, font: fontBold, color: textDark });
  page.drawText("Python, Pandas, FastAPI, Next.js, TypeScript", { x: margin + 185, y: y, size: 8, font: fontOblique, color: mutedGray });
  y -= 12;
  page.drawText("- Full-stack automated analytics platform calculating data quality scores, heuristic delimiter detection, and instant stats.", { x: margin + 8, y: y, size: 8.2, font: fontRegular, color: textDark });
  y -= 16;

  // Technical Skills
  drawSectionHeading("Technical Skills");
  const skillsList = [
    ["GenAI & LLMs:", "RAG Pipelines, OpenAI API, Anthropic Claude API, Prompt Engineering, Vector Search, LLM Agents"],
    ["Data Engineering:", "Python, SQL, ETL Workflows, Data Modeling, Google BigQuery, SQLite, JDBC, REST APIs"],
    ["Analytics & BI:", "Power BI, Tableau, Pandas, Plotly, Seaborn, Statistical EDA, Predictive Modeling, ROI Analytics"],
    ["Cloud & Tools:", "Google Cloud Platform, AWS, Apache Spark, Hadoop, Kafka, Git, GitHub, Docker Fundamentals"],
    ["Software Eng:", "JavaScript, TypeScript, FastAPI, Next.js, MEAN/MERN, Java Fundamentals, DSA, Agile/Scrum"],
  ];
  skillsList.forEach(([category, list]) => {
    page.drawText(category, { x: margin, y: y, size: 8.2, font: fontBold, color: textDark });
    page.drawText(list, { x: margin + 90, y: y, size: 8.2, font: fontRegular, color: textDark });
    y -= 11.5;
  });
  y -= 10;

  // Certifications & Achievements
  drawSectionHeading("Certifications & Key Achievements");
  const certs = [
    "- Google Cloud Certified Professional Data Engineer (Featured)",
    "- Google Cloud: Create Your First Gemini Enterprise Application & Natural Language Sentiment API",
    "- 1st Rank — 100 Days Hard Challenge (CodeXpress 2.0, AITR Indore) | National Hackathon Finalist (HackFusion 2.0)",
    "- Top 20 Grand Finalist — Bid-2-Code (Innov8 '25, JECRC University) | McKinsey.org Forward Program",
  ];
  certs.forEach((c) => {
    page.drawText(c, { x: margin + 8, y: y, size: 8.2, font: fontRegular, color: textDark });
    y -= 11.5;
  });

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(__dirname, "../public/resume.pdf");
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Successfully generated valid PDF: ${outputPath} (${pdfBytes.length} bytes)`);
}

generateResume().catch(console.error);
