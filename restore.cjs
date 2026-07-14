const fs = require('fs');
let content = fs.readFileSync('src/app/App.tsx', 'utf8');

const target = `                  {akademikLogbookData.map((doc, index) => (
                    <div key={index} className="w-[85vw] sm:w-[500px] md:w-[560px]">
                      <FlipbookCard {...doc} />
                    </div>
                  ))}`;

const fixed = `                  <div className="w-[85vw] sm:w-[500px] md:w-[560px]">
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
                  </div>`;

content = content.replace(target, fixed);
fs.writeFileSync('src/app/App.tsx', content, 'utf8');
