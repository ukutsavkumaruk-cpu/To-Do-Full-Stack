function Task1(){

    let work = "Go to college"
    let date = "4/02/26"
     return (
      <div className="container text-center">
         <div className="row align-items-start">
           <div className="col-5">
             {work}
           </div>
           <div className="col-4">
             {date}
           </div>
           <div className="col-3">
             <button type="button" className="btn btn-delete">Delete</button>
           </div>
         </div>
       </div>
     )
}
export default Task1;
