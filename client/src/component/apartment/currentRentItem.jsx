import React from 'react';

let CurrentRentItem = (props) => {
    const {id, title, beds, days, price,cancelRent } = props;
    const handleRentApartment = ()=>{

        cancelRent(id,{
            id: id,
            title: title,
            beds: beds,
            days: days,
            rentPrice: price,
            rentStatus: 0
        });
    };
    return (
        <div className='currentRentItem'>
            <div className='details'>
                <p className='text'>{title}</p>
                <span> / </span>
                <span>{beds} beds</span>
                <span> / </span>
                <span>{days} days</span>
                <span> / </span>
                <span className='price'>${price}</span>
            </div>
            <button onClick={handleRentApartment} className='closeButton'>Cancel rent</button>
        </div>
    );
}

export default CurrentRentItem;
