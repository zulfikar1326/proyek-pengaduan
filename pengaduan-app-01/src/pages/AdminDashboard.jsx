// import { useEffect, useState } from "react";
// import { api } from "../services/api";

// export default function AdminDashboard() {
//   const [data, setData] = useState([]);

//   const load = async () => {
//     const res = await api("/pengaduan/admin");
//     setData(res);
//   };

//   const updateStatus = async (id, status) => {
//     await api(`/pengaduan/${id}`, "PUT", { status });
//     load();
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   return (
//     <div>
//       <h2>Admin Dashboard</h2>
//       <button onClick={() => {
//         localStorage.clear();
//         window.location.reload();
//       }}>Logout</button>

//       <ul>
//         {data.map(d => (
//           <li key={d.pengaduanId}>
//             <b>{d.judul}</b> - {d.status}
//             <button onClick={() => updateStatus(d.pengaduanId, "DIPROSES")}>Proses</button>
//             <button onClick={() => updateStatus(d.pengaduanId, "SELESAI")}>Selesai</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// =================================================== 111111111111111

// import { useEffect, useState } from "react";
// import { api } from "../services/api";

// export default function AdminDashboard() {
//   const [data, setData] = useState([]);

//   const load = async () => {
//     const res = await api("/pengaduan/admin");
//     setData(res);
//   };

//   const updateStatus = async (id, status) => {
//     await api(`/pengaduan/${id}`, "PUT", { status });
//     load();
//   };

//   const logout = () => {
//     localStorage.clear();
//     window.location.reload();
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Admin Navbar */}
//       <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center sticky top-0 z-10">
//         <div className="flex items-center gap-2">
//           <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//           <h1 className="font-bold text-lg tracking-tight">ADMIN PANEL</h1>
//         </div>
//         <button onClick={logout} className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all">
//           Logout
//         </button>
//       </nav>

//       <div className="p-8">
//         <div className="max-w-6xl mx-auto">
//           <header className="mb-8">
//             <h2 className="text-2xl font-bold text-gray-800">Manajemen Pengaduan</h2>
//             <p className="text-gray-500">Kelola semua laporan masuk dari pengguna</p>
//           </header>

//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-wider">
//                   <th className="px-6 py-4">Laporan</th>
//                   <th className="px-6 py-4">Status</th>
//                   <th className="px-6 py-4 text-right">Aksi</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-50">
//                 {data.map(d => (
//                   <tr key={d.pengaduanId} className="hover:bg-gray-50/50 transition-colors group">
//                     <td className="px-6 py-4">
//                       <p className="font-bold text-gray-700">{d.judul}</p>
//                       <p className="text-sm text-gray-400 truncate max-w-xs">{d.deskripsi}</p>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
//                         d.status === 'SELESAI' ? 'bg-green-100 text-green-700' : 
//                         d.status === 'DIPROSES' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
//                       }`}>
//                         {d.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <button 
//                           onClick={() => updateStatus(d.pengaduanId, "DIPROSES")}
//                           className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-all"
//                         >
//                           Proses
//                         </button>
//                         <button 
//                           onClick={() => updateStatus(d.pengaduanId, "SELESAI")}
//                           className="px-3 py-1.5 bg-green-50 text-green-600 text-xs font-bold rounded-lg hover:bg-green-600 hover:text-white transition-all"
//                         >
//                           Selesai
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             {data.length === 0 && (
//               <div className="p-20 text-center text-gray-400">
//                 <p>Tidak ada pengaduan untuk saat ini.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [processingId, setProcessingId] = useState(null); // Track ID yang sedang di-update

  const load = async () => {
    const res = await api("/pengaduan/admin");
    setData(res);
  };

  const updateStatus = async (id, status) => {
    setProcessingId(id);
    try {
      await api(`/pengaduan/${id}`, "PUT", { status });
      await load();
    } finally {
      setProcessingId(null);
    }
  };

  // Fitur Baru: Delete Laporan
  const deleteLaporan = async (id) => {
    if (window.confirm("Apakah Admin yakin ingin menghapus laporan ini?")) {
      setProcessingId(id);
      try {
        await api(`/pengaduan/${id}`, "DELETE");
        await load();
      } catch (e) {
        alert("Gagal menghapus laporan.");
      } finally {
        setProcessingId(null);
      }
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <h1 className="font-bold text-lg tracking-tight">ADMIN PANEL</h1>
        </div>
        <button onClick={() => {localStorage.clear(); window.location.reload();}} className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all">
          Logout
        </button>
      </nav>

      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Manajemen Pengaduan</h2>
            <p className="text-gray-500">Kelola semua laporan masuk dari pengguna</p>
          </header>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Laporan</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.map(d => (
                  <tr key={d.pengaduanId} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-700">{d.judul}</p>
                      <p className="text-sm text-gray-400 truncate max-w-xs">{d.deskripsi}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        d.status === 'SELESAI' ? 'bg-green-100 text-green-700' : 
                        d.status === 'DIPROSES' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          disabled={processingId === d.pengaduanId}
                          onClick={() => updateStatus(d.pengaduanId, "DIPROSES")}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-600 hover:text-white disabled:opacity-50"
                        >
                          Proses
                        </button>
                        <button 
                          disabled={processingId === d.pengaduanId}
                          onClick={() => updateStatus(d.pengaduanId, "SELESAI")}
                          className="px-3 py-1.5 bg-green-50 text-green-600 text-xs font-bold rounded-lg hover:bg-green-600 hover:text-white disabled:opacity-50"
                        >
                          Selesai
                        </button>
                        {/* Tombol Delete */}
                        <button 
                          disabled={processingId === d.pengaduanId}
                          onClick={() => deleteLaporan(d.pengaduanId)}
                          className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded-lg hover:bg-red-600 hover:text-white transition-all disabled:opacity-50"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}