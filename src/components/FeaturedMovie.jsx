function FeaturedMovie() {
  return (
    <div className="@container">
      <div 
        className="bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-80" 
        style={{
          backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 40%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBvebEjc_hrT9lg-JqzOMhQrpSra6ctY3xLlY4lnrqH8252hAOEjCle_4nfhrY2IolLHy154OO27fzAQtBZUNgbV4Vk16R9joe8k_ZWg8A9iBiMdCr3qzT4MD_t22HXeeh9H6aTyegva5LNieYuOcXhn3O3ZBTzJmibPngome8RWelFla98OUTGRND3-YmjsDVt-EbHTETlLgbObzP3VvMHgu8lXZHY_4pgpC7yX4HpUSa8kb9K8m4hJx5PY1IeaoIWZq0a7JofeGEA")'
        }}
      >
        <div className="flex flex-col p-8 space-y-4">
          <h1 className="text-white tracking-tight text-5xl font-black leading-tight max-w-xl">
            The Art of Racing in the Rain
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            A heartfelt tale about a witty and philosophical dog who shares his life's journey with his race car driving owner, Denny Swift.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FeaturedMovie;
