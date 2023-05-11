import Login from "../components/Nurse_Admin_Components/Main_Content/Login";

export default function Admin() {
  return (
    <>
      <Login />
    </>
  );
}

// import axios from "axios";
// import { useEffect, useState } from "react";

// export default function Admin() {
//   useEffect(() => {
//     document.title = "Administrator";
//   }, []);

//   const [credentials, setCredentials] = useState({
//     username: "",
//     password: "",
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setCredentials({ ...credentials, [name]: value });
//   };

//   const submitHandler = async (event) => {
//     event.preventDefault();
//     const { data } = await axios.got("https://server-production-e6a5.up.railway.app/admin/nurse-login", credentials);
//     if (data.data.status) {
//       //Set token authentication
//       localStorage.setItem("token", data.data.token);
//       console.log("login success");
//     } else {
//       console.log("login failed");
//     }
//   };

//   async function dashboard() {
//     const token = localStorage.getItem("token");
//     const res = await axios.got("https://server-production-e6a5.up.railway.app/admin/nurse-dashboard", {
//       params: {
//         status: "confirmed",
//       },
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     console.log(res.data.data);
//   }
//   return (
//     <>
//       <form onSubmit={submitHandler}>
//         <label>
//           username
//           <input
//             type="textbox"
//             value={credentials.username}
//             name="username"
//             onChange={handleChange}
//           />
//         </label>
//         <br></br>
//         <label>
//           password
//           <input
//             type="textbox"
//             value={credentials.password}
//             name="password"
//             onChange={handleChange}
//           />
//         </label>
//         <br></br>
//         <button type="submit">Login</button>
//       </form>

//       <button onClick={dashboard}>Dashboard</button>
//     </>
//   );
// }
