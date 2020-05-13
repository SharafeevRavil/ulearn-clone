import React, {useEffect, useState} from "react"
import trash from "../../../shared/svgs/icons8-trash.svg"
import {Question} from "./TestForm"
import {IAnswer} from "../../../shared/interface"

class Answer implements IAnswer {
    answerText: string = ""
    isCorrect: boolean = false
}

interface Props {
    init: Question
    changeQuestion: (question: Question) => void
}

export const QuestionForm = (props: Props) => {

    const {init, changeQuestion} = props

    const [question, setQuestion] = useState(init)

    const [testText, setText] = useState("")

    useEffect(() => {
        changeQuestion(question)
    }, [question, changeQuestion])

    const addNewAnswer = (questionText: string) => {
        setText("")
        const answer = new Answer()
        answer.answerText = questionText
        const answers = question.answers.slice()
        console.log('ВОТ ТУТ', question)
        answers.push(answer)
        setQuestion({...question, answers})
    }

    const deleteAnswer = (deletedAnswer: Answer) => {
        question.answers = question.answers.filter(answer => answer !== deletedAnswer);
        setQuestion({...question})
    }

    const setCorrect = (question: Question, answer: Answer, event?: any) => {
        answer.isCorrect = !answer.isCorrect
        setQuestion({...question})
    }

    return (
        <div>
            <div><textarea value={question.question} disabled={true} className="form-control"/></div>
            <br/>
            <div className="input-group mb-3">
                <input
                    autoFocus
                    onKeyUp={(event: any) => event.key === 'Enter' && addNewAnswer(testText)}
                    type="text" className="form-control" value={testText}
                    onChange={(event: any) => setText(event.target.value)}/>
                <button className={"btn btn-light"} onClick={() => addNewAnswer(testText)}>Добавить вариант ответа
                </button>
            </div>
            {
                question.answers.map((answer, index) => {
                        return (
                            <div className="input-group mb-3" key={`${index}-${answer.answerText}`}>
                                {index + 1}.
                                <div className="input-group-prepend ml-2">
                                    <div className="input-group-text">
                                        <input type={"checkbox"}

                                               checked={answer.isCorrect}
                                               onChange={(event?: any) => setCorrect(question, answer, event)}/></div>
                                </div>
                                <input type="text" className="form-control"
                                       value={answer.answerText} disabled={true}/>
                                <button className={"btn btn-light"} onClick={() => deleteAnswer(answer)}><img alt="/"
                                                                                                              src={trash}/>
                                </button>
                            </div>)
                    }
                )
            }
        </div>
    )
}
