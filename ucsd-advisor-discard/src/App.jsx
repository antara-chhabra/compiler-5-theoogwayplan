import React from 'react';
import Webcam from 'react-webcam';
import { Calendar, Award, Clock, Activity, Video } from 'lucide-react';

// --- DATA ---
const STUDENT_DATA = {
  name: "Antara Chhabra",
  pid: "A18123456",
  gpa: "4.00",
  units_earned: 31.00,
  total_units: 180,
  history: [
    { code: "CSE 11", title: "Accel. Intro to Programming", grade: "A+" },
    { code: "WCWP 10A", title: "The Writing Course A", grade: "A+" },
    { code: "MATH 18", title: "Linear Algebra", grade: "A+" },
    { code: "ECON 1", title: "Microeconomics", grade: "A" },
    { code: "CSE 87", title: "First-year Seminar", grade: "P" },
    { code: "CSE 89", title: "Intro to CSE Seminar", grade: "P" },
  ],
  winter: [
    { code: "MATH 20C", type: "LEC", time: "MWF 9:00-9:50 AM", loc: "MOS 0114" },
    { code: "CSE 12", type: "LEC", time: "TuTh 9:30-10:50 AM", loc: "PETER 108" },
    { code: "MUS 4", type: "LEC", time: "TuTh 11:00-12:20 PM", loc: "SOLIS 107" },
    { code: "CSE 89", type: "SEM", time: "Wed 11:00-12:20 PM", loc: "EBU3B 1202" },
    { code: "MUS 4", type: "LAB", time: "Mon 12:00-12:50 PM", loc: "WLH 2154" },
    { code: "CSE 20", type: "LEC", time: "MWF 1:00-1:50 PM", loc: "CENTR 115" },
    { code: "ANTH 10", type: "LEC", time: "MWF 4:00-4:50 PM", loc: "CTL 0125" },
  ]
};

// --- COMPONENTS ---

const Panel = ({ title, icon: Icon, children, className = "" }) => (
  <div className={`bg-navy border border-blue rounded-xl flex flex-col overflow-hidden shadow-2xl ${className}`}>
    <div className="bg-blue/20 backdrop-blur-md px-4 py-3 border-b border-blue flex items-center gap-2">
      <Icon className="w-5 h-5 text-yellow" />
      <h2 className="text-white font-bold text-sm tracking-wider uppercase">{title}</h2>
    </div>
    <div className="flex-1 overflow-auto p-4 scrollbar-hide relative">
      {children}
    </div>
  </div>
);

