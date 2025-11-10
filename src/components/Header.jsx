function Header() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between whitespace-nowrap border-b border-solid border-border-dark px-10 py-3 bg-background-dark/80 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <label className="flex flex-col min-w-80 !h-10">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div className="text-text-medium flex border-none bg-card-dark items-center justify-center pl-4 rounded-l-lg border-r-0">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input 
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-card-dark focus:border-none h-full placeholder:text-text-medium px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" 
              placeholder="Search for movies, events & more" 
            />
          </div>
        </label>
        
        <div className="flex gap-3">
          <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-card-dark pl-4 pr-2 text-text-light">
            <p className="text-sm font-medium leading-normal">City</p>
            <span className="material-symbols-outlined">expand_more</span>
          </button>
          
          <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-card-dark pl-4 pr-2 text-text-light">
            <p className="text-sm font-medium leading-normal">Date</p>
            <span className="material-symbols-outlined">expand_more</span>
          </button>
          
          <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-card-dark pl-4 pr-2 text-text-light">
            <p className="text-sm font-medium leading-normal">Genre</p>
            <span className="material-symbols-outlined">expand_more</span>
          </button>
        </div>
      </div>
      
      <div className="flex flex-1 justify-end items-center gap-4">
        <div 
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" 
          style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAkbf9W3SA1nlZQ00x_0b5GbL0yKEmtZTkXPePzYtmbndnAGPUr7Gb50Q_hnC5XmYZSss2uLM1LAVmKbMYFyiT6tSFvCD1-zZB9WjeE_rgq7rzxs_7gKa5YJgUKIdMfzz5Rssv4GpSqlQ_DNUqUj8jw2DKPEws-5VhZUIcB8qjRvMvqWn9PfFKdLuFEfzVtzjh9nI3AsajdZJyZcbwDUNoPVmFA5OiI66S__Pjbi2n2Qq5aQRLmGOww-UQ7I6dXsB9kK-lUprSTkeu8")'}}
          aria-label="User profile avatar"
        />
      </div>
    </header>
  );
}

export default Header;
