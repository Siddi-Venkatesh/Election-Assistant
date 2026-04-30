import React, { useState } from 'react';
import { Search, MapPin, Loader2, ExternalLink, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const realisticRecords = [
  {
    nameEn: "Venkatesh Siddi",
    nameLocal: "వెంకటేష్ సిద్ది",
    age: 23,
    relativeNameEn: "Ekambaram Siddi",
    relativeNameLocal: "ఏకాంబరం సిద్ది",
    state: "Andhra Pradesh",
    district: "16-Palnadu",
    assembly: "99-Vinukonda",
    part: "108-VELPUR",
    pollingStation: "Zilla Parishad High School, 1st room VELPURU",
    partSerialNumber: 482
  },
  {
    nameEn: "Priya Sharma",
    nameLocal: "प्रिया शर्मा",
    age: 28,
    relativeNameEn: "Rajesh Sharma",
    relativeNameLocal: "राजेश शर्मा",
    state: "Maharashtra",
    district: "25-Pune",
    assembly: "214-Pune Cantonment",
    part: "45-Camp",
    pollingStation: "St. Mary's High School, East Wing Room 2",
    partSerialNumber: 156
  },
  {
    nameEn: "Rahul Verma",
    nameLocal: "राहुल वर्मा",
    age: 35,
    relativeNameEn: "Suresh Verma",
    relativeNameLocal: "सुरेश वर्मा",
    state: "Delhi",
    district: "06-Central Delhi",
    assembly: "40-New Delhi",
    part: "12-Connaught Place",
    pollingStation: "Municipal Primary School, Block B",
    partSerialNumber: 89
  }
];

export default function Booth() {
  const { t } = useTranslation();
  const [epic, setEpic] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!epic.trim() || epic.length < 8) {
      setError('Please enter a valid EPIC number (e.g., ABC1234567).');
      setResult(null);
      return;
    }
    
    setError('');
    setIsSearching(true);
    setResult(null);

    // Pick a deterministic but "random" realistic booth based on the length/chars of EPIC
    const hash = epic.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    // If the user types SZ02625770 or anything similar, it will hash to one. 
    // Let's make sure the Venkatesh Siddi record is prominent.
    const selectedRecord = realisticRecords[hash % realisticRecords.length];

    setTimeout(() => {
      setIsSearching(false);
      setResult({
        ...selectedRecord,
        epicNumber: epic.toUpperCase()
      });
    }, 1500);
  };

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl p-8 md:p-12 rounded-[2rem] border border-white/60 dark:border-slate-700/60 shadow-2xl shadow-indigo-500/10 dark:shadow-none max-w-[95%] mx-auto mt-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <MapPin className="w-64 h-64 text-indigo-500" />
      </div>

      <div className="relative z-10 w-full">
        <h2 className="text-4xl font-extrabold mb-6 dark:text-white tracking-tight">{t('booth_title', 'Find Your Polling Booth')}</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed max-w-3xl">
          {t('booth_desc', 'Enter your 10-digit EPIC number to find the exact details of your electoral roll registration, just like the official ECI database.')}
        </p>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200/60 dark:border-amber-800/50 p-4 rounded-2xl flex gap-3 mb-6 shadow-sm w-full">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-amber-900 dark:text-amber-200 leading-relaxed">
            {t('booth_note', 'Note: This app provides a simulated, realistic demonstration. For your actual, legally binding polling booth, please use the official Election Commission of India portal.')}
          </p>
        </div>

        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200/60 dark:border-emerald-800/50 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm w-full mb-8">
          <div>
            <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-100 mb-2">{t('booth_eci_title', 'Search the Official ECI Database')}</h3>
            <p className="text-emerald-700 dark:text-emerald-300 text-sm leading-relaxed">
              {t('booth_eci_desc', 'Visit the official government portal to search the legally binding, real-time electoral roll.')}
            </p>
          </div>
          <a 
            href="https://electoralsearch.eci.gov.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="shrink-0 w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/30 transition-all hover:-translate-y-1 hover:shadow-emerald-500/40 active:scale-95 flex items-center justify-center gap-2"
          >
            {t('booth_eci_btn', 'Official ECI Search')} <ExternalLink className="w-5 h-5" />
          </a>
        </div>

        <div className="flex items-center justify-center gap-4 w-full mb-8">
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
          <span className="text-slate-400 dark:text-slate-500 font-bold text-sm tracking-widest uppercase">Or try a mock search</span>
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-700 shadow-inner w-full">
          <form onSubmit={handleSearch}>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              {t('epic_label', 'EPIC Number (Voter ID Number)')}
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type="text" 
                  value={epic}
                  onChange={(e) => setEpic(e.target.value.toUpperCase())}
                  placeholder="e.g. SZ02625770" 
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-12 pr-4 py-4 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-mono text-lg shadow-sm uppercase"
                />
              </div>
              <button 
                type="submit"
                disabled={isSearching}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center min-w-[140px]"
              >
                {isSearching ? <Loader2 className="w-6 h-6 animate-spin" /> : t('search_mock_btn', 'Search Mock')}
              </button>
            </div>
            {error && <p className="text-red-500 mt-3 text-sm font-medium">{error}</p>}
            
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isSearching ? 'bg-amber-500 animate-bounce' : 'bg-green-500 animate-pulse'}`}></span>
              {isSearching ? t('searching_mock', 'Searching Mock Database...') : t('simulated_db', 'Simulated Electoral Database')}
            </p>
          </form>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 overflow-hidden w-full"
            >
              <div className="w-full overflow-x-auto bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
                <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                  <h3 className="font-bold text-slate-800 dark:text-slate-200">Search Results</h3>
                  <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold px-2 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800">MOCK RESULT</span>
                </div>
                <table className="w-full text-sm text-left border-collapse min-w-[1000px]">
                  <thead className="bg-[#def0ff] dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="px-4 py-3 border-r border-slate-200 dark:border-slate-700 w-12 text-center">S.<br/>NO.</th>
                      <th className="px-4 py-3 border-r border-slate-200 dark:border-slate-700">Epic Number</th>
                      <th className="px-4 py-3 border-r border-slate-200 dark:border-slate-700">Name</th>
                      <th className="px-4 py-3 border-r border-slate-200 dark:border-slate-700 w-12">Age</th>
                      <th className="px-4 py-3 border-r border-slate-200 dark:border-slate-700">Relative<br/>Name</th>
                      <th className="px-4 py-3 border-r border-slate-200 dark:border-slate-700">State</th>
                      <th className="px-4 py-3 border-r border-slate-200 dark:border-slate-700">District</th>
                      <th className="px-4 py-3 border-r border-slate-200 dark:border-slate-700">Assembly<br/>Constituency</th>
                      <th className="px-4 py-3 border-r border-slate-200 dark:border-slate-700">Part</th>
                      <th className="px-4 py-3 border-r border-slate-200 dark:border-slate-700">Polling Station</th>
                      <th className="px-4 py-3 border-r border-slate-200 dark:border-slate-700">Part Serial<br/>Number</th>
                      <th className="px-4 py-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300">
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-4 border-r border-slate-200 dark:border-slate-700 text-center font-medium">1</td>
                      <td className="px-4 py-4 border-r border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-medium">{result.epicNumber}</td>
                      <td className="px-4 py-4 border-r border-slate-200 dark:border-slate-700">
                        <div className="flex flex-col gap-1">
                          <span>{result.nameEn}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">{result.nameLocal}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 border-r border-slate-200 dark:border-slate-700 text-center">{result.age}</td>
                      <td className="px-4 py-4 border-r border-slate-200 dark:border-slate-700">
                        <div className="flex flex-col gap-1">
                          <span>{result.relativeNameEn}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">{result.relativeNameLocal}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 border-r border-slate-200 dark:border-slate-700">{result.state}</td>
                      <td className="px-4 py-4 border-r border-slate-200 dark:border-slate-700">{result.district}</td>
                      <td className="px-4 py-4 border-r border-slate-200 dark:border-slate-700">{result.assembly}</td>
                      <td className="px-4 py-4 border-r border-slate-200 dark:border-slate-700">{result.part}</td>
                      <td className="px-4 py-4 border-r border-slate-200 dark:border-slate-700 text-sm leading-relaxed max-w-[200px]">{result.pollingStation}</td>
                      <td className="px-4 py-4 border-r border-slate-200 dark:border-slate-700 text-center">{result.partSerialNumber}</td>
                      <td className="px-4 py-4 text-center">
                        <button className="text-[#1a73e8] dark:text-blue-400 hover:underline font-medium text-sm text-center">
                          View<br/>Details
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
