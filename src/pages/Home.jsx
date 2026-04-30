import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft, CheckCircle, Info, Calendar, MapPin, User, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      id: 1,
      title: t('step_1_title'),
      icon: <User className="w-6 h-6" />,
      content: t('step_1_desc'),
      action: t('step_1_action'),
      route: '/eligibility'
    },
    {
      id: 2,
      title: t('step_2_title'),
      icon: <CheckCircle className="w-6 h-6" />,
      content: t('step_2_desc'),
      action: t('step_2_action'),
      route: '/register'
    },
    {
      id: 3,
      title: t('step_3_title'),
      icon: <MapPin className="w-6 h-6" />,
      content: t('step_3_desc'),
      action: t('step_3_action'),
      route: '/booth'
    },
    {
      id: 4,
      title: t('step_4_title'),
      icon: <Calendar className="w-6 h-6" />,
      content: t('step_4_desc'),
      action: t('step_4_action'),
      route: '/guidelines'
    }
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10 py-8">
      {/* Left Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-indigo-100 dark:border-slate-700 shadow-sm text-indigo-700 dark:text-indigo-300 text-sm font-bold mb-8"
        >
          <Sparkles className="w-4 h-4 text-indigo-500" />
          {t('for_first_time')}
        </motion.div>
        
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-slate-900 dark:text-white tracking-tight">
          {t('hero_title_1')} <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            {t('hero_title_2')}
          </span>
        </h2>
        
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed max-w-lg">
          {t('hero_desc')}
        </p>
        
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveStep(steps[0])}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all duration-300 text-lg"
          >
            {t('start_guide')}
          </button>
        </div>
      </motion.div>

      {/* Right Interactive Section */}
      <div className="relative min-h-[450px]">
        <AnimatePresence mode="wait">
          {!activeStep ? (
            <motion.div 
              key="timeline"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {steps.map((step, index) => (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  onClick={() => setActiveStep(step)}
                  className="group p-5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-slate-700/50 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer transition-all hover:-translate-y-1 flex items-center justify-between overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex items-center gap-5 relative z-10">
                    <div className="bg-slate-50 dark:bg-slate-900/50 text-slate-400 dark:text-slate-500 p-3.5 rounded-2xl group-hover:bg-gradient-to-br group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-0.5">{step.title}</h3>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Step {step.id} of {steps.length}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 transition-colors relative z-10">
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="detail"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-2xl p-8 md:p-10 rounded-[2rem] border border-white/60 dark:border-slate-700/60 shadow-2xl shadow-indigo-500/10 dark:shadow-none absolute inset-0 flex flex-col"
            >
              <button 
                onClick={() => setActiveStep(null)}
                className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors text-sm font-bold w-max bg-slate-100 dark:bg-slate-700/50 px-4 py-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
              >
                <ArrowLeft className="w-4 h-4" /> {t('back_to_timeline')}
              </button>
              
              <div className="flex flex-col items-center justify-center text-center mb-6 gap-4">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-100 dark:border-indigo-800/30 text-indigo-600 dark:text-indigo-400 p-5 rounded-2xl shadow-inner shrink-0 inline-flex">
                  {activeStep.icon}
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{activeStep.title}</h3>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-auto">
                {activeStep.content}
              </p>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200/60 dark:border-amber-800/50 p-5 rounded-2xl flex gap-4 mb-8 mt-6 shadow-sm">
                <Info className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
                <p className="text-sm font-medium text-amber-900 dark:text-amber-200 leading-relaxed">
                  {t('pro_tip')}
                </p>
              </div>

              <button 
                onClick={() => navigate(activeStep.route)}
                className="w-full py-4 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-indigo-600 dark:to-purple-600 text-white rounded-2xl font-bold hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {activeStep.action}
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
