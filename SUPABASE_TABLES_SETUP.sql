-- ════════════════════════════════════════════════════════════
-- MONETIXRA — SUPABASE DATABASE SCHEMA SETUP
-- For: Messages, Calls, SMS Data Storage (Permanent)
-- ════════════════════════════════════════════════════════════

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ════════════════════════════════════════════════════════════
-- 1. MESSAGES TABLE (Text Messages)
-- ════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL,
  recipient_id UUID NOT NULL,
  message_type VARCHAR(50) DEFAULT 'text',
  content TEXT NOT NULL,
  is_permanent BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_recipient ON messages(recipient_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);

-- ════════════════════════════════════════════════════════════
-- 2. CALL LOGS TABLE (Voice/Video Calls)
-- ════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS call_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  caller_id UUID NOT NULL,
  recipient_id UUID NOT NULL,
  call_type VARCHAR(50) NOT NULL DEFAULT 'voice',
  duration_seconds INTEGER DEFAULT 0,
  recording_url TEXT,
  status VARCHAR(50) DEFAULT 'completed',
  is_permanent BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_call_logs_caller ON call_logs(caller_id);
CREATE INDEX idx_call_logs_recipient ON call_logs(recipient_id);
CREATE INDEX idx_call_logs_created_at ON call_logs(created_at DESC);

-- ════════════════════════════════════════════════════════════
-- 3. SMS LOGS TABLE (SMS Records)
-- ════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS sms_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  direction VARCHAR(20) DEFAULT 'sent',
  status VARCHAR(50) DEFAULT 'delivered',
  is_permanent BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_sms_logs_user ON sms_logs(user_id);
CREATE INDEX idx_sms_logs_phone ON sms_logs(phone_number);
CREATE INDEX idx_sms_logs_created_at ON sms_logs(created_at DESC);

-- ════════════════════════════════════════════════════════════
-- 4. MEDIA METADATA TABLE
-- ════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS media_metadata (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  media_id VARCHAR(100) NOT NULL UNIQUE,
  user_id UUID NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  media_type VARCHAR(50) NOT NULL,
  file_size INTEGER,
  related_post_id VARCHAR(100),
  is_permanent BOOLEAN DEFAULT TRUE,
  cannot_delete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_media_user ON media_metadata(user_id);
CREATE INDEX idx_media_type ON media_metadata(media_type);

-- ════════════════════════════════════════════════════════════
-- FUNCTIONS & VIEWS
-- ════════════════════════════════════════════════════════════

-- Get storage statistics
CREATE OR REPLACE FUNCTION get_storage_stats(user_uuid UUID)
RETURNS TABLE (
  total_files BIGINT,
  total_size_bytes BIGINT,
  photo_count BIGINT,
  video_count BIGINT,
  audio_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*),
    COALESCE(SUM(file_size), 0),
    COUNT(*) FILTER (WHERE media_type = 'photo'),
    COUNT(*) FILTER (WHERE media_type = 'video'),
    COUNT(*) FILTER (WHERE media_type = 'audio')
  FROM media_metadata
  WHERE user_id = user_uuid AND is_permanent = TRUE;
END;
$$ LANGUAGE plpgsql;

-- ════════════════════════════════════════════════════════════
-- SETUP INSTRUCTIONS
-- ════════════════════════════════════════════════════════════

/*

SETUP GUIDE:

1. Go to Supabase Dashboard: https://app.supabase.com
2. Select your project
3. Go to "SQL Editor" → "New Query"
4. Copy this entire SQL script
5. Click "Run"
6. Verify all tables are created successfully

TABLES CREATED:
✅ messages - Text/voice/video messages (PERMANENT)
✅ call_logs - Call records (PERMANENT)
✅ sms_logs - SMS records (PERMANENT)
✅ media_metadata - Media file tracking (PERMANENT)

KEY FEATURES:
- All data has is_permanent = TRUE
- IndexedDB integration for Mega storage
- Real-time synchronization support
- Built-in audit trail capabilities
- Row-level security ready (add policies as needed)

NEXT STEPS:
1. Configure auth providers in Supabase
2. Enable Realtime for these tables
3. Set up automatic backups
4. Test with sample data
5. Configure environment variables in your app

*/
