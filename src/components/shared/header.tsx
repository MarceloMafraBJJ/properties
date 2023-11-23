"use client";

import { Home, HomeIcon, LogIn, MenuIcon } from "lucide-react";
import { Button } from "../ui/button";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import React from "react";
import { cn } from "@/lib/utils";
import { CONTACT, PROPERTY_CATEGORIES } from "@/constants";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { status, data } = useSession();

  return (
    <header className="flex items-center justify-between mx-auto py-8 layout">
      <Link href={"/"} className="flex items-center justify-center gap-4">
        <Home size={26} absoluteStrokeWidth />
        <span className="font-semibold text-lg">Properties Of Sale</span>
      </Link>

      <nav className="h-full hidden lg:block">
        {pathname.startsWith("/admin") ? (
          <div className="flex gap-5 uppercase font-medium">
            <Link href={"/admin"}>Home</Link>
            <Link href={"/admin/property"}>Property</Link>
            <Link href={"/admin/category"}>Category</Link>
          </div>
        ) : (
          <ClientNav />
        )}
      </nav>

      <div className="flex items-center justify-center">
        <div className="hidden lg:flex items-center justify-center">
          {status === "unauthenticated" && <Button>Get in touch</Button>}

          {status === "authenticated" && (
            <>
              <Button onClick={() => router.push("/admin")}>Admin</Button>
              {data.user?.image && data.user.name && (
                <Image
                  src={data?.user?.image}
                  alt={data?.user?.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-16 w-16 rounded-full border-2 border-primary object-cover ml-3 cursor-pointer"
                  onClick={() => router.push("/login")}
                />
              )}
            </>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button size="icon" variant="ghost">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader className="text-left text-lg font-semibold">
              Menu
            </SheetHeader>

            <Separator className="my-4" />

            <div className="mt-2 flex flex-col gap-4">
              <SheetClose asChild>
                <Link href="/">
                  <Button
                    variant={"outline"}
                    className="w-full justify-start gap-2"
                  >
                    <HomeIcon size={16} />
                    Home
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/">
                  <Button
                    variant={"outline"}
                    className="w-full justify-start gap-2"
                  >
                    <HomeIcon size={16} />
                    Explore
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/">
                  <Button
                    variant={"outline"}
                    className="w-full justify-start gap-2"
                  >
                    <HomeIcon size={16} />
                    Categories
                  </Button>
                </Link>
              </SheetClose>

              {status === "unauthenticated" && (
                <SheetClose asChild>
                  <Link href="/">
                    <Button className="w-full justify-start gap-2">
                      <HomeIcon size={16} />
                      Get in touch
                    </Button>
                  </Link>
                </SheetClose>
              )}

              {status === "authenticated" && (
                <SheetClose asChild>
                  <Link href="/">
                    <Button className="w-full justify-start gap-2">
                      <HomeIcon size={16} />
                      admin
                    </Button>
                  </Link>
                </SheetClose>
              )}
            </div>

            <Separator className="my-4" />

            <div className="mt-2 flex justify-between items-center">
              <h1 className="text-sm italic">Login</h1>

              <SheetClose asChild>
                <Link href="/">
                  <Button variant={"outline"} size={"icon"}>
                    <LogIn size={16} />
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Header;

const ClientNav = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Explore</NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full p-2 select-none flex-col justify-end rounded-md bg-explore-background bg-cover"
                    href="/"
                  >
                    <span className="mb-2 mt-4 text-lg font-medium">
                      High level
                    </span>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautiful designs and patterns.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>

              <ul className="flex flex-col gap-4">
                {PROPERTY_CATEGORIES.slice(0, 3).map((category) => (
                  <ListItem
                    key={category.title}
                    title={category.title}
                    href={category.href}
                  >
                    {category.description}
                  </ListItem>
                ))}
              </ul>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 w-[500px] p-4 md:grid-cols-2">
              {PROPERTY_CATEGORIES.slice(0, 6).map((category) => (
                <ListItem
                  key={category.title}
                  title={category.title}
                  href={category.href}
                >
                  {category.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Contact</NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="flex flex-col w-[250px] gap-4 p-4">
              {CONTACT.map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
