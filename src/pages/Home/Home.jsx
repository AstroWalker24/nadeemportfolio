import Hero     from '@components/sections/Hero/Hero';
import Projects from '@components/sections/Projects/Projects';
import Articles from '@components/sections/Articles/Articles';
import Focus    from '@components/sections/Focus/Focus';
import Contact  from '@components/sections/Contact/Contact';
import './Home.css';

const Home = () => (
  <div className="home">
    <div id="hero">
      <Hero />
    </div>
    <div id="work">
      <Projects />
    </div>
    <div id="writing">
      <Articles />
    </div>
    <div id="focus">
      <Focus />
    </div>
    <div id="contact">
      <Contact />
    </div>
  </div>
);

export default Home;
