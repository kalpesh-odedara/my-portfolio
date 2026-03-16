import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatBot } from "@/components/chatbot/ChatBot";
import { RoleCard, RoleCardSkeleton } from "@/components/dashboard/RoleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockRoles = [
  {
    id: "1",
    name: "Admin",
    description: "Full system access with all permissions",
    userCount: 5,
    color: "accent" as const,
    permissions: [
      { id: "p1", name: "Create Users", enabled: true },
      { id: "p2", name: "Delete Users", enabled: true },
      { id: "p3", name: "Manage Roles", enabled: true },
      { id: "p4", name: "View Analytics", enabled: true },
      { id: "p5", name: "System Settings", enabled: true },
    ],
  },
  {
    id: "2",
    name: "Manager",
    description: "Team management and reporting access",
    userCount: 12,
    color: "success" as const,
    permissions: [
      { id: "p1", name: "Create Users", enabled: true },
      { id: "p2", name: "Delete Users", enabled: false },
      { id: "p3", name: "Manage Roles", enabled: false },
      { id: "p4", name: "View Analytics", enabled: true },
      { id: "p5", name: "Team Reports", enabled: true },
    ],
  },
  {
    id: "3",
    name: "User",
    description: "Basic access for regular users",
    userCount: 156,
    color: "warning" as const,
    permissions: [
      { id: "p1", name: "View Dashboard", enabled: true },
      { id: "p2", name: "Edit Profile", enabled: true },
      { id: "p3", name: "Submit Requests", enabled: true },
      { id: "p4", name: "View Reports", enabled: false },
    ],
  },
];

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredRoles = mockRoles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageTransition>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Role Management</h1>
            <p className="text-muted-foreground">
              Manage user roles and their associated permissions
            </p>
          </motion.div>

          {/* Actions Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search roles..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="hero">
                <Plus className="h-4 w-4 mr-2" />
                New Role
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
          >
            {[
              { label: "Total Roles", value: "3" },
              { label: "Active Users", value: "173" },
              { label: "Permissions", value: "15" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="bg-card rounded-xl border border-border p-6 text-center"
              >
                <div className="text-3xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Role Cards */}
          <div className="grid gap-6">
            {isLoading
              ? [0, 1, 2].map((i) => <RoleCardSkeleton key={i} index={i} />)
              : filteredRoles.map((role, i) => (
                  <RoleCard key={role.id} role={role} index={i} />
                ))}
          </div>

          {!isLoading && filteredRoles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">
                No roles found matching "{searchQuery}"
              </p>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
      <ChatBot />
    </PageTransition>
  );
};

export default Dashboard;
