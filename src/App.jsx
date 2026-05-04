import { C } from './tokens.js';
import Nav      from './components/Nav.jsx';
import Hero     from './components/Hero.jsx';
import About    from './components/About.jsx';
import LifeChart from './components/LifeChart.jsx';
// import Work    from './components/Work.jsx';    — saved in Work.jsx,    restore when ready
// import Stories from './components/Stories.jsx'; — saved in Stories.jsx, restore when ready
// import Gallery from './components/Gallery.jsx'; — saved in Gallery.jsx, restore when ready
// import Footer  from './components/Footer.jsx';  — saved in Footer.jsx, restore when ready

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.ink, overflowX: 'hidden' }}>
      <Nav />
      <main style={{ paddingTop: 56 }}>
        <section id="hero">
          <Hero />
        </section>
        <About />
        <LifeChart />
        {/* <Work />    */}
        {/* <Stories /> */}
        {/* <Gallery /> */}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
