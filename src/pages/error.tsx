import { Link, useRouteError } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div
      id="error-page"
      className="flex flex-col items-center justify-center h-screen w-screen text-center"
    >
      <h1 className="text-4xl font-bold mb-4">Oops!</h1>
      <p className="mb-2">Sorry, an unexpected error has occurred.</p>
      {error && (
        <p className="text-gray-500 italic">
          {error.statusText || error.message}
        </p>
      )}
      <Link to="/" className="mt-4 text-blue-500 underline">
        {" "}
        ← Go back to login
      </Link>
    </div>
  );
}