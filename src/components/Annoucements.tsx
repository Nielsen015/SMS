const Annoucements = () => {
  return (
    <div className='bg-white p-4 rounded-md'>
        <div className='flex items-center justify-between'>
            <h1 className="text-xl font-semibold">Annoucements</h1>
            <span className="text-xs text-gray-400 cursor-pointer">View All</span>
        </div>
        <div className='flex flex-col gap-4 mt-4'>
            <div className='bg-skyLight rounded-md p-4'>
                <div className='flex items-center justify-between'>
                    <h2 className="font-medium">School Opening Dates</h2>
                    <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">2025-01-01</span>
                </div>
                <p className='text-sm text-gray-400 mt-1'>
                        This is a sample announce text that will be used for school opening dates,please note that all classes resume ealry
                    </p>
            </div>
            <div className='bg-purpleLight rounded-md p-4'>
                <div className='flex items-center justify-between'>
                    <h2 className="font-medium">School Opening Dates</h2>
                    <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">2025-01-01</span>
                </div>
                <p className='text-sm text-gray-400 mt-1'>
                        This is a sample announce text that will be used for school opening dates,please note that all classes resume ealry
                    </p>
            </div>
            <div className='bg-yellowLight rounded-md p-4'>
                <div className='flex items-center justify-between'>
                    <h2 className="font-medium">School Opening Dates</h2>
                    <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">2025-01-01</span>
                </div>
                <p className='text-sm text-gray-400 mt-1'>
                        This is a sample announce text that will be used for school opening dates,please note that all classes resume ealry
                    </p>
            </div>
        </div>
    </div>
  )
}

export default Annoucements