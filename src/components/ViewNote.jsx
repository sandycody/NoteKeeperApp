import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Copy } from 'lucide-react';

const ViewNote = () => {
  const { id } = useParams();

  const allNotes = useSelector(state => state.note.notes);

  const note = allNotes.filter(n => n._id === id)[0];

  return (
    <div className='w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0'>
      <div className="flex flex-col gap-y-5 items-start">
        <input className='w-full text-white border border-input rounded-md p-2' type="text" placeholder="Title" value={note.title} disabled />

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
                  navigator.clipboard.writeText(note.content);
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
            value={note.content}
            placeholder='Write your Content here...'
            disabled
            rows={20}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewNote;