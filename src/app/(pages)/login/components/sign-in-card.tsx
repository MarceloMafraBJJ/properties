"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { User } from "next-auth";

const SignInCard = ({ user }: { user?: User }) => {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>If you are a member, you can log in</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col space-y-6 py-3">
          <Button onClick={() => signIn("google")} size={"sm"}>
            GOOGLE
          </Button>
          <Button onClick={() => signIn("instagram")} size={"sm"}>
            INSTAGRAM
          </Button>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="mt-4 justify-between">
        <Button
          className="gap-2 text-sm font-semibold"
          onClick={() => router.push("/")}
          size={"sm"}
        >
          <ArrowLeft size={20} strokeWidth={2} /> Go back
        </Button>

        {user && (
          <Button
            className="gap-2 text-sm font-semibold"
            onClick={() => signOut()}
            size={"sm"}
            variant={"destructive"}
          >
            logout
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SignInCard;
