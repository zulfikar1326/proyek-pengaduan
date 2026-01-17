import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState([]);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const load = async () => {
    const res = await api(`/pengaduan/user?userId=${user.userId}`);
    setData(res);
  };

  const create = async () => {
    if(!judul || !deskripsi) return alert("Isi semua field!");
    await api("/pengaduan", "POST", { userId: user.userId, judul, deskripsi });
    setJudul(""); setDeskripsi("");
    load();
  };

  const logout = () => { localStorage.clear(); window.location.reload(); };

  useEffect(() => { load(); }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-blue-600">Lapor!</h1>
        <button onClick={logout} className="text-gray-500 hover:text-red-500 font-medium transition-colors">Logout</button>
      </nav>

      <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-8">
            <h3 className="text-lg font-bold mb-4">Buat Pengaduan</h3>
            <div className="space-y-3">
              <input 
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Judul" value={judul} onChange={e => setJudul(e.target.value)} 
              />
              <textarea 
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none h-32"
                placeholder="Deskripsi" value={deskripsi} onChange={e => setDeskripsi(e.target.value)} 
              />
              <button onClick={create} className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all">Kirim</button>
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-bold mb-4">Riwayat Pengaduan</h3>
          <div className="space-y-4">
            {data.length === 0 && <p className="text-gray-400">Belum ada pengaduan.</p>}
            {data.map(d => (
              <div key={d.pengaduanId} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center group hover:border-blue-200 transition-all">
                <div>
                  <h4 className="font-bold text-gray-800">{d.judul}</h4>
                  <p className="text-sm text-gray-500">{d.deskripsi || "Tidak ada deskripsi"}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  d.status === 'SELESAI' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}