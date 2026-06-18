"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Tab {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  iconActive: React.ReactNode;
}

function TodayIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      {active ? (
        <path
          d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z"
          fill="currentColor"
        />
      ) : (
        <path
          d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z"
          fill="currentColor"
        />
      )}
    </svg>
  );
}

function PortfolioIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      {active ? (
        <path
          d="M21 18V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.9 6 10 6.9 10 8V16C10 17.1 10.9 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"
          fill="currentColor"
        />
      ) : (
        <path
          d="M21 18V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.9 6 10 6.9 10 8V16C10 17.1 10.9 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"
          fill="currentColor"
        />
      )}
    </svg>
  );
}

function AnalyticsIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      {active ? (
        <path
          d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z"
          fill="currentColor"
        />
      ) : (
        <path
          d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z"
          fill="currentColor"
        />
      )}
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      {active ? (
        <path
          d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
          fill="currentColor"
        />
      ) : (
        <path
          d="M12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6ZM12 14C14.7 14 20 15.3 20 18V20H4V18C4 15.3 9.3 14 12 14ZM12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4ZM12 16C9.33 16 4 17.34 4 20H20C20 17.34 14.67 16 12 16Z"
          fill="currentColor"
        />
      )}
    </svg>
  );
}

const tabs: Tab[] = [
  {
    id: "today",
    label: "Today",
    href: "/today",
    icon: <TodayIcon active={false} />,
    iconActive: <TodayIcon active={true} />,
  },
  {
    id: "portfolio",
    label: "Portfolio",
    href: "/portfolio",
    icon: <PortfolioIcon active={false} />,
    iconActive: <PortfolioIcon active={true} />,
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "/analytics",
    icon: <AnalyticsIcon active={false} />,
    iconActive: <AnalyticsIcon active={true} />,
  },
  {
    id: "profile",
    label: "Profile",
    href: "/profile",
    icon: <ProfileIcon active={false} />,
    iconActive: <ProfileIcon active={true} />,
  },
];

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="glass-tab-bar fixed bottom-0 left-0 right-0 z-[var(--z-sticky)] flex items-center justify-around pb-[env(safe-area-inset-bottom)]"
      role="tablist"
      aria-label="Main navigation"
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.href || pathname.startsWith(tab.href + "/");
        return (
          <Link
            key={tab.id}
            href={tab.href}
            role="tab"
            aria-selected={isActive}
            className={cn(
              "touch-target flex flex-col items-center justify-center gap-0.5 pt-2 pb-1 transition-colors duration-150",
              isActive
                ? "text-white"
                : "text-[var(--color-text-tertiary)]",
            )}
            style={{ minWidth: 64 }}
          >
            {isActive ? tab.iconActive : tab.icon}
            <span className="text-label">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
