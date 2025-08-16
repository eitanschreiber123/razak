'use client'
import { useState, useEffect } from "react";
import {useAuth} from '../context/history'
import Image from "next/image";
import Link from "next/link";
export default function Products() {
  const {users, activeUser, cart, signUp, login, logout, updateUser, updateCustomerData, updateBarberData, addOrder, addPickupOrder, pickupOrders} = useAuth()
  const [locations, setLocations] = useState([])
  useEffect(() => {
      if (pickupOrders && pickupOrders.length > 0) {
        setLocations(pickupOrders.map(p => {return {city: p.location,name:p.name,number:p.number,address:'123 Main st'}}));
      }
    }, [pickupOrders]);
  return (
    <div style={{marginTop:'5rem',display:'flex',flexDirection:'column',alignItems:'center'}}>
    <h1>send you hair to one of the following locations or bring it in person, we will weigh it there and pay you 100$ per KG</h1>
            <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>{locations.map((l, ind) => <div key={l} style={{margin:'10px',padding:'10px',borderRadius:'50px',border:'1px solid black'}}>
                <p>{l.city}</p>
                <p>{l.name}</p>
                <p>{l.number}</p>
                <p>{l.address}</p>
                </div>)}</div>
                <Link href="/barber"><button className="ml-3 btn btn-md btn-primary btn-icon-right">My orders</button></Link>
    </div>
  );
}
