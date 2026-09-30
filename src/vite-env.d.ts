/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_CONTACT_EMAIL?: string;
	readonly VITE_EMAILJS_PUBLIC_KEY?: string;
	readonly VITE_EMAILJS_SERVICE_ID?: string;
	readonly VITE_EMAILJS_TEMPLATE_ID?: string;
	readonly VITE_GITHUB_PAGES?: string;
	readonly VITE_BASE_PATH?: string;
	readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
