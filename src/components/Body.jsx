import readNotesRequest from "../api/readNotesRequest";
import { useQuery, useQueryClient} from "react-query";
import BarLoader from 'react-spinners/BarLoader';
import { NewNoteItem } from "./NewNoteItem";
import { useMutation } from "react-query";
import axios from "axios";
import React, { useCallback } from "react";
import { useState } from "react";

const Body = () => {
    const {isLoading, data: notes} = useQuery('notes', readNotesRequest); // Replaces useEffect and useState

    const NoteItems = ({ note }) => {
        const queryClient = useQueryClient();

        const deleteMutation = useMutation(noteid => {
            return axios.delete(`${import.meta.env.VITE_API_URL}/notes/${noteid}`)
        },
        {
            onSuccess: async () => {
                queryClient.invalidateQueries({ queryKey: ['notes']})
            } 
        })

        const [value, setValue] = useState();

        return (
            <div className="w-5/6 h-20 flex mt-1 mb-1">
                <textarea defaultValue={note.text} onChange={useCallback((e) => setValue(e.target.value))} className="w-11/12 h-full rounded-md drop-shadow-lg border-2 border-double">
                </textarea>
                <div className="flex flex-col ml-1">
                    <button onClick={()=>{axios.put(`${import.meta.env.VITE_API_URL}/notes/${note._id}`, {
                    text: `${value}`
                    })}} className="transition transform hover:-translate-y-0.5 active:translate-y-0.5
                    bg-black text-white rounded-md w-full h-1/2 shrink-0 font-bold">
                        Update
                    </button>
                    <button onClick={()=>{deleteMutation.mutate(note._id)}} className="transition transform hover:-translate-y-0.5 active:translate-y-0.5
                    bg-black text-white rounded-md mt-1 w-full h-1/2 shrink-0 font-bold">
                        Delete
                    </button>
                </div>
            </div>
        )
    } // passes into .map method 

    return (
        <main className="flex h-full justify-center items-center">
            <div className="h-4/5 w-4/5 rounded flex flex-col items-center p-5 overflow-y-scroll">
                {isLoading ? ( <BarLoader size={100} /> ) : (
                notes.map((note) => (
                    <NoteItems note={note} key={note._id} />
                )))} 
                {<NewNoteItem />}
            </div>
        </main>
    )
} // Added isLoading to prevent error of mapping when undefined

export default Body;