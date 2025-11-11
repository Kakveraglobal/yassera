-- YASSÉRA Database Schema for Supabase
-- Run this in your Supabase SQL Editor
-- Project: YASSÉRA E-commerce Platform

-- ============================================
-- 1. PROFILES TABLE
-- ============================================
-- Extends the built-in auth.users table
-- Stores additional user information

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add comment
COMMENT ON TABLE public.profiles IS 'User profiles with additional information beyond auth.users';

-- ============================================
-- 2. PRODUCTS TABLE
-- ============================================
-- Stores all product information

CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  category TEXT NOT NULL,
  image_url TEXT,
  stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON public.products(is_active);

-- Add comment
COMMENT ON TABLE public.products IS 'Product catalog with pricing and inventory';

-- ============================================
-- 3. ORDERS TABLE
-- ============================================
-- Stores customer orders

CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
  shipping_address JSONB NOT NULL,
  tracking_number TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- Add comment
COMMENT ON TABLE public.orders IS 'Customer orders with status tracking';

-- ============================================
-- 4. ORDER ITEMS TABLE
-- ============================================
-- Stores individual items within each order

CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price_at_purchase DECIMAL(10,2) NOT NULL CHECK (price_at_purchase >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON public.order_items(product_id);

-- Add comment
COMMENT ON TABLE public.order_items IS 'Line items for each order with price snapshot';

-- ============================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Users can insert their own profile (for signup)
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- PRODUCTS POLICIES
-- Anyone can view active products
CREATE POLICY "Anyone can view active products"
  ON public.products
  FOR SELECT
  USING (is_active = true OR auth.role() = 'authenticated');

-- ORDERS POLICIES
-- Users can view their own orders
CREATE POLICY "Users can view own orders"
  ON public.orders
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own orders
CREATE POLICY "Users can create own orders"
  ON public.orders
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own pending orders (for cancellation)
CREATE POLICY "Users can update own pending orders"
  ON public.orders
  FOR UPDATE
  USING (auth.uid() = user_id AND status = 'pending');

-- ORDER ITEMS POLICIES
-- Users can view items from their own orders
CREATE POLICY "Users can view own order items"
  ON public.order_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Users can insert items into their own orders
CREATE POLICY "Users can insert own order items"
  ON public.order_items
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- ============================================
-- 6. FUNCTIONS AND TRIGGERS
-- ============================================

-- Automatically create a profile when a new user registers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  )
  ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        full_name = EXCLUDED.full_name,
        updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 7. SAMPLE DATA (Optional - for testing)
-- ============================================

-- Insert some sample products
INSERT INTO public.products (name, description, price, category, image_url, stock_quantity) VALUES
('Silk Evening Gown', 'Elegant silk evening gown with hand-embroidered details', 2499.00, 'Women', 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', 15),
('Leather Handbag', 'Premium Italian leather handbag with gold hardware', 1299.00, 'Leather Goods', 'https://images.pexels.com/photos/3905821/pexels-photo-3905821.jpeg', 25),
('Diamond Watch', 'Swiss-made luxury watch with diamond accents', 8999.00, 'Watches', 'https://images.pexels.com/photos/47856/rolex-wrist-watch-clock-gmt-47856.jpeg', 5),
('Cashmere Scarf', 'Pure cashmere scarf in various colors', 399.00, 'Accessories', 'https://images.pexels.com/photos/7679454/pexels-photo-7679454.jpeg', 50),
('Designer Sunglasses', 'Italian designer sunglasses with UV protection', 499.00, 'Accessories', 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg', 30),
('Leather Belt', 'Handcrafted leather belt with silver buckle', 259.00, 'Accessories', 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg', 40)
ON CONFLICT DO NOTHING;

-- ============================================
-- 8. VERIFICATION QUERIES
-- ============================================
-- Run these to verify your setup

-- Check if tables were created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('profiles', 'products', 'orders', 'order_items');

-- Check RLS policies
SELECT tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';

-- Count sample products
SELECT COUNT(*) as product_count FROM public.products;

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- Next steps:
-- 1. Add your Supabase URL and anon key to your .env file
-- 2. Add the same to Netlify environment variables
-- 3. Deploy your app
-- 4. Test signup and login functionality

