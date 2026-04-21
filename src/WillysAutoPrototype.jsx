import { useState, useEffect } from 'react';

const FACEBOOK_PAGE_URL = 'https://www.facebook.com/bestmechanicintown/';

const SERVICES = [
  'Engine diagnostics and repair',
  'Transmission service and repair',
  'Brake service and repair',
  'Suspension and steering',
  'A/C repair and recharging',
  'Electrical diagnostics and repair',
  'Oil changes and maintenance',
  'Radiator and cooling system',
  'Exhaust systems',
  'Check engine light diagnostics',
  'Pre-purchase vehicle inspections',
  'Battery replacement',
  'Tire repair',
];

const REVIEWS = [
  {
    text: "Seriously the most honest auto mechanics I've ever used. They are amazing about communicating with you about the status of your vehicle. I've never felt like they were trying to upsell me on unnecessary fixes. If you want mechanics you can trust, go to these guys — they're the real deal.",
    author: 'Kaitlyn Vega',
    badge: null,
  },
  {
    text: "Emily went above and beyond driving me to work after drop off. She kept in touch with progress and price so there were no surprises. Once done, in a very timely manner, she picked me up.",
    author: 'Jolee Ferriter',
    badge: null,
  },
  {
    text: "Jason went above and beyond to help my wife and I last week. He moved things around to help us anyway — it was a Saturday when they aren't usually open.",
    author: 'Connor Bridge',
    badge: 'Local Guide',
  },
  {
    text: "Another shop quoted around triple the price I paid here. Also glad I didn't do the work myself as it turned out to be fairly difficult stuff. Thanks for the good work and great price!",
    author: 'Colten Hoffmeier',
    badge: null,
  },
  {
    text: "As a first-time car owner, Willy and his team gave me so much peace of mind! Going to a mechanic can be such an intimidating experience, especially if it's your first time, but coming to Willy's was great!",
    author: 'Keilin Huang',
    badge: null,
  },
  {
    text: "Willy's Auto, wow — this place is my new favorite auto shop in the Missoula area. If I could rate it 10/5 stars, I absolutely would.",
    author: 'Allison Kadler',
    badge: null,
  },
];

