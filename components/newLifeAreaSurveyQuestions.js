import React from 'react';
import Toggle from "./toggle";
import LifeAreaSurveyQuestion from "./lifeAreaSurveyQuestion";

function NewLifeAreaSurveyQuestions({
                                        surprise,
                                        setSurprise,
                                        concern,
                                        setConcern,
                                        family,
                                        setFamily,
                                        health,
                                        setHealth
                                    }) {

    const questions = [
        {
            value: surprise,
            setter: setSurprise,
            question: "Did any answers surprise you? Which ones?"
        },
        {
            value: concern,
            setter: setConcern,
            question: "Did any areas worry you? Which ones?"
        }, {
            value: family,
            setter: setFamily,
            question: "Do any Life Areas affect your goals? Which ones?"
        }, {
            value: health,
            setter: setHealth,
            question: "Do any of these areas affect your relationships? Which ones?"
        }

    ]

    return (
        <div className={"mt-4 p-3 text-sm divide-y"}>
            <h2 className={"uppercase text-gray-600 mb-4 text-lg"}>Additional Questions</h2>
            {questions.map((question, questionIndex) => (
                <LifeAreaSurveyQuestion question={question.question} key={questionIndex} value={question.value}
                                        setter={question.setter}/>
            ))}

        </div>
    );
}

export default NewLifeAreaSurveyQuestions;
