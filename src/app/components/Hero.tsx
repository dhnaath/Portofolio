import { motion } from "motion/react";
import { useState } from "react";
import { Header } from "./Header";

export function Hero() {
  return (
    <section id="home" className="flex flex-col items-center justify-center bg-[#F9F8F5] relative pt-[46pt] pb-0 px-[10pt]">
      <div className="flex flex-col items-center max-w-[calc(56rem+220pt)] w-full text-center mb-16 -translate-y-[30pt]">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-[19rem] h-[19rem] md:w-[22rem] md:h-[22rem] rounded-full overflow-hidden mb-12 shadow-lg ring-4 ring-gray-900"
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
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-serif tracking-tight mb-8 uppercase"
        >
          DHIA NAJMI ATHALLAH
        </motion.h1>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col gap-6 text-gray-700 font-cambria text-lg md:text-xl leading-relaxed max-w-[calc(48rem+220pt)]"
        >
          <p>
            <strong>Systems Thinker</strong> &middot; <em>noun</em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Lifelong Learning</strong> &middot; <em>adjective</em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Lillāhi Ta'ālā</strong> &middot; <em>verb</em>
          </p>
          <p>
            <strong>Systems Thinking</strong> membentuk cara saya berpikir melalui refleksi yang mendalam, analisis pola, dan eksplorasi berbagai kemungkinan; <strong>Lifelong Learning</strong> membentuk cara saya berkembang melalui pembelajaran sepanjang hayat; serta <strong>Lillāhi Ta'ālā</strong> menjadi landasan saya berkarya dan bekerja sebagai bentuk ikhtiar meraih ridha Allah.
          </p>
        </motion.div>
        
        <div className="mt-[25pt] w-full">
          <Header />
        </div>
      </div>
    </section>
  );
}
