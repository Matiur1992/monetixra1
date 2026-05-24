/**
 * ════════════════════════════════════════════════════════════
 * MONETIXRA — Integration Examples
 * How to integrate advanced post interactions in existing code
 * ════════════════════════════════════════════════════════════
 */

'use strict';

// ═══════════════════════════════════════════════════════════════
// 1. INTEGRATING ENHANCED POSTS INTO FEED
// ═══════════════════════════════════════════════════════════════

// Modify your existing feed rendering function
function renderFeedPost(post) {
  // Use the enhanced post renderer from advanced-post-interactions.js
  const postElement = enhancedInteractions.renderPost(post, getCurrentUser().id);
  return postElement;
}

// Load feed with enhanced posts
async function loadFeedWithEnhancedPosts() {
  const feedContainer = document.getElementById('feedList');
  const posts = await fetchFeedPosts(); // Your existing API call

  posts.forEach(post => {
    const postEl = renderFeedPost(post);
    feedContainer.appendChild(postEl);
  });
}

// ═══════════════════════════════════════════════════════════════
// 2. CREATING A POST WITH MEDIA
// ═══════════════════════════════════════════════════════════════

async function createPostWithMedia() {
  // Get form data
  const postText = document.getElementById('postText').value;
  const mediaFiles = Array.from(document.getElementById('mediaInput').files);

  if (!postText && mediaFiles.length === 0) {
    showNotif('❌ Post cannot be empty', 'error');
    return;
  }

  try {
    // Show upload progress
    showMediaUploadProgress('Uploading media...');

    // Upload post with media
    const result = await uploadPostWithMedia(
      {
        text: postText,
        tags: extractHashtags(postText),
      },
      mediaFiles
    );

    if (result.success) {
      showNotif('✅ Post created successfully!', 'success');

      // Clear form
      document.getElementById('postText').value = '';
      document.getElementById('mediaInput').value = '';

      // Reload feed
      loadFeedWithEnhancedPosts();

      // Close modal
      closePostModal();
    } else {
      showNotif('❌ Failed to create post: ' + result.error, 'error');
    }
  } catch (err) {
    console.error('Post creation error:', err);
    showNotif('❌ Error: ' + err.message, 'error');
  }
}

// ═══════════════════════════════════════════════════════════════
// 3. HANDLING POST INTERACTIONS IN REAL-TIME (Socket.io)
// ═══════════════════════════════════════════════════════════════

// Setup Socket.io for real-time interactions
if (window.io) {
  const socket = io();

  // Listen for new reactions
  socket.on('post:reacted', (data) => {
    const { postId, emoji, userId } = data;
    updateReactionUI(postId, emoji);
  });

  // Listen for new comments
  socket.on('comment:added', (data) => {
    const { postId, comment } = data;
    addCommentToUI(postId, comment);
  });

  // Listen for comment edits
  socket.on('comment:edited', (data) => {
    const { commentId, newText } = data;
    updateCommentUI(commentId, newText);
  });

  // Listen for comment deletes
  socket.on('comment:deleted', (data) => {
    const { commentId } = data;
    removeCommentUI(commentId);
  });

  // Listen for post shares
  socket.on('post:shared', (data) => {
    const { postId, platform } = data;
    incrementShareCount(postId);
  });
}

// Emit reactions in real-time
function emitReaction(postId, emoji) {
  if (window.io && window.socket) {
    socket.emit('post:react', {
      postId,
      emoji,
      userId: getCurrentUser().id,
    });
  }
}

// Emit comment in real-time
function emitComment(postId, comment) {
  if (window.io && window.socket) {
    socket.emit('comment:add', {
      postId,
      comment,
      userId: getCurrentUser().id,
    });
  }
}

// ═══════════════════════════════════════════════════════════════
// 4. SAVE CONVERSATION DATA (Calls/SMS/Messages)
// ═══════════════════════════════════════════════════════════════

