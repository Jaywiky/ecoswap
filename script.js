// Declare scrollToTop function globally
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Scroll to Top Button
    window.onscroll = function() { toggleScrollButton(); };

    function toggleScrollButton() {
        const scrollButton = document.getElementById("scrollToTopBtn");
        if (scrollButton) { // Ensure the element exists
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                scrollButton.style.display = "block";
            } else {
                scrollButton.style.display = "none";
            }
        }
    }

    // Quiz Functionality
    document.getElementById('quiz')?.addEventListener('click', function(event) {
        if (event.target && event.target.matches('a.cta-button')) {
            startQuiz();
        }
    });

    function startQuiz() {
        const quizQuestions = [
            {
                question: "What type of product do you want to switch to eco-friendly?",
                options: ["Personal Care", "Home Essentials", "Cleaning Products", "Fashion"]
            },
            {
                question: "Do you prefer organic products?",
                options: ["Yes", "No"]
            },
            {
                question: "How committed are you to zero-waste living?",
                options: ["Very committed", "Moderately committed", "Not committed"]
            }
        ];

        let userAnswers = [];
        let currentQuestionIndex = 0;

        // Create the quiz modal dynamically
        const quizModal = document.createElement("div");
        quizModal.classList.add("quiz-modal");
        quizModal.innerHTML = `
            <div class="quiz-modal-content">
                <h2>${quizQuestions[currentQuestionIndex].question}</h2>
                <ul>
                    ${quizQuestions[currentQuestionIndex].options.map(option => `<li class="quiz-option">${option}</li>`).join('')}
                </ul>
                <button id="nextQuestion" class="cta-button">Next</button>
            </div>
        `;
        document.body.appendChild(quizModal);

        // Handle answer selection
        function handleAnswerSelection() {
            document.querySelectorAll('.quiz-option').forEach(option => {
                option.addEventListener('click', function() {
                    userAnswers.push(this.innerText);
                    if (currentQuestionIndex < quizQuestions.length - 1) {
                        currentQuestionIndex++;
                        updateQuizQuestion();
                    } else {
                        displayRecommendations();
                    }
                });
            });
        }

        // Update the quiz question
        function updateQuizQuestion() {
            const currentQuestion = quizQuestions[currentQuestionIndex];
            const modalContent = quizModal.querySelector('.quiz-modal-content');
            modalContent.innerHTML = `
                <h2>${currentQuestion.question}</h2>
                <ul>
                    ${currentQuestion.options.map(option => `<li class="quiz-option">${option}</li>`).join('')}
                </ul>
                <button id="nextQuestion" class="cta-button">Next</button>
            `;
            handleAnswerSelection();
        }

        // Display recommendations based on answers
        function displayRecommendations() {
            const recommendations = getRecommendations(userAnswers);
            const modalContent = quizModal.querySelector('.quiz-modal-content');
            modalContent.innerHTML = `
                <h2>Recommended Products for You</h2>
                <ul>
                    ${recommendations.map(item => `<li>${item}</li>`).join('')}
                </ul>
                <button id="closeQuiz" class="cta-button">Close</button>
            `;
            
            // Add event listener to close button
            const closeButton = document.getElementById('closeQuiz');
            if (closeButton) {
                closeButton.addEventListener('click', closeQuiz);
            }
        }

        // Get recommendations based on user answers
        function getRecommendations(answers) {
            if (answers.includes('Fashion') && answers.includes('Yes')) {
                return ["Eco-friendly Clothing", "Organic Cotton T-shirts", "Recycled Fashion Brands"];
            } else if (answers.includes('Home Essentials') && answers.includes('Very committed')) {
                return ["Zero-waste Starter Kit", "Bamboo Toothbrush", "Compostable Home Products"];
            } else {
                return ["Reusable Shopping Bags", "Biodegradable Soap", "Eco-Friendly Cleaning Solutions"];
            }
        }

        // Close the quiz modal
        function closeQuiz() {
            quizModal.remove();
        }

        handleAnswerSelection();
    }

    // Scroll to Top Button UI (Only append once)
    if (!document.getElementById('scrollToTopBtn')) { // Avoid duplicate button insertion
        const scrollButtonHTML = `
            <button id="scrollToTopBtn" class="scrollToTopBtn" onclick="scrollToTop()">
                ↑
            </button>
        `;
        document.body.insertAdjacentHTML('beforeend', scrollButtonHTML);
    }

    // Style for the Scroll to Top Button
    const style = document.createElement('style');
    style.innerHTML = `
        .scrollToTopBtn {
            display: none;
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #2d6a4f;
            color: white;
            border: none;
            padding: 15px;
            font-size: 20px;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .scrollToTopBtn:hover {
            background-color: #1b4d3b;
        }

        .quiz-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .quiz-modal-content {
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            text-align: center;
            max-width: 600px;
            width: 100%;
        }

        .quiz-modal-content ul {
            list-style-type: none;
            padding: 0;
        }

        .quiz-option {
            padding: 10px;
            margin: 10px 0;
            background-color: #2d6a4f;
            color: white;
            cursor: pointer;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }

        .quiz-option:hover {
            background-color: #1b4d3b;
        }
    `;
    document.head.appendChild(style);
});