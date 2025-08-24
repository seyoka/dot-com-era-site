import Image from "next/image";

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
            I'm the co-founder of Induct and currently a Software Engineering Intern at Stripe. 
            I enjoy working on both the frontend and backend.
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
