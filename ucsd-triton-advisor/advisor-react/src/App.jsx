import React, { useState, useEffect, useRef, useCallback } from 'react';

// ─── UCSD Brand Colors ─────────────────────────────────────────
const C = {
  navy:      '#182B49',
  navyMid:   '#1e3560',
  blue:      '#00629B',
  blueL:     '#0084bb',
  yellow:    '#FFCD00',
  gold:      '#C69214',
  turquoise: '#00C6D7',
  magenta:   '#D462AD',
  sand:      '#F5F0E6',
  orange:    '#FC8900',
  green:     '#6E963B',
  muted:     '#8fa8c8',
};

// ─── Student data (from actual degree audit) ───────────────────
const STUDENT = {
  name: 'Antara Chhabra',
  pid: 'A18123456',
  major: 'Computer Science (B.S.)',
  college: 'Warren',
  catalogYear: 'Fall 2025',
  gpa: 4.00,
  standing: 'Sophomore',
  unitsCompleted: 31,
  unitsInProgress: 22,
  unitsRequired: 180,
  estimatedGrad: 'Spring 2029',
  currentQuarter: 'Winter 2026',
  completedCourses: [
    { code:'CSE 11',   name:'Accel. Intro to Programming',    units:4, grade:'A+', term:'FA25' },
    { code:'MATH 18',  name:'Linear Algebra',                 units:4, grade:'A+', term:'FA25' },
    { code:'WCWP 10A', name:'The Writing Course A',           units:4, grade:'A+', term:'FA25' },
    { code:'ECON 1',   name:'Principles of Microeconomics',   units:4, grade:'A',  term:'FA25' },
    { code:'MATH 20A', name:'Calculus / Science & Eng.',      units:4, grade:'TP', term:'Prior' },
    { code:'AP EI3',   name:'Economics: Micro (AP)',          units:4, grade:'TP', term:'Prior' },
  ],
  inProgressCourses: [
    { code:'MATH 20C', name:'Calculus & Analytic Geometry',   units:4, term:'WI26' },
    { code:'CSE 12',   name:'Basic Data Struct & OO Design',  units:4, term:'WI26' },
    { code:'CSE 20',   name:'Discrete Mathematics',           units:4, term:'WI26' },
    { code:'MUS 4',    name:'Music: Understanding & Appreciating', units:4, term:'WI26' },
    { code:'ANTH 10',  name:'Climate Justice',                units:4, term:'WI26' },
    { code:'CSE 89',   name:'Intro to CSE Seminar',           units:2, term:'WI26' },
  ],
  plannedCourses: [
    { code:'ECON 120A',name:'Econometrics A',                 units:4, term:'SP26' },
    { code:'WCWP 10B', name:'The Writing Course B',           units:4, term:'SP26' },
  ],
};

