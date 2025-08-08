export const SkeletonLoading = () =>{
     return (
       <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
         {new Array(6).fill(0).map((_, index) => (
           <div
             key={index}
             className="animate-pulse bg-orange-100 border border-orange-200 rounded-xl p-4 shadow-lg"
           >
             {/* Skeleton for the task title and category */}
             <div className="mb-3">
               <div className="h-4 bg-orange-200 rounded w-3/4 mb-2"></div>
               <div className="h-3 bg-orange-200 rounded w-1/4"></div>
             </div>

             {/* Skeleton for the status badge */}
             <div className="mb-3">
               <div className="h-4 bg-orange-200 rounded w-1/4"></div>
             </div>

             {/* Skeleton for the buttons */}
             <div className="flex space-x-1 pt-2 border-t border-gray-200">
               <div className="h-7 bg-orange-200 rounded w-1/3"></div>
               <div className="h-7 bg-orange-200 rounded w-1/3"></div>
               <div className="h-7 bg-orange-200 rounded w-1/3"></div>
             </div>
           </div>
         ))}
       </div>
     );
};

