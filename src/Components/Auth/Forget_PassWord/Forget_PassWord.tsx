import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiArrowRight, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
// المسارات
import bgImage from "../../../assets/bg-ph.jpeg"; 
import logoImg from "../../../assets/logo.png"; 

export default function Forget_PassWord() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // محاكاة إرسال رابط استعادة كلمة المرور
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 2000);
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
              Password <span className="text-teal-400">Recovery</span>.
            </h1>
            <p className="text-lg text-slate-300 font-light leading-relaxed">
              Don't worry, it happens. Just enter your registered email and we'll send you a secure link to reset your account access.
            </p>
          </div>

          <div className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase">
            © 2026 Al-Razi Group | Portal v2.0
          </div>
        </div>
      </div>

      {/* --- Right Side: Forget Password Form --- */}
      <div className="flex flex-1 flex-col items-center justify-center bg-white px-8 lg:px-20">
        <div className="w-full max-w-[420px] space-y-10">
          
          {/* Header */}
          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Forgot Password?</h2>
            <p className="text-slate-500 font-medium">No stress! Enter your email to receive recovery instructions.</p>
          </div>

          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-1.5 group">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1 group-focus-within:text-teal-600 transition-colors">
                  Recovery Email
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                  <input
                    type="email"
                    required
                    placeholder="ayajayousi2002@gmail.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 outline-none transition-all focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/5 font-medium"
                  />
                </div>
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
                    <span>Send Reset Link</span>
                    <FiArrowRight className="text-lg" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Success Message */
            <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6 space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="flex items-center gap-3 text-teal-700">
                <FiCheckCircle className="text-2xl" />
                <p className="font-bold">Check your inbox!</p>
              </div>
              <p className="text-sm text-teal-800 leading-relaxed">
                If an account exists for that email, you will receive a password reset link shortly.
              </p>
              <button 
                onClick={() => setIsSent(false)} 
                className="text-xs font-bold text-teal-600 hover:text-teal-800 transition-colors underline underline-offset-4"
              >
                Didn't get it? Try again
              </button>
            </div>
          )}

          {/* Back to Login */}
          <div className="text-center pt-2">
            <Link to="/login" className="inline-flex items-center justify-center gap-2 text-sm font-bold text-slate-400 hover:text-teal-600 transition-colors group">
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Login</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}