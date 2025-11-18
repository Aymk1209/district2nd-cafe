```markdown
# District 2nd — Bites & Brews

This repository contains a static site for District 2nd Bites & Brews.

Build & deploy
1. Install Node.js (>= 14).
2. Run:
   npm install
   npm run build
3. The build script copies the site files into `dist/`. Deploy the `dist/` directory.

Vercel setup
1. Sign in to Vercel and choose "Import Project" → "Import from Git Repository".
2. Connect your GitHub account and pick this repository.
3. Set:
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy. Vercel will automatically provision HTTPS.

Domain (Namecheap) — purchase & configuration notes
1. Purchase domain: `district2ndcafe.com` at Namecheap.
2. In Vercel Dashboard → Domains, add the domain and follow verification steps.
3. On Namecheap, set DNS:
   - Apex (root): add A record
     - Host: @
     - Value: 76.76.21.21
     - TTL: Automatic
   - www: add CNAME
     - Host: www
     - Value: cname.vercel-dns.com
     - TTL: Automatic
4. Wait for DNS propagation (can take up to 24 hours). Vercel will issue a TLS certificate automatically.

Notes & next steps
- After you push the repo, import it into Vercel with the settings above.
- Replace placeholder phone and email in the site content with your real contact details.
- If you want, I can provide a zip of these files or walk you through the Git push step-by-step.
```