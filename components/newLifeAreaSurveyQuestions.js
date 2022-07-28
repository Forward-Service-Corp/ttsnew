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
                                        setHealth,
                                        income,
                                        setIncome
                                    }) {

    const questions = [
        {
            value: surprise,
            setter: setSurprise,
            question: "Did any answers surprise you?"
        },
        {
            value: concern,
            setter: setConcern,
            question: "Did any areas concern you?"
        }, {
            value: family,
            setter: setFamily,
            question: "Are any of these areas affecting your family?"
        }, {
            value: health,
            setter: setHealth,
            question: "Are any of these areas affecting your health?"
        }, {
            value: income,
            setter: setIncome,
            question: "Are any of these areas affecting your income?"
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
