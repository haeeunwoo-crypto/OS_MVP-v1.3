import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, BookOpen, Calendar, BarChart3, 
  Settings, MessageSquare, Bell, ChevronDown, CheckCircle2,
  AlertCircle, AlertTriangle, UserPlus, UploadCloud, Search,
  Filter, MessageCircle, FileText, ChevronRight, MonitorPlay, 
  ShieldAlert, GraduationCap, CheckSquare, ShieldCheck, 
  Activity, Briefcase, Sliders, Database, Zap,
  TrendingUp, TrendingDown, Clock, UserCheck, DollarSign, Star,
  Link as LinkIcon, Plus, Trash2, DownloadCloud, PlayCircle, Video,
  ChevronLeft, FileSpreadsheet, PhoneCall, Shield, UserCog,
  Target, Edit3, Check, X, FileUp, Award, Layers
} from 'lucide-react';

// --- MOCK DATA ---
const currentPrograms = ["KDT 서비스 기획 5기", "KDT 프론트엔드 10기", "KDT 데이터 분석 24기"];

const mockStudents = [
  { id: 1, name: "김커널", email: "kernel.k@email.com", program: "KDT 데이터 분석 24기", status: "안전", riskScore: 15, progress: 92, streak: 14, attendance: "100%", assignments: "8/8", completionPrediction: "안정권", otCompleted: true, riskReasons: ["학습 참여도 최상위 수준"], quizAvg: 95, currentScore: 88, targetScore: 80, lateCount: 0, absenceCount: 0, birthDate: "1995.05.15", phone: "010-1234-5678", address: "서울특별시 강남구 테헤란로 123", hrdCardNum: "1234-5678-9012-3456", paymentHistory: "자비부담금 0원 (전액지원)", major: "컴퓨터공학과", commChannel: true },
  { id: 2, name: "이배포", email: "deploy.l@email.com", program: "KDT 데이터 분석 24기", status: "주의", riskScore: 45, progress: 78, streak: 3, attendance: "85%", assignments: "6/8", completionPrediction: "안정권", otCompleted: true, riskReasons: ["최근 1주일 진도율 하락세", "퀴즈 1회 미제출"], quizAvg: 75, currentScore: 72, targetScore: 80, lateCount: 1, absenceCount: 1, birthDate: "1996.08.22", phone: "010-2345-6789", address: "경기도 성남시 분당구 역삼로 45", hrdCardNum: "2345-6789-0123-4567", paymentHistory: "자비부담금 0원 (전액지원)", major: "경영학과 (비전공)", commChannel: true },
  { id: 3, name: "박서버", email: "server.p@email.com", program: "KDT 데이터 분석 24기", status: "위험", riskScore: 85, progress: 45, streak: 0, attendance: "60%", assignments: "3/8", completionPrediction: "위험", otCompleted: false, riskReasons: ["3일 연속 미출석", "과제 2건 연속 미제출", "진도율 권장 대비 -20%"], quizAvg: 45, currentScore: 50, targetScore: 80, lateCount: 2, absenceCount: 5, birthDate: "1998.11.03", phone: "010-3456-7890", address: "인천광역시 수원시 판교로 67", hrdCardNum: "3456-7890-1234-5678", paymentHistory: "자비부담금 0원 (전액지원)", major: "수학과", commChannel: false },
  { id: 4, name: "최데이터", email: "data.c@email.com", program: "KDT 데이터 분석 24기", status: "안전", riskScore: 5, progress: 98, streak: 21, attendance: "100%", assignments: "8/8", completionPrediction: "안정권", otCompleted: true, riskReasons: ["특이사항 없음 (우수)"], quizAvg: 98, currentScore: 95, targetScore: 80, lateCount: 0, absenceCount: 0, birthDate: "1994.02.19", phone: "010-4567-8901", address: "서울특별시 송파구 정자일로 89", hrdCardNum: "4567-8901-2345-6789", paymentHistory: "자비부담금 0원 (전액지원)", major: "통계학과", commChannel: true },
  { id: 5, name: "정클라우드", email: "cloud.j@email.com", program: "KDT 데이터 분석 24기", status: "주의", riskScore: 55, progress: 65, streak: 1, attendance: "70%", assignments: "5/8", completionPrediction: "위험", otCompleted: true, riskReasons: ["오프라인 결석 2회", "팀 프로젝트 참여 저조 리포트"], quizAvg: 65, currentScore: 60, targetScore: 80, lateCount: 3, absenceCount: 2, birthDate: "1997.07.30", phone: "010-5678-9012", address: "서울특별시 마포구 올림픽로 101", hrdCardNum: "5678-9012-3456-7890", paymentHistory: "자비부담금 0원 (전액지원)", major: "영문학과 (비전공)", commChannel: true },
];

const mockDropouts = [
  { id: 101, name: "최포기", email: "giveup@email.com", program: "KDT 프론트엔드 10기", dropDate: "2023-10-15", reason: "조기 취업", counselingCount: 3 },
  { id: 102, name: "박이탈", email: "run@email.com", program: "KDT 데이터 분석 24기", dropDate: "2023-10-20", reason: "학습 난이도", counselingCount: 5 },
  { id: 103, name: "강제적", email: "out@email.com", program: "KDT 서비스 기획 5기", dropDate: "2023-10-22", reason: "출결 미달(제적)", counselingCount: 2 },
];

const mockQnA = [
  { id: 1, student: "박서버", title: "과제 제출 기한 연장 문의", status: "답변대기", date: "2023-10-27" },
  { id: 2, student: "이배포", title: "VOD 강의 재생 오류", status: "답변완료", date: "2023-10-26" },
  { id: 3, student: "김커널", title: "특강 자료 요청", status: "답변완료", date: "2023-10-25" },
];

// --- HELPER COMPONENTS ---
const Badge = ({ children, type = "default", className = "" }) => {
  const types = {
    default: "bg-gray-100 text-gray-800 border border-gray-200",
    success: "bg-green-50 text-green-700 border border-green-200",
    warning: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    danger: "bg-red-50 text-red-700 border border-red-200",
    primary: "bg-indigo-50 text-indigo-700 border border-indigo-200",
    vod: "bg-blue-50 text-blue-700 border border-blue-200",
    live: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    peer: "bg-purple-50 text-purple-700 border border-purple-200",
    offline: "bg-gray-100 text-gray-700 border border-gray-300",
    skill: "bg-cyan-50 text-cyan-700 border border-cyan-200",
  };
  return (
    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide ${types[type] || types.default} ${className}`}>
      {children}
    </span>
  );
};

const KpiCard = ({ title, value, subtext, icon: Icon, trend }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col hover:border-indigo-300 transition-colors cursor-pointer group">
    <div className="flex justify-between items-start mb-4">
      <div className="text-gray-500 font-medium text-sm group-hover:text-indigo-600 transition-colors">{title}</div>
      <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors"><Icon size={20} /></div>
    </div>
    <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-sm flex items-center gap-1 font-medium">
      {trend === 'up' && <span className="text-green-600 flex items-center"><Activity size={14} className="mr-1"/>상승</span>}
      {trend === 'down' && <span className="text-red-500 flex items-center"><ShieldAlert size={14} className="mr-1"/>하락</span>}
      {trend === 'neutral' && <span className="text-gray-500 flex items-center">-</span>}
      <span className="text-gray-400 font-normal">| {subtext}</span>
    </div>
  </div>
);

const ToggleSwitch = ({ checked, onChange }) => (
  <div 
    onClick={onChange}
    className={`w-10 h-5.5 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${checked ? 'bg-indigo-500' : 'bg-gray-200'}`}
    style={{ height: '22px' }}
  >
    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${checked ? 'translate-x-4' : 'translate-x-0'}`}></div>
  </div>
);

