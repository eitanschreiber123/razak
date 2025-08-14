'use client'
import { useState, useEffect } from "react";
import {useAuth} from '../context/history'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'
export default function Products() {
  const {users, activeUser, cart, signUp, login, logout, updateUser, updateCustomerData, updateBarberData, addOrder, addPickupOrder, pickupOrders} = useAuth()
  const [orders, setOrders] = useState([])
  const [display, setDisplay] = useState('order')
  const [isVisible, setVisible] = useState(true)
  const [locations, setLocations] = useState([])
const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [payment, setPayment] = useState('')
    const [paymentMethod, setPaymentMethod] = useState(null)
    const router = useRouter()
    useEffect(() => {
        if (!activeUser) {
          router.replace("/sign?from=/barber")
        }
      }, [])
  useEffect(() => {
      if (pickupOrders && pickupOrders.length > 0) {
        setLocations(pickupOrders.map(p => {return {city: p.location,address:'123 Main st'}}));
      }
    }, [pickupOrders]);
    useEffect(() => {
      if (activeUser) {
        setOrders(activeUser.newBarber.orders)
      }
    }, [activeUser])
    useEffect(() => {
      if (activeUser) {
        setName(activeUser.name)
        setEmail(activeUser.email)
        setPayment(activeUser.newBarber.paymentInfo)
        setPaymentMethod(activeUser.newBarber.paymentType)
      }
    }, [])
    const needsPaymentUpdate = activeUser &&  (activeUser.newBarber.paymentInfo == "" || activeUser.newBarber.paymentType == "") ? true : false
    return (
    <div style={{marginTop:'5rem'}}>
      {needsPaymentUpdate && isVisible && <div style={{position: 'fixed',top: '20px',right: '20px',zIndex: 9999}}>
  <div style={{background:'#735b27',color:'#ffffff',padding:'20px 20px 30px 20px',borderRadius:'10px',boxShadow:'0 8px 16px rgba(0,0,0,0.3)',width:'350px',animation: 'fadeInUp 0.5s ease-out',position: 'relative',overflow: 'hidden'}}>
    <button onClick={()=>setVisible(false)} style={{position:'absolute',top:'8px',right:'8px',background:'transparent',border:'none',color:'#ffffff',fontSize: '22px',cursor: 'pointer',lineHeight: 1}}>×</button>
    <h2>Update you payment info</h2>
    <div style={{ display: 'flex'}}>
          <button onClick={()=>{
            setPaymentMethod('paypal')
            }} style={{backgroundColor:paymentMethod=='paypal'?'#4fad33':'white',border:'1px solid black',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em',color:paymentMethod=='paypal'?'white':'#4fad33'}}>Paypal</button>
          <button onClick={()=>{
            setPaymentMethod('zelle')
            }} style={{backgroundColor:paymentMethod=='zelle'?'#4fad33':'white', border:'1px solid black',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em',color:paymentMethod=='zelle>'?'white':'#4fad33'}}>Zelle</button>
          <button onClick={()=>{
            setPaymentMethod('bit')
            }} style={{backgroundColor:paymentMethod=='bit'?'#4fad33':'white', border:'1px solid black',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em',color:paymentMethod=='bit'?'white':'#4fad33'}}>Bitcoin</button>
          </div>
            <input type="text"
        name="payment"
        placeholder="payment"
        value={payment}
        onChange={e => setPayment(e.target.value)}/>
    <button onClick={()=>{
            updateBarberData({paymentType:paymentMethod,paymentInfo:payment})
            setVisible(false)
            }}>Update</button>
  </div>
</div>}
    <div style={{width:'100%',display:'flex',marginBottom:'50px'}}>
            <h1 style={{flex:1,margin:'10px',display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center',borderBottom: display == 'order' ? 'solid 1px #4fad33' : 'none'}} onClick={()=>setDisplay('order')}>Orders</h1>
            <h1 style={{flex:1,margin:'10px',display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center',borderBottom: display == 'account' ? 'solid 1px #4fad33' : 'none'}} onClick={()=>setDisplay('account')}>Account info</h1>
          </div>
    {display == 'order' ?
    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}><div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      {orders.length == 0 ? <h1>when you send in your hair, the information will appear here</h1>
      : orders.map((o, ind) => <div key={ind}>
                <p>Date: {o.date}</p>
                <p>amount: {o.amount}</p>
                <p>address: {o.address}</p>
                <p>payment: {o.paymentMethod}: {o.payment}</p>
              </div>)}
    </div>
    </div>
    : <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginBottom:'50px'}}>
            <h1>Change account info</h1>
            <div>
            <p>Change Name</p>
            <input type="text"
        name="name"
        placeholder="name"
        value={name}
        onChange={e => setName(e.target.value)}/>
          </div>
          <div>
            <p>Change Email</p>
            <input type="email"
        name="email"
        placeholder="email"
        value={email}
        onChange={e => setEmail(e.target.value)}/>
          </div>
          <div>
            <p>Change Payment method</p>
            <div style={{ display: 'flex'}}>
          <button onClick={()=>{
            setPaymentMethod('paypal')
            }} style={{backgroundColor:paymentMethod=='paypal'?'#4fad33':'white',border:'1px solid black',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}}>Paypal</button>
          <button onClick={()=>{
            setPaymentMethod('zelle')
            }} style={{backgroundColor:paymentMethod=='zelle'?'#4fad33':'white', border:'1px solid black',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}}>Zelle</button>
          <button onClick={()=>{
            setPaymentMethod('bit')
            }} style={{backgroundColor:paymentMethod=='bit'?'#4fad33':'white', border:'1px solid black',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}}>Bitcoin</button>
          </div>
          </div>
          <div>
            <p>Change Payment info</p>
            <input type="text"
        name="payment"
        placeholder="payment"
        value={payment}
        onChange={e => setPayment(e.target.value)}/>
          </div>
          <button onClick={()=>{
            updateUser({name, email})
            updateBarberData({paymentType:paymentMethod,paymentInfo:payment})
            }}>Submit</button>
            </div>}
    </div>
  );
}
