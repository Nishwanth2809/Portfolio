import { useState } from "react";

const skillsData = [
  {
    id: "ai",
    title: "AI & Machine Learning",
    color: "purple",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    skills: ["Machine Learning", "NLP", "Speech Processing", "TTS / STT", "Model Training & Evaluation"],
  },
  {
    id: "programming",
    title: "Programming",
    color: "blue",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    skills: ["Python", "Java (OOP)", "JavaScript", "C", "SQL", "HTML5", "CSS3", "DSA"],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    color: "teal",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    skills: ["Flask", "FastAPI", "Node.js", "Express", "REST APIs", "API Integration"],
  },
  {
    id: "deployment",
    title: "Deployment",
    color: "amber",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    skills: ["GitHub Pages", "Render", "Vercel", "Docker", "Custom Domain", "HTTPS / SSL"],
  },
  {
    id: "tools",
    title: "Tools",
    color: "gray",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    skills: ["VS Code", "Git", "Linux", "Canva"],
  },
];

const colorMap = {
  purple: {
    icon: { background: "#EEEDFE" },
    iconColor: { color: "#534AB7" },
    tag: { background: "#EEEDFE", color: "#3C3489" },
  },
  blue: {
    icon: { background: "#E6F1FB" },
    iconColor: { color: "#185FA5" },
    tag: { background: "#E6F1FB", color: "#0C447C" },
  },
  teal: {
    icon: { background: "#E1F5EE" },
    iconColor: { color: "#0F6E56" },
    tag: { background: "#E1F5EE", color: "#085041" },
  },
  amber: {
    icon: { background: "#FAEEDA" },
    iconColor: { color: "#854F0B" },
    tag: { background: "#FAEEDA", color: "#633806" },
  },
  gray: {
    icon: { background: "#F1EFE8" },
    iconColor: { color: "#5F5E5A" },
    tag: { background: "#F1EFE8", color: "#444441" },
  },
};

export default function Skills() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="skills" style={{ padding: "5rem 1.5rem", maxWidth: "900px", margin: "0 auto" }}>
      <p style={{
        fontSize: "13px",
        fontWeight: 500,
        color: "#888",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        marginBottom: "0.5rem",
      }}>
        What I work with
      </p>
      <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "2.5rem", color: "inherit" }}>
        Technical Skills
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "14px",
      }}>
        {skillsData.map((category) => {
          const colors = colorMap[category.color];
          const isHovered = hovered === category.id;

          return (
            <div
              key={category.id}
              onMouseEnter={() => setHovered(category.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: "var(--card-bg, #ffffff)",
                border: isHovered ? "1px solid #bbb" : "1px solid #e5e5e5",
                borderRadius: "14px",
                padding: "1.25rem",
                transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
                transform: isHovered ? "translateY(-2px)" : "translateY(0)",
                boxShadow: isHovered ? "0 4px 16px rgba(0,0,0,0.06)" : "none",
                cursor: "default",
              }}
            >
              {/* Icon */}
              <div style={{
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "14px",
                ...colors.icon,
                ...colors.iconColor,
              }}>
                {category.icon}
              </div>

              {/* Title */}
              <p style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#999",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}>
                {category.title}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontSize: "12px",
                      padding: "3px 10px",
                      borderRadius: "20px",
                      fontWeight: 400,
                      ...colors.tag,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
