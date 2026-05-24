
(function(){
  const rewards = [ {time:30,pts:3,msg:'30s on site! +3 pts'}, {time:60,pts:5,msg:'1 min! +5 pts'}, {time:180,pts:10,msg:'3 mins! +10 pts'}, {time:300,pts:20,msg:'5 mins! +20 pts'} ];
  rewards.forEach(r => setTimeout(() => { addPts(r.pts,'Time Reward'); toast('s',r.msg); }, r.time * 1000));
})();

// ═══════════════════════════════════════════════════════════
// MAXIMUM REVENUE AD SYSTEM — Diverse Ads, Strategic Placement
// ═══════════════════════════════════════════════════════════
(function(){
  const MAX_AD_SYSTEM = {
    // ═══════════════════════════════════════════════════════
    // 1. DIVERSE AD TYPES POOL — Multiple Ad Types for Maximum Revenue
    // ═══════════════════════════════════════════════════════
    adTypes: {
      // Banner Ads (Multiple sizes for different placements)
      banners: {
        '160x600': { name: 'Wide Skyscraper', cpm: 2.5, url: 'https://pl29280287.profitablecpmratenetwork.com/1805a61f4f6c6177d946441e5153e81c/invoke.js' },
        '300x250': { name: 'Medium Rectangle', cpm: 3.2, url: 'https://pl29280284.profitablecpmratenetwork.com/25/1b/0c/251b0cf69cbb4dec0e2e5d4397f5e56f.js' },
        '728x90':  { name: 'Leaderboard', cpm: 2.8, url: 'https://www.profitablecpmratenetwork.com/qu1bqnynm6?key=d753b3018195910056f99110db5b614a' },
        '320x50':  { name: 'Mobile Banner', cpm: 1.8, url: 'https://pl29280286.profitablecpmratenetwork.com/1f/31/3a/1f313aa876d332b1f8c2519dd6ff70f9.js' },
        '300x600': { name: 'Half Page', cpm: 4.0, url: 'https://pl29280287.profitablecpmratenetwork.com/1805a61f4f6c6177d946441e5153e81c/invoke.js' },
        '160x30':  { name: 'Micro Banner', cpm: 1.2, url: 'https://www.highperformanceformat.com/5c1a960ae2f4c6d4ac2b758a9e2fb18b/invoke.js' },
        '468x60':  { name: 'Full Banner', cpm: 2.2, url: 'https://www.highperformanceformat.com/2c59b270de9e21b57ad543e7b88c2e3f/invoke.js' },
        '300x50':  { name: 'Mobile Leaderboard', cpm: 1.5, url: 'https://www.highperformanceformat.com/ddb48e8829959135fea1323207677af1/invoke.js' }
      },
      
      // High-CPM Premium Ads
      premium: {
        video:      { name: 'Video Pre-roll', cpm: 8.5, url: 'vid_ad_url' },
        interstitial: { name: 'Full Screen', cpm: 6.0, url: 'inter_ad_url' },
        native:     { name: 'Native Feed', cpm: 4.5, url: 'https://pl29280287.profitablecpmratenetwork.com/1805a61f4f6c6177d946441e5153e81c/invoke.js' },
        rewarded:   { name: 'Rewarded Video', cpm: 12.0, url: 'reward_ad_url' }
      },
      
      // Interactive Ads (Higher Engagement = More Revenue)
      interactive: {
        quiz:       { name: 'Quiz Ad', cpm: 5.5, engage: 'high' },
        poll:       { name: 'Poll Ad', cpm: 4.0, engage: 'high' },
        game:       { name: 'Mini Game', cpm: 7.0, engage: 'very_high' },
        calculator: { name: 'Earn Calculator', cpm: 3.5, engage: 'medium' }
      }
    },
    
    // ═══════════════════════════════════════════════════════
    // 2. STRATEGIC PLACEMENT MAP — Where to Show What Ads
    // ═══════════════════════════════════════════════════════
    placements: {
      // Top Area (High Visibility)
      'top-banner':      { type: '728x90', rotate: true, interval: 30000 },
      'header-sticky':   { type: '320x50', rotate: true, interval: 45000 },
      
      // Feed Area (High Engagement)
      'feed-inline-1':   { type: 'native', cpm: 'high' },      // 1st ad in feed
      'feed-inline-3':   { type: '300x250', cpm: 'high' },     // 3rd post
      'feed-inline-5':   { type: 'video', cpm: 'premium' },    // 5th post
      'feed-inline-8':   { type: 'interactive', subtype: 'quiz' },
      'feed-inline-12':  { type: '300x600', cpm: 'very_high' }, // Large ad
      
      // Sidebar (Desktop only)
      'sidebar-top':     { type: '160x600', cpm: 'medium' },
      'sidebar-mid':   { type: '300x250', cpm: 'high' },
      
      // Between Sections
      'between-posts':   { type: 'native', every: 3 },  // Every 3 posts
      'story-ad':      { type: 'native', position: 'after_story' },
      
      // Bottom Area
      'bottom-banner':   { type: '728x90', rotate: true },
      'sticky-footer':   { type: '320x50', mobile: true },
      
      // Action-Based (Contextual)
      'post-create':     { type: 'native', trigger: 'before_post' },
      'after-like':      { type: 'interstitial', trigger: 'after_5_likes' },
      'before-withdraw': { type: 'rewarded', trigger: 'withdraw_request' },
      'idle-popup':      { type: 'interstitial', trigger: 'idle_2min' }
    },
    
    // ═══════════════════════════════════════════════════════
    // 3. ALL ADS ALL TIME — All Ad Types Always Active (Random Rotation)
    // ═══════════════════════════════════════════════════════
    allAdTypes: [
      'quiz', 'poll', 'game', 'calculator', 'native',
      'banner_300x250', 'banner_728x90', 'banner_160x600', 'banner_160x30', 'banner_468x60', 'banner_300x50',
      'video_offer', 'rewarded_offer', 'premium_offer',
      'interstitial', 'popunder_trigger', 'smartlink',
      'social_bar', 'native_feed', 'click_to_earn',
      'admob_banner', 'admob_interstitial', 'admob_rewarded', 'admob_native',
      'adsense_display'
    ],
    
    // ═══════════════════════════════════════════════════════
    // 4. AD ROTATION CONFIG — Constant Variation
    // ═══════════════════════════════════════════════════════
    rotationConfig: {
      interval: 30000,      // 30 seconds
      feedInterval: 3,      // Every 3 posts
      featureAdChance: 0.7, // 70% chance to show ad in any feature
      maxAdsPerSession: 100 // Maximum ads per session
    },
    
    sessionAds: [],
    adRotationTimer: null,
    
    // ═══════════════════════════════════════════════════════
    // CORE FUNCTIONS
    // ═══════════════════════════════════════════════════════
    
    // Get random ad type from all available types
    getRandomAdType() {
      return this.allAdTypes[Math.floor(Math.random() * this.allAdTypes.length)];
    },
    
    // Get multiple random ad types
    getRandomAdTypes(count) {
      const shuffled = [...this.allAdTypes].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    },
    
    // ═══════════════════════════════════════════════════════
    // PAGE-SPECIFIC AD TYPES — Different ads for different pages
    // ═══════════════════════════════════════════════════════
    
    // Get ad type based on page context
    getAdTypeForPage(pageName) {
      // Only use valid ad types that exist in allAdTypes
      const validAdTypes = {
        // Feed: Mix of interactive and native ads
        feed: ['native_feed', 'quiz', 'poll', 'banner_300x250', 'click_to_earn'],
        // Explore: Visual ads for discovery
        explore: ['native', 'banner_728x90', 'video_offer', 'banner_160x600'],
        // Profile: Personal/reward focused
        profile: ['rewarded_offer', 'premium_offer', 'native', 'game'],
        // Wallet: Financial/high CPM ads
        wallet: ['premium_offer', 'rewarded_offer', 'calculator', 'interstitial'],
        // Earn: Task-related ads
        earn: ['click_to_earn', 'quiz', 'poll', 'game', 'video_offer'],
        // Analytics: Professional ads
        analytics: ['banner_728x90', 'native', 'premium_offer'],
        // Gamification: Fun interactive ads
        gamification: ['game', 'quiz', 'poll', 'rewarded_offer'],
        // Chat: Non-intrusive native ads
        messages: ['native', 'banner_300x50', 'click_to_earn'],
        // Friends: Social ads
        friends: ['social_bar', 'native_feed', 'click_to_earn'],
        // NFT: Premium/crypto ads
        nft: ['premium_offer', 'banner_160x600', 'native', 'rewarded_offer'],
        // Metaverse: Immersive ads
        metaverse: ['video_offer', 'banner_728x90', 'game', 'interstitial'],
        // Apps: App promotion ads
        apps: ['native', 'banner_300x250', 'video_offer', 'click_to_earn']
      };
      
      const types = validAdTypes[pageName] || this.allAdTypes;
      // Safety check
      if (!types || types.length === 0) {
        return this.getRandomAdType();
      }
      return types[Math.floor(Math.random() * types.length)];
    },
    
    // Get ad type for specific modal
    getAdTypeForModal(modalId) {
      const modalAdTypes = {
        // Profile modals: Reward focused
        profileModal: ['rewarded_offer', 'premium_offer', 'native'],
        // Wallet modals: Financial ads
        walletModal: ['calculator', 'premium_offer', 'native'],
        // Settings: Non-intrusive
        settingsModal: ['native', 'banner_300x50'],
        // NFT modals: Premium
        nftModal: ['premium_offer', 'native', 'rewarded_offer'],
        // Generic fallback
        default: ['native', 'banner_300x250', 'click_to_earn']
      };
      
      const types = modalAdTypes[modalId] || modalAdTypes.default;
      return types[Math.floor(Math.random() * types.length)];
    },
    
    // Create diverse ad element
    createAdElement(type, options = {}) {
      const adEl = document.createElement('div');
      adEl.className = `ad-container ad-${type}`;
      adEl.style.cssText = 'margin:10px 0;padding:10px;background:var(--g2);border:1px solid var(--b1);border-radius:12px;overflow:hidden;';
      
      switch(type) {
        case 'quiz':
          adEl.innerHTML = `
            <div style="text-align:center;padding:15px;">
              <div style="font-size:24px;margin-bottom:8px;">🎯</div>
              <div style="font-weight:700;margin-bottom:10px;">Quick Quiz: Earn +5 pts!</div>
              <div style="font-size:13px;color:var(--t3);margin-bottom:12px;">Which crypto grew most in 2024?</div>
              <div style="display:flex;gap:8px;justify-content:center;">
                <button onclick="addPts(5,'Quiz Ad');this.closest('.ad-container').remove()" class="btn btn-p btn-sm">Bitcoin</button>
                <button onclick="addPts(5,'Quiz Ad');this.closest('.ad-container').remove()" class="btn btn-p btn-sm">Ethereum</button>
              </div>
            </div>`;
          break;
          
        case 'poll':
          adEl.innerHTML = `
            <div style="text-align:center;padding:15px;">
              <div style="font-size:20px;margin-bottom:8px;">📊</div>
              <div style="font-weight:700;margin-bottom:10px;">Quick Poll</div>
              <div style="font-size:12px;margin-bottom:12px;">What's your favorite feature?</div>
              <div style="display:flex;flex-direction:column;gap:6px;">
                <button onclick="addPts(3,'Poll Ad');this.closest('.ad-container').remove()" class="btn btn-ghost btn-sm">💰 Earning</button>
                <button onclick="addPts(3,'Poll Ad');this.closest('.ad-container').remove()" class="btn btn-ghost btn-sm">👥 Social</button>
                <button onclick="addPts(3,'Poll Ad');this.closest('.ad-container').remove()" class="btn btn-ghost btn-sm">🎮 Games</button>
              </div>
            </div>`;
          break;
          
        case 'calculator':
          adEl.innerHTML = `
            <div style="text-align:center;padding:15px;">
              <div style="font-size:20px;margin-bottom:8px;">🧮</div>
              <div style="font-weight:700;margin-bottom:10px;">Earnings Calculator</div>
              <div style="background:var(--bg);border-radius:8px;padding:10px;margin-bottom:10px;">
                <div style="font-size:11px;color:var(--t3);">If you refer 10 friends/month</div>
                <div style="font-size:24px;font-weight:800;color:var(--neon);">+$500</div>
              </div>
              <button onclick="nav('referral');addPts(2,'Calculator Ad')" class="btn btn-p btn-sm">Start Earning →</button>
            </div>`;
          break;
          
        case 'game':
          adEl.innerHTML = `
            <div style="text-align:center;padding:15px;">
              <div style="font-size:28px;margin-bottom:8px;">🎰</div>
              <div style="font-weight:700;margin-bottom:10px;">Spin & Win!</div>
              <div style="font-size:12px;color:var(--t3);margin-bottom:12px;">Watch ad to spin</div>
              <button onclick="watchAd();addPts(10,'Game Ad');this.closest('.ad-container').remove()" class="btn btn-neon btn-sm">🎲 Spin Now</button>
            </div>`;
          break;
          
        case 'native':
          // Standard native banner
          adEl.innerHTML = `
            <div style="display:flex;align-items:center;gap:12px;padding:10px;cursor:pointer;" onclick="window.open('https://www.profitablecpmratenetwork.com/qu1bqnynm6?key=d753b3018195910056f99110db5b614a','_blank');addPts(2,'Native Ad Click')">
              <div style="width:60px;height:60px;background:linear-gradient(135deg,var(--c1),var(--c2));border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:28px;">💎</div>
              <div style="flex:1;text-align:left;">
                <div style="font-weight:700;font-size:13px;">Premium Upgrade</div>
                <div style="font-size:11px;color:var(--t3);">2x earnings + exclusive features</div>
                <div style="font-size:10px;color:var(--neon);margin-top:4px;">Sponsored</div>
              </div>
              <div style="font-size:20px;">→</div>
            </div>`;
          break;
          
        case 'banner_300x250':
          adEl.innerHTML = `
            <div style="text-align:center;padding:10px;">
              <div style="font-size:9px;color:var(--t3);margin-bottom:4px;">Sponsored</div>
              <div style="width:300px;height:250px;background:linear-gradient(135deg,#667eea,#764ba2);margin:0 auto;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-direction:column;color:white;">
                <div style="font-size:36px;margin-bottom:8px;">💰</div>
                <div style="font-weight:800;font-size:16px;">Earn $500/Month</div>
                <div style="font-size:12px;margin:8px 0;">Join 10,000+ earners</div>
                <button onclick="nav('earn');addPts(5,'Banner Click')" class="btn btn-sm" style="background:white;color:#667eea;">Start Now</button>
              </div>
            </div>`;
          break;
          
        case 'banner_728x90':
          adEl.innerHTML = `
            <div style="text-align:center;padding:8px;">
              <div style="max-width:728px;height:90px;background:linear-gradient(90deg,var(--neon),var(--c2));margin:0 auto;border-radius:8px;display:flex;align-items:center;justify-content:center;gap:20px;color:white;padding:0 20px;">
                <span style="font-size:32px;">🚀</span>
                <span style="font-weight:700;font-size:14px;">Boost Earnings 2x with Premium!</span>
                <button onclick="nav('wallet')" class="btn btn-sm" style="background:white;color:var(--neon);">Upgrade</button>
              </div>
            </div>`;
          break;
          
        case 'video_offer':
          adEl.innerHTML = `
            <div style="text-align:center;padding:15px;background:linear-gradient(135deg,var(--g2),var(--dark));border-radius:12px;">
              <div style="font-size:32px;margin-bottom:8px;">🎬</div>
              <div style="font-weight:700;margin-bottom:8px;">Watch Video & Earn</div>
              <div style="font-size:12px;color:var(--t3);margin-bottom:12px;">30 sec video = +15 points</div>
              <button onclick="watchAd();addPts(15,'Video Offer');this.closest('.ad-container').remove()" class="btn btn-neon">▶ Watch Now</button>
            </div>`;
          break;
          
        case 'rewarded_offer':
          adEl.innerHTML = `
            <div style="text-align:center;padding:15px;background:linear-gradient(135deg,#ff6b6b,#ee5a6f);border-radius:12px;color:white;">
              <div style="font-size:32px;margin-bottom:8px;">🎁</div>
              <div style="font-weight:700;margin-bottom:8px;">Special Reward!</div>
              <div style="font-size:12px;margin-bottom:12px;">Complete offer & get +50 points</div>
              <button onclick="addPts(50,'Rewarded Offer');toast('s','+50 points!');this.closest('.ad-container').remove()" class="btn btn-sm" style="background:white;color:#ee5a6f;">Claim Reward</button>
            </div>`;
          break;
          
        case 'click_to_earn':
          adEl.innerHTML = `
            <div style="text-align:center;padding:12px;">
              <div style="font-size:11px;color:var(--neon);margin-bottom:8px;">👆 Click any button to earn points!</div>
              <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;">
                <button onclick="addPts(2,'Click Ad')" class="btn btn-p btn-sm">+2 pts</button>
                <button onclick="addPts(3,'Click Ad')" class="btn btn-o btn-sm">+3 pts</button>
                <button onclick="addPts(5,'Click Ad')" class="btn btn-neon btn-sm">+5 pts</button>
              </div>
            </div>`;
          break;
          
        case 'premium_offer':
          adEl.innerHTML = `
            <div style="text-align:center;padding:15px;border:2px solid var(--neon);border-radius:12px;">
              <div style="font-size:36px;margin-bottom:8px;">💎</div>
              <div style="font-weight:800;margin-bottom:8px;color:var(--neon);">PREMIUM MEMBER</div>
              <div style="font-size:12px;color:var(--t3);margin-bottom:12px;">✓ 2x Earnings ✓ Priority Withdraw ✓ No Ads</div>
              <button onclick="nav('wallet')" class="btn btn-neon">Upgrade $9.99/mo</button>
            </div>`;
          break;
          
        default:
          // Default native ad for unknown types
          adEl.innerHTML = `
            <div style="text-align:center;padding:15px;">
              <div style="font-size:28px;margin-bottom:8px;">📢</div>
              <div style="font-weight:700;margin-bottom:8px;">Special Offer</div>
              <button onclick="addPts(3,'Click Ad')" class="btn btn-neon btn-sm">+3 pts</button>
            </div>`;
          break;
      }
      
      return adEl;
    },
    
    // Insert ad at strategic position
    insertStrategicAd(position, type) {
      const container = document.getElementById(position) || document.querySelector(`[data-ad-position="${position}"]`);
      if (!container) return;
      
      const ad = this.createAdElement(type);
      container.appendChild(ad);
      
      // Track impression
      this.trackImpression(type, position);
    },
    
    // Dynamic feed ad insertion with variety - FEED SPECIFIC
    insertFeedAdVariety(index) {
      const feedList = document.getElementById('feedList');
      if (!feedList) return;
      
      // FEED-SPECIFIC AD TYPES — Use feed-appropriate ads
      const adType = this.getAdTypeForPage('feed');
      
      const adEl = this.createAdElement(adType);
      adEl.classList.add('feed-ad-insert');
      adEl.dataset.adIndex = index;
      
      // Insert into feed
      const posts = feedList.querySelectorAll('.post');
      if (posts[index] && posts[index].parentNode) {
        posts[index].parentNode.insertBefore(adEl, posts[index].nextSibling);
      }
      
      console.log('[FeedAd]', adType, 'inserted at position', index);
    },
    
    // Contextual ad trigger
    triggerContextualAd(triggerType) {
      const now = Date.now();
      const lastShown = localStorage.getItem(`ad_${triggerType}_last`);
      
      // Don't show same contextual ad within 5 minutes
      if (lastShown && (now - parseInt(lastShown)) < 300000) return;
      
      // CONTEXT-APPROPRIATE AD TYPES
      let adType;
      let message = '';
      
      switch(triggerType) {
        case 'before_post':
          adType = 'rewarded_offer';
          message = '📹 Complete this offer for +10 bonus points!';
          break;
        case 'after_like':
          adType = 'native';
          message = '💝 Thanks for engaging! Check out this offer:';
          break;
        case 'withdraw_request':
          adType = 'premium_offer';
          message = '🎁 Complete offer to get bonus points!';
          break;
        case 'idle_1min':
        case 'idle_2min':
          adType = 'game';
          message = '🎮 Still there? Play a quick game!';
          break;
        default:
          adType = this.getRandomAdType();
      }
      
      localStorage.setItem(`ad_${triggerType}_last`, now.toString());
      
      // Show contextual toast + ad
      if (message) toast('i', message);
      
      // Insert floating ad
      const floatAd = this.createAdElement(adType);
      floatAd.style.cssText += 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);width:90%;max-width:400px;z-index:9998;box-shadow:0 10px 40px rgba(0,0,0,0.5);';
      floatAd.classList.add('floating-contextual-ad');
      document.body.appendChild(floatAd);
      
      // Auto remove after 30 seconds
      setTimeout(() => floatAd.remove(), 30000);
    },
    
    // Track ad impression for analytics
    trackImpression(type, position) {
      const stats = JSON.parse(localStorage.getItem('ad_stats') || '{}');
      const key = `${type}_${position}`;
      stats[key] = (stats[key] || 0) + 1;
      localStorage.setItem('ad_stats', JSON.stringify(stats));
    },
    
    // Get ad performance report
    getPerformanceReport() {
      const stats = JSON.parse(localStorage.getItem('ad_stats') || '{}');
      return Object.entries(stats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    },
    
    // Inject floating ad randomly
    injectFloatingAd(adType) {
      const ad = this.createAdElement(adType);
      ad.style.cssText += 'position:fixed;bottom:100px;right:10px;width:320px;z-index:9997;animation:slideInRight 0.5s ease;box-shadow:0 10px 40px rgba(0,0,0,0.5);';
      ad.innerHTML += '<button onclick="this.parentElement.remove()" style="position:absolute;top:5px;right:5px;background:none;border:none;color:var(--t3);cursor:pointer;font-size:16px;">✕</button>';
      document.body.appendChild(ad);
      
      // Auto remove after 25 seconds
      setTimeout(() => ad.remove(), 25000);
      
      this.trackImpression(adType, 'floating');
    },
    
    // ═══════════════════════════════════════════════════════
    // AGGRESSIVE FEATURE ADS — Ads in Every Feature
    // ═══════════════════════════════════════════════════════
    injectFeatureAds() {
      // Hook into all major navigation functions
      const features = [
        { name: 'feed', fn: 'rFeed', adChance: 0.3 },
        { name: 'explore', fn: 'rExplore', adChance: 0.4 },
        { name: 'profile', fn: 'rProfile', adChance: 0.4 },
        { name: 'wallet', fn: 'rWallet', adChance: 0.5 },
        { name: 'earn', fn: 'rEarn', adChance: 0.4 },
        { name: 'analytics', fn: 'rAnalytics', adChance: 0.3 },
        { name: 'gamification', fn: 'rGamification', adChance: 0.3 },
        { name: 'messages', fn: 'rMessages', adChance: 0.4 },
        { name: 'friends', fn: 'rFriends', adChance: 0.3 },
        { name: 'nft', fn: 'rNFTMarketplace', adChance: 0.4 },
        { name: 'metaverse', fn: 'rMetaverse', adChance: 0.4 },
        { name: 'apps', fn: 'rAppsPage', adChance: 0.35 }
      ];
      
      features.forEach(feature => {
        const originalFn = window[feature.fn];
        if (originalFn) {
          window[feature.fn] = function(...args) {
            try {
              // Always call original first
              const result = originalFn.apply(this, args);
              
              // Inject ad with configured probability - use page-specific ad type
              if (Math.random() < feature.adChance) {
                setTimeout(() => {
                  try {
                    const adType = MAX_AD_SYSTEM.getAdTypeForPage(feature.name);
                    MAX_AD_SYSTEM.injectFeatureAd(feature.name, adType);
                  } catch(e) { /* Silent fail */ }
                }, 500);
              }
              
              return result;
            } catch(e) {
              // If ad system fails, still run original function
              return originalFn.apply(this, args);
            }
          };
        }
      });
      
      // Hook into modal openings (reduced frequency)
      const originalOpenModal = window.openModal;
      if (originalOpenModal) {
        window.openModal = function(modalId, ...args) {
          try {
            const result = originalOpenModal.apply(this, [modalId, ...args]);
            
            // Skip ads on Create Post modal - too intrusive
            if (modalId === 'postModal') {
              return result;
            }
            
            // 20% chance to show ad when opening other modals
            if (Math.random() < 0.2) {
              setTimeout(() => {
                try {
                  const adType = MAX_AD_SYSTEM.getAdTypeForModal(modalId);
                  MAX_AD_SYSTEM.injectModalAd(modalId, adType);
                } catch(e) { /* Silent fail */ }
              }, 300);
            }
            
            return result;
          } catch(e) {
            // If ad system fails, still open modal
            return originalOpenModal.apply(this, [modalId, ...args]);
          }
        };
      }
      
      console.log('[FeatureAds] Injected into', features.length, 'features + modals');
    },
    
    // Inject ad into specific feature page
    injectFeatureAd(featureName, adType) {
      try {
        const pageId = 'pg-' + featureName;
        const page = document.getElementById(pageId);
        if (!page) return;
        
        // Check if ad already exists
        if (page.querySelector('.feature-ad-injected')) return;
        
        const ad = this.createAdElement(adType);
        // Safety check - if ad creation failed, skip
        if (!ad) {
          console.warn('[FeatureAd] Failed to create ad element:', adType);
          return;
        }
        
        ad.classList.add('feature-ad-injected');
        ad.style.cssText += 'margin:10px;border-radius:12px;animation:fadeIn 0.5s ease;';
        
        // Insert at top of page content
        const firstChild = page.firstElementChild;
        if (firstChild) {
          page.insertBefore(ad, firstChild);
        } else {
          page.appendChild(ad);
        }
        
        this.trackImpression(adType, featureName);
        console.log('[FeatureAd] Injected', adType, 'into', featureName);
      } catch(e) {
        console.error('[FeatureAd] Error injecting ad:', e);
      }
    },
    
    // Inject ad into modal
    injectModalAd(modalId, adType) {
      try {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        // Check if ad already exists
        if (modal.querySelector('.modal-ad-injected')) return;
        
        const ad = this.createAdElement(adType);
        // Safety check - if ad creation failed, skip
        if (!ad) {
          console.warn('[ModalAd] Failed to create ad element:', adType);
          return;
        }
        
        ad.classList.add('modal-ad-injected');
        ad.style.cssText += 'margin:10px 0;border-radius:12px;';
        
        // Insert after modal header or at top
        const header = modal.querySelector('.modal-header, .mHead, h2, .modal-title');
        if (header && header.nextSibling) {
          modal.insertBefore(ad, header.nextSibling);
        } else {
          modal.insertBefore(ad, modal.firstChild);
        }
        
        this.trackImpression(adType, 'modal_' + modalId);
        console.log('[ModalAd] Injected', adType, 'into', modalId);
      } catch(e) {
        console.error('[ModalAd] Error injecting ad:', e);
      }
    },
    
    // Start the MAX system
    start() {
      console.log('[MAX AD SYSTEM] Starting ALL-TIME-ALL-ADS rotation...');
      
      // 1. CONSTANT AD ROTATION — New ad every 30 seconds
      this.adRotationTimer = setInterval(() => {
        const randomAd = this.getRandomAdType();
        console.log('[MAX AD] Random ad selected:', randomAd);
        
        // Occasionally inject floating ad
        if (Math.random() > 0.5) {
          this.injectFloatingAd(randomAd);
        }
      }, this.rotationConfig.interval);
      
      // 2. Feed ad injection — Various ads every 3 posts
      let feedObserver = new MutationObserver((mutations) => {
        const feedList = document.getElementById('feedList');
        if (feedList && feedList.children.length > 0) {
          [3, 6, 9, 12, 15, 18, 21, 24].forEach(pos => {
            if (feedList.children[pos] && !feedList.querySelector(`[data-ad-index="${pos}"]`)) {
              this.insertFeedAdVariety(pos);
            }
          });
        }
      });
      
      const feedList = document.getElementById('feedList');
      if (feedList) {
        feedObserver.observe(feedList, { childList: true, subtree: true });
      }
      
      // 3. AGGRESSIVE FEATURE ADS — Ads in every feature
      this.injectFeatureAds();
      
      // 4. Idle detection (reduced to 1 min for more ads)
      let idleTimer;
      const resetIdle = () => {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          this.triggerContextualAd('idle_1min');
        }, 60000); // 1 minute
      };
      
      ['click', 'scroll', 'mousemove', 'keydown'].forEach(evt => {
        document.addEventListener(evt, resetIdle);
      });
      resetIdle();
      
      // 5. Reaction counter — every 10 reactions (reduced frequency)
      let reactCount = 0;
      const originalReact = window.react;
      window.react = function(...args) {
        try {
          reactCount++;
          if (reactCount % 10 === 0) {
            setTimeout(() => {
              try {
                MAX_AD_SYSTEM.triggerContextualAd('after_like');
              } catch(e) { /* Silent fail */ }
            }, 100);
          }
          return originalReact?.apply(this, args);
        } catch(e) {
          return originalReact?.apply(this, args);
        }
      };
      
      console.log('[MAX AD SYSTEM] Active — ALL ADS, ALL TIME, ALL FEATURES!');
      
      // 5. CHAT ADS — Native ads between messages (reduced frequency)
      this.initChatAds();
      
      // 6. PROFILE ADS — Ads on profile visit (reduced frequency)
      this.initProfileAds();
      
      // 7. POPUNDER — Hidden Revenue (reduced frequency)
      this.initPopunder();
      
      // 12. SOCIAL BAR — Floating Social Ad
      this.initSocialBar();
      
      // 13. AdMob & AdSense Auto-refresh
      this.initAdNetworkRefresh();
      
      // 14. NOTIFICATION ADS — Push notifications with offers
      this.initNotificationAds();
      
      // 15. ENHANCED FEED ADS — Various ads every 3 posts
      this.initEnhancedFeedAds();
    },
    
    // ═══════════════════════════════════════════════════════
    // SCROLL-BASED ADS — New ad on scroll down
    // ═══════════════════════════════════════════════════════
    initScrollBasedAds() {
      let lastScrollY = 0;
      let scrollAdCount = 0;
      
      window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const scrollDiff = currentScrollY - lastScrollY;
        
        // Every 800px scroll down, show new ad
        if (scrollDiff > 800) {
          scrollAdCount++;
          lastScrollY = currentScrollY;
          
          // Create floating scroll ad
          const scrollAd = this.createAdElement(['quiz', 'poll', 'game', 'native'][scrollAdCount % 4]);
          scrollAd.style.cssText += 'position:fixed;bottom:100px;right:10px;width:300px;z-index:9997;animation:slideIn 0.5s ease;';
          scrollAd.innerHTML += '<button onclick="this.parentElement.remove()" style="position:absolute;top:5px;right:5px;background:none;border:none;color:var(--t3);cursor:pointer;">✕</button>';
          document.body.appendChild(scrollAd);
          
          // Auto remove after 20 seconds
          setTimeout(() => scrollAd.remove(), 20000);
          
          console.log('[ScrollAd] Shown at scroll:', currentScrollY);
        }
      }, { passive: true });
      
      console.log('[ScrollAd] Initialized — Every 800px scroll');
    },
    
    // ═══════════════════════════════════════════════════════
    // PULL-TO-REFRESH ADS — Full-screen ad on refresh
    // ═══════════════════════════════════════════════════════
    initPullToRefreshAds() {
      let touchStartY = 0;
      let isRefreshing = false;
      
      document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
      }, { passive: true });
      
      document.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchEndY - touchStartY;
        
        // Pull down more than 150px at top of page
        if (diff > 150 && window.scrollY < 50 && !isRefreshing) {
          isRefreshing = true;
          
          // Show interstitial ad
          this.showInterstitialAd();
          
          setTimeout(() => { isRefreshing = false; }, 5000);
        }
      }, { passive: true });
      
      // Also on actual page reload
      window.addEventListener('beforeunload', () => {
        this.triggerPopunder();
      });
      
      console.log('[PullToRefresh] Initialized');
    },
    
    // Show full-screen interstitial
    showInterstitialAd() {
      const interstitial = document.createElement('div');
      interstitial.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:10000;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;';
      interstitial.innerHTML = `
        <div style="text-align:center;color:white;max-width:400px;">
          <div style="font-size:48px;margin-bottom:20px;">📱</div>
          <div style="font-size:20px;font-weight:700;margin-bottom:15px;">Sponsored Content</div>
          <div style="font-size:14px;margin-bottom:20px;opacity:0.8;">Premium offers just for you!</div>
          <div id="interstitialAdSlot" style="min-height:250px;background:var(--g2);border-radius:12px;margin-bottom:20px;display:flex;align-items:center;justify-content:center;">
            <div style="padding:20px;text-align:center;">
              <div style="font-size:32px;margin-bottom:10px;">💎</div>
              <div style="font-weight:700;">Premium Upgrade</div>
              <div style="font-size:12px;margin:10px 0;">2x Earnings + Priority Support</div>
              <button onclick="nav('wallet');this.closest('#interstitialOverlay').remove()" class="btn btn-neon">Upgrade Now</button>
            </div>
          </div>
          <button onclick="this.closest('#interstitialOverlay').remove();addPts(3,'Ad Skip')" style="background:none;border:1px solid rgba(255,255,255,0.3);color:white;padding:8px 20px;border-radius:99px;cursor:pointer;">Skip Ad (+3 pts)</button>
        </div>
      `;
      interstitial.id = 'interstitialOverlay';
      document.body.appendChild(interstitial);
      
      // Auto close after 15 seconds
      setTimeout(() => interstitial.remove(), 15000);
      
      console.log('[Interstitial] Full-screen ad shown');
    },
    
    // ═══════════════════════════════════════════════════════
    // NOTIFICATION ADS — Push notification offers
    // ═══════════════════════════════════════════════════════
    initNotificationAds() {
      // Request permission on user interaction
      const requestNotifPermission = () => {
        if ('Notification' in window && Notification.permission === 'default') {
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              console.log('[NotificationAds] Permission granted');
              this.scheduleNotificationAds();
            }
          });
        }
      };
      
      // Ask on first click anywhere
      document.addEventListener('click', requestNotifPermission, { once: true });
      
      console.log('[NotificationAds] Initialized');
    },
    
    scheduleNotificationAds() {
      const notifs = [
        { title: '🎁 Daily Bonus!', body: 'Claim your free 50 points now!', action: 'claimBonus()' },
        { title: '💰 High CPM Offer', body: 'Watch video & earn 20 points', action: 'watchAd()' },
        { title: '👥 Referral Bonus', body: 'Invite friends & earn 100 pts each', action: "openModal('refModal')" },
        { title: '📊 Your Stats', body: 'Check your earnings dashboard', action: "nav('analytics')" },
        { title: '🔥 Trending', body: 'New NFT drops available now!', action: "nav('nft')" }
      ];
      
      // Send notification every 10 minutes (if permitted)
      setInterval(() => {
        if (Notification.permission === 'granted' && document.hidden) {
          const notif = notifs[Math.floor(Math.random() * notifs.length)];
          const n = new Notification(notif.title, {
            body: notif.body,
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            tag: 'ad-' + Date.now()
          });
          n.onclick = () => { eval(notif.action); n.close(); };
        }
      }, 600000); // Every 10 minutes
    },
    
    // ═══════════════════════════════════════════════════════
    // CHAT ADS — Native ads between messages
    // ═══════════════════════════════════════════════════════
    initChatAds() {
      const chatList = document.getElementById('chatList');
      if (!chatList) return;
      
      // Insert ad after every 4th message
      const chatObserver = new MutationObserver((mutations) => {
        const msgs = chatList.querySelectorAll('.chat-msg');
        if (msgs.length > 0 && msgs.length % 4 === 0) {
          const lastMsg = msgs[msgs.length - 1];
          if (lastMsg && !lastMsg.nextElementSibling?.classList?.contains('chat-ad')) {
            const chatAd = this.createAdElement('native');
            chatAd.classList.add('chat-ad');
            chatAd.style.cssText += 'margin:10px 0;transform:scale(0.95);opacity:0.9;';
            chatAd.innerHTML = '<div style="font-size:9px;color:var(--neon);text-align:center;margin-bottom:5px;">─ Sponsored ─</div>' + chatAd.innerHTML;
            lastMsg.parentNode.insertBefore(chatAd, lastMsg.nextSibling);
          }
        }
      });
      
      chatObserver.observe(chatList, { childList: true, subtree: true });
      console.log('[ChatAds] Initialized — Every 4 messages');
    },
    
    // ═══════════════════════════════════════════════════════
    // PROFILE ADS — Premium profile ad placement
    // ═══════════════════════════════════════════════════════
    initProfileAds() {
      // Only override if rProfile exists
      if (typeof window.rProfile !== 'function') {
        console.warn('[ProfileAds] rProfile not found, skipping ad injection');
        return;
      }
      
      // Override rProfile to add ads
      const originalRProfile = window.rProfile;
      window.rProfile = function() {
        try {
          // Call original function
          originalRProfile.apply(this, arguments);
        } catch(e) {
          console.error('[ProfileAds] Error in original rProfile:', e);
        }
        
        // Add premium profile ad
        setTimeout(() => {
          try {
            const profilePage = document.getElementById('pg-profile');
            if (profilePage && !profilePage.querySelector('.profile-ad')) {
              const adType = ['native', 'quiz', 'calculator'][Math.floor(Math.random() * 3)];
              const profileAd = this.createAdElement(adType);
              if (profileAd) {
                profileAd.classList.add('profile-ad');
                profileAd.style.cssText += 'margin:15px;border-radius:12px;';
                
                const coverWrap = profilePage.querySelector('.cover-wrap');
                if (coverWrap && coverWrap.parentNode) {
                  coverWrap.parentNode.insertBefore(profileAd, coverWrap.nextSibling);
                }
              }
            }
          } catch(e) {
            console.error('[ProfileAds] Error adding profile ad:', e);
          }
        }, 100);
      }.bind(this);
      
      console.log('[ProfileAds] Initialized');
    },
    
    // ═══════════════════════════════════════════════════════
    // STORY ADS — Ads in stories
    // ═══════════════════════════════════════════════════════
    initStoryAds() {
      // Add ad in story row (after My Story)
      const storyRow = document.getElementById('storyRow');
      if (storyRow) {
        const storyAd = document.createElement('div');
        storyAd.className = 'story-item story-ad-item';
        storyAd.innerHTML = `
          <div class="story-ring" style="background:linear-gradient(135deg,#ff6b6b,#ee5a6f);" onclick="MAX_AD_SYSTEM.showStoryAd()">
            <div class="av" style="font-size:20px;">💰</div>
          </div>
          <div class="story-nm" style="font-size:10px;color:var(--neon);">Sponsored</div>
        `;
        
        // Insert as 2nd item (after My Story)
        if (storyRow.children.length > 1) {
          storyRow.insertBefore(storyAd, storyRow.children[1]);
        }
      }
      
      console.log('[StoryAds] Initialized');
    },
    
    showStoryAd() {
      const storyOverlay = document.createElement('div');
      storyOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg,var(--c1),var(--c2));z-index:10000;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;';
      storyOverlay.innerHTML = `
        <div style="text-align:center;color:white;">
          <div style="font-size:64px;margin-bottom:20px;">💎</div>
          <div style="font-size:24px;font-weight:800;margin-bottom:15px;">Premium Story</div>
          <div style="font-size:16px;margin-bottom:30px;opacity:0.9;">Upgrade to Premium for 2x Earnings!</div>
          <button onclick="nav('wallet');this.parentElement.parentElement.remove()" class="btn btn-neon" style="margin-bottom:15px;">Upgrade Now</button>
          <div style="font-size:12px;opacity:0.7;cursor:pointer;" onclick="addPts(5,'Story Ad View');this.parentElement.parentElement.remove()">👆 Tap to earn +5 pts</div>
        </div>
        <div style="position:absolute;top:20px;right:20px;cursor:pointer;font-size:24px;" onclick="this.parentElement.remove()">✕</div>
      `;
      document.body.appendChild(storyOverlay);
      
      // Auto close after 10 seconds
      setTimeout(() => storyOverlay.remove(), 10000);
    },
    
    // ═══════════════════════════════════════════════════════
    // POPUNDER — Hidden Revenue
    // ═══════════════════════════════════════════════════════
    initPopunder() {
      let popunderTriggered = false;
      
      // Trigger on first click
      document.addEventListener('click', () => {
        if (!popunderTriggered) {
          popunderTriggered = true;
          setTimeout(() => this.triggerPopunder(), 2000);
        }
      }, { once: true });
      
      // Also trigger every 10-15 minutes
      setInterval(() => {
        if (Math.random() > 0.5 && document.hidden) {
          this.triggerPopunder();
        }
      }, 600000 + Math.random() * 300000);
      
      console.log('[Popunder] Initialized');
    },
    
    triggerPopunder() {
      const urls = [
        'https://www.profitablecpmratenetwork.com/qu1bqnynm6?key=d753b3018195910056f99110db5b614a',
        'https://pl29280284.profitablecpmratenetwork.com/25/1b/0c/251b0cf69cbb4dec0e2e5d4397f5e56f.js'
      ];
      const url = urls[Math.floor(Math.random() * urls.length)];
      
      // Open in background tab
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      console.log('[Popunder] Triggered');
    },
    
    // ═══════════════════════════════════════════════════════
    // SMARTLINK — Auto-Redirect Ad
    // ═══════════════════════════════════════════════════════
    initSmartlink() {
      // Hidden iframe for smartlink
      const smartlinkIframe = document.createElement('iframe');
      smartlinkIframe.style.cssText = 'position:fixed;bottom:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;';
      smartlinkIframe.src = 'https://www.profitablecpmratenetwork.com/qu1bqnynm6?key=d753b3018195910056f99110db5b614a';
      document.body.appendChild(smartlinkIframe);
      
      // Refresh every 5 minutes
      setInterval(() => {
        smartlinkIframe.src = smartlinkIframe.src.replace(/&_=[0-9]+/, '') + '&_=' + Date.now();
      }, 300000);
      
      console.log('[Smartlink] Initialized');
    },
    
    // ═══════════════════════════════════════════════════════
    // SOCIAL BAR — Floating Social Ad
    // ═══════════════════════════════════════════════════════
    initSocialBar() {
      const socialBar = document.createElement('div');
      socialBar.id = 'socialBarAd';
      socialBar.style.cssText = 'position:fixed;bottom:140px;right:10px;width:60px;height:60px;background:linear-gradient(135deg,#ff6b6b,#ee5a6f);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:499;box-shadow:0 4px 15px rgba(238,90,111,0.4);animation:pulse 2s infinite;';
      socialBar.innerHTML = '<span style="font-size:24px;">🔥</span>';
      
      socialBar.onclick = () => {
        addPts(3,'Social Bar Click');
        window.open('https://www.profitablecpmratenetwork.com/qu1bqnynm6?key=d753b3018195910056f99110db5b614a', '_blank');
      };
      
      document.body.appendChild(socialBar);
      
      // Add pulse animation
      const style = document.createElement('style');
      style.textContent = `@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}`;
      document.head.appendChild(style);
      
      console.log('[SocialBar] Initialized');
    },
    
    // ═══════════════════════════════════════════════════════
    // AdMob & AdSense Auto-Refresh
    // ═══════════════════════════════════════════════════════
    initAdNetworkRefresh() {
      // Refresh AdSense every 3 minutes
      setInterval(() => {
        if (typeof adsbygoogle !== 'undefined') {
          try {
            adsbygoogle.push({});
            console.log('[AdSense] Refreshed');
          } catch(e) {}
        }
      }, 180000);
      
      // Simulate AdMob refresh
      setInterval(() => {
        document.querySelectorAll('.admob-slot').forEach(slot => {
          slot.style.opacity = '0.5';
          setTimeout(() => slot.style.opacity = '1', 500);
        });
        console.log('[AdMob] Slots refreshed');
      }, 240000);
      
      console.log('[AdNetworks] Auto-refresh initialized');
    }
  };
  
  // Make globally available
  window.MAX_AD_SYSTEM = MAX_AD_SYSTEM;
  
  // Auto-start
  if (document.readyState === 'complete') {
    MAX_AD_SYSTEM.start();
  } else {
    window.addEventListener('load', () => MAX_AD_SYSTEM.start());
  }
})();

