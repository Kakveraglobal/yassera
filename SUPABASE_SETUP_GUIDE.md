# 🗄️ Supabase Setup Guide for YASSÉRA

Complete guide to set up your Supabase database for user authentication and order management.

---

## Part 1: Create Supabase Project

### Step 1: Sign Up for Supabase

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign in"**
3. Choose **"Continue with GitHub"** (recommended)
4. Authorize Supabase to access your GitHub

### Step 2: Create New Project

1. Click **"New project"**
2. Fill in project details:
   - **Organization**: Select or create new
   - **Project name**: `yassera` (or `yassera-production`)
   - **Database password**: Create a STRONG password and **SAVE IT**
   - **Region**: Choose closest to your users:
     - `US East (North Virginia)` - for USA
     - `Europe West (Ireland)` - for Europe
     - `Southeast Asia (Singapore)` - for Asia
   - **Pricing plan**: Free (generous limits for starting)
3. Click **"Create new project"**
4. Wait 2-3 minutes for provisioning

---

## Part 2: Set Up Database Schema

### Step 3: Open SQL Editor

1. In your Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**

### Step 4: Run the Schema SQL

1. Open the file `supabase-schema.sql` from your project
2. Copy ALL the SQL code (entire file)
3. Paste it into the Supabase SQL Editor
4. Click **"Run"** (or press Ctrl+Enter / Cmd+Enter)
5. Wait for success message: "Success. No rows returned"

### What This Creates:

✅ **profiles** - User information (linked to auth.users)  
✅ **products** - Product catalog  
✅ **orders** - Customer orders  
✅ **order_items** - Items within each order  
✅ **RLS Policies** - Security rules  
✅ **Sample Products** - 6 test products  

---

## Part 3: Get API Credentials

### Step 5: Copy Your API Keys

1. In Supabase dashboard, click **"Settings"** (gear icon in sidebar)
2. Click **"API"** under "Project Settings"
3. You'll see two important values:

**Project URL:**
```
https://xxxxxxxxxxxxx.supabase.co
```

**anon/public key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOi...
```

4. **Copy both** - you'll need them next!

---

## Part 4: Add Environment Variables Locally

### Step 6: Create .env File

1. In your project root, create a file called `.env` (if it doesn't exist)
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Replace `your-project-id` and the key with your actual values
4. Save the file

### Step 7: Test Locally

1. Restart your dev server:
```bash
npm run dev
```

2. Open [http://localhost:5173](http://localhost:5173)
3. Click the **User icon** in the header
4. Try to **create an account**:
   - Enter your email
   - Enter a password (min 6 characters)
   - Enter your full name
5. Check your email for confirmation (Supabase sends one)
6. Click the **User icon** again and try to **sign in**

---

## Part 5: Add Environment Variables to Netlify

### Step 8: Configure Netlify

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Click on your **incandescent-salmiakki-0ecf28** site
3. Go to **"Site settings"**
4. Click **"Environment variables"** in the left sidebar
5. Click **"Add a variable"** → **"Add a single variable"**

**Add Variable 1:**
- Key: `VITE_SUPABASE_URL`
- Value: `https://your-project-id.supabase.co`
- Scopes: ✅ All (production, deploy previews, branch deploys)
- Click **"Create variable"**

**Add Variable 2:**
- Key: `VITE_SUPABASE_ANON_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (your anon key)
- Scopes: ✅ All
- Click **"Create variable"**

### Step 9: Redeploy Site

1. Go to **"Deploys"** tab
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**
3. Wait 2-3 minutes for deployment
4. Visit your site: [https://yassera.com](https://yassera.com) (or Netlify URL)
5. Test signup and login!

---

## Part 6: Configure Email Confirmation (Important!)

### Step 10: Set Up Redirect URLs in Supabase

Your site now has an email confirmation handler! You need to tell Supabase where to redirect users after they confirm their email.

1. **Go to Supabase Dashboard** → **"Authentication"** (left sidebar)
2. Click **"URL Configuration"** (under "Configuration")
3. **Set Site URL:**
   - Enter: `https://yassera.com` (or your Netlify URL if not using custom domain)
4. **Add Redirect URLs:**
   - Click **"Add URL"** and add each of these (one per line):
     ```
     https://yassera.com
     https://www.yassera.com
     https://incandescent-salmiakki-0ecf28.netlify.app
     http://localhost:5173
     ```
   - These allow Supabase to redirect back to your site after email confirmation
5. **Click "Save"** at the bottom

