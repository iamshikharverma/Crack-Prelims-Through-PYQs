import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Trophy,
  BookOpen,
  HelpCircle,
  AlertCircle,
  XCircle,
  LayoutDashboard,
  Mail,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  polityQuestions,
  economyQuestions,
  ancientHistoryQuestions,
  medievalHistoryQuestions,
  artCultureQuestions,
  modernHistoryQuestions,
  geographyQuestions,
  environmentQuestions,
  scienceTechQuestions,
  Question,
} from "./data/questions";
import { cn } from "@/lib/utils";
import { Footer } from "./components/Footer";
import { ContactPage } from "./components/ContactPage";
import { PhilosophyPage } from "./components/PhilosophyPage";

type View = "dashboard" | "quiz" | "contact" | "philosophy";

type Category = 
  | "polity" 
  | "economy" 
  | "ancient" 
  | "medieval" 
  | "art" 
  | "modern" 
  | "geography" 
  | "environment" 
  | "scienceTech";

interface CategoryConfig {
  id: Category;
  title: string;
  description: string;
  icon: any;
  color: string;
  questions: Question[];
}

export default function App() {
  const [view, setView] = useState<View>("dashboard");
  const [category, setCategory] = useState<Category | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, Record<number, number | null>>>(() => {
    const saved = localStorage.getItem("upsc_user_answers");
    return saved ? JSON.parse(saved) : {};
  });
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showNavigator, setShowNavigator] = useState(false);

  // Save answers to localStorage
  useEffect(() => {
    localStorage.setItem("upsc_user_answers", JSON.stringify(userAnswers));
  }, [userAnswers]);

  const categories: CategoryConfig[] = [
    {
      id: "polity",
      title: "Indian Polity",
      description: "Constitution, Governance, and Political System.",
      icon: LayoutDashboard,
      color: "blue",
      questions: polityQuestions,
    },
    {
      id: "economy",
      title: "Indian Economy",
      description: "Planning, Banking, Fiscal Policy, and Development.",
      icon: Trophy,
      color: "emerald",
      questions: economyQuestions,
    },
    {
      id: "ancient",
      title: "Ancient History",
      description: "Indus Valley, Mauryas, Guptas, and Early India.",
      icon: BookOpen,
      color: "amber",
      questions: ancientHistoryQuestions,
    },
    {
      id: "medieval",
      title: "Medieval History",
      description: "Delhi Sultanate, Mughals, and Regional Kingdoms.",
      icon: BookOpen,
      color: "orange",
      questions: medievalHistoryQuestions,
    },
    {
      id: "modern",
      title: "Modern History",
      description: "British Rule, Freedom Struggle, and Independence.",
      icon: BookOpen,
      color: "red",
      questions: modernHistoryQuestions,
    },
    {
      id: "art",
      title: "Art & Culture",
      description: "Architecture, Dance, Music, and Indian Heritage.",
      icon: HelpCircle,
      color: "purple",
      questions: artCultureQuestions,
    },
    {
      id: "geography",
      title: "Geography",
      description: "Physical, Social, and Economic Geography of India & World.",
      icon: LayoutDashboard,
      color: "indigo",
      questions: geographyQuestions,
    },
    {
      id: "environment",
      title: "Environment",
      description: "Ecology, Biodiversity, Climate Change, and Conservation.",
      icon: AlertCircle,
      color: "green",
      questions: environmentQuestions,
    },
    {
      id: "scienceTech",
      title: "Science & Tech",
      description: "Developments in Science, Technology, and IT.",
      icon: HelpCircle,
      color: "cyan",
      questions: scienceTechQuestions,
    },
  ];

  const currentCategoryConfig = categories.find((c) => c.id === category);
  const questions = currentCategoryConfig?.questions || [];
  const currentQuestion = questions[currentIndex];
  
  const currentCategoryAnswers = category ? userAnswers[category] || {} : {};
  const answeredCount = Object.keys(currentCategoryAnswers).length;
  const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  // Calculate score for current category
  useEffect(() => {
    if (category && questions.length > 0) {
      let newScore = 0;
      const answers = userAnswers[category] || {};
      Object.entries(answers).forEach(([idx, ans]) => {
        if (ans === questions[parseInt(idx)].correctAnswer) {
          newScore++;
        }
      });
      setScore(newScore);
    }
  }, [category, userAnswers, questions]);

  const handleOptionSelect = (val: string) => {
    if (!category) return;
    const optionIndex = parseInt(val);

    setUserAnswers((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category] || {}),
        [currentIndex]: optionIndex,
      },
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    if (category) {
      setUserAnswers((prev) => ({
        ...prev,
        [category]: {},
      }));
    }
    setScore(0);
    setIsFinished(false);
  };

  const handleCategorySelect = (cat: Category) => {
    setCategory(cat);
    setCurrentIndex(0);
    setIsFinished(false);
    setView("quiz");
  };

  const handleBackToMenu = () => {
    setCategory(null);
    setCurrentIndex(0);
    setIsFinished(false);
    setView("dashboard");
  };

  const getProgressForCategory = (catId: Category) => {
    const catConfig = categories.find(c => c.id === catId);
    if (!catConfig) return 0;
    const answers = userAnswers[catId] || {};
    const answered = Object.keys(answers).length;
    return Math.round((answered / catConfig.questions.length) * 100);
  };

  if (view === "contact") {
    return <ContactPage onBack={() => setView("dashboard")} />;
  }

  if (view === "philosophy") {
    return <PhilosophyPage onBack={() => setView("dashboard")} />;
  }

  if (view === "dashboard") {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
        <div className="p-3 md:p-8 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-6xl mx-auto"
          >
            <div className="flex justify-center md:justify-end gap-2 mb-4 md:mb-8">
              <Button 
                variant="ghost" 
                size="sm"
                className="rounded-xl font-bold gap-2"
                onClick={() => setView("philosophy")}
              >
                <Info className="w-4 h-4" /> Philosophy
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="rounded-xl font-bold gap-2"
                onClick={() => setView("contact")}
              >
                <Mail className="w-4 h-4" /> Contact Shikhar
              </Button>
            </div>

            <div className="text-center mb-6 md:mb-10">
              <h1 className="text-2xl md:text-5xl font-heading font-black tracking-tight mb-2 bg-gradient-to-r from-primary via-purple-500 to-blue-600 bg-clip-text text-transparent">
                Crack UPSC Prelims
              </h1>
              <p className="text-sm md:text-lg text-muted-foreground font-medium">Practice with Previous Year Questions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {categories.map((cat, idx) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card 
                    className={cn(
                      "group cursor-pointer transition-all duration-300 hover:shadow-2xl border-2 relative overflow-hidden h-full flex flex-col",
                      `hover:border-${cat.color}-500`
                    )}
                    onClick={() => handleCategorySelect(cat.id)}
                  >
                    <div className={cn(
                      "absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-10 transition-transform group-hover:scale-150",
                      `bg-${cat.color}-500`
                    )} />
                    
                    <CardHeader className="relative z-10 p-5">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-all group-hover:scale-110 group-hover:rotate-3 shadow-lg",
                        `bg-${cat.color}-500/10 text-${cat.color}-600`
                      )}>
                        <cat.icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl font-heading font-bold">{cat.title}</CardTitle>
                      <CardDescription className="text-sm line-clamp-2">
                        {cat.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="mt-auto relative z-10 p-5 pt-0">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-muted-foreground">{cat.questions.length} Questions</span>
                          <span className="text-primary font-bold">{getProgressForCategory(cat.id)}%</span>
                        </div>
                        <Progress value={getProgressForCategory(cat.id)} className="h-1.5 bg-slate-200 dark:bg-slate-800" />
                      </div>
                    </CardContent>
                    
                    <CardFooter className="relative z-10 p-5 pt-0">
                      <Button variant="ghost" size="sm" className={cn(
                        "w-full font-bold text-base group-hover:bg-primary group-hover:text-primary-foreground transition-all rounded-xl",
                        `group-hover:bg-${cat.color}-500`
                      )}>
                        Start Practice <ChevronRight className="ml-1 w-4 h-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg"
        >
          <Card className="border-2 shadow-2xl rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-md">
            <div className={cn("h-3 w-full", `bg-${currentCategoryConfig?.color}-500`)} />
            <CardHeader className="text-center pb-2 pt-10">
              <motion.div 
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                className={cn("mx-auto w-24 h-24 rounded-3xl flex items-center justify-center mb-6 shadow-lg", `bg-${currentCategoryConfig?.color}-500/10 text-${currentCategoryConfig?.color}-600`)}
              >
                <Trophy className="w-12 h-12" />
              </motion.div>
              <CardTitle className="text-4xl font-heading font-black tracking-tight">Quiz Completed!</CardTitle>
              <CardDescription className="text-xl font-medium mt-2">
                You've finished the {currentCategoryConfig?.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-8 p-10">
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground uppercase tracking-[0.3em] font-black">Your Final Score</p>
                <div className={cn("text-8xl font-heading font-black", `text-${currentCategoryConfig?.color}-600`)}>
                  {score} <span className="text-3xl text-muted-foreground font-bold">/ {questions.length}</span>
                </div>
              </div>
              
              <div className="bg-muted/30 p-6 rounded-3xl border-2 border-border shadow-inner">
                <p className="text-lg font-medium italic text-muted-foreground leading-relaxed">
                  {score === questions.length
                    ? "Absolute Perfection! You are a UPSC Master. Prelims is yours!"
                    : score >= questions.length * 0.8
                    ? "Outstanding performance! You have a very strong command over this subject."
                    : score >= questions.length * 0.6
                    ? "Great job! A bit more revision and you'll be unstoppable."
                    : "Good effort. Every question is a learning opportunity. Review the solutions to grow."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-green-500/5 rounded-2xl border-2 border-green-500/10">
                  <p className="text-xs font-black uppercase tracking-widest text-green-600 mb-1">Accuracy</p>
                  <p className="text-2xl font-black text-green-700">{Math.round((score / answeredCount) * 100)}%</p>
                </div>
                <div className="p-4 bg-blue-500/5 rounded-2xl border-2 border-blue-500/10">
                  <p className="text-xs font-black uppercase tracking-widest text-blue-600 mb-1">Answered</p>
                  <p className="text-2xl font-black text-blue-700">{answeredCount}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 p-10 pt-0">
              <Button onClick={handleRestart} className={cn("w-full h-16 text-xl font-black rounded-2xl shadow-lg transition-all hover:scale-[1.02]", `bg-${currentCategoryConfig?.color}-500 hover:bg-${currentCategoryConfig?.color}-600`)}>
                <RotateCcw className="mr-3 w-6 h-6" />
                Retake Quiz
              </Button>
              <Button onClick={handleBackToMenu} className="w-full h-16 text-xl font-black rounded-2xl border-2 shadow-sm" variant="outline">
                Back to Dashboard
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-foreground font-sans selection:bg-primary/20 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-2 md:py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={handleBackToMenu}>
            <h1 className="font-heading font-black text-lg md:text-xl tracking-tight">
              Crack UPSC
            </h1>
          </div>
          
          <div className="flex-1 max-w-md flex items-center gap-3">
            <div className="flex-1 hidden sm:block">
              <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-1.5 shadow-inner" />
            </div>
            <div className="bg-muted px-3 py-1 rounded-lg border border-border flex items-center gap-1.5 shadow-sm">
              <span className="text-xs font-black font-mono">
                {currentIndex + 1} <span className="text-muted-foreground font-medium">/ {questions.length}</span>
              </span>
            </div>
          </div>

          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-xl shadow-sm h-9 w-9"
            onClick={() => setShowNavigator(!showNavigator)}
          >
            <LayoutDashboard className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-3 py-4 md:py-8 relative">
        {/* Question Navigator Overlay */}
        <AnimatePresence>
          {showNavigator && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-4 right-4 z-20 bg-background/95 backdrop-blur-md border-2 border-primary/20 rounded-3xl shadow-2xl p-6 mb-8"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading font-bold text-lg">Jump to Question</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowNavigator(false)}>Close</Button>
              </div>
              <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-[300px] overflow-y-auto p-1">
                {questions.map((_, idx) => {
                  const isAnswered = currentCategoryAnswers[idx] !== undefined;
                  const isCurrent = currentIndex === idx;
                  const isCorrect = isAnswered && currentCategoryAnswers[idx] === questions[idx].correctAnswer;
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setShowNavigator(false);
                      }}
                      className={cn(
                        "h-10 w-full rounded-lg text-xs font-bold transition-all flex items-center justify-center border-2",
                        isCurrent ? "border-primary bg-primary text-primary-foreground scale-110 z-10 shadow-lg" : 
                        isAnswered ? (isCorrect ? "border-green-500 bg-green-500/10 text-green-600" : "border-red-500 bg-red-500/10 text-red-600") :
                        "border-border bg-muted/50 hover:border-primary/50"
                      )}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-2 shadow-xl rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm">
              <CardHeader className="space-y-4 p-5 md:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "p-1.5 rounded-lg",
                      `bg-${currentCategoryConfig?.color}-500/10 text-${currentCategoryConfig?.color}-600`
                    )}>
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground block">Question</span>
                      <span className="text-lg font-heading font-black">{currentIndex + 1} of {questions.length}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="bg-muted px-3 py-1 rounded-full border border-border shadow-sm">
                      <span className="text-[10px] font-black font-mono text-muted-foreground tracking-wider">UPSC {currentQuestion.year}</span>
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg md:text-2xl font-heading font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100">
                  {currentQuestion.text}
                </CardTitle>
              </CardHeader>

              <CardContent className="px-5 md:px-8 pb-6 space-y-6">
                <RadioGroup
                  value={currentCategoryAnswers[currentIndex]?.toString() || ""}
                  onValueChange={handleOptionSelect}
                  className="grid gap-3"
                >
                  {currentQuestion.options.map((option, index) => {
                    const isCorrect = index === currentQuestion.correctAnswer;
                    const isSelected = currentCategoryAnswers[currentIndex] === index;
                    const hasAnswered = currentCategoryAnswers[currentIndex] !== undefined;
                    
                    let variantClass = "border-border hover:border-primary/50 bg-card hover:shadow-sm";
                    if (hasAnswered) {
                      if (isCorrect) variantClass = "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400 ring-1 ring-green-500/20";
                      else if (isSelected) variantClass = "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400 ring-1 ring-red-500/20";
                      else variantClass = "opacity-40 border-border bg-card grayscale-[0.5]";
                    } else if (isSelected) {
                      variantClass = "border-primary bg-primary/5 ring-1 ring-primary/20";
                    }

                    return (
                      <div key={index} className="relative group">
                        <RadioGroupItem
                          value={index.toString()}
                          id={`q-${currentIndex}-opt-${index}`}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={`q-${currentIndex}-opt-${index}`}
                          className={cn(
                            "flex items-start gap-3 p-3.5 rounded-xl border-2 transition-all duration-200 cursor-pointer relative z-10",
                            variantClass,
                            !hasAnswered && "hover:-translate-y-0.5 active:scale-[0.99]"
                          )}
                        >
                          <span className={cn(
                            "flex items-center justify-center w-7 h-7 rounded-lg border-2 text-xs font-black shrink-0 mt-0.5 transition-colors",
                            isSelected ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/20 text-muted-foreground"
                          )}>
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="text-base md:text-lg font-medium leading-relaxed pt-0.5">{option}</span>
                          {hasAnswered && isCorrect && (
                            <div className="ml-auto bg-green-500 text-white p-0.5 rounded-full shadow-lg">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                          )}
                          {hasAnswered && isSelected && !isCorrect && (
                            <div className="ml-auto bg-red-500 text-white p-0.5 rounded-full shadow-lg">
                              <XCircle className="w-4 h-4" />
                            </div>
                          )}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>

                {currentCategoryAnswers[currentIndex] !== undefined && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 space-y-4"
                  >
                    <Separator className="h-0.5 bg-slate-200 dark:bg-slate-800" />
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-primary/10 shadow-inner">
                      <div className="flex items-center gap-2 text-primary mb-2">
                        <div className="bg-primary/10 p-1.5 rounded-lg">
                          <AlertCircle className="w-5 h-5" />
                        </div>
                        <h3 className="font-heading font-black text-lg tracking-tight">Explanation</h3>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-medium">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </motion.div>
                )}
              </CardContent>

              <CardFooter className="bg-slate-100/50 dark:bg-slate-900/50 border-t border-border p-5 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="flex gap-3 w-full sm:w-auto">
                  <Button 
                    onClick={handlePrevious} 
                    disabled={currentIndex === 0}
                    variant="outline" 
                    size="sm"
                    className="flex-1 sm:w-32 h-11 rounded-xl font-bold text-base shadow-sm border-2"
                  >
                    <RotateCcw className="mr-2 w-4 h-4 rotate-180" />
                    Prev
                  </Button>
                  <Button 
                    onClick={handleNext} 
                    size="sm"
                    className="flex-1 sm:w-32 h-11 rounded-xl font-bold text-base shadow-lg"
                  >
                    {currentIndex < questions.length - 1 ? "Next" : "Finish"}
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-xl border border-border shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-black tracking-widest uppercase text-muted-foreground">
                    Score: {score} / {answeredCount}
                  </span>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
