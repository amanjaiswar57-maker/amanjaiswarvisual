const { useState, useEffect, useRef } = React;

// --- Icons ---
const PlayIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
);

const PauseIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
);

const VolumeIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
);

const MutedIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
);

const FullscreenIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
);

const SolidPlayIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
);

const ArrowRightIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);

const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const YoutubeIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);

const MailIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

const WhatsappIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

// --- Components ---

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{ background: scrolled ? 'rgba(8,8,8,0.95)' : 'linear-gradient(to bottom, rgba(8,8,8,0.8) 0%, rgba(8,8,8,0) 100%)', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
      <div className="font-sans font-bold tracking-widest text-lg" style={{ color: 'var(--text-primary)' }}>
        AMAN JAISWAR
      </div>
      <div className="nav-links">
        <a href="#work" className="nav-link">WORK</a>
        <a href="#services" className="nav-link">SERVICES</a>
        <a href="#about" className="nav-link">ABOUT</a>
        <a href="#contact" className="nav-link">CONTACT</a>
      </div>
      <div>
        <a href="https://wa.me/919125038406?text=Hi%20Aman%2C%20I%20would%20like%20to%20discuss%20a%20project!" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '0.75rem 1.5rem', fontSize: '0.75rem' }}>
          LET'S WORK TOGETHER
        </a>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-bg">
        <div className="video-placeholder">
           <img src="https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2071&auto=format&fit=crop" alt="Cinematic Hero" className="hero-bg-anim" style={{width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6}} />
        </div>
      </div>
      
      <div className="container flex flex-col items-center justify-center text-center animate-fade-up" style={{ zIndex: 10 }}>
        <p className="font-sans text-xs tracking-[0.3em] text-secondary uppercase mb-4" style={{ letterSpacing: '0.4em' }}>By Aman Jaiswar</p>
        <h1 className="font-serif text-6xl md:text-8xl mb-4" style={{ letterSpacing: '-0.02em', textShadow: '0 4px 30px rgba(0,0,0,0.8)', fontWeight: 600 }}>VISUAL CREATS</h1>
        <h2 className="font-sans text-sm tracking-widest text-accent mb-8 uppercase" style={{ letterSpacing: '0.3em', fontWeight: 500 }}>Filmmaker • Cinematographer • Editor</h2>
        <p className="font-serif text-2xl mb-12" style={{ maxWidth: '600px', fontWeight: 400, color: 'var(--text-primary)', fontStyle: 'italic' }}>
          I shoot. I edit. I turn ideas into visual stories.
        </p>
        
        <div className="flex gap-4">
          <a href="#showreel" className="btn btn-primary">WATCH SHOWREEL</a>
          <a href="https://wa.me/919125038406?text=Hi%20Aman%2C%20I%20would%20like%20to%20discuss%20a%20project!" target="_blank" rel="noopener noreferrer" className="btn btn-outline">START A PROJECT</a>
        </div>
      </div>
    </section>
  );
};

