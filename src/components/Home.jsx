import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import FeaturedMovie from './FeaturedMovie';
import MovieGrid from './MovieGrid';
import { movieService } from '../services/database';

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const allMovies = movieService.getAllMovies();
    setMovies(allMovies);
  }, []);

  const nowShowing = movies.slice(0, 3);
  const recommended = movies;

  return (
    <div className="relative flex w-full min-h-screen">
      <Sidebar />
      
      <main className="flex-1">
        <Header />
        
        <div className="p-10 space-y-12">
          <FeaturedMovie />
          
          <MovieGrid 
            title="Now Showing" 
            movies={nowShowing}
          />
          
          <MovieGrid 
            title="Recommended For You" 
            movies={recommended}
          />
        </div>
      </main>
    </div>
  );
}

export default Home;
