
interface NavSchema {
    title: string
}

const Navbar = ({ title }: NavSchema) => {
  return (
    <nav 
      className="border-blue-500 flex justify-between px-6 py-2 
      iphone:px-4
      sm:px-10"
    >

        {/* Logo + Name */}
        <div className="flex gap-4 items-center">
            <img 
              className="w-9 h-9"
              src="https://bcassetcdn.com/public/blog/wp-content/uploads/2023/05/22145512/letter-p-with-phoenix-logo-design-by-roniphics-dribbble.png" 
              alt="Logo" 
            />
            <h1 className="font-bold text-md italic">Jonz</h1>
        </div>

        {/* Information */}
        <div className="flex justify-center items-center text-md">
            <p>{title || "Sign up"}</p>
        </div>
    </nav>
  )
}

export default Navbar