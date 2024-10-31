import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromNotes } from '../features/note/noteSlice';
import toast from 'react-hot-toast';
import ShareModal from './ShareModal';
import { FormatDate } from '../utils/formatDate';
import { Calendar, Copy, Eye, PencilLine, Share2, Trash2 } from 'lucide-react';

const Note = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  // State for sharing link
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState('');

  const notes = useSelector(state => state.note.notes);

  // Filter notes based on Search Value
  const filteredData = notes.filter(note => note.title.toLowerCase().includes(searchValue.toLowerCase()));

  // Handling Delete functionality
  const handleDelete = (noteId) => {
    dispatch(removeFromNotes(noteId));
  }

  // Handling Share Link functionality
  const handleShare = (noteId) => {
    const link = `${window.location.origin}/note/${noteId}`;
    setShareLink(link);
    setShowShareModal(true);
  }

  return (
    <div className='w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0'>
      <div className="flex flex-col gap-y-3">
        {/* Search */}
        <div className="w-full flex gap-3 px-4 py-2 rounded-[0.3rem] border border-[rgba(128, 121, 121, 0.3)] mt-6">
          <input className='focus:outline-none w-full bg-transparent' type="search" placeholder='Search notes here...' value={searchValue} onChange={e => setSearchValue(e.target.value)} />
        </div>

        {/* All Notes */}
        <div className="flex flex-col border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem]">
          <h2 className="px-4 text-4xl font-bold border-b border-[rgba(128,121,121,0.3)] pb-4">
            All Notes
          </h2>
          <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
            {
              filteredData.length > 0 ? (
                filteredData.map(note => (
                  <div className='border border-[rgba(128,121,121,0.3)] w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.3rem]' key={note._id}>
                    {/* Heading and Description */}
                    <div className='w-[50%] flex flex-col space-y-3'>
                      <p className='text-2xl font-semibold'>{note.title}</p>
                      <p className='text-sm font-normal line-clamp-3 max-w-[80%] text-[#707070]'>{note.content}</p>
                    </div>

                    {/* Icons */}
                    <div className='flex flex-col sm:items-end gap-y-4'>
                      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                        <button
                          className='p-2 rounded-[0.2rem] bg-[#1A1A1A] hover:bg-transparent group hover:border-[#414141]'
                        >
                          <a href={`/notes/${note?._id}`}>
                            <Eye
                              className="text-white group-hover:text-[#1890FF]"
                              size={20}
                            />
                          </a>
                        </button>
                        <button className='p-2 rounded-[0.2rem] bg-[#1A1A1A] hover:bg-transparent group hover:border-[#414141]' onClick={() => {
                          navigator.clipboard.writeText(note?.content);
                          toast.success("Note Copied to clipboard", {
                            position: "top-right"
                          });
                        }}
                        >
                          <Copy
                            className="text-white group-hover:text-[#FAAD14]"
                            size={20}
                          />
                        </button>
                        <button className='p-2 rounded-[0.2rem] bg-[#1A1A1A] hover:bg-transparent group hover:border-[#414141]' onClick={() => {
                          setTitle(note?.title);
                          setContent(note?.content);
                        }}>
                          <a href={`/?noteId=${note?._id}`}>
                            <PencilLine className="text-white group-hover:text-[#389E0D]"
                              size={20} />
                          </a>
                        </button>
                        <button className="p-2 rounded-[0.2rem] bg-[#1A1A1A] hover:bg-transparent group hover:border-[#414141]"
                          size={20} onClick={() => handleShare(note?._id)}>
                          <Share2 className="text-white group-hover:text-[#6F42C1]"
                            size={20} />
                        </button>
                        <button className='p-2 rounded-[0.2rem] bg-[#1A1A1A] hover:bg-transparent group hover:border-[#414141]' onClick={() => handleDelete(note?._id)}>
                          <Trash2 className='text-white group-hover:text-pink-500' size={20} />
                        </button>
                      </div>
                      <div className='flex gap-x-2'>
                        <Calendar className='text-white' size={20} />
                        {FormatDate(note.createdAt)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-2xl text-center w-full text-chileanFire-500">
                  No Data Found
                </div>
              )
            }
          </div>

          {showShareModal && (
            <ShareModal link={shareLink} onClose={() => setShowShareModal(false)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Note;