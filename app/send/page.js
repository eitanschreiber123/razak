"use client"
import React, {useEffect, useState} from 'react'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import {useAuth} from '../context/history'

const locations = ['Cape town, South africa', 'Nairobi, Kenya', 'Arusha, Tanzania', 'Dar es salam, Tanzania']

export default function Home() {
  const {users, activeUser, cart, signUp, login, logout, updateUser, updateCustomerData, updateBarberData, addOrder, addPickupOrder, pickupOrders} = useAuth()
  const [selected, setSelected] = useState(0)
  const [display, setDisplay] = useState('order')
  const [column1, setColumn1] = useState('list')
  const [column2, setColumn2] = useState('first')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [info, setInfo] = useState('')
  const [payment, setPayment] = useState(null)
  const [subInfo, setSubInfo] = useState('')
  const [subPayment, setSubPayment] = useState(null)
  const [newOrder, setNewOrder] = useState({boxes: 0,name:'',address:'',email:'',payment:'',info:'', location:'Cape town, south africa'})
  const [newSub, setNewSub] = useState({sub:'weekly',boxes: 0,name:'',address:'',email:'',payment:'',info:'',location:'Cape town, south africa'})
  const router = useRouter()
  useEffect(() => {
    if (!activeUser) {
      router.replace("/sign?from=/send")
    }
  })
  useEffect(() => {
    if (activeUser) {
      setNewOrder({boxes: 0,name:activeUser.name,address:address,email:activeUser.email,
        payment:activeUser.barberData.info.payment,info:activeUser.barberData.info.info, location:'Cape town, south africa',user:activeUser._id})
    setNewSub({sub:'weekly',boxes: 0,name:activeUser.name,address:address,email:activeUser.email,
      payment:activeUser.barberData.info.subPayment,info:activeUser.barberData.info.subInfo, location: activeUser.barberData.sub?.location || 'Cape town, south africa'})
    setName(activeUser.name)

    setAddress(activeUser.barberData.info.address)
    setInfo(activeUser.barberData.info.info)
    setPayment(activeUser.barberData.info.payment)
    setSubInfo(activeUser.barberData.info.subInfo)
    setSubPayment(activeUser.barberData.info.subPayment)
    
    setEmail(activeUser.email)
    }
  },[])
  useEffect(() => {
    if (activeUser && activeUser.barberData.sub) {
      setColumn2('first')
    }
  }, [users])
  useEffect(() => {
    setColumn1('list')
    setColumn2('first')
  }, [display, users])
  useEffect(() => {
    if (newOrder.payment !== '') {
      setNewOrder({...newOrder, info:info})
    }
  }, [info])
  return (
      activeUser && <main style={{ display: 'flex',flexDirection: 'column',width:'100vw',alignItems:'center',marginTop:'5rem'}}>
        <h1>Manage your orders/subscriptions</h1>
          <div style={{width:'100%',display:'flex',marginBottom:'50px',flexWrap:'wrap'}}>
            <h1 style={{flex:1,margin:'10px',display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center',borderBottom: display == 'order' ? 'solid 1px #4fad33' : 'none'}} onClick={()=>setDisplay('order')}>Orders</h1>
            <h1 style={{flex:1,margin:'10px',display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center',borderBottom: display == 'sub' ? 'solid 1px #4fad33' : 'none'}} onClick={()=>setDisplay('sub')}>Subscriptions</h1>
            <h1 style={{flex:1,margin:'10px',display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center',borderBottom: display == 'account' ? 'solid 1px #4fad33' : 'none'}} onClick={()=>setDisplay('account')}>Account info</h1>
          </div>
          <section>
          {display == 'order' && <div style={{marginBottom:'50px'}}>
            {column1 == 'list' && activeUser.barberData.orders.length ? 
            <div>
              {activeUser && activeUser.barberData.orders.map(o =><div key={o.date}>
                <p>Date: {o.date}</p>
                <p>boxes: {o.boxes}</p>
                <p>location: {o.location}</p>
                <p>payment: {o.payment}: {o.info}</p>
              </div>)}
            <button style={{backgroundColor:'#4fad33',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}} onClick={()=>setColumn1('new')}>new order</button></div>
          : <div>
            <h2>Order boxes</h2>
          <p>{`We'll send you boxes and 5 bags per box, send us back a box with 5 bags full of hair and we'll pay you 200$ per box`}</p>
            <h2>How many boxes do you want?</h2>
            <p>
              <button onClick={()=>setNewOrder({boxes:Math.max(0, newOrder.boxes - 1),name:newOrder.name,address:address,email:newOrder.email,payment:newOrder.payment,info:newOrder.info,location:newOrder.location,user:newOrder.user})} style={{backgroundColor:'blue',color:'white',padding:'5px 22px',fontSize:'1.1em',borderRadius:'5px',margin:'0px 10px'}}>-</button>
              <span>{newOrder.boxes}</span>
              <button onClick={p=>setNewOrder({boxes:newOrder.boxes+1,name:newOrder.name,address:address,email:newOrder.email,payment:newOrder.payment,info:newOrder.info,location:newOrder.location,user:newOrder.user})} style={{backgroundColor:'blue',color:'white',padding:'5px 22px',fontSize:'1.1em',borderRadius:'5px',margin:'0px 10px'}}>+</button>
              </p>
          <div>
            <p>Shipping Address</p>
            <input type="text"
        name="address"
        placeholder="address"
        value={address}
        onChange={e => setAddress(e.target.value)}/>
          </div>
          <div>
            <h2>Pickup location</h2>
            <div style={{display:'flex',flexWrap:'wrap'}}>{locations.map((l, ind) => <p key={l} onClick={p=>{
              setNewOrder({boxes:newOrder.boxes,name:newOrder.name,address:address,email:newOrder.email,payment:newOrder.payment,info:newOrder.info,location:l,user:newOrder.user})
              setSelected(ind)
              }}  style={{margin:'10px',padding:'10px',borderRadius:'50px',border:ind == selected ? '1px solid black' : 'none'}}>{l}</p>)}</div>
          </div>
          <div style={{ display: 'flex',flexDirection: 'column',alignItems:'center'}}>
          <h2>How do you want to get paid</h2>
          <div style={{ display: 'flex'}}>
          <button onClick={()=>{
            setPayment('paypal')
            setNewOrder({...newOrder, payment:payment})
            }} style={{backgroundColor:newOrder.payment=='paypal'?'#4fad33':'white',border:'1px solid black',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}}>Paypal</button>
          <button onClick={()=>{
            setPayment('zelle')
            setNewOrder({...newOrder, payment:payment})
            }} style={{backgroundColor:newOrder.payment=='zelle'?'#4fad33':'white', border:'1px solid black',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}}>Zelle</button>
          <button onClick={()=>{
            setPayment('bit')
            setNewOrder({...newOrder, payment:payment})
            }} style={{backgroundColor:newOrder.payment=='bit'?'#4fad33':'white', border:'1px solid black',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}}>Bitcoin</button>
          </div>
         {newOrder.payment && <div>
          <p>{payment == 'paypal' || payment == 'zelle' ? 'Email' : 'Bitcoin wallet address'}</p>
          <input type="text"
        name="info"
        placeholder={payment == 'paypal' || payment == 'zelle' ? 'Email' : 'Bitcoin wallet address'}
        value={info}
        onChange={e => setInfo(e.target.value)}/>
         </div>}
          <button disabled={newOrder.boxes == 0 || newOrder.payment == ''  || newOrder.info == '' || address == ''} style={{backgroundColor:'#4fad33',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}} onClick={() => {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const finalDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    // Create the order object
    const orderData = {
      boxes: newOrder.boxes,
      name: newOrder.name,
      address: address,
      email: newOrder.email,
      payment: newOrder.payment,
      info: newOrder.info,
      date: finalDate,
      location: newOrder.location,
    };

    // Add order to user orders
    addOrder(orderData);

    // Add to pickup orders at corresponding location
    addPickupOrder(newOrder.location, {
      name: orderData.name,
      date: orderData.date,
      status: 'pending',
      amount: '',
    });
   
  }}>Submit</button>
         </div>
            </div>}
          </div>}
          {
            display == 'sub' && <div style={{marginBottom:'50px'}}>
              {activeUser.barberData.sub ? <div>
                {column2 == 'first' ? <div>
                  <div>
                <h2>Current subscription: {activeUser.barberData.sub.sub}</h2>
                <p>{activeUser.barberData.sub.boxes} boxes</p>
                <p>location: {activeUser.barberData.sub.location}</p>
                <h2>payment info</h2>
                <p>payment: {activeUser.barberData.sub.payment}</p>
                <p>{activeUser.barberData.sub.payment == 'paypal' || activeUser.barberData.sub.payment == 'zelle' ? 'Email' : 'Bitcoin wallet address'} {activeUser.barberData.sub.info}</p>
                <div>
                  <button onClick={()=>setColumn2('change')} style={{backgroundColor:'#4fad33',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}}>Change</button>
                  <button onClick={()=>{
                    updateBarberData({sub:null})
                    }} style={{backgroundColor:'red',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}}>Cancel</button>
                </div>
              </div>
                </div>
                : <div>
                  <div>
                    <h1>Change your subscription</h1>
                <h2>How many boxes do you want?</h2>
            <div style={{ display: 'flex'}}>
              <button onClick={()=>setNewSub({sub:'weekly',boxes:newSub.boxes,name:name,address:address,email:email,payment:newSub.payment,info:newSub.info,location:newSub.location})} style={{backgroundColor:newSub.sub == 'weekly' ? '#4fad33' : 'white', border:'1px solid black',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}}>Weekly</button>
            <button onClick={()=>setNewSub({sub:'monthly',boxes:newSub.boxes,name:name,address:address,email:email,payment:newSub.payment,info:newSub.info,location:newSub.location})} style={{backgroundColor:newSub.sub == 'weekly' ? 'white' : '#4fad33', border:'1px solid black',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}}>Monthly</button>
              </div>
            <p>
              <button onClick={()=>setNewSub({sub:newSub.sub,boxes:Math.max(0, newSub.boxes - 1),name:name,address:address,email:email,payment:newSub.payment,info:newSub.info,location:newSub.location})} style={{backgroundColor:'blue',color:'white',padding:'5px 22px',fontSize:'1.1em',borderRadius:'5px',margin:'0px 10px'}}>-</button>
              <span>{newSub.boxes}</span>
              <button onClick={()=>setNewSub({sub:newSub.sub,boxes:newSub.boxes+1,name:name,address:address,email:email,payment:newSub.payment,info:newSub.info,location:newSub.location})} style={{backgroundColor:'blue',color:'white',padding:'5px 22px',fontSize:'1.1em',borderRadius:'5px',margin:'0px 10px'}}>+</button>
              </p>
          <div>
            <p>Shipping Address</p>
            <input type="text"
        name="address"
        placeholder="address"
        value={address}
        onChange={e => setAddress(e.target.value)}/>
          </div>
          <div>
            <h2>Pickup location</h2>
            <div style={{display:'flex'}}>{locations.map((l, ind) => <p key={l} onClick={p=>{
              setNewSub({boxes:newOrder.boxes,name:newOrder.name,address:address,email:newOrder.email,payment:newOrder.payment,info:newOrder.info,location:l})
              setSelected(ind)
              }}  style={{margin:'10px',padding:'10px',borderRadius:'50px',border:ind == selected ? '1px solid black' : 'none'}}>{l}</p>)}</div>
          </div>
          <div style={{ display: 'flex',flexDirection: 'column',alignItems:'center'}}>
          <h2>How do you want to get paid</h2>
          <div style={{ display: 'flex'}}>
          <button onClick={()=>setNewSub({sub:newSub.sub,boxes:newSub.boxes,name:name,address:address,email:email,payment:'paypal',info:newSub.info,location:newSub.location})} style={{backgroundColor:newSub.payment=='paypal'?'#4fad33':'white',border:'1px solid black',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}}>Paypal</button>
          <button onClick={()=>setNewSub({sub:newSub.sub,boxes:newSub.boxes,name:name,address:address,email:email,payment:'zelle',info:newSub.info,location:newSub.location})} style={{backgroundColor:newSub.payment=='zelle'?'#4fad33':'white', border:'1px solid black',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}}>Zelle</button>
          <button onClick={()=>setNewSub({sub:newSub.sub,boxes:newSub.boxes,name:name,address:address,email:email,payment:'bit',info:newSub.info,location:newSub.location})} style={{backgroundColor:newSub.payment=='bit'?'#4fad33':'white', border:'1px solid black',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}}>Bitcoin</button>
          </div>
         {newSub.payment && <div>
          <p>{(newSub.payment == 'paypal' || newSub.payment == 'zelle') ? 'Email' : 'Bitcoin wallet address'}</p>
          <input type="text"
        name="info"
        placeholder={newSub.payment == 'paypal' || newSub.payment == 'zelle' ? 'Email' : 'Bitcoin wallet address'}
        value={newSub.info}
        onChange={e => setNewSub({sub:newSub.sub,boxes:newSub.boxes,name:name,address:address,email:email,payment:newSub.payment,info:e.target.value,location:newSub.location})}/>
         </div>}
          <button disabled={newSub.boxes==0||newSub.name==''||newSub.email==''||newSub.payment==''||newSub.info == '' || address == ''} style={{backgroundColor:'#4fad33',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}} onClick={()=>{
            const timestamp = Date.now();
            const date = new Date(timestamp);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            const finalDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            addPickupOrder(newSub.location, {
              name: newSub.name,
              date: finalDate,
              status: 'pending',
              amount: '',
            });
            updateBarberData({sub:newSub})}}>Submit</button>
         </div>
                </div>
                  </div>}
              </div> 
              : <div>
                <h2>Order boxes</h2>
          <p>{`We'll send you boxes and 5 bags per box, send us back a box with 5 bags full of hair and we'll pay you 200$ per box`}</p>
            <h2>How many boxes do you want?</h2>
            <div style={{ display: 'flex'}}>
              <button onClick={()=>setNewSub({sub:'weekly',boxes:newSub.boxes,name:name,address:address,email:email,payment:newSub.payment,info:newSub.info,location:newSub.location})} style={{backgroundColor:newSub.sub == 'weekly' ? '#4fad33' : 'white', border:'1px solid black',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}}>Weekly</button>
            <button onClick={()=>setNewSub({sub:'monthly',boxes:newSub.boxes,name:name,address:address,email:email,payment:newSub.payment,info:newSub.info,location:newSub.location})} style={{backgroundColor:newSub.sub == 'weekly' ? 'white' : '#4fad33', border:'1px solid black',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}}>Monthly</button>
              </div>
            <p>
              <button onClick={()=>setNewSub({sub:newSub.sub,boxes:Math.max(0, newSub.boxes - 1),name:name,address:address,email:email,payment:newSub.payment,info:newSub.info,location:newSub.location})} style={{backgroundColor:'blue',color:'white',padding:'5px 22px',fontSize:'1.1em',borderRadius:'5px',margin:'0px 10px'}}>-</button>
              <span>{newSub.boxes}</span>
              <button onClick={()=>setNewSub({sub:newSub.sub,boxes:newSub.boxes+1,name:name,address:address,email:email,payment:newSub.payment,info:newSub.info,location:newSub.location})} style={{backgroundColor:'blue',color:'white',padding:'5px 22px',fontSize:'1.1em',borderRadius:'5px',margin:'0px 10px'}}>+</button>
              </p>
          <div>
            <p>Shipping Address</p>
            <input type="text"
        name="address"
        placeholder="address"
        value={address}
        onChange={e => setAddress(e.target.value)}/>
          </div>
          <div>
            <h2>Pickup location</h2>
            <div style={{display:'flex'}}>{locations.map((l, ind) => <p key={l} onClick={p=>{
              setNewOrder({boxes:newOrder.boxes,name:newOrder.name,address:address,email:newOrder.email,payment:newOrder.payment,info:newOrder.info,location:l,user:newOrder.user})
              setSelected(ind)
              }}  style={{margin:'10px',padding:'10px',borderRadius:'50px',border:ind == selected ? '1px solid black' : 'none'}}>{l}</p>)}</div>
          </div>
          <div style={{ display: 'flex',flexDirection: 'column',alignItems:'center'}}>
          <h2>How do you want to get paid</h2>
          <div style={{ display: 'flex'}}>
          <button onClick={()=>setNewSub({sub:newSub.sub,boxes:newSub.boxes,name:name,address:address,email:email,payment:'paypal',info:newSub.info,location:newSub.location})} style={{backgroundColor:newSub.payment=='paypal'?'#4fad33':'white',border:'1px solid black',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}}>Paypal</button>
          <button onClick={()=>setNewSub({sub:newSub.sub,boxes:newSub.boxes,name:name,address:address,email:email,payment:'zelle',info:newSub.info,location:newSub.location})} style={{backgroundColor:newSub.payment=='zelle'?'#4fad33':'white', border:'1px solid black',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}}>Zelle</button>
          <button onClick={()=>setNewSub({sub:newSub.sub,boxes:newSub.boxes,name:name,address:address,email:email,payment:'bit',info:newSub.info,location:newSub.location})} style={{backgroundColor:newSub.payment=='bit'?'#4fad33':'white', border:'1px solid black',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}}>Bitcoin</button>
          </div>
         {newSub.payment && <div>
          <p>{newSub.payment == 'paypal' || newSub.payment == 'zelle' ? 'Email' : 'Bitcoin wallet address'}</p>
          <input type="text"
        name="info"
        placeholder={(newSub.payment == 'paypal' || newSub.payment == 'zelle') ? 'Email' : 'Bitcoin wallet address'}
        value={newSub.info}
        onChange={e => setNewSub({sub:newSub.sub,boxes:newSub.boxes,name:name,address:address,email:email,payment:newSub.payment,info:e.target.value,location:newSub.location})}/>
         </div>}
          <button disabled={newSub.boxes==0||newSub.name==''||newSub.email==''||newSub.payment==''||newSub.info == '' || address == ''} style={{backgroundColor:'#4fad33',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}} onClick={()=>updateBarberData({sub:newSub})}>Submit</button>
         </div>
                </div>}
            </div>
          }
          {display == 'account' && <div style={{marginBottom:'50px'}}>
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
          <button style={{backgroundColor:'#4fad33',padding:'5px 10px', borderRadius:'50px',fontSize:'1.5em'}} onClick={()=>updateUser({name, email})}>Submit</button>
            </div>}
        </section>
      </main>
  );
}
