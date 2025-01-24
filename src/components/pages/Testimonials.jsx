import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      rating: 5,
      title: "Amazing services",
      content: "Metus faucibus sed turpis lectus feugiat tincidunt. Rhoncus sed tristique in dolor. Mus etiam et vestibulum venenatis",
      author: "Marco Kihn",
      role: "Happy Client",
      image: "/assets/Avatar.png"
    },
    {
      rating: 5,
      title: "Everything simple",
      content: "Mus etiam et vestibulum venenatis viverra ut. Elit morbi bibendum ullamcorper augue faucibus",
      author: "Kristin Hester",
      role: "Happy Client",
      image: "/assets/Avatar.png"
    },
    {
      rating: 5,
      title: "Awesome, thank you!",
      content: "Rhoncus sed tristique in dolor. Mus etiam et vestibulum venenatis viverra ut. Elit morbi bibendum ullamcorper augue faucibus. Nulla et tempor montes",
      author: "Zion Cisneros",
      role: "Happy Client",
      image: "/assets/Avatar.png"
    }
  ];

  return (
    <div className="bg-teal-50/30 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Testimonials from Our Cuctomers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum id...
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-8 relative border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-4">
                {testimonial.title}
              </h3>

              {/* Content */}
              <p className="text-gray-600 italic mb-8">
                {testimonial.content}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-gray-500">{testimonial.role}</div>
                </div>
              </div>

              {/* Quote mark */}
              <div className="absolute bottom-8 right-8 text-teal-500">
                <Quote className="w-8 h-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;