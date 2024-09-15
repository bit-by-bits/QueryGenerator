import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContextUser";
import loginImg from "@/assets/login.jpeg";

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your password link and a link to sign up if you do not have an account. The second column has a cover image.";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      navigate("/home");
      console.log("Logged in successfully");
    } catch (err) {
      setError("Invalid credentials");
      console.log((err as Error)?.message || "An unknown error occurred");
    }
  };

  return (
    <div className="w-full h-screen lg:grid lg:min-h-full lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <form onSubmit={handleLogin} className="mx-auto w-[350px] space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-muted-foreground text-balance">
              Enter your email below to login to your account
            </p>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm underline text-blue-500"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/google-login">Login with Google</Link>
            </Button>
          </div>

          <div className="mt-4 text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline text-blue-500">
              Sign up
            </Link>
          </div>
        </form>
      </div>

      <div className="hidden lg:block bg-muted">
        <img
          src={loginImg}
          alt="Login cover image"
          width="1920"
          height="1080"
          className="min-h-full w-full object-cover object-right dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

export default Login;