const SYSTEM_PROMPT = `You are Oogway, a wise, warm, and slightly witty AI academic advisor for UC San Diego. You channel the energy of Master Oogway from Kung Fu Panda — patient, insightful, occasionally philosophical — but you're also deeply knowledgeable about UCSD academics.

STUDENT PROFILE:
- Name: ${STUDENT.name}
- PID: ${STUDENT.pid}
- Major: ${STUDENT.major} | College: ${STUDENT.college} | Catalog: ${STUDENT.catalogYear}
- Cumulative GPA: ${STUDENT.gpa} | Standing: ${STUDENT.standing}
- Units: ${STUDENT.unitsCompleted} completed | ${STUDENT.unitsInProgress} in progress | ${STUDENT.unitsRequired} required
- Est. Graduation: ${STUDENT.estimatedGrad} | Current: ${STUDENT.currentQuarter}

COMPLETED (FA25): CSE 11 A+, MATH 18 A+, WCWP 10A A+, ECON 1 A — perfect 4.0 GPA
TRANSFER/AP: MATH 20A (TP), AP EI3 Econ Micro (TP)
IN PROGRESS (WI26): MATH 20C (4u), CSE 12 (4u), CSE 20 (4u), MUS 4 (4u), ANTH 10 (4u), CSE 89 (2u) = 22 units — a HEAVY load
PLANNED (SP26): ECON 120A, WCWP 10B

KEY ADVISING NOTES:
- 22 units in WI26 is significantly above the 12-17 unit typical range for a 1st-year student. Monitor carefully.
- CSE 12 + CSE 20 + MATH 20C simultaneously is a notoriously tough combo. Many students struggle with this.
- Still needs: Upper division CS core (CSE 100, 101, 110, 120, 130, 140, 140L, 141, 141L, 150, 152, 160), Warren GE (Humanities, Social Science), remaining lower division CS, Math stats/probability.
- 127 units still needed, roughly 6-7 more quarters at ~18-20 units/quarter.
- For CS grad school: aim for 3.7+ GPA, research experience, LORs. Current 4.0 is excellent.
- Warren College requirements: WCWP 10A (done!), 10B (planned), Area Studies, Formal Skills, Natural Sciences, Fine Arts, Social Analysis, DEI.

PERSONALITY: Be encouraging but realistic. Use brief wisdom quotes occasionally. Keep responses conversational and focused (2-5 sentences unless asked for detail). Use markdown for lists when helpful. Celebrate Antara's excellent start!`;

// ─── Suggestion chips ─────────────────────────────────────────
const SUGGESTIONS = [
  'Can I graduate in 3 years?',
  'Is 22 units too heavy this quarter?',
  'What CS upper division courses come next?',
  'Which profs are best for CSE 21?',
  'How do I qualify for CS honors?',
  'What GPA do I need for CS grad school?',
  'What Warren GE requirements do I still need?',
  'Should I drop a class this quarter?',
];

// ─── Animated typing indicator ────────────────────────────────
function TypingDots() {
  return (
    <div style={{ display:'flex', gap:5, alignItems:'center', padding:'4px 2px' }}>
      {[0,1,2].map(i => (
        <div key={i} style={{
          width:7, height:7, borderRadius:'50%',
          background: C.turquoise, opacity:0.7,
          animation:`typingBounce 1.2s ease-in-out ${i*0.2}s infinite`,
        }}/>
      ))}
    </div>
  );
}

// ─── Mini stat card ───────────────────────────────────────────
function StatCard({ label, value, sub, color }) {
  return (
    <div style={{
      background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
      borderRadius:9, padding:'9px 12px', marginBottom:6,
    }}>
      <div style={{ fontSize:8, color:C.muted, letterSpacing:'1px', textTransform:'uppercase', marginBottom:2 }}>{label}</div>
      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, color:color||C.yellow, lineHeight:1 }}>{value}</div>
      {sub && <div style={{ fontSize:9, color:C.turquoise, marginTop:2 }}>{sub}</div>}
    </div>
  );
}

// ─── Message bubble ───────────────────────────────────────────
function Message({ role, content, timestamp }) {
  const isBot = role === 'assistant';
  return (
    <div style={{
      display:'flex', gap:9, maxWidth:'82%',
      alignSelf: isBot ? 'flex-start' : 'flex-end',
      flexDirection: isBot ? 'row' : 'row-reverse',
      animation:'msgFadeIn 0.3s ease both',
    }}>
      {/* Avatar */}
      <div style={{
        width:30, height:30, borderRadius:'50%', flexShrink:0,
        overflow:'hidden',
        border: `2px solid ${isBot ? 'rgba(255,205,0,0.35)' : 'rgba(0,198,215,0.4)'}`,
        background: isBot ? '#0a1628' : `linear-gradient(135deg, ${C.blue}, ${C.gold})`,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize: isBot ? undefined : '11px', fontWeight:700,
      }}>
        {isBot
          ? <img src="/oogway.jpg" alt="Oogway" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
          : 'AC'
        }
      </div>

      <div>
        <div style={{
          padding:'10px 14px', borderRadius:12, fontSize:13, lineHeight:1.6,
          background: isBot ? 'rgba(0,98,155,0.22)' : 'rgba(255,205,0,0.1)',
          border: `1px solid ${isBot ? 'rgba(0,98,155,0.38)' : 'rgba(255,205,0,0.28)'}`,
          borderRadius: isBot ? '4px 12px 12px 12px' : '12px 4px 12px 12px',
          color: isBot ? C.sand : C.yellow,
          // Simple markdown-ish bold support
          whiteSpace: 'pre-wrap',
        }}>
          <RenderMarkdown text={content} />
        </div>
        <div style={{ fontSize:8.5, color:C.muted, marginTop:3, padding:'0 2px', textAlign: isBot ? 'left' : 'right' }}>
          {isBot ? 'Oogway AI' : 'You'} · {timestamp}
        </div>
      </div>
    </div>
  );
}

