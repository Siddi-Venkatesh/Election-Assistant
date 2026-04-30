import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ElectionResults() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4 mb-12">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 rounded-3xl mb-4 shadow-inner"
        >
          <BarChart3 className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t('results_title') || 'Election Results'}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {t('results_desc') || 'View current election results, past statistical reports, and analyze voter turnout trends across different constituencies.'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.a
          href="https://results.eci.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          className="block group bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-indigo-500/10 transition-all"
        >
          <div className="bg-indigo-50 dark:bg-indigo-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
            <TrendingUp className="w-8 h-8 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            Current Results <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            View live counting trends and final results for ongoing General and State Assembly elections.
          </p>
          <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-bold group-hover:translate-x-2 transition-transform">
            View Live Results <ArrowRight className="w-5 h-5 ml-2" />
          </div>
        </motion.a>

        <motion.a
          href="https://eci.gov.in/statistical-report/statistical-reports/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -5 }}
          className="block group bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-purple-500/10 transition-all"
        >
          <div className="bg-purple-50 dark:bg-purple-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
            <Calendar className="w-8 h-8 text-purple-600 dark:text-purple-400 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            Past Statistical Reports <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-purple-500 transition-colors" />
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Access comprehensive data, voter turnout statistics, and detailed reports from previous elections.
          </p>
          <div className="flex items-center text-purple-600 dark:text-purple-400 font-bold group-hover:translate-x-2 transition-transform">
            Browse Archives <ArrowRight className="w-5 h-5 ml-2" />
          </div>
        </motion.a>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-[2rem] p-8 border border-indigo-100 dark:border-indigo-500/20 flex flex-col sm:flex-row items-center gap-6"
      >
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm shrink-0">
          <Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Why analyze election data?</h4>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Understanding election results and voter turnout helps citizens realize the impact of their vote and promotes transparency in the democratic process.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
