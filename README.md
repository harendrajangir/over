# Overlinks Homes website

A fully responsive static website for Overlinks Homes, with buy/sell/rent sections, featured sample listings, property filters, a contact form that opens WhatsApp, click-to-call links, and the supplied logo.

## Quick preview
Open `index.html` in a browser. For best results, run it with a local static server or deploy to Vercel.

## Publish on Vercel (easy method)
1. Extract `overlinks-homes-website.zip` on your computer.
2. Go to https://github.com/new and create a repository named `overlinks-homes-website`.
3. Upload **the contents** of the extracted folder (not the ZIP file itself) to the repository. Make sure `index.html`, `styles.css`, `script.js`, and the `assets` folder are at the repository root.
4. Go to https://vercel.com, sign in with GitHub, choose **Add New → Project**, and import your repository.
5. Framework Preset: **Other**. Build Command: leave blank. Output Directory: `.` (or leave the default if Vercel detects the static site). Install Command: leave blank.
6. Click **Deploy**. Vercel will provide your live website URL.
7. Whenever you update files in GitHub, Vercel will redeploy automatically.

## Important before going live
- Property cards use recent public portal search snapshots and link to portal results for current availability. Portal listings can change; confirm each listing before advertising it. Photos are illustrative Unsplash images and are not the actual listed properties. Civil Lines opens a local search rather than a verified individual listing.
- The enquiry form opens WhatsApp to **+91 89498 86692**. It does not store enquiries in a database.
- Verify that the phone number is connected to WhatsApp. If not, users can still call the number using the contact links.
- Update page title/description, contact details, and any required legal/privacy information for your business.
- The logo file is in `assets/overlinks-homes-logo.jpeg`.


## Vercel 404 troubleshooting
This package includes `vercel.json`, which explicitly maps the site root (`/`) to `index.html`.
In Vercel Project Settings, use the repository root as Root Directory. For this plain static site, use Framework Preset `Other`, leave Build Command and Install Command blank, and leave Output Directory blank/default. Then redeploy the correct GitHub repository and production branch.
