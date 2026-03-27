import { useState, useEffect, useRef } from "react";

const TIKTOK_URLS = [
  // TODO: Add TikTok video URLs here
];

function extractVideoId(url) {
  const match = url.match(/video\/(\d+)/);
  return match ? match[1] : null;
}

function TikTokEmbed({ url, index }) {
  const videoId = extractVideoId(url);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!videoId) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [videoId]);

  useEffect(() => {
    if (loaded && window.TikTok) {
      window.TikTok.reload?.();
    }
  }, [loaded]);

  if (!videoId) return null;

  return (
    <div
      ref={ref}
      className="tiktok-card"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {loaded ? (
        <blockquote
          className="tiktok-embed"
          cite={url}
          data-video-id={videoId}
          style={{ maxWidth: "100%", minWidth: "100%" }}
        >
          <section />
        </blockquote>
      ) : (
        <div className="tiktok-placeholder">
          <div className="tiktok-placeholder-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.86 4.86 0 01-1.01-.07z" />
            </svg>
          </div>
          <span>Loading</span>
        </div>
      )}
    </div>
  );
}

export default function TikTokGallery() {
  const [urls, setUrls] = useState(TIKTOK_URLS);
  const [newUrl, setNewUrl] = useState("");
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (document.querySelector('script[src*="tiktok.com/embed"]')) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (scriptLoaded && window.TikTok) {
      window.TikTok.reload?.();
    }
  }, [urls, scriptLoaded]);

  const handleAdd = () => {
    const trimmed = newUrl.trim();
    if (!trimmed) return;
    if (!extractVideoId(trimmed)) {
      setError("Paste a valid TikTok video URL (e.g. tiktok.com/@user/video/123...)");
      return;
    }
    if (urls.includes(trimmed)) {
      setError("This video is already in the gallery.");
      return;
    }
    setUrls((prev) => [trimmed, ...prev]);
    setNewUrl("");
    setError("");
  };

  const handleRemove = (url) => {
    setUrls((prev) => prev.filter((u) => u !== url));
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  const cols = [[], [], []];
  urls.forEach((url, i) => cols[i % 3].push({ url, index: i }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');

        .gallery-root {
          max-width: 1100px;
          margin: 0 auto;
          padding: 3rem 1.5rem 5rem;
        }

        .gallery-header {
          margin-bottom: 3rem;
        }

        .gallery-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #fe2c55;
          margin-bottom: 0.6rem;
        }

        .gallery-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 700;
          line-height: 1.05;
          color: #f0ede8;
          letter-spacing: -0.02em;
        }

        .gallery-title span {
          color: #fe2c55;
        }

        .gallery-subtitle {
          margin-top: 0.75rem;
          font-size: 15px;
          color: #888;
          font-weight: 300;
        }

        .add-bar {
          display: flex;
          gap: 10px;
          margin-bottom: 0.5rem;
          margin-top: 2rem;
        }

        .add-bar input {
          flex: 1;
          background: #161616;
          border: 1px solid #2a2a2a;
          border-radius: 10px;
          color: #f0ede8;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          padding: 0 16px;
          height: 44px;
          outline: none;
          transition: border-color 0.2s;
        }

        .add-bar input:focus {
          border-color: #fe2c55;
        }

        .add-bar input::placeholder { color: #555; }

        .add-btn {
          height: 44px;
          padding: 0 22px;
          background: #fe2c55;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.18s, transform 0.12s;
        }

        .add-btn:hover { background: #e0223f; }
        .add-btn:active { transform: scale(0.97); }

        .error-msg {
          font-size: 13px;
          color: #fe2c55;
          margin-bottom: 1rem;
          min-height: 18px;
        }

        .masonry {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          align-items: start;
        }

        @media (max-width: 720px) {
          .masonry { grid-template-columns: repeat(2, 1fr); }
          .masonry .col:last-child { display: none; }
        }

        @media (max-width: 480px) {
          .masonry { grid-template-columns: 1fr; }
          .masonry .col:not(:first-child) { display: none; }
        }

        .col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .tiktok-card {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          background: #111;
          border: 1px solid #1e1e1e;
          animation: fadeUp 0.4s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .tiktok-card:hover .remove-btn { opacity: 1; }

        .remove-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 28px;
          height: 28px;
          background: rgba(0,0,0,0.7);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 50%;
          color: #fff;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.18s, background 0.18s;
          z-index: 10;
          line-height: 1;
        }

        .remove-btn:hover { background: #fe2c55; border-color: #fe2c55; }

        .tiktok-placeholder {
          height: 340px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: #444;
        }

        .tiktok-placeholder-icon { color: #333; }

        .tiktok-embed {
          border-radius: 0 !important;
          border: none !important;
        }

        .count-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #161616;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          padding: 4px 12px;
          font-size: 13px;
          color: #888;
          margin-top: 0.5rem;
        }

        .count-badge strong { color: #f0ede8; }
      `}</style>

      <section id="tiktok-gallery" className="gallery-root">
        <div className="gallery-header">
          <p className="gallery-eyebrow">TikTok Gallery</p>
          <h1 className="gallery-title">
            All the <span>videos</span>,<br />one place.
          </h1>
          <p className="gallery-subtitle">
            Paste a TikTok URL below to add it to the gallery.
          </p>

          <div className="add-bar">
            <input
              type="text"
              placeholder="https://www.tiktok.com/@username/video/..."
              value={newUrl}
              onChange={(e) => { setNewUrl(e.target.value); setError(""); }}
              onKeyDown={handleKey}
            />
            <button className="add-btn" onClick={handleAdd}>+ Add video</button>
          </div>

          <p className="error-msg">{error}</p>

          <div className="count-badge">
            <strong>{urls.length}</strong> video{urls.length !== 1 ? "s" : ""} in gallery
          </div>
        </div>

        <div className="masonry">
          {cols.map((col, ci) => (
            <div className="col" key={ci}>
              {col.map(({ url, index }) => (
                <div key={url + index} style={{ position: "relative" }}>
                  <TikTokEmbed url={url} index={index} />
                  <button
                    className="remove-btn"
                    title="Remove"
                    onClick={() => handleRemove(url)}
                  >×</button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
