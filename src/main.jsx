import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const profile = {
  cnName: "林景仪",
  enName: "Joyce Lin",
  email: "18221526907@163.com",
  location: "Shanghai, China",
};

const sections = [
  ["00", "首页", "home"],
  ["01", "洞察", "field-notes"],
  ["02", "案例", "case-files"],
  ["03", "工具", "tool-system"],
  ["04", "关于", "manifesto"],
  ["05", "联系", "contact"],
];

const archiveTicker = [
  ["GPA", "3.6 / 4.0"],
  ["均分", "87"],
  ["IELTS", "7.5"],
  ["GRE", "327"],
  ["ACCA", "6 / 13"],
  ["Tools", "Excel / SPSS / PowerBI / MySQL / Python"],
];

const signalNodes = [
  {
    id: "beauty",
    no: "01",
    title: "Beauty Retail",
    org: "Benefit LVMH Beauty",
    meta: "Product Insight / Retail Data / VM Coordination",
    x: 16,
    y: 30,
    tone: "rose",
    signal: "新品趋势、竞品卖点、产品试用反馈与渠道销售库存。",
    method: "竞品分析、试用反馈整理、详情页与 Banner 更新、VM 陈列协调。",
    output: "新品本土化参考、渠道物料跟进与培训支持。",
  },
  {
    id: "finance",
    no: "02",
    title: "Financial Market",
    org: "华创证券",
    meta: "Fund Indicators / SWOT / Short-video Marketing",
    x: 68,
    y: 24,
    tone: "blue",
    signal: "基金产品表现、头部券商短视频营销与用户互动数据。",
    method: "Excel 指标分析、SWOT、竞品对比、趋势图表制作。",
    output: "市场分析报告、可视化图表和短视频脚本支持。",
  },
  {
    id: "talent",
    no: "03",
    title: "Brand & Talent",
    org: "Korn Ferry",
    meta: "Brand Positioning / Talent Demand / Candidate Report",
    x: 42,
    y: 58,
    tone: "mauve",
    signal: "品牌定位、岗位需求与行业人才结构。",
    method: "品牌研究、人才地图、候选人背景梳理。",
    output: "推荐报告、调研材料和汇报 PPT。",
  },
  {
    id: "tools",
    no: "04",
    title: "Data & Tools",
    org: "Research, Analysis, Communication, Build",
    meta: "Tool Matrix / Data Network / Structured Judgment",
    x: 82,
    y: 76,
    tone: "moss",
    signal: "销售、库存、产品表现与用户互动等多源信号。",
    method: "指标整理、趋势拆解、可视化、结构化报告。",
    output: "让市场信号变成可沟通、可执行的判断依据。",
  },
];

const signalIndex = signalNodes.reduce((acc, node) => {
  acc[node.id] = node;
  return acc;
}, {});

const signalEchoGroups = {
  field: ["beauty", "finance", "talent"],
  tools: ["tools"],
};

const signalTargetSelector = {
  beauty: '[data-signal-target="beauty"]',
  finance: '[data-signal-target="finance"]',
  talent: '[data-signal-target="talent"]',
  tools: "#tool-system",
};

const notes = [
  {
    no: "01",
    signalId: "beauty",
    nodeLabel: "BEAUTY RETAIL",
    theme: "BEAUTY RETAIL",
    company: "Benefit / LVMH Beauty 贝玲妃",
    role: "旅游零售部｜市场实习生",
    time: "2026.01 - 2026.06",
    tone: "rose",
    defaultLine: "Product Insight · Retail Data · VM Coordination",
    signal: "新品趋势、竞品卖点、试用反馈",
    method: "销售库存、定价监测、大促观察",
    output: "详情页、Banner、VM 陈列与培训支持",
    tags: ["美妆零售", "新品趋势", "销售库存", "视觉陈列", "渠道协同"],
  },
  {
    no: "02",
    signalId: "finance",
    nodeLabel: "FINANCIAL MARKET",
    theme: "FINANCIAL MARKET",
    company: "华创证券",
    role: "市场分析助理",
    time: "2025.07 - 2025.09",
    tone: "blue",
    defaultLine: "Fund Indicators · SWOT · Short-video Marketing",
    signal: "基金产品表现、头部券商短视频营销、用户互动数据",
    method: "Excel 分析、SWOT、竞品对比、趋势图表制作",
    output: "市场分析报告、可视化图表和短视频脚本支持",
    tags: ["金融产品", "Excel 分析", "SWOT", "竞品研究", "趋势报告"],
  },
  {
    no: "03",
    signalId: "talent",
    nodeLabel: "BRAND & TALENT",
    theme: "BRAND & TALENT",
    company: "Korn Ferry 光辉国际",
    role: "高级人才搜寻助理",
    time: "2024.07 - 2024.09",
    tone: "mauve",
    defaultLine: "Brand Positioning · Talent Demand · Candidate Report",
    signal: "品牌定位、岗位需求、行业人才结构",
    method: "品牌研究、人才地图、候选人背景梳理",
    output: "推荐报告、调研材料和汇报 PPT 制作",
    tags: ["品牌研究", "人才地图", "行业分析", "候选人评估", "报告表达"],
  },
];

