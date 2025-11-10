import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { movieService, showService, reviewService, authService } from '../services/database';
import Sidebar from './Sidebar';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [newReview, setNewReview] = useState({ rating: 5, review_text: '' });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    const movieData = movieService.getMovieById(id);
    if (!movieData) {
      navigate('/');
      return;
    }
    setMovie(movieData);
    
    const movieShows = showService.getShowsByMovie(id);
    setShows(movieShows);
    
    const movieReviews = reviewService.getMovieReviews(id);
    setReviews(movieReviews);
  }, [id, navigate, reviewSubmitted]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const result = reviewService.addReview({
      movie_id: parseInt(id),
      rating: newReview.rating,
      review_text: newReview.review_text
    });
    
    if (result.success) {
      setNewReview({ rating: 5, review_text: '' });
      setReviewSubmitted(!reviewSubmitted);
      alert('Review submitted successfully!');
    } else {
      alert(result.message);
    }
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`material-symbols-outlined ${interactive ? 'cursor-pointer hover:scale-110' : ''} text-2xl ${i <= rating ? 'text-amber-400' : 'text-gray-600'}`}
          style={{ fontVariationSettings: i <= rating ? "'FILL' 1" : "'FILL' 0" }}
          onClick={() => interactive && onRatingChange && onRatingChange(i)}
        >
          star
        </span>
      );
    }
    return stars;
  };

  if (!movie) {
    return (
      <div className="relative flex min-h-screen w-full bg-background-dark text-white">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 flex items-center justify-center">
          <p className="text-xl">Loading...</p>
        </main>
      </div>
    );
  }

  const currentUser = authService.getCurrentUser();
  const castMembers = movie.cast ? movie.cast.split(', ').map(name => ({ name, role: 'Actor' })) : [];

  return (
    <div className="relative flex min-h-screen w-full bg-background-dark">
      <Sidebar />

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Banner */}
          <div 
            className="relative bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-[400px] shadow-2xl" 
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 40%), url("${movie.poster_url}")`
            }}
          >
            <div className="flex flex-col p-8 gap-4">
              <h1 className="text-white tracking-light text-5xl font-bold leading-tight">{movie.title}</h1>
              <div className="flex items-center gap-2">
                {renderStars(Math.round(movie.rating))}
                <span className="text-white text-lg ml-2">{movie.rating}/5</span>
                <span className="text-gray-400 ml-2">({movie.review_count} reviews)</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-3 py-6 overflow-x-auto">
            {movie.genre.split(', ').map((tag) => (
              <div key={tag} className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-card-dark border border-border-dark px-4">
                <p className="text-gray-200 text-sm font-medium leading-normal">{tag}</p>
              </div>
            ))}
            <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-card-dark border border-border-dark px-4">
              <p className="text-gray-200 text-sm font-medium leading-normal">{movie.language}</p>
            </div>
            <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-card-dark border border-border-dark px-4">
              <p className="text-gray-200 text-sm font-medium leading-normal">{movie.duration_minutes} min</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="pb-3">
            <div className="flex border-b border-border-dark gap-8">
              <button 
                className={`flex flex-col items-center justify-center border-b-[3px] ${activeTab === 'overview' ? 'border-b-primary text-primary' : 'border-b-transparent text-gray-400 hover:border-b-gray-400'} pb-[13px] pt-4`}
                onClick={() => setActiveTab('overview')}
              >
                <p className="text-sm font-bold leading-normal tracking-[0.015em]">Overview</p>
              </button>
              <button 
                className={`flex flex-col items-center justify-center border-b-[3px] ${activeTab === 'shows' ? 'border-b-primary text-primary' : 'border-b-transparent text-gray-400 hover:border-b-gray-400'} pb-[13px] pt-4`}
                onClick={() => setActiveTab('shows')}
              >
                <p className="text-sm font-bold leading-normal tracking-[0.015em]">Showtimes</p>
              </button>
              <button 
                className={`flex flex-col items-center justify-center border-b-[3px] ${activeTab === 'reviews' ? 'border-b-primary text-primary' : 'border-b-transparent text-gray-400 hover:border-b-gray-400'} pb-[13px] pt-4`}
                onClick={() => setActiveTab('reviews')}
              >
                <p className="text-sm font-bold leading-normal tracking-[0.015em]">Reviews ({movie.review_count})</p>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="py-8">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Synopsis</h2>
                <p className="text-gray-300 leading-relaxed">
                  {movie.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-card-dark p-6 rounded-xl">
                  <div>
                    <h3 className="font-semibold text-white mb-2">Director</h3>
                    <p className="text-gray-300">{movie.director}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Release Date</h3>
                    <p className="text-gray-300">{new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Language</h3>
                    <p className="text-gray-300">{movie.language}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Duration</h3>
                    <p className="text-gray-300">{Math.floor(movie.duration_minutes / 60)}h {movie.duration_minutes % 60}m</p>
                  </div>
                </div>

                {/* Cast */}
                {castMembers.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-2xl font-bold text-white mb-6">Cast</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                      {castMembers.map((member) => (
                        <div key={member.name} className="flex flex-col items-center text-center bg-card-dark p-4 rounded-lg">
                          <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-full w-20 h-20 mb-3 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-4xl">person</span>
                          </div>
                          <p className="text-white font-medium text-sm">{member.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'shows' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Available Showtimes</h2>
                {shows.length === 0 ? (
                  <p className="text-gray-400">No shows available for this movie currently.</p>
                ) : (
                  <div className="space-y-4">
                    {shows.map((show) => (
                      <div key={show.show_id} className="bg-card-dark border border-border-dark rounded-xl p-6 hover:border-primary/50 transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-2">{show.theatre.name}</h3>
                            <p className="text-gray-400 text-sm mb-1">{show.theatre.address}</p>
                            <p className="text-gray-300 mb-2">
                              <span className="font-semibold">Screen:</span> {show.screen.name}
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">calendar_today</span>
                                <span className="text-white">{new Date(show.show_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">schedule</span>
                                <span className="text-white">{show.start_time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">event_seat</span>
                                <span className="text-white">{show.seats_available} seats available</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-3">
                            <div className="text-right">
                              <p className="text-gray-400 text-sm">From</p>
                              <p className="text-2xl font-bold text-white">${show.base_price.toFixed(2)}</p>
                            </div>
                            <Link
                              to={`/booking/${show.show_id}`}
                              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-light to-primary-dark text-white font-bold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all"
                            >
                              <span className="material-symbols-outlined mr-2">confirmation_number</span>
                              Book Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Add Review Form */}
                {currentUser && (
                  <div className="bg-card-dark border border-border-dark rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Write a Review</h3>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div>
                        <label className="text-white font-medium mb-2 block">Your Rating</label>
                        <div className="flex items-center gap-2">
                          {renderStars(newReview.rating, true, (rating) => setNewReview({ ...newReview, rating }))}
                        </div>
                      </div>
                      <div>
                        <label className="text-white font-medium mb-2 block">Your Review</label>
                        <textarea
                          value={newReview.review_text}
                          onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })}
                          className="w-full bg-background-dark border border-border-dark rounded-lg p-4 text-white focus:outline-none focus:border-primary"
                          rows="4"
                          placeholder="Share your thoughts about this movie..."
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-primary-light to-primary-dark text-white font-bold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all"
                      >
                        Submit Review
                      </button>
                    </form>
                  </div>
                )}

                {/* Reviews List */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">User Reviews</h3>
                  {reviews.length === 0 ? (
                    <p className="text-gray-400">No reviews yet. Be the first to review this movie!</p>
                  ) : (
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.review_id} className="bg-card-dark border border-border-dark rounded-xl p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="text-white font-bold">{review.user_name}</p>
                              <p className="text-gray-400 text-sm">
                                {new Date(review.review_time).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          {review.review_text && (
                            <p className="text-gray-300 leading-relaxed">{review.review_text}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MovieDetails;
