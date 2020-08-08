import React, {useRef, useState} from "react";


export default function EmailQuiz() {
    let [showEmailQuiz, setShowEmailQuiz] = useState(false);
    let [showEmail, setShowEmail] = useState(false);
    let [showQuizError, setShowQuizError] = useState(false);
    let quizRef = useRef(null);

    const part1 = "hi";
    const at = "@";
    const part2 = "realmayus";  // I hope this prevents javascript scrapers from getting my email address
    const dot = ".";
    const part3 = "xyz";

    return(
        <div>
            { showEmail &&
            <p>{part1 + at + part2 + dot + part3}</p>
            }
            { !showEmail &&
            <div>
                <button onClick={() => setShowEmailQuiz(true)}>Reveal email address</button>
                <br/>
                {showEmailQuiz &&
                <div>
                    <label htmlFor="select">What is the capital of the USA?</label> <br/>
                    <select ref={quizRef} id="select">
                        <option value="Berlin">Berlin</option>
                        <option value="Canberra">Canberra</option>
                        <option value="Washington, D.C.">Washington, D.C.</option>
                        <option value="London">London</option>
                    </select>
                    <button onClick={() => {
                        if (quizRef.current.value === "Washington, D.C.") {
                            setShowEmail(true);
                        } else {
                            setShowQuizError(true);
                        }
                    }}>OK
                    </button>
                </div>
                }
                {showQuizError &&
                <p>Please try again, this answer is wrong.</p>
                }
            </div>}
        </div>
    )
}