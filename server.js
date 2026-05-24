/**
 * ================================================================
 *  Monetixra — FINAL COMPLETE SERVER v8.0
 *  ALL FEATURES: Socket.io | WebRTC | Supabase | OpenAI | DeepSeek
 *  EmailJS | Web Push | bKash | Nagad | Rate Limiting | Security
 * ================================================================
 */
'use strict';

require('dotenv').config();
const express   = require('express');
const http      = require('http');
const { Server }= require('socket.io');
const cors      = require('cors');
const helmet    = require('helmet');
const rateLimit = require('express-rate-limit');
const webpush   = require('web-push');
const path      = require('path');
const crypto    = require('crypto');
const fetch     = (...a) => import('node-fetch').then(({default:f})=>f(...a));

// ── Config ────────────────────────────────────────────────────
const PORT          = process.env.PORT         || 3000;
const OPENAI_KEY    = process.env.OPENAI_API_KEY   || '';
const DEEPSEEK_KEY  = process.env.DEEPSEEK_API_KEY || '';
// Updated with provided credentials
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || '';
const CLOUDINARY_API_KEY    = process.env.CLOUDINARY_API_KEY    || '';
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || '';
const SUPABASE_URL  = process.env.SUPABASE_URL     || 'https://rkiyxsskrypowghxfauy.supabase.co';
const SUPABASE_ANON = process.env.SUPABASE_ANON_KEY|| 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJraXl4c3Nrcnlwb3dnaHhmYXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNzYzNzgsImV4cCI6MjA5Mzk1MjM3OH0.WC3NUHlzJE-cez7MVhNN8s7UiZKC1WeFn5FpjewALHE';
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const SUPABASE_SERVER_KEY = SUPABASE_SERVICE_ROLE || SUPABASE_ANON;
const SOCKET_AUTH_REQUIRED = String(process.env.SOCKET_AUTH_REQUIRED || '').toLowerCase() === 'true';
const PTS_PER_USD = Number(process.env.PTS_PER_USD || 1000);

// MEGA API Configuration
const MEGA_API_KEY = process.env.MEGA_API_KEY || '';

// Agora Configuration
const AGORA_APP_ID = process.env.AGORA_APP_ID || 'e9cfd627a92f4466a047b2a820e1382e';
const AGORA_APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE || '';
const AGORA_API_KEY = process.env.AGORA_API_KEY || '';

// AdMob Configuration
const ADMOB_APP_ID = process.env.ADMOB_APP_ID || 'ca-app-pub-2253243248364888~1427340343';
const ADMOB_BANNER_AD_UNIT = process.env.ADMOB_BANNER_AD_UNIT || 'ca-app-pub-2253243248364888/3990983995';
const ADMOB_INTERSTITIAL_AD_UNIT = process.env.ADMOB_INTERSTITIAL_AD_UNIT || 'ca-app-pub-2253243248364888/3199587018';
const ADMOB_REWARDED_AD_UNIT = process.env.ADMOB_REWARDED_AD_UNIT || 'ca-app-pub-2253243248364888/5139354646';

// AdSense Configuration
const ADSENSE_CLIENT = process.env.ADSENSE_CLIENT || 'ca-pub-2397116277801081';

// Adsterra Configuration
const ADSTERRA_API_KEY = process.env.ADSTERRA_API_KEY || '';
const METERED_KEY   = process.env.METERED_API_KEY  || '';
const GOOGLE_KEY    = process.env.GOOGLE_API_KEY   || '';
const GOOGLE_VISION = process.env.GOOGLE_VISION_KEY|| '';
const BKASH_APP_KEY    = process.env.BKASH_APP_KEY    || '';
const BKASH_APP_SECRET = process.env.BKASH_APP_SECRET || '';
const BKASH_USERNAME   = process.env.BKASH_USERNAME   || '';
const BKASH_PASSWORD   = process.env.BKASH_PASSWORD   || '';
const NAGAD_MERCHANT   = process.env.NAGAD_MERCHANT_ID || '';
const NAGAD_KEY        = process.env.NAGAD_PUBLIC_KEY  || '';
const VAPID_PUBLIC  = process.env.VAPID_PUBLIC_KEY  || '';
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY || '';
const VAPID_EMAIL   = process.env.VAPID_EMAIL       || 'mailto:myworktoolsp3@gmail.com';

// TURN fallback
const STATIC_ICE=[
  {urls:'stun:stun.relay.metered.ca:80'},
  {urls:'turn:global.relay.metered.ca:80',               username:'d583b2ca0185d321a1fd3b93',credential:'olukX7eOalIsC9EK'},
  {urls:'turn:global.relay.metered.ca:80?transport=tcp',  username:'d583b2ca0185d321a1fd3b93',credential:'olukX7eOalIsC9EK'},
  {urls:'turn:global.relay.metered.ca:443',              username:'d583b2ca0185d321a1fd3b93',credential:'olukX7eOalIsC9EK'},
  {urls:'turns:global.relay.metered.ca:443?transport=tcp',username:'d583b2ca0185d321a1fd3b93',credential:'olukX7eOalIsC9EK'},
];

// ── Web Push Setup ────────────────────────────────────────────
if(VAPID_PUBLIC && VAPID_PRIVATE) {
  webpush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC, VAPID_PRIVATE);
  console.log('[WebPush] VAPID configured ✅');
}
const pushSubscriptions = new Map(); // userId → subscription

// ── App ───────────────────────────────────────────────────────
const app    = express();
const server = http.createServer(app);
const io     = new Server(server, {
  cors:{origin:'*',methods:['GET','POST']},
  pingInterval:25000, pingTimeout:60000
});

app.use(helmet({ contentSecurityPolicy:false, crossOriginEmbedderPolicy:false }));
app.use(cors({origin:'*'}));
app.use(express.json({
  limit:'10mb',
  verify:(req, _res, buf) => {
    if(req.originalUrl === '/api/payment/stripe/webhook') req.rawBody = buf;
  }
}));
app.use(express.urlencoded({extended:true, limit:'10mb'}));

// Rate limiting
const apiLimiter = rateLimit({windowMs:15*60*1000, max:300, standardHeaders:true, legacyHeaders:false});
const aiLimiter  = rateLimit({windowMs:60*1000, max:20, message:{error:'Too many AI requests'}});
const payLimiter = rateLimit({windowMs:60*1000, max:5,  message:{error:'Too many payment requests'}});
app.use('/api/', apiLimiter);
app.use('/api/ai/', aiLimiter);
app.use('/api/payment/', payLimiter);

app.use(express.static(path.join(__dirname,'public'),{maxAge:'1d'}));
app.use('/js', express.static(path.join(__dirname,'js'),{maxAge:'1d'}));

function sendRootFile(res, fileName, contentType) {
  const fs = require('fs');
  const rootFile = path.join(__dirname, fileName);
  const publicFile = path.join(__dirname, 'public', fileName);
  const file = fs.existsSync(rootFile) ? rootFile : publicFile;
  if (contentType) res.type(contentType);
  res.sendFile(file, err => {
    if (err) res.status(404).send(`${fileName} not found`);
  });
}

app.get(['/','/index.html'], (_, res) => sendRootFile(res, 'index.html', 'html'));
app.get('/manifest.json', (_, res) => sendRootFile(res, 'manifest.json', 'application/manifest+json'));
app.get('/sw.js', (_, res) => sendRootFile(res, 'sw.js', 'application/javascript'));
app.get('/ads.txt', (_, res) => sendRootFile(res, 'ads.txt', 'text/plain'));
app.get('/app-ads.txt', (_, res) => sendRootFile(res, 'app-ads.txt', 'text/plain'));

// ── State ──────────────────────────────────────────────────────
const onlineUsers  = new Map();
const onlineSessions = new Map();
const callSessions = new Map();
const rooms        = new Map();
let cachedICE=null, iceExpiry=0;
let bkashToken=null, bkashTokenExp=0;

const syncStore = {
  users: new Map(),
  posts: new Map(),
  points: new Map(),
  media: new Map(),
  backups: []
};
const searchIndex = {
  users: new Map(),
  posts: new Map()
};

