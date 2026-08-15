import Link from "next/link";
import { ArrowRight } from "./_components/icons";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <span>404</span>
      <p className="micro-label"><i />Five Star Rentals</p>
      <h1>This road ends here.<br /><em>Choose another.</em></h1>
      <Link className="solid-button light" href="/">Return home<ArrowRight /></Link>
    </main>
  );
}
