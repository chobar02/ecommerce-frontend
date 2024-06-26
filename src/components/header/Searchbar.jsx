import React from "react"
import { Container, Logo } from "../index"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setInput } from "../../redux/features/input/inputSlice"
import { Search } from "lucide-react"
import { ModeToggle } from "../mode-toggle"


const Searchbar = () => {
  const [query, setQuery] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSearch = () => {
    dispatch(setInput(query))
    navigate("/search")
  }

  return (
    <>
      <header>
        <Container>
          <div className="Upper flex justify-between items-center">
            <div className="logo">
              <Link to="/">
                <Logo />
              </Link>
            </div>
            <div className="search w-3/5 md:w-1/2 flex items-center">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search"
                className="dark:bg-secDark dark:text-light bg-secLight text-dark text-lg px-2 py-1 rounded-md w-full focus:outline-none"
              />

              <Search className="-ml-7 cursor-pointer" onClick={handleSearch} />
            </div>
            <div>
              <ModeToggle/>
            </div>
          </div>
        </Container>
      </header>
    </>
  )
}

export default Searchbar