const App = () => {
  return (
    <div className="h-screen w-screen bg-navy text-white overflow-hidden flex flex-col p-4 gap-4 font-sans select-none">
      
      {/* HEADER */}
      <header className="flex justify-between items-center px-2 shrink-0">
        <div>
          <h1 className="text-2xl font-black tracking-tighter">
            UCSD <span className="text-yellow">ADVISOR</span>
          </h1>
          <p className="text-xs text-blue-300 font-bold tracking-widest uppercase">Adaptive HCI Dashboard</p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-white">{STUDENT_DATA.name}</div>
          <div className="text-xs text-gray-400 font-mono">{STUDENT_DATA.pid} • WINTER 2026</div>
        </div>
      </header>

      {/* MAIN GRID */}
      <main className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        
        {/* LEFT COL (4/12) */}
        <div className="col-span-4 flex flex-col gap-4 h-full">
          
          {/* DEGREE AUDIT */}
          <Panel title="Degree Audit" icon={Award} className="h-1/2">
            <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-2">
              <span className="text-gray-400 text-xs uppercase">Cumulative GPA</span>
              <span className="text-3xl font-bold text-green-400">{STUDENT_DATA.gpa}</span>
            </div>
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gold text-xs uppercase">
                  <th className="pb-2">Course</th>
                  <th className="pb-2 text-right">Grade</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {STUDENT_DATA.history.map((c, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="py-2 font-medium">
                      <div className="text-white">{c.code}</div>
                      <div className="text-[10px] text-gray-500 truncate w-40">{c.title}</div>
                    </td>
                    <td className="py-2 text-right font-bold text-yellow">{c.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          {/* SCHEDULE */}
          <Panel title="Live Schedule" icon={Calendar} className="h-1/2">
            <div className="space-y-2">
              {STUDENT_DATA.winter.map((cls, i) => (
                <div key={i} className="bg-blue/10 border-l-2 border-yellow p-2 rounded-r hover:bg-blue/20 transition-colors">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-white text-sm">{cls.code}</span>
                    <span className="text-[10px] bg-blue text-white px-1 rounded">{cls.type}</span>
                  </div>
                  <div className="text-xs text-gray-300 mt-1">{cls.time}</div>
                  <div className="text-[10px] text-gray-500 font-mono uppercase mt-0.5">{cls.loc}</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* RIGHT COL (8/12) */}
        <div className="col-span-8 flex flex-col gap-4 h-full">
          
          {/* AI ADVISOR */}
          <Panel title="Advisor AI" icon={Activity} className="h-2/3 bg-gradient-to-br from-navy to-[#0a1525]">
             <div className="flex flex-col h-full">
                {/* Chat Container */}
                <div className="flex-1 space-y-4">
                    {/* Bot Message */}
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full border-2 border-gold shrink-0 overflow-hidden">
                            <img src="/oogway.jpg" className="w-full h-full object-cover" alt="AI" />
                        </div>
                        <div className="bg-blue/20 border border-blue/50 p-4 rounded-2xl rounded-tl-none text-sm text-gray-100 shadow-sm max-w-[80%]">
                            <p className="font-semibold text-yellow text-xs mb-1">ADVISOR OOGWAY</p>
                            <p>Antara, I've analyzed your Winter 2026 plan. Taking <span className="text-white font-bold">CSE 20</span>, <span className="text-white font-bold">CSE 12</span>, and <span className="text-white font-bold">Math 20C</span> together is heavy.</p>
                            <p className="mt-2 text-red-300 text-xs uppercase font-bold tracking-wide">⚠ Risk Level: High</p>
                        </div>
                    </div>

                    {/* User Message */}
                    <div className="flex justify-end">
                        <div className="bg-yellow text-navy p-3 rounded-2xl rounded-tr-none text-sm font-bold shadow-md max-w-[80%]">
                            What if I drop ANTH 10? Does that ruin my graduation timeline?
                        </div>
                    </div>
                </div>

                {/* Simulated Input Area */}
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3 opacity-50">
                    <div className="h-10 bg-black/30 rounded-full flex-1 border border-white/10 px-4 flex items-center text-xs text-gray-500">
                        Type your question...
                    </div>
                    <div className="w-10 h-10 rounded-full bg-yellow/20 flex items-center justify-center text-yellow">
                         ➜
                    </div>
                </div>
             </div>
          </Panel>

          {/* WEBCAM */}
          <div className="h-1/3 relative bg-black rounded-xl border border-blue overflow-hidden shadow-lg group">
             <Webcam 
                audio={false}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                mirror={true}
             />
             <div className="absolute top-3 right-3 flex items-center gap-2 bg-red-600/80 px-2 py-1 rounded text-[10px] font-bold tracking-widest backdrop-blur">
                <Video className="w-3 h-3" /> LIVE
             </div>
             <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black to-transparent"></div>
          </div>
        </div>
      </main>

      {/* FOOTER PROGRESS */}
      <div className="bg-navy border border-blue p-4 rounded-xl flex items-center gap-6 shadow-xl shrink-0 h-[80px]">
        <div className="w-48 shrink-0">
            <div className="text-yellow text-xs font-bold uppercase tracking-widest mb-1">Degree Progress</div>
            <div className="text-white font-mono text-sm">{STUDENT_DATA.units_earned} / {STUDENT_DATA.total_units} Units</div>
        </div>
        <div className="flex-1 h-4 bg-black/50 rounded-full overflow-hidden border border-white/10 relative">
            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue to-yellow w-[17%]"></div>
            {/* Ticks */}
            <div className="absolute inset-y-0 left-[25%] w-px bg-white/20"></div>
            <div className="absolute inset-y-0 left-[50%] w-px bg-white/20"></div>
            <div className="absolute inset-y-0 left-[75%] w-px bg-white/20"></div>
        </div>
        <div className="w-32 shrink-0 text-right">
             <div className="text-white font-bold text-lg">Sophomore</div>
             <div className="text-gray-500 text-[10px] uppercase font-bold">Standing</div>
        </div>
      </div>

    </div>
  );
};

export default App;
