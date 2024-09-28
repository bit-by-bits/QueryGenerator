import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext/AuthContextUser";
import { URLs } from "@/routes";

type AuthLayoutProps = {
  coverImage: string;
};

export const description =
  "Main layout for the authentication pages. Includes a cover image on the right side.";

const AuthLayout = ({ coverImage }: AuthLayoutProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(URLs.app.filters);
    }
  }, [user, navigate]);

  return (
    <div className="w-full h-screen lg:grid lg:min-h-full lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <Outlet />
      </div>

      <div className="hidden lg:block bg-muted">
        <img
          src={coverImage}
          alt="Auth cover"
          width="1920"
          height="1080"
          className="min-h-full w-full object-cover object-right dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
