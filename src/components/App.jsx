import exampleVideoData from '../data/exampleVideoData.js';
import VideoList from './VideoList.js';
import VideoListEntry from './VideoListEntry.js';
import VideoPlayer from './VideoPlayer.js';
import searchYouTube from '../lib/searchYouTube.js';
import Search from './Search.js';
import YOUTUBE_API_KEY from '../config/youtube.js';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      video:exampleVideoData[0],
      videos:exampleVideoData,
      inputVal: ''
    }
  }

  clickTrack(event){
    this.setState({video: event})
  }

  // componentDidMount(){
  //   searchYouTube({ key: YOUTUBE_API_KEY, query:'cat', max: 5}, (data) => {
  //     console.log(data);
  //     this.setState({videos:data, video:data[0]})
  //   })
  // }
  handleSubmit(event) {

    console.log(this.state.inputVal)
    searchYouTube({ key: YOUTUBE_API_KEY, query: this.state.inputVal, max: 5}, (data) => {
      this.setState({videos:data})
    })

  }

  onChange(event){
    event.preventDefault();
    this.setState({inputVal: event.target.value}, this.handleSubmit.bind(this));
  }

  render(){
    return (
      <div>
    <nav className="navbar">
      <div className="col-md-6 offset-md-3">
        <Search handleSubmit={this.handleSubmit.bind(this)} onChange={this.onChange.bind(this)} value={this.state.inputVal}/>
      </div>
    </nav>
    <div className="row">
      <div className="col-md-7">
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
