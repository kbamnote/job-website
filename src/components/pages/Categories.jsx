import React from "react";
import {
  Sprout,
  Hammer,
  ShoppingBag,
  HardHat,
  Building2,
  GraduationCap,
  Wallet,
  Bus,
} from "lucide-react";

const JobCategories = () => {
  const categories = [
    { icon: Sprout, title: "Agriculture", jobs: 1254 },
    { icon: Hammer, title: "Metal Production", jobs: 816 },
    { icon: ShoppingBag, title: "Commerce", jobs: 2082 },
    { icon: HardHat, title: "Construction", jobs: 1520 },
    { icon: Building2, title: "Hotels & Tourism", jobs: 1022 },
    { icon: GraduationCap, title: "Education", jobs: 1496 },
    { icon: Wallet, title: "Financial Services", jobs: 1529 },
    { icon: Bus, title: "Transport", jobs: 1244 },
  ];

  return (
    <div className="min-h-screen bg-teal-50/30">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Browse by Category</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.title}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-teal-50 mb-4">
                  <category.icon className="w-6 h-6 text-teal-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <span className="text-teal-500 bg-teal-50 px-3 py-1 rounded-full text-sm">
                  {category.jobs} jobs
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobCategories;
