import { auth } from "@/lib/auth";

export default async function AdminHome() {
  const session = await auth();

  return (
    <main className="flex items-center justify-center lg:min-h-[calc(100vh_-_496px)]">
      oie
    </main>
  );
}
