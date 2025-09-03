import { Newspaper } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Banner() {
  const [showContent, setShowContent] = useState(true);
  const videoRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Hide content after 3 seconds of video playing
      timeoutRef.current = setTimeout(() => {
        setShowContent(false);
      }, 3000);
    };

    const handlePause = () => {
      // Clear timeout and show content when video is paused
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setShowContent(true);
    };

    const handleEnded = () => {
      // Show content when video ends
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setShowContent(true);
    };

    // Add event listeners
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="relative text-white py-16" id="banner">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="https://player.cloudinary.com/embed/?cloud_name=dyaqzwked&public_id=venezuela_presentation_-_Made_with_Clipchamp_e6sldl&profile=cld-default" type="video/mp4" />
        {/* Fallback background image */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(/freepik__background__97912.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </video>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      {/* Content with fade transition */}
      <div className={`relative z-10 container mx-auto px-4 transition-opacity duration-1000 ${
        showContent ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="flex items-center justify-center space-x-4">
          <Newspaper className="w-12 h-12" />
          <h1 className="text-4xl font-bold">Noticias de Venezuela</h1>
        </div>
        <p className="text-center mt-4 text-blue-100">
          Mantente informado sobre las noticias de Venezuela desde el mundo.
        </p>
      </div>
    </div>
  );
}
