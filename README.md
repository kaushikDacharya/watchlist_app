# 🎬 The WatchList App

A responsive movie tracking web app built with **ReactJS** and powered by the **TMDb API**. Search for movies, view detailed information, and manage your personal watchlist — all saved persistently in your browser.

🔗 **Live Demo:** [kaushikdacharya.github.io/thewatchlist_app](https://kaushikdacharya.github.io/thewatchlist_app/)

---

## Features

- **Movie Search** — Search any movie title and get up to 5 relevant results fetched live from the TMDb API
- **Detailed Movie Info** — Each result displays the poster, release year, director, genres, TMDb rating, cast, and overview
- **Watchlist Management** — Add any movie to your watchlist with one of four statuses:
  - ✅ Finished
  - 👀 Watching
  - 📌 Plan to Watch
  - ❌ Dropped
- **Persistent Watchlist** — Your watchlist is saved to `localStorage`, so it survives page refreshes and browser restarts without needing an account or a backend
- **Filter by Status** — View your entire watchlist or filter by a specific status category
- **Remove Movies** — Remove any movie from your watchlist at any time

---

## Tech Stack

| Technology | Usage |
|---|---|
| ReactJS | Frontend UI and state management |
| TMDb API | Movie search, metadata, cast, and crew data |
| localStorage | Persistent client-side watchlist storage |
| HTML / CSS | Layout and styling |

---

## How It Works

1. Enter a movie title in the search bar and hit search
2. Up to 5 matching results are fetched from the TMDb API, each with full details
3. Select a status from the dropdown on any result to add it to your watchlist
4. Your watchlist is instantly saved to `localStorage` and persists across sessions
5. Use the filter buttons to browse your watchlist by status category

---

## Getting Started (Run Locally)

```bash
# Clone the repository
git clone https://github.com/kaushikdacharya/thewatchlist_app.git

# Open index.html in your browser
# No build step required — pure ReactJS via CDN
```

> **Note:** You will need a valid [TMDb API key](https://www.themoviedb.org/documentation/api) if you replace the existing one.

---

## Planned Improvements

- 🗄️ **Backend Database & Login** — Move watchlist storage from `localStorage` to a server-side database with user authentication, so your watchlist is accessible from any device
- 🔗 **Shareable Watchlist Profiles** — Generate a public profile link to share your watchlist with friends
- 📺 **Anime & Web Series Support** — Extend tracking beyond movies to include anime and web series
- 📚 **Books** — Add a books section for tracking your reading list alongside your watch history

---

## API Reference

This project uses the [TMDb API](https://www.themoviedb.org/documentation/api).

> *This product uses the TMDb API but is not endorsed or certified by TMDb.*

---

## Author

**Kaushik D Acharya**
[GitHub Profile](https://github.com/kaushikdacharya)
