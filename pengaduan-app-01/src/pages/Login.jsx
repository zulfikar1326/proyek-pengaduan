// import { useState } from "react";
// import { api } from "../services/api";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const login = async () => {
//     try {
//       const data = await api("/auth/login", "POST", { email, password });
//       localStorage.setItem("user", JSON.stringify(data));
//       window.location.reload();
//     } catch (e) {
//       setError(e.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {error && <p>{error}</p>}
//       <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
//       <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
//       <button onClick={login}>Login</button>
//       <p onClick={() => window.location.href = "/register"}>Register</p>
//     </div>
//   );
// }

// =================================


// import { useState } from "react";
// import { api } from "../services/api";

// export default function Login({ onNavigate }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const login = async () => {
//     setLoading(true);
//     try {
//       const data = await api("/auth/login", "POST", { email, password });
//       localStorage.setItem("user", JSON.stringify(data));
//       window.location.reload();
//     } catch (e) {
//       setError("Email atau password salah.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 transition-all hover:shadow-2xl">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Selamat Datang</h2>
//         {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
        
//         <div className="space-y-4">
//           <input 
//             className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//             placeholder="Email" 
//             onChange={e => setEmail(e.target.value)} 
//           />
//           <input 
//             type="password"
//             className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//             placeholder="Password" 
//             onChange={e => setPassword(e.target.value)} 
//           />
//           <button 
//             disabled={loading}
//             onClick={login}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50"
//           >
//             {loading ? "Loading..." : "Masuk"}
//           </button>
//         </div>
        
//         <p className="mt-6 text-center text-gray-600 text-sm">
//           Belum punya akun? {" "}
//           <span onClick={onNavigate} className="text-blue-600 font-bold cursor-pointer hover:underline">Daftar sekarang</span>
//         </p>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { api } from "../services/api";

export default function Login({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true); // Memulai animasi loading
    try {
      const data = await api("/auth/login", "POST", { email, password });
      localStorage.setItem("user", JSON.stringify(data));
      window.location.reload();
    } catch (e) {
      setError("Email atau password salah.");
    } finally {
      setLoading(false); // Menghentikan animasi loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 transition-all hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Selamat Datang</h2>
        {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
        
        <div className="space-y-4">
          <input 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="Email" 
            onChange={e => setEmail(e.target.value)} 
          />
          <input 
            type="password"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="Password" 
            onChange={e => setPassword(e.target.value)} 
          />
          <button 
            disabled={loading}
            onClick={login}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            )}
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </div>
        
        <p className="mt-6 text-center text-gray-600 text-sm">
          Belum punya akun? {" "}
          <span onClick={onNavigate} className="text-blue-600 font-bold cursor-pointer hover:underline">Daftar sekarang</span>
        </p>
      </div>
    </div>
  );
}