import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { SidebarProvider, useSidebar } from "./sidebar/SidebarContext";
import { UserAvatar } from "./sidebar/UserAvatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface SubMenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface Links {
  label: string;
  href?: string;
  icon: React.ReactNode;
  badge?: string;
  submenu?: SubMenuItem[];
}

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <DesktopSidebar className={className}>{children}</DesktopSidebar>
      <MobileSidebar className={className}>{children}</MobileSidebar>
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <motion.div
      className={cn(
        "fixed left-0 h-full px-4 py-4 hidden md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[300px] flex-shrink-0 z-50",
        className
      )}
      animate={{
        width: animate ? (open ? "300px" : "60px") : "300px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex flex-col h-full">
        <motion.div 
          className="flex items-center gap-3"
          animate={{
            justifyContent: animate ? (open ? "flex-start" : "center") : "flex-start",
          }}
        >
          <img src="/logo.svg" alt="Maven Logo" className="h-8 w-8" />
          <motion.span
            className="font-bold text-lg"
            initial={false}
            animate={{
              opacity: animate ? (open ? 1 : 0) : 1,
              display: animate ? (open ? "block" : "none") : "block",
            }}
          >
            Maven
          </motion.span>
        </motion.div>
        
        <div className="flex-grow mt-8">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export const MobileSidebar = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const { open, setOpen } = useSidebar();
  return (
    <div
      className={cn(
        "h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full fixed bottom-0 left-0 right-0 z-50"
      )}
    >
      <div className="flex justify-end z-20 w-full">
        <Menu
          className="text-neutral-800 dark:text-neutral-200"
          onClick={() => setOpen(!open)}
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className={cn(
              "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
              className
            )}
          >
            <div>
              <div
                className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
                onClick={() => setOpen(!open)}
              >
                <X />
              </div>
              {children}
            </div>
            <UserAvatar />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SidebarLink = ({
  link,
  className,
}: {
  link: Links;
  className?: string;
}) => {
  const { open, animate } = useSidebar();
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  if (link.submenu) {
    return (
      <div>
        <button
          onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
          className={cn(
            "flex items-center justify-start gap-2 group/sidebar py-2 w-full",
            className
          )}
        >
          {link.icon}
          <motion.div
            initial={false}
            animate={{
              opacity: animate ? (open ? 1 : 0) : 1,
              display: animate ? (open ? "flex" : "none") : "flex",
            }}
            className="items-center gap-2 flex-grow"
          >
            <span className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre">
              {link.label}
            </span>
            {isSubmenuOpen ? (
              <ChevronUp className="h-4 w-4 ml-auto" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-auto" />
            )}
          </motion.div>
        </button>
        <AnimatePresence>
          {isSubmenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-white dark:bg-neutral-800"
            >
              {link.submenu.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center gap-2 py-2 pl-8 text-sm text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link
      to={link.href!}
      className={cn(
        "flex items-center justify-start gap-2 group/sidebar py-2",
        className
      )}
    >
      {link.icon}
      <motion.div
        initial={false}
        animate={{
          opacity: animate ? (open ? 1 : 0) : 1,
          display: animate ? (open ? "flex" : "none") : "flex",
        }}
        className="items-center gap-2"
      >
        <span className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre">
          {link.label}
        </span>
        {link.badge && (
          <Badge variant="secondary" className="text-[10px] px-1 py-0">
            {link.badge}
          </Badge>
        )}
      </motion.div>
    </Link>
  );
};