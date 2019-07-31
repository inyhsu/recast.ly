import exampleVideoData from '../data/exampleVideoData.js';
import VideoList from './VideoList.js';
import VideoListEntry from './VideoListEntry.js';
import VideoPlayer from './VideoPlayer.js';
import searchYouTube from '../lib/searchYouTube.js';
import YOUTUBE_API_KEY from '../config/youtube.js';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      video:exampleVideoData[0],
      videos:exampleVideoData,
      inputVal: undefined
    }
  }

  clickTrack(event){
    this.setState({video: event})
  }

  // componentDidMount() {
  //   if(this.state.inputVal !== undefined){
  //     searchYouTube({ key: YOUTUBE_API_KEY, query: this.state.inputVal, max: 5}, (data) => {
  //       console.log('helloooo', data)
  //     })
  //   }
  // }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.inputVal);
    event.preventDefault();
    searchYouTube({ key: YOUTUBE_API_KEY, query: this.state.inputVal, max: 5}, (data) => {
      this.setState({videos:data})
    })

  }

  onChange(event){
    event.preventDefault();
    this.setState({inputVal: event.target.value})
  }

  render(){
    return (
      <div>
    <nav className="navbar">
      <div className="col-md-6 offset-md-3">
        <div><h5><em>search</em> view goes here</h5></div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input className="searchQuery" type="text" value={this.state.inputVal} onChange= {this.onChange.bind(this)}></input>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </nav>
    <div className="row">
      <div className="col-md-7">
        <div><h5><em >videoPlayer</em> view goes here</h5></div>
        <VideoPlayer video={this.state.video}/>
      </div>
      <div className="col-md-5">
      <VideoList clickTrack={this.clickTrack.bind(this)} videos={this.state.videos} />
      </div>
    </div>
  </div>
    )
  }
}


// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