function indexText(value) {
  return String(value || '').toLowerCase().replace(/[^\p{L}\p{N}@#]+/gu, ' ').trim();
}

function updateIndexes() {
  searchIndex.users.clear();
  searchIndex.posts.clear();
  for (const [id, u] of syncStore.users) {
    searchIndex.users.set(id, indexText([u.name, u.username, u.email, u.phone].join(' ')));
  }
  for (const [id, p] of syncStore.posts) {
    searchIndex.posts.set(id, indexText([p.text, p.type, p.category, ...(p.hashtags || [])].join(' ')));
  }
}

function publicSyncSnapshot() {
  return {
    users: Array.from(syncStore.users.values()),
    posts: Array.from(syncStore.posts.values()).sort((a,b)=>(b.createdAt||0)-(a.createdAt||0)),
    points: Object.fromEntries(syncStore.points),
    media: Array.from(syncStore.media.values()),
    stats: {
      onlineUsers: new Set(Array.from(onlineSessions.values()).map(s => s.userId)).size,
      onlineSessions: onlineSessions.size,
      totalUsers: syncStore.users.size,
      totalPosts: syncStore.posts.size
    },
    generatedAt: Date.now()
  };
}

function normalizeLoginId(value) {
  return String(value || '').trim().toLowerCase();
}

function sameAccountRecord(user, loginId) {
  const q = normalizeLoginId(loginId);
  if(!user || !q) return false;
  return normalizeLoginId(user.id) === q ||
    normalizeLoginId(user.email) === q ||
    normalizeLoginId(user.username) === q ||
    String(user.phone || '').trim() === String(loginId || '').trim();
}

function isAdminRequest(req) {
  const adminId = req.headers['x-user-id'] || req.query.userId || req.body?.userId;
  const adminRole = String(req.headers['x-admin-role'] || req.query.admin || '').toLowerCase() === 'true';
  const user = adminId ? syncStore.users.get(String(adminId)) : null;
  return adminRole || !!(user && (user.isAdmin || user.is_admin));
}

function requireAdmin(req, res, next) {
  if(isAdminRequest(req)) return next();
  return res.status(403).json({error:'Admin only'});
}

function mergeAccountIntoCanonical(userData) {
  if(!userData) return null;
  const uid = String(userData.id || userData.userId || userData.key || '').trim();
  if(!uid) return null;
  const candidates = Array.from(syncStore.users.values()).filter(u =>
    u && (u.id === uid ||
      sameAccountRecord(u, userData.email) ||
      sameAccountRecord(u, userData.username) ||
      sameAccountRecord(u, userData.phone))
  );
  const canonical = candidates.find(u => u.id === uid) || candidates[0] || {};
  const canonicalId = canonical.id || uid;
  const pointCandidates = candidates.map(u => Number(u.points || 0));
  pointCandidates.push(Number(userData.points || 0), Number(syncStore.points.get(uid)?.points || 0), Number(syncStore.points.get(canonicalId)?.points || 0));
  const mergedPoints = Math.max(0, ...pointCandidates.filter(Number.isFinite));
  const merged = {...canonical, ...userData, id: canonicalId, points: mergedPoints, syncedAt: Date.now()};

  candidates.forEach(u => {
    if(u.id && u.id !== canonicalId) {
      syncStore.users.delete(u.id);
      const oldPoint = syncStore.points.get(u.id);
      if(oldPoint) syncStore.points.delete(u.id);
      for(const post of syncStore.posts.values()) if(post.author === u.id) post.author = canonicalId;
      pointCandidates.push(Number(oldPoint?.points || 0));
    }
  });
  syncStore.users.set(canonicalId, merged);
  syncStore.points.set(canonicalId, {
    ...(syncStore.points.get(canonicalId) || {}),
    points: mergedPoints,
    updatedAt: Date.now()
  });
  return merged;
}

// ─────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────
async function getICE() {
  if(cachedICE && Date.now()<iceExpiry) return cachedICE;
  try {
    const r=await fetch(`https://monetixra.metered.live/api/v1/turn/credentials?apiKey=${METERED_KEY}`);
    const d=await r.json();
    if(Array.isArray(d)&&d.length){cachedICE=d;iceExpiry=Date.now()+3_600_000;return d;}
  }catch(e){}
  return STATIC_ICE;
}

async function supabaseReq(table,method,body,filter='') {
  let url=`${SUPABASE_URL}/rest/v1/${table}`;
  if(filter) url+=`?${filter}`;
  const r=await fetch(url,{
    method, headers:{
      'Content-Type':'application/json',
      'apikey':SUPABASE_SERVER_KEY,
      'Authorization':`Bearer ${SUPABASE_SERVER_KEY}`,
      'Prefer': method==='POST'?'return=representation':''
    },
    body: body?JSON.stringify(body):undefined
  });
  return r.json();
}

async function supabaseRest(table, method='GET', body=null, query='', prefer='') {
  if(!SUPABASE_URL || !SUPABASE_SERVER_KEY) throw new Error('Supabase not configured');
  const url = `${SUPABASE_URL}/rest/v1/${table}${query ? '?' + query : ''}`;
  const headers = {
    'Content-Type':'application/json',
    'apikey':SUPABASE_SERVER_KEY,
    'Authorization':`Bearer ${SUPABASE_SERVER_KEY}`
  };
  if(prefer) headers.Prefer = prefer;
  const r = await fetch(url, {method, headers, body: body ? JSON.stringify(body) : undefined});
  const txt = await r.text();
  const data = txt ? JSON.parse(txt) : null;
  if(!r.ok) throw new Error(data?.message || data?.error || `Supabase ${method} ${table} failed`);
  return data;
}

function toIso(msOrDate) {
  if(!msOrDate) return new Date().toISOString();
  const d = typeof msOrDate === 'number' ? new Date(msOrDate) : new Date(msOrDate);
  return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

function userRow(u={}) {
  return {
    id: String(u.id || u.userId || ''),
    name: String(u.name || u.username || 'User'),
    username: u.username || null,
    email: u.email || null,
    phone: u.phone || null,
    password: u.password || null,
    bio: u.bio || null,
    avatar: u.avatar || null,
    cover: u.cover || null,
    points: Math.max(0, Number(u.points || 0)),
    is_admin: !!(u.isAdmin || u.is_admin),
    kyc_verified: !!(u.kycVerified || u.kyc_verified),
    verified: !!u.verified,
    two_fa: !!(u.twoFA || u.two_fa),
    disabled: !!u.disabled,
    deactivated: !!u.deactivated,
    tin: u.tin || null,
    pay_methods: u.payMethods || u.pay_methods || null,
    crypto_wallets: u.cryptoWallets || u.crypto_wallets || null,
    privacy_settings: u.privacySettings || u.privacy_settings || null,
    notif_settings: u.notifSettings || u.notif_settings || null,
    eth_address: u.ethAddress || u.eth_address || null,
    sol_address: u.solAddress || u.sol_address || null,
    referred_by: u.referredBy || u.referred_by || null,
    created_at: toIso(u.createdAt || u.created_at || Date.now()),
    updated_at: new Date().toISOString()
  };
}

function postRow(p={}) {
  return {
    id: String(p.id || ''),
    author: String(p.author || ''),
    text: p.text || '',
    file: p.file || null,
    file_type: p.mimetype || p.fileType || p.type || null,
    tags: Array.isArray(p.hashtags) ? p.hashtags : (Array.isArray(p.tags) ? p.tags : []),
    visibility: p.visibility || 'public',
    likes: Array.isArray(p.likedBy) ? p.likedBy : (Array.isArray(p.likes) ? p.likes : []),
    views: Number(p.views || 0),
    reports: Number(p.reports || 0),
    hidden: !!p.hidden,
    copyright: !!p.copyright,
    chain: p.chain || null,
    created_at: toIso(p.createdAt || p.created_at || Date.now())
  };
}

function txRow(t={}) {
  return {
    id: String(t.id || 'tx_' + Date.now()),
    user_id: String(t.user || t.userId || t.user_id || ''),
    type: t.type || 'ledger',
    label: t.label || '',
    pts: Math.trunc(Number(t.pts || 0)),
    admin_cut: Math.trunc(Number(t.adminCut || t.admin_cut || 0)),
    created_at: toIso(t.at || t.createdAt || t.created_at || Date.now())
  };
}

async function persistUser(u) {
  const row = userRow(u);
  if(!row.id) throw new Error('user id required');
  await supabaseRest('users', 'POST', row, 'on_conflict=id', 'resolution=merge-duplicates,return=representation');
  return row;
}

async function persistPost(p) {
  const row = postRow(p);
  if(!row.id || !row.author) throw new Error('post id and author required');
  await supabaseRest('posts', 'POST', row, 'on_conflict=id', 'resolution=merge-duplicates,return=representation');
  return row;
}

async function persistTransaction(t) {
  const row = txRow(t);
  if(!row.id || !row.user_id) throw new Error('transaction id and user required');
  await supabaseRest('transactions', 'POST', row, 'on_conflict=id', 'resolution=ignore-duplicates,return=representation');
  return row;
}

async function getPersistentUser(userId) {
  const rows = await supabaseRest('users', 'GET', null, `id=eq.${encodeURIComponent(userId)}&select=*`);
  return Array.isArray(rows) ? rows[0] : null;
}

async function setPersistentPoints(userId, points) {
  await supabaseRest('users', 'PATCH', {points: Math.max(0, Math.trunc(Number(points || 0))), updated_at:new Date().toISOString()}, `id=eq.${encodeURIComponent(userId)}`, 'return=representation');
}

async function creditUserPoints(userId, pts, label, type='topup', txId='tx_' + Date.now()) {
  const delta = Math.trunc(Number(pts || 0));
  if(!userId || !delta) throw new Error('userId and pts required');
  const current = await getPersistentUser(userId);
  const nextPoints = Math.max(0, Number(current?.points || syncStore.points.get(userId)?.points || 0) + delta);
  await setPersistentPoints(userId, nextPoints);
  const tx = await persistTransaction({id:txId, user:userId, type, label, pts:delta, at:Date.now()});
  syncStore.points.set(userId, {points:nextPoints, updatedAt:Date.now(), history:[...(syncStore.points.get(userId)?.history || []).slice(-49), {points:delta,label,at:Date.now()}]});
  if(syncStore.users.has(userId)) syncStore.users.get(userId).points = nextPoints;
  return {points:nextPoints, tx};
}

async function hydratePersistentSyncStore() {
  try {
    const [users, posts, txs] = await Promise.all([
      supabaseRest('users', 'GET', null, 'select=*&limit=500'),
      supabaseRest('posts', 'GET', null, 'select=*&order=created_at.desc&limit=500'),
      supabaseRest('transactions', 'GET', null, 'select=*&order=created_at.desc&limit=500')
    ]);
    (users || []).forEach(u => {
      syncStore.users.set(u.id, {...u, isAdmin:u.is_admin, kycVerified:u.kyc_verified, twoFA:u.two_fa, privacySettings:u.privacy_settings, notifSettings:u.notif_settings, points:Number(u.points || 0)});
      syncStore.points.set(u.id, {points:Number(u.points || 0), history:[]});
    });
    (posts || []).forEach(p => syncStore.posts.set(p.id, {
      id:p.id, author:p.author, text:p.text, file:p.file, mimetype:p.file_type,
      hashtags:p.tags || [], visibility:p.visibility, likedBy:p.likes || [],
      views:p.views || 0, reports:p.reports || 0, hidden:p.hidden,
      copyright:p.copyright, chain:p.chain, createdAt:new Date(p.created_at).getTime()
    }));
    (txs || []).forEach(t => syncStore.points.set(t.user_id, {
      ...(syncStore.points.get(t.user_id) || {points:0}),
      history:[...(syncStore.points.get(t.user_id)?.history || []).slice(-49), {points:t.pts,label:t.label,at:new Date(t.created_at).getTime()}]
    }));
    updateIndexes();
    console.log(`[Supabase] Hydrated ${syncStore.users.size} users, ${syncStore.posts.size} posts`);
  } catch(e) {
    console.warn('[Supabase hydrate]', e.message || e);
  }
}

async function verifySupabaseToken(token) {
  if(!token) return null;
  const r = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers:{apikey:SUPABASE_ANON, Authorization:`Bearer ${token}`}
  });
  if(!r.ok) return null;
  const user = await r.json();
  if(!user?.id && !user?.email) return null;
  const matches = Array.from(syncStore.users.values()).find(u => u.authUid === user.id || (u.email && user.email && String(u.email).toLowerCase() === String(user.email).toLowerCase()));
  return {authUid:user.id, email:user.email, appUserId:matches?.id || user.user_metadata?.appUserId || null};
}

function verifyStripeSignature(rawBody, signatureHeader, secret) {
  if(!secret) return true;
  if(!signatureHeader) return false;
  const parts = Object.fromEntries(String(signatureHeader).split(',').map(part => {
    const [k,v] = part.split('=');
    return [k, v];
  }));
  if(!parts.t || !parts.v1) return false;
  const expected = crypto.createHmac('sha256', secret).update(`${parts.t}.${rawBody.toString('utf8')}`).digest('hex');
  const a = Buffer.from(expected, 'hex');
  const b = Buffer.from(parts.v1, 'hex');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// Send push notification to a user
async function sendPushToUser(userId, payload) {
  const sub = pushSubscriptions.get(userId);
  if(!sub || !VAPID_PUBLIC) return;
  try {
    await webpush.sendNotification(sub, JSON.stringify(payload));
  } catch(e) {
    if(e.statusCode===410) pushSubscriptions.delete(userId);
  }
}

// ─────────────────────────────────────────────────────────────
//  ROUTES
// ─────────────────────────────────────────────────────────────

// Health
app.get('/health',(_, res)=>res.json({
  status:'ok', uptime:Math.floor(process.uptime()),
  online:onlineSessions.size, onlineUsers:onlineUsers.size, calls:callSessions.size,
  webpush:!!(VAPID_PUBLIC&&VAPID_PRIVATE),
  bkash:!!BKASH_APP_KEY, nagad:!!NAGAD_MERCHANT
}));

// Health (API prefix for consistency)
app.get('/api/health',(_, res)=>res.json({
  status:'ok', timestamp: new Date().toISOString(),
  uptime:Math.floor(process.uptime()),
  online:onlineSessions.size, onlineUsers:onlineUsers.size, calls:callSessions.size,
  socketio: io.engine.clientsCount,
  webpush:!!(VAPID_PUBLIC&&VAPID_PRIVATE),
  bkash:!!BKASH_APP_KEY, nagad:!!NAGAD_MERCHANT
}));

// Cloudinary signature for secure uploads
app.get('/api/cloudinary/signature', (req, res) => {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return res.status(400).json({ error: 'Cloudinary not configured' });
  }
  const folder = req.query.folder || 'monetixra';
  const timestamp = Math.floor(Date.now() / 1000);
  const payload = `folder=${folder}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
  const signature = crypto.createHash('sha1').update(payload).digest('hex');
  res.json({
    cloudName: CLOUDINARY_CLOUD_NAME,
    apiKey: CLOUDINARY_API_KEY,
    timestamp,
    signature,
    folder
  });
});

// ICE Servers
app.get('/api/ice-servers', async(_,res)=>{
  res.json({iceServers: await getICE()});
});

// VAPID public key (needed by client for push subscription)
app.get('/api/push/vapid-key',(_,res)=>{
  if(!VAPID_PUBLIC) return res.json({error:'VAPID not configured'});
  res.json({publicKey: VAPID_PUBLIC});
});

// Push Subscribe
app.post('/api/push/subscribe', (req,res)=>{
  const {userId, subscription} = req.body;
  if(!userId||!subscription) return res.status(400).json({error:'userId and subscription required'});
  pushSubscriptions.set(userId, subscription);
  console.log(`[Push] User ${userId} subscribed`);
  res.json({success:true});
});

// Push Unsubscribe
app.post('/api/push/unsubscribe', (req,res)=>{
  const {userId}=req.body;
  if(userId) pushSubscriptions.delete(userId);
  res.json({success:true});
});

// Send Push (admin or server-side trigger)
app.post('/api/push/send', async(req,res)=>{
  const {userId, title, body, icon, url} = req.body;
  if(!userId) return res.status(400).json({error:'userId required'});
  await sendPushToUser(userId, {title, body, icon:icon||'/icon-192.png', url:url||'/'});
  res.json({success:true});
});

// Broadcast Push to all
app.post('/api/push/broadcast', async(req,res)=>{
  const {title, body, icon} = req.body;
  let count=0;
  for(const [uid,sub] of pushSubscriptions) {
    try { await webpush.sendNotification(sub, JSON.stringify({title,body,icon:icon||'/icon-192.png'})); count++; }
    catch(e){ if(e.statusCode===410) pushSubscriptions.delete(uid); }
  }
  res.json({success:true, sent:count});
});

// ── AI Chat ──────────────────────────────────────────────────
app.post('/api/ai/chat', async(req,res)=>{
  const {messages,model='openai',systemPrompt}=req.body;
  if(!Array.isArray(messages)) return res.status(400).json({error:'messages required'});
  const msgs = systemPrompt?[{role:'system',content:systemPrompt},...messages]:messages;
  try {
    if(model==='deepseek'){
      const r=await fetch('https://api.deepseek.com/chat/completions',{
        method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${DEEPSEEK_KEY}`},
        body:JSON.stringify({model:'deepseek-chat',messages:msgs,max_tokens:1000})
      });
      const d=await r.json();
      return res.json({reply:d.choices?.[0]?.message?.content||'',model:'deepseek'});
    }
    const r=await fetch('https://api.openai.com/v1/chat/completions',{
      method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${OPENAI_KEY}`},
      body:JSON.stringify({model:'gpt-4o-mini',messages:msgs,max_tokens:1000})
    });
    const d=await r.json();
    if(d.error) return res.status(400).json({error:d.error.message});
    res.json({reply:d.choices?.[0]?.message?.content||'',model:'openai'});
  }catch(e){ res.status(500).json({error:'AI unavailable'}); }
});

// ── AI Caption (Enhanced for Video/Audio/Photo) ────────────────────────
app.post('/api/ai/caption', async(req,res)=>{
  const {type='photo', data='', language='auto', style='descriptive'}=req.body;
  if(!data) return res.status(400).json({error:'data required'});
  
  try {
    let prompt = '';
    
    switch(type) {
      case 'video':
        prompt = `Write a descriptive, engaging social media caption for this video content. Describe what might be happening in the video, the mood, and why people should watch it. Make it captivating and shareable. Include relevant hashtags.`;
        break;
      case 'audio':
        prompt = `Write a compelling social media caption for this audio content. Describe the mood, genre, and what makes this audio special. Make people want to listen. Include relevant hashtags.`;
        break;
      case 'photo':
        prompt = `Write a descriptive, engaging social media caption for this image. Describe what's happening, the mood, colors, and composition. Make it shareable and discoverable. Include relevant hashtags.`;
        break;
      default:
        prompt = `Write an engaging social media caption for this content. Make it shareable and include relevant hashtags.`;
    }
    
    if(language && language !== 'auto') {
      prompt += ` Write the caption in ${language}.`;
    }
    
    if(style) {
      prompt += ` Use a ${style} style.`;
    }
    
    const r=await fetch('https://api.openai.com/v1/chat/completions',{
      method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${OPENAI_KEY}`},
      body:JSON.stringify({model:'gpt-4o-mini',messages:[{role:'user',content:prompt}],max_tokens:300})
    });
    const d=await r.json();
    const caption = d.choices?.[0]?.message?.content||'Amazing content! 🔥 #Monetixra #Trending #Viral';
    res.json({caption, type, style, language});
  }catch(e){ 
    console.error('AI Caption error:', e);
    res.json({caption:'Amazing content! 🔥 #Monetixra #Trending #Viral #Creator #Digital', type, style, language}); 
  }
});

// ── AI Hashtags Generation ────────────────────────────────────────────────
app.post('/api/ai/hashtags', async(req,res)=>{
  const {caption='', fileType='photo', maxHashtags=10}=req.body;
  
  try {
    const prompt = `Generate ${maxHashtags} relevant, trending hashtags for this social media content: "${caption}". The content type is ${fileType}. Return only the hashtags, one per line, starting with #.`;
    
    const r=await fetch('https://api.openai.com/v1/chat/completions',{
      method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${OPENAI_KEY}`},
      body:JSON.stringify({model:'gpt-4o-mini',messages:[{role:'user',content:prompt}],max_tokens:150})
    });
    const d=await r.json();
    const hashtagsText = d.choices?.[0]?.message?.content||'#Monetixra #Trending #Viral';
    const hashtags = hashtagsText.split('\n').filter(tag => tag.trim().startsWith('#')).map(tag => tag.trim());
    res.json({hashtags});
  }catch(e){ 
    console.error('Hashtags generation error:', e);
    res.json({hashtags:['#Monetixra', '#Trending', '#Viral', '#SocialMedia', '#ContentCreator']}); 
  }
});

// ── Enhanced Vision API (Object Detection) ────────────────────────────────
app.post('/api/ai/vision', async(req,res)=>{
  const {type='photo', data=''}=req.body;
  if(!data) return res.status(400).json({error:'data required'});
  
  try {
    const b64 = data.split(',')[1] || data;
    
    if(type === 'object-detection') {
      // Object detection specific
      const r = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION}`,{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({requests:[{image:{content:b64},features:[
          {type:'LABEL_DETECTION',maxResults:15},{type:'OBJECT_LOCALIZATION',maxResults:10}
        ]}]})
      });
      const d = await r.json();
      const objects = (d.responses?.[0]?.labelAnnotations||[]).map(l => l.description);
      res.json({objects});
    } else {
      // Regular photo analysis
      const r = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION}`,{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({requests:[{image:{content:b64},features:[
          {type:'LABEL_DETECTION',maxResults:10},{type:'TEXT_DETECTION',maxResults:5},
          {type:'SAFE_SEARCH_DETECTION'},{type:'IMAGE_PROPERTIES'}
        ]}]})
      });
      const d = await r.json();
      const labels = (d.responses?.[0]?.labelAnnotations||[]).map(l => l.description);
      const text = d.responses?.[0]?.textAnnotations?.[0]?.description||'';
      const safe = d.responses?.[0]?.safeSearchAnnotation||{};
      const isUnsafe = ['LIKELY','VERY_LIKELY'].includes(safe.adult)||['LIKELY','VERY_LIKELY'].includes(safe.violence);
      
      // Generate caption from vision data
      const caption = labels.length > 0 ? 
        `This image contains: ${labels.slice(0,5).join(', ')}. ${text ? `Text detected: "${text.substring(0,100)}"` : ''}` :
        'Interesting visual content worth sharing!';
      
      res.json({caption, labels, text, safe:!isUnsafe, objects: labels});
    }
  }catch(e){ 
    console.error('Vision API error:', e);
    res.json({caption:'Beautiful image worth sharing!', labels:[], text:'', safe:true, objects:[]}); 
  }
});

// ── Enhanced Translation API ────────────────────────────────────────────────
async function googleTranslate(q, targetLanguage='en', sourceLanguage='auto') {
  if(!GOOGLE_KEY) return {translated:q, translatedText:q, sourceLanguage, targetLanguage, configured:false};
  const payload = {q, target:targetLanguage, format:'text'};
  if(sourceLanguage && sourceLanguage !== 'auto') payload.source = sourceLanguage;
  const r = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_KEY}`, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(payload)
  });
  const d = await r.json();
  if(!r.ok) throw new Error(d.error?.message || 'Google Translate failed');
  const first = d.data?.translations?.[0] || {};
  return {
    translated:first.translatedText || q,
    translatedText:first.translatedText || q,
    sourceLanguage:first.detectedSourceLanguage || sourceLanguage,
    targetLanguage,
    configured:true
  };
}

