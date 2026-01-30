"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export default function Home() {
  const [theme, setTheme] = useState("light");
  const [bitcoinPrice, setBitcoinPrice] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<number | null>(null);

  const fetchBitcoinPrice = useCallback(async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
      const data = await response.json();
      setBitcoinPrice(data.bitcoin.usd);
      setPriceChange(data.bitcoin.usd_24h_change);
    } catch (error) {
      console.log('Failed to fetch Bitcoin price:', error);
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    fetchBitcoinPrice();
    const priceInterval = setInterval(fetchBitcoinPrice, 30000);
    return () => clearInterval(priceInterval);
  }, [fetchBitcoinPrice]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Theme Toggle */}
      <div className="theme-toggle-container">
        <button className="btn-aqua" onClick={toggleTheme}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>

      {/* Main Container */}
      <div className="max-w-3xl mx-auto">
        
        {/* Header Window */}
        <div className="window-panel mb-6">
          <div className="window-titlebar">
            <div className="window-button close"></div>
            <div className="window-button minimize"></div>
            <div className="window-button maximize"></div>
            <span className="text-xs font-bold ml-2">Welcome</span>
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">Ryan Morrissey</h1>
            <p className="text-accent-blue font-medium mb-4">Software is eating the world!</p>
            <hr className="divider-classic" />
            <p className="text-text-secondary leading-relaxed">
              Hey I&apos;m Ryan, welcome to my personal site! Im a 19 year old Software Engineer from Limerick. 
              I currently live in Dublin, but I often visit San Francisco. I love reading, running, watching 
              tv shows and playing games and interested in friends for the afforementioned things.
            </p>
            <p className="text-text-secondary mt-4">
              Feel free to reach out, all emails are welcome :)
            </p>
            <p className="text-xs text-text-secondary mt-4 italic">
              Site best viewed in Netscape Navigator 4.0 or Internet Explorer 5.0
            </p>
          </div>
        </div>

        {/* Ticker Bar */}
        <div className="ticker-bar p-2 mb-6 flex items-center gap-4">
          <span className="font-bold">LIVE:</span>
          <span>BTC</span>
          {bitcoinPrice ? (
            <>
              <span className="font-bold">${bitcoinPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              {priceChange !== null && (
                <span className={priceChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                  ({priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%)
                </span>
              )}
            </>
          ) : (
            <span>Loading...</span>
          )}
          <span className="text-text-secondary ml-auto text-xs">Updates every 30s</span>
        </div>

        {/* Work & Education */}
        <div className="window-panel mb-6">
          <div className="window-titlebar">
            <div className="window-button close"></div>
            <div className="window-button minimize"></div>
            <div className="window-button maximize"></div>
            <span className="text-xs font-bold ml-2">Experience</span>
          </div>
          <div className="p-4">
            <h2 className="section-header">Work</h2>
            
            <div className="work-item item-hover">
              <div className="work-icon">
                <Image src="/pxArt.png" alt="Stripe" width={40} height={40} />
              </div>
              <div>
                <div className="font-bold">Stripe</div>
                <div className="text-sm text-text-secondary">Software Engineering Intern</div>
              </div>
            </div>

            <div className="work-item item-hover">
              <div className="work-icon">
                <Image src="/pxArt (1).png" alt="Induct" width={40} height={40} />
              </div>
              <div>
                <div className="font-bold">Induct</div>
                <div className="text-sm text-text-secondary">Prev Founded</div>
              </div>
            </div>

            <h2 className="section-header mt-6">Education</h2>
            
            <div className="work-item item-hover">
              <div className="work-icon bg-accent-purple text-white font-bold text-sm">
                UL
              </div>
              <div>
                <div className="font-bold">University of Limerick</div>
                <div className="text-sm text-text-secondary">BSc in Immersive Software Engineering</div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills & Tech Stack */}
        <div className="window-panel mb-6">
          <div className="window-titlebar">
            <div className="window-button close"></div>
            <div className="window-button minimize"></div>
            <div className="window-button maximize"></div>
            <span className="text-xs font-bold ml-2">Skills</span>
          </div>
          <div className="p-4">
            <h2 className="section-header">Tech Stack</h2>
            
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-4">
              {[
                { name: "TypeScript", img: "/tech-icons/typescript.png" },
                { name: "React", img: "/tech-icons/react.png" },
                { name: "Next.js", img: "/tech-icons/nextjs.png" },
                { name: "Convex", img: "/tech-icons/convex.png" },
                { name: "Tailwind", img: "/tech-icons/tailwindcss.png" },
                { name: "Node.js", img: "/tech-icons/nodejs.png" },
                { name: "Python", img: "/tech-icons/python.png" },
                { name: "ethers.js", img: "/tech-icons/ethereum.png" },
                { name: "Postgres", img: "/tech-icons/postgresql.png" },
                { name: "Docker", img: "/tech-icons/docker.png" },
                { name: "Git", img: "/tech-icons/git.png" },
                { name: "Fly.io", img: "/tech-icons/flyio.png" },
              ].map((tech, i) => (
                <div key={i} className="tech-icon-item">
                  <Image src={tech.img} alt={tech.name} width={32} height={32} />
                  <span className="text-xs text-text-secondary">{tech.name}</span>
                </div>
              ))}
            </div>

            <div className="field-inset">
              <div className="text-xs font-bold mb-1">Currently Learning:</div>
              <div className="text-xs text-text-secondary">
                Quantitative trading | Rust | System design at scale
              </div>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="window-panel mb-6">
          <div className="window-titlebar">
            <div className="window-button close"></div>
            <div className="window-button minimize"></div>
            <div className="window-button maximize"></div>
            <span className="text-xs font-bold ml-2">Projects</span>
          </div>
          <div className="p-4">
            <h2 className="section-header">Current Projects</h2>
            
            <div className="project-card item-hover">
              <div className="flex items-start gap-3">
                <div className="work-icon bg-accent-purple text-white font-bold">CC</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="project-title">Carbon Copy</span>
                    <span className="tag-classic bg-accent-blue text-white">ACTIVE</span>
                  </div>
                  <p className="project-desc">
                    Copy trading platform for prediction markets. Follow top traders and automatically 
                    mirror their positions on Polymarket.
                  </p>
                  <div className="project-tags">
                    <span className="tag-classic">Next.js</span>
                    <span className="tag-classic">Convex</span>
                    <span className="tag-classic">Polymarket API</span>
                    <span className="tag-classic">ethers.js</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="project-card item-hover">
              <div className="flex items-start gap-3">
                <div className="work-icon bg-accent-blue text-white font-bold text-lg">T</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="project-title">Time Tracking Tool</span>
                    <span className="tag-classic">SHIPPED</span>
                  </div>
                  <p className="project-desc">
                    Simple tool for tracking time spent on projects and tasks. Built because existing 
                    tools were too bloated.
                  </p>
                  <div className="project-tags">
                    <span className="tag-classic">React</span>
                    <span className="tag-classic">Node.js</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="project-card item-hover">
              <div className="flex items-start gap-3">
                <div className="work-icon bg-foreground text-background font-bold">W</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="project-title">This Website</span>
                    <span className="tag-classic bg-accent-purple text-white">META</span>
                  </div>
                  <p className="project-desc">
                    Personal site with that authentic dot-com era aesthetic. Classic Mac OS inspired design.
                  </p>
                  <div className="project-tags">
                    <span className="tag-classic">Next.js 15</span>
                    <span className="tag-classic">React 19</span>
                    <span className="tag-classic">Tailwind 4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reading */}
        <div className="window-panel mb-6">
          <div className="window-titlebar">
            <div className="window-button close"></div>
            <div className="window-button minimize"></div>
            <div className="window-button maximize"></div>
            <span className="text-xs font-bold ml-2">Reading</span>
          </div>
          <div className="p-4">
            <h2 className="section-header">Currently Reading</h2>
            
            <div className="book-item">
              <Image src="/thebigshort.png" alt="The Big Short" width={48} height={64} className="book-cover" />
              <div className="flex-1">
                <div className="font-bold">The Big Short</div>
                <div className="text-sm text-text-secondary mb-2">Michael Lewis</div>
                <div className="progress-bar-classic">
                  <div className="progress-bar-fill" style={{ width: '67%' }}></div>
                </div>
                <div className="text-xs text-text-secondary mt-1">67% complete</div>
              </div>
            </div>

            <h2 className="section-header mt-6">Reading List</h2>
            
            <div className="book-item item-hover">
              <Image src="/cleanarchitecture.png" alt="Clean Architecture" width={48} height={64} className="book-cover" />
              <div>
                <div className="font-bold">Clean Architecture</div>
                <div className="text-sm text-text-secondary">Robert C. Martin</div>
                <div className="flex gap-2 mt-1">
                  <span className="tag-classic bg-accent-purple text-white">TECHNICAL</span>
                  <span className="text-xs text-text-secondary">4.2/5</span>
                </div>
              </div>
            </div>

            <div className="book-item item-hover">
              <Image src="/zerotoone.png" alt="Zero to One" width={48} height={64} className="book-cover" />
              <div>
                <div className="font-bold">Zero to One</div>
                <div className="text-sm text-text-secondary">Peter Thiel</div>
                <div className="flex gap-2 mt-1">
                  <span className="tag-classic bg-accent-blue text-white">BUSINESS</span>
                  <span className="text-xs text-text-secondary">4.1/5</span>
                </div>
              </div>
            </div>

            <div className="book-item item-hover">
              <Image src="/datainstense.png" alt="Designing Data-Intensive Applications" width={48} height={64} className="book-cover" />
              <div>
                <div className="font-bold">Designing Data-Intensive Applications</div>
                <div className="text-sm text-text-secondary">Martin Kleppmann</div>
                <div className="flex gap-2 mt-1">
                  <span className="tag-classic bg-accent-purple text-white">TECHNICAL</span>
                  <span className="text-xs text-text-secondary">4.7/5</span>
                </div>
              </div>
            </div>

            <h2 className="section-header mt-6">Reading Stats</h2>
            
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-value">12</div>
                <div className="stat-label">Books This Year</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">67%</div>
                <div className="stat-label">Current Progress</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">3</div>
                <div className="stat-label">Books/Month</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">7</div>
                <div className="stat-label">Day Streak</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="window-panel mb-6">
          <div className="window-titlebar">
            <div className="window-button close"></div>
            <div className="window-button minimize"></div>
            <div className="window-button maximize"></div>
            <span className="text-xs font-bold ml-2">Contact</span>
          </div>
          <div className="p-4">
            <h2 className="section-header">Get In Touch</h2>
            
            <div className="flex flex-wrap gap-6 justify-center mb-6">
              <a href="https://linkedin.com/in/ryanmorrissey" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 item-hover p-2 rounded no-underline">
                <div className="contact-icon">
                  <Image src="/linkedin.png" alt="LinkedIn" width={32} height={32} />
                </div>
                <div>
                  <div className="font-bold text-foreground">LinkedIn</div>
                  <div className="text-xs text-text-secondary">Professional network</div>
                </div>
              </a>

              <a href="https://github.com/seyoka" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 item-hover p-2 rounded no-underline">
                <div className="contact-icon">
                  <Image src="/github.png" alt="GitHub" width={32} height={32} />
                </div>
                <div>
                  <div className="font-bold text-foreground">GitHub</div>
                  <div className="text-xs text-text-secondary">Code repositories</div>
                </div>
              </a>
            </div>

            <div className="field-inset text-center">
              <div className="font-bold mb-1">Email</div>
              <div className="font-mono text-sm text-accent-blue">
                ryanj[dot]morrissey[at]gmail.com
              </div>
              <div className="text-xs text-text-secondary mt-2">
                (Obfuscated to prevent spam harvesting)
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-text-secondary py-4">
          <p>Copyright 2026 Ryan Morrissey. All rights reserved.</p>
          <p className="mt-1">You are visitor #<span className="font-mono">000,042</span></p>
        </div>

      </div>
    </div>
  );
}
