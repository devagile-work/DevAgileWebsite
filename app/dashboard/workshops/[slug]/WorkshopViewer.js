"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function WorkshopViewer({ workshop, registration }) {
  const router = useRouter();
  const [currentLectureIdx, setCurrentLectureIdx] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [updating, setUpdating] = useState(false);

  const currentLecture = workshop.lectures[currentLectureIdx];
  
  const getLectureProgress = (lectureId) => {
    return registration.progress.find(p => p.lectureId === lectureId) || { watched: false, quizPassed: false };
  };

  const currentProgress = currentLecture ? getLectureProgress(currentLecture._id) : null;

  const handleLectureClick = (idx) => {
    setCurrentLectureIdx(idx);
    setShowQuiz(false);
    setQuizResult(null);
    setQuizAnswers({});
  };

  const handleTakeQuiz = () => {
    setShowQuiz(true);
    setQuizResult(null);
  };

  const handleAnswerChange = (questionIdx, optionIdx) => {
    setQuizAnswers(prev => ({ ...prev, [questionIdx]: optionIdx }));
  };

  const submitQuiz = async () => {
    if (!currentLecture || !currentLecture.quiz || currentLecture.quiz.length === 0) return;
    
    let correct = 0;
    currentLecture.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctOptionIndex) {
        correct++;
      }
    });

    const score = (correct / currentLecture.quiz.length) * 100;
    const passed = score >= 70;

    setQuizResult({ score, passed });
    setUpdating(true);

    try {
      await fetch(`/api/workshops/${workshop.slug}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lectureId: currentLecture._id,
          watched: true,
          quizPassed: passed,
          quizScore: score
        })
      });
      // Refresh the page data
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  if (!workshop.lectures || workshop.lectures.length === 0) {
    return <div className="p-8 text-center text-gray-500 font-roboto">No lectures available for this workshop.</div>;
  }

  const allPassed = workshop.lectures.every(l => getLectureProgress(l._id).quizPassed);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-brand-white font-roboto">
      {/* Main Content (Left) - Video or Quiz */}
      <div className="flex-1 p-4 lg:p-8 flex flex-col overflow-y-auto">
        <Link href="/dashboard" className="text-brand-navy/60 hover:text-brand-navy mb-4 inline-flex items-center text-sm font-bold w-max">
          &larr; Back to Dashboard
        </Link>
        <h1 className="text-2xl lg:text-3xl font-black text-brand-navy mb-2">{workshop.title}</h1>
        
        {allPassed ? (
          <div className="bg-brand-green/20 border border-brand-green/50 text-brand-navy p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center py-12">
             <div className="text-4xl mb-4">🏆</div>
             <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
             <p className="text-center font-medium opacity-80">You have completed all lectures and passed all quizzes for this workshop.</p>
          </div>
        ) : showQuiz && currentLecture ? (
          <div className="bg-white rounded-2xl shadow-md border border-brand-navy/10 p-6 lg:p-8">
            <h2 className="text-xl font-bold text-brand-navy mb-4">Quiz: {currentLecture.title}</h2>
            
            {quizResult && (
              <div className={`p-4 rounded-xl mb-6 font-bold ${quizResult.passed ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
                You scored {quizResult.score.toFixed(0)}%. {quizResult.passed ? "You passed!" : "You need 70% to pass. Try again."}
              </div>
            )}

            <div className="space-y-8">
              {currentLecture.quiz.map((q, qIdx) => (
                <div key={q._id} className="bg-brand-navy/[0.02] p-4 rounded-xl border border-brand-navy/5">
                  <p className="font-bold text-brand-navy mb-4">{qIdx + 1}. {q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((opt, oIdx) => (
                      <label key={oIdx} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${quizAnswers[qIdx] === oIdx ? 'bg-brand-green/10 border-brand-green text-brand-navy font-medium' : 'bg-white border-brand-navy/10 hover:bg-gray-50'}`}>
                        <input 
                          type="radio" 
                          name={`q-${qIdx}`} 
                          className="mr-3" 
                          checked={quizAnswers[qIdx] === oIdx}
                          onChange={() => handleAnswerChange(qIdx, oIdx)}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex gap-4">
              <button 
                onClick={submitQuiz}
                disabled={updating || Object.keys(quizAnswers).length < currentLecture.quiz.length}
                className="bg-brand-navy text-white font-bold py-2.5 px-6 rounded-xl hover:bg-brand-navy/90 disabled:opacity-50 transition-all shadow-md"
              >
                {updating ? "Submitting..." : "Submit Quiz"}
              </button>
              <button onClick={() => setShowQuiz(false)} className="bg-gray-200 text-gray-700 font-bold py-2.5 px-6 rounded-xl hover:bg-gray-300 transition-all">
                Back to Video
              </button>
            </div>
          </div>
        ) : currentLecture ? (
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-xl border border-brand-navy/20 relative">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${currentLecture.youtubeVideoId.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1] || currentLecture.youtubeVideoId}`}
                title={currentLecture.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-brand-navy/10 shadow-sm">
              <h2 className="text-lg lg:text-xl font-bold text-brand-navy">{currentLecture.title}</h2>
              {currentLecture.quiz?.length > 0 && (
                <button 
                  onClick={handleTakeQuiz}
                  className={`font-bold py-2 px-6 rounded-xl transition-all shadow-sm ${currentProgress.quizPassed ? 'bg-brand-green/20 text-brand-green border border-brand-green/30' : 'bg-brand-green text-brand-navy hover:bg-brand-green/90 hover:shadow-brand-green/30'}`}
                >
                  {currentProgress.quizPassed ? 'Retake Quiz' : 'Take Quiz'}
                </button>
              )}
            </div>
          </div>
        ) : null}
      </div>

      {/* Sidebar (Right) - Lectures List */}
      <div className="w-full md:w-80 lg:w-96 bg-white border-t md:border-t-0 md:border-l border-brand-navy/10 flex flex-col h-auto md:h-screen sticky top-0 shrink-0">
        <div className="p-4 lg:p-6 border-b border-brand-navy/10 bg-brand-navy/5">
          <h3 className="text-xl font-black text-brand-navy font-shareTech uppercase">Course Content</h3>
          <div className="mt-2 text-xs font-medium text-brand-navy/60">
            {workshop.lectures.filter(l => getLectureProgress(l._id).quizPassed).length} / {workshop.lectures.length} Completed
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {workshop.lectures.map((lecture, idx) => {
            const prog = getLectureProgress(lecture._id);
            const isActive = idx === currentLectureIdx;
            return (
              <button
                key={lecture._id}
                onClick={() => handleLectureClick(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${isActive ? 'bg-brand-navy text-white border-brand-navy shadow-lg' : 'bg-white border-brand-navy/10 hover:border-brand-navy/30 hover:bg-brand-navy/[0.02] text-brand-navy'}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 ${prog.quizPassed ? 'bg-brand-green border-brand-green text-white' : isActive ? 'border-brand-green text-brand-green' : 'border-gray-300 text-gray-300'}`}>
                    {prog.quizPassed ? (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold text-sm leading-tight mb-1 ${isActive ? 'text-white' : 'text-brand-navy'}`}>{lecture.title}</h4>
                    {lecture.quiz?.length > 0 && (
                      <p className={`text-[10px] font-medium ${isActive ? 'text-brand-green' : 'text-brand-navy/60'}`}>
                        {prog.quizPassed ? `Score: ${prog.quizScore}%` : `${lecture.quiz.length} Questions`}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