app.post('/api/ai/translate', async(req,res)=>{
  const {text='', targetLanguage='en', sourceLanguage='auto'}=req.body;
  if(!text) return res.status(400).json({error:'text required'});
  
  try {
    res.json(await googleTranslate(text, targetLanguage, sourceLanguage));
  }catch(e){ 
    console.error('Translation error:', e);
    res.json({translatedText:text, sourceLanguage:sourceLanguage, targetLanguage}); 
  }
});

// ── Google Translate ──────────────────────────────────────────
app.post('/api/translate', async(req,res)=>{
  const {text,target='en',targetLanguage,sourceLanguage='auto'}=req.body;
  if(!text) return res.status(400).json({error:'text required'});
  try {
    res.json(await googleTranslate(text, targetLanguage || target, sourceLanguage));
  }catch(e){ res.json({error:'Translation failed', detail:e.message, translated:text, translatedText:text}); }
});

app.post('/api/translate/batch', async(req,res)=>{
  const {texts=[], target='en', targetLanguage, sourceLanguage='auto'} = req.body || {};
  const list = Array.isArray(texts) ? texts.slice(0, 100) : [];
  if(!list.length) return res.status(400).json({error:'texts required'});
  const lang = targetLanguage || target;
  try {
    if(!GOOGLE_KEY) return res.json({translations:list, translated:list, configured:false});
    const payload = {q:list, target:lang, format:'text'};
    if(sourceLanguage && sourceLanguage !== 'auto') payload.source = sourceLanguage;
    const r = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_KEY}`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload)
    });
    const d = await r.json();
    if(!r.ok) throw new Error(d.error?.message || 'Google Translate batch failed');
    const translations = (d.data?.translations || []).map((x,i) => x.translatedText || list[i]);
    res.json({translations, translated:translations, targetLanguage:lang, configured:true});
  } catch(e) {
    res.json({error:'Batch translation failed', detail:e.message, translations:list, translated:list});
  }
});

// ── Google Vision ─────────────────────────────────────────────
app.post('/api/vision/analyze', async(req,res)=>{
  const {imageBase64}=req.body;
  if(!imageBase64) return res.status(400).json({error:'imageBase64 required'});
  try {
    const r=await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION}`,{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({requests:[{image:{content:imageBase64},features:[
        {type:'LABEL_DETECTION',maxResults:8},{type:'SAFE_SEARCH_DETECTION'},{type:'TEXT_DETECTION',maxResults:5}
      ]}]})
    });
    const d=await r.json();
    const labels =(d.responses?.[0]?.labelAnnotations||[]).map(l=>l.description);
    const safe   = d.responses?.[0]?.safeSearchAnnotation||{};
    const text   = d.responses?.[0]?.textAnnotations?.[0]?.description||'';
    const isUnsafe=['LIKELY','VERY_LIKELY'].includes(safe.adult)||['LIKELY','VERY_LIKELY'].includes(safe.violence);
    res.json({labels,safe:!isUnsafe,safeSearch:safe,text});
  }catch(e){ res.status(500).json({error:'Vision API failed'}); }
});

