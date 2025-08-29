"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function SetAvailabilityModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [firstDay, setFirstDay] = React.useState<string>("");
  const [lastDay, setLastDay] = React.useState<string>("");
  const [allCanContact, setAllCanContact] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");

  const confirmDisabled = !firstDay || !lastDay;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Schedule unavailable dates</DialogTitle>
          <p className="text-sm text-gray-400">While unavailable, your Gigs are hidden and you will not receive new orders. During this time you can still message buyers with active orders.</p>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div>
            <div className="text-sm font-medium mb-2">Choose dates</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-muted-foreground mb-1">First day</div>
                <input
                  type="date"
                  value={firstDay}
                  onChange={(e) => setFirstDay(e.target.value)}
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Last day</div>
                <input
                  type="date"
                  value={lastDay}
                  onChange={(e) => setLastDay(e.target.value)}
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={allCanContact} onChange={(e) => setAllCanContact(e.target.checked)} />
                <span className="text-sm font-medium">All buyers can contact me</span>
              </label>
            </div>
            <div className="text-sm text-gray-400 max-w-sm">Only enable if you can reply, since your response time to new messages will affect your response rate.</div>
          </div>

          <div>
            <div className="text-sm font-medium mb-2">Add a message <span className="text-xs text-gray-400">(Optional)</span></div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Buyers will see this message on your profile and Gig pages"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm h-24"
            />
          </div>
        </div>

        <DialogFooter>
          <div className="mr-auto" />
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="mr-2">Cancel</Button>
          <Button onClick={() => {
            // In a real app we'd call an API to save availability. For now just close the modal.
            onOpenChange(false);
          }} disabled={confirmDisabled}>
            Confirm dates
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SetAvailabilityModal;
