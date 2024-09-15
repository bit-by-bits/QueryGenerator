import { Link } from "react-router-dom";

export default function UnavailablePage() {
  return (
    <div
      id="unavailable-page"
      className="flex flex-col items-center justify-center h-screen w-screen text-center"
    >
      <h1 className="text-4xl font-bold mb-4">Oops!</h1>
      <p className="mb-2">Sorry, this page is currently unavailable.</p>
      <p className="text-gray-500 italic">Please check back later.</p>
      <Link to="/" className="mt-4 text-blue-500 underline">
        {" "}
        ← Go back to login
      </Link>
    </div>
  );
}
