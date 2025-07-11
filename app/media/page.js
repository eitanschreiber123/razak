import Image from "next/image";
import Link from "next/link";

export default function Media() {
  // Media features data from Linktree
  const articles = [
    {
      id: 1,
      title: "\"Your hair is surprisingly recyclable\" - National Geographic Environment",
      description: "National Geographic feature on hair recycling and its environmental benefits",
      link: "https://www.nationalgeographic.com/environment/article/recycle-human-hair-oil-spills-fertilizer",
      image: "/Images/Photos/BNK_0680.jpg"
    },
    {
      id: 2,
      title: "Inflight Magazine Feature - Paa by Precision Air",
      description: "Feature article in Tanzania's Precision Air inflight magazine",
      link: "https://issuu.com/landmarine/docs/paa_102_precision-air/18",
      image: "/Images/Photos/BNK_0678.jpg"
    },
    {
      id: 3,
      title: "From school project to fully-fledged business - The Citizen",
      description: "The journey of CutOff Recycle from a school project to a successful business",
      link: "https://www.thecitizen.co.tz/tanzania/magazines/success/-from-school-project-to-fully-fledged-business-3301092",
      image: "/Images/Photos/BNK_0674.jpg"
    }
  ];

  const videos = [
    {
      id: 1,
      title: "The Award Winning KIJANA LEO TV Programme",
      description: "Television feature on CutOff Recycle's innovative recycling solutions",
      link: "https://youtu.be/vy1xCaAFMXY?feature=shared",
      thumbnail: "/Images/Photos/BNK_0707.jpg"
    },
    {
      id: 2,
      title: "As Seen on CGTN",
      description: "CGTN coverage of CutOff Recycle's environmental impact",
      link: "https://youtu.be/OAC87Te3SUU",
      thumbnail: "/Images/Photos/BNK_0709.jpg"
    },
    {
      id: 3,
      title: "As Seen on Voice Of America",
      description: "Voice of America feature on sustainable solutions from CutOff Recycle",
      link: "#",
      thumbnail: "/Images/Photos/BNK_0711.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-brand-white font-mulish">      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-r from-brand-green-ultra-light to-white text-brand-black overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/Images/Photos/BNK_0680.jpg"
            alt="Media Coverage"
            fill
            className="object-cover opacity-20 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-brand-green-ultra-light/70"></div>
        </div>
        
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-pattern-waves opacity-5"></div>
        
        {/* Animated Elements */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-brand-green/10 blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-brand-green/20 blur-2xl animate-float-delay"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 rounded-full bg-brand-green/15 blur-xl animate-float-slow"></div>
        
        <div className="absolute top-20 right-20 w-24 h-24 rounded-full border border-brand-green/20 animate-spin-slow"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 rounded-full border border-brand-green/10 animate-spin-slow-reverse"></div>
        
        <div className="container mx-auto px-4 md:px-8 h-full flex flex-col justify-center items-center relative z-10">          <div className="w-full max-w-4xl mx-auto text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-brand-green text-white text-sm md:text-base font-semibold mb-4 backdrop-blur-sm animate-fade-in">In The News</span>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 animate-slide-up text-brand-black" style={{textShadow: '0 4px 10px rgba(0,0,0,0.05)'}}>
              Media <span className="text-brand-green relative inline-block">
                Coverage
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-brand-green/40 rounded-full"></span>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-brand-black/80 leading-relaxed animate-slide-up" style={{animationDelay: '0.1s'}}>
              CutOff Recycle in the press, documentaries, features, and recognition from around the world
            </p>
          </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center">
            <span className="text-brand-black/70 text-sm mb-2">Scroll to explore</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-24 bg-brand-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute inset-0 bg-circle-pattern opacity-5 bg-[length:40px_40px]"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-brand-green/10 text-brand-green text-sm font-medium mb-4">Press Coverage</span>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-black mb-6">
              Featured <span className="text-brand-green relative inline-block">
                Articles
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-brand-green/30 rounded-full"></span>
              </span>
            </h2>
            <p className="text-lg text-brand-black/70 max-w-2xl mx-auto leading-relaxed">
              Our innovations in hair waste recycling have been recognized by leading publications worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div 
                key={article.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-custom hover:shadow-custom-hover transition-all duration-500 transform hover:-translate-y-2 border border-brand-green/5"
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-brand-green/20 opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10"></div>
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3 text-brand-black group-hover:text-brand-green transition-colors duration-300 line-clamp-2">{article.title}</h3>
                  <p className="text-brand-black/70 mb-6 line-clamp-3">
                    {article.description}
                  </p>
                  <a 
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-brand-green font-semibold hover:opacity-80 transition-colors duration-300 group-hover:translate-x-1 transform transition-transform"
                  >
                    <span>Read Article</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos & Documentaries Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-circle-pattern opacity-5 bg-[length:30px_30px] rotate-45"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-brand-green/10 text-brand-green text-sm font-medium mb-4">Video Coverage</span>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-black mb-6">
              Media <span className="text-brand-green relative inline-block">
                Features & Documentaries
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-brand-green/30 rounded-full"></span>
              </span>
            </h2>
            <p className="text-lg text-brand-black/70 max-w-2xl mx-auto leading-relaxed">
              See our story and innovation featured on leading television networks and video platforms
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div 
                key={video.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-custom hover:shadow-custom-hover transition-all duration-500 transform hover:-translate-y-2 border border-brand-green/5"
              >
                <div className="relative h-56 group/thumbnail overflow-hidden">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-brand-black/50 group-hover:bg-brand-black/40 transition-all duration-500 flex items-center justify-center">
                    <a 
                      href={video.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative w-20 h-20 rounded-full bg-brand-green/80 flex items-center justify-center hover:bg-brand-green transition-colors duration-500 transform group-hover/thumbnail:scale-110"
                    >
                      <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-70"></span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white ml-1" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3 text-brand-black group-hover:text-brand-green transition-colors duration-300">{video.title}</h3>
                  <p className="text-brand-black/70 mb-6">
                    {video.description}
                  </p>
                  <a 
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-brand-green font-semibold hover:opacity-80 transition-colors duration-300"
                  >
                    <span>Watch Video</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>      {/* Investment CTA */}
      <section className="py-24 bg-brand-green-ultra-light text-brand-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-pattern-waves opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-brand-green/20 text-brand-green text-sm font-medium mb-6 backdrop-blur-sm">Growth Opportunity</span>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-brand-black">Interested in <span className="text-brand-green relative inline-block">
              Investing
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-brand-green/40 rounded-full"></span>
            </span>?</h2>
            
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-brand-black/80 leading-relaxed">
              View our investment profile and become part of our sustainable journey to transform waste into valuable agricultural products.
            </p>
            
            <div className="flex justify-center">
              <a 
                href="https://invest.somoafrica.org/public/2659/CUTOFF%20RECYCLE%20LIMITED"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-brand-green text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center"
              >
                <span>View Investment Profile</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span className="absolute -right-1 -top-1 w-3 h-3 bg-white rounded-full animate-ping opacity-75"></span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