const cases = [
  {
    no: "01",
    title: "数字健康平台",
    role: "项目负责人",
    fullTitle: "面向年轻群体身材焦虑问题的数字健康平台",
    method: "市场调研、15 款健身 APP 竞品分析、用户反馈拆解、产品架构设计。",
    output: "AI 辅助前端组件、数字健康平台原型、完整数据管理系统。",
    flow: ["痛点识别", "市场调研", "竞品分析", "产品架构", "AI 辅助开发", "数据系统"],
    tags: ["市场调研", "竞品分析", "产品架构", "AI 辅助开发"],
    tone: "lichen",
  },
  {
    no: "02",
    title: "中医知识分享平台",
    role: "队员",
    fullTitle: "中医知识分享平台",
    method: "市场调研、竞品分析、平台观察、用户需求识别。",
    output: "竞品分析、用户需求识别、平台定位与内容结构支持。",
    flow: ["平台观察", "竞品分析", "用户需求", "平台定位", "内容结构"],
    tags: ["市场调研", "竞品分析", "用户需求", "平台定位"],
    tone: "clay",
  },
];

const tools = [
  {
    title: "Research",
    caption: "市场与消费者信号采集",
    items: ["市场调研", "竞品分析", "消费者洞察", "品牌定位", "SWOT"],
    tone: "olive",
  },
  {
    title: "Analysis",
    caption: "数据拆解与可视化",
    items: ["Excel", "SPSS", "PowerBI", "MySQL", "Python", "数据可视化"],
    tone: "blue",
  },
  {
    title: "Communication",
    caption: "商业表达与内容转译",
    items: ["PowerPoint", "报告撰写", "短视频脚本", "Banner", "产品详情页"],
    tone: "rose",
  },
  {
    title: "Build",
    caption: "数字产品与 AI 辅助构建",
    items: ["Vibe Coding", "AI 辅助前端", "组件化设计", "产品架构", "数据管理系统"],
    tone: "gold",
  },
];

const financeMetrics = {
  "NAV Growth": ["METHOD", "追踪基金净值增长，拆解产品表现。"],
  "Annualized Return": ["METHOD", "比较年化回报率，辅助判断竞争位置。"],
  "Market Share": ["SIGNAL", "观察市场占有率变化与头部产品强弱。"],
  SWOT: ["METHOD", "把竞品优劣势整理为可沟通分析框架。"],
  "Audience Engagement": ["OUTPUT", "支持短视频脚本与开户参与度优化。"],
};

const talentNodes = {
  "Brand Positioning": "分析品牌市场定位与组织需求。",
  "Talent Demand": "梳理岗位需求与行业人才结构。",
  "Candidate Profile": "评估候选人技能背景与发展潜力。",
  "Report Output": "输出推荐报告、调研材料与 PPT 汇报。",
};

