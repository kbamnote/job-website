import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import {
  RefreshCcw,
  Clock,
  ArrowLeft,
  CheckCircle,
  XCircle,
  HelpCircle,
  AlertCircle,
} from "lucide-react";

const Progress = ({ value, className = "" }) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div
        className="bg-teal-500 h-full rounded-full transition-all duration-300"
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
};

const QuestionComponent = () => {
  const navigate = useNavigate();
  const { category, subcategory } = useParams();
  const QuestionApi = "https://jobquick.onrender.com/mocktest/generate";
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, [category, subcategory]);

  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsTimerRunning(false);
            handleTestComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const startTest = () => {
    setShowInstructions(false);
    setIsTimerRunning(true);
    setStartTime(new Date());
  };

  const handleGoBack = () => {
    navigate("/mock");
  };

  const handleTestComplete = () => {
    setEndTime(new Date());
    calculateScore();
  };

  const getTimeTaken = () => {
    if (!startTime || !endTime) return "00:00";
    const timeDiff = Math.floor((endTime - startTime) / 1000);
    return formatTime(timeDiff);
  };

  const resetQuiz = async () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setScore(null);
    setShowResults(false);
    setTimeLeft(120);
    setIsTimerRunning(false);
    setIsLoading(true);
    setShowInstructions(true);
    setStartTime(null);
    setEndTime(null);
    await fetchQuestions();
  };

  const fetchQuestions = async () => {
    try {
      const token = Cookies.get("JwtToken");
      const response = await fetch(QuestionApi, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category, subcategory }),
      });
      const data = await response.json();

      if (data.success && Array.isArray(data.questions)) {
        processQuestionsData(data.questions);
        setIsLoading(false);
      } else {
        setError("Invalid data format received from server");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError("Failed to fetch questions");
    }
  };

  const processQuestionsData = (rawQuestions) => {
    try {
      const processed = [];
      let currentQuestion = null;
      let options = [];

      rawQuestions.forEach((item) => {
        if (item.startsWith("**")) return;
        if (item.startsWith("Q:")) {
          if (currentQuestion && options.length > 0) {
            processed.push(currentQuestion);
          }
          currentQuestion = {
            question: item.substring(2).trim(),
            options: [],
            correctAnswer: "",
          };
          options = [];
        } else if (item.match(/^[A-D]\)/)) {
          const letter = item[0].toLowerCase();
          const text = item.substring(2).trim();
          options.push({ letter, text });
          if (currentQuestion) {
            currentQuestion.options = options;
          }
        } else if (item.startsWith("Correct:")) {
          const correctAnswer = item.split(":")[1].trim().toLowerCase();
          if (currentQuestion) {
            currentQuestion.correctAnswer = correctAnswer;
          }
        }
      });

      if (currentQuestion && options.length > 0) {
        processed.push(currentQuestion);
      }

      setQuestions(processed);
    } catch (error) {
      console.error("Error processing questions:", error);
      setError("Error processing questions data");
    }
  };

  const handleAnswerSelection = (answer) => {
    setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    const percentage = (correctAnswers / questions.length) * 100;
    setScore(percentage.toFixed(2));
    setShowResults(true);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl">
          <div className="flex items-center justify-center text-red-500 gap-2">
            <XCircle size={24} />
            <p className="text-lg font-medium">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl">
          <div className="text-center space-y-4">
            <AlertCircle className="mx-auto text-teal-500" size={48} />
            <h2 className="text-2xl font-bold text-gray-800">Loading Questions</h2>
            <p className="text-gray-600">Please wait while we prepare your test...</p>
          </div>
        </div>
      </div>
    );
  }

  if (showInstructions) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 p-4">
          <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Test Instructions</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Time Limit</h3>
                <p>You have {formatTime(timeLeft)} to complete this test.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Test Format</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Total questions: {questions.length}</li>
                  <li>Each question has 4 options</li>
                  <li>You can navigate between questions</li>
                  <li>You can review and change your answers before submission</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Important Notes</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>The test will auto-submit when the time expires</li>
                  <li>Ensure you have a stable internet connection</li>
                  <li>Do not refresh the page during the test</li>
                </ul>
              </div>
            </div>
            <button
              onClick={startTest}
              className="w-full py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium"
            >
              Start Test
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (showResults) {
    return (
      <>
      <Header />
      <div className="min-h-screen bg-gray-50 p-2 sm:p-4">
        <div className="bg-white shadow-xl rounded-lg p-4 sm:p-8 w-full max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <button
              onClick={handleGoBack}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm sm:text-base w-full sm:w-auto"
            >
              <ArrowLeft size={16} />
              Go Back
            </button>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">Test Results</h2>
            <button
              onClick={resetQuiz}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm sm:text-base w-full sm:w-auto"
            >
              <RefreshCcw size={16} />
              Reset Quiz
            </button>
          </div>

          {/* Score Section */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="text-center mb-4">
              <div className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                {score}%
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                Time Taken: {getTimeTaken()}
              </div>
            </div>
            <Progress value={parseFloat(score)} />
          </div>

          {/* Questions Section */}
          <div className="space-y-4 sm:space-y-6">
            {questions.map((question, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 sm:p-6 transition-all"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="mt-1 flex-shrink-0">
                    {userAnswers[index] === question.correctAnswer ? (
                      <CheckCircle className="text-green-500" size={20} />
                    ) : (
                      <XCircle className="text-red-500" size={20} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">
                      {index + 1}. {question.question}
                    </p>
                    <div className="space-y-2 sm:space-y-3">
                      {question.options.map((option) => (
                        <div
                          key={option.letter}
                          className={`p-2 sm:p-3 rounded-lg transition-colors text-sm sm:text-base ${
                            option.letter === question.correctAnswer
                              ? "bg-green-100 border-2 border-green-500"
                              : option.letter === userAnswers[index]
                              ? "bg-red-100 border-2 border-red-500"
                              : "bg-white border-2 border-gray-200"
                          }`}
                        >
                          {option.letter.toUpperCase()}) {option.text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4">
      <div className="bg-white shadow-xl rounded-lg p-4 sm:p-8 w-full max-w-3xl mx-auto">
        {currentQuestion && (
          <div>
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-8 mb-6 sm:mb-8">
              {/* Question Progress */}
              <div className="w-full sm:w-auto space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Question {currentQuestionIndex + 1}
                </h2>
                <Progress
                  value={((currentQuestionIndex + 1) / questions.length) * 100}
                  className="w-full sm:w-32"
                />
              </div>

              {/* Timer */}
              <div className="flex items-center gap-4 order-3 sm:order-2">
                <div
                  className={`flex items-center gap-2 text-base sm:text-lg font-medium ${
                    timeLeft < 10 ? "text-red-500" : "text-gray-600"
                  }`}
                >
                  <Clock size={20} className="sm:w-6 sm:h-6" />
                  {formatTime(timeLeft)}
                </div>
              </div>

              {/* Answer Status */}
              <div className="flex items-center gap-2 order-2 sm:order-3">
                {userAnswers[currentQuestionIndex] ? (
                  <CheckCircle size={18} className="text-green-500" />
                ) : (
                  <HelpCircle size={18} className="text-gray-400" />
                )}
                <span className="text-sm sm:text-base text-gray-600">
                  {userAnswers[currentQuestionIndex]
                    ? "Answered"
                    : "Not answered"}
                </span>
              </div>
            </div>

            {/* Question Content */}
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <p className="text-base sm:text-lg font-medium text-gray-800">
                {currentQuestion.question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 sm:space-y-4">
              {currentQuestion.options.map((option) => (
                <label
                  key={option.letter}
                  className={`block p-3 sm:p-4 rounded-lg cursor-pointer transition-all ${
                    userAnswers[currentQuestionIndex] === option.letter
                      ? "bg-teal-50 border-2 border-teal-500"
                      : "bg-white border-2 border-gray-200 hover:border-teal-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      value={option.letter}
                      checked={userAnswers[currentQuestionIndex] === option.letter}
                      onChange={() => handleAnswerSelection(option.letter)}
                      className="w-4 h-4 text-teal-500"
                    />
                    <span className="text-sm sm:text-base text-gray-800">
                      {option.letter.toUpperCase()}) {option.text}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className={`w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
                  currentQuestionIndex === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-teal-500 hover:bg-teal-600 text-white"
                }`}
              >
                Previous
              </button>
              {currentQuestionIndex === questions.length - 1 ? (
                <button
                  onClick={handleTestComplete}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base"
                >
                  Submit Test
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm sm:text-base"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer />
  </>
  );
};

export default QuestionComponent;