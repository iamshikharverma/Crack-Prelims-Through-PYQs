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
        className="max-w-xl mx-auto"
      >
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onBack}
          className="mb-4 hover:bg-primary/10 rounded-xl"
        >
          <ChevronLeft className="mr-1 w-4 h-4" /> Back
        </Button>

        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-primary/10 rounded-2xl mb-4 shadow-inner">
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-black tracking-tight mb-2">
            Contact Shikhar
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">Have questions or want to support the project?</p>
        </div>

        <div className="grid gap-4">
          <Card className="border-2 shadow-lg rounded-2xl overflow-hidden hover:border-primary/30 transition-colors">
            <CardHeader className="flex flex-row items-center gap-3 pb-2 p-4">
              <div className="bg-blue-500/10 p-2 rounded-xl">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">Email Me</CardTitle>
                <CardDescription className="text-xs">For feedback or queries</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <a 
                href="mailto:iamshikharverma@gmail.com" 
                className="text-lg font-mono font-bold text-primary hover:underline break-all"
              >
                iamshikharverma@gmail.com
              </a>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-lg rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-colors">
            <CardHeader className="flex flex-row items-center gap-3 pb-2 p-4">
              <div className="bg-emerald-500/10 p-2 rounded-xl">
                <CreditCard className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">Support My Journey</CardTitle>
                <CardDescription className="text-xs">Help keep this website free and updated</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 p-4 pt-0">
              <div className="bg-muted p-3 rounded-xl border-2 border-dashed border-emerald-500/20 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">UPI ID</p>
                <p className="text-xl font-mono font-black text-emerald-700">8830117992@ptaxis</p>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Every contribution helps in maintaining the server and adding more PYQs.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
