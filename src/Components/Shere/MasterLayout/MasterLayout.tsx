
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';



export default function MasterLayout() {
  return (
    <>
      <div className="d-flex ">
        <div className='position-sticky top-0 vh-100' >
          <Sidebar />
        </div>
        <div className="w-100 ">
          <Navbar />
       
          <Outlet />
        </div>

      </div>


    </>
  )
}
