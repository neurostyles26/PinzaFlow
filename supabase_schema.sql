-- SQL Schema for PinzaFlow (Supabase)
-- Versión: 1.1 (Actualizado con Soporte de Planes, Automatizaciones y Base de Conocimientos)

-- 1. Profiles (extending auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  company_name TEXT,
  subscription_plan TEXT DEFAULT 'Emprendedor',
  whatsapp_phone_number_id TEXT,
  whatsapp_access_token TEXT,
  whatsapp_verify_token TEXT,
  whatsapp_business_account_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Clients
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  tags JSONB DEFAULT '[]',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Conversations
CREATE TABLE IF NOT EXISTS conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES clients ON DELETE CASCADE NOT NULL,
  last_message TEXT,
  unread_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active', -- active, archived, etc.
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES conversations ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  sender TEXT CHECK (sender IN ('user', 'client')) NOT NULL,
  content TEXT NOT NULL,
  type TEXT DEFAULT 'text', -- text, image, audio, etc.
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Automations (NUEVA)
CREATE TABLE IF NOT EXISTS automations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL, -- welcome, away, follow_up, lead_qualify, etc.
  is_active BOOLEAN DEFAULT false,
  trigger_conditions JSONB DEFAULT '{}',
  custom_message TEXT,
  triggered_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Knowledge Base (NUEVA - Para entrenamiento de IA)
CREATE TABLE IF NOT EXISTS knowledge_base (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('info', 'success', 'warning', 'error')) DEFAULT 'info',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ════════════════════════════════════════════════════════════════
-- SEGURIDAD (RLS - Row Level Security)
-- ════════════════════════════════════════════════════════════════

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE ACCESO (Solo el dueño de los datos puede verlos/editarlos)

-- Profiles
DO $$ BEGIN
  CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
  CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
EXCEPTION WHEN others THEN NULL; END $$;

-- Clients
DO $$ BEGIN
  CREATE POLICY "Users can manage their own clients" ON clients FOR ALL USING (auth.uid() = user_id);
EXCEPTION WHEN others THEN NULL; END $$;

-- Conversations
DO $$ BEGIN
  CREATE POLICY "Users can manage their own conversations" ON conversations FOR ALL USING (auth.uid() = user_id);
EXCEPTION WHEN others THEN NULL; END $$;

-- Messages
DO $$ BEGIN
  CREATE POLICY "Users can manage their own messages" ON messages FOR ALL USING (auth.uid() = user_id);
EXCEPTION WHEN others THEN NULL; END $$;

-- Automations
DO $$ BEGIN
  CREATE POLICY "Users can manage their own automations" ON automations FOR ALL USING (auth.uid() = user_id);
EXCEPTION WHEN others THEN NULL; END $$;

-- Knowledge Base
DO $$ BEGIN
  CREATE POLICY "Users can manage their own knowledge" ON knowledge_base FOR ALL USING (auth.uid() = user_id);
EXCEPTION WHEN others THEN NULL; END $$;

-- Notifications
DO $$ BEGIN
  CREATE POLICY "Users can manage their own notifications" ON notifications FOR ALL USING (auth.uid() = user_id);
EXCEPTION WHEN others THEN NULL; END $$;

-- ════════════════════════════════════════════════════════════════
-- FUNCIONES Y TRIGGERS
-- ════════════════════════════════════════════════════════════════

-- Función para crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, subscription_plan)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', 'Emprendedor');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para ejecutar la función anterior
DO $$ BEGIN
  CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
EXCEPTION WHEN others THEN NULL; END $$;

-- ════════════════════════════════════════════════════════════════
-- ÍNDICES PARA RENDIMIENTO
-- ════════════════════════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_automations_user_id ON automations(user_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_user_id ON knowledge_base(user_id);
