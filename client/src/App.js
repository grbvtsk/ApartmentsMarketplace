import React from 'react'
import ApartmentItem  from './component/apartment/apartmentItem'
import CurrentRent from "./component/apartment/currentRentItem";
import axios from "axios";

function App(){
    let [apartment, setApartment] = React.useState([]);
    React.useEffect(() => {
    axios.get('http://localhost:8000/market/')
        .then(res=>{
            setApartment(res.data.filter(apart => apart.rentStatus === 0))
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
        });
    }, []);

    let [rentedApartment, setRentedApartment] = React.useState([]);
    React.useEffect(() => {
        axios.get('http://localhost:8000/market/')
            .then(res=>{
                setRentedApartment(res.data.filter(apart => apart.rentStatus === 1))
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    let inputTitle = React.createRef();
    let inputDays = React.createRef();
    let inputBeds = React.createRef();
    let inputRentPrice = React.createRef();

    const postData = ()=>{
        const newApartment={
            id:null,
            title:inputTitle.current.value,
            days:inputDays.current.value,
            beds:inputBeds.current.value,
            rentPrice:inputRentPrice.current.value
        }
        axios.post('http://localhost:8000/market/', newApartment)
            .then(res => {
                setApartment(prevApart => [...prevApart, res.data]);
                inputTitle.current.value = '';
                inputDays.current.value = '';
                inputBeds.current.value = '';
                inputRentPrice.current.value = '';
            })
            .catch(error => {
                console.error("Error posting data: ", error);
            });
    }

    const deleteApartment = (id)=>{
        axios.delete(`http://localhost:8000/market/${id}`)
            .then(() => {
                setApartment(prevApart => prevApart.filter(apart => apart.id !== id));
            })
            .catch(error => {
                console.error("Error deleting data: ", error);
            });
    }

    const updateApartment = (id, updatedData) => {
        axios.put(`http://localhost:8000/market/${id}`, updatedData)
            .then(() => {
                setApartment(prevApart => prevApart.map(apart =>
                    apart.id === id ? { ...apart, ...updatedData } : apart
                ));
            })
            .catch(error => {
                console.error("Error updating data: ", error);
            });
    }

    const rentApartment = (id,updatedData)=>{
        axios.put(`http://localhost:8000/market/${id}`, updatedData)
            .then((res)=>{
                setRentedApartment(prevApart => [...prevApart, res.data]);
                console.log(res.data)
            })
            .then(()=>{
                setApartment(prevApart => prevApart.filter(apart => apart.id !== id));
                }
            )
            .catch(error => {
                console.error("Error renting: ", error);
            });
    }

    const cancelRent = (id,updatedData)=>{
        axios.put(`http://localhost:8000/market/${id}`, updatedData)
            .then((res)=>{
                setApartment(prevApart => [...prevApart, res.data]);
            })
            .then(()=>{
                setRentedApartment(prevApart => prevApart.filter(apart => apart.id !== id));
            })
            .catch(error => {
                console.error("Error canceling rent: ", error);
            });
    }

  return(
      <div className="site-wrapper">
          <h1>Apartments Marketplace</h1>
          <h2>&#129297; Create a new rent </h2>
          <div className="addRent-wrapper">
              <div>
                  <p>Title</p>
                  <input ref={inputTitle} type="text" placeholder='Ex. Flat in the city center'/>
              </div>
              <div>
                  <p>Days</p>
                  <input ref={inputDays} type="number" placeholder='days' min="0"/>
              </div>
              <div>
                  <p>Beds</p>
                  <input ref={inputBeds} type="number" placeholder='beds' min="0"/>
              </div>
              <div>
                  <p>Rent Price</p>
                  <input ref={inputRentPrice} type="number" placeholder='0' min="0"/>
              </div>
              <button onClick={postData} className="submit-button">Submit Rent</button>
          </div>
          <h2>&#129321; Your Current Rent</h2>
          {rentedApartment.map(el=>{
              return <CurrentRent key={el.id} title={el.title} beds={el.beds}
                                  days={el.days} price={el.rentPrice} id={el.id}
                                  cancelRent={cancelRent}/>
          })}
          <h2>&#127969; Available Apartments</h2>
          {apartment.map(el => {
              return <ApartmentItem key={el.id} title={el.title} beds={el.beds}
                                    days={el.days} price={el.rentPrice} id={el.id}
                                    rentStatus={el.rentStatus} deleteApartment={deleteApartment}
                                    updateApartment={updateApartment} rentApartment={rentApartment}/>
          })}
      </div>
  )
}


export default App;
