const FALLBACK_CONTACT_EMAIL = "psiholog.mariavaleriabaciu@gmail.com";
const FALLBACK_SITE_URL = "https://valeria-stanculea-web.lovable.app";

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim() || FALLBACK_CONTACT_EMAIL;
const contactPhone = import.meta.env.VITE_CONTACT_PHONE?.trim() || "";
const siteUrl = import.meta.env.VITE_SITE_URL?.trim() || FALLBACK_SITE_URL;

export const siteConfig = {
  contactEmail,
  contactPhone,
  contactPhoneHref: contactPhone ? `tel:${contactPhone.replace(/[^\d+]/g, "")}` : null,
  siteUrl,
  businessName: "Cabinet Individual de Psihologie Valeria Stănculea",
  practitionerName: "Valeria Maria Stănculea",
  practiceAddress: "Strada Cercului, nr.2, Sector 2, București",
  practiceLocality: "București",
  practiceRegion: "Sector 2",
  practiceCountry: "RO",
  openingHours: "Mo-Fr 09:00-19:00, Sa 09:00-15:00",
  priceRange: "180-250 RON",
  socialLinks: [
    { href: import.meta.env.VITE_LINKEDIN_URL, label: "LinkedIn" },
    { href: import.meta.env.VITE_FACEBOOK_URL, label: "Facebook" },
    { href: import.meta.env.VITE_INSTAGRAM_URL, label: "Instagram" },
    { href: contactPhone ? `https://wa.me/${contactPhone.replace(/\D/g, "")}` : undefined, label: "WhatsApp" },
  ].filter((link): link is { href: string; label: string } => Boolean(link.href?.trim())),
} as const;
