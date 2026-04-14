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
  Moon,
  Sun,
  Brain,
  Calendar,
  Clock,
  Filter,
  Check,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { SRSData, INITIAL_SRS, calculateSM2 } from "@/lib/srs";

type View = "dashboard" | "quiz" | "contact" | "philosophy" | "review";

type YearFilter = "all" | "15" | "30";

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

const TOPICS_BY_CATEGORY: Record<Category, string[]> = {
  polity: ["Constitutional Framework", "Fundamental Rights & Duties", "Parliament & State Legislature", "Judiciary", "Local Government", "Constitutional Bodies"],
  economy: ["National Income", "Fiscal Policy & Taxation", "Monetary Policy & Banking", "International Trade", "Poverty & Unemployment", "Agriculture"],
  ancient: ["Indus Valley", "Vedic Period", "Buddhism & Jainism", "Mauryan Empire", "Gupta Empire", "Ancient South India"],
  medieval: ["Delhi Sultanate", "Mughal Empire", "Marathas", "Vijayanagara Empire", "Bhakti & Sufi Movements"],
  modern: ["Early European Settlements", "1857 Revolt", "Indian Freedom Struggle", "Socio-Religious Reforms", "Post-Independence"],
  art: ["Indian Architecture", "Sculptures", "Paintings", "Dance & Music", "Literature", "Festivals"],
  geography: ["Physical Geography", "Indian Geography", "World Geography", "Climate", "Resources"],
  environment: ["Ecology", "Biodiversity", "Climate Change", "Environmental Laws", "Conservation"],
  scienceTech: ["Space Technology", "Biotechnology", "IT & Electronics", "Defense", "General Science"],
};

