import MovieCard from './MovieCard';

function MovieGrid({ title, movies }) {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
          {title}
        </h2>
        <div className="flex gap-2">
          <button className="size-9 rounded-full flex items-center justify-center bg-card-dark text-text-light hover:bg-white/20">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button className="size-9 rounded-full flex items-center justify-center bg-card-dark text-text-light hover:bg-white/20">
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default MovieGrid;
