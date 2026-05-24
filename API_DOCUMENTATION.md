# Monetixra API Documentation

## Health
- `GET /health`
- `GET /api/health`

## Real-time Socket.io Events
- `user:online`
- `chat:message`
- `room:message`
- `live:start`
- `live:end`
- `notif:send`
- `call:invite`
- `webrtc:offer`
- `webrtc:answer`
- `webrtc:ice-candidate`

## Sync
- `POST /api/user-data/sync` with `{ "id": "user_id", "name": "Name", "username": "name" }`
- `POST /api/posts/sync` with `{ "id": "post_id", "author": "user_id", "type": "text", "text": "Hello" }`
- `POST /api/points/sync` with `{ "userId": "user_id", "points": 100, "label": "auto-sync" }`
- `POST /api/media/sync` with `{ "id": "media_id", "type": "image", "url": "https://..." }`
- `GET /api/sync/status`
- `GET /api/sync/export`
- `GET /api/search?q=keyword&type=all`

## Push Notifications
- `GET /api/push/vapid-key`
- `POST /api/push/subscribe`
- `POST /api/push/unsubscribe`
- `POST /api/push/send`
- `POST /api/push/broadcast`

## Backup
- `POST /api/backup/create`
- `GET /api/backup/latest`

## Storage
Cloudinary upload routes are present. S3/Wasabi readiness is reported by `GET /api/sync/status`.

For production S3-compatible storage, configure environment variables:
- `S3_BUCKET`
- `S3_ACCESS_KEY`
- `S3_SECRET_KEY`
- optional `S3_ENDPOINT`

For Wasabi, configure:
- `WASABI_BUCKET`
- `WASABI_ACCESS_KEY`
- `WASABI_SECRET_KEY`
