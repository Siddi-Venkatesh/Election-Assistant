/**
 * @fileoverview Voter Registration page component.
 * Provides information about Form 6 and links to the official
 * National Voter Service Portal for online registration.
 *
 * @module pages/Register
 */
import React, { memo } from 'react';
import { ExternalLink, FileText } from 'lucide-react';

/**
 * Register page with voter registration guidance.
 * Wrapped in React.memo as it renders static content with no props.
 *
 * @returns {React.ReactElement} The voter registration page.
 */
const Register = memo(function Register() {
  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl p-8 md:p-12 rounded-[2rem] border border-white/60 dark:border-slate-700/60 shadow-2xl shadow-indigo-500/10 dark:shadow-none max-w-3xl mx-auto mt-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none" aria-hidden="true">
        <FileText className="w-64 h-64 text-purple-600" />
      </div>

      <div className="relative z-10">
        <h2 className="text-4xl font-extrabold mb-6 dark:text-white tracking-tight">Voter Registration</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
          The most crucial step is to get your name on the electoral roll. Fill out <strong className="text-indigo-600 dark:text-indigo-400">Form 6</strong> online or offline to register as a new voter.
        </p>
        
        <div className="bg-gradient-to-br from-slate-50 to-indigo-50/30 dark:from-slate-900/50 dark:to-indigo-900/10 p-8 rounded-3xl border border-slate-200/60 dark:border-slate-700 text-center shadow-inner">
          <div className="bg-white dark:bg-slate-800 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100 dark:border-slate-700" aria-hidden="true">
            <ExternalLink className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">National Voter Service Portal</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
            Click the button below to be securely redirected to the official government portal for registration.
          </p>
          <a 
            href="https://voters.eci.gov.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all hover:-translate-y-1 active:scale-95"
            aria-label="Open National Voter Service Portal in a new tab"
          >
            Open Official Portal
            <ExternalLink className="w-5 h-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
});

export default Register;
