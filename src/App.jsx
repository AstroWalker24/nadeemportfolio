import { Routes, Route } from 'react-router-dom';
import useCommandPalette from '@hooks/useCommandPalette';
import CommandPalette from '@components/CommandPalette/CommandPalette';
import CommandPaletteButton from '@components/CommandPaletteButton/CommandPaletteButton';
import MainLayout from '@layouts/MainLayout/MainLayout';
import { Home, CaseStudy, Writing, ArticleDetail, Contact } from '@pages';

const App = () => {
  const palette = useCommandPalette();

  return (
    <>
      <Routes>
        <Route element={<MainLayout onTogglePalette={palette.toggle} />}>
          <Route path="/"               element={<Home />} />
          <Route path="/work/:slug"     element={<CaseStudy />} />
          <Route path="/writing"        element={<Writing />} />
          <Route path="/writing/:slug"  element={<ArticleDetail />} />
          <Route path="/contact"         element={<Contact />} />
        </Route>
      </Routes>
      <CommandPalette {...palette} />
      <CommandPaletteButton onClick={palette.toggle} />
    </>
  );
};

export default App;
