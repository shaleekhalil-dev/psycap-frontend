import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Brain, Lightbulb, Users, BarChart3, CheckCircle2, Languages, Sparkles } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Radar as RadarGraphic } from 'recharts';

const translations = {
  ar: {
    title: "مراقب الـ PsyCap الاستراتيجي",
    subtitle: "أنسنة بيئات العمل الرقمية عبر الذكاء الاصطناعي",
    teamStrength: "قوة الفريق",
    members: "أعضاء",
    collectiveIndex: "مؤشر رأس المال النفسي الجماعي",
    avg: "المعدل",
    recommendation: "توصية الذكاء الاصطناعي الاستراتيجية",
    motivationTitle: "دفعة إيجابية",
    hope: "الأمل", efficacy: "الكفاءة", resilience: "المرونة", optimism: "التفاؤل",
    statusMap: {
      "High (Thriving)": { emoji: "🚀", msg: "أنت ملهم! استمر في قيادة التغيير ونشر طاقتك الإيجابية." },
      "Moderate (Stable)": { emoji: "⚖️", msg: "أداء متزن وجميل. أنت تمتلك أساساً قوياً للنمو أكثر." },
      "Low (At Risk)": { emoji: "🌱", msg: "تذكر أن البدايات الصعبة تصنع أبطالاً. نحن هنا لندعمك." }
    }
  },
  en: {
    title: "PsyCap Strategic Monitor",
    subtitle: "Humanizing Digital Workplaces via AI",
    teamStrength: "Team Strength",
    members: "Members",
    collectiveIndex: "Collective PsyCap Index",
    avg: "AVG",
    recommendation: "AI Strategic Recommendation",
    motivationTitle: "Positive Boost",
    hope: "Hope", efficacy: "Efficacy", resilience: "Resilience", optimism: "Optimism",
    statusMap: {
      "High (Thriving)": { emoji: "🚀", msg: "You are inspiring! Keep leading the change and spreading your energy." },
      "Moderate (Stable)": { emoji: "⚖️", msg: "Steady and solid performance. You have a great foundation for growth." },
      "Low (At Risk)": { emoji: "🌱", msg: "Remember, tough starts make legends. We are here to support you." }
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
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ padding: '40px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Segoe UI, Tahoma, sans-serif' }}>
      
      <button 
        onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
        style={{ position: 'fixed', top: '20px', left: lang === 'ar' ? '20px' : 'auto', right: lang === 'en' ? '20px' : 'auto', padding: '10px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 1000, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
      >
        <Languages size={18} /> {lang === 'ar' ? 'English' : 'العربية'}
      </button>

      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ color: '#0f172a', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', fontSize: '2.5rem', fontWeight: '800' }}>
          <Brain size={48} color='#3182ce'/> {t.title}
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.2rem' }}>{t.subtitle}</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '50px' }}>
        <StatCard icon={<Users color='#3182ce'/>} title={t.teamStrength} value={`${employees.length} ${t.members}`} color="#ebf8ff" />
        <StatCard icon={<BarChart3 color='#38a169'/>} title={t.collectiveIndex} value={`${teamAvg} / 5.0`} color="#f0fff4" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '35px' }}>
        {employees.map(emp => {
          const mood = t.statusMap[emp.status] || t.statusMap["Moderate (Stable)"];
          return (
            <div key={emp.id} style={{ backgroundColor: 'white', padding: '35px', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', border: '1px solid #edf2f7', transition: 'transform 0.3s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                <div>
                  <h2 style={{ margin: 0, color: '#1e293b', fontSize: '24px' }}>
                    {mood.emoji} {emp.name}
                  </h2>
                  <span style={{ fontSize: '14px', color: '#64748b' }}>{emp.status}</span>
                </div>
                <div style={{ textAlign: lang === 'ar' ? 'left' : 'right' }}>
                  <h3 style={{ margin: 0, color: '#2d3748', fontSize: '28px' }}>{emp.average_score}</h3>
                  <p style={{ fontSize: '10px', color: '#a0aec0', fontWeight: 'bold' }}>{t.avg}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '30px', alignItems: 'center', flexDirection: lang === 'ar' ? 'row-reverse' : 'row' }}>
                <div style={{ flex: 1, height: '240px' }}>
                  <ResponsiveContainer>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[{s:t.hope,v:emp.hope},{s:t.efficacy,v:emp.efficacy},{s:t.resilience,v:emp.resilience},{s:t.optimism,v:emp.optimism}]}>
                      <PolarGrid stroke='#e2e8f0' /><PolarAngleAxis dataKey='s' tick={{fontSize: 12}} />
                      <RadarGraphic dataKey='v' stroke='#3182ce' fill='#3182ce' fillOpacity={0.5} isAnimationActive={false} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ flex: 1 }}>
                  <ProgressItem label={t.hope} value={emp.hope} color="#3182ce" />
                  <ProgressItem label={t.efficacy} value={emp.efficacy} color="#38a169" />
                  <ProgressItem label={t.resilience} value={emp.resilience} color="#ed8936" />
                  <ProgressItem label={t.optimism} value={emp.optimism} color="#9f7aea" />
                </div>
              </div>
              
              {/* رسالة التحفيز */}
              <div style={{ marginTop: '25px', padding: '15px', backgroundColor: '#fdf2f8', borderRadius: '15px', border: '1px dashed #f472b6' }}>
                <p style={{ margin: 0, color: '#be185d', fontSize: '14px', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} /> {mood.msg}
                </p>
              </div>

              <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '20px', borderRight: lang === 'ar' ? '6px solid #3182ce' : 'none', borderLeft: lang === 'en' ? '6px solid #3182ce' : 'none' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#3182ce', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Lightbulb size={20}/> {t.recommendation}
                </h4>
                <p style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#334155' }}>
                  {emp.average_score < 3 ? (lang === 'ar' ? "يحتاج لدعم في بناء المرونة والأمل" : "Needs support in building resilience and hope") : (lang === 'ar' ? "استمر في تعزيز مهارات القيادة الإيجابية" : "Continue enhancing positive leadership skills")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const StatCard = ({ icon, title, value, color }) => (
  <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: '25px', border: '1px solid #edf2f7' }}>
    <div style={{ backgroundColor: color, padding: '15px', borderRadius: '15px' }}>{icon}</div>
    <div><p style={{ margin: 0, fontSize: '14px', color: '#718096' }}>{title}</p><h3 style={{ margin: 0, color: '#1e293b', fontSize: '22px', fontWeight: 'bold' }}>{value}</h3></div>
  </div>
);

const ProgressItem = ({ label, value, color }) => (
  <div style={{ marginBottom: '15px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', color: '#4a5568' }}><span>{label}</span><span>{value}/5</span></div>
    <div style={{ width: '100%', height: '8px', backgroundColor: '#edf2f7', borderRadius: '10px', overflow: 'hidden' }}>
      <div style={{ width: `${Math.min((value/5)*100, 100)}%`, height: '100%', backgroundColor: color, borderRadius: '10px' }} />
    </div>
  </div>
);

export default App;