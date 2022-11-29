exports.movieRespone=(movies)=>{
    movieObj=[];
    movies.forEach(movie => {
        movieObj.push({
            name:movie.name,
            description:movie.description,
            casts:movie.casts,
            trailerUrls:movie.trailerUrls,
            posterUrls:movie.posterUrls,
            language:movie.language,
            releaseDate:movie.releaseDate,
            releaseStatus:movie.releaseStatus,
            imbRating:movie.imbRating,
            genre:movie.genre,
        });
    });
    return movieObj;
}