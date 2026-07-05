const fs = require('fs');
const content = fs.readFileSync('src/app/App.tsx', 'utf8');

const targetStr = `                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
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
                      category="Kerja Praktik II"
                      title="Skripsi"
                      content="Sebagai syarat untuk memenuhi kelulusan pada mata kuliah 𝗞𝗲𝗿𝗷𝗮 𝗣𝗿𝗮𝗸𝘁𝗶𝗸 𝟮 dan 𝗦𝗸𝗿𝗶𝗽𝘀𝗶 dalam kurikulum 𝗦𝗲𝗺𝗲𝘀𝘁𝗲𝗿 𝟴 pada studi 𝗦𝗮𝗿𝗷𝗮𝗻𝗮 𝗧𝗲𝗿𝗮𝗽𝗮𝗻 𝗟𝗼𝗴𝗶𝘀𝘁𝗶𝗸."
                      darkContent="Analisis Kualitas Pelayanan PT. Pos Indonesia (Persero) Cabang KPRK Sintang 78600 untuk Meningkatkan Kepuasan Pelanggan dengan Integrasi ServQual dan IPA"
                      customIcon={<div className="flex items-center gap-2"><FileText size={24} /><ArrowDownRight size={24} /></div>}
                      link="https://drive.google.com/file/d/1ACG-GMGG3btYs0Vz0ZdQHzoa4eNDucmU/view?usp=drive_link"
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
                      category="Kunjungan Industri"
                      title="PT DSV Solutions Indonesia"
                      content="Deskripsi kunjungan industri."
                      darkImage="https://github.com/dhnaath/Resources-Portofolio/blob/main/KI.png?raw=true"
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
                      category="Kegiatan"
                      title="CHARACTER BUILDING KE-20"
                      content="Kegiatan Character Building ke-20 untuk pembentukan karakter."
                      darkImage="https://github.com/dhnaath/Resources-Portofolio/blob/main/CB%20(1)_page-0001.jpg?raw=true"
                      customIcon={<ArrowDownRight size={24} />}
                    />
                  </div>`;

const newStr = `                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
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
                      content="Deskripsi kunjungan industri."
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
                  </div>`;

if(content.includes(targetStr)) {
  fs.writeFileSync('src/app/App.tsx', content.replace(targetStr, newStr));
  console.log('Success');
} else {
  console.log('Target string not found');
}