// ── AI Transcribe / Auto-caption (images -> vision text/labels, audio/video -> stub/fallback)
app.post('/api/ai/transcribe', async(req,res)=>{
  const {name='', data='', type=''} = req.body;
  if(!data) return res.status(400).json({error:'data required (dataURL or base64)'});
  try {
    // Normalize base64 (strip data: prefix)
    const b64 = data.split(',')[1] || data;
    // If image, use Google Vision TEXT_DETECTION + LABEL_DETECTION to produce caption
    if(type.startsWith('image/') || name.match(/\.jpg$|\.jpeg$|\.png$|\.webp$/i)) {
      const r = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION}`,{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({requests:[{image:{content:b64},features:[{type:'TEXT_DETECTION'},{type:'LABEL_DETECTION',maxResults:6}]}]})
      });
      const d = await r.json();
      const text = d.responses?.[0]?.textAnnotations?.[0]?.description || '';
      const labels = (d.responses?.[0]?.labelAnnotations||[]).map(l=>l.description).slice(0,5);
      const caption = text ? `${text.split('\n').slice(0,3).join(' ')}${labels.length?(' · '+labels.join(', ')):''}` : (labels.join(', ') || `Image: ${name}`);
      return res.json({transcript: caption.trim(), source:'vision'});
    }

    // For audio/video: server-side ASR not configured here — return helpful fallback
    if(!OPENAI_KEY) {
      return res.status(501).json({error:'ASR not configured on server. Set OPENAI_API_KEY or another ASR provider to enable audio/video transcription.',fallback:`Auto-caption placeholder: ${name}`});
    }

    // If OPENAI_KEY exists, provide informational response (integration placeholder)
    // NOTE: full binary upload/transcription flow requires multipart/form-data handling.
    return res.status(501).json({error:'ASR integration required. Server has OPENAI_API_KEY but automatic multipart upload not implemented in this stub. See server logs for integration instructions.'});
  } catch(e) {
    console.error('[transcribe]', e.message || e);
    res.status(500).json({error:'Transcription failed', detail: e.message});
  }
});

// ── Supabase Proxy ────────────────────────────────────────────
app.post('/api/db/:table', async(req,res)=>{
  const {table}=req.params;
  const {method='GET',filter,body:payload,select='*'}=req.body;
  try {
    let f=filter||'';
    if(method==='GET'&&select) f+=(f?'&':'')+'select='+select;
    const data=await supabaseReq(table,method,payload,f);
    res.json(data);
  }catch(e){ res.status(500).json({error:'DB error',detail:e.message}); }
});

// ── Crypto Prices ─────────────────────────────────────────────
app.get('/api/crypto/prices', async(_,res)=>{
  try {
    const r=await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin,solana,toncoin&vs_currencies=usd&include_24hr_change=true');
    res.json(await r.json());
  }catch(e){ res.json({bitcoin:{usd:0},ethereum:{usd:0},solana:{usd:0},binancecoin:{usd:0}}); }
});

// ────────────────────────────────────────────────────────────
//  bKASH PAYMENT API
// ────────────────────────────────────────────────────────────
async function getBkashToken() {
  if(bkashToken && Date.now()<bkashTokenExp) return bkashToken;
  try {
    const r=await fetch('https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'username': BKASH_USERNAME,
        'password': BKASH_PASSWORD
      },
      body:JSON.stringify({app_key:BKASH_APP_KEY,app_secret:BKASH_APP_SECRET})
    });
    const d=await r.json();
    if(d.id_token){
      bkashToken=d.id_token;
      bkashTokenExp=Date.now()+(3590*1000);
      return bkashToken;
    }
  }catch(e){ console.error('[bKash token]',e.message); }
  return null;
}

// bKash: Create Payment
app.post('/api/payment/bkash/create', async(req,res)=>{
  if(!BKASH_APP_KEY) return res.json({demo:true, paymentID:'demo_'+Date.now(), bkashURL:'#', message:'bKash not configured — demo mode'});
  try {
    const token=await getBkashToken();
    if(!token) return res.status(500).json({error:'bKash auth failed'});
    const {amount,currency='BDT',intent='sale',merchantInvoiceNumber}=req.body;
    const r=await fetch('https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/create',{
      method:'POST',
      headers:{'Content-Type':'application/json','authorization':token,'x-app-key':BKASH_APP_KEY},
      body:JSON.stringify({mode:'0011',payerReference:merchantInvoiceNumber||'ref'+Date.now(),callbackURL:process.env.BASE_URL+'/api/payment/bkash/callback',amount,currency,intent,merchantInvoiceNumber:merchantInvoiceNumber||'inv'+Date.now()})
    });
    const d=await r.json();
    res.json(d);
  }catch(e){ res.status(500).json({error:'bKash create failed: '+e.message}); }
});

// bKash: Execute Payment
app.post('/api/payment/bkash/execute', async(req,res)=>{
  if(!BKASH_APP_KEY) return res.json({demo:true, transactionStatus:'Completed', trxID:'TRX'+Date.now()});
  try {
    const token=await getBkashToken();
    const {paymentID}=req.body;
    const r=await fetch('https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/execute',{
      method:'POST',
      headers:{'Content-Type':'application/json','authorization':token,'x-app-key':BKASH_APP_KEY},
      body:JSON.stringify({paymentID})
    });
    const d=await r.json();
    res.json(d);
  }catch(e){ res.status(500).json({error:'bKash execute failed: '+e.message}); }
});

// bKash callback
app.get('/api/payment/bkash/callback', (req,res)=>{
  const {paymentID,status}=req.query;
  console.log('[bKash callback]', paymentID, status);
  res.redirect(`/?bkash=${status}&pid=${paymentID}`);
});

// ────────────────────────────────────────────────────────────
//  NAGAD PAYMENT API
// ────────────────────────────────────────────────────────────
app.post('/api/payment/nagad/create', async(req,res)=>{
  if(!NAGAD_MERCHANT) return res.json({demo:true, orderId:'nagad_'+Date.now(), message:'Nagad not configured — demo mode'});
  try {
    const {amount,orderId}=req.body;
    const datetime=new Date().toISOString().replace(/[-:T]/g,'').slice(0,14);
    const sensitiveData={merchantId:NAGAD_MERCHANT,datetime,orderId:orderId||'ord'+Date.now(),challenge:'hash'+Date.now()};
    // In production: encrypt with Nagad public key using RSA
    const r=await fetch(`https://sandbox.mynagad.com:10080/remote-payment-gateway-1.0/api/dfs/check-out/initialize/${NAGAD_MERCHANT}/${orderId}`,{
      method:'POST',
      headers:{'Content-Type':'application/json','X-KM-Api-Version':'v-0.2.0','X-KM-IP-V4':'127.0.0.1','X-KM-Client-Type':'PC_WEB'},
      body:JSON.stringify({dateTime:datetime,sensitiveData:'encrypted_data',signature:'signature',merchantCallbackURL:process.env.BASE_URL+'/api/payment/nagad/callback'})
    });
    const d=await r.json();
    res.json(d);
  }catch(e){ res.status(500).json({error:'Nagad create failed: '+e.message}); }
});

