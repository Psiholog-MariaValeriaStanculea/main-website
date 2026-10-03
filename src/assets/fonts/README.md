# Self-hosted fonts

- `inter-latin.woff2`: Latin/Latin Extended subset of the official [Inter Variable](https://github.com/rsms/inter), including Romanian comma-below diacritics, punctuation and currency characters. See `inter-license.txt`.
- `valeria-serif.woff2`: equivalent language subset of Adobe's official [Source Serif 4](https://github.com/adobe-fonts/source-serif). The modified font is renamed **Valeria Serif** in its naming records and CSS to respect the reserved font name. Copyright, authorship and OFL records are retained; see `source-serif-license.txt`.

Both retain variable weights and optical sizing and use `font-display: swap`. These are supplied font derivatives, not generated typefaces. FontTools 4.66.1 performed subsetting; it is not a build/runtime dependency.
