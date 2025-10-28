export default function FeaturedCollections() {
  const collections = [
    {
      title: 'ICONIC MONOGRAM',
      description: 'A symbol of excellence and craftsmanship since 1854',
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alignment: 'left'
    },
    {
      title: 'SIGNATURE ACCESSORIES',
      description: 'Exquisite details that define sophistication',
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alignment: 'right'
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-light tracking-wider mb-4">
            FEATURED COLLECTIONS
          </h2>
          <p className="text-lg font-light text-gray-600 tracking-wide">
            Discover our most coveted pieces
          </p>
        </div>

        <div className="space-y-6">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="relative h-[500px] lg:h-[600px] overflow-hidden bg-gray-100"
            >
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent opacity-70"></div>

              <div
                className={`absolute inset-0 flex items-center ${
                  collection.alignment === 'left' ? 'justify-start' : 'justify-end'
                } p-12 lg:p-20`}
              >
                <div className={`text-white max-w-lg ${collection.alignment === 'right' ? 'text-right' : ''}`}>
                  <h3 className="text-4xl lg:text-6xl font-light tracking-wider mb-4">
                    {collection.title}
                  </h3>
                  <p className="text-lg font-light tracking-wide mb-8 opacity-90">
                    {collection.description}
                  </p>
                  <a
                    href="#"
                    className="inline-block border-2 border-white text-white px-8 py-3 text-sm tracking-widest font-light hover:bg-white hover:text-black transition-all duration-300"
                  >
                    VIEW COLLECTION
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-8 border border-gray-200 hover:border-gray-400 transition-colors">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h4 className="text-lg font-light tracking-wide mb-2">PERSONALIZATION</h4>
            <p className="text-sm text-gray-600 font-light leading-relaxed">
              Make your piece unique with our bespoke services
            </p>
          </div>

          <div className="text-center p-8 border border-gray-200 hover:border-gray-400 transition-colors">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h4 className="text-lg font-light tracking-wide mb-2">SECURE PAYMENT</h4>
            <p className="text-sm text-gray-600 font-light leading-relaxed">
              Shop with confidence using our encrypted checkout
            </p>
          </div>

          <div className="text-center p-8 border border-gray-200 hover:border-gray-400 transition-colors">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h4 className="text-lg font-light tracking-wide mb-2">COMPLIMENTARY DELIVERY</h4>
            <p className="text-sm text-gray-600 font-light leading-relaxed">
              Enjoy free shipping on all orders worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
