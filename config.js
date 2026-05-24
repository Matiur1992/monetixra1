// ============================================================
//  Monetixra - Configuration
//  Update these values after deploying backend
// ============================================================

// Backend URL (Render deployment)
const CONFIG = {
  // 🔧 CHANGE THIS after deploying to Render:
  // Example: 'https://monetixra-backend.onrender.com'
  // Leave as '' to use same origin (for local testing)
  SERVER_URL: '',
  
  // Supabase (already configured)
  SUPABASE_URL: 'https://rgximkhnhxgaonrxzzxl.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJneGlta2huaHhnYW9ucnh6enhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NDg3MDQsImV4cCI6MjA5MTIyNDcwNH0.zgBfCTs2AEocLVwjJntg1dDBwy4quQS40QWqeuYRTwU',
  
  // Feature flags
  ENABLE_SOCKET_IO: true,
  ENABLE_WEBRTC: true,
  ENABLE_PUSH: true,
  ENABLE_AI: true
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
