import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock Data for different years and states
const STATES = ['All India', 'Uttar Pradesh', 'Maharashtra', 'West Bengal', 'Tamil Nadu'];

const electionData = {
  '2024': {
    'All India': { seats: [{party: 'NDA', seats: 293}, {party: 'INDIA', seats: 234}, {party: 'Others', seats: 16}], voteShare: [{name: 'NDA', value: 42.5}, {name: 'INDIA', value: 40.6}, {name: 'Others', value: 16.9}] },
    'Uttar Pradesh': { seats: [{party: 'NDA', seats: 36}, {party: 'INDIA', seats: 43}, {party: 'Others', seats: 1}], voteShare: [{name: 'NDA', value: 41.4}, {name: 'INDIA', value: 43.3}, {name: 'Others', value: 15.3}] },
    'Maharashtra': { seats: [{party: 'NDA', seats: 17}, {party: 'INDIA', seats: 30}, {party: 'Others', seats: 1}], voteShare: [{name: 'NDA', value: 43.6}, {name: 'INDIA', value: 43.7}, {name: 'Others', value: 12.7}] },
    'West Bengal': { seats: [{party: 'NDA', seats: 12}, {party: 'INDIA', seats: 29}, {party: 'Others', seats: 1}], voteShare: [{name: 'NDA', value: 38.7}, {name: 'INDIA', value: 45.8}, {name: 'Others', value: 15.5}] },
    'Tamil Nadu': { seats: [{party: 'NDA', seats: 0}, {party: 'INDIA', seats: 39}, {party: 'Others', seats: 0}], voteShare: [{name: 'NDA', value: 11.3}, {name: 'INDIA', value: 46.9}, {name: 'Others', value: 41.8}] }
  },
  '2019': {
    'All India': { seats: [{party: 'NDA', seats: 353}, {party: 'UPA', seats: 91}, {party: 'Others', seats: 98}], voteShare: [{name: 'NDA', value: 45.0}, {name: 'UPA', value: 26.0}, {name: 'Others', value: 29.0}] },
    'Uttar Pradesh': { seats: [{party: 'NDA', seats: 64}, {party: 'UPA', seats: 1}, {party: 'Others', seats: 15}], voteShare: [{name: 'NDA', value: 50.8}, {name: 'UPA', value: 6.4}, {name: 'Others', value: 42.8}] },
    'Maharashtra': { seats: [{party: 'NDA', seats: 41}, {party: 'UPA', seats: 5}, {party: 'Others', seats: 2}], voteShare: [{name: 'NDA', value: 51.3}, {name: 'UPA', value: 32.1}, {name: 'Others', value: 16.6}] },
    'West Bengal': { seats: [{party: 'NDA', seats: 18}, {party: 'UPA', seats: 2}, {party: 'Others', seats: 22}], voteShare: [{name: 'NDA', value: 40.6}, {name: 'UPA', value: 5.7}, {name: 'Others', value: 53.7}] },
    'Tamil Nadu': { seats: [{party: 'NDA', seats: 1}, {party: 'UPA', seats: 38}, {party: 'Others', seats: 0}], voteShare: [{name: 'NDA', value: 18.5}, {name: 'UPA', value: 53.3}, {name: 'Others', value: 28.2}] }
  },
  '2014': {
    'All India': { seats: [{party: 'NDA', seats: 336}, {party: 'UPA', seats: 60}, {party: 'Others', seats: 147}], voteShare: [{name: 'NDA', value: 38.5}, {name: 'UPA', value: 23.0}, {name: 'Others', value: 38.5}] },
    'Uttar Pradesh': { seats: [{party: 'NDA', seats: 73}, {party: 'UPA', seats: 2}, {party: 'Others', seats: 5}], voteShare: [{name: 'NDA', value: 43.3}, {name: 'UPA', value: 7.5}, {name: 'Others', value: 49.2}] },
    'Maharashtra': { seats: [{party: 'NDA', seats: 42}, {party: 'UPA', seats: 6}, {party: 'Others', seats: 0}], voteShare: [{name: 'NDA', value: 51.3}, {name: 'UPA', value: 34.4}, {name: 'Others', value: 14.3}] },
    'West Bengal': { seats: [{party: 'NDA', seats: 2}, {party: 'UPA', seats: 4}, {party: 'Others', seats: 36}], voteShare: [{name: 'NDA', value: 17.0}, {name: 'UPA', value: 9.7}, {name: 'Others', value: 73.3}] },
    'Tamil Nadu': { seats: [{party: 'NDA', seats: 1}, {party: 'UPA', seats: 0}, {party: 'Others', seats: 38}], voteShare: [{name: 'NDA', value: 18.8}, {name: 'UPA', value: 23.9}, {name: 'Others', value: 57.3}] }
  }
};

const COLORS = ['#ff9933', '#138808', '#64748b']; // Indian flag colors + slate for others

export default function ElectionResults() {
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedState, setSelectedState] = useState('All India');

  // Fallback to empty data structure if state/year combo doesn't exist
  const data = electionData[selectedYear]?.[selectedState] || { seats: [], voteShare: [] };

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

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        {/* Year Dropdown */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4 w-full sm:w-auto">
          <label htmlFor="year-select" className="font-bold text-slate-700 dark:text-slate-300 ml-2 whitespace-nowrap">
            Year:
          </label>
          <select 
            id="year-select"
            value={selectedYear} 
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2 font-semibold text-indigo-600 dark:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer w-full"
          >
            <option value="2024">2024</option>
            <option value="2019">2019</option>
            <option value="2014">2014</option>
          </select>
        </div>

        {/* State Dropdown */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4 w-full sm:w-auto">
          <label htmlFor="state-select" className="font-bold text-slate-700 dark:text-slate-300 ml-2 whitespace-nowrap">
            State:
          </label>
          <select 
            id="state-select"
            value={selectedState} 
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2 font-semibold text-indigo-600 dark:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer w-full"
          >
            {STATES.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Seat Distribution Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={`bar-${selectedYear}-${selectedState}`}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none"
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            {selectedState} Seat Distribution ({selectedYear})
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
          key={`pie-${selectedYear}-${selectedState}`}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none"
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            {selectedState} Vote Share % ({selectedYear})
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
