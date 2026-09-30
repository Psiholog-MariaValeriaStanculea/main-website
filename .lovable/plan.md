# Project Bug & Issue Fix Plan

A full audit surfaced 4 Critical, 4 High, and several Medium/Low issues. Below is the prioritized fix plan, scoped to what is safe to apply without changing product direction. Once you switch to **Build mode**, I'll implement all of it in one pass.

---

## 🔴 Critical — Routing & Links (cause real 404s today)

### C1+C2+C4 — Missing `/blog` redirects and bare-link 404s
- **File:** `src/App.tsx`
  - Add a `BlogPostRedirect` helper + two routes:
    ```tsx
    <Route path="/blog" element={<Navigate to={`/${defaultLanguage}/blog`} replace />} />
    <Route path="/blog/:id" element={<BlogPostRedirect />} />
    ```
- **File:** `src/pages/Blog.tsx`
  - Read `const { lang } = useParams();` and prefix every `<Link to=...>`:
    `/${lang}/blog/${id}`, `/${lang}/contact`.
- **File:** `src/pages/BlogPost.tsx`
  - Same: prefix `/blog`, `/despre`, `/contact` with `/${lang}/...`.

### C3 — Footer points at non-existent `/despre-mine`
- **File:** `src/components/Footer.tsx`
  - Convert every `<a href>` to `<Link to>` with the language prefix taken from `useParams`. Replace `/despre-mine` with `/despre`. Also fixes "full-page reload on every footer click".

---

## 🟠 High — Functionality & SEO

### H2 — BlogPost.tsx ignores the `:id` param (every URL shows post #1)
- **File:** `src/pages/BlogPost.tsx`
  - Extract the static `posts` array (move the play-therapy entry + at minimum stubs for ids 2–6 matching `Blog.tsx`) to a shared `src/data/blogPosts.ts`.
  - In `BlogPost.tsx`: `const post = posts.find(p => p.id === id);` → render a "not found" fallback when missing.
  - `Blog.tsx` will import from the same module so the two stay in sync.

### H4 — `SEOHead` hreflang URLs double the language segment
- **File:** `src/components/SEOHead.tsx`
  - Strip the leading `/{lang}` from `location.pathname` before building hreflang and canonical alternates:
    ```ts
    const pathWithoutLang = location.pathname.replace(/^\/(ro|en|es|it)(?=\/|$)/, '') || '/';
    ```
  - Use `pathWithoutLang` in the four `<link rel="alternate">` tags and the `x-default`.

### H3 (partial) — Add SEOHead to the pages currently missing it
- **Files:** `src/pages/Services.tsx`, `src/pages/Contact.tsx`, `src/pages/Blog.tsx`, `src/pages/BlogPost.tsx`
  - Render `<SEOHead title=... description=... />` at the top of each page.
  - For `FAQ.tsx`, replace the bare `<Helmet>` with `<SEOHead>` for consistency.

### H1 / L3 — Dead `useTranslation('blog')` in `Blog.tsx`
- **File:** `src/pages/Blog.tsx`
  - Remove the unused `useTranslation` import and `const { t } = useTranslation('blog')` (no `blog.json` exists; deferring full translation until content is finalized).

---

## 🟡 Medium — Polish

### M3 — Mobile menu button missing a11y attributes
- **File:** `src/components/Navigation.tsx`
  - Add `aria-label`, `aria-expanded={isOpen}`, `aria-controls="mobile-menu"` to the hamburger `<button>`, and `id="mobile-menu"` to the mobile panel.

### M4 — Featured post hidden during search/filter
- **File:** `src/pages/Blog.tsx`
  - When `searchTerm` or `selectedCategory` is active, include the featured post in `filteredPosts` (drop the `!post.featured` exclusion in that case).

### M5 — Hardcoded `ro-RO` date locale
- **File:** `src/pages/Blog.tsx`
  - Map current `lang` → BCP-47 (`ro`→`ro-RO`, `en`→`en-GB`, `es`→`es-ES`, `it`→`it-IT`) and pass it to `toLocaleDateString`.

### M7 — Email mismatch in structured data
- **File:** `src/components/SEOHead.tsx`
  - Change `psiholog.baciumariavaleria@gmail.com` to `psiholog.mariavaleriabaciu@gmail.com` to match the Footer (please confirm which is correct; I'll align both to whichever you say).

---

## 🔵 Deliberately deferred (separate request)

These need design/content decisions, not just code fixes:

- **M1** Footer full i18n (needs new translation keys + your sign-off on copy).
- **M2** CookieBanner "Obligatorii / Opțional / Preferințele salvate" → i18n keys.
- **M6** `BlogPost` `dangerouslySetInnerHTML` sanitization — not exploitable today (content is a static string), but worth adding DOMPurify when blog content becomes dynamic.
- **M8** "Multilingual Support" card on the home page — still accurate while site offers 4 languages; flag only if you want to drop EN/ES/IT services.
- **L1** Real social/WhatsApp URLs — need the actual links from you.
- **L2** Localized logo `alt`.
- **L4 / L5** BlogPost SEO + cookie close button `aria-label` (cheap, will fold into H3/M3 batch if you want).

---

## Validation after build

1. Visit `/blog`, `/blog/2`, `/despre-mine` → all should route correctly (or land on `/ro/...`).
2. Click every Footer link → no full-page reloads, no 404.
3. View page source on `/ro/despre` → hreflang URLs should be `/en/despre`, `/it/despre`, etc. — **not** `/en/ro/despre`.
4. Navigate to `/ro/blog/3` → shows post #3 content, not post #1.
5. Run Lighthouse a11y on mobile → hamburger button should now expose `aria-expanded`.

---

**Switch to Build mode and reply "go" (or "implement") and I'll apply every fix in the Critical / High / Medium sections above in a single batch.**
