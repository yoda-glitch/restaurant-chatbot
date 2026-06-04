# Restaurant Chatbot

A web-based restaurant chatbot that allows customers to place food orders
through a number-selection interface. Built as a full-stack assessment project.

## Live Demo
- Frontend: https://restaurant-chatbot-syqi.onrender.com
- Backend API: https://restaurant-chatbot-api-2e59a3a84b54.herokuapp.com

## Tech Stack
- Frontend: React.js (Vite) + Tailwind CSS
- Backend: Node.js + Express.js
- Database: MongoDB Atlas + Mongoose
- Payment: Paystack (test mode)
- Frontend Hosting: Render
- Backend Hosting: Heroku

## Features
- Number-selection chat interface with quick action buttons
- Session persistence per device using localStorage (no login required)
- Browse full restaurant menu grouped by category
- Add single or multiple items at once (e.g. type "1, 5, 12")
- View and manage current order at any time
- Full order history for returning customers
- Paystack payment integration with success/failure handling
- Separate sessions for different devices
- Input validation with graceful error handling
- Rate limiting on chat endpoint

## Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Paystack account (test mode)

## Environment Variables

### server/.env
| Variable | Description |
|----------|-------------|
| PORT | Port the server runs on (default 5000) |
| MONGODB_URI | MongoDB Atlas connection string |
| PAYSTACK_SECRET_KEY | Paystack test secret key (sk_test_...) |
| CLIENT_URL | Frontend URL for CORS |

### client/.env
| Variable | Description |
|----------|-------------|
| VITE_API_BASE_URL | Backend API base URL |
| VITE_PAYSTACK_PUBLIC_KEY | Paystack test public key (pk_test_...) |

## Installation & Setup

1. Clone the repository:
   ```
   git clone https://github.com/yoda-glitch/restaurant-chatbot.git
   cd restaurant-chatbot
   ```

2. Install backend dependencies:
   ```
   cd server
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../client
   npm install
   ```

4. Set up environment variables:
   - Copy server/.env.example to server/.env and fill in your values
   - Copy client/.env.example to client/.env and fill in your values

5. Seed the database:
   ```
   cd server
   node seed/menuItems.js
   ```

6. Start the backend:
   ```
   node index.js
   ```

7. Start the frontend (in a new terminal):
   ```
   cd client
   npm run dev
   ```

8. Open http://localhost:5173 in your browser

## How to Use

| Input | Action |
|-------|--------|
| 1 | Browse menu and place an order |
| 99 | Checkout current order |
| 98 | View order history |
| 97 | View current order |
| 0 | Cancel current order |
| 1, 5, 12 | Add multiple items at once |

You can also click the quick action buttons at the bottom of the chat
instead of typing numbers.

## Payment Testing

Use these Paystack test card details:

| Field | Value |
|-------|-------|
| Card Number | 4084 0840 8408 4081 |
| Expiry | Any future date |
| CVV | 408 |
| PIN | 0000 |
| OTP | 123456 |

## Deployment

### Backend (Heroku)
```
cd server
git init
git add .
git commit -m "deploy"
heroku create your-app-name
heroku config:set MONGODB_URI="your_uri"
heroku config:set PAYSTACK_SECRET_KEY="your_key"
heroku config:set CLIENT_URL="your_frontend_url"
heroku config:set NODE_ENV="production"
git push heroku master
heroku run node seed/menuItems.js
```

### Frontend (Render)
1. Connect your GitHub repository on Render
2. Set Root Directory to: `client`
3. Set Build Command to: `npm install && npm run build`
4. Set Publish Directory to: `dist`
5. Add environment variables:
   - `VITE_API_BASE_URL` = your Heroku backend URL
   - `VITE_PAYSTACK_PUBLIC_KEY` = your Paystack public key
