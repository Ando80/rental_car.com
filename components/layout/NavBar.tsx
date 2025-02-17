"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import Container from "../Container";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import SearchInput from "../SearchInput";
import { ModeToggle } from "../theme-toogle";
import { NavMenu } from "./NavMenu";

const NavBar = () => {
  const router = useRouter();
  const { userId } = useAuth();
  return (
    <div className="sticky top-0 border border-b-primary/5 bg-secondary">
      <Container>
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image src="/icon.png" alt="title" width="35" height="35" />
            <div className="flex gap-3 items-center">ProTender</div>
          </div>
          <SearchInput />

          <div className="flex gap-3 items-center">
            {userId && (
              <>
                <div>
                  <ModeToggle />
                  <NavMenu />
                </div>
                <UserButton afterSignOutUrl="/" />
              </>
            )}
            {!userId && (
              <>
                <Button
                  onClick={() => router.push("/sign-in")}
                  variant="outline"
                  size="sm"
                >
                  Sign in
                </Button>
                <Button onClick={() => router.push("/sign-up")} size="sm">
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
