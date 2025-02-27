import React from 'react';
import adobe from '../../../assets/adobe.png'
import asana from '../../../assets/asana.png'
import linear from '../../../assets/linear.png'
import slack from '../../../assets/slack.png'
import spotify from '../../../assets/spotify.png'

const DyCompanyLogos = () => {
  const logos = [
    { src: spotify, alt: "Spotify" },
    { src: slack, alt: "Slack" },
    { src: adobe, alt: "Adobe" },
    { src: asana, alt: "Asana" },
    { src: linear, alt: "Linear" }
  ];

  return (
    <section className="hidden md:block py-8 md:py-12 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-12 items-center justify-items-center">
          {logos.map((logo, index) => (
            <div 
              key={index} 
              className="w-full flex items-center justify-center hover:opacity-80 transition-opacity duration-200"
            >
              <img 
                src={logo.src} 
                alt={logo.alt}
                className="max-w-[120px] w-full h-auto object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-200"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DyCompanyLogos;