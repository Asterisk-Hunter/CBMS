import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/database';

function Sidebar() {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col bg-background-dark p-4 border-r border-border-dark">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 py-3">
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" 
            style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCZHoq9fAH8GR38mibe6v9NFeaiQ8rkWTjWTkGGqjU9gCE5XDsvdd6mOfodD7TEtxGoz0_3-NKwZIShyu4N_CibeoTm_hs5guAo-AvGczohWlBmL5ow00eO7DjT41js5yKC6v-FevWXPi0b85mWpK-c1nbuiqPaoRVAMTmK8zjMHIRvOps75nRYqdO9tDYfDDSmK_FJdliFMDOgPBLpxXd8jRj7fVq8lk8A9FuPCZ6DPKxHQb45scBJnjtfH2Ul5TeCBVsC9EM3KrSL")'}}
            aria-label="CinemaSphere App Logo"
          />
          <div className="flex flex-col">
            <h1 className="text-white text-lg font-bold leading-normal">CinemaSphere</h1>
            {currentUser && (
              <p className="text-gray-400 text-xs">{currentUser.username}</p>
            )}
          </div>
        </div>
        
        <nav className="flex flex-col gap-2 mt-4">
          <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/20 text-primary-light">
            <span className="material-symbols-outlined !text-2xl text-primary-light" style={{fontVariationSettings: "'FILL' 1"}}>
              movie
            </span>
            <p className="text-primary-light text-sm font-bold leading-normal">Movies</p>
          </Link>

          <Link to="/my-tickets" className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-medium hover:bg-white/5">
            <span className="material-symbols-outlined !text-2xl">confirmation_number</span>
            <p className="text-sm font-medium leading-normal">My Tickets</p>
          </Link>
        </nav>
      </div>
      
      <div className="mt-auto flex flex-col gap-2">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-medium hover:bg-white/5 w-full text-left"
        >
          <span className="material-symbols-outlined !text-2xl">logout</span>
          <p className="text-sm font-medium leading-normal">Logout</p>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