// During video call
async function handleVideoCall(recipientId) {
  let callStartTime = Date.now();
  let recordingUrl = null;

  try {
    // Start video call setup
    const peerConnection = new RTCPeerConnection();
    // ... WebRTC setup code ...

    // When call ends, save the record
    window.addEventListener('beforeunload', async () => {
      const duration = Math.floor((Date.now() - callStartTime) / 1000);
      
      await saveCallRecord(recipientId, 'video', duration, recordingUrl);
    });
  } catch (err) {
    console.error('Call error:', err);
  }
}

// During text messaging
async function sendMessage(recipientId, message) {
  // Send via WebSocket
  if (window.socket) {
    socket.emit('message:send', {
      recipientId,
      message,
      timestamp: new Date().toISOString(),
    });
  }

  // Save to Supabase (permanent record)
  const result = await saveTextMessage(recipientId, message);
  if (!result.success) {
    console.warn('Failed to save message to DB:', result.error);
  }

  return result;
}

// Handling SMS
async function sendSMS(phoneNumber, message) {
  try {
    // Send SMS via API
    const response = await fetch('/api/sms/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, message }),
    });

    if (response.ok) {
      // Save SMS record
      const result = await saveSMS(phoneNumber, message, 'sent');
      return result;
    }
  } catch (err) {
    console.error('SMS error:', err);
  }
}

// ═══════════════════════════════════════════════════════════════
// 5. MEDIA MANAGEMENT IN PROFILE
// ═══════════════════════════════════════════════════════════════

async function showUserMediaGallery(userId) {
  try {
    // Get all permanent media
    const result = await getPermanentMedia();

    if (result.success) {
      const modal = document.createElement('div');
      modal.className = 'media-gallery';
      modal.innerHTML = '';

      result.data.forEach(media => {
        const item = document.createElement('div');
        item.className = 'media-gallery-item';

        if (media.type === 'photo') {
          const img = document.createElement('img');
          // Create blob URL from ArrayBuffer
          const blob = new Blob([media.data], { type: media.mimeType });
          img.src = URL.createObjectURL(blob);
          item.appendChild(img);
        } else if (media.type === 'video') {
          const video = document.createElement('video');
          const blob = new Blob([media.data], { type: media.mimeType });
          video.src = URL.createObjectURL(blob);
          item.appendChild(video);
        } else if (media.type === 'audio') {
          const audio = document.createElement('audio');
          const blob = new Blob([media.data], { type: media.mimeType });
          audio.src = URL.createObjectURL(blob);
          item.appendChild(audio);
        }

        item.onclick = () => item.classList.toggle('selected');
        modal.appendChild(item);
      });

      document.body.appendChild(modal);
    }
  } catch (err) {
    console.error('Gallery error:', err);
    showNotif('❌ Failed to load gallery', 'error');
  }
}

// Display storage statistics
async function showStorageStats() {
  const stats = await getMediaStats();

  if (stats.success) {
    const statsHTML = `
      <div class="storage-stats">
        <div class="storage-stat-row">
          <span class="storage-stat-label">📁 Total Files</span>
          <span class="storage-stat-value">${stats.data.totalFiles}</span>
        </div>
        <div class="storage-stat-row">
          <span class="storage-stat-label">💾 Total Size</span>
          <span class="storage-stat-value">${(stats.data.totalSize / 1024 / 1024).toFixed(2)} MB</span>
        </div>
        <div class="storage-stat-row">
          <span class="storage-stat-label">📷 Photos</span>
          <span class="storage-stat-value">${stats.data.byType.photo}</span>
        </div>
        <div class="storage-stat-row">
          <span class="storage-stat-label">🎬 Videos</span>
          <span class="storage-stat-value">${stats.data.byType.video}</span>
        </div>
        <div class="storage-stat-row">
          <span class="storage-stat-label">🎵 Audio</span>
          <span class="storage-stat-value">${stats.data.byType.audio}</span>
        </div>
      </div>
    `;

    document.getElementById('storageContainer').innerHTML = statsHTML;
  }
}

// ═══════════════════════════════════════════════════════════════
// 6. HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function extractHashtags(text) {
  const hashtags = [];
  const regex = /#\w+/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    hashtags.push(match[0]);
  }
  return hashtags;
}

