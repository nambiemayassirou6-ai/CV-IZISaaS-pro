import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

// Create A4 PDF (210mm x 297mm)
const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4'
});

const purple = [123, 97, 255];
const darkBg = [10, 10, 20];
const lightDark = [22, 22, 38];
const textColor = [30, 30, 40];
const lightGray = [100, 100, 115];
const accentCyan = [0, 180, 160];

// Header background banner
doc.setFillColor(15, 15, 26);
doc.rect(0, 0, 210, 48, 'F');

// Top colored accent bar
doc.setFillColor(123, 97, 255);
doc.rect(0, 0, 210, 3.5, 'F');

// Monogram badge
doc.setFillColor(123, 97, 255);
doc.roundedRect(15, 10, 22, 22, 3, 3, 'F');
doc.setTextColor(255, 255, 255);
doc.setFont('helvetica', 'bold');
doc.setFontSize(14);
doc.text('NY', 26, 24, { align: 'center' });

// Name
doc.setTextColor(255, 255, 255);
doc.setFont('helvetica', 'bold');
doc.setFontSize(22);
doc.text('NAMBIEMA YASSIROU', 42, 20);

// Professional Title
doc.setTextColor(167, 139, 250);
doc.setFont('helvetica', 'italic');
doc.setFontSize(12);
doc.text('Infographe, Sérigraphe & Développeur', 42, 27);

// Sub-banner contact info bar
doc.setFillColor(24, 24, 40);
doc.rect(0, 36, 210, 12, 'F');
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(220, 220, 240);
doc.text('Email : nambiemayassirou6@gmail.com  |  WhatsApp : +228 71432755  |  Lome, Togo', 105, 43.5, { align: 'center' });

// -------------------------------------------------------------
// Left Column (60mm) : PROFIL, COMPETENCES, FORMATIONS
// -------------------------------------------------------------
const leftX = 15;
const leftWidth = 55;

// Profile Section
doc.setFillColor(123, 97, 255);
doc.rect(leftX, 55, 3, 7, 'F');
doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(20, 20, 35);
doc.text('PROFIL', leftX + 6, 61);

doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(70, 70, 85);
const profileText = doc.splitTextToSize(
  "Creatif pluridisciplinaire et passionne de technologie. J'associe la precision visuelle de l'infographie et de la serigraphie a la puissance du developpement web et du vibe coding. Rigueur et fiabilite issues d'une solide formation en informatique et logistique.",
  leftWidth
);
doc.text(profileText, leftX, 67);

// Compétences Section
const skillsY = 96;
doc.setFillColor(123, 97, 255);
doc.rect(leftX, skillsY, 3, 7, 'F');
doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(20, 20, 35);
doc.text('COMPÉTENCES', leftX + 6, skillsY + 6);

const skillList = [
  { name: 'Infographie & PAO', level: '95%', desc: 'Illustrator, Photoshop, Vectorisation' },
  { name: 'Vibe Coding & Web', level: '92%', desc: 'React, Tailwind CSS, JavaScript' },
  { name: 'Serigraphie Industrielle', level: '90%', desc: 'Tirage textile & supports rigides' },
  { name: 'Informatique Avancee', level: '88%', desc: 'Systemes, reseaux & maintenance' },
  { name: 'Transit & Douane', level: '85%', desc: 'Procedures, formalites & rigueur' },
];

let curSkillY = skillsY + 12;
skillList.forEach(s => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(25, 25, 35);
  doc.text(s.name, leftX, curSkillY);
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(123, 97, 255);
  doc.text(s.level, leftX + leftWidth, curSkillY, { align: 'right' });
  
  // Progress bar
  doc.setFillColor(230, 230, 240);
  doc.roundedRect(leftX, curSkillY + 1.5, leftWidth, 1.8, 0.9, 0.9, 'F');
  const pct = parseInt(s.level) / 100;
  doc.setFillColor(123, 97, 255);
  doc.roundedRect(leftX, curSkillY + 1.5, leftWidth * pct, 1.8, 0.9, 0.9, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(110, 110, 125);
  doc.text(s.desc, leftX, curSkillY + 6.5);

  curSkillY += 12.5;
});

// Formation Section
const eduY = curSkillY + 6;
doc.setFillColor(123, 97, 255);
doc.rect(leftX, eduY, 3, 7, 'F');
doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(20, 20, 35);
doc.text('FORMATIONS', leftX + 6, eduY + 6);

