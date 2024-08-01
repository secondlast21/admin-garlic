import { FC } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { formatRouteName } from '@/utils/utils'

interface SidebarProps {
  menuList: string[]
}

const Sidebar: FC<SidebarProps> = ({ menuList }) => {
  const pathname = usePathname()

  const isActiveRoute = (menuName: string) => {
    const subRoutes = menuList

    if (menuName) {
      return pathname === menuName
    } else return subRoutes.includes(pathname)
  }

  const getMenuClass = (menuName: string) => {
    return isActiveRoute(menuName)
      ? 'bg-primary hover:bg-gray-600 text-white px-2 py-3 rounded-md mb-2'
      : 'hover:bg-gray-600 hover:text-white px-2 py-3 rounded-md mb-2'
  }

  return (
    <div className='drawer-side'>
      <label
        htmlFor='my-drawer-3'
        aria-label='close sidebar'
        className='drawer-overlay lg:hidden'
      ></label>
      <ul className='menu bg-white min-h-full w-60 py-4 px-2 pt-20 lg:pt-0'>
        {menuList.map((menu, idx) => (
          <li key={idx}>
            <Link
              href={menu}
              className={getMenuClass(menu)}
            >
              {formatRouteName(menu)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
