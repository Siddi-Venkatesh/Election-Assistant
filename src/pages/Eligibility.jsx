import React from 'react';
import { CheckCircle2, ShieldCheck, UserCheck, Scale } from 'lucide-react';

export default function Eligibility() {
  const criteria = [
    { icon: <Globe className="w-5 h-5"/>, text: "Be a citizen of the country." },
    { icon: <UserCheck className="w-5 h-5"/>, text: "Be at least 18 years old on the qualifying date." },
    { icon: <ShieldCheck className="w-5 h-5"/>, text: "Be registered as a voter in your constituency." },
    { icon: <Scale className="w-5 h-5"/>, text: "Not be disqualified under any law." }
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl p-8 md:p-12 rounded-[2rem] border border-white/60 dark:border-slate-700/60 shadow-2xl shadow-indigo-500/10 dark:shadow-none max-w-3xl mx-auto mt-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <CheckCircle2 className="w-64 h-64 text-indigo-600" />
      </div>
      
      <div className="relative z-10">
        <h2 className="text-4xl font-extrabold mb-6 dark:text-white tracking-tight">Eligibility Criteria</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
          To cast your vote and participate in the democratic process, you must meet all of the following requirements:
        </p>
        
        <div className="space-y-4">
          {criteria.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 p-2.5 rounded-xl">
                {item.icon}
              </div>
              <span className="text-slate-700 dark:text-slate-200 font-medium text-lg">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Inline fallback for Globe just for Eligibility
function Globe(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      <path d="M2 12h20"/>
    </svg>
  );
}
