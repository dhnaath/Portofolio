import { motion } from "motion/react";
import { useState } from "react";
import { Header } from "./Header";

export function Hero({ lang = 'ID' }: { lang?: 'ID' | 'EN' }) {
  return (
    <section id="home" className="flex flex-col items-center justify-center bg-[#F4F3F0] relative py-[25pt] px-[10pt]">
      <div className="flex flex-col items-center max-w-[calc(56rem+220pt)] w-full text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-[19rem] h-[19rem] md:w-[22rem] md:h-[22rem] rounded-full overflow-hidden mb-12 shadow-lg ring-4 ring-[#222222]"
        >
          <img 
            src="https://github.com/dhnaath/Website-Portofolio/blob/main/1759679247410.Salinan%20DSCF0132@1715148060.JPG?raw=true" 
            alt="Dhia Najmi Athallah" 
            className="w-full h-full object-cover object-top"
          />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#222222] font-serif tracking-tight mb-8 uppercase"
        >
          DHIA NAJMI ATHALLAH
        </motion.h1>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col gap-6 text-[#5B6572] font-cambria text-lg md:text-xl leading-relaxed max-w-[calc(48rem+220pt)]"
        >
          <p>
            <strong>Systems Thinker</strong> &middot; <em>noun</em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Lifelong Learning</strong> &middot; <em>adjective</em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Lillāhi Ta'ālā</strong> &middot; <em>verb</em>
          </p>
          <p>
            {lang === 'EN' ? (
              <>
                <strong>Systems Thinking</strong> shapes my way of thinking through deep reflection, pattern analysis, and exploring possibilities; <strong>Lifelong Learning</strong> shapes my journey of continuous growth; and <strong>Lillāhi Ta'ālā</strong> is the foundation of my work and contributions as I strive to seek Allah's pleasure.
              </>
            ) : (
              <>
                <strong>Systems Thinking</strong> membentuk cara saya berpikir melalui refleksi yang mendalam, analisis pola, dan eksplorasi berbagai kemungkinan; <strong>Lifelong Learning</strong> membentuk cara saya berkembang melalui pembelajaran sepanjang hayat; serta <strong>Lillāhi Ta'ālā</strong> menjadi landasan saya berkarya dan bekerja sebagai bentuk ikhtiar meraih ridha Allah.
              </>
            )}
          </p>
        </motion.div>
        
        <div className="mt-[25pt] w-full">
          <Header />
        </div>
      </div>
    </section>
  );
}
