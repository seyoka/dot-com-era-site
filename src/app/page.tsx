"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export default function Home() {
  const [theme, setTheme] = useState("light");
  const [soundEnabled, setSoundEnabled] = useState(false);

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

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const savedSound = localStorage.getItem("soundEnabled") === "true";
    setTheme(savedTheme);
    setSoundEnabled(savedSound);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

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
                <p className="text-text-secondary">Co-Founder</p>
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
          <div className="space-y-4">
            <div className="border-l-4 border-accent-blue pl-4 pixel-border bg-background p-4">
              <h3 className="text-base font-bold text-foreground mb-1">
                Tools and Text Editors
              </h3>
              <p className="text-sm text-text-secondary">April 8, 2024</p>
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
