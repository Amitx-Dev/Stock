# TradeNest - Online Stock Trading Platform

TradeNest is a modern, responsive fintech web application inspired by the look and feel of Upstox. Designed with rich purple accents (`#5F259F`), clean surfaces, rounded cards, dark/light theme toggle, and mobile-first responsive architecture.

---

## 🚀 Key Features

### 1. Public Pages
- **Home Page (`/`)**:
  - Sticky navbar with brand logo, product links, theme toggle, and auth actions.
  - Live animated scrolling market ticker strip (NIFTY 50, SENSEX, BANK NIFTY, top movers).
  - High-impact hero section with mobile number validation and interactive trading terminal mockup.
  - Stats band (1 Cr+ users, ₹0 account opening, 1.2ms latency, ₹20 flat brokerage).
  - Products ecosystem (Stocks, Mutual Funds, F&O, IPOs, ETFs, Government Bonds).
  - Why Choose Us value propositions & feature cards.
  - Brokerage comparison table (TradeNest vs Traditional vs Discount brokers).
  - Live market snapshot widget (Top Gainers / Top Losers / Most Active).
  - Testimonials carousel, interactive FAQ accordion, and footer with regulatory disclosures.
- **Login Page (`/login`)**:
  - Split-screen layout with fintech illustration & authentication form.
  - Toggle between **Email & Password** and **Mobile OTP** (with 6 auto-advancing boxes).
  - Role selector (**Trader** | **Admin**).

### 2. Admin Dashboard (`/admin/*`)
- **User Management (`/admin/users`)**: Search, filter by role, sorting, pagination, and modal CRUD operations with toast feedback.
- **Financial Security (`/admin/security`)**: Interactive toggles for 2FA, AES-256 data encryption at rest, session timeout, IP whitelisting, password policy, and recent security incidents log.
- **System Settings (`/admin/settings`)**: Platform configurations (trading hours, brokerage rates, maintenance mode) and live microservice health monitor.
- **Trade Activity Monitoring (`/admin/activity`)**: Real-time Recharts visualizations (orders per hour bar chart, volume trend area chart, buy vs sell donut, and latency/CPU line chart).
- **Report Generation (`/admin/reports`)**: Financial, User, Trade, and System reports with date range filters, preview tables, and CSV/PDF export.

### 3. Trader Dashboard (`/trader/*`)
- **Stock Trading Terminal (`/trader/trading`)**: Real-time instrument selector, live price & day high/low, candlestick/area charts with timeframes (1D, 1W, 1M, 1Y), Level-2 market depth (bids/asks), order ticket (Market/Limit, Buy/Sell), order confirmation modal, and execution toast.
- **Portfolio Overview (`/trader/portfolio`)**: Summary cards (Total Invested, Current Value, Day P&L, Overall P&L), holdings table, sector allocation donut chart, and portfolio valuation line chart.
- **Market Updates Feed (`/trader/market`)**: Real-time news wire with live streaming updates, sector chips, and news type filters.
- **Trade History (`/trader/history`)**: Filterable execution log with win-rate statistics (win rate %, best trade, worst trade) and CSV export.
- **Alerts & Notification Center (`/trader/alerts`)**: Price alert creation modal, active alerts manager, and unread notification center.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS with dark mode class support
- **Visualizations**: Recharts
- **Icons**: Lucide React
- **State**: In-memory React Context (AuthContext, ThemeContext, ToastContext)

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build
```

---

## 📄 License
MIT License
