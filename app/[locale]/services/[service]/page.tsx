import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'

// Common process steps used across all service pages
const COMMON_STEPS = [
  { num: 1, title: 'Submit Your Document', desc: 'Upload your file securely via our portal. We accept Word, PDF, LaTeX, and most document formats.' },
  { num: 2, title: 'Editor Assignment', desc: 'Your document is matched with a subject-matter expert with relevant academic credentials.' },
  { num: 3, title: 'Professional Editing', desc: 'Your editor works through the document, correcting errors and improving clarity and flow.' },
  { num: 4, title: 'Quality Review', desc: 'A senior editor reviews the work to ensure consistency and completeness.' },
  { num: 5, title: 'Delivery & Certificate', desc: 'Receive your edited document with a tracked-changes version and editing certificate.' },
]

type ServiceSlug =
  | 'manuscript-editing-service'
  | 'paper-editing-service'
  | 'thesis-editing-service'
  | 'scientific-editing-service'
  | 'essay-editing-service'
  | 'medical-editing-service'
  | 'english-editing-service'
  | 'book-editing-service'
  | 'proofreading-services'
  | 'plagiarism-editing-service'
  | 'rewriting-service'

type ServiceData = {
  title: string
  subtitle: string
  desc: string
  metaTitle: string
  metaDesc: string
  keywords: string[]
  features: { icon: string; title: string; desc: string }[]
  faq: { q: string; a: string }[]
}

