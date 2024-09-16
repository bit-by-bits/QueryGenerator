import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext/AuthContextUser";
import { URLs } from "@/routes";

export const description =
  "Login page for the Query Generator app. Users can login with their email and password.";

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
      navigate(URLs.filters);
      console.log("Logged in successfully");
    } catch (err) {
      setError("Invalid credentials");
      console.log((err as Error)?.message || "An unknown error occurred");
    }
  };

  return (
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
            onChange={e => setEmail(e.target.value)}
            placeholder="m@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to={URLs.forgotPassword}
              className="text-sm underline text-blue-500"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to={URLs.google}>Login with Google</Link>
        </Button>
      </div>

      <div className="mt-4 text-sm text-center">
        Don&apos;t have an account?{" "}
        <Link to={URLs.signUp} className="underline text-blue-500">
          Sign up
        </Link>
      </div>
    </form>
  );
}

export default Login;
