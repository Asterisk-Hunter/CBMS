import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span 
          key={'full-' + i} 
          className="material-symbols-outlined !text-xl text-amber-400" 
          style={{fontVariationSettings: "'FILL' 1"}}
        >
          star
        </span>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <span 
          key="half" 
          className="material-symbols-outlined !text-xl text-amber-400" 
          style={{fontVariationSettings: "'FILL' 1"}}
        >
          star_half
        </span>
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span 
          key={'empty-' + i} 
          className="material-symbols-outlined !text-xl text-text-dark"
        >
          star
        </span>
      );
    }
    
    return stars;
  };

  return (
    <Link 
      to={'/movie/' + movie.movie_id}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl bg-card-dark shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1"
    >
      <div className="aspect-[2/3] w-full">
        <img 
          className="h-full w-full object-cover" 
          src={movie.poster_url} 
          alt={'Movie poster for ' + movie.title} 
        />
      </div>
      
      <div className="p-4 space-y-2">
        <h3 className="text-base font-bold text-white truncate">{movie.title}</h3>
        <p className="text-sm text-text-medium">{movie.genre}</p>
        <div className="flex items-center gap-1">
          {renderStars(movie.rating)}
        </div>
      </div>
      
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
        <span className="w-full flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-gradient-to-r from-primary-light to-primary-dark text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg hover:shadow-blue-500/50">
          <span className="truncate">View Details</span>
        </span>
      </div>
    </Link>
  );
}

export default MovieCard;
