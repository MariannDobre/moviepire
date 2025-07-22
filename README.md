# 🎬 Moviepire — Your Personal Movie & Series Diary

Welcome to **Moviepire** — a sleek, fullstack application crafted for movie and series lovers who want to track, reflect, and personalize their watching experience. Inspired by IMDb, but redesigned for **your eyes only**, Moviepire transforms film discovery into a private journey of memory and taste.

---

## 🚀 What is Moviepire?

**Moviepire** is a **personal diary for movies and TV shows**. It allows you to:

- 📝 Log and rate films or series you’ve watched
- 🧠 Remember why something resonated with you
- 🎯 Filter your watch history by genre, year, or type
- 🔐 Keep your ratings and thoughts private
- 🔄 Seamlessly update account info and revisit entries
- 📥 Authenticate securely and confirm your email

Built from scratch with inspiration from IMDb, Moviepire flips the script — offering an **introspective and fully private film journal** tailored for movie buffs and series enthusiasts alike.

---

## 🛠️ Tech Stack

> Carefully selected tools to offer a fast, reliable, and extensible user experience:

| Technology                                                                  | Description                                               |
| --------------------------------------------------------------------------- | --------------------------------------------------------- |
| [**React**](https://reactjs.org)                                            | UI library for interactive components                     |
| [**Supabase**](https://supabase.com)                                        | Backend-as-a-Service (PostgreSQL DB + Auth)               |
| [**React Router DOM**](https://reactrouter.com)                             | Declarative client-side routing                           |
| [**React Hook Form**](https://react-hook-form.com)                          | Form management with validation                           |
| [**React Query**](https://tanstack.com/query)                               | Data fetching and caching                                 |
| [**React Error Boundary**](https://github.com/bvaughn/react-error-boundary) | Graceful error handling                                   |
| [**React Hot Toast**](https://react-hot-toast.com)                          | Elegant and accessible toast notifications                |
| 🧱 Compound Components                                                      | Shared logic between deeply nested UI parts               |
| 🧠 Custom Hooks                                                             | DRY and scalable logic for async, form, and state control |
| 🎨 [Tailwind CSS](https://tailwindcss.com)                                  | Utility-first styling for rapid UI development            |

---

## 🔐 Authentication Features

Moviepire includes a complete **auth flow** with:

- ✅ Registration & Login
- 📩 Email Confirmation (verified via Supabase)
- 🔒 Secure Session Handling
- 👤 Account Data Editing (username, avatar, password)

---

## 📓 Diary Features

- ⭐ Interactive star rating system with hover/select states
- 📅 Watched date & IMDb info tracking
- 🧹 Server-side filters (genre, type, and year range)
- 🔄 Instant data updates using React Query + Supabase
- 🧩 Compound modals and components for scalable UI logic

---

## ✨ Why Moviepire?

📍 This project began as a **frontend IMDb clone**, but quickly evolved into a **private-first, personalized fullstack experience**. The goal? Give users a space to **document and rediscover** their movie and series watching habits.

Built with a **performance-first mindset** and using only the **best-in-class libraries**, Moviepire showcases modern React development principles with a clean and maintainable codebase.

---

## 📂 Project Structure Highlights

│
├── components/ // Reusable compound components (UI, Modals, Stars)
├── hooks/ // Custom hooks for logic abstraction
├── pages/ // Page-level routes (Diary, Auth, Movie)
├── services/ // Supabase functions & external integrations
├── utils/ // Helper functions (formatting, fallbacks, etc.)
└── styles/ // Tailwind and custom styles

---

## 🧠 Lessons & Concepts

- 📌 Separation of concerns with hooks and compound components
- 📡 Fullstack data flow: Supabase ↔ React Query ↔ UI
- 🛠 Declarative state-driven modals (with URL query-based opening)
- 🔁 Optimistic UI updates & cache invalidation
- 🚦 Conditional rendering logic for verified vs. unverified accounts

---

Made with ☕, 🎬 and lots of `console.log()` — by [Mariann Dobre](https://github.com/MariannDobre)

---

## 💡 Why I Built This

This project isn’t just a technical showcase — it’s **a labor of passion**.

I created **Moviepire** to:

- Demonstrate what I’ve learned so far in React and fullstack development
- Sharpen my skills by building something real, polished, and complete
- Show that I care about detail, structure, performance, and user experience
- Express my love for web applications and the creative process behind them
- Open the door to job opportunities, internships, or collaborations

If you’re someone hiring or scouting talent:  
👉 I may not have a traditional background, but I’ve **put in the work** and I’m eager to keep learning, building, and contributing — wherever that may be.

**Thanks for reading — and giving people like me a shot.**
