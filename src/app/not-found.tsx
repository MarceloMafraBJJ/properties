import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex items-center flex-col justify-center lg:min-h-[calc(100vh_-_496px)] space-y-4">
      <h2 className="uppercase text-xl font-bold">Page Not Found</h2>

      <Button variant={"link"}>
        <Link href="/">Return Home</Link>
      </Button>
    </main>
  );
}
