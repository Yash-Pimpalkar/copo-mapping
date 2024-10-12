import React, { useState } from 'react';

const Dummyfeedback = () => {

    const questions = [
        "Understand Concept of TCS, Difference & equivalence of DFA & NFA, languages described by finite automata and regular expressions.",
        "Design context free grammar, pushdown automata to recognize the language.",
        "Develop an understanding of computation through Turing Machine.",
        "Acquire fundamental understanding of decidability and undecidability."
    ];

    const options = [
        { label: "Strongly agree", value: 3 },
        { label: "Agree", value: 2 },
        { label: "Neutral", value: 1 },
        { label: "Disagree", value: 0 }
    ];

    const [responses, setResponses] = useState(Array(questions.length).fill(null));

    console.log(responses)

    const handleOptionChange = (questionIndex, optionValue) => {
        const newResponses = [...responses];
        newResponses[questionIndex] = optionValue;
        setResponses(newResponses);
    };

    return (
        <div className="p-4 space-y-4 sm:p-8 lg:p-12 bg-gray-100 min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-50 to-blue-100">
            <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6 text-blue-700 text-center font-bold">
                Dummy
            </h1>
            {questions.map((question, questionIndex) => (
                <div key={questionIndex} className="border rounded-lg p-4 bg-white shadow-md w-full sm:w-1/2 mx-auto">
                    <p className="font-semibold mb-2">{questionIndex+1}. {question}</p>
                    <div className="space-y-2">
                        {options.map((option) => (
                            <label key={option.value} className="flex items-center">
                                <input
                                    type="radio"
                                    name={`question-${questionIndex}`}
                                    value={option.value}
                                    checked={responses[questionIndex] === option.value}
                                    onChange={() => handleOptionChange(questionIndex, option.value)}
                                    className="form-radio text-blue-600"
                                />
                                <span className="ml-2">{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-4 space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Save Changes
                </button>
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default Dummyfeedback;
