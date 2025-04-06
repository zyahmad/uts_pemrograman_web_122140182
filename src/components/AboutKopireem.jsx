import React from 'react';
import { Link } from 'react-router-dom';

const AboutKopireem = () => {
  return (
    <section className="about-kopireem bg-amber-50 py-12 px-6 md:px-20 text-gray-800">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-amber-900">Tentang Kopireem</h2>
        <p className="text-lg mb-6 leading-relaxed">
          <strong>Kopireem</strong> Kopireem adalah sahabat pecinta kopi masa kini!
          Kami menghadirkan kemudahan bagi kamu yang ingin menikmati kopi nikmat tanpa harus keluar rumah. Di Kopireem, kamu tidak perlu antre atau datang langsung ke kedai—cukup pesan kopi favoritmu secara online, dan kami akan segera mengantarkannya ke lokasi kamu. Praktis, cepat, dan pastinya penuh cita rasa! Dengan sistem pemesanan dan pengiriman yang efisien, Kopireem siap jadi solusi harian untuk kebutuhan ngopi kamu.
        </p>
      </div>
    </section>
  );
};

export default AboutKopireem;