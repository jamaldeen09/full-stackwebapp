
interface CategoryCardSchema {
    url: string
    categoryName: string,
    filterFunc: () => void,
    styles: string
}

const CategoryCard = ({ url, categoryName, filterFunc,styles}: CategoryCardSchema) => {
  return (
    <div onClick={filterFunc}
      className=
      {`w-full min-w-44 md:min-w-44 midIpad:min-w-44 lg:min-w-40 rounded-2xl flex flex-col gap-3 border border-purple-500 justify-center items-center px-4 py-4
      hover:scale-105 hover:bg-purple-500 hover:text-white active:brightness-75 transition-all hover:cursor-pointer duration-300
      backdrop-blur-lg bg-purple-500/5 ${styles}`}>
        <img 
           style={{
             borderRadius: "50%"
           }}
          className="w-32 h-28 shadow-2xl backdrop-blur-lg bg-transparent"
          src={url} 
          alt={categoryName}
        />
        <p>{categoryName}</p>
    </div>
  )
}

export default CategoryCard