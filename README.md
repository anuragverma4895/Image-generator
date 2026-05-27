# GenAI Studio — AI Image Generator

An AI-powered text-to-image generator built with **React**, **Express**, and **Google Gemini Imagen API**. Create stunning, high-quality images from text prompts with multiple art styles.

## Features

- **AI Image Generation** — Powered by Google Gemini Imagen 4.0
- **Multiple Art Styles** — Photorealistic, Anime, 3D Render, Cyberpunk
- **Smart Fallback** — Automatic fallback to Pollinations.ai if primary API is unavailable
- **Image History** — Browse and revisit your recent creations
- **Download & Copy** — Save generated images or copy prompts instantly
- **Responsive Design** — Beautiful glassmorphism UI that works on all devices

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 19, Vite, Tailwind CSS 4      |
| Backend    | Node.js, Express 5                  |
| AI Model   | Google Gemini Imagen 4.0             |
| Fallback   | Pollinations.ai (free tier)          |
| Icons      | Lucide React                        |

## Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- A **Google Gemini API key** — [Get one here](https://aistudio.google.com/apikey)

### Installation

```bash
# Clone the repository
git clone https://github.com/sourav7798/Image-generator.git
cd Image-generator

# Install all dependencies (client + server)
npm install
```

### Environment Variables

Create a `.env` file inside the `server/` directory:

```bash
cp server/.env.example server/.env
```

Then edit `server/.env` with your actual API key:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
CLIENT_URL=http://localhost:5173
```

### Running Locally

```bash
# Start both client and server concurrently
npm run dev
```

- **Frontend** → http://localhost:5173
- **Backend**  → http://localhost:5000

### Production Build

```bash
# Build the client
npm run build

# Start the production server (serves client build + API)
npm start
```

## Deployment (Render.com)

This project includes a `render.yaml` blueprint for one-click deployment on [Render](https://render.com):

1. Fork/push this repo to your GitHub account
2. Go to [Render Dashboard](https://dashboard.render.com) → **New** → **Blueprint**
3. Connect your GitHub repo and select it
4. Set the `GEMINI_API_KEY` environment variable in Render
5. Deploy!

### Manual Deployment

You can also deploy manually on any Node.js hosting:

1. Set environment variables: `GEMINI_API_KEY`, `NODE_ENV=production`, `PORT`
2. Run `cd client && npm install && npm run build`
3. Run `cd server && npm install && npm start`

The server will serve the React build files in production mode.

## Project Structure

```
Image-generator/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── App.jsx         # Main application component
│   │   ├── App.css         # Component styles
│   │   ├── index.css       # Global styles & Tailwind
│   │   └── main.jsx        # React entry point
│   ├── public/             # Static assets
│   ├── index.html          # HTML template
│   ├── vite.config.js      # Vite configuration
│   └── package.json
├── server/                 # Express backend
│   ├── index.js            # Server entry point & API routes
│   ├── .env.example        # Environment variable template
│   └── package.json
├── render.yaml             # Render.com deployment blueprint
├── package.json            # Root package.json with unified scripts
└── README.md
```

## License

MIT License — feel free to use this project for learning and personal use.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built using Google Gemini AI
