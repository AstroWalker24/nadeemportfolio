import { useState, useEffect } from 'react';
import './TerminalWindow.css';

const PROMPT    = '~/workspace $';
const CHAR_MS   = 68;
const OUT_MS    = 260;
const CMD_MS    = 500;
const START_MS  = 950;

const STEPS = [
  { kind: 'cmd', text: 'whoami' },
  { kind: 'out', text: 'Nadeem Shaik  ·  Full-Stack Engineer' },
  { kind: 'gap' },
  { kind: 'cmd', text: 'uptime' },
  { kind: 'out', text: '1+ years in production' },
  { kind: 'gap' },
  { kind: 'cmd', text: 'cat .expertise' },
  { kind: 'out', text: 'JavaScript  React  Node.js  Python  Go' },
  { kind: 'out', text: 'PostgreSQL  Docker  Kubernetes  Linux' },
  { kind: 'out', text: 'Quantum Computing' },
  { kind: 'gap' },
  { kind: 'cmd', text: 'current' },
  { kind: 'out', text: '→ Building this portfolio' },
  { kind: 'out', text: '→ Writing articles on React' },
  { kind: 'out', text: '→ Learning Go & Kubernetes' },
  { kind: 'out', text: '→ Shipping side projects' },
];

const TerminalWindow = () => {
  const [lines,    setLines]    = useState([]);
  const [typing,   setTyping]   = useState('');
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    const state   = { cancelled: false };
    const timers  = [];

    const schedule = (fn, ms) => {
      if (state.cancelled) return;
      const id = setTimeout(() => { if (!state.cancelled) fn(); }, ms);
      timers.push(id);
    };

    let stepIdx = 0;
    let charIdx = 0;

    const advance = () => {
      if (stepIdx >= STEPS.length) return;
      const step = STEPS[stepIdx];

      if (step.kind === 'cmd') {
        if (charIdx < step.text.length) {
          setTyping(step.text.slice(0, charIdx + 1));
          charIdx++;
          schedule(advance, CHAR_MS + Math.random() * 28);
        } else {
          setLines(prev => [...prev, { kind: 'cmd', text: step.text }]);
          setTyping('');
          charIdx  = 0;
          stepIdx++;
          schedule(advance, CMD_MS);
        }
      } else if (step.kind === 'out') {
        setLines(prev => [...prev, { kind: 'out', text: step.text }]);
        stepIdx++;
        schedule(advance, OUT_MS);
      } else if (step.kind === 'gap') {
        setLines(prev => [...prev, { kind: 'gap' }]);
        stepIdx++;
        schedule(advance, 60);
      }
    };

    const cursorTimer = setInterval(
      () => { if (!state.cancelled) setCursorOn(v => !v); },
      530
    );

    schedule(advance, START_MS);

    return () => {
      state.cancelled = true;
      clearInterval(cursorTimer);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="terminal" role="region" aria-label="Terminal demo">
      <div className="terminal__bar" aria-hidden="true">
        <div className="terminal__dots">
          <span className="terminal__dot terminal__dot--r" />
          <span className="terminal__dot terminal__dot--y" />
          <span className="terminal__dot terminal__dot--g" />
        </div>
        <span className="terminal__path">~/workspace</span>
      </div>

      <div className="terminal__body">
        {lines.map((line, i) => {
          if (line.kind === 'gap') return <div key={i} className="terminal__spacer" />;

          if (line.kind === 'cmd') return (
            <div key={i} className="terminal__row terminal__row--cmd">
              <span className="terminal__prompt" aria-hidden="true">{PROMPT}</span>
              <span className="terminal__cmd"> {line.text}</span>
            </div>
          );

          return (
            <div key={i} className="terminal__row terminal__row--out">
              <span className="terminal__out">{line.text}</span>
            </div>
          );
        })}

        {/* Active typing line — always visible */}
        <div className="terminal__row terminal__row--cmd" aria-hidden="true">
          <span className="terminal__prompt">{PROMPT}</span>
          <span className="terminal__cmd"> {typing}</span>
          <span className="terminal__cursor" style={{ opacity: cursorOn ? 0.9 : 0 }}>
            ▌
          </span>
        </div>
      </div>
    </div>
  );
};

export default TerminalWindow;
