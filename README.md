# Monetixra — Complete Social Earn Platform

A modern web application for social content creators to earn money through posts, ads, NFTs, crypto, and live streaming. Includes AI chat, WebRTC video calls, multiple payment gateways, and PWA support.

## 🚀 Project Status

✅ All critical issues fixed and security improved  
✅ File structure cleaned up  
✅ Environment configuration secured  
✅ Payment handler implemented  

## 📋 Prerequisites

- **Node.js** ≥ 18.0.0
- **npm** or **yarn**
- **Supabase** account (database)
- **Stripe** account (payment processing)

## 🔧 Installation & Setup

### 1. Clone & Install Dependencies

```bash
npm run setup
# or
npm install && mkdir -p public
```

### 2. Configure Environment Variables

```bash
# Copy the template
cp env.example .env

# Edit .env and add your actual credentials
# Get keys from the services listed in env.example
```

**⚠️ IMPORTANT SERVICES TO CONFIGURE:**

| Service | Requirement | Link |
|---------|-------------|------|
| Supabase | Database | https://supabase.com |
| Stripe | Payments | https://stripe.com |
| OpenAI | AI Chat | https://openai.com |
| Google Cloud | Vision API, etc. | https://console.cloud.google.com |
| Metered.ca | WebRTC TURN | https://metered.ca |

### 3. Generate Web Push VAPID Keys

Required for push notifications:

```bash
npm run vapid
```

This generates and displays your `VAPID_PUBLIC_KEY` and `VAPID_PRIVATE_KEY`.  
Add these to your `.env` file.

### 4. Add PWA Icons

The app needs icon files in the `public/` directory.  
See `public/README.md` for details on generating icons.

### 5. Set Up Database

Import the Supabase schema:

```bash
# Use the Supabase dashboard SQL editor to run:
# Copy contents of supabase_schema.sql
```

## 🏃 Running the Application

### Development

```bash
npm run dev
```

Starts the server with **nodemon** (auto-restart on changes).  
Open: http://localhost:3000

### Production

```bash
npm start
```

## 📦 Deployment on Render

The project is configured for **Render.com**:

1. **Connect your GitHub repo** to Render
2. **Create a new Web Service**
3. **Configure environment variables** in Render dashboard:
   - Add all variables from your `.env` file
   - Set `NODE_ENV=production`
4. **Update `BASE_URL`** to your Render URL
5. **Deploy** - Render will automatically run `npm install` and `npm start`

The `render.yaml` file handles the build configuration.

## 📁 Project Structure

```
monetixra/
├── index.html              # Main PWA application
├── server.js               # Express server with all APIs
├── sw.js                   # Service Worker for offline support
├── manifest.json           # PWA manifest configuration
├── package.json            # Dependencies and scripts
├── supabase_schema.sql     # Database schema
├── env.example             # Environment variables template
├── .env                    # Your actual credentials (git ignored)
├── .gitignore              # Git ignore rules
├── public/                 # Static assets & PWA icons
│   └── README.md           # Icon setup instructions
└── node_modules/           # Dependencies (git ignored)
```

## 🔐 Security Features Implemented

✅ **Hardcoded secrets removed** - All API keys moved to environment variables  
✅ **.gitignore created** - Prevents accidental secret commits  
✅ **Helmet.js enabled** - HTTP security headers  
✅ **Rate limiting** - Protects against brute force attacks  
✅ **CORS configured** - API access control  
✅ **Input validation** - All endpoints validate input  

## 🛠️ Available Scripts

```bash
npm start           # Run production server
npm run dev         # Run development server with auto-reload
npm run setup       # Install dependencies & create public dir
npm run vapid       # Generate Web Push VAPID keys
```

## 📡 API Endpoints

### Health & Status
- `GET /health` - Server status and metrics

### Ice Servers (WebRTC)
- `GET /api/ice-servers` - TURN/STUN servers for video calls

### Push Notifications
- `POST /api/push/subscribe` - Subscribe to notifications
- `POST /api/push/unsubscribe` - Unsubscribe
- `POST /api/push/send` - Send notification to user
- `POST /api/push/broadcast` - Send to all users
- `GET /api/push/vapid-key` - Get public VAPID key

### AI Chat
- `POST /api/ai/chat` - Chat with OpenAI or DeepSeek

### Image Processing
- `POST /api/vision/analyze` - Google Vision API analysis

### Payments
- `POST /api/payment/stripe/create-session` - Create Stripe checkout
- `POST /api/payment/stripe/webhook` - Stripe webhook (auto-process payments)

### Socket.io Real-time
- Video/audio call signaling
- Live streaming
- Real-time messaging

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in .env
PORT=3001
```

### Supabase Connection Failed
- Check `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `.env`
- Verify Supabase project is active
- Check network connection

### VAPID Keys Error
- Generate new keys: `npm run vapid`
- Update both keys in `.env`

### Stripe Webhook Issues
- Ensure webhook secret matches in `.env`
- Use Stripe CLI for local testing

## 📚 Documentation Links

- [Supabase Docs](https://supabase.com/docs)
- [Stripe API](https://stripe.com/docs/api)
- [Socket.io](https://socket.io/docs/)
- [Express.js](https://expressjs.com/)
- [OpenAI API](https://platform.openai.com/docs)
- [Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Test locally
4. Submit a pull request

## ⚖️ License

MIT License - See LICENSE file for details

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section
2. Review server logs: `npm run dev` output
3. Check browser console for client-side errors

---

**Last Updated:** April 20, 2026  
**Version:** 1.0.0
