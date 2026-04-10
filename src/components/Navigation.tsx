"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Heart, User, LogOut } from "lucide-react";
import Hamburger from "hamburger-react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import AuthModal from "@/components/AuthModal";

const LOGO_SCROLL_THRESHOLD_PX = 8;
const LOGO_LARGE = { width: "7rem", height: "7rem" }; // h-28 w-28
const LOGO_COMPACT = { width: "7rem", height: "6rem" }; // w-28 h-24

const Navigation: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  /** Keeps the panel mounted until the GSAP close timeline finishes. */
  const [mobileMenuMounted, setMobileMenuMounted] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const mobileMenuTlRef = useRef<gsap.core.Timeline | null>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const sloganWrapRef = useRef<HTMLDivElement>(null);
  const sloganInnerRef = useRef<HTMLSpanElement>(null);
  const logoModeRef = useRef<"large" | "compact" | null>(null);

  useLayoutEffect(() => {
    const el = logoWrapRef.current;
    const sloganWrap = sloganWrapRef.current;
    if (!el) return;

    const mdQuery = window.matchMedia("(min-width: 768px)");
    const isCompact = () => window.scrollY > LOGO_SCROLL_THRESHOLD_PX;

    const measureSloganWidth = () => sloganInnerRef.current?.scrollWidth ?? 0;

    const syncSlogan = (animate: boolean, compact: boolean) => {
      if (!sloganWrap || !mdQuery.matches) return;
      const fullW = measureSloganWidth();
      if (fullW <= 0) return;

      if (!animate) {
        gsap.set(sloganWrap, { width: compact ? 0 : fullW, overflow: "hidden" });
        return;
      }
      gsap.to(sloganWrap, {
        width: compact ? 0 : fullW,
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const applyDesktop = (animate: boolean) => {
      const compact = isCompact();
      const mode: "large" | "compact" = compact ? "compact" : "large";
      const target = compact ? LOGO_COMPACT : LOGO_LARGE;

      if (animate && logoModeRef.current === mode) return;
      if (!animate) {
        gsap.set(el, target);
        logoModeRef.current = mode;
        syncSlogan(false, compact);
        return;
      }
      logoModeRef.current = mode;
      gsap.to(el, {
        ...target,
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });
      syncSlogan(true, compact);
    };

    const onScroll = () => {
      requestAnimationFrame(() => {
        if (!mdQuery.matches) return;
        applyDesktop(true);
      });
    };

    const onMdChange = () => {
      if (!mdQuery.matches) {
        gsap.killTweensOf([el, sloganWrap].filter(Boolean));
        gsap.set(el, { clearProps: "width,height" });
        if (sloganWrap) {
          gsap.set(sloganWrap, { clearProps: "width" });
        }
        logoModeRef.current = null;
        return;
      }
      logoModeRef.current = null;
      applyDesktop(false);
    };

    if (mdQuery.matches) {
      applyDesktop(false);
    } else {
      gsap.set(el, { clearProps: "width,height" });
      logoModeRef.current = null;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    mdQuery.addEventListener("change", onMdChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      mdQuery.removeEventListener("change", onMdChange);
      gsap.killTweensOf([el, sloganWrap].filter(Boolean));
    };
  }, []);

  const setMobileMenuOpen = useCallback((next: boolean) => {
    if (next) setMobileMenuMounted(true);
    setMobileOpen(next);
  }, []);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), [setMobileMenuOpen]);

  useLayoutEffect(() => {
    if (!mobileMenuMounted) return;
    const el = mobilePanelRef.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = el.querySelectorAll<HTMLElement>("[data-mobile-nav-item]");

    mobileMenuTlRef.current?.kill();

    if (mobileOpen) {
      if (reduced) {
        gsap.set(el, { clearProps: "clipPath" });
        gsap.set(items, { clearProps: "opacity,transform" });
        return;
      }
      gsap.set(el, { clipPath: "inset(0 0 100% 0)" });
      gsap.set(items, { opacity: 0, y: 14 });
      const tl = gsap.timeline();
      tl.to(el, {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.5,
        ease: "power4.out",
      }).to(
        items,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.065,
          ease: "power2.out",
        },
        "-=0.32"
      );
      mobileMenuTlRef.current = tl;
      return () => {
        mobileMenuTlRef.current?.kill();
      };
    }

    if (reduced) {
      setMobileMenuMounted(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => setMobileMenuMounted(false),
    });
    tl.to(items, {
      opacity: 0,
      y: -10,
      duration: 0.22,
      stagger: { each: 0.038, from: "end" },
      ease: "power2.in",
    }).to(
      el,
      {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.38,
        ease: "power3.in",
      },
      "-=0.08"
    );
    mobileMenuTlRef.current = tl;

    return () => {
      mobileMenuTlRef.current?.kill();
    };
  }, [mobileOpen, mobileMenuMounted]);

  const handleFavoritesClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setAuthModalOpen(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md py-2">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">

          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 md:gap-3"
            aria-label="Zenno — начало. По-лесният път към йога"
          >
            <div
              ref={logoWrapRef}
              className="relative shrink-0 h-28 w-28"
            >
              <Image
                src="/homepage/logo.png"
                alt="Zenno"
                fill
                className="object-contain p-1"
                sizes="(max-width: 768px) 48px, 96px"
                priority
              />
            </div>
            <div
              ref={sloganWrapRef}
              className="hidden min-w-0 overflow-hidden md:block -ml-4"
            >
              <span
                ref={sloganInnerRef}
                className="block whitespace-nowrap font-display font-semibold tracking-tight text-foreground md:text-xl"
              >
                По-лесният път към йога
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 font-body text-sm font-medium">
            <Link
              href="/discover"
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              Открий студио
            </Link>
            {isAuthenticated && user?.role === 'business' && (
              <Link
                href="/dashboard"
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                Табло
              </Link>
            )}
            {isAuthenticated && user?.role === 'admin' && (
              <Link
                href="/admin"
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                Админ панел
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/favorites" onClick={handleFavoritesClick}>
              <Button variant="ghost" size="icon"><Heart className="h-5 w-5" /></Button>
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/profile">
                  <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => router.push("/auth")}>Вход</Button>
                <Button onClick={() => router.push("/auth")}>Регистрация</Button>
              </>
            )}
          </div>

          <div className="md:hidden text-foreground [&_.hamburger-react]:rounded-md [&_.hamburger-react]:hover:bg-accent [&_.hamburger-react]:hover:text-accent-foreground">
            <Hamburger
              toggled={mobileOpen}
              toggle={setMobileMenuOpen}
              size={22}
              label={mobileOpen ? "Затвори менюто" : "Отвори менюто"}
              color="currentColor"
            />
          </div>
        </div>

        {mobileMenuMounted && (
          <div
            ref={mobilePanelRef}
            className="md:hidden overflow-hidden border-t border-border bg-background font-body will-change-[clip-path]"
            aria-hidden={!mobileOpen}
            inert={!mobileOpen}
          >
            <div className="px-4 py-4 space-y-3">
              <Link
                href="/discover"
                className="block py-2"
                data-mobile-nav-item
                onClick={closeMobileMenu}
              >
                Открий студио
              </Link>
              <button
                type="button"
                className="block py-2 w-full text-left"
                data-mobile-nav-item
                onClick={() => {
                  closeMobileMenu();
                  if (!isAuthenticated) {
                    setAuthModalOpen(true);
                  } else {
                    router.push("/favorites");
                  }
                }}
              >
                Любими
              </button>
              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    className="block py-2"
                    data-mobile-nav-item
                    onClick={closeMobileMenu}
                  >
                    Профил
                  </Link>
                  {user?.role === "business" && (
                    <Link
                      href="/dashboard"
                      className="block py-2"
                      data-mobile-nav-item
                      onClick={closeMobileMenu}
                    >
                      Табло
                    </Link>
                  )}
                  {user?.role === "admin" && (
                    <Link
                      href="/admin"
                      className="block py-2"
                      data-mobile-nav-item
                      onClick={closeMobileMenu}
                    >
                      Админ панел
                    </Link>
                  )}
                  <button
                    type="button"
                    className="block py-2 text-destructive"
                    data-mobile-nav-item
                    onClick={() => {
                      logout();
                      router.push("/");
                      closeMobileMenu();
                    }}
                  >
                    Изход
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth"
                    className="block py-2"
                    data-mobile-nav-item
                    onClick={closeMobileMenu}
                  >
                    Вход
                  </Link>
                  <Link
                    href="/auth"
                    className="block py-2 font-semibold text-primary"
                    data-mobile-nav-item
                    onClick={closeMobileMenu}
                  >
                    Регистрация
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        onSuccess={() => router.push("/favorites")}
      />
    </>
  );
};

export default Navigation;