function App() {
  const { activeSection, progress } = useScrollIndex();
  const [activeSignal, setActiveSignal] = useState("beauty");
  const [cursor, setCursor] = useState({ show: false, text: "", x: 0, y: 0 });

  useActiveSignalOnScroll(setActiveSignal);

  return (
    <>
      <Header activeSection={activeSection} progress={progress} />
      <ScrollRail activeSection={activeSection} progress={progress} />
      <CursorLabel cursor={cursor} />
      <main>
        <Hero activeSignal={activeSignal} setActiveSignal={setActiveSignal} setCursor={setCursor} />
        <FieldNotes activeSignal={activeSignal} setActiveSignal={setActiveSignal} setCursor={setCursor} />
        <CaseFiles setCursor={setCursor} />
        <ToolSystem activeSignal={activeSignal} setActiveSignal={setActiveSignal} setCursor={setCursor} />
        <Manifesto />
        <Contact setCursor={setCursor} />
      </main>
    </>
  );
}

function useScrollIndex() {
  const [activeSection, setActiveSection] = useState("home");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);

      let current = "home";
      for (const [, , id] of sections) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= window.innerHeight * 0.36) current = id;
      }
      setActiveSection(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return { activeSection, progress };
}

function useActiveSignalOnScroll(setActiveSignal) {
  useEffect(() => {
    const update = () => {
      const targets = [...document.querySelectorAll("[data-signal-target]")];
      let current = "";
      for (const target of targets) {
        const rect = target.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.46 && rect.bottom >= window.innerHeight * 0.2) {
          current = target.dataset.signalTarget;
          break;
        }
      }
      if (current) setActiveSignal(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [setActiveSignal]);
}

function jumpToSignal(id) {
  const target = document.querySelector(signalTargetSelector[id]);
  target?.scrollIntoView({ behavior: "smooth", block: "center" });
  window.dispatchEvent(new CustomEvent("open-signal", { detail: { id } }));
}

function Header({ activeSection, progress }) {
  return (
    <header className="siteHeader">
      <a className="brandMark" href="#home" aria-label="返回首页">
        <span>LJY</span>
      </a>
      <nav className="siteNav" aria-label="主导航">
        {sections.map(([no, label, id]) => (
          <a className={activeSection === id ? "active" : ""} href={`#${id}`} key={id}>
            <span>{no}</span> {label}
          </a>
        ))}
      </nav>
      <a className="resumeButton magneticButton" href="./resume-2026.pdf" target="_blank" rel="noreferrer">
        查看简历
      </a>
      <i className="navProgress" style={{ transform: `scaleX(${progress})` }} />
    </header>
  );
}

function ScrollRail({ activeSection, progress }) {
  return (
    <aside className="scrollRail" aria-label="滚动档案索引">
      <p>SIGNAL SOURCES</p>
      <div className="railLine">
        <i style={{ transform: `scaleY(${progress})` }} />
      </div>
      <div className="railNodes">
        {sections.map(([no, label, id]) => (
          <a className={activeSection === id ? "active" : ""} href={`#${id}`} key={id}>
            <span>{no}</span>
            <em>{label}</em>
          </a>
        ))}
      </div>
    </aside>
  );
}

function CursorLabel({ cursor }) {
  return (
    <div className={`cursorLabel ${cursor.show ? "show" : ""}`} style={{ left: cursor.x + 22, top: cursor.y - 38 }}>
      {cursor.text}
    </div>
  );
}

function Hero({ activeSignal, setActiveSignal, setCursor }) {
  return (
    <section className="heroIndex" id="home">
      <div className="paperTexture" aria-hidden="true" />
      <div className="heroGrid shell">
        <aside className="heroAside">
          <p className="systemLabel">SIGNAL SOURCES</p>
          <div className="asideRule" />
          <p>Beauty Retail<br />Financial Market<br />Brand & Talent<br />Data & Tools</p>
        </aside>
        <div className="heroTitleBlock">
          <p className="sectionLabel revealDelay1">Living Signal Archive / 生长型市场信号档案</p>
          <h1 className="nameHero revealDelay2">
            <span>{profile.cnName}</span>
            <em>{profile.enName}</em>
          </h1>
          <div className="motionTitle" aria-label="LIVING SIGNAL ARCHIVE">
            <span>LIVING</span>
            <span className="signalWord">SIGNAL</span>
            <span className="roomWord">ARCHIVE</span>
          </div>
          <h2 className="revealDelay3">Market Intelligence Atelier</h2>
          <p className="heroLead revealDelay4">
            我把美妆零售、金融产品分析与数字健康项目中的数据、竞品与用户反馈，整理成能够支持判断的市场洞察。
          </p>
          <div className="keywordRail revealDelay5">
            {["数字营销", "市场洞察", "消费者研究", "数据分析", "美妆零售", "AI 辅助产品设计"].map((word) => (
              <span key={word}>{word}</span>
            ))}
          </div>
        </div>
        <SignalMap activeSignal={activeSignal} setActiveSignal={setActiveSignal} setCursor={setCursor} />
      </div>
      <ArchiveTicker />
    </section>
  );
}

function SignalMap({ activeSignal, setActiveSignal, setCursor }) {
  const active = signalIndex[activeSignal] || signalNodes[0];
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const linePoints = useMemo(() => signalNodes.map((node) => `${node.x},${node.y}`).join(" "), []);

  return (
    <div
      className={`signalMapBoard active-${active.tone}`}
      aria-label="交互市场信号图"
      data-active-signal={active.id}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setParallax({
          x: ((event.clientX - rect.left) / rect.width - 0.5) * 14,
          y: ((event.clientY - rect.top) / rect.height - 0.5) * 14,
        });
        setCursor((current) => (current.show ? { ...current, x: event.clientX, y: event.clientY } : current));
      }}
      onMouseLeave={() => {
        setParallax({ x: 0, y: 0 });
        setCursor({ show: false, text: "", x: 0, y: 0 });
      }}
      style={{ "--px": `${parallax.x}px`, "--py": `${parallax.y}px` }}
    >
      <div className="boardHeader">
        <span>Signal Map</span>
        <span>Core Nodes / 04</span>
      </div>
      <div className="mapCanvas">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points={linePoints} />
          <path d="M16 30 C38 10 55 18 68 24 S80 46 82 76" />
          <path className="goldPath" d="M16 30 C31 45 36 54 42 58" />
        </svg>
        {signalNodes.map((node, index) => (
          <button
            className={`mapNode ${node.tone} ${active.id === node.id ? "active" : ""}`}
            data-signal-id={node.id}
            key={node.id}
            onClick={() => {
              setActiveSignal(node.id);
              jumpToSignal(node.id);
            }}
            onFocus={() => setActiveSignal(node.id)}
            onMouseEnter={(event) => {
              setActiveSignal(node.id);
              setCursor({ show: true, text: node.id === "tools" ? "TRACE TOOLS" : `OPEN ${node.title.toUpperCase()}`, x: event.clientX, y: event.clientY });
            }}
            style={{ left: `${node.x}%`, top: `${node.y}%`, animationDelay: `${index * 140 + 320}ms` }}
          >
            <i />
            <small>{node.no}</small>
            <span>{node.title}</span>
          </button>
        ))}
      </div>
      <div className={`mapAnnotation ${active.tone}`}>
        <p>SOURCE NODE / {active.no}</p>
        <h3>{active.org}</h3>
        <strong>{active.meta}</strong>
        <dl>
          <div>
            <dt>SIGNAL</dt>
            <dd>{active.signal}</dd>
          </div>
          <div>
            <dt>METHOD</dt>
            <dd>{active.method}</dd>
          </div>
          <div>
            <dt>OUTPUT</dt>
            <dd>{active.output}</dd>
          </div>
        </dl>
      </div>
      <div className="boardFlow">
        {["Market Data", "Consumer Signal", "Competitive Insight", "Brand Decision"].map((step, index) => (
          <React.Fragment key={step}>
            <span>{step}</span>
            {index < 3 && <i aria-hidden="true" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function ArchiveTicker() {
  return (
    <section className="archiveTicker shell" aria-label="个人索引">
      <div className="tickerIntro">
        <span>00</span>
        <h2>INDEX SNAPSHOT / 个人索引</h2>
        <p>数字营销本科 / 上海对外经贸大学</p>
      </div>
      <div className="tickerTrack">
        {archiveTicker.map(([label, value]) => (
          <div className="tickerItem" key={label}>
            <small>{label}</small>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function FieldNotes({ activeSignal, setActiveSignal, setCursor }) {
  const [openNote, setOpenNote] = useState("01");

  useEffect(() => {
    const open = (event) => {
      const note = notes.find((item) => item.signalId === event.detail.id);
      if (note) setOpenNote(note.no);
    };
    window.addEventListener("open-signal", open);
    return () => window.removeEventListener("open-signal", open);
  }, []);

  return (
    <section className="section fieldNotes shell" id="field-notes">
      <MiniSignalEcho title="SIGNAL MAP / CORE NOTES" ids={signalEchoGroups.field} activeSignal={activeSignal} />
      <SectionHeading
        index="01"
        label="FIELD NOTES"
        title="洞察笔记"
        text="三组核心职业信号从首页 Map 中展开：美妆零售、金融市场、品牌与人才研究。"
      />
      <div className="noteList playableNotes">
        {notes.map((note) => {
          const isOpen = openNote === note.no;
          const cursorText = note.signalId === "beauty" ? "OPEN BEAUTY SIGNAL" : note.signalId === "finance" ? "TRACE FINANCE SIGNAL" : "VIEW TALENT MAP";
          return (
            <article
              className={`fieldNote playableNote ${note.tone} ${isOpen ? "open" : ""}`}
              data-signal-id={note.signalId}
              data-signal-target={note.signalId}
              key={note.theme}
              onMouseEnter={(event) => {
                setOpenNote(note.no);
                setActiveSignal(note.signalId);
                setCursor({ show: true, text: cursorText, x: event.clientX, y: event.clientY });
              }}
              onMouseMove={(event) => setCursor((current) => ({ ...current, x: event.clientX, y: event.clientY }))}
              onMouseLeave={() => setCursor({ show: false, text: "", x: 0, y: 0 })}
              onClick={() => {
                setOpenNote(isOpen ? "" : note.no);
                setActiveSignal(note.signalId);
              }}
            >
              <div className="noteIndex">{note.no}</div>
              <div className="noteMain">
                <p className="sourceNode">{note.no} / {note.nodeLabel}</p>
                <p className="noteTheme">{note.theme}</p>
                <h3>{note.company}</h3>
                <p className="noteRole">
                  {note.role} <span>{note.time}</span>
                </p>
                <p className="noteDefaultLine">{note.defaultLine}</p>
                <PlayLayer note={note} />
              </div>
              <aside className="noteSide">
                <div className="tagCloud magneticTags">
                  {note.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </aside>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function PlayLayer({ note }) {
  if (note.signalId === "beauty") return <BeautySignalPack />;
  if (note.signalId === "finance") return <FinanceDataSlice />;
  return <TalentMappingBoard />;
}

function BeautySignalPack() {
  const cards = [
    ["Product Insight", "新品趋势、竞品卖点、试用反馈"],
    ["Retail Data", "销售库存、定价监测、大促观察"],
    ["Visual Signal", "详情页、Banner、VM 陈列"],
  ];
  return (
    <div className="playLayer beautyPack">
      {cards.map(([title, text]) => (
        <div className="beautyMiniCard" key={title}>
          <small>{title}</small>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
}

function FinanceDataSlice() {
  const [activeMetric, setActiveMetric] = useState("NAV Growth");
  const [label, text] = financeMetrics[activeMetric];
  return (
    <div className="playLayer dataSlice">
      <svg viewBox="0 0 220 72" aria-hidden="true">
        <polyline points="4,56 34,48 64,51 94,32 126,36 158,18 216,25" />
      </svg>
      <div className="metricChips">
        {Object.keys(financeMetrics).map((metric) => (
          <button className={activeMetric === metric ? "active" : ""} key={metric} onClick={(event) => {
            event.stopPropagation();
            setActiveMetric(metric);
          }}>
            {metric}
          </button>
        ))}
      </div>
      <div className="metricReadout">
        <small>{label}</small>
        <p>{text}</p>
      </div>
    </div>
  );
}

function TalentMappingBoard() {
  const [activeTalent, setActiveTalent] = useState("Brand Positioning");
  const [stamped, setStamped] = useState(false);
  return (
    <div className="playLayer talentBoard">
      <svg viewBox="0 0 220 96" aria-hidden="true">
        <path d="M24 62 C64 20 126 26 184 68" />
        <path d="M42 74 C86 82 128 68 168 28" />
      </svg>
      <div className="talentNodeGrid">
        {Object.keys(talentNodes).map((node) => (
          <button
            className={activeTalent === node ? "active" : ""}
            key={node}
            onClick={(event) => {
              event.stopPropagation();
              setActiveTalent(node);
              if (node === "Report Output") setStamped(true);
            }}
            onMouseEnter={() => setActiveTalent(node)}
          >
            <i />
            {node}
          </button>
        ))}
      </div>
      <aside className="candidateNote">
        <small>Candidate Note</small>
        <p>{talentNodes[activeTalent]}</p>
        {stamped && <strong>PPT / REPORT</strong>}
      </aside>
    </div>
  );
}

function CaseFiles({ setCursor }) {
  const [openCase, setOpenCase] = useState("01");

  return (
    <section className="section caseFiles" id="case-files">
      <div className="shell">
        <SupportingEcho />
        <SectionHeading
          index="02"
          label="SUPPORTING CASE FILES"
          title="方法能力补充"
          text="除实习经历外，以下项目用于补充展示我在市场调研、竞品分析、产品架构和 AI 辅助开发方面的方法能力。"
        />
        <div className="caseDrawerList supportingCases">
          {cases.map((item) => {
            const isOpen = openCase === item.no;
            return (
              <article
                className={`caseDrawer supportingCase ${item.tone} ${isOpen ? "open" : ""}`}
                data-side-case={item.no}
                key={item.fullTitle}
                onMouseEnter={(event) => {
                  setOpenCase(item.no);
                  setCursor({ show: true, text: "EXPAND SIDE CASE", x: event.clientX, y: event.clientY });
                }}
                onMouseMove={(event) => setCursor((current) => ({ ...current, x: event.clientX, y: event.clientY }))}
                onMouseLeave={() => setCursor({ show: false, text: "", x: 0, y: 0 })}
                onClick={() => setOpenCase(isOpen ? "" : item.no)}
              >
                <div className="drawerLabel">
                  <span>SIDE CASE {item.no}</span>
                  <strong>{item.role}</strong>
                  <em>SUPPORTING EVIDENCE</em>
                </div>
                <div className="drawerTitle">
                  <h3>{item.fullTitle}</h3>
                  <p>{item.tags.join(" / ")}</p>
                </div>
                <div className="drawerMeta">
                  <div>
                    <small>METHOD</small>
                    <p>{item.method}</p>
                  </div>
                  <div>
                    <small>PROCESS</small>
                    <div className="flowLine">
                      {item.flow.map((step) => (
                        <span key={step}>{step}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <small>OUTPUT</small>
                    <p>{item.output}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ToolSystem({ activeSignal, setActiveSignal, setCursor }) {
  const [activeTool, setActiveTool] = useState("Analysis");

  useEffect(() => {
    const open = (event) => {
      if (event.detail.id === "tools") setActiveTool("Analysis");
    };
    window.addEventListener("open-signal", open);
    return () => window.removeEventListener("open-signal", open);
  }, []);

  return (
    <section
      className="section toolSystem shell"
      id="tool-system"
      data-signal-id="tools"
      data-signal-target="tools"
      onMouseEnter={() => setActiveSignal("tools")}
    >
      <MiniSignalEcho title="SIGNAL MAP / DATA & TOOLS" ids={signalEchoGroups.tools} activeSignal={activeSignal} />
      <SectionHeading
        index="03"
        label="TOOL MATRIX"
        title="工具矩阵"
        text="Data & Tools 节点的展开网络：研究、分析、表达与搭建共同构成我的工作系统。"
      />
      <div className={`abilityNetwork mapLinked hasActive active-${activeTool.toLowerCase()}`}>
        <div className="matrixCore">DATA & TOOLS<br />NODE 04</div>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M18 24 C36 18 56 20 78 28" />
          <path d="M22 78 C38 58 62 48 80 24" />
          <path d="M16 24 C30 46 50 70 82 78" />
        </svg>
        {tools.map((group, index) => (
          <article
            className={`abilityCell ${group.tone} ${activeTool === group.title ? "active" : ""}`}
            key={group.title}
            onClick={() => setActiveTool(group.title)}
            onMouseEnter={(event) => {
              setActiveTool(group.title);
              setActiveSignal("tools");
              setCursor({ show: true, text: "TRACE TOOLS", x: event.clientX, y: event.clientY });
            }}
            onMouseMove={(event) => setCursor((current) => ({ ...current, x: event.clientX, y: event.clientY }))}
            onMouseLeave={() => setCursor({ show: false, text: "", x: 0, y: 0 })}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{group.title}</h3>
            <p>{group.caption}</p>
            <div>
              {group.items.map((item) => (
                <strong key={item}>
                  <i />
                  {item}
                </strong>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function MiniSignalEcho({ title, ids, activeSignal }) {
  return (
    <aside className="miniSignalEcho" aria-label={title}>
      <p>{title}</p>
      <div>
        {ids.map((id, index) => {
          const node = signalIndex[id];
          return (
            <React.Fragment key={id}>
              <button
                className={`${node.tone} ${activeSignal === id ? "active" : ""}`}
                data-signal-id={id}
                onClick={() => jumpToSignal(id)}
                aria-label={node.title}
              >
                <i />
                <span>{node.title}</span>
              </button>
              {index < ids.length - 1 && <em />}
            </React.Fragment>
          );
        })}
      </div>
    </aside>
  );
}

function SupportingEcho() {
  return (
    <aside className="miniSignalEcho supportingEcho" aria-label="Supporting Evidence">
      <p>SUPPORTING EVIDENCE</p>
      <div>
        <button className="lichen active" type="button">
          <i />
          <span>Digital Health</span>
        </button>
        <em />
        <button className="clay active" type="button">
          <i />
          <span>TCM Knowledge</span>
        </button>
      </div>
    </aside>
  );
}

function Manifesto() {
  return (
    <section className="manifestoSection section" id="manifesto">
      <div className="shell manifestoGrid">
        <div className="manifestoIndex">
          <span>04</span>
          <p>MANIFESTO / Living Signal Archive</p>
        </div>
        <div className="manifestoText">
          <p className="sectionLabel">MANIFESTO / 关于我</p>
          <h2>
            <span>我把分散的信息</span>
            <span>
              整理成清晰的<strong>洞察</strong>，
            </span>
            <span>把复杂的市场现象</span>
            <span>
              转化为<strong>可理解</strong>、<strong>可沟通</strong>、<strong>可执行</strong>的<strong>判断</strong>。
            </span>
          </h2>
          <p>
            我的经历横跨美妆零售、金融产品分析、品牌与人才研究、数字健康产品设计。
            我希望继续在消费者洞察、品牌策略与 AI 辅助产品创新方向深入发展。
          </p>
        </div>
      </div>
    </section>
  );
}

function Contact({ setCursor }) {
  return (
    <section className="contactPage" id="contact">
      <div className="shell contactGrid">
        <div>
          <p className="sectionLabel">OPEN FILE / CONTACT</p>
          <h2>如果你想了解我的项目、实习经历或研究兴趣，欢迎与我联系。</h2>
        </div>
        <div className="contactDossier">
          <div>
            <span>Name</span>
            <strong>{profile.cnName} {profile.enName}</strong>
          </div>
          <div>
            <span>Email</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
          <div>
            <span>Location</span>
            <strong>{profile.location}</strong>
          </div>
          <div>
            <span>Resume</span>
            <a href="./resume-2026.pdf" download>Download</a>
          </div>
          <div className="contactActions">
            <a
              className="stampButton"
              href="./resume-2026.pdf"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={(event) => setCursor({ show: true, text: "AVAILABLE", x: event.clientX, y: event.clientY })}
              onMouseMove={(event) => setCursor((current) => ({ ...current, x: event.clientX, y: event.clientY }))}
              onMouseLeave={() => setCursor({ show: false, text: "", x: 0, y: 0 })}
            >
              查看简历
            </a>
            <a className="stampButton" href={`mailto:${profile.email}`}>
              发送邮件
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ index, label, title, text }) {
  return (
    <div className="sectionHeading revealBlock">
      <span>{index}</span>
      <div>
        <p className="sectionLabel">{label}</p>
        <h2>{title}</h2>
      </div>
      <p>{text}</p>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
