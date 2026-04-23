import { useEffect, useMemo, useRef, useState } from 'react';

const TIKTOK_VIDEO_URLS = [
  'https://www.tiktok.com/@willysauto664/video/7557373941895941406',
  'https://www.tiktok.com/@willysauto664/video/7550781275330661663',
  'https://www.tiktok.com/@willysauto664/video/7541560087924509983',
  'https://www.tiktok.com/@willysauto664/video/7538575725486427447',
  'https://www.tiktok.com/@willysauto664/video/7530063066600328479',
  'https://www.tiktok.com/@willysauto664/video/7527187780242312478',
  'https://www.tiktok.com/@willysauto664/video/7521070126209256735',
  'https://www.tiktok.com/@willysauto664/video/7520762158892748045',
  'https://www.tiktok.com/@willysauto664/video/7519953849084415262',
  'https://www.tiktok.com/@willysauto664/video/7519345145263721742',
  'https://www.tiktok.com/@willysauto664/video/7517877362675993886',
  'https://www.tiktok.com/@willysauto664/video/7517353125481647391',
  'https://www.tiktok.com/@willysauto664/video/7517346234684673294',
  'https://www.tiktok.com/@willysauto664/video/7506638676143639839',
  'https://www.tiktok.com/@willysauto664/video/7504002271567465759',
  'https://www.tiktok.com/@willysauto664/video/7503998875561233694',
  'https://www.tiktok.com/@willysauto664/video/7501788842891185454',
  'https://www.tiktok.com/@willysauto664/video/7500715253026655531',
  'https://www.tiktok.com/@willysauto664/video/7500330402888813866',
  'https://www.tiktok.com/@willysauto664/video/7474796467471912222',
  'https://www.tiktok.com/@willysauto664/video/7474432608709971230',
  'https://www.tiktok.com/@willysauto664/video/7417674104095919403',
  'https://www.tiktok.com/@willysauto664/video/7260352741107649835',
  'https://www.tiktok.com/@willysauto664/video/7260241073774054702',
  'https://www.tiktok.com/@willysauto664/video/7233870225756736811',
  'https://www.tiktok.com/@willysauto664/video/7212296752941124906',
  'https://www.tiktok.com/@willysauto664/video/7211926409046936874',
];

function extractVideoId(url) {
  const match = url.match(/\/video\/(\d+)/);
  return match ? match[1] : null;
}

