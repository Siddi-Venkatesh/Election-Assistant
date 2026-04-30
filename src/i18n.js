import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      app_title: "VoterAssist",
      for_first_time: "Election Process Education 🗳️",
      hero_title_1: "Your Voice Matters.",
      hero_title_2: "Let's Get You Ready.",
      hero_desc: "Navigating your first election can be overwhelming. We've broken down the process into simple, actionable steps so you can cast your vote with confidence.",
      start_guide: "Start Guide",
      ask_assistant: "Ask Assistant",
      step_1_title: "Am I Eligible?",
      step_1_desc: "To vote for the first time, you must be 18 years of age or older on the qualifying date and a citizen.",
      step_1_action: "Check Eligibility Criteria",
      step_2_title: "How to Register",
      step_2_desc: "You need to fill out Form 6. You can do this online through the Voter Service Portal.",
      step_2_action: "Register Online Now",
      step_3_title: "Find Your Polling Booth",
      step_3_desc: "Your polling booth is usually located within 2 km of your residence.",
      step_3_action: "Search Polling Booth",
      step_4_title: "Voting Day Guidelines",
      step_4_desc: "On voting day, bring your Voter ID (EPIC) or any of the 11 alternative photo identity documents.",
      step_4_action: "View Allowed Documents",
      step_5_title: "Download e-EPIC",
      step_5_desc: "Download a secure, digital version of your Voter ID card (e-EPIC) that can be stored on your mobile device.",
      step_5_action: "Get Digital Voter ID",
      back_to_timeline: "Back to timeline",
      pro_tip: "Pro tip: Make sure your name on the electoral roll exactly matches your photo ID.",
      chat_placeholder: "Type your question...",
      chat_greeting: "Hi there! 👋 I'm here to help you navigate your first election. Ask me anything.",
      home: "Home",
      results_title: "Election Results",
      results_desc: "View current election results, past statistical reports, and analyze voter turnout trends across different constituencies."
    }
  },
  hi: {
    translation: {
      app_title: "वोटरअसिस्ट",
      for_first_time: "पहली बार वोट देने वालों के लिए 🗳️",
      hero_title_1: "आपकी आवाज़ मायने रखती है।",
      hero_title_2: "आइए आपको तैयार करें।",
      hero_desc: "अपने पहले चुनाव को समझना भारी पड़ सकता है। हमने इस प्रक्रिया को सरल चरणों में बाँटा है ताकि आप आत्मविश्वास के साथ वोट दे सकें।",
      start_guide: "गाइड शुरू करें",
      ask_assistant: "असिस्टेंट से पूछें",
      step_1_title: "क्या मैं योग्य हूँ?",
      step_1_desc: "पहली बार वोट देने के लिए, आपकी आयु 18 वर्ष या उससे अधिक होनी चाहिए और आपको नागरिक होना चाहिए।",
      step_1_action: "योग्यता मानदंड जाँचें",
      step_2_title: "पंजीकरण कैसे करें",
      step_2_desc: "आपको फॉर्म 6 भरना होगा। आप वोटर सर्विस पोर्टल के माध्यम से इसे ऑनलाइन कर सकते हैं।",
      step_2_action: "अभी ऑनलाइन पंजीकरण करें",
      step_3_title: "अपना मतदान केंद्र खोजें",
      step_3_desc: "आपका मतदान केंद्र आमतौर पर आपके निवास के 2 किमी के भीतर होता है।",
      step_3_action: "मतदान केंद्र खोजें",
      step_4_title: "मतदान दिवस के दिशा-निर्देश",
      step_4_desc: "मतदान के दिन अपना वोटर आईडी (EPIC) या 11 स्वीकृत फोटो पहचान दस्तावेजों में से कोई भी लाएं।",
      step_4_action: "अनुमत दस्तावेज़ देखें",
      back_to_timeline: "टाइमलाइन पर वापस जाएं",
      pro_tip: "प्रो टिप: सुनिश्चित करें कि निर्वाचक नामावली में आपका नाम आपके फोटो आईडी से मेल खाता है।",
      chat_placeholder: "अपना प्रश्न टाइप करें...",
      chat_greeting: "नमस्ते! 👋 मैं आपके पहले चुनाव में आपकी मदद करने के लिए यहाँ हूँ। मुझसे कुछ भी पूछें।",
      home: "होम",
      booth_title: "अपना मतदान केंद्र खोजें",
      booth_desc: "आधिकारिक ECI डेटाबेस की तरह ही अपने चुनावी रोल पंजीकरण का सटीक विवरण खोजने के लिए अपना 10 अंकों का EPIC नंबर दर्ज करें।",
      epic_label: "EPIC नंबर (वोटर आईडी नंबर)",
      search_mock_btn: "खोजें",
      booth_eci_btn: "आधिकारिक ECI खोज"
    }
  },
  es: {
    translation: {
      app_title: "VoterAssist",
      for_first_time: "Para votantes primerizos 🗳️",
      hero_title_1: "Tu voz importa.",
      hero_title_2: "Preparémonos.",
      hero_desc: "Navegar por tu primera elección puede ser abrumador. Hemos dividido el proceso en pasos sencillos.",
      start_guide: "Iniciar Guía",
      ask_assistant: "Preguntar al asistente",
      step_1_title: "¿Soy elegible?",
      step_1_desc: "Para votar por primera vez, debes tener 18 años o más en la fecha de calificación y ser ciudadano.",
      step_1_action: "Comprobar criterios de elegibilidad",
      step_2_title: "Cómo registrarse",
      step_2_desc: "Necesita completar el Formulario 6. Puede hacerlo en línea a través del Portal de Servicios al Votante.",
      step_2_action: "Regístrate en línea ahora",
      step_3_title: "Encuentre su casilla electoral",
      step_3_desc: "Su casilla suele estar a menos de 2 km de su residencia.",
      step_3_action: "Buscar casilla",
      step_4_title: "Pautas para el día de la votación",
      step_4_desc: "El día de la votación, traiga su identificación de votante u otra identificación permitida.",
      step_4_action: "Ver documentos permitidos",
      back_to_timeline: "Volver a la línea de tiempo",
      pro_tip: "Consejo: Asegúrese de que su nombre en el padrón electoral coincida con su identificación.",
      chat_placeholder: "Escribe tu pregunta...",
      chat_greeting: "¡Hola! 👋 Estoy aquí para ayudarte a navegar tu primera elección. Pregúntame lo que sea.",
      home: "Inicio"
    }
  },
  fr: {
    translation: {
      app_title: "VoterAssist",
      for_first_time: "Pour les primo-votants 🗳️",
      hero_title_1: "Votre voix compte.",
      hero_title_2: "Préparons-nous.",
      hero_desc: "Naviguer dans votre première élection peut être difficile. Nous avons simplifié le processus.",
      start_guide: "Commencer le guide",
      ask_assistant: "Demander à l'assistant",
      step_1_title: "Suis-je éligible?",
      step_1_desc: "Pour voter, vous devez avoir 18 ans ou plus à la date requise et être citoyen.",
      step_1_action: "Vérifier les critères",
      step_2_title: "Comment s'inscrire",
      step_2_desc: "Vous devez remplir le Formulaire 6 en ligne ou hors ligne.",
      step_2_action: "S'inscrire en ligne",
      step_3_title: "Trouver votre bureau de vote",
      step_3_desc: "Votre bureau de vote est généralement à moins de 2 km de chez vous.",
      step_3_action: "Rechercher un bureau",
      step_4_title: "Directives pour le jour du vote",
      step_4_desc: "Le jour du vote, apportez votre carte d'électeur ou une pièce d'identité valide.",
      step_4_action: "Voir les documents",
      back_to_timeline: "Retour à la chronologie",
      pro_tip: "Conseil : Assurez-vous que votre nom correspond exactement à votre pièce d'identité.",
      chat_placeholder: "Tapez votre question...",
      chat_greeting: "Bonjour! 👋 Je suis là pour vous aider pour votre première élection. Posez-moi des questions.",
      home: "Accueil"
    }
  },
  te: {
    translation: {
      app_title: "ఓటర్ అసిస్ట్",
      for_first_time: "మొదటి సారి ఓటర్ల కోసం 🗳️",
      hero_title_1: "మీ ఓటు చాలా ముఖ్యం.",
      hero_title_2: "మనం సిద్ధమవుదాం.",
      hero_desc: "మీ మొదటి ఎన్నికల్లో ఓటు వేయడం కొంచెం కష్టంగా అనిపించవచ్చు. మీరు నమ్మకంతో ఓటు వేయడానికి మేము ఈ ప్రక్రియను సరళమైన దశలుగా విభజించాము.",
      start_guide: "గైడ్ ప్రారంభించండి",
      ask_assistant: "అసిస్టెంట్‌ను అడగండి",
      step_1_title: "నేను అర్హుడినా?",
      step_1_desc: "మొదటి సారి ఓటు వేయడానికి, మీకు 18 సంవత్సరాలు నిండి ఉండాలి మరియు మీరు పౌరులై ఉండాలి.",
      step_1_action: "అర్హత ప్రమాణాలను తనిఖీ చేయండి",
      step_2_title: "ఎలా నమోదు చేసుకోవాలి",
      step_2_desc: "మీరు ఫారం 6 నింపాలి. దీన్ని మీరు ఓటర్ సర్వీస్ పోర్టల్ ద్వారా ఆన్‌లైన్‌లో చేయవచ్చు.",
      step_2_action: "ఇప్పుడే ఆన్‌లైన్‌లో నమోదు చేసుకోండి",
      step_3_title: "మీ పోలింగ్ బూత్‌ను కనుగొనండి",
      step_3_desc: "మీ పోలింగ్ బూత్ సాధారణంగా మీ నివాసానికి 2 కి.మీ పరిధిలో ఉంటుంది.",
      step_3_action: "పోలింగ్ బూత్‌ను శోధించండి",
      step_4_title: "పోలింగ్ రోజు మార్గదర్శకాలు",
      step_4_desc: "పోలింగ్ రోజున, మీ ఓటర్ ID (EPIC) లేదా 11 ప్రత్యామ్నాయ ఫోటో గుర్తింపు పత్రాలలో ఏదైనా తీసుకురండి.",
      step_4_action: "అనుమతించబడిన పత్రాలను చూడండి",
      step_5_title: "e-EPIC డౌన్‌లోడ్",
      step_5_desc: "మీ మొబైల్ పరికరంలో భద్రపరుచుకోగల మీ ఓటర్ ID కార్డ్ (e-EPIC) డిజిటల్ వెర్షన్‌ను డౌన్‌లోడ్ చేసుకోండి.",
      step_5_action: "డిజిటల్ ఓటర్ ID పొందండి",
      back_to_timeline: "టైమ్‌లైన్‌కు తిరిగి వెళ్లండి",
      pro_tip: "ప్రో చిట్కా: ఓటర్ల జాబితాలో మీ పేరు మీ ఫోటో ID తో సరిగ్గా సరిపోలుతుందని నిర్ధారించుకోండి.",
      chat_placeholder: "మీ ప్రశ్నను టైప్ చేయండి...",
      chat_greeting: "నమస్కారం! 👋 మీ మొదటి ఎన్నికల్లో మీకు సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను. నన్ను ఏదైనా అడగండి.",
      home: "హోమ్",
      booth_title: "మీ పోలింగ్ బూత్‌ను కనుగొనండి",
      booth_desc: "అధికారిక ECI డేటాబేస్ లాగానే మీ ఓటర్ రిజిస్ట్రేషన్ వివరాలను తెలుసుకోవడానికి మీ 10-అంకెల EPIC నంబర్‌ను నమోదు చేయండి.",
      epic_label: "EPIC నంబర్ (ఓటర్ ID నంబర్)",
      search_mock_btn: "శోధించండి",
      booth_eci_btn: "అధికారిక ECI శోధన",
      results_title: "ఎన్నికల ఫలితాలు",
      results_desc: "ప్రస్తుత ఎన్నికల ఫలితాలు, గత నివేదికలను వీక్షించండి మరియు ఓటింగ్ శాతాన్ని విశ్లేషించండి."
    }
  },
  ta: { translation: { app_title: "VoterAssist (தமிழ்)" } },
  ml: { translation: { app_title: "VoterAssist (മലയാളം)" } },
  mr: { translation: { app_title: "VoterAssist (मराठी)" } },
  bn: { translation: { app_title: "VoterAssist (বাংলা)" } },
  gu: { translation: { app_title: "VoterAssist (ગુજરાતી)" } }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n;
