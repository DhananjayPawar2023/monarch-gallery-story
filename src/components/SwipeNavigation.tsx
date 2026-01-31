import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { ReactNode, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface SwipeNavigationProps {
  children: ReactNode;
  enabled?: boolean;
}

// Define navigation order for swipe gestures
const navigationOrder = [
  "/",
  "/collections",
  "/artists",
  "/journal",
  "/about",
  "/contact",
];

export function SwipeNavigation({ children, enabled = true }: SwipeNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const x = useMotionValue(0);
  
  // Visual feedback during swipe
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);
  const scale = useTransform(x, [-200, 0, 200], [0.98, 1, 0.98]);

  const handleDragEnd = useCallback(
    (_: any, info: PanInfo) => {
      const threshold = 100;
      const velocity = info.velocity.x;
      const offset = info.offset.x;

      // Only navigate if swipe was fast enough or far enough
      if (Math.abs(velocity) > 500 || Math.abs(offset) > threshold) {
        const currentIndex = navigationOrder.indexOf(location.pathname);
        
        if (currentIndex === -1) return;

        if (offset > 0 && currentIndex > 0) {
          // Swipe right - go to previous page
          navigate(navigationOrder[currentIndex - 1]);
        } else if (offset < 0 && currentIndex < navigationOrder.length - 1) {
          // Swipe left - go to next page
          navigate(navigationOrder[currentIndex + 1]);
        }
      }
    },
    [navigate, location.pathname]
  );

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <motion.div
      style={{ x, opacity, scale }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      className="touch-pan-y"
    >
      {children}
    </motion.div>
  );
}
