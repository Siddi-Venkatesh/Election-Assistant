import React from 'react';
import { motion } from 'framer-motion';
import { Download, Smartphone, ShieldCheck, ArrowRight, ExternalLink, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function DownloadEpic() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4 mb-12">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 rounded-3xl mb-4 shadow-inner"
        >
          <Download className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Download e-EPIC
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Get a digital version of your Electoral Photo Identity Card (e-EPIC). It is equally valid as a physical Voter ID.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.a
          href="https://voters.eci.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          className="block group bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-indigo-500/10 transition-all"
        >
          <div className="bg-indigo-50 dark:bg-indigo-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
            <Smartphone className="w-8 h-8 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            Download via Portal <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Log in to the official ECI Voters' Portal to download your digital Voter ID card instantly as a secure PDF.
          </p>
          <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-bold group-hover:translate-x-2 transition-transform">
            Go to ECI Portal <ArrowRight className="w-5 h-5 ml-2" />
          </div>
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="block bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none"
        >
          <div className="bg-emerald-50 dark:bg-emerald-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
            <ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            Benefits of e-EPIC
          </h3>
          <ul className="text-slate-600 dark:text-slate-400 space-y-3">
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500"/> Valid as proof of identity and age</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500"/> Cannot be lost or torn like paper</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500"/> Easily printable and verifiable via QR code</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500"/> Stores directly on your phone or DigiLocker</li>
          </ul>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-[2rem] p-8 border border-indigo-100 dark:border-indigo-500/20 flex flex-col sm:flex-row items-center gap-6"
      >
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm shrink-0">
          <FileText className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Need to update your details?</h4>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            If your mobile number is not registered or your details are incorrect, you must submit <strong>Form 8</strong> on the ECI portal before you can download your e-EPIC.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