// ═══════════════════════════════════════════════════════════
// LEGACY AD ROTATOR (for compatibility)
// ═══════════════════════════════════════════════════════════
(function(){
  const adRotator = {
    bannerMessages: [
      { text: "🚀 Earn 500 Points Daily!", action: "nav('earn')" },
      { text: "💎 Upgrade to Premium Today!", action: "openModal('subModal')" },
      { text: "🔥 New NFTs Available!", action: "nav('explore')" },
      { text: "📱 Download Our App!", action: "toast('i','App coming soon!')" },
      { text: "🎯 Complete Tasks & Earn!", action: "nav('earn')" },
      { text: "💰 Refer Friends = 100 pts each!", action: "openModal('refModal')" },
      { text: "⚡ Fast Withdrawals Enabled!", action: "openModal('withdrawModal')" },
      { text: "🎮 Play Games & Earn Points!", action: "nav('meta')" },
      { text: "📊 View Your Stats!", action: "nav('stats')" },
      { text: "👥 Connect with Friends!", action: "nav('friends')" }
    ],
    
    currentIndex: 0,
    
    rotateBannerMessage() {
      const baT = document.getElementById('baT');
      if (!baT) return;
      const msg = this.bannerMessages[this.currentIndex % this.bannerMessages.length];
      baT.style.transition = 'opacity 0.5s';
      baT.style.opacity = '0';
      setTimeout(() => {
        baT.innerHTML = `<span onclick="${msg.action}" style="cursor:pointer;text-decoration:underline;">${msg.text}</span>`;
        baT.style.opacity = '1';
      }, 500);
      this.currentIndex++;
    },
    
    start() {
      setInterval(() => this.rotateBannerMessage(), 30000);
    }
  };
  
  window.adRotator = adRotator;
  adRotator.start();
})();

