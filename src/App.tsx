import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { GenreProvider } from './hooks/useGenres';

import './styles/global.scss';

export function App() {
  return (
    <GenreProvider>
      <section className="app">
        <SideBar />
        <Content />
      </section>
    </GenreProvider>
  );
}
