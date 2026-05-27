# Brisa Oliveira e Silva — Portfolio Website

A clean, editorial-minimal portfolio website built with vanilla HTML, CSS, and JavaScript. No build tools required — works directly with Netlify.

## Deploy to Netlify via GitHub

### Step 1 — Push to GitHub

1. Create a new repository on [github.com](https://github.com/new)
2. In your terminal:

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2 — Connect to Netlify

1. Log into [netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and authorize Netlify
4. Select your repository
5. Settings (already pre-configured by `netlify.toml`):
   - **Build command:** *(leave empty)*
   - **Publish directory:** `.` (root)
6. Click **"Deploy site"**

Your site will be live in ~30 seconds at a URL like `https://your-name.netlify.app`.

### Step 3 — Custom Domain (optional)

In Netlify: **Domain settings** → **Add custom domain** → follow DNS instructions.

---

## Local Preview

Just open `index.html` directly in your browser — no server needed.

Or use a simple local server:

```bash
# Python
python3 -m http.server 3000

# Node (npx)
npx serve .
```

Then visit `http://localhost:3000`.

---

## File Structure

```
brisa-portfolio/
├── index.html          ← Main page
├── css/
│   └── style.css       ← All styles
├── js/
│   └── main.js         ← Interactions
├── netlify.toml        ← Netlify config
└── README.md
```

## Customization

- **Profile photo:** Add an `<img>` tag in the hero or about section, place your image in an `/images/` folder
- **Colors:** Edit CSS variables at the top of `style.css`
- **Content:** Edit text directly in `index.html`
- **Links:** Update `href` values for LinkedIn and email in the contact section
