<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). -->

---

# 🎉 Event RSVP Platform

A simple event management platform built with Supabase (Postgres backend) and Next.js frontend.
Users can view upcoming events and RSVP (Yes/No/Maybe).

---

# 📌 Features

- **🔑 Users table –** stores registered users.
- **📅 Events table –** users can create events.
- **📨 RSVPs table –** users can RSVP to events (Yes/No/Maybe).
- **🎨 Next.js frontend –**
    - List all upcoming events.
    - Change RSVP status for a logged-in user (sample login hardcoded).
- **☁️ Deployed on Vercel** with Supabase backend.

---

# 🗄️ Database Design

**Tables**

 1. **Users**
    - `id` (PK)
    - `name`
    - `email`
    - `created_at`
 2. **Events**
    - `id` (PK)
    - `title`
    - `description`
    - `date`
    - `city`
    - `created_by` (FK → Users.id)
 3. RSVPs
    - `id` (PK)
    - `user_id` (FK → Users.id)
    - `event_id` (FK → Events.id)
    - `status` (Yes/No/Maybe)

✅ **Referential integrity:** Deleting a user cascades deletes to their RSVPs.

---

# 📊 ER Diagram

![alt ER Diagram Image](/screenshots/tables.png)

---

# 🧪 Sample Data

- 10 Users
![alt Sample Entries](/screenshots/users_table_entry.png)

- 5 Events
![alt Sample Entries](/screenshots/events_table_entry.png)

- 20 RSVPs
![alt Sample Entries](/screenshots/rsvps_table_entry.png)

---

# 🚀 Getting Started

**Prerequisites**

- [Link Node.js](https://nodejs.org/en) v16+
- [Link Node.js](https://supabase.com/)
- [Link Vercel account](https://vercel.com/)


**1️⃣ Clone Repo**
```bash
git clone https://github.com/your-username/event-rsvp-platform.git
cd event-rsvp-platform
```

**2️⃣ Install Dependencies**
```bash
npm install
```

**3️⃣ Environment Variables**

Create a `.env.local` file with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**4️⃣ Run Locally**

```bash
npm run dev
```


App runs on `http://localhost:3000`.


---

# 📖 Design Choices

- RSVP stored in a **separate table** → allows many-to-many relationship between users and events.

- Used **hardcoded sample user** for simplicity (instead of full auth).

- Minimal schema with constraints for referential integrity.

---

### 👩‍💻 Author

**Tanmay Gupta**
📧 guptatanmay1008@gmail.com


---

*✨ Feel free to fork, explore, and enhance this project!*

---

<!-- First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

# Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->
