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

    return (
        <div className="flex w-5/6 mt-2 ">
            <textarea className="w-11/12 h-20 rounded-md drop-shadow-lg border-4 border-black" 
                name = "noteTextArea"
                type="text"
                id="NoteText"
                value = {newText}
                onChange={e => dispatch(setNewText(e.target.value))}>
            </textarea>
            <div>
                <button onClick= {() => {handleSubmit()}} 
                className="transition transform hover:-translate-y-0.5 active:translate-y-0.5
                bg-black text-white rounded-md ml-1 h-full w-full shrink-0 font-bold">
                    Create
                </button>
            </div>
        </div>
    )
}