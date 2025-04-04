function MultiplicationTrainer() {
  const [numProblems, setNumProblems] = React.useState(0);
  const [problems, setProblems] = React.useState([]);
  const [currentProblem, setCurrentProblem] = React.useState(null);
  const [userAnswer, setUserAnswer] = React.useState('');
  const [correctCount, setCorrectCount] = React.useState(0);
  const [startTime, setStartTime] = React.useState(null);
  const [timeTaken, setTimeTaken] = React.useState(0);
  const inputRef = React.useRef(null);

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
      inputRef.current.focus();
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
          <button className="bg-gray-400 text-white rounded-xl p-2 hover:text-gray-200 font-bold" key={count} onClick={() => startGame(count)}>
            {count} Problems
          </button>
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
        <button onClick={() => setNumProblems(0)} className="bg-gray-400 text-white rounded-xl p-2 hover:text-gray-200 font-bold">Restart</button>
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
      <h2 className="text-xl font">Left: {problems.length}</h2>
      <p className="text font">Errors: {numProblems - correctCount - problems.length}</p>
      <p className="text-lg">{displayProblem}</p>
      <input
        ref={inputRef}
        value={userAnswer}
        type="number"
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        className="p-2 border rounded-lg"
        min="0" inputmode="numeric" pattern="[0-9]*" title="Number"
      />
      <button className="bg-gray-400 text-white rounded-xl p-2 hover:text-gray-200 font-bold" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

window.MultiplicationTrainer = MultiplicationTrainer; // Attach to the global object
