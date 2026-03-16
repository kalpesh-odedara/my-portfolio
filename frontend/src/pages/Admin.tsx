import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, User, ShieldCheck, Inbox, Clock, Trash2, ArrowLeft, LogOut, Edit3, Reply, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  reply?: string;
  date: string;
}

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ id: "", password: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [replyingId, setReplyingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [replyValue, setReplyValue] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.id === "ok" && credentials.password === "8956") {
      setIsLoggedIn(true);
      toast({ title: "Welcome back, Kalpesh", description: "Access granted." });
    } else {
      toast({ title: "Invalid Credentials", variant: "destructive" });
    }
  };

  const { data: contacts, isLoading } = useQuery<Contact[]>({
    queryKey: ["admin-contacts"],
    queryFn: async () => {
      const resp = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/contacts`);
      if (!resp.ok) throw new Error("Failed to fetch");
      return resp.json();
    },
    enabled: isLoggedIn,
  });

  const handleDelete = async (id: number) => {
    try {
      const resp = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/contacts/${id}`, { method: 'DELETE' });
      if (!resp.ok) throw new Error();
      toast({ title: "Message deleted" });
      queryClient.invalidateQueries({ queryKey: ["admin-contacts"] });
    } catch (e) {
      toast({ title: "Failed to delete", variant: "destructive" });
    }
  };

  const handleUpdate = async (id: number, data: Partial<Contact>) => {
    try {
      const resp = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!resp.ok) throw new Error();
      toast({ title: "Message updated" });
      setEditingId(null);
      setReplyingId(null);
      queryClient.invalidateQueries({ queryKey: ["admin-contacts"] });
    } catch (e) {
      toast({ title: "Update failed", variant: "destructive" });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0c] p-4">
        <div className="absolute inset-0 mesh-gradient opacity-20" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md glass rounded-3xl p-8 border border-white/10 relative z-10"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4 border border-primary/20">
              <ShieldCheck className="h-8 w-8 text-primary shadow-glow" />
            </div>
            <h1 className="text-2xl font-bold">Admin Portal</h1>
            <p className="text-muted-foreground text-sm mt-2">Secure access for Odedara Kalpesh</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-1.5 block">Admin ID</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={credentials.id}
                  onChange={(e) => setCredentials({ ...credentials, id: e.target.value })}
                  placeholder="Enter ID"
                  className="pl-10 bg-white/5 border-white/10"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="••••"
                  className="pl-10 bg-white/5 border-white/10"
                />
              </div>
            </div>
            <Button variant="hero" type="submit" className="w-full h-12">
              Unlock Dashboard
            </Button>
          </form>

          <Link to="/" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors mt-8 mx-auto w-fit block italic">
            <ArrowLeft className="h-3 w-3" /> Back to Portfolio
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-foreground p-6 md:p-12">
      <div className="absolute inset-0 mesh-gradient opacity-10 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-primary font-mono text-xs mb-2">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              AUTHENTICATED ACCESS
            </div>
            <h1 className="text-4xl font-black tracking-tight">Lead Intelligence</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage incoming inquiries and professional leads.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" size="sm" onClick={() => setIsLoggedIn(false)} className="bg-white/5 border-white/10 hover:bg-white/10">
                <LogOut className="h-4 w-4 mr-2" /> Logout
             </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           {[
             { label: "Total Leads", value: contacts?.length || 0, icon: Inbox },
             { label: "Unread", value: contacts?.length || 0, icon: Clock },
             { label: "Security Status", value: "Locked", icon: ShieldCheck },
           ].map((stat) => (
             <div key={stat.label} className="glass rounded-2xl p-6 border border-white/5 card-hover">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-mono text-muted-foreground">{stat.label}</p>
                  <stat.icon className="h-4 w-4 text-primary opacity-50" />
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
             </div>
           ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-6">
            <Inbox className="h-5 w-5 text-primary" />
            Incoming Messages
          </h2>

          <AnimatePresence mode="popLayout">
            {isLoading ? (
               <div className="text-center py-20 opacity-50 font-mono text-sm animate-pulse">Scanning Database...</div>
            ) : contacts?.length === 0 ? (
               <div className="text-center py-20 glass rounded-3xl border border-dashed border-white/10 opacity-30 italic">No inquiries found yet.</div>
            ) : (
                contacts?.map((contact, i) => (
                  <motion.div
                    key={contact.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass rounded-2xl p-6 border border-white/5 group card-hover relative overflow-hidden"
                  >
                    {/* Action Bar */}
                    <div className="absolute top-0 right-0 p-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <Button 
                         variant="ghost" 
                         size="icon" 
                         className="h-8 w-8 text-muted-foreground hover:text-primary"
                         onClick={() => {
                           setReplyingId(contact.id);
                           setReplyValue(contact.reply || "");
                         }}
                       >
                          <Reply className="h-4 w-4" />
                       </Button>
                       <Button 
                         variant="ghost" 
                         size="icon" 
                         className="h-8 w-8 text-muted-foreground hover:text-accent"
                         onClick={() => {
                           setEditingId(contact.id);
                           setEditValue(contact.message);
                         }}
                       >
                          <Edit3 className="h-4 w-4" />
                       </Button>
                       <Button 
                         variant="ghost" 
                         size="icon" 
                         className="h-8 w-8 text-muted-foreground hover:text-destructive"
                         onClick={() => handleDelete(contact.id)}
                       >
                          <Trash2 className="h-4 w-4" />
                       </Button>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                          {contact.name[0].toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground">{contact.name}</h3>
                          <p className="text-xs text-primary/80 flex items-center gap-1.5">
                            <Mail className="h-3 w-3" /> {contact.email}
                          </p>
                        </div>
                      </div>
                      <div className="text-[10px] font-mono text-muted-foreground flex items-center gap-2">
                         <Clock className="h-3 w-3" /> {new Date(contact.date).toLocaleString()}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {editingId === contact.id ? (
                        <div className="space-y-2">
                          <Textarea 
                            value={editValue} 
                            onChange={(e) => setEditValue(e.target.value)}
                            className="bg-white/5 border-white/10 min-h-[100px]"
                          />
                          <div className="flex justify-end gap-2">
                             <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                             <Button size="sm" onClick={() => handleUpdate(contact.id, { message: editValue })}>Save Changes</Button>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white/5 rounded-xl p-4 text-sm text-muted-foreground leading-relaxed border border-white/5">
                          {contact.message}
                        </div>
                      )}

                      {/* Reply Section */}
                      {replyingId === contact.id ? (
                        <div className="space-y-2 border-l-2 border-primary/30 pl-4 mt-4">
                          <p className="text-[10px] font-mono text-primary uppercase">Your Reply</p>
                          <Textarea 
                            value={replyValue} 
                            onChange={(e) => setReplyValue(e.target.value)}
                            placeholder="Type your response..."
                            className="bg-primary/5 border-primary/20 min-h-[80px]"
                          />
                          <div className="flex justify-end gap-2">
                             <Button size="sm" variant="ghost" onClick={() => setReplyingId(null)}>Cancel</Button>
                             <Button size="sm" variant="hero" onClick={() => handleUpdate(contact.id, { reply: replyValue })}>Send Reply</Button>
                          </div>
                        </div>
                      ) : contact.reply && (
                        <div className="border-l-2 border-primary/30 pl-4 mt-4 py-1">
                          <p className="text-[10px] font-mono text-primary uppercase mb-1">Reply Form Kalpesh</p>
                          <p className="text-sm italic text-foreground/80">{contact.reply}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Admin;
