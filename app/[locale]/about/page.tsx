import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'About ContentConcepts | 25 Years of Academic Excellence',
    description: 'Founded in 1998, ContentConcepts has served 10,000+ researchers worldwide. PhD-qualified editors, native English speakers, and subject-matter experts.',
    alternates: { canonical: `https://contentconcepts.com/${locale}/about` },
  }
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  // locale is used for future i18n integration
  await params
  return (
    <main>
      <section style={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #1B5E20 100%)', color: 'white', padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '6px 16px', fontSize: '0.85rem', marginBottom: '24px', color: '#A5D6A7' }}>
            Established 1998
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '24px' }}>
            25 Years of Academic Excellence
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#B0BEC5', lineHeight: 1.7, marginBottom: '16px' }}>
            ContentConcepts has been the trusted partner for researchers worldwide, transforming academic manuscripts into publication-ready excellence.
          </p>
          <p style={{ fontSize: '1.1rem', color: '#B0BEC5', lineHeight: 1.7, marginBottom: '16px' }}>
            Founded by academic professionals who understand the challenges of scholarly publishing, we&apos;ve built our reputation on delivering meticulous editing that preserves your voice while enhancing clarity, coherence, and academic impact.
          </p>
          <p style={{ fontSize: '1.1rem', color: '#B0BEC5', lineHeight: 1.7 }}>
            Our team of PhD-qualified editors brings deep subject expertise across all academic disciplines, ensuring your research receives the specialised attention it deserves.
          </p>
        </div>
      </section>

      <section style={{ background: '#1B5E20', color: 'white', padding: '28px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', textAlign: 'center' }}>
          {[['25+', 'Years Experience'], ['50+', 'Expert Editors'], ['10,000+', 'Papers Edited'], ['99%', 'Client Satisfaction']].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFB300' }}>{val}</div>
              <div style={{ fontSize: '0.8rem', color: '#A5D6A7' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '80px 24px', background: '#F9F9F6' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1B5E20', textAlign: 'center', marginBottom: '48px' }}>Our Values</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {[
              { icon: '\ud83c\udfc6', title: 'Excellence', desc: 'We maintain the highest standards in academic editing, ensuring every document meets publication requirements.' },
              { icon: '\u23f1\ufe0f', title: 'Reliability', desc: 'Consistent quality and on-time delivery for every project, no matter the complexity or deadline.' },
              { icon: '\ud83c\udf0d', title: 'Global Reach', desc: 'Serving researchers worldwide with expertise across all academic disciplines and languages.' },
            ].map(v => (
              <div key={v.title} style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: '12px', padding: '28px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{v.icon}</div>
                <h3 style={{ fontWeight: 700, color: '#212121', marginBottom: '8px' }}>{v.title}</h3>
                <p style={{ color: '#757575', margin: 0, lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 24px', background: 'white', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1B5E20', marginBottom: '24px' }}>Our Mission</h2>
          <p style={{ fontSize: '1.15rem', color: '#757575', lineHeight: 1.8 }}>
            Our mission is to enhance the quality of academic and professional writing worldwide. We believe that clear, precise, and polished writing is essential for effective communication in academia and beyond.
          </p>
        </div>
      </section>
    </main>
  )
}
