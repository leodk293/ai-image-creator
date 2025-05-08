# 📝 AI IMAGE CREATOR

A full-featured blog application built with **Next.js**, **Tailwind CSS**, and **MongoDB**.  
Users can sign in with their **Google account**, create and manage blog posts, and interact through comments.

## ✨ Features

- 🔐 Google Authentication with NextAuth.js
- 🌙 Clean and responsive UI with Tailwind CSS
- 📦 Data stored in MongoDB (via Mongoose)
- 🤖 Hugging Face API

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **ORM**: [Mongoose](https://mongoosejs.com/)
- **AI API**: [Hugging Face](https://huggingface.co/)

## 🚀 Getting Started

```bash
git clone https://github.com/leodk293/next-auth-setup.git
cd ai-image-creator

###  Install dependencies

npm install

###  Set up environment variables
touch .env.local
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:your_port_development
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_secret_key
HUGGINGFACE_API_KEY=your_huggingface_api_key

###  Run the development server
npm run dev