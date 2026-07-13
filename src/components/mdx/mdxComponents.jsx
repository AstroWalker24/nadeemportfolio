import { useState, useRef } from 'react';
import cn from '@utils/cn';
import './mdxComponents.css';

// ── Code block with copy button ───────────────────────────────────
const CodeBlock = ({ children, ...props }) => {
  const preRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const code = preRef.current?.querySelector('code');
    if (!code) return;
    navigator.clipboard.writeText(code.textContent ?? '').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="mdx-pre-wrap">
      <button
        className={cn('mdx-copy', copied && 'mdx-copy--done')}
        onClick={handleCopy}
        aria-label={copied ? 'Copied to clipboard' : 'Copy code'}
      >
        {copied ? '✓ Copied' : 'Copy'}
      </button>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  );
};

// ── Heading with anchor link ──────────────────────────────────────
const makeHeading = (Tag, cls) =>
  function Heading({ id, children, ...props }) {
    return (
      <Tag id={id} className={cls} {...props}>
        {children}
        {id && (
          <a
            href={`#${id}`}
            className="mdx-anchor"
            aria-label="Link to this section"
            tabIndex={-1}
          >
            #
          </a>
        )}
      </Tag>
    );
  };

// ── External / internal links ─────────────────────────────────────
const MdxLink = ({ href = '', children, ...props }) => {
  const external = href.startsWith('http') || href.startsWith('//');
  return (
    <a
      href={href}
      className="mdx-link"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
    </a>
  );
};

// ── Blockquote ────────────────────────────────────────────────────
const MdxBlockquote = ({ children, ...props }) => (
  <blockquote className="mdx-blockquote" {...props}>
    {children}
  </blockquote>
);

// ── Responsive table ──────────────────────────────────────────────
const MdxTable = ({ children, ...props }) => (
  <div className="mdx-table-scroll">
    <table className="mdx-table" {...props}>
      {children}
    </table>
  </div>
);

// ── Component map — passed to <Component components={...} /> ──────
const mdxComponents = {
  pre:        CodeBlock,
  h2:         makeHeading('h2', 'mdx-h2'),
  h3:         makeHeading('h3', 'mdx-h3'),
  h4:         makeHeading('h4', 'mdx-h4'),
  a:          MdxLink,
  blockquote: MdxBlockquote,
  table:      MdxTable,
};

export default mdxComponents;
