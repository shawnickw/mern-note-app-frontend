import { useMutation } from 'react-query';
import axios from 'axios';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setNewText } from '../redux/newTextSlice';

export const NewNoteItem = () => {
    const newText = useSelector((state) => state.newText.value)
    const dispatch = useDispatch();
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
        mutation.mutate({ text: newText})
    }
    
    const textareaStyle = {
        fontSize: "32px",
    }

    return (
        <div className="flex w-full bg-stone-800 rounded-md mb-5 
        transition transform hover:-translate-y-1 active:translate-y-0.5">
            <textarea className="md:w-11/12 w-9/12 h-40 rounded-md drop-shadow-lg border-8 font-bold 
            border-stone-800 bg-stone-800 text-stone-200" 
                name = "noteTextArea"
                style={textareaStyle}
                type="text"
                id="NoteText"
                value = {newText}
                onChange={e => dispatch(setNewText(e.target.value))}>
            </textarea>
            <div className="md:w-1/12 w-3/12 text-center">
                <button onClick= {() => {handleSubmit()}} 
                className="text-white md:text-5xl text-4xl rounded-md h-full w-full shrink-0 font-bold">
                    📝
                </button>
            </div>
        </div>
    )
}