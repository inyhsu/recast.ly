import YOUTUBE_API_KEY from '../config/youtube.js'

var searchYouTube = (options, successCB, errorCB = null) => {
  // TODO
  $.ajax({
    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${options.max}&q=${options.query}&key=${options.key}`,
    type: 'GET',
    contentType: 'application/json',

    success: function(data){
      successCB(data.items)
    },
    error: errorCB || function(error) {
      console.error('Failed to fetch messages', error);
    }
  });

};


export default searchYouTube;
