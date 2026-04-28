const API_KEY = "af76da31a4a2bf37519807fec7c81a12";
const img_base = "https://image.tmdb.org/t/p/w500";

function App(){
    const [watchlistcat,setwatchlistcat]=React.useState("All");
    const [status,setstatus] = React.useState("none")
    const [notfound,setnotfound] = React.useState(false);
    const [watchlist, setwatchlist] = React.useState(() => {
    const saved = localStorage.getItem("movie");
    return saved ? JSON.parse(saved) : [];
});
    const [searchtxt,setsearchtxt] = React.useState("");
    const [movie, setMovie] = React.useState(null);

    React.useEffect(()=>{
        localStorage.setItem("movie", JSON.stringify(watchlist));
    },[watchlist]);

    React.useEffect(()=>{
    if (!movie) return;

    if (status !== "none") {
        setwatchlist(prev => [...prev, { ...movie, category: status }]);
    } else {
        setwatchlist(prev => prev.filter(m => m.title !== movie.title));
    }
}, [status]);

    React.useEffect(()=>{
        const saved = localStorage.getItem("movie");
        if(saved) setwatchlist(JSON.parse(saved));
    },[]);

    React.useEffect(()=>{
        setstatus("none");
    },[movie]);

    async function finder(title){
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}`;
        let response = await fetch(url);
        let data = await response.json();

        if(data.results.length===0){
            setnotfound(true);
            setMovie(null);
            return;
        }
        setnotfound(false);

        if (data.results && data.results.length > 0) {
        const firstResult = data.results[0];
        const id = firstResult.id;
        url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
        const url1 = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits`;
        const response1 = await fetch(url1);
        const data1 = await response1.json();
        response = await fetch(url);
        data = await response.json();
        const movieinfo = {
            title: data.title,
            summary: data.overview,
            year: data.release_date?.split('-')[0],
            rating: data.vote_average,
            posterUrl: `${img_base}${data.poster_path}`,
            genres: data1.genres.map(g => g.name),
            cast: data1.credits.cast.slice(0, 5).map(a => a.name),
            director: data1.credits.crew.find(p => p.job === "Director")?.name,
            category:status
        };
        setMovie(movieinfo);
        }
    }

    return(
        <div className="container">


            <div className="header">
                <h1>The WatchList App</h1>
            </div>


            <div className="searchlist">
                <div className="search-box">
                    <input value={searchtxt} type="text" placeholder="Search movies..." onChange={(e)=>{setsearchtxt(e.target.value)}}/>
                    <button onClick={()=>{finder(searchtxt); setsearchtxt("");}}>
                    <img src="https://tse3.mm.bing.net/th/id/OIP.Yzg9jXBJMDoKOMqc0ZV-dQHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3" alt="search" />
                    </button>
                    <hr/><br/>
                </div>  
                {notfound&&(<h3>No results match..</h3>)}
                {movie&&(<div>
                    <br/><hr/>
                    <h3>{movie.title}</h3>
                    
                    <div className="parent2">
                        <div className="div11"><img id="poster" src={movie.posterUrl} /></div>
                        <div className="div21"><h3>Release year: {movie.year}</h3><br/></div>
                        <div className="div31"><h3>Director: {movie.director}</h3><br/></div>
                        <div className="div41"><h3>Genre: {movie.genres.join(", ")}</h3><br/></div>
                        <div className="div51"><h3>Rating as per TMDb: {movie.rating}</h3><br/></div>
                    </div>
                        
                    <h3>Overview: {movie.summary}</h3>
                    <h3>Cast: {movie.cast.join(", ")}</h3><br/>
                    <label>Status</label>
                    <select value={status} onChange={(e)=>{
                        const newval = e.target.value;
                        const result = confirm("Are you sure?");
                        if(result){
                            setstatus(newval);
                        }
                    }}>
                        <option value="none">None</option>
                        <option value="watching">Watching</option>
                        <option value="finished">Finished</option>
                        <option value="to watch">Plan to watch</option>
                        <option value="dropped">Dropped</option>
                    </select>
                </div>)}

            </div>

            <div className="watchlist">
                <h1>Watchlist</h1>
                <div className="parent1">
                    <div className="div1"><button onClick={()=>setwatchlistcat("All")}>All</button></div>
                    <div className="div2"><button onClick={()=>setwatchlistcat("finished")}>Finished</button></div>
                    <div className="div3"><button onClick={()=>setwatchlistcat("watching")}>Watching</button></div>
                    <div className="div4"><button onClick={()=>setwatchlistcat("to watch")}>To watch</button></div>
                    <div classNam="div5"><button onClick={()=>setwatchlistcat("dropped")}>Dropped</button></div>
                </div>
                <div>{
                    watchlist&&(
                        watchlist.filter(x => watchlistcat === "All" || x.category === watchlistcat.toLowerCase()).map((x) => (
                            <div key={x.title}>
                                <div><img src={x.posterUrl} width="100" /></div>
                                <div>{x.title}</div>
                                <div>{x.category}</div>
                            </div>
                            )
                        )
                    )
                    }</div>
            </div>

        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);