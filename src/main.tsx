import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { agents, products } from './data';
import './styles.css';
import './overrides.css';

type Product = (typeof products)[number];
function ProductVisual({ product }: { product: Product }) {
  const [visible, setVisible] = React.useState(true);
  const src = `${import.meta.env.BASE_URL}${product.image.replace(/^\//, '')}`;
  return <div className={'visual ' + product.kind + ' ' + product.id}>
    {!visible && <div className="visual-label">PRODUCT SNAPSHOT <span>/{product.image.replace('/assets/', '')}</span></div>}
    {visible && <img className="product-image" src={src} alt={`${product.name} preview`} onError={() => setVisible(false)} />}
    {!visible && product.kind === 'agents' && <div className="agent-preview">{agents.slice(0, 6).map(agent => <span key={agent.id}>AGENT {String(agent.id).padStart(2, '0')}</span>)}</div>}
    {!visible && product.kind === 'image' && <div className="empty-shot"><span>SCREENSHOT<br />PLACEHOLDER</span><small>16:9 / ASSET READY</small></div>}
  </div>;
}
const SectionTitle = ({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) => <div className="section-title"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{children}</div>;
function App() {
  const [open, setOpen] = React.useState(false);
  return <>
    <header>
      <a className="brand" href="#top"><img src={`${import.meta.env.BASE_URL}favicon.png`} alt="" />KAC<span>KUPA</span></a>
      <button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
      <nav className={open ? 'open' : ''}>{[['Goal', '#goal'], ['Products', '#products']].map(([label, href]) => <a href={href} onClick={() => setOpen(false)} key={label}>{label}</a>)}</nav>
    </header>
    <main id="top">
      <section className="hero"><div className="hero-copy"><p className="eyebrow"><span className="dot" /> PUBLIC BUILD / 001</p><h1>Building products. Taking fees. Stacking the roll.</h1><p className="lede">Build products → Capture fees → Feed Srajtaśma. Keep stacking rolls.</p><a className="button" href="#products">Follow the build <ArrowUpRight size={16} /></a></div><img className="hero-scene" src={`${import.meta.env.BASE_URL}assets/hero-bunker.png`} alt="Pixel frog operating a crypto treasury bunker" /></section>
      <section className="flywheel"><p className="eyebrow">THE BASIC IDEA</p><div>{['BUILD', 'ACTIVITY', 'FEES', 'SRAJTAŚMA', 'COMPOUND'].map((item, i) => <React.Fragment key={item}><b>{item}</b>{i < 4 && <span>→</span>}</React.Fragment>)}</div></section>
      <section id="goal" className="goal"><div className="goal-art"><img src={`${import.meta.env.BASE_URL}assets/ecosystem-flow.png`} alt="Pixel-art ecosystem map feeding a central treasury vault" /></div><SectionTitle eyebrow="01 / THE GOAL" title="Build an ecosystem that runs autonomously." /><div className="goal-flow">PRODUCTS <span>→</span> FEES <span>→</span> LOCKED TREASURY <span>→</span> PRODUCTIVE ASSETS <span>→</span> DIVIDENDS / INCOME <span>→</span> GOVERNANCE TOKEN HOLDERS</div><div className="goal-progress">PROJECT-LED <span>→</span> AUTOMATED <span>→</span> AGENT-ASSISTED <span>→</span> GOVERNED <span>→</span> SELF-SUSTAINING</div><p className="goal-final">The destination is a self-sustaining ecosystem: products keep generating fees, the treasury keeps compounding, and governance-token holders receive the income it produces.</p></section>
      <section id="products"><SectionTitle eyebrow="02 / PRODUCTS" title="Built, used, then opened up."><p className="side-note">ReadSentence and the Degen Karts prototype are live, but neither generates fees yet. Interplanetary Miner is live. Caesar Engine is a work in progress. The Round Table is planned.</p></SectionTitle><div className="global-rule">WE BUILD IT <span>→</span> WE USE IT <span>→</span> YOU CAN LAUNCH YOUR OWN <span>→</span> THE TREASURY TAKES A CUT</div><div className="product-grid">{products.map(product => { const url = (product as Product & { url?: string }).url; return <article className="product" id={product.id} key={product.id}><ProductVisual product={product} /><div className="product-info"><div><span className={'status ' + product.tone}><i />{product.status}</span><h3>{product.name}</h3></div><p>{product.description}</p><div className="product-actions">{url && <a className="external-cta" href={url} target="_blank" rel="noreferrer">VISIT {product.name.toUpperCase()} <ArrowUpRight size={15} /></a>}<a href={'#' + product.id + '-details'} aria-label={'Read more about ' + product.name}>DETAILS <ArrowUpRight size={15} /></a></div></div><div className="product-details" id={product.id + '-details'}><span>{product.name.toUpperCase()}</span><p>{product.details}</p></div></article>; })}</div></section>
    </main>
  </>;
}
createRoot(document.getElementById('root')!).render(<App />);
