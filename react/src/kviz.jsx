import React, { useState } from 'react';

export default function Quiz() {
    const questions = [
        { text: 'Mi a React fő eleme?', options: ['Komponens', 'Tag', 'Ciklus'], answer: 'Komponens' },
        { text: 'Melyik hook kezeli az állapotot?', options: ['useEffect', 'useState', 'useContext'], answer: 'useState' },
        { text: 'Ki fejlesztette a React-et?', options: ['Google', 'Apple', 'Meta (Facebook)'], answer: 'Meta (Facebook)' }
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = (option) => {
        if (option === questions[currentQuestion].answer) {
            setScore(score + 1);
        }
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowResult(true);
        }
    };

    return (
        <div style={{ padding: '15px', background: '#fff9c4', borderRadius: '8px' }}>
            <h2>2. Alkalmazás: Web Kvíz</h2>
            {showResult ? (
                <div>
                    <h3>Vége!</h3>
                    <p>Pontszámod: {score} / {questions.length}</p>
                    <button onClick={() => {setCurrentQuestion(0); setScore(0); setShowResult(false)}}>Újra</button>
                </div>
            ) : (
                <div>
                    <p><strong>{questions[currentQuestion].text}</strong></p>
                    {questions[currentQuestion].options.map((opt, i) => (
                        <button key={i} onClick={() => handleAnswer(opt)} style={{ display: 'block', margin: '5px 0' }}>
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}