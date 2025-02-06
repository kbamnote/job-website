import React from "react";

import {
  MonitorCheck ,
  
  DatabaseZap,
  ShoppingBag,
  UserSearch,
  WalletCards,
  
  Building2,
  GraduationCap,
  Wallet,
 
} from "lucide-react";

const JobCategories = () => {
  const categories = [
    { icon: MonitorCheck, title: "IT & Networking", jobs: 1254 },
    { icon: ShoppingBag, title: "Sales & Marketing", jobs: 816 },
    { icon: DatabaseZap, title: "Data Science", jobs: 2082 },
    { icon: UserSearch, title: "Customer Service", jobs: 1520 },
    { icon: Building2, title: "Digital Marketing", jobs: 1022 },
    { icon: GraduationCap, title: "Human Resource", jobs: 1496 },
    { icon: Wallet, title: "Project Manager", jobs: 1529 },
    { icon: WalletCards, title: "Accounting", jobs: 1244 },
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
