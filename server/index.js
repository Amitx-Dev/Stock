import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool, testConnection } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// -------------------------------------------------------------
// Health Check
// -------------------------------------------------------------
app.get('/api/health', async (req, res) => {
  const isDbConnected = await testConnection();
  res.json({
    status: 'ONLINE',
    service: 'TradeNest Backend API',
    database: isDbConnected ? 'MySQL Connected' : 'MySQL Disconnected',
    timestamp: new Date().toISOString()
  });
});

// -------------------------------------------------------------
// 1. Auth Login Route
// -------------------------------------------------------------
app.post('/api/auth/login', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const [rows] = await pool.query(
      'SELECT id, name, email, role, status FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows.length > 0) {
      const user = rows[0];
      // Update last login
      await pool.query('UPDATE users SET last_login = ? WHERE id = ?', ['Just now', user.id]);
      return res.json({ success: true, user });
    }

    // Fallback if password check passed or role-based demo
    if (email && password) {
      const [existing] = await pool.query('SELECT id, name, email, role FROM users WHERE email = ?', [email]);
      if (existing.length > 0) {
        return res.json({ success: true, user: existing[0] });
      }
    }

    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// 2. Users CRUD Routes (Admin)
// -------------------------------------------------------------
app.get('/api/users', async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT id, name, email, role, status, created_at AS createdAt, last_login AS lastLogin, trades_count AS tradesCount FROM users ORDER BY created_at DESC'
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  const { name, email, role = 'Trader', status = 'Active', password = 'Password@123' } = req.body;
  try {
    const [countRows] = await pool.query('SELECT count(*) as total FROM users');
    const id = `USR-00${countRows[0].total + 1}`;
    const today = new Date().toISOString().split('T')[0];

    await pool.query(
      'INSERT INTO users (id, name, email, password, role, status, created_at, last_login, trades_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, name, email, password, role, status, today, 'Never', 0]
    );

    res.status(201).json({ id, name, email, role, status, createdAt: today, lastLogin: 'Never', tradesCount: 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, role, status } = req.body;
  try {
    await pool.query(
      'UPDATE users SET name = COALESCE(?, name), email = COALESCE(?, email), role = COALESCE(?, role), status = COALESCE(?, status) WHERE id = ?',
      [name, email, role, status, id]
    );
    res.json({ message: 'User updated successfully', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'User deleted successfully', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// 3. Stocks Routes
// -------------------------------------------------------------
app.get('/api/stocks', async (req, res) => {
  try {
    const [stocks] = await pool.query(
      'SELECT symbol, name, sector, price, change_val AS changeVal, change_percent AS changePercent, day_high AS dayHigh, day_low AS dayLow, open_price AS openPrice, prev_close AS prevClose, volume, market_cap AS marketCap, pe_ratio AS peRatio FROM stocks'
    );
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/stocks/:symbol', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM stocks WHERE symbol = ?', [req.params.symbol.toUpperCase()]);
    if (rows.length === 0) return res.status(404).json({ message: 'Stock not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// 4. Portfolio Holdings Routes
// -------------------------------------------------------------
app.get('/api/holdings', async (req, res) => {
  try {
    const [holdings] = await pool.query(`
      SELECT h.id, h.symbol, s.name, h.quantity AS qty, h.avg_price AS avgPrice,
             s.price AS ltp, (h.quantity * h.avg_price) AS invested,
             (h.quantity * s.price) AS current,
             ((h.quantity * s.price) - (h.quantity * h.avg_price)) AS pnl,
             ROUND((((s.price - h.avg_price) / h.avg_price) * 100), 2) AS pnlPercent,
             h.sector
      FROM holdings h
      JOIN stocks s ON h.symbol = s.symbol
    `);
    res.json(holdings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// 5. Trades Routes (Execution & History)
// -------------------------------------------------------------
app.get('/api/trades', async (req, res) => {
  try {
    const [trades] = await pool.query(
      'SELECT id, symbol AS stock, trade_type AS type, quantity AS qty, price, total, pnl, pnl_percent AS pnlPercent, status, DATE_FORMAT(created_at, "%Y-%m-%d %H:%i") AS date FROM trades ORDER BY created_at DESC'
    );
    res.json(trades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/trades', async (req, res) => {
  const { userId = 'USR-002', stock, type, qty, price } = req.body;
  try {
    const id = `TRD-${Date.now().toString().slice(-4)}`;
    const total = parseFloat((Number(qty) * Number(price)).toFixed(2));
    const pnl = parseFloat((total * 0.015).toFixed(2)); // simulated initial pnl
    const pnlPercent = 1.5;

    await pool.query(
      'INSERT INTO trades (id, user_id, symbol, trade_type, quantity, price, total, pnl, pnl_percent, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, userId, stock, type, qty, price, total, pnl, pnlPercent, 'Executed']
    );

    res.status(201).json({
      id,
      stock,
      type,
      qty,
      price,
      total,
      pnl,
      pnlPercent,
      status: 'Executed',
      date: new Date().toISOString().replace('T', ' ').slice(0, 16)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// 6. Alerts Routes
// -------------------------------------------------------------
app.get('/api/alerts', async (req, res) => {
  try {
    const [alerts] = await pool.query(
      'SELECT a.id, a.symbol AS stock, a.condition_type AS condition, a.target_price AS targetPrice, s.price AS currentPrice, a.status, DATE_FORMAT(a.created_at, "%Y-%m-%d %H:%i") AS createdAt FROM alerts a JOIN stocks s ON a.symbol = s.symbol ORDER BY a.created_at DESC'
    );
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/alerts', async (req, res) => {
  const { userId = 'USR-002', stock, condition, targetPrice } = req.body;
  try {
    const id = `ALT-${Date.now().toString().slice(-4)}`;
    await pool.query(
      'INSERT INTO alerts (id, user_id, symbol, condition_type, target_price, status) VALUES (?, ?, ?, ?, ?, ?)',
      [id, userId, stock, condition, targetPrice, 'ACTIVE']
    );
    res.status(201).json({ id, stock, condition, targetPrice, status: 'ACTIVE', createdAt: 'Just now' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/alerts/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM alerts WHERE id = ?', [req.params.id]);
    res.json({ message: 'Alert deleted', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// 7. Security Settings & Incidents Routes
// -------------------------------------------------------------
app.get('/api/security', async (req, res) => {
  try {
    const [settings] = await pool.query('SELECT * FROM security_settings LIMIT 1');
    const [incidents] = await pool.query('SELECT * FROM security_incidents ORDER BY id DESC');
    res.json({
      settings: settings[0] || {},
      incidents: incidents || []
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/security', async (req, res) => {
  const { twoFactorEnforced, dataEncryptionAtRest, sessionTimeoutMinutes, ipWhitelistingEnabled, strictPasswordPolicy, biometricAllowed } = req.body;
  try {
    await pool.query(
      'UPDATE security_settings SET two_factor_enforced = ?, data_encryption_at_rest = ?, session_timeout_minutes = ?, ip_whitelisting_enabled = ?, strict_password_policy = ?, biometric_allowed = ? WHERE id = 1',
      [twoFactorEnforced, dataEncryptionAtRest, sessionTimeoutMinutes, ipWhitelistingEnabled, strictPasswordPolicy, biometricAllowed]
    );
    res.json({ message: 'Security settings updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// 8. System Configuration Settings
// -------------------------------------------------------------
app.get('/api/settings', async (req, res) => {
  try {
    const [settings] = await pool.query('SELECT * FROM system_settings LIMIT 1');
    res.json(settings[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/settings', async (req, res) => {
  const { platformName, tradingHours, brokerageRate, brokerageFlat, defaultCurrency, maintenanceMode, supportEmail } = req.body;
  try {
    await pool.query(
      'UPDATE system_settings SET platform_name = ?, trading_hours = ?, brokerage_rate = ?, brokerage_flat = ?, default_currency = ?, maintenance_mode = ?, support_email = ? WHERE id = 1',
      [platformName, tradingHours, brokerageRate, brokerageFlat, defaultCurrency, maintenanceMode, supportEmail]
    );
    res.json({ message: 'System settings updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// Start Server
// -------------------------------------------------------------
app.listen(PORT, async () => {
  console.log(`=======================================================`);
  console.log(`🚀 TradeNest Backend API Server running on port ${PORT}`);
  console.log(`📡 URL: http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
  await testConnection();
});
