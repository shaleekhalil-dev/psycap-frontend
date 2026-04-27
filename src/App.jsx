import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Brain, Lightbulb, Users, BarChart3, Target, Heart, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Radar as RadarGraphic } from 'recharts';

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/employees/')
      .then(res => setEmployees(res.data))
      .catch(err => console.error("API Error:", err));
  }, []);

  const teamAvg = employees.length > 0 
    ? (employees.reduce((acc, emp) => acc + emp.average_score, 0) / employees.length).toFixed(2) 
    : 0;

  const getStrategicAnalysis = (emp) => {
    const scores = [ {n: 'Hope', v: emp.hope}, {n: 'Efficacy', v: emp.efficacy}, {n: 'Resilience', v: emp.resilience}, {n: 'Optimism', v: emp.optimism} ];
    const lowest = scores.reduce((prev, curr) => (prev.v < curr.v) ? prev : curr);
    
    const recommendations = {
      'Hope': { text: 'Focus on goal-setting interventions.', color: '#3182ce', bg: '#ebf8ff', tasks: ['Set SMART goals', 'Identify obstacles'] },
      'Efficacy': { text: 'Provide mastery experiences.', color: '#38a169', bg: '#f0fff4', tasks: ['Assign lead roles', 'Positive feedback'] },
      'Resilience': { text: 'Build coping capacity.', color: '#ed8936', bg: '#fffaf0', tasks: ['Stress management', 'Social support'] },
      'Optimism': { text: 'Practice cognitive reframing.', color: '#9f7aea', bg: '#faf5ff', tasks: ['Positive expectancy', 'Success analysis'] }
    };
    
    const analysis = recommendations[lowest.n];
    if (emp.average_score < 3.0) return { ...analysis, text: 'High Risk: Immediate Support Needed', color: '#e53e3e', bg: '#fff5f5' };
    return analysis;
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ color: '#0f172a', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', fontSize: '2.5rem' }}>
          <Brain size={48} color='#3182ce'/> PsyCap Strategic Monitor
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.2rem' }}>أنسنة بيئات العمل الرقمية عبر الذكاء الاصطناعي</p>
      </header>

      {/* Team Dashboard Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '50px' }}>
        <StatCard icon={<Users color='#3182ce'/>} title="Team Strength" value={`${employees.length} Members`} color="#ebf8ff" />
        <StatCard icon={<BarChart3 color='#38a169'/>} title="Collective PsyCap Index" value={`${teamAvg} / 5.0`} color="#f0fff4" />
      </div>

      {/* Employees Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '35px' }}>
        {employees.map(emp => {
          const analysis = getStrategicAnalysis(emp);
          return (
            <div key={emp.id} style={{ backgroundColor: 'white', padding: '35px', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', border: '1px solid #edf2f7' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                <h2 style={{ margin: 0, color: '#1e293b' }}>{emp.name} <span style={{fontSize:'12px', verticalAlign:'middle', color:analysis.color}}>{emp.status}</span></h2>
                <div style={{ textAlign: 'right' }}><h3 style={{ margin: 0, color: '#2d3748' }}>{emp.average_score}</h3><p style={{ fontSize:'10px', color:'#a0aec0' }}>AVG</p></div>
              </div>

              <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                <div style={{ flex: 1, height: '240px' }}>
                  <ResponsiveContainer>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[{s:'Hope',v:emp.hope},{s:'Efficacy',v:emp.efficacy},{s:'Resilience',v:emp.resilience},{s:'Optimism',v:emp.optimism}]}>
                      <PolarGrid stroke='#e2e8f0' /><PolarAngleAxis dataKey='s' tick={{fontSize: 12}} />
                      <RadarGraphic dataKey='v' stroke='#3182ce' fill='#3182ce' fillOpacity={0.5} isAnimationActive={false} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ flex: 1 }}>
                  <ProgressItem label="Hope" value={emp.hope} color="#3182ce" />
                  <ProgressItem label="Efficacy" value={emp.efficacy} color="#38a169" />
                  <ProgressItem label="Resilience" value={emp.resilience} color="#ed8936" />
                  <ProgressItem label="Optimism" value={emp.optimism} color="#9f7aea" />
                </div>
              </div>

              <div style={{ marginTop: '30px', padding: '20px', backgroundColor: analysis.bg, borderRadius: '20px', borderLeft: `6px solid ${analysis.color}` }}>
                <h4 style={{ margin: '0 0 10px 0', color: analysis.color, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Lightbulb size={20}/> AI Strategic Recommendation
                </h4>
                <p style={{ margin: '0 0 15px 0', fontSize: '15px', fontWeight: '500' }}>{analysis.text}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {analysis.tasks.map((task, i) => (
                    <span key={i} style={{ backgroundColor: 'white', padding: '5px 12px', borderRadius: '10px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                      <CheckCircle2 size={14} color={analysis.color}/> {task}
                    </span>
                  ))}
                </div>
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
    <div><p style={{ margin: 0, fontSize: '14px', color: '#718096' }}>{title}</p><h3 style={{ margin: 0, color: '#1e293b', fontSize: '22px' }}>{value}</h3></div>
  </div>
);

const ProgressItem = ({ label, value, color }) => (
  <div style={{ marginBottom: '15px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', color: '#4a5568' }}><span>{label}</span><span>{value}/5</span></div>
    <div style={{ width: '100%', height: '8px', backgroundColor: '#edf2f7', borderRadius: '10px', overflow: 'hidden' }}>
      <div style={{ width: `${(value/5)*100}%`, height: '100%', backgroundColor: color, borderRadius: '10px' }} />
    </div>
  </div>
);

export default App;