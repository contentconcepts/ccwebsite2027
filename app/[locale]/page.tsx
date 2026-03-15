import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Academic Editing & Proofreading Service | ContentConcepts',
    description: 'Affordable manuscript editing, proofreading, and academic writing services by PhD editors. Fast turnaround, editing certificate included. Trusted by 10,000+ researchers.',
    alternates: {
      canonical: `https://contentconcepts.com/${locale}`,
      languages: {
        en: 'https://contentconcepts.com/en',
        es: 'https://contentconcepts.com/es',
        fr: 'https://contentconcepts.com/fr',
        'x-default': 'https://contentconcepts.com/en',
      },
    },
  }
}

const SERVICES = [
  { slug: 'manuscript-editing-service', label: 'Manuscript Editing' },
  { slug: 'thesis-editing-service', label: 'Thesis Editing' },
  { slug: 'scientific-editing-service', label: 'Scientific Editing' },
  { slug: 'proofreading-services', label: 'Proofreading' },
  { slug: 'medical-editing-service', label: 'Medical Editing' },
  { slug: 'english-editing-service', label: 'English Editing' },
]

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <main>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #1B5E20 100%)', color: 'white', padding: '100px 24px 80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '6px 16px', fontSize: '0.85rem', marginBottom: '24px', color: '#A5D6A7' }}>
            Rated 4.9/5 by 99% of customers &middot; Trusted by 10,000+ researchers
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, marginBottom: '24px', lineHeight: 1.1 }}>
            Polish Your Document<br />to Perfection
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#B0BEC5', maxWidth: '650px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Expert English editing and proofreading for academic manuscripts, theses, and business documents &mdash; by PhD-qualified editors.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`/${locale}/pricing`} style={{
              background: '#E65100', color: 'white', padding: '18px 40px',
              borderRadius: '8px', fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none',
            }}>
              Get Your Manuscript Edited
            </Link>
            <Link href={`/${locale}/services/manuscript-editing-service`} style={{
              background: 'transparent', color: 'white', padding: '18px 40px',
              borderRadius: '8px', fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none',
              border: '2px solid rgba(255,255,255,0.5)',
            }}>
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#1B5E20', color: 'white', padding: '28px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', textAlign: 'center' }}>
          {[['10,000+', 'Authors Served'], ['4.9/5', 'Customer Rating'], ['24\u201348h', 'Turnaround'], ['99%', 'Satisfaction Rate']].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#FFB300' }}>{val}</div>
              <div style={{ fontSize: '0.85rem', color: '#A5D6A7' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services grid */}
      <section style={{ padding: '80px 24px', background: '#F9F9F6' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#1B5E20', textAlign: 'center', marginBottom: '12px' }}>
            Our Editing Services
          </h2>
          <p style={{ color: '#757575', textAlign: 'center', marginBottom: '48px', fontSize: '1.1rem' }}>
            Expert editing across every academic and professional document type
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {SERVICES.map(svc => (
              <Link key={svc.slug} href={`/${locale}/services/${svc.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'white', border: '1px solid #E0E0E0', borderRadius: '12px',
                  padding: '28px', transition: 'box-shadow 0.2s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}>
                  <h3 style={{ fontWeight: 700, color: '#1B5E20', marginBottom: '8px' }}>{svc.label}</h3>
                  <p style={{ color: '#757575', fontSize: '0.9rem', margin: 0 }}>
                    Expert editing by PhD-qualified subject-matter specialists.
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link href={`/${locale}/services/manuscript-editing-service`} style={{ color: '#1B5E20', fontWeight: 600, textDecoration: 'underline' }}>
              View all 11 services &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1B5E20', marginBottom: '48px' }}>
            Why Researchers Choose ContentConcepts
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
            {[
              { icon: '\ud83c\udf93', title: 'PhD Qualified Editors', desc: 'Every editor holds a doctoral degree in their field' },
              { icon: '\u26a1', title: '24\u201348h Turnaround', desc: 'Fast delivery without compromising quality' },
              { icon: '\ud83c\udfc5', title: 'Editing Certificate', desc: 'Accepted by international journals worldwide' },
              { icon: '\ud83c\udf0d', title: 'Native English', desc: 'All editors are native English speakers' },
              { icon: '\ud83d\udd12', title: '100% Confidential', desc: 'Your work is never shared or published' },
              { icon: '\ud83d\udcb0', title: 'Affordable Pricing', desc: 'Transparent rates with no hidden fees' },
            ].map(item => (
              <div key={item.title}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{item.icon}</div>
                <h3 style={{ fontWeight: 700, color: '#212121', marginBottom: '8px', fontSize: '1rem' }}>{item.title}</h3>
                <p style={{ color: '#757575', fontSize: '0.875rem', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #0D1B2A 100%)', color: 'white', padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px' }}>Ready to Get Started?</h2>
        <p style={{ fontSize: '1.1rem', color: '#A5D6A7', maxWidth: '500px', margin: '0 auto 32px' }}>
          Join 10,000+ researchers who trust ContentConcepts with their most important work.
        </p>
        <Link href={`/${locale}/pricing`} style={{
          background: '#E65100', color: 'white', padding: '18px 48px',
          borderRadius: '8px', fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none',
          display: 'inline-block',
        }}>
          Get a Free Quote &rarr;
        </Link>
      </section>
    </main>
  )
}
