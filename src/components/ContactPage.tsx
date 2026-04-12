import { motion } from "motion/react";
import { Mail, CreditCard, MessageSquare, ChevronLeft, Github, Twitter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ContactPageProps {
  onBack: () => void;
}

export function ContactPage({ onBack }: ContactPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-8 hover:bg-primary/10 rounded-xl"
        >
          <ChevronLeft className="mr-2 w-5 h-5" /> Back to Dashboard
        </Button>

        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-primary/10 rounded-3xl mb-6 shadow-inner">
            <MessageSquare className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tight mb-4">
            Contact Shikhar
          </h1>
          <p className="text-muted-foreground text-lg">Have questions or want to support the project?</p>
        </div>

        <div className="grid gap-6">
          <Card className="border-2 shadow-lg rounded-3xl overflow-hidden hover:border-primary/30 transition-colors">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="bg-blue-500/10 p-3 rounded-2xl">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">Email Me</CardTitle>
                <CardDescription>For feedback or queries</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <a 
                href="mailto:iamshikharverma@gmail.com" 
                className="text-xl font-mono font-bold text-primary hover:underline break-all"
              >
                iamshikharverma@gmail.com
              </a>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-lg rounded-3xl overflow-hidden hover:border-emerald-500/30 transition-colors">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="bg-emerald-500/10 p-3 rounded-2xl">
                <CreditCard className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">Support My Journey</CardTitle>
                <CardDescription>Help keep this website free and updated</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-2xl border-2 border-dashed border-emerald-500/20 text-center">
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">UPI ID</p>
                <p className="text-2xl font-mono font-black text-emerald-700">8830117992@ptaxis</p>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Every contribution helps in maintaining the server and adding more PYQs.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
