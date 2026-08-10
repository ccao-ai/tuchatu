"use client";

import { useEffect, useMemo, useState } from "react";

type Word = {
  word: string;
  part: string;
  meaning: string;
  example: string;
};

const words: Word[] = [
  { word: "abundant", part: "adj.", meaning: "丰富的；充足的", example: "Rainfall is abundant in this region." },
  { word: "acquire", part: "v.", meaning: "获得；学到", example: "Children acquire language through practice." },
  { word: "adapt", part: "v.", meaning: "适应；改编", example: "Animals must adapt to environmental changes." },
  { word: "adequate", part: "adj.", meaning: "足够的；合格的", example: "The school has adequate space for the activity." },
  { word: "analyze", part: "v.", meaning: "分析", example: "Students analyzed the results of the experiment." },
  { word: "annual", part: "adj.", meaning: "每年的；年度的", example: "The science fair is an annual event." },
  { word: "apparent", part: "adj.", meaning: "明显的；表面上的", example: "It became apparent that the plan needed changes." },
  { word: "approach", part: "n./v.", meaning: "方法；接近", example: "The teacher tried a new approach to reading." },
  { word: "beneficial", part: "adj.", meaning: "有益的", example: "Regular exercise is beneficial to your health." },
  { word: "capacity", part: "n.", meaning: "容量；能力", example: "The hall has a capacity of five hundred people." },
  { word: "category", part: "n.", meaning: "类别；种类", example: "Place each animal into the correct category." },
  { word: "complex", part: "adj.", meaning: "复杂的", example: "The human brain is a complex organ." },
  { word: "concentrate", part: "v.", meaning: "集中注意力", example: "It is easier to concentrate in a quiet room." },
  { word: "consequence", part: "n.", meaning: "后果；结果", example: "Every decision has a consequence." },
  { word: "constant", part: "adj.", meaning: "持续的；不变的", example: "The machine produces a constant low sound." },
  { word: "consume", part: "v.", meaning: "消耗；消费", example: "Modern buildings consume a great deal of energy." },
  { word: "contrast", part: "n./v.", meaning: "对比；形成对照", example: "The white flowers contrast with the dark leaves." },
  { word: "contribute", part: "v.", meaning: "贡献；促成", example: "Many factors contribute to a student's success." },
  { word: "decline", part: "n./v.", meaning: "下降；衰退", example: "The bird population began to decline." },
  { word: "demonstrate", part: "v.", meaning: "展示；证明", example: "The instructor demonstrated how to use the tool." },
  { word: "derive", part: "v.", meaning: "获得；源自", example: "Many English words derive from Latin." },
  { word: "detect", part: "v.", meaning: "察觉；探测", example: "The device can detect small changes in temperature." },
  { word: "distinct", part: "adj.", meaning: "不同的；清晰的", example: "The two species have distinct patterns." },
  { word: "domestic", part: "adj.", meaning: "国内的；家养的", example: "Dogs are among the oldest domestic animals." },
  { word: "efficient", part: "adj.", meaning: "高效的；节能的", example: "The new system is more efficient than the old one." },
  { word: "emerge", part: "v.", meaning: "出现；显露", example: "New evidence began to emerge during the study." },
  { word: "establish", part: "v.", meaning: "建立；确立", example: "The club was established by a group of students." },
  { word: "estimate", part: "n./v.", meaning: "估计；估算", example: "Scientists estimate the age of the rock." },
  { word: "evident", part: "adj.", meaning: "显而易见的", example: "Her improvement was evident in the final test." },
  { word: "expand", part: "v.", meaning: "扩大；扩展", example: "The museum plans to expand its collection." },
  { word: "factor", part: "n.", meaning: "因素", example: "Cost is an important factor in the decision." },
  { word: "frequent", part: "adj.", meaning: "频繁的；经常发生的", example: "Frequent review helps learners remember new words." },
  { word: "generate", part: "v.", meaning: "产生；生成", example: "Wind turbines generate electricity." },
  { word: "gradual", part: "adj.", meaning: "逐渐的", example: "The town experienced a gradual increase in population." },
  { word: "habitat", part: "n.", meaning: "栖息地", example: "Wetlands provide a habitat for many birds." },
  { word: "identify", part: "v.", meaning: "识别；确认", example: "Can you identify the main idea of the passage?" },
  { word: "impact", part: "n./v.", meaning: "影响；冲击", example: "Technology has a major impact on communication." },
  { word: "indicate", part: "v.", meaning: "表明；指示", example: "The data indicate that the method is effective." },
  { word: "maintain", part: "v.", meaning: "维持；保养", example: "Plants need sunlight to maintain healthy growth." },
  { word: "occur", part: "v.", meaning: "发生；出现", example: "Earthquakes occur when parts of Earth's crust move." },
  { word: "perspective", part: "n.", meaning: "观点；视角", example: "The story is told from a child's perspective." },
  { word: "predict", part: "v.", meaning: "预测", example: "It is difficult to predict the weather accurately." },
  { word: "primary", part: "adj.", meaning: "主要的；首要的", example: "Safety is our primary concern." },
  { word: "require", part: "v.", meaning: "需要；要求", example: "The assignment will require careful research." },
  { word: "significant", part: "adj.", meaning: "重要的；显著的", example: "There was a significant difference between the groups." },
  { word: "similar", part: "adj.", meaning: "相似的", example: "The two paintings use similar colors." },
  { word: "specific", part: "adj.", meaning: "具体的；特定的", example: "Please give a specific example from the text." },
  { word: "structure", part: "n.", meaning: "结构；建筑物", example: "The bridge has a strong steel structure." },
  { word: "sufficient", part: "adj.", meaning: "足够的；充分的", example: "We have sufficient time to finish the project." },
  { word: "transfer", part: "v.", meaning: "转移；传递", example: "Heat can transfer from one object to another." },
];

