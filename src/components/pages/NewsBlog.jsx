import React from 'react';
import { ArrowRight } from 'lucide-react';

const NewsBlogSection = () => {
  const posts = [
    {
      category: "",
      date: "30 March 2024",
      title: "Revitalizing Workplace Morale: Innovative Tactics For Boosting Employee Engagement In 2024",
      image: "/assets/news.png",
    },
    {
      category: "Blog",
      date: "30 March 2024",
      title: "How To Avoid The Top Six Most Common Job Interview Mistakes",
      image: "/assets/news1.png",
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-4xl font-bold">News and Blog</h2>
        <a href="#" className="text-teal-500 hover:text-teal-600 transition-colors">
          View all
        </a>
      </div>

      <p className="text-gray-600 mb-8">
        Metus faucibus sed turpis lectus feugiat tincidunt. Rhoncus sed tristique in dolor
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post, index) => (
          <div key={index} className="flex flex-col">
            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden mb-4 aspect-[16/10]">
              
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="space-y-3">
              <span className="text-gray-500">
                {post.date}
              </span>
              <h3 className="text-2xl font-bold leading-tight">
                {post.title}
              </h3>
              <a 
                href="#" 
                className="inline-flex items-center text-teal-500 hover:text-teal-600 transition-colors"
              >
                Read more
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsBlogSection;