"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: "fade-up" | "fade-in" | "fade-down" | "slide-left" | "slide-right" | "scale-in"
  delay?: number
  as?: "section" | "div" | "article"
  id?: string
}

export function AnimatedSection({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  as: Tag = "section",
  id,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      id={id}
      className={cn(
        visible && `animate-${animation}`,
        !visible && "opacity-0",
        className
      )}
      style={delay > 0 ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  )
}

export function StaggerGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid", className)}>
      {children}
    </div>
  )
}

export function StaggerItem({ children, index = 0, className }: { children: React.ReactNode; index?: number; className?: string }) {
  return (
    <AnimatedSection animation="fade-up" delay={index * 0.15} className={className} as="div">
      {children}
    </AnimatedSection>
  )
}
