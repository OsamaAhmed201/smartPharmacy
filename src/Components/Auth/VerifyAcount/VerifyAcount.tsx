import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiShield, FiArrowRight, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
// المسارات
import bgImage from "../../../assets/bg-ph.jpeg"; 
import logoImg from "../../../assets/logo.png"; 

export default function VerifyAcount() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="flex h-screen w-full bg-white font-['Plus_Jakarta_Sans',_sans-serif] antialiased text-slate-900 overflow-hidden">
      
      {/* --- Left Side: Full Height Image (100vh) --- */}
      <div className="relative hidden lg:block w-1/2 h-full">
        <img 
          src={bgImage} 
          className="absolute inset-0 h-full w-full object-cover" 
          alt="Al-Razi Medical" 
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/60 to-transparent" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />

        <div className="relative z-20 flex h-full flex-col justify-between p-16">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <img src={logoImg} alt="Logo" className="h-7 w-7 object-contain" />
            </div>
            <div>
              <p className="text-xl font-bold tracking-tight text-white leading-none">AL-RAZI</p>
              <p className="text-[10px] font-medium tracking-[0.2em] text-teal-400 uppercase">Pharmacy</p>
            </div>
          </div>

          <div className="max-w-md space-y-4">
            <h1 className="text-5xl font-bold leading-tight text-white">
              Verify Your <span className="text-teal-400">Identity</span>.
            </h1>
            <p className="text-lg text-slate-300 font-light leading-relaxed">
              We've sent a 6-digit security code to your email to ensure your account remains protected and private.
            </p>
          </div>

          <div className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase">
            © 2026 Al-Razi Group | Portal v2.0
          </div>
        </div>
      </div>

      {/* --- Right Side: Verify Form --- */}
      <div className="flex flex-1 flex-col items-center justify-center bg-white px-8 lg:px-20">
        <div className="w-full max-w-[420px] space-y-10">
          
          {/* Header */}
          <div className="space-y-3">
           
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Verify Account</h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              Enter the code sent to <span className="text-slate-900 font-bold italic">ayajayyousi2002@gmail.com</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Verification Code Input */}
            <div className="space-y-3 group">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1 group-focus-within:text-teal-600 transition-colors">
                Security Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  required
                  defaultValue="466212"
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="000000"
                  className="w-full tracking-[1em] text-center text-2xl rounded-2xl border border-slate-200 bg-slate-50 py-5 outline-none transition-all focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/5 font-black text-slate-900 placeholder:text-slate-200"
                />
              </div>
              <p className="text-center text-xs text-slate-400 font-medium">
                Didn't receive the code?{' '}
                <button type="button" className="text-teal-600 font-bold hover:underline transition-all">Resend Code</button>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-4 font-bold text-white transition-all hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-600/20 active:scale-[0.98] disabled:opacity-70"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              ) : (
                <>
                  <span>Verify Account</span>
                  <FiArrowRight className="text-lg" />
                </>
              )}
            </button>
          </form>

          {/* Back to Sign Up */}
          <div className="text-center">
            <Link to="/register" className="inline-flex items-center justify-center gap-2 text-sm font-bold text-slate-400 hover:text-teal-600 transition-colors group">
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span>Change Email Address</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}