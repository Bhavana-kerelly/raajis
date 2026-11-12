import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './gifting.css'

// --------------------------------------------------------------------------
// DATA DEFINITIONS (Verified with Raaji's brand specs)
// --------------------------------------------------------------------------

const OCCASIONS = [
  {
    id: 'curated',
    badgeIcon: '✨',
    badge: 'CURATED',
    title: 'Curated Gift Hampers',
    desc: 'Thoughtfully assembled gifts for everyone, featuring heirloom sweets and savouries.',
    tags: ['Signature Hampers', 'Festive Boxes', 'Gourmet Jars'],
    img: '/gifting/occasion-curated.jpg',
    link: '#corporate-inquiry',
  },
  {
    id: 'corporate',
    badgeIcon: '🎁',
    badge: 'CORPORATE',
    title: 'Corporate Gifting',
    desc: 'Thoughtful gifts for teams and clients with custom branding and doorstep dispatch.',
    tags: ['Client Appreciation', 'Welcome Kits', 'Executive Boxes'],
    img: '/gifting/occasion-corporate.jpg',
    link: '#corporate-inquiry',
  },
  {
    id: 'wedding',
    badgeIcon: '💍',
    badge: 'WEDDING',
    title: 'Wedding Hampers',
    desc: 'Celebrate love with traditional Telugu flavours and elegant brass keepsake accents.',
    tags: ['Wedding Favours', 'Mehendi & Sangeet', 'Return Gifts'],
    img: '/gifting/occasion-wedding.jpg',
    link: '#corporate-inquiry',
  },
  {
    id: 'housewarming',
    badgeIcon: '🏡',
    badge: 'HOUSEWARMING',
    title: 'Housewarming Gifts',
    desc: 'Blessings for new beginnings with auspicious traditional sweets and aromatic snacks.',
    tags: ['Grihapravesham', 'Brass Diya', 'Traditional Sweets'],
    img: '/gifting/occasion-housewarming.jpg',
    link: '#corporate-inquiry',
  },
  {
    id: 'bar-hosting',
    badgeIcon: '🍸',
    badge: 'BAR & HOSTING',
    title: 'Bar & Hosting Hampers',
    desc: 'An elevated entertaining experience with gourmet spiced nuts and crunchy nibbles.',
    tags: ['Spiced Cashews', 'Traditional Chekkalu', 'Cocktail Crunch'],
    img: '/gifting/occasion-bar.jpg',
    link: '#corporate-inquiry',
  },
  {
    id: 'festive',
    badgeIcon: '🪔',
    badge: 'FESTIVALS',
    title: 'Festive Gifting',
    desc: 'Share the joy of celebrations with authentic small-batch Ariselu, Sakinalu and Sunnundalu.',
    tags: ['Diwali Hampers', 'Sankranti Specials', 'Pure Ghee Sweets'],
    img: '/gifting/occasion-festive.jpg',
    link: '#corporate-inquiry',
  },
]

const MILESTONES = [
  {
    id: 'onboarding',
    title: 'Client Onboarding & Appreciation',
    desc: 'First impressions start before the first meeting. Welcome partners with warmth.',
    cta: 'Explore Client Boxes →',
    img: '/gifting/milestone-client.jpg',
  },
  {
    id: 'employee',
    title: 'Employee Milestones',
    desc: 'Celebrate work anniversaries and new joiners.',
    cta: 'Explore Employee Kits →',
    img: '/gifting/milestone-employee.jpg',
  },
  {
    id: 'festive',
    title: 'Festive Gifting',
    desc: 'Share heirloom sweets this festive season.',
    cta: 'Explore Festive Hampers →',
    img: '/gifting/milestone-festive.jpg',
  },
  {
    id: 'launches',
    title: 'Brand Launches & Corporate Events',
    desc: 'Turn attendees into brand advocates.',
    cta: 'Explore Event Favours →',
    img: '/gifting/milestone-launch.jpg',
  },
]

