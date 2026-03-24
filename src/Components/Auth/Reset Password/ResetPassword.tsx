import { useState } from "react";
import { Link } from "react-router-dom";
import { FiLock, FiEye, FiEyeOff, FiCheckCircle, FiArrowRight, FiArrowLeft } from "react-icons/fi";
// المسارات
import bgImage from "../../../assets/bg-ph.jpeg"; 
import logoImg from "../../../assets/logo.png"; 

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // محاكاة تغيير كلمة المرور بالبيانات المرسلة
    // email: "ayajayyousi2002@gmail.com", code: "466212", newPassword: "1234"
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
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
              Secure Your <span className="text-teal-400">Account</span>.
            </h1>
            <p className="text-lg text-slate-300 font-light leading-relaxed">
              Create a strong, unique password to ensure your medical data remains private and protected.
            </p>
          </div>

          <div className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase">
            © 2026 Al-Razi Group | Portal v2.0
          </div>
        </div>
      </div>

      {/* --- Right Side: Reset Form --- */}
      <div className="flex flex-1 flex-col items-center justify-center bg-white px-8 lg:px-20">
        <div className="w-full max-w-[420px] space-y-10">
          
          {/* Header */}
          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">New Password</h2>
            <p className="text-slate-500 font-medium">Set your new access key for <span className="text-slate-900 font-bold italic">Aya</span>.</p>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Password Field */}
              <div className="space-y-1.5 group">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1 group-focus-within:text-teal-600 transition-colors">
                  New Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    defaultValue="1234"
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 outline-none transition-all focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/5 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-1.5 group">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1 group-focus-within:text-teal-600 transition-colors">
                  Confirm Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 outline-none transition-all focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/5 font-medium"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-4 font-bold text-white transition-all hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-600/20 active:scale-[0.98] disabled:opacity-70 mt-4"
              >
                {isLoading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                ) : (
                  <>
                    <span>Reset Password</span>
                    <FiArrowRight className="text-lg" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Success State */
            <div className="bg-teal-50 border border-teal-100 rounded-2xl p-8 text-center space-y-6 animate-in fade-in zoom-in duration-300">
              <div className="h-16 w-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-3xl mx-auto shadow-lg shadow-teal-500/20">
                <FiCheckCircle />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">All Set!</h3>
                <p className="text-sm text-slate-500">Your password has been successfully updated. You can now access your dashboard.</p>
              </div>
              <Link
                to="/login"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-4 font-bold text-white transition-all hover:bg-teal-600 active:scale-95"
              >
                Go to Login
              </Link>
            </div>
          )}

          {/* Back to Home/Support */}
          {!isSuccess && (
            <div className="text-center pt-2">
              <Link to="/login" className="inline-flex items-center justify-center gap-2 text-sm font-bold text-slate-400 hover:text-teal-600 transition-colors group">
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span>Abort and return</span>
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}