// ═══════════════════════════════════════════════════════════
// BLOCK EXTERNAL PUSH NOTIFICATIONS & POPUPS (Safe Mode)
// ═══════════════════════════════════════════════════════════
(function(){
  // Only block specific known ad patterns, not app features
  document.addEventListener('DOMContentLoaded', function() {
    const removeBadElements = () => {
      // Aggressive selectors for external ads
      const selectors = [
        '[class*="memecoin"]',
        '[id*="memecoin"]',
        '[class*="adzilla"]',
        '[id*="adzilla"]',
        '[class*="huge"]',
        '.psn-notification',
        '.push-banner',
        '.notification-banner',
        'iframe[src*="notification"]',
        'iframe[src*="memecoin"]',
        'div[style*="z-index: 999999"]'
      ];
      
      selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
          const text = el.textContent.toLowerCase();
          // Aggressively block memecoin and adzilla ads
          if (text.includes('memecoin') ||
              text.includes('adzilla') ||
              text.includes('monster') ||
              text.includes('huge') ||
              el.innerHTML.includes('memecoin') ||
              el.innerHTML.includes('adzilla') ||
              el.className.includes('memecoin') ||
              el.className.includes('adzilla')) {
            el.style.display = 'none !important';
            el.remove();
            console.log('[AdBlocker] Blocked:', el.className || el.id);
          }
        });
      });
    };
    
    // Run immediately and frequently to block ads
    removeBadElements();
    setTimeout(removeBadElements, 1000);
    setInterval(removeBadElements, 3000);
  });
  
  console.log('[AdBlocker] External memecoin ads blocked (safe mode)');
})();

