import React , {useState , useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';

function Register() {

    const [username , setUserName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();
    let result:any;


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{

        const url = "http://localhost:8800/api/auth/register";
        event.preventDefault();
        console.log("Handle Submit"+username+" - "+email+" - "+password);
        const data = { username,email,password };

        try {
                result = await fetch(url,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });

            if (!result.ok) {
                 // Handle non-200 status codes
                throw new Error(`Error fetching data: ${result.status}`);
              }   

              const responseData = await result.json();
              
              
              if(result.status === 201){
                console.log("Registration Seccusfull");
                const {username,email} = responseData;
                localStorage.setItem("username" , username);
                localStorage.setItem("email" , email);
                navigate('/dashboard');
              }
              console.log(result.status);    
            } catch (error) {
            console.log("Error : "+error);
        }

    };
     // Use useEffect for navigation
  // useEffect(() => {
  //   if (result.status === 201) {
  //     navigate('/dashboard');
  //   }
  // }, [navigate]);

     // Use useEffect for navigation
 

  return (
    <>

    <div className='mt-40'>

      <form className="max-w-md mx-auto" onSubmit={handleSubmit} >
        <div className="relative z-0 w-full mb-5 group">
            <input type="email" name="email" value={email} id="floating_email" 
            onChange={(e:any)=>{
                  setEmail(e.target.value);
            }}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input type="password" name="password" value={password} id="floating_password" 
            onChange={(e:any)=>{
              setPassword(e.target.value);
            }}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>
        
        
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
              <input type="tel"  name="username" id="floating_name" 
              onChange={(e:any)=>{
                  setUserName(e.target.value);
              }}
              value={username} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username </label>
          </div>
          
        </div>

        <button type="submit"  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>

</div>


    </>
  )
}

export default Register