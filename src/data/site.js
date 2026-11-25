// Site copy and contact details, transcribed from the reference site.

export const brand = {
  name: 'TeddyPups U.A.E.',
  short: 'TeddyPups',
  tagline: 'every puppy is family',
  about: 'TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premium services and worldwide shipping.',
}

// The reference displays a +971 number but its WhatsApp links use +91 9898124987.
// Both are reproduced exactly as found (see PROJECT_ANALYSIS.md → uncertainties).
export const contact = {
  phoneDisplay: '+971 50 000 0000',
  phoneHref: 'tel:+971500000000',
  whatsappNumber: '919898124987',
  email: 'info@instabizweb.com',
  address: 'Downtown Dubai, United Arab Emirates',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Downtown+Dubai%2C+United+Arab+Emirates',
  socials: [
    { label: 'Instagram', href: 'https://www.instabizweb.com/' },
    { label: 'TikTok', href: 'https://www.instabizweb.com/' },
    { label: 'Facebook', href: 'https://www.instabizweb.com/' },
  ],
}

export const DEFAULT_WA_TEXT = "Hi TeddyPups! I'd love to know more about your puppies."
export const waLink = (text = DEFAULT_WA_TEXT) => `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/puppies', label: 'Puppies' },
  { to: '/happy-families', label: 'Happy families' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Visit & contact' },
]

export const footerLinks = [
  { to: '/puppies', label: 'Available puppies' },
  { to: '/gone-home', label: 'Gone home' },
  { to: '/happy-families', label: 'Happy families' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/how-it-works#delivery', label: 'Delivery & collection' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Visit & contact' },
]

export const testimonial = {
  quote:
    'TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.',
  author: 'Sarah M., Dubai, UAE',
}

export const faqs = [
  { q: 'Are your puppies vaccinated and health-checked?', a: 'Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.' },
  { q: 'Can I meet a puppy before I decide?', a: 'Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.' },
  { q: 'Can I take my puppy home the same day?', a: 'Local puppies are available immediately, so you can take your puppy home the same day.' },
  { q: 'Do you import puppies from abroad?', a: 'Yes. Through our Order Upon Request service we source rare and premium teacup breeds from the most reputable, certified breeders across Europe, Korea, and beyond — and we handle the import for you.' },
  { q: 'How does an imported puppy travel to Dubai?', a: 'We manage every part of the import process, including health checks, travel arrangements, and the necessary documentation, so your puppy arrives happy, healthy, and stress-free.' },
  { q: 'Will I see photos and health details first?', a: 'Yes. Photos, videos, and health certificates are shared before your puppy travels, and our team sends real photos and health details directly on WhatsApp.' },
  { q: 'Do you deliver?', a: 'Yes. We deliver within Dubai, and our trusted international cargo partners deliver puppies safely to loving homes all around the world.' },
  { q: 'Which breeds do you usually have?', a: 'Breeds we regularly have include Maltipoo, Pomeranian, Poodle and Bichon, plus rare teacup lines such as Korean teacup poodles, Maltese, Pom and Yorkie.' },
  { q: 'Is there help after my puppy comes home?', a: 'Yes. Our team is available 24/7 and offers advice on training, nutrition, and general care to ensure a smooth transition for you and your new furry friend.' },
]

export const journeySteps = [
  { title: 'Choose your breed', body: "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle." },
  { title: 'Get photos & details', body: 'Our team will share real photos, health details, and all necessary information directly on WhatsApp.' },
  { title: 'Secure & safe delivery', body: 'Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.' },
]

export const trustPoints = [
  { stamp: 'Vet-checked & healthy', body: 'Every puppy comes vaccinated, dewormed, and with a verified health certificate.', shape: 'circle' },
  { stamp: 'Korea to Dubai, safely', body: 'Trusted breeders, safe travel, and premium care from start to finish.', shape: 'square' },
  { stamp: 'Support 24/7', body: 'Always here to help, from choosing your puppy to post-delivery support.', shape: 'oval' },
  { stamp: 'Trusted by families worldwide', body: 'Puppies delivered to loving homes all around the world.', shape: 'scallop' },
]

export const puppyPromise = ['Vaccinated', 'Dewormed', 'Verified health certificate from licensed vets', 'Thoroughly checked before joining your family']

export const importSteps = [
  { title: 'Reserve your puppy', body: 'Tell us which puppy has captured your heart.' },
  { title: 'Personalized consultation', body: "We finalize details with you and share updates on your puppy's journey." },
  { title: 'Import and arrival', body: 'We manage health checks, travel arrangements, and documentation.' },
  { title: 'Welcome home', body: 'We help your new puppy settle in and ensure a smooth transition into your home.' },
]

export const localSteps = [
  { title: 'Explore our puppies', body: 'Browse our website to view the available puppies. Each listing includes photos, breed details, age, and health information.' },
  { title: 'Choose your puppy', body: 'Once you find a puppy you love, open their profile for more information or to enquire further. You can also reach out to us directly if you have any questions.' },
  { title: 'Meet before you choose', body: 'Spend time bonding before making your decision.' },
  { title: 'Pick-up or delivery', body: 'Pick up your puppy from us or have them delivered to your home within Dubai. Our delivery service is safe and reliable, ensuring your puppy arrives comfortably.' },
]
