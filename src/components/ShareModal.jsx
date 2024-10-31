import React from 'react';
import toast from 'react-hot-toast';
import { FaFacebook, FaTwitter, FaWhatsapp, FaTelegram } from 'react-icons/fa';

const ShareModal = ({ link, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-black rounded-lg p-5 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Share link</h3>
                    <button onClick={onClose} className="text-xl">&times;</button>
                </div>
                <p className="text-sm mb-3">Anyone who has this link will be able to view this.</p>

                <div className="bg-gray-100 rounded p-2 flex items-center justify-between mb-4">
                    <input
                        type="text"
                        value={link}
                        readOnly
                        className="bg-gray-100 text-gray-800 flex-1 outline-none"
                    />
                    <button onClick={() => {
                        navigator.clipboard.writeText(link)
                        toast.success("Link copied successfully")
                    }} className="ml-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Copy</button>
                </div>

                <div className="flex justify-around">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${link}`} target="_blank" rel="noopener noreferrer">
                        <FaFacebook size={30} color="#4267B2" />
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${link}`} target="_blank" rel="noopener noreferrer">
                        <FaTwitter size={30} color="#1DA1F2" />
                    </a>
                    <a href={`https://wa.me/?text=${link}`} target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp size={30} color="#25D366" />
                    </a>
                    <a href={`https://t.me/share/url?url=${link}`} target="_blank" rel="noopener noreferrer">
                        <FaTelegram size={30} color="#0088CC" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
