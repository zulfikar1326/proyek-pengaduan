// import { useState } from "react";
// import { api } from "../services/api";

// export default function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const register = async () => {
//     await api("/auth/register", "POST", { email, password });
//     window.location.href = "/";
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
//       <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
//       <button onClick={register}>Register</button>
//     </div>
//   );
// }


import { useState } from "react";
import { api } from "../services/api";

export default function Register({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) return setError("Semua field harus diisi");
    setLoading(true);
    try {
      await api("/auth/register", "POST", { email, password });
      alert("Registrasi Berhasil! Silakan Login.");
      onNavigate(); // Kembali ke halaman login
    } catch (e) {
      setError("Gagal mendaftar. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Buat Akun</h2>
        <p className="text-center text-gray-500 mb-8 text-sm">Silakan daftar untuk mulai melapor</p>
        
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-xs border border-red-100">{error}</div>}
        
        <div className="space-y-4">
          <div className="group">
            <label className="text-xs font-semibold text-gray-600 ml-1">Email</label>
            <input 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all mt-1"
              placeholder="nama@email.com" 
              onChange={e => setEmail(e.target.value)} 
            />
          </div>
          <div className="group">
            <label className="text-xs font-semibold text-gray-600 ml-1">Password</label>
            <input 
              type="password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all mt-1"
              placeholder="••••••••" 
              onChange={e => setPassword(e.target.value)} 
            />
          </div>
          <button 
            disabled={loading}
            onClick={handleRegister}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-blue-200"
          >
            {loading ? "Mendaftarkan..." : "Daftar"}
          </button>
        </div>
        
        <p className="mt-8 text-center text-gray-600 text-sm">
          Sudah punya akun? {" "}
          <span onClick={onNavigate} className="text-blue-600 font-bold cursor-pointer hover:underline">Masuk</span>
        </p>
      </div>
    </div>
  );
}