const DIFFERENTIATORS = [
  {
    id: 'personalization',
    title: 'PERSONALIZATION AT SCALE',
    desc: 'Custom branding, packaging and personalized messages.',
    iconImg: '/gifting/icons/craft-1-personalization.png',
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
        {/* Gift box base & lid */}
        <rect x="10" y="22" width="28" height="18" rx="2" stroke="#790D25" strokeWidth="2.2" fill="none" />
        <rect x="7" y="16" width="34" height="6.5" rx="1.5" stroke="#790D25" strokeWidth="2.2" fill="none" />
        {/* Ribbon bands */}
        <line x1="24" y1="16" x2="24" y2="40" stroke="#B96D45" strokeWidth="2.2" />
        <line x1="10" y1="31" x2="38" y2="31" stroke="#B96D45" strokeWidth="1.8" strokeDasharray="2 2" />
        {/* Ribbon Bow on top */}
        <path d="M24 16 C20 10 13 10 16 16 C19 16 23 16 24 16 Z" stroke="#790D25" strokeWidth="2" fill="rgba(185, 109, 69, 0.15)" />
        <path d="M24 16 C28 10 35 10 32 16 C29 16 25 16 24 16 Z" stroke="#790D25" strokeWidth="2" fill="rgba(185, 109, 69, 0.15)" />
        <circle cx="24" cy="16" r="2" fill="#C99A52" />
        {/* Sparkles */}
        <path d="M9 10 L10 6 L11 10 L15 11 L11 12 L10 16 L9 12 L5 11 Z" fill="#C99A52" />
        <path d="M38 12 L39 9 L40 12 L43 13 L40 14 L39 17 L38 14 L35 13 Z" fill="#C99A52" />
      </svg>
    ),
  },
  {
    id: 'turnaround',
    title: 'QUICK TURNAROUND',
    desc: 'Organized planning and efficient order execution.',
    iconImg: '/gifting/icons/craft-2-turnaround.png',
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
        {/* Motion speed ticks on left */}
        <line x1="6" y1="20" x2="11" y2="20" stroke="#B96D45" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="4" y1="25" x2="10" y2="25" stroke="#C99A52" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="7" y1="30" x2="12" y2="30" stroke="#B96D45" strokeWidth="2.2" strokeLinecap="round" />
        {/* Clock circle */}
        <circle cx="27" cy="25" r="14.5" stroke="#790D25" strokeWidth="2.2" fill="none" />
        {/* Clock hands */}
        <circle cx="27" cy="25" r="2" fill="#790D25" />
        <polyline points="27,16 27,25 33,28" stroke="#790D25" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Outer tick marks at 12, 3, 6 */}
        <line x1="27" y1="12" x2="27" y2="14" stroke="#C99A52" strokeWidth="2" strokeLinecap="round" />
        <line x1="40" y1="25" x2="38" y2="25" stroke="#C99A52" strokeWidth="2" strokeLinecap="round" />
        <line x1="27" y1="38" x2="27" y2="36" stroke="#C99A52" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'bulk',
    title: 'BULK ORDER EXPERTISE',
    desc: 'Carefully coordinated gifting for larger orders.',
    iconImg: '/gifting/icons/craft-3-bulk.png',
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
        {/* Top Box */}
        <rect x="18" y="7" width="12" height="12" rx="1.5" stroke="#790D25" strokeWidth="2.2" fill="none" />
        <line x1="24" y1="7" x2="24" y2="19" stroke="#B96D45" strokeWidth="1.8" />
        {/* Bottom Left Box */}
        <rect x="10" y="21" width="13" height="15" rx="1.5" stroke="#790D25" strokeWidth="2.2" fill="none" />
        <line x1="16.5" y1="21" x2="16.5" y2="36" stroke="#B96D45" strokeWidth="1.8" />
        <line x1="10" y1="28.5" x2="23" y2="28.5" stroke="#C99A52" strokeWidth="1.5" strokeDasharray="1.5 1.5" />
        {/* Bottom Right Box */}
        <rect x="25" y="21" width="13" height="15" rx="1.5" stroke="#790D25" strokeWidth="2.2" fill="none" />
        <line x1="31.5" y1="21" x2="31.5" y2="36" stroke="#B96D45" strokeWidth="1.8" />
        <line x1="25" y1="28.5" x2="38" y2="28.5" stroke="#C99A52" strokeWidth="1.5" strokeDasharray="1.5 1.5" />
      </svg>
    ),
  },
  {
    id: 'curated',
    title: 'THOUGHTFULLY CURATED GIFTS',
    desc: 'Traditional snacks, sweets and premium combinations.',
    iconImg: '/gifting/icons/craft-4-curated.png',
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
        {/* Hamper Box / Gift basket */}
        <path d="M12 21 L36 21 L33.5 39 C33.5 40 32.5 41 31.5 41 L16.5 41 C15.5 41 14.5 40 14.5 39 Z" stroke="#790D25" strokeWidth="2.2" fill="none" />
        {/* Box Lid */}
        <rect x="9" y="16" width="30" height="5.5" rx="1.5" stroke="#790D25" strokeWidth="2.2" fill="none" />
        {/* Ribbon Bands */}
        <line x1="24" y1="16" x2="24" y2="41" stroke="#B96D45" strokeWidth="2.2" />
        {/* Ribbon Bow Loops */}
        <path d="M24 16 C20 9 12 10 15 16 C18 16 22 16 24 16 Z" stroke="#790D25" strokeWidth="2" fill="rgba(201, 154, 82, 0.15)" />
        <path d="M24 16 C28 9 36 10 33 16 C30 16 26 16 24 16 Z" stroke="#790D25" strokeWidth="2" fill="rgba(201, 154, 82, 0.15)" />
        <circle cx="24" cy="16" r="2.2" fill="#C99A52" />
      </svg>
    ),
  },
  {
    id: 'delivery',
    title: 'DELIVERY COORDINATION',
    desc: 'Delivery planning for your gifting requirements.',
    iconImg: '/gifting/icons/craft-5-delivery.png',
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
        {/* India Map Outline */}
        <path
          d="M22 6 L26 8 L29 11 L27 14 L30 15 L32 19 L35 20 L33 24 L37 25 L35 28 L31 29 L28 33 L26 38 L24 42 L22 37 L19 32 L18 27 L15 25 L16 21 L14 19 L16 16 L19 15 L20 11 Z"
          stroke="#790D25"
          strokeWidth="2.2"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Location Pin */}
        <path
          d="M24 18 C21.8 18 20 19.8 20 22 C20 25.2 24 29 24 29 C24 29 28 25.2 28 22 C28 19.8 26.2 18 24 18 Z"
          fill="#B96D45"
          stroke="#790D25"
          strokeWidth="1.5"
        />
        <circle cx="24" cy="22" r="1.8" fill="#FFFDF8" />
      </svg>
    ),
  },
  {
    id: 'support',
    title: 'DEDICATED SUPPORT',
    desc: 'Personal assistance from enquiry to order completion.',
    iconImg: '/gifting/icons/craft-6-support.png',
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
        {/* Headband */}
        <path d="M12 24 C12 16 17 10 24 10 C31 10 36 16 36 24" stroke="#790D25" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        {/* Left Ear Cup */}
        <rect x="9" y="22" width="6.5" height="11" rx="3.25" stroke="#790D25" strokeWidth="2" fill="#B96D45" />
        {/* Right Ear Cup */}
        <rect x="32.5" y="22" width="6.5" height="11" rx="3.25" stroke="#790D25" strokeWidth="2" fill="#B96D45" />
        {/* Microphone Boom */}
        <path d="M35 31 C35 37 30 39 25 39" stroke="#790D25" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="23" cy="39" r="2.2" fill="#C99A52" />
      </svg>
    ),
  },
]

