import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

export const ShowModalContext = React.createContext();

export function ShowModalProvider({children}){
    const [showModal, setShowModal] = useState(false);
    const [showSUModal, setShowSUModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showEditBookingModal, setShowEditBookingModal] = useState(false);

    return (
        <ShowModalContext.Provider
            value={{
                showModal, setShowModal, showSUModal, setShowSUModal, showReviewModal, setShowReviewModal, showEditBookingModal, setShowEditBookingModal
            }}
            >
                {children}
        </ShowModalContext.Provider>
    )
}

const useModalContext = () => useContext(ShowModalContext);

export default useModalContext;
