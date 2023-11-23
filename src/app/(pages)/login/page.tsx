import { auth } from "@/lib/auth";
import SignInCard from "./components/sign-in-card";

export default async function Login() {
  const session = await auth();

  return (
    <main className="flex items-center justify-center lg:min-h-[calc(100vh_-_496px)]">
      <SignInCard user={session?.user} />
    </main>
  );
}
