import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { ReactNode, useState, useCallback } from "react";
import { RefreshCw } from "lucide-react";

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh?: () => Promise<void>;
  enabled?: boolean;
}

export function PullToRefresh({ children, onRefresh, enabled = true }: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const y = useMotionValue(0);
  
  const pullProgress = useTransform(y, [0, 80], [0, 1]);
  const rotation = useTransform(y, [0, 80], [0, 180]);
  const indicatorOpacity = useTransform(y, [0, 40, 80], [0, 0.5, 1]);

  const handleDragEnd = useCallback(
    async (_: any, info: PanInfo) => {
      if (info.offset.y > 80 && onRefresh && !isRefreshing) {
        setIsRefreshing(true);
        try {
          await onRefresh();
        } finally {
          setIsRefreshing(false);
        }
      }
    },
    [onRefresh, isRefreshing]
  );

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div className="relative overflow-hidden">
      {/* Pull indicator */}
      <motion.div 
        className="absolute left-1/2 -translate-x-1/2 top-4 z-50 flex items-center justify-center"
        style={{ opacity: indicatorOpacity }}
      >
        <motion.div
          style={{ rotate: rotation }}
          animate={isRefreshing ? { rotate: 360 } : {}}
          transition={isRefreshing ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
        >
          <RefreshCw className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y }}
        drag={!isRefreshing ? "y" : false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.5}
        onDragEnd={handleDragEnd}
        className="touch-pan-x"
      >
        {children}
      </motion.div>
    </div>
  );
}
