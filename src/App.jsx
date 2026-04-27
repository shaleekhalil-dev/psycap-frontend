import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Brain, Lightbulb, Users, BarChart3, Languages, Sparkles, ThumbsUp, ThumbsDown, MessageSquare, Send, ExternalLink } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Radar as RadarGraphic } from 'recharts';

const translations = {
  ar: {
    title: "منصة PsyCap الذكية",
    subtitle: "نحو بيئة عمل أكثر إنسانية",
    teamStrength: "قوة الفريق",
    collectiveIndex: "مؤشر السعادة",
    avg: "المعدل",
    recommendation: "توصية الذكاء الاصطناعي",
    feedback: "التفاعلات",
    comments: "ملاحظات الموظف",
    askManager: "اسأل المدير (تحليل المشاعر)",
    placeholder: "اكتب ملاحظاتك هنا...",
    hope: "الأمل", efficacy: "الكفاءة", resilience: "المرونة", optimism: "التفاؤل",
    statusMap: {
      "High (Thriving)": { emoji: "🌟", msg: "أنت شعلة نجاح في الفريق!" },
      "Moderate (Stable)": { emoji: "🍃", msg: "توازنك هو سر استمرارك." },
      "Low (At Risk)": { emoji: "💪", msg: "كل كبوة هي بداية لنهوض أقوى." }
    }
  },
  en: {
    title: "PsyCap Smart Hub",
    subtitle: "Humanizing Workplaces",
    teamStrength: "Team Power",
    collectiveIndex: "Happiness Index",
    avg: "AVG",
    recommendation: "AI Insight",
    feedback: "Interactions",
    comments: "Employee Notes",
    askManager: "Ask Manager (Emotion Analysis)",
    placeholder: "Type your notes...",
    hope: "Hope", efficacy: "Efficacy", resilience: "Resilience", optimism: "Optimism",
    statusMap: {
      "High (Thriving)": { emoji: "🌟", msg: "You are the team's shining star!" },
      "Moderate (Stable)": { emoji: "🍃", msg: "Your balance is your superpower." },
      "Low (At Risk)": { emoji: "💪", msg: "Every setback is a setup for a comeback." }
    }
  }
};

function App() {
  const [employees, setEmployees] = useState([]);
  const [lang, setLang] = useState('ar');
  const t = translations[lang];

  useEffect(() => {
    axios.get('https://psycap-backend.onrender.com/api/employees/')
      .then(res => setEmployees(res.data))
      .catch(err => console.error("API Error:", err));
  }, []);

  const teamAvg = employees.length > 0 
    ? (employees.reduce((acc, emp) => acc + emp.average_score, 0) / employees.length).toFixed(2) 
    : 0;

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f472b6 0%, #fb923c 100%)',
      padding: '20px',
      fontFamily: "'Segoe UI', Roboto, sans-serif",
      color: '#fff'
    }}>
      
      <button 
        onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
        style={{ 
          position: 'fixed', top: '15px', [lang === 'ar' ? 'left' : 'right']: '15px',
          padding: '10px 15px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.3)',
          background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: '#fff',
          cursor: 'pointer', zIndex: 1000, display: 'flex', alignItems: 'center', gap: '8px'
        }}
      >
        <Languages size={18} /> {lang === 'ar' ? 'EN' : 'AR'}
      </button>

      <header style={{ textAlign: 'center', margin: '40px 0' }}>
        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '20px', borderRadius: '30px', backdropFilter: 'blur(15px)', display: 'inline-block' }}>
          <h1 style={{ margin: 0, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'center' }}>
            <Brain size={40} /> {t.title}
          </h1>
          <p style={{ margin: '10px 0 0', opacity: 0.9 }}>{t.subtitle}</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '15px', maxWidth: '900px', margin: '0 auto 40px' }}>
        <GlassCard icon={<Users />} title={t.teamStrength} value={employees.length} />
        <GlassCard icon={<BarChart3 />} title={t.avg} value={teamAvg} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px', maxWidth: '1200px', margin: '0 auto' }}>
        {employees.map(emp => {
          const mood = t.statusMap[emp.status] || t.statusMap["Moderate (Stable)"];
          return (
            <div key={emp.id} style={{ 
              background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)',
              borderRadius: '40px', padding: '25px', border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex', flexDirection: 'column', gap: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{mood.emoji} {emp.name}</h2>
                <div style={{ background: 'rgba(255,255,255,0.3)', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold' }}>{emp.average_score}</div>
              </div>

              <div style={{ height: '180px' }}>
                <ResponsiveContainer>
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[{s:t.hope,v:emp.hope},{s:t.efficacy,v:emp.efficacy},{s:t.resilience,v:emp.resilience},{s:t.optimism,v:emp.optimism}]}>
                    <PolarGrid stroke="rgba(255,255,255,0.3)" /><PolarAngleAxis dataKey="s" tick={{ fill: '#fff', fontSize: 10 }} />
                    <RadarGraphic dataKey="v" stroke="#fff" fill="#fff" fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* مجالات التقييم مع العدادات */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <ProgressItemWithCounter label={t.hope} value={emp.hope} />
                <ProgressItemWithCounter label={t.efficacy} value={emp.efficacy} />
              </div>

              {/* صندوق التعليقات */}
              <div style={{ marginTop: '10px' }}>
                <label style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}><MessageSquare size={14}/> {t.comments}</label>
                <div style={{ position: 'relative' }}>
                  <textarea 
                    placeholder={t.placeholder}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '15px', padding: '10px', color: '#fff', fontSize: '0.85rem', resize: 'none', height: '60px' }}
                  />
                  <Send size={16} style={{ position: 'absolute', [lang === 'ar' ? 'left' : 'right']: '10px', bottom: '10px', opacity: 0.6, cursor: 'pointer' }} />
                </div>
              </div>

              {/* زر اسأل المدير (الدمج) */}
              <a 
                href="https://emotion-detector-app-six.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '20px',
                  color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold',
                  border: '1px solid rgba(255,255,255,0.3)', transition: '0.3s'
                }}
              >
                <Sparkles size={18} /> {t.askManager} <ExternalLink size={14} />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const GlassCard = ({ icon, title, value }) => (
  <div style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', padding: '15px', borderRadius: '25px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
    <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{icon}</div>
    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{title}</div>
    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{value}</div>
  </div>
);

const ProgressItemWithCounter = ({ label, value }) => {
  const [likes, setLikes] = useState(Math.floor(Math.random() * 5));
  const [dislikes, setDislikes] = useState(Math.floor(Math.random() * 2));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
        <span>{label}</span>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }} onClick={() => setLikes(likes + 1)}><ThumbsUp size={12} /> {likes}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }} onClick={() => setDislikes(dislikes + 1)}><ThumbsDown size={12} /> {dislikes}</span>
        </div>
      </div>
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ width: `${(value / 5) * 100}%`, height: '100%', background: '#fff' }} />
      </div>
    </div>
  );
};

export default App;