export default function Hero() {
  return (
    <section className="relative mt-20">
      <div className="relative h-[600px] lg:h-[700px] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/main-page.jpg"
            alt="Luxury fashion collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h2 className="text-5xl lg:text-7xl font-light tracking-wider mb-6">
              SPRING SUMMER 2026
            </h2>
            <p className="text-xl lg:text-2xl font-light tracking-wide mb-8 opacity-95">
              The New Collection
            </p>
            <a
              href="#"
              className="inline-block bg-white text-black px-10 py-4 text-sm tracking-widest font-light hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              DISCOVER
            </a>
          </div>
        </div>
      </div>

      <div className="relative h-[500px] lg:h-[600px] overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 mt-1">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/outfit-1.jpg"
            alt="Luxury accessories"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        </div>

        <div className="relative z-10 h-full flex items-end justify-start p-12 lg:p-20">
          <div className="text-white max-w-xl">
            <h3 className="text-4xl lg:text-6xl font-light tracking-wider mb-4">
              TIMELESS ELEGANCE
            </h3>
            <p className="text-lg font-light tracking-wide mb-6 opacity-90">
              Crafted with exceptional savoir-faire
            </p>
            <a
              href="#"
              className="inline-block border-2 border-white text-white px-8 py-3 text-sm tracking-widest font-light hover:bg-white hover:text-black transition-all duration-300"
            >
              EXPLORE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