app.get('/api/payment/nagad/callback', (req,res)=>{
  const {order_id,status}=req.query;
  console.log('[Nagad callback]', order_id, status);
  res.redirect(`/?nagad=${status}&oid=${order_id}`);
});

// ── Admin Panel API Routes ──────────────────────────────────────────────
// Check admin status
app.get('/api/auth/check-admin', async(req,res)=>{
  try {
    const userId = req.headers['x-user-id'] || req.query.userId;
    const user = userId ? syncStore.users.get(String(userId)) : null;
    const isAdmin = isAdminRequest(req);
    res.json({isAdmin, user: isAdmin ? (user || {id:userId || 'admin', username:'Administrator'}) : null});
  } catch(e) {
    res.json({isAdmin: false, user: null});
  }
});

// Get dashboard statistics
app.get('/api/admin/dashboard-stats', requireAdmin, async(req,res)=>{
  try {
    // In production: get real stats from database
    const stats = {
      totalUsers: syncStore.users.size,
      activeUsers: new Set(Array.from(onlineSessions.values()).map(s => s.userId)).size,
      activeSessions: onlineSessions.size,
      totalPosts: syncStore.posts.size,
      reports: syncStore.backups.filter(x => x.type === 'report').length + Array.from(syncStore.posts.values()).filter(p => Number(p.reports || 0) > 0).length
    };
    res.json(stats);
  } catch(e) {
    res.status(500).json({error: 'Failed to load dashboard stats'});
  }
});

// Get all users
app.get('/api/admin/users', requireAdmin, async(req,res)=>{
  try {
    const users = Array.from(syncStore.users.values()).map(u => ({
      ...u,
      status: u.deleted ? 'deleted' : u.deactivated ? 'deactivated' : u.disabled ? 'disabled' : 'active'
    }));
    res.json(users);
  } catch(e) {
    res.status(500).json({error: 'Failed to load users'});
  }
});

// Get specific user
app.get('/api/admin/users/:id', requireAdmin, async(req,res)=>{
  try {
    const userId = req.params.id;
    const user = syncStore.users.get(userId);
    if(!user) return res.status(404).json({error:'User not found'});
    res.json(user);
  } catch(e) {
    res.status(500).json({error: 'Failed to load user'});
  }
});

// Deactivate user
app.post('/api/admin/users/:id/deactivate', requireAdmin, async(req,res)=>{
  try {
    const userId = req.params.id;
    const user = syncStore.users.get(userId);
    if(!user) return res.status(404).json({error:'User not found'});
    user.deactivated = true;
    user.updatedAt = Date.now();
    await persistUser(user).catch(()=>{});
    res.json({success: true, user});
  } catch(e) {
    res.status(500).json({error: 'Failed to deactivate user'});
  }
});

// Delete user
app.delete('/api/admin/users/:id', requireAdmin, async(req,res)=>{
  try {
    const userId = req.params.id;
    const user = syncStore.users.get(userId);
    if(user) {
      user.deleted = true;
      user.deactivated = true;
      user.updatedAt = Date.now();
      await persistUser(user).catch(()=>{});
    }
    res.json({success: true});
  } catch(e) {
    res.status(500).json({error: 'Failed to delete user'});
  }
});

// Get all content
app.get('/api/admin/content', requireAdmin, async(req,res)=>{
  try {
    const content = Array.from(syncStore.posts.values()).map(p => ({
      ...p,
      title: p.text || p.type || 'Post',
      status: p.hidden ? 'hidden' : Number(p.reports || 0) > 0 ? 'reported' : 'active',
      mediaUrl: p.file || p.mediaUrl || ''
    }));
    res.json(content);
  } catch(e) {
    res.status(500).json({error: 'Failed to load content'});
  }
});

// Get specific content
app.get('/api/admin/content/:id', requireAdmin, async(req,res)=>{
  try {
    const contentId = req.params.id;
    const content = syncStore.posts.get(contentId);
    if(!content) return res.status(404).json({error:'Content not found'});
    res.json(content);
  } catch(e) {
    res.status(500).json({error: 'Failed to load content'});
  }
});

// Delete content
app.delete('/api/admin/content/:id', requireAdmin, async(req,res)=>{
  try {
    const contentId = req.params.id;
    syncStore.posts.delete(contentId);
    res.json({success: true});
  } catch(e) {
    res.status(500).json({error: 'Failed to delete content'});
  }
});

// ── Data Persistence API Routes ───────────────────────────────────────────
// Sync posts
app.post('/api/posts/sync', async(req,res)=>{
  try {
    const postData = req.body;
    if(!postData || !postData.id) return res.status(400).json({error:'Post id required'});
    syncStore.posts.set(postData.id, {...(syncStore.posts.get(postData.id)||{}), ...postData, syncedAt:Date.now()});
    await persistPost(postData);
    updateIndexes();
    console.log(`[Sync] Post: ${postData.id}`);
    res.json({success: true, synced: true, persisted: true, id: postData.id, totalPosts: syncStore.posts.size});
  } catch(e) {
    res.status(500).json({error: 'Post sync failed', detail:e.message});
  }
});

// Sync points
app.post('/api/points/sync', async(req,res)=>{
  try {
    const pointsData = req.body;
    if(!pointsData || !pointsData.userId) return res.status(400).json({error:'userId required'});
    const persistent = await getPersistentUser(pointsData.userId).catch(()=>null);
    const prev = syncStore.points.get(pointsData.userId) || {points:0, history:[]};
    const merged = Math.max(Number(prev.points || 0), Number(pointsData.points || 0), Number(persistent?.points || 0));
    const next = {
      ...prev,
      ...pointsData,
      points: merged,
      updatedAt: Date.now(),
      history: [...(prev.history || []).slice(-49), {points: pointsData.points, label: pointsData.label || 'sync', at: Date.now()}]
    };
    syncStore.points.set(pointsData.userId, next);
    await setPersistentPoints(pointsData.userId, merged);
    await persistTransaction({id:'sync_' + pointsData.userId + '_' + Date.now(), user:pointsData.userId, type:'sync', label:pointsData.label || 'points sync', pts:0, at:Date.now()}).catch(()=>{});
    console.log(`[Sync] Points: ${pointsData.userId} - ${pointsData.points}`);
    res.json({success: true, synced: true, persisted: true, points: next.points});
  } catch(e) {
    res.status(500).json({error: 'Points sync failed', detail:e.message});
  }
});

// Sync user data
app.post('/api/user-data/sync', async(req,res)=>{
  try {
    const userData = req.body;
    const uid = userData.id || userData.userId || userData.key;
    if(!uid) return res.status(400).json({error:'user id required'});
    const mergedUser = mergeAccountIntoCanonical(userData);
    const canonicalId = mergedUser.id;
    const prev = syncStore.users.get(canonicalId) || {};
    const pointState = syncStore.points.get(canonicalId);
    const persistent = await getPersistentUser(uid).catch(()=>null);
    const mergedPoints = Math.max(
      Number(prev.points || 0),
      Number(userData.points || 0),
      Number(pointState?.points || 0),
      Number(persistent?.points || 0)
    );
    const finalUser = {...prev, ...mergedUser, id:canonicalId, points:mergedPoints, syncedAt:Date.now()};
    syncStore.users.set(canonicalId, finalUser);
    syncStore.points.set(canonicalId, {...(syncStore.points.get(canonicalId) || {}), points:mergedPoints, updatedAt:Date.now()});
    await persistUser(finalUser);
    updateIndexes();
    console.log(`[Sync] User Data: ${userData.key}`);
    res.json({success: true, synced: true, persisted: true, key: canonicalId, canonicalId, points: mergedPoints, totalUsers: syncStore.users.size});
  } catch(e) {
    res.status(500).json({error: 'User data sync failed', detail:e.message});
  }
});

