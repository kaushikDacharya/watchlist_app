const API_KEY = "af76da31a4a2bf37519807fec7c81a12";
const img_base = "https://image.tmdb.org/t/p/w500";

function App(){
    const [selectedMovie, setSelectedMovie] = React.useState(null);
    const [watchlistcat,setwatchlistcat]=React.useState("All");
    const [status,setstatus] = React.useState("none")
    const [notfound,setnotfound] = React.useState(false);
    const [watchlist, setwatchlist] = React.useState(() => {
    const saved = localStorage.getItem("movie");
    return saved ? JSON.parse(saved) : [];
});
    const [searchtxt,setsearchtxt] = React.useState("");
    const [movie, setMovie] = React.useState([]);

    React.useEffect(()=>{
        if (!selectedMovie || status === "none") return;
            setwatchlist(prev => {
                const filtered = prev.filter(m => m.title !== selectedMovie.title);
                return [...filtered, { ...selectedMovie, category: status }];
            });
    }, [status, selectedMovie]);

    React.useEffect(()=>{
        const saved = localStorage.getItem("movie");
        if(saved) setwatchlist(JSON.parse(saved));
    },[]);

    React.useEffect(()=>{
        setstatus("none");
    },[movie]);

    async function finder(title){
        let howmany;
        let a=[];
        let id=[];
        let response1=[];
        let response2=[];
        let data1 = [];
        let data2 = [];
        let movieinfo = [];
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}`;
        let url1 = [];
        let url2 = [];
        let response = await fetch(url);
        let data = await response.json();

        if(data.results.length===0){
            setnotfound(true);
            setMovie(null);
            return;
        }
        setnotfound(false);

        if (data.results && data.results.length > 0) {

        for(let i=0;i<Math.min(data.results.length, 5);i++){
            try{
                a[i] = data.results[i];
                id[i] = a[i].id;
                url1[i] = `https://api.themoviedb.org/3/movie/${id[i]}?api_key=${API_KEY}&append_to_response=credits`;
                url2[i] = `https://api.themoviedb.org/3/movie/${id[i]}?api_key=${API_KEY}`;
                response1[i] = await fetch(url1[i]);
                data1[i] = await response1[i].json();
                response2[i] = await fetch(url2[i]);
                data2[i] = await response2[i].json();
                movieinfo[i] = {
                    title: data2[i].title,
                    summary: data2[i].overview,
                    year: data2[i].release_date?.split('-')[0],
                    rating: data2[i].vote_average,
                    posterUrl: `${img_base}${data2[i].poster_path}`,
                    genres: data1[i].genres.map(g => g.name),
                    cast: data1[i].credits.cast.slice(0, 5).map(a => a.name),
                    director: data1[i].credits.crew.find(p => p.job === "Director")?.name,
                    category:status
                };
            }catch(e){
                console.error(`Error fetching movie ${i}:`,e);
            }
        }
        setMovie(movieinfo)
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
                {movie&&movie.map((_,j)=>{return(
                    <div>
                        <br/><hr/>
                        <h3>{j+1}. {movie[j].title}</h3>
                        
                        <div className="parent2">
                            <div className="div11"><img id="poster" src={movie[j].posterUrl} /></div>
                            <div className="div21"><h3>Release year: {movie[j].year}</h3><br/></div>
                            <div className="div31"><h3>Director: {movie[j].director}</h3><br/></div>
                            <div className="div41"><h3>Genre: {movie[j].genres.join(", ")}</h3><br/></div>
                            <div className="div51"><h3>Rating as per TMDb: {movie[j].rating}</h3><br/></div>
                        </div>
                            
                        <h3>Overview: {movie[j].summary}</h3><br/>
                        <h3>Cast: {movie[j].cast.join(", ")}</h3><br/>
                        <label>Status</label>
                        <select value={status} onChange={(e)=>{
                            const newval = e.target.value;
                            const result = confirm("Are you sure?");
                            if(result){
                                setSelectedMovie(movie[j])
                                setstatus(newval);
                            }
                        }}>
                            <option value="none">None</option>
                            <option value="watching">Watching</option>
                            <option value="finished">Finished</option>
                            <option value="to watch">Plan to watch</option>
                            <option value="dropped">Dropped</option>
                        </select>
                        <br/>
                    </div>)})
                }
            </div>

            <div className="watchlist">
                <div className="fixed">
                    <h1>Watchlist</h1>
                    <div className="parent1">
                        <div className="div1"><button onClick={()=>setwatchlistcat("All")}>All</button></div>
                        <div className="div2"><button onClick={()=>setwatchlistcat("finished")}>Finished</button></div>
                        <div className="div3"><button onClick={()=>setwatchlistcat("watching")}>Watching</button></div>
                        <div className="div4"><button onClick={()=>setwatchlistcat("to watch")}>To watch</button></div>
                        <div className="div5"><button onClick={()=>setwatchlistcat("dropped")}>Dropped</button></div>
                    </div>
                    <h2>Total movies: {watchlist.filter(x => watchlistcat === "All" || x.category === watchlistcat).length}</h2>
                </div>
                <div className="watchlist-content">{
                    watchlist&&(
                        (watchlist.sort((a,b)=>a.title.localeCompare(b.title))).filter(x => watchlistcat === "All" || x.category === watchlistcat.toLowerCase()).map((x) => (
                            <div key={x.title}>
                                <div><img src={x.posterUrl} width="100" /></div>
                                <div>{x.title}</div>
                                <div>{x.category}</div>
                                <button className="remove-btn" onClick={()=>{
                                    setwatchlist(watchlist.filter(i => i.title!=x.title));
                                    setstatus("none");
                                }}>-</button>
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