### How Email Confirmation Works:

1. User signs up → Supabase sends confirmation email
2. User clicks link in email → Supabase redirects to your site with tokens
3. Your site's `AuthCallback` component receives tokens → Confirms account
4. User sees success message → Can now log in!

### Optional: Disable Email Confirmation (For Testing)

If you want to test without email confirmation:

1. Supabase Dashboard → **"Authentication"** → **"Providers"**
2. Click **"Email"**
3. Toggle **"Confirm email"** to **OFF**
4. Click **"Save"**

Users can sign in immediately after signup. Re-enable for production!

---

## Part 7: Verify Everything Works

### Test Checklist

✅ **Signup Flow:**
1. Click User icon → "Create Account"
2. Fill in details and submit
3. Check for success message
4. Check your email for confirmation link
5. Click the confirmation link → Should see "Email Confirmed!" page
6. Should automatically redirect to home page

✅ **Login Flow:**
1. Click User icon → "Sign In"
2. Enter your credentials
3. Should see your name/email in header
4. Click User icon → dropdown should show your info

✅ **Logout:**
1. Click User icon → "Sign Out"
2. Should return to login state

✅ **Database Check:**
1. Go to Supabase dashboard
2. Click **"Table Editor"** → **"profiles"**
3. You should see your user profile!
4. Click **"products"** → Should see 6 sample products

---

## Part 8: View Your Data in Supabase

### Explore Your Database

**View Users/Profiles:**
1. Supabase Dashboard → **"Authentication"** → **"Users"**
2. See all registered users

**View Orders (when you create them):**
1. Supabase Dashboard → **"Table Editor"** → **"orders"**
2. See all customer orders

**View Products:**
1. Supabase Dashboard → **"Table Editor"** → **"products"**
2. Add/edit/delete products manually (for now)

---

## Troubleshooting

### Issue: "Missing Supabase environment variables"

**Solution:**
- Make sure `.env` file exists in project root
- Check that variable names start with `VITE_`
- Restart dev server: `npm run dev`

### Issue: "Failed to sign up"

**Solution:**
- Check Supabase dashboard → **"Authentication"** → **"Providers"**
- Ensure "Email" provider is enabled
- Check "Email Auth" settings:
  - Enable confirmations (default)
  - Enable signups (default)

### Issue: Can't see users in database

**Solution:**
- Go to Supabase → **"Authentication"** → **"Users"**
- Check if user was created in auth.users
- If yes but not in profiles table:
  - Check SQL Editor for errors
  - Re-run the profile insert policy from schema

### Issue: Products not showing

**Solution:**
- Supabase → **"Table Editor"** → **"products"**
- Check if products exist
- If not, re-run the sample data section from schema SQL
- Check `is_active` column is `true`

### Issue: "Row Level Security" errors

**Solution:**
- RLS is working correctly - it means policies are active
- Check that you're logged in
- Verify policies in schema were created:
  - Supabase → **"Authentication"** → **"Policies"**

---

## What's Next?

After Supabase is working:

1. ✅ Users can create accounts
2. ✅ Users can login/logout
3. ✅ Products are in database
4. 🔄 **Next:** Implement product listing from database
5. 🔄 **Next:** Create shopping cart
6. 🔄 **Next:** Implement checkout and order creation
7. 🔄 **Next:** Add Stripe payment processing

---

## Important Security Notes

### Safe to Commit:
- ✅ `.env.example` (template with fake values)
- ✅ `VITE_SUPABASE_URL` (public URL)
- ✅ `VITE_SUPABASE_ANON_KEY` (designed to be public)

### NEVER Commit:
- ❌ `.env` file (actual credentials)
- ❌ Service role key (secret, not anon key)
- ❌ Database password

### Why Anon Key is Safe:
- The `anon` key is meant to be public
- Row Level Security (RLS) protects your data
- Users can only access their own data
- Products are read-only for customers

---

## Quick Reference

**Supabase Dashboard:** [https://app.supabase.com](https://app.supabase.com)  
**Your Project:** `https://app.supabase.com/project/your-project-id`  
**SQL Editor:** Dashboard → SQL Editor  
**Table Editor:** Dashboard → Table Editor  
**Authentication:** Dashboard → Authentication → Users  

---

**Setup Complete! 🎉**

Your YASSÉRA website now has:
- ✅ User authentication  
- ✅ Database for products and orders  
- ✅ Secure API integration  
- ✅ Ready for e-commerce features  

Test it out and let me know if you have any questions!

