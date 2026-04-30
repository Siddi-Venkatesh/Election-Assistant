import React from 'react';
import { AlertTriangle, Check, X, ShieldAlert } from 'lucide-react';

export default function Guidelines() {
  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl p-8 md:p-12 rounded-[2rem] border border-white/60 dark:border-slate-700/60 shadow-2xl shadow-indigo-500/10 dark:shadow-none max-w-4xl mx-auto mt-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
        <ShieldAlert className="w-64 h-64 text-slate-900 dark:text-white" />
      </div>

      <div className="relative z-10">
        <h2 className="text-4xl font-extrabold mb-4 dark:text-white tracking-tight">Voting Day Guidelines</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
          Ensure a smooth voting experience by following these official guidelines at the polling station.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* DOs */}
          <div className="bg-gradient-to-b from-green-50/50 to-emerald-50/50 dark:from-green-900/10 dark:to-emerald-900/10 p-6 rounded-3xl border border-green-100 dark:border-green-800/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Check className="w-24 h-24 text-green-500" />
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 p-2 rounded-lg">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-2xl text-green-900 dark:text-green-400">Do's</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Bring your Voter ID (EPIC) or any of the 11 approved alternative photo IDs.",
                "Check your name on the voter list beforehand.",
                "Maintain the secrecy of your vote inside the booth.",
                "Follow the instructions of the polling officers."
              ].map((text, i) => (
                <li key={i} className="flex gap-3 text-green-800 dark:text-green-200 font-medium">
                  <div className="mt-1 bg-green-200 dark:bg-green-800/50 rounded-full p-1 h-min">
                    <div className="w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full"></div>
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* DONTs */}
          <div className="bg-gradient-to-b from-red-50/50 to-rose-50/50 dark:from-red-900/10 dark:to-rose-900/10 p-6 rounded-3xl border border-red-100 dark:border-red-800/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <X className="w-24 h-24 text-red-500" />
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 p-2 rounded-lg">
                <X className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-2xl text-red-900 dark:text-red-400">Don'ts</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Do NOT carry mobile phones, cameras, or smartwatches inside.",
                "Do NOT wear political party symbols or clothing.",
                "Do NOT attempt to influence other voters near the booth.",
                "Do NOT accept any gifts, money, or transport from candidates."
              ].map((text, i) => (
                <li key={i} className="flex gap-3 text-red-800 dark:text-red-200 font-medium">
                  <div className="mt-1 bg-red-200 dark:bg-red-800/50 rounded-full p-1 h-min">
                    <div className="w-1.5 h-1.5 bg-red-600 dark:bg-red-400 rounded-full"></div>
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-amber-50 dark:bg-amber-900/20 border border-amber-200/60 dark:border-amber-800/50 p-5 rounded-2xl flex gap-4 shadow-sm">
          <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
          <p className="text-sm font-medium text-amber-900 dark:text-amber-200 leading-relaxed">
            Violation of these rules is a punishable offense under election laws. Please report any suspicious activity to the presiding officer immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