// ═══════════════════════════════════════════════════════════════════
// BOTTOM NAVIGATION EMERGENCY FIX
// Ensure bottom nav buttons are always clickable
// ═══════════════════════════════════════════════════════════════════
(function() {
  function fixBottomNav() {
    const btmNav = document.getElementById('btmNav');
    if (!btmNav) {
      console.error('[EmergencyFix] btmNav not found!');
      return;
    }
    
    // Ensure high z-index and pointer events
    btmNav.style.cssText = 'position:fixed !important;bottom:0 !important;left:0 !important;right:0 !important;z-index:99999 !important;pointer-events:auto !important;display:flex !important;';
    
    const buttons = btmNav.querySelectorAll('.bn');
    console.log('[EmergencyFix] Found', buttons.length, 'buttons');
    
    buttons.forEach(function(btn) {
      const page = btn.getAttribute('data-p');
      if (!page) return;
      
      // Ensure button is clickable
      btn.style.cssText = 'cursor:pointer !important;pointer-events:auto !important;position:relative !important;z-index:99999 !important;flex:1 !important;display:flex !important;flex-direction:column !important;align-items:center !important;justify-content:center !important;';
      
      // Add click handler
      btn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('[EmergencyFix] Navigating to:', page);
        if (typeof nav === 'function') {
          try {
            nav(page);
            console.log('[EmergencyFix] nav() called successfully for', page);
          } catch(err) {
            console.error('[EmergencyFix] nav() error:', err);
          }
        } else {
          console.error('[EmergencyFix] nav() not found!');
        }
        return false;
      };
      
      // Ensure child elements don't block clicks
      btn.querySelectorAll('*').forEach(function(child) {
        child.style.pointerEvents = 'none';
      });
    });
    
    console.log('[EmergencyFix] Bottom nav fixed,', buttons.length, 'buttons clickable');
  }
  
  // Run immediately and periodically
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixBottomNav);
  } else {
    fixBottomNav();
  }
  setTimeout(fixBottomNav, 500);
  setTimeout(fixBottomNav, 1000);
  setTimeout(fixBottomNav, 2000);
})();

