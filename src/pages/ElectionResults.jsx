import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock Data for different years
const electionData = {
  '2024': {
    seats: [
      { party: 'NDA', seats: 293 },
      { party: 'INDIA', seats: 234 },
      { party: 'Others', seats: 16 }
    ],
    voteShare: [
      { name: 'NDA', value: 42.5 },
      { name: 'INDIA', value: 40.6 },
      { name: 'Others', value: 16.9 }
    ]
  },
  '2019': {
    seats: [
      { party: 'NDA', seats: 353 },
      { party: 'UPA', seats: 91 },
      { party: 'Others', seats: 98 }
    ],
    voteShare: [
      { name: 'NDA', value: 45.0 },
      { name: 'UPA', value: 26.0 },
      { name: 'Others', value: 29.0 }
    ]
  },
  '2014': {
    seats: [
      { party: 'NDA', seats: 336 },
      { party: 'UPA', seats: 60 },
      { party: 'Others', seats: 147 }
    ],
    voteShare: [
      { name: 'NDA', value: 38.5 },
      { name: 'UPA', value: 23.0 },
      { name: 'Others', value: 38.5 }
    ]
  }
};

const COLORS = ['#ff9933', '#138808', '#64748b']; // Indian flag colors + slate for others

export default function ElectionResults() {
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState('2024');

  const data = electionData[selectedYear];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-4 mb-8">
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

      <div className="flex justify-center mb-8">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4">
          <label htmlFor="year-select" className="font-bold text-slate-700 dark:text-slate-300 ml-2">
            Select Election Year:
          </label>
          <select 
            id="year-select"
            value={selectedYear} 
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2 font-semibold text-indigo-600 dark:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
          >
            <option value="2024">2024 General Elections</option>
            <option value="2019">2019 General Elections</option>
            <option value="2014">2014 General Elections</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Seat Distribution Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={`bar-${selectedYear}`}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none"
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            Seat Distribution ({selectedYear})
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.seats}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="party" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend />
                <Bar dataKey="seats" name="Total Seats Won" radius={[8, 8, 0, 0]}>
                  {data.seats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Vote Share Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          key={`pie-${selectedYear}`}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none"
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            Vote Share % ({selectedYear})
          </h3>
          <div className="h-[300px] w-full flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.voteShare}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, value}) => `${name} ${value}%`}
                >
                  {data.voteShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  formatter={(value) => `${value}%`}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
