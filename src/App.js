import { analyzeResume } from "./api";
import { useState, useEffect, useRef } from "react";
import "./App.css";

// Custom Hook for count-up animation
function useCountUp(end, duration = 1500, shouldStart = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration, shouldStart]);

  return count;
}

// Header Component
function Header({ onToggleTheme, theme }) {
  const scrollToId = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            CREDExA
            {/* <span className="version">v1.2.0</span> */}
          </div>
          <div className="nav-tags">
            <button onClick={() => scrollToId("analyze")} className="nav-pill">
              Analyze
            </button>
            <button onClick={() => scrollToId("features")} className="nav-pill">
              Features
            </button>
            <button onClick={() => scrollToId("team")} className="nav-pill">
              Team
            </button>
            <button onClick={() => scrollToId("faq")} className="nav-pill">
              FAQ
            </button>
            {/* <div className="nav-tags">
              <button
                className="nav-pill"
                onClick={onToggleTheme}
                title="Toggle Dark Mode"
              >
                {theme === "light" ? "🌙 Dark" : "☀️ Light"}
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
}

// Hero Component
function Hero({ onAnalyzeClick }) {
  const statsCount1 = useCountUp(1247, 2000, true);
  const statsCount2 = useCountUp(50, 2000, true);

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-eyebrow">Resume Analysis System</div>
          <h1 className="hero-headline">
            Understand why candidates match-or don't
          </h1>
          <p className="hero-subhead">
            Explainable scoring for better hiring decisions
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={onAnalyzeClick}>
              Analyze Resume →
            </button>
            {/* <button className="btn btn-secondary">View Sample Report</button> */}
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">
                {statsCount1.toLocaleString()}
              </span>
              <span className="stat-label">Analyses completed</span>
            </div>
            <div className="stat">
              <span className="stat-number">{statsCount2}+</span>
              <span className="stat-label">Active Users</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Analyze Section Component
function AnalyzeSection({ onAnalyze, analyzeRef }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setResumeFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
    }
  };

  const handleAnalyze = () => {
    if (resumeFile && jobDescription.trim()) {
      onAnalyze(resumeFile, jobDescription);
    }
  };

  return (
    <section className="analyze section" ref={analyzeRef} id="analyze">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Analyze Resume</h2>
          <p className="section-subtitle">
            Upload a resume and job description to see explainable match scoring
          </p>
        </div>

        <div
          className="upload-area"
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="upload-icon">📄</div>
          <div className="upload-title">
            {resumeFile ? resumeFile.name : "Upload Resume"}
          </div>
          <p className="upload-subtitle">
            Click to browse or drag and drop PDF files
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="upload-input"
            onChange={handleFileChange}
          />
        </div>

        <div className="job-description-area">
          <label
            htmlFor="job-desc"
            className="section-title"
            style={{
              fontSize: "var(--text-xl)",
              display: "block",
              marginBottom: "var(--space-3)",
            }}
          >
            Job Description
          </label>
          <textarea
            id="job-desc"
            className="textarea"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        <div className="analyze-btn-container">
          <button
            className="btn btn-primary"
            onClick={handleAnalyze}
            disabled={!resumeFile || !jobDescription.trim()}
            style={{ opacity: !resumeFile || !jobDescription.trim() ? 0.5 : 1 }}
          >
            Analyze Match →
          </button>
        </div>
      </div>
    </section>
  );
}

// Loading Component
function LoadingState() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < 2 ? prev + 1 : prev));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <div className="loading-text">Analyzing resume...</div>
      <div className="loading-steps">
        <div className={`loading-step ${activeStep >= 0 ? "completed" : ""}`}>
          <span className="step-icon">{activeStep >= 0 ? "✓" : "○"}</span>
          <span>Parsing document</span>
        </div>
        <div
          className={`loading-step ${
            activeStep === 1 ? "active" : activeStep > 1 ? "completed" : ""
          }`}
        >
          <span className="step-icon">
            {activeStep > 1 ? "✓" : activeStep === 1 ? "⟳" : "○"}
          </span>
          <span>Extracting skills</span>
        </div>
        <div className={`loading-step ${activeStep === 2 ? "active" : ""}`}>
          <span className="step-icon">{activeStep === 2 ? "⟳" : "○"}</span>
          <span>Computing match</span>
        </div>
      </div>
    </div>
  );
}