// ═══════════════════════════════════════════════════════════════════
// GLOBAL ERROR HANDLER
// ═══════════════════════════════════════════════════════════════════
window.onerror = function(msg, url, line, col, error) {
  console.error('[GlobalError]', msg, 'at line', line, 'col', col);
  return false;
};

// Debug: Check if all required functions exist
console.log('[Debug] nav exists:', typeof nav === 'function');
console.log('[Debug] rAppsPage exists:', typeof rAppsPage === 'function');
console.log('[Debug] rGamification exists:', typeof rGamification === 'function');
console.log('[Debug] rProfile exists:', typeof rProfile === 'function');
console.log('[Debug] rSettings exists:', typeof rSettings === 'function');

// ═══════════════════════════════════════════════════════════
// SYSTEM VALIDATION - Check All Functions Working
// ═══════════════════════════════════════════════════════════
(function(){
  window.validateSystem = function() {
    console.log('🔍 [SystemCheck] Starting full system validation...');
    
    const checks = {
      // Navigation Functions
      nav: typeof nav === 'function',
      initBottomNav: typeof initBottomNav === 'function',
      
      // Page Render Functions
      rFeed: typeof rFeed === 'function',
      rExplore: typeof rExplore === 'function',
      rEarn: typeof rEarn === 'function',
      rFriends: typeof rFriends === 'function',
      rWallet: typeof rWallet === 'function',
      rMessages: typeof rMessages === 'function',
      rAppsPage: typeof rAppsPage === 'function',
      rNFTMarketplace: typeof rNFTMarketplace === 'function',
      rMetaverse: typeof rMetaverse === 'function',
      rAnalytics: typeof rAnalytics === 'function',
      rGamification: typeof rGamification === 'function',
      rProfile: typeof rProfile === 'function',
      rSettings: typeof rSettings === 'function',
      
      // Core Functions
      rStories: typeof rStories === 'function',
      rNotif: typeof rNotif === 'function',
      rLeaderboard: typeof rLeaderboard === 'function',
      rReferral: typeof rReferral === 'function',
      rAdmin: typeof rAdmin === 'function',
      
      // Ad System
      MAX_AD_SYSTEM: typeof MAX_AD_SYSTEM !== 'undefined',
      adRotator: typeof adRotator !== 'undefined',
      
      // Utilities
      toast: typeof toast === 'function',
      addPts: typeof addPts === 'function',
      syncUI: typeof syncUI === 'function',
      saveData: typeof saveData === 'function',
      openModal: typeof openModal === 'function',
      closeModal: typeof closeModal === 'function',
      nav: typeof nav === 'function'
    };
    
    let passed = 0, failed = 0;
    Object.entries(checks).forEach(([name, ok]) => {
      if(ok) {
        console.log(`✅ ${name}`);
        passed++;
      } else {
        console.error(`❌ ${name} NOT FOUND`);
        failed++;
      }
    });
    
    console.log(`\n📊 [SystemCheck] Results: ${passed} passed, ${failed} failed`);
    console.log(failed === 0 ? '🎉 All systems operational!' : '⚠️ Some functions missing');
    
    return { passed, failed, total: passed + failed };
  };
  
  console.log('✅ [SystemCheck] Validation ready. Run validateSystem() to check all functions.');
})();