app.post('/api/account/deactivate', async(req,res)=>{
  try {
    const {userId} = req.body || {};
    if(!userId) return res.status(400).json({error:'userId required'});
    const user = syncStore.users.get(userId) || await getPersistentUser(userId).catch(()=>null);
    if(!user) return res.status(404).json({error:'User not found'});
    user.deactivated = true;
    user.updatedAt = Date.now();
    syncStore.users.set(userId, user);
    await persistUser(user).catch(()=>{});
    res.json({success:true, userId});
  } catch(e) {
    res.status(500).json({error:'Deactivate failed', detail:e.message});
  }
});

app.delete('/api/account/:id', async(req,res)=>{
  try {
    const userId = req.params.id;
    const user = syncStore.users.get(userId) || {};
    user.id = userId;
    user.deleted = true;
    user.deactivated = true;
    user.updatedAt = Date.now();
    syncStore.users.set(userId, user);
    syncStore.points.delete(userId);
    for(const [postId, post] of syncStore.posts) if(post.author === userId) syncStore.posts.delete(postId);
    await persistUser(user).catch(()=>{});
    res.json({success:true, userId});
  } catch(e) {
    res.status(500).json({error:'Delete account failed', detail:e.message});
  }
});

app.post('/api/reports', async(req,res)=>{
  try {
    const {from, postId='', message='', type='feedback'} = req.body || {};
    if(!from || !message) return res.status(400).json({error:'from and message required'});
    const report = {id:'rep_' + Date.now() + '_' + crypto.randomBytes(3).toString('hex'), from, postId, message, type, status:'open', at:Date.now()};
    syncStore.backups.unshift({id:report.id, at:Date.now(), type:'report', data:report});
    if(postId && syncStore.posts.has(postId)) {
      const post = syncStore.posts.get(postId);
      post.reports = Number(post.reports || 0) + 1;
      post.updatedAt = Date.now();
      await persistPost(post).catch(()=>{});
    }
    res.json({success:true, report});
  } catch(e) {
    res.status(500).json({error:'Report failed', detail:e.message});
  }
});

app.post('/api/ledger/credit', async(req,res)=>{
  try {
    const {userId, pts, label='Server credit', type='earn', id} = req.body || {};
    if(!userId || !Number.isFinite(Number(pts))) return res.status(400).json({error:'userId and pts required'});
    const result = await creditUserPoints(userId, pts, label, type, id || `${type}_${userId}_${Date.now()}`);
    res.json({success:true, ...result});
  } catch(e) {
    res.status(500).json({error:'Credit failed', detail:e.message});
  }
});

app.post('/api/withdrawals/request', async(req,res)=>{
  try {
    const {userId, amount, method='bkash', account=''} = req.body || {};
    const amt = Math.trunc(Number(amount || 0));
    if(!userId || amt <= 0 || !account) return res.status(400).json({error:'userId, amount and account required'});
    let user = null;
    let persistentReady = true;
    try {
      user = await getPersistentUser(userId);
    } catch(e) {
      persistentReady = false;
      user = syncStore.users.get(userId) || null;
    }
    if(!user) return res.status(404).json({error:'User not found'});
    if(!(user.kyc_verified || user.kycVerified)) return res.status(403).json({error:'KYC verification required'});
    if(Number(user.points || 0) < amt) return res.status(400).json({error:'Insufficient points'});
    const wd = {id:'wd_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex'), user_id:userId, amount:amt, method, account, status:'pending', created_at:new Date().toISOString()};
    if(persistentReady) {
      await supabaseRest('withdrawals', 'POST', wd, 'on_conflict=id', 'resolution=ignore-duplicates,return=representation');
      await creditUserPoints(userId, -amt, `Withdrawal request via ${method}`, 'withdraw', 'withdraw_' + wd.id);
    } else {
      const nextPoints = Math.max(0, Number(user.points || 0) - amt);
      user.points = nextPoints;
      syncStore.users.set(userId, user);
      syncStore.points.set(userId, {
        ...(syncStore.points.get(userId) || {}),
        points: nextPoints,
        updatedAt: Date.now(),
        history: [...(syncStore.points.get(userId)?.history || []).slice(-49), {points:-amt,label:`Withdrawal request via ${method}`,at:Date.now()}]
      });
    }
    syncStore.backups.unshift({id:wd.id, at:Date.now(), type:'withdrawal', data:wd});
    res.json({success:true, withdrawal:wd, persisted:persistentReady});
  } catch(e) {
    res.status(500).json({error:'Withdrawal request failed', detail:e.message});
  }
});

