export default function Navbar(){
    return <>
     <nav class="navbar navbar-dark bg-dark">
       
          <h2 style={{color:"white"}}>
            <i class="fa fa-cloud" aria-hidden="true"></i> Cloud Management App
          </h2>
     
        <form class="form-inline">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search clusters"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </nav></>
}