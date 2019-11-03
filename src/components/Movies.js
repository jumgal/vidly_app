import React, { Component } from 'react';
import Pagination from './Pagination';
import ListGroup from './ListGroup';
import { paginate } from '../utils/Paginate';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './MoviesTable';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class Movies extends Component {

    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        sortColumn: { path: 'title', order: 'asc' }
    }

    componentDidMount() {
        const genres = [{ _id: "", name: 'All Genres' }, ...getGenres()]
        this.setState({ movies: getMovies(), genres })
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id)

        this.setState({ movies })

    }


    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies })
    }

    handlePageChange = page => {

        this.setState({ currentPage: page });

    }

    handleListChange = name => {
        const movies = this.state.movies.filter(n => n.name !== name)

        this.setState({ movies })
    }

    handeGenreSelect = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1 })

    }

    handleSort = sortColumn => {
        this.setState({ sortColumn })
    }

    getPageData = () => {

        const {
            pageSize,
            currentPage,
            sortColumn,
            selectedGenre,
            movies: allMovies
        } = this.state;

        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return {
            totalCount: filtered.length,
            data: movies
        }
    }

    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, sortColumn } = this.state;

        if (count === 0)
            return <p>The are no movies in the database</p>

        const { totalCount, data: movies } = this.getPageData()


        return (
            <div className="container">

                <div className="row">
                    <div className="col-3">
                        <ListGroup
                            items={this.state.genres}
                            selectedItem={this.state.selectedGenre}
                            onItemsSelect={this.handeGenreSelect} />
                    </div>
                    <div className="col-9">
                        <Link to="/movies/new" className="btn btn-primary" style={{ marginBottom: 20 }}>New Movie</Link>
                        <p>Showing {totalCount} movies in the database</p>
                        <MoviesTable movies={movies}
                            sortColumn={sortColumn}
                            onLike={this.handleLike}
                            onDelete={this.handleDelete}
                            onSort={this.handleSort} />
                        <Pagination
                            itemsCount={totalCount}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Movies;