const HOW_IT_WORKS_PROCESS = [
  {
    num: '01',
    title: 'Submit Your Enquiry',
    desc: 'Fill in the form with your gifting requirements, quantity and budget.',
    cardBg: '#EEF0FC',
    borderColor: 'rgba(179, 194, 240, 0.55)',
    iconBg: '#DCE4FA',
    numColor: '#B3C2F0',
    iconImg: '/gifting/icons/step-1-enquiry.png',
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path d="M7 5 C7 3.9 7.9 3 9 3 H20 L26 9 V27 C26 28.1 25.1 29 24 29 H9 C7.9 29 7 28.1 7 27 Z" stroke="#2F437B" strokeWidth="2" fill="none" strokeLinejoin="round" />
        <polyline points="20 3 20 9 26 9" stroke="#2F437B" strokeWidth="1.8" strokeLinejoin="round" />
        <line x1="11" y1="13" x2="17" y2="13" stroke="#2F437B" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="11" y1="17" x2="20" y2="17" stroke="#2F437B" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="11" y1="21" x2="16" y2="21" stroke="#2F437B" strokeWidth="1.8" strokeLinecap="round" />
        <g transform="rotate(35 22 22)">
          <path d="M19 16 L23 16 L24 25 L21 27 L18 25 Z" fill="#4B63A8" stroke="#2F437B" strokeWidth="1.5" />
          <polygon points="19.5,25 22.5,25 21,27.5" fill="#2F437B" />
        </g>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Requirement Discussion',
    desc: 'Discuss your occasion, preferences, customization and delivery expectations.',
    cardBg: '#FFF0E4',
    borderColor: 'rgba(247, 199, 165, 0.55)',
    iconBg: '#FDE2D0',
    numColor: '#F7C7A5',
    iconImg: '/gifting/icons/step-2-discussion.png',
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path
          d="M8.5 7.5 C8.5 7.5 10 6 12 7.5 L13.5 10.5 C14.5 12 13 13.5 12.5 14.5 C14 17.5 16.5 20 19.5 21.5 C20.5 21 22 19.5 23.5 20.5 L26.5 22 C28 24 26.5 25.5 26.5 25.5 C24.5 27.5 20 27 15 22 C10 17 9.5 12.5 8.5 7.5 Z"
          stroke="#8D3F28"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
        />
        <path d="M22 6 C24.5 7.5 26.5 9.5 28 12" stroke="#8D3F28" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 9 C21.5 10.2 22.8 11.5 24 13" stroke="#B96D45" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Curate & Customize Your Gifts',
    desc: 'Explore gifting options, approve selections and finalize personalization.',
    cardBg: '#F7ECFC',
    borderColor: 'rgba(216, 185, 243, 0.55)',
    iconBg: '#EEDBFA',
    numColor: '#D8B9F3',
    iconImg: '/gifting/icons/step-3-curate.png',
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path
          d="M11 13 C11 10.2 13.2 8 16 8 C18.8 8 21 10.2 21 13 C21 15.5 19.2 17.5 18 19 V21 H14 V19 C12.8 17.5 11 15.5 11 13 Z"
          stroke="#723A8C"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
        />
        <line x1="14" y1="23" x2="18" y2="23" stroke="#723A8C" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="25" x2="17" y2="25" stroke="#723A8C" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="16" y1="3" x2="16" y2="5" stroke="#9B55BA" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="6" x2="9.5" y2="7.5" stroke="#9B55BA" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="6" x2="22.5" y2="7.5" stroke="#9B55BA" strokeWidth="2" strokeLinecap="round" />
        <line x1="5" y1="13" x2="7" y2="13" stroke="#9B55BA" strokeWidth="2" strokeLinecap="round" />
        <line x1="27" y1="13" x2="25" y2="13" stroke="#9B55BA" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Seamless Delivery',
    desc: 'Your approved gifting order is prepared and dispatched according to the plan.',
    cardBg: '#FFF8E3',
    borderColor: 'rgba(240, 220, 145, 0.55)',
    iconBg: '#FDEEBE',
    numColor: '#F0DC91',
    iconImg: '/gifting/icons/step-4-delivery.png',
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="9" width="16" height="13" rx="1.5" stroke="#8A6715" strokeWidth="2" fill="none" />
        <path d="M20 13 H24.5 L28 17 V22 H20 V13 Z" stroke="#8A6715" strokeWidth="2" fill="none" strokeLinejoin="round" />
        <line x1="24" y1="14" x2="27" y2="17" stroke="#B08D28" strokeWidth="1.5" />
        <circle cx="9" cy="23" r="2.8" stroke="#8A6715" strokeWidth="2" fill="#FDEEBE" />
        <circle cx="24" cy="23" r="2.8" stroke="#8A6715" strokeWidth="2" fill="#FDEEBE" />
        <line x1="1" y1="13" x2="3" y2="13" stroke="#B08D28" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="1" y1="17" x2="2.5" y2="17" stroke="#B08D28" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
]

const FAQS = [
  {
    q: '1. What is the minimum order quantity (MOQ) for corporate orders?',
    a: 'Our standard minimum order quantity for custom-branded corporate hampers starts at 15 boxes. For smaller team recognitions or boutique bespoke gifts, you can also order from our ready Curated Hampers collection without an MOQ threshold.',
  },
  {
    q: '2. Can we taste the snacks before placing a bulk order?',
    a: 'Yes, absolutely! We provide curated sample tasting boxes for corporate teams evaluating orders above 25 units. We courier the tasting box directly to your office so your committee can experience our heirloom flavours firsthand.',
  },
  {
    q: '3. What is the shelf life of your handmade snacks and dry fruits?',
    a: 'Our savoury snacks (like Sakinalu, Chekkalu, Chekodi, Murukulu) and premium roasted dry fruits have a shelf life of 60 to 90 days. Traditional sweets like Ariselu and Sunnundalu are crafted fresh in pure ghee and jaggery, recommended within 30 to 45 days. We use zero chemical preservatives.',
  },
  {
    q: '4. Do you ship directly to remote employees across India?',
    a: 'Yes. We offer seamless pan-India direct doorstep fulfillment. You simply share the address manifest using our secure template, and our logistics team handles packing, shipping, and automated delivery tracking updates for every individual recipient.',
  },
  {
    q: '5. Do you provide GST-compliant invoices?',
    a: 'Yes, 100%. We provide valid B2B tax invoices clearly displaying your company name, GSTIN, and state code, allowing you to seamlessly claim eligible input tax credit.',
  },
  {
    q: '6. Can we add our company logo and custom branding?',
    a: 'Yes! We offer multiple custom branding options including full-bleed printed gift box sleeves, gold-foiled logo stickers, personalized welcome notes on textured card stock, and customized engraved brass or copper keepsake add-ons.',
  },
]

export default function Gifting() {
  const [activeFaq, setActiveFaq] = useState(null)

  // Enquiry form state
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    workEmail: '',
    phone: '',
    occasionType: 'Corporate Gifting',
    quantity: '51 – 150 Boxes',
    customNotes: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    // Compose formatted WhatsApp enquiry message to Raaji's official line: +91 93478 80788
    const message = `Hello Raaji's Crafted Snacks! 👋\n*Corporate Gifting Proposal Request*\n\n` +
      `👤 *Name:* ${formData.fullName}\n` +
      `🏢 *Company / Organization:* ${formData.companyName}\n` +
      `✉️ *Work Email:* ${formData.workEmail}\n` +
      `📞 *Phone / WhatsApp:* ${formData.phone}\n` +
      `🎉 *Occasion:* ${formData.occasionType}\n` +
      `📦 *Estimated Quantity:* ${formData.quantity}\n` +
      (formData.customNotes ? `📝 *Notes / Preferences:* ${formData.customNotes}\n\n` : '\n') +
      `_Sent via Raaji's Corporate Gifting Portal_`

    const waUrl = `https://wa.me/919347880788?text=${encodeURIComponent(message)}`
    window.location.href = waUrl
  }

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx)
  }

  return (
    <div className="gifting-page">
      {/* GLOBAL WEBSITE NAVBAR */}
      <Navbar />

      {/* ====================================================================
          HERO SECTION (BACKGROUND IMAGE LAYOUT — COMPLETE LEFT ALIGNED)
          ==================================================================== */}
      <section className="gifting-hero">
        <div className="gifting-hero-container">
          <motion.div
            className="gifting-hero-content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="gifting-eyebrow-pill">
              HANDCRAFTED IN TELANGANA · DELIVERED ACROSS INDIA
            </span>

            <h1 className="gifting-hero-title">
              Elevate Your Corporate Gifting with Heirloom Taste.
            </h1>

            <p className="gifting-hero-desc">
              Move beyond generic factory boxes. Gift small-batch handmade Telugu snacks,
              gourmet dry fruits, and custom-branded keepsakes that leave a lasting impression.
            </p>

            <div className="gifting-hero-buttons">
              <a href="#corporate-inquiry" className="btn-gifting-primary">
                Request a Sample Box →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 4 — BRAND BENEFITS STRIP (4 ITEMS)
          ==================================================================== */}
      <section className="gifting-benefits-strip">
        <div className="gifting-container">
          <div className="benefits-box">
            {/* Benefit 1: 100% Handcrafted */}
            <div className="benefit-card">
              <div className="benefit-icon-wrap" aria-hidden="true">
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 30V22.5C16.5 20 17 17.5 17.5 15" stroke="#7D3C1B" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M16.5 21.5C16.5 21.5 12 21.5 8 17.5C4 13.5 4.5 8 6 6.5C7.5 5 13 4.5 17 8.5C18.5 10 17.5 17 16.5 21.5Z" fill="#6BA83E" />
                  <path d="M9 12.5C11.5 10.5 14 9 17 8.5" stroke="#4D7F2A" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
                  <path d="M17 19C17 19 21.5 19 25 15.5C28.5 12 28 7 26.5 5.5C25 4 20 4.5 16.5 8C15 9.5 16.5 15.5 17 19Z" fill="#8AA93E" />
                  <path d="M23 11C21 9.5 18.5 8.5 16.5 8" stroke="#668228" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
                </svg>
              </div>
              <div className="benefit-text-wrap">
                <h4 className="benefit-title">100% Handcrafted</h4>
                <p className="benefit-desc">Small-batch recipes made with pure ghee & jaggery.</p>
              </div>
            </div>

            {/* Benefit 2: Custom Branding */}
            <div className="benefit-card">
              <div className="benefit-icon-wrap" aria-hidden="true">
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 7H24L31 14.5L17 29.5L3 14.5L10 7Z" stroke="#6E0829" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M3 14.5H31" stroke="#6E0829" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M10 7L13.5 14.5L17 7L20.5 14.5L24 7" stroke="#6E0829" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M13.5 14.5L17 29.5L20.5 14.5" stroke="#6E0829" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="benefit-text-wrap">
                <h4 className="benefit-title">Custom Branding</h4>
                <p className="benefit-desc">Logo sleeves, custom note cards & engraved keepsakes.</p>
              </div>
            </div>

            {/* Benefit 3: Pan-India Doorstep Delivery */}
            <div className="benefit-card">
              <div className="benefit-icon-wrap" aria-hidden="true">
                <svg width="36" height="34" viewBox="0 0 36 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 20H4.5" stroke="#6E0829" strokeWidth="2" strokeLinecap="round" />
                  <rect x="5.5" y="7.5" width="17" height="14" rx="1.5" fill="#EBBF95" stroke="#6E0829" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M22.5 12H27.5L32 16.5V21.5H22.5V12Z" fill="#FFF8F0" stroke="#6E0829" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M24 13.5H27L30 16.5H24V13.5Z" fill="#EBD7C4" stroke="#6E0829" strokeWidth="1.2" strokeLinejoin="round" />
                  <path d="M14.5 21.5H24.5" stroke="#6E0829" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="10.5" cy="23" r="3.2" fill="#FFFDF8" stroke="#6E0829" strokeWidth="2" />
                  <circle cx="27.5" cy="23" r="3.2" fill="#FFFDF8" stroke="#6E0829" strokeWidth="2" />
                </svg>
              </div>
              <div className="benefit-text-wrap">
                <h4 className="benefit-title">Pan-India Doorstep Delivery</h4>
                <p className="benefit-desc">Bulk office drop or individual shipping.</p>
              </div>
            </div>

            {/* Benefit 4: 100% GST Compliant */}
            <div className="benefit-card">
              <div className="benefit-icon-wrap" aria-hidden="true">
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 4.5C21.5 6 25.5 5.8 27 7C27.5 16 23.5 24 17 28C10.5 24 6.5 16 7 7C8.5 5.8 12.5 6 17 4.5Z" fill="#F3DCCF" stroke="#6E0829" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M12.5 16L15.8 19.5L22 12" stroke="#6E0829" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="benefit-text-wrap">
                <h4 className="benefit-title">100% GST Compliant</h4>
                <p className="benefit-desc">Seamless B2B invoicing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          THOUGHTFUL GIFTING FOR EVERY BUSINESS MILESTONE (BENTO ASYMMETRIC GRID)
          ==================================================================== */}
      <section className="gifting-milestones-section" id="milestones-section">
        <div className="gifting-container">
          <div className="milestones-title-divider">
            <span className="milestones-divider-line" />
            <h2 className="milestones-heading">Thoughtful Gifting for Every Business Milestone</h2>
            <span className="milestones-divider-line" />
          </div>

          <div className="milestones-bento-layout">
            {/* 1. Large Feature Card on Left: Client Onboarding & Appreciation */}
            <a
              href="#corporate-inquiry"
              className="bento-card-large bento-bg-card"
              style={{ backgroundImage: `url(${MILESTONES[0].img})` }}
              onClick={() => {
                setFormData((prev) => ({ ...prev, occasionType: MILESTONES[0].title }))
              }}
            >
              <div className="bento-content bento-content-large">
                <h3 className="bento-title bento-title-large">{MILESTONES[0].title}</h3>
                <p className="bento-desc bento-desc-large">{MILESTONES[0].desc}</p>
                <span className="bento-link">{MILESTONES[0].cta}</span>
              </div>
            </a>

            {/* Right Column: Top Wide Card + Bottom 2 Cards */}
            <div className="milestones-right-col">
              {/* 2. Top Wide Card: Employee Milestones */}
              <a
                href="#corporate-inquiry"
                className="bento-card-wide bento-bg-card"
                style={{ backgroundImage: `url(${MILESTONES[1].img})` }}
                onClick={() => {
                  setFormData((prev) => ({ ...prev, occasionType: MILESTONES[1].title }))
                }}
              >
                <div className="bento-content bento-content-wide">
                  <h3 className="bento-title bento-title-wide">{MILESTONES[1].title}</h3>
                  <p className="bento-desc">{MILESTONES[1].desc}</p>
                  <span className="bento-link">{MILESTONES[1].cta}</span>
                </div>
              </a>

              {/* Bottom Row: 2 Compact Cards Side-by-Side */}
              <div className="bento-bottom-row">
                {/* 3. Bottom Left: Festive Gifting */}
                <a
                  href="#corporate-inquiry"
                  className="bento-card-compact bento-bg-card"
                  style={{ backgroundImage: `url(${MILESTONES[2].img})` }}
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, occasionType: MILESTONES[2].title }))
                  }}
                >
                  <div className="bento-content bento-content-compact">
                    <h3 className="bento-title bento-title-compact">{MILESTONES[2].title}</h3>
                    <p className="bento-desc bento-desc-compact">{MILESTONES[2].desc}</p>
                    <span className="bento-link">{MILESTONES[2].cta}</span>
                  </div>
                </a>

                {/* 4. Bottom Right: Brand Launches & Corporate Events */}
                <a
                  href="#corporate-inquiry"
                  className="bento-card-compact bento-bg-card"
                  style={{ backgroundImage: `url(${MILESTONES[3].img})` }}
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, occasionType: MILESTONES[3].title }))
                  }}
                >
                  <div className="bento-content bento-content-compact">
                    <h3 className="bento-title bento-title-compact">{MILESTONES[3].title}</h3>
                    <p className="bento-desc bento-desc-compact">{MILESTONES[3].desc}</p>
                    <span className="bento-link">{MILESTONES[3].cta}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          A GIFT FOR EVERY OCCASION (6 CARDS)
          ==================================================================== */}
      <section className="gifting-occasions-section" id="occasions-section">
        <div className="gifting-container">
          <div className="section-editorial-header">
            <h2 className="section-editorial-title">A Gift for Every Occasion</h2>
            <p className="section-editorial-subtitle">
              From intimate celebrations to grand corporate gestures, find something meaningful for every moment.
            </p>
          </div>

          <div className="occasions-grid">
            {OCCASIONS.map((occ) => (
              <a
                key={occ.id}
                href={occ.link}
                className="occasion-card"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, occasionType: occ.title }))
                }}
              >
                <div className="occasion-image-box">
                  <img src={occ.img} alt={occ.title} className="occasion-img" loading="lazy" />
                </div>
                <div className="occasion-content">
                  <span className="occasion-badge">
                    <span className="occasion-badge-icon">{occ.badgeIcon}</span> {occ.badge}
                  </span>
                  <h3 className="occasion-title">{occ.title}</h3>
                  <p className="occasion-desc">{occ.desc}</p>
                  <div className="occasion-tags-row">
                    {occ.tags &&
                      occ.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="occasion-tag-pill">
                          {tag}
                        </span>
                      ))}
                  </div>
                  <span className="occasion-link-arrow">Explore Collection →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 8 — YOUR BRAND, OUR CRAFT (6 DIFFERENTIATORS)
          ==================================================================== */}
      <section className="gifting-craft-section" id="craft-section">
        <div className="gifting-container">
          {/* Header with Decorative Flanking Lines */}
          <div className="craft-header-center">
            <div className="craft-title-row">
              <span className="craft-decorative-line" />
              <h2 className="craft-main-heading">Your Brand, Our Craft</h2>
              <span className="craft-decorative-line" />
            </div>
            <p className="craft-subtitle">
              High-quality products, thoughtful customization, and reliable gifting solutions — everything you need in one place.
            </p>
          </div>

          {/* 6 Equal-Width Differentiators in a Single Row */}
          <div className="craft-differentiators-row">
            {DIFFERENTIATORS.map((diff) => (
              <div key={diff.id} className="craft-diff-column">
                <div className="craft-icon-aura">
                  <img
                    src={diff.iconImg}
                    alt={diff.title}
                    className="craft-custom-icon"
                    style={{ display: 'none' }}
                    onLoad={(e) => {
                      e.currentTarget.style.display = 'block'
                      const fb = e.currentTarget.parentElement.querySelector('.craft-fallback-svg')
                      if (fb) fb.style.display = 'none'
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      const fb = e.currentTarget.parentElement.querySelector('.craft-fallback-svg')
                      if (fb) fb.style.display = 'inline-flex'
                    }}
                  />
                  <span className="craft-fallback-svg">
                    {diff.icon}
                  </span>
                </div>
                <h3 className="craft-diff-title">{diff.title}</h3>
                <p className="craft-diff-desc">{diff.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 8B — HOW DOES IT WORK? (4 PASTEL PROCESS CARDS)
          ==================================================================== */}
      <section className="gifting-how-it-works-section" id="how-it-works-section">
        <div className="gifting-container">
          <div className="how-it-works-card-container">
            {/* Header with Decorative Flanking Lines */}
            <div className="how-works-header-center">
              <div className="how-works-title-row">
                <span className="how-works-decorative-line" />
                <h2 className="how-works-heading">How Does It Work?</h2>
                <span className="how-works-decorative-line" />
              </div>
              <p className="how-works-subtitle">
                Just share your requirements — we’ll guide you through the rest.
              </p>
            </div>

            {/* 4 Process Cards */}
            <div className="how-works-cards-grid">
              {HOW_IT_WORKS_PROCESS.map((step) => (
                <div
                  key={step.num}
                  className="how-works-step-card"
                  style={{
                    backgroundColor: step.cardBg,
                    borderColor: step.borderColor,
                  }}
                >
                  <div className="step-card-top-row">
                    <div
                      className="step-icon-circle"
                      style={{ backgroundColor: step.iconBg }}
                    >
                      <img
                        src={step.iconImg}
                        alt={step.title}
                        className="step-custom-icon"
                        style={{ display: 'none' }}
                        onLoad={(e) => {
                          e.currentTarget.style.display = 'block'
                          const fb = e.currentTarget.parentElement.querySelector('.step-fallback-svg')
                          if (fb) fb.style.display = 'none'
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          const fb = e.currentTarget.parentElement.querySelector('.step-fallback-svg')
                          if (fb) fb.style.display = 'inline-flex'
                        }}
                      />
                      <span className="step-fallback-svg">
                        {step.icon}
                      </span>
                    </div>
                    <span
                      className="step-number-watermark"
                      style={{ color: step.numColor }}
                    >
                      {step.num}
                    </span>
                  </div>

                  <h3 className="step-card-title">{step.title}</h3>
                  <p className="step-card-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 9 — TRUSTED BY LEADING BRANDS
          ==================================================================== */}
      <section className="gifting-trusted-section">
        <div className="gifting-container">
          <div className="trusted-brands-strip-box">
            <h4 className="trusted-leading-eyebrow">TRUSTED BY LEADING BRANDS</h4>

            <div className="trusted-brands-row">
              {/* 1. Microsoft */}
              <div className="brand-item brand-microsoft" title="Microsoft">
                <svg width="22" height="22" viewBox="0 0 23 23" fill="none">
                  <rect x="0" y="0" width="10.5" height="10.5" fill="#F25022" />
                  <rect x="12.5" y="0" width="10.5" height="10.5" fill="#7FBA00" />
                  <rect x="0" y="12.5" width="10.5" height="10.5" fill="#00A4EF" />
                  <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900" />
                </svg>
                <span className="brand-text-microsoft">Microsoft</span>
              </div>

              {/* 2. Goldman Sachs */}
              <div className="brand-item brand-goldman" title="Goldman Sachs">
                <span className="brand-text-goldman">Goldman Sachs</span>
              </div>

              {/* 3. Amazon */}
              <div className="brand-item brand-amazon" title="Amazon">
                <span className="brand-text-amazon">amazon</span>
                <svg width="76" height="13" viewBox="0 0 76 13" fill="none" className="amazon-smile-svg">
                  <path d="M6 3 C26 12 50 11 66 4" stroke="#777777" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M62 2 L68 4 L65.5 8.5" fill="#777777" />
                </svg>
              </div>

              {/* 4. SAP */}
              <div className="brand-item brand-sap" title="SAP">
                <span className="brand-text-sap">SAP</span>
              </div>

              {/* 5. Shell */}
              <div className="brand-item brand-shell" title="Shell">
                <span className="brand-text-shell">Shell</span>
              </div>

              {/* 6. WIPRO */}
              <div className="brand-item brand-wipro" title="WIPRO">
                <span className="brand-text-wipro">WIPRO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 10 — CORPORATE INQUIRY FORM (2-COLUMN)
          ==================================================================== */}
      <section className="gifting-inquiry-section" id="corporate-inquiry">
        <div className="gifting-container">
          <div className="inquiry-split-card">
            {/* Left Maroon Panel */}
            <div className="inquiry-left-panel">
              <h2 className="inquiry-left-heading">
                Let’s Create Your Next Corporate Order
              </h2>

              <p className="inquiry-left-desc">
                Our gifting specialists respond within 4 business hours with custom hamper proposals and volume pricing.
              </p>

              <div className="inquiry-quick-contacts">
                <a
                  href="https://wa.me/919347880788?text=Hello%20Raaji's%20Crafted%20Snacks,%20I'd%20like%20to%20discuss%20a%20corporate%20gifting%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-contact-whatsapp"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.697.075-2.029-.481-1.636-.684-2.684-2.355-2.766-2.464-.082-.109-.669-.888-.669-1.691s.421-1.198.572-1.36c.15-.162.33-.203.439-.203.11 0 .219.001.315.006.101.005.237-.038.371.285.144.343.491 1.198.535 1.286.044.088.073.192.015.309-.059.117-.088.19-.176.293-.088.104-.185.232-.264.312-.088.088-.179.185-.077.36.103.175.457.755.98 1.221.674.601 1.242.787 1.417.875.176.088.278.073.382-.044.103-.118.439-.512.556-.688.118-.175.234-.147.395-.088.161.059 1.023.483 1.198.571.175.088.293.132.336.205.044.074.044.426-.1.831z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="inquiry-right-panel">
              <form onSubmit={handleFormSubmit}>
                <div className="corporate-form-grid">
                  {/* Row 1 */}
                  <div className="form-field-group">
                    <label className="form-field-label">
                      Full Name<span className="required-star">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="form-input-control"
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="form-field-label">
                      Company / Organization Name<span className="required-star">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Enter company name"
                      className="form-input-control"
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="form-field-label">
                      Work Email<span className="required-star">*</span>
                    </label>
                    <input
                      type="email"
                      name="workEmail"
                      required
                      value={formData.workEmail}
                      onChange={handleInputChange}
                      placeholder="Enter work email"
                      className="form-input-control"
                    />
                  </div>

                  {/* Row 2 */}
                  <div className="form-field-group">
                    <label className="form-field-label">
                      Phone / WhatsApp Number<span className="required-star">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      className="form-input-control"
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="form-field-label">
                      Occasion Type<span className="required-star">*</span>
                    </label>
                    <select
                      name="occasionType"
                      value={formData.occasionType}
                      onChange={handleInputChange}
                      className="form-input-control"
                    >
                      <option value="Corporate Gifting">Corporate Gifting</option>
                      <option value="Client Onboarding & Appreciation">Client Onboarding</option>
                      <option value="Employee Milestones">Employee Milestones</option>
                      <option value="Festive Gifting">Diwali / Festive Gifting</option>
                      <option value="Brand Launches & Events">Brand Launches & Events</option>
                      <option value="Wedding Hampers">Wedding Hampers</option>
                      <option value="Other">Other Occasion</option>
                    </select>
                  </div>

                  <div className="form-field-group">
                    <label className="form-field-label">
                      Estimated Quantity<span className="required-star">*</span>
                    </label>
                    <select
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="form-input-control"
                    >
                      <option value="15 – 50 Boxes">15 – 50 Boxes</option>
                      <option value="51 – 150 Boxes">51 – 150 Boxes</option>
                      <option value="151 – 500 Boxes">151 – 500 Boxes</option>
                      <option value="500+ Boxes">500+ Boxes</option>
                    </select>
                  </div>

                  {/* Final Row: Notes */}
                  <div className="form-field-group form-full-width">
                    <label className="form-field-label">Custom Notes / Snack Preferences</label>
                    <textarea
                      name="customNotes"
                      rows="3"
                      value={formData.customNotes}
                      onChange={handleInputChange}
                      placeholder="Tell us your requirements, favourite snacks (Sakinalu, Ariselu, Chekkalu, Dry Fruits) or custom branding requests..."
                      className="form-input-control form-textarea-control"
                    />
                  </div>
                </div>

                <div className="form-submit-row">
                  <button type="submit" className="btn-form-submit">
                    Request My Corporate Proposal →
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 11 — CORPORATE GIFTING FAQS (2-COLUMN ACCORDION)
          ==================================================================== */}
      <section className="gifting-faq-section">
        <div className="gifting-container">
          <div className="faq-title-divider">
            <span className="milestones-divider-line" />
            <h2 className="faq-heading">Corporate Gifting FAQs</h2>
            <span className="milestones-divider-line" />
          </div>

          <div className="faq-twocol-grid">
            {FAQS.map((faq, idx) => {
              const isExpanded = activeFaq === idx
              return (
                <div
                  key={idx}
                  className={`faq-accordion-item ${isExpanded ? 'is-expanded' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-header-btn"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isExpanded}
                  >
                    <span className="faq-question-text">{faq.q}</span>
                    <span className="faq-toggle-icon">{isExpanded ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        className="faq-answer-body"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22 }}
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 12 — FINAL CTA BANNER
          ==================================================================== */}
      <section className="gifting-final-banner-section">
        <div className="gifting-container">
          <div className="final-banner-box">
            {/* Left Hamper Image */}
            <div className="final-banner-img-wrap">
              <img
                src="/gifting/cta-hamper.jpg"
                alt="Raaji's Crafted Hampers celebration spread"
                className="final-banner-img"
                loading="lazy"
              />
            </div>

            {/* Right CTA Content */}
            <div className="final-banner-content">
              <h2 className="final-banner-title">Make Every Moment Worth Gifting.</h2>
              <p className="final-banner-desc">
                From a simple gesture of appreciation to a grand celebration, let Raaji’s help you create something memorable.
              </p>

              <div className="final-banner-actions">
                <a href="#occasions-section" className="btn-banner-maroon">
                  Explore All Hampers
                </a>
                <a href="#corporate-inquiry" className="btn-banner-outline">
                  Create Your Own Gift
                </a>
                <a href="#corporate-inquiry" className="btn-banner-outline">
                  Corporate Enquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 13 — HERITAGE FOOTER (MINIMAL CENTERED)
          ==================================================================== */}
      <footer className="gifting-footer">
        <div className="gifting-container">
          <div className="footer-centered-content">
            <Link to="/" className="footer-brand-centered" aria-label="Raaji's Home">
              <img
                src="/logo-trimmed.png"
                alt="Raaji's Crafted Snacks Logo"
                className="footer-logo-img"
                onError={(e) => { e.currentTarget.src = '/logo.png' }}
              />
            </Link>

            <p className="footer-copyright-text">
              © {new Date().getFullYear()} Raaji's Crafted Snacks. All rights reserved. Taste the Tradition.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
