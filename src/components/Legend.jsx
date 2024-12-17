function Legend() {
     return (
       <div className="bg-white px-4 py-6 rounded-lg shadow-md">
         <h2 className="text-xl font-semibold mb-4">Legend</h2>
         <div className="flex flex-col space-y-4">
           {/* Wall */}
           <div className="flex items-center space-x-2">
             <div className="w-6 h-6 bg-gray-800 rounded"></div>
             <span>Left Click (Wall)</span>
           </div>
   
           {/* Start */}
           <div className="flex items-center space-x-2">
             <div className="w-6 h-6 bg-green-600 rounded"></div>
             <span>Shift + Left Click (Start)</span>
           </div>
   
           {/* End */}
           <div className="flex items-center space-x-2">
             <div className="w-6 h-6 bg-red-500 rounded"></div>
             <span>Right Click (End)</span>
           </div>
   
           {/* Divider */}
           <div className="border-t-2 border-gray-300 my-2"></div>
   
           {/* Visited Cell */}
           <div className="flex items-center space-x-2">
             <div className="w-6 h-6 bg-blue-100 rounded"></div>
             <span>Visited Cell</span>
           </div>
   
           {/* Current Cell */}
           <div className="flex items-center space-x-2">
             <div className="w-6 h-6 bg-yellow-400 animate-[pulse_0.75s_cubic-bezier(0.4,0,0.6,1)_infinite] shadow-xl rounded"></div>
             <span>Current Cell</span>
           </div>
   
           {/* Shortest Path */}
           <div className="flex items-center space-x-2">
             <div className="w-6 h-6 bg-blue-600 rounded"></div>
             <span>Shortest Path</span>
           </div>
         </div>
       </div>
     );
   }
   
   export default Legend;
   