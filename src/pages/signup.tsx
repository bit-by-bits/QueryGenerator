import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext/AuthContextUser";
import { URLs } from "@/routes";
import FormField from "@/components/login/form-field";

export const description =
  "Signup page for the Query Generator app. Users can create an account by providing their name, email, and password.";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name) {
      setError("Name is required.");
      return;
    }

    try {
      signup(email, password, name);
      navigate(URLs.app.filters);
      console.log("Account created successfully");
    } catch (err) {
      setError("Failed to create account. Please try again.");
      console.log((err as Error)?.message || "An unknown error occurred");
    }
  };

  return (
    <form onSubmit={handleSignup} className="mx-auto w-[350px] space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-muted-foreground text-balance">
          Create your account by filling in your details below.
        </p>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        <FormField
          id="name"
          type="text"
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="username"
          required
        />
        <FormField
          id="email"
          type="email"
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="m@example.com"
          required
        />
        <FormField
          id="password"
          type="password"
          label="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <Button type="submit" className="w-full">
          Sign Up
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to={URLs.auth.google}>Sign up with Google</Link>
        </Button>
      </div>

      <div className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <Link to={URLs.auth.login} className="underline text-blue-500">
          Login
        </Link>
      </div>
    </form>
  );
};

export default Signup;
