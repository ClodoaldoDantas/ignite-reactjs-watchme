import { useGenres } from '../hooks/useGenres';
import { Button } from '../components/Button';

import '../styles/sidebar.scss';

export function SideBar() {
  const { genres, selectedGenreId, changeGenreId } = useGenres();

  function handleClickButton(genreId: number) {
    changeGenreId(genreId);
  }

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
