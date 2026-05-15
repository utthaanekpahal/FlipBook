import React from 'react'
import { IoNotificationsOutline } from 'react-icons/io5';
import { FaBookOpen } from "react-icons/fa";
import {
  FaTachometerAlt,
  FaBook,
  FaList,
  FaUpload,
  FaUsers,
  FaCog
} from 'react-icons/fa';
function Dashboard() {
  return (
    <div className='Dashboard'>
      <header className="header">
        <div className='logo' style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FaBookOpen size={22} />
          Digital Book Library
        </div>
        <input type="text" placeholder='search Book, Categories' className='searchInput' />
         <div>
      <IoNotificationsOutline size={24} />
    </div>
        <div className='profile'>Profile</div>
      </header>
      <aside className="sidebar">
      <ul className="sidebarList">

        <li className="sidebarItem">
          <FaTachometerAlt /> Dashboard
        </li>

        <li className="sidebarItem">
          <FaBook /> Books
        </li>

        <li className="sidebarItem">
          <FaList /> Categories
        </li>

        <li className="sidebarItem">
          <FaUpload /> Upload Books
        </li>

        <li className="sidebarItem">
          <FaUsers /> Agents
        </li>

        <li className="sidebarItem">
          <FaCog /> Settings
        </li>

      </ul>
    </aside>

      <main className="main">
        <div className="box">1</div>
        <div className="box">2</div>
        <div className="box">3</div>
        <div className="box">4</div>
      </main>

      <footer className="footer">
        <div className="Maindiv">
          <div className="box1">
            <div className='Recent1'>
              <h4>Recent Book</h4>
              <button>view all</button>
            </div>
             <div className='Temps'>
              <div className='TempM'><div className='Tem'>tem</div>
              <span>Mathematics</span>
              <span>class 8</span>
              <span>May 25 2026</span></div>
              <div className='TempM'><div className='Tem'>tem</div>
              <span>Mathematics</span>
              <span>class 8</span>
              <span>May 25 2026</span></div>
              <div className='TempM'><div className='Tem'>tem</div>
              <span>Mathematics</span>
              <span>class 8</span>
              <span>May 25 2026</span></div>
              <div className='TempM'><div className='Tem'>tem</div>
              <span>Mathematics</span>
              <span>class 8</span>
              <span>May 25 2026</span></div>
              <div className='TempM'><div className='Tem'>tem</div>
              <span>Mathematics</span>
              <span>class 8</span>
              <span>May , 25 2026</span></div>
              <div className='TempM'><div className='Tem'>tem</div>
              <span>Mathematics</span>
              <span>class 8</span>
              <span>May , 25 2026</span></div>
             </div>
          </div>
         </div>
        <div className="Maindiv">
          <div className="box2">
            <div className='Recent2'>
              <h4>Active Agent</h4>
              <button>view all</button>
            </div>
            <div className='table1'>
              <table>
                  <thead>
    <tr>
      <th>Agent Name</th>
      <th>Email</th>
      <th>Last Active</th>
      <th>Book Viewed</th>
      <th>Status</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>name</td>
      <td>name</td>
      <td>name</td>
      <td>name</td>
      <td>name</td>
    </tr>

    <tr>
      <td>name</td>
      <td>name</td>
      <td>name</td>
      <td>name</td>
      <td>name</td>
    </tr>

    <tr>
      <td>name</td>
      <td>name</td>
      <td>name</td>
      <td>name</td>
      <td>name</td>
    </tr>

    <tr>
      <td>name</td>
      <td>name</td>
      <td>name</td>
      <td>name</td>
      <td>name</td>
    </tr>
  </tbody>
              </table>
            </div>
          </div>
          <div className="card">
            <div className='Recent3'>
              <h4>Top Viewed Books</h4>
              <button>view all</button>
            </div>
            <div>
              <table className='table2'>
  <tbody>
    <tr>
      <td>value</td>
      <td>value</td>
    </tr>

    <tr>
      <td>value</td>
      <td>value</td>
    </tr>

    <tr>
      <td>value</td>
      <td>value</td>
    </tr>

    <tr>
      <td>value</td>
      <td>value</td>
    </tr>

    <tr>
      <td>value</td>
      <td>value</td>
    </tr>
  </tbody>
</table>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard