import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { StickyHeader } from "./components/StickyHeader";
import { motion, AnimatePresence } from "motion/react";

function FlipbookCard({ category, title, content, darkContent, darkImage, darkImages, link, customIcon }: { category: string, title: string, content: React.ReactNode, darkContent?: React.ReactNode, darkImage?: string, darkImages?: string[], link?: string, customIcon?: React.ReactNode }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'spill' | 'text' | 'revert'>('idle');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [currentDirection, setCurrentDirection] = useState<'left' | 'right' | 'up' | 'down'>('left');
  const [revertDirection, setRevertDirection] = useState<'left' | 'right' | 'up' | 'down'>('right');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const darkImagesLength = darkImages?.length || 0;

  useEffect(() => {
    let isMounted = true;
    
    const initialDelay = Math.random() * 2000;
    const directions: ('left' | 'right' | 'up' | 'down')[] = ['left', 'right', 'up', 'down'];
    
    const run = async () => {
      await new Promise(r => setTimeout(r, initialDelay));
      while(isMounted) {
        setPhase('idle');
        setCurrentImageIndex(0);
        // Randomize direction before each animation cycle
        setCurrentDirection(directions[Math.floor(Math.random() * directions.length)]);
        setRevertDirection(directions[Math.floor(Math.random() * directions.length)]);

        // Wait in idle for 5.5s
        await new Promise(r => setTimeout(r, 5500));
        if (!isMounted) break;
        
        setPhase('spill');
        // Slide animation duration
        await new Promise(r => setTimeout(r, 1200));
        if (!isMounted) break;
        
        setPhase('text');
        
        if (darkImagesLength > 0) {
          // Hold first image for 6 seconds
          await new Promise(r => setTimeout(r, 6000));
          if (!isMounted) break;

          for (let i = 1; i < darkImagesLength; i++) {
            setCurrentImageIndex(i);
            // Hold subsequent images for 6 seconds as well
            await new Promise(r => setTimeout(r, 6000));
            if (!isMounted) break;
          }
        } else {
          // Hold short paragraph for 6 seconds
          await new Promise(r => setTimeout(r, 6000));
        }

        if (!isMounted) break;
        
        setPhase('revert');
        // Revert animation duration
        await new Promise(r => setTimeout(r, 1000));
      }
    };
    run();
    return () => { isMounted = false; };
  }, [darkImagesLength]);

  const getInitialPosition = () => {
    switch(currentDirection) {
      case 'left': return { x: '-100%', y: '0%' };
      case 'right': return { x: '100%', y: '0%' };
      case 'up': return { x: '0%', y: '100%' };
      case 'down': return { x: '0%', y: '-100%' };
    }
  };

  const getRevertPosition = () => {
    switch(revertDirection) {
      case 'left': return { x: '-100%', y: '0%' };
      case 'right': return { x: '100%', y: '0%' };
      case 'up': return { x: '0%', y: '100%' };
      case 'down': return { x: '0%', y: '-100%' };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setMousePos({ x, y });
  };

  return (
    <motion.div 
      className="relative w-full h-[400px] cursor-pointer [perspective:1500px]"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      animate={{
        rotateX: isHovered && !isFlipped ? mousePos.y * -20 : 0,
        rotateY: isHovered && !isFlipped ? mousePos.x * 20 : 0,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 200,
        mass: 0.5
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div 
        className={`w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front Face (Cover) */}
        <div 
          className="absolute w-full h-full bg-[#FFFFFF] rounded-[2rem] border-2 border-[#5B6572]/20 transition-shadow duration-300 p-8 flex flex-col justify-center items-center text-center [backface-visibility:hidden] overflow-hidden"
          style={{
            boxShadow: isHovered && !isFlipped
              ? `${-mousePos.x * 40}px ${-mousePos.y * 40}px 40px rgba(0,0,0,0.15)`
              : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          {/* Sliding Background Element */}
          <motion.div 
            className="absolute inset-0 bg-[#222222] z-10"
            initial={false}
            animate={{ 
              x: phase === 'spill' || phase === 'text' ? '0%' : (phase === 'revert' ? getRevertPosition().x : getInitialPosition().x),
              y: phase === 'spill' || phase === 'text' ? '0%' : (phase === 'revert' ? getRevertPosition().y : getInitialPosition().y),
            }}
            transition={{ 
              duration: phase === 'idle' ? 0 : 1.2, ease: [0.76, 0, 0.24, 1]
            }}
          />

          {/* Hidden Short Paragraph / Image */}
          <motion.div 
            className={`absolute z-20 text-[#FFFFFF] text-center flex flex-col justify-center items-center ${(darkImage || darkImages) ? 'inset-0 rounded-[2rem] overflow-hidden' : 'p-8'}`}
            initial={false}
            animate={{ 
              opacity: phase === 'text' ? 1 : 0,
              y: phase === 'text' ? 0 : 20,
              scale: phase === 'text' ? 1 : 0.95
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ pointerEvents: phase === 'text' ? 'auto' : 'none' }}
          >
            {darkImages && darkImages.length > 0 ? (
              darkImages.map((img, idx) => (
                <motion.img 
                  key={idx}
                  src={img} 
                  alt={`${title} - ${idx}`}
                  className="absolute inset-0 w-full h-full object-cover" 
                  initial={false}
                  animate={{
                     x: currentImageIndex === idx ? '0%' : (idx < currentImageIndex ? '-100%' : '100%'),
                     opacity: currentImageIndex === idx ? 1 : (idx < currentImageIndex ? 0.5 : 0)
                  }}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                />
              ))
            ) : darkImage ? (
              <img src={darkImage} alt={title} className="w-full h-full object-cover" />
            ) : (
              <p className="font-cambria text-xl italic leading-relaxed">
                {darkContent || '"Terkadang apa yang terlihat di luar, menyembunyikan sesuatu yang lebih dalam."'}
              </p>
            )}
          </motion.div>

          <motion.div 
            className="relative z-20 text-sm font-semibold text-[#5B6572]/70 uppercase tracking-widest mb-4 font-sans origin-center"
            animate={
              phase === 'spill' || phase === 'text' ? {
                scale: 0.95,
                opacity: 0,
                filter: "blur(12px)",
                x: currentDirection === 'left' ? '50%' : currentDirection === 'right' ? '-50%' : '0%',
                y: currentDirection === 'up' ? '-50%' : currentDirection === 'down' ? '50%' : '0%',
              } : {
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                x: '0%',
                y: '0%',
              }
            }
            transition={
              phase === 'spill' ? {
                duration: 1.2,
                ease: [0.76, 0, 0.24, 1]
              } : {
                duration: 0.8,
                ease: "easeOut"
              }
            }
          >
            {category}
          </motion.div>
          <motion.div 
            className="relative z-20 text-3xl font-bold text-[#222222] leading-tight mb-8 mt-[15pt] font-serif origin-center"
            animate={
              phase === 'spill' || phase === 'text' ? {
                scale: 0.95,
                opacity: 0,
                filter: "blur(12px)",
                x: currentDirection === 'left' ? '50%' : currentDirection === 'right' ? '-50%' : '0%',
                y: currentDirection === 'up' ? '-50%' : currentDirection === 'down' ? '50%' : '0%',
              } : {
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                x: '0%',
                y: '0%',
              }
            }
            transition={
              phase === 'spill' ? {
                duration: 1.2,
                ease: [0.76, 0, 0.24, 1]
              } : {
                duration: 0.8,
                ease: "easeOut"
              }
            }
          >
            {title}
          </motion.div>
        </div>

        {/* Back Face (Inside Page) */}
        <div className="absolute w-full h-full bg-[#222222] rounded-[2rem] border border-[#222222] shadow-lg p-8 flex flex-col justify-center items-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="text-sm font-semibold text-[#5B6572]/70 uppercase tracking-wider mb-6 pb-4 border-b border-[#222222] w-full font-sans italic">{title}</div>
          <div className="text-lg md:text-xl font-medium text-[#FFFFFF] leading-snug font-cambria">
            {content}
          </div>
          <a
            href={link || "#"}
            target={link ? "_blank" : undefined}
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              if (!link) {
                e.preventDefault();
              }
            }}
            className="absolute bottom-8 right-8 text-[#5B6572] hover:text-[#FFFFFF] transition-colors z-30"
          >
            {customIcon || (link ? <ExternalLink size={24} /> : null)}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

import { ExperienceCard } from "./components/ExperienceCard";
import { PosIndoExperience } from "./components/PosIndoExperience";
import { KspNusantaraExperience } from "./components/KspNusantaraExperience";
import { DocumentationCard } from "./components/DocumentationCard";
import { CreativeCard } from "./components/CreativeCard";
import { Footer } from "./components/Footer";
import { TranscriptTable } from "./components/TranscriptTable";
import { SixSigmaTable } from "./components/SixSigmaTable";
import { HighSchoolTable } from "./components/HighSchoolTable";
import { CVFlipbook } from "./components/CVFlipbook";
import { FlipbookReveal } from "./components/FlipbookReveal";
import { FloatingMetaButton } from "./components/FloatingMetaButton";
import { FloatingDocuments } from "./components/FloatingDocuments";
import { Star, ChevronLeft, ChevronRight, ExternalLink, FileText, ArrowDownRight } from "lucide-react";

function App() {
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [docPage, setDocPage] = useState(0);
  const [transcriptPage, setTranscriptPage] = useState(0);
  const transcriptLevels = [
    { title: "Sekolah Menengah Atas", institution: "SMA Negeri 8 Pontianak", period: "Tahun Pelajaran 2017/2018 – 2019/2020" },
    { title: "Sarjana Terapan Logistik (S.Tr.Log.)", institution: "Universitas Logistik dan Bisnis Internasional (ULBI)", period: "Oktober 2021 – November 2025" },
    { title: "Certified White Belt", institution: "The Council for Six Sigma Certification (CSSC)", period: "September 2024" }
  ];



  // PT Pos Indonesia - Multiple Positions (Mosaic Layout)
  const posIndoData = {
    company: "PosIND\nPT. Pos Indonesia (Persero)",
    companyLogo: "https://github.com/dhnaath/Resources-Portofolio/blob/main/7.png?raw=true",
    description: "BUMN; Danantara; Administrasi; Operasional; Marketing",
    positions: [
      {
        title: "Assistant Branch Manager",
        period: "3 Maret s.d. 9 April 2025",
        periodEn: "March 3 - April 9, 2025",
        location: "Kantor PosIND KCP Lanjak 78766",
        employmentType: "Magang (Internship)",
        employmentTypeEn: "Internship",
        achievements: [
          "Mempersiapkan uang tunai untuk setoran bank, mengisi slip setoran, serta melakukan rekonsiliasi kas harian guna memastikan kesesuaian fisik uang dengan catatan sistem.",
          "Menutup sistem loket kasir secara harian dengan menyusun laporan backsheet, serta menyelidiki dan menyelesaikan apabila terjadi selisih dana.",
          "Memproses dan mencatat pembayaran berbagai tagihan pelanggan melalui sistem PosPay Loket serta menerbitkan bukti transaksi/tanda terima yang sah.",
          "Memeriksa keaslian dan kelengkapan dokumen identitas pelanggan (KTP/KK) untuk keperluan reaktivasi akun atau rekening tidak aktif.",
          "Memverifikasi dokumen penyaluran Bantuan Sosial Tunai (BST) Kemensos, mencairkan dana sesuai prosedur, serta menjaga jejak audit dokumen bersama Branch Manager."
        ],
        achievementsEn: [
          "Prepared cash for bank deposits, filled out deposit slips, and conducted daily cash reconciliation to ensure physical cash matched system records.",
          "Closed the cashier counter system daily by preparing backsheet reports, and investigated and resolved any fund discrepancies.",
          "Processed and recorded various customer bill payments through the PosPay Loket system and issued valid transaction receipts.",
          "Verified the authenticity and completeness of customer identity documents (ID card/Family Card) for account reactivation or dormant accounts.",
          "Verified documents for the distribution of Ministry of Social Affairs Cash Social Assistance (BST), disbursed funds according to procedures, and maintained the document audit trail with the Branch Manager."
        ],
        image: "https://github.com/dhnaath/Website-Portofolio/blob/main/1741149010112.jpg?raw=true",
        image2: "https://github.com/dhnaath/Website-Portofolio/blob/main/1744248285339.jpg?raw=true",
        image3: "https://github.com/dhnaath/Website-Portofolio/blob/main/1741061244804.jpg?raw=true",
      },
      {
        title: "Assistant Supervisor",
        period: "10 April s.d. 1 Juni 2025",
        periodEn: "April 10 - June 1, 2025",
        location: "Kantor PosIND KPRK Sintang 78600",
        employmentType: "Magang (Internship)",
        employmentTypeEn: "Internship",
        achievements: [
          "Mencetak serta memverifikasi data penerima manfaat program bantuan sosial Kemensos, sekaligus melakukan penandaan koordinat lokasi rumah untuk akurasi data lapangan.",
          "Mengorganisir dan mengarsipkan dokumentasi foto lapangan secara sistematis berdasarkan wilayah guna menjaga keakuratan catatan dan kesiapan laporan.",
          "Melakukan penjemputan (pickup) paket pelanggan, mengelola proses penyortiran di area gudang, serta mencetak dan menempelkan label pengiriman sesuai standar.",
          "Melakukan pemeliharaan rutin pada perangkat inventaris tim, serta melakukan instalasi dan penanganan masalah (troubleshooting) dasar pada perangkat keras dan lunak.",
          "Berkoordinasi aktif dengan tim internal maupun divisi lain untuk mendukung kelancaran kegiatan distribusi, penjualan, serta sosialisasi terdokumentasi di lapangan."
        ],
        achievementsEn: [
          "Printed and verified beneficiary data for the Ministry of Social Affairs social assistance program, while also tagging home location coordinates for field data accuracy.",
          "Organized and archived field photo documentation systematically by region to maintain record accuracy and report readiness.",
          "Picked up customer packages, managed the sorting process in the warehouse area, and printed and attached shipping labels according to standards.",
          "Performed routine maintenance on team inventory devices, and conducted basic installation and troubleshooting of hardware and software.",
          "Coordinated actively with the internal team and other divisions to support smooth distribution, sales, and documented socialization activities in the field."
        ],
        image: "https://github.com/dhnaath/Website-Portofolio/blob/main/1744606643657.jpg?raw=true",
        image2: "https://github.com/dhnaath/Website-Portofolio/blob/main/1745206623859.jpg?raw=true",
        image3: "https://github.com/dhnaath/Website-Portofolio/blob/main/1746614254530.jpg?raw=true",
      },
    ],
  };

  // KSP Nusantara - Multiple Positions (Mosaic Layout)
  const kspNusantaraData = {
    company: "KopnusPos\nKSP Nusantara",
    companyLogo: "https://github.com/dhnaath/Resources-Portofolio/blob/main/5.png?raw=true",
    description: "Keuangan; Koperasi; Marketing; Sales; Pembiayaan Pensiun",
    positions: [
      {
        title: "Agen Oren by KOPNUS",
        period: "November 2025 s.d. Sekarang",
        periodEn: "November 2025 - Present",
        location: "KSP Nusantara - KopnusPos",
        employmentType: "Mandiri, Berbasis Komisi (Freelancer)",
        employmentTypeEn: "Independent, Commission-Based (Freelancer)",
        achievements: [
          "Melaksanakan tugas pemasaran dan akuisisi klien yang setara dengan peran Account Officer Lending.",
          "Mengikuti dan menyesuaikan diri terhadap arah peraturan serta kebijakan yang diperbarui oleh pemerintah maupun perusahaan."
        ],
        achievementsEn: [
          "Performed marketing and client acquisition tasks equivalent to the role of an Account Officer Lending.",
          "Followed and adapted to updated regulations and policies direction from the government and the company."
        ],
        image: "https://raw.githubusercontent.com/dhnaath/Website-Portofolio/main/1763565179282.jpg",
      },
      {
        title: "Account Officer Lending",
        period: "September s.d. November 2025",
        periodEn: "September - November 2025",
        location: "Kantor PosIND KCP Putussibau 78711",
        employmentType: "Magang (Internship)",
        employmentTypeEn: "Internship",
        achievements: [
          "Memasarkan produk pinjaman pensiun (PNS, TNI, Polri) secara aktif melalui pendekatan langsung (door-to-door), menggunakan brosur cetak, serta memakai pesan siaran via WhatsApp.",
          "Mengelola seluruh siklus proses kredit mulai dari analisis kebutuhan klien, verifikasi dokumen, koordinasi asuransi, hingga pencairan dana, serta berkoordinasi dengan staf PosIND dan kantor cabang.",
          "Membangun hubungan baik dengan komunitas pensiunan, mitra juru bayar lain, dan pegawai pemerintah aktif, sekaligus memberikan edukasi terkait regulasi terbaru serta penggunaan aplikasi penunjang (Taspen/Asabri).",
          "Menyusun laporan kunjungan harian (pipeline) dan hasil prospek secara rutin sebagai bahan evaluasi kerja, serta menangani keluhan dan masukan klien dengan solutif.",
          "Mendesain ulang materi promosi dan brosur cetak/digital guna meningkatkan daya tarik visual, memperluas jangkauan pasar, dan menarik minat calon nasabah secara efektif."
        ],
        achievementsEn: [
          "Actively marketed pension loan products (Civil Servants, Military, Police) through a direct approach (door-to-door), using printed brochures, and utilizing broadcast messages via WhatsApp.",
          "Managed the entire credit process cycle starting from client needs analysis, document verification, insurance coordination, up to fund disbursement, and coordinated with PosIND staff and the branch office.",
          "Built good relationships with the pensioner community, other paying partners, and active government employees, while providing education regarding the latest regulations and the use of supporting applications (Taspen/Asabri).",
          "Prepared daily visit reports (pipeline) and prospect results regularly as material for work evaluation, and handled client complaints and feedback correctively.",
          "Redesigned promotional materials and printed/digital brochures to increase visual appeal, expand market reach, and attract prospective customers effectively."
        ],
        image: "https://raw.githubusercontent.com/dhnaath/Website-Portofolio/main/1763565039525.jpg",
        image2: "https://raw.githubusercontent.com/dhnaath/Website-Portofolio/main/1763565179282.jpg",
      },
    ],
  };

  const experiences = [
    // 1. Huachuang Singapore (Earliest)
    {
      title: "Import - Export",
      company: "TISCE - Ever Trust Tools\nHuachuang Singapore Pte. Ltd.",
      location: "Singapore (Remote)",
      period: "November 2024 s.d. Februari 2025",
      periodEn: "November 2024 - February 2025",
      employmentType: "Mandiri, Berbasis Komisi, Tanpa Gaji Pokok (Freelancer)",
      employmentTypeEn: "Independent, Commission-Based, No Basic Salary (Freelancer)",
      description: "Sourcing Platform; Global Partnership; RFQ; B2B; Freelance",
      companyLogo: "https://github.com/dhnaath/Resources-Portofolio/blob/main/4.png?raw=true",
      achievements: [
        "Mencari dan menjaring calon pembeli lokal yang membutuhkan pasokan barang atau mesin industri dari China.",
        "Mengumpulkan dan memverifikasi spesifikasi kebutuhan barang serta detail kontak pembeli guna menyusun dokumen Request for Quotation (RFQ) yang akurat sebelum diajukan ke platform.",
        "Memantau respons dari pemasok dan menindaklanjuti penawaran kepada calon pembeli sesuai standar yang berlaku untuk mendukung kelancaran proses pengadaan."
      ],
      achievementsEn: [
        "Search for and network with local prospective buyers who need the supply of industrial goods or machinery from China.",
        "Collect and verify goods specification needs and buyer contact details to compile accurate Request for Quotation (RFQ) documents before submitting them to the platform.",
        "Monitor responses from suppliers and follow up on offers to prospective buyers according to applicable standards to support the smooth procurement process."
      ],
      image: "https://github.com/dhnaath/Website-Portofolio/blob/main/Screenshot%202026-07-02%20031752.png?raw=true",
      images: [
        "https://github.com/dhnaath/Website-Portofolio/blob/main/Screenshot%202026-07-02%20031752.png?raw=true",
        "https://github.com/dhnaath/Website-Portofolio/blob/main/Screenshot%202026-07-02%20031954.png?raw=true",
        "https://github.com/dhnaath/Website-Portofolio/blob/main/Screenshot%202026-07-02%20032435.png?raw=true",
        "https://github.com/dhnaath/Website-Portofolio/blob/main/Screenshot%202026-07-02%20032517.png?raw=true"
      ],
    },
    // 2. Auto2000 (April - Oct 2023)
    {
      title: "Assistant Partman",
      company: "Toyota Sales Operation (TSO-Auto2000)\nPT. Astra International Tbk",
      location: "Auto2000 Pasteur – Jl. Djunjunan No. 192, Kota Bandung, Jawa Barat",
      period: "7 Oktober 2024 s.d. 5 Januari 2025",
      periodEn: "October 7, 2024 - January 5, 2025",
      employmentType: "Magang (Internship)",
      employmentTypeEn: "Internship",
      description: "Pergudangan; Persediaan; Suku Cadang; Otomotif; Dealer",
      companyLogo: "https://github.com/dhnaath/Resources-Portofolio/blob/main/1.png?raw=true",
      achievements: [
        "Mengoptimalkan penataan rak penyimpanan suku cadang berdasarkan kode standar agar alur kerja gudang jadi lebih rapi dan efisien.",
        "Mengelola keakuratan data stok di gudang lewat stock opname berkala dan langsung memperbarui datanya di sistem Warehouse Management System (WMS).",
        "Mengelola proses inbound dan outbound suku cadang, mulai dari pencocokan Goods Received Note (GRN) dengan Purchase Order (PO), hingga proses picking, packing, labeling, dan distribusi ke area bengkel.",
        "Melakukan rekonsiliasi data Special Service Tools (SST) dan suku cadang pada sistem, serta memantau pergerakan utilisasi alat oleh teknisi untuk meminimalisir risiko kehilangan sesuai standar operasional.",
        "Berkoordinasi aktif dengan kasir, teknisi, dan Service Advisor (SA) di bawah arahan Partman utama untuk menjaga standar operasional dan layanan serta kepatuhan aturan kebersihan dan keselamatan dealer."
      ],
      achievementsEn: [
        "Optimized the arrangement of spare parts storage racks based on standard codes so that the warehouse workflow became neater and more efficient.",
        "Managed the accuracy of stock data in the warehouse through regular stock opname and directly updated the data in the Warehouse Management System (WMS).",
        "Managed the inbound and outbound processes of spare parts, starting from matching the Goods Received Note (GRN) with the Purchase Order (PO), to the picking, packing, labeling, and distribution processes to the workshop area.",
        "Reconciled Special Service Tools (SST) and spare parts data in the system, and monitored the movement of tool utilization by technicians to minimize the risk of loss according to operational standards.",
        "Coordinated actively with cashiers, technicians, and Service Advisors (SA) under the direction of the main Partman to maintain operational and service standards as well as compliance with dealer cleanliness and safety rules."
      ],
      image: "https://raw.githubusercontent.com/dhnaath/Website-Portofolio/a3a2ffb41d0536a1c2e832f11c79b215fbb6cd45/1728603552444.jpg",
      images: [
        "https://raw.githubusercontent.com/dhnaath/Website-Portofolio/a3a2ffb41d0536a1c2e832f11c79b215fbb6cd45/1728603552444.jpg",
        "https://raw.githubusercontent.com/dhnaath/Website-Portofolio/a3a2ffb41d0536a1c2e832f11c79b215fbb6cd45/1728603594941.jpg",
        "https://raw.githubusercontent.com/dhnaath/Website-Portofolio/a3a2ffb41d0536a1c2e832f11c79b215fbb6cd45/1728603683013.jpg",
        "https://raw.githubusercontent.com/dhnaath/Website-Portofolio/a3a2ffb41d0536a1c2e832f11c79b215fbb6cd45/1728603726158.jpg",
        "https://raw.githubusercontent.com/dhnaath/Website-Portofolio/a3a2ffb41d0536a1c2e832f11c79b215fbb6cd45/1733974386362.jpg",
      ],
    },
    // 3. GOVOKASi (Feb - Aug 2024)
    {
      title: "Project Assistant",
      company: "GOVOKASi Indonesia",
      location: "Remote",
      period: "September 2024",
      periodEn: "September 2024",
      employmentType: "Magang Daring Tidak Berbayar (Internship)",
      employmentTypeEn: "Unpaid Remote Internship",
      description: "Mentorship; Pelatihan; Pengembangan; Rancang Program",
      companyLogo: "https://github.com/dhnaath/Resources-Portofolio/blob/main/6.png?raw=true",
      achievements: [
        "Melakukan riset pasar dan audiens untuk mendukung posisi perusahaan, penyampaian pesan dan tujuan, dan pemilihan program kegiatan.",
        "Mengembangkan strategi pemasaran untuk rencana kegiatan program berdasarkan temuan riset dan hasil diskusi tim.",
        "Mendukung koordinasi tim yang beranggotakan mahasiswa dari kampus lain pada fase awal program, termasuk pembagian tugas dan penjadwalan presentasi di hadapan para mentor dan tim lain."
      ],
      achievementsEn: [
        "Conducted market and audience research to support the company's position, message delivery and goals, and the selection of activity programs.",
        "Developed marketing strategies for program activity plans based on research findings and team discussion results.",
        "Supported the coordination of a team of students from other campuses in the early phases of the program, including dividing tasks and scheduling presentations before mentors and other teams."
      ],
      image: "https://raw.githubusercontent.com/dhnaath/Website-Portofolio/refs/heads/main/%F0%9D%90%8F%F0%9D%90%AB%F0%9D%90%A8%F0%9D%90%A3%F0%9D%90%9E%F0%9D%90%9C%F0%9D%90%AD%20%F0%9D%90%81%F0%9D%90%9A%F0%9D%90%AC%F0%9D%90%9E%F0%9D%90%9D%20%F0%9D%90%88%F0%9D%90%8D%F0%9D%90%93%F0%9D%90%84%F0%9D%90%91%F0%9D%90%8D%F0%9D%90%92%F0%9D%90%87%F0%9D%90%88%F0%9D%90%8F%20by%20%F0%9D%90%86%F0%9D%90%8E%F0%9D%90%95%F0%9D%90%8E%F0%9D%90%8A%F0%9D%90%80%F0%9D%90%92%F0%9D%90%A2%20%F0%9D%90%81%F0%9D%90%9A%F0%9D%90%AD%F0%9D%90%9C%F0%9D%90%A1%20%F0%9D%9F%93%F0%9D%9F%92%F0%9D%90%80%F0%9D%90%9C%F0%9D%90%9C%F0%9D%90%9E%F0%9D%90%A5%F0%9D%90%9E%F0%9D%90%AB_070.jpg",
      images: [
        "https://raw.githubusercontent.com/dhnaath/Website-Portofolio/refs/heads/main/%F0%9D%90%8F%F0%9D%90%AB%F0%9D%90%A8%F0%9D%90%A3%F0%9D%90%9E%F0%9D%90%9C%F0%9D%90%AD%20%F0%9D%90%81%F0%9D%90%9A%F0%9D%90%AC%F0%9D%90%9E%F0%9D%90%9D%20%F0%9D%90%88%F0%9D%90%8D%F0%9D%90%93%F0%9D%90%84%F0%9D%90%91%F0%9D%90%8D%F0%9D%90%92%F0%9D%90%87%F0%9D%90%88%F0%9D%90%8F%20by%20%F0%9D%90%86%F0%9D%90%8E%F0%9D%90%95%F0%9D%90%8E%F0%9D%90%8A%F0%9D%90%80%F0%9D%90%92%F0%9D%90%A2%20%F0%9D%90%81%F0%9D%90%9A%F0%9D%90%AD%F0%9D%90%9C%F0%9D%90%A1%20%F0%9D%9F%93%F0%9D%9F%92%F0%9D%90%80%F0%9D%90%9C%F0%9D%90%9C%F0%9D%90%9E%F0%9D%90%A5%F0%9D%90%9E%F0%9D%90%AB_070.jpg",
        "https://github.com/dhnaath/Website-Portofolio/blob/main/%F0%9D%90%8F%F0%9D%90%AB%F0%9D%90%A8%F0%9D%90%A3%F0%9D%90%9E%F0%9D%90%9C%F0%9D%90%AD%20%F0%9D%90%81%F0%9D%90%9A%F0%9D%90%AC%F0%9D%90%9E%F0%9D%90%9D%20%F0%9D%90%88%F0%9D%90%8D%F0%9D%90%93%F0%9D%90%84%F0%9D%90%91%F0%9D%90%8D%F0%9D%90%92%F0%9D%90%87%F0%9D%90%88%F0%9D%90%8F%20by%20%F0%9D%90%86%F0%9D%90%8E%F0%9D%90%95%F0%9D%90%8E%F0%9D%90%8A%F0%9D%90%80%F0%9D%90%92%F0%9D%90%A2%20%F0%9D%90%81%F0%9D%90%9A%F0%9D%90%AD%F0%9D%90%9C%F0%9D%90%A1%20%F0%9D%9F%93%F0%9D%9F%92%F0%9D%90%80%F0%9D%90%9C%F0%9D%90%9C%F0%9D%90%9E%F0%9D%90%A5%F0%9D%90%9E%F0%9D%90%AB.jpg?raw=true",
        "https://github.com/dhnaath/Website-Portofolio/blob/main/%F0%9D%90%8F%F0%9D%90%AB%F0%9D%90%A8%F0%9D%90%A3%F0%9D%90%9E%F0%9D%90%9C%F0%9D%90%AD%20%F0%9D%90%81%F0%9D%90%9A%F0%9D%90%AC%F0%9D%90%9E%F0%9D%90%9D%20%F0%9D%90%88%F0%9D%90%8D%F0%9D%90%93%F0%9D%90%84%F0%9D%90%91%F0%9D%90%8D%F0%9D%90%92%F0%9D%90%87%F0%9D%90%88%F0%9D%90%8F%20by%20%F0%9D%90%86%F0%9D%90%8E%F0%9D%90%95%F0%9D%90%8E%F0%9D%90%8A%F0%9D%90%80%F0%9D%90%92%F0%9D%90%A2%20%F0%9D%90%81%F0%9D%90%9A%F0%9D%90%AD%F0%9D%90%9C%F0%9D%90%A1%20%F0%9D%9F%93%F0%9D%9F%92%F0%9D%90%80%F0%9D%90%9C%F0%9D%90%9C%F0%9D%90%9E%F0%9D%90%A5%F0%9D%90%9E%F0%9D%90%AB%20(1).jpg?raw=true"
      ],
    },
    // 4. Prudential (Feb - Dec 2024)
    {
      title: "Life Insurance Agent",
      company: "Prudential Life Assurance (PLA)\nPrudential Sharia Life Assurance (PSLA)",
      location: "KPM BD 21 – Malabar, Kota Bandung, Jawa Barat",
      period: "Februari s.d. Desember 2024",
      periodEn: "February - December 2024",
      employmentType: "Mandiri, Berbasis Komisi, Tanpa Gaji Pokok (Freelancer)",
      employmentTypeEn: "Independent, Commission-Based, No Basic Salary (Freelancer)",
      description: "Keuangan; Asuransi Jiwa; Asuransi Kesehatan; Takaful Keluarga",
      companyLogo: "https://github.com/dhnaath/Resources-Portofolio/blob/main/2.png?raw=true",
      achievements: [
        "Menganalisis profil risiko, tujuan keuangan, dan kemampuan premi calon nasabah untuk merancang proposal ilustrasi asuransi (konvensional/syariah) yang sesuai kebutuhan.",
        "Membimbing calon nasabah dalam penyiapan dokumen SPAJ, menjelaskan hak-kewajiban secara transparan, serta mengawal proses pengajuan proposal.",
        "Berkoordinasi aktif dengan tim internal serta rutin mengikuti pelatihan, seminar, dan ujian sertifikasi produk baru guna menjaga pemahaman materi tetap aktual.",
        "Menjaga kepatuhan terhadap kode etik keagenan berdasarkan lisensi AAJI-AASI, serta memastikan seluruh proses layanan sejalan dengan regulasi OJK.",
        "Memantau perkembangan tren produk asuransi serta dinamika pasar ekonomi untuk memberikan edukasi literasi keuangan yang tepat kepada masyarakat."
      ],
      achievementsEn: [
        "Analyzed prospective clients' risk profiles, financial goals, and premium capabilities to design tailored insurance illustration proposals (conventional/sharia).",
        "Guided prospective clients in preparing SPAJ documents, explaining rights and obligations transparently, and overseeing the proposal submission process.",
        "Coordinated actively with the internal team and regularly attended training, seminars, and new product certification exams to keep knowledge up-to-date.",
        "Maintained compliance with the agency code of ethics based on AAJI-AASI licenses, ensuring all service processes aligned with OJK regulations.",
        "Monitored trends in insurance products and economic market dynamics to provide appropriate financial literacy education to the public."
      ],
      image: "https://github.com/dhnaath/Website-Portofolio/blob/main/1733972999601.jpg?raw=true",
      images: [
        "https://github.com/dhnaath/Website-Portofolio/blob/main/1733972999601.jpg?raw=true",
        "https://github.com/dhnaath/Website-Portofolio/blob/main/1733972393522.jpg?raw=true",
      ],
    },
    // 5. GAO Tek (Jun - Nov 2024)
    {
      title: "Human Resources",
      company: "GAO Tek Inc.\nGlobal Advanced Operations",
      location: "Remote",
      period: "Agustus 2024",
      periodEn: "August 2024",
      employmentType: "Magang Daring Tidak Berbayar (Internship)",
      employmentTypeEn: "Unpaid Remote Internship",
      description: "Pelatihan; Promosi; Penjualan; Unpaid Internship; Remote",
      companyLogo: "https://github.com/dhnaath/Resources-Portofolio/blob/main/3.png?raw=true",
      achievements: [
        "Melakukan screening awal terhadap resume pelamar, menyaring kandidat potensial (shortlisting), serta mengelola proses tindak lanjut hasil seleksi.",
        "Mengoptimalkan publikasi lowongan kerja (job posting) dan materi promosi rekrutmen secara berkala di berbagai platform profesional seperti LinkedIn dan Glints.",
        "Mengatur jadwal pertemuan, mengirimkan undangan atau pengingat, serta menyiapkan agenda diskusi dengan kandidat.",
        "Menangani seluruh jalur komunikasi internal maupun eksternal melalui MS Teams, Outlook, Skype, dan LinkedIn untuk memastikan penyampaian informasi berjalan jelas dan tepat waktu.",
        "Bekerja sama dengan rekan tim dan Squad Leader (SL) dan Assistant Squad Leader (ASL) dalam memastikan akurasi dan pelaksanaan tugas."
      ],
      achievementsEn: [
        "Conducted initial screening of applicant resumes, filtered potential candidates (shortlisting), and managed the follow-up process of selection results.",
        "Optimized the publication of job vacancies (job posting) and recruitment promotion materials periodically on various professional platforms such as LinkedIn and Glints.",
        "Arranged meeting schedules, sent invitations or reminders, and prepared discussion agendas with candidates.",
        "Handled all internal and external communication channels through MS Teams, Outlook, Skype, and LinkedIn to ensure the delivery of information ran clearly and on time.",
        "Collaborated with team members and Squad Leaders (SL) and Assistant Squad Leaders (ASL) to ensure accuracy and task execution."
      ],
      image: "https://github.com/dhnaath/Website-Portofolio/blob/main/1728602581675%20(1).jpg?raw=true",
      images: [
        "https://github.com/dhnaath/Website-Portofolio/blob/main/Screenshot%202026-07-02%20013901.png?raw=true",
        "https://github.com/dhnaath/Website-Portofolio/blob/main/Screenshot%202026-07-02%20013545.png?raw=true",
        "https://github.com/dhnaath/Website-Portofolio/blob/main/1728602581675%20(1).jpg?raw=true",
        "https://github.com/dhnaath/Website-Portofolio/blob/main/1728602597549.jpg?raw=true",
      ],
    },
    // 6. Grab Teknologi Indonesia
    {
      title: "Driver & Courier",
      company: (
        <>
          Grab Teknologi Indonesia (Grab)<br />
          Shopee Internasional Indonesia (Shopee)<br />
          Teknologi Perdana Indonesia (Maxim)
        </>
      ),
      location: "Pontianak",
      period: "Feb 2026 s.d. Sekarang",
      periodEn: "Feb 2026 - Present",
      employmentType: "Mandiri, Tanpa Jam Operasional dan Wilayah Tetap (Freelancer)",
      employmentTypeEn: "Independent, No Fixed Operating Hours and Area (Freelancer)",
      description: "Transportasi; Jasa Layanan; Kurir-Ojek; Pesan-Antar; Aplikasi",
      achievements: [
        "Melayani transportasi penumpang serta distribusi makanan dan paket barang dengan memastikan keamanan, kebersihan, dan ketepatan waktu hingga ke lokasi tujuan.",
        "Berkoordinasi secara aktif dengan pelanggan, mitra restoran, dan pihak keamanan/parkir demi kelancaran proses ambil-antar pesanan.",
        "Mengatur rute perjalanan secara mandiri dan mengelola waktu secara efisien untuk memaksimalkan performa akun serta mencapai target harian.",
        "Mematuhi standar operasional dengan menggunakan atribut resmi serta merawat kondisi kendaraan secara rutin guna meminimalisir kendala teknis di jalan."
      ],
      achievementsEn: [
        "Served passenger transportation and the distribution of food and goods packages by ensuring safety, cleanliness, and punctuality to the destination.",
        "Coordinated actively with customers, restaurant partners, and security/parking parties for the smooth pick-up and delivery process of orders.",
        "Arranged travel routes independently and managed time efficiently to maximize account performance and achieve daily targets.",
        "Complied with operational standards by using official attributes and maintaining vehicle conditions regularly to minimize technical obstacles on the road."
      ],
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      images: [
        "https://play-lh.googleusercontent.com/OmBwUGuTJxaV0gW04sQjvGaxlgxHr83z88dQCD0gJy7_dX9gM2APUE6CmyWFT27kb1-ASDQq5iZlNnkfwsjgdQ=w480-h960-rw",
        "https://play-lh.googleusercontent.com/gvn6nri4v_KAjbR2KW_iWmbGUmrJYiP-QRVAmpCUmFHvza2gqw2MI6qS9U7o3J_XZM8UKlm4aKjaOEddJKDO3w=w480-h960-rw",
        "https://play-lh.googleusercontent.com/2INhmztKw86TAsrMDdYj_BLMNsvIBv968VPsNpFSIEjB2E2vRu0r-Z-E9PDjBNukKBgmmp2xxfs6tYBIInkNBQ=w480-h960-rw",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcltsUg0w1NE5zLSafuXLYr-3hGOdoiwJSPc5z7mC-pg&s=10"
      ],
    },
    // 7. Mandiri Utama Finance
    {
      title: "Mitra MUF Dana",
      company: "MUF\nPT. Mandiri Utama Finance",
      location: "Pontianak, Kalimantan Barat",
      period: "Mar 2026 s.d. Sekarang",
      periodEn: "Mar 2026 - Present",
      employmentType: "Mandiri, Berbasis Komisi, Tanpa Gaji, Tanpa Absensi (Freelancer)",
      employmentTypeEn: "Independent, Commission-Based, No Salary, No Attendance (Freelancer)",
      description: "BUMN; Keuangan; Leasing; Pembiayaan Kendaraan; Sales",
      companyLogo: "https://github.com/dhnaath/Resources-Portofolio/blob/main/Desain%20tanpa%20judul%20(1).png?raw=true",
      achievements: [
        "Memasarkan produk pinjaman dana tunai dengan jaminan BPKB kendaraan, baik untuk roda dua (motor) maupun roda empat (mobil).",
        "Menyesuaikan produk pembiayaan yang akan diajukan agar sejalan dengan kebutuhan serta kemampuan finansial calon klien.",
        "Mendampingi klien dalam proses pengajuan, mulai dari melengkapi berkas dokumen hingga dana berhasil dicairkan.",
        "Berkoordinasi secara aktif dengan tim MUF untuk memastikan proses administrasi dan pengajuan berjalan sesuai standar operasional yang berlaku."
      ],
      achievementsEn: [
        "Marketed cash loan products with vehicle BPKB collateral, both for two-wheelers (motorcycles) and four-wheelers (cars).",
        "Adjusted the financing products to be proposed to align with the needs and financial capabilities of prospective clients.",
        "Assisted clients in the application process, starting from completing document files until the funds were successfully disbursed.",
        "Coordinated actively with the MUF team to ensure the administrative and application processes ran according to applicable operational standards."
      ],
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    }
  ];

    const documentation = [
    {
      title: "Dasar Procurement & Purchasing di Perusahaan",
      description: "Recorded Workshop Praktikal Berprojek",
      type: "Ioda Academy",
      date: "Mei 2025",
      tags: ["Training", "Certification", "Professional"],
      externalLink: "https://drive.google.com/file/d/1hEQUPywU-ce3x1P-zyiUre65oYf4bZhV/view?usp=drive_link",
      hideFileIcon: true,
      bgColor: "#59247b",
      textColor: "#FFFFFF",
    },
    {
      title: "Six Sigma (64/80) - White Belt",
      description:
        "A Council for Six Sigma Certification (CSSC) Certified Six Sigma White Belt is an individual that has been provided, and has demonstrated an understanding of the most basic level of the Six Sigma Methodology. The White Belt Certification designation also reflects knowledge by the individual of the basic definition, history, and structure of the discipline. This understanding provides a solid awareness of who is involved in the actual Six Sigma implementation, and their roles within an organization.",
      type: "The Council for Six Sigma Certification (CSSC)",
      date: "September 2024",
      tags: ["Statistical Analysis", "Quality Assurance", "Root Cause Analysis"],
      link: "https://drive.google.com/file/d/1agmr5AjaqT8rjYe1pZ_ldwN4--8KXFS5/view?usp=drive_link",
      externalLink: "https://drive.google.com/file/d/1Sx60x5R7G0eTpk6tOOIi1OYLlozMuZpi/view?usp=drive_link",
      bgColor: "#d1d1d1",
    },
    {
      title: "Lean Six Sigma (68/80) - White Belt",
      description:
        "A Council for Six Sigma Certification (CSSC) Certified Lean Six Sigma White Belt is an individual that has been provided, and has demonstrated an understanding of the most basic level of the Six Sigma Methodology. The White Belt Certification designation also reflects knowledge by the individual of the basic definition, history, and structure of the discipline. This understanding provides a solid awareness of who is involved in the actual Six Sigma implementation, and their roles within an organization.",
      type: "The Council for Six Sigma Certification (CSSC)",
      date: "September 2024",
      tags: ["Waste Elimination", "Value Stream Mapping", "Efficiency Optimization"],
      link: "https://drive.google.com/file/d/1L7iJxXMprCnnOpsJ5ojFq9Zc6VqW_d8-/view?usp=drive_link",
      externalLink: "https://drive.google.com/file/d/1Sx60x5R7G0eTpk6tOOIi1OYLlozMuZpi/view?usp=drive_link",
      bgColor: "#d1d1d1",
    },
    {
      title: "Sertifikasi Keagenan Asuransi Jiwa Syariah",
      description: "Comprehensive training on modern warehouse operations, inventory control, and WMS software integration.",
      type: "Asosiasi Asuransi Syariah Indonesia (AASI)",
      date: "Februari 2024 - Februari 2026",
      credentialId: "3321012070258823",
      tags: ["Warehouse Operations", "Inventory Control", "WMS"],
      hideFileIcon: true,
      bgColor: "#1a5f7a",
      textColor: "#FFFFFF",
    },
    {
      title: "Sertifikasi Keagenan Asuransi Jiwa",
      description: "Advanced course on identifying, assessing, and mitigating risks in global supply chain networks.",
      type: "Asosiasi Asuransi Jiwa Indonesia (AAJI)",
      date: "Februari 2024 - Februari 2026",
      credentialId: "15270228",
      tags: ["Risk Management", "Global Supply Chain", "Mitigation"],
      hideFileIcon: true,
      bgColor: "#b71c1c",
      textColor: "#FFFFFF",
    },
    {
      title: "SAP01 - SAP Overview",
      description:
        "SAP01 is the prerequisite course for all other SAP courses. SAP01 is designed to provide the participant with baseline knowledge of SAP solutions, applications, components, and terminology. Because this is an overview course the details of the SAP applications and components are left to subsequent courses.",
      type: "Edugate Indonesia",
      date: "Januari 2024",
      tags: ["Enterprise Resource Planning", "Business Process Management", "Digital Business System"],
      link: "https://drive.google.com/file/d/1mJbFisDzebcPYk3EE5Ypv_Bvk5RbNgo_/view?usp=drive_link",
      bgColor: "#00B7F0",
      textColor: "#FFFFFF",
    },
    {
      title: "CEFR - B1 Intermediate (302)",
      description: "The global mobile English test and certificate. Built by academic experts, aligned to an international standard (CEFR) and delivered using the latest AI technology.",
      type: "British Council",
      date: "Jun 2023",
      tags: ["Language", "Proficiency", "English"],
      hideFileIcon: true,
      bgColor: "#23085A",
      textColor: "#FFFFFF",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDocPage((prev) => (prev === 0 ? Math.max(0, documentation.length - 3) : prev - 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [documentation.length, docPage]);

  const creativeProjects = [
    {
      title: "Open Source UI Library",
      description:
        "A modern, accessible React component library with comprehensive documentation and customizable themes.",
      category: "Open Source",
      image: "https://images.unsplash.com/photo-1742440710136-1976b1cad864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHN0dWRpb3xlbnwxfHx8fDE3NzI2MTk2MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["React", "TypeScript", "UI/UX"],
    },
    {
      title: "Personal Blog Platform",
      description:
        "A minimalist blogging platform built with modern web technologies, featuring markdown support and dark mode.",
      category: "Side Project",
      image: "https://images.unsplash.com/photo-1546380841-bf3afc314a5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGFydHdvcmslMjBhYnN0cmFjdHxlbnwxfHx8fDE3NzI2ODkwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["Next.js", "Blog", "Markdown"],
    },
  ];

  const [lang, setLang] = useState<'ID' | 'EN'>('ID');

  return (
    <div className="min-h-screen bg-[#F4F3F0] font-sans">
      <div className="fixed top-6 right-6 md:top-8 md:right-10 z-[100] flex items-center gap-2 font-sans text-sm font-semibold text-[#222222] bg-[#F4F3F0]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#5B6572]/20 shadow-sm">
        <span className={`cursor-pointer transition-opacity ${lang === 'EN' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`} onClick={() => setLang('EN')}>EN</span>
        <span className="opacity-40">|</span>
        <span className={`cursor-pointer transition-opacity ${lang === 'ID' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`} onClick={() => setLang('ID')}>ID</span>
      </div>
      <StickyHeader />
      <Hero lang={lang} />

      {/* Work Experience Section - Reverse Chronological Order (Latest to Earliest) */}
      <section id="experience" className="py-[25pt] bg-[#F4F3F0]">
        <div className="w-full px-[10pt]">
          
          <div className="relative w-full overflow-hidden flex py-8">
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee {
                animation: marquee 86s linear infinite;
              }
            `}} />
            <div 
              className={`flex gap-8 px-4 animate-marquee min-w-max group cursor-pointer`}
              style={{ animationPlayState: isCarouselPaused ? 'paused' : 'running' }}
              onClick={() => setIsCarouselPaused(!isCarouselPaused)}
            >
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-8 min-w-max items-start">
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <ExperienceCard {...experiences[6]} lang={lang} />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <ExperienceCard {...experiences[5]} lang={lang} />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <KspNusantaraExperience {...kspNusantaraData} lang={lang} />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <PosIndoExperience {...posIndoData} lang={lang} />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <ExperienceCard {...experiences[1]} lang={lang} />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <ExperienceCard {...experiences[0]} lang={lang} />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <ExperienceCard {...experiences[2]} lang={lang} />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <ExperienceCard {...experiences[4]} lang={lang} />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <ExperienceCard {...experiences[3]} lang={lang} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Proyek Section */}
      <section id="proyek" className="py-[25pt] bg-[#F4F3F0]">
        <div className="w-full px-[10pt]">
          <div id="documentation" className="relative">
            <div className="flex items-center justify-center gap-4 max-w-7xl mx-auto">
              <button
                onClick={() => setDocPage((prev) => (prev === 0 ? Math.max(0, documentation.length - 3) : prev - 1))}
                className="p-3 rounded-full bg-[#FFFFFF] shadow-md text-[#5B6572] hover:text-[#222222] hidden md:flex shrink-0 transition-all hover:scale-105"
                aria-label="Previous page"
              >
                <ChevronLeft size={36} />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {documentation.slice(docPage, docPage + 3).map((doc, index) => (
                  <DocumentationCard key={index} {...doc} />
                ))}
              </div>

              <button
                onClick={() => setDocPage((prev) => (prev >= Math.max(0, documentation.length - 3) ? 0 : prev + 1))}
                className="p-3 rounded-full bg-[#FFFFFF] shadow-md text-[#5B6572] hover:text-[#222222] hidden md:flex shrink-0 transition-all hover:scale-105"
                aria-label="Next page"
              >
                <ChevronRight size={36} />
              </button>
            </div>
            
            <div className="flex justify-center items-center gap-4 mt-8 md:hidden">
              <button
                onClick={() => setDocPage((prev) => (prev === 0 ? Math.max(0, documentation.length - 3) : prev - 1))}
                className="p-3 rounded-full bg-[#FFFFFF] shadow-md text-[#5B6572] shrink-0 transition-all hover:scale-105"
                aria-label="Previous page"
              >
                <ChevronLeft size={36} />
              </button>

              <button
                onClick={() => setDocPage((prev) => (prev >= Math.max(0, documentation.length - 3) ? 0 : prev + 1))}
                className="p-3 rounded-full bg-[#FFFFFF] shadow-md text-[#5B6572] shrink-0 transition-all hover:scale-105"
                aria-label="Next page"
              >
                <ChevronRight size={36} />
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Academic Logbook Section */}
      <section id="akademik" className="pt-[25pt] pb-[15pt] bg-[#F4F3F0]">
        <div className="w-full px-[10pt]">
          
          <div className="flex items-center justify-center gap-4 max-w-7xl mx-auto w-full">
            <div className="w-full max-w-5xl overflow-hidden min-h-[500px]">
              <div id="transcript" className="mb-8 flex items-center justify-between md:justify-center w-full gap-2 md:gap-8 px-2 md:px-0">
                <button
                  onClick={() => setTranscriptPage((prev) => (prev === 0 ? transcriptLevels.length - 1 : prev - 1))}
                  className="p-2 md:p-3 rounded-full bg-[#FFFFFF] shadow-md text-[#5B6572] hover:text-[#222222] flex shrink-0 transition-all hover:scale-105"
                  aria-label="Previous transcript"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="text-center flex flex-col items-center flex-1" style={{ gap: '5pt' }}>
                  <h3 className="text-2xl md:text-3xl text-[#222222] font-serif transition-opacity duration-300 m-0 leading-tight">
                    {transcriptLevels[transcriptPage].title}
                  </h3>
                  <p className="text-lg md:text-xl text-[#5B6572] font-serif transition-opacity duration-300 m-0 leading-tight">
                    {transcriptLevels[transcriptPage].institution}
                  </p>
                  {transcriptLevels[transcriptPage].period && (
                    <p className="text-sm md:text-base text-[#5B6572]/80 font-sans transition-opacity duration-300 m-0 leading-tight">
                      {transcriptLevels[transcriptPage].period}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setTranscriptPage((prev) => (prev >= transcriptLevels.length - 1 ? 0 : prev + 1))}
                  className="p-2 md:p-3 rounded-full bg-[#FFFFFF] shadow-md text-[#5B6572] hover:text-[#222222] flex shrink-0 transition-all hover:scale-105"
                  aria-label="Next transcript"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              
              <div className="overflow-hidden min-h-[400px]">
                <div key={transcriptPage}>
                  {transcriptPage === 0 && <HighSchoolTable />}
                  {transcriptPage === 1 && <TranscriptTable />}
                  {transcriptPage === 2 && <SixSigmaTable />}
                </div>
              </div>
            </div>
          </div>

          
          
          <div className="relative w-full overflow-hidden flex py-8 mt-12 mb-12">
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes marquee-reverse {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(0%); }
              }
              .animate-marquee-reverse {
                animation: marquee-reverse 78s linear infinite;
              }
            `}} />
            <div 
              className={`flex gap-8 px-4 animate-marquee-reverse min-w-max group cursor-pointer`}
              style={{ animationPlayState: isCarouselPaused ? 'paused' : 'running' }}
              onClick={() => setIsCarouselPaused(!isCarouselPaused)}
            >
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-8 min-w-max items-start">
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <FlipbookCard 
                      category="Kegiatan"
                      title="CHARACTER BUILDING KE-20"
                      content="Kegiatan Character Building ke-20 untuk pembentukan karakter."
                      darkImage="https://github.com/dhnaath/Resources-Portofolio/blob/main/CB%20(1)_page-0001.jpg?raw=true"
                      customIcon={<ArrowDownRight size={24} />}
                    />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <FlipbookCard 
                      category="Kegiatan"
                      title="LKMM TERABUMI 2021"
                      content="Latihan Keterampilan Manajemen Mahasiswa (LKMM) Tingkat Dasar."
                      darkImage="https://github.com/dhnaath/Resources-Portofolio/blob/main/LKMM.png?raw=true"
                      customIcon={<ArrowDownRight size={24} />}
                    />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <FlipbookCard 
                      category="Kunjungan Industri"
                      title="PT DSV Solutions Indonesia"
                      content="Mahasiswa tahun kedua Program Studi D3 dan D4 Logistik Bisnis melaksanakan kunjungan industri pada 9 Juni 2023 ke PT. DSV Solutions Indonesia (Pondok Ungu Site), Kota Bekasi, Jawa Barat."
                      darkImage="https://github.com/dhnaath/Resources-Portofolio/blob/main/KI.png?raw=true"
                      customIcon={<ArrowDownRight size={24} />}
                    />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <FlipbookCard 
                      category="Proyek Logistik I"
                      title="Business Process"
                      content="Tugas besar berupa observasi 𝗣𝗿𝗼𝘀𝗲𝘀 𝗕𝗶𝘀𝗻𝗶𝘀 milik perusahaan untuk memenuhi syarat kelulusan mata kuliah 𝗣𝗿𝗼𝘆𝗲𝗸 𝗟𝗼𝗴𝗶𝘀𝘁𝗶𝗸 𝟭 dalam kurikulum 𝗦𝗲𝗺𝗲𝘀𝘁𝗲𝗿 𝟮 pada studi 𝗦𝗮𝗿𝗷𝗮𝗻𝗮 𝗧𝗲𝗿𝗮𝗽𝗮𝗻 𝗟𝗼𝗴𝗶𝘀𝘁𝗶𝗸."
                      darkImages={[
                        "https://github.com/dhnaath/Resources-Portofolio/blob/main/1708894833625.jpg?raw=true",
                        "https://github.com/dhnaath/Resources-Portofolio/blob/main/1711427302442.jpg?raw=true"
                      ]}
                      customIcon={<ArrowDownRight size={24} />}
                    />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <FlipbookCard 
                      category="Proyek Logistik II"
                      title="Design Thinking"
                      content="Tugas besar berbentuk 𝗗𝗲𝘀𝗶𝗴𝗻 𝗧𝗵𝗶𝗻𝗸𝗶𝗻𝗴 untuk memenuhi syarat kelulusan mata kuliah 𝗣𝗿𝗼𝘆𝗲𝗸 𝗟𝗼𝗴𝗶𝘀𝘁𝗶𝗸 𝟮 dalam kurikulum 𝗦𝗲𝗺𝗲𝘀𝘁𝗲𝗿 𝟯 pada studi 𝗦𝗮𝗿𝗷𝗮𝗻𝗮 𝗧𝗲𝗿𝗮𝗽𝗮𝗻 𝗟𝗼𝗴𝗶𝘀𝘁𝗶𝗸."
                      darkImage="https://media.licdn.com/dms/image/v2/D562DAQGfDCaKyTBnxg/profile-treasury-image-shrink_1280_1280/profile-treasury-image-shrink_1280_1280/0/1708894056035?e=1783872000&v=beta&t=FMeYzo6FTMaXfSZAXu5_nb4L_nozmOB4LeCjJ1i8zU4"
                      customIcon={<ArrowDownRight size={24} />}
                    />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <FlipbookCard 
                      category="Proyek Logistik III"
                      title="House of Quality"
                      content="Tugas besar berbentuk 𝗛𝗼𝘂𝘀𝗲 𝗼𝗳 𝗤𝘂𝗮𝗹𝗶𝘁𝘆 (𝗛𝗢𝗤) untuk memenuhi syarat kelulusan mata kuliah 𝗣𝗿𝗼𝘆𝗲𝗸 𝗟𝗼𝗴𝗶𝘀𝘁𝗶𝗸 𝟯 dalam kurikulum 𝗦𝗲𝗺𝗲𝘀𝘁𝗲𝗿 𝟱 pada studi 𝗦𝗮𝗿𝗷𝗮𝗻𝗮 𝗧𝗲𝗿𝗮𝗽𝗮𝗻 𝗟𝗼𝗴𝗶𝘀𝘁𝗶𝗸."
                      darkContent="HOQ Inovasi Whoosh Pengiriman Barang Same Day Jakarta-Bandung"
                      darkImages={[
                        "https://github.com/dhnaath/Resources-Portofolio/blob/main/1708894126465.jpg?raw=true",
                        "https://github.com/dhnaath/Resources-Portofolio/blob/main/1714586513717.jpg?raw=true"
                      ]}
                      customIcon={<ArrowDownRight size={24} />}
                    />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <FlipbookCard 
                      category="Seminar"
                      title="International Joint Effort Seminar Programme on Logistics and Supply Chain"
                      content="Seminar dan Kompetisi Internasional dengan tema Inovasi pada Logistik dan Supply Chain Management hasil kolaborasi dengan Politeknik Nilai Malaysia"
                      darkImages={[
                        "https://github.com/dhnaath/Resources-Portofolio/blob/main/seminar%20baru.png?raw=true",
                        "https://github.com/dhnaath/Resources-Portofolio/blob/main/1709873546407.jpg?raw=true"
                      ]}
                      customIcon={<ArrowDownRight size={24} />}
                    />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <FlipbookCard 
                      category="Seminar"
                      title="Awardee for Favorite Judges"
                      content="Penghargaan untuk Favorite Judges pada acara Seminar Internasional."
                      darkImages={[
                        "https://github.com/dhnaath/Resources-Portofolio/blob/main/APPRECIATION%20CERT_page-0001.jpg?raw=true",
                        "https://github.com/dhnaath/Resources-Portofolio/blob/main/FAVJUDG.png?raw=true"
                      ]}
                      customIcon={<ArrowDownRight size={24} />}
                    />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <FlipbookCard 
                      category="Kerja Praktik I"
                      title="Rencana Penelitian"
                      content="Sebagai syarat untuk memenuhi kelulusan pada mata kuliah 𝗞𝗲𝗿𝗷𝗮 𝗣𝗿𝗮𝗸𝘁𝗶𝗸 𝟭 dan 𝗟𝗮𝗽𝗼𝗿𝗮𝗻 𝗔𝗸𝗵𝗶𝗿 dalam kurikulum 𝗦𝗲𝗺𝗲𝘀𝘁𝗲𝗿 𝟳 pada studi 𝗦𝗮𝗿𝗷𝗮𝗻𝗮 𝗧𝗲𝗿𝗮𝗽𝗮𝗻 𝗟𝗼𝗴𝗶𝘀𝘁𝗶𝗸."
                      darkContent="Optimalisasi Persediaan Toyota Motor Oil (TMO) Engine Oil pada Gudang Suku Cadang Toyota Auto2000 Cabang Pasteur Menggunakan Metode EOQ Deterministik dan Least Unit Cost"
                      customIcon={<div className="flex items-center gap-2"><FileText size={24} /><ArrowDownRight size={24} /></div>}
                      link="https://drive.google.com/file/d/1ZpdHl4ABP2CNCyaZlSs19R5ngxjG09Ke/view?usp=drive_link"
                    />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <FlipbookCard 
                      category="Kerja Praktik II"
                      title="Skripsi"
                      content="Sebagai syarat untuk memenuhi kelulusan pada mata kuliah 𝗞𝗲𝗿𝗷𝗮 𝗣𝗿𝗮𝗸𝘁𝗶𝗸 𝟮 dan 𝗦𝗸𝗿𝗶𝗽𝘀𝗶 dalam kurikulum 𝗦𝗲𝗺𝗲𝘀𝘁𝗲𝗿 𝟴 pada studi 𝗦𝗮𝗿𝗷𝗮𝗻𝗮 𝗧𝗲𝗿𝗮𝗽𝗮𝗻 𝗟𝗼𝗴𝗶𝘀𝘁𝗶𝗸."
                      darkContent="Analisis Kualitas Pelayanan PT. Pos Indonesia (Persero) Cabang KPRK Sintang 78600 untuk Meningkatkan Kepuasan Pelanggan dengan Integrasi ServQual dan IPA"
                      customIcon={<div className="flex items-center gap-2"><FileText size={24} /><ArrowDownRight size={24} /></div>}
                      link="https://drive.google.com/file/d/1ACG-GMGG3btYs0Vz0ZdQHzoa4eNDucmU/view?usp=drive_link"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingDocuments />
      <FloatingMetaButton />
    </div>
  );
}

export default App;