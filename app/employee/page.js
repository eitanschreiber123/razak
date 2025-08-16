'use client'
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/history';

export default function Home() {
  const {users,setUsers,employees,employeeLogin,activeEmployee,cart,activeUser,signUp,login,logout,updateUser,addOrder,addPickupOrder,pickupOrders,changePickupOrderStatus,setPickupOrders} = useAuth();

  const [location, setLocation] = useState(0);
  const [wwidth, setWidth] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [z, setZ] = useState(10);
  const [orders, confirm] = useState([]);
  const [filters, setFilters] = useState([
    { f: 'pending', c: false },
    { f: 'confirmed', c: false },
    { f: 'sent', c: false },
    { f: 'input', c: true }
  ]);
  const [userFilters, setUserFilters] = useState([]);
  const [newInput, addInput] = useState(false);
  const [newName, setName] = useState(null);
  const [filteredOptions, setFilteredOptions] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const [startingPoint, setStartingPoint] = useState(0);
  const router = useRouter();
  const [amountInput, setAmountInput] = useState('')
  const [selectedLocation, selectLocation] = useState(null)
  const [selectedId, selectId] = useState(null)

  useEffect(() => {
    if (!activeEmployee) {
      router.replace("/employeeEnter?from=/employee");
    }
  }, [activeEmployee, router]);

  useEffect(() => {
    if (pickupOrders && pickupOrders.length > 0) {
      confirm(pickupOrders);
    }
  }, [pickupOrders]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleResize() {
        setWidth(window.innerWidth);
      }
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    setFilteredOptions(users);
  }, [users]);

  useEffect(() => {
    if (newName) {
      setFilteredOptions(
        users.filter(opt =>
          opt.name.toLowerCase().includes(newName.name.toLowerCase())
        )
      );
    }
  }, [newName, users]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        return;
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputFocus = () => {
    setIsDropdownVisible(true);
  };

  const handleOptionClick = (option) => {
    setName(option);
    setIsDropdownVisible(false);
    inputRef.current.blur();
  };

  // ✅ Clean filtered + paginated orders
  const filteredOrders = pickupOrders
    .map(({ location, orders }) => ({
      location,
      orders: orders.filter(order =>
        userFilters.length === 0 || userFilters.includes(order.name)
      )
    }))[location]?.orders
    ?.filter(order => {
      const noFiltersActive = filters.slice(0, 3).every(f => f.c === false);
      return noFiltersActive || filters.filter(f => f.c).map(f => f.f).includes(order.status);
    }) || [];

  const paginatedOrders = filteredOrders.slice(startingPoint, startingPoint + 10);

  return (
    <main style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
      <section style={{ display: 'flex', height: '100vh', position: 'relative', marginTop: '5rem' }}>
        
        {/* Sidebar */}
        {wwidth > 680 ? (
          <section style={{ height: '100%', width: '25%', padding: '10px' }}>
            <div>
              {pickupOrders.map((o, ind) => (
                <p
                  key={ind}
                  style={{ margin: '20px 0', cursor: 'pointer' }}
                  onClick={() => {
                    setLocation(ind);
                    setFilters([
                      { f: 'pending', c: false },
                      { f: 'confirmed', c: false },
                      { f: 'sent', c: false }
                    ]);
                  }}
                >
                  {o.location}
                </p>
              ))}
            </div>
            <div>
              {users.map(u => (
                <div key={u.name} style={{ display: 'flex' }}>
                  <p>{u.name}</p>
                  <input
                    type="checkbox"
                    name={u.name}
                    checked={userFilters.includes(u.name)}
                    onChange={() =>
                      setUserFilters(!userFilters.includes(u.name)
                        ? [...userFilters, u.name]
                        : userFilters.filter(us => us !== u.name)
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </section>
        ) : (
          <>
            {/* Mobile menu button */}
            <svg
              onClick={() => {
                setSidebarOpen(true);
                setZ(5);
              }}
              style={{ cursor: 'pointer', zIndex: z, margin: '20px' }}
              viewBox="0 0 50 45" width="50" height="50">
              <rect width="50" height="5"></rect>
              <rect y="20" width="50" height="5"></rect>
              <rect y="40" width="50" height="5"></rect>
            </svg>

            {/* Mobile Sidebar */}
            {isSidebarOpen && (
              <div
                style={{
                  position: 'fixed', top: 0, left: 0, height: '100vh', width: '100vw',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9
                }}
                onClick={() => {
                  setSidebarOpen(false);
                  setZ(10);
                }}
              >
                <div
                  style={{
                    position: 'fixed', top: 0, left: 0, height: '100vh', width: '40vw',
                    backgroundColor: '#fff', padding: '20px', boxShadow: '2px 0px 10px rgba(0,0,0,0.2)',
                    marginTop: '5rem', overflowY: 'scroll'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div>
                    {orders.map((o, ind) => (
                      <p
                        key={ind}
                        style={{ margin: '20px 0', cursor: 'pointer' }}
                        onClick={() => {
                          setLocation(ind);
                          setSidebarOpen(false);
                          setFilters([
                            { f: 'pending', c: false },
                            { f: 'confirmed', c: false },
                            { f: 'sent', c: false }
                          ]);
                        }}
                      >
                        {o.location}
                      </p>
                    ))}
                  </div>
                  <div>
                    {users.map(u => (
                      <div key={u.name} style={{ display: 'flex' }}>
                        <p>{u.name}</p>
                        <input
                          type="checkbox"
                          name={u.name}
                          checked={userFilters.includes(u.name)}
                          onChange={() =>
                            setUserFilters(!userFilters.includes(u.name)
                              ? [...userFilters, u.name]
                              : userFilters.filter(us => us !== u.name)
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Main Content */}
        {pickupOrders[location] && pickupOrders[location].location && (
          <section style={{ height: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{display:'flex',width:'100%',justifyContent:'space-evenly',flexWrap:'wrap'}}>
              <h1>{pickupOrders[location].location}</h1>
              {pickupOrders[location].orders.length > 0 && pickupOrders[location].orders.filter(o => o.amount !== '').length > 0 && <h1>Total amount: {pickupOrders[location].orders.map(o => Number(o.amount)).reduce((a, b) => a + b)}kg</h1>}
            </div>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly' }}>
              {filters.slice(0, 3).map((f, i) => (
                <div key={f.f} style={{ display: 'flex' }}>
                  <p>{f.f}</p>
                  <input
                    type="checkbox"
                    name={f.f}
                    checked={f.c}
                    onChange={() =>
                      setFilters(filters.map((fi, ind) => i === ind ? { f: f.f, c: !f.c } : fi))
                    }
                  />
                </div>
              ))}
            </div>

            {/* Orders list */}
            {paginatedOrders.map((o, inner) => {
  return (
    <div
      key={inner}
      onClick={() => {
        // Save selected location and order ID
        selectLocation(pickupOrders[location].location);
        selectId(o._id);
        setAmountInput(o.amount || '');
        setPickupOrders(prev =>
          prev.map(po =>
            po.location.toLowerCase() === pickupOrders[location].location.toLowerCase()
              ? {
                  ...po,
                  orders: po.orders.map(order =>
                    order._id === o._id
                      ? { ...order, status: 'input' }
                      : order
                  ),
                }
              : po
          )
        );

        // Call API to update backend
        changePickupOrderStatus(
          pickupOrders[location].location,
          o._id,
          'input',
          o.amount
        );
      }}
      style={{ cursor: o.status === 'input' ? 'text' : 'default' }}
    >
      <p>name: {o.name}</p>
      <p>date: {o.date}</p>
      <p>status: {o.status}</p>

      {o.status === 'confirmed' ? (
        <p>amount: {o.amount}kg</p>
      ) : o.status === 'input' ? (
        <input
          type="text"
          autoFocus
          name="amount"
          placeholder="amount"
          value={amountInput}
          onChange={e => setAmountInput(e.target.value)}
          onBlur={() => {
            // Update to 'confirmed' locally when done typing
            setPickupOrders(prev =>
              prev.map(po =>
                po.location.toLowerCase() === selectedLocation?.toLowerCase()
                  ? {
                      ...po,
                      orders: po.orders.map(order =>
                        order._id === selectedId
                          ? { ...order, status: 'confirmed', amount: amountInput }
                          : order
                      ),
                    }
                  : po
              )
            );

            // Sync with backend
            changePickupOrderStatus(
              selectedLocation,
              selectedId,
              'confirmed',
              amountInput
            );

            // Clear selection
            selectLocation(null);
            selectId(null);
            setAmountInput('');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.target.blur();
            }
          }}
        />
      ) : null}
    </div>
  );
})}


            {newInput && <div ref={containerRef} style={{display:'flex',flexDirection:'column',width:'200px'}}>
      <input
        ref={inputRef}
        type="text"
        value={newName ? newName.name : ''}
        onFocus={handleInputFocus}
        onChange={e=>setName(e.target.value)}
        style={{border: '1px solid #ccc'}}
        onBlur={() => {
          setIsDropdownVisible(false);
                    const timestamp = Date.now();
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const finalDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                    if (newName && newName.name.length) {
                      addPickupOrder(pickupOrders[location].location, {
      user: newName._id,                  
      name: newName.name,
      date: finalDate,
      status: 'pending',
      amount: '',
      payment: newName.newBarber.paymentInfo,
      paymentMethod: newName.newBarber.paymentType
    }, newName._id);
    addInput(false)
                    }}}
      />
      {isDropdownVisible && (
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: '4px 0',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            zIndex: 1000,
          }}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <li
                key={opt}
                onClick={() => {
                  handleOptionClick(opt)}}
                style={{
                  padding: '8px',
                  cursor: 'pointer',
                  backgroundColor: '#fff',
                }}
                onMouseDown={(e) => e.preventDefault()} // Prevent blur before click
              >
                {opt.name}
              </li>
            ))
          ) : (
            <li style={{ padding: '8px', color: '#999' }}>No matches</li>
          )}
        </ul>
      )}
    </div>}
          {newInput == false &&<button onClick={()=>addInput(true)}>New order</button>}
            {/* Pagination controls */}
            <div style={{ display: 'flex', marginTop: '10px' }}>
              {startingPoint - 10 >= 0 && (
                <button onClick={() => setStartingPoint(startingPoint - 10)}>Prev</button>
              )}
              <span style={{ margin: '0 10px' }}>
                {startingPoint + 1} - {Math.min(startingPoint + 10, filteredOrders.length)}
              </span>
              {startingPoint + 10 < filteredOrders.length && (
                <button onClick={() => setStartingPoint(startingPoint + 10)}>Next</button>
              )}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