const assignTopic = (q: Question, category: Category): string => {
  if (q.topic) return q.topic;
  
  const text = (q.text + " " + q.explanation).toLowerCase();
  const topics = TOPICS_BY_CATEGORY[category];
  
  // Simple keyword matching for auto-tagging
  if (category === "polity") {
    if (text.includes("constitution") || text.includes("amendment") || text.includes("preamble")) return "Constitutional Framework";
    if (text.includes("fundamental right") || text.includes("fundamental duty") || text.includes("dpsp")) return "Fundamental Rights & Duties";
    if (text.includes("parliament") || text.includes("lok sabha") || text.includes("rajya sabha") || text.includes("legislature")) return "Parliament & State Legislature";
    if (text.includes("court") || text.includes("judge") || text.includes("judicial")) return "Judiciary";
    if (text.includes("panchayat") || text.includes("municipality")) return "Local Government";
    return "Constitutional Bodies";
  }
  
  if (category === "economy") {
    if (text.includes("budget") || text.includes("tax") || text.includes("fiscal")) return "Fiscal Policy & Taxation";
    if (text.includes("bank") || text.includes("rbi") || text.includes("monetary") || text.includes("inflation")) return "Monetary Policy & Banking";
    if (text.includes("gdp") || text.includes("national income")) return "National Income";
    if (text.includes("trade") || text.includes("wto") || text.includes("imf") || text.includes("export")) return "International Trade";
    if (text.includes("poverty") || text.includes("unemployment") || text.includes("employment")) return "Poverty & Unemployment";
    return "Agriculture";
  }

  if (category === "modern") {
    if (text.includes("gandhi") || text.includes("congress") || text.includes("movement") || text.includes("freedom")) return "Indian Freedom Struggle";
    if (text.includes("1857") || text.includes("revolt") || text.includes("mutiny")) return "1857 Revolt";
    if (text.includes("reform") || text.includes("brahmo") || text.includes("arya")) return "Socio-Religious Reforms";
    return "Early European Settlements";
  }

  // Fallback: cycle through topics based on ID to ensure every topic has questions
  return topics[q.id % topics.length];
};

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
  const [yearFilter, setYearFilter] = useState<YearFilter>("all");
  const [userAnswers, setUserAnswers] = useState<Record<string, Record<number, number | null>>>(() => {
    const saved = localStorage.getItem("upsc_user_answers_v2");
    return saved ? JSON.parse(saved) : {};
  });
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showNavigator, setShowNavigator] = useState(false);
  const [showWrongOnly, setShowWrongOnly] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("upsc_dark_mode");
    return saved ? JSON.parse(saved) : true; // Default to true
  });
  const [srsRecords, setSrsRecords] = useState<Record<number, SRSData>>(() => {
    const saved = localStorage.getItem("upsc_srs_records");
    return saved ? JSON.parse(saved) : {};
  });

  const allQuestions = useMemo(() => [
    ...polityQuestions.map(q => ({ ...q, category: "polity" })),
    ...economyQuestions.map(q => ({ ...q, category: "economy" })),
    ...ancientHistoryQuestions.map(q => ({ ...q, category: "ancient" })),
    ...medievalHistoryQuestions.map(q => ({ ...q, category: "medieval" })),
    ...artCultureQuestions.map(q => ({ ...q, category: "art" })),
    ...modernHistoryQuestions.map(q => ({ ...q, category: "modern" })),
    ...geographyQuestions.map(q => ({ ...q, category: "geography" })),
    ...environmentQuestions.map(q => ({ ...q, category: "environment" })),
    ...scienceTechQuestions.map(q => ({ ...q, category: "scienceTech" })),
  ], []);

  const dueQuestions = useMemo(() => {
    const now = new Date();
    return allQuestions.filter(q => {
      const record = srsRecords[q.id];
      return record && new Date(record.nextReview) <= now;
    });
  }, [allQuestions, srsRecords]);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("upsc_dark_mode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Save answers to localStorage
  useEffect(() => {
    localStorage.setItem("upsc_user_answers_v2", JSON.stringify(userAnswers));
  }, [userAnswers]);

  // Save SRS records
  useEffect(() => {
    localStorage.setItem("upsc_srs_records", JSON.stringify(srsRecords));
  }, [srsRecords]);

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
  const rawQuestions = currentCategoryConfig?.questions || [];
  
  const questions = useMemo(() => {
    if (view === "review") return dueQuestions;
    const currentYear = 2026;
    let filtered = rawQuestions.map(q => ({ ...q, topic: assignTopic(q, category!) }));
    
    if (yearFilter === "15") {
      filtered = filtered.filter(q => q.year >= currentYear - 15);
    } else if (yearFilter === "30") {
      filtered = filtered.filter(q => q.year >= currentYear - 30);
    }

    if (showWrongOnly && category) {
      const catAnswers = userAnswers[category] || {};
      filtered = filtered.filter(q => 
        catAnswers[q.id] !== undefined && catAnswers[q.id] !== q.correctAnswer
      );
    }

    if (selectedTopics.length > 0) {
      filtered = filtered.filter(q => selectedTopics.includes(q.topic!));
    }

    return filtered;
  }, [rawQuestions, yearFilter, view, dueQuestions, showWrongOnly, category, userAnswers, selectedTopics]);

  const currentQuestion = questions[currentIndex];
  
  const currentCategoryAnswers = view === "review" ? userAnswers["review"] || {} : (category ? userAnswers[category] || {} : {});
  
  // Clamp currentIndex if questions list changes (e.g. in Wrong Only mode)
  useEffect(() => {
    if (questions.length > 0 && currentIndex >= questions.length) {
      setCurrentIndex(questions.length - 1);
    }
  }, [questions.length, currentIndex]);

  // Count answered questions in the CURRENT filtered set
  const answeredCount = useMemo(() => {
    return questions.filter(q => currentCategoryAnswers[q.id] !== undefined).length;
  }, [questions, currentCategoryAnswers]);

  const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  // Calculate score for current category based on CURRENT filtered set
  useEffect(() => {
    if (category && questions.length > 0) {
      let newScore = 0;
      questions.forEach((q) => {
        if (currentCategoryAnswers[q.id] === q.correctAnswer) {
          newScore++;
        }
      });
      setScore(newScore);
    }
  }, [category, questions, currentCategoryAnswers]);

  const handleOptionSelect = (val: string) => {
    if ((!category && view !== "review") || !currentQuestion) return;
    const optionIndex = parseInt(val);

    const catKey = view === "review" ? "review" : category!;

    setUserAnswers((prev) => ({
      ...prev,
      [catKey]: {
        ...(prev[catKey] || {}),
        [currentQuestion.id]: optionIndex,
      },
    }));

    // Automatically update SRS if they get it wrong
    if (optionIndex !== currentQuestion.correctAnswer) {
      updateSRS(currentQuestion.id, 0); // Quality 0 = Again
    } else {
      // If they get it right, we could update it with a default quality, 
      // but maybe better to let them rate it.
      // For now, let's auto-update with quality 4 (Good) if it's already in SRS
      if (srsRecords[currentQuestion.id]) {
        updateSRS(currentQuestion.id, 4);
      }
    }
  };

  const updateSRS = (questionId: number, quality: number) => {
    const prev = srsRecords[questionId] || INITIAL_SRS;
    const next = calculateSM2(quality, prev.repetition, prev.interval, prev.efactor);
    setSrsRecords(records => ({
      ...records,
      [questionId]: next
    }));

    // If Hard (quality < 3), put in Wrong Only category
    if (quality < 3) {
      const q = allQuestions.find(q => q.id === questionId);
      const cat = q?.category as Category || category;
      if (cat) {
        setUserAnswers(prev => ({
          ...prev,
          [cat]: {
            ...(prev[cat] || {}),
            [questionId]: -1 // Mark as wrong to show in Wrong Only
          }
        }));
      }
    }
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
      setUserAnswers((prev) => {
        const newAnswers = { ...prev };
        const categoryAnswers = { ...newAnswers[category] };
        // Remove answers for the CURRENT filtered set
        questions.forEach(q => {
          delete categoryAnswers[q.id];
        });
        newAnswers[category] = categoryAnswers;
        return newAnswers;
      });
    }
    setScore(0);
    setIsFinished(false);
  };

  const handleCategorySelect = (cat: Category) => {
    setCategory(cat);
    setCurrentIndex(0);
    setYearFilter("all");
    setShowWrongOnly(false);
    setSelectedTopics([]);
    setIsFinished(false);
    setView("quiz");
  };

  const handleBackToMenu = () => {
    setCategory(null);
    setCurrentIndex(0);
    setYearFilter("all");
    setShowWrongOnly(false);
    setSelectedTopics([]);
    setIsFinished(false);
    setView("dashboard");
    // Clear review answers so it's fresh for next time
    setUserAnswers(prev => {
      const next = { ...prev };
      delete next["review"];
      return next;
    });
  };

  const getProgressForCategory = (catId: Category) => {
    const catConfig = categories.find(c => c.id === catId);
    if (!catConfig) return 0;
    const answers = userAnswers[catId] || {};
    // Count how many of THIS category's questions are answered
    const answered = catConfig.questions.filter(q => answers[q.id] !== undefined).length;
    return Math.round((answered / catConfig.questions.length) * 100);
  };

  if (view === "contact") {
    return (
      <>
        <div className="fixed top-4 right-4 z-50">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-10 h-10 shadow-md bg-background/80 backdrop-blur-sm"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
        <ContactPage onBack={() => setView("dashboard")} />
      </>
    );
  }

  if (view === "philosophy") {
    return (
      <>
        <div className="fixed top-4 right-4 z-50">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-10 h-10 shadow-md bg-background/80 backdrop-blur-sm"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
        <PhilosophyPage onBack={() => setView("dashboard")} />
      </>
    );
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
            <div className="flex justify-center md:justify-end items-center gap-2 mb-4 md:mb-8">
              <Button
                variant="outline"
                size="icon"
                className="rounded-xl w-9 h-9 shadow-sm"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
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
              {dueQuestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="md:col-span-2 lg:col-span-3"
                >
                  <Card 
                    className="group cursor-pointer transition-all duration-300 hover:shadow-2xl border-2 border-primary/50 bg-primary/5 relative overflow-hidden flex flex-col md:flex-row items-center p-6 gap-6"
                    onClick={() => {
                      setView("review");
                      setCategory(null);
                      setCurrentIndex(0);
                      setIsFinished(false);
                    }}
                  >
                    <div className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center shadow-lg shrink-0">
                      <Brain className="w-10 h-10 text-primary" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h2 className="text-2xl font-heading font-black mb-1">Daily Review</h2>
                      <p className="text-muted-foreground font-medium mb-4 md:mb-0">
                        You have <span className="text-primary font-bold">{dueQuestions.length}</span> questions due for review based on Spaced Repetition.
                      </p>
                    </div>
                    <Button size="lg" className="rounded-2xl font-black px-8 h-14 shadow-xl">
                      Start Review <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Card>
                </motion.div>
              )}
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
    const accentColor = view === "review" ? "primary" : (currentCategoryConfig?.color || "primary");
    const title = view === "review" ? "Review Completed!" : "Quiz Completed!";
    const subtitle = view === "review" ? "Daily Review Session" : `You've finished the ${currentCategoryConfig?.title}`;

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg"
        >
          <Card className="border-2 shadow-2xl rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-md">
            <div className={cn("h-3 w-full", `bg-${accentColor}-500`)} />
            <CardHeader className="text-center pb-2 pt-10">
              <motion.div 
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                className={cn("mx-auto w-24 h-24 rounded-3xl flex items-center justify-center mb-6 shadow-lg", `bg-${accentColor}-500/10 text-${accentColor}-600`)}
              >
                <Trophy className="w-12 h-12" />
              </motion.div>
              <CardTitle className="text-4xl font-heading font-black tracking-tight">{title}</CardTitle>
              <CardDescription className="text-xl font-medium mt-2">
                {subtitle}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-8 p-10">
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground uppercase tracking-[0.3em] font-black">Your Final Score</p>
                <div className={cn("text-8xl font-heading font-black", `text-${accentColor}-600`)}>
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
                  <p className="text-2xl font-black text-green-700">{answeredCount > 0 ? Math.round((score / answeredCount) * 100) : 0}%</p>
                </div>
                <div className="p-4 bg-blue-500/5 rounded-2xl border-2 border-blue-500/10">
                  <p className="text-xs font-black uppercase tracking-widest text-blue-600 mb-1">Answered</p>
                  <p className="text-2xl font-black text-blue-700">{answeredCount}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 p-10 pt-0">
              <Button onClick={handleRestart} className={cn("w-full h-16 text-xl font-black rounded-2xl shadow-lg transition-all hover:scale-[1.02]", `bg-${accentColor}-500 hover:bg-${accentColor}-600`)}>
                <RotateCcw className="mr-3 w-6 h-6" />
                Retake Session
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
        <div className="max-w-5xl mx-auto px-3 py-1.5 md:py-3 flex items-center justify-between gap-2 md:gap-4">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={handleBackToMenu}>
            <h1 className="font-heading font-black text-base md:text-xl tracking-tight">
              Crack UPSC
            </h1>
          </div>
          
          <div className="flex-1 max-w-md flex items-center gap-2 md:gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl w-8 h-8 md:w-9 md:h-9 shadow-sm"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <Moon className="w-3.5 h-3.5 md:w-4 md:h-4" />}
            </Button>
            <div className="flex-1 hidden md:block">
              <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-1.5 shadow-inner" />
            </div>
            <div className="bg-muted px-2 md:px-3 py-1 rounded-lg border border-border flex items-center gap-1 md:gap-1.5 shadow-sm">
              <span className="text-[10px] md:text-xs font-black font-mono">
                {currentIndex + 1} <span className="text-muted-foreground font-medium">/ {questions.length}</span>
              </span>
            </div>
          </div>

          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-xl shadow-sm h-8 w-8 md:h-9 md:w-9"
            onClick={() => setShowNavigator(!showNavigator)}
          >
            <LayoutDashboard className="w-3.5 h-3.5 md:w-4 md:h-4" />
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
                {questions.map((q, idx) => {
                  const isAnswered = currentCategoryAnswers[q.id] !== undefined;
                  const isCurrent = currentIndex === idx;
                  const isCorrect = isAnswered && currentCategoryAnswers[q.id] === q.correctAnswer;
                  
                  return (
                    <button
                      key={q.id}
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

        <div className="flex justify-center mb-4 md:mb-6 overflow-x-auto pb-2 -mx-3 px-3 scrollbar-hide">
          <div className="bg-muted p-1 rounded-xl flex gap-1 border border-border min-w-max">
            <Popover>
              <PopoverTrigger
                className={cn(
                  buttonVariants({
                    variant: selectedTopics.length > 0 ? "default" : "ghost",
                    size: "sm",
                  }),
                  "rounded-lg h-8 text-[10px] md:text-xs font-bold gap-1 md:gap-1.5"
                )}
              >
                <Filter className="w-3 h-3" />
                <span className="hidden xs:inline">Topics</span> {selectedTopics.length > 0 && `(${selectedTopics.length})`}
              </PopoverTrigger>
              <PopoverContent className="w-64 p-3 rounded-2xl shadow-2xl border-2 border-primary/10" align="center">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-bold text-sm">Select Topics</h4>
                    {selectedTopics.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 text-[10px] font-black uppercase text-primary"
                        onClick={() => {
                          setSelectedTopics([]);
                          setCurrentIndex(0);
                        }}
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                  <div className="space-y-1 max-h-[250px] overflow-y-auto pr-1">
                    {category && TOPICS_BY_CATEGORY[category].map((topic) => {
                      const isSelected = selectedTopics.includes(topic);
                      return (
                        <div
                          key={topic}
                          className={cn(
                            "flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors",
                            isSelected ? "bg-primary/10 text-primary" : "hover:bg-muted"
                          )}
                          onClick={() => {
                            setSelectedTopics(prev => 
                              isSelected ? prev.filter(t => t !== topic) : [...prev, topic]
                            );
                            setCurrentIndex(0);
                          }}
                        >
                          <div className={cn(
                            "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                            isSelected ? "bg-primary border-primary" : "border-muted-foreground/30"
                          )}>
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className="text-xs font-medium">{topic}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Separator orientation="vertical" className="h-4 my-auto mx-0.5 bg-border" />
            <Button
              variant={yearFilter === "all" ? "default" : "ghost"}
              size="sm"
              className="rounded-lg h-8 text-[10px] md:text-xs font-bold px-2 md:px-3"
              onClick={() => {
                setYearFilter("all");
                setCurrentIndex(0);
              }}
            >
              All Time
            </Button>
            <Button
              variant={yearFilter === "15" ? "default" : "ghost"}
              size="sm"
              className="rounded-lg h-8 text-[10px] md:text-xs font-bold px-2 md:px-3"
              onClick={() => {
                setYearFilter("15");
                setCurrentIndex(0);
              }}
            >
              15Y
            </Button>
            <Button
              variant={yearFilter === "30" ? "default" : "ghost"}
              size="sm"
              className="rounded-lg h-8 text-[10px] md:text-xs font-bold px-2 md:px-3"
              onClick={() => {
                setYearFilter("30");
                setCurrentIndex(0);
              }}
            >
              30Y
            </Button>
            <Separator orientation="vertical" className="h-4 my-auto mx-0.5 bg-border" />
            <Button
              variant={showWrongOnly ? "destructive" : "ghost"}
              size="sm"
              className={cn(
                "rounded-lg h-8 text-[10px] md:text-xs font-bold gap-1 md:gap-1.5 px-2 md:px-3",
                showWrongOnly && "bg-red-500 hover:bg-red-600 text-white"
              )}
              onClick={() => {
                setShowWrongOnly(!showWrongOnly);
                setCurrentIndex(0);
              }}
            >
              <XCircle className="w-3 h-3" />
              <span className="hidden xs:inline">Wrong Only</span>
              <span className="xs:hidden">Wrong</span>
            </Button>
          </div>
        </div>

        {questions.length === 0 ? (
          <div className="text-center py-20 px-4">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">
              {showWrongOnly ? "No Wrong Questions Found!" : 
               selectedTopics.length > 0 ? "No Questions in Selected Topics" : 
               "No Recent Questions Found"}
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {showWrongOnly 
                ? "Great job! You've cleared all your mistakes in this subject." 
                : selectedTopics.length > 0 
                ? "Try selecting different topics or years to see more questions."
                : "You Are Better Off Focusing On Other Subjects With Higher Return On Investment"}
            </p>
            <Button 
              variant="outline" 
              className="mt-4 rounded-xl font-bold" 
              onClick={() => {
                setYearFilter("all");
                setShowWrongOnly(false);
                setSelectedTopics([]);
              }}
            >
              Reset All Filters
            </Button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex + yearFilter}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-2 shadow-xl rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm">
                <CardHeader className="space-y-3 md:space-y-4 p-4 md:p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "p-1 rounded-lg md:p-1.5",
                        `bg-${currentCategoryConfig?.color}-500/10 text-${currentCategoryConfig?.color}-600`
                      )}>
                        <HelpCircle className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <div>
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground block">Question</span>
                        <span className="text-sm md:text-lg font-heading font-black">{currentIndex + 1} of {questions.length}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 md:gap-2">
                      <div className="bg-muted px-2 md:px-3 py-0.5 md:py-1 rounded-full border border-border shadow-sm">
                        <span className="text-[9px] md:text-[10px] font-black font-mono text-muted-foreground tracking-wider">UPSC {currentQuestion.year}</span>
                      </div>
                      {currentQuestion.topic && (
                        <Badge variant="secondary" className="text-[8px] md:text-[9px] font-black uppercase tracking-wider py-0 px-1.5 md:py-0.5 md:px-2 rounded-lg bg-primary/5 text-primary border-primary/10">
                          {currentQuestion.topic}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-base md:text-2xl font-heading font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100">
                    {currentQuestion.text}
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-4 md:px-8 pb-4 md:pb-6 space-y-4 md:space-y-6">
                  <RadioGroup
                    value={currentCategoryAnswers[currentQuestion.id]?.toString() || ""}
                    onValueChange={handleOptionSelect}
                    className="grid gap-2 md:gap-3"
                  >
                    {currentQuestion.options.map((option, index) => {
                      const isCorrect = index === currentQuestion.correctAnswer;
                      const isSelected = currentCategoryAnswers[currentQuestion.id] === index;
                      const hasAnswered = currentCategoryAnswers[currentQuestion.id] !== undefined;
                      
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
                              "flex items-start gap-2 md:gap-3 p-2.5 md:p-3.5 rounded-xl border-2 transition-all duration-200 cursor-pointer relative z-10",
                              variantClass,
                              !hasAnswered && "hover:-translate-y-0.5 active:scale-[0.99]"
                            )}
                          >
                            <span className={cn(
                              "flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-lg border-2 text-[10px] md:text-xs font-black shrink-0 mt-0.5 transition-colors",
                              isSelected ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/20 text-muted-foreground"
                            )}>
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className="text-sm md:text-lg font-medium leading-relaxed pt-0.5">{option}</span>
                            {hasAnswered && isCorrect && (
                              <div className="ml-auto bg-green-500 text-white p-0.5 rounded-full shadow-lg">
                                <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4" />
                              </div>
                            )}
                            {hasAnswered && isSelected && !isCorrect && (
                              <div className="ml-auto bg-red-500 text-white p-0.5 rounded-full shadow-lg">
                                <XCircle className="w-3 h-3 md:w-4 md:h-4" />
                              </div>
                            )}
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>

                  {currentCategoryAnswers[currentQuestion.id] !== undefined && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 md:mt-6 space-y-3 md:space-y-4"
                    >
                      <Separator className="h-0.5 bg-slate-200 dark:bg-slate-800" />
                      <div className="bg-white dark:bg-slate-900 p-4 md:p-5 rounded-2xl border border-primary/10 shadow-inner">
                        <div className="flex items-center gap-2 text-primary mb-1 md:mb-2">
                          <div className="bg-primary/10 p-1 md:p-1.5 rounded-lg">
                            <AlertCircle className="w-4 h-4 md:w-5 md:h-5" />
                          </div>
                          <h3 className="font-heading font-black text-base md:text-lg tracking-tight">Explanation</h3>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                          {currentQuestion.explanation}
                        </p>

                        <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border">
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 md:mb-3">Active Recall and Space Repetition - Rate Difficulty</p>
                          <div className="grid grid-cols-2 gap-1.5 md:gap-2">
                            {[
                              { label: "Hard", q: 0, color: "orange" },
                              { label: "Easy", q: 5, color: "blue" },
                            ].map((btn) => (
                              <Button
                                key={btn.label}
                                variant="outline"
                                size="sm"
                                onClick={() => updateSRS(currentQuestion.id, btn.q)}
                                className={cn(
                                  "h-8 md:h-10 text-[9px] md:text-[10px] font-black uppercase tracking-tighter rounded-lg md:rounded-xl border-2 hover:border-primary/50",
                                  btn.q === 0 ? "hover:bg-orange-500/10 hover:border-orange-500" : "hover:bg-blue-500/10 hover:border-blue-500"
                                )}
                              >
                                {btn.label}
                              </Button>
                            ))}
                          </div>
                          <div className="mt-2 md:mt-3 flex flex-col gap-1 text-[9px] md:text-[10px] font-bold text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Info className="w-2.5 h-2.5 md:w-3 md:h-3" />
                              Questions rated Hard by users go to Wrong Only tab for Review and Revision
                            </div>
                          </div>
                        </div>
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
        )}
      </main>
      <Footer />
    </div>
  );
}