function TikTokCard({ video }) {
  const cardRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [showSlowLoadHint, setShowSlowLoadHint] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (shouldLoad || !cardRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' },
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad || iframeLoaded) {
      return;
    }

    const fallbackTimer = window.setTimeout(() => {
      setShowSlowLoadHint(true);
    }, 10000);

    return () => {
      window.clearTimeout(fallbackTimer);
    };
  }, [shouldLoad, iframeLoaded]);

  return (
    <div ref={cardRef} className="rounded-lg border border-brand-ink/10 overflow-hidden bg-brand-ink/5">
      {shouldLoad ? (
        <div className="relative h-[520px] bg-white">
          <iframe
            title={`TikTok video ${video.id}`}
            src={`https://www.tiktok.com/embed/v2/${video.id}`}
            width="100%"
            height="100%"
            className="h-[520px]"
            loading="lazy"
            style={{ border: 'none' }}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            onLoad={() => {
              setIframeLoaded(true);
              setShowFallback(false);
            }}
            onError={() => {
              setShowFallback(true);
            }}
          />
          {showFallback && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center bg-white/95">
              <p className="text-sm text-brand-ink/80">
                Video embed did not load in this browser.
              </p>
              <a
                href={video.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded border border-brand-accent px-4 py-2 font-semibold text-brand-accent hover:bg-brand-accent hover:text-brand-ink transition-colors"
              >
                Watch on TikTok
              </a>
            </div>
          )}
        </div>
      ) : (
        <div className="h-[520px] flex items-center justify-center text-brand-ink/70 bg-white">
          Loading video...
        </div>
      )}
      <div className="px-3 py-2 bg-white border-t border-brand-ink/10">
        <div className="flex items-center justify-between gap-3">
          <a
            href={video.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-brand-ink hover:text-brand-accent transition-colors"
          >
            Open on TikTok
          </a>
          {showSlowLoadHint && !iframeLoaded && !showFallback && (
            <span className="text-xs text-brand-ink/65">
              Taking too long? Use the TikTok link.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WillysAutoVideos() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const tikTokEmbeds = useMemo(
    () => TIKTOK_VIDEO_URLS.map((url) => ({ url, id: extractVideoId(url) })).filter((video) => video.id),
    [],
  );
  const visibleTikToks = useMemo(() => tikTokEmbeds.slice(0, visibleCount), [tikTokEmbeds, visibleCount]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "See Our Work | Willy's Auto";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const homeBase = import.meta.env.BASE_URL;

  return (
    <div className="min-h-screen bg-brand-cream text-brand-ink">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-brand-surface/95 backdrop-blur-sm shadow-lg' : 'bg-brand-surface'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-between">
          <a
            href={homeBase}
            className="flex items-center gap-3 pr-3 md:pr-5 hover:text-brand-accent transition-colors"
          >
            <img
              src={`${homeBase}willysauto.png`}
              alt="Willy's Auto"
              className="h-[4rem] md:h-[4.75rem] w-auto origin-left scale-[1.38] object-contain"
            />
          </a>
          <div className="hidden md:flex gap-8">
            <a href={`${homeBase}#services`} className="font-medium text-brand-cream hover:text-brand-accent transition-colors">Services</a>
            <a href={`${homeBase}#reviews`} className="font-medium text-brand-cream hover:text-brand-accent transition-colors">Reviews</a>
            <a href={`${homeBase}#about`} className="font-medium text-brand-cream hover:text-brand-accent transition-colors">About</a>
            <a href={`${homeBase}#contact`} className="font-medium text-brand-cream hover:text-brand-accent transition-colors">Contact</a>
            <a href={`${homeBase}staff`} className="font-medium text-brand-cream hover:text-brand-accent transition-colors">Staff</a>
            <a href={`${homeBase}videos`} className="font-medium text-brand-accent">See Our Work</a>
          </div>
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
        {mobileMenuOpen && (
          <div className="md:hidden bg-brand-surface border-t border-brand-accent/30 px-6 py-4">
            <a href={`${homeBase}#services`} className="block py-2 font-medium text-brand-cream hover:text-brand-accent transition-colors">Services</a>
            <a href={`${homeBase}#reviews`} className="block py-2 font-medium text-brand-cream hover:text-brand-accent transition-colors">Reviews</a>
            <a href={`${homeBase}#about`} className="block py-2 font-medium text-brand-cream hover:text-brand-accent transition-colors">About</a>
            <a href={`${homeBase}#contact`} className="block py-2 font-medium text-brand-cream hover:text-brand-accent transition-colors">Contact</a>
            <a href={`${homeBase}staff`} className="block py-2 font-medium text-brand-cream hover:text-brand-accent transition-colors">Staff</a>
            <a href={`${homeBase}videos`} className="block py-2 font-medium text-brand-accent">See Our Work</a>
          </div>
        )}
      </nav>

      <section className="px-6 pt-28 pb-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-brand-ink">See Our Work</h1>
          </div>
          <article className="rounded-xl border border-brand-ink/10 bg-white p-4 md:p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <p className="text-sm text-brand-ink/70">TikTok</p>
                <a
                  href="https://www.tiktok.com/@willysauto664"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-brand-ink hover:text-brand-accent underline-offset-2 hover:underline"
                >
                  @willysauto664
                </a>
              </div>
              <span className="text-sm text-brand-ink/70">{tikTokEmbeds.length} videos</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {visibleTikToks.map((video) => (
                <TikTokCard key={video.id} video={video} />
              ))}
            </div>
            {visibleCount < tikTokEmbeds.length && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => Math.min(count + 4, tikTokEmbeds.length))}
                  className="inline-flex items-center justify-center rounded border border-brand-accent px-5 py-2 font-semibold text-brand-accent hover:bg-brand-accent hover:text-brand-ink transition-colors"
                >
                  Load more videos
                </button>
              </div>
            )}
          </article>
        </div>
      </section>
    </div>
  );
}
