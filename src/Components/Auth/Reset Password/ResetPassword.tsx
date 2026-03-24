import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiLock, FiEye, FiEyeOff, FiCheckCircle, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import { z } from "zod";
import { axiosInstance, USERS_URLS } from "../../Shere/Api/baseUrl";
// المسارات
import bgImage from "../../../assets/bg-ph.jpeg"; 
import logoImg from "../../../assets/logo.png";

// ====== Zod Validation Schema ======
const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
});

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<ResetPasswordForm>({
    password: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ResetPasswordForm, string>>>({});
  const [apiError, setApiError] = useState<string>("");

  // Get email and code from navigation state
  const email = location.state?.email || "";
  const code = location.state?.code || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof ResetPasswordForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (apiError) setApiError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    // Validate with Zod
    const result = resetPasswordSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ResetPasswordForm, string>> = {};
      result.error.issues.forEach((err: any) => {
        const field = err.path[0] as keyof ResetPasswordForm;
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const response = await axiosInstance.put(USERS_URLS.RESET_PASSWORD, {
        email,
        newPassword: formData.password,
      });
      toast.success(response.data.message || "Password reset successfully!");
      setIsSuccess(true);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Something went wrong, please try again.";
      setApiError(message);
    } finally {
      setIsLoading(false);
    }
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
            <p className="text-slate-500 font-medium">Set your new access key for <span className="text-slate-900 font-bold italic">{email.split('@')[0]}</span>.</p>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Password Field */}
              <div className="space-y-1.5 group">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1 group-focus-within:text-teal-600 transition-colors">
                  New Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full rounded-xl border ${errors.password ? "border-red-400 focus:border-red-500 focus:ring-red-500/5" : "border-slate-200 focus:border-teal-500 focus:ring-teal-500/5"} bg-slate-50 py-3.5 pl-11 pr-12 outline-none transition-all focus:bg-white focus:ring-4 font-medium`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 ml-1 mt-1">{errors.password}</p>
                )}
              </div>

              {/* API Error Message */}
              {apiError && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 font-medium">
                  {apiError}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-4 font-bold text-white transition-all hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-600/20 active:scale-[0.98] disabled:opacity-70 mt-6"
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
                <FiArrowRight className="text-lg" />
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