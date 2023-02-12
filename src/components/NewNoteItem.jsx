import { useMutation } from 'react-query';
import axios from 'axios';
import { useQueryClient } from 'react-query';
import { useState } from 'react';

export const NewNoteItem = () => {
    const [noteText,setNoteText] = useState("")
    const queryClient = useQueryClient();

    const mutation = useMutation(newNote => {
        return axios.post(`${import.meta.env.VITE_API_URL}/notes`,newNote)
    },
    {
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['notes']})
        }
    })

    const handleSubmit = (evt) => {
        mutation.mutate({ text: noteText})
    }

    return (
        <div className="flex w-5/6 mt-2 ">
            <textarea className="w-11/12 h-20 rounded-md drop-shadow-lg" 
                name = "noteTextArea"
                type="text"
                id="NoteText"
                value = {noteText}
                onChange={e => setNoteText(e.target.value)}>
            </textarea>
            <div>
                <button onClick= {() => {handleSubmit()}} className="transition transform hover:-translate-y-0.5 active:translate-y-0.5
                bg-black text-white rounded-md ml-1 h-full w-full shrink-0 font-bold">
                    Create
                </button>
            </div>
        </div>
    )
}