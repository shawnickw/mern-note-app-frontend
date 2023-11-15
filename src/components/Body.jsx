import readNotesRequest from "./readNotesRequest";
import { useQuery, useQueryClient} from "react-query";
import BarLoader from 'react-spinners/BarLoader';
import { NewNoteItem } from "./NewNoteItem";
import { useMutation } from "react-query";
import axios from "axios";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUpdateText } from "../redux/updateTextSlice";

const Body = () => {
    const dispatch = useDispatch()

    const {isLoading, data: notes} = useQuery('notes', readNotesRequest); // Replaces useEffect and useState

    const NoteItems = ({ note }) => {
        const updateText = useSelector((state) => state.updateText.value)
        const queryClient = useQueryClient();

        const deleteMutation = useMutation(noteid => {
            return axios.delete(`${import.meta.env.VITE_API_URL}/notes/${noteid}`)
        },
        {
            onSuccess: async () => {
                queryClient.invalidateQueries({ queryKey: ['notes']})
            } 
        })

        const textareaStyle = {
            fontSize: "32px",
        }

        return (
            <div className="w-full h-40 flex mt-1 mb-5 bg-stone-800 rounded-md
            transition transform hover:-translate-y-1 active:translate-y-0.5">
                <textarea defaultValue={note.text} onChange={((e) => dispatch(setUpdateText(e.target.value)))} 
                className="md:w-11/12 w-9/12 h-40 rounded-md drop-shadow-lg border-8 border-solid font-bold 
                border-stone-800 bg-stone-800 text-stone-200"
                style={textareaStyle}>
                </textarea>
                <div className="flex flex-col md:w-1/12 w-3/12">
                    <button onClick={()=>{axios.put(`${import.meta.env.VITE_API_URL}/notes/${note._id}`, {
                    text: `${updateText}`
                    })}} className="md:text-5xl text-4xl text-white w-full h-1/2 shrink-0 font-bold rounded-md">
                        📝
                    </button>
                    <button onClick={()=>{deleteMutation.mutate(note._id)}} 
                    className="md:text-5xl text-4xl text-white w-full h-1/2 shrink-0 font-bold rounded-md">
                        🗑
                    </button>
                </div>
            </div>
        )
    } // passes into .map method 

    return (
        <main className="flex h-full justify-center overflow-auto w-full">
            <div className="md:w-4/5 w-screen rounded flex flex-col md:items-center p-10 md:mr-0">
                {<NewNoteItem />}
                {isLoading ? ( <BarLoader size={100} /> ) : (
                notes.map((note) => (
                    <NoteItems note={note} key={note._id} />
                )))} 
            </div>
        </main>
    )
} // Added isLoading to prevent error of mapping when undefined

export default Body;