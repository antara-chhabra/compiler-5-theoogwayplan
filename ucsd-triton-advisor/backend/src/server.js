require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const app  = express();
const PORT = process.env.PORT || 3002;

// ─── Anthropic client ─────────────────────────────────────────
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ─── Middleware ───────────────────────────────────────────────
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3001',
    'http://localhost:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:5500',  // live-server / VS Code
    'null',                    // file:// protocol
  ],
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json({ limit: '2mb' }));

// ─── Health check ─────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    model: process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514',
    timestamp: new Date().toISOString(),
  });
});

// ─── Chat endpoint ────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  const { messages, systemPrompt } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  // Strip timestamps and extra fields — keep only role/content
  const cleanMessages = messages
    .filter(m => m.role && m.content)
    .map(m => ({ role: m.role, content: String(m.content) }));

  // Validate roles (Anthropic requires alternating user/assistant starting with user)
  const validMessages = [];
  for (const msg of cleanMessages) {
    if (msg.role !== 'user' && msg.role !== 'assistant') continue;
    validMessages.push(msg);
  }

  if (validMessages.length === 0 || validMessages[0].role !== 'user') {
    return res.status(400).json({ error: 'First message must be from user' });
  }

  try {
    const response = await anthropic.messages.create({
      model:      process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514',
      max_tokens: parseInt(process.env.MAX_TOKENS) || 1024,
      system:     systemPrompt || getDefaultSystemPrompt(),
      messages:   validMessages,
    });

    const content = response.content[0]?.text || '';

    res.json({
      content,
      usage: {
        input_tokens:  response.usage?.input_tokens,
        output_tokens: response.usage?.output_tokens,
      },
    });
  } catch (err) {
    console.error('Anthropic API error:', err.message);

    if (err.status === 401) {
      return res.status(401).json({ error: 'Invalid API key. Check your ANTHROPIC_API_KEY in .env' });
    }
    if (err.status === 429) {
      return res.status(429).json({ error: 'Rate limit reached. Please try again shortly.' });
    }
    if (err.status === 400) {
      return res.status(400).json({ error: `API request error: ${err.message}` });
    }

    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
});

// ─── Streaming chat endpoint (optional — for future use) ──────
app.post('/api/chat/stream', async (req, res) => {
  const { messages, systemPrompt } = req.body;

  if (!messages?.length) {
    return res.status(400).json({ error: 'messages required' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const cleanMessages = messages
    .filter(m => m.role && m.content)
    .map(m => ({ role: m.role, content: String(m.content) }));

  try {
    const stream = anthropic.messages.stream({
      model:      process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system:     systemPrompt || getDefaultSystemPrompt(),
      messages:   cleanMessages,
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
        res.write(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    res.end();
  }
});

// ─── Student data endpoint ────────────────────────────────────
app.get('/api/student', (req, res) => {
  res.json({
    name:            'Antara Chhabra',
    pid:             'A18123456',
    major:           'Computer Science (B.S.)',
    college:         'Warren',
    catalogYear:     'Fall 2025',
    gpa:             4.00,
    standing:        'Sophomore',
    unitsCompleted:  31,
    unitsInProgress: 22,
    unitsRequired:   180,
    estimatedGrad:   'Spring 2029',
    currentQuarter:  'Winter 2026',
    completedCourses: [
      { code:'CSE 11',   name:'Accel. Intro to Programming',  units:4, grade:'A+', term:'FA25' },
      { code:'MATH 18',  name:'Linear Algebra',               units:4, grade:'A+', term:'FA25' },
      { code:'WCWP 10A', name:'The Writing Course A',         units:4, grade:'A+', term:'FA25' },
      { code:'ECON 1',   name:'Principles of Microeconomics', units:4, grade:'A',  term:'FA25' },
      { code:'MATH 20A', name:'Calculus / Science & Eng.',    units:4, grade:'TP', term:'Prior' },
      { code:'AP EI3',   name:'Economics: Micro (AP)',        units:4, grade:'TP', term:'Prior' },
    ],
    inProgressCourses: [
      { code:'MATH 20C', name:'Calculus & Analytic Geometry',      units:4, term:'WI26' },
      { code:'CSE 12',   name:'Basic Data Struct & OO Design',     units:4, term:'WI26' },
      { code:'CSE 20',   name:'Discrete Mathematics',              units:4, term:'WI26' },
      { code:'MUS 4',    name:'Music: Understanding & Appreciating', units:4, term:'WI26' },
      { code:'ANTH 10',  name:'Climate Justice',                   units:4, term:'WI26' },
      { code:'CSE 89',   name:'Intro to CSE Seminar',              units:2, term:'WI26' },
    ],
    plannedCourses: [
      { code:'ECON 120A', name:'Econometrics A',    units:4, term:'SP26' },
      { code:'WCWP 10B',  name:'The Writing Course B', units:4, term:'SP26' },
    ],
  });
});

// ─── Default system prompt ────────────────────────────────────
function getDefaultSystemPrompt() {
  return `You are Oogway, a wise and warm AI academic advisor for UC San Diego. Be concise, encouraging, and insightful. Keep responses to 2-5 sentences unless detail is requested.`;
}

// ─── Start server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🐢  Oogway Advisor Backend running on http://localhost:${PORT}`);
  console.log(`    Health check: http://localhost:${PORT}/health`);
  console.log(`    Chat API:     POST http://localhost:${PORT}/api/chat`);
  console.log(`    Student API:  GET  http://localhost:${PORT}/api/student\n`);

  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_api_key_here') {
    console.warn('⚠  ANTHROPIC_API_KEY not set — copy .env.example to .env and add your key\n');
  }
});
