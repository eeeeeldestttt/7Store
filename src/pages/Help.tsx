import { motion } from "framer-motion";
import { HiChatBubbleLeftRight, HiPhone, HiEnvelope, HiQuestionMarkCircle } from "react-icons/hi2";

export default function Help() {
  const contactOptions = [
    {
      icon: <HiChatBubbleLeftRight size={28} />,
      title: "Live Chat",
      desc: "Hubungi admin langsung untuk bantuan cepat.",
      action: "Buka Chat",
    },
    {
      icon: <HiPhone size={28} />,
      title: "Telepon",
      desc: "Butuh bantuan mendesak? Kami siap dihubungi setiap hari.",
      detail: "+62 812 3456 7890",
    },
    {
      icon: <HiEnvelope size={28} />,
      title: "Email",
      desc: "Kirimkan pertanyaan atau laporan melalui email.",
      detail: "support@7store.id",
    },
  ];

  const faqs = [
    {
      q: "Bagaimana cara top up game?",
      a: "Pilih game yang ingin kamu top up, masukkan ID, pilih nominal, lalu lakukan pembayaran sesuai metode yang tersedia.",
    },
    {
      q: "Apakah top up saya langsung masuk?",
      a: "Biasanya hanya dalam beberapa detik, tetapi kadang bisa memakan waktu hingga 5 menit tergantung sistem game.",
    },
    {
      q: "Bagaimana jika top up gagal?",
      a: "Jangan khawatir. Hubungi kami melalui Live Chat atau WhatsApp dengan bukti transaksi untuk kami bantu segera.",
    },
  ];

  return (
    <motion.div
      className="p-6 min-h-screen bg-slate-900 text-slate-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <HiQuestionMarkCircle size={30} className="text-indigo-500" />
          <h1 className="text-3xl font-bold">Pusat Bantuan</h1>
        </div>
        <p className="text-slate-400">
          Butuh bantuan? Kami siap membantu kamu kapan saja.
        </p>
      </header>

      {/* Kontak Utama */}
      <section className="grid md:grid-cols-3 gap-6 mb-10">
        {contactOptions.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-md"
          >
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-indigo-400">{item.icon}</span>
              <h2 className="text-lg font-semibold">{item.title}</h2>
            </div>
            <p className="text-sm text-slate-400 mb-2">{item.desc}</p>
            {item.detail && (
              <p className="text-indigo-400 font-medium">{item.detail}</p>
            )}
            {item.action && (
              <button
                onClick={() => alert("Fitur chat belum diaktifkan")}
                className="mt-3 bg-indigo-600 hover:bg-indigo-700 transition text-sm px-4 py-2 rounded-lg"
              >
                {item.action}
              </button>
            )}
          </motion.div>
        ))}
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Pertanyaan yang Sering Diajukan</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-800 rounded-xl p-4 border border-slate-700"
            >
              <h3 className="font-semibold text-indigo-400 mb-1">{faq.q}</h3>
              <p className="text-slate-300 text-sm">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Info */}
      <footer className="mt-10 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} #7Store — Semua Hak Dilindungi.
      </footer>
    </motion.div>
  );
}
