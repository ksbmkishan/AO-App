import { requireNativeComponent } from 'react-native';
const VideoPlayerView = requireNativeComponent('VideoPlayerView');

// Example for react-native-video as VideoPlayerView
// // import Video from 'react-native-video';


// // const VideoPlayerView = ({ src, style }) => (
// //   <Video
// //     source={{ uri: src }}
// //     style={style}
// //     resizeMode="cover"
// //     paused={true} // Typically you want videos paused until interacted with
// //     controls={true}
// //   />
// // );


export default VideoPlayerView;