const Showreel = () => {
  return (
    <section id="showreel" className="py-24" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="container">
        <div className="flex flex-col items-center animate-fade-up">
          <div className="w-full relative" style={{ paddingBottom: '56.25%', backgroundColor: '#111', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
             <video 
               src="./showreel.mp4" 
               controls 
               playsInline
               autoPlay 
               muted 
               loop 
               style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover'}} 
             />
             {/* Note for Aman: If video is not playing, ensure you have placed a file named "showreel.mp4" in the folder */}
          </div>
        </div>
      </div>
    </section>
  );
};

const VideoPlayer = ({ src, poster, aspect = "landscape", title = "Project Video" }) => {
  const videoRef = useRef(null);
  const ambientRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const controlsTimeoutRef = useRef(null);

  const formatTime = (time) => {
    if (isNaN(time) || !isFinite(time) || time <= 0) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      // Pause any other playing videos on the page
      document.querySelectorAll('video').forEach(v => {
        if (v !== video && v !== ambientRef.current) {
          v.pause();
        }
      });

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Playback notice:", err.name);
          // If browser restricted unmuted autoplay, gracefully play muted
          if (err.name === 'NotAllowedError') {
            video.muted = true;
            setIsMuted(true);
            video.play().catch(() => {});
          }
        });
      }
    } else {
      video.pause();
    }
  };

  // Sync ambient video for portrait reels
  useEffect(() => {
    if (ambientRef.current && videoRef.current) {
      if (isPlaying) {
        ambientRef.current.currentTime = videoRef.current.currentTime;
        ambientRef.current.play().catch(() => {});
      } else {
        ambientRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleSeek = (e) => {
    if (e) e.stopPropagation();
    const track = e.currentTarget;
    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    if (videoRef.current && duration > 0) {
      const newTime = pct * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      if (ambientRef.current) {
        ambientRef.current.currentTime = newTime;
      }
    }
  };

  const handleMute = (e) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const handleFullscreen = (e) => {
    if (e) e.stopPropagation();
    const target = containerRef.current || videoRef.current;
    if (!target) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      if (target.requestFullscreen) {
        target.requestFullscreen().catch(() => {});
      } else if (target.webkitRequestFullscreen) {
        target.webkitRequestFullscreen();
      }
    }
  };

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full bg-black select-none overflow-hidden"
      onMouseEnter={() => {
        setIsHovering(true);
        setShowControls(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        if (isPlaying) setShowControls(false);
      }}
      onMouseMove={handleMouseMove}
      onClick={togglePlay}
      style={{ cursor: 'pointer' }}
    >
      {/* Ambient Blurred Background Layer for Portrait Reels */}
      {aspect === 'portrait' && (
        <video 
          ref={ambientRef}
          src={src}
          poster={poster}
          muted 
          playsInline 
          loop
          className="video-ambient-layer" 
          aria-hidden="true"
        />
      )}

      {/* Main Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        onPlay={() => {
          setIsPlaying(true);
          setIsBuffering(false);
        }}
        onPause={() => {
          setIsPlaying(false);
          setShowControls(true);
        }}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => setIsBuffering(false)}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
          setShowControls(true);
        }}
        onTimeUpdate={() => {
          if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration);
          }
        }}
        className="video-element-main"
      />

      {/* Center Cinematic Play Button (shown when paused) */}
      {!isPlaying && (
        <div className="center-play-wrapper">
          <button 
            type="button"
            className="center-play-btn"
            onClick={togglePlay}
            aria-label={`Play ${title}`}
          >
            <SolidPlayIcon className="w-8 h-8 ml-1" />
          </button>
        </div>
      )}

      {/* Buffering Indicator */}
      {isBuffering && isPlaying && (
        <div className="center-play-wrapper pointer-events-none">
          <div className="w-12 h-12 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
        </div>
      )}

      {/* Bottom Control Bar */}
      <div 
        className={`video-control-bar ${showControls || !isPlaying || isHovering ? 'opacity-100' : 'opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
        style={{ pointerEvents: showControls || !isPlaying || isHovering ? 'auto' : 'none' }}
      >
        {/* Scrubber Timeline */}
        <div 
          className="scrubber-track"
          onClick={handleSeek}
          title="Seek video"
        >
          <div 
            className="scrubber-fill"
            style={{ width: `${progressPct}%` }}
          />
          <div 
            className="scrubber-thumb"
            style={{ left: `${progressPct}%` }}
          />
        </div>

        {/* Action Buttons & Timecode */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={togglePlay} 
              className="ctrl-icon-btn"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <PauseIcon className="w-5 h-5" /> : <SolidPlayIcon className="w-5 h-5 ml-0.5" />}
            </button>
            <div className="font-sans text-xs tracking-wider" style={{ color: '#C0C0C0', minWidth: '85px', fontSize: '0.75rem' }}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={handleMute} 
              className="ctrl-icon-btn"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <MutedIcon className="w-5 h-5" /> : <VolumeIcon className="w-5 h-5" />}
            </button>
            <button 
              type="button"
              onClick={handleFullscreen} 
              className="ctrl-icon-btn"
              aria-label="Toggle Fullscreen"
            >
              <FullscreenIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, featured = false }) => {
  const isFeatured = featured;
  const isPortrait = project.aspect === "portrait";

  return (
    <div className={`project-card-wrap ${isFeatured ? 'md:col-span-2' : ''}`}>
      {/* Video Container with appropriate aspect ratio */}
      <div className={`project-media-frame ${isFeatured ? 'aspect-featured' : (isPortrait ? 'aspect-portrait' : 'aspect-landscape')}`}>
        <VideoPlayer 
          src={project.video} 
          poster={project.poster} 
          aspect={project.aspect} 
          title={project.title}
        />
      </div>

      {/* Structured, Flex-aligned Project Metadata */}
      <div className="project-card-meta">
        <div>
          <div className="project-title-row">
            <h3 className={`font-serif ${isFeatured ? 'text-3xl md:text-4xl' : 'text-2xl'} font-normal text-primary hover:text-accent transition-colors`}>
              {project.title}
            </h3>
            <span className="font-sans text-xs tracking-wider text-secondary uppercase font-mono">
              {project.year}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="project-badge-pill badge-accent font-semibold">
              {project.formatLabel || project.category}
            </span>
            <span className="text-xs text-secondary tracking-widest uppercase">
              • {project.category}
            </span>
          </div>

          {project.description && (
            <p className="text-sm text-secondary font-light mb-4" style={{ lineHeight: 1.6, color: '#A0A0A0' }}>
              {project.description}
            </p>
          )}
        </div>

        <div className="pt-3 border-t border-white border-opacity-10 mt-auto">
          <p className="text-xs text-secondary uppercase tracking-wider font-sans font-light" style={{ letterSpacing: '0.06em' }}>
            <span style={{ color: 'var(--accent)' }}>Role:</span> {project.role}
          </p>
        </div>
      </div>
    </div>
  );
};

const SelectedWork = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const projects = [
    { 
      id: 2,
      title: "Theme Reveal", 
      category: "Short Film", 
      role: "Cinematography, Video Editing, Color Grading, Directing", 
      year: "2026", 
      video: "./project2.mp4", 
      poster: "./project2-thumbnail.jpeg",
      aspect: "landscape",
      formatLabel: "16:9 Narrative Short",
      featured: false,
      description: "A cinematic narrative short film featuring intense atmospheric lighting, dynamic camera movement, and nuanced color grading."
    },
    { 
      id: 6,
      title: "Home Opening Reel", 
      category: "Reels & Lifestyle", 
      role: "Shoot, Videography & Video Editing", 
      year: "2026", 
      video: "./project6.mp4", 
      poster: "./project6-thumbnail.jpeg",
      aspect: "portrait",
      formatLabel: "9:16 Home Opening Reel",
      featured: false,
      description: "A warm, cinematic walkthrough film capturing the vibrant ambiance, interior aesthetics, and memorable moments of a new home opening."
    },
    { 
      id: 1,
      title: "Royal Enfield Hunter 350", 
      category: "Commercial Shoot", 
      role: "Cinematography, Editing & Color", 
      year: "2025", 
      video: "./project1.mp4",
      poster: "./project1-thumbnail.jpeg",
      aspect: "portrait",
      formatLabel: "9:16 Commercial Reel",
      featured: false,
      description: "High-octane commercial reel capturing the raw road presence and mechanical craft of the Hunter 350."
    },
    { 
      id: 3,
      title: "Event Reel", 
      category: "Event & Music", 
      role: "Cinematography, Video Editing, Color Grading", 
      year: "2026", 
      video: "./project3.mp4", 
      aspect: "portrait",
      formatLabel: "9:16 Dynamic Reel",
      featured: false,
      description: "Fast-paced rhythmic event edit featuring synchronized transitions, heavy bass drops, and crowd energy."
    },
    { 
      id: 4,
      title: "YT Song", 
      category: "Music Video", 
      role: "Cinematography, Video Editing, Color Grading, Directing", 
      year: "2025", 
      video: "./project4.mp4", 
      aspect: "landscape",
      formatLabel: "16:9 Music Video",
      featured: false,
      description: "Stylized widescreen music video with emotive lighting setups, creative performance shots, and polished pacing."
    },
    { 
      id: 5,
      title: "Car Delivery Shoot", 
      category: "Commercial Shoot", 
      role: "Video Editing, Color Grading", 
      year: "2026", 
      video: "./project5.mp4", 
      poster: "./project5-thumbnail.jpeg",
      aspect: "portrait",
      formatLabel: "9:16 Brand Reel",
      featured: false,
      description: "A celebratory commercial delivery film showcasing automotive curves, client excitement, and pristine finish."
    },
    { 
      id: 7,
      title: "Ganpati Aagman", 
      category: "Reels & Events", 
      role: "Cinematography & Video Editing", 
      year: "2026", 
      video: "./project7.mp4", 
      poster: "./project7-thumbnail.jpeg",
      aspect: "portrait",
      formatLabel: "9:16 Cultural Festival Reel",
      featured: false,
      description: "An energetic, devotion-filled celebratory reel capturing the grand arrival of Lord Ganesha with vibrant crowd dynamics, rhythmic pacing, and rich festival colors."
    },
    { 
      id: 8,
      title: "College Event", 
      category: "Cinematic Reel", 
      role: "Cinematography & Video Editing", 
      year: "2026", 
      video: "./project8.mp4", 
      poster: "./project8-thumbnail.jpeg",
      aspect: "landscape",
      formatLabel: "16:9 Cinematic Event Reel",
      featured: false,
      description: "A high-spirited cinematic recap capturing live campus energy, electrifying stage performances, and unscripted student moments."
    },
    { 
      id: 9,
      title: "Dahi Handi Reel", 
      category: "Reels & Events", 
      role: "Cinematography & Video Editing", 
      year: "2026", 
      video: "./project9.mp4", 
      poster: "./project9-thumbnail.jpeg",
      aspect: "portrait",
      formatLabel: "9:16 Festive Action Reel",
      featured: false,
      description: "A high-adrenaline festive showcase capturing towering human pyramids, water splashes, roaring crowds, and the triumphant handi-breaking moment."
    },
    { 
      id: 10,
      title: "Cinematic Reel", 
      category: "Cinematic", 
      role: "Cinematography & Video Editing", 
      year: "2025", 
      video: "./project10.mp4", 
      poster: "./project10-thumbnail.jpeg",
      aspect: "landscape",
      formatLabel: "16:9 Cinematic Visual Reel",
      featured: false,
      description: "A stylized visual showcase emphasizing artistic composition, dramatic lighting, fluid camera movement, and evocative color grading."
    }
  ];

  const filteredProjects = projects.filter(p => {
    if (activeCategory === "reels") return p.aspect === "portrait" || p.category.toLowerCase().includes('reel');
    if (activeCategory === "films") return p.aspect === "landscape" && !p.category.toLowerCase().includes('reel');
    return true;
  });

  return (
    <section id="work" className="py-24" style={{ backgroundColor: '#070707' }}>
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div style={{ width: '24px', height: '1px', backgroundColor: 'var(--accent)' }}></div>
              <h2 className="text-xs tracking-[0.25em] text-accent uppercase font-semibold">Selected Work</h2>
            </div>
            <h3 className="font-serif text-4xl md:text-5xl text-primary font-normal">Featured Projects</h3>
          </div>

          {/* Filter Category Tabs */}
          <div className="filter-tabs-nav">
            <button
              type="button"
              className={`filter-tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Projects ({projects.length})
            </button>
            <button
              type="button"
              className={`filter-tab-btn ${activeCategory === 'reels' ? 'active' : ''}`}
              onClick={() => setActiveCategory('reels')}
            >
              Reels & Commercials ({projects.filter(p => p.aspect === 'portrait' || p.category.toLowerCase().includes('reel')).length})
            </button>
            <button
              type="button"
              className={`filter-tab-btn ${activeCategory === 'films' ? 'active' : ''}`}
              onClick={() => setActiveCategory('films')}
            >
              Films & Music ({projects.filter(p => p.aspect === 'landscape' && !p.category.toLowerCase().includes('reel')).length})
            </button>
          </div>
        </div>
        
        {/* Balanced Grid: 2 equal columns, Project 2 and Project 6 divided evenly in Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {filteredProjects.map((p) => (
            <ProjectCard 
              key={p.id} 
              project={p} 
              featured={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const WorkCategories = () => {
  return (
    <section className="py-24" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="container">
        
        <div className="mb-24 pb-12 border-b border-white border-opacity-10">
          <div className="mb-6">
            <h2 className="font-sans text-xl md:text-2xl tracking-widest text-accent uppercase font-bold">Services & Expertise</h2>
          </div>
          <h3 className="font-serif text-5xl md:text-6xl text-primary leading-tight">From the first frame<br/>to the final cut.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Shoot */}
          <div>
            <h2 className="font-serif text-4xl mb-8">Shoot</h2>
            <div className="flex flex-col gap-4 text-secondary text-lg">
              <p className="hover:text-primary transition-fast cursor-pointer">Reels & Content</p>
              <div style={{ height: '1px', background: 'var(--border-color)', width: '100%' }}></div>
              <p className="hover:text-primary transition-fast cursor-pointer">Events and Concerts</p>
              <div style={{ height: '1px', background: 'var(--border-color)', width: '100%' }}></div>
              <p className="hover:text-primary transition-fast cursor-pointer">Cinematic Stories</p>
              <div style={{ height: '1px', background: 'var(--border-color)', width: '100%' }}></div>
              <p className="hover:text-primary transition-fast cursor-pointer">Commercial Shoots</p>
            </div>
          </div>
          
          {/* Edit */}
          <div>
            <h2 className="font-serif text-4xl mb-8">Edit</h2>
            <div className="flex flex-col gap-4 text-secondary text-lg">
              <p className="hover:text-primary transition-fast cursor-pointer">Professional Reels</p>
              <div style={{ height: '1px', background: 'var(--border-color)', width: '100%' }}></div>
              <p className="hover:text-primary transition-fast cursor-pointer">Short Films & Narrative</p>
              <div style={{ height: '1px', background: 'var(--border-color)', width: '100%' }}></div>
              <p className="hover:text-primary transition-fast cursor-pointer">YouTube & Long-form</p>
              <div style={{ height: '1px', background: 'var(--border-color)', width: '100%' }}></div>
              <p className="hover:text-primary transition-fast cursor-pointer">Music Videos & Performance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CompleteProjects = () => {
  return (
    <section className="py-24" style={{ borderTop: '1px solid var(--border-color)' }}>
      <div className="container text-center">
        <h2 className="text-sm tracking-widest text-secondary uppercase mb-6">From Shoot to Final Frame</h2>
        <h3 className="font-serif text-4xl mb-8" style={{ maxWidth: '800px', margin: '0 auto 2rem auto' }}>
          Projects where I handled both cinematography and editing to ensure the purest translation of idea to screen.
        </h3>
        <div className="flex items-center justify-center gap-4 text-sm tracking-widest text-accent uppercase font-medium">
          <span>Concept</span>
          <ArrowRightIcon className="w-4 h-4" />
          <span>Shoot</span>
          <ArrowRightIcon className="w-4 h-4" />
          <span>Edit</span>
          <ArrowRightIcon className="w-4 h-4" />
          <span>Final Film</span>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24" style={{ backgroundColor: 'var(--card-bg)' }}>
      <div className="container">
        <h2 className="text-sm tracking-widest text-secondary uppercase mb-12">Capabilities</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card">
            <h3 className="font-serif text-2xl mb-4 text-accent">Production</h3>
            <p className="text-sm text-secondary mb-6 line-height-relaxed">
              Capturing stunning visuals with cinematic framing and dynamic lighting. Specializing in reels, events, cinematics, and commercial shoots.
            </p>
          </div>
          <div className="card">
            <h3 className="font-serif text-2xl mb-4 text-accent">Post-Production</h3>
            <p className="text-sm text-secondary mb-6 line-height-relaxed">
              Crafting the story through pacing, sound design, color grading, and finishing. Delivering professional reels, short films, and music videos.
            </p>
          </div>
          <div className="card">
            <h3 className="font-serif text-2xl mb-4 text-accent">Creative Content</h3>
            <p className="text-sm text-secondary mb-6 line-height-relaxed">
              Developing visual concepts, establishing creative direction, and building story-driven content tailored for modern social media and digital platforms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { num: "01", title: "Discover", desc: "Understand the brand, audience, and core objective of the visual story." },
    { num: "02", title: "Concept", desc: "Develop the visual idea, gather references, and establish creative direction." },
    { num: "03", title: "Produce", desc: "Shoot cinematic footage with intentional framing, movement, and lighting." },
    { num: "04", title: "Edit", desc: "Shape the story through meticulous pacing, sound design, color grading, and finishing." }
  ];

  return (
    <section className="py-24">
      <div className="container">
        <h2 className="text-sm tracking-widest text-secondary uppercase mb-12">Creative Process</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '1.5rem' }}>
              <span className="text-accent text-lg font-serif italic mb-2 block">{step.num}</span>
              <h3 className="text-xl mb-4 uppercase tracking-wider font-medium">{step.title}</h3>
              <p className="text-sm text-secondary">{step.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <h3 className="font-serif text-3xl mb-6">Ready to create something?</h3>
          <a href="https://wa.me/919125038406?text=Hi%20Aman%2C%20I%20would%20like%20to%20discuss%20a%20project!" target="_blank" rel="noopener noreferrer" className="btn btn-primary">LET'S TALK</a>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24" style={{ backgroundColor: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        
        <div style={{ maxWidth: '900px', marginBottom: '100px' }}>
          <h3 className="font-serif text-6xl md:text-7xl mb-6 text-primary" style={{ fontWeight: 300, letterSpacing: '0.02em' }}>Aman Jaiswar</h3>
          <div style={{ width: '40px', height: '2px', backgroundColor: 'var(--accent)', marginBottom: '3rem' }}></div>
          
          <p className="text-xl md:text-2xl text-secondary mb-8 font-light" style={{ lineHeight: 1.8, color: '#E0E0E0' }}>
            Operating under his <strong className="text-primary font-medium">Visual Creats</strong>, Aman Jaiswar is a filmmaker, cinematographer, and editor focused on creating cinematic, engaging, and story-driven visual content. 
          </p>
          <p className="text-xl md:text-2xl text-secondary font-light" style={{ lineHeight: 1.8, color: '#E0E0E0' }}>
            From production to post-production, he works across short-form content, events, commercial visuals, cinematic films, and digital content. His approach blends technical precision with creative intuition to deliver work that looks premium and feels authentic.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '100px' }}>
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div style={{ width: '30px', height: '1px', backgroundColor: 'var(--accent)' }}></div>
              <h4 className="font-sans text-sm tracking-[0.2em] text-accent uppercase font-semibold">Core Skills</h4>
            </div>
            <ul className="flex flex-col gap-5 font-sans text-xl md:text-2xl text-secondary font-light" style={{ listStyle: 'none' }}>
              <li className="pb-4 border-b border-white border-opacity-10 hover:text-primary hover:border-opacity-30 transition-fast" style={{ cursor: 'default' }}>Cinematography</li>
              <li className="pb-4 border-b border-white border-opacity-10 hover:text-primary hover:border-opacity-30 transition-fast" style={{ cursor: 'default' }}>Video Editing</li>
              <li className="pb-4 border-b border-white border-opacity-10 hover:text-primary hover:border-opacity-30 transition-fast" style={{ cursor: 'default' }}>Color Grading</li>
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div style={{ width: '30px', height: '1px', backgroundColor: 'var(--accent)' }}></div>
              <h4 className="font-sans text-sm tracking-[0.2em] text-accent uppercase font-semibold">Software / Tools</h4>
            </div>
            <ul className="flex flex-col gap-5 font-sans text-xl md:text-2xl text-secondary font-light" style={{ listStyle: 'none' }}>
              <li className="pb-4 border-b border-white border-opacity-10 hover:text-primary hover:border-opacity-30 transition-fast" style={{ cursor: 'default' }}>Premiere Pro</li>
              <li className="pb-4 border-b border-white border-opacity-10 hover:text-primary hover:border-opacity-30 transition-fast" style={{ cursor: 'default' }}>After Effects</li>
              <li className="pb-4 border-b border-white border-opacity-10 hover:text-primary hover:border-opacity-30 transition-fast" style={{ cursor: 'default' }}>Capcut PC Pro</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 text-center relative" style={{ overflow: 'hidden' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(201,169,95,0.1) 0%, rgba(8,8,8,1) 70%)', zIndex: -1 }}></div>
      <div className="container">
        <h2 className="font-serif text-5xl md:text-7xl mb-6 tracking-wide">
          LET'S CREATE SOMETHING <br/>
          <span className="text-accent italic">THAT PEOPLE REMEMBER.</span>
        </h2>
        <p className="text-xl text-secondary mb-12 font-light" style={{ maxWidth: '600px', margin: '0 auto 3rem auto' }}>
          Have a project, brand, event, or idea in mind? <br/>Let's turn it into something worth watching.
        </p>
        
        <a href="https://wa.me/919125038406?text=Hi%20Aman%2C%20I%20would%20like%20to%20discuss%20a%20project!" target="_blank" rel="noopener noreferrer" className="btn btn-primary text-lg px-8 py-4 mb-16">START A PROJECT</a>
        
        <div className="flex justify-center gap-8">
          <a href={"https://www.instagram.com/_amann.__12?igsi=bHk2bWExZXplNmR4&utm_source=qr"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-secondary hover:text-primary transition-fast">
            <InstagramIcon /> <span className="uppercase tracking-widest text-sm">Instagram</span>
          </a>
          <a href="https://wa.me/919125038406?text=Hi%20Aman%2C%20I%20would%20like%20to%20discuss%20a%20project!" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-secondary hover:text-primary transition-fast">
            <WhatsappIcon /> <span className="uppercase tracking-widest text-sm">WhatsApp</span>
          </a>
          <a href={"https://mail.google.com/mail/?view=cm&fs=1&to=visualcreats57@gmail.com"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-secondary hover:text-primary transition-fast">
             <MailIcon /> <span className="uppercase tracking-widest text-sm">Email</span>
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12" style={{ borderTop: '1px solid var(--border-color)', backgroundColor: '#050505' }}>
      <div className="container flex flex-col items-center justify-center text-center gap-8">
        <div>
          <div className="font-sans font-bold tracking-widest mb-2">AMAN JAISWAR</div>
          <div className="text-xs text-secondary uppercase tracking-wider">Filmmaker • Cinematographer • Editor</div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm text-secondary uppercase tracking-wider">
          <a href="#work" className="hover:text-primary transition-fast">Work</a>
          <a href="#services" className="hover:text-primary transition-fast">Services</a>
          <a href="#about" className="hover:text-primary transition-fast">About</a>
          <a href="#contact" className="hover:text-primary transition-fast">Contact</a>
        </div>
        
        <div className="text-xs text-secondary">
          © {new Date().getFullYear()} Visual Creats by Aman Jaiswar. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  useEffect(() => {
    const handlePlay = (e) => {
      if (e.target.tagName === 'VIDEO') {
        // Do not pause when ambient background video syncs
        if (e.target.classList && e.target.classList.contains('video-ambient-layer')) {
          return;
        }

        const mainVideos = document.querySelectorAll('video:not(.video-ambient-layer)');
        mainVideos.forEach(video => {
          if (video !== e.target) {
            video.pause();
          }
        });
      }
    };
    document.addEventListener('play', handlePlay, true);
    return () => document.removeEventListener('play', handlePlay, true);
  }, []);

  return (
    <div>
      <Navigation />
      <Hero />
      <Showreel />
      <SelectedWork />
      <WorkCategories />
      <CompleteProjects />
      <Services />
      <Process />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
