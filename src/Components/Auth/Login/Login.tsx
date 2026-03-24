import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiCheckCircle, FiArrowRight } from "react-icons/fi";
import { toast } from "react-toastify";
import { z } from "zod";
import { axiosInstance, USERS_URLS } from "../../Shere/Api/baseUrl";
import bgImage from "../../../assets/bg-ph.jpeg"; 
import logoImg from "../../../assets/logo.png";

// ====== Zod Validation Schema ======
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+$/, "Email must not contain Arabic characters")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginForm, string>>>({});
  const [apiError, setApiError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof LoginForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (apiError) setApiError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    // Validate with Zod
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginForm, string>> = {};
      result.error.issues.forEach((err: any) => {
        const field = err.path[0] as keyof LoginForm;
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
      const response = await axiosInstance.post(USERS_URLS.LOGIN, formData);
      toast.success(response.data.message || "Login successful");
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
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
        {/* Overlays for Depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/60 to-transparent" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />

        {/* Branding on Top of Image */}
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
              Precision in <span className="text-teal-400">Healthcare</span>.
            </h1>
            <p className="text-lg text-slate-300 font-light leading-relaxed">
              Access your professional medical dashboard to manage prescriptions and patient care with Al-Razi's advanced ecosystem.
            </p>
            <div className="flex gap-4 pt-4">
              {['Secure', 'Efficient', 'Reliable'].map((item) => (
                <span key={item} className="text-[10px] font-bold text-white/60 uppercase tracking-widest px-3 py-1 border border-white/10 rounded-lg">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase">
            © 2026 Al-Razi Group | Portal v2.0
          </div>
        </div>
      </div>

      {/* --- Right Side: Login Form --- */}
      <div className="flex flex-1 flex-col items-center justify-center bg-white px-8 lg:px-20">
        <div className="w-full max-w-[500px] space-y-10">
          
          {/* Welcome Text */}
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Login</h2>
            <p className="text-slate-500 font-medium">Enter your details to access your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-1.5 group">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1 group-focus-within:text-teal-600 transition-colors">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@alrazi.com"
                  className={`w-full rounded-xl border ${errors.email ? "border-red-400 focus:border-red-500 focus:ring-red-500/5" : "border-slate-200 focus:border-teal-500 focus:ring-teal-500/5"} bg-slate-50 py-3.5 pl-11 pr-4 outline-none transition-all focus:bg-white focus:ring-4 font-medium`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 ml-1 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 group">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1 group-focus-within:text-teal-600 transition-colors">
                Password
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
              
              <div className="flex justify-end pt-1">
                <Link to="/forget_pass" className="text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* API Error Message */}
            {apiError && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 font-medium">
                {apiError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-4 font-bold text-white transition-all hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-600/20 active:scale-[0.98] disabled:opacity-70 mt-4"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              ) : (
                <>
                  <span>Login</span>
                  <FiArrowRight className="text-lg" />
                </>
              )}
            </button>
          </form>

         
          <div className="text-center">
            <p className="text-sm font-medium text-slate-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-teal-600 font-bold hover:underline underline-offset-4">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}