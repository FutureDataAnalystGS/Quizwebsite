import { CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export function QuizResults({ score, totalQuestions, onRestart }: QuizResultsProps) {
  const percentage = (score / totalQuestions) * 100;
  
  const getMessage = () => {
    if (percentage === 100) return "Perfect Score! 🎉";
    if (percentage >= 80) return "Excellent Work! 🌟";
    if (percentage >= 60) return "Good Job! 👍";
    if (percentage >= 40) return "Not Bad! 💪";
    return "Keep Practicing! 📚";
  };

  const getIcon = () => {
    if (percentage >= 60) {
      return <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-6" />;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          {getIcon()}
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Quiz Complete!
          </h1>
          
          <p className="text-2xl text-gray-600 mb-8">
            {getMessage()}
          </p>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-8 mb-8">
            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
              {score}/{totalQuestions}
            </div>
            <p className="text-xl text-gray-700">
              {percentage.toFixed(0)}% Correct
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-green-50 rounded-lg p-4">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-lg font-semibold text-gray-700">Correct</p>
              <p className="text-2xl font-bold text-green-600">{score}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-lg font-semibold text-gray-700">Incorrect</p>
              <p className="text-2xl font-bold text-red-600">{totalQuestions - score}</p>
            </div>
          </div>

          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
