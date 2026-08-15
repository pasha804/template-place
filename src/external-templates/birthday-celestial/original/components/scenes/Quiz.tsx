import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Heart, X } from "lucide-react";
import { SceneShell } from "../SceneShell";
import { GlowButton } from "../GlowButton";
import { Confetti } from "../Confetti";

export interface QuizQuestion {
  question: string;
  options: { text: string; correct: boolean }[];
}

const DEFAULT_QUESTIONS: QuizQuestion[] = [
  {
    question: "Who is the person I can never stay mad at for long?",
    options: [
      { text: "My friends", correct: false },
      { text: "My family", correct: false },
      { text: "You ❤️", correct: true },
      { text: "Nobody", correct: false },
    ],
  },
  {
    question: "What is the one thing I want most from you?",
    options: [
      { text: "Gifts", correct: false },
      { text: "Money", correct: false },
      { text: "Your love and loyalty", correct: true },
      { text: "Nothing", correct: false },
    ],
  },
  {
    question: "Who makes my bad days feel a little better?",
    options: [
      { text: "Music", correct: false },
      { text: "Sleep", correct: false },
      { text: "You", correct: true },
      { text: "Gaming", correct: false },
    ],
  },
  {
    question: "If I could make one birthday wish for you, what would it be?",
    options: [
      { text: "More money", correct: false },
      { text: "More followers", correct: false },
      { text: "A long, happy life filled with love and success", correct: true },
      { text: "More gifts", correct: false },
    ],
  },
  {
    question: "Who do I want to keep making beautiful memories with?",
    options: [
      { text: "My friends", correct: false },
      { text: "Nobody", correct: false },
      { text: "You", correct: true },
      { text: "Everyone", correct: false },
    ],
  },
];

interface QuizProps {
  onNext: () => void;
  quizTitle?: string;
  quizSubtitle?: string;
  questions?: QuizQuestion[];
  quizGifUrl?: string;
}

export function Quiz({
  onNext,
  quizTitle = "How Well Do You Know Me?",
  quizSubtitle = "Answer these questions about us — Let's see how well you know my heart ❤️",
  questions = DEFAULT_QUESTIONS,
  quizGifUrl = "/templates/birthday-celestial/gifs/please.gif",
}: QuizProps) {
  const activeQuestions = questions && questions.length > 0 ? questions : DEFAULT_QUESTIONS;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showWrong, setShowWrong] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    if (completed) {
      setShowFireworks(true);
      const timer = setTimeout(() => {
        setShowFireworks(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [completed]);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    const isCorrect = activeQuestions[currentQuestion]?.options[index]?.correct;

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
      setTimeout(() => {
        if (currentQuestion < activeQuestions.length - 1) {
          setCurrentQuestion((prev) => prev + 1);
          setSelectedAnswer(null);
        } else {
          setCompleted(true);
        }
      }, 1000);
    } else {
      setShowWrong(true);
      setTimeout(() => {
        setShowWrong(false);
        setSelectedAnswer(null);
      }, 2000);
    }
  };

  if (completed) {
    return (
      <SceneShell
        title="Congratulations! 🎉"
        subtitle={
          <>
            You got all the answers right!
            <br />
            You know me so well ❤️
          </>
        }
        footerSlot={
          <GlowButton onClick={onNext} icon={<ArrowRight className="h-4 w-4" />}>
            Continue the Journey
          </GlowButton>
        }
      >
        <Confetti active={showFireworks} />
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="text-8xl sm:text-9xl mb-6">🎊</div>
          <div className="glass rounded-3xl px-8 py-6 max-w-lg mx-auto">
            <Heart className="h-12 w-12 text-primary mx-auto mb-4 animate-glow-pulse" />
            <p className="script text-3xl text-primary text-glow mb-4">
              Perfect Score!
            </p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              You answered all {activeQuestions.length} questions correctly.
              <br />
              That's how well you know what matters to me! 💕
            </p>
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-8"
          >
            <img
              src={quizGifUrl}
              alt="Celebrate"
              className="w-36 h-36 sm:w-40 sm:h-40 mx-auto rounded-2xl object-cover glass p-2"
            />
          </motion.div>
        </motion.div>
      </SceneShell>
    );
  }

  const q = activeQuestions[currentQuestion];

  return (
    <SceneShell
      title={quizTitle}
      subtitle={quizSubtitle}
      footerSlot={
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Question {currentQuestion + 1} of {activeQuestions.length}
          </p>
          <div className="flex gap-2 justify-center mt-3">
            {activeQuestions.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i < currentQuestion
                    ? "w-6 bg-primary glow-ring"
                    : i === currentQuestion
                    ? "w-8 bg-accent"
                    : "w-2 bg-muted-foreground/40"
                }`}
              />
            ))}
          </div>
        </div>
      }
    >
      <div className="relative mx-auto w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {showWrong && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center glass-deep rounded-3xl p-8"
            >
              <X className="h-16 w-16 text-red-500 mb-4" />
              <img
                src={quizGifUrl}
                alt="Please try again"
                className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl object-cover mb-4 glass p-2"
              />
              <p className="script text-3xl text-red-400 text-glow mb-2">Oops! Try Again</p>
              <p className="text-muted-foreground text-sm">Think about what truly matters to me 💝</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-6 sm:p-8"
        >
          <div className="flex items-start gap-4 mb-8">
            <div className="glass rounded-full w-12 h-12 flex items-center justify-center shrink-0">
              <span className="script text-2xl text-primary text-glow">
                {currentQuestion + 1}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif text-foreground leading-relaxed pt-1.5">
              {q?.question}
            </h3>
          </div>

          <div className="space-y-3">
            {q?.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = option.correct;
              const showResult = isSelected;

              return (
                <motion.button
                  key={index}
                  onClick={() => selectedAnswer === null && handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={selectedAnswer === null ? { scale: 1.01, x: 4 } : {}}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 ${
                    showResult && isCorrect
                      ? "bg-green-500/20 border-2 border-green-500 glow-ring"
                      : showResult && !isCorrect
                      ? "bg-red-500/20 border-2 border-red-500"
                      : "glass hover:border-primary/50"
                  } ${selectedAnswer !== null ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-foreground font-medium">{option.text}</span>
                    {showResult && isCorrect && <Heart className="h-5 w-5 text-green-400" />}
                    {showResult && !isCorrect && <X className="h-5 w-5 text-red-400" />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </SceneShell>
  );
}
