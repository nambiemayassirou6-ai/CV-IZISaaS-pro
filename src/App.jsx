
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Code2,
  Palette,
  Printer,
  Server,
  FileCheck,
  Send,
  CheckCircle2,
  Terminal,
  Menu,
  X,
  ArrowUpRight,
  MessageSquare,
  Award,
  Zap,
  Check
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef(null);
  const navbarRef = useRef(null);
  const heroRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Handle PDF Download with Confetti & Direct PDF File Serving
  const handleDownloadCV = (e) => {
    if (e) e.preventDefault();
    confetti({
      particleCount: 110,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#7B61FF', '#00F5D4', '#F0EFF4', '#A78BFA']
    });

    // Direct download of the professionally prepared PDF
    const link = document.createElement('a');
    link.href = '/CV-Nambiema-Yassirou.pdf';
    link.download = 'CV-Nambiema-Yassirou.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Contact Form Submit -> Opens WhatsApp with prefilled message
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Trigger celebration confetti
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#7B61FF', '#00F5D4', '#25D366']
    });

    setFormSubmitted(true);

    // Format pre-filled WhatsApp message
    const formattedText = `Bonjour Nambiema Yassirou,

Je vous contacte depuis votre CV en ligne :
• Nom : ${formData.name || 'Non précisé'}
• Email : ${formData.email || 'Non précisé'}
• Projet / Besoin : ${formData.message || 'Prise de contact'}

Au plaisir d'échanger avec vous !`;

    const encodedText = encodeURIComponent(formattedText);
    const whatsappUrl = `https://wa.me/22871432755?text=${encodedText}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4500);
  };

  useEffect(() => {
    // Scroll monitoring for Navbar morphing
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // GSAP animations in context
    const ctx = gsap.context(() => {
      // 1. Hero Animations (Stagger Fade-up)
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .from('.hero-badge', { y: 20, opacity: 0, duration: 0.8, delay: 0.1 })
        .from('.hero-avatar', { scale: 0.8, opacity: 0, duration: 0.9, ease: 'back.out(1.7)' }, '-=0.5')
        .from('.hero-title-name', { y: 40, opacity: 0, duration: 1 }, '-=0.6')
        .from('.hero-title-role', { y: 30, opacity: 0, duration: 0.9 }, '-=0.7')
        .from('.hero-stats-item', { y: 25, opacity: 0, duration: 0.8, stagger: 0.12 }, '-=0.6')
        .from('.hero-cta-btn', { y: 20, opacity: 0, duration: 0.7, stagger: 0.12 }, '-=0.5');

      // 2. About Section Animations
      gsap.from('.about-reveal', {
        scrollTrigger: {
          trigger: '#a-propos',
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // 3. Experience Timeline Cards (Slide-in left / right on desktop, smooth fade-in on mobile)
      gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        const isLeft = index % 2 === 0;
        const isMobile = window.innerWidth < 768;

        gsap.from(item.querySelector('.timeline-card'), {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
          x: isMobile ? 0 : (isLeft ? -45 : 45),
          y: isMobile ? 30 : 0,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out'
        });

        // Timeline dot pulse
        gsap.from(item.querySelector('.timeline-dot'), {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(2)'
        });
      });

      // 4. Skills Dashboard Circle Animations & Counters
      const skillCards = gsap.utils.toArray('.skill-meter-card');
      skillCards.forEach((card) => {
        const percent = parseInt(card.getAttribute('data-percent') || '0', 10);
        const circle = card.querySelector('.skill-circle-progress');
        const counter = card.querySelector('.skill-counter');

        if (circle) {
          const circumference = 2 * Math.PI * 40; // r=40 -> ~251.3
          circle.style.strokeDasharray = `${circumference}`;
          circle.style.strokeDashoffset = `${circumference}`;

          gsap.to(circle, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
            strokeDashoffset: circumference - (circumference * percent) / 100,
            duration: 1.5,
            ease: 'power2.inOut'
          });
        }

        if (counter) {
          const obj = { val: 0 };
          gsap.to(obj, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
            val: percent,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => {
              counter.textContent = `${Math.round(obj.val)}%`;
            }
          });
        }
      });

      // 5. Education Cards Stagger
      gsap.from('.education-card', {
        scrollTrigger: {
          trigger: '#formation',
          start: 'top 85%',
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out'
      });

      // 6. Contact Section Elements
      gsap.from('.contact-reveal', {
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 85%',
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out'
      });

    }, containerRef);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  const experiences = [
    {
      period: "2024 — PRÉSENT",
      role: "Responsable Informatique Principal",
      company: "Entreprise & Systèmes d'Information",
      description: "Supervision intégrale de l'infrastructure informatique et de la sécurité des systèmes. Déploiement de solutions d'automatisation logicielle, optimisation des réseaux locaux et support technique de haut niveau.",
      tags: ["Systèmes & Réseaux", "Maintenance Informatique", "Automatisation", "Support IT"]
    },
    {
      period: "2023 — 2024",
      role: "Lead Infographe & Spécialiste Sérigraphie",
      company: "Atelier Graphique & Studio Print",
      description: "Direction artistique et conception d'identités visuelles complètes pour entreprises et événements. Maîtrise de la séparation quadrichromique, création de typons et pilotage de la chaîne de tirage sérigraphique de haute précision.",
      tags: ["Adobe Suite", "PAO", "Séparation Quadrichromique", "Sérigraphie Textile & Rigide"]
    },
    {
      period: "2022 — 2023",
      role: "Développeur Frontend & Vibe Coder",
      company: "Studio Digital & Projets Freelance",
      description: "Conception et développement d'applications web réactives et de sites vitrines interactifs. Intégration d'architectures modernes basées sur React et Tailwind CSS avec des animations cinématographiques sur-mesure.",
      tags: ["React 19", "JavaScript", "Tailwind CSS", "GSAP Animations", "UI/UX"]
    }
  ];

  const skills = [
    {
      name: "Infographie & PAO",
      percent: 95,
      category: "Design Visuel",
      icon: Palette,
      description: "Conception de chartes graphiques, retouche d'image, vectorisation et préparation pour impression.",
      tools: ["Illustrator", "Photoshop", "InDesign", "Vectorisation"]
    },
    {
      name: "Vibe Coding & Frontend Web",
      percent: 92,
      category: "Développement",
      icon: Code2,
      description: "Création d'interfaces web réactives, intégration dynamique de maquettes et animations interactives.",
      tools: ["React 19", "Tailwind CSS", "GSAP", "Vite", "JavaScript"]
    },
    {
      name: "Sérigraphie & Tirage Technique",
      percent: 90,
      category: "Production Print",
      icon: Printer,
      description: "Flashage, séparation des couleurs, préparation des écrans et impression multi-supports.",
      tools: ["Tirage textile", "Supports rigides", "Quadrichromie", "Tons directs"]
    },
    {
      name: "Informatique Avancée & Systèmes",
      percent: 88,
      category: "Infrastructure",
      icon: Server,
      description: "Gestion de parcs informatiques, maintenance préventive/curative, configuration réseaux et serveurs.",
      tools: ["Maintenance PC/Mac", "Réseaux LAN/WAN", "Sécurité", "Dépannage"]
    },
    {
      name: "Transit, Douane & Procédures",
      percent: 85,
      category: "Gestion & Rigueur",
      icon: FileCheck,
      description: "Maîtrise des procédures douanières, gestion documentaire internationale et coordination logistique.",
      tools: ["Réglementation douanière", "Suivi logistique", "Conformité", "Rigueur"]
    }
  ];

  const education = [
    {
      year: "2025 — 2026",
      degree: "Spécialisation Supérieure en Infographie & Sérigraphie",
      institution: "Institut Professionnel des Arts Graphiques & Métiers d'Art",
      detail: "Perfectionnement avancé en design graphique appliqué, techniques d'impression industrielle et gestion de studio créatif."
    },
    {
      year: "2023 — 2024",
      degree: "Diplôme en Informatique Avancée & Systèmes Numériques",
      institution: "Centre de Formation Technique & Informatique",
      detail: "Architecture matérielle, administration des réseaux, maintenance logicielle approfondie et initiation aux technologies web."
    },
    {
      year: "2021 — 2022",
      degree: "Formation Certifiante en Transit & Douane",
      institution: "Académie Professionnelle du Commerce & de la Logistique",
      detail: "Procédures de dédouanement import/export, déclarations douanières, incoterms et gestion documentaire rigoureuse."
    },
    {
      year: "2019 — 2021",
      degree: "Baccalauréat Scientifique & Technique (BAC 2)",
      institution: "Enseignement Secondaire Général & Technique",
      detail: "Bases solides en mathématiques, sciences appliquées et raisonnement analytique."
    }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0A0A14] text-[#F0EFF4] font-sans selection:bg-[#7B61FF] selection:text-white overflow-x-hidden">

      {/* Background Neon Ambient Blobs */}
      <div className="pointer-events-none fixed -top-32 -left-32 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-[#7B61FF]/15 rounded-full blur-[120px] sm:blur-[140px] z-0" />
      <div className="pointer-events-none fixed top-1/2 -right-32 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-[#9B86FF]/10 rounded-full blur-[130px] sm:blur-[160px] z-0" />
      <div className="pointer-events-none fixed -bottom-32 left-1/4 w-80 sm:w-[600px] h-80 sm:h-[600px] bg-[#00F5D4]/10 rounded-full blur-[140px] sm:blur-[180px] z-0" />

      {/* ========================================================================= */}
      {/* A. NAVBAR — "La Signature Flottante"                                     */}
      {/* ========================================================================= */}
      <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-3 sm:px-4">
        <nav
          ref={navbarRef}
          className={`flex items-center justify-between gap-4 sm:gap-6 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full transition-all duration-500 max-w-4xl w-full ${scrolled
            ? 'bg-[#0A0A14]/90 backdrop-blur-xl border border-[#7B61FF]/30 shadow-aura-glow shadow-black/60'
            : 'bg-[#12121F]/60 backdrop-blur-md border border-white/10'
            }`}
        >
          {/* Logo / Monogramme */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#7B61FF] to-[#00F5D4] flex items-center justify-center font-bold text-white text-xs sm:text-sm shadow-aura-button transition-transform duration-300 group-hover:scale-110">
              NY
            </span>
            <span className="font-semibold text-xs sm:text-sm tracking-wide text-white group-hover:text-[#7B61FF] transition-colors">
              Nambiema <span className="text-[#7B61FF]">.</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-7 text-xs font-mono uppercase tracking-wider text-[#8F8EA8]">
            <a href="#a-propos" className="hover:text-white transition-colors hover-lift">À Propos</a>
            <a href="#experiences" className="hover:text-white transition-colors hover-lift">Expériences</a>
            <a href="#competences" className="hover:text-white transition-colors hover-lift">Compétences</a>
            <a href="#formation" className="hover:text-white transition-colors hover-lift">Formation</a>
            <a href="#contact" className="hover:text-white transition-colors hover-lift">Contact</a>
          </div>

          {/* Download CTA Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={handleDownloadCV}
              className="magnetic-btn flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#7B61FF] to-[#9B86FF] text-white text-xs font-medium tracking-wide shadow-aura-button hover:opacity-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Télécharger CV (PDF)</span>
            </button>
          </div>

          {/* Mobile Actions: Mini Download + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleDownloadCV}
              className="p-2 rounded-full bg-[#7B61FF]/20 border border-[#7B61FF]/40 text-[#A78BFA] hover:text-white"
              title="Télécharger CV (PDF)"
              aria-label="Télécharger CV"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-white/90 hover:text-white focus:outline-none"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#7B61FF]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed top-20 left-3 right-3 bg-[#10101E]/95 backdrop-blur-2xl border border-[#7B61FF]/40 rounded-[2rem] p-6 shadow-2xl flex flex-col gap-3.5 z-50 animate-in fade-in zoom-in-95 duration-200">
            <a
              href="#a-propos"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-mono uppercase tracking-wider py-2 text-white/90 hover:text-[#7B61FF] border-b border-white/5 flex items-center justify-between"
            >
              <span>À Propos</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8F8EA8]" />
            </a>
            <a
              href="#experiences"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-mono uppercase tracking-wider py-2 text-white/90 hover:text-[#7B61FF] border-b border-white/5 flex items-center justify-between"
            >
              <span>Expériences</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8F8EA8]" />
            </a>
            <a
              href="#competences"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-mono uppercase tracking-wider py-2 text-white/90 hover:text-[#7B61FF] border-b border-white/5 flex items-center justify-between"
            >
              <span>Compétences</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8F8EA8]" />
            </a>
            <a
              href="#formation"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-mono uppercase tracking-wider py-2 text-white/90 hover:text-[#7B61FF] border-b border-white/5 flex items-center justify-between"
            >
              <span>Formation</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8F8EA8]" />
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-mono uppercase tracking-wider py-2 text-white/90 hover:text-[#7B61FF] border-b border-white/5 flex items-center justify-between"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8F8EA8]" />
            </a>
            <button
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleDownloadCV(e);
              }}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-gradient-to-r from-[#7B61FF] to-[#9B86FF] text-white text-xs font-semibold tracking-wide shadow-aura-button mt-2"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger le CV (PDF Complet)</span>
            </button>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* B. SECTION HERO — "La Première Impression"                                */}
      {/* ========================================================================= */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-24 sm:pt-28 pb-16 px-4 text-center z-10"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center w-full">

          {/* Status Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#161626] border border-[#7B61FF]/30 text-[11px] sm:text-xs font-mono text-[#A78BFA] mb-6 sm:mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-pulse" />
            <span>DISPONIBLE POUR PROJETS & MISSIONS</span>
          </div>

          {/* Profile Avatar / Photo Placeholder */}
          <div className="hero-avatar relative mb-6 sm:mb-8 group">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-[#12121F] to-[#1E1E34] border-2 border-[#7B61FF] p-1.5 shadow-aura-glow transition-transform duration-500 group-hover:scale-105">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1E1E34] via-[#12121F] to-[#0A0A14] flex flex-col items-center justify-center text-white border border-[#7B61FF]/30 overflow-hidden">
                <span className="font-bold text-3xl sm:text-4xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F0EFF4] to-[#7B61FF]">
                  NY
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-[#8F8EA8] tracking-widest uppercase mt-0.5">
                  CREATIVE
                </span>
              </div>
            </div>
            {/* Glow dot indicator */}
            <div className="absolute bottom-1 right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0A0A14] flex items-center justify-center border border-[#7B61FF]/50 shadow-md">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#00F5D4]" />
            </div>
          </div>

          {/* Full Name (Massive Sora Sans) */}
          <h1 className="hero-title-name text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-3 leading-[1.1] sm:leading-[1.05]">
            Nambiema{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B61FF] via-[#9B86FF] to-[#00F5D4] drop-shadow-[0_0_35px_rgba(123,97,255,0.45)]">
              Yassirou
            </span>
          </h1>

          {/* Professional Title in Serif Italic (Instrument Serif) */}
          <p className="hero-title-role font-serif italic text-xl sm:text-3xl md:text-4xl text-[#A78BFA] font-normal mb-6 sm:mb-8 max-w-2xl tracking-wide px-2">
            Infographe, Sérigraphe & Développeur
          </p>

          {/* 3 Stats in Monospace */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-6 text-xs sm:text-sm font-mono text-[#8F8EA8] mb-8 sm:mb-10 px-3 sm:px-5 py-2.5 sm:py-3 rounded-[1.8rem] sm:rounded-[2rem] bg-[#12121F]/60 border border-white/5 backdrop-blur-md">
            <div className="hero-stats-item flex items-center gap-1.5 sm:gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#7B61FF]" />
              <span className="text-white font-semibold">3+ Ans</span>
              <span className="text-[11px] sm:text-xs">d'expérience</span>
            </div>
            <span className="text-white/20">|</span>
            <div className="hero-stats-item flex items-center gap-1.5 sm:gap-2">
              <Zap className="w-3.5 h-3.5 text-[#00F5D4]" />
              <span className="text-white font-semibold">30+ Projets</span>
              <span className="text-[11px] sm:text-xs">livrés</span>
            </div>
            <span className="text-white/20">|</span>
            <div className="hero-stats-item flex items-center gap-1.5 sm:gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#9B86FF]" />
              <span className="text-white font-semibold">Lomé</span>
              <span className="text-[11px] sm:text-xs">& Monde</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
            <button
              onClick={handleDownloadCV}
              className="hero-cta-btn magnetic-btn w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#7B61FF] to-[#9B86FF] text-white font-semibold text-sm shadow-aura-button hover:opacity-95"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger mon CV (PDF)</span>
            </button>
            <a
              href="#contact"
              className="hero-cta-btn magnetic-btn w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 sm:py-4 rounded-full bg-[#161626] border border-[#7B61FF]/40 text-white font-semibold text-sm hover:bg-[#1E1E34] hover:border-[#7B61FF]"
            >
              <span>Me contacter</span>
              <ArrowUpRight className="w-4 h-4 text-[#7B61FF]" />
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* C. SECTION À PROPOS — "Le Manifeste Personnel"                           */}
      {/* ========================================================================= */}
      <section id="a-propos" className="relative py-20 sm:py-28 px-3.5 sm:px-4 z-10">
        <div className="max-w-5xl mx-auto">

          <div className="about-reveal bg-[#12121F]/80 border border-[#7B61FF]/20 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-12 lg:p-16 backdrop-blur-xl shadow-aura-card">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

              {/* Left Column: Title and Manifesto Lead */}
              <div className="lg:col-span-5 flex flex-col">
                <span className="text-xs font-mono uppercase tracking-widest text-[#7B61FF] mb-2 flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" /> 01. À PROPOS
                </span>
                <h2 className="font-serif italic text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight mb-3 sm:mb-4">
                  Le Manifeste Personnel
                </h2>
                <p className="text-xs sm:text-sm font-mono text-[#8F8EA8] leading-relaxed">
                  L'union de la matière graphique, du tirage d'art et du génie numérique.
                </p>
                <div className="w-16 h-1 bg-gradient-to-r from-[#7B61FF] to-[#00F5D4] rounded-full mt-4 sm:mt-6" />
              </div>

              {/* Vertical Separator for Desktop */}
              <div className="hidden lg:block w-[1px] h-64 bg-gradient-to-b from-transparent via-[#7B61FF]/40 to-transparent" />

              {/* Right Column: Narrative Text and Key Badges */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <p className="text-sm sm:text-lg text-[#F0EFF4] leading-relaxed mb-4 sm:mb-6 font-light">
                  Créatif pluridisciplinaire et technologue passionné, j'associe la précision visuelle de <strong className="text-white font-semibold">l'infographie & de la sérigraphie</strong> à la puissance du <strong className="text-white font-semibold">développement web moderne et du vibe coding</strong>.
                </p>
                <p className="text-xs sm:text-base text-[#8F8EA8] leading-relaxed mb-6 sm:mb-8">
                  Fort d'une formation solide en informatique avancée et d'une rigueur méthodique acquise dans la logistique et le transit douanier, je transforme chaque idée en une réalisation concrète, élégante et parfaitement fonctionnelle.
                </p>

                {/* Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2">
                  <div className="p-3 rounded-[1.4rem] sm:rounded-[1.5rem] bg-[#161626] border border-white/5">
                    <Palette className="w-4 h-4 text-[#7B61FF] mb-1.5" />
                    <span className="text-xs font-semibold block text-white">Créativité Visuelle</span>
                    <span className="text-[10px] sm:text-[11px] font-mono text-[#8F8EA8]">PAO & Sérigraphie</span>
                  </div>
                  <div className="p-3 rounded-[1.4rem] sm:rounded-[1.5rem] bg-[#161626] border border-white/5">
                    <Code2 className="w-4 h-4 text-[#00F5D4] mb-1.5" />
                    <span className="text-xs font-semibold block text-white">Vibe Coding</span>
                    <span className="text-[10px] sm:text-[11px] font-mono text-[#8F8EA8]">React 19 & Web</span>
                  </div>
                  <div className="p-3 rounded-[1.4rem] sm:rounded-[1.5rem] bg-[#161626] border border-white/5 col-span-2 sm:col-span-1">
                    <Server className="w-4 h-4 text-[#9B86FF] mb-1.5" />
                    <span className="text-xs font-semibold block text-white">Rigueur Système</span>
                    <span className="text-[10px] sm:text-[11px] font-mono text-[#8F8EA8]">IT & Logistique</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* D. SECTION EXPÉRIENCE — "La Timeline Vivante"                            */}
      {/* ========================================================================= */}
      <section id="experiences" className="relative py-20 sm:py-28 px-3.5 sm:px-4 z-10">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
            <span className="text-xs font-mono uppercase tracking-widest text-[#7B61FF] mb-2 inline-flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5" /> 02. PARCOURS & RÉALISATIONS
            </span>
            <h2 className="font-serif italic text-3xl sm:text-5xl text-white font-normal mb-3 sm:mb-4">
              La Timeline Vivante
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#8F8EA8]">
              Des responsabilités concrètes, de la production artisanale au code de production.
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative">

            {/* Center Vertical Line on Desktop, Left on Mobile */}
            <div className="absolute left-4 sm:left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#7B61FF]/10 via-[#7B61FF]/60 to-[#7B61FF]/10 md:-translate-x-1/2" />

            <div className="flex flex-col gap-8 sm:gap-12 md:gap-16">
              {experiences.map((exp, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className={`timeline-item relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''
                      }`}
                  >
                    {/* Pulsing Timeline Dot */}
                    <div className="timeline-dot absolute left-4 sm:left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#0A0A14] border-2 border-[#7B61FF] z-20 flex items-center justify-center shadow-aura-glow">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#00F5D4]" />
                    </div>

                    {/* Content Card (Mobile: offset to the right; Desktop: left or right) */}
                    <div className="w-full md:w-[46%] pl-10 sm:pl-14 md:pl-0">
                      <div className="timeline-card experience-card-hover bg-[#12121F] border border-[#7B61FF]/25 rounded-[1.8rem] sm:rounded-[2rem] p-5 sm:p-8 backdrop-blur-md shadow-aura-card">

                        <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                          <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#7B61FF]/15 border border-[#7B61FF]/30 text-[10px] sm:text-[11px] font-mono text-[#A78BFA] font-medium">
                            {exp.period}
                          </span>
                          <span className="text-xs font-mono text-[#8F8EA8]">0{idx + 1}</span>
                        </div>

                        <h3 className="text-base sm:text-xl font-bold text-white mb-1 tracking-tight">
                          {exp.role}
                        </h3>

                        <h4 className="text-xs sm:text-sm font-medium text-[#00F5D4] mb-2 sm:mb-3">
                          {exp.company}
                        </h4>

                        <p className="text-xs sm:text-sm text-[#8F8EA8] leading-relaxed mb-4 sm:mb-5">
                          {exp.description}
                        </p>

                        {/* Technology / Methodology Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                          {exp.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 sm:px-2.5 py-0.5 rounded-full bg-[#161626] text-[10px] font-mono text-[#F0EFF4]/80 border border-white/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* E. SECTION COMPÉTENCES — "Le Tableau de Bord"                            */}
      {/* ========================================================================= */}
      <section id="competences" className="relative py-20 sm:py-28 px-3.5 sm:px-4 z-10">
        <div className="max-w-5xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#7B61FF] mb-2 inline-flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" /> 03. TABLEAU DE BORD
            </span>
            <h2 className="font-serif italic text-3xl sm:text-5xl text-white font-normal mb-3 sm:mb-4">
              Les Piliers de Maîtrise
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#8F8EA8]">
              Indicateurs de performance technique, design et logistique.
            </p>
          </div>

          {/* Grid of Mastery Meters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <div
                  key={index}
                  data-percent={skill.percent}
                  className={`skill-meter-card experience-card-hover bg-[#12121F] border border-[#7B61FF]/25 rounded-[1.8rem] sm:rounded-[2.2rem] p-5 sm:p-7 backdrop-blur-md shadow-aura-card flex flex-col justify-between ${index === 0 ? 'lg:col-span-2' : ''
                    }`}
                >
                  <div>
                    {/* Card Header with Circular SVG Meter */}
                    <div className="flex items-center justify-between mb-4 sm:mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#7B61FF]/15 border border-[#7B61FF]/30 flex items-center justify-center text-[#7B61FF] flex-shrink-0">
                          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#A78BFA] block">
                            {skill.category}
                          </span>
                          <h3 className="font-bold text-sm sm:text-lg text-white">
                            {skill.name}
                          </h3>
                        </div>
                      </div>

                      {/* Animated SVG Circular Gauge */}
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center flex-shrink-0">
                        <svg className="w-14 h-14 sm:w-16 sm:h-16 -rotate-90" viewBox="0 0 100 100">
                          {/* Background Track */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            className="stroke-[#1E1E34]"
                            strokeWidth="8"
                            fill="transparent"
                          />
                          {/* Progress Circle */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            className="skill-circle-progress stroke-[#7B61FF]"
                            strokeWidth="8"
                            strokeLinecap="round"
                            fill="transparent"
                            style={{
                              filter: 'drop-shadow(0 0 6px rgba(123, 97, 255, 0.7))'
                            }}
                          />
                        </svg>
                        <span className="skill-counter absolute font-mono font-bold text-xs text-white">
                          0%
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#8F8EA8] leading-relaxed mb-5 sm:mb-6">
                      {skill.description}
                    </p>
                  </div>

                  {/* Tools Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-white/5">
                    {skill.tools.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#161626] text-[10px] sm:text-[11px] font-mono text-[#00F5D4] border border-[#00F5D4]/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* F. SECTION FORMATION — "Les Fondations"                                  */}
      {/* ========================================================================= */}
      <section id="formation" className="relative py-20 sm:py-28 px-3.5 sm:px-4 z-10">
        <div className="max-w-4xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#7B61FF] mb-2 inline-flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5" /> 04. FORMATION ACADÉMIQUE
            </span>
            <h2 className="font-serif italic text-3xl sm:text-5xl text-white font-normal mb-3 sm:mb-4">
              Les Fondations
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#8F8EA8]">
              Un cursus équilibré entre création graphique, ingénierie informatique et transit.
            </p>
          </div>

          {/* Education Stacked Cards */}
          <div className="flex flex-col gap-3.5 sm:gap-5">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="education-card experience-card-hover bg-[#12121F]/90 border border-[#7B61FF]/20 rounded-[1.6rem] sm:rounded-[2rem] p-5 sm:p-7 backdrop-blur-md shadow-aura-card flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4"
              >
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#7B61FF]/10 border border-[#7B61FF]/30 flex items-center justify-center text-[#7B61FF] flex-shrink-0 mt-0.5">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#00F5D4] font-semibold block mb-0.5">
                      {edu.year}
                    </span>
                    <h3 className="text-sm sm:text-lg font-bold text-white mb-0.5">
                      {edu.degree}
                    </h3>
                    <h4 className="text-xs sm:text-sm font-medium text-[#A78BFA] mb-1.5 sm:mb-2">
                      {edu.institution}
                    </h4>
                    <p className="text-xs text-[#8F8EA8] leading-relaxed">
                      {edu.detail}
                    </p>
                  </div>
                </div>

                <div className="self-end md:self-center flex-shrink-0">
                  <span className="text-[10px] sm:text-xs font-mono text-[#8F8EA8]/70 px-2.5 sm:px-3 py-1 rounded-full bg-[#161626] border border-white/5">
                    VALIDÉ
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* G. SECTION CONTACT — "Le Pont"                                           */}
      {/* ========================================================================= */}
      <section id="contact" className="relative py-20 sm:py-28 px-3.5 sm:px-4 z-10">
        <div className="max-w-5xl mx-auto">

          <div className="contact-reveal bg-gradient-to-br from-[#12121F] via-[#161626] to-[#0A0A14] border border-[#7B61FF]/30 rounded-[2.2rem] sm:rounded-[3rem] p-6 sm:p-12 lg:p-16 shadow-aura-glow">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

              {/* Left Column: Direct Info & Socials */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#7B61FF] mb-2 inline-flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" /> 05. CONTACT DIRECT
                  </span>
                  <h2 className="font-serif italic text-3xl sm:text-5xl text-white font-normal mb-3 sm:mb-4">
                    Travaillons ensemble
                  </h2>
                  <p className="text-xs sm:text-sm text-[#8F8EA8] leading-relaxed mb-6 sm:mb-8">
                    Vous avez un projet en infographie, une production sérigraphique à lancer, ou une interface web interactive à concevoir ? Échangeons directement.
                  </p>

                  {/* Contact Links */}
                  <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">

                    {/* EMAIL DIRECT */}
                    <a
                      href="mailto:nambiemayassirou6@gmail.com"
                      className="hover-lift flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-[#161626] border border-[#7B61FF]/25 text-sm text-[#F0EFF4] hover:border-[#7B61FF] hover:text-white transition-all"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#7B61FF]/20 flex items-center justify-center text-[#7B61FF] flex-shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-mono text-[#8F8EA8] uppercase">EMAIL DIRECT</span>
                        <span className="text-xs sm:text-sm font-medium truncate text-white">nambiemayassirou6@gmail.com</span>
                      </div>
                    </a>

                    {/* TELEPHONE & WHATSAPP */}
                    <a
                      href="https://wa.me/22871432755"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover-lift flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-[#161626] border border-[#00F5D4]/25 text-sm text-[#F0EFF4] hover:border-[#00F5D4] hover:text-white transition-all"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#00F5D4]/20 flex items-center justify-center text-[#00F5D4] flex-shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-mono text-[#8F8EA8] uppercase">TÉLÉPHONE & WHATSAPP</span>
                        <span className="text-xs sm:text-sm font-semibold truncate text-[#00F5D4]">+228 71432755</span>
                      </div>
                    </a>

                    {/* LOCALISATION */}
                    <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-[#161626] border border-white/5 text-sm text-[#8F8EA8]">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#A78BFA] flex-shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-mono text-[#8F8EA8] uppercase">LOCALISATION</span>
                        <span className="text-xs sm:text-sm font-medium text-white truncate">Lomé, Togo & International (Remote)</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Big Download Button */}
                <button
                  onClick={handleDownloadCV}
                  className="magnetic-btn flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#7B61FF] to-[#00F5D4] text-[#0A0A14] font-bold text-xs sm:text-sm shadow-aura-button hover:opacity-95 transition-all w-full"
                >
                  <Download className="w-4 h-4" />
                  <span>Télécharger le CV Complet (PDF)</span>
                </button>
              </div>

              {/* Right Column: Interactive Form with direct WhatsApp Trigger */}
              <div className="lg:col-span-7 bg-[#0A0A14]/70 border border-[#7B61FF]/30 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 backdrop-blur-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#00F5D4]" />
                    <span>Envoyer un message WhatsApp</span>
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/30 text-[10px] font-mono text-[#25D366]">
                    LIVE +228 71432755
                  </span>
                </div>
                <p className="text-xs font-mono text-[#8F8EA8] mb-5">
                  Remplissez ce formulaire : il ouvrira directement votre message pré-rempli dans WhatsApp.
                </p>

                {formSubmitted ? (
                  <div className="p-6 sm:p-8 rounded-[1.8rem] bg-[#12121F] border border-[#00F5D4]/40 text-center animate-in zoom-in-95 duration-300">
                    <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#00F5D4] mx-auto mb-3" />
                    <h4 className="text-base sm:text-lg font-bold text-white mb-1">Redirection WhatsApp en cours...</h4>
                    <p className="text-xs font-mono text-[#8F8EA8]">
                      Votre message est prêt pour le numéro <strong className="text-white">+228 71432755</strong>. Merci de votre confiance !
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="flex flex-col gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-[#8F8EA8] uppercase tracking-wider mb-1.5">
                        Votre Nom complet
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Sophie Martin"
                        className="w-full px-4 py-3 rounded-xl sm:rounded-2xl bg-[#12121F] border border-[#7B61FF]/25 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#7B61FF] focus:ring-1 focus:ring-[#7B61FF] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[#8F8EA8] uppercase tracking-wider mb-1.5">
                        Votre Adresse Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Ex: contact@entreprise.com"
                        className="w-full px-4 py-3 rounded-xl sm:rounded-2xl bg-[#12121F] border border-[#7B61FF]/25 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#7B61FF] focus:ring-1 focus:ring-[#7B61FF] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[#8F8EA8] uppercase tracking-wider mb-1.5">
                        Détails de votre projet ou opportunité
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Précisez votre demande : infographie, création de logo, tirage sérigraphique, développement de site web..."
                        className="w-full px-4 py-3 rounded-xl sm:rounded-2xl bg-[#12121F] border border-[#7B61FF]/25 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#7B61FF] focus:ring-1 focus:ring-[#7B61FF] transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="magnetic-btn flex items-center justify-center gap-2 w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#25D366] via-[#128C7E] to-[#7B61FF] text-white font-bold text-sm shadow-aura-button hover:opacity-95 transition-all mt-1"
                    >
                      <Send className="w-4 h-4" />
                      <span>Transmettre le message via WhatsApp (+228 71432755)</span>
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* H. PIED DE PAGE                                                          */}
      {/* ========================================================================= */}
      <footer className="relative bg-[#07070E] rounded-t-[3rem] sm:rounded-t-[4rem] border-t border-[#7B61FF]/20 pt-12 sm:pt-16 pb-10 sm:pb-12 px-4 z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">

          {/* Identity */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7B61FF]" />
              <span className="font-bold text-white tracking-tight">Nambiema Yassirou</span>
            </div>
            <p className="text-xs font-mono text-[#8F8EA8]">
              Fait avec le vibe coding • 2026 • Tous droits réservés
            </p>
          </div>

          {/* Quick Anchor links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-mono text-[#8F8EA8]">
            <a href="#hero" className="hover:text-white transition-colors">Haut de page</a>
            <a href="#a-propos" className="hover:text-white transition-colors">À propos</a>
            <a href="#experiences" className="hover:text-white transition-colors">Expériences</a>
            <a href="#competences" className="hover:text-white transition-colors">Compétences</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Online Indicator Status */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12121F] border border-white/5 text-[11px] font-mono text-white/80">
            <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-ping" />
            <span className="text-[#00F5D4]">EN LIGNE</span>
            <span className="text-[#8F8EA8]">• Lomé, TG</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
