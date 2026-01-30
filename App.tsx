
import React, { useState, useEffect, useRef } from 'react';
import { Theme, User, ThreatAnalysisResult } from './types';
import { Layout } from './components/Layout';
import { ThemeWrapper } from './components/ThemeWrapper';
import { SafeClickLogo } from './components/Logo';
import { ATTACK_TYPES, LEGAL_AWARENESS, RESOURCES, MYTHS_FACTS } from './constants';
import { gemini, AnalysisCategory } from './services/geminiService';
import { 
  Shield, 
  Eye, 
  HelpCircle, 
  Lock, 
  AlertCircle, 
  ExternalLink, 
  Play, 
  FileText, 
  CheckCircle2, 
  FileQuestion,
  Loader2,
  Send,
  Camera,
  BookOpen,
  Zap,
  Scale,
  AlertTriangle,
  Download,
  X,
  Search,
  Gavel,
  Activity,
  ArrowRight,
  ShieldAlert,
  Terminal,
  Cpu,
  ChevronRight,
  Flag,
  Globe,
  Database,
  Fingerprint,
  Info,
  Layers,
  BrainCircuit,
  Target,
  Trophy,
  History,
  Lightbulb,
  ShieldCheck,
  Radar,
  Link as LinkIcon,
  Mail,
  Smartphone,
  Baby,
  Dna,
  Microscope,
  Crosshair
} from 'lucide-react';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [user, setUser] = useState<User | null>({ id: '1', name: 'Security Enthusiast', email: 'user@example.com', role: 'User' });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ThreatAnalysisResult | null>(null);
  const [analysisText, setAnalysisText] = useState('');
  const [analysisImage, setAnalysisImage] = useState<string | null>(null);
  const [analysisCategory, setAnalysisCategory] = useState<AnalysisCategory>('Auto-Detect');
  const [isELI5, setIsELI5] = useState(false);
  const [scanSteps, setScanSteps] = useState<string[]>([]);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: 'Sentinel Core Online. I am SAFECLICK AI. How can I assist your defense today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [learningProgress, setLearningProgress] = useState(35);

  useEffect(() => {
    const savedTheme = localStorage.getItem('safeclick-theme') as Theme;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('safeclick-theme', theme);
  }, [theme]);

  const simulateScanSteps = () => {
    const steps = [
      "Initializing Neural Uplink...",
      "Analyzing Input Entropy...",
      "Scanning Technical Artifacts...",
      "Decoding Psychological Vectors...",
      "Traversing Global Threat Databases...",
      "Finalizing Risk Computation..."
    ];
    setScanSteps([]);
    steps.forEach((step, i) => {
      setTimeout(() => setScanSteps(prev => [...prev, step]), i * 800);
    });
  };

  const handleAnalysis = async () => {
    if (!analysisText && !analysisImage) return;
    setIsAnalyzing(true);
    simulateScanSteps();
    try {
      const result = await gemini.analyzeThreat(analysisText, analysisCategory, analysisImage || undefined, isELI5);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    
    try {
      const response = await gemini.getChatbotResponse(userMsg, []);
      setChatMessages(prev => [...prev, { role: 'model', text: response || 'Neural link unstable. Please retry.' }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'model', text: 'Error encountered in processing core.' }]);
    }
  };

  const renderHome = () => (
    <div className="space-y-10 animate-in fade-in zoom-in-95 duration-700">
      {/* Dynamic Security Feed Ticker */}
      <div className="bg-black/40 border border-white/5 dark:border-white/10 rounded-2xl py-2 px-6 overflow-hidden relative shadow-inner">
        <div className="flex items-center gap-6 animate-marquee whitespace-nowrap">
          <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--accent)]">
            <Activity size={12} className="animate-pulse" /> Live Threat Feed: High Activity
          </span>
          <span className="text-[10px] opacity-40 font-mono">| [SENTINEL]: AI scanning 1.2M packets/sec</span>
          <span className="text-[10px] opacity-40 font-mono">| [INTEL]: New smishing campaign masquerading as "Post Office" detected</span>
          <span className="text-[10px] opacity-40 font-mono">| [SYSTEM]: Kernel security level 5 active</span>
        </div>
        <style>{`
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-marquee { display: inline-flex; animation: marquee 40s linear infinite; }
        `}</style>
      </div>

      {/* Main Hero Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent)] to-purple-600 rounded-[48px] opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative overflow-hidden rounded-[48px] bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-12 lg:p-20 h-full flex flex-col justify-center shadow-2xl">
            {/* HUD Scan Effect */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
              <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--accent)] animate-[scan_4s_linear_infinite]"></div>
            </div>
            <style>{` @keyframes scan { 0% { top: 0% } 100% { top: 100% } } `}</style>

            <div className="relative z-10 space-y-10">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 text-[10px] font-black uppercase tracking-[0.2em]">
                <ShieldCheck size={14} className="animate-pulse" /> Global Defense Active
              </div>
              <h1 className="text-6xl lg:text-9xl font-black leading-[0.8] tracking-tighter uppercase italic text-gray-900 dark:text-white">
                Stay <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-purple-500">Untouchable.</span>
              </h1>
              <p className="text-xl lg:text-2xl opacity-60 max-w-2xl font-medium leading-relaxed text-gray-700 dark:text-gray-300">
                Advanced neural protection against human-centric cyber threats. Don't just detect—<span className="text-[var(--accent)] font-bold italic">anticipate.</span>
              </p>
              <div className="flex flex-wrap gap-6 pt-6">
                <button onClick={() => setActiveTab('analyzer')} className="px-10 py-6 bg-[var(--accent)] text-white rounded-[24px] font-black uppercase tracking-widest text-xs flex items-center gap-4 hover:scale-105 transition-all shadow-2xl shadow-[var(--accent-glow)]">
                  Initiate Neural Scan <Radar size={18} />
                </button>
                <div className="flex items-center gap-4 px-6 py-4 bg-gray-100 dark:bg-white/5 rounded-[24px] border border-gray-200 dark:border-white/10">
                   <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center">
                     <Trophy size={20} className="text-[var(--accent)]" />
                   </div>
                   <div>
                     <p className="text-[10px] font-black uppercase opacity-40">Learning Progress</p>
                     <p className="text-sm font-black">{learningProgress}% Complete</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
           <div className="flex-1 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[48px] p-10 text-white relative overflow-hidden group">
              <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <Zap size={32} />
                <div className="space-y-4">
                  <h3 className="text-3xl font-black uppercase tracking-tighter italic">Daily Tip</h3>
                  <p className="text-sm opacity-80 leading-relaxed font-medium">"Banks never ask for your PIN or OTP over a phone call. If they do, hang up immediately."</p>
                  <button className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">Archived Tips <ChevronRight size={12}/></button>
                </div>
              </div>
           </div>
           <div className="flex-1 bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-[48px] p-10 flex flex-col justify-between hover:border-[var(--accent)] transition-all">
              <div className="flex justify-between items-start">
                <div className="p-4 bg-[var(--accent)]/10 text-[var(--accent)] rounded-2xl">
                  <Fingerprint size={24} />
                </div>
                <span className="text-[10px] font-bold opacity-30 uppercase tracking-widest">Accuracy</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-5xl font-black tracking-tighter">99.9%</h3>
                <p className="text-xs opacity-50 uppercase font-black tracking-widest">AI Threat Confidence</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderAwareness = () => (
    <div className="space-y-16 animate-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="relative py-24 px-12 bg-gray-900 rounded-[56px] overflow-hidden border border-white/5 shadow-2xl group text-center">
        <div className="absolute inset-0 opacity-20"><div className="h-full w-full bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] blur-[120px]"></div></div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20 text-xs font-black uppercase tracking-[0.3em] mx-auto"><BrainCircuit size={16} /> Neural Defense Layer 01</div>
          <h2 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase italic leading-[0.85] text-white">The Human <br/><span className="text-[var(--accent)]">Vulnerability.</span></h2>
          <p className="text-xl opacity-60 leading-relaxed font-medium text-gray-300 max-w-2xl mx-auto">Social engineering isn't a tech problem; it's a psychology problem. Attackers hack brains, not servers.</p>
        </div>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {MYTHS_FACTS.map((item, i) => (
          <div key={i} className="group p-8 bg-white/5 border border-white/10 rounded-[32px] space-y-6 hover:bg-white/10 transition-all">
            <div className="space-y-4"><div className="flex items-center gap-3 text-red-400"><X size={18} /><h4 className="text-[10px] font-black uppercase tracking-[0.2em]">The Myth</h4></div><p className="text-sm font-bold opacity-80 italic">"{item.myth}"</p></div>
            <div className="h-[1px] w-full bg-white/10"></div>
            <div className="space-y-4"><div className="flex items-center gap-3 text-emerald-400"><CheckCircle2 size={18} /><h4 className="text-[10px] font-black uppercase tracking-[0.2em]">The Fact</h4></div><p className="text-sm opacity-60 leading-relaxed">{item.fact}</p></div>
          </div>
        ))}
      </section>
    </div>
  );

  const renderAttacks = () => (
    <div className="space-y-16 animate-in slide-in-from-right-4 duration-700 pb-20">
      <div className="border-b border-white/10 pb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-500 rounded-full border border-red-500/20 text-[10px] font-black uppercase tracking-widest"><Radar size={12} className="animate-pulse" /> Scanning Vectors</div>
        <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase italic leading-[0.85]">Threat <span className="text-red-500 underline decoration-red-500/20 underline-offset-8">Simulation.</span></h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {ATTACK_TYPES.map(attack => (
          <div key={attack.id} className="group relative bg-white/5 border border-white/10 rounded-[48px] overflow-hidden flex flex-col hover:border-red-500/50 transition-all shadow-2xl">
            <div className="aspect-video relative overflow-hidden bg-black">
               <iframe className="w-full h-full relative z-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700" src={`https://www.youtube.com/embed/${attack.youtubeIds.en}?autoplay=0&mute=1&controls=0&loop=1`} title={attack.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
               <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between pointer-events-none group-hover:opacity-100 opacity-40 transition-opacity duration-500"><Target size={24} className="text-red-500 animate-pulse" /></div>
            </div>
            <div className="p-10 lg:p-14 space-y-10 flex-1 flex flex-col relative z-30">
              <h3 className="text-4xl font-black uppercase tracking-tighter italic group-hover:text-red-500 transition-colors">{attack.title}</h3>
              <p className="text-sm opacity-60 leading-relaxed font-medium">{attack.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10 border-t border-white/5">
                <div className="space-y-5"><h4 className="text-[10px] font-black uppercase tracking-widest text-red-400 flex items-center gap-2"><AlertCircle size={14}/> Attack Anatomy</h4><ul className="space-y-3">{attack.anatomy.map((part, i) => (<li key={i} className="text-[11px] opacity-70 flex gap-3 font-bold group-hover:opacity-100 transition-opacity"><div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div> {part}</li>))}</ul></div>
                <div className="space-y-5"><h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-2"><ShieldCheck size={14}/> Countermeasure</h4><p className="text-[11px] opacity-80 leading-relaxed font-bold italic">"Always perform an out-of-band verification. Use official apps, not provided links."</p></div>
              </div>
              <button onClick={() => window.open(`https://www.youtube.com/watch?v=${attack.youtubeIds.en}`, '_blank')} className="w-full py-5 bg-white/5 hover:bg-red-600 hover:text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all border border-white/10"> <Play size={16} /> Load Protocol </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalyzer = () => (
    <div className="space-y-12 animate-in zoom-in-95 duration-500 pb-20">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full border border-[var(--accent)]/20 text-[10px] font-black uppercase tracking-widest mb-2"><Cpu size={16} /> Neural Auditor v5.0 Pro</div>
        <h2 className="text-5xl font-black tracking-tighter uppercase italic">Neural <span className="text-[var(--accent)]">Forensic Scanner</span></h2>
        <p className="opacity-60 text-lg font-medium leading-relaxed italic">High-precision analytical detection engine with logical reasoning paths.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
             {(['Auto-Detect', 'URL', 'Email', 'SMS/WhatsApp', 'Image'] as AnalysisCategory[]).map((cat) => (
                <button key={cat} onClick={() => setAnalysisCategory(cat)} className={`flex flex-col items-center justify-center p-4 rounded-3xl border transition-all gap-2 ${analysisCategory === cat ? 'bg-[var(--accent)] border-[var(--accent)] text-white shadow-xl shadow-[var(--accent-glow)]' : 'bg-white/5 border-white/10 opacity-50 hover:opacity-100 hover:bg-white/10'}`}>
                   {cat === 'Auto-Detect' && <Terminal size={20} />}{cat === 'URL' && <LinkIcon size={20} />}{cat === 'Email' && <Mail size={20} />}{cat === 'SMS/WhatsApp' && <Smartphone size={20} />}{cat === 'Image' && <Camera size={20} />}
                   <span className="text-[9px] font-black uppercase tracking-widest">{cat}</span>
                </button>
             ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[48px] p-10 lg:p-14 space-y-8 shadow-2xl relative overflow-hidden">
             <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                   <h3 className="text-xl font-black uppercase tracking-tighter">Forensic Input</h3>
                   <div className="flex items-center gap-4">
                      <button onClick={() => setIsELI5(!isELI5)} className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${isELI5 ? 'bg-amber-500/20 border-amber-500 text-amber-500' : 'bg-white/5 border-white/10 opacity-40'}`}>
                         <Baby size={14} /> <span className="text-[9px] font-black uppercase">ELI5 Mode</span>
                      </button>
                      <button onClick={() => document.getElementById('image-upload')?.click()} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10"><Camera size={20}/></button>
                      <input type="file" id="image-upload" className="hidden" accept="image/*" onChange={(e) => {
                         const file = e.target.files?.[0];
                         if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => setAnalysisImage(reader.result as string);
                            reader.readAsDataURL(file);
                            setAnalysisCategory('Image');
                         }
                      }} />
                   </div>
                </div>
                <textarea value={analysisText} onChange={(e) => setAnalysisText(e.target.value)} placeholder={`Paste any content... Auto-Detect mode will determine the vector and logic.`} className="w-full h-48 bg-black/20 border border-white/5 rounded-[32px] p-8 text-sm focus:outline-none focus:border-[var(--accent)] transition-all font-mono resize-none shadow-inner" />
                {analysisImage && (
                  <div className="relative group rounded-[32px] overflow-hidden border border-white/10 aspect-video bg-black/40 shadow-2xl">
                    <img src={analysisImage} alt="Preview" className="w-full h-full object-contain" />
                    <button onClick={() => setAnalysisImage(null)} className="absolute top-4 right-4 p-3 bg-red-600 rounded-2xl text-white"><X size={20}/></button>
                  </div>
                )}
                <button onClick={handleAnalysis} disabled={isAnalyzing || (!analysisText && !analysisImage)} className="w-full py-6 bg-[var(--accent)] text-white rounded-[24px] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-4 hover:scale-[1.01] transition-all disabled:opacity-50 shadow-2xl shadow-[var(--accent-glow)]">
                  {isAnalyzing ? <><Loader2 className="animate-spin"/> Traversing Neural Nodes...</> : <><Radar size={18} /> Run Deep Analysis Audit</>}
                </button>
             </div>
          </div>
          
          {/* Real-time Scan Steps Simulation */}
          {isAnalyzing && (
            <div className="p-10 bg-black/20 border border-white/10 rounded-[40px] space-y-4 animate-in fade-in slide-in-from-top-4">
              <div className="flex items-center gap-4 text-[var(--accent)] mb-4">
                <Dna className="animate-spin" size={24} />
                <h4 className="text-xs font-black uppercase tracking-widest">Real-time Analysis Log</h4>
              </div>
              <div className="space-y-2">
                {scanSteps.map((step, i) => (
                  <div key={i} className="flex items-center gap-3 text-[10px] font-mono opacity-60">
                    <CheckCircle2 size={12} className="text-emerald-500" /> {step}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 space-y-8">
           <div className={`
              p-12 rounded-[48px] border transition-all duration-700 min-h-[600px] flex flex-col
              ${!analysisResult ? 'bg-white/5 border-white/10' : 
                analysisResult.status === 'Safe' ? 'bg-emerald-500/10 border-emerald-500/50' :
                analysisResult.status === 'Suspicious' ? 'bg-amber-500/10 border-amber-500/50' :
                'bg-red-500/10 border-red-500/50 shadow-[0_0_80px_rgba(239,68,68,0.15)]'}
           `}>
              {!analysisResult ? (
                 <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 opacity-30">
                    <Microscope size={80} className="animate-pulse" />
                    <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Input Signal</p>
                 </div>
              ) : (
                 <div className="space-y-12 animate-in fade-in duration-1000">
                    <div className="flex items-center justify-between border-b border-white/5 pb-8">
                       <div className="space-y-1">
                          <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Classification</p>
                          <h3 className={`text-4xl font-black uppercase tracking-tighter italic ${analysisResult.status === 'Dangerous' ? 'text-red-500' : analysisResult.status === 'Suspicious' ? 'text-amber-500' : 'text-emerald-500'}`}>
                             {analysisResult.status}
                          </h3>
                       </div>
                       <div className="text-right"><p className="text-5xl font-black font-mono tracking-tighter">{analysisResult.riskLevel}%</p></div>
                    </div>

                    <p className="text-sm font-bold opacity-80 leading-relaxed italic">"{analysisResult.summary}"</p>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-2">
                          <h4 className="text-[9px] font-black uppercase tracking-widest opacity-40">Tech Audit</h4>
                          <p className="text-xl font-black text-blue-400">{analysisResult.technicalAudit.riskScore}%</p>
                       </div>
                       <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-2">
                          <h4 className="text-[9px] font-black uppercase tracking-widest opacity-40">Psych Audit</h4>
                          <p className="text-xl font-black text-purple-400">{analysisResult.psychologicalAudit.riskScore}%</p>
                       </div>
                    </div>

                    <div className="space-y-8">
                       <div className="space-y-4">
                          <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 flex items-center gap-2"><Crosshair size={12}/> Logical Reasoning Path</h4>
                          <div className="space-y-3">
                             {analysisResult.analyticalReasoning.map((r, i) => (
                                <div key={i} className="flex gap-4 p-5 bg-white/5 border border-white/5 rounded-2xl">
                                   <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-[8px] font-mono shrink-0">{i+1}</div>
                                   <p className="text-xs leading-relaxed font-bold opacity-80">{r}</p>
                                </div>
                             ))}
                          </div>
                       </div>
                    </div>
                    
                    <button onClick={() => setShowReportModal(true)} className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 shadow-xl ${analysisResult.status === 'Safe' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-600 text-white shadow-red-600/20'}`}>
                       <ShieldAlert size={14}/> Report Anomalies
                    </button>
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return renderHome();
      case 'awareness': return renderAwareness();
      case 'attacks': return renderAttacks();
      case 'legal': return (
        <div className="space-y-12 animate-in fade-in duration-500 pb-20">
           <h2 className="text-4xl font-black tracking-tighter uppercase italic">Legal <span className="text-purple-500">Archives</span></h2>
           <div className="grid grid-cols-1 gap-8">
             {LEGAL_AWARENESS.map((law, i) => (
               <div key={i} className="bg-white/5 border border-white/10 rounded-[40px] p-10 flex flex-col lg:flex-row gap-12 hover:border-purple-500 transition-all shadow-xl group">
                  <div className="flex-1 space-y-8">
                     <div className="flex items-center gap-4"><div className="p-4 bg-purple-500/10 text-purple-500 rounded-2xl group-hover:bg-purple-500 group-hover:text-white transition-all"><Gavel size={32} /></div><h3 className="text-3xl font-black uppercase tracking-tighter italic">{law.section}</h3></div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3"><h4 className="text-[10px] font-black uppercase tracking-widest opacity-40">Provision</h4><p className="text-sm opacity-80 leading-relaxed font-medium">{law.description}</p></div>
                        <div className="space-y-3"><h4 className="text-[10px] font-black uppercase tracking-widest opacity-40">Penalty</h4><div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-sm text-red-500 font-black italic">{law.punishment}</div></div>
                     </div>
                  </div>
                  <div className="lg:w-96 p-8 bg-black/40 rounded-[32px] border border-white/5 flex flex-col justify-center space-y-6">
                     <div className="space-y-2"><h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 flex items-center gap-2"><Eye size={12}/> Precedent</h4><p className="text-xs italic opacity-60 font-medium">"{law.caseStudy}"</p></div>
                     <button className="w-full py-4 bg-purple-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all">Full Judgement</button>
                  </div>
               </div>
             ))}
           </div>
        </div>
      );
      case 'analyzer': return renderAnalyzer();
      case 'chatbot': return (
        <div className="h-[calc(100vh-160px)] flex flex-col space-y-6 animate-in fade-in duration-500">
           <div className="flex items-center justify-between border-b border-white/10 pb-8"><h2 className="text-3xl font-black uppercase tracking-tighter italic">Sentinel <span className="text-[var(--accent)]">Core</span></h2><div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-widest"><div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Uplink Active</div></div>
           <div className="flex-1 bg-white/5 border border-white/10 rounded-[48px] overflow-hidden flex flex-col shadow-2xl relative">
              <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
                 {chatMessages.map((msg, i) => (<div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}><div className={`max-w-[75%] p-6 rounded-[28px] text-sm leading-relaxed font-medium shadow-xl ${msg.role === 'user' ? 'bg-[var(--accent)] text-white rounded-tr-none' : 'bg-white/10 border border-white/5 text-gray-100 rounded-tl-none backdrop-blur-md'}`}>{msg.text}</div></div>))}
              </div>
              <div className="p-8 border-t border-white/10 bg-black/20 backdrop-blur-xl">
                 <div className="relative flex items-center"><input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleChat()} placeholder="Inquire with Sentinel..." className="w-full bg-white/5 border border-white/10 rounded-[28px] py-6 px-10 pr-20 focus:outline-none focus:border-[var(--accent)] transition-all text-sm font-medium shadow-inner" /><button onClick={handleChat} className="absolute right-3 p-4 bg-[var(--accent)] text-white rounded-[20px] transition-all"><Send size={24} /></button></div>
              </div>
           </div>
        </div>
      );
      case 'resources': return (
        <div className="space-y-12 animate-in slide-in-from-top-4 duration-500 pb-20">
           <h2 className="text-4xl font-black tracking-tighter uppercase italic">Strategic <span className="text-[var(--accent)]">Deployables</span></h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {RESOURCES.map(res => (<div key={res.id} className="group p-10 bg-white/5 border border-white/10 rounded-[48px] hover:border-[var(--accent)] transition-all shadow-2xl relative overflow-hidden"><div className="space-y-8 relative z-10"><div className="p-5 bg-[var(--accent)]/10 text-[var(--accent)] rounded-[24px] w-fit shadow-xl group-hover:bg-[var(--accent)] group-hover:text-white transition-all">{res.type === 'PDF' ? <FileText size={40} /> : <FileQuestion size={40} />}</div><div><h3 className="text-2xl font-black uppercase tracking-tighter mb-1">{res.title}</h3><p className="text-[10px] font-black uppercase tracking-widest opacity-40">{res.type} &bull; {res.size}</p></div><button className="w-full py-5 bg-white/5 group-hover:bg-[var(--accent)] group-hover:text-white rounded-[24px] flex items-center justify-center gap-3 transition-all font-black uppercase tracking-widest text-[10px] border border-white/10"> <Download size={18} /> Download Now </button></div></div>))}
           </div>
        </div>
      );
      default: return renderHome();
    }
  };

  return (
    <ThemeWrapper theme={theme}>
      <Layout theme={theme} setTheme={setTheme} user={user} logout={() => setUser(null)} activeTab={activeTab} setActiveTab={setActiveTab}>{renderContent()}</Layout>
      {showReportModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" onClick={() => setShowReportModal(false)}></div>
          <div className="relative w-full max-w-3xl bg-gray-950 border border-white/10 rounded-[56px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-400">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
            <div className="p-12 lg:p-16 space-y-12">
              <div className="flex justify-between items-start"><div className="space-y-4 text-red-500"><ShieldAlert size={32} /><h2 className="text-4xl font-black uppercase tracking-tighter italic leading-none">Emergency <br/>Protocol</h2></div><button onClick={() => setShowReportModal(false)} className="p-4 hover:bg-white/5 rounded-2xl transition-all border border-white/5 shadow-inner"><X size={24} /></button></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { step: "01", title: "Evidence", desc: "Take high-res screenshots of all interactions.", icon: <Camera size={18}/> },
                  { step: "02", title: "Lockdown", desc: "Change all passwords immediately.", icon: <Lock size={18}/> },
                  { step: "03", title: "Federal", desc: "File at cybercrime.gov.in.", icon: <Globe size={18}/> },
                  { step: "04", title: "Financial", desc: "Dial 1930 for bank fraud.", icon: <Activity size={18}/> }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 p-8 bg-white/5 rounded-[32px] border border-white/5 hover:border-red-500/30 transition-all group"><span className="text-4xl font-black opacity-10 text-red-500 group-hover:opacity-30 transition-all font-mono italic">{item.step}</span><div className="space-y-2"><h4 className="font-black text-xs uppercase tracking-widest text-red-500 flex items-center gap-2">{item.icon} {item.title}</h4><p className="text-[11px] opacity-60 leading-relaxed font-medium">{item.desc}</p></div></div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-6"><a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer" className="flex-1 py-6 bg-red-600 hover:bg-red-500 text-white rounded-[24px] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-4 transition-all">Go to Official Portal <ExternalLink size={18} /></a><button onClick={() => setShowReportModal(false)} className="flex-1 py-6 bg-white/5 text-white rounded-[24px] font-black uppercase tracking-widest text-xs border border-white/10">Cancel Uplink</button></div>
            </div>
          </div>
        </div>
      )}
    </ThemeWrapper>
  );
};

export default App;
