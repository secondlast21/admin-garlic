import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { removeTokenFromLocalStorage } from '@/utils/tokenManager'

interface NavbarProps {
  title: string
}

const Navbar: FC<NavbarProps> = ({ title }) => {
  const router = useRouter()

  const logout = () => {
    removeTokenFromLocalStorage()
    router.push('/')
  }

  return (
    <div className='navbar bg-white sticky top-0 w-full z-10'>
      <div className='flex-none'>
        <label
          htmlFor='my-drawer-3'
          aria-label='open sidebar'
          className='btn btn-square btn-ghost lg:hidden'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='inline-block h-6 w-6 stroke-current'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16M4 18h16'
            ></path>
          </svg>
        </label>
      </div>
      <div className='mx-2 flex-1'>
        <button className='btn btn-ghost text-primary btn-sm text-lg'>{title}</button>
      </div>
      <div className='flex-none block'>
        <ul className='menu menu-horizontal'>
          <li>
            <div className='dropdown dropdown-bottom dropdown-end'>
              <div
                tabIndex={0}
                role='button'
                className='text-[#16754d] flex items-center gap-2'
              >
                <p>Admin INA-Agro</p>
                <svg
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='text-primary w-5 h-5'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M8.00016 1.33331C4.32683 1.33331 1.3335 4.32665 1.3335 7.99998C1.3335 9.93331 2.16683 11.6733 3.48683 12.8933C3.48683 12.9 3.48683 12.9 3.48016 12.9066C3.54683 12.9733 3.62683 13.0266 3.6935 13.0866C3.7335 13.12 3.76683 13.1533 3.80683 13.18C3.92683 13.28 4.06016 13.3733 4.18683 13.4666C4.2335 13.5 4.2735 13.5266 4.32016 13.56C4.44683 13.6466 4.58016 13.7266 4.72016 13.8C4.76683 13.8266 4.82016 13.86 4.86683 13.8866C5.00016 13.96 5.14016 14.0266 5.28683 14.0866C5.34016 14.1133 5.3935 14.14 5.44683 14.16C5.5935 14.22 5.74016 14.2733 5.88683 14.32C5.94016 14.34 5.9935 14.36 6.04683 14.3733C6.20683 14.42 6.36683 14.46 6.52683 14.5C6.5735 14.5133 6.62016 14.5266 6.6735 14.5333C6.86016 14.5733 7.04683 14.6 7.24016 14.62C7.26683 14.62 7.2935 14.6266 7.32016 14.6333C7.54683 14.6533 7.7735 14.6666 8.00016 14.6666C8.22683 14.6666 8.4535 14.6533 8.6735 14.6333C8.70016 14.6333 8.72683 14.6266 8.7535 14.62C8.94683 14.6 9.1335 14.5733 9.32016 14.5333C9.36683 14.5266 9.4135 14.5066 9.46683 14.5C9.62683 14.46 9.7935 14.4266 9.94683 14.3733C10.0002 14.3533 10.0535 14.3333 10.1068 14.32C10.2535 14.2666 10.4068 14.22 10.5468 14.16C10.6002 14.14 10.6535 14.1133 10.7068 14.0866C10.8468 14.0266 10.9868 13.96 11.1268 13.8866C11.1802 13.86 11.2268 13.8266 11.2735 13.8C11.4068 13.72 11.5402 13.6466 11.6735 13.56C11.7202 13.5333 11.7602 13.5 11.8068 13.4666C11.9402 13.3733 12.0668 13.28 12.1868 13.18C12.2268 13.1466 12.2602 13.1133 12.3002 13.0866C12.3735 13.0266 12.4468 12.9666 12.5135 12.9066C12.5135 12.9 12.5135 12.9 12.5068 12.8933C13.8335 11.6733 14.6668 9.93331 14.6668 7.99998C14.6668 4.32665 11.6735 1.33331 8.00016 1.33331ZM4.70683 11.3133C4.4135 11.5066 4.1735 11.7333 3.9735 11.98C2.96016 10.9533 2.3335 9.54665 2.3335 7.99998C2.3335 4.87331 4.8735 2.33331 8.00016 2.33331C11.1268 2.33331 13.6668 4.87331 13.6668 7.99998C13.6668 9.54665 13.0402 10.9533 12.0268 11.98C11.8335 11.7333 11.5868 11.5066 11.2935 11.3133C9.48683 10.1 6.52683 10.1 4.70683 11.3133Z'
                    fill='currentColor'
                  />
                  <path
                    d='M5.5 7.11981C5.5 8.47315 6.56 9.57315 7.96667 9.61315C7.98667 9.61315 8.01333 9.61315 8.02667 9.61315C8.04 9.61315 8.06 9.61315 8.07333 9.61315C8.08 9.61315 8.08667 9.61315 8.08667 9.61315C9.43333 9.56648 10.4933 8.47315 10.5 7.11981C10.5 5.73981 9.38 4.61981 8 4.61981C6.62 4.61981 5.5 5.73981 5.5 7.11981Z'
                    fill='currentColor'
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow'
              >
                <li>
                  <button
                    onClick={logout}
                    className='text-[#16754d] hover:bg-[#16754d] hover:text-white'
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
