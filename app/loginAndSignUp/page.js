"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginAndSignUp() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isLogin) {
      // Login flow
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error);
        setLoading(false);
      } else {
        router.push("/dashboard");
      }
    } else {
      // Registration flow
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          // Log them in immediately after registration
          const signInRes = await signIn("credentials", {
            redirect: false,
            email,
            password,
          });

          if (signInRes?.error) {
            setError(signInRes.error);
          } else {
            router.push("/dashboard");
          }
        } else {
          setError(data.message || "Registration failed");
        }
      } catch (err) {
        setError("An error occurred during registration");
      }
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-white relative overflow-hidden font-roboto pt-20 pb-20">
      {/* Background Ornaments */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-green/10 blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-navy/5 blur-[120px]" />

      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 relative z-10 border border-brand-navy/10">
        <div className="text-center mb-8">
          <Link href="/">
             <img src="/logos/completeLogo.png" alt="DevAgile Logo" className="h-12 mx-auto mb-6 cursor-pointer" />
          </Link>
          <h2 className="text-3xl font-bold text-brand-navy">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-brand-navy/60 mt-2">
            {isLogin
              ? "Sign in to access your bootcamp & resources"
              : "Join our community of developers"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-xl text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-brand-navy mb-1 ml-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-brand-navy/20 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-white/50"
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-brand-navy mb-1 ml-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-brand-navy/20 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-white/50"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-brand-navy mb-1 ml-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-brand-navy/20 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-white/50"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-navy text-white font-bold py-3.5 rounded-xl hover:bg-brand-navy/90 transition-all shadow-lg hover:shadow-brand-navy/20 disabled:opacity-70 flex justify-center items-center"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-brand-navy/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-brand-white text-brand-navy/50 bg-white">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="mt-6 w-full bg-white border border-brand-navy/10 text-brand-navy font-bold py-3.5 rounded-xl hover:bg-brand-white transition-all shadow-sm flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>

        <p className="mt-8 text-center text-sm text-brand-navy/70">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-bold text-brand-green hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
