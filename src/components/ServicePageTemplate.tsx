import Link from 'next/link'

interface ServiceFeature {
  icon: string
  title: string
  desc: string
}

interface ProcessStep {
  num: number
  title: string
  desc: string
}

interface ServicePageData {
  locale: string
  heroTitle: string
  heroSubtitle: string
  heroDesc: string
  primaryCTA: string
  primaryCTAHref: string
  features: ServiceFeature[]
  processSteps: ProcessStep[]
  bodyContent: string  // HTML string with main content
  faqItems?: { q: string; a: string }[]
}

export function ServicePageTemplate({ data }: { data: ServicePageData }) {
  return (
    <main>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #1B5E20 100%)', color: 'white', padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '20px', lineHeight: 1.1 }}>
            {data.heroTitle}
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#A5D6A7', marginBottom: '12px', fontWeight: 600 }}>
            {data.heroSubtitle}
          </p>
          <p style={{ fontSize: '1.1rem', color: '#B0BEC5', maxWidth: '700px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            {data.heroDesc}
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={data.primaryCTAHref} style={{
              background: '#E65100', color: 'white', padding: '16px 36px',
              borderRadius: '8px', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none',
              display: 'inline-block',
            }}>
              {data.primaryCTA}
            </Link>
            <Link href={`/${data.locale}/pricing`} style={{
              background: 'transparent', color: 'white', padding: '16px 36px',
              borderRadius: '8px', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none',
              border: '2px solid white', display: 'inline-block',
            }}>
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: '#1B5E20', color: 'white', padding: '24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', textAlign: 'center' }}>
          {[['10,000+', 'Authors Served'], ['4.9/5', 'Customer Rating'], ['24\u201348h', 'Turnaround'], ['99%', 'Satisfaction']].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFB300' }}>{val}</div>
              <div style={{ fontSize: '0.8rem', color: '#A5D6A7' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section style={{ padding: '80px 24px', background: '#F9F9F6' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1B5E20', textAlign: 'center', marginBottom: '48px' }}>
            What&apos;s Included
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {data.features.map(f => (
              <div key={f.title} style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{f.icon}</div>
                <h3 style={{ fontWeight: 700, color: '#212121', marginBottom: '8px', fontSize: '1.05rem' }}>{f.title}</h3>
                <p style={{ color: '#757575', lineHeight: 1.6, margin: 0, fontSize: '0.9rem' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1B5E20', textAlign: 'center', marginBottom: '48px' }}>
            How It Works
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {data.processSteps.map(step => (
              <div key={step.num} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{
                  minWidth: '48px', height: '48px', borderRadius: '50%',
                  background: '#1B5E20', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '1.1rem', flexShrink: 0,
                }}>
                  {step.num}
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, color: '#212121', marginBottom: '4px' }}>{step.title}</h3>
                  <p style={{ color: '#757575', margin: 0, lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Body content */}
      {data.bodyContent && (
        <section style={{ padding: '60px 24px', background: '#F9F9F6' }}>
          <div
            style={{ maxWidth: '800px', margin: '0 auto', color: '#212121', lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: data.bodyContent }}
          />
        </section>
      )}

      {/* FAQ */}
      {data.faqItems && data.faqItems.length > 0 && (
        <section style={{ padding: '80px 24px', background: 'white' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1B5E20', textAlign: 'center', marginBottom: '48px' }}>
              Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {data.faqItems.map(item => (
                <div key={item.q} style={{ border: '1px solid #E0E0E0', borderRadius: '8px', padding: '20px' }}>
                  <h3 style={{ fontWeight: 700, color: '#212121', marginBottom: '8px', fontSize: '1rem' }}>{item.q}</h3>
                  <p style={{ color: '#757575', margin: 0, lineHeight: 1.6 }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #0D1B2A 100%)', color: 'white', padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px' }}>Ready to Get Started?</h2>
        <p style={{ fontSize: '1.1rem', color: '#A5D6A7', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
          Join 10,000+ researchers who trust ContentConcepts with their most important work.
        </p>
        <Link href={data.primaryCTAHref} style={{
          background: '#E65100', color: 'white', padding: '18px 48px',
          borderRadius: '8px', fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none',
          display: 'inline-block',
        }}>
          {data.primaryCTA}
        </Link>
      </section>
    </main>
  )
}
