"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export default function Home() {
  const [theme, setTheme] = useState("light");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [bitcoinPrice, setBitcoinPrice] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<number | null>(null);

  // Sound effect functions
  const playBeep = useCallback((frequency: number, duration: number) => {
    if (!soundEnabled) return;

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioContext = new AudioContextClass();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'square'; // Retro square wave sound

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch {
      console.log('Audio not supported');
    }
  }, [soundEnabled]);

  // Removed unused sound functions
  const playToggleSound = useCallback(() => {
    playBeep(600, 0.1);
    setTimeout(() => playBeep(800, 0.1), 100);
  }, [playBeep]);

  // Fetch Bitcoin price
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
    const savedSound = localStorage.getItem("soundEnabled") === "true";
    setTheme(savedTheme);
    setSoundEnabled(savedSound);
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Fetch Bitcoin price on load and every 30 seconds
    fetchBitcoinPrice();
    const priceInterval = setInterval(fetchBitcoinPrice, 30000);

    return () => clearInterval(priceInterval);
  }, [fetchBitcoinPrice]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    playToggleSound();
  };

  // Removed unused toggleSound function

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Theme Toggle */}
      <div className="theme-toggle-container">
        <div className="theme-toggle-label">
          {theme === "light" ? "☀️" : "🌙"}
        </div>
        <div
          className="theme-toggle"
          data-theme={theme}
          onClick={toggleTheme}
        >
          <div className="theme-toggle-slider">
            {theme === "light" ? "☀" : "☾"}
          </div>
          <div className="theme-toggle-labels">
            <span>L</span>
            <span>D</span>
          </div>
        </div>
      </div>
      {/* Bitcoin Ticker */}
      <div className="mb-8 crypto-ticker p-3">
        <div className="flex items-center gap-4 relative z-10">
          <div className="text-xs font-mono text-foreground font-bold">
            💰 LIVE CRYPTO:
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="bitcoin-icon">₿ BTC</span>
            {bitcoinPrice ? (
              <>
                <span className="text-foreground font-bold">
                  ${bitcoinPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                {priceChange !== null && (
                  <span className={`font-bold ${priceChange >= 0 ? 'price-change-positive' : 'price-change-negative'}`}>
                    {priceChange >= 0 ? '▲' : '▼'} {Math.abs(priceChange).toFixed(2)}%
                  </span>
                )}
              </>
            ) : (
              <span className="text-text-secondary">Loading...</span>
            )}
            <div className="ticker-cursor text-accent-blue font-bold">█</div>
            <div className="text-text-secondary text-xs">
              • Updated every 30s
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="mb-16">
        <h1 className="text-5xl font-bold mb-4 text-foreground">
          Ryan Morrissey
        </h1>
        <p className="text-xl text-accent-blue mb-2">
          Software is eating the world!
        </p>
        <div className="border-t-2 border-border-light mt-8 pt-8">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            About, builder, founder, engineer.
          </h2>
          <p className="text-base text-text-secondary mb-4 leading-relaxed">
            Hey I&apos;m Ryan, welcome to my personal site! Here is all things about me :)
          </p>
          <p className="text-base text-accent-blue">
            Site best viewed in Netscape Navigator.
          </p>
        </div>
      </header>

      {/* Work Section */}
      <section className="mb-16">
        <div className="section-divider pt-8">
          <h2 className="text-2xl font-bold mb-8 text-foreground retro-text">Work</h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4 work-item">
              <div className="w-12 h-12 border-2 border-foreground overflow-hidden">
                <Image
                  src="/pxArt.png"
                  alt="Stripe logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">Stripe</h3>
                  <span className="text-sm text-text-secondary">→</span>
                </div>
                <p className="text-text-secondary">Software Engineering Intern</p>
              </div>
            </div>

            <div className="flex items-start gap-4 work-item">
              <div className="w-12 h-12 border-2 border-foreground overflow-hidden">
                <Image
                  src="/pxArt (1).png"
                  alt="Induct logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">Induct</h3>
                  <span className="text-sm text-text-secondary">→</span>
                </div>
                <p className="text-text-secondary">Prev Founded</p>
              </div>
            </div>

            {/* Education Subsection */}
            <div className="section-divider pt-8">
              <h3 className="text-xl font-bold mb-6 text-foreground">Education</h3>

              <div className="flex items-start gap-4 work-item">
                <div className="w-12 h-12 bg-accent-purple border-2 border-foreground flex items-center justify-center text-background font-bold">
                  UL
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-foreground">University of Limerick</h4>
                    <span className="text-sm text-text-secondary">→</span>
                  </div>
                  <p className="text-text-secondary">BSc in Immersive Software Engineering</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills/Tech Stack Section */}
      <section className="mb-16">
        <div className="section-divider pt-8">
          <h2 className="text-2xl font-bold mb-8 text-foreground retro-text">Skills & Tech Stack</h2>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
            {/* Placeholder tech icons - will be replaced with actual images */}
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-3 pixel-border bg-background hover:bg-border-light transition-all duration-100 cursor-pointer group">
                <div className="w-8 h-8 bg-text-secondary border border-foreground flex items-center justify-center text-background text-xs font-bold">
                  {i + 1}
                </div>
                <span className="text-xs text-text-secondary text-center group-hover:text-foreground">
                  Tech {i + 1}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 pixel-border bg-border-light">
            <p className="text-sm text-text-secondary text-center">
              💾 Tech stack icons coming soon! Currently brewing in the digital coffee pot...
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="mb-16">
        <div className="section-divider pt-8">
          <h2 className="text-2xl font-bold mb-8 text-foreground retro-text">Projects</h2>
          <div className="pixel-border bg-border-light p-6">
            <p className="text-text-secondary text-center ascii-decoration">
              Coming soon... Check back later for updates!
            </p>
          </div>
        </div>
      </section>

      {/* Reading Section */}
      <section className="mb-16">
        <div className="section-divider pt-8">
          <h2 className="text-2xl font-bold mb-8 text-foreground retro-text">Reading</h2>

          {/* Currently Reading */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 text-foreground ascii-decoration">Currently Reading</h3>
            <div className="pixel-border bg-background p-6 relative">
              <div className="flex items-start gap-4">
                <div className="w-16 h-20 border-2 border-foreground overflow-hidden bg-background">
                  <Image
                    src="/books/pragmatic-programmer.jpg"
                    alt="The Pragmatic Programmer book cover"
                    width={64}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-foreground mb-2">The Pragmatic Programmer</h4>
                  <p className="text-text-secondary mb-2">David Thomas & Andrew Hunt</p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="w-full h-3 border-2 border-foreground bg-background relative">
                        <div className="h-full bg-accent-blue" style={{ width: '67%' }}></div>
                      </div>
                      <p className="text-xs text-text-secondary mt-1">67% complete</p>
                    </div>
                    <div className="text-xs text-accent-blue font-mono">
                      ████████████▓▓▓▓▓
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reading List */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 text-foreground ascii-decoration">Reading List</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-accent-blue pl-4 pixel-border bg-background p-4 hover:bg-border-light transition-all duration-150 cursor-pointer work-item">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-16 border-2 border-foreground overflow-hidden bg-background flex-shrink-0">
                    <Image
                      src="/books/clean-architecture.jpg"
                      alt="Clean Architecture book cover"
                      width={48}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-foreground mb-1">
                      Clean Architecture
                    </h4>
                    <p className="text-sm text-text-secondary mb-1">Robert C. Martin</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-accent-purple text-background px-2 py-1 font-bold">TECHNICAL</span>
                      <span className="text-xs text-text-secondary">⭐ 4.2/5</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-accent-purple pl-4 pixel-border bg-background p-4 hover:bg-border-light transition-all duration-150 cursor-pointer work-item">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-16 border-2 border-foreground overflow-hidden bg-background flex-shrink-0">
                    <Image
                      src="/books/zero-to-one.jpg"
                      alt="Zero to One book cover"
                      width={48}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-foreground mb-1">
                      Zero to One
                    </h4>
                    <p className="text-sm text-text-secondary mb-1">Peter Thiel</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-accent-blue text-background px-2 py-1 font-bold">BUSINESS</span>
                      <span className="text-xs text-text-secondary">⭐ 4.1/5</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-accent-blue pl-4 pixel-border bg-background p-4 hover:bg-border-light transition-all duration-150 cursor-pointer work-item">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-16 border-2 border-foreground overflow-hidden bg-background flex-shrink-0">
                    <Image
                      src="/books/ddia.jpg"
                      alt="Designing Data-Intensive Applications book cover"
                      width={48}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-foreground mb-1">
                      Designing Data-Intensive Applications
                    </h4>
                    <p className="text-sm text-text-secondary mb-1">Martin Kleppmann</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-accent-purple text-background px-2 py-1 font-bold">TECHNICAL</span>
                      <span className="text-xs text-text-secondary">⭐ 4.7/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recently Finished */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 text-foreground ascii-decoration">Recently Finished</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-border-light pl-4 pixel-border bg-border-light p-4 opacity-80">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-base font-bold text-foreground mb-1">
                      Tools and Text Editors ✓
                    </h4>
                    <p className="text-sm text-text-secondary mb-1">Various Authors</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-foreground text-background px-2 py-1 font-bold">COMPLETED</span>
                      <span className="text-xs text-text-secondary">April 8, 2024</span>
                    </div>
                  </div>
                  <div className="text-accent-blue">✓</div>
                </div>
              </div>
            </div>
          </div>

          {/* Reading Stats */}
          <div className="pixel-border bg-background p-6">
            <h3 className="text-lg font-bold mb-4 text-foreground text-center">📊 Reading Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="pixel-border bg-border-light p-3">
                <div className="text-2xl font-bold text-accent-blue">12</div>
                <div className="text-xs text-text-secondary">Books This Year</div>
              </div>
              <div className="pixel-border bg-border-light p-3">
                <div className="text-2xl font-bold text-accent-purple">67%</div>
                <div className="text-xs text-text-secondary">Current Progress</div>
              </div>
              <div className="pixel-border bg-border-light p-3">
                <div className="text-2xl font-bold text-foreground">3</div>
                <div className="text-xs text-text-secondary">Books/Month Avg</div>
              </div>
              <div className="pixel-border bg-border-light p-3">
                <div className="text-2xl font-bold text-accent-blue">🔥</div>
                <div className="text-xs text-text-secondary">7 Day Streak</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mb-16">
        <div className="section-divider pt-8">
          <h2 className="text-2xl font-bold mb-8 text-foreground retro-text">Contact</h2>

          <div className="pixel-border bg-background p-8">
            <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">

              {/* LinkedIn */}
              <div className="flex items-center gap-4 work-item">
                <div className="w-12 h-12 border-2 border-foreground overflow-hidden">
                  <Image
                    src="/linkedin.png"
                    alt="LinkedIn"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">LinkedIn</h3>
                  <p className="text-text-secondary text-sm">Professional network</p>
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-center gap-4 work-item">
                <div className="w-12 h-12 border-2 border-foreground overflow-hidden">
                  <Image
                    src="/github.png"
                    alt="GitHub"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">GitHub</h3>
                  <p className="text-text-secondary text-sm">Code repositories</p>
                </div>
              </div>

            </div>

            {/* Email */}
            <div className="mt-8 text-center">
              <div className="inline-block pixel-border bg-border-light p-4">
                <h3 className="text-lg font-bold text-foreground mb-2">📧 Email</h3>
                <p className="text-accent-blue font-mono text-sm">
                  ryanj[dot]morrissey@gmail.com
                </p>
                <p className="text-xs text-text-secondary mt-2">
                  (Because spam bots can&apos;t handle the dot notation 🤖)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
