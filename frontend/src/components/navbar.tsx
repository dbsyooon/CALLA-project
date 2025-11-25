import { Link, useLocation } from 'react-router-dom';
import { Activity, LogOut, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const { isAuthenticated, user, logout } = useAuth();

  const links = [
    { href: "/", label: "홈" },
    { href: "/input", label: "데이터 입력" },
    { href: "/dashboard", label: "대시보드" },
    { href: "/chat", label: "AI 상담" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <Activity className="h-6 w-6 text-primary" />
          <span className="text-foreground">AI 건강 분석</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 border-l border-border pl-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground font-medium">{user?.username}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  로그아웃
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login">로그인</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/register">회원가입</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}