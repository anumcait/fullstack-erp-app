import React, { useState } from 'react';
import { FaFacebookF, FaGoogle, FaLinkedinIn } from 'react-icons/fa';
import logo from "../../assets/images/EQIC_Image.jpg";
import axios from 'axios';
import './LoginForm.css'; // ✅ Import your custom CSS

const LoginForm = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      'http://localhost:5000/api/auth/login',
      {
        username,
        password
      },
      {
        withCredentials: true // ⬅️ VERY IMPORTANT for session to work
      }
    );

    // Save session info to localStorage or state
    const { user } = response.data;
    localStorage.setItem('userName', user.username);
    localStorage.setItem('userRole', user.role); // optional
    localStorage.setItem('empName', user.ename);
    window.location.href = '/dashboard';
  } catch (err) {
    console.error('Login error:', err.response?.data || err.message);
    setError('Invalid username or password');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eaf2ff] px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        
        {/* Left Illustration */}
        <div className="hidden md:flex items-center justify-center bg-[#d4e3fc]">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Illustration"
            className="w-4/5"
          />
        </div>

        {/* Right Login Panel */}
        <div className="flex flex-col justify-center px-8 py-10">
          <div className="flex items-center justify-center mb-6">
            <img src={logo} alt="Logo" className="w-10 h-10 mr-2 rounded-full" />
            {/* <h2 className="text-xl font-semibold">EQIC ERP</h2> */}
          </div>
          <h3 className="text-3xl font-extrabold mb-6 text-gray-800 tracking-tight">
  <span className="text-2xl text-[#56c7be] drop-shadow-md">Welcome to EQIC<span className="text-2xl text-orange-500">ERP</span> Portal</span>
</h3>
{/* <h3 className="text-2xl font-bold mb-4">Sign In</h3>
          <h3 className="text-2xl font-bold mb-4">Sign In</h3> */}

          <form onSubmit={handleLogin}>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              User Name:
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="flex justify-between items-center mb-4">
              <label className="flex items-center text-sm">
                <input type="checkbox" className="mr-2" />
                Remember me next time.
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="login-btn w-full">
              LOG IN
            </button>
          </form>

          <p className="text-sm text-center mt-6">
            2025 Auctor Home Appliances. All rights reserved.
            <br />
            <span className="text-red-600 font-bold">Powered By: EQICERP</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;




// import React, { useState } from 'react';
// import './LoginForm.css';
// import logo from "../../assets/images/EQIC_Image.jpg";
// import axios from 'axios';

// const LoginForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await axios.post(
//       'http://localhost:5000/api/auth/login',
//       {
//         username,
//         password
//       },
//       {
//         withCredentials: true // ⬅️ VERY IMPORTANT for session to work
//       }
//     );

//     // Save session info to localStorage or state
//     const { user } = response.data;
//     localStorage.setItem('userName', user.username);
//     localStorage.setItem('userRole', user.role); // optional
//     localStorage.setItem('empName', user.ename);
//     window.location.href = '/dashboard';
//   } catch (err) {
//     console.error('Login error:', err.response?.data || err.message);
//     setError('Invalid username or password');
//   }
// };


//   return (
//     <div className="login-page">
//       <div className="login-box">
//         <div className="tab-header">Sign In</div>
//         <div className="login-header">
//           <img src={logo} alt="Logo" className="logo" />
//         </div>

//         <form className="login-form" onSubmit={handleLogin}>
//           <label>User Name:</label>
//           <input
//             type="text"
//             placeholder="Enter username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />

//           <label>Password:</label>
//           <input
//             type="password"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <div className="checkbox-area">
//             <input type="checkbox" id="remember" />
//             <label htmlFor="remember">Remember me next time.</label>
//           </div>

//           {error && <p className="error-message">{error}</p>}

//           <button type="submit" className="login-btn">LOG IN</button>
//         </form>
//       </div>

//       <div className="footer">
//         <span>2025 Auctor Home Appliances. All rights reserved</span>
//         <span className="powered">Powered By: EQICERP</span>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;