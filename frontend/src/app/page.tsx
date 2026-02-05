import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="text-center">Logger</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <p className="mb-4 text-center">
            Welcome to Logger, a simple application for logging your activities.
          </p>
          <div className="flex gap-4">
            <Link href="/auth/login" passHref>
              <Button>Login</Button>
            </Link>
            <Link href="/auth/signup" passHref>
              <Button variant="outline">Sign Up</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}