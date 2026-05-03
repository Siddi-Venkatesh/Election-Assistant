import React, { memo } from 'react';
import { AlertTriangle, Check, X, ShieldAlert, Calendar } from 'lucide-react';

const dos = [
  "Bring your Voter ID (EPIC) or any of the 11 approved alternative photo IDs.",
  "Check your name on the voter list beforehand.",
  "Maintain the secrecy of your vote inside the booth.",
  "Follow the instructions of the polling officers."
];

const donts = [
  "Do NOT carry mobile phones, cameras, or smartwatches inside.",
  "Do NOT wear political party symbols or clothing.",
  "Do NOT attempt to influence other voters near the booth.",
  "Do NOT accept any gifts, money, or transport from candidates."
];

const Guidelines = memo(function Guidelines() {
  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl p-8 md:p-12 rounded-[2rem] border border-white/60 dark:border-slate-700/60 shadow-2xl shadow-indigo-500/10 dark:shadow-none max-w-4xl mx-auto mt-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none" aria-hidden="true">
        <ShieldAlert className="w-64 h-64 text-slate-900 dark:text-white" />
      </div>
      <div className="relative z-10">
        <h2 className="text-4xl font-extrabold mb-4 dark:text-white tracking-tight">Voting Day Guidelines</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
          Ensure a smooth voting experience by following these official guidelines at the polling station.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-gradient-to-b from-green-50/50 to-emerald-50/50 dark:from-green-900/10 dark:to-emerald-900/10 p-6 rounded-3xl border border-green-100 dark:border-green-800/30 relative overflow-hidden" aria-labelledby="dos-heading">
            <div className="absolute top-0 right-0 p-4 opacity-10" aria-hidden="true"><Check className="w-24 h-24 text-green-500" /></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 p-2 rounded-lg" aria-hidden="true"><Check className="w-6 h-6" /></div>
              <h3 id="dos-heading" className="font-extrabold text-2xl text-green-900 dark:text-green-400">Do's</h3>
            </div>
            <ul className="space-y-4" role="list" aria-label="Things to do on voting day">
              {dos.map((text, i) => (
                <li key={i} className="flex gap-3 text-green-800 dark:text-green-200 font-medium">
                  <div className="mt-1 bg-green-200 dark:bg-green-800/50 rounded-full p-1 h-min" aria-hidden="true"><div className="w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full"></div></div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="bg-gradient-to-b from-red-50/50 to-rose-50/50 dark:from-red-900/10 dark:to-rose-900/10 p-6 rounded-3xl border border-red-100 dark:border-red-800/30 relative overflow-hidden" aria-labelledby="donts-heading">
            <div className="absolute top-0 right-0 p-4 opacity-10" aria-hidden="true"><X className="w-24 h-24 text-red-500" /></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 p-2 rounded-lg" aria-hidden="true"><X className="w-6 h-6" /></div>
              <h3 id="donts-heading" className="font-extrabold text-2xl text-red-900 dark:text-red-400">Don'ts</h3>
            </div>
            <ul className="space-y-4" role="list" aria-label="Things not to do on voting day">
              {donts.map((text, i) => (
                <li key={i} className="flex gap-3 text-red-800 dark:text-red-200 font-medium">
                  <div className="mt-1 bg-red-200 dark:bg-red-800/50 rounded-full p-1 h-min" aria-hidden="true"><div className="w-1.5 h-1.5 bg-red-600 dark:bg-red-400 rounded-full"></div></div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200/60 dark:border-amber-800/50 p-5 rounded-3xl flex gap-4 shadow-sm" role="alert">
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" aria-hidden="true" />
            <p className="text-sm font-medium text-amber-900 dark:text-amber-200 leading-relaxed">
              Violation of these rules is a punishable offense under election laws. Please report any suspicious activity immediately.
            </p>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200/60 dark:border-indigo-800/50 p-5 rounded-3xl flex flex-col gap-4 shadow-sm">
            <div className="flex gap-3">
              <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0" aria-hidden="true" />
              <h4 className="font-bold text-indigo-900 dark:text-indigo-200">Set a Reminder</h4>
            </div>
            <p className="text-xs text-indigo-700 dark:text-indigo-300">Don't miss your chance to shape the future. Add Election Day to your calendar.</p>
            <a 
              href="https://www.google.com/calendar/render?action=TEMPLATE&text=Indian+General+Election+2024+Voting+Day&details=Don't+forget+to+carry+your+Voter+ID+and+vote!+Check+VoterAssist+for+guidelines.&location=Your+Polling+Booth&dates=20240513T023000Z/20240513T123000Z"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-center py-2.5 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
              aria-label="Add Indian General Election 2024 Voting Day to Google Calendar"
            >
              Add to Google Calendar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Guidelines;
