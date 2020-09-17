import React from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import Movie from '../components/Movie'
import "./Home.css"


//coponent는 html을 반환하는 함수이다.
//react는 하나의 component만을 rendering해야하기 때문에 
//index.js에 컴포넌트를 추가하면 안된다.




// const foodLike = [
//   {
//     id: 1,
//     name: "Kimchi",
//     image:
//       "http://aeriskitchen.com/wp-content/uploads/2008/09/kimchi_bokkeumbap_02-.jpg",
//     rating: 5
//   },
//   {
//     id: 2,
//     name: "Samgyeopsal",
//     image:
//       "https://3.bp.blogspot.com/-hKwIBxIVcQw/WfsewX3fhJI/AAAAAAAAALk/yHxnxFXcfx4ZKSfHS_RQNKjw3bAC03AnACLcBGAs/s400/DSC07624.jpg",
//     rating: 10
//   },
//   {
//     id: 3,
//     name: "Bibimbap",
//     image:
//       "http://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/recipes/ck/12/03/bibimbop-ck-x.jpg?itok=RoXlp6Xb",
//     rating: 6
//   },
//   {
//     id: 4,
//     name: "Doncasu",
//     image:
//       "https://s3-media3.fl.yelpcdn.com/bphoto/7F9eTTQ_yxaWIRytAu5feA/ls.jpg",
//     rating: 7
//   },
//   {
//     id: 5,
//     name: "Kimbap",
//     image:
//       "http://cdn2.koreanbapsang.com/wp-content/uploads/2012/05/DSC_1238r-e1454170512295.jpg",
//     rating: 4
//   }
// ]

// function Food(props) {
//   return (
//     <div>
//       <h1>i like {props.name}</h1>
//       <img src={props.image} alt={props.name} />
//       <h1>raitng:{props.rating}</h1>
//     </div>
//   )
// }

// //prop의 타입 확인 할 수 있다..
// Food.propTypes = {
//   name: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
//   rating: PropTypes.number.isRequired
// }


// function App() {
//   return (
//     <div>
//       {foodLike.map(c => {
//         return <Food key={c.id} name={c.name} image={c.image} rating={c.rating} />
//       })}
//     </div>
//   );
// }





// //life cycle constructor가 먼저 호출되고 그다음 render가 호출된다.
// //render이후 component did mount가 호출된다.
// class App extends React.Component {
//   constructor(props) {
//     super(props)
//     console.log('hello')
//   }
//   state = {
//     count: 0
//   };
//   add = () => {
//     //이렇게하면 react는 render function을 refresh하지 않는다.
//     //this.state.count = + 1
//     //결론적으로 setstate()를 호출할때 마다 react는 re render한다.
//     this.setState(current => ({ count: current.count + 1 }))
//   };

//   minus = () => {
//     this.setState({ count: this.state.count - 1 })
//   };

//   componentDidMount() {
//     console.log("component did mount")
//   }

//   //클릭시 render 호출되면서 componentdidupdate호출된다.
//   //setstate를 호출했기 때문에 render도 다시 실행됨
//   componentDidUpdate() {
//     console.log('i am update')
//   }

//   componentWillUnmount() {
//     console.log('delete')
//   }
//   //react component를 상속 받았기 때문에 render()를 가지고 있다.
//   //react는 자동적으로 class component의 render method를 실행한다.
//   render() {
//     console.log('render')
//     return (
//       <div>
//         <h1> the number is {this.state.count}</h1>
//         {/*add()안하는 이유는 add함수가 즉시 호출되는게 아니라 클릭했을때 호출되야 되기 때문임  */}
//         <button onClick={this.add}>ADD</button>
//         <button onClick={this.minus}>MINUS</button>
//       </div>
//     )
//   }
// }


class Home extends React.Component {
  state = {
    isLoading: true,
    movies: []
  }

  getMovies = async () => {
    const { data: { data: { movies } } } = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating')
    //console.log(movies)
    // this.setState({ movies: movies }) == 밑에거와동일
    this.setState({ movies, isLoading: false })
  }
  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
            <div className="movies">
              {movies.map(movie => (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
              ))}
            </div>
          )}
      </section>
    )
  }
}

// ///ES6안쓴다면??
// class App extends React.Component {
//   state = {
//     isLoading: true,
//     moviesArr: []
//   }

//   getMovies = async () => {
//     const movies = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating')
//     this.setState({ moviesArr: movies.data.data.movies, isLoading: false })
//   }
//   componentDidMount() {
//     this.getMovies()
//   }
//   render() {
//     console.log('render')
//     const { isLoading, moviesArr } = this.state;
//     return (
//       <div>
//         {isLoading ? 'loading' :
//           moviesArr.map(movie => {
//             return <Movie title={movie.title} />
//           })}
//       </div>
//     )
//   }
// }

export default Home;
