"use client"

import { Home, Compass, Plus, MessageCircle, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const Navigation = () => {
  const pathname = usePathname()
  
  const links = [
    { name: "For You", href: "/", icon: Home },
    { name: "Discover", href: "/discover", icon: Compass },
    { name: "Create", href: "/create", icon: Plus },
    { name: "Messages", href: "/messages", icon: MessageCircle },
    { name: "Profile", href: "/profile", icon: User },
  ]

  return (
    <div className="fixed bottom-0 z-50 w-full border-t bg-background p-2 backdrop-blur-lg md:top-0 md:h-screen md:w-16 md:border-r md:border-t-0 md:p-4">
      <div className="flex h-full justify-around md:flex-col md:justify-start md:space-y-4">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex flex-col items-center justify-center rounded-lg p-2 transition-colors hover:bg-accent",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs md:hidden">{link.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Navigation