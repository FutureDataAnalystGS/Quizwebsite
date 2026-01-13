import { useState } from 'react';
import { QuizQuestion } from './QuizQuestion';
import { RotateCcw } from 'lucide-react';
import type { Question } from '../App';

interface QuizProps {
  questions: Question[];
  onRestart: () => void;
  username: string;
}

export function Quiz({ questions, onRestart, username }: QuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Map<number, Set<number>>>(new Map());
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerToggle = (questionIndex: number, answerIndex: number) => {
    if (submitted) return;

    const newSelectedAnswers = new Map(selectedAnswers);
    const currentAnswers = newSelectedAnswers.get(questionIndex) || new Set<number>();
    
    if (currentAnswers.has(answerIndex)) {
      currentAnswers.delete(answerIndex);
    } else {
      currentAnswers.add(answerIndex);
    }
    
    newSelectedAnswers.set(questionIndex, currentAnswers);
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleSaveQuestion = (questionIndex: number) => {
    const question = questions[questionIndex];
    const savedQuestions = JSON.parse(localStorage.getItem(`savedQuestions_${username}`) || '[]');
    
    // Check if question already exists
    const exists = savedQuestions.some((q: Question) => 
      q.text === question.text && q.examDate === question.examDate
    );
    
    if (!exists) {
      savedQuestions.push({
        ...question,
        savedAt: new Date().toISOString()
      });
      localStorage.setItem(`savedQuestions_${username}`, JSON.stringify(savedQuestions));
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;

    questions.forEach((question, questionIndex) => {
      const selected = selectedAnswers.get(questionIndex) || new Set<number>();
      let allCorrect = true;
      let hasIncorrect = false;

      question.correctAnswers.forEach((isCorrect, answerIndex) => {
        if (isCorrect && !selected.has(answerIndex)) {
          allCorrect = false;
        }
        if (!isCorrect && selected.has(answerIndex)) {
          hasIncorrect = true;
        }
      });

      if (allCorrect && !hasIncorrect) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setSubmitted(true);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      {submitted && (
        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4 z-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="text-2xl font-bold text-indigo-600">
              Twój wynik: {score} / {questions.length}
              <span className="text-lg text-gray-600 ml-3">
                ({((score / questions.length) * 100).toFixed(0)}%)
              </span>
            </div>
            <button
              onClick={onRestart}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Nowy quiz
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {questions.map((question, questionIndex) => (
          <QuizQuestion
            key={questionIndex}
            question={question}
            questionNumber={questionIndex + 1}
            selectedAnswers={selectedAnswers.get(questionIndex) || new Set()}
            onAnswerToggle={(answerIndex) => handleAnswerToggle(questionIndex, answerIndex)}
            onSaveQuestion={() => handleSaveQuestion(questionIndex)}
            submitted={submitted}
          />
        ))}
      </div>

      {!submitted && (
        <div className="bg-white rounded-xl shadow-lg p-6 sticky bottom-4">
          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
          >
            Zakończ quiz
          </button>
        </div>
      )}
    </div>
  );
}
