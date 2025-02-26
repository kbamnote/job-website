import React from "react";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      rating: 5,
      title: "Amazing services",
      content:
        "I was struggling to find a job in my field, but this website made the process so much easier. The search filters are great, and I was able to find relevant openings quickly. I landed my dream job within a month! Thank you! - Sarah J., Marketing Professional",
      author: "Marco Kihn",
      role: "Happy Client",
      image: "/src/assets/Avatar.png",
    },
    {
      rating: 5,
      title: "Everything simple",
      content:
        "The resume builder tool was a lifesaver! It helped me create a professional resume that highlighted my skills and experience. I received so much more interest from employers after using it. - David L., Software Engineer",
      author: "Kristin Hester",
      role: "Happy Client",
      image: "/src/assets/Avatar.png",
    },
    {
      rating: 5,
      title: "Awesome, thank you!",
      content:
        "The resources and articles on the site were incredibly helpful. I learned so much about interview techniques and job search strategies. It gave me the confidence I needed to succeed. - John K., Recent Graduate",
      author: "Zion Cisneros",
      role: "Happy Client",
      image: "/src/assets/Avatar.png",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from job seekers who found success using our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-8 relative border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 sm:w-6 sm:h-6 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
                {testimonial.title}
              </h3>

              {/* Content */}
              <p className="text-gray-600 italic mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base flex-grow">
                {testimonial.content}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gray-300 object-cover"
                />
                <div>
                  <div className="font-semibold text-base sm:text-lg text-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>

              {/* Quote Icon */}
              <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 text-teal-500 opacity-30">
                <Quote className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;