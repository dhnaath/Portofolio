import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { StickyHeader } from "./components/StickyHeader";
import { motion } from "motion/react";

function FlipbookCard({ category, title, content, darkContent, link }: { category: string, title: string, content: React.ReactNode, darkContent?: React.ReactNode, link?: string }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'spill' | 'text' | 'revert'>('idle');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [currentDirection, setCurrentDirection] = useState<'left' | 'right' | 'up' | 'down'>('left');
  const [revertDirection, setRevertDirection] = useState<'left' | 'right' | 'up' | 'down'>('right');

  useEffect(() => {
    let isMounted = true;
    
    const initialDelay = Math.random() * 2000;
    const directions: ('left' | 'right' | 'up' | 'down')[] = ['left', 'right', 'up', 'down'];
    
    const run = async () => {
      await new Promise(r => setTimeout(r, initialDelay));
      while(isMounted) {
        setPhase('idle');
        // Randomize direction before each animation cycle
        setCurrentDirection(directions[Math.floor(Math.random() * directions.length)]);
        setRevertDirection(directions[Math.floor(Math.random() * directions.length)]);
        // Wait in idle for 7.5s
        await new Promise(r => setTimeout(r, 7500));
        if (!isMounted) break;
        
        setPhase('spill');
        // Slide animation duration
        await new Promise(r => setTimeout(r, 1200));
        if (!isMounted) break;
        
        setPhase('text');
        // Hold short paragraph for 6 seconds
        await new Promise(r => setTimeout(r, 6000));
        if (!isMounted) break;
        
        setPhase('revert');
        // Revert animation duration
        await new Promise(r => setTimeout(r, 1000));
      }
    };
    run();
    return () => { isMounted = false; };
  }, []);

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
      className="relative w-full md:w-[500px] h-[400px] cursor-pointer [perspective:1500px]"
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

          {/* Hidden Short Paragraph */}
          <motion.div 
            className="absolute z-20 text-[#FFFFFF] p-8 text-center flex flex-col justify-center items-center"
            initial={false}
            animate={{ 
              opacity: phase === 'text' ? 1 : 0,
              y: phase === 'text' ? 0 : 20,
              scale: phase === 'text' ? 1 : 0.95
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ pointerEvents: phase === 'text' ? 'auto' : 'none' }}
          >
            <p className="font-cambria text-xl italic leading-relaxed">
              {darkContent || '"Terkadang apa yang terlihat di luar, menyembunyikan sesuatu yang lebih dalam."'}
            </p>
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
            <ExternalLink size={24} />
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
import { CVFlipbook } from "./components/CVFlipbook";
import { FlipbookReveal } from "./components/FlipbookReveal";
import { FloatingMetaButton } from "./components/FloatingMetaButton";
import { FloatingDocuments } from "./components/FloatingDocuments";
import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

function App() {
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [docPage, setDocPage] = useState(0);

  // PT Pos Indonesia - Multiple Positions (Mosaic Layout)
  const posIndoData = {
    company: "PT. Pos Indonesia (Persero) - PosIND",
    companyLogo: "https://logo.clearbit.com/posindonesia.co.id",
    description: "BUMN; Danantara; Administrasi; Operasional; Marketing",
    positions: [
      {
        title: "Assistant Branch Manager",
        period: "3 Maret s.d. 9 April 2025",
        location: "Kantor PosIND KCP Lanjak 78766",
        achievements: [
          "Mempersiapkan uang tunai untuk setoran bank, mengisi slip setoran, serta melakukan rekonsiliasi kas harian guna memastikan kesesuaian fisik uang dengan catatan sistem.",
          "Menutup sistem loket kasir secara harian dengan menyusun laporan backsheet, serta menyelidiki dan menyelesaikan apabila terjadi selisih dana.",
          "Memproses dan mencatat pembayaran berbagai tagihan pelanggan melalui sistem PosPay Loket serta menerbitkan bukti transaksi/tanda terima yang sah.",
          "Memeriksa keaslian dan kelengkapan dokumen identitas pelanggan (KTP/KK) untuk keperluan reaktivasi akun atau rekening tidak aktif.",
          "Memverifikasi dokumen penyaluran Bantuan Sosial Tunai (BST) Kemensos, mencairkan dana sesuai prosedur, serta menjaga jejak audit dokumen bersama Branch Manager."
        ],
        image: "https://github.com/dhnaath/Website-Portofolio/blob/main/1741149010112.jpg?raw=true",
        image2: "https://github.com/dhnaath/Website-Portofolio/blob/main/1744248285339.jpg?raw=true",
        image3: "https://github.com/dhnaath/Website-Portofolio/blob/main/1741061244804.jpg?raw=true",
      },
      {
        title: "Assistant Supervisor",
        period: "10 April s.d. 1 Juni 2025",
        location: "Kantor PosIND KPRK Sintang 78600",
        achievements: [
          "Mencetak serta memverifikasi data penerima manfaat program bantuan sosial Kemensos, sekaligus melakukan penandaan koordinat lokasi rumah untuk akurasi data lapangan.",
          "Mengorganisir dan mengarsipkan dokumentasi foto lapangan secara sistematis berdasarkan wilayah guna menjaga keakuratan catatan dan kesiapan laporan.",
          "Melakukan penjemputan (pickup) paket pelanggan, mengelola proses penyortiran di area gudang, serta mencetak dan menempelkan label pengiriman sesuai standar.",
          "Melakukan pemeliharaan rutin pada perangkat inventaris tim, serta melakukan instalasi dan penanganan masalah (troubleshooting) dasar pada perangkat keras dan lunak.",
          "Berkoordinasi aktif dengan tim internal maupun divisi lain untuk mendukung kelancaran kegiatan distribusi, penjualan, serta sosialisasi terdokumentasi di lapangan."
        ],
        image: "https://github.com/dhnaath/Website-Portofolio/blob/main/1744606643657.jpg?raw=true",
        image2: "https://github.com/dhnaath/Website-Portofolio/blob/main/1745206623859.jpg?raw=true",
        image3: "https://github.com/dhnaath/Website-Portofolio/blob/main/1746614254530.jpg?raw=true",
      },
    ],
  };

  // KSP Nusantara - Multiple Positions (Mosaic Layout)
  const kspNusantaraData = {
    company: "KSP Nusantara - KopnusPos",
    companyLogo: "https://logo.clearbit.com/kspnusantara.co.id",
    description: "Keuangan; Koperasi; Marketing; Sales; Pembiayaan Pensiun",
    positions: [
      {
        title: "Agen Oren by KOPNUS",
        period: "November 2025 s.d. Sekarang",
        location: "KSP Nusantara - KopnusPos",
        achievements: [
          "Melaksanakan tugas pemasaran dan akuisisi klien yang setara dengan peran Account Officer Lending.",
          "Mengikuti dan menyesuaikan diri terhadap arah peraturan serta kebijakan yang diperbarui oleh pemerintah maupun perusahaan."
        ],
        image: "https://raw.githubusercontent.com/dhnaath/Website-Portofolio/main/1763565179282.jpg",
      },
      {
        title: "Account Officer Lending",
        period: "September s.d. November 2025",
        location: "Kantor PosIND KCP Putussibau 78711",
        achievements: [
          "Memasarkan produk pinjaman pensiun (PNS, TNI, Polri) secara aktif melalui pendekatan langsung (door-to-door), menggunakan brosur cetak, serta memakai pesan siaran via WhatsApp.",
          "Mengelola seluruh siklus proses kredit mulai dari analisis kebutuhan klien, verifikasi dokumen, koordinasi asuransi, hingga pencairan dana, serta berkoordinasi dengan staf PosIND dan kantor cabang.",
          "Membangun hubungan baik dengan komunitas pensiunan, mitra juru bayar lain, dan pegawai pemerintah aktif, sekaligus memberikan edukasi terkait regulasi terbaru serta penggunaan aplikasi penunjang (Taspen/Asabri).",
          "Menyusun laporan kunjungan harian (pipeline) dan hasil prospek secara rutin sebagai bahan evaluasi kerja, serta menangani keluhan dan masukan klien dengan solutif.",
          "Mendesain ulang materi promosi dan brosur cetak/digital guna meningkatkan daya tarik visual, memperluas jangkauan pasar, dan menarik minat calon nasabah secara efektif."
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
      company: "Huachuang Singapore Pte. Ltd. - TISCE",
      location: "Singapore (Remote)",
      period: "November 2024 s.d. Februari 2025",
      description: "Sourcing Platform; Global Partnership; RFQ; B2B; Freelance",
      companyLogo: "https://logo.clearbit.com/tisce.com",
      achievements: [
        "Mencari dan menjaring calon pembeli lokal yang membutuhkan pasokan barang atau mesin industri dari China.",
        "Mengumpulkan dan memverifikasi spesifikasi kebutuhan barang serta detail kontak pembeli guna menyusun dokumen Request for Quotation (RFQ) yang akurat sebelum diajukan ke platform.",
        "Memantau respons dari pemasok dan menindaklanjuti penawaran kepada calon pembeli sesuai standar yang berlaku untuk mendukung kelancaran proses pengadaan."
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
      company: "PT. Astra International Tbk - Toyota Sales Operation (TSO-Auto2000)",
      location: "Auto2000 Pasteur – Jl. Djunjunan No. 192, Kota Bandung, Jawa Barat",
      period: "7 Oktober 2024 s.d. 5 Januari 2025",
      description: "Pergudangan; Persediaan; Suku Cadang; Otomotif; Dealer",
      companyLogo: "https://logo.clearbit.com/auto2000.co.id",
      achievements: [
        "Mengoptimalkan penataan rak penyimpanan suku cadang berdasarkan kode standar agar alur kerja gudang jadi lebih rapi dan efisien.",
        "Mengelola keakuratan data stok di gudang lewat stock opname berkala dan langsung memperbarui datanya di sistem Warehouse Management System (WMS).",
        "Mengelola proses inbound dan outbound suku cadang, mulai dari pencocokan Goods Received Note (GRN) dengan Purchase Order (PO), hingga proses picking, packing, labeling, dan distribusi ke area bengkel.",
        "Melakukan rekonsiliasi data Special Service Tools (SST) dan suku cadang pada sistem, serta memantau pergerakan utilisasi alat oleh teknisi untuk meminimalisir risiko kehilangan sesuai standar operasional.",
        "Berkoordinasi aktif dengan kasir, teknisi, dan Service Advisor (SA) di bawah arahan Partman utama untuk menjaga standar operasional dan layanan serta kepatuhan aturan kebersihan dan keselamatan dealer."
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
      employmentType: "Magang Daring Tidak Berbayar (Internship)",
      description: "Mentorship; Pelatihan; Pengembangan; Rancang Program",
      companyLogo: "https://media.licdn.com/dms/image/v2/D560BAQHq92_6k5x9Rw/company-logo_200_200/company-logo_200_200/0/1709605663731/govokasi_logo?e=2147483647&v=beta&t=0G0L44K_N8bM2A1pQ41q7w0M_oX3uK5x4K_j5m0hG_4",
      achievements: [
        "Melakukan riset pasar dan audiens untuk mendukung posisi perusahaan, penyampaian pesan dan tujuan, dan pemilihan program kegiatan.",
        "Mengembangkan strategi pemasaran untuk rencana kegiatan program berdasarkan temuan riset dan hasil diskusi tim.",
        "Mendukung koordinasi tim yang beranggotakan mahasiswa dari kampus lain pada fase awal program, termasuk pembagian tugas dan penjadwalan presentasi di hadapan para mentor dan tim lain."
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
      company: "Prudential Life Assurance (PLA) & Sharia Life Assurance (PSLA)",
      location: "KPM BD 21 – Malabar, Kota Bandung, Jawa Barat",
      period: "Februari s.d. Desember 2024",
      employmentType: "Mandiri, Berbasis Komisi, Tanpa Gaji Pokok (Freelancer)",
      description: "Keuangan; Asuransi Jiwa; Asuransi Kesehatan; Takaful Keluarga",
      companyLogo: "https://logo.clearbit.com/prudential.co.id",
      achievements: [
        "Menganalisis profil risiko, tujuan keuangan, dan kemampuan premi calon nasabah untuk merancang proposal ilustrasi asuransi (konvensional/syariah) yang sesuai kebutuhan.",
        "Membimbing calon nasabah dalam penyiapan dokumen SPAJ, menjelaskan hak-kewajiban secara transparan, serta mengawal proses pengajuan proposal.",
        "Berkoordinasi aktif dengan tim internal serta rutin mengikuti pelatihan, seminar, dan ujian sertifikasi produk baru guna menjaga pemahaman materi tetap aktual.",
        "Menjaga kepatuhan terhadap kode etik keagenan berdasarkan lisensi AAJI-AASI, serta memastikan seluruh proses layanan sejalan dengan regulasi OJK.",
        "Memantau perkembangan tren produk asuransi serta dinamika pasar ekonomi untuk memberikan edukasi literasi keuangan yang tepat kepada masyarakat."
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
      company: "GAO (Global Advanced Operations) Tek Inc.",
      location: "Remote",
      period: "Agustus 2024",
      employmentType: "Magang Daring Tidak Berbayar (Internship)",
      description: "Pelatihan; Promosi; Penjualan; Unpaid Internship; Remote",
      companyLogo: "https://logo.clearbit.com/gaotek.com",
      achievements: [
        "Melakukan screening awal terhadap resume pelamar, menyaring kandidat potensial (shortlisting), serta mengelola proses tindak lanjut hasil seleksi.",
        "Mengoptimalkan publikasi lowongan kerja (job posting) dan materi promosi rekrutmen secara berkala di berbagai platform profesional seperti LinkedIn dan Glints.",
        "Mengatur jadwal pertemuan, mengirimkan undangan atau pengingat, serta menyiapkan agenda diskusi dengan kandidat.",
        "Menangani seluruh jalur komunikasi internal maupun eksternal melalui MS Teams, Outlook, Skype, dan LinkedIn untuk memastikan penyampaian informasi berjalan jelas dan tepat waktu.",
        "Bekerja sama dengan rekan tim dan Squad Leader (SL) dan Assistant Squad Leader (ASL) dalam memastikan akurasi dan pelaksanaan tugas."
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
          Grab Teknologi Indonesia<br />
          Shopee Internasional Indonesia<br />
          Teknologi Perdana Indonesia
        </>
      ),
      location: "Pontianak",
      period: "Feb 2026 s.d. Sekarang",
      employmentType: "Mandiri, Tanpa Jam Operasional dan Wilayah Tetap (Freelancer)",
      description: "Transportasi; Jasa Layanan; Kurir-Ojek; Pesan-Antar; Aplikasi",
      achievements: [
        "Melayani transportasi penumpang serta distribusi makanan dan paket barang dengan memastikan keamanan, kebersihan, dan ketepatan waktu hingga ke lokasi tujuan.",
        "Berkoordinasi secara aktif dengan pelanggan, mitra restoran, dan pihak keamanan/parkir demi kelancaran proses ambil-antar pesanan.",
        "Mengatur rute perjalanan secara mandiri dan mengelola waktu secara efisien untuk memaksimalkan performa akun serta mencapai target harian.",
        "Mematuhi standar operasional dengan menggunakan atribut resmi serta merawat kondisi kendaraan secara rutin guna meminimalisir kendala teknis di jalan."
      ],
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      images: [
        "https://play-lh.googleusercontent.com/OmBwUGuTJxaV0gW04sQjvGaxlgxHr83z88dQCD0gJy7_dX9gM2APUE6CmyWFT27kb1-ASDQq5iZlNnkfwsjgdQ=w480-h960-rw",
        "https://play-lh.googleusercontent.com/gvn6nri4v_KAjbR2KW_iWmbGUmrJYiP-QRVAmpCUmFHvza2gqw2MI6qS9U7o3J_XZM8UKlm4aKjaOEddJKDO3w=w480-h960-rw",
        "https://play-lh.googleusercontent.com/2INhmztKw86TAsrMDdYj_BLMNsvIBv968VPsNpFSIEjB2E2vRu0r-Z-E9PDjBNukKBgmmp2xxfs6tYBIInkNBQ=w480-h960-rw"
      ],
    },
    // 7. Mandiri Utama Finance
    {
      title: "Mitra MUF Dana",
      company: "PT. Mandiri Utama Finance – MUF",
      location: "Pontianak, Kalimantan Barat",
      period: "Mar 2026 s.d. Sekarang",
      employmentType: "Mandiri, Berbasis Komisi, Tanpa Gaji, Tanpa Absensi (Freelancer)",
      description: "BUMN; Keuangan; Leasing; Pembiayaan Kendaraan; Sales",
      companyLogo: "https://logo.clearbit.com/muf.co.id",
      achievements: [
        "Memasarkan produk pinjaman dana tunai dengan jaminan BPKB kendaraan, baik untuk roda dua (motor) maupun roda empat (mobil).",
        "Menyesuaikan produk pembiayaan yang akan diajukan agar sejalan dengan kebutuhan serta kemampuan finansial calon klien.",
        "Mendampingi klien dalam proses pengajuan, mulai dari melengkapi berkas dokumen hingga dana berhasil dicairkan.",
        "Berkoordinasi secara aktif dengan tim MUF untuk memastikan proses administrasi dan pengajuan berjalan sesuai standar operasional yang berlaku."
      ],
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    }
  ];

  const documentation = [
    {
      title: "API Documentation Framework",
      description:
        "Comprehensive documentation system for RESTful APIs with interactive examples and code snippets in multiple languages.",
      type: "Technical Documentation",
      tags: ["API", "REST", "OpenAPI", "Documentation"],
      link: "#",
    },
    {
      title: "User Guide: Cloud Platform",
      description:
        "End-user documentation for cloud platform onboarding, featuring step-by-step tutorials and troubleshooting guides.",
      type: "User Documentation",
      tags: ["Cloud", "Tutorial", "User Guide"],
      link: "#",
    },
    {
      title: "Architecture Design Documents",
      description:
        "Series of design documents outlining system architecture, data flow diagrams, and technical specifications for enterprise applications.",
      type: "Technical Specification",
      tags: ["Architecture", "System Design", "Enterprise"],
      link: "#",
    }
  ];

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

  return (
    <div className="min-h-screen bg-[#F4F3F0] font-sans">
      <StickyHeader />
      <Hero />

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
                animation: marquee 88s linear infinite;
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
                    <ExperienceCard {...experiences[6]} />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <ExperienceCard {...experiences[5]} />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <KspNusantaraExperience {...kspNusantaraData} />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <PosIndoExperience {...posIndoData} />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <ExperienceCard {...experiences[1]} />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <ExperienceCard {...experiences[0]} />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <ExperienceCard {...experiences[2]} />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <ExperienceCard {...experiences[4]} />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <ExperienceCard {...experiences[3]} />
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
                onClick={() => setDocPage((prev) => Math.max(0, prev - 1))}
                disabled={docPage === 0}
                className="p-2 rounded-full bg-[#FFFFFF] shadow-md text-[#5B6572] hover:text-[#222222] disabled:opacity-50 disabled:cursor-not-allowed hidden md:flex shrink-0"
                aria-label="Previous page"
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {documentation.slice(docPage * 3, docPage * 3 + 3).map((doc, index) => (
                  <DocumentationCard key={index} {...doc} />
                ))}
              </div>

              <button
                onClick={() => setDocPage((prev) => Math.min(Math.ceil(documentation.length / 3) - 1, prev + 1))}
                disabled={docPage >= Math.ceil(documentation.length / 3) - 1 || documentation.length === 0}
                className="p-2 rounded-full bg-[#FFFFFF] shadow-md text-[#5B6572] hover:text-[#222222] disabled:opacity-50 disabled:cursor-not-allowed hidden md:flex shrink-0"
                aria-label="Next page"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            <div className="flex justify-center items-center gap-4 mt-8 md:hidden">
              <button
                onClick={() => setDocPage((prev) => Math.max(0, prev - 1))}
                disabled={docPage === 0}
                className="p-2 rounded-full bg-[#FFFFFF] shadow-md text-[#5B6572] disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                aria-label="Previous page"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={() => setDocPage((prev) => Math.min(Math.ceil(documentation.length / 3) - 1, prev + 1))}
                disabled={docPage >= Math.ceil(documentation.length / 3) - 1 || documentation.length === 0}
                className="p-2 rounded-full bg-[#FFFFFF] shadow-md text-[#5B6572] disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                aria-label="Next page"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Academic Logbook Section */}
      <section id="akademik" className="py-[25pt] bg-[#F4F3F0]">
        <div className="w-full px-[10pt]">
          
          <div className="relative w-full overflow-hidden flex py-8 mb-12">
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes marquee-reverse {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(0%); }
              }
              .animate-marquee-reverse {
                animation: marquee-reverse 66s linear infinite;
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
                      category="Proyek Logistik I"
                      title="Business Process"
                      content="Tugas besar berupa observasi 𝗣𝗿𝗼𝘀𝗲𝘀 𝗕𝗶𝘀𝗻𝗶𝘀 milik perusahaan untuk memenuhi syarat kelulusan mata kuliah 𝗣𝗿𝗼𝘆𝗲𝗸 𝗟𝗼𝗴𝗶𝘀𝘁𝗶𝗸 𝟭 dalam kurikulum 𝗦𝗲𝗺𝗲𝘀𝘁𝗲𝗿 𝟮 pada studi 𝗦𝗮𝗿𝗷𝗮𝗻𝗮 𝗧𝗲𝗿𝗮𝗽𝗮𝗻 𝗟𝗼𝗴𝗶𝘀𝘁𝗶𝗸."
                      darkContent="Observasi TKBM pada PT. Persero Batam"
                    />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <FlipbookCard 
                      category="Proyek Logistik II"
                      title="Design Thinking"
                      content="Tugas besar berbentuk 𝗗𝗲𝘀𝗶𝗴𝗻 𝗧𝗵𝗶𝗻𝗸𝗶𝗻𝗴 untuk memenuhi syarat kelulusan mata kuliah 𝗣𝗿𝗼𝘆𝗲𝗸 𝗟𝗼𝗴𝗶𝘀𝘁𝗶𝗸 𝟮 dalam kurikulum 𝗦𝗲𝗺𝗲𝘀𝘁𝗲𝗿 𝟯 pada studi 𝗦𝗮𝗿𝗷𝗮𝗻𝗮 𝗧𝗲𝗿𝗮𝗽𝗮𝗻 𝗟𝗼𝗴𝗶𝘀𝘁𝗶𝗸."
                      darkContent="Pembungkus Paket dari Pati Singkong"
                    />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <FlipbookCard 
                      category="Proyek Logistik III"
                      title="House of Quality"
                      content="Tugas besar berbentuk 𝗛𝗼𝘂𝘀𝗲 𝗼𝗳 𝗤𝘂𝗮𝗹𝗶𝘁𝘆 (𝗛𝗢𝗤) untuk memenuhi syarat kelulusan mata kuliah 𝗣𝗿𝗼𝘆𝗲𝗸 𝗟𝗼𝗴𝗶𝘀𝘁𝗶𝗸 𝟯 dalam kurikulum 𝗦𝗲𝗺𝗲𝘀𝘁𝗲𝗿 𝟱 pada studi 𝗦𝗮𝗿𝗷𝗮𝗻𝗮 𝗧𝗲𝗿𝗮𝗽𝗮𝗻 𝗟𝗼𝗴𝗶𝘀𝘁𝗶𝗸."
                      darkContent="HOQ Inovasi Whoosh Pengiriman Barang Same Day Jakarta-Bandung"
                    />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <FlipbookCard 
                      category="Kerja Praktik II"
                      title="Skripsi"
                      content="Sebagai syarat untuk memenuhi kelulusan pada mata kuliah 𝗞𝗲𝗿𝗷𝗮 𝗣𝗿𝗮𝗸𝘁𝗶𝗸 𝟮 dan 𝗦𝗸𝗿𝗶𝗽𝘀𝗶 dalam kurikulum 𝗦𝗲𝗺𝗲𝘀𝘁𝗲𝗿 𝟴 pada studi 𝗦𝗮𝗿𝗷𝗮𝗻𝗮 𝗧𝗲𝗿𝗮𝗽𝗮𝗻 𝗟𝗼𝗴𝗶𝘀𝘁𝗶𝗸."
                      darkContent="Analisis Kualitas Pelayanan PT. Pos Indonesia (Persero) Cabang KPRK Sintang 78600 untuk Meningkatkan Kepuasan Pelanggan dengan Integrasi ServQual dan IPA"
                    />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <FlipbookCard 
                      category="Seminar"
                      title="International Joint Effort Seminar Programme on Logistics and Supply Chain"
                      content="Seminar dan Kompetisi Internasional dengan tema Inovasi pada Logistik dan Supply Chain Management hasil kolaborasi dengan Politeknik Nilai Malaysia"
                      darkContent="Awardee for Favorite Judges"
                    />
                  </div>
                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
                    <FlipbookCard 
                      category="Kerja Praktik I"
                      title="Rencana Penelitian"
                      content="Sebagai syarat untuk memenuhi kelulusan pada mata kuliah 𝗞𝗲𝗿𝗷𝗮 𝗣𝗿𝗮𝗸𝘁𝗶𝗸 𝟭 dan 𝗟𝗮𝗽𝗼𝗿𝗮𝗻 𝗔𝗸𝗵𝗶𝗿 dalam kurikulum 𝗦𝗲𝗺𝗲𝘀𝘁𝗲𝗿 𝟳 pada studi 𝗦𝗮𝗿𝗷𝗮𝗻𝗮 𝗧𝗲𝗿𝗮𝗽𝗮𝗻 𝗟𝗼𝗴𝗶𝘀𝘁𝗶𝗸."
                      darkContent="Optimalisasi Persediaan Toyota Motor Oil (TMO) Engine Oil pada Gudang Suku Cadang Toyota Auto2000 Cabang Pasteur Menggunakan Metode EOQ Deterministik dan Least Unit Cost"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="transcript" className="text-center mb-12">
            <h3 className="text-3xl mb-4 text-[#222222] font-serif">Sarjana Terapan Logistik (S.Tr.Log.)</h3>
          </div>
          <TranscriptTable />
        </div>
      </section>

      <Footer />
      <FloatingDocuments />
      <FloatingMetaButton />
    </div>
  );
}

export default App;