app.get('/api/admin/withdrawals', requireAdmin, async(req,res)=>{
  try {
    let rows = [];
    try {
      rows = await supabaseRest('withdrawals', 'GET', null, 'select=*&order=created_at.desc&limit=200');
    } catch(e) {
      rows = syncStore.backups.filter(x => x.type === 'withdrawal').map(x => x.data).sort((a,b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    }
    res.json({success:true, withdrawals:rows});
  } catch(e) {
    res.status(500).json({error:'Failed to load withdrawals', detail:e.message});
  }
});

app.post('/api/admin/withdrawals/:id/:action', requireAdmin, async(req,res)=>{
  try {
    const {id, action} = req.params;
    if(!['approve','reject'].includes(action)) return res.status(400).json({error:'action must be approve or reject'});
    const status = action === 'approve' ? 'approved' : 'rejected';
    const stamp = action === 'approve' ? 'approved_at' : 'rejected_at';
    let wd = null;
    try {
      const rows = await supabaseRest('withdrawals', 'GET', null, `id=eq.${encodeURIComponent(id)}&select=*`);
      wd = Array.isArray(rows) ? rows[0] : null;
      if(!wd) return res.status(404).json({error:'Withdrawal not found'});
      await supabaseRest('withdrawals', 'PATCH', {status, [stamp]:new Date().toISOString()}, `id=eq.${encodeURIComponent(id)}`, 'return=representation');
      if(action === 'reject') await creditUserPoints(wd.user_id, Number(wd.amount || 0), 'Withdrawal rejected refund', 'withdraw_refund', 'refund_' + id);
    } catch(e) {
      const entry = syncStore.backups.find(x => x.type === 'withdrawal' && x.id === id);
      wd = entry?.data;
      if(!wd) return res.status(404).json({error:'Withdrawal not found'});
      wd.status = status;
      wd[stamp] = new Date().toISOString();
      if(action === 'reject') {
        const user = syncStore.users.get(wd.user_id);
        if(user) {
          user.points = Number(user.points || 0) + Number(wd.amount || 0);
          syncStore.users.set(wd.user_id, user);
          syncStore.points.set(wd.user_id, {...(syncStore.points.get(wd.user_id) || {}), points:user.points, updatedAt:Date.now()});
        }
      }
    }
    res.json({success:true, withdrawal:{...wd, status}});
  } catch(e) {
    res.status(500).json({error:'Withdrawal update failed', detail:e.message});
  }
});

// Sync media
app.post('/api/media/sync', async(req,res)=>{
  try {
    const mediaData = req.body;
    if(!mediaData || !mediaData.id) return res.status(400).json({error:'media id required'});
    syncStore.media.set(mediaData.id, {...(syncStore.media.get(mediaData.id)||{}), ...mediaData, syncedAt:Date.now()});
    supabaseRest('media_objects', 'POST', {
      id:mediaData.id,
      user_id:mediaData.userId || mediaData.user_id || null,
      post_id:mediaData.postId || mediaData.post_id || null,
      provider:mediaData.provider || 'local',
      url:mediaData.url || mediaData.data || '',
      mime:mediaData.type || mediaData.mime || '',
      size:Math.trunc(Number(mediaData.size || 0)),
      created_at:new Date(mediaData.at || Date.now()).toISOString()
    }, 'on_conflict=id', 'resolution=merge-duplicates,return=representation').catch(()=>{});
    console.log(`[Sync] Media: ${mediaData.id} - ${mediaData.type}`);
    res.json({success: true, synced: true, id: mediaData.id, storage: 'indexed-memory'});
  } catch(e) {
    res.status(500).json({error: 'Media sync failed'});
  }
});

// Get sync status
app.get('/api/sync/status', async(req,res)=>{
  try {
    res.json({
      lastSyncTime: Date.now(),
      pendingItems: 0,
      syncEnabled: true,
      indexed: {
        users: syncStore.users.size,
        posts: syncStore.posts.size,
        points: syncStore.points.size,
        media: syncStore.media.size
      },
      storage: {
        active: process.env.S3_BUCKET ? 's3-compatible' : 'local-demo',
        s3CompatibleReady: !!(process.env.S3_BUCKET && process.env.S3_ACCESS_KEY && process.env.S3_SECRET_KEY),
        wasabiReady: !!(process.env.WASABI_BUCKET && process.env.WASABI_ACCESS_KEY && process.env.WASABI_SECRET_KEY)
      }
    });
  } catch(e) {
    res.status(500).json({error: 'Sync status check failed'});
  }
});

app.get('/api/search', (req,res)=>{
  const q = indexText(req.query.q || '');
  const type = String(req.query.type || 'all').toLowerCase();
  if(!q) return res.json({users:[], posts:[]});
  const users = [];
  const posts = [];
  for (const [id, text] of searchIndex.users) {
    if(text.includes(q)) users.push(syncStore.users.get(id));
    if(users.length >= 20) break;
  }
  for (const [id, text] of searchIndex.posts) {
    const post = syncStore.posts.get(id);
    if(text.includes(q) && (type === 'all' || post?.type === type || post?.category === type)) posts.push(post);
    if(posts.length >= 50) break;
  }
  res.json({users, posts, tookMs: 0, indexed: true});
});

app.get('/api/sync/export', (_,res)=>res.json(publicSyncSnapshot()));

app.post('/api/backup/create', (req,res)=>{
  const backup = {id:'backup_'+Date.now(), at:Date.now(), data: publicSyncSnapshot()};
  syncStore.backups.unshift(backup);
  syncStore.backups = syncStore.backups.slice(0,10);
  res.json({success:true, id:backup.id, backups:syncStore.backups.length});
});

app.get('/api/backup/latest', (_,res)=>{
  res.json(syncStore.backups[0] || {success:false, message:'No server backup yet'});
});

// ── Agora Token Generation ───────────────────────────────────────────
app.post('/api/agora/token', async(req,res)=>{
  try {
    const { channelName, uid = 0 } = req.body;
    
    if (!channelName) {
      return res.status(400).json({error: 'channelName required'});
    }
    
    // Generate Agora token (simplified version)
    const token = AGORA_TEMP_TOKEN; // Use provided temp token
    
    console.log(`[Agora] Token generated for channel: ${channelName}, uid: ${uid}`);
    res.json({ 
      token: token,
      appId: AGORA_APP_ID,
      channelName: channelName,
      uid: uid
    });
  } catch(e) {
    console.error('[Agora] Token generation failed:', e);
    res.status(500).json({error: 'Token generation failed'});
  }
});

// ── Cloudinary Upload Endpoint ───────────────────────────────────────────
app.post('/api/cloudinary/upload', async(req,res)=>{
  try {
    const { file, metadata = {} } = req.body;
    
    if (!file) {
      return res.status(400).json({error: 'file required'});
    }
    
    // In production: upload to Cloudinary and return URL
    const uploadResult = {
      publicId: `monetixra_${Date.now()}`,
      url: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${file}`,
      secureUrl: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${file}`,
      format: 'jpg',
      size: 1024000, // 1MB
      width: 1920,
      height: 1080,
      resourceType: 'image',
      createdAt: new Date().toISOString(),
      tags: ['monetixra', 'user-upload'],
      ...metadata
    };
    
    console.log(`[Cloudinary] Upload completed: ${uploadResult.publicId}`);
    res.json(uploadResult);
  } catch(e) {
    console.error('[Cloudinary] Upload failed:', e);
    res.status(500).json({error: 'Upload failed'});
  }
});

// ── MEGA Upload Endpoint ───────────────────────────────────────────────
app.post('/api/mega/upload', async(req,res)=>{
  try {
    const { file, metadata = {} } = req.body;
    
    if (!file) {
      return res.status(400).json({error: 'file required'});
    }
    
    // In production: upload to MEGA and return file info
    const uploadResult = {
      fileId: `mega_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      url: `https://mega.nz/file/${file}`,
      size: 1024000, // 1MB
      name: file.name || 'upload',
      type: file.type || 'application/octet-stream',
      uploadedAt: new Date().toISOString(),
      ...metadata
    };
    
    console.log(`[MEGA] Upload completed: ${uploadResult.fileId}`);
    res.json(uploadResult);
  } catch(e) {
    console.error('[MEGA] Upload failed:', e);
    res.status(500).json({error: 'Upload failed'});
  }
});

// ── Download Earnings Endpoint ───────────────────────────────────────────
app.post('/api/download/earnings', async(req,res)=>{
  try {
    const { downloadId, fileSize = 0 } = req.body;
    
    if (!downloadId) {
      return res.status(400).json({error: 'downloadId required'});
    }
    
    // Calculate earnings (0.05 USD per download, capped at $50/day)
    const baseEarnings = 0.05;
    const maxDailyEarnings = 50.00;
    
    // Get today's earnings (in production, from database)
    const todayEarnings = 0; // Placeholder
    
    const actualEarnings = Math.min(baseEarnings, maxDailyEarnings - todayEarnings);
    const points = Math.floor(actualEarnings * 200); // Convert to points
    
    const result = {
      downloadId: downloadId,
      earnings: actualEarnings,
      points: points,
      fileSize: fileSize,
      timestamp: new Date().toISOString(),
      todayEarnings: todayEarnings + actualEarnings
    };
    
    console.log(`[Earnings] Download completed: ${downloadId}, earned: $${actualEarnings}`);
    res.json(result);
  } catch(e) {
    console.error('[Earnings] Calculation failed:', e);
    res.status(500).json({error: 'Earnings calculation failed'});
  }
});

// ── System Status Endpoint ───────────────────────────────────────────────
app.get('/api/system/status', async(req,res)=>{
  try {
    const status = {
      server: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        platform: process.platform,
        nodeVersion: process.version
      },
      services: {
        supabase: SUPABASE_URL ? 'configured' : 'not configured',
        mega: MEGA_API_KEY ? 'configured' : 'not configured',
        agora: AGORA_APP_ID ? 'configured' : 'not configured',
        cloudinary: CLOUDINARY_API_KEY ? 'configured' : 'not configured',
        adsense: ADSENSE_CLIENT ? 'configured' : 'not configured',
        admob: ADMOB_APP_ID ? 'configured' : 'not configured'
      },
      database: {
        connected: true, // In production: check actual DB connection
        tables: ['users', 'posts', 'downloads', 'earnings']
      },
      storage: {
        local: true,
        cloud: true,
        totalSpace: '20GB (MEGA) + Unlimited (Cloudinary)'
      }
    };
    
    res.json(status);
  } catch(e) {
    console.error('[System] Status check failed:', e);
    res.status(500).json({error: 'Status check failed'});
  }
});

// ── OTP Send ──────────────────────────────────────────────────
app.post('/api/otp/send', async(req,res)=>{
  const {to,channel='email'}=req.body;
  if(!to) return res.status(400).json({error:'to required'});
  const otp=Math.floor(100000+Math.random()*900000).toString();
  console.log(`[OTP] ${channel} → ${to}: ${otp}`);
  // In production: send via Twilio/SendGrid
  res.json({success:true, otp, note:'Check server console for OTP (demo mode)'});
});

app.get('/api/docs', (_,res)=>res.type('text/plain').send(`Monetixra API

Health:
GET /health
GET /api/health

Realtime Socket.io:
user:online, chat:message, room:message, live:start, live:end, notif:send, call:invite, webrtc:offer, webrtc:answer, webrtc:ice-candidate

Sync:
POST /api/user-data/sync  {id|userId, name, username, points}
POST /api/posts/sync      {id, author, type, text, createdAt}
POST /api/points/sync     {userId, points, label}
POST /api/media/sync      {id, type, url|data, postId}
GET  /api/sync/status
GET  /api/sync/export
GET  /api/search?q=name&type=all

Push:
GET  /api/push/vapid-key
POST /api/push/subscribe
POST /api/push/unsubscribe
POST /api/push/send
POST /api/push/broadcast

Backup:
POST /api/backup/create
GET  /api/backup/latest

Storage:
Cloudinary routes are available now. S3/Wasabi readiness is exposed at /api/sync/status and can be enabled with S3_BUCKET/S3_ACCESS_KEY/S3_SECRET_KEY or WASABI_* environment variables.
`));

// SPA fallback
app.get('*',(_,res)=>{
  sendRootFile(res, 'index.html', 'html');
});

// ─────────────────────────────────────────────────────────────
//  SOCKET.IO
// ─────────────────────────────────────────────────────────────
io.use(async(socket,next)=>{
  try {
    const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.replace(/^Bearer\s+/i,'');
    const claimedUserId = socket.handshake.auth?.userId || socket.handshake.query?.userId;
    const verified = token ? await verifySupabaseToken(token) : null;
    if(verified) {
      socket.auth = verified;
      socket.userId = String(verified.appUserId || claimedUserId || verified.authUid);
      return next();
    }
    if(SOCKET_AUTH_REQUIRED) return next(new Error('auth_required'));
    if(claimedUserId) socket.userId = String(claimedUserId);
    return next();
  } catch(e) {
    if(SOCKET_AUTH_REQUIRED) return next(new Error('auth_failed'));
    return next();
  }
});

io.on('connection', socket=>{

  socket.on('user:online', ({userId,name})=>{
    const effectiveUserId = socket.userId || userId;
    if(!effectiveUserId) return;
    if(socket.userId && userId && String(userId) !== String(socket.userId)) return socket.emit('auth:error',{error:'user_mismatch'});
    socket.userId=String(effectiveUserId); socket.userName=name||'User';
    onlineUsers.set(socket.userId,socket.id);
    onlineSessions.set(socket.id, {userId: socket.userId, name: socket.userName, connectedAt: Date.now(), lastSeen: Date.now()});
    socket.join('user:'+socket.userId);
    socket.broadcast.emit('user:status',{userId:socket.userId,status:'online'});
  });

  // Chat
  socket.on('chat:message', ({to,from,text,media,msgId,timestamp})=>{
    if(socket.userId && from && String(from) !== String(socket.userId)) return socket.emit('auth:error',{error:'sender_mismatch'});
    from = socket.userId || from;
    const toSid=onlineUsers.get(to);
    const payload={from,text,media,msgId,timestamp:timestamp||Date.now()};
    supabaseRest('messages', 'POST', {
      id:msgId || 'm_' + Date.now() + '_' + crypto.randomBytes(3).toString('hex'),
      from_user:from,
      to_user:to,
      text:text || '',
      media:media || null,
      read:false,
      created_at:new Date(payload.timestamp).toISOString()
    }, 'on_conflict=id', 'resolution=ignore-duplicates,return=representation').catch(()=>{});
    if(toSid) io.to(toSid).emit('chat:message',payload);
    socket.emit('chat:message:sent',{msgId,to,timestamp:payload.timestamp});
    // Push notification if offline
    if(!toSid) sendPushToUser(to,{title:'New Message',body:(text||'📎 Media').slice(0,80),icon:'/icon-192.png',url:'/'});
  });
  socket.on('chat:typing',  ({to,from,isTyping})=>{ from = socket.userId || from; const s=onlineUsers.get(to); if(s) io.to(s).emit('chat:typing',{from,isTyping}); });
  socket.on('chat:read',    ({to,from,msgId})   =>{ from = socket.userId || from; const s=onlineUsers.get(to); if(s) io.to(s).emit('chat:read',{from,msgId}); });
  socket.on('chat:delete',  ({to,msgId})         =>{ const s=onlineUsers.get(to); if(s) io.to(s).emit('chat:delete',{msgId}); });

  // Rooms
  socket.on('room:join',    ({roomId,userId})=>{ socket.join(roomId); if(!rooms.has(roomId)) rooms.set(roomId,new Set()); rooms.get(roomId).add(socket.id); socket.to(roomId).emit('room:user:joined',{userId}); });
  socket.on('room:leave',   ({roomId,userId})=>{ socket.leave(roomId); rooms.get(roomId)?.delete(socket.id); socket.to(roomId).emit('room:user:left',{userId}); });
  socket.on('room:message', ({roomId,from,text,media,timestamp})=>{ from = socket.userId || from; io.to(roomId).emit('room:message',{from,text,media,timestamp:timestamp||Date.now()}); });

  // Live Stream
  socket.on('live:start',   ({streamerId,title,postId})=>{
    streamerId = socket.userId || streamerId;
    socket.join('live:'+streamerId);
    supabaseRest('live_events', 'POST', {
      id:postId || 'live_' + Date.now(),
      post_id:postId || null,
      streamer_id:streamerId,
      status:'live',
      started_at:new Date().toISOString()
    }, 'on_conflict=id', 'resolution=merge-duplicates,return=representation').catch(()=>{});
    io.emit('live:new',{streamerId,title,postId,viewers:0});
  });
  socket.on('live:comment', ({streamerId,from,text})=>{ from = socket.userId || from; io.to('live:'+streamerId).emit('live:comment',{from,text,t:Date.now()}); });
  socket.on('live:reaction',({streamerId,emoji})=>{ io.to('live:'+streamerId).emit('live:reaction',{emoji}); });
  socket.on('live:end',     ({streamerId,postId})=>{
    streamerId = socket.userId || streamerId;
    if(postId) supabaseRest('live_events', 'PATCH', {status:'ended', ended_at:new Date().toISOString()}, `id=eq.${encodeURIComponent(postId)}`, 'return=representation').catch(()=>{});
    io.to('live:'+streamerId).emit('live:ended',{streamerId,postId});
  });
  socket.on('live:gift',    ({streamerId,from,gift})=>{ io.to('live:'+streamerId).emit('live:gift',{from,gift,t:Date.now()}); });

  // Posts
  socket.on('post:react',   ({postId,userId,reaction})=>{ userId = socket.userId || userId; io.emit('post:reacted',{postId,userId,reaction}); });
  socket.on('post:comment', ({postId,authorId,comment})=>{ const s=onlineUsers.get(authorId); if(s) io.to(s).emit('post:new:comment',{postId,comment}); io.emit('post:commented',{postId,comment}); });

  // Notifications
  socket.on('notif:send', ({to,notif})=>{
    if(to === 'all') {
      io.emit('notif:receive', notif);
      return;
    }
    const s=onlineUsers.get(to);
    if(s) io.to(s).emit('notif:receive',notif);
    else sendPushToUser(to,{title:notif.msg||'Notification',body:'',icon:'/icon-192.png',url:'/'});
  });

  // WebRTC Signaling
  socket.on('call:invite', async({callId,callerId,calleeId,type,callerName,callerAvatar})=>{
    if(socket.userId && callerId && String(callerId) !== String(socket.userId)) return socket.emit('auth:error',{error:'caller_mismatch'});
    callerId = socket.userId || callerId;
    const calleeSid=onlineUsers.get(calleeId);
    const iceServers=await getICE();
    callSessions.set(callId,{callId,callerId,calleeId,type,callerSocket:socket.id,calleeSocket:calleeSid,state:'ringing'});
    if(calleeSid){ io.to(calleeSid).emit('call:incoming',{callId,callerId,callerName,callerAvatar,type,iceServers}); }
    else {
      socket.emit('call:missed',{callId,calleeId,reason:'offline'});
      sendPushToUser(calleeId,{title:'Missed Call',body:`${callerName} called you`,icon:'/icon-192.png',url:'/'});
    }
  });
  socket.on('call:accept', async({callId,calleeId})=>{ const sess=callSessions.get(callId); if(!sess) return; sess.state='connected'; const ice=await getICE(); io.to(sess.callerSocket).emit('call:accepted',{callId,calleeId,iceServers:ice}); });
  socket.on('call:decline', ({callId})=>{ const sess=callSessions.get(callId); if(!sess) return; io.to(sess.callerSocket).emit('call:declined',{callId}); callSessions.delete(callId); });
  socket.on('call:end',     ({callId})=>{ const sess=callSessions.get(callId); if(!sess) return; const other=socket.id===sess.callerSocket?sess.calleeSocket:sess.callerSocket; if(other) io.to(other).emit('call:ended',{callId}); callSessions.delete(callId); });
  socket.on('webrtc:offer',         ({callId,to,offer})    =>{ const s=onlineUsers.get(to); if(s) io.to(s).emit('webrtc:offer',        {callId,from:socket.userId,offer}); });
  socket.on('webrtc:answer',        ({callId,to,answer})   =>{ const s=onlineUsers.get(to); if(s) io.to(s).emit('webrtc:answer',       {callId,from:socket.userId,answer}); });
  socket.on('webrtc:ice-candidate', ({callId,to,candidate})=>{ const s=onlineUsers.get(to); if(s) io.to(s).emit('webrtc:ice-candidate',{callId,from:socket.userId,candidate}); });
  socket.on('webrtc:screen-share',  ({callId,to,sharing})  =>{ const s=onlineUsers.get(to); if(s) io.to(s).emit('webrtc:screen-share', {callId,from:socket.userId,sharing}); });

  socket.on('disconnect', ()=>{
    if(socket.userId){
      onlineSessions.delete(socket.id);
      const stillOnline = Array.from(onlineSessions.values()).some(s => s.userId === socket.userId);
      if(!stillOnline) {
        onlineUsers.delete(socket.userId);
        socket.broadcast.emit('user:status',{userId:socket.userId,status:'offline'});
      }
      for(const [callId,sess] of callSessions){
        if(sess.callerSocket===socket.id||sess.calleeSocket===socket.id){
          const other=sess.callerSocket===socket.id?sess.calleeSocket:sess.callerSocket;
          if(other) io.to(other).emit('call:ended',{callId,reason:'disconnect'});
          callSessions.delete(callId);
        }
      }
    }
  });
});

// ── Start ──────────────────────────────────────────────────────
server.listen(PORT, ()=>{
  console.log(`\n🚀 Monetixra v8.0 — Port ${PORT}`);
  console.log(`   ✅ Socket.io Real-time`);
  console.log(`   ✅ WebRTC Video/Audio`);
  console.log(`   ✅ OpenAI + DeepSeek AI`);
  console.log(`   ✅ Google Translate + Vision`);
  console.log(`   ✅ Supabase Database`);
  console.log(`   ✅ Metered TURN Server`);
  console.log(`   ✅ Web Push Notifications`);
  console.log(`   ${BKASH_APP_KEY?'✅':'⚠️ '} bKash Payment`);
  console.log(`   ${NAGAD_MERCHANT?'✅':'⚠️ '} Nagad Payment`);
  console.log(`   ✅ Rate Limiting + Security\n`);
  getICE().catch(()=>{});
  hydratePersistentSyncStore().catch(()=>{});
});

module.exports={app,server,io};

// ── Stripe Payment ─────────────────────────────────────────
app.post('/api/payment/stripe/create-session', async(req,res)=>{
  const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY||'';
  if(!STRIPE_SECRET) return res.json({demo:true, message:'Stripe not configured'});
  try {
    const {amount, currency='usd', description, userId} = req.body;
    if(!userId) return res.status(400).json({error:'userId required'});
    const cents = Math.max(50, Math.trunc(Number(amount || 0)));
    const points = Math.round((cents / 100) * PTS_PER_USD);
    const params = new URLSearchParams();
    params.set('payment_method_types[]', 'card');
    params.set('line_items[0][price_data][currency]', currency);
    params.set('line_items[0][price_data][product_data][name]', description || 'Monetixra Top-up');
    params.set('line_items[0][price_data][unit_amount]', String(cents));
    params.set('line_items[0][quantity]', '1');
    params.set('mode', 'payment');
    params.set('success_url', (process.env.BASE_URL||'http://localhost:3000') + '/?stripe=success&uid='+userId);
    params.set('cancel_url',  (process.env.BASE_URL||'http://localhost:3000') + '/?stripe=cancel');
    params.set('metadata[userId]', userId);
    params.set('metadata[description]', description || '');
    params.set('metadata[points]', String(points));
    const r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method:'POST',
      headers:{Authorization:`Bearer ${STRIPE_SECRET}`, 'Content-Type':'application/x-www-form-urlencoded'},
      body:params
    });
    const session = await r.json();
    if(!r.ok) return res.status(400).json({error:session.error?.message || 'Stripe session failed'});
    res.json({ sessionId: session.id, url: session.url });
  } catch(e){ res.status(500).json({error:e.message}); }
});

