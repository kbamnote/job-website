import React from "react";

const SectionAbout = () => (
  <>
    <section className="w-auto h-60 bg-gray-900 text-white flex items-center justify-center">
      <h2 className="text-5xl font-bold">About Us</h2>
    </section>
    <section className="container mx-auto py-12 px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
        <div className="mb-8 lg:mb-0">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Et nunc ut tempus duis nisl sed massa
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Nunc sed a nisi purus, Nibh dis faucibus proin lacus tristique. Sit
            congue non vitae odio sit erat in, Felis eu ultrices a sed massa.
            Commodo fringilla sed tempor risus laoreet ultricies ipsum.
            Habitasse morbi faucibus in iaculis lectus.
          </p>
        </div>
        <div>
          <div className="rounded-lg overflow-hidden shadow-lg w-full">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="About Us"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  </>
);

export default SectionAbout;