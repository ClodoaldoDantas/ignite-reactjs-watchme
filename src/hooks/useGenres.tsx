import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { api } from '../services/api';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface GenreProviderProps {
  children: ReactNode;
}

interface GenreContextData {
  genres: GenreResponseProps[];
  selectedGenreId: number;
  selectedGenre: GenreResponseProps;
  changeGenreId: (id: number) => void;
}

const GenreContext = createContext({} as GenreContextData);

export function GenreProvider({ children }: GenreProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    });
  }, [selectedGenreId]);

  function changeGenreId(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <GenreContext.Provider
      value={{ genres, selectedGenreId, selectedGenre, changeGenreId }}
    >
      {children}
    </GenreContext.Provider>
  );
}

export function useGenres() {
  const context = useContext(GenreContext);
  return context;
}