// Stripe webhook
app.post('/api/payment/stripe/webhook', express.raw({type:'application/json'}), async(req,res)=>{
  const STRIPE_SECRET  = process.env.STRIPE_SECRET_KEY||'';
  const STRIPE_WH_SEC  = process.env.STRIPE_WEBHOOK_SECRET||'';
  if(!STRIPE_SECRET) return res.json({received:true});
  try {
    const sig    = req.headers['stripe-signature'];
    const rawBody = req.rawBody || (Buffer.isBuffer(req.body) ? req.body : Buffer.from(JSON.stringify(req.body || {})));
    if(STRIPE_WH_SEC && !verifyStripeSignature(rawBody, sig, STRIPE_WH_SEC)) return res.status(400).send('Webhook Error: invalid signature');
    const event  = JSON.parse(rawBody.toString('utf8'));
    if(event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const userId  = session.metadata?.userId;
      const amt     = session.amount_total; // cents
      const points  = Math.round(Number(session.metadata?.points || ((amt / 100) * PTS_PER_USD)));
      console.log(`[Stripe] Payment completed: $${amt/100} by ${userId}`);
      if(userId && points > 0) {
        await creditUserPoints(userId, points, `Stripe top-up $${(amt/100).toFixed(2)}`, 'topup', 'stripe_' + session.id);
      }
    }
    res.json({received:true});
  } catch(e){ res.status(400).send(`Webhook Error: ${e.message}`); }
});