// ═══════════════════════════════════════════════════════════════════
// WEBSITE SPEED OPTIMIZATION
// ═══════════════════════════════════════════════════════════════════
(function() {
  // 1. Lazy load images with better performance
  const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, { 
      rootMargin: '100px',
      threshold: 0.1
    });
    
    images.forEach(img => imageObserver.observe(img));
  };
  
  // 2. Optimize post rendering with virtual scrolling
  let postVirtualScroll = {
    container: null,
    items: [],
    visibleStart: 0,
    visibleEnd: 20,
    itemHeight: 300,
    buffer: 5,
    
    init(container) {
      this.container = container;
      this.setupScrollListener();
      this.renderVisible();
    },
    
    setupScrollListener() {
      let ticking = false;
      this.container.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            this.updateVisibleRange();
            this.renderVisible();
            ticking = false;
          });
          ticking = true;
        }
      });
    },
    
    updateVisibleRange() {
      const scrollTop = this.container.scrollTop;
      const containerHeight = this.container.clientHeight;
      
      this.visibleStart = Math.max(0, Math.floor(scrollTop / this.itemHeight) - this.buffer);
      this.visibleEnd = Math.min(this.items.length, Math.ceil((scrollTop + containerHeight) / this.itemHeight) + this.buffer);
    },
    
    renderVisible() {
      // Implementation for virtual scrolling would go here
      // For now, just ensure we don't render too many posts at once
      const posts = document.querySelectorAll('.post');
      if (posts.length > 50) {
        for (let i = 50; i < posts.length; i++) {
          posts[i].style.display = 'none';
        }
      }
    }
  };
  
  // 3. Cache DOM queries
  const cache = new Map();
  function G(id) {
    if (cache.has(id)) return cache.get(id);
    const element = document.getElementById(id);
    if (element) cache.set(id, element);
    return element;
  }
  
  // 4. Debounce expensive operations
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // 5. Optimize feed rendering
  const optimizedRenderFeed = debounce(() => {
    if (typeof rFeed === 'function') {
      rFeed(false);
    }
  }, 100);
  
  // 6. Preload critical resources
  const preloadCritical = () => {
    const criticalImages = document.querySelectorAll('img[data-critical]');
    criticalImages.forEach(img => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = img.dataset.src;
      document.head.appendChild(link);
    });
  };
  
  // 2. Debounce function for scroll/resize events
  window.debounce = function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  // 3. Throttle function for high-frequency events
  window.throttle = function(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };
  
  // 4. Optimized scroll handler
  let ticking = false;
  window.optimizedScroll = function(callback) {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  };
  
  // 5. Preload critical resources
  const preloadResources = () => {
    const criticalResources = [
      '/fonts/inter.woff2',
      '/fonts/jetbrains.woff2'
    ];
    criticalResources.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = 'font';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  };
  
  // 6. Cache frequently accessed DOM elements
  window.DOMCache = {
    elements: {},
    get(id) {
      if (!this.elements[id]) {
        this.elements[id] = document.getElementById(id);
      }
      return this.elements[id];
    },
    clear() {
      this.elements = {};
    }
  };
  
  // Override G function to use cache
  const originalG = window.G;
  window.G = function(id) {
    return window.DOMCache.get(id) || originalG(id);
  };
  
  // 7. Virtual scrolling for long lists
  window.VirtualScroll = {
    itemHeight: 100,
    container: null,
    totalItems: 0,
    visibleItems: 10,
    scrollTop: 0,
    init(container, totalItems, renderFn) {
      this.container = container;
      this.totalItems = totalItems;
      this.renderFn = renderFn;
      this.setup();
    },
    setup() {
      if (!this.container) return;
      this.container.style.overflow = 'auto';
      this.container.style.position = 'relative';
      this.update();
      this.container.addEventListener('scroll', window.throttle(() => this.update(), 16));
    },
    update() {
      if (!this.container) return;
      this.scrollTop = this.container.scrollTop;
      const startIdx = Math.floor(this.scrollTop / this.itemHeight);
      const endIdx = Math.min(startIdx + this.visibleItems, this.totalItems);
      this.renderFn(startIdx, endIdx);
    }
  };
  
  // 8. Batch DOM updates
  window.batchDOMUpdates = function(updates) {
    requestAnimationFrame(() => {
      updates.forEach(update => update());
    });
  };
  
  // 9. Compress images before upload
  window.compressImage = function(dataUrl, maxWidth = 1200, quality = 0.8) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = dataUrl;
    });
  };
  
  // Initialize optimizations when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      lazyLoadImages();
      preloadResources();
    });
  } else {
    lazyLoadImages();
    preloadResources();
  }
  
  console.log('[SpeedOpt] Website optimizations loaded');
})();
