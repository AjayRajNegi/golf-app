"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";

import { toast } from "sonner";
import { updateSingleScore } from "@/app/actions/dashboard.actions";

export function QuickAddDialog({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    const num = parseInt(value, 10);

    if (isNaN(num) || num < 1 || num > 45) {
      toast.error("Score must be between 1 and 45");
      return;
    }

    if (!date) {
      toast.error("Please select a date");
      return;
    }

    startTransition(async () => {
      try {
        await updateSingleScore(userId, num, new Date(date));
        toast.success("Score saved!");
        setOpen(false);
        setValue("");
        setDate(new Date().toISOString().split("T")[0]);
      } catch (err) {
        toast.error("Failed to save score");
      }
    });
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="border-white/10 bg-white/5 text-white hover:bg-white/10"
        onClick={() => setOpen(true)}
      >
        <Plus className="h-4 w-4 mr-1" />
        Quick Add
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-zinc-900 border-white/10 text-white sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add Stableford Score</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="score" className="text-white/70">
                Score (1–45)
              </Label>
              <Input
                id="score"
                type="number"
                min={1}
                max={45}
                placeholder="e.g. 36"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 
                           [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                           [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="date" className="text-white/70">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDate(e.target.value)}
                className="bg-white/5 border-white/10 text-white 
                           [color-scheme:dark]"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={isPending}
              className="text-white/60 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isPending || !value || !date}
              className="bg-white text-black hover:bg-white/90"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
              ) : null}
              Save Score
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
