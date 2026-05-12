import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RefreshCcw, Award, BookOpen, ChevronRight } from 'lucide-react';

const questions = [
  {
    id: 1,
    level: "Nível 1 - Básico",
    text: "Em Machine Learning, frequentemente precisamos derivar funções polinomiais. Qual é a derivada da função de custo f(x) = 4x³ + 2x² - 5x + 10?",
    options: [
      { id: "A", text: "12x² + 4x - 5", isCorrect: true },
      { id: "B", text: "4x² + 2x - 5", isCorrect: false },
      { id: "C", text: "12x³ + 4x² - 5", isCorrect: false },
      { id: "D", text: "12x² + 4x + 10", isCorrect: false }
    ],
    explanation: "Multiplicamos o coeficiente pelo expoente e subtraímos 1 do expoente (Regra da Potência). A constante 10 vira zero."
  },
  {
    id: 2,
    level: "Nível 1 - Básico",
    text: "Encontrar onde a derivada é zero nos ajuda a achar o mínimo de uma função de erro. Para a função g(w) = w² - 6w + 9, qual é o valor de 'w' que minimiza essa função?",
    options: [
      { id: "A", text: "w = 6", isCorrect: false },
      { id: "B", text: "w = 0", isCorrect: false },
      { id: "C", text: "w = 3", isCorrect: true },
      { id: "D", text: "w = -3", isCorrect: false }
    ],
    explanation: "A derivada é g'(w) = 2w - 6. Igualando a zero para achar o mínimo: 2w - 6 = 0  =>  2w = 6  =>  w = 3."
  },
  {
    id: 3,
    level: "Nível 1 - Básico",
    text: "Dada a função multivariável f(x, y) = 3x²y + y³, qual é o valor da sua derivada parcial em relação a 'x'?",
    options: [
      { id: "A", text: "3x² + 3y²", isCorrect: false },
      { id: "B", text: "6xy", isCorrect: true },
      { id: "C", text: "6xy + 3y²", isCorrect: false },
      { id: "D", text: "6x", isCorrect: false }
    ],
    explanation: "Ao derivar parcialmente em relação a 'x', tratamos 'y' como uma constante. A derivada de 3x²y é 6xy, e a derivada de y³ (constante) é 0."
  },
  {
    id: 4,
    level: "Nível 1 - Básico",
    text: "Você calculou a derivada da função de perda e o resultado do gradiente foi POSITIVO (a inclinação sobe). Para minimizar o erro, o que o Gradiente Descendente faz com o peso?",
    options: [
      { id: "A", text: "Aumenta o peso", isCorrect: false },
      { id: "B", text: "Mantém o peso", isCorrect: false },
      { id: "C", text: "Zera o peso", isCorrect: false },
      { id: "D", text: "Diminui o peso", isCorrect: true }
    ],
    explanation: "O gradiente aponta a direção de crescimento. Como queremos o mínimo (descida), andamos na direção contrária, subtraindo o gradiente e diminuindo o peso."
  },
  {
    id: 5,
    level: "Nível 2 - Intermediário",
    text: "Qual é o limite da função de ativação Sigmoide σ(x) = 1 / (1 + e⁻ˣ) quando 'x' tende ao infinito positivo?",
    options: [
      { id: "A", text: "0", isCorrect: false },
      { id: "B", text: "1", isCorrect: true },
      { id: "C", text: "Infinito", isCorrect: false },
      { id: "D", text: "-1", isCorrect: false }
    ],
    explanation: "Quando 'x' fica muito grande, e⁻ˣ se aproxima de 0. Portanto, a equação se torna 1 / (1 + 0) = 1. A Sigmoide espreme valores muito grandes no limite de 1."
  },
  {
    id: 6,
    level: "Nível 2 - Intermediário",
    text: "A ReLU é a função de ativação f(x) = max(0, x). Qual é o valor da sua derivada quando x > 0?",
    options: [
      { id: "A", text: "0", isCorrect: false },
      { id: "B", text: "1", isCorrect: true },
      { id: "C", text: "x", isCorrect: false },
      { id: "D", text: "Não existe", isCorrect: false }
    ],
    explanation: "Para valores maiores que zero, a função se comporta como a reta f(x) = x. A derivada de 'x' é sempre 1. (Para x < 0, a derivada seria 0)."
  },
  {
    id: 7,
    level: "Nível 2 - Intermediário",
    text: "Na função de custo J(w) = w², o peso inicial é w = 3 e a Taxa de Aprendizado (α) é 0.1. Qual será o novo peso após UMA iteração do Gradiente Descendente?",
    options: [
      { id: "A", text: "2.7", isCorrect: false },
      { id: "B", text: "2.4", isCorrect: true },
      { id: "C", text: "3.6", isCorrect: false },
      { id: "D", text: "0.6", isCorrect: false }
    ],
    explanation: "1) Derivada: J'(w) = 2w.  2) Gradiente em w=3: 2*(3) = 6.  3) Atualização: Novo w = 3 - (0.1 * 6) = 3 - 0.6 = 2.4."
  },
  {
    id: 8,
    level: "Nível 3 - Avançado",
    text: "Regra da Cadeia em Redes Neurais: Temos a perda L = (y - z)² e a previsão z = w₁x₁ + w₂x₂. Qual é a derivada de L em relação ao peso w₁?",
    options: [
      { id: "A", text: "-2x₁(y - z)", isCorrect: true },
      { id: "B", text: "2(y - z)", isCorrect: false },
      { id: "C", text: "-2(y - z)", isCorrect: false },
      { id: "D", text: "x₁(y - z)", isCorrect: false }
    ],
    explanation: "Pela Regra da Cadeia: dL/dw₁ = (dL/dz) * (dz/dw₁). O primeiro termo é -2(y - z) e o segundo termo é x₁. Multiplicando, temos -2x₁(y - z)."
  },
  {
    id: 9,
    level: "Nível 3 - Avançado",
    text: "Qual é o Vetor Gradiente ∇E da função E(w₁, w₂) = 2w₁² + 3w₁w₂ + w₂² no ponto w₁ = 1 e w₂ = -1?",
    options: [
      { id: "A", text: "[4, 2]", isCorrect: false },
      { id: "B", text: "[-1, 1]", isCorrect: false },
      { id: "C", text: "[0, 0]", isCorrect: false },
      { id: "D", text: "[1, 1]", isCorrect: true }
    ],
    explanation: "Derivadas parciais: ∂E/∂w₁ = 4w₁ + 3w₂ (em 1,-1 dá 1). ∂E/∂w₂ = 3w₁ + 2w₂ (em 1,-1 dá 1). Portanto, o vetor é [1, 1]."
  },
  {
    id: 10,
    level: "Nível 3 - Avançado",
    text: "Avaliando os pontos críticos da função f(w) = w⁴ - 4w² + 4. Sabendo que sua derivada é 4w³ - 8w, podemos afirmar que:",
    options: [
      { id: "A", text: "Tem 1 ponto crítico (0) e é convexa.", isCorrect: false },
      { id: "B", text: "Não possui pontos críticos.", isCorrect: false },
      { id: "C", text: "Tem 3 pontos críticos (0, √2, -√2) e não é puramente convexa.", isCorrect: true },
      { id: "D", text: "Tem 2 pontos críticos e o gradiente garante achar o global.", isCorrect: false }
    ],
    explanation: "Igualando a derivada a zero: 4w(w² - 2) = 0. Raízes: 0, √2 e -√2. Por ter vários pontos críticos (mínimos e máximos locais), a função tem formato de 'W' e não é estritamente convexa."
  }
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionClick = (option) => {
    if (isAnswered) return;
    
    setSelectedOption(option);
    setIsAnswered(true);
    
    if (option.isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const currentQ = questions[currentQuestion];
  const progressPercentage = ((currentQuestion) / questions.length) * 100;

  if (showResult) {
    const percentageScore = (score / questions.length) * 100;
    let feedbackMsg = "";
    if (percentageScore === 100) feedbackMsg = "Perfeito! Você dominou o Cálculo para Data Science!";
    else if (percentageScore >= 70) feedbackMsg = "Excelente! Sua base matemática está muito sólida.";
    else if (percentageScore >= 50) feedbackMsg = "Bom trabalho! Mas vale revisar os conceitos de derivadas parciais.";
    else feedbackMsg = "O cálculo leva prática. Revise o material e tente novamente!";

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Desafio Concluído!</h2>
          <p className="text-slate-500 mb-6">{feedbackMsg}</p>
          
          <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-100">
            <div className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-1">Pontuação Final</div>
            <div className="text-5xl font-black text-slate-800">
              {score} <span className="text-2xl text-slate-400 font-medium">/ 10</span>
            </div>
            <div className="mt-2 text-emerald-600 font-medium">
              {percentageScore}% de Acerto
            </div>
          </div>

          <button 
            onClick={resetQuiz}
            className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-5 h-5" />
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden">
        
        {/* Header & Progress */}
        <div className="bg-slate-800 p-6 text-white">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-blue-300">
              <BookOpen className="w-5 h-5" />
              <span className="font-semibold">{currentQ.level}</span>
            </div>
            <div className="text-slate-300 font-medium">
              Questão {currentQuestion + 1} de {questions.length}
            </div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2.5">
            <div 
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Question Area */}
        <div className="p-8">
          <h3 className="text-xl font-medium leading-relaxed mb-8">
            {currentQ.text}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((option) => {
              
              let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ";
              let icon = null;

              if (!isAnswered) {
                btnClass += "border-slate-200 hover:border-blue-400 hover:bg-blue-50 bg-white";
              } else {
                if (option.isCorrect) {
                  btnClass += "border-emerald-500 bg-emerald-50 text-emerald-800";
                  icon = <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />;
                } else if (selectedOption?.id === option.id) {
                  btnClass += "border-red-500 bg-red-50 text-red-800";
                  icon = <XCircle className="w-6 h-6 text-red-600 shrink-0" />;
                } else {
                  btnClass += "border-slate-100 bg-slate-50 text-slate-400 opacity-60";
                }
              }

              return (
                <button
                  key={option.id}
                  disabled={isAnswered}
                  onClick={() => handleOptionClick(option)}
                  className={btnClass}
                >
                  <div className={`w-8 h-8 rounded flex items-center justify-center font-bold shrink-0
                    ${isAnswered ? (option.isCorrect ? 'bg-emerald-200' : selectedOption?.id === option.id ? 'bg-red-200' : 'bg-slate-200') : 'bg-slate-100'}`}
                  >
                    {option.id}
                  </div>
                  <span className="flex-1 text-lg">{option.text}</span>
                  {icon}
                </button>
              );
            })}
          </div>

          {/* Explanation Area */}
          {isAnswered && (
            <div className={`p-6 rounded-xl mb-8 ${selectedOption?.isCorrect ? 'bg-emerald-50 border border-emerald-100' : 'bg-amber-50 border border-amber-100'}`}>
              <h4 className={`font-bold mb-2 flex items-center gap-2 ${selectedOption?.isCorrect ? 'text-emerald-700' : 'text-amber-700'}`}>
                {selectedOption?.isCorrect ? 'Correto!' : 'Incorreto.'} Gabarito:
              </h4>
              <p className="text-slate-700 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleNextQuestion}
              disabled={!isAnswered}
              className={`py-3 px-6 rounded-xl font-bold flex items-center gap-2 transition-all
                ${isAnswered 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 cursor-pointer' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
            >
              {currentQuestion + 1 === questions.length ? 'Ver Resultado' : 'Próxima Questão'}
              {currentQuestion + 1 < questions.length && <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}