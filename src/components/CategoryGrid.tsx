export default function CategoryGrid() {
  const categories = [
    {
      title: 'WOMEN\'S FASHION',
      subtitle: 'Ready-to-Wear',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '#'
    },
    {
      title: 'MEN\'S COLLECTION',
      subtitle: 'Refined Elegance',
      image: 'https://images.pexels.com/photos/2897462/pexels-photo-2897462.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '#'
    },
    {
      title: 'JEWELRY',
      subtitle: 'Precious Creations',
      image: 'https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '#'
    },
    {
      title: 'WATCHES',
      subtitle: 'Exceptional Timepieces',
      image: 'https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '#'
    }
  ];

  return (
    <section className="max-w-screen-2xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <a
            key={index}
            href={category.link}
            className="group relative overflow-hidden bg-gray-100 aspect-[3/4]"
          >
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-xs tracking-widest mb-1 opacity-90">{category.subtitle}</p>
              <h3 className="text-xl font-light tracking-wider">{category.title}</h3>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs tracking-widest border-b border-white pb-1">
                  SHOP NOW
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
