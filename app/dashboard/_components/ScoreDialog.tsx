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
import { Plus, Loader2 } from "lucide-react";

import { toast } from "sonner";
import { updateAllScore } from "@/app/actions/dashboard.actions";

export function ScoreDialog({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const emptyRow = () => ({
    value: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [rows, setRows] = useState(Array.from({ length: 5 }, emptyRow));

  function updateRow(index: number, field: "value" | "date", val: string) {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: val } : row)),
    );
  }

  function handleSubmit() {
    for (let i = 0; i < rows.length; i++) {
      const num = parseInt(rows[i].value, 10);
      if (isNaN(num) || num < 1 || num > 45) {
        toast.error(`Row ${i + 1}: Score must be between 1 and 45`);
        return;
      }
      if (!rows[i].date) {
        toast.error(`Row ${i + 1}: Please select a date`);
        return;
      }
    }

    startTransition(async () => {
      try {
        await updateAllScore(
          userId,
          rows.map((r) => ({
            value: parseInt(r.value, 10),
            date: new Date(r.date),
          })),
        );
        toast.success("Scores saved!");
        setOpen(false);
        setRows(Array.from({ length: 5 }, emptyRow));
      } catch {
        toast.error("Failed to save scores");
      }
    });
  }

  const today = new Date().toISOString().split("T")[0];
  const allFilled = rows.every((r) => r.value && r.date);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="border-white/10 bg-white/5 text-white hover:bg-white/10"
        onClick={() => setOpen(true)}
      >
        <Plus className="h-4 w-4 mr-1" />
        Bulk Add
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-zinc-900 border-white/10 text-white sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add 5 Stableford Scores</DialogTitle>
          </DialogHeader>

          <div className="py-2 space-y-3">
            {/* Column headers */}
            <div className="grid grid-cols-[1fr_1fr] gap-3 px-1">
              <span className="text-xs text-white/50 font-medium uppercase tracking-wide">
                Score (1–45)
              </span>
              <span className="text-xs text-white/50 font-medium uppercase tracking-wide">
                Date
              </span>
            </div>

            {rows.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_1fr] gap-3 items-center"
              >
                <Input
                  type="number"
                  min={1}
                  max={45}
                  placeholder="e.g. 36"
                  value={row.value}
                  onChange={(e) => updateRow(i, "value", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30
                             [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
                             [&::-webkit-inner-spin-button]:appearance-none"
                />
                <Input
                  type="date"
                  value={row.date}
                  max={today}
                  onChange={(e) => updateRow(i, "date", e.target.value)}
                  className="bg-white/5 border-white/10 text-white [color-scheme:dark]"
                />
              </div>
            ))}
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
              disabled={isPending || !allFilled}
              className="bg-white text-black hover:bg-white/90"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
              ) : null}
              Save 5 Scores
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
