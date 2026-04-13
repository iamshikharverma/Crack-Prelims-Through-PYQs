import { motion } from "motion/react";
import { Lightbulb, Target, Rocket, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface PhilosophyPageProps {
  onBack: () => void;
}

export function PhilosophyPage({ onBack }: PhilosophyPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
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
          <div className="inline-block p-3 bg-amber-500/10 rounded-2xl mb-4 shadow-inner">
            <Lightbulb className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-black tracking-tight mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Philosophy
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">The "BAWA" approach to UPSC and Life.</p>
        </div>

        <div className="grid gap-6">
          <Card className="border-2 shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="bg-amber-500/5 border-b border-amber-500/10 p-5">
              <CardTitle className="text-xl font-heading font-bold flex items-center gap-2">
                <Target className="w-5 h-5 text-amber-600" /> The Strategy
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 md:p-8 space-y-6 text-base md:text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              <div className="space-y-4">
                <p>
                  There are around 4,500 Previous Year Questions on this website including ones going all the way back to 1980 (and yes, they still get repeated). Together, they pretty much cover every subject asked in the UPSC Prelims.
                </p>
                <p>
                  The idea is instead of trying to first “complete the syllabus” (which honestly feels endless, like it includes everything under the sun), flip the approach: learn concepts through questions. You’ll realise the syllabus isn’t as infinite as it seems.
                </p>
                <p>
                  At the end of the day, UPSC like most competitive exams isn’t testing how much you know, how many books you’ve read, or how many video lectures you’ve watched. It’s testing problem solving skills:
                </p>
                <ul className="space-y-3 pl-4 border-l-4 border-amber-500/20">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    Can you break down a question?
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    Can you eliminate wrong options smartly?
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    Can you land on the right answer under pressure?
                  </li>
                </ul>
                <p>
                  So if you get really comfortable with PYQs and consistently practice through coaching mocks, you’re already doing one of the most effective things to clear Prelims. Think of this exam less like a knowledge test and more like a rehearsed performance and a strategy game.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t-2 border-primary/5">
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 relative">
                  <Heart className="w-6 h-6 text-primary absolute -top-3 -left-3 bg-slate-50 dark:bg-slate-950 rounded-full p-1" />
                  <p className="text-lg md:text-xl font-heading font-bold text-primary italic text-center">
                    "Play it well. Enjoy the process a little. And don’t get too attached to the outcome – that’s the 'BAWA' approach. Not just for exams, but honestly, for life too."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
