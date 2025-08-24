export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
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
            Im the co-founder of Solara. Previously, I led engineering at
            Radiant AI. I enjoy working on both the frontend and backend.
            Based in New York, NY.
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
              <div className="work-icon w-12 h-12 bg-accent-blue border-2 border-foreground flex items-center justify-center text-background font-bold">
                S
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">Solara</h3>
                  <span className="text-sm text-text-secondary">→</span>
                </div>
                <p className="text-text-secondary">Solar energy platform</p>
              </div>
            </div>

            <div className="flex items-start gap-4 work-item">
              <div className="work-icon w-12 h-12 bg-text-secondary border-2 border-foreground flex items-center justify-center text-background font-bold">
                D
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">DeckHub</h3>
                  <span className="text-sm text-text-secondary">→</span>
                </div>
                <p className="text-text-secondary">Presentation software</p>
              </div>
            </div>

            <div className="flex items-start gap-4 work-item">
              <div className="work-icon w-12 h-12 bg-accent-purple border-2 border-foreground flex items-center justify-center text-background font-bold">
                S
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">SentryBot</h3>
                  <span className="text-sm text-text-secondary">→</span>
                </div>
                <p className="text-text-secondary">Automation tool</p>
              </div>
            </div>
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
    </div>
  );
}
