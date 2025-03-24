const Pagination = () => {
  return (
    <div className='p-4 flex items-center justify-start gap-2  md:justify-between text-gray-500'>
        <button disabled className="py-1 px-1 md:py-2 md:px-4 rounded-full md:rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed">Prev</button>
        <div className='flex items-center gap-2 text-base'>
            <button className="px-1 md:px-2 rounded-full md:rounded-sm bg-sky">1</button>
            <button className="px-1 md:px-2 rounded-full md:rounded-sm">2</button>
            <button className="px-1 md:px-2 rounded-full md:rounded-sm">3</button>
            ...
            <button className="px-1 md:px-2 rounded-sm">10</button>
        </div>
        <button className="py-1 px-1 md:py-2 md:px-4 rounded-full md:rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
    </div>
  )
}

export default Pagination