function Star() {
  return (
    <svg className="w-5 h-5 fill-brand-accent" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function WillysAutoPrototype() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = ['Services', 'Reviews', 'About', 'Contact'];
  const handleNavClick = () => setMobileMenuOpen(false);
  const basePath = import.meta.env.BASE_URL;
  const facebookFeedUrl = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
    FACEBOOK_PAGE_URL,
  )}&tabs=timeline&width=500&height=620&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;

  return (
    <div className="min-h-screen bg-brand-cream text-brand-ink">
      {/* Nav */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-brand-surface/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-between">
          <a
            href="#hero"
            className="flex items-center gap-3 pr-3 md:pr-5 hover:text-brand-accent transition-colors"
          >
            <img
              src={`${import.meta.env.BASE_URL}willysauto.png`}
              alt="Willy's Auto"
              className="h-[4rem] md:h-[4.75rem] w-auto origin-left scale-[1.38] object-contain"
            />
          </a>
          <div className="hidden md:flex gap-8">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-medium text-brand-cream hover:text-brand-accent transition-colors"
              >
                {item}
              </a>
            ))}
            <a
              href={`${basePath}staff`}
              className="font-medium text-brand-cream hover:text-brand-accent transition-colors"
            >
              Staff
            </a>
            <a
              href={`${basePath}videos`}
              className="font-medium text-brand-cream hover:text-brand-accent transition-colors"
            >
              See Our Work
            </a>
          </div>
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-brand-cream hover:text-brand-accent"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-brand-surface border-t border-brand-accent/30 px-6 py-4">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={handleNavClick}
                className="block py-2 font-medium text-brand-cream hover:text-brand-accent transition-colors"
              >
                {item}
              </a>
            ))}
            <a
              href={`${basePath}staff`}
              onClick={handleNavClick}
              className="block py-2 font-medium text-brand-cream hover:text-brand-accent transition-colors"
            >
              Staff
            </a>
            <a
              href={`${basePath}videos`}
              onClick={handleNavClick}
              className="block py-2 font-medium text-brand-cream hover:text-brand-accent transition-colors"
            >
              See Our Work
            </a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section
        id="hero"
        className="min-h-screen flex items-center px-6 pt-20 pb-12 bg-brand-surface text-brand-cream"
      >
        <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              20+ years in Missoula
            </h1>
            <p className="text-xl md:text-2xl text-brand-cream/90 mb-4">
              We grew by word of mouth because we do something simple: we never charge you for what you don't need.
            </p>
            <p className="text-lg text-brand-cream/80 mb-10">
              That's it. Honest communication, honest work. Missoula trusted us long before we had a website.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="tel:4067219455"
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-accent text-brand-ink font-semibold rounded-lg hover:bg-brand-accent-hover transition-colors"
              >
                Call (406) 721-9455
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-brand-accent text-brand-accent font-semibold rounded-lg hover:bg-brand-accent hover:text-brand-ink transition-colors"
              >
                Our Services
              </a>
            </div>
          </div>
          <div className="flex-1 w-full max-w-xl lg:max-w-none">
            <img
              src={`${import.meta.env.BASE_URL}storefront.png`}
              onError={(event) => {
                event.currentTarget.src = `${import.meta.env.BASE_URL}storefront.svg`;
              }}
              alt="Willy's Auto storefront"
              className="w-full rounded-lg shadow-xl object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-ink mb-4 text-center">
            Services
          </h2>
          <p className="text-lg text-brand-ink/80 mb-12 text-center max-w-2xl mx-auto">
            All makes and models, foreign and domestic. Engine to exhaust, we've got you covered.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {SERVICES.map((service) => (
              <div
                key={service}
                className="p-5 rounded-lg bg-white border border-brand-ink/10 hover:border-brand-accent/50 transition-colors"
              >
                <p className="font-medium text-brand-ink">{service}</p>
              </div>
            ))}
            <div className="p-6 rounded-lg bg-brand-surface text-brand-cream border-2 border-brand-accent col-span-full md:col-span-2 md:col-start-1 lg:col-span-3 lg:col-start-1">
              <p className="text-brand-accent font-semibold mb-2">Something different</p>
              <p className="text-xl font-bold mb-2">Custom Fabrication & Hot Rod Work</p>
              <p className="text-brand-cream/90 text-sm">
                Not your typical general repair shop. We build, we fabricate, we make it work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Willy's */}
      <section className="py-20 px-6 bg-brand-surface text-brand-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Why Willy's
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg bg-brand-deep/55 border border-brand-accent/30">
              <div className="text-4xl font-bold text-brand-accent mb-3">20+ Years</div>
              <p className="font-semibold mb-2">Zero Advertising</p>
              <p className="text-brand-cream/85">
                We've grown entirely by word of mouth since 2003. No ads, no gimmicks. Just people telling their friends.
              </p>
            </div>
            <div className="text-center p-8 rounded-lg bg-brand-deep/55 border border-brand-accent/30">
              <p className="font-semibold mb-2 text-brand-accent">We Show You, Not Just Tell You</p>
              <p className="text-brand-cream/85">
                We'll take you into the shop and show you exactly what needs doing and why.
                </p>
            </div>
            <div className="text-center p-8 rounded-lg bg-brand-deep/55 border border-brand-accent/30">
              <p className="font-semibold mb-2 text-brand-accent">You Won't Pay for What You Don't Need</p>
              <p className="text-brand-cream/85">
                We don't upsell. If it doesn't need fixing, we'll tell you. That's the reputation we've earned.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-ink mb-4 text-center">
            Built on Word of Mouth
          </h2>
          <p className="text-lg text-brand-ink/80 mb-12 text-center max-w-2xl mx-auto">
            What Missoula has been saying about us
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <div
                key={i}
                className="p-6 rounded-lg bg-white border border-brand-ink/10 flex flex-col"
              >
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((_, j) => (
                    <Star key={j} />
                  ))}
                </div>
                <p className="text-brand-ink mb-4 flex-grow">"{review.text}"</p>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-brand-ink">— {review.author}</p>
                  {review.badge && (
                    <span className="text-xs px-2 py-0.5 bg-brand-accent/20 text-brand-accent rounded font-medium">
                      {review.badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6 bg-brand-deep text-brand-cream">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            About
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-brand-cream/90">
            <p>
              Jason "Willy" Williams founded Willy's Auto in 2003 and has grown it purely by reputation. Emily runs the front desk and keeps you in the loop; Bryce handles the wrench work. Both show up in reviews by name because that's the kind of shop this is: real people, real communication.
            </p>
            <p>
              We have a simple policy: we'll take you into the shop and show you exactly what needs doing and why. If it doesn't need fixing, we won't charge you for it.
            </p>
            <p>
              Beyond general repair, we also do custom fabrication and hot rod work which sets us apart from most shops in town. All makes and models, foreign and domestic. Winner of Best in Missoula.
            </p>
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className="py-16 px-6 bg-brand-surface text-brand-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-8 flex justify-center">
            <img
              src={`${import.meta.env.BASE_URL}willysauto.png`}
              alt="Willy's Auto"
              className="h-[4.75rem] md:h-[5.5rem] w-auto object-contain"
            />
          </h2>
          <div className="space-y-2 mb-8">
            <p>721 Mount Ave, Suite A</p>
            <p>Missoula, MT 59801</p>
            <p className="mt-4">
              <a href="tel:4067219455" className="text-brand-accent font-semibold hover:underline">
                (406) 721-9455
              </a>
            </p>
          </div>
          <div className="mb-8">
            <p className="font-semibold mb-2">Hours</p>
            <p>Mon–Fri 8:30am–5:30pm</p>
            <p>Sat–Sun closed</p>
          </div>
          <div className="mb-8 rounded-xl border border-brand-accent/30 bg-brand-deep p-4 md:p-5">
            <div className="rounded-lg border border-brand-accent/25 overflow-hidden">
              <iframe
                title="Willy's Auto Facebook Feed"
                src={facebookFeedUrl}
                width="100%"
                height="100%"
                className="h-[500px] md:h-[620px]"
                loading="lazy"
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>
            <div className="mt-3">
              <a
                href={FACEBOOK_PAGE_URL}
                target="_blank"
                rel="noreferrer"
                className="text-brand-accent font-semibold hover:underline"
              >
                View Facebook page
              </a>
            </div>
          </div>
          <p className="text-brand-cream/80">
            Call for an appointment. We'll get you in.
          </p>
        </div>
      </footer>
    </div>
  );
}
