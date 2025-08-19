"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Apple, Facebook, Mail, Chrome } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface JoinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JoinDialog({ open, onOpenChange }: JoinDialogProps) {
  const [email, setEmail] = useState("");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl md:max-w-6xl w-[min(96vw,1100px)] max-h-[90vh] h-[min(90vh,820px)] p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <div className="hidden md:flex h-full flex-col gap-4 bg-secondary p-10">
            <h3 className="text-xl font-semibold">Build without a team</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Replace routine work with AI agents</li>
              <li>• 24/7 operations, no shifts or payroll</li>
              <li>• Pay per run, not per salary</li>
              <li>• Plug into your tools in minutes</li>
              <li>• Scale customers without adding headcount</li>
            </ul>
            <div className="mt-6 relative flex-1 rounded-[10px] overflow-hidden bg-secondary">
              <Image src="/signupimg.png" alt="AI agents working" fill className="object-contain" />
            </div>
            <div className="mt-4 text-xs text-muted-foreground">By joining, you agree to our Terms and Privacy Policy.</div>
          </div>
          <div className="p-6 md:p-10 h-full overflow-y-auto">
            <div className="mx-auto w-full max-w-md">
              <DialogHeader className="mb-2">
                <DialogTitle className="text-2xl">Create a new account</DialogTitle>
              </DialogHeader>
              <p className="mb-4 text-sm text-muted-foreground">
                Already have an account? <Link href="#signin" className="underline">Sign in</Link>
              </p>
              <div className="grid gap-3">
                <Button variant="outline" className="h-12 justify-start gap-3 rounded-[10px]">
                  <Chrome className="h-5 w-5" />
                  Continue with Google
                </Button>
                <Button variant="secondary" className="h-12 justify-start gap-3 rounded-[10px]">
                  <Mail className="h-5 w-5" />
                  Continue with email
                </Button>
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-1">
                  <Separator />
                  <span className="text-xs text-muted-foreground">OR</span>
                  <Separator />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="h-12 justify-start gap-3 rounded-[10px]">
                    <Apple className="h-5 w-5" />
                    Apple
                  </Button>
                  <Button variant="outline" className="h-12 justify-start gap-3 rounded-[10px]">
                    <Facebook className="h-5 w-5" />
                    Facebook
                  </Button>
                </div>
                <p className="mt-4 text-[12px] leading-relaxed text-muted-foreground">
                  By joining, you agree to our <Link href="#terms" className="underline">Terms of Service</Link> and
                  Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