// --- MAIN APPLICATION ---
export default function App() {
  const [activeMenu, setActiveMenu] = useState('admin_setup');
  const [selectedProgram, setSelectedProgram] = useState(currentPrograms[2]);
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState(null);

  const handleNavigateToStudent = (student) => {
    setSelectedStudentForDetail(student);
    setActiveMenu('op_students');
  };

  const menuSections = [
    {
      title: "ADMINISTRATION",
      description: "프로그램 기획 및 데이터 관리",
      menus: [
        { id: 'admin_dashboard', label: '관리자 대시보드', icon: LayoutDashboard },
        { id: 'admin_setup', label: '프로그램 셋업', icon: Settings },
        { id: 'admin_recruitment', label: '모집 & 선발', icon: UserPlus },
        { id: 'admin_instructors', label: '강사/멘토 관리', icon: GraduationCap },
        { id: 'admin_operators', label: '운영자 배정', icon: ShieldCheck },
        { id: 'admin_analytics', label: '성과 분석 리포트', icon: BarChart3 },
      ]
    },
    {
      title: "OPERATION",
      description: "실시간 수강생 및 학습 운영",
      menus: [
        { id: 'op_dashboard', label: '운영자 대시보드', icon: Activity },
        { id: 'op_students', label: '수강생 관리 (CRM)', icon: Users },
        { id: 'op_attendance', label: '출결 & 학습 관리', icon: CheckSquare },
        { id: 'op_qna', label: '운영 상담 & 공지', icon: MessageSquare },
        { id: 'op_instructors', label: '강사/멘토 일정', icon: Calendar },
        { id: 'op_career', label: '취업 관리 지원', icon: Briefcase },
        { id: 'op_settings', label: '운영자 설정', icon: Sliders },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-gray-900">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-20">
        <div className="p-6 flex items-center justify-center border-b border-gray-100 h-16 box-border">
          <div className="flex items-center gap-2">
             <div className="w-7 h-7 bg-[#FF2D55] text-white rounded-bl-xl rounded-tr-xl flex items-center justify-center font-bold text-lg italic" style={{ clipPath: 'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)' }}>K</div>
             <span className="font-bold text-xl tracking-tight text-[#111827]">Kernel<span className="font-normal text-gray-500 ml-1">Academy</span></span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          {menuSections.map((section, idx) => (
            <div key={idx} className="mb-6">
              <div className="px-5 mb-2">
                <h3 className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-0.5">{section.title}</h3>
                <p className="text-[10px] text-gray-400">{section.description}</p>
              </div>
              <ul className="space-y-0.5 px-3">
                {section.menus.map((menu) => {
                  const Icon = menu.icon;
                  const isActive = activeMenu === menu.id;
                  return (
                    <li key={menu.id}>
                      <button
                        onClick={() => {
                          setActiveMenu(menu.id);
                          if (menu.id === 'op_students') setSelectedStudentForDetail(null);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive 
                            ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon size={18} className={isActive ? 'text-indigo-600' : 'text-gray-400'} />
                        {menu.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">M</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">Super Admin</p>
            <p className="text-xs text-gray-500 truncate">통합 마스터 계정</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <select 
                className="appearance-none bg-white border border-gray-200 hover:border-indigo-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 block w-64 p-2 pr-8 font-semibold shadow-sm transition-all cursor-pointer"
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
              >
                {currentPrograms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 group-hover:text-indigo-500 pointer-events-none transition-colors" />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-200 rounded-full shadow-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[11px] font-bold text-green-700 tracking-wider">LMS SYNCED</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"><Zap size={20} /></button>
            <button className="relative p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF2D55] rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 bg-[#F8FAFC]">
          {activeMenu === 'admin_setup' && <AdminProgramSetup />}
          {activeMenu === 'admin_operators' && <AdminOperatorMgmt />}
          {activeMenu === 'op_students' && <OperatorStudentMgmt selectedStudentForDetail={selectedStudentForDetail} setSelectedStudentForDetail={setSelectedStudentForDetail} />}
          {activeMenu === 'op_attendance' && <OperatorAttendanceMgmt onStudentClick={handleNavigateToStudent} />}
          {activeMenu === 'op_qna' && <OperatorQnAMgmt />}
          {activeMenu === 'admin_dashboard' && <AdminDashboard />}
          {activeMenu === 'op_dashboard' && <OperatorDashboard />}

          {['admin_recruitment', 'admin_instructors', 'admin_analytics', 'op_instructors', 'op_career', 'op_settings'].includes(activeMenu) && (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center max-w-lg mx-auto">
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                <Database size={32} className="text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">개발 예정 메뉴</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                해당 기능은 <strong>OS 플랫폼 Phase 2</strong> 업데이트 시 반영될 예정입니다.<br/>
              </p>
              <button className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold shadow-sm hover:bg-gray-50">
                기획 문서 확인하기
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// ============================================================================
// ADMINISTRATION COMPONENTS
// ============================================================================

function AdminOperatorMgmt() {
  const [activeTab, setActiveTab] = useState('mapping');

  // Mock data for Operators
  const operators = [
    { id: 1, name: "김마스터", email: "master@kernel.com", role: "Super Admin", status: "Active" },
    { id: 2, name: "이관리", email: "manager@kernel.com", role: "관리자", status: "Active" },
    { id: 3, name: "박운영", email: "op1@kernel.com", role: "운영자", status: "Active" },
    { id: 4, name: "최지원", email: "op2@kernel.com", role: "운영자", status: "Absent" },
    { id: 5, name: "정강사", email: "inst@kernel.com", role: "강사", status: "Active" },
    { id: 6, name: "한멘토", email: "mentor@kernel.com", role: "강사", status: "Active" },
  ];

  // Mock data for Permissions (Matrix)
  const [permissions, setPermissions] = useState([
    { menu: "관리자 대시보드", super: true, admin: true, op: false, inst: false },
    { menu: "프로그램 셋업 (생성/수정)", super: true, admin: true, op: false, inst: false },
    { menu: "운영자 배정 및 권한 설정", super: true, admin: false, op: false, inst: false },
    { menu: "운영자 대시보드 (KPI)", super: true, admin: true, op: true, inst: false },
    { menu: "수강생 관리 (CRM 조회/수정)", super: true, admin: true, op: true, inst: false },
    { menu: "출결 관리 및 점수 입력", super: true, admin: true, op: true, inst: true },
    { menu: "운영 상담 (QnA 답변)", super: true, admin: true, op: true, inst: true },
  ]);

  const togglePermission = (idx, roleKey) => {
    const newPerms = [...permissions];
    if (roleKey !== 'super') {
      newPerms[idx][roleKey] = !newPerms[idx][roleKey];
      setPermissions(newPerms);
    }
  };

  const getRoleBadge = (role) => {
    switch(role) {
      case 'Super Admin': return <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-[11px] font-black border border-purple-200">SUPER</span>;
      case '관리자': return <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-[11px] font-bold border border-indigo-200">관리자</span>;
      case '운영자': return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-bold border border-blue-200">운영자</span>;
      case '강사': return <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[11px] font-bold border border-emerald-200">강사/멘토</span>;
      default: return null;
    }
  };

  return (
    <div className="h-full flex flex-col max-w-[1400px] mx-auto animate-[fadeIn_0.3s_ease-in-out]">
      <div className="flex justify-between items-end mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge type="primary">ADMIN</Badge>
            <h1 className="text-2xl font-bold text-gray-900">운영자 배정 및 권한</h1>
          </div>
          <p className="text-gray-500 text-sm">코호트별 운영진을 매핑하고 직책(Role)에 따른 플랫폼 접근 권한을 제어합니다.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 flex items-center gap-2 shadow-sm text-gray-700">
            <UserPlus size={16} /> 신규 운영자 등록
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-100 px-6 flex gap-8 bg-gray-50/50">
          <button
            onClick={() => setActiveTab('mapping')}
            className={`py-4 text-sm font-bold border-b-2 transition-colors relative ${activeTab === 'mapping' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            코호트 배정 및 운영자 목록
          </button>
          <button
            onClick={() => setActiveTab('permissions')}
            className={`py-4 text-sm font-bold border-b-2 transition-colors relative ${activeTab === 'permissions' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            역할별 권한 설정
          </button>
        </div>

        {/* Tab 1: Cohort Mapping & Operator List */}
        {activeTab === 'mapping' && (
          <div className="flex-1 overflow-auto custom-scrollbar p-6 bg-[#F8FAFC]">
            <div className="mb-8">
              <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2"><UserCog size={18} className="text-indigo-600"/> 운영 중인 코호트 배정</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {[
                  { name: "KDT 데이터 분석 24기", main: "박운영", backup: "최지원" },
                  { name: "KDT 프론트엔드 10기", main: "최지원", backup: "박운영", hasWarning: true },
                  { name: "KDT 서비스 기획 5기", main: "이관리", backup: "-" },
                ].map((cohort, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col hover:border-indigo-300 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-bold text-gray-800">{cohort.name}</span>
                      {cohort.hasWarning && <Badge type="warning" className="animate-pulse">백업 부재중</Badge>}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block">메인 담당 운영자</label>
                        <select className="w-full bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-100 font-medium cursor-pointer" defaultValue={cohort.main}>
                          <option value="-">미지정</option>
                          {operators.filter(o => o.role !== '강사').map(o => <option key={o.id} value={o.name}>{o.name} ({o.role})</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block">부재 시 백업 (대체자)</label>
                        <select className={`w-full text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-100 font-medium cursor-pointer ${cohort.hasWarning ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-gray-50 border border-gray-200'}`} defaultValue={cohort.backup}>
                          <option value="-">미지정</option>
                          {operators.filter(o => o.role !== '강사').map(o => <option key={o.id} value={o.name}>{o.name} {o.status === 'Absent' ? '(부재중)' : ''}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-bold text-gray-800">전체 운영자 목록</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="이름 검색" className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-100 outline-none w-48 shadow-sm" />
                </div>
              </div>
              <table className="w-full text-left border-collapse">
                <thead className="bg-white text-gray-500 text-xs uppercase font-bold border-b border-gray-200">
                  <tr>
                    <th className="p-4 pl-6">운영진 정보</th>
                    <th className="p-4">역할 (Role)</th>
                    <th className="p-4">상태</th>
                    <th className="p-4">계정 권한 관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {operators.filter(op => op.role !== '강사').map(op => (
                    <tr key={op.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full font-black flex items-center justify-center text-xs shadow-sm ${op.status === 'Absent' ? 'bg-gray-200 text-gray-500' : 'bg-indigo-100 text-indigo-700'}`}>
                            {op.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{op.name}</div>
                            <div className="text-[10px] text-gray-500">{op.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{getRoleBadge(op.role)}</td>
                      <td className="p-4">
                        {op.status === 'Active' ? 
                          <span className="flex items-center gap-1.5 text-xs font-bold text-green-600"><span className="w-2 h-2 rounded-full bg-green-500"></span> 활동중</span> : 
                          <span className="flex items-center gap-1.5 text-xs font-bold text-red-500"><span className="w-2 h-2 rounded-full bg-red-500"></span> 부재중 (휴가 등)</span>
                        }
                      </td>
                      <td className="p-4">
                        <button className="text-xs font-bold text-gray-500 hover:text-indigo-600 border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50 transition-colors">
                          정보 수정
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Permissions Matrix */}
        {activeTab === 'permissions' && (
          <div className="flex-1 flex flex-col bg-[#F8FAFC] p-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-indigo-50/30 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-900 flex items-center gap-2"><Shield size={18} className="text-indigo-600"/> 플랫폼 메뉴 접근 권한 제어</h3>
                  <p className="text-xs text-gray-500 mt-1">Super Admin은 모든 권한을 가지며 수정할 수 없습니다. 변경 사항은 즉시 반영됩니다.</p>
                </div>
                <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-700 transition-colors">
                  권한 설정 저장
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead className="bg-gray-50/80 border-b border-gray-200">
                    <tr>
                      <th className="p-4 pl-6 text-sm font-bold text-gray-700 w-1/3">메뉴 및 기능</th>
                      <th className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {getRoleBadge('Super Admin')}
                          <span className="text-[10px] text-gray-400 font-medium">모든 권한</span>
                        </div>
                      </th>
                      <th className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {getRoleBadge('관리자')}
                          <span className="text-[10px] text-gray-400 font-medium">프로그램 기획/총괄</span>
                        </div>
                      </th>
                      <th className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {getRoleBadge('운영자')}
                          <span className="text-[10px] text-gray-400 font-medium">실무 매니저</span>
                        </div>
                      </th>
                      <th className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {getRoleBadge('강사')}
                          <span className="text-[10px] text-gray-400 font-medium">학습 채점/피드백</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {permissions.map((perm, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 pl-6 font-bold text-gray-800 text-sm">{perm.menu}</td>
                        <td className="p-4">
                          <div className="flex justify-center opacity-50 cursor-not-allowed" title="Super Admin은 수정 불가">
                            <ToggleSwitch checked={perm.super} onChange={() => {}} />
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center">
                            <ToggleSwitch checked={perm.admin} onChange={() => togglePermission(idx, 'admin')} />
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center">
                            <ToggleSwitch checked={perm.op} onChange={() => togglePermission(idx, 'op')} />
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center">
                            <ToggleSwitch checked={perm.inst} onChange={() => togglePermission(idx, 'inst')} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminProgramSetup() {
  const [step, setStep] = useState(3); // Demo defaults to step 3 to show the requested full calendar
  const steps = ["기본 정보", "커리큘럼 설정", "시간표 설정", "수료 기준", "과제/퀴즈/진단 등록", "게이미피케이션"];

  const StepHeader = ({ title, badgeText }) => (
    <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
       <div className="flex items-center gap-3">
         <h2 className="text-lg font-bold text-gray-900">{title}</h2>
         <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded font-bold border border-indigo-100">{badgeText}</span>
       </div>
       <div className="flex gap-2">
         <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-50 flex items-center gap-1.5 shadow-sm transition-colors">
           <FileSpreadsheet size={14} className="text-green-600" /> 엑셀 Import
         </button>
         <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-50 flex items-center gap-1.5 shadow-sm transition-colors">
           <DownloadCloud size={14} className="text-gray-500" /> 엑셀 Export
         </button>
       </div>
    </div>
  );

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 animate-[fadeIn_0.3s_ease-in-out]">
      <div className="flex justify-between items-end bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge type="primary">ADMIN</Badge>
            <h1 className="text-2xl font-bold text-gray-900">프로그램 셋업</h1>
          </div>
          <p className="text-gray-500 text-sm">LMS에 반영될 모든 콘텐츠의 원본 데이터를 설정하고 일괄 배포합니다.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 text-gray-700 shadow-sm">임시 저장</button>
          <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 shadow-sm flex items-center gap-2">
            <Zap size={16} /> 설정 완료 및 LMS 반영
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative flex justify-between">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-100 z-0 rounded-full"></div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-indigo-500 z-0 transition-all duration-300 ease-in-out rounded-full" style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}></div>
          
          {steps.map((s, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center gap-3 cursor-pointer group" onClick={() => setStep(i + 1)}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 transition-all duration-200 ${
                step > i + 1 ? 'bg-indigo-600 border-indigo-100 text-white shadow-md' : 
                step === i + 1 ? 'bg-white border-indigo-500 text-indigo-600 shadow-md scale-110' : 'bg-white border-gray-100 text-gray-400 group-hover:border-gray-200'
              }`}>
                {step > i + 1 ? <CheckCircle2 size={18} /> : i + 1}
              </div>
              <span className={`text-[13px] font-bold ${step === i + 1 ? 'text-indigo-700' : 'text-gray-500'}`}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 min-h-[500px] flex flex-col">
        {step === 1 && (
          <div className="space-y-6 flex-1 animate-[fadeIn_0.3s_ease-in-out]">
            <StepHeader title="Step 1. 기본 정보 설정 (입과 요청 시트 기준)" badgeText="HRD-Net / LMS 기본 연동" />

            {/* 기본 정보 필드 */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">홍보 과정명 기수 <span className="text-red-500">*</span></label>
                <input type="text" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="KDT 데이터 분석 부트캠프 24기"/>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">사업 약자</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="KDT DA"/>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">HRD-Net 과정명 회차</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="빅데이터 분석 실무자 양성과정 5회차"/>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">훈련과정 ID (HRD 연동용)</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="G20200041773"/>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">수강 시작일</label>
                <input type="date" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="2024-10-27" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">수강 종료일</label>
                <input type="date" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="2025-04-15" />
              </div>
            </div>

            {/* 입과 요청 사항 필수강의 (커스터마이징) */}
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-4 h-4 rounded border-2 border-indigo-400 flex items-center justify-center">
                  <div className="w-2 h-2 bg-indigo-400 rounded-sm"></div>
                </div>
                <h3 className="text-sm font-bold text-indigo-700">입과 요청 사항 필수강의(커스터마이징)</h3>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <div className="grid grid-cols-4 gap-0 border-b border-gray-100 bg-gray-50 px-4 py-2">
                  <span className="text-xs font-bold text-gray-500">수강 기간</span>
                  <span className="text-xs font-bold text-gray-500">강의 유형</span>
                  <span className="text-xs font-bold text-gray-500">입과 요청 강의명</span>
                  <span className="text-xs font-bold text-gray-500">원코스 ID</span>
                </div>
                <div className="grid grid-cols-4 gap-0 px-4 py-3 items-center">
                  <div className="pr-4">
                    <input type="text" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="25.4.1 ~ 25.11.8"/>
                  </div>
                  <div className="pr-4">
                    <select className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 bg-white cursor-pointer">
                      <option>필수</option>
                      <option>선택</option>
                      <option>권장</option>
                    </select>
                  </div>
                  <div className="pr-4">
                    <input type="text" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="데이터 분석 부트캠프"/>
                  </div>
                  <div>
                    <input type="text" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="C21001"/>
                  </div>
                </div>
              </div>
            </div>

            {/* 입과 요청 사항 권장 / 리워드 강의 (비커스터마이징) */}
            <div className="mt-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-4 h-4 rounded-full border-2 border-orange-400 flex items-center justify-center">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                </div>
                <h3 className="text-sm font-bold text-orange-700">입과 요청 사항 권장 / 리워드 강의(비커스터마이징)</h3>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <div className="grid grid-cols-3 gap-0 border-b border-gray-100 bg-gray-50 px-4 py-2">
                  <span className="text-xs font-bold text-gray-500">수강 기간</span>
                  <span className="text-xs font-bold text-gray-500">강의 유형</span>
                  <span className="text-xs font-bold text-gray-500">원코스 강의</span>
                </div>
                <div className="grid grid-cols-3 gap-0 px-4 py-3 items-center">
                  <div className="pr-4">
                    <input type="text" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="25.4.1 ~ 25.11.8"/>
                  </div>
                  <div className="pr-4">
                    <select className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 bg-white cursor-pointer">
                      <option>권장</option>
                      <option>필수</option>
                      <option>리워드</option>
                    </select>
                  </div>
                  <div>
                    <input type="text" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="파이썬 기초 완강"/>
                  </div>
                </div>
              </div>
            </div>

            {/* 수강생 명단 */}
            <div className="mt-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                </div>
                <h3 className="text-sm font-bold text-gray-700">수강생 명단</h3>
              </div>
              <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-4 flex items-center gap-3">
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 flex items-center gap-2 shadow-sm transition-colors">
                  <UploadCloud size={16} className="text-indigo-500"/> 엑셀 파일 업로드
                </button>
                <span className="text-sm text-gray-400">(추후 등록 가능)</span>
              </div>
            </div>

            {/* 이전/다음 단계 버튼 */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-6">
              <button className="px-5 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors">이전 단계</button>
              <button onClick={() => setStep(2)} className="px-6 py-2.5 bg-[#111827] text-white rounded-lg text-sm font-bold shadow-sm hover:bg-gray-800 flex items-center gap-2 transition-colors">
                다음 단계 <ChevronRight size={16}/>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 flex-1 animate-[fadeIn_0.3s_ease-in-out]">
            <StepHeader title="Step 2. 커리큘럼 설정 (강의 리스트 연동)" badgeText="Skillflo 백오피스 연동" />
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
               <label className="block text-sm font-bold text-gray-700 mb-2">패스트캠퍼스 강의 패키지 검색 (Skillflo)</label>
               <div className="flex gap-2">
                 <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" placeholder="코스명 또는 코스 ID(예: 212190) 입력" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 shadow-sm" defaultValue="데이터 분석 부트캠프 24기"/>
                 </div>
                 <button className="px-6 py-3 bg-[#111827] text-white rounded-lg text-sm font-bold shadow-sm hover:bg-gray-800 flex items-center gap-2">
                   <DownloadCloud size={16}/> 목록 불러오기
                 </button>
               </div>
            </div>

            <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
               <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100 flex justify-between items-center">
                 <div>
                   <h3 className="font-bold text-indigo-900">데이터 분석 초격차 패키지 Online (24기 연동됨)</h3>
                   <p className="text-xs text-indigo-700 mt-1">이 리스트가 LMS의 '전체 강의 리스트' 목차로 수강생에게 노출됩니다. (VOD 강의 전용)</p>
                 </div>
                 <Badge type="success">연동 완료</Badge>
               </div>
               
               <div className="p-6 space-y-6 max-h-[400px] overflow-y-auto custom-scrollbar">
                 <div>
                   <h4 className="text-sm font-bold text-[#FF2D55] mb-3 pb-2 border-b border-gray-100">Step 4. Python Programming</h4>
                   <div className="space-y-2">
                     {[
                       { type: "vod", title: "Ch01-01. 파이썬 과정 소개", detail: "11.20 예정", highlight: false },
                       { type: "vod", title: "Ch01-02. 파이썬 소개 및 설치", detail: "11.20 예정", highlight: false },
                       { type: "vod", title: "Ch02-06. 자료형 리스트", detail: "12.03 예정", highlight: true },
                       { type: "vod", title: "Ch03. 파이썬 데이터 분석 프로젝트", detail: "12.08 예정", highlight: true },
                     ].map((item, i) => (
                       <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors group">
                         <div className="flex items-center gap-3">
                           <Badge type={item.type}>{item.type.toUpperCase()}</Badge>
                           <span className={`text-sm font-bold ${item.highlight ? 'text-gray-900' : 'text-gray-600'}`}>{item.title}</span>
                         </div>
                         <span className="text-xs font-semibold text-gray-500">{item.detail}</span>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 flex-1 animate-[fadeIn_0.3s_ease-in-out]">
            <StepHeader title="Step 3. 주간/월간 시간표 캘린더 세팅" badgeText="학생용 LMS 시간표 UI 매핑" />
            
            <div className="flex justify-between items-center mb-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
               <div className="flex items-center gap-6">
                 <div className="flex items-center bg-white border border-gray-300 rounded px-2 py-1.5 shadow-sm">
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><ChevronLeft size={16}/></button>
                    <span className="font-bold text-sm text-gray-800 px-3">Week 6 (12.1 ~ 12.5)</span>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><ChevronRight size={16}/></button>
                 </div>
                 
                 <div className="flex items-center gap-4 border-l border-gray-200 pl-6">
                    <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full border-[2px] border-blue-400"></span> 온라인(VOD)</span>
                    <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full border-[2px] border-emerald-400"></span> 실시간(Live)</span>
                    <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full border-[2px] border-gray-400 bg-gray-400"></span> 오프라인</span>
                    <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full border-[2px] border-purple-400"></span> 피어세션</span>
                    <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full border-[2px] border-red-400"></span> 과제/제출</span>
                 </div>
               </div>
               <div className="flex gap-2">
                 <button className="px-4 py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-indigo-100 transition-colors">
                   <UploadCloud size={16}/> 시간표 일괄 업로드 (CSV)
                 </button>
                 <button className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-gray-50 transition-colors">
                   <DownloadCloud size={16}/> 시간표 양식 다운로드
                 </button>
               </div>
            </div>

            {/* FULL CALENDAR GRID RESTORED */}
            <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm flex flex-col min-w-[900px]">
               {/* Headers */}
               <div className="flex border-b border-gray-200 bg-white">
                  <div className="w-[80px] border-r border-gray-200 p-3 text-center text-[11px] font-bold text-gray-400 flex items-center justify-center">WEEK 6</div>
                  <div className="flex-1 border-r border-gray-200 p-3 text-center text-sm font-bold text-gray-800">월 <span className="text-gray-400 font-medium ml-1">12.1</span></div>
                  <div className="flex-1 border-r border-gray-200 bg-red-50/20 p-3 text-center text-sm font-bold text-red-500 flex items-center justify-center gap-1">
                     화 <span className="font-medium text-red-300">12.2</span> <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block mb-0.5"></span>
                  </div>
                  <div className="flex-1 border-r border-gray-200 p-3 text-center text-sm font-bold text-gray-800">수 <span className="text-gray-400 font-medium ml-1">12.3</span></div>
                  <div className="flex-1 border-r border-gray-200 p-3 text-center text-sm font-bold text-gray-800">목 <span className="text-gray-400 font-medium ml-1">12.4</span></div>
                  <div className="flex-1 p-3 text-center text-sm font-bold text-gray-800">금 <span className="text-gray-400 font-medium ml-1">12.5</span></div>
               </div>
               
               {/* Row 1: 09:00 - 12:00 */}
               <div className="flex border-b border-gray-200 min-h-[110px]">
                  <div className="w-[80px] border-r border-gray-200 p-2 text-center text-[10px] font-bold text-gray-600 flex flex-col justify-center gap-1"><span>09:00</span><span>12:00</span></div>
                  <div className="flex-1 border-r border-gray-200 p-3 flex items-center justify-center"><input type="text" className="text-[11px] text-gray-300 font-bold bg-transparent outline-none w-full text-center" defaultValue="SQL 실무 적용 실습" /></div>
                  <div className="flex-1 border-r border-gray-200 p-3 flex items-center justify-center"><input type="text" className="text-[11px] text-gray-300 font-bold bg-transparent outline-none w-full text-center" defaultValue="SQL 실무 적용 실습" /></div>
                  
                  <div className="flex-1 border-r border-gray-200 p-2">
                    <div className="h-full border border-emerald-300 rounded p-2.5 flex flex-col bg-emerald-50/30 hover:border-emerald-400 transition-colors">
                      <Badge type="live" className="w-max mb-1.5 !px-1.5 !py-0.5 !text-[10px] !bg-emerald-100">LIVE</Badge>
                      <textarea className="text-[11px] font-bold text-gray-800 leading-snug bg-transparent border-none p-0 outline-none resize-none w-full flex-1" defaultValue="데이터 분석가가 되기 위한 준비 SQL 코딩테스트"></textarea>
                      <div className="mt-1 flex items-center justify-between text-[10px] text-gray-500 border-t border-emerald-200/50 pt-1.5">
                        <input type="text" className="bg-transparent border-none outline-none w-full" defaultValue="프로젝트 OT (이지훈)" />
                        <LinkIcon size={12} className="text-indigo-400 flex-shrink-0"/>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 border-r border-gray-200 p-2">
                     <div className="h-full border border-gray-300 rounded p-2.5 flex flex-col bg-white hover:border-gray-400 transition-colors">
                      <Badge type="offline" className="w-max mb-1.5 !px-1.5 !py-0.5 !text-[10px]">오프라인</Badge>
                      <textarea className="text-[11px] font-bold text-gray-800 leading-snug bg-transparent border-none p-0 outline-none resize-none w-full flex-1" defaultValue="데이터 분석가가 되기 위한 준비 SQL 코딩테스트"></textarea>
                      <div className="mt-1 flex items-center justify-between text-[10px] text-gray-500 border-t border-gray-100 pt-1.5">
                        <input type="text" className="bg-transparent border-none outline-none w-full" defaultValue="강남 3호점 201호" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-2">
                     <div className="h-full border border-purple-200 rounded p-2.5 flex flex-col bg-purple-50/10 hover:border-purple-300 transition-colors">
                      <Badge type="peer" className="w-max mb-1.5 !px-1.5 !py-0.5 !text-[10px] !bg-white">PEER</Badge>
                      <textarea className="text-[11px] font-bold text-gray-800 leading-snug bg-transparent border-none p-0 outline-none resize-none w-full flex-1" defaultValue="프로젝트를 통한 SQL 실력 완성하기"></textarea>
                      <div className="mt-1 flex items-center justify-between text-[10px] text-gray-500 border-t border-purple-100 pt-1.5">
                        <input type="text" className="bg-transparent border-none outline-none w-full" defaultValue="게더타운 그룹 룸" />
                        <LinkIcon size={12} className="text-purple-400 flex-shrink-0"/>
                      </div>
                    </div>
                  </div>
               </div>

               {/* Row 2: 점심 */}
               <div className="flex border-b border-gray-200 h-[36px] bg-gray-50/50">
                  <div className="w-[80px] border-r border-gray-200 p-1 text-center text-[10px] font-bold text-gray-600 flex flex-col justify-center"><span>12:00</span><span>13:00</span></div>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`flex-1 flex justify-center items-center text-[11px] text-gray-300 font-bold ${i < 4 ? 'border-r border-gray-200' : ''}`}>점심</div>
                  ))}
               </div>

               {/* Row 3: 13:00 - 18:00 */}
               <div className="flex border-b border-gray-200 min-h-[140px]">
                  <div className="w-[80px] border-r border-gray-200 p-2 text-center text-[10px] font-bold text-gray-600 flex flex-col justify-center gap-1"><span>13:00</span><span>18:00</span></div>
                  
                  <div className="flex-1 border-r border-gray-200 p-3 flex items-center justify-center"><input type="text" className="text-[11px] text-gray-300 font-bold bg-transparent outline-none w-full text-center" defaultValue="SQL 실무 적용 실습" /></div>
                  
                  <div className="flex-1 border-r border-gray-200 p-2 relative">
                    <div className="h-full border-2 border-emerald-500 rounded p-2.5 flex flex-col bg-white shadow-sm relative hover:border-emerald-600 transition-colors">
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      <Badge type="vod" className="w-max mb-1.5 !px-1.5 !py-0.5 !text-[10px] !bg-blue-100">VOD</Badge>
                      <textarea className="text-[11px] font-bold text-blue-800 leading-snug bg-transparent border-none p-0 outline-none resize-none w-full flex-1" defaultValue="SQL 실무 적용 실습"></textarea>
                      <div className="mt-1 flex items-center gap-1 border-t border-gray-100 pt-1.5 text-gray-400">
                        <LinkIcon size={10}/>
                        <input type="text" className="bg-transparent border-none outline-none text-[9px] w-full" defaultValue="lms.fastcampus.co.kr/c/.." />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 border-r border-gray-200 p-2">
                    <div className="h-full border border-emerald-300 rounded p-2.5 flex flex-col bg-emerald-50/30 hover:border-emerald-400 transition-colors">
                      <Badge type="live" className="w-max mb-1.5 !px-1.5 !py-0.5 !text-[10px] !bg-emerald-100">LIVE</Badge>
                      <textarea className="text-[11px] font-bold text-gray-800 leading-snug bg-transparent border-none p-0 outline-none resize-none w-full flex-1" defaultValue="데이터 분석가가 되기 위한 준비 SQL 코딩테스트"></textarea>
                      <div className="mt-1 flex items-center gap-1 border-t border-emerald-200/50 pt-1.5 text-gray-400">
                        <LinkIcon size={10} className="text-emerald-600"/>
                        <input type="text" className="bg-transparent border-none outline-none text-[9px] w-full text-emerald-700" defaultValue="zoom.us/j/123456789" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 border-r border-gray-200 p-2">
                     <div className="h-full border border-emerald-300 rounded p-2.5 flex flex-col bg-emerald-50/30 hover:border-emerald-400 transition-colors">
                      <Badge type="live" className="w-max mb-1.5 !px-1.5 !py-0.5 !text-[10px] !bg-emerald-100">LIVE</Badge>
                      <textarea className="text-[11px] font-bold text-gray-800 leading-snug bg-transparent border-none p-0 outline-none resize-none w-full flex-1" defaultValue="데이터 분석가가 되기 위한 준비 SQL 코딩테스트"></textarea>
                      <div className="mt-1 flex items-center gap-1 border-t border-emerald-200/50 pt-1.5 text-gray-400">
                        <LinkIcon size={10} className="text-emerald-600"/>
                        <input type="text" className="bg-transparent border-none outline-none text-[9px] w-full text-emerald-700" defaultValue="zoom.us/j/123456789" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-2">
                     <div className="h-full border border-purple-200 rounded p-2.5 flex flex-col bg-purple-50/10 hover:border-purple-300 transition-colors">
                      <Badge type="peer" className="w-max mb-1.5 !px-1.5 !py-0.5 !text-[10px] !bg-white">PEER</Badge>
                      <textarea className="text-[11px] font-bold text-gray-800 leading-snug bg-transparent border-none p-0 outline-none resize-none w-full flex-1" defaultValue="프로젝트를 통한 SQL 실력 완성하기"></textarea>
                      <div className="mt-1 flex items-center justify-between text-[10px] text-gray-500 border-t border-purple-100 pt-1.5">
                        <input type="text" className="bg-transparent border-none outline-none w-full" defaultValue="프로젝트 멘토링 (이지훈)" />
                        <LinkIcon size={12} className="text-purple-400 flex-shrink-0"/>
                      </div>
                    </div>
                  </div>
               </div>

               {/* Row 4: 저녁 */}
               <div className="flex border-b border-gray-200 h-[36px] bg-gray-50/50">
                  <div className="w-[80px] border-r border-gray-200 p-1 text-center text-[10px] font-bold text-gray-600 flex flex-col justify-center"><span>18:00</span><span>19:00</span></div>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`flex-1 flex justify-center items-center text-[11px] text-gray-300 font-bold ${i < 4 ? 'border-r border-gray-200' : ''}`}>저녁</div>
                  ))}
               </div>

               {/* Row 5: 19:00 - 21:00 */}
               <div className="flex border-b border-gray-200 min-h-[90px]">
                  <div className="w-[80px] border-r border-gray-200 p-2 text-center text-[10px] font-bold text-gray-600 flex flex-col justify-center gap-1"><span>19:00</span><span>21:00</span></div>
                  
                  <div className="flex-1 border-r border-gray-200 p-3 flex items-center justify-center"><input type="text" className="text-[11px] text-gray-300 font-bold bg-transparent outline-none w-full text-center" defaultValue="SQL 실무 적용 실습" /></div>
                  
                  <div className="flex-1 border-r border-gray-200 p-2">
                    <div className="h-full border border-blue-200 rounded p-2.5 flex flex-col bg-blue-50/10 hover:border-blue-300 transition-colors">
                      <Badge type="vod" className="w-max mb-1.5 !px-1.5 !py-0.5 !text-[10px] !bg-blue-100">VOD</Badge>
                      <textarea className="text-[11px] font-bold text-blue-800 leading-snug bg-transparent border-none p-0 outline-none resize-none w-full flex-1" defaultValue="SQL 실무 적용 실습"></textarea>
                      <div className="mt-1 flex items-center gap-1 border-t border-blue-200/50 pt-1.5 text-gray-400">
                        <LinkIcon size={10}/>
                        <input type="text" className="bg-transparent border-none outline-none text-[9px] w-full text-blue-700" defaultValue="lms.fastcampus.co.kr/c/.." />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 border-r border-gray-200 p-2">
                    <div className="h-full border border-blue-200 rounded p-2.5 flex flex-col bg-blue-50/10 hover:border-blue-300 transition-colors">
                      <Badge type="vod" className="w-max mb-1.5 !px-1.5 !py-0.5 !text-[10px] !bg-blue-100">VOD</Badge>
                      <textarea className="text-[11px] font-bold text-blue-800 leading-snug bg-transparent border-none p-0 outline-none resize-none w-full flex-1" defaultValue="SQL 실무 적용 실습"></textarea>
                      <div className="mt-1 flex items-center gap-1 border-t border-blue-200/50 pt-1.5 text-gray-400">
                        <LinkIcon size={10}/>
                        <input type="text" className="bg-transparent border-none outline-none text-[9px] w-full text-blue-700" defaultValue="lms.fastcampus.co.kr/c/.." />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 border-r border-gray-200 p-2">
                     <div className="h-full border border-blue-200 rounded p-2.5 flex flex-col bg-blue-50/10 hover:border-blue-300 transition-colors">
                      <Badge type="vod" className="w-max mb-1.5 !px-1.5 !py-0.5 !text-[10px] !bg-blue-100">VOD</Badge>
                      <textarea className="text-[11px] font-bold text-blue-800 leading-snug bg-transparent border-none p-0 outline-none resize-none w-full flex-1" defaultValue="SQL 실무 적용 실습"></textarea>
                      <div className="mt-1 flex items-center gap-1 border-t border-blue-200/50 pt-1.5 text-gray-400">
                        <LinkIcon size={10}/>
                        <input type="text" className="bg-transparent border-none outline-none text-[9px] w-full text-blue-700" defaultValue="lms.fastcampus.co.kr/c/.." />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-2">
                     <div className="h-full border border-purple-200 rounded p-2.5 flex flex-col bg-purple-50/10 hover:border-purple-300 transition-colors">
                      <Badge type="peer" className="w-max mb-1.5 !px-1.5 !py-0.5 !text-[10px] !bg-white">PEER</Badge>
                      <textarea className="text-[11px] font-bold text-gray-800 leading-snug bg-transparent border-none p-0 outline-none resize-none w-full flex-1" defaultValue="프로젝트를 통한 SQL 실력 완성하기"></textarea>
                      <div className="mt-1 flex items-center justify-between text-[10px] text-gray-500 border-t border-purple-100 pt-1.5">
                        <input type="text" className="bg-transparent border-none outline-none w-full" defaultValue="게더타운 그룹 룸" />
                        <LinkIcon size={12} className="text-purple-400 flex-shrink-0"/>
                      </div>
                    </div>
                  </div>
               </div>

               {/* Row 6: 과제 */}
               <div className="flex border-gray-200 min-h-[46px] bg-red-50/5">
                  <div className="w-[80px] border-r border-gray-200 p-2 flex items-center justify-center text-[11px] font-bold text-red-500">과제</div>
                  
                  <div className="flex-1 border-r border-gray-200 p-2 flex items-center relative">
                    <span className="text-[11px] font-bold text-gray-300 pl-2">3-4. SQL Quiz 4</span>
                    <CheckCircle2 size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300"/>
                  </div>
                  
                  <div className="flex-1 border-r border-gray-200 p-1.5 flex items-center">
                    <div className="w-full h-full border border-red-200 rounded text-[11px] text-gray-500 bg-red-50/50 flex items-center px-3 font-medium">3-5. SQL Quiz 5</div>
                  </div>
                  
                  <div className="flex-1 border-r border-gray-200 p-1.5 flex items-center">
                    <div className="w-full h-full border border-red-200 rounded text-[11px] text-gray-500 bg-red-50/50 flex items-center px-3 font-medium">3-6. SQL Quiz 6</div>
                  </div>
                  
                  <div className="flex-1 border-r border-gray-200 p-1.5 flex items-center">
                    <div className="w-full h-full border border-red-200 rounded text-[11px] text-gray-500 bg-red-50/50 flex items-center px-3 font-medium">3-7. SQL Quiz 7</div>
                  </div>
                  
                  <div className="flex-1 p-2"></div>
               </div>
            </div>

            {/* Editing Panel for Selected Date */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mt-4 flex gap-6 items-start shadow-sm">
               <div className="w-48">
                 <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2"><Calendar size={16} className="text-indigo-600"/> 선택된 일자</h4>
                 <p className="text-2xl font-black text-indigo-700">12월 2일 (화)</p>
                 <p className="text-xs text-gray-500 mt-2">일정을 추가하거나 수정하면 LMS 시간표 카드에 즉시 반영됩니다.</p>
               </div>
               <div className="flex-1 space-y-3">
                 <div className="flex flex-col gap-2 bg-white p-3 rounded-lg border border-gray-200 shadow-sm relative">
                   <div className="flex items-center gap-3">
                     <select className="text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded px-2 py-1 outline-none cursor-pointer">
                        <option value="vod">VOD</option>
                        <option value="live">LIVE</option>
                     </select>
                     <input type="text" className="font-bold text-sm text-gray-900 border-none bg-transparent outline-none flex-1" defaultValue="SQL 실무 적용 실습 (13:00 ~ 18:00)" />
                     <div className="flex items-center gap-2 w-64 bg-gray-50 px-2 py-1.5 rounded border border-gray-200">
                       <LinkIcon size={14} className="text-gray-400"/>
                       <input type="text" className="text-xs bg-transparent border-none outline-none flex-1" defaultValue="https://lms.fastcampus.co.kr/c/123" placeholder="수강 링크 URL 삽입"/>
                     </div>
                     <button className="text-gray-400 hover:text-red-500 ml-2"><Trash2 size={16}/></button>
                   </div>
                   
                   <div className="mt-2 bg-gray-50 rounded border border-gray-100 p-3">
                     <label className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 mb-2">
                       <FileText size={14}/> 학습 목표 및 상세 내용
                     </label>
                     <textarea 
                       className="w-full text-sm text-gray-700 bg-transparent border-none outline-none resize-none" 
                       rows="2" 
                       defaultValue="집계 함수와 그룹화(GROUP BY)를 활용하여 비즈니스 요약 통계 지표를 뽑아내는 실습을 진행합니다."
                       placeholder="LMS 모달에 노출될 상세 내용을 입력하세요."
                     ></textarea>
                   </div>
                 </div>
                 <button className="w-full py-2.5 bg-white border border-dashed border-gray-300 text-gray-500 font-bold text-sm rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors flex justify-center items-center gap-1.5 shadow-sm">
                   <Plus size={16}/> 새 일정 추가
                 </button>
               </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 flex-1 animate-[fadeIn_0.3s_ease-in-out]">
            <StepHeader title="Step 4. 과정 수료 기준 세팅" badgeText="LMS 포트폴리오 성적표 연동" />
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
                <span className="font-bold text-gray-700">기본 수료 기준 (총점)</span>
                <div className="flex items-center gap-2">
                  <input type="number" defaultValue="70" className="w-16 p-1.5 border border-gray-300 rounded text-center font-bold"/> <span className="text-sm font-medium">점 이상</span>
                </div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 flex items-center justify-between">
                <span className="font-bold text-indigo-900">우수 수료 기준 (총점)</span>
                <div className="flex items-center gap-2">
                  <input type="number" defaultValue="80" className="w-16 p-1.5 border border-indigo-300 rounded text-center font-bold text-indigo-700"/> <span className="text-sm font-medium text-indigo-700">점 이상인 상위 5인</span>
                </div>
              </div>
            </div>

            <table className="w-full text-sm border-collapse border border-gray-200">
              <thead className="bg-gray-100 font-bold text-gray-700">
                <tr>
                  <th className="border border-gray-200 p-2 w-1/5">항목</th>
                  <th className="border border-gray-200 p-2 w-1/5">세팅 방식</th>
                  <th className="border border-gray-200 p-2 w-1/6">총 배점</th>
                  <th className="border border-gray-200 p-2">세부 내용</th>
                  <th className="border border-gray-200 p-2 w-1/6">세부 배점</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 p-2 font-bold text-center">출석률</td>
                  <td className="border border-gray-200 p-2 text-center text-xs text-gray-500">자동 연동</td>
                  <td className="border border-gray-200 p-2 text-center"><input type="number" defaultValue="20" className="w-12 border p-1 text-center font-bold"/></td>
                  <td className="border border-gray-200 p-2"><input type="text" defaultValue="고용24 기준 출석률 연동" className="w-full border-b border-gray-300 bg-transparent text-xs p-1 outline-none"/></td>
                  <td className="border border-gray-200 p-2 text-center"><input type="number" defaultValue="20" className="w-12 border p-1 text-center"/></td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-2 font-bold text-center">온라인 강의</td>
                  <td className="border border-gray-200 p-2 text-center text-xs text-gray-500">자동 연동</td>
                  <td className="border border-gray-200 p-2 text-center"><input type="number" defaultValue="10" className="w-12 border p-1 text-center font-bold"/></td>
                  <td className="border border-gray-200 p-2"><input type="text" defaultValue="본과정 필수 강의 완강률" className="w-full border-b border-gray-300 bg-transparent text-xs p-1 outline-none"/></td>
                  <td className="border border-gray-200 p-2 text-center"><input type="number" defaultValue="10" className="w-12 border p-1 text-center"/></td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-2 font-bold text-center" rowSpan="2">과제</td>
                  <td className="border border-gray-200 p-2 text-center text-xs text-gray-500" rowSpan="2">OS 채점 입력</td>
                  <td className="border border-gray-200 p-2 text-center" rowSpan="2"><input type="number" defaultValue="30" className="w-12 border p-1 text-center font-bold"/></td>
                  <td className="border border-gray-200 p-2"><input type="text" defaultValue="과제 1 (Python 전처리)" className="w-full border-b border-gray-300 bg-transparent text-xs p-1 outline-none"/></td>
                  <td className="border border-gray-200 p-2 text-center"><input type="number" defaultValue="15" className="w-12 border p-1 text-center"/></td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-2"><input type="text" defaultValue="과제 2 (SQL 데이터 추출)" className="w-full border-b border-gray-300 bg-transparent text-xs p-1 outline-none"/></td>
                  <td className="border border-gray-200 p-2 text-center"><input type="number" defaultValue="15" className="w-12 border p-1 text-center"/></td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-2 font-bold text-center">프로젝트</td>
                  <td className="border border-gray-200 p-2 text-center text-xs text-gray-500">OS 채점 입력</td>
                  <td className="border border-gray-200 p-2 text-center"><input type="number" defaultValue="40" className="w-12 border p-1 text-center font-bold"/></td>
                  <td className="border border-gray-200 p-2"><input type="text" defaultValue="파이널 프로젝트 (팀 단위 평가)" className="w-full border-b border-gray-300 bg-transparent text-xs p-1 outline-none"/></td>
                  <td className="border border-gray-200 p-2 text-center"><input type="number" defaultValue="40" className="w-12 border p-1 text-center"/></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6 flex-1 animate-[fadeIn_0.3s_ease-in-out]">
             <StepHeader title="Step 5. 과제/퀴즈/스킬 진단 매핑" badgeText="학습 성과 측정 도구 설정" />
            
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600">Step 2와 Step 3에서 확정된 강의 타임라인에 퀴즈, 과제, 그리고 <strong className="text-cyan-600">스킬매치(Skill Match) 진단</strong>을 매핑합니다.</p>
              <button className="px-4 py-2 bg-cyan-50 border border-cyan-200 text-cyan-700 text-sm font-bold rounded-lg flex items-center gap-1.5 shadow-sm hover:bg-cyan-100 transition-colors">
                 <Target size={16}/> 사전/사후 스킬매치 진단 추가
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              {[
                { date: "10.27 (일)", time: "09:00-10:00", title: "부트캠프 오리엔테이션", type: "LIVE", skillMatch: "사전 진단 (Level 1-2 기준)" },
                { date: "12.01 (월)", time: "13:00-18:00", title: "SQL 실무 적용 실습", type: "VOD", hasQuiz: true, hasAssign: false },
                { date: "12.02 (화)", time: "13:00-18:00", title: "SQL 패턴 10가지", type: "VOD", hasQuiz: false, hasAssign: true },
              ].map((lec, idx) => (
                <div key={idx} className={`flex items-center border-b border-gray-100 p-4 transition-colors ${lec.skillMatch ? 'bg-cyan-50/20' : 'hover:bg-gray-50'}`}>
                  <div className="w-32 flex flex-col gap-1 border-r border-gray-100 pr-4">
                    <span className="text-xs font-bold text-gray-500">{lec.date}</span>
                    <span className="text-[11px] text-gray-400">{lec.time}</span>
                  </div>
                  <div className="flex-1 px-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge type={lec.type.toLowerCase()}>{lec.type}</Badge>
                      <span className="font-bold text-sm text-gray-900">{lec.title}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {lec.skillMatch ? (
                      <>
                        <button className="px-3 py-1.5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold rounded flex items-center gap-1.5 shadow-sm hover:bg-emerald-100 transition-colors">
                          <CheckCircle2 size={14} className="text-emerald-600"/> +출석 퀴즈
                        </button>
                        <button className="px-3 py-1.5 bg-pink-50 border border-pink-300 text-pink-800 text-xs font-bold rounded flex items-center gap-1.5 shadow-sm hover:bg-pink-100 transition-colors">
                          <Plus size={14} className="text-pink-600"/> +과제 추가
                        </button>
                      </>
                    ) : (
                      <>
                        {lec.hasQuiz ? (
                           <button className="px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold rounded flex items-center gap-1"><CheckCircle2 size={12}/> 3-4. SQL Quiz 4</button>
                        ) : (
                           <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 text-xs font-bold rounded flex items-center gap-1"><Plus size={12}/> 퀴즈 추가</button>
                        )}
                        {lec.hasAssign ? (
                           <button className="px-3 py-1.5 bg-pink-50 border border-pink-200 text-pink-700 text-xs font-bold rounded flex items-center gap-1"><FileText size={12}/> Python 기초 과제</button>
                        ) : (
                           <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 text-xs font-bold rounded flex items-center gap-1"><Plus size={12}/> 과제 추가</button>
                        )}
                        <button className="px-3 py-1.5 bg-cyan-50 border border-cyan-300 text-cyan-800 text-xs font-bold rounded flex items-center gap-1.5 shadow-sm hover:bg-cyan-100 transition-colors">
                          <Target size={12} className="text-cyan-600"/> +스킬매치
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6 flex-1 animate-[fadeIn_0.3s_ease-in-out]">
            <StepHeader title="Step 6. 게이미피케이션" badgeText="LMS 기여도·레벨 자동 연동" />

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2"><Zap size={18} className="text-yellow-500"/> XP 적립 규칙 설정</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded border border-gray-200">
                  <div className="text-sm font-semibold text-gray-600 mb-2">VOD 강의 1강 완료 시</div>
                  <div className="flex items-center gap-2"><input type="number" defaultValue="10" className="w-20 border border-gray-300 rounded p-1.5 text-center font-bold"/> <span className="text-gray-500 font-medium">XP</span></div>
                </div>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <div className="text-sm font-semibold text-gray-600 mb-2">과제 기한 내 제출 시</div>
                  <div className="flex items-center gap-2"><input type="number" defaultValue="50" className="w-20 border border-gray-300 rounded p-1.5 text-center font-bold"/> <span className="text-gray-500 font-medium">XP</span></div>
                </div>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <div className="text-sm font-semibold text-gray-600 mb-2">연속 출석(Streak) 보너스</div>
                  <div className="flex items-center gap-2"><input type="number" defaultValue="100" className="w-20 border border-gray-300 rounded p-1.5 text-center font-bold"/> <span className="text-gray-500 font-medium">XP</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between pt-6 border-t border-gray-100">
          <button 
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            이전 단계
          </button>
          <button 
            disabled={step === steps.length}
            onClick={() => setStep(step + 1)}
            className="px-6 py-2.5 bg-[#111827] text-white rounded-lg text-sm font-bold hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm transition-all"
          >
            다음 단계 <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// OPERATION COMPONENTS
// ============================================================================

function OperatorStudentMgmt({ selectedStudentForDetail, setSelectedStudentForDetail }) {
  const [activeTab, setActiveTab] = useState('active');
  const selectedStudent = selectedStudentForDetail;
  const setSelectedStudent = setSelectedStudentForDetail;

  // 출결 정정용 State
  const [editingAttendanceId, setEditingAttendanceId] = useState(null);
  const [tempAttStatus, setTempAttStatus] = useState('');
  const [tempAttReason, setTempAttReason] = useState('');

  const recentAttendanceMock = [
    { id: 'a1', date: '10.23 (수)', status: '출석', badge: 'success', bg: '!bg-green-100', isEdited: false },
    { id: 'a2', date: '10.24 (목)', status: '결석', badge: 'danger', bg: '!bg-red-100', isEdited: false },
    { id: 'a3', date: '10.25 (금)', status: '지각', badge: 'warning', bg: '!bg-yellow-100', isEdited: true, reason: '시스템 연동 오류 정정' },
  ];

  const getRiskBadge = (status) => {
    switch(status) {
      case '위험': return <Badge type="danger"><div className="flex items-center gap-1.5"><AlertTriangle size={12}/>위험 (AI)</div></Badge>;
      case '주의': return <Badge type="warning"><div className="flex items-center gap-1.5"><AlertCircle size={12}/>주의 (AI)</div></Badge>;
      default: return <Badge type="success"><div className="flex items-center gap-1.5"><CheckCircle2 size={12}/>안전</div></Badge>;
    }
  };

  // 상세 뷰 (V2 적용본)
  if (selectedStudent) {
    return (
      <div className="h-full flex flex-col max-w-[1600px] mx-auto animate-[fadeIn_0.3s_ease-in-out] overflow-auto custom-scrollbar pb-10">
        <button onClick={() => setSelectedStudent(null)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 font-bold w-max transition-colors mb-6">
          <ChevronLeft size={18}/> 수강생 목록으로 돌아가기
        </button>
        
        {/* Profile Summary */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-start mb-6">
           <div className="flex items-start gap-5">
             <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 font-black text-2xl flex items-center justify-center shadow-sm">
               {selectedStudent.name.charAt(0)}
             </div>
             <div>
               <div className="flex items-center gap-3 mb-1.5">
                 <h2 className="text-2xl font-black text-gray-900">{selectedStudent.name}</h2>
                 {getRiskBadge(selectedStudent.status)}
                 {selectedStudent.status !== '안전' && <Badge type="danger">AI 스코어: {selectedStudent.riskScore}점</Badge>}
               </div>
               <p className="text-sm text-gray-500 font-bold mb-3">{selectedStudent.program} <span className="text-gray-300 mx-1">|</span> {selectedStudent.email}</p>
               
               {selectedStudent.riskReasons && selectedStudent.riskReasons.length > 0 && (
                 <div className="flex flex-col gap-1.5">
                   <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5"><AlertTriangle size={12} className={selectedStudent.status !== '안전' ? 'text-red-500' : 'text-green-500'}/> 주요 상태 요약 (AI 분석)</span>
                   <div className="flex gap-2">
                     {selectedStudent.riskReasons.map((reason, idx) => (
                       <span key={idx} className={`text-[11px] font-bold px-2.5 py-1 rounded border ${selectedStudent.status !== '안전' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-green-50 text-green-700 border-green-100'}`}>
                         {reason}
                       </span>
                     ))}
                   </div>
                 </div>
               )}
             </div>
           </div>
           <div className="flex gap-2">
             <button className="px-5 py-2.5 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-indigo-100 shadow-sm transition-colors">
               <MessageCircle size={16}/> 넛지 발송
             </button>
             <button className="px-5 py-2.5 bg-[#111827] text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-800 shadow-sm transition-colors">
               <Plus size={16}/> 상담 기록 추가
             </button>
           </div>
        </div>

        {/* 수강생 개인 정보 */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
          <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users size={18} className="text-gray-500"/> 기본 정보
          </h3>
          <div className="grid grid-cols-4 gap-y-5 gap-x-6">
            <div><span className="text-xs text-gray-500 font-bold block mb-1">생년월일</span><span className="text-sm font-medium text-gray-900">{selectedStudent.birthDate}</span></div>
            <div><span className="text-xs text-gray-500 font-bold block mb-1">이메일 주소</span><span className="text-sm font-medium text-gray-900">{selectedStudent.email}</span></div>
            <div><span className="text-xs text-gray-500 font-bold block mb-1">전화번호</span><span className="text-sm font-medium text-gray-900">{selectedStudent.phone}</span></div>
            <div><span className="text-xs text-gray-500 font-bold block mb-1">내일배움카드 번호</span><span className="text-sm font-medium text-gray-900">{selectedStudent.hrdCardNum}</span></div>
            <div><span className="text-xs text-gray-500 font-bold block mb-1">결제 이력</span><span className="text-sm font-medium text-gray-900">{selectedStudent.paymentHistory}</span></div>
            <div><span className="text-xs text-gray-500 font-bold block mb-1">전공</span><span className="text-sm font-medium text-gray-900">{selectedStudent.major}</span></div>
            <div>
              <span className="text-xs text-gray-500 font-bold block mb-1.5">초기 셋업 현황</span>
              <div className="flex gap-1.5">
                {selectedStudent.otCompleted ? <Badge type="success">OT 완료</Badge> : <Badge type="danger">OT 미완료</Badge>}
                {selectedStudent.commChannel ? <Badge type="primary">소통채널 O</Badge> : <Badge type="warning">소통채널 X</Badge>}
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-5 border-t border-gray-100">
            <h4 className="text-sm font-bold text-gray-800 mb-3">제출 서류 및 산출물</h4>
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors text-sm font-bold text-gray-700 shadow-sm">
                <FileText size={16} className="text-indigo-500" /> 이력서 보기
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors text-sm font-bold text-gray-700 shadow-sm">
                <Briefcase size={16} className="text-purple-500" /> 포트폴리오
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors text-sm font-bold text-gray-700 shadow-sm">
                <MonitorPlay size={16} className="text-emerald-500" /> 최종 프로젝트
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-6 mb-6">
          {/* LEFT: 학습 성과 및 스킬매치 (Span 3) */}
          <div className="col-span-3 flex flex-col gap-6">
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
              <h3 className="text-base font-bold text-gray-900 mb-5 flex items-center gap-2"><BookOpen size={18} className="text-indigo-500"/> 학습 성과 통합 뷰</h3>
              <div className="grid grid-cols-3 gap-4">
                 <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-xs font-bold text-gray-500 block mb-1">전체 진도율</span>
                    <span className="text-2xl font-black text-gray-900">{selectedStudent.progress}%</span>
                 </div>
                 <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-xs font-bold text-gray-500 block mb-1">과제 제출/총 퀴즈</span>
                    <span className="text-2xl font-black text-gray-900">{selectedStudent.assignments}</span>
                 </div>
                 <div className="p-4 bg-indigo-50/50 rounded-lg border border-indigo-100">
                    <span className="text-xs font-bold text-indigo-700 block mb-1">수료 기준 스코어</span>
                    <span className="text-2xl font-black text-indigo-900">{selectedStudent.currentScore}<span className="text-sm font-bold text-indigo-400 ml-1">/ 100</span></span>
                 </div>
              </div>
            </div>

            {/* 스킬매치 (Skill Match) 프레임워크 적용 레이더 차트 */}
            <div className="bg-white p-6 rounded-xl border border-cyan-200 shadow-sm flex-1 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50 rounded-bl-full -mr-10 -mt-10 z-0"></div>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                  <h4 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <Target size={18} className="text-cyan-600"/> 스킬매치 진단 결과 (Skill Match)
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">이해(Intelligence), 활용(Implementation), 기여(Impact) 3단계 역량 분석</p>
                </div>
                <div className="flex items-center gap-3">
                   <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span><span className="text-xs font-bold text-gray-500">사전 진단 (Lv 1~2)</span></div>
                   <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span><span className="text-xs font-bold text-gray-700">현재 역량 (Lv 3~4)</span></div>
                </div>
              </div>

              <div className="flex-1 flex items-center relative z-10">
                 <div className="w-1/2 flex justify-center items-center py-4 relative">
                  <svg width="260" height="260" viewBox="0 0 340 280">
                    {[20, 40, 60, 80].map((r, index) => (
                      <g key={r}>
                        <polygon 
                          points={`170,${140 - r} ${170 + r*0.866},${140 - r*0.5} ${170 + r*0.866},${140 + r*0.5} 170,${140 + r} ${170 - r*0.866},${140 + r*0.5} ${170 - r*0.866},${140 - r*0.5}`}
                          fill="none" stroke="#E2E8F0" strokeWidth="1"
                        />
                        <text x="170" y={140 - r - 2} textAnchor="middle" fill="#94A3B8" fontSize="8">Lv {index+1}</text>
                      </g>
                    ))}
                    <line x1="170" y1="140" x2="170" y2="60" stroke="#E2E8F0" strokeWidth="1"/>
                    <line x1="170" y1="140" x2="239.2" y2="100" stroke="#E2E8F0" strokeWidth="1"/>
                    <line x1="170" y1="140" x2="239.2" y2="180" stroke="#E2E8F0" strokeWidth="1"/>
                    <line x1="170" y1="140" x2="170" y2="220" stroke="#E2E8F0" strokeWidth="1"/>
                    <line x1="170" y1="140" x2="100.8" y2="180" stroke="#E2E8F0" strokeWidth="1"/>
                    <line x1="170" y1="140" x2="100.8" y2="100" stroke="#E2E8F0" strokeWidth="1"/>
                    
                    {/* Pre-diagnostic (Gray) */}
                    <polygon 
                      points={`170,${140 - 30} ${170 + 35*0.866},${140 - 35*0.5} ${170 + 20*0.866},${140 + 20*0.5} 170,${140 + 40} ${170 - 25*0.866},${140 + 25*0.5} ${170 - 30*0.866},${140 - 30*0.5}`}
                      fill="rgba(203, 213, 225, 0.4)" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3,3"
                    />
                    {/* Current/Post-diagnostic (Cyan) */}
                    <polygon 
                      points={`170,${140 - 70} ${170 + 60*0.866},${140 - 60*0.5} ${170 + 75*0.866},${140 + 75*0.5} 170,${140 + 55} ${170 - 50*0.866},${140 + 50*0.5} ${170 - 65*0.866},${140 - 65*0.5}`}
                      fill="rgba(6, 182, 212, 0.25)" stroke="#06B6D4" strokeWidth="2.5" strokeLinejoin="round"
                    />
                    
                    <text x="170" y="45" textAnchor="middle" fill="#374151" fontSize="11" fontWeight="bold">기술 이해 (Knowledge)</text>
                    <text x="245" y="95" textAnchor="start" fill="#374151" fontSize="11" fontWeight="bold">도구 활용 (Implementation)</text>
                    <text x="245" y="195" textAnchor="start" fill="#374151" fontSize="11" fontWeight="bold">업무 기여 (Impact)</text>
                    <text x="170" y="240" textAnchor="middle" fill="#374151" fontSize="11" fontWeight="bold">비즈니스 문제해결</text>
                    <text x="95" y="195" textAnchor="end" fill="#374151" fontSize="11" fontWeight="bold">커뮤니케이션</text>
                    <text x="95" y="95" textAnchor="end" fill="#374151" fontSize="11" fontWeight="bold">학습 태도/경험</text>
                  </svg>
                 </div>
                 
                 {/* Skill Level Details */}
                 <div className="w-1/2 pl-6 border-l border-gray-100 flex flex-col gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                       <div className="flex justify-between items-center mb-1">
                         <span className="text-xs font-bold text-gray-700">도구 활용 (SQL/Python)</span>
                         <span className="text-xs font-black text-cyan-600">Level 4</span>
                       </div>
                       <p className="text-[10px] text-gray-500">독립적으로 스킬을 사용하며 상황을 주도할 수 있는 수준으로 크게 향상됨.</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                       <div className="flex justify-between items-center mb-1">
                         <span className="text-xs font-bold text-gray-700">업무 기여 (프로젝트)</span>
                         <span className="text-xs font-black text-cyan-600">Level 3</span>
                       </div>
                       <p className="text-[10px] text-gray-500">일반적인 상황에서 스킬을 활용해 팀 프로젝트 문제 해결에 기여함.</p>
                    </div>
                    <button className="mt-2 py-2 bg-white border border-cyan-200 text-cyan-700 rounded-lg text-xs font-bold shadow-sm hover:bg-cyan-50 transition-colors flex justify-center items-center gap-1.5">
                       <Layers size={14}/> 전체 스킬매치 리포트 열람
                    </button>
                 </div>
              </div>
            </div>
          </div>

          {/* RIGHT: 출결 현황 & 정정 기능 (Span 2) */}
          <div className="col-span-2 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col flex-1">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2"><CheckSquare size={18} className="text-green-500"/> 출결 현황 및 관리</h3>
                <span className="text-xs text-gray-400 font-medium">HRD-Net 자동 연동</span>
              </div>
              <div className="flex gap-4 mb-5">
                <div className="flex-1 p-3 bg-gray-50 rounded-lg border border-gray-100 text-center shadow-inner">
                  <span className="text-xs font-bold text-gray-500 block">출석률</span>
                  <span className="text-2xl font-black text-gray-900">{selectedStudent.attendance}</span>
                </div>
                <div className="flex-1 p-3 bg-red-50/30 rounded-lg border border-red-100 text-center shadow-inner">
                  <span className="text-xs font-bold text-red-500 block">지각/결석</span>
                  <span className="text-2xl font-black text-red-600">{selectedStudent.lateCount}/{selectedStudent.absenceCount}</span>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col">
                <h4 className="text-xs font-bold text-gray-600 mb-3 border-b border-gray-100 pb-2">최근 출결 이력 및 정정</h4>
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-3 space-y-2 overflow-y-auto max-h-48">
                   {recentAttendanceMock.map((log) => (
                     <div key={log.id} className="flex flex-col gap-1.5 bg-white p-2.5 rounded border border-gray-100 shadow-sm">
                       <div className="flex justify-between items-center">
                         <span className="text-sm font-bold text-gray-700">{log.date}</span>
                         
                         {/* Edit Mode Active */}
                         {editingAttendanceId === log.id ? (
                            <div className="flex items-center gap-2">
                              <select 
                                className="text-xs border border-indigo-300 rounded p-1 outline-none text-indigo-700 font-bold bg-indigo-50"
                                value={tempAttStatus}
                                onChange={(e) => setTempAttStatus(e.target.value)}
                              >
                                <option>출석</option><option>결석</option><option>지각</option><option>조퇴</option><option>공결</option>
                              </select>
                              <button 
                                onClick={() => setEditingAttendanceId(null)}
                                className="p-1 text-gray-400 hover:text-red-500 bg-gray-100 rounded"
                              ><X size={14}/></button>
                              <button 
                                onClick={() => setEditingAttendanceId(null)}
                                className="p-1 text-white bg-indigo-600 hover:bg-indigo-700 rounded"
                              ><Check size={14}/></button>
                            </div>
                         ) : (
                            // Read Mode
                            <div className="flex items-center gap-2 group">
                              <Badge type={log.badge} className={log.bg}>{log.status}</Badge>
                              <button 
                                onClick={() => {
                                  setEditingAttendanceId(log.id);
                                  setTempAttStatus(log.status);
                                  setTempAttReason(log.reason || '');
                                }} 
                                className="text-gray-300 hover:text-indigo-600 transition-colors opacity-0 group-hover:opacity-100"
                                title="출결 정정"
                              ><Edit3 size={14}/></button>
                            </div>
                         )}
                       </div>

                       {/* Reason Input (Edit Mode) vs Display (Read Mode) */}
                       {editingAttendanceId === log.id ? (
                          <input 
                            type="text" 
                            placeholder="정정 사유를 입력하세요 (예: 시스템 오류, 병결 등)"
                            className="w-full text-xs border border-gray-300 rounded p-1.5 outline-none focus:border-indigo-500 mt-1"
                            value={tempAttReason}
                            onChange={(e) => setTempAttReason(e.target.value)}
                          />
                       ) : log.isEdited ? (
                          <div className="text-[10px] text-gray-500 bg-gray-50 p-1.5 rounded flex items-center gap-1 border border-gray-100">
                            <Settings size={10} className="text-indigo-400"/> 수동 정정됨: {log.reason}
                          </div>
                       ) : null}
                     </div>
                   ))}
                </div>
              </div>
            </div>

            {/* 상담 히스토리 타임라인 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex-1">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2"><MessageSquare size={18} className="text-blue-500"/> 상담 및 넛지 타임라인</h3>
                <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors">
                  전체 보기 <ChevronRight size={14}/>
                </button>
              </div>
              
              <div className="relative pl-6 space-y-6">
                <div className="absolute left-[39px] top-2 bottom-2 w-px bg-gray-200"></div>
                <div className="relative flex items-start gap-5">
                  <div className="bg-indigo-50 text-indigo-500 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10 shrink-0">
                    <MessageCircle size={16}/>
                  </div>
                  <div className="flex-1 bg-white p-4.5 rounded-lg border border-gray-200 shadow-sm hover:border-indigo-300 transition-colors">
                     <div className="flex justify-between items-center mb-2">
                       <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-1 rounded">넛지 발송</span>
                       <time className="text-[11px] font-medium text-gray-400">2023.10.25 14:30</time>
                     </div>
                     <p className="text-sm text-gray-700 font-medium leading-relaxed">진도율 하락 경고 및 학습 독려 카카오톡 알림톡 발송 (시스템 자동)</p>
                  </div>
                </div>

                <div className="relative flex items-start gap-5">
                  <div className="bg-green-50 text-green-500 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10 shrink-0">
                    <PhoneCall size={16}/>
                  </div>
                  <div className="flex-1 bg-white p-4.5 rounded-lg border border-gray-200 shadow-sm hover:border-green-300 transition-colors">
                     <div className="flex justify-between items-center mb-2">
                       <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-100 px-2 py-1 rounded">유선 상담 기록</span>
                       <time className="text-[11px] font-medium text-gray-400">2023.10.20 16:00</time>
                     </div>
                     <p className="text-sm text-gray-700 font-medium leading-relaxed">최근 결석 사유 확인. 건강 문제로 쉬었으나 다음주부터 정상 참여 약속함.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 리스트 뷰 (Active / Dropout)
  return (
    <div className="h-full flex flex-col max-w-[1600px] mx-auto animate-[fadeIn_0.3s_ease-in-out]">
      <div className="flex justify-between items-end mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge type="default">OPERATION</Badge>
            <h1 className="text-2xl font-bold text-gray-900">수강생 관리 (CRM)</h1>
          </div>
          <p className="text-gray-500 text-sm">AI 기반 위험도 스코어를 확인하고 맞춤형 학습 독려(넛지)를 진행합니다.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 flex items-center gap-2 shadow-sm text-gray-700">
            <UploadCloud size={16} /> Excel 업로드
          </button>
          <button className="px-4 py-2 bg-[#111827] text-white rounded-lg text-sm font-semibold hover:bg-gray-800 flex items-center gap-2 shadow-sm">
            <UserPlus size={16} /> 계정 생성
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-gray-100 px-6 flex gap-8 bg-gray-50/50">
          {[
            { id: 'active', label: '운영 수강생 (Active)', count: 125 },
            { id: 'dropout', label: '중도 탈락 관리', count: 3 },
            { id: 'nudge', label: '템플릿 & 넛지 관리' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 text-sm font-bold border-b-2 transition-colors relative ${
                activeTab === tab.id ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab.label} {tab.count && <span className={`ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-black ${activeTab === tab.id ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-200 text-gray-600'}`}>{tab.count}</span>}
            </button>
          ))}
        </div>

        {activeTab === 'active' && (
          <>
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="이름 검색" className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 w-48 shadow-sm transition-all" />
                </div>
                <select className="bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg px-3 py-2 cursor-pointer shadow-sm outline-none hover:border-indigo-300 transition-colors">
                  <option>위험도: 전체</option>
                  <option>위험도: 위험</option>
                  <option>위험도: 주의</option>
                  <option>위험도: 안전</option>
                </select>
                <select className="bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg px-3 py-2 cursor-pointer shadow-sm outline-none hover:border-indigo-300 transition-colors">
                  <option>상태: 전체</option>
                  <option>상태: 재학중</option>
                  <option>상태: 이탈위험</option>
                </select>
                <select className="bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg px-3 py-2 cursor-pointer shadow-sm outline-none hover:border-indigo-300 transition-colors">
                  <option>정렬: 위험도순</option>
                  <option>정렬: 진도율순</option>
                  <option>정렬: 이름순</option>
                </select>
              </div>
              <div className="flex items-center gap-3 text-sm bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 shadow-inner">
                <span className="font-bold text-gray-600">전체 <span className="text-indigo-600 font-black">125</span>명</span>
                <div className="w-px h-4 bg-gray-300"></div>
                <span className="font-bold text-gray-600">위험군 <span className="text-[#FF2D55] font-black">5</span>명</span>
              </div>
            </div>

            <div className="flex-1 overflow-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead className="bg-gray-50/80 text-gray-500 text-xs uppercase font-bold sticky top-0 z-10 border-b border-gray-200 backdrop-blur-sm">
                  <tr>
                    <th className="p-4 w-12 text-center"><input type="checkbox" className="rounded border-gray-300 cursor-pointer" /></th>
                    <th className="p-4">이름</th>
                    <th className="p-4">과정명 / 기수</th>
                    <th className="p-4 w-48">진도율 %</th>
                    <th className="p-4">출석률 %</th>
                    <th className="p-4">AI 이탈위험 스코어</th>
                    <th className="p-4">수료 예측</th>
                    <th className="p-4 text-center">상세보기</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockStudents.map(student => (
                    <tr key={student.id} className="hover:bg-indigo-50/30 transition-colors group">
                      <td className="p-4 text-center"><input type="checkbox" className="rounded border-gray-300 cursor-pointer" /></td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-black flex items-center justify-center text-xs shadow-sm">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 cursor-pointer hover:text-indigo-600 hover:underline transition-colors" onClick={() => setSelectedStudent(student)}>{student.name}</div>
                            <div className="text-[10px] text-gray-500 font-medium">{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4"><span className="text-xs font-bold text-gray-700 bg-gray-50 px-2 py-1 rounded border border-gray-200">{student.program}</span></td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden border border-gray-200/50">
                            <div className={`h-full rounded-full transition-all duration-500 ${student.progress < 50 ? 'bg-[#FF2D55]' : student.progress < 80 ? 'bg-yellow-400' : 'bg-indigo-500'}`} style={{ width: `${student.progress}%` }}></div>
                          </div>
                          <span className={`text-xs font-black w-8 text-right ${student.progress < 50 ? 'text-[#FF2D55]' : 'text-gray-700'}`}>{student.progress}%</span>
                        </div>
                      </td>
                      <td className="p-4"><span className="text-xs font-black text-gray-800">{student.attendance}</span></td>
                      <td className="p-4">{getRiskBadge(student.status)}</td>
                      <td className="p-4">
                        {student.completionPrediction === '안정권' ? <Badge type="success">안정권</Badge> : <Badge type="danger">이탈위험</Badge>}
                      </td>
                      <td className="p-4 text-center">
                         <button onClick={() => setSelectedStudent(student)} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-[11px] font-bold hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 shadow-sm transition-all">
                           상세보기
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'dropout' && (
          <div className="flex-1 overflow-auto custom-scrollbar bg-gray-50/30">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead className="bg-white text-gray-500 text-xs uppercase font-bold sticky top-0 z-10 border-b border-gray-200 shadow-sm">
                <tr>
                  <th className="p-4">이탈자 목록</th>
                  <th className="p-4">과정명 / 기수</th>
                  <th className="p-4">이탈 일자</th>
                  <th className="p-4">이탈 사유 태그</th>
                  <th className="p-4 text-center">상담 히스토리 조회</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {mockDropouts.map(dropout => (
                  <tr key={dropout.id} className="hover:bg-red-50/20 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-black flex items-center justify-center text-xs shadow-sm">
                          {dropout.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{dropout.name}</div>
                          <div className="text-[10px] text-gray-500 font-medium">{dropout.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4"><span className="text-xs font-bold text-gray-600">{dropout.program}</span></td>
                    <td className="p-4"><span className="text-sm font-bold text-red-600">{dropout.dropDate}</span></td>
                    <td className="p-4"><Badge type="danger" className="!bg-red-50">{dropout.reason}</Badge></td>
                    <td className="p-4 text-center">
                       <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-bold hover:bg-red-50 hover:text-red-700 hover:border-red-300 shadow-sm transition-all flex items-center gap-1.5 mx-auto">
                         <FileText size={14}/> 조회 ({dropout.counselingCount}건)
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function OperatorAttendanceMgmt({ onStudentClick }) {
  const [activeSubTab, setActiveSubTab] = useState('채점 & 점수 입력'); 
  const [expandedGradingId, setExpandedGradingId] = useState(null);
  const [gradingMode, setGradingMode] = useState('rubric'); 
  const [attendanceModalStudent, setAttendanceModalStudent] = useState(null);
  const [editingAttendanceId, setEditingAttendanceId] = useState(null);
  const [tempAttStatus, setTempAttStatus] = useState('');
  const [tempAttReason, setTempAttReason] = useState('');

  const fullAttendanceLogs = [
    { id: 1, date: "2023.10.27 (금)", status: "출석", badge: "success", isEdited: false, reason: "" },
    { id: 2, date: "2023.10.26 (목)", status: "출석", badge: "success", isEdited: false, reason: "" },
    { id: 3, date: "2023.10.25 (수)", status: "지각", badge: "warning", isEdited: false, reason: "" },
    { id: 4, date: "2023.10.24 (화)", status: "출석", badge: "success", isEdited: false, reason: "" },
    { id: 5, date: "2023.10.23 (월)", status: "결석", badge: "danger", isEdited: false, reason: "" },
    { id: 6, date: "2023.10.20 (금)", status: "출석", badge: "success", isEdited: false, reason: "" },
    { id: 7, date: "2023.10.19 (목)", status: "공결", badge: "default", isEdited: true, reason: "병원 진단서 제출" },
    { id: 8, date: "2023.10.18 (수)", status: "출석", badge: "success", isEdited: false, reason: "" },
    { id: 9, date: "2023.10.17 (화)", status: "출석", badge: "success", isEdited: false, reason: "" },
    { id: 10, date: "2023.10.16 (월)", status: "결석", badge: "danger", isEdited: false, reason: "" },
  ];

  const [attendanceLogs, setAttendanceLogs] = useState(fullAttendanceLogs);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto animate-[fadeIn_0.3s_ease-in-out]">
      {/* Attendance Detail Modal */}
      {attendanceModalStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setAttendanceModalStudent(null)}>
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-[560px] max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50 rounded-t-2xl">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-black flex items-center justify-center text-sm">{attendanceModalStudent.name.charAt(0)}</div>
                  <h3 className="font-bold text-gray-900 text-base">{attendanceModalStudent.name} 전체 출결 이력</h3>
                </div>
                <p className="text-xs text-gray-400 mt-1 ml-10">{attendanceModalStudent.program}</p>
              </div>
              <button onClick={() => setAttendanceModalStudent(null)} className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"><X size={18}/></button>
            </div>
            <div className="px-6 py-4 bg-white flex gap-4 border-b border-gray-100">
              {[
                { label: "총 출석", value: "23일", color: "text-green-600 bg-green-50 border-green-100" },
                { label: "지각", value: `${attendanceModalStudent.lateCount}회`, color: "text-yellow-600 bg-yellow-50 border-yellow-100" },
                { label: "결석", value: `${attendanceModalStudent.absenceCount}회`, color: "text-red-500 bg-red-50 border-red-100" },
                { label: "출석률", value: attendanceModalStudent.attendance, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
              ].map((item, i) => (
                <div key={i} className={`flex-1 p-3 rounded-lg border text-center ${item.color}`}>
                  <div className="text-xs font-bold mb-1">{item.label}</div>
                  <div className="text-lg font-black">{item.value}</div>
                </div>
              ))}
            </div>
            <div className="overflow-y-auto flex-1 custom-scrollbar px-6 py-4 space-y-2">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-gray-700 flex items-center gap-1.5"><CheckSquare size={14} className="text-indigo-500"/> 일별 출결 기록</h4>
                <span className="text-xs text-gray-400 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded font-medium">행 hover → 정정 버튼 표시</span>
              </div>
              {attendanceLogs.map(log => (
                <div key={log.id} className="bg-gray-50 rounded-lg border border-gray-100 p-3 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-700">{log.date}</span>
                    {editingAttendanceId === log.id ? (
                      <div className="flex items-center gap-2">
                        <select className="text-xs border border-indigo-300 rounded p-1 outline-none text-indigo-700 font-bold bg-indigo-50" value={tempAttStatus} onChange={(e) => setTempAttStatus(e.target.value)}>
                          <option>출석</option><option>결석</option><option>지각</option><option>조퇴</option><option>공결</option>
                        </select>
                        <button onClick={() => setEditingAttendanceId(null)} className="p-1 text-gray-400 hover:text-red-500 bg-gray-200 rounded"><X size={13}/></button>
                        <button
                          onClick={() => {
                            setAttendanceLogs(prev => prev.map(l => l.id === log.id ? { ...l, status: tempAttStatus, isEdited: true, reason: tempAttReason || '수동 정정', badge: tempAttStatus === '출석' ? 'success' : tempAttStatus === '결석' ? 'danger' : tempAttStatus === '지각' ? 'warning' : 'default' } : l));
                            setEditingAttendanceId(null);
                          }}
                          className="p-1 text-white bg-indigo-600 hover:bg-indigo-700 rounded"
                        ><Check size={13}/></button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 group">
                        <Badge type={log.badge}>{log.status}</Badge>
                        <button onClick={() => { setEditingAttendanceId(log.id); setTempAttStatus(log.status); setTempAttReason(log.reason || ''); }} className="text-gray-300 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all" title="출결 정정"><Edit3 size={13}/></button>
                      </div>
                    )}
                  </div>
                  {editingAttendanceId === log.id ? (
                    <input type="text" placeholder="정정 사유를 입력하세요 (예: 시스템 오류, 병결 등)" className="w-full text-xs border border-gray-300 rounded p-1.5 outline-none focus:border-indigo-500" value={tempAttReason} onChange={(e) => setTempAttReason(e.target.value)} />
                  ) : log.isEdited ? (
                    <div className="text-[10px] text-gray-500 bg-white p-1.5 rounded flex items-center gap-1 border border-gray-200">
                      <Settings size={10} className="text-indigo-400"/> 수동 정정됨: {log.reason}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30 rounded-b-2xl flex justify-between items-center">
              <span className="text-xs text-gray-400">* 정정 이력은 시스템에 자동 기록됩니다.</span>
              <button onClick={() => setAttendanceModalStudent(null)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-700 transition-colors">닫기</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge type="default">OPERATION</Badge>
            <h1 className="text-2xl font-bold text-gray-900">출결 & 학습 관리 (채점 고도화)</h1>
          </div>
          <p className="text-gray-500 text-sm">고용24 출결 데이터와 과제 피드백 업로드 및 루브릭 기반 채점 시스템입니다.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="평균 수강률" value="88.2%" subtext="목표 90%" icon={MonitorPlay} trend="down" />
        <KpiCard title="평균 출석률" value="95.0%" subtext="고용24 연동" icon={CheckSquare} trend="up" />
        <KpiCard title="과제 제출률" value="92.5%" subtext="Skillflo 연동" icon={FileText} trend="up" />
        <div className="bg-[#FFF1F2] border border-[#FECDD3] p-6 rounded-xl flex flex-col justify-between shadow-sm relative overflow-hidden group cursor-pointer hover:border-red-400">
           <div className="absolute top-0 right-0 w-16 h-16 bg-red-100 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
           <div className="relative z-10">
             <div className="text-red-800 font-bold text-sm mb-2 flex items-center gap-1.5"><AlertTriangle size={16} /> 위험군 수</div>
             <div className="text-3xl font-black text-[#FF2D55] tracking-tight">5명</div>
           </div>
           <button className="relative z-10 text-xs text-red-700 font-bold text-left hover:underline mt-4 uppercase tracking-wider">상세 명단 확인 →</button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
        <div className="border-b border-gray-100 px-6 flex gap-8 bg-gray-50/50">
          {['종합 현황', '과제 관리', '채점 & 점수 입력'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveSubTab(tab)}
              className={`py-4 text-sm font-bold border-b-2 transition-all ${
                activeSubTab === tab ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeSubTab === '종합 현황' && (
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
              <h3 className="font-bold text-gray-800">종합 현황 목록</h3>
              <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-gray-50 shadow-sm transition-colors">
                <DownloadCloud size={14}/> Excel 다운로드
              </button>
            </div>
            <div className="overflow-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead className="bg-gray-50/80 text-gray-500 text-xs uppercase font-bold border-b border-gray-200">
                  <tr>
                    <th className="p-4">수강생명</th>
                    <th className="p-4 w-48">진도율 %</th>
                    <th className="p-4 text-center">출석률 %</th>
                    <th className="p-4 text-center">과제 미제출 개수</th>
                    <th className="p-4 text-center">수료 예측 배지</th>
                    <th className="p-4 text-center">상태 배지</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockStudents.map(student => {
                    const isAtRisk = student.status === '위험';
                    const missingAssignments = 8 - parseInt(student.assignments.split('/')[0]);
                    return (
                      <tr 
                        key={student.id} 
                        onClick={() => onStudentClick(student)}
                        className={`cursor-pointer transition-colors ${isAtRisk ? 'bg-red-50/40 hover:bg-red-50/70' : 'hover:bg-indigo-50/30'}`}
                      >
                        <td className="p-4">
                          <div className="font-bold text-gray-900 group-hover:text-indigo-600 group-hover:underline">{student.name}</div>
                          <div className="text-[10px] text-gray-500">{student.email}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 border border-gray-200/50 overflow-hidden">
                              <div className={`h-full rounded-full ${student.progress < 50 ? 'bg-[#FF2D55]' : 'bg-indigo-500'}`} style={{ width: `${student.progress}%` }}></div>
                            </div>
                            <span className={`text-xs font-bold w-8 ${student.progress < 50 ? 'text-[#FF2D55]' : 'text-gray-600'}`}>{student.progress}%</span>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setAttendanceModalStudent(student); }}
                            className="font-bold text-indigo-600 hover:text-indigo-900 underline decoration-dotted decoration-indigo-300 hover:decoration-indigo-600 transition-colors cursor-pointer text-sm"
                            title="클릭하여 전체 출결 이력 보기"
                          >{student.attendance}</button>
                        </td>
                        <td className="p-4 text-center">
                          {missingAssignments > 0 ? (
                            <span className="text-red-500 font-bold">{missingAssignments}개</span>
                          ) : (
                            <span className="text-gray-400 font-medium">0개</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {student.completionPrediction === '안정권' ? 
                            <Badge type="success">안정권</Badge> :
                            <Badge type="danger">이탈 위험</Badge>
                          }
                        </td>
                        <td className="p-4 text-center">
                          {student.status === '안전' && <Badge type="success">안전</Badge>}
                          {student.status === '주의' && <Badge type="warning">주의</Badge>}
                          {student.status === '위험' && <Badge type="danger">위험</Badge>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSubTab === '과제 관리' && (
          <div className="flex flex-col h-full p-6 bg-gray-50/30">
            <div className="overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">
                  <tr>
                    <th className="p-4">과제명</th>
                    <th className="p-4">마감일</th>
                    <th className="p-4 text-center">제출 인원 / 미제출 인원</th>
                    <th className="p-4 text-center">액션</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bold text-gray-900">과제 1: Python 전처리 실습</td>
                    <td className="p-4 text-gray-600 font-medium">2023.10.25 23:59</td>
                    <td className="p-4 text-center font-bold text-gray-700">
                      113명 / <span className="text-red-500">12명</span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-gray-700 font-semibold text-xs transition-colors">
                          미제출자 목록 보기
                        </button>
                        <button className="px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded hover:bg-indigo-100 text-indigo-700 font-semibold text-xs flex items-center gap-1 transition-colors">
                          <MessageCircle size={12}/> 일괄 넛지 발송
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bold text-gray-900">과제 2: SQL 데이터 추출</td>
                    <td className="p-4 text-gray-600 font-medium">2023.10.28 23:59</td>
                    <td className="p-4 text-center font-bold text-gray-700">
                      45명 / <span className="text-red-500">80명</span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-gray-700 font-semibold text-xs transition-colors">
                          미제출자 목록 보기
                        </button>
                        <button className="px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded hover:bg-indigo-100 text-indigo-700 font-semibold text-xs flex items-center gap-1 transition-colors">
                          <MessageCircle size={12}/> 일괄 넛지 발송
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSubTab === '채점 & 점수 입력' && (
          <div className="flex flex-col h-full p-6 bg-gray-50/30">
            <div className="flex justify-between items-center mb-4">
              <select className="bg-white border border-gray-300 text-gray-700 text-sm font-bold rounded-lg px-4 py-2 cursor-pointer shadow-sm outline-none hover:border-indigo-300 transition-colors">
                <option>데이터사이언스 3기</option>
                <option>KDT 데이터 분석 24기</option>
                <option>KDT 프론트엔드 10기</option>
                <option>KDT 서비스 기획 5기</option>
              </select>
            </div>

            <div className="overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">
                  <tr>
                    <th className="p-4 w-1/4">수강생명</th>
                    <th className="p-4 w-1/4">제출 일시/파일</th>
                    <th className="p-4 text-center w-1/4">총점</th>
                    <th className="p-4 text-center w-1/4">채점하기</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {mockStudents.map(student => (
                    <React.Fragment key={student.id}>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-gray-900">{student.name}</div>
                          <div className="text-[10px] text-gray-500">{student.email}</div>
                        </td>
                        <td className="p-4">
                          {student.assignments !== "3/8" ? (
                            <div>
                              <div className="text-xs text-gray-500 mb-1">10.24 14:20 제출</div>
                              <button className="text-indigo-600 hover:underline flex items-center gap-1 text-xs font-semibold">
                                <FileText size={12}/> project_v1.zip
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs font-bold text-red-400 bg-red-50 px-2 py-1 rounded">미제출</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          <span className="text-lg font-black text-gray-900">{student.assignments !== "3/8" ? student.currentScore : '-'}</span>
                          <span className="text-xs text-gray-400 ml-1">/ 100</span>
                        </td>
                        <td className="p-4 text-center">
                          <button 
                            onClick={() => setExpandedGradingId(expandedGradingId === student.id ? null : student.id)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 mx-auto w-28 ${
                              expandedGradingId === student.id ? 'bg-indigo-600 text-white shadow-sm' : 
                              student.assignments !== "3/8" ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-indigo-400' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                            disabled={student.assignments === "3/8"}
                          >
                            <Edit3 size={14}/> {expandedGradingId === student.id ? '닫기' : '피드백 입력'}
                          </button>
                        </td>
                      </tr>
                      
                      {expandedGradingId === student.id && (
                        <tr className="bg-indigo-50/20">
                          <td colSpan="4" className="p-0 border-b-2 border-indigo-200">
                             <div className="p-6">
                               <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-1">
                                 <div className="flex p-1 bg-gray-50 rounded-lg mb-4">
                                   <button 
                                     onClick={() => setGradingMode('rubric')}
                                     className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${gradingMode === 'rubric' ? 'bg-white text-indigo-700 shadow border border-gray-100' : 'text-gray-500 hover:text-gray-700'}`}
                                   >
                                     <Award size={16} className="inline mr-1.5 mb-0.5"/> 퀴즈/평가 자동 채점
                                   </button>
                                   <button 
                                     onClick={() => setGradingMode('upload')}
                                     className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${gradingMode === 'upload' ? 'bg-white text-indigo-700 shadow border border-gray-100' : 'text-gray-500 hover:text-gray-700'}`}
                                   >
                                     <FileUp size={16} className="inline mr-1.5 mb-0.5"/> 전임강사 피드백 업로드
                                   </button>
                                 </div>

                                 <div className="p-4">
                                   {gradingMode === 'rubric' && (
                                     <div className="space-y-4">
                                       <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                         <h4 className="font-bold text-gray-800 text-sm">강의별 퀴즈 점수 (자동 채점 결과)</h4>
                                         <span className="text-xs text-gray-500 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">LMS 자동 연동</span>
                                       </div>
                                       {[
                                         { lecture: "SQL 실무 적용 실습", quiz: "3-4. SQL Quiz 4", score: 88, total: 100, date: "10.24" },
                                         { lecture: "SQL 패턴 10가지", quiz: "3-5. SQL Quiz 5", score: 72, total: 100, date: "10.25" },
                                         { lecture: "Python 기초 세션", quiz: "Python 기초 퀴즈", score: 95, total: 100, date: "10.26" },
                                       ].map((item, idx) => (
                                         <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                                           <div>
                                             <span className="text-xs font-bold text-gray-500 block">{item.lecture}</span>
                                             <span className="text-sm font-bold text-gray-800">{item.quiz}</span>
                                             <span className="text-[10px] text-gray-400 ml-2">{item.date} 응시</span>
                                           </div>
                                           <div className="flex items-center gap-3">
                                             <div className="w-24 bg-gray-200 rounded-full h-2">
                                               <div className={`h-full rounded-full ${item.score >= 80 ? 'bg-indigo-500' : 'bg-orange-400'}`} style={{ width: `${item.score}%` }}></div>
                                             </div>
                                             <span className={`text-base font-black ${item.score >= 80 ? 'text-indigo-700' : 'text-orange-600'}`}>{item.score}<span className="text-xs font-medium text-gray-400">/{item.total}</span></span>
                                           </div>
                                         </div>
                                       ))}
                                       <div className="mt-4 flex flex-col gap-2">
                                          <span className="text-xs font-bold text-gray-600">추가 코멘트 (선택)</span>
                                          <textarea className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-indigo-500" rows="2" placeholder="수강생에게 전달할 코멘트를 입력하세요."></textarea>
                                       </div>
                                     </div>
                                   )}

                                   {gradingMode === 'upload' && (
                                     <div className="space-y-5">
                                       <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                         <h4 className="font-bold text-gray-800 text-sm">수강생 제출 과제 & 프로젝트</h4>
                                         <span className="text-xs text-gray-500">강사 코멘트 및 점수를 입력하세요</span>
                                       </div>
                                       {[
                                         { title: "과제 1: Python 데이터 전처리", type: "과제", file: "python_hw1_final.zip", submitted: "10.24 14:20", score: student.currentScore },
                                         { title: "과제 2: SQL 비즈니스 인사이트 도출", type: "과제", file: "sql_hw2.ipynb", submitted: "10.26 22:45", score: null },
                                         { title: "파이널 프로젝트: 데이터 대시보드 구현", type: "프로젝트", file: "final_project_team3.zip", submitted: "미제출", score: null },
                                       ].map((item, idx) => (
                                         <div key={idx} className={`rounded-xl border p-4 ${item.submitted === '미제출' ? 'bg-red-50/40 border-red-100' : 'bg-white border-gray-200 shadow-sm'}`}>
                                           <div className="flex items-start justify-between mb-3">
                                             <div>
                                               <div className="flex items-center gap-2 mb-1">
                                                 <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${item.type === '프로젝트' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>{item.type}</span>
                                                 <span className="text-sm font-bold text-gray-800">{item.title}</span>
                                               </div>
                                               {item.submitted !== '미제출' ? (
                                                 <button className="text-indigo-600 hover:underline flex items-center gap-1 text-xs font-semibold mt-1">
                                                   <FileText size={12}/> {item.file}
                                                   <span className="text-gray-400 font-normal ml-1">({item.submitted} 제출)</span>
                                                 </button>
                                               ) : (
                                                 <span className="text-xs font-bold text-red-400 bg-red-50 px-2 py-0.5 rounded border border-red-100">미제출</span>
                                               )}
                                             </div>
                                             <div className="flex items-center gap-2">
                                               <span className="text-xs text-gray-500 font-medium">점수</span>
                                               <input type="number" defaultValue={item.score || ''} placeholder="-" disabled={item.submitted === '미제출'} className="w-16 border border-gray-300 rounded p-1.5 text-center font-black text-sm text-indigo-700 outline-none focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-300" />
                                               <span className="text-xs text-gray-400">/ 100</span>
                                             </div>
                                           </div>
                                           <div>
                                             <label className="text-xs font-bold text-gray-500 block mb-1">강사 코멘트</label>
                                             <textarea
                                               disabled={item.submitted === '미제출'}
                                               className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-500 bg-gray-50 disabled:text-gray-300 disabled:bg-gray-50 resize-none"
                                               rows="2"
                                               placeholder={item.submitted === '미제출' ? '제출 후 코멘트 입력 가능' : '이 과제/프로젝트에 대한 피드백을 입력하세요.'}
                                             ></textarea>
                                           </div>
                                         </div>
                                       ))}
                                     </div>
                                   )}
                                   
                                   <div className="mt-6 flex justify-end gap-2">
                                     <button onClick={() => setExpandedGradingId(null)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50">취소</button>
                                     <button className="px-6 py-2 bg-[#111827] text-white rounded-lg text-sm font-bold shadow-md hover:bg-gray-800 flex items-center gap-2">
                                       <Check size={16}/> 채점 및 피드백 저장 (수강생 알림)
                                     </button>
                                   </div>
                                 </div>
                               </div>
                             </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function OperatorQnAMgmt() {
  return (
    <div className="h-full flex flex-col space-y-6 max-w-[1600px] mx-auto animate-[fadeIn_0.3s_ease-in-out]">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge type="default">OPERATION</Badge>
          <h1 className="text-2xl font-bold text-gray-900">운영 상담 & 공지</h1>
        </div>
        <p className="text-gray-500 text-sm">LMS의 지원센터와 연동되어 수강생과 실시간 소통이 가능합니다.</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
         <div className="border-b border-gray-100 px-6 flex gap-8 bg-gray-50/50">
          {['1:1 문의 관리', '공지사항 관리', 'FAQ 관리'].map((tab, i) => (
            <button key={tab} className={`py-4 text-sm font-bold border-b-2 transition-all ${i === 0 ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
              {tab} {i === 0 && <span className="ml-1.5 px-2 py-0.5 bg-[#FF2D55] text-white rounded-full text-[10px] font-black tracking-wider shadow-sm">NEW</span>}
            </button>
          ))}
        </div>

        {/* Split View for QnA */}
        <div className="flex flex-1 overflow-hidden">
          {/* List (Left) */}
          <div className="w-[320px] border-r border-gray-200 flex flex-col bg-white">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                 <input type="text" placeholder="문의 검색..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 bg-white shadow-sm" />
               </div>
            </div>
            <div className="flex-1 overflow-auto custom-scrollbar">
              {mockQnA.map((q, i) => (
                <div key={q.id} className={`p-4 border-b border-gray-100 cursor-pointer transition-all ${i === 0 ? 'bg-indigo-50/50 border-l-[3px] border-l-indigo-600 shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)]' : 'hover:bg-gray-50 border-l-[3px] border-l-transparent'}`}>
                  <div className="flex justify-between items-start mb-1.5">
                    <span className={`text-sm ${i===0 ? 'font-bold text-indigo-900' : 'font-semibold text-gray-800'}`}>{q.student}</span>
                    <span className="text-[11px] text-gray-400 font-medium">{q.date}</span>
                  </div>
                  <div className={`text-sm truncate mb-2.5 ${i===0 ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>{q.title}</div>
                  <Badge type={q.status === '답변대기' ? 'danger' : 'default'}>{q.status}</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Detail & Reply (Right) */}
          <div className="flex-1 flex flex-col bg-[#F8FAFC]">
             <div className="p-8 pb-6 border-b border-gray-200 bg-white shadow-sm z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Badge type="danger">답변대기 (LMS 수신)</Badge>
                  <span className="text-[13px] text-gray-500 font-medium">2023-10-27 14:30</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">{mockQnA[0].title}</h2>
                <div className="flex items-center gap-3 mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100 inline-flex pr-6">
                   <div className="w-9 h-9 bg-white border border-gray-200 shadow-sm rounded-full flex items-center justify-center font-bold text-gray-700 text-sm">박</div>
                   <div>
                     <div className="text-sm font-bold text-gray-900">박서버 수강생</div>
                     <div className="text-[11px] text-gray-500 font-medium">server.p@email.com</div>
                   </div>
                </div>
                <div className="text-gray-800 whitespace-pre-line text-[15px] leading-relaxed">
                  안녕하세요 매니저님,
                  이번 주말에 예비군 훈련이 겹쳐서 과제 제출을 기한 내에 하기 어려울 것 같습니다. 
                  혹시 월요일 오전까지 연장이 가능할까요? 
                  증빙 서류는 첨부해두었습니다. 확인 부탁드립니다!
                </div>
             </div>

             {/* Reply Area */}
             <div className="flex-1 flex flex-col p-8 pt-6">
               <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2"><MessageCircle size={16} className="text-indigo-500"/> 답변 작성</h3>
               <textarea 
                  className="w-full flex-1 border border-gray-200 shadow-sm rounded-xl p-5 text-[15px] focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 resize-none mb-4 bg-white"
                  placeholder="수강생에게 보낼 답변을 입력하세요..."
                  defaultValue={"안녕하세요 박서버 수강생님, 운영 매니저입니다.\n첨부해주신 예비군 훈련 증빙 서류 확인했습니다.\n해당 사유로 인한 과제 제출 기한 연장 승인해드렸습니다. 월요일 오전 10시까지 제출 부탁드립니다.\n감사합니다."}
               ></textarea>
               <div className="flex justify-between items-center mt-auto">
                 <button className="text-sm text-gray-600 font-semibold hover:text-indigo-600 flex items-center gap-1.5 transition-colors bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                   <FileText size={16}/> 자주 쓰는 답변 템플릿
                 </button>
                 <button className="px-8 py-3 bg-[#111827] text-white rounded-lg text-sm font-bold hover:bg-gray-800 shadow-md transition-all flex items-center gap-2">
                   답변 등록 (LMS 알림 즉시 발송) <Zap size={16} className="text-yellow-400"/>
                 </button>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto animate-[fadeIn_0.3s_ease-in-out]">
      <div className="flex justify-between items-end mb-2">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge type="primary">ADMIN</Badge>
            <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
          </div>
          <p className="text-gray-500 text-sm">프로그램의 전반적인 성과와 건전성을 코호트(기수) 단위로 시각화하여 분석합니다.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
            <button className="px-3 py-1.5 text-sm font-bold bg-indigo-50 text-indigo-700 rounded-md">최근 3개월</button>
            <button className="px-3 py-1.5 text-sm font-semibold text-gray-500 hover:text-gray-900">상반기</button>
            <button className="px-3 py-1.5 text-sm font-semibold text-gray-500 hover:text-gray-900">전체 기간</button>
          </div>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold hover:bg-gray-50 flex items-center gap-2 shadow-sm text-gray-700">
            <Filter size={16} /> 코호트 필터
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
        <KpiCard title="전체 매출" value="12.5억" subtext="올해 누적 기준" icon={DollarSign} trend="up" />
        <KpiCard title="프로그램 만족도" value="4.8" subtext="5.0 만점 기준" icon={Star} trend="up" />
        <KpiCard title="전체 수강생" value="128명" subtext="현재 운영 기수 합계" icon={Users} trend="up" />
        <KpiCard title="충원율" value="98.5%" subtext="정원 130명 기준" icon={UserCheck} trend="up" />
      </div>

      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <h3 className="text-base font-bold text-gray-900 mb-6 flex items-center gap-2"><Activity size={18} className="text-indigo-500"/> 수강생 건전성 지표</h3>
          <div className="flex-1 flex items-center justify-center relative">
            <div className="relative w-40 h-40 rounded-full shadow-sm" style={{ background: 'conic-gradient(#10B981 0% 70%, #F59E0B 70% 85%, #EF4444 85% 100%)' }}>
              <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center flex-col shadow-inner">
                <span className="text-3xl font-black text-gray-800 tracking-tight">128</span>
                <span className="text-[10px] font-bold text-gray-400 mt-1">TOTAL</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-500 shadow-sm"></span><span className="text-xs font-bold text-gray-600">안전 (70%)</span></div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-amber-500 shadow-sm"></span><span className="text-xs font-bold text-gray-600">주의 (15%)</span></div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-500 shadow-sm"></span><span className="text-xs font-bold text-gray-600">위험 (15%)</span></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2"><TrendingUp size={18} className="text-indigo-500"/> 최근 5주 평균 출석률 추이</h3>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded border border-indigo-100">목표 90%</span>
          </div>
          <div className="flex-1 flex items-end justify-between gap-6 px-4 pt-4 relative">
            <div className="absolute w-[calc(100%-2rem)] h-px border-t border-dashed border-indigo-400 bottom-[calc(90%-16px)] z-0 left-4"></div>
            {[
              { week: '1주차', val: 98, color: 'bg-indigo-300' },
              { week: '2주차', val: 95, color: 'bg-indigo-400' },
              { week: '3주차', val: 88, color: 'bg-red-400' },
              { week: '4주차', val: 92, color: 'bg-indigo-500' },
              { week: '5주차(현재)', val: 96, color: 'bg-indigo-600' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3 flex-1 group relative z-10">
                <div className="absolute -top-8 bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.val}%
                </div>
                <div className="w-full bg-gray-50 border border-gray-100 rounded-t-lg relative h-32 flex items-end overflow-hidden group-hover:bg-gray-100 transition-colors shadow-inner">
                  <div className={`w-full rounded-t-lg transition-all duration-500 shadow-sm ${item.color}`} style={{ height: `${item.val}%` }}></div>
                </div>
                <span className={`text-xs font-bold ${i === 4 ? 'text-indigo-700' : 'text-gray-500'}`}>{item.week}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col col-span-3">
          <h3 className="text-base font-bold text-gray-900 mb-6 flex items-center gap-2"><BarChart3 size={18} className="text-indigo-500"/> 코호트별 다중 지표 성과 비교</h3>
          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
            {[
              { name: "KDT 서비스 기획 5기", comp: 94, hw: 88 },
              { name: "KDT 프론트엔드 10기", comp: 88, hw: 75 },
              { name: "KDT 백엔드 8기", comp: 91, hw: 82 },
              { name: "KDT 데이터 분석 24기", comp: 96, hw: 95 },
            ].map((prog, i) => (
              <div key={i} className="flex items-center gap-6 p-4 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all">
                <div className="w-40">
                  <span className="text-sm font-bold text-gray-800 block truncate mb-1">{prog.name}</span>
                  <span className="text-[10px] font-medium text-gray-500 bg-gray-200 px-1.5 py-0.5 rounded">수강생 {Math.floor(Math.random() * 20 + 30)}명</span>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-gray-500 w-12">수료율</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 flex overflow-hidden">
                      <div className="bg-indigo-500 h-full transition-all" style={{ width: `${prog.comp}%` }}></div>
                    </div>
                    <span className="text-[11px] font-black text-indigo-700 w-8 text-right">{prog.comp}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-gray-500 w-12">과제제출</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 flex overflow-hidden">
                      <div className={`h-full transition-all ${prog.hw < 80 ? 'bg-orange-400' : 'bg-emerald-500'}`} style={{ width: `${prog.hw}%` }}></div>
                    </div>
                    <span className={`text-[11px] font-black w-8 text-right ${prog.hw < 80 ? 'text-orange-500' : 'text-emerald-600'}`}>{prog.hw}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function OperatorDashboard() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto animate-[fadeIn_0.3s_ease-in-out]">
      <div className="flex justify-between items-end mb-2">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge type="default">OPERATION</Badge>
            <h1 className="text-2xl font-bold text-gray-900">오늘의 운영 보드</h1>
          </div>
          <p className="text-gray-500 text-sm">오늘 즉시 개입이 필요한 수강생 현황과 우선순위 To-Do 리스트입니다.</p>
        </div>
        <div className="text-sm font-bold text-indigo-700 bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100 flex items-center gap-2 shadow-sm">
          <Clock size={16} /> 2023년 10월 27일 (금) 기준
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-[#FFF1F2] border border-[#FECDD3] p-5 rounded-xl flex flex-col justify-between shadow-sm cursor-pointer hover:border-red-400 transition-colors">
           <div className="text-red-800 font-bold text-sm mb-3 flex items-center gap-1.5"><AlertTriangle size={16} /> 위험군 학생 수</div>
           <div>
             <div className="text-3xl font-black text-[#FF2D55] mb-1">11<span className="text-lg font-bold text-red-400 ml-1">명</span></div>
             <div className="text-[11px] text-red-600 font-medium">위험 3명 / 주의 8명</div>
           </div>
        </div>
        
        <div className="bg-orange-50 border border-orange-200 p-5 rounded-xl flex flex-col justify-between shadow-sm cursor-pointer hover:border-orange-400 transition-colors">
           <div className="text-orange-800 font-bold text-sm mb-3 flex items-center gap-1.5"><Activity size={16} /> 수료 위험 예측</div>
           <div>
             <div className="text-3xl font-black text-orange-600 mb-1">5<span className="text-lg font-bold text-orange-400 ml-1">명</span></div>
             <div className="text-[11px] text-orange-700 font-medium">LMS 기준 미달 예상</div>
           </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl flex flex-col justify-between shadow-sm cursor-pointer hover:border-blue-400 transition-colors">
           <div className="text-blue-800 font-bold text-sm mb-3 flex items-center gap-1.5"><UserCheck size={16} /> 오늘 출결 현황</div>
           <div>
             <div className="text-3xl font-black text-blue-600 mb-1">6<span className="text-lg font-bold text-blue-400 ml-1">명</span></div>
             <div className="text-[11px] text-blue-700 font-medium">미출석 2명 / 지각 4명</div>
           </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl flex flex-col justify-between shadow-sm cursor-pointer hover:border-gray-400 transition-colors">
           <div className="text-gray-800 font-bold text-sm mb-3 flex items-center gap-1.5"><FileText size={16} /> 과제 미제출</div>
           <div>
             <div className="text-3xl font-black text-gray-700 mb-1">12<span className="text-lg font-bold text-gray-400 ml-1">명</span></div>
             <div className="text-[11px] text-gray-500 font-medium">D-1 마감 과제 기준</div>
           </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-xl flex flex-col justify-between shadow-sm cursor-pointer hover:border-indigo-400 transition-colors">
           <div className="text-indigo-800 font-bold text-sm mb-3 flex items-center gap-1.5"><MessageSquare size={16} /> 미답변 QnA</div>
           <div>
             <div className="text-3xl font-black text-indigo-600 mb-1">3<span className="text-lg font-bold text-indigo-400 ml-1">건</span></div>
             <div className="text-[11px] text-indigo-700 font-medium">최대 지연 4시간</div>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-6">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Zap size={18} className="text-yellow-500 fill-yellow-500"/> AI 개입 추천 학생 TOP 5
          </h3>
          <span className="text-xs text-gray-500 font-medium">실시간 활동 데이터 기반 우선순위 산출</span>
        </div>
        <div className="overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white text-gray-400 text-xs uppercase font-bold border-b border-gray-100">
              <tr>
                <th className="p-4 pl-6 w-16 text-center">우선순위</th>
                <th className="p-4">수강생 정보</th>
                <th className="p-4">경고 요소 (AI 분석 사유)</th>
                <th className="p-4 text-center">최근 개입일</th>
                <th className="p-4 pr-6 text-right">빠른 액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { rank: 1, name: "박서버", risk: "3일 연속 미출석 및 과제 2건 미제출", lastAction: "없음" },
                { rank: 2, name: "이배포", risk: "최근 1주일 진도율 0%, 퀴즈 과락", lastAction: "7일 전" },
                { rank: 3, name: "정클라우드", risk: "QnA 부정적 감정어 감지, 출석률 하락세", lastAction: "14일 전" },
                { rank: 4, name: "김코드", risk: "팀 프로젝트 참여도 극저, 동료 피드백 경고", lastAction: "3일 전" },
                { rank: 5, name: "최데이터", risk: "오프라인 결석 2회 누적 (제적 경고 수위)", lastAction: "어제" },
              ].map((student, i) => (
                <tr key={i} className="hover:bg-indigo-50/30 transition-colors group">
                  <td className="p-4 pl-6 text-center">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-black shadow-sm ${i === 0 ? 'bg-[#FF2D55] text-white' : i === 1 ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                      {student.rank}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-gray-900 hover:text-indigo-600 cursor-pointer">{student.name}</td>
                  <td className="p-4">
                    <span className={`text-sm font-semibold px-2.5 py-1 rounded-md border ${i < 2 ? 'text-red-600 bg-red-50 border-red-100' : 'text-orange-600 bg-orange-50 border-orange-100'}`}>
                      {student.risk}
                    </span>
                  </td>
                  <td className="p-4 text-center text-sm font-medium text-gray-500">{student.lastAction}</td>
                  <td className="p-4 pr-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-indigo-300 hover:text-indigo-600 shadow-sm transition-all text-xs font-bold flex items-center gap-1.5">
                         <MessageCircle size={14} /> 넛지 발송
                       </button>
                       <button className="px-3 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-600 hover:text-white shadow-sm transition-all text-xs font-bold flex items-center gap-1.5">
                         <Calendar size={14} /> 상담 예약
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