const eduList = [
  { year: '2025 - 2026', title: 'Infographie & Serigraphie', school: 'Institut des Arts Graphiques' },
  { year: '2023 - 2024', title: 'Informatique Avancee', school: 'Centre de Formation Tech' },
  { year: '2021 - 2022', title: 'Transit & Douane', school: 'Academie de Logistique' },
  { year: '2019 - 2021', title: 'Baccalaureat 2 (BAC 2)', school: 'Enseignement Secondaire' },
];

let curEduY = eduY + 12;
eduList.forEach(e => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(123, 97, 255);
  doc.text(e.year, leftX, curEduY);
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(25, 25, 35);
  doc.text(e.title, leftX, curEduY + 3.8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(110, 110, 125);
  doc.text(e.school, leftX, curEduY + 7.2);

  curEduY += 12;
});

// Vertical separator
doc.setDrawColor(225, 225, 235);
doc.setLineWidth(0.4);
doc.line(78, 55, 78, 275);

// -------------------------------------------------------------
// Right Column (115mm) : EXPÉRIENCES & PROJETS
// -------------------------------------------------------------
const rightX = 86;
const rightWidth = 109;

doc.setFillColor(123, 97, 255);
doc.rect(rightX, 55, 3, 7, 'F');
doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(20, 20, 35);
doc.text('EXPÉRIENCES PROFESSIONNELLES', rightX + 6, 61);

const expList = [
  {
    period: '2024 - PRESENT',
    role: 'Responsable Informatique Principal',
    company: "Entreprise & Systemes d'Information",
    bullets: [
      "Supervision complete de l'infrastructure informatique et de la securite du reseau.",
      "Maintenance preventive et curative du parc materiel et logiciel.",
      "Deploiement de solutions d'automatisation des flux pour booster la productivite.",
      "Assistance technique et support operationnel direct a l'ensemble des equipes."
    ]
  },
  {
    period: '2023 - 2024',
    role: 'Lead Infographe & Specialiste Serigraphie',
    company: 'Atelier Graphique & Studio Print',
    bullets: [
      "Conception complete d'identites visuelles, logos, affiches et packaging.",
      "Separation des couleurs quadrichromique et tons directs pour tirage grand format.",
      "Preparation et insolation des ecrans serigraphiques (flashage, typons).",
      "Controle qualite et tirages en serie sur textile, papier d'art et supports rigides."
    ]
  },
  {
    period: '2022 - 2023',
    role: 'Developpeur Frontend & Vibe Coder',
    company: 'Studio Digital & Projets Freelance',
    bullets: [
      "Creation de sites web vitrines et d'applications reactives modernes (React, Tailwind).",
      "Integration d'animations cinematiques et de micro-interactions fluides.",
      "Optimisation SEO, performance de chargement et adaptabilite 100% mobile.",
      "Collaboration etroite avec les clients pour traduire leurs visions en produits finis."
    ]
  }
];

let curExpY = 68;
expList.forEach((exp) => {
  // Period badge
  doc.setFillColor(242, 238, 255);
  doc.roundedRect(rightX, curExpY - 3.5, 28, 5, 1, 1, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(123, 97, 255);
  doc.text(exp.period, rightX + 14, curExpY - 0.2, { align: 'center' });

  // Role
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(20, 20, 35);
  doc.text(exp.role, rightX, curExpY + 6);

  // Company
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(0, 160, 140);
  doc.text(exp.company, rightX, curExpY + 10.5);

  // Bullets
  let bY = curExpY + 15;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(60, 60, 75);

  exp.bullets.forEach((b) => {
    // bullet dot
    doc.setFillColor(123, 97, 255);
    doc.circle(rightX + 1.5, bY - 1, 0.7, 'F');
    const textLines = doc.splitTextToSize(b, rightWidth - 6);
    doc.text(textLines, rightX + 5, bY);
    bY += textLines.length * 4.2;
  });

  curExpY = bY + 5;
});

// Footer of the CV
doc.setFillColor(15, 15, 26);
doc.rect(0, 283, 210, 14, 'F');
doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(180, 180, 200);
doc.text('CV Nambiema Yassirou  |  Portfolio : http://localhost:5173/  |  Lome - Togo', 105, 290, { align: 'center' });

// Ensure public directory exists
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const outputPath = path.join(publicDir, 'CV-Nambiema-Yassirou.pdf');
fs.writeFileSync(outputPath, Buffer.from(doc.output('arraybuffer')));
console.log('PDF successfully generated at:', outputPath);
