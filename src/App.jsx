import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Brain, Lightbulb, Users, BarChart3, Languages, Sparkles, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Radar as RadarGraphic } from 'recharts';

const translations = {
  ar: {
    title: "منصة PsyCap الذكية",
    subtitle: "نحو بيئة عمل أكثر إنسانية",
    teamStrength: "قوة الفريق",
    collectiveIndex: "مؤشر السعادة الجماعي",
    avg: "المعدل",
    recommendation: "توصية الذكاء الاصطناعي",
    feedbackTitle: "رأيك يهمنا",
    objection: "اعتراض",
    agree: "أوافق",
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
    collectiveIndex: "Collective Well-being",
    avg: "AVG",
    recommendation: "AI Insight",
    feedbackTitle: "Your Feedback",
    objection: "Dispute",
    agree: "Agree",
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
      background: 'linear-gradient(135deg, #f472b6 0%, #fb923c 100%)', // خلفية متدرجة زهري لبرتقالي
      padding: '20px',
      fontFamily: "'Segoe UI', Roboto, sans-serif",
      color: '#fff'
    }}>
      
      {/* زر اللغة الزجاجي */}
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

      {/* الهيدر */}
      <header style={{ textAlign: 'center', margin: '40px 0' }}>
        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '20px', borderRadius: '30px', backdropFilter: 'blur(15px)', display: 'inline-block' }}>
          <h1 style={{ margin: 0, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'center' }}>
            <Brain size={40} /> {t.title}
          </h1>
          <p style={{ margin: '10px 0 0', opacity: 0.9 }}>{t.subtitle}</p>
        </div>
      </header>

      {/* الإحصائيات (متجاوبة) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
        gap: '15px', maxWidth: '900px', margin: '0 auto 40px' 
      }}>
        <GlassCard icon={<Users />} title={t.teamStrength} value={employees.length} />
        <GlassCard icon={<BarChart3 />} title={t.avg} value={teamAvg} />
      </div>

      {/* قائمة الموظفين */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '25px', maxWidth: '1200px', margin: '0 auto' 
      }}>
        {employees.map(emp => {
          const mood = t.statusMap[emp.status] || t.statusMap["Moderate (Stable)"];
          return (
            <div key={emp.id} style={{ 
              background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)',
              borderRadius: '40px', padding: '25px', border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '20px'
            }}>
              {/* رأس الكارت */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{mood.emoji} {emp.name}</h2>
                  <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>{emp.status}</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.3)', padding: '5px 15px', borderRadius: '20px' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{emp.average_score}</span>
                </div>
              </div>

              {/* الرسم البياني (تم تصغيره للموبايل) */}
              <div style={{ height: '200px', width: '100%' }}>
                <ResponsiveContainer>
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                    {s:t.hope,v:emp.hope},{s:t.efficacy,v:emp.efficacy},{s:t.resilience,v:emp.resilience},{s:t.optimism,v:emp.optimism}
                  ]}>
                    <PolarGrid stroke="rgba(255,255,255,0.3)" />
                    <PolarAngleAxis dataKey="s" tick={{ fill: '#fff', fontSize: 10 }} />
                    <RadarGraphic dataKey="v" stroke="#fff" fill="#fff" fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* أشرطة التقدم مع أزرار التفاعل */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <ProgressWithAction label={t.hope} value={emp.hope} t={t} />
                <ProgressWithAction label={t.efficacy} value={emp.efficacy} t={t} />
                <ProgressWithAction label={t.resilience} value={emp.resilience} t={t} />
                <ProgressWithAction label={t.optimism} value={emp.optimism} t={t} />
              </div>

              {/* رسالة تحفيزية */}
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '20px', fontSize: '0.9rem', fontStyle: 'italic', textAlign: 'center' }}>
                <Sparkles size={16} style={{ verticalAlign: 'middle', margin: '0 5px' }} /> {mood.msg}
              </div>

              {/* التوصية الذكية */}
              <div style={{ background: 'rgba(0,0,0,0.1)', padding: '15px', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h4 style={{ margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
                  <Lightbulb size={18} /> {t.recommendation}
                </h4>
                <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.4' }}>
                  {emp.average_score < 3 
                    ? (lang === 'ar' ? "🚨 الموظف يحتاج لدعم معنوي وجلسة استماع لتعزيز طاقة الأمل." : "🚨 Employee needs moral support and a listening session to boost hope.")
                    : (lang === 'ar' ? "✨ بطل! استمر في تفويض مهام أكبر لهذا الموظف لتعزيز كفاءته." : "✨ Champion! Delegate more significant tasks to this employee to boost efficacy.")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// مكون كارت إحصائي زجاجي
const GlassCard = ({ icon, title, value }) => (
  <div style={{ 
    background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', 
    padding: '15px', borderRadius: '25px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' 
  }}>
    <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{icon}</div>
    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{title}</div>
    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{value}</div>
  </div>
);

// مكون شريط التقدم مع أزرار Like/Dislike
const ProgressWithAction = ({ label, value, t }) => {
  const [liked, setLiked] = useState(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
        <span>{label}</span>
        <span>{value}/5</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ width: `${(value / 5) * 100}%`, height: '100%', background: '#fff', borderRadius: '10px' }} />
        </div>
        <div style={{ display: 'flex', gap: '5px' }}>
          <ThumbsUp 
            size={16} 
            style={{ cursor: 'pointer', color: liked === true ? '#4ade80' : '#fff', opacity: liked === true ? 1 : 0.6 }} 
            onClick={() => setLiked(true)}
          />
          <ThumbsDown 
            size={16} 
            style={{ cursor: 'pointer', color: liked === false ? '#f87171' : '#fff', opacity: liked === false ? 1 : 0.6 }} 
            onClick={() => setLiked(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default App;