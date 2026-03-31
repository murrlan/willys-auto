import { useEffect, useState } from 'react';

const STAFF = [
  {
    name: 'Jason (Willy) Williams',
    title: 'Owner',
    bio: 'Listed publicly as the owner of Willy\'s Auto on the Better Business Bureau profile. Oversees shop operations and customer service for the Missoula location.',
  },
  {
    name: 'Staff Member Name',
    title: 'Service Advisor',
    bio: 'Helps customers understand options and timelines without pressure. Keeps communication simple, transparent, and on schedule.',
  },
  {
    name: 'Staff Member Name',
    title: 'Fabrication Specialist',
    bio: 'Specializes in custom solutions for unique builds and tricky fitments. Brings a detail-first approach to one-off parts and repairs.',
  },
  {
    name: 'Staff Member Name',
    title: 'Shop Foreman',
    bio: 'Coordinates complex jobs and quality checks across the shop. Passionate about safety, consistency, and clean workmanship.',
  },
  {
    name: 'Staff Member Name',
    title: 'Brake & Suspension Tech',
    bio: 'Experienced with ride, handling, and braking performance. Enjoys tracking down noises, vibrations, and alignment issues.',
  },
  {
    name: 'Staff Member Name',
    title: 'Diagnostics Technician',
    bio: 'Enjoys solving electrical and drivability puzzles with a methodical approach. Specializes in scan tool data and pinpoint testing.',
  },
];

function PlaceholderPhoto() {
  return (
    <div className="aspect-square rounded-lg bg-[#1A3320]/5 border border-[#1A3320]/10 flex flex-col items-center justify-center text-[#1A3320]/65">
      <svg
        aria-hidden="true"
        className="w-12 h-12 mb-2"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 20.25a7.5 7.5 0 0115 0"
        />
      </svg>
      <div className="text-sm font-medium">Photo Coming Soon</div>
    </div>
  );
}

export default function WillysAutoStaff() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const homeBase = import.meta.env.BASE_URL;

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#1A3320]">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#1A3320]/95 backdrop-blur-sm shadow-lg' : 'bg-[#1A3320]'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-between">
          <a
            href={homeBase}
            className="flex items-center gap-3 pr-3 md:pr-5 hover:text-[#C9913A] transition-colors"
          >
            <img
              src={`${homeBase}willysauto.png`}
              alt="Willy's Auto"
              className="h-[4rem] md:h-[4.75rem] w-auto origin-left scale-[1.38] object-contain"
            />
          </a>
          <div className="hidden md:flex gap-8">
            <a href={`${homeBase}#services`} className="font-medium text-[#F8F5F0] hover:text-[#C9913A] transition-colors">Services</a>
            <a href={`${homeBase}#reviews`} className="font-medium text-[#F8F5F0] hover:text-[#C9913A] transition-colors">Reviews</a>
            <a href={`${homeBase}#about`} className="font-medium text-[#F8F5F0] hover:text-[#C9913A] transition-colors">About</a>
            <a href={`${homeBase}#contact`} className="font-medium text-[#F8F5F0] hover:text-[#C9913A] transition-colors">Contact</a>
            <a href={`${homeBase}staff`} className="font-medium text-[#C9913A]">Staff</a>
            <a href={`${homeBase}videos`} className="font-medium text-[#F8F5F0] hover:text-[#C9913A] transition-colors">See Our Work</a>
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
            <a href={`${homeBase}#reviews`} className="block py-2 font-medium text-[#F8F5F0] hover:text-[#C9913A] transition-colors">Reviews</a>
            <a href={`${homeBase}#about`} className="block py-2 font-medium text-[#F8F5F0] hover:text-[#C9913A] transition-colors">About</a>
            <a href={`${homeBase}#contact`} className="block py-2 font-medium text-[#F8F5F0] hover:text-[#C9913A] transition-colors">Contact</a>
            <a href={`${homeBase}staff`} className="block py-2 font-medium text-[#C9913A]">Staff</a>
            <a href={`${homeBase}videos`} className="block py-2 font-medium text-[#F8F5F0] hover:text-[#C9913A] transition-colors">See Our Work</a>
          </div>
        )}
      </nav>

      <section className="px-6 pt-28 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A3320] mb-4 text-center">Meet Our Team</h2>
          <p className="text-lg text-[#1A3320]/80 mb-12 text-center max-w-2xl mx-auto">
            The people behind the work. Experienced, straightforward, and focused on repairs you can trust.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STAFF.map((member, idx) => (
              <article
                key={idx}
                className="rounded-xl border border-[#1A3320]/10 bg-white p-5 md:p-6 shadow-sm flex flex-col"
              >
                <PlaceholderPhoto />
                <div className="mt-5">
                  <h3 className="text-xl font-bold text-[#1A3320]">{member.name}</h3>
                  <p className="text-sm font-semibold text-[#C9913A] mt-1">{member.title}</p>
                  <p className="text-[#1A3320]/80 mt-3 leading-relaxed">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

