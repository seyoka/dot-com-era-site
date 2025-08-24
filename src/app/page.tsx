"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Section = "dev" | "work" | "projects" | "contact";

export default function Home() {
  const [theme, setTheme] = useState("light");
  const [activeSection, setActiveSection] = useState<Section>("dev");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const switchSection = (section: Section) => {
    if (section === activeSection || isLoading) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setActiveSection(section);
      setIsLoading(false);
    }, 800);
  };

  const navigationItems = [
    { id: "dev" as Section, label: "/dev", icon: "👨‍💻", description: "About & Skills" },
    { id: "work" as Section, label: "/work", icon: "💼", description: "Experience" },
    { id: "projects" as Section, label: "/projects", icon: "📁", description: "Portfolio" },
    { id: "contact" as Section, label: "/contact", icon: "📧", description: "Get in touch" }
  ];

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="loading-screen">
          <div className="loading-content">
            <div className="loading-text">Loading...</div>
            <div className="loading-bar-container">
              <div className="loading-bar">
                <div className="loading-progress"></div>
              </div>
              <div className="loading-percentage">█████████████████████</div>
            </div>
            <div className="loading-dots">
              <span>.</span><span>.</span><span>.</span>
            </div>
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case "dev":
        return (
          <div className="content-section">
            <div className="terminal-header">
              <span className="terminal-path">~/dev/about</span>
              <span className="cursor-blink">_</span>
            </div>
            
            <h1 className="main-title">Ryan Morrissey</h1>
            <p className="tagline">Always debugging. Occasionally sleeping.</p>
            
            <div className="section-break"></div>
            
            <h2>About, builder, founder, engineer.</h2>
            <p className="about-text">
              Hey I&apos;m Ryan, welcome to my personal site! Here is all things about me :)
            </p>
            <p className="netscape-note">Site best viewed in Netscape Navigator.</p>

            <div className="section-break"></div>
            
            <h2>Skills & Tech Stack</h2>
            <div className="skills-grid">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="skill-item">
                  <div className="skill-icon">{i + 1}</div>
                  <span className="skill-name">Tech {i + 1}</span>
                </div>
              ))}
            </div>
            <div className="placeholder-note">
              💾 Tech stack icons coming soon! Currently brewing in the digital coffee pot...
            </div>
          </div>
        );

      case "work":
        return (
          <div className="content-section">
            <div className="terminal-header">
              <span className="terminal-path">~/work/experience</span>
              <span className="cursor-blink">_</span>
            </div>
            
            <h1>Work Experience</h1>
            
            <div className="work-items">
              <div className="work-item">
                <div className="work-icon">
                  <Image
                    src="/pxArt.png"
                    alt="Stripe logo"
                    width={48}
                    height={48}
                    className="work-logo"
                  />
                </div>
                <div className="work-details">
                  <h3>Stripe</h3>
                  <p>Software Engineering Intern</p>
                  <span className="work-arrow">→</span>
                </div>
              </div>
              
              <div className="work-item">
                <div className="work-icon">
                  <Image
                    src="/pxArt (1).png"
                    alt="Induct logo"
                    width={48}
                    height={48}
                    className="work-logo"
                  />
                </div>
                <div className="work-details">
                  <h3>Induct</h3>
                  <p>Co-Founder</p>
                  <span className="work-arrow">→</span>
                </div>
              </div>
            </div>

            <div className="section-break"></div>
            
            <h2>Education</h2>
            <div className="work-item">
              <div className="work-icon education-icon">UL</div>
              <div className="work-details">
                <h3>University of Limerick</h3>
                <p>BSc in Immersive Software Engineering</p>
                <span className="work-arrow">→</span>
              </div>
            </div>
          </div>
        );

      case "projects":
        return (
          <div className="content-section">
            <div className="terminal-header">
              <span className="terminal-path">~/projects/portfolio</span>
              <span className="cursor-blink">_</span>
            </div>
            
            <h1>Projects</h1>
            <div className="construction-area">
              <p className="construction-text">▓▓▓ Coming soon... Check back later for updates! ▓▓▓</p>
            </div>
            
            <div className="section-break"></div>
            
            <h2>Reading</h2>
            <div className="reading-item">
              <h3>Tools and Text Editors</h3>
              <p className="reading-date">April 8, 2024</p>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="content-section">
            <div className="terminal-header">
              <span className="terminal-path">~/contact/info</span>
              <span className="cursor-blink">_</span>
            </div>
            
            <h1>Contact Information</h1>
            
            <div className="contact-methods">
              <div className="contact-item">
                <div className="contact-icon">
                  <Image
                    src="/linkedin.png"
                    alt="LinkedIn"
                    width={48}
                    height={48}
                    className="contact-logo"
                  />
                </div>
                <div className="contact-details">
                  <h3>LinkedIn</h3>
                  <p>Professional network</p>
                  <span className="contact-arrow">→</span>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <Image
                    src="/github.png"
                    alt="GitHub"
                    width={48}
                    height={48}
                    className="contact-logo"
                  />
                </div>
                <div className="contact-details">
                  <h3>GitHub</h3>
                  <p>Code repositories</p>
                  <span className="contact-arrow">→</span>
                </div>
              </div>
            </div>

            <div className="email-section">
              <h2>📧 Email</h2>
              <p className="email-address">ryanj[dot]morrissey@gmail.com</p>
              <p className="email-note">(Because spam bots can&apos;t handle the dot notation 🤖)</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="app-layout">
      {/* Fixed Sidebar Navigation */}
      <nav className="sidebar">
        <div className="sidebar-header">
          <div className="logo-section">
            <span className="terminal-prompt">ryan@dev:~$</span>
          </div>
          
          {/* Theme Toggle */}
          <button className="theme-toggle-sidebar" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>

        <div className="nav-section">
          <div className="nav-title">Navigation</div>
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''} ${isLoading ? 'disabled' : ''}`}
              onClick={() => switchSection(item.id)}
              disabled={isLoading}
            >
              <span className="nav-icon">{item.icon}</span>
              <div className="nav-content">
                <span className="nav-label">{item.label}</span>
                <span className="nav-desc">{item.description}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="system-info">
            <div className="info-line">System: ReactOS</div>
            <div className="info-line">Uptime: {new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}