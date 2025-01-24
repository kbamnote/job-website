import React from 'react';

const HeroSection = () => {
  const stats = [
    {
      number: "12k+",
      title: "Clients worldwide",
      description: "At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum..."
    },
    {
      number: "20k+",
      title: "Active resume",
      description: "At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum..."
    },
    {
      number: "18k+",
      title: "Compnies",
      description: "At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum..."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12 mb-16">
        {/* Left side - Image */}
        <div className="lg:w-1/2">
          <div className="rounded-3xl overflow-hidden">
            <img 
              src="/assets/hero.png" 
              alt="Hero" 
              className="w-full h-full mx-auto"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <h1 className="text-5xl font-bold leading-tight mb-12">
            Good Life Begins With<br />
            A Good Company
          </h1>
          <p className="text-gray-600 mb-8">
            Ultricies purus dolor viverra mi laoreet at cursus justo. Ultrices purus diam egestas amet faucibus tempor blandit. Elit velit mauris aliquam est diam. Leo sagittis consectetur diam morbi erat aenean. Vulputate praesent congue faucibus in euismod feugiat euismod volutpat...
          </p>
          <div className="flex gap-4">
            <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors">
              Search Job
            </button>
            <button className="text-teal-500 hover:text-teal-600 transition-colors">
              Learn more
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="text-4xl font-bold text-teal-500 mb-4">
              {stat.number}
            </div>
            <h3 className="text-xl font-bold mb-3">
              {stat.title}
            </h3>
            <p className="text-gray-600">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;