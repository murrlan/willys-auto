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

function TikTokCard({ url, isVisible }) {
  const videoId = extractVideoId(url);
  const [embedUnavailable, setEmbedUnavailable] = useState(false);
  const embedRef = useRef(null);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const timeout = window.setTimeout(() => {
      const hasIframe = Boolean(embedRef.current?.querySelector('iframe'));
      if (!hasIframe) {
        setEmbedUnavailable(true);
      }
    }, 8000);

    return () => window.clearTimeout(timeout);
  }, [isVisible, url]);

  if (!videoId) {
    return null;
  }

  return (
    <div className="rounded-lg bg-white border border-[#1A3320]/10 p-2" ref={embedRef}>
      {!isVisible && (
        <div className="aspect-[9/16] flex items-center justify-center rounded bg-[#1A3320] text-[#F8F5F0]/80">
          Loading video...
        </div>
      )}

      {isVisible && !embedUnavailable && (
        <blockquote className="tiktok-embed" cite={url} data-video-id={videoId}>
          <section />
        </blockquote>
      )}

      {isVisible && embedUnavailable && (
        <div className="aspect-[9/16] flex flex-col items-center justify-center gap-3 rounded bg-[#1A3320] px-4 text-center text-[#F8F5F0]/90">
          <p className="font-medium">This TikTok is currently unavailable.</p>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded border border-[#C9913A] px-4 py-2 text-sm font-semibold text-[#C9913A] hover:bg-[#C9913A] hover:text-[#1A3320] transition-colors"
          >
            Open on TikTok
          </a>
        </div>
      )}
    </div>
  );
}

export default function WillysAutoVideos() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleIndexes, setVisibleIndexes] = useState(() => new Set());
  const itemRefs = useRef([]);

  const columns = useMemo(() => {
    const result = [[], [], []];
    TIKTOK_VIDEO_URLS.forEach((url, index) => {
      result[index % 3].push({ url, index });
    });
    return result;
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.tiktok.com/embed.js';
    document.body.appendChild(script);

    return () => {
      // Keep script globally available for page revisits.
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleIndexes((prev) => {
          const next = new Set(prev);
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = Number(entry.target.getAttribute('data-index'));
              if (!Number.isNaN(index)) {
                next.add(index);
              }
            }
          });
          return next;
        });
      },
      { rootMargin: '300px 0px' },
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && visibleIndexes.size > 0) {
      if (window.tiktokEmbedLoad) {
        window.tiktokEmbedLoad();
      } else if (window.TikTok?.embed?.load) {
        window.TikTok.embed.load();
      }
    }
  }, [visibleIndexes]);

  const homeBase = import.meta.env.BASE_URL;

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#1A3320]">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#1A3320]/95 backdrop-blur-sm shadow-lg' : 'bg-[#1A3320]'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href={homeBase} className="text-2xl font-bold text-[#F8F5F0] hover:text-[#C9913A] transition-colors">
            Willy's Auto
          </a>
          <div className="hidden md:flex gap-8">
            <a href={`${homeBase}#services`} className="font-medium text-[#F8F5F0] hover:text-[#C9913A] transition-colors">Services</a>
            <a href={`${homeBase}#about`} className="font-medium text-[#F8F5F0] hover:text-[#C9913A] transition-colors">About</a>
            <a href={`${homeBase}#reviews`} className="font-medium text-[#F8F5F0] hover:text-[#C9913A] transition-colors">Reviews</a>
            <a href={`${homeBase}#contact`} className="font-medium text-[#F8F5F0] hover:text-[#C9913A] transition-colors">Contact</a>
            <a href={`${homeBase}videos`} className="font-medium text-[#C9913A]">Videos</a>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#F8F5F0] hover:text-[#C9913A]"
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
          <div className="md:hidden bg-[#1A3320] border-t border-[#C9913A]/30 px-6 py-4">
            <a href={`${homeBase}#services`} className="block py-2 font-medium text-[#F8F5F0] hover:text-[#C9913A] transition-colors">Services</a>
            <a href={`${homeBase}#about`} className="block py-2 font-medium text-[#F8F5F0] hover:text-[#C9913A] transition-colors">About</a>
            <a href={`${homeBase}#reviews`} className="block py-2 font-medium text-[#F8F5F0] hover:text-[#C9913A] transition-colors">Reviews</a>
            <a href={`${homeBase}#contact`} className="block py-2 font-medium text-[#F8F5F0] hover:text-[#C9913A] transition-colors">Contact</a>
            <a href={`${homeBase}videos`} className="block py-2 font-medium text-[#C9913A]">Videos</a>
          </div>
        )}
      </nav>

      <section className="px-6 pt-28 pb-12 bg-[#1A3320] text-[#F8F5F0]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Willy's Auto Videos</h1>
          <p className="text-lg text-[#F8F5F0]/85 max-w-2xl">
            Clips from @willysauto664. Real work, real shop, real people.
          </p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {columns.map((col, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-6">
              {col.map(({ url, index }) => (
                <div
                  key={url}
                  data-index={index}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                >
                  <TikTokCard url={url} isVisible={visibleIndexes.has(index)} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