// Results Component
function ResultsSection({ resultsRef, results }) {
  const [viewMode, setViewMode] = useState("detailed");
  const [showResults] = useState(true);

  const scoreValue = results?.overall_score ?? 0;
  const scoreCount = useCountUp(scoreValue, 1500, showResults);

  const getScoreColor = (score) => {
    if (score >= 90) return "var(--green-500)";
    if (score >= 75) return "var(--blue-600)";
    if (score >= 60) return "var(--amber-500)";
    return "var(--red-500)";
  };

  const getScoreBadge = (score) => {
    if (score >= 90) return { text: "Excellent Fit", class: "badge-strong" };
    if (score >= 75) return { text: "Strong Fit", class: "badge-strong" };
    if (score >= 60) return { text: "Moderate Fit", class: "badge-moderate" };
    return { text: "Weak Fit", class: "badge-weak" };
  };

  const explainabilityItems = [];

  if (results?.review) {
    results.review.strengths?.forEach((strength) => {
      explainabilityItems.push({
        type: "positive",
        icon: "✓",
        text: strength,
      });
    });

    results.missing_skills?.forEach((skill) => {
      explainabilityItems.push({
        type: "warning",
        icon: "⚠",
        text: `Missing or not evident: ${skill}`,
      });
    });

    if (results.review.overall_review) {
      explainabilityItems.push({
        type: "neutral",
        icon: "ℹ",
        text: results.review.overall_review,
      });
    }

    if (results.review.role_fit_summary) {
      explainabilityItems.push({
        type: "neutral",
        icon: "ℹ",
        text: results.review.role_fit_summary,
      });
    }
  }

  const improvementSuggestions = [];

  results?.review?.areas_to_improve?.forEach((area, index) => {
    improvementSuggestions.push({
      priority: index === 0 ? "high" : index === 1 ? "medium" : "low",
      action: area,
      impact:
        index === 0
          ? "High impact"
          : index === 1
            ? "Moderate impact"
            : "Incremental improvement",
    });
  });

  const badge = getScoreBadge(scoreValue);

  return (
    <section className="results section" ref={resultsRef}>
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Analysis Results</h2>
          <p className="section-subtitle">
            Detailed breakdown of resume-job match
          </p>
        </div>

        <div className="view-toggle">
          {/* <button
            className={`toggle-btn ${viewMode === "simple" ? "active" : ""}`}
            onClick={() => setViewMode("simple")}
          >
            Simple View
          </button> */}
          <button
            className={`toggle-btn ${viewMode === "detailed" ? "active" : ""}`}
            onClick={() => setViewMode("detailed")}
          >
            Detailed View
          </button>
        </div>

        {viewMode === "detailed" && (
          <>
            <div className="results-grid">
              <div className="card card-elevated">
                <div className="score-display">
                  <div
                    className="score-number"
                    style={{ color: getScoreColor(scoreValue) }}
                  >
                    {scoreCount}%
                  </div>
                  <div className="score-label">Match Score</div>
                  <div className="score-bar">
                    <div
                      className="score-bar-fill"
                      style={{
                        "--score-percentage": `${scoreValue}%`,
                        background: getScoreColor(scoreValue),
                      }}
                    ></div>
                  </div>
                  <span className={`score-badge ${badge.class}`}>
                    {badge.text}
                  </span>
                </div>
              </div>

              <div className="card card-elevated">
                <div className="card-header">
                  <h3 className="card-title">Key Factors</h3>
                  <p className="card-subtitle">Primary scoring components</p>
                </div>
                <div className="factors-list">
                  <div className="factor">
                    <span className="factor-label">Role</span>

                    <span
                      className="factor-score"
                      style={{ color: "var(--green-500)" }}
                    >
                      {results?.role || "—"}
                    </span>
                  </div>
                  <div className="factor">
                    <span className="factor-label">Skill Fit</span>
                    <span
                      className="factor-score"
                      style={{ color: "var(--blue-600)" }}
                    >
                      {results?.skill_fit_percent || "—"}%
                    </span>
                  </div>
                  {/* <div className="factor">
                    <span className="factor-label">Education</span>
                    <span
                      className="factor-score"
                      style={{ color: "var(--blue-600)" }}
                    >
                      81%
                    </span>
                  </div> */}
                  {/* <div className="factor">
                    <span className="factor-label">Certifications</span>
                    <span
                      className="factor-score"
                      style={{ color: "var(--amber-500)" }}
                    >
                      78%
                    </span>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Why This Score?</h3>
                <p className="card-subtitle">Transparent scoring breakdown</p>
              </div>
              <div className="explainability-panel">
                <div className="explainability-list">
                  {explainabilityItems.map((item, index) => (
                    <div
                      key={index}
                      className={`explainability-item ${item.type}`}
                    >
                      <span className="explainability-icon">{item.icon}</span>
                      <div className="explainability-content">
                        <div className="explainability-text">{item.text}</div>
                        <div className="explainability-points">
                          {item.points}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card suggestions-panel">
              <div className="card-header">
                <h3 className="card-title">What Would Improve This Score?</h3>
                <p className="card-subtitle">Actionable recommendations</p>
              </div>
              <div className="suggestions-list">
                {improvementSuggestions.map((suggestion, index) => (
                  <div key={index} className="suggestion">
                    <span
                      className={`priority-dot priority-${suggestion.priority}`}
                    ></span>
                    <div className="suggestion-content">
                      <div className="suggestion-action">
                        {suggestion.action}
                      </div>
                      <div className="suggestion-impact">
                        Potential impact: {suggestion.impact}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

// Features Component
function FeaturesSection() {
  const features = [
    {
      icon: "🎯",
      title: "Explainable Scoring",
      description:
        "Every score is backed by transparent reasoning. No black box algorithms.",
    },
    {
      icon: "⚡",
      title: "Fast Analysis",
      description:
        "Get detailed insights in seconds, not hours. Save time on initial screening.",
    },
    {
      icon: "📊",
      title: "Detailed Breakdown",
      description:
        "See exactly which skills, experiences, and qualifications drive the match.",
    },
    {
      icon: "💡",
      title: "Actionable Insights",
      description:
        "Receive specific suggestions to improve candidate-job alignment.",
    },
    {
      icon: "🔒",
      title: "Privacy First",
      description:
        "Your data stays secure. We process everything client-side when possible.",
    },
    {
      icon: "📈",
      title: "Better Decisions",
      description:
        "Make informed hiring choices backed by data and clear reasoning.",
    },
  ];

  return (
    <section className="features section" id="features">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Why CREDExA?</h2>
          <p className="section-subtitle">
            Built for transparency and better hiring outcomes
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Team Component
function TeamSection() {
  const team = [
    { name: "Neev Sahu", role: "Backend Developer", initial: "NS" },
    {
      name: "Nishi Singhal",
      role: "UI/UX Designer, Frontend Developer",
      initial: "NS",
    },
  ];

  return (
    <section className="team section" id="team">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Our Team</h2>
          <p className="section-subtitle">
            Built by passionate developers and designers
          </p>
        </div>

        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="team-member">
              <div className="team-avatar">{member.initial}</div>
              <div className="team-name">{member.name}</div>
              <div className="team-role">{member.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Component
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does CREDExA score resumes?",
      answer:
        "We analyze multiple factors including skills match, experience level, education, and certifications. Each factor is weighted and scored transparently, giving you a clear breakdown of why a candidate received their score.",
    },
    {
      question: "Is this a replacement for human judgment?",
      answer:
        "No. CREDExA is a decision-support tool designed to assist recruiters and hiring managers, not replace them. It provides data-driven insights to help you make better informed decisions.",
    },
    {
      question: "What file formats do you support?",
      answer:
        "Currently, we support PDF and DOCX resume formats. We recommend PDF for best parsing accuracy.",
    },
    {
      question: "How is this different from ATS systems?",
      answer:
        "Unlike traditional ATS systems that just keyword match, CREDExA provides explainable reasoning for every score. You can see exactly why a candidate matches or doesn't match a role.",
    },
  ];

  return (
    <section className="faq section" id="faq">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about CREDExA
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? "open" : ""}`}
            >
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">▼</span>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-text">
            © 2026 CREDExA. Built for transparency.
          </div>
          <div className="footer-links">
            <a href="#" className="footer-link">
              Privacy
            </a>
            <a href="#" className="footer-link">
              Terms
            </a>
            <a href="#" className="footer-link">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("credexa-theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState("light");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const analyzeRef = useRef(null);
  const resultsRef = useRef(null);

  const scrollToAnalyze = () => {
    analyzeRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleTheme = () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("credexa-theme", isDark ? "dark" : "light");
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleAnalyze = async (resumeFile, jobDescription) => {
    setIsLoading(true);
    setShowResults(false);

    try {
      const data = await analyzeResume(resumeFile, jobDescription);
      setResults(data);
      setShowResults(true);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error(error);
      alert("Analysis failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <Header onToggleTheme={toggleTheme} theme={theme} />
      <Hero onAnalyzeClick={scrollToAnalyze} />
      <AnalyzeSection onAnalyze={handleAnalyze} analyzeRef={analyzeRef} />

      {isLoading && <LoadingState />}

      {showResults && !isLoading && (
        <ResultsSection resultsRef={resultsRef} results={results} />
      )}

      <FeaturesSection />
      <TeamSection />
      <FAQSection />
      <Footer />
    </div>
  );
}

export default App;