function getOptions(index: number) {
  const offsets = [7, 19, 31];
  const distractors = offsets.map((offset) => words[(index + offset) % words.length].meaning);
  const answerPosition = (index * 3 + 1) % 4;
  const options = [...distractors];
  options.splice(answerPosition, 0, words[index].meaning);
  return { options, answerPosition };
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(words.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const questionSets = useMemo(() => words.map((_, index) => getOptions(index)), []);
  const answeredCount = answers.filter((answer) => answer !== null).length;
  const score = answers.reduce((total, answer, index) => total + (answer === questionSets[index].answerPosition ? 1 : 0), 0);
  const currentSet = questionSets[current];

  useEffect(() => {
    if (!started || submitted) return;
    const handleKey = (event: KeyboardEvent) => {
      const number = Number(event.key);
      if (number >= 1 && number <= 4) choose(number - 1);
      if (event.key === "ArrowRight" && current < words.length - 1) setCurrent((value) => value + 1);
      if (event.key === "ArrowLeft" && current > 0) setCurrent((value) => value - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, started, submitted]);

  function choose(optionIndex: number) {
    setAnswers((previous) => {
      const next = [...previous];
      next[current] = optionIndex;
      return next;
    });
  }

  function restart() {
    setAnswers(Array(words.length).fill(null));
    setCurrent(0);
    setSubmitted(false);
    setStarted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!started) {
    return (
      <main className="landing-shell">
        <nav className="topbar" aria-label="网站导航">
          <a className="brand" href="#top" aria-label="词跃首页"><span className="brand-mark">T</span><span>词跃 · TOEFL Junior</span></a>
          <span className="nav-note">50 词能力检测</span>
        </nav>
        <section className="hero" id="top">
          <div className="eyebrow">VOCABULARY CHECK · 01</div>
          <h1>不是背过，<br /><em>而是真的会用。</em></h1>
          <p className="hero-copy">用 50 道精心挑选的词义题，快速了解你的小托福核心词汇掌握度。一次测试，找准下一步。</p>
          <button className="primary-button" onClick={() => setStarted(true)}>开始测试 <span>→</span></button>
          <div className="test-facts" aria-label="测试信息">
            <div><strong>50</strong><span>核心词汇</span></div>
            <div><strong>10–15</strong><span>预计分钟</span></div>
            <div><strong>即时</strong><span>成绩解析</span></div>
          </div>
        </section>
        <section className="feature-strip">
          <div><span>01</span><h2>真实语境</h2><p>选词覆盖校园、科学与社会主题。</p></div>
          <div><span>02</span><h2>即时定位</h2><p>提交后集中查看错词与例句。</p></div>
          <div><span>03</span><h2>轻松练习</h2><p>无需登录，手机和电脑都能使用。</p></div>
        </section>
      </main>
    );
  }

  if (submitted) {
    const percentage = Math.round((score / words.length) * 100);
    const message = percentage >= 90 ? "词汇达人" : percentage >= 75 ? "基础扎实" : percentage >= 60 ? "正在进步" : "继续积累";
    return (
      <main className="result-shell">
        <nav className="topbar"><div className="brand"><span className="brand-mark">T</span><span>词跃 · TOEFL Junior</span></div><span className="nav-note">测试报告</span></nav>
        <section className="result-hero">
          <div className="score-ring" style={{ "--score": `${percentage * 3.6}deg` } as React.CSSProperties}><div><strong>{percentage}</strong><span>分</span></div></div>
          <div><div className="eyebrow">YOUR RESULT</div><h1>{message}</h1><p>你答对了 <strong>{score}</strong> / {words.length} 题。{percentage >= 80 ? "你已经掌握了大部分核心词汇，继续保持！" : "复习下面的错词，再测一次会更好。"}</p></div>
        </section>
        <section className="review-section">
          <div className="review-heading"><div><span className="section-kicker">REVIEW</span><h2>错词复盘</h2></div><button className="secondary-button" onClick={restart}>重新测试 ↻</button></div>
          {score === words.length ? <div className="perfect-card">全部答对！今天的词汇状态非常棒。</div> : (
            <div className="review-grid">
              {words.map((word, index) => answers[index] !== questionSets[index].answerPosition && (
                <article className="review-card" key={word.word}>
                  <div className="review-word"><h3>{word.word}</h3><span>{word.part}</span></div>
                  <p className="meaning">{word.meaning}</p>
                  <p className="example">“{word.example}”</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="quiz-shell">
      <nav className="topbar"><div className="brand"><span className="brand-mark">T</span><span>词跃 · TOEFL Junior</span></div><span className="nav-note">已完成 {answeredCount} / {words.length}</span></nav>
      <div className="progress-track" aria-label={`完成 ${answeredCount} 题`}><span style={{ width: `${(answeredCount / words.length) * 100}%` }} /></div>
      <div className="quiz-layout">
        <aside className="question-map" aria-label="题目导航">
          <div className="map-title"><span>PROGRESS</span><strong>{String(current + 1).padStart(2, "0")}<small> / 50</small></strong></div>
          <div className="number-grid">
            {words.map((word, index) => <button key={word.word} aria-label={`第 ${index + 1} 题`} className={`${index === current ? "current" : ""} ${answers[index] !== null ? "answered" : ""}`} onClick={() => setCurrent(index)}>{index + 1}</button>)}
          </div>
          <p className="keyboard-tip">键盘提示：按 1–4 作答，← → 切题</p>
        </aside>
        <section className="question-card">
          <div className="question-label">CHOOSE THE BEST MEANING</div>
          <div className="word-line"><h1>{words[current].word}</h1><span>{words[current].part}</span></div>
          <p className="prompt">请选择最准确的中文释义</p>
          <div className="options" role="radiogroup" aria-label={`${words[current].word} 的中文释义`}>
            {currentSet.options.map((option, index) => (
              <button key={option} role="radio" aria-checked={answers[current] === index} className={answers[current] === index ? "selected" : ""} onClick={() => choose(index)}><span>{String.fromCharCode(65 + index)}</span><strong>{option}</strong><i>✓</i></button>
            ))}
          </div>
          <div className="question-actions">
            <button className="text-button" disabled={current === 0} onClick={() => setCurrent((value) => value - 1)}>← 上一题</button>
            {current < words.length - 1 ? <button className="next-button" onClick={() => setCurrent((value) => value + 1)}>下一题 →</button> : <button className="submit-button" disabled={answeredCount !== words.length} onClick={() => setSubmitted(true)}>提交测试</button>}
          </div>
          {current === words.length - 1 && answeredCount !== words.length && <p className="submit-note">还有 {words.length - answeredCount} 题未完成，可点击左侧题号返回作答。</p>}
        </section>
      </div>
    </main>
  );
}