function showMediaUploadProgress(message) {
  const progress = document.createElement('div');
  progress.className = 'media-upload-progress';
  progress.innerHTML = `
    <div class="spinner"></div>
    <div class="text">${message}</div>
  `;
  document.body.appendChild(progress);

  return () => progress.remove();
}

function updateReactionUI(postId, emoji) {
  // Update reaction count in UI
  const postEl = document.getElementById(`post-${postId}`);
  if (postEl) {
    const reactBar = postEl.querySelector('.reaction-bar');
    if (reactBar) {
      // Animation effect
      const pop = document.createElement('div');
      pop.className = 'react-float';
      pop.textContent = emoji;
      pop.style.left = (reactBar.getBoundingClientRect().left + 50) + 'px';
      pop.style.top = (reactBar.getBoundingClientRect().top - 40) + 'px';
      document.body.appendChild(pop);
      setTimeout(() => pop.remove(), 800);
    }
  }
}

function addCommentToUI(postId, comment) {
  const commentsEl = document.getElementById(`comments-${postId}`);
  if (commentsEl) {
    const commentEl = enhancedInteractions.renderComment(comment, postId);
    commentsEl.appendChild(commentEl);
  }
}

function updateCommentUI(commentId, newText) {
  const textEl = document.getElementById(`text-${commentId}`);
  if (textEl) {
    textEl.textContent = newText;
  }
}

function removeCommentUI(commentId) {
  const commentEl = document.getElementById(`comment-${commentId}`);
  if (commentEl) {
    commentEl.style.opacity = '0';
    commentEl.style.transform = 'scale(0.9)';
    setTimeout(() => commentEl.remove(), 300);
  }
}

function incrementShareCount(postId) {
  // Update share count in UI
  const postEl = document.getElementById(`post-${postId}`);
  if (postEl) {
    const shareBtn = postEl.querySelector('[onclick*="sharePost"]');
    if (shareBtn) {
      showNotif('📤 Post shared!', 'success');
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// 7. MODIFICATION TO EXISTING FUNCTIONS
// ═══════════════════════════════════════════════════════════════

// If you have an existing openPostModal function, extend it:
// Backup original: const originalOpenPostModal = openPostModal;
function openPostModal(mediaType = null) {
  // Your existing modal opening code...
  
  // Add media file input listener
  const mediaInput = document.getElementById('mediaInput');
  if (mediaInput) {
    mediaInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      // Preview media
      files.forEach(file => {
        const preview = createMediaPreview(file);
        document.getElementById('mediaPreview').appendChild(preview);
      });
    });
  }
}

function createMediaPreview(file) {
  const container = document.createElement('div');
  container.style.cssText = `
    position: relative;
    display: inline-block;
    margin: 8px;
    border-radius: 12px;
    overflow: hidden;
  `;

  if (file.type.startsWith('image/')) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.style.maxWidth = '100px';
    img.style.maxHeight = '100px';
    container.appendChild(img);
  } else if (file.type.startsWith('video/')) {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);
    video.style.maxWidth = '100px';
    video.style.maxHeight = '100px';
    container.appendChild(video);
  } else if (file.type.startsWith('audio/')) {
    const audio = document.createElement('audio');
    audio.src = URL.createObjectURL(file);
    audio.controls = true;
    audio.style.maxWidth = '100px';
    container.appendChild(audio);
  }

  const removeBtn = document.createElement('button');
  removeBtn.innerHTML = '✕';
  removeBtn.style.cssText = `
    position: absolute;
    top: 4px;
    right: 4px;
    background: rgba(0,0,0,0.6);
    border: none;
    color: #fff;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    cursor: pointer;
  `;
  removeBtn.onclick = () => container.remove();
  container.appendChild(removeBtn);

  return container;
}

// ═══════════════════════════════════════════════════════════════
// EXPORT FOR USE IN OTHER FILES
// ═══════════════════════════════════════════════════════════════

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createPostWithMedia,
    handleVideoCall,
    sendMessage,
    sendSMS,
    showUserMediaGallery,
    showStorageStats,
  };
}
