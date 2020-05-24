import React from 'react'
import {IGroup} from "../../../shared/interface";
import {useForm} from "../../../hooks/form.hook";
import {TagField} from "../../../shared/utils/TagField";
import {FormInput} from "../../../shared/utils/FormInput";
import {SelectInput} from "../../../shared/utils/SelectInput";

interface Props {
    initialValues?: IGroup
    onSubmit: (event: any, form: any) => void
}

export const defaultGroupFormValues = {
    courseName: '',
    name: '',
    participants: []
}


export const GroupCreateForm = (props: Props) => {
    //
    // const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault()
    //     console.log(form)
    //
    // }

    const {initialValues = defaultGroupFormValues, onSubmit} = props

    const {form, changeHandler, setForm} = useForm<IGroup>(initialValues)

    const selectedTags = (participants: Array<string>) => {
        setForm({...form, participants})
    }


    return (

        <form
            onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault()
            }}
            onSubmit={(event) => onSubmit(event, form)}
            className="form-group">
            <FormInput onChange={changeHandler} name={'name'} formValue={form.name}/>
            <SelectInput name={'courseName'}
                         onSelect={(selectedItem: string) => setForm({...form, courseName: selectedItem})}
                         value={form.courseName}
                         data={["course1", 'course2']}
                         label={'chose course'}/>
            <TagField selectedTags={selectedTags} tags={form.participants ? form.participants : []}/>
            <button
                className="btn btn-primary btn-block mt-3" type="submit">Send
            </button>
        </form>

    )
}