const SERVICE_DATA: Record<ServiceSlug, ServiceData> = {
  'manuscript-editing-service': {
    title: 'Manuscript Editing Service',
    subtitle: 'Expert Editing for Journal-Ready Manuscripts',
    desc: 'Our PhD-qualified editors specialise in academic manuscript editing, ensuring your research paper meets the highest standards for journal submission. We correct grammar, improve clarity, and polish your writing for maximum impact.',
    metaTitle: 'Manuscript Editing Service | Expert Academic Editors | ContentConcepts',
    metaDesc: 'Professional manuscript editing by PhD editors. Grammar, clarity, style, and journal formatting. Fast turnaround, editing certificate included. Trusted by 10,000+ researchers.',
    keywords: ['manuscript editing service', 'academic manuscript editing', 'research paper editing', 'journal submission editing'],
    features: [
      { icon: '\u270f\ufe0f', title: 'Grammar & Syntax', desc: 'Comprehensive correction of grammar, punctuation, spelling, and sentence structure.' },
      { icon: '\ud83d\udd2c', title: 'Subject-Matter Experts', desc: 'Editors with PhDs in your field \u2014 science, medicine, humanities, social sciences.' },
      { icon: '\ud83d\udccb', title: 'Journal Style Compliance', desc: 'Formatting to APA, AMA, Chicago, Vancouver, and journal-specific guidelines.' },
      { icon: '\ud83d\udca1', title: 'Clarity & Coherence', desc: 'Restructuring sentences and paragraphs for maximum clarity and academic impact.' },
      { icon: '\ud83d\udcca', title: 'Abstract & Title Polish', desc: 'Special attention to your abstract, title, and keywords for discoverability.' },
      { icon: '\ud83c\udfc5', title: 'Editing Certificate', desc: 'Certificate of editing included \u2014 accepted by most international journals.' },
    ],
    faq: [
      { q: 'What types of manuscripts do you edit?', a: 'We edit all types of academic manuscripts including original research articles, review articles, case reports, short communications, and letters to the editor across all scientific and academic disciplines.' },
      { q: 'How long does manuscript editing take?', a: 'Standard turnaround is 3\u20135 business days depending on word count. Express service (24\u201348 hours) is available for urgent submissions.' },
      { q: 'Will my editor have expertise in my field?', a: 'Yes. We match every manuscript with an editor who holds a PhD or equivalent in your specific field of research.' },
      { q: 'Do you provide a certificate of editing?', a: 'Yes. Every manuscript editing project includes our Certificate of Professional Editing, which is accepted by most international journals as proof of English language editing.' },
    ],
  },
  'paper-editing-service': {
    title: 'Paper Editing Service',
    subtitle: 'Polish Your Research Paper to Publication Standard',
    desc: 'Get your research paper professionally edited by subject-matter experts. Our editors improve grammar, clarity, and academic style while preserving your original argument and voice.',
    metaTitle: 'Paper Editing Service | Research Paper Editing | ContentConcepts',
    metaDesc: 'Expert research paper editing by PhD editors. Grammar correction, clarity improvement, style consistency. Fast turnaround. Trusted by 10,000+ researchers worldwide.',
    keywords: ['paper editing service', 'research paper editing', 'academic paper editing', 'paper proofreading'],
    features: [
      { icon: '\u270f\ufe0f', title: 'Language Editing', desc: 'Grammar, punctuation, spelling, and sentence-level improvements throughout.' },
      { icon: '\ud83d\udd0d', title: 'Structural Review', desc: 'Assessment of paper structure, argument flow, and section organisation.' },
      { icon: '\ud83d\udcda', title: 'Academic Style', desc: 'Ensuring consistent academic register and discipline-appropriate terminology.' },
      { icon: '\ud83d\udccb', title: 'Reference Formatting', desc: 'Checking citation consistency and reference list formatting to your chosen style.' },
      { icon: '\ud83d\udca1', title: 'Clarity Enhancement', desc: 'Rewriting unclear passages for precision and academic impact.' },
      { icon: '\ud83c\udfc5', title: 'Editing Certificate', desc: 'Certificate of editing included with every paper editing project.' },
    ],
    faq: [
      { q: 'What is the difference between paper editing and proofreading?', a: 'Paper editing is more comprehensive \u2014 it addresses grammar, clarity, structure, and style. Proofreading focuses on surface errors only (spelling, punctuation, typos).' },
      { q: 'Can you edit papers in any academic discipline?', a: 'Yes. Our editors cover all disciplines including sciences, social sciences, humanities, engineering, medicine, law, and business.' },
      { q: 'Will my argument and ideas be changed?', a: 'Never. We edit your language, not your ideas. Your original argument, data, and conclusions remain entirely yours.' },
    ],
  },
  'thesis-editing-service': {
    title: 'Thesis Editing Service',
    subtitle: 'Expert Editing for Thesis and Dissertation Success',
    desc: "Your thesis represents years of research. Our specialised thesis editors ensure it is flawless \u2014 correcting every grammatical error, improving readability, and formatting to your university's exact requirements.",
    metaTitle: 'Thesis Editing Service | Dissertation Editing | ContentConcepts',
    metaDesc: 'Professional thesis and dissertation editing by PhD editors. Grammar, structure, university formatting requirements. Trusted by thousands of postgraduate students worldwide.',
    keywords: ['thesis editing service', 'dissertation editing', 'thesis proofreading', 'PhD thesis editing'],
    features: [
      { icon: '\ud83c\udf93', title: 'Thesis Specialists', desc: 'Editors with postgraduate qualifications who understand thesis conventions and expectations.' },
      { icon: '\u270f\ufe0f', title: 'Full Language Edit', desc: 'Comprehensive grammar, punctuation, and style correction across all chapters.' },
      { icon: '\ud83d\udccb', title: 'University Formatting', desc: "Formatting to your specific university's style guide and submission requirements." },
      { icon: '\ud83d\udd0d', title: 'Consistency Checking', desc: 'Ensuring consistent terminology, tense, and voice throughout the entire thesis.' },
      { icon: '\ud83d\udcda', title: 'Reference Verification', desc: 'Citation checking and reference list formatting in APA, Harvard, Chicago, or your required style.' },
      { icon: '\ud83d\udca1', title: 'Clarity & Flow', desc: 'Improving transitions between sections for a coherent, well-argued thesis.' },
    ],
    faq: [
      { q: 'Can you edit a thesis chapter by chapter?', a: 'Yes. We offer chapter-by-chapter editing if you are writing your thesis incrementally, or full thesis editing when complete.' },
      { q: 'Will you change my research findings or arguments?', a: 'Absolutely not. We edit the language and presentation of your thesis, never the content, data, or intellectual contribution.' },
      { q: 'How long does thesis editing take?', a: 'A typical 80,000-word thesis takes 7\u201310 business days. Express service is available for tighter deadlines.' },
    ],
  },
  'scientific-editing-service': {
    title: 'Scientific Editing Service',
    subtitle: 'Specialised Editing for Scientific Research Papers',
    desc: 'Our scientific editors hold PhDs in natural sciences, medicine, engineering, and related fields. We ensure your research meets the language and formatting standards of top-tier scientific journals.',
    metaTitle: 'Scientific Editing Service | Science Paper Editing | ContentConcepts',
    metaDesc: 'Scientific manuscript editing by PhD scientists. Journal-ready language, technical accuracy, and style compliance. Fast turnaround for researchers worldwide.',
    keywords: ['scientific editing service', 'science paper editing', 'scientific manuscript editing', 'research paper proofreading'],
    features: [
      { icon: '\ud83d\udd2c', title: 'PhD Scientist Editors', desc: 'Every scientific manuscript is edited by a subject-matter expert with relevant research experience.' },
      { icon: '\ud83d\udcca', title: 'Technical Accuracy', desc: 'Editors verify that scientific terminology and nomenclature are used correctly throughout.' },
      { icon: '\ud83d\udccb', title: 'Journal-Specific Formatting', desc: 'Tailored formatting to Nature, Science, PLOS ONE, Elsevier, and hundreds of other journals.' },
      { icon: '\u270f\ufe0f', title: 'Language Precision', desc: 'Scientific writing requires precise language \u2014 we ensure every claim is clearly and accurately expressed.' },
      { icon: '\ud83d\udcc8', title: 'Results & Methods Clarity', desc: 'Special focus on methods and results sections for reproducibility and clarity.' },
      { icon: '\ud83c\udfc5', title: 'Editing Certificate', desc: 'Journal-accepted certificate of English language editing included.' },
    ],
    faq: [
      { q: 'Do your editors understand technical scientific content?', a: 'Yes. We assign editors with PhDs and active research experience in your specific scientific field, whether biology, chemistry, physics, medicine, or engineering.' },
      { q: "Can you format to a specific journal's guidelines?", a: 'Yes. Provide us with the target journal name and we will format your manuscript to their specific submission requirements.' },
    ],
  },
  'essay-editing-service': {
    title: 'Essay Editing Service',
    subtitle: 'Professional Editing for Academic and Personal Essays',
    desc: "Whether you're submitting a university essay, personal statement, or application essay, our editors will ensure your writing is clear, compelling, and error-free.",
    metaTitle: 'Essay Editing Service | Academic Essay Proofreading | ContentConcepts',
    metaDesc: 'Professional essay editing and proofreading. Grammar correction, clarity, and style improvement. Fast 24-hour service. Trusted by students and academics worldwide.',
    keywords: ['essay editing service', 'academic essay editing', 'essay proofreading', 'personal statement editing'],
    features: [
      { icon: '\u270f\ufe0f', title: 'Grammar & Style', desc: 'Thorough correction of grammar, punctuation, and writing style for academic impact.' },
      { icon: '\ud83d\udca1', title: 'Argument Clarity', desc: 'Improving how your argument is presented without changing your ideas.' },
      { icon: '\ud83d\udccb', title: 'Structure & Flow', desc: 'Ensuring your essay has a logical structure with smooth transitions between paragraphs.' },
      { icon: '\ud83c\udfaf', title: 'Audience Alignment', desc: 'Tailoring tone and register to the intended audience and submission context.' },
      { icon: '\ud83d\udd0d', title: 'Consistency Check', desc: 'Ensuring consistent tense, voice, and referencing style throughout.' },
      { icon: '\u26a1', title: 'Fast Turnaround', desc: '24-hour service available for urgent essay submissions.' },
    ],
    faq: [
      { q: 'Do you edit personal statements and application essays?', a: 'Yes. We edit university application essays, personal statements, scholarship essays, and all other types of academic writing.' },
      { q: 'Will my essay still sound like me after editing?', a: 'Absolutely. We improve your language without changing your voice, ideas, or personal style.' },
    ],
  },
  'medical-editing-service': {
    title: 'Medical Editing Service',
    subtitle: 'Expert Editing for Medical Research and Clinical Papers',
    desc: 'Our medical editors hold MDs and PhDs in clinical medicine and biomedical sciences. We ensure your medical manuscripts meet the rigorous standards of top medical journals including Lancet, NEJM, JAMA, and BMJ.',
    metaTitle: 'Medical Editing Service | Clinical Paper Editing | ContentConcepts',
    metaDesc: 'Medical manuscript editing by MD and PhD editors. Journal-ready language for Lancet, NEJM, JAMA, and BMJ. Fast turnaround for medical researchers worldwide.',
    keywords: ['medical editing service', 'medical manuscript editing', 'clinical paper editing', 'medical research editing'],
    features: [
      { icon: '\ud83c\udfe5', title: 'MD & PhD Editors', desc: 'Medical manuscripts edited exclusively by editors with medical or biomedical research qualifications.' },
      { icon: '\ud83d\udccb', title: 'Top Journal Formatting', desc: 'Formatting to Lancet, NEJM, JAMA, BMJ, and all major medical journal guidelines.' },
      { icon: '\ud83d\udd2c', title: 'Clinical Terminology', desc: 'Ensuring correct use of medical terminology, drug names, and clinical nomenclature.' },
      { icon: '\u270f\ufe0f', title: 'Abstract Optimisation', desc: 'Medical abstracts receive special attention for structured format and word count compliance.' },
      { icon: '\ud83d\udcca', title: 'Statistics & Data', desc: 'Statistical reporting checked against CONSORT, STROBE, PRISMA, and other reporting guidelines.' },
      { icon: '\ud83c\udfc5', title: 'Editing Certificate', desc: 'Medical journal-accepted certificate of English language editing included.' },
    ],
    faq: [
      { q: 'Do you follow medical reporting guidelines?', a: 'Yes. Our medical editors are familiar with CONSORT, STROBE, PRISMA, CARE, and other reporting standards and will flag any reporting gaps.' },
      { q: 'Can you edit case reports and systematic reviews?', a: 'Yes. We edit all types of medical papers: original research, systematic reviews, meta-analyses, case reports, clinical guidelines, and letters.' },
    ],
  },
  'english-editing-service': {
    title: 'English Editing Service',
    subtitle: 'Native English Editing for Non-Native Speakers',
    desc: 'Written by a non-native English speaker? Our native English editors transform your writing into fluent, publication-ready English while preserving your ideas and voice.',
    metaTitle: 'English Editing Service | Non-Native English Editing | ContentConcepts',
    metaDesc: 'English editing service for non-native speakers. Native English editors improve grammar, fluency, and academic style. Trusted by researchers from 100+ countries.',
    keywords: ['english editing service', 'ESL editing', 'non-native english editing', 'english language editing'],
    features: [
      { icon: '\ud83c\udf0d', title: 'Native English Editors', desc: 'All editors are native English speakers with academic writing expertise.' },
      { icon: '\u270f\ufe0f', title: 'Grammar & Fluency', desc: 'Comprehensive correction of ESL grammar patterns, article usage, and prepositions.' },
      { icon: '\ud83d\udca1', title: 'Natural Phrasing', desc: 'Replacing unnatural expressions with idiomatic, fluent academic English.' },
      { icon: '\ud83d\udccb', title: 'Academic Register', desc: 'Ensuring appropriate formal academic tone throughout.' },
      { icon: '\ud83d\udd0d', title: 'Coherence & Flow', desc: 'Improving logical connections and transitions between sentences and paragraphs.' },
      { icon: '\ud83c\udf10', title: '100+ Countries Served', desc: 'Specialised experience with common language patterns from all major research-producing countries.' },
    ],
    faq: [
      { q: "I'm not a native English speaker \u2014 will editors understand my meaning?", a: 'Yes. Our editors are trained to understand the intended meaning of non-native writers and clarify language without distorting your ideas.' },
      { q: 'Do you offer British and American English editing?', a: 'Yes. We edit to both British English and American English standards. Please specify your preference when submitting.' },
    ],
  },
  'book-editing-service': {
    title: 'Book Editing Service',
    subtitle: 'Professional Editing for Academic and Professional Books',
    desc: 'Publishing an academic book, textbook, or professional monograph? Our book editors bring deep expertise in long-form academic writing to ensure your manuscript is publication-ready.',
    metaTitle: 'Book Editing Service | Academic Book Editing | ContentConcepts',
    metaDesc: 'Professional academic book and manuscript editing. Comprehensive language editing for monographs, textbooks, and edited volumes. Trusted by academic publishers.',
    keywords: ['book editing service', 'academic book editing', 'manuscript editing', 'monograph editing'],
    features: [
      { icon: '\ud83d\udcd6', title: 'Long-Form Expertise', desc: 'Experience editing full-length academic books, textbooks, and edited volumes.' },
      { icon: '\u270f\ufe0f', title: 'Comprehensive Language Edit', desc: 'Grammar, style, and clarity across every chapter and section.' },
      { icon: '\ud83d\udd0d', title: 'Consistency Audit', desc: 'Ensuring consistent terminology, style, and referencing across all chapters.' },
      { icon: '\ud83d\udccb', title: 'Publisher Formatting', desc: 'Formatting to publisher-specific style guides (Chicago, APA, Oxford, etc.).' },
      { icon: '\ud83d\udca1', title: 'Chapter Structure', desc: 'Structural feedback on chapter organisation and overall narrative flow.' },
      { icon: '\ud83c\udfc5', title: 'Editing Certificate', desc: 'Certificate of professional editing suitable for publisher submission.' },
    ],
    faq: [
      { q: 'Can you edit an edited volume with multiple authors?', a: 'Yes. We specialise in edited volumes and ensure consistency of language and style across chapters written by different contributors.' },
      { q: 'How long does book editing take?', a: 'A full book manuscript (80,000\u2013120,000 words) typically takes 3\u20134 weeks. We offer project-specific timelines for large manuscripts.' },
    ],
  },
  'proofreading-services': {
    title: 'Proofreading Services',
    subtitle: 'Final Polish Before Submission or Publication',
    desc: 'Our professional proofreading service catches every remaining error after writing or editing \u2014 spelling, punctuation, grammar, formatting, and consistency \u2014 ensuring your document is flawless before submission.',
    metaTitle: 'Proofreading Services | Professional Proofreading | ContentConcepts',
    metaDesc: 'Professional proofreading services for academic papers, theses, and manuscripts. Fast, accurate, and affordable. Trusted by 10,000+ researchers and students worldwide.',
    keywords: ['proofreading services', 'academic proofreading', 'manuscript proofreading', 'professional proofreading'],
    features: [
      { icon: '\ud83d\udd0d', title: 'Spelling & Grammar', desc: 'Catching all remaining spelling errors, typos, and grammatical mistakes.' },
      { icon: '\u2705', title: 'Punctuation', desc: 'Correcting comma splices, apostrophe errors, and all punctuation issues.' },
      { icon: '\ud83d\udccb', title: 'Formatting Consistency', desc: 'Checking font, heading levels, spacing, and layout consistency throughout.' },
      { icon: '\ud83d\udd22', title: 'Numbering & Lists', desc: 'Verifying figure/table numbers, list formatting, and cross-references.' },
      { icon: '\ud83d\udcda', title: 'Reference Checking', desc: 'Confirming all in-text citations have corresponding reference list entries.' },
      { icon: '\u26a1', title: 'Fast Service', desc: '24-hour proofreading available for urgent submissions.' },
    ],
    faq: [
      { q: 'What is the difference between proofreading and editing?', a: 'Proofreading focuses on surface errors \u2014 spelling, punctuation, grammar, and formatting. Editing also addresses clarity, structure, and academic style. If your document has already been edited, proofreading is the right final step.' },
      { q: 'Do I get a tracked changes document?', a: 'Yes. All proofreading is delivered with tracked changes so you can review and accept each correction.' },
    ],
  },
  'plagiarism-editing-service': {
    title: 'Plagiarism Editing Service',
    subtitle: 'Reduce Similarity Scores and Ensure Originality',
    desc: 'Our plagiarism editing service helps authors reduce similarity scores while maintaining academic integrity. We rewrite flagged sections in your voice to ensure originality without distorting your meaning.',
    metaTitle: 'Plagiarism Editing Service | Similarity Score Reduction | ContentConcepts',
    metaDesc: 'Professional plagiarism editing and paraphrasing service. Reduce Turnitin similarity scores while preserving your meaning. Trusted by academics worldwide.',
    keywords: ['plagiarism editing service', 'plagiarism removal', 'similarity score reduction', 'paraphrasing service'],
    features: [
      { icon: '\ud83d\udd0d', title: 'Similarity Analysis', desc: 'We review your similarity report and identify sections requiring rewriting.' },
      { icon: '\u270f\ufe0f', title: 'Expert Paraphrasing', desc: 'Skilled rewriting of flagged sections in academic English, preserving meaning.' },
      { icon: '\ud83d\udcc9', title: 'Score Reduction', desc: 'Targeted editing to reduce your Turnitin or iThenticate similarity score.' },
      { icon: '\ud83d\udcda', title: 'Proper Citation Guidance', desc: 'Advice on correctly citing sources to avoid unintentional plagiarism.' },
      { icon: '\ud83c\udfeb', title: 'Academic Integrity', desc: 'All rewriting maintains the highest standards of academic integrity and originality.' },
      { icon: '\ud83d\udd12', title: '100% Confidential', desc: 'Your document and similarity report are handled with complete confidentiality.' },
    ],
    faq: [
      { q: 'Will this service make my paper plagiarism-free?', a: 'We reduce similarity to legitimate sources through expert paraphrasing and proper citation. We cannot guarantee a specific similarity percentage as this depends on source databases and checking software.' },
      { q: 'Is this service ethical?', a: 'Yes. Our service helps authors correctly paraphrase and cite sources \u2014 this is a legitimate academic skill. We do not write new content to replace your own work.' },
    ],
  },
  'rewriting-service': {
    title: 'Rewriting Service',
    subtitle: 'Transform Your Draft into Publication-Ready Writing',
    desc: 'Our rewriting service transforms poorly written drafts into clear, fluent, publication-ready academic English. Ideal for authors whose first language is not English or whose work requires significant language improvement.',
    metaTitle: 'Rewriting Service | Academic Rewriting | ContentConcepts',
    metaDesc: 'Professional academic rewriting service. Transform rough drafts into clear, publication-ready English. Expert rewriters with subject-matter expertise. Fast turnaround.',
    keywords: ['rewriting service', 'academic rewriting', 'manuscript rewriting', 'text rewriting service'],
    features: [
      { icon: '\u270f\ufe0f', title: 'Full Rewrite Option', desc: 'Complete rewriting of sections or entire documents while preserving all your ideas and data.' },
      { icon: '\ud83d\udca1', title: 'Clarity Transformation', desc: 'Converting complex, unclear writing into precise, fluent academic prose.' },
      { icon: '\ud83c\udf0d', title: 'ESL Specialist', desc: 'Particular expertise in rewriting content originally drafted in a non-English language.' },
      { icon: '\ud83d\udccb', title: 'Style Alignment', desc: "Rewriting to match your target journal or publisher's preferred style." },
      { icon: '\ud83d\udd12', title: 'Your Ideas, Our Prose', desc: 'We rewrite the language \u2014 your research, data, and arguments remain entirely unchanged.' },
      { icon: '\ud83d\udcca', title: 'Any Document Type', desc: 'Manuscripts, theses, reports, grant applications, and any other academic document.' },
    ],
    faq: [
      { q: 'Is rewriting the same as ghostwriting?', a: 'No. Rewriting improves and transforms text that you have already written. All the ideas, research, and content remain yours \u2014 we only improve the language.' },
      { q: 'How is rewriting different from editing?', a: 'Editing corrects and improves existing text. Rewriting substantially transforms the text when editing alone is insufficient to reach publication standard.' },
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(SERVICE_DATA).map(service => ({ service }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; service: string }>
}): Promise<Metadata> {
  const { locale, service } = await params
  const data = SERVICE_DATA[service as ServiceSlug]
  if (!data) return {}
  const url = `https://contentconcepts.com/${locale}/services/${service}`
  return {
    title: data.metaTitle,
    description: data.metaDesc,
    keywords: data.keywords,
    alternates: {
      canonical: url,
      languages: {
        en: `https://contentconcepts.com/en/services/${service}`,
        es: `https://contentconcepts.com/es/services/${service}`,
        fr: `https://contentconcepts.com/fr/services/${service}`,
        'x-default': `https://contentconcepts.com/en/services/${service}`,
      },
    },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDesc,
      url,
      siteName: 'ContentConcepts',
      locale,
      type: 'website',
    },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; service: string }>
}) {
  const { locale, service } = await params
  const data = SERVICE_DATA[service as ServiceSlug]
  if (!data) notFound()

  return (
    <ServicePageTemplate
      data={{
        locale,
        heroTitle: data.title,
        heroSubtitle: data.subtitle,
        heroDesc: data.desc,
        primaryCTA: 'Get a Free Quote',
        primaryCTAHref: `/${locale}/pricing`,
        features: data.features,
        processSteps: COMMON_STEPS,
        bodyContent: '',
        faqItems: data.faq,
      }}
    />
  )
}
