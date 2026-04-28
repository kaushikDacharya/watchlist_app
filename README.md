<div align="center">

# 🎬 Watchlist App

**Your personal movie tracking companion — search, save, and manage what to watch next.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://kaushikdacharya.github.io/watchlist_app/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TMDb API](https://img.shields.io/badge/TMDb-API-01B4E4?style=for-the-badge&logo=themoviedatabase)](https://www.themoviedb.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## 📖 Overview

**Watchlist App** is a React-powered movie discovery and tracking tool that lets you search millions of titles via the TMDb API and curate a personal watchlist that persists across sessions using `localStorage`. No account required — just search, save, and come back later.

> 🚧 **v2.0 coming soon:** Backend database with user authentication, web series, anime, and book tracking.

---

## ✨ Features

- 🔍 **Instant Movie Search** — Powered by the TMDb API with real-time results
- 📌 **Persistent Watchlist** — Saved to `localStorage` so your list survives page refreshes and browser restarts
- 🎴 **Rich Movie Cards** — Poster images, release year, ratings, and overview pulled from TMDb
- ➕ / ✅ **Add & Remove** — Toggle any title in or out of your watchlist with one click
- 📱 **Responsive Design** — Works across desktop and mobile browsers
- ⚡ **Zero Backend** — Fully static; deployed on GitHub Pages with no server required

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| UI Framework | React 18 |
| Data Source | [TMDb REST API v3](https://developer.themoviedb.org/docs) |
| Persistence | Browser `localStorage` |
| Hosting | GitHub Pages |
| Build Tool | Create React App / Vite |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v16+`
- npm or yarn
- A free [TMDb API key](https://www.themoviedb.org/settings/api)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/kaushikdacharya/watchlist_app.git
cd watchlist_app

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
```

Add your TMDb API key to `.env`:

```env
REACT_APP_TMDB_API_KEY=your_api_key_here
```

```bash
# 4. Start the development server
npm start
```

The app will be available at `http://localhost:3000`.

---

## 🗂️ Project Structure

```
watchlist_app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── SearchBar/          # Search input with debounce
│   │   ├── MovieCard/          # Individual movie tile
│   │   ├── Watchlist/          # Saved titles view
│   │   └── Navbar/             # Navigation header
│   ├── hooks/
│   │   └── useLocalStorage.js  # Custom hook for persisted state
│   ├── services/
│   │   └── tmdb.js             # TMDb API helper functions
│   ├── App.js
│   └── index.js
├── .env.example
└── README.md
```

---

## 🔌 TMDb API Integration

This app uses the [TMDb API v3](https://developer.themoviedb.org/reference/intro/getting-started). Key endpoints used:

```
GET /search/movie?query={term}     → Search movies by title
GET /movie/{id}                    → Get full movie details
GET /configuration                 → Fetch base image URLs
```

Images are served via TMDb's CDN:
```
https://image.tmdb.org/t/p/w500/{poster_path}
```

> This product uses the TMDB API but is not endorsed or certified by TMDB.

---

## 💾 Local Storage Schema

The watchlist is stored as a JSON array under the key `watchlist`:

```json
[
  {
    "id": 550,
    "title": "Fight Club",
    "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    "release_date": "1999-10-15",
    "vote_average": 8.4,
    "overview": "A ticking-time-bomb insomniac..."
  }
]
```

---

## 📦 Available Scripts

```bash
npm start          # Start development server
npm run build      # Production build
npm test           # Run test suite
npm run deploy     # Deploy to GitHub Pages (gh-pages)
```

---

## 🌐 Deployment

The app is deployed via [GitHub Pages](https://pages.github.com/) using the `gh-pages` package.

```bash
# Build and deploy in one command
npm run deploy
```

Make sure `homepage` is set in `package.json`:

```json
"homepage": "https://kaushikdacharya.github.io/watchlist_app"
```

---

## 🗺️ Roadmap

The following features are planned for upcoming versions:

### v2.0 — Backend & Auth
- [ ] User authentication (login / signup)
- [ ] PostgreSQL / Firebase backend to sync watchlists across devices
- [ ] Per-user persistent watchlists via REST API

### v2.1 — Content Expansion
- [ ] 📺 **Web Series** — Browse and track TV shows via TMDb `/tv` endpoints
- [ ] 🎌 **Anime** — Dedicated anime section using AniList or Jikan (MyAnimeList) API
- [ ] 📚 **Books** — Book search and tracking via Google Books API or Open Library

### v2.2 — UX Improvements
- [ ] Watchlist categories (Plan to Watch, Watching, Completed, Dropped)
- [ ] Personal ratings and notes per title
- [ ] Filter & sort watchlist by genre, rating, or date added
- [ ] Share watchlist via public link

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [The Movie Database (TMDb)](https://www.themoviedb.org/) for the free and comprehensive movie API
- [Create React App](https://create-react-app.dev/) for the project scaffold
- [GitHub Pages](https://pages.github.com/) for free static hosting

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/kaushikdacharya">Kaushik Dacharya</a>
</div>
