import { useEffect, useMemo, useState } from 'react';

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

const FACEBOOK_PAGE_URL = 'https://www.facebook.com/bestmechanicintown/';

function extractVideoId(url) {
  const match = url.match(/\/video\/(\d+)/);
  return match ? match[1] : null;
}

function buildFacebookPluginUrl(tab) {
  const encodedPage = encodeURIComponent(FACEBOOK_PAGE_URL);
  return `https://www.facebook.com/plugins/page.php?href=${encodedPage}&tabs=${tab}&width=500&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;
}

function CarouselFrame({ title, subtitle, countLabel, children, onPrev, onNext }) {
  return (
    <section className="px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A3320]">{title}</h2>
            <p className="text-[#1A3320]/80 mt-2">{subtitle}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#1A3320]/70">{countLabel}</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onPrev}
                className="h-10 w-10 rounded border border-[#1A3320]/30 text-[#1A3320] hover:border-[#C9913A] hover:text-[#C9913A] transition-colors"
                aria-label="Previous"
              >
                ←
              </button>
              <button
                type="button"
                onClick={onNext}
                className="h-10 w-10 rounded border border-[#1A3320]/30 text-[#1A3320] hover:border-[#C9913A] hover:text-[#C9913A] transition-colors"
                aria-label="Next"
              >
                →
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white border border-[#1A3320]/10 p-4 md:p-6">{children}</div>
      </div>
    </section>
  );
}

function TikTokSlide({ url, showEmbed, onPlay }) {
  const videoId = extractVideoId(url);

  if (!videoId) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
      <div className="rounded-lg bg-[#1A3320] text-[#F8F5F0] p-6 min-h-[420px] flex flex-col justify-between">
        <div>
          <p className="text-[#C9913A] font-semibold mb-3">TikTok</p>
          <h3 className="text-2xl font-bold mb-3">@willysauto664</h3>
          <p className="text-[#F8F5F0]/85 break-all text-sm">{url}</p>
        </div>
        <div className="flex flex-wrap gap-3 mt-6">
          {!showEmbed && (
            <button
              type="button"
              onClick={onPlay}
              className="inline-flex items-center justify-center px-4 py-2 bg-[#C9913A] text-[#1A3320] font-semibold rounded hover:bg-[#d9a650] transition-colors"
            >
              Play Here
            </button>
          )}
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 border border-[#C9913A] text-[#C9913A] font-semibold rounded hover:bg-[#C9913A] hover:text-[#1A3320] transition-colors"
          >
            Open on TikTok
          </a>
        </div>
      </div>

      <div className="rounded-lg bg-white border border-[#1A3320]/10 p-2 min-h-[420px] flex items-center justify-center">
        {showEmbed ? (
          <blockquote className="tiktok-embed" cite={url} data-video-id={videoId}>
            <section />
          </blockquote>
        ) : (
          <div className="w-full h-full min-h-[400px] rounded bg-[#1A3320] text-[#F8F5F0]/80 flex items-center justify-center text-center px-4">
            Click <span className="mx-1 font-semibold text-[#C9913A]">Play Here</span> to load this video.
          </div>
        )}
      </div>
    </div>
  );
}

function FacebookSlide({ pluginUrl, title, showEmbed, onPlay }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
      <div className="rounded-lg bg-[#0F2D2D] text-[#F8F5F0] p-6 min-h-[420px] flex flex-col justify-between">
        <div>
          <p className="text-[#C9913A] font-semibold mb-3">Facebook</p>
          <h3 className="text-2xl font-bold mb-3">{title}</h3>
          <p className="text-[#F8F5F0]/85 text-sm">bestmechanicintown</p>
        </div>
        <div className="flex flex-wrap gap-3 mt-6">
          {!showEmbed && (
            <button
              type="button"
              onClick={onPlay}
              className="inline-flex items-center justify-center px-4 py-2 bg-[#C9913A] text-[#1A3320] font-semibold rounded hover:bg-[#d9a650] transition-colors"
            >
              Load Feed
            </button>
          )}
          <a
            href={FACEBOOK_PAGE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 border border-[#C9913A] text-[#C9913A] font-semibold rounded hover:bg-[#C9913A] hover:text-[#1A3320] transition-colors"
          >
            Open on Facebook
          </a>
        </div>
      </div>

      <div className="rounded-lg bg-white border border-[#1A3320]/10 p-2 min-h-[420px] flex items-center justify-center">
        {showEmbed ? (
          <iframe
            title={`Facebook ${title}`}
            src={pluginUrl}
            width="100%"
            height="700"
            style={{ border: 'none', overflow: 'hidden', borderRadius: '0.5rem' }}
            scrolling="no"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        ) : (
          <div className="w-full h-full min-h-[400px] rounded bg-[#0F2D2D] text-[#F8F5F0]/80 flex items-center justify-center text-center px-4">
            Click <span className="mx-1 font-semibold text-[#C9913A]">Load Feed</span> to display Facebook content.
          </div>
        )}
      </div>
    </div>
  );
}

export default function WillysAutoVideos() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [tikTokIndex, setTikTokIndex] = useState(0);
  const [activeTikTokEmbedIndex, setActiveTikTokEmbedIndex] = useState(null);

  const [facebookIndex, setFacebookIndex] = useState(0);
  const [activeFacebookEmbedIndex, setActiveFacebookEmbedIndex] = useState(null);

  const facebookSlides = useMemo(
    () => [
      { title: 'Timeline', pluginUrl: buildFacebookPluginUrl('timeline') },
      { title: 'Videos', pluginUrl: buildFacebookPluginUrl('videos') },
      { title: 'Page Feed', pluginUrl: buildFacebookPluginUrl('timeline,videos') },
    ],
    [],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (activeTikTokEmbedIndex === null) {
      return;
    }

    if (!document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.tiktok.com/embed.js';
      document.body.appendChild(script);
      return;
    }

    if (window.tiktokEmbedLoad) {
      window.tiktokEmbedLoad();
    } else if (window.TikTok?.embed?.load) {
      window.TikTok.embed.load();
    }
  }, [activeTikTokEmbedIndex]);

  const homeBase = import.meta.env.BASE_URL;

  const prevTikTok = () => {
    setTikTokIndex((prev) => (prev - 1 + TIKTOK_VIDEO_URLS.length) % TIKTOK_VIDEO_URLS.length);
    setActiveTikTokEmbedIndex(null);
  };

  const nextTikTok = () => {
    setTikTokIndex((prev) => (prev + 1) % TIKTOK_VIDEO_URLS.length);
    setActiveTikTokEmbedIndex(null);
  };

  const prevFacebook = () => {
    setFacebookIndex((prev) => (prev - 1 + facebookSlides.length) % facebookSlides.length);
    setActiveFacebookEmbedIndex(null);
  };

  const nextFacebook = () => {
    setFacebookIndex((prev) => (prev + 1) % facebookSlides.length);
    setActiveFacebookEmbedIndex(null);
  };

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Willy's Auto Social Videos</h1>
          <p className="text-lg text-[#F8F5F0]/85 max-w-3xl">
            Performance-optimized carousels: one active media embed at a time.
          </p>
        </div>
      </section>

      <CarouselFrame
        title="TikTok Carousel"
        subtitle="Recent videos from @willysauto664"
        countLabel={`${tikTokIndex + 1} / ${TIKTOK_VIDEO_URLS.length}`}
        onPrev={prevTikTok}
        onNext={nextTikTok}
      >
        <TikTokSlide
          url={TIKTOK_VIDEO_URLS[tikTokIndex]}
          showEmbed={activeTikTokEmbedIndex === tikTokIndex}
          onPlay={() => setActiveTikTokEmbedIndex(tikTokIndex)}
        />
      </CarouselFrame>

      <CarouselFrame
        title="Facebook Carousel"
        subtitle="Content from bestmechanicintown"
        countLabel={`${facebookIndex + 1} / ${facebookSlides.length}`}
        onPrev={prevFacebook}
        onNext={nextFacebook}
      >
        <FacebookSlide
          title={facebookSlides[facebookIndex].title}
          pluginUrl={facebookSlides[facebookIndex].pluginUrl}
          showEmbed={activeFacebookEmbedIndex === facebookIndex}
          onPlay={() => setActiveFacebookEmbedIndex(facebookIndex)}
        />
      </CarouselFrame>
    </div>
  );
}
