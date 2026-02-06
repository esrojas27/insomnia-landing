import { useState, useRef } from "react";
import { Menu, Shirt } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Desktop Hover Logic
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  // Mobile Touch Logic
  const handleTouchStart = () => {
    setIsOpen(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Auto-hide after 3 seconds on mobile if no interaction
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  };

  return (
    <div
      className="fixed top-6 right-6 z-50 flex flex-col items-end"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      ref={menuRef}
    >
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full flex items-center justify-center text-white relative z-50 transition-all duration-300"
        style={{
          backgroundColor: "rgba(20, 20, 20, 0.6)",
          backdropFilter: "blur(25px) saturate(180%)",
          WebkitBackdropFilter: "blur(25px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: `
            0 10px 20px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `
        }}
      >
        <Menu className="w-5 h-5" />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95, originY: 0 }}
            animate={{ opacity: 1, y: 10, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute top-full right-0 mt-2 w-48 rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "rgba(20, 20, 20, 0.8)",
              backdropFilter: "blur(25px) saturate(180%)",
              WebkitBackdropFilter: "blur(25px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
            }}
          >
            <div className="p-1">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-white/10 rounded-xl transition-colors group"
                onClick={(e) => e.preventDefault()} // Prevent default for now as it's a placeholder
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Shirt className="w-4 h-4 text-white/80" />
                </div>
                <span className="font-mono tracking-wider text-xs uppercase">Insomnia Merch</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
