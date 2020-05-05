import React from 'react'
import {useForm} from "../../../hooks/form.hook";
import {FormInput} from "../../../shared/utils/FormInput";
import {Textarea} from "../../../shared/utils/Textarea";


interface Props {
    initialValues?: {
        points: number
        comment: string
    }
}

export const defaultReviewForm = {
    points: 0,
    comment: ''
}
export const ReviewCode = (props: Props) => {

    const {initialValues = defaultReviewForm} = props
    const {form, changeHandler} = useForm(initialValues)


    const onSubmit = (event: any) => {
        event.preventDefault()
        console.log(form)
    }

    return (
        <form onSubmit={onSubmit}>
            <FormInput onChange={changeHandler} name={'points'} formValue={form.points} type={"number"}/>
            <Textarea onChange={changeHandler} name={"comment"} formValue={form.comment}/>
            <button
                className="btn btn-primary btn-block" type="submit">Send
            </button>
        </form>
    )
}