# YASSÉRA - Luxury Fashion Prototype

A modern, responsive luxury fashion website prototype built with React, TypeScript, and Tailwind CSS.

## 🚀 Live Demo

- **Production:** [https://yassera.com](https://yassera.com)
- **Netlify:** [Coming Soon]

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Deployment:** Netlify
- **DNS:** Cloudflare

## 📦 Features

- ✨ Responsive design (mobile-first)
- 🎨 Luxury brand aesthetic
- 🖱️ Interactive hover effects
- 📱 Mobile hamburger menu
- 🎯 Category grid navigation
- 🖼️ Hero sections with image overlays
- 📄 Complete footer with links

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/Yassera.git
cd Yassera
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

### Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Fill in your actual values in `.env`:
   - Supabase URL and Anon Key
   - Stripe keys (when ready)

**Note:** Never commit your `.env` file to version control!

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Hero sections
│   ├── CategoryGrid.tsx    # Product categories
│   ├── FeaturedCollections.tsx # Featured content
│   └── Footer.tsx          # Footer
├── App.tsx                 # Main app component
├── main.tsx               # React entry point
└── index.css              # Global styles
```

## 🔄 Deployment

### Deploy to Netlify

This project is configured for automatic deployment to Netlify.

#### First-Time Setup

1. **Sign up/Login to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with your GitHub account

2. **Import Repository**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Select your `yassera` repository

3. **Configure Build Settings**
   - Build command: `npm run build` (auto-detected from `netlify.toml`)
   - Publish directory: `dist` (auto-detected from `netlify.toml`)
   - Branch to deploy: `main`

4. **Add Environment Variables** (in Netlify dashboard)
   - Go to Site Settings → Environment Variables
   - Add your Supabase credentials:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

5. **Set Up Custom Domain**
   - Go to Domain settings → Add custom domain
   - Enter `yassera.com`
   - Follow Netlify's DNS instructions
   - Update your Cloudflare DNS settings

#### Continuous Deployment

After initial setup, every push to `main` branch automatically deploys to Netlify.

## 🛒 Future E-commerce Integration

This prototype is designed to easily transition to a full e-commerce platform with:

- **Payment Processing:** Stripe integration planned
- **Product Management:** Dynamic product catalog
- **User Authentication:** Customer accounts
- **Shopping Cart:** Full cart functionality
- **Order Management:** Order tracking and history

## 📝 Development Notes

- All links are currently placeholder (`#`)
- Images are sourced from Pexels (placeholder)
- Supabase is configured but not actively used
- Ready for backend integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
