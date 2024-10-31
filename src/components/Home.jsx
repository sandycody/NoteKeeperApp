import React, { useEffect, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToNotes, updateToNotes } from '../features/note/noteSlice';
import { Copy, PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const noteId = searchParams.get('noteId');
    const dispatch = useDispatch();

    const allNotes = useSelector(state => state.note.notes);

    useEffect(() => {
        if (noteId) {
            const note = allNotes.find(n => n._id === noteId);
            if (note) {
                setTitle(note.title);
                setValue(note.content);
            }
        }
    }, [noteId, allNotes]);

    const createNote = () => {
        const note = {
            title: title,
            content: value,
            _id: noteId || nanoid(),
            createdAt: new Date().toDateString()
        }

        if (noteId) {
            // Updation of Note
            dispatch(updateToNotes(note));
        } else {
            // Create a note
            dispatch(addToNotes(note));
        }

        // After creation or updation
        setTitle('');
        setValue('');
        setSearchParams({});
    }

    const resetNote = () => {
        setTitle("");
        setValue("");
        setSearchParams({});
    };

    return (
        <div className='w-full h-full py-10 max-w-[1150px] mx-auto px-5 lg:px-0'>
            <div className="flex flex-col gap-y-5 items-start">
                <div className='w-full flex flex-row gap-x-4 justify-between items-center'>
                    <input className={`${noteId ? "w-[80%] max-md:w-[70%]" : "w-[85%] max-md:w-[70%]"} text-white border border-input rounded-md p-2`} type="text" placeholder="Enter title here..." value={title} onChange={e => setTitle(e.target.value)} />
                    <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-[12px] px-3.5 py-2.5 me-2 max-md:text-[11px] max-md:w-45 max-sm:text-[10px] max-sm:w-50 dark:bg-blue-600 disabled:bg-orange-500' onClick={createNote} disabled={title.length < 3}>
                        {
                            noteId ? 'Update My Note' : 'Create My Note'
                        }
                    </button>

                    {
                        noteId &&
                        <button
                            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700'
                            onClick={resetNote}
                        >
                            <PlusCircle size={20} />
                        </button>
                    }
                </div>
                <div className='w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl'>
                    <div className='w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]'>
                        <div className="w-full flex gap-x-[6px] items-center select-none group">
                            <div className='w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]' />

                            <div className='w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]' />

                            <div className='w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]' />
                        </div>

                        {/* Circle and Copy Button */}
                        <div className='w-fit rounded-t flex items-center justify-between gap-x-4 px-4'>
                            {/* Copy Button */}
                            <button
                                className='flex justify-center items-center transition-all duration-300 ease-in-out group'
                                onClick={() => {
                                    navigator.clipboard.writeText(value);
                                    toast.success("Note Copied to clipboard", {
                                        position: "top-right"
                                    });
                                }}
                            >
                                <Copy className='group-hover:text-success-500' size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Text Area */}
                    <textarea
                        className='w-full p-3 focus-visible:ring-0'
                        style={{
                            caretColor: "#000"
                        }}
                        value={value}
                        placeholder='Write your Content here...'
                        onChange={e => setValue(e.target.value)}
                        rows={20}
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;