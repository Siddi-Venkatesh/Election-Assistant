import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ALL_STATES = [
  'All India',
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

// Pre-defined accurate data for key states
const baseData = {
  '2024': {
    'All India': { seats: [{party: 'NDA', seats: 293}, {party: 'INDIA', seats: 234}, {party: 'Others', seats: 16}], voteShare: [{name: 'NDA', value: 42.5}, {name: 'INDIA', value: 40.6}, {name: 'Others', value: 16.9}] },
    'Andhra Pradesh': { seats: [{party: 'TDP', seats: 16}, {party: 'YSRCP', seats: 4}, {party: 'JSP', seats: 2}, {party: 'BJP', seats: 3}], voteShare: [{name: 'TDP', value: 37.8}, {name: 'YSRCP', value: 39.6}, {name: 'JSP', value: 11.3}, {name: 'BJP', value: 11.3}] }
  },
  '2019': {
    'All India': { seats: [{party: 'NDA', seats: 353}, {party: 'UPA', seats: 91}, {party: 'Others', seats: 98}], voteShare: [{name: 'NDA', value: 45.0}, {name: 'UPA', value: 26.0}, {name: 'Others', value: 29.0}] },
    'Andhra Pradesh': { seats: [{party: 'YSRCP', seats: 22}, {party: 'TDP', seats: 3}, {party: 'JSP', seats: 0}, {party: 'INC', seats: 0}], voteShare: [{name: 'YSRCP', value: 49.1}, {name: 'TDP', value: 39.6}, {name: 'JSP', value: 5.9}, {name: 'INC', value: 1.3}] }
  },
  '2014': {
    'All India': { seats: [{party: 'NDA', seats: 336}, {party: 'UPA', seats: 60}, {party: 'Others', seats: 147}], voteShare: [{name: 'NDA', value: 38.5}, {name: 'UPA', value: 23.0}, {name: 'Others', value: 38.5}] },
    'Andhra Pradesh': { seats: [{party: 'TDP', seats: 15}, {party: 'YSRCP', seats: 8}, {party: 'BJP', seats: 2}, {party: 'INC', seats: 0}], voteShare: [{name: 'TDP', value: 40.5}, {name: 'YSRCP', value: 45.4}, {name: 'BJP', value: 7.2}, {name: 'INC', value: 2.8}] }
  }
};

const STATE_PARTIES = {
  'Arunachal Pradesh': ['BJP', 'INC', 'NPEP', 'PPA'],
  'Assam': ['BJP', 'INC', 'AIUDF', 'AGP'],
  'Bihar': ['RJD', 'JDU', 'BJP', 'LJP'],
  'Chhattisgarh': ['INC', 'BJP', 'JCC', 'BSP'],
  'Goa': ['BJP', 'INC', 'MGP', 'AAP'],
  'Gujarat': ['BJP', 'INC', 'AAP', 'BTP'],
  'Haryana': ['BJP', 'INC', 'JJP', 'INLD'],
  'Himachal Pradesh': ['INC', 'BJP', 'CPIM', 'AAP'],
  'Jharkhand': ['JMM', 'BJP', 'INC', 'AJSU'],
  'Karnataka': ['INC', 'BJP', 'JDS', 'KRPP'],
  'Kerala': ['CPI(M)', 'INC', 'IUML', 'CPI'],
  'Madhya Pradesh': ['BJP', 'INC', 'BSP', 'SP'],
  'Maharashtra': ['BJP', 'SHS', 'NCP', 'INC'],
  'Manipur': ['BJP', 'INC', 'NPEP', 'NPF'],
  'Meghalaya': ['NPEP', 'INC', 'UDP', 'TMC'],
  'Mizoram': ['MNF', 'ZPM', 'INC', 'BJP'],
  'Nagaland': ['NDPP', 'NPF', 'BJP', 'INC'],
  'Odisha': ['BJD', 'BJP', 'INC', 'CPI'],
  'Punjab': ['AAP', 'INC', 'SAD', 'BJP'],
  'Rajasthan': ['BJP', 'INC', 'RLP', 'BSP'],
  'Sikkim': ['SKM', 'SDF', 'BJP', 'INC'],
  'Tamil Nadu': ['DMK', 'AIADMK', 'INC', 'BJP'],
  'Telangana': ['BRS', 'INC', 'BJP', 'AIMIM'],
  'Tripura': ['BJP', 'INC', 'TIPRA', 'CPIM'],
  'Uttar Pradesh': ['BJP', 'SP', 'BSP', 'INC'],
  'Uttarakhand': ['BJP', 'INC', 'BSP', 'UKD'],
  'West Bengal': ['TMC', 'BJP', 'INC', 'CPIM']
};

// Generate stable deterministic mock data for the remaining states
const generateMockStateData = (stateName, year) => {
  let hash = 0;
  const str = stateName + year;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  const random = () => {
    const x = Math.sin(hash++) * 10000;
    return x - Math.floor(x);
  };
  
  const totalSeats = 5 + Math.floor(random() * 35); // 5 to 40 seats
  const parties = STATE_PARTIES[stateName] || ['Party A', 'Party B', 'Party C', 'Others'];
  const p1Seats = Math.floor(random() * totalSeats);
  const p2Seats = Math.floor(random() * (totalSeats - p1Seats));
  const p3Seats = Math.floor(random() * (totalSeats - p1Seats - p2Seats));
  const p4Seats = totalSeats - p1Seats - p2Seats - p3Seats;

  const p1Vote = 25 + (random() * 25);
  const p2Vote = 25 + (random() * 25);
  const p3Vote = 10 + (random() * 10);
  const p4Vote = Math.max(0, 100 - p1Vote - p2Vote - p3Vote);

  return {
    seats: [
      { party: parties[0], seats: p1Seats },
      { party: parties[1], seats: p2Seats },
      { party: parties[2], seats: p3Seats },
      { party: parties[3] || 'Others', seats: p4Seats }
    ],
    voteShare: [
      { name: parties[0], value: parseFloat(p1Vote.toFixed(1)) },
      { name: parties[1], value: parseFloat(p2Vote.toFixed(1)) },
      { name: parties[2], value: parseFloat(p3Vote.toFixed(1)) },
      { name: parties[3] || 'Others', value: parseFloat(p4Vote.toFixed(1)) }
    ]
  };
};

const electionData = { '2024': {}, '2019': {}, '2014': {} };

['2024', '2019', '2014'].forEach(year => {
  ALL_STATES.forEach(state => {
    if (baseData[year] && baseData[year][state]) {
      electionData[year][state] = baseData[year][state];
    } else {
      electionData[year][state] = generateMockStateData(state, year);
    }
  });
});

const COLORS = ['#ff9933', '#138808', '#64748b', '#eab308', '#ec4899', '#3b82f6', '#ef4444']; // Extended color palette for more parties

export default function ElectionResults() {
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedState, setSelectedState] = useState('All India');

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
            {ALL_STATES.map((state) => (
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
