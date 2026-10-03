export const siteConfig = {
 contactEmail:'psiholog.mariavaleriabaciu@gmail.com',
 contactPhone:'',contactPhoneHref:null,
 siteUrl:import.meta.env.VITE_SITE_URL?.trim() || 'https://psiholog-mariavaleriastanculea.github.io/main-website',
 businessName:'Valeria Stănculea', practitionerName:'Valeria Stănculea',
 socialLinks:[] as {href:string;label:string}[],
} as const;
