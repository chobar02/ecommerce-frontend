import React, { useEffect, useState } from "react"
import { Container } from "../index"
import { NavLink, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Button } from "../ui/button"
import { useToast } from "../ui/use-toast"
import { Loader2, Upload, User } from "lucide-react"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/features/auth/authSlice.js"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"
import { Separator } from "../ui/separator"
import axiosInstance from "@/utils/axiosConfig"

const LowerNavbar = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const user = useSelector((state) => state.auth.data)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(authStatus)
  const [isSidebar, setIsSidebar] = useState(false)

  const { toast } = useToast()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setIsAuthenticated(authStatus)
  }, [authStatus])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    setIsAuthenticated(false)
    try {
      navigate("/")
      const response = await axiosInstance.post("users/logout")
      dispatch(logout())
      toast({
        title: "Success",
        description: response.data.message,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while logging out",
      })
    } finally {
      setIsLoggingOut(false)
    }
  }

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Categories",
      slug: "/allcategories",
      active: isAuthenticated,
    },
    {
      name: "Saved",
      slug: "/cart",
      active: isAuthenticated,
    },
    {
      name: "About",
      slug: "/about",
      active: true,
    },
  ]

  const closeNavbar = () => {
    setIsSidebar(false)
  }

  return (
    <Container>
      <div onClick={() => setIsSidebar(!isSidebar)} className="md:hidden w-fit">
        <Menu />
      </div>
      <nav
        className={`flex justify-between md:items-center md:flex-row flex-col w-1/2  gap-10 pl-3 absolute rounded-md md:w-full z-50 md:dark:bg-dark md:bg-light md:gap-0 md:static md:rounded-none md:pl-0 py-3 md:py-0 dark:bg-secDark bg-secLight ${isSidebar ? "tanslate-x-0" : "translate-x-[-114%]"} md:translate-x-0 transition-transform duration-300 ease-in-out shadow-sm md:shadow-none dark:shadow-black`}
      >
        {isAuthenticated && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <img
                
                src={user?.avatar ? user.avatar : "/images/default-user.png"}
                alt="user-profile"
                className="cursor-pointer hover:bg-gray-300 duration-300 rounded-full p-1 w-11 h-11 object-cover"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <NavLink to={`/${user.username}`}>
                <DropdownMenuItem className="cursor-pointer" onClick={closeNavbar}>
                  <User />
                  <span>Profile</span>
                </DropdownMenuItem>
              </NavLink>

              <DropdownMenuSeparator />
              <NavLink to="/upload">
                <DropdownMenuItem className="cursor-pointer" onClick={closeNavbar}>
                  <Upload />
                  <span>Upload</span>
                </DropdownMenuItem>
              </NavLink>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* add drop down menu and make video */}
        <ul className="flex gap-4 md:justify-center md:items-center md:flex-row flex-col">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name} onClick={closeNavbar}>
                <NavLink
                  to={item.slug}
                  className={({ isActive }) =>
                    `md:text-lg font-semibold ${
                      isActive ? "border-solid border-b-2 border-gray-400" : ""
                    } pb-1`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ) : null
          )}
        </ul>
        {isAuthenticated ? (
          <div className="mt-24 md:mt-0">
            <Button
              variant="outline"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <>
                  <span>
                    <Loader2 className="animate-spin" />
                  </span>{" "}
                  Logging out
                </>
              ) : (
                "Logout"
              )}
            </Button>
          </div>
        ) : (
          <div className="flex md:flex-row flex-col md:items-center justify-center gap-3">
            <NavLink to="/sign-in" onClick={closeNavbar}>
              <Button variant="outline">Log-in</Button>
            </NavLink>
            <NavLink to="/sign-up" onClick={closeNavbar}>
              <Button variant="outline">Sign-up</Button>
            </NavLink>
          </div>
        )}
      </nav>
      <Separator className="my-5" />
    </Container>
  )
}

export default LowerNavbar
