import { useEffect, useMemo, useRef, useState } from 'react';

const FACEBOOK_PAGE_URL = 'https://www.facebook.com/bestmechanicintown/';
const FACEBOOK_PHOTO_URLS = [
  'https://www.facebook.com/photo.php?fbid=1625286412139097&set=pb.100039732623819.-2207520000&type=3',
  'https://www.facebook.com/photo.php?fbid=1547119456622460&set=pb.100039732623819.-2207520000&type=3',
  'https://www.facebook.com/photo.php?fbid=1547119173289155&set=pb.100039732623819.-2207520000&type=3',
  'https://www.facebook.com/photo.php?fbid=1298737304794011&set=pb.100039732623819.-2207520000&type=3',
  'https://www.facebook.com/photo.php?fbid=951285016205910&set=pb.100039732623819.-2207520000&type=3',
  'https://www.facebook.com/photo.php?fbid=6085253838185222&set=pb.100039732623819.-2207520000&type=3',
];

function buildFacebookPostEmbedUrl(photoUrl) {
  const encodedPhotoUrl = encodeURIComponent(photoUrl);
  return `https://www.facebook.com/plugins/post.php?href=${encodedPhotoUrl}&show_text=false&width=500`;
}

function FacebookPhotoCard({ photoUrl }) {
  const cardRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

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

  return (
    <div ref={cardRef} className="rounded-lg border border-[#1A3320]/10 overflow-hidden bg-white shadow-sm">
      {shouldLoad ? (
        <iframe
          title={`Facebook photo ${photoUrl}`}
          src={buildFacebookPostEmbedUrl(photoUrl)}
          width="100%"
          height="100%"
          className="h-[480px]"
          loading="lazy"
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      ) : (
        <div className="h-[480px] flex items-center justify-center text-[#1A3320]/70 bg-[#1A3320]/5">
          Loading photo...
        </div>
      )}
    </div>
  );
}

export default function WillysAutoPhotos() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const visiblePhotos = useMemo(() => FACEBOOK_PHOTO_URLS.slice(0, visibleCount), [visibleCount]);
  const homeBase = import.meta.env.BASE_URL;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#1A3320]">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#1A3320]/95 backdrop-blur-sm shadow-lg' : 'bg-[#1A3320]'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href={homeBase} className="text-2xl font-bold text-[#F8F5F0] hover:text-[#C9913A] transition-colors">
            Willy&apos;s Auto
          </a>
          <div className="hidden md:flex gap-8">
            <a href={`${homeBase}#services`} className="font-medium text-[#F8F5F0] hover:text-[#C9913A] transition-colors">Services</a>
            <a href={`${homeBase}#about`} className="font-medium text-[#F8F5F0] hover:text-[#C9913A] transition-colors">About</a>
            <a href={`${homeBase}#reviews`} className="font-medium text-[#F8F5F0] hover:text-[#C9913A] transition-colors">Reviews</a>
            <a href={`${homeBase}#contact`} className="font-medium text-[#F8F5F0] hover:text-[#C9913A] transition-colors">Contact</a>
            <a href={`${homeBase}staff`} className="font-medium text-[#F8F5F0] hover:text-[#C9913A] transition-colors">Staff</a>
            <a href={`${homeBase}videos`} className="font-medium text-[#F8F5F0] hover:text-[#C9913A] transition-colors">Videos</a>
            <a href={`${homeBase}photos`} className="font-medium text-[#C9913A]">Photos</a>
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
            <a href={`${homeBase}staff`} className="block py-2 font-medium text-[#F8F5F0] hover:text-[#C9913A] transition-colors">Staff</a>
            <a href={`${homeBase}videos`} className="block py-2 font-medium text-[#F8F5F0] hover:text-[#C9913A] transition-colors">Videos</a>
            <a href={`${homeBase}photos`} className="block py-2 font-medium text-[#C9913A]">Photos</a>
          </div>
        )}
      </nav>

      <section className="px-6 pt-28 pb-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A3320] mb-4 text-center">Car Photo Gallery</h2>
          <p className="text-lg text-[#1A3320]/80 mb-8 text-center max-w-2xl mx-auto">
            Photos from Willy&apos;s Auto Facebook page, including recent projects and shop highlights.
          </p>
          <div className="rounded-xl border border-[#1A3320]/10 bg-white p-4 md:p-5 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {visiblePhotos.map((photoUrl) => (
                <FacebookPhotoCard key={photoUrl} photoUrl={photoUrl} />
              ))}
            </div>
            {visibleCount < FACEBOOK_PHOTO_URLS.length && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => Math.min(count + 4, FACEBOOK_PHOTO_URLS.length))}
                  className="inline-flex items-center justify-center rounded border border-[#C9913A] px-5 py-2 font-semibold text-[#C9913A] hover:bg-[#C9913A] hover:text-[#1A3320] transition-colors"
                >
                  Load more photos
                </button>
              </div>
            )}
            <div className="mt-4 flex justify-end">
              <a
                href={FACEBOOK_PAGE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded border border-[#C9913A] px-4 py-2 font-semibold text-[#C9913A] hover:bg-[#C9913A] hover:text-[#1A3320] transition-colors"
              >
                Open Facebook page
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

