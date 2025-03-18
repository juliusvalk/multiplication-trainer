import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

export default function MultiplicationTrainer() {
  const [numProblems, setNumProblems] = useState(0);
  const [problems, setProblems] = useState([]);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);

  const generateProblem = () => {
    const a = Math.floor(Math.random() * 12) + 1;
    const b = Math.floor(Math.random() * 12) + 1;
    const result = a * b;

    const unknown = Math.floor(Math.random() * 3); // 0 = a, 1 = b, 2 = result

    return { a, b, result, unknown };
  };

  const startGame = (count) => {
    setNumProblems(count);
    const generatedProblems = Array.from({ length: count }, generateProblem);
    setProblems(generatedProblems);
    setCurrentProblem(generatedProblems[0]);
    setCorrectCount(0);
    setStartTime(Date.now());
  };

  const handleSubmit = () => {
    const { a, b, result, unknown } = currentProblem;
    const correctAnswer = unknown === 0 ? a : unknown === 1 ? b : result;

    if (parseInt(userAnswer) === correctAnswer) {
      setCorrectCount(correctCount + 1);
    }

    if (problems.length > 1) {
      setProblems(problems.slice(1));
      setCurrentProblem(problems[1]);
    } else {
      setTimeTaken(Date.now() - startTime);
      setCurrentProblem(null);
    }

    setUserAnswer('');
  };

  if (!numProblems) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Multiplication Trainer</h1>
        {[10, 20, 50, 100].map((count) => (
          <Button key={count} onClick={() => startGame(count)}>
            {count} Problems
          </Button>
        ))}
      </div>
    );
  }

  if (!currentProblem) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-bold">Results</h2>
        <p>Correct Answers: {correctCount}/{numProblems}</p>
        <p>Total Time: {(timeTaken / 1000).toFixed(2)} seconds</p>
        <p>Average Time per Problem: {(timeTaken / numProblems / 1000).toFixed(2)} seconds</p>
        <Button onClick={() => setNumProblems(0)}>Restart</Button>
      </div>
    );
  }

  const { a, b, result, unknown } = currentProblem;
  const displayProblem =
    unknown === 0
      ? `? × ${b} = ${result}`
      : unknown === 1
      ? `${a} × ? = ${result}`
      : `${a} × ${b} = ?`;

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">Solve:</h2>
      <p className="text-lg">{displayProblem}</p>
      <input
        type="number"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        className="p-2 border rounded-lg"
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
} 
