# Netlify Deployment Guide for YASSÉRA

## 📋 Overview

This guide walks you through deploying YASSÉRA to Netlify, which provides:
- ✅ Environment variables support (for Supabase & Stripe)
- ✅ Automatic deployments on git push
- ✅ Free SSL certificates
- ✅ CDN distribution
- ✅ Preview deployments for PRs
- ✅ Easy rollbacks

---

## 🚀 Step-by-Step Deployment

### Step 1: Commit and Push Your Changes

First, ensure all the new configuration files are committed:

```bash
git status
git add .
git commit -m "Configure project for Netlify deployment"
git push origin main
```

### Step 2: Sign Up / Log In to Netlify

1. Go to [https://netlify.com](https://netlify.com)
2. Click **"Sign up"** or **"Log in"**
3. Choose **"Continue with GitHub"** (recommended)
4. Authorize Netlify to access your GitHub account

### Step 3: Import Your Repository

1. On Netlify dashboard, click **"Add new site"**
2. Select **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Search for and select your `yassera` repository
   - If you don't see it, click "Configure Netlify on GitHub" to grant access

### Step 4: Configure Build Settings

Netlify should auto-detect settings from `netlify.toml`:

- **Branch to deploy:** `main`
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Build settings:** Detected from netlify.toml ✅

Just verify these are correct and click **"Deploy site"**

### Step 5: Wait for Initial Deployment

- First build takes 2-3 minutes
- Watch the deploy log for any errors
- Once complete, Netlify assigns a random URL like: `random-name-12345.netlify.app`

### Step 6: Test Your Deployment

1. Click on the generated URL
2. Test that your site loads correctly
3. Check responsive design on mobile
4. Verify all pages and navigation work

---

## 🌐 Setting Up Custom Domain (yassera.com)

### Option A: Transfer DNS to Netlify (Recommended)

**Pros:** Easiest setup, automatic SSL, best performance
**Cons:** Need to move away from Cloudflare

1. In Netlify dashboard, go to **"Domain settings"**
2. Click **"Add custom domain"**
3. Enter `yassera.com`
4. Netlify will provide nameserver addresses
5. Update nameservers at your domain registrar:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```
6. Wait 24-48 hours for DNS propagation
7. Netlify automatically provisions SSL certificate

### Option B: Keep Cloudflare DNS

**Pros:** Keep existing Cloudflare features (analytics, firewall, etc.)
**Cons:** Slightly more complex setup

1. In Netlify, add custom domain `yassera.com`
2. Netlify will show you need to add DNS records
3. Log in to Cloudflare
4. Go to your domain's DNS settings
5. **Delete old GitHub Pages records:**
   - Remove the A records pointing to GitHub
   - Remove the CNAME for `www`
6. **Add Netlify records:**
   - Add `A` record for `@` pointing to Netlify's load balancer IP (shown in Netlify)
   - Add `CNAME` record for `www` pointing to your Netlify subdomain
7. In Cloudflare, set SSL/TLS mode to **"Full"** (not "Full (strict)")
8. Wait 5-10 minutes for DNS propagation

---

## 🔐 Environment Variables (For Future Supabase Setup)

When you're ready to add Supabase:

1. In Netlify dashboard, go to **"Site settings"**
2. Click **"Environment variables"** in left sidebar
3. Click **"Add a variable"**
4. Add each variable:

| Key | Value (from Supabase) |
|-----|----------------------|
| `VITE_SUPABASE_URL` | `https://xxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJxxx...` |

5. Click **"Save"**
6. Trigger a new deploy:
   - Go to **"Deploys"**
   - Click **"Trigger deploy"** → **"Clear cache and deploy site"**

---

## 🔄 Continuous Deployment

After initial setup, deployment is automatic:

1. Make changes locally
2. Commit changes: `git commit -m "Your changes"`
3. Push to GitHub: `git push origin main`
4. Netlify automatically detects the push and deploys
5. Check deploy progress in Netlify dashboard
6. Changes go live in 2-3 minutes

---

## 📊 Netlify Dashboard Overview

### Key Sections

**Deploys**
- View build logs
- See deploy history
- Rollback to previous versions
- Trigger manual deploys

**Site Settings**
- Environment variables
- Build settings
- Deploy contexts (production, preview, branch deploys)

**Domain Settings**
- Custom domain configuration
- SSL certificates
- Branch subdomains
- Domain aliases

**Forms** (Future use)
- Handle contact forms without backend code

**Functions** (Future use)
- Serverless functions for backend logic

---

## 🐛 Troubleshooting

### Build Fails

**Error:** `Module not found` or dependency errors

**Solution:**
```bash
# Locally
rm -rf node_modules package-lock.json
npm install
npm run build

# Then commit and push
git add package-lock.json
git commit -m "Update dependencies"
git push
```

### Site Shows 404

**Problem:** Routes don't work (e.g., `/about` shows 404)

**Solution:** Already fixed in `netlify.toml` with redirect rule:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Environment Variables Not Working

**Problem:** Supabase connection fails

**Solution:**
1. Check variables are in Netlify dashboard
2. Ensure they start with `VITE_` prefix
3. Trigger a new deploy after adding variables
4. Check browser console for the actual error

### Custom Domain Not Working

**Problem:** Domain shows "Site not found"

**Solution:**
1. Verify DNS records in Cloudflare/your DNS provider
2. Use [DNS Checker](https://dnschecker.org) to verify propagation
3. Wait up to 48 hours for full propagation
4. Check Netlify shows domain as "Active"

---

## 🎯 Next Steps After Deployment

Once your site is live on Netlify:

1. ✅ Test the live site thoroughly
2. ✅ Set up Supabase project
3. ✅ Add environment variables to Netlify
4. ✅ Implement user authentication
5. ✅ Add product database
6. ✅ Integrate Stripe for payments

---

## 📞 Support Resources

- **Netlify Docs:** https://docs.netlify.com
- **Netlify Community:** https://answers.netlify.com
- **Status Page:** https://www.netlifystatus.com

---

## 🗑️ Optional: Clean Up GitHub Pages

After confirming Netlify works:

1. Delete `.github/workflows/deploy.yml`
2. Remove `public/CNAME` file
3. In GitHub repo settings, disable GitHub Pages
4. Commit and push changes

```bash
rm .github/workflows/deploy.yml
rm public/CNAME
git add .
git commit -m "Remove GitHub Pages deployment"
git push
```

---

**Your site is now ready for Netlify! 🎉**

