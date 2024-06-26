import React, { useState } from 'react';
import { IoHammerSharp } from 'react-icons/io5';

let ApartmentItem = (props) => {
    const { id, title, beds, days, price, deleteApartment, updateApartment, rentApartment } = props;

    // Стан для обробки редагованих полів
    const [editMode, setEditMode] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedBeds, setUpdatedBeds] = useState(beds);
    const [updatedDays, setUpdatedDays] = useState(days);
    const [updatedPrice, setUpdatedPrice] = useState(price);

    const handleUpdate = () => {
        updateApartment(id, {
            id: id,
            title: updatedTitle,
            beds: updatedBeds,
            days: updatedDays,
            rentPrice: updatedPrice,
        });
        setEditMode(false);
    };

    const handleRentApartment = () => {
        rentApartment(id, {
            id: id,
            title: updatedTitle,
            beds: updatedBeds,
            days: updatedDays,
            rentPrice: updatedPrice,
            rentStatus: 1
        });
    };

    return (
        <div className='apartmentItem'>
            <div className='innerContainer'>
                {editMode ? (
                    <>
                        <input
                            type='text'
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                        />
                        <input
                            type='number'
                            value={updatedDays}
                            onChange={(e) => setUpdatedDays(e.target.value)}
                        />
                        <input
                            type='number'
                            value={updatedBeds}
                            onChange={(e) => setUpdatedBeds(e.target.value)}
                        />
                        <input
                            type='number'
                            value={updatedPrice}
                            onChange={(e) => setUpdatedPrice(e.target.value)}
                        />
                        <button onClick={handleUpdate} className='rentButton'>Save</button>
                        <button onClick={() => setEditMode(false)} className='closeButton'>Cancel</button>
                    </>
                ) : (
                    <>
                        <div className='details'>
                            <p className='text'>{title}</p>
                            <span> / </span>
                            <span>{beds} beds</span>
                            <span> / </span>
                            <span>{days} days</span>
                            <span> / </span>
                            <span className='price'>${price}</span>
                        </div>
                        <div className="buttons-container">
                            <IoHammerSharp onClick={() => setEditMode(true)} className='update-icon'/>
                            <button onClick={() => deleteApartment(id)} className='closeButton'>Delete</button>
                            <button onClick={handleRentApartment} className='rentButton'>Rent</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ApartmentItem;