// ─── Simple markdown renderer ─────────────────────────────────
function RenderMarkdown({ text }) {
  // Process bold, line breaks, bullet lists
  const lines = text.split('\n');
  return (
    <div>
      {lines.map((line, i) => {
        const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('• ');
        const content = line.replace(/^[-•]\s+/, '');
        const parts = content.split(/\*\*(.+?)\*\*/g);
        const rendered = parts.map((p, pi) =>
          pi % 2 === 1 ? <strong key={pi} style={{ color: C.yellow }}>{p}</strong> : p
        );
        if (isBullet) return <div key={i} style={{ paddingLeft:12, position:'relative', marginTop:2 }}>
          <span style={{ position:'absolute', left:0, color:C.turquoise }}>•</span>{rendered}
        </div>;
        if (!line.trim()) return <div key={i} style={{ height:6 }}/>;
        return <div key={i}>{rendered}</div>;
      })}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────
export default function App() {
  const [messages, setMessages] = useState([
    {
      role:'assistant',
      content: `Hello, Antara! 🎓 I'm Oogway, your AI academic advisor.\n\nI can see you've had an **outstanding start** — four A's in FA25 including three A+'s. A perfect **4.00 GPA** — that's the way! ✨\n\nYou're currently in WI26 with **22 units in progress** — a notably heavy load. I'm here to help you navigate your path to graduation.\n\n*"Yesterday is history, tomorrow is a mystery, but today is a gift."* What would you like to explore?`,
      timestamp: formatTime(new Date()),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  function formatTime(d) {
    const h = d.getHours() % 12 || 12;
    const m = String(d.getMinutes()).padStart(2,'0');
    const ap = d.getHours() >= 12 ? 'PM' : 'AM';
    return `${h}:${m} ${ap}`;
  }

  const sendMessage = useCallback(async (text) => {
    const msg = (text || input).trim();
    if (!msg || isLoading) return;
    setInput('');
    setError(null);

    const userMsg = { role:'user', content:msg, timestamp:formatTime(new Date()) };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    // Build history for API (without timestamps)
    const apiHistory = newMessages.map(m => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiHistory, systemPrompt: SYSTEM_PROMPT }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const reply = data.content || data.message || 'I encountered an issue. Please try again.';

      setMessages(prev => [...prev, {
        role:'assistant', content:reply, timestamp:formatTime(new Date()),
      }]);
    } catch (err) {
      console.error('Chat error:', err);
      setError('Connection issue. Using offline mode.');
      // Fallback responses
      const reply = getFallbackResponse(msg);
      setMessages(prev => [...prev, {
        role:'assistant', content:reply, timestamp:formatTime(new Date()),
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, messages, isLoading]);

  function getFallbackResponse(msg) {
    const ml = msg.toLowerCase();
    if (ml.includes('graduate') && (ml.includes('3 year') || ml.includes('early'))) {
      return `Looking at your pace — you have **53 units** by end of WI26 (31 completed + 22 in progress). With 127 units still needed, you'd need ~22u/quarter for 6 more quarters.\n\n**Earliest possible:** Spring 2028 (taking 18-20u every quarter, including summers). Achievable with your 4.0, but risky with the CS upper division load.\n\nWant me to map out the exact quarter plan?`;
    }
    if (ml.includes('overload') || ml.includes('22 unit') || ml.includes('too many') || ml.includes('heavy')) {
      return `Yes — **22 units in WI26 is very heavy**, especially as a first-year. The standard recommendation is 12-16u.\n\nThe combo of **CSE 12 + CSE 20 + MATH 20C** is particularly demanding. Many students find this trio alone is a full workload.\n\n*"One often meets his destiny on the road he takes to avoid it."* Consider if dropping ANTH 10 or MUS 4 is worth the breathing room. Want to talk through options?`;
    }
    if (ml.includes('upper division') || ml.includes('upper-division') || ml.includes('cse upper')) {
      return `For the **CS B.S. Upper Division Core**, you'll need:\n- **CSE 100** — Advanced Data Structures\n- **CSE 101** — Design & Analysis of Algorithms\n- **CSE 110** — Software Engineering\n- **CSE 120** — Principles of Computer Operating Systems\n- **CSE 130** — Programming Languages\n- **CSE 140/140L** — Components & Design Techniques\n- **CSE 141/141L** — Intro to Computer Architecture\n- **CSE 150/152** — AI / Intro to Computer Vision\n- **CSE 160** — Introduction to Parallel Computation\n\nSuggested next steps after WI26: **CSE 30** (Computer Organization) → then upper division.`;
    }
    if (ml.includes('prof') || ml.includes('professor') || ml.includes('best') || ml.includes('cse 21')) {
      return `For professor recommendations, I'd check **capes.ucsd.edu** (official UCSD evals) and **ratemyprofessors.com**.\n\nFor CSE 21 (Discrete Math & Graph Theory), students generally favor professors who give practice midterms and have clear lectures. Check CAPES for "overall quality" and "hours per week" ratings.\n\nWant tips on what to look for in professor ratings?`;
    }
    if (ml.includes('grad school') || ml.includes('phd') || ml.includes('masters')) {
      return `Your **4.00 GPA** puts you in excellent shape for CS grad school! A few key things:\n\n- **Top PhD programs** (MIT, Stanford, CMU): GPA 3.7+ ✓, but research experience and LORs are equally critical\n- **MS programs**: Your GPA is competitive anywhere\n- **Next steps**: Start looking for undergraduate research (join a lab by your junior year), get to know 2-3 professors who can write strong LORs\n\nFor CS specifically, **published research** can matter more than GPA for top-tier programs.`;
    }
    if (ml.includes('warren') || ml.includes('ge') || ml.includes('general education')) {
      return `For **Warren College GE requirements**, you still need:\n\n- **WCWP 10B** — Planned SP26 ✓\n- **Humanities/Fine Arts Area Study** — 3 courses (4u each) — MUS 4 may count!\n- **Social Science Area Study** — 3 courses — ANTH 10 + ECON 1 may count\n- **Natural Science** — may be waived for CS majors\n- **DEI requirement** — check if ANTH 10 satisfies this\n\nI'd recommend reviewing your specific Warren GE audit at act.ucsd.edu to confirm which boxes each course checks.`;
    }
    if (ml.includes('drop') || ml.includes('withdraw')) {
      return `Dropping a course is a significant decision. A few things to consider:\n\n- **Deadline**: WI26 drop deadline is typically Week 4 (no "W" on transcript), Week 10 for withdrawal with W\n- **Financial aid**: Dropping below 12u may affect aid — check with the Financial Aid office\n- **Course sequence**: CSE 12 is a prerequisite for CSE 30 and CSE 130 — dropping it delays your path\n- **Recommendation**: If you must drop, ANTH 10 or MUS 4 are safer drops than the CS/Math sequence\n\nHave you talked to your Warren College advisor?`;
    }
    return `Great question! With your **4.00 GPA** and strong foundation in FA25, you're building excellent momentum.\n\nKey things to watch: Your WI26 load is heavy — make sure you're staying on top of CSE 12, CSE 20, and MATH 20C simultaneously.\n\n*"There are no accidents."* Keep focusing on the fundamentals and the path will become clear. What specifically would you like to explore?`;
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{
      height:'100vh', display:'flex', flexDirection:'column',
      background:`linear-gradient(135deg, ${C.navy} 0%, #1a2f50 100%)`,
      backgroundImage:`
        radial-gradient(ellipse 60% 50% at 20% 20%, rgba(0,98,155,0.18) 0%, transparent 60%),
        radial-gradient(ellipse 40% 60% at 80% 80%, rgba(198,146,20,0.1) 0%, transparent 55%)
      `,
    }}>
      <style>{`
        @keyframes typingBounce {
          0%,60%,100% { transform:translateY(0); }
          30% { transform:translateY(-6px); }
        }
        @keyframes msgFadeIn {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes float {
          0%,100% { transform:translateY(0); }
          50%     { transform:translateY(-7px); }
        }
        @keyframes breathe {
          0%,100% { transform:scale(1); opacity:.6; }
          50%     { transform:scale(1.15); opacity:1; }
        }
        @keyframes pulse {
          0%,100% { opacity:1; }
          50%     { opacity:0.4; }
        }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(255,205,0,0.2); border-radius:2px; }
        * { box-sizing:border-box; }
        textarea:focus { outline:none; }
      `}</style>

      <div style={{ flex:1, display:'grid', gridTemplateColumns:'1fr 340px', minHeight:0, overflow:'hidden' }}>

        {/* ─── LEFT: Chat Area ─────────────────────────────── */}
        <div style={{ display:'flex', flexDirection:'column', borderRight:`1px solid rgba(255,205,0,0.12)`, minHeight:0 }}>

          {/* Oogway portrait zone */}
          <div style={{
            padding:'22px 24px 18px', display:'flex', flexDirection:'column',
            alignItems:'center', justifyContent:'center', flexShrink:0,
            background:'radial-gradient(ellipse 65% 55% at 50% 45%, rgba(0,98,155,0.16), transparent 70%)',
            borderBottom:`1px solid rgba(255,205,0,0.1)`,
            height:220,
          }}>
            {/* Glow */}
            <div style={{
              position:'relative', display:'flex', flexDirection:'column',
              alignItems:'center',
            }}>
              <div style={{
                position:'absolute', width:140, height:140,
                background:'radial-gradient(circle, rgba(255,205,0,0.14), transparent 70%)',
                borderRadius:'50%',
                animation:'breathe 4s ease-in-out infinite',
                top:'50%', left:'50%', transform:'translate(-50%,-50%)',
                marginTop:-10,
              }}/>
              <div style={{
                width:110, height:110, borderRadius:'50%', overflow:'hidden',
                border:`3.5px solid rgba(255,205,0,0.5)`,
                boxShadow:'0 0 32px rgba(255,205,0,0.22)',
                position:'relative', zIndex:2, background:'#0a1628',
                animation:'float 6s ease-in-out infinite',
              }}>
                <img src="/oogway.jpg" alt="Oogway" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              </div>
            </div>
            <div style={{
              fontFamily:"'Bebas Neue',sans-serif", fontSize:22,
              letterSpacing:4, color:C.yellow, marginTop:10,
              textShadow:'0 0 20px rgba(255,205,0,0.35)',
            }}>OOGWAY</div>
            <div style={{
              fontSize:9, color:C.turquoise, letterSpacing:'2px',
              textTransform:'uppercase', display:'flex', alignItems:'center', gap:6, marginTop:2,
            }}>
              <div style={{ width:7, height:7, background:'#4ade80', borderRadius:'50%', boxShadow:'0 0 7px #4ade80', animation:'pulse 2s infinite' }}/>
              ACTIVE · CLAUDE AI · UCSD ADVISOR
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex:1, overflowY:'auto', padding:'18px 22px',
            display:'flex', flexDirection:'column', gap:14,
          }}>
            {messages.map((msg, i) => (
              <Message key={i} role={msg.role} content={msg.content} timestamp={msg.timestamp}/>
            ))}
            {isLoading && (
              <div style={{ display:'flex', gap:9, alignSelf:'flex-start', animation:'msgFadeIn 0.3s ease both' }}>
                <div style={{
                  width:30, height:30, borderRadius:'50%', flexShrink:0,
                  overflow:'hidden', border:`2px solid rgba(255,205,0,0.35)`, background:'#0a1628',
                }}>
                  <img src="/oogway.jpg" alt="Oogway" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                </div>
                <div style={{
                  padding:'10px 14px', borderRadius:'4px 12px 12px 12px', fontSize:13,
                  background:'rgba(0,98,155,0.22)', border:`1px solid rgba(0,98,155,0.38)`,
                }}>
                  <TypingDots/>
                </div>
              </div>
            )}
            {error && (
              <div style={{
                alignSelf:'center', fontSize:10, color:C.orange,
                background:'rgba(252,137,0,0.1)', border:`1px solid rgba(252,137,0,0.3)`,
                borderRadius:8, padding:'4px 10px',
              }}>
                ⚠ {error}
              </div>
            )}
            <div ref={messagesEndRef}/>
          </div>

          {/* Input area */}
          <div style={{
            padding:'12px 18px', borderTop:`1px solid rgba(255,205,0,0.12)`,
            display:'flex', gap:10, alignItems:'flex-end', flexShrink:0,
          }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => {
                setInput(e.target.value);
                e.target.style.height='auto';
                e.target.style.height=Math.min(e.target.scrollHeight,100)+'px';
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask Oogway anything about your academic plan…"
              rows={1}
              style={{
                flex:1, background:'rgba(255,255,255,0.05)',
                border:`1px solid ${input ? 'rgba(255,205,0,0.45)' : 'rgba(255,205,0,0.22)'}`,
                borderRadius:12, padding:'10px 13px',
                color:C.sand, fontSize:13, fontFamily:"'DM Sans',sans-serif",
                resize:'none', minHeight:42, maxHeight:100,
                scrollbarWidth:'none', transition:'border-color 0.2s',
                lineHeight:1.5,
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              style={{
                width:42, height:42, borderRadius:12, flexShrink:0,
                background: (!input.trim() || isLoading) ? 'rgba(255,205,0,0.3)' : C.yellow,
                border:'none', cursor:(!input.trim()||isLoading)?'not-allowed':'pointer',
                display:'flex', alignItems:'center', justifyContent:'center',
                color:C.navy, transition:'all 0.2s',
                boxShadow: (!input.trim()||isLoading) ? 'none' : '0 0 14px rgba(255,205,0,0.3)',
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ─── RIGHT: Context Sidebar ──────────────────────── */}
        <div style={{
          display:'flex', flexDirection:'column', padding:'16px', gap:0,
          overflowY:'auto', background:'rgba(255,255,255,0.01)',
        }}>

          {/* Stats */}
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:12, letterSpacing:'1.5px', color:C.yellow, marginBottom:8 }}>
            STUDENT SNAPSHOT
          </div>

          <StatCard label="Cumulative GPA" value="4.00" sub="Perfect score — excellent!" color={C.yellow}/>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, marginBottom:6 }}>
            <div style={{ background:'rgba(255,255,255,0.04)', border:`1px solid rgba(255,255,255,0.08)`, borderRadius:9, padding:'8px 11px' }}>
              <div style={{ fontSize:8, color:C.muted, letterSpacing:'1px', textTransform:'uppercase', marginBottom:1 }}>Completed</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, color:C.yellow, lineHeight:1 }}>31u</div>
              <div style={{ fontSize:8.5, color:'#86d96a', marginTop:1 }}>FA25 + Transfer</div>
            </div>
            <div style={{ background:'rgba(167,139,250,0.08)', border:`1px solid rgba(167,139,250,0.2)`, borderRadius:9, padding:'8px 11px' }}>
              <div style={{ fontSize:8, color:C.muted, letterSpacing:'1px', textTransform:'uppercase', marginBottom:1 }}>In Progress</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, color:'#c4b5fd', lineHeight:1 }}>22u</div>
              <div style={{ fontSize:8.5, color:C.orange, marginTop:1 }}>⚠ Heavy load</div>
            </div>
          </div>

          <StatCard label="Remaining" value="127u" sub="~6-7 quarters at 18u/qtr" color={C.muted}/>
          <StatCard label="Est. Graduation" value="SP 2029" sub="On 4-year track" color={C.turquoise}/>

          {/* Current quarter */}
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:12, letterSpacing:'1.5px', color:C.yellow, margin:'10px 0 7px' }}>
            WI26 COURSES
          </div>

          {STUDENT.inProgressCourses.map((c, i) => {
            const colors = [
              {bg:'rgba(198,146,20,0.15)', bdr:'rgba(198,146,20,0.3)', txt:'#e8c45a'},
              {bg:'rgba(0,198,215,0.12)',  bdr:'rgba(0,198,215,0.3)',  txt:C.turquoise},
              {bg:'rgba(0,98,155,0.2)',    bdr:'rgba(0,98,155,0.4)',   txt:'#6db8e8'},
              {bg:'rgba(212,98,173,0.12)', bdr:'rgba(212,98,173,0.3)', txt:'#e88bd0'},
              {bg:'rgba(110,150,59,0.15)', bdr:'rgba(110,150,59,0.3)', txt:'#9ed65e'},
              {bg:'rgba(252,137,0,0.12)',  bdr:'rgba(252,137,0,0.3)',  txt:'#ffa94d'},
            ];
            const col = colors[i % colors.length];
            return (
              <div key={c.code} style={{
                background:col.bg, border:`1px solid ${col.bdr}`,
                borderRadius:7, padding:'6px 10px', marginBottom:4,
              }}>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, fontWeight:700, color:col.txt }}>{c.code}</div>
                <div style={{ fontSize:9.5, color:'rgba(245,240,230,0.65)', marginTop:1 }}>{c.name} · {c.units}u</div>
              </div>
            );
          })}

          {/* Suggestions */}
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:12, letterSpacing:'1.5px', color:C.yellow, margin:'10px 0 7px' }}>
            QUICK QUESTIONS
          </div>
          {SUGGESTIONS.map((s, i) => (
            <button
              key={i}
              onClick={() => sendMessage(s)}
              disabled={isLoading}
              style={{
                display:'block', width:'100%', textAlign:'left',
                background:'rgba(0,98,155,0.14)', border:`1px solid rgba(0,98,155,0.28)`,
                borderRadius:8, padding:'8px 11px', marginBottom:4,
                color:C.sand, fontSize:11, cursor:isLoading?'not-allowed':'pointer',
                fontFamily:"'DM Sans',sans-serif",
                transition:'all 0.2s',
              }}
              onMouseEnter={e => { if(!isLoading){e.target.style.background='rgba(0,198,215,0.16)';e.target.style.borderColor=C.turquoise;e.target.style.color=C.turquoise;e.target.style.transform='translateX(3px)'; }}}
              onMouseLeave={e => { e.target.style.background='rgba(0,98,155,0.14)';e.target.style.borderColor='rgba(0,98,155,0.28)';e.target.style.color=C.sand;e.target.style.transform='none'; }}
            >
              {s}
            </button>
          ))}

          <div style={{ height:16 }}/>
        </div>
      </div>
    </div>
  );
}
