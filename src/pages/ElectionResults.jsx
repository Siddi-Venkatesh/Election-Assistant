import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getWinner, formatElectionData } from '../utils/helpers';
import { CHART_COLORS } from '../utils/constants';
import { trackResultsFilter } from '../services/analytics';
import electionDataRaw from '../data/electionData.json';

const ALL_STATES = ['All India', ...Object.keys(electionDataRaw['2024']).filter(s => s !== 'All India').sort()];

export default function ElectionResults() {
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedState, setSelectedState] = useState('All India');

  const data = formatElectionData(electionDataRaw, selectedYear, selectedState);
  const winner = getWinner(data.seats);

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    trackResultsFilter(year, selectedState);
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    trackResultsFilter(selectedYear, state);
  };

  // Build accessible text summary for screen readers
  const seatsSummary = data.seats.map(s => `${s.party}: ${s.seats} seats`).join(', ');

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-4 mb-8">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 rounded-3xl mb-4 shadow-inner"
          aria-hidden="true"
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

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4 w-full sm:w-auto">
          <label htmlFor="year-select" className="font-bold text-slate-700 dark:text-slate-300 ml-2 whitespace-nowrap">Year:</label>
          <select 
            id="year-select"
            value={selectedYear} 
            onChange={handleYearChange}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2 font-semibold text-indigo-600 dark:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer w-full"
            aria-label="Select election year"
          >
            <option value="2024">2024</option>
            <option value="2019">2019</option>
            <option value="2014">2014</option>
          </select>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4 w-full sm:w-auto">
          <label htmlFor="state-select" className="font-bold text-slate-700 dark:text-slate-300 ml-2 whitespace-nowrap">State:</label>
          <select 
            id="state-select"
            value={selectedState} 
            onChange={handleStateChange}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2 font-semibold text-indigo-600 dark:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer w-full"
            aria-label="Select state or territory"
          >
            {ALL_STATES.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Screen reader summary of chart data */}
      <div className="sr-only" aria-live="polite" role="status">
        {seatsSummary && `Seat distribution for ${selectedState} in ${selectedYear}: ${seatsSummary}`}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={`bar-${selectedYear}-${selectedState}`}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none"
          role="img"
          aria-label={`Bar chart showing seat distribution for ${selectedState} in ${selectedYear}. ${seatsSummary}`}
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            {selectedState} Seat Distribution ({selectedYear})
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.seats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="party" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }} />
                <Legend />
                <Bar dataKey="seats" name="Total Seats Won" radius={[8, 8, 0, 0]}>
                  {data.seats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          key={`pie-${selectedYear}-${selectedState}`}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none"
          role="img"
          aria-label={`Pie chart showing vote share percentage for ${selectedState} in ${selectedYear}`}
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            {selectedState} Vote Share % ({selectedYear})
          </h3>
          <div className="h-[300px] w-full flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.voteShare} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" label={({name, value}) => `${name} ${value}%`}>
                  {data.voteShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }} formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {winner && winner.seats > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          key={`winner-${selectedYear}-${selectedState}`}
          className="mt-8 mx-auto max-w-3xl justify-center bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-[2rem] p-8 border border-emerald-100 dark:border-emerald-500/20 flex flex-col sm:flex-row items-center gap-6 shadow-sm"
          role="status"
          aria-label={`Winner: ${winner.party} with ${winner.seats} seats`}
        >
          <div className="bg-emerald-100 dark:bg-emerald-800/50 p-4 rounded-2xl shadow-sm shrink-0" aria-hidden="true">
            <Trophy className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              {selectedState === 'All India' ? 'National Winner' : `${selectedState} Winner`} ({selectedYear})
            </h4>
            <p className="text-slate-700 dark:text-slate-300 text-lg">
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-2xl mr-2">{winner.party}</span> 
              secured the majority with <span className="font-bold">{winner.seats} seats</span>.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
