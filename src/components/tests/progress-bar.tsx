import { cn } from "@/lib/utils"

interface ProgressBarProps {
  current: number
  total: number
  className?: string
}

export function ProgressBar({ current, total, className }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
        <div
          className="h-full bg-secondary rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm text-on-surface-variant font-medium whitespace-nowrap">
        {current} / {total}
      </span>
    </div>
  )
}
