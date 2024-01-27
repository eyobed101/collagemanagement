import React, { useState } from 'react';
import { motion } from "framer-motion";

import {
  MdWork,
  MdAddLocation,
  MdAccountCircle ,
  MdEmail,
  MdPassword
} from "react-icons/md";

function UserForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [campus, setCampus] = useState('');

  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const newUser = {
      name,
      email,
      password,
      role,
      campus
    };
    onSubmit(newUser);
  };

  return (
    <div className="w-full min-h-screen flex items-start justify-center">
    <div className="w-[90%] md:w-[50%]  rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`w-full p-2 rounded-lg text-center text-lg font-semibold `}
        >
          {/* {msg} */}
        </motion.p>      
        <div>
        <p className="text-center text-[#344054] text-[24px] font-bold align-middle -mt-16 mb-8 border-b-[#EAECF0] border-b-[2px]">
       Root Adminstrator
        </p> 
          </div> 
      <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
        <MdAccountCircle className="text-xl text-gray-700" />
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Username  for account for the user"
          className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
        />
      </div>
       <div className="w-full flex flex-col md:flex-row items-center gap-3">
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdEmail className="text-gray-700 text-2xl" />
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email  for account for the user "
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row items-center gap-3">
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdPassword className="text-gray-700 text-2xl" />
          <input
            type="text"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password  for account for the user "
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row items-center gap-3">
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdWork className="text-gray-700 text-2xl" />
          <select
            type="text"
            required
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            placeholder="Rolefor account for the user"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          >
       <option value="campus head">Campus Head</option>
       <option value="central registrar">Central Registrar</option>
         </select>
        </div>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdWork className="text-gray-700 text-2xl" />
          <select
            type="text"
            required
            value={campus} 
            onChange={(e) => setCampus(e.target.value)}
            placeholder="Campus ID"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          >
       <option value="campus 1">Campus 1</option>
       <option value="campus 2">Campus 2</option>
         </select>
        </div>
      </div>
      <div className="flex items-center w-full">
        <button
          type="button"
          className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
          onClick={handleSubmit}
        >
          Save User
        </button>
      </div>
    </div>
  </div>
    // <div>
    //   <h2>Create User</h2>
    //   <label>
    //     Name:
    //     <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    //   </label>
    //   <label>
    //     Email:
    //     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    //   </label>
    //   <label>
    //     Role:
    //     <select value={role} onChange={(e) => setRole(e.target.value)}>
    //       <option value="campus head">Campus Head</option>
    //       <option value="central registrar">Central Registrar</option>
    //     </select>
    //   </label>
    //   <button onClick={handleSubmit}>Create User</button>
    // </div>
  );
}

export default UserForm;
