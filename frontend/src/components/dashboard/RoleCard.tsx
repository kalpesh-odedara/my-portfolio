import { motion } from "framer-motion";
import { Shield, Users, Settings, Eye, Edit, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Permission {
  id: string;
  name: string;
  enabled: boolean;
}

interface RoleCardProps {
  role: {
    id: string;
    name: string;
    description: string;
    userCount: number;
    permissions: Permission[];
    color: "accent" | "success" | "warning";
  };
  index: number;
}

const iconMap = {
  Admin: Shield,
  Manager: Users,
  User: Settings,
};

const colorMap = {
  accent: "bg-accent text-accent-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
};

export const RoleCard = ({ role, index }: RoleCardProps) => {
  const Icon = iconMap[role.name as keyof typeof iconMap] || Shield;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group bg-card rounded-2xl border border-border p-6 card-hover"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className={cn("p-3 rounded-xl", colorMap[role.color])}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{role.name}</h3>
            <p className="text-sm text-muted-foreground">{role.description}</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs">
          {role.userCount} users
        </Badge>
      </div>

      <div className="space-y-3 mb-6">
        <h4 className="text-sm font-medium text-muted-foreground">Permissions</h4>
        <div className="flex flex-wrap gap-2">
          {role.permissions.map((permission) => (
            <motion.span
              key={permission.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 + 0.3 }}
              className={cn(
                "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs",
                permission.enabled
                  ? "bg-success/10 text-success"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {permission.enabled && <Check className="h-3 w-3" />}
              {permission.name}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="outline" size="sm" className="flex-1">
          <Eye className="h-4 w-4 mr-2" />
          View
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button variant="outline" size="icon" className="text-destructive hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

// Skeleton component for loading state
export const RoleCardSkeleton = ({ index }: { index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card rounded-2xl border border-border p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl skeleton-shimmer" />
          <div className="space-y-2">
            <div className="h-5 w-24 rounded skeleton-shimmer" />
            <div className="h-4 w-32 rounded skeleton-shimmer" />
          </div>
        </div>
        <div className="h-6 w-16 rounded-full skeleton-shimmer" />
      </div>

      <div className="space-y-3 mb-6">
        <div className="h-4 w-20 rounded skeleton-shimmer" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-6 w-20 rounded-full skeleton-shimmer" />
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 h-9 rounded-lg skeleton-shimmer" />
        <div className="flex-1 h-9 rounded-lg skeleton-shimmer" />
        <div className="h-9 w-9 rounded-lg skeleton-shimmer" />
      </div>
    </motion.div>
  );
};
