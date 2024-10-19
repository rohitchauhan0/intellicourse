"use client"
import Navbar from '@/app/_components/Navbar'
import { db } from '@/config/DB'
import { quizzModel } from '@/config/Schema'
import { apiconnector } from '@/config/apiconnector'
import { eq } from 'drizzle-orm'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import confetti from 'canvas-confetti' // Import the confetti library

const Page = ({ params }) => {
  const { quizzId } = params
  const [quizzData, setQuizzData] = useState(null) 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0) 
  const [selectedAnswers, setSelectedAnswers] = useState({}) 
  const [score, setScore] = useState(null)
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    const getQuizz = async () => {
      try {
        const response = await db.select().from(quizzModel).where(eq(quizzModel?.quizzId, quizzId))
        if (response.length > 0) {
          setQuizzData(response[0])
        } else {
          toast.error("Quiz not found")
          router.push("/quizz") // Redirect if the quiz doesn't exist
        }
      } catch (error) {
        console.log(error)
      }
    }
    getQuizz()
  }, [quizzId])

  const handleAnswerSelect = (questionIndex, option) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: option, 
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < quizzData?.question?.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1)
    }
  }

  const handleSubmit = async () => {
    const toastId = toast.loading("Please wait...")
    try {
      let correctCount = 0

      quizzData.question.forEach((q, index) => {
        if (selectedAnswers[index] === q.answer) {
          correctCount += 1
        }
      })

      // Check if the user has already played this quiz
      const responseData = await apiconnector("POST", "/api/already-played", {
        email: session?.user?.email, quizzId: quizzId
      })

      if (!responseData?.data?.success) {
        toast.error("You have already played this quiz")
        router.push("/quizz")
        toast.dismiss(toastId)
        return
      }

      // Update the quiz played count in the database
      const alreadyPlayed = await db.select().from(quizzModel).where(eq(quizzModel?.quizzId, quizzId))
      await db.update(quizzModel).set({ played: alreadyPlayed[0]?.played + 1 }).where(eq(quizzModel?.quizzId, quizzId))

      // Send the score to the server
      await apiconnector("POST", "/api/quizz", { email: session?.user?.email, quizzId, score: correctCount })

      // Set the final score
      setScore(correctCount)

      // Trigger confetti if the score is maximum
      if (correctCount === quizzData.question.length) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x: 0.5, y: 0.5 }
        });
      }

    } catch (error) {
      console.log(error)
    }
    toast.dismiss(toastId)
  }

  if (!quizzData) {
    return <div>Loading...</div> // Show loading state if quiz data is not loaded
  }

  const currentQuestion = quizzData.question[currentQuestionIndex]

  return (
    <>
      <div className='w-full py-10'>
        <div className='max-w-screen-xl mx-auto'>
          <div className='flex items-center justify-between px-10'>
            <h1 className='text-5xl font-semibold capitalize'>{quizzData?.topic}</h1>
            <div className='underline text-lg'>
              {currentQuestionIndex + 1} / {quizzData?.question?.length}
            </div>
          </div>

          {score === null ? (
            <div className='mt-14 px-10 border border-gray-300 rounded-xl py-14 shadow-lg shadow-gray-200'>
              <h2 className='text-2xl font-bold'>Question {currentQuestionIndex + 1}</h2>
              <p className='text-xl mt-5'>{currentQuestion?.question}</p>

              <div className='mt-5'>
                {/* Display the options */}
                {currentQuestion?.options.map((option, idx) => (
                  <div key={idx} className='mt-3'>
                    <input
                      type="radio"
                      id={`option-${currentQuestionIndex}-${idx}`} // Unique ID for each question and option
                      name={`question-${currentQuestionIndex}`} // Unique name for each question
                      value={option}
                      checked={selectedAnswers[currentQuestionIndex] === option} // Check if this option is selected
                      onChange={() => handleAnswerSelect(currentQuestionIndex, option)} // Handle selection
                    />
                    <label htmlFor={`option-${currentQuestionIndex}-${idx}`} className='ml-2 text-lg'>{option}</label>
                  </div>
                ))}
              </div>

              <div className='flex items-center justify-between px-10 mt-10'>
                <button
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className={`bg-gradient-to-r from-[#FFC371] to-[#FF5757] text-white px-10 py-2 rounded-lg ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Prev
                </button>

                {currentQuestionIndex === quizzData?.question?.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    className='bg-gradient-to-r from-blue-500 to-green-600 text-white px-10 py-2 rounded-lg'
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className={`bg-gradient-to-r from-[#FFC371] to-[#FF5757] text-white px-10 py-2 rounded-lg ${currentQuestionIndex === quizzData?.question?.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className='mt-10 px-10 text-center'>
              <h2 className='text-4xl font-bold'>Quiz Submitted!</h2>
              <p className='text-2xl mt-5'>Your Score: <span className='text-blue-600'>{score}</span> / {quizzData.question.length}</p>
              <p className='text-lg mt-3'>Great job! You answered <span className='text-green-600'>{score}</span> out of {quizzData.question.length} correctly!</p>
              <button
                onClick={() => router.push("/quizz")}
                className='mt-10 bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] text-white px-10 py-2 rounded-lg'
              >
                Back to Quizzes
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Page
