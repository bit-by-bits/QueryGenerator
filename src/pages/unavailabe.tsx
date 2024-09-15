import { URLs } from "@/routes";
import { Link } from "react-router-dom";

export const description =
  "Unavailable page for when a page is not available. Includes a message and a link to go back to the login page.";

export default function UnavailablePage() {
  return (
    <div
      id="unavailable-page"
      className="flex flex-col items-center justify-center h-full w-full text-center"
    >
      <h1 className="text-4xl font-bold mb-4">Oops!</h1>
      <p className="mb-2">Sorry, this page is currently unavailable.</p>
      <p className="text-gray-500 italic">Please check back later.</p>
      <Link to={URLs.login} className="mt-4 text-blue-500 underline">
        {" "}
        ← Go back to login
      </Link>
    </div>
  );
}
