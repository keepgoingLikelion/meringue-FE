import './App.css';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import UserPage from './pages/UserPage/UserPage';
import UserLog from './pages/UserLog/UserLog';
import PostDetail from './components/PostDetail/MyPostDetail';
import LikedPostDetail from './components/PostDetail/LikedPostDetail';
import TodayPostDetail from './components/PostDetail/TodayPostDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/mypage" element={<UserPage />} />
        <Route path="/mylog/:emotionType" element={<UserLog />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/myLikedPost/:postId" element={<LikedPostDetail />} />
        <Route path="/post/today" element={<TodayPostDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
