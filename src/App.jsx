import React, { useState, useEffect } from 'react';
import './App.css';


const flashcards = [
      { question: 'What is the purpose of the CPU in a computer?', answer: 'The CPU (Central Processing Unit) is the primary component responsible for executing instructions and performing calculations in a computer.'},
      { question: 'Define "Instruction Set Architecture (ISA)."', answer: ' ISA is a set of rules and conventions that dictate how software interacts with the hardware components of a computer, particularly the CPU.'},
      { question: 'What is the role of the ALU in the CPU?', answer: 'The Arithmetic Logic Unit (ALU) performs arithmetic and logical operations, such as addition, subtraction, and comparisons, within the CPU.'},
      { question: 'Explain the concept of "pipelining" in CPU design.', answer: 'Pipelining is a CPU design technique where multiple instructions are executed concurrently in different stages of the pipeline to improve performance.'},
      { question: 'What is the purpose of the cache memory in a computer system?', answer: 'Cache memory is used to store frequently accessed data and instructions to speed up CPU operations by reducing memory access times.'},
      { question: 'Define "von Neumann architecture."', answer: 'Von Neumann architecture is a computer design concept where both data and instructions are stored in the same memory, allowing for programmatic control of the CPU.'},
      { question: 'What is a "register" in computer architecture?', answer: 'Registers are small, high-speed storage locations within the CPU used to store data temporarily during processing.'},
      { question: 'Describe the difference between RISC and CISC architectures.', answer: 'RISC (Reduced Instruction Set Computer) has a simplified instruction set with a focus on executing instructions quickly, while CISC (Complex Instruction Set Computer) has a more extensive instruction set designed to perform complex operations in a single instruction.'},
      { question: 'What is the purpose of the Memory Management Unit (MMU)?', answer: 'The MMU is responsible for translating virtual memory addresses to physical memory addresses, enabling memory protection and efficient memory allocation.'},
      { question: 'Explain the concept of "endianess" in computer systems.', answer: 'Endianess refers to the way data is stored in memory. Big-endian systems store the most significant byte at the lowest memory address, while little-endian systems store it at the highest memory address.'},
];


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(flashcards.length).fill(''));

  // Shuffle the flashcards when the component mounts
  useEffect(() => {
    shuffleArray(flashcards);
  }, []);

  const goToNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex < flashcards.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const goToPreviousCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const currentCard = flashcards[currentCardIndex];

  const updateUserAnswer = (event) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentCardIndex] = event.target.value;
    setUserAnswers(newAnswers);

    const isCorrect = event.target.value === currentCard.answer;
    event.target.classList.toggle('correct-answer', isCorrect);
    event.target.classList.toggle('wrong-answer', !isCorrect);
  };

  useEffect(() => {
    const inputElement = document.querySelector('input[type="text"]');
    if (inputElement) {
      inputElement.classList.remove('correct-answer', 'wrong-answer');
    }
  }, [currentCardIndex]);

  return (
    <div>
      <h2>CS Flashcard Quiz</h2>
      <div className="card-count">
        Card {currentCardIndex + 1} of {flashcards.length}
      </div>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <p>{currentCard.question}</p>
          </div>
          <div className="flip-card-back">
            <p>{currentCard.answer}</p>
          </div>
        </div>
      </div>
      <div className="button-container">
        <button onClick={goToPreviousCard}>Previous</button>
        <button onClick={goToNextCard}>Next</button>
      </div>
      <div className="answer-container">
        <input
          type="text"
          placeholder="Your Answer"
          value={userAnswers[currentCardIndex]}
          onChange={updateUserAnswer}
        />
        <p>Your Answer: {userAnswers[currentCardIndex]}</p>
      </div>
    </div>
  );
}

export default App;