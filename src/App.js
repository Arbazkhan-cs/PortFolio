import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Phone, Linkedin, Github, ExternalLink, Code, Brain, Database, Cpu, Star, Calendar, MapPin, GraduationCap, Briefcase, User } from 'lucide-react';
import './App.css';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);

  const roles = ['AI/ML Developer', 'Deep Learning Engineer', 'AI Research Enthusiast', 'Innovation Creator'];

  useEffect(() => {
    const currentRole = roles[typingIndex];
    let charIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (charIndex <= currentRole.length) {
        setTypingText(currentRole.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setTypingIndex((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [typingIndex]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setIsScrolled(scrollTop > 50);
      setScrollProgress(scrollPercent);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
          
          // Update active section based on what's most visible
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        threshold: [0.1, 0.5, 0.9],
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setActiveSection(sectionId);
  };

  const skills = {
    languages: ['Python', 'Java', 'C++', 'C'],
    tools: ['NumPy', 'Pandas', 'Matplotlib', 'TensorFlow', 'PyTorch', 'Transformers', 'Scikit-Learn', 'LangChain', 'Groq', 'OpenAI'],
    databases: ['SQL', 'MongoDB'],
    deepLearning: ['NLP', 'LLM', 'Computer Vision', 'Fine-Tuning', 'Hugging Face', 'Generative AI', 'AI Agents', 'Neural Networks', 'CNN', 'RNN', 'Agentic RAG'],
    machineLearning: ['Linear Regression', 'Logistic Regression', 'Decision Tree'],
    additional: ['Data Structures', 'Algorithms', 'GitHub', 'Docker', 'Virtual Machines', 'Linux', 'AWS']
  };

  const projects = [
    {
      title: 'Language Translation (Transformer From Scratch)',
      description: 'Built an English-to-Hindi Transformer model from scratch implementing the original "Attention Is All You Need" architecture.',
      tech: ['Python', 'PyTorch', 'Pandas', 'NumPy', 'Matplotlib'],
      highlights: ['Transformer Architecture', 'Beam Search', 'Tokenization'],
      github: 'https://github.com/Arbazkhan-cs/Transformer-from-Scratch',
      demo: 'https://github.com/Arbazkhan-cs/Transformer-from-Scratch'
    },
    {
      title: 'AI-Powered ALEXA Using ESP32',
      description: 'Developed an AI-Based voice assistant using ESP32 with real-time communication between user and IoT devices.',
      tech: ['MicroPython', 'Custom API', 'ESP32', 'I2S Audio'],
      highlights: ['Speech-to-Text', 'Text-to-Speech', 'Hardware Integration'],
      github: 'https://github.com/tokylabs/Esp32-Speech2Speech-Project/',
      demo: 'https://github.com/tokylabs/Esp32-Speech2Speech-Project/'
    },
    {
      title: 'Mindo AI EdTech Platform',
      description: 'Platform that helps students in their study journey with AI-powered study tools such as playlist creation, Quiz generation, community, etc.',
      tech: ['Python', 'pydantic', 'langhchain', 'react', 'JS'],
      highlights: ['YT-Playlist', 'Quiz', 'Communities', 'ChatBot'],
      github: 'https://github.com/Arbazkhan-cs/Mindo-AIEducation',
      demo: 'https://app.mindo.easc01.com/playlist'
    },
    {
      title: 'Advanced AI Research Agent',
      description: 'An Advanced AI Research Agent able to respond using Llama 3 model, Google search, and research papers.',
      tech: ['Python', 'Llama3', 'ArXiv', 'Docker', 'Agentic RAG'],
      highlights: ['30% Query Speed Improvement', 'Docker Deployment', 'Hugging Face Integration'],
      github: '#',
      demo: 'https://huggingface.co/spaces/Arbazkhan-cs/Advance-Research-Agent'
    }
  ];

  const FloatingParticle = ({ delay = 0 }) => (
    <div 
      className="floating-particle"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${3 + Math.random() * 2}s`
      }}
    />
  );

  const GlowCursor = () => (
    <div
      className="glow-cursor"
      style={{
        left: mousePosition.x - 16,
        top: mousePosition.y - 16,
      }}
    />
  );

  return (
    <div className="portfolio-container">
      <GlowCursor />
      
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <FloatingParticle key={i} delay={i * 0.5} />
      ))}

      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-content">
            <div 
              className="navbar-logo"
              onClick={() => scrollToSection('home')}
            >
              PortFolio
            </div>
            
            {/* Desktop Navigation */}
            <div className="navbar-desktop">
              {[
                { id: 'home', label: 'Home', icon: User },
                { id: 'about', label: 'About', icon: User },
                { id: 'experience', label: 'Experience', icon: Briefcase },
                { id: 'projects', label: 'Projects', icon: Code },
                { id: 'skills', label: 'Skills', icon: Brain },
                { id: 'contact', label: 'Contact', icon: Mail }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`nav-item ${activeSection === item.id ? 'nav-item-active' : ''}`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                    
                    {/* Active indicator */}
                    {activeSection === item.id && (
                      <div className="nav-active-indicator"></div>
                    )}
                    
                    {/* Hover effect */}
                    <span className="nav-hover-effect"></span>
                  </button>
                );
              })}
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="hamburger">
                <span className={`hamburger-line ${isMobileMenuOpen ? 'line-1-active' : ''}`}></span>
                <span className={`hamburger-line ${isMobileMenuOpen ? 'line-2-active' : ''}`}></span>
                <span className={`hamburger-line ${isMobileMenuOpen ? 'line-3-active' : ''}`}></span>
              </div>
            </button>
          </div>
          
          {/* Mobile Navigation Menu */}
          <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
            <div className="mobile-menu-content">
              {[
                { id: 'home', label: 'Home', icon: User },
                { id: 'about', label: 'About', icon: User },
                { id: 'experience', label: 'Experience', icon: Briefcase },
                { id: 'projects', label: 'Projects', icon: Code },
                { id: 'skills', label: 'Skills', icon: Brain },
                { id: 'contact', label: 'Contact', icon: Mail }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`mobile-nav-item ${activeSection === item.id ? 'mobile-nav-item-active' : ''}`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      </nav>

      {/* Back to Top Button */}
      {isScrolled && (
        <button
          onClick={() => scrollToSection('home')}
          className="back-to-top"
        >
          <ChevronDown size={24} className="rotate-180" />
        </button>
      )}

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="hero-avatar">
            <div className="avatar-container">
              <div className="avatar-bg">
                <User size={80} className="avatar-icon" />
              </div>
            </div>
          </div>
          
          <h1 className="hero-title">
            Imran Khan
          </h1>
          
          <div className="hero-subtitle">
            <span className="typing-text">
              {typingText}
              <span className="typing-cursor">|</span>
            </span>
          </div>
          
          <p className="hero-description">
            Passionate about building intelligent systems and pushing the boundaries of artificial intelligence. 
            Specializing in LLMs, Computer Vision, and AI-powered applications.
          </p>
          
          <div className="hero-buttons">
            <a
              href="mailto:arbazkhaan.cs@gmail.com"
              className="btn btn-primary"
            >
              <Mail size={20} />
              Get In Touch
              <ExternalLink size={16} className="btn-icon" />
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('projects');
              }}
              className="btn btn-secondary"
            >
              <Code size={20} />
              View Projects
              <ChevronDown size={16} className="btn-icon" />
            </a>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`section ${isVisible.about ? 'section-visible' : ''}`}>
        <div className="container">
          <h2 className="section-title">
            About Me
          </h2>
          
          <div className="about-content">
            <div className="about-text">
              <p className="about-paragraph">
                I'm a passionate AI/ML developer currently pursuing my Bachelor's in Computer Application with 
                specialization in Artificial Intelligence at Maharaja Surajmal Institute, Delhi. With a stellar 
                CGPA of 9.4/10, I've dedicated myself to mastering the cutting-edge technologies that shape our future.
              </p>
              
              <p className="about-paragraph">
                My journey in AI has led me to work on fascinating projects from voice-controlled assistants to 
                transformer models built from scratch. I believe in the power of AI to solve real-world problems 
                and create meaningful impact.
              </p>
              
              <div className="about-badges">
                <div className="badge badge-blue">
                  <GraduationCap size={20} />
                  <span>BCA in AI (9.4 CGPA)</span>
                </div>
                <div className="badge badge-purple">
                  <MapPin size={20} />
                  <span>New Delhi, India</span>
                </div>
                <div className="badge badge-green">
                  <Brain size={20} />
                  <span>AI/ML Specialist</span>
                </div>
              </div>
            </div>
            
            <div className="about-contact">
              <div className="contact-card">
                <div className="contact-item">
                  <div className="contact-icon contact-icon-blue">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="contact-label">Phone</p>
                    <p className="contact-value">+91 995-353-2472</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon contact-icon-purple">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="contact-label">Email</p>
                    <p className="contact-value">arbazkhaan.cs@gmail.com</p>
                  </div>
                </div>
                
                <div className="contact-social">
                  <a href="https://linkedin.com/in/arbazkhan-cs" className="social-btn social-btn-blue">
                    <Linkedin size={24} />
                  </a>
                  <a href="https://github.com/arbazkhan-cs" className="social-btn social-btn-gray">
                    <Github size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`section ${isVisible.experience ? 'section-visible' : ''}`}>
        <div className="container">
          <h2 className="section-title">
            Experience
          </h2>
          
          <div className="experience-timeline">
            <div className="timeline-line"></div>
            
            <div className="experience-item">
              <div className="experience-card">
                <div className="experience-header">
                  <div className="experience-icon">
                    <Briefcase size={32} />
                  </div>
                  
                  <div className="experience-info">
                    <div className="experience-title-row">
                      <h3 className="experience-title">AI/ML Intern</h3>
                      <span className="experience-type">Remote</span>
                    </div>
                    
                    <div className="experience-company">
                      <span className="company-name">Tokyabs</span>
                      <span className="separator">•</span>
                      <span className="company-location">Xuhui District, Shanghai</span>
                    </div>
                    
                    <div className="experience-date">
                      <Calendar size={16} />
                      <span>August 2024 – November 2024</span>
                    </div>
                    
                    <div className="experience-tasks">
                      <div className="task-item">
                        <div className="task-bullet task-bullet-blue"></div>
                        <p>Built a voice-controlled AI assistant using ESP32 microcontroller with smart assistant features similar to Alexa.</p>
                      </div>
                      
                      <div className="task-item">
                        <div className="task-bullet task-bullet-purple"></div>
                        <p>Utilized LLMs to develop and optimize audio systems enabling real-time recording, speech-to-text, and text-to-speech capabilities.</p>
                      </div>
                      
                      <div className="task-item">
                        <div className="task-bullet task-bullet-pink"></div>
                        <p>Implemented Retrieval-Augmented Generation (RAG) pipeline to enhance assistant knowledge with external sources for context-aware responses.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`section ${isVisible.projects ? 'section-visible' : ''}`}>
        <div className="container">
          <h2 className="section-title">
            Featured Projects
          </h2>
          
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-header">
                  <div className="project-icon">
                    <Code size={24} />
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                </div>
                
                <p className="project-description">{project.description}</p>
                
                <div className="project-section">
                  <h4 className="project-section-title project-section-blue">Key Highlights:</h4>
                  <div className="project-tags">
                    {project.highlights.map((highlight, i) => (
                      <span key={i} className="tag tag-blue">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="project-section">
                  <h4 className="project-section-title project-section-purple">Technologies:</h4>
                  <div className="project-tags">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="tag tag-purple">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="project-buttons">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-small"
                  >
                    <ExternalLink size={16} />
                    {project.demo.includes('huggingface') ? 'Live Demo' : 'View Project'}
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-small"
                  >
                    <Github size={16} />
                    Source Code
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`section ${isVisible.skills ? 'section-visible' : ''}`}>
        <div className="container">
          <h2 className="section-title">
            Technical Skills
          </h2>
          
          <div className="skills-grid">
            <div className="skill-category skill-category-blue">
              <div className="skill-header">
                <Code size={24} />
                <h3>Programming Languages</h3>
              </div>
              <div className="skill-tags">
                {skills.languages.map((skill, i) => (
                  <span key={i} className="skill-tag skill-tag-blue">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="skill-category skill-category-purple">
              <div className="skill-header">
                <Brain size={24} />
                <h3>AI/ML Tools</h3>
              </div>
              <div className="skill-tags">
                {skills.tools.map((skill, i) => (
                  <span key={i} className="skill-tag skill-tag-purple">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="skill-category skill-category-green">
              <div className="skill-header">
                <Database size={24} />
                <h3>Databases</h3>
              </div>
              <div className="skill-tags">
                {skills.databases.map((skill, i) => (
                  <span key={i} className="skill-tag skill-tag-green">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="skill-category skill-category-pink skill-category-large">
              <div className="skill-header">
                <Cpu size={24} />
                <h3>Deep Learning & AI</h3>
              </div>
              <div className="skill-tags">
                {skills.deepLearning.map((skill, i) => (
                  <span key={i} className="skill-tag skill-tag-pink">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="skill-category skill-category-yellow">
              <div className="skill-header">
                <Star size={24} />
                <h3>Additional Skills</h3>
              </div>
              <div className="skill-tags">
                {skills.additional.map((skill, i) => (
                  <span key={i} className="skill-tag skill-tag-yellow">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`section ${isVisible.contact ? 'section-visible' : ''}`}>
        <div className="container">
          <h2 className="section-title">
            Let's Connect
          </h2>
          
          <div className="contact-content">
            <p className="contact-intro">
              I'm always excited to collaborate on innovative AI projects and discuss new opportunities. 
              Let's build something amazing together!
            </p>
            
            <div className="contact-grid">
              <a
                href="mailto:arbazkhaan.cs@gmail.com"
                className="contact-card-link contact-card-blue"
              >
                <Mail size={32} className="contact-card-icon" />
                <h3>Email</h3>
                <p>arbazkhaan.cs@gmail.com</p>
              </a>
              
              <a
                href="tel:+919953532472"
                className="contact-card-link contact-card-purple"
              >
                <Phone size={32} className="contact-card-icon" />
                <h3>Phone</h3>
                <p>+91 995-353-2472</p>
              </a>
              
              <div className="contact-card-link contact-card-green">
                <MapPin size={32} className="contact-card-icon" />
                <h3>Location</h3>
                <p>New Delhi, India</p>
              </div>
            </div>
            
            <div className="social-links">
              <a
                href="https://linkedin.com/in/Arbazkhan-cs"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link social-link-blue"
              >
                <Linkedin size={32} />
              </a>
              <a
                href="https://github.com/Arbazkhan-cs"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link social-link-gray"
              >
                <Github size={32} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>
            © 2024 Arbaz Khan. Crafted with passion for AI and innovation.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
