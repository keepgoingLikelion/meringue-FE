import './App.css';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import axios from 'axios';
import MainPage from './pages/MainPage/MainPage';
import UserPage from './pages/UserPage/UserPage';
import UserLog from './pages/UserLog/UserLog';
import PostDetail from './components/PostDetail/MyPostDetail';
import LikedPostDetail from './components/PostDetail/LikedPostDetail';
import TodayPostDetail from './components/PostDetail/TodayPostDetail';
import { useAccessToken } from './utils/getToken';
import { useTodayPostStore } from './actions/todayPost';
import { LuLoader } from 'react-icons/lu';
import './styles/Common.css';
import { useEffect } from 'react';

axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.withCredentials = true;
axios.defaults.headers.common.Authorization = `Bearer ${useAccessToken()}`;

function App() {
  const { todayPost, fetchTodayPost } = useTodayPostStore();
  useEffect(() => {
    fetchTodayPost();
  }, []);
  if(!todayPost){
    return (
      <div>
        <LuLoader style={{ color: 'lightgrey', width: '30px', height: '30px' }} />
      </div>
    );
  }
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<div><MainPage content={todayPost.content} type={todayPost.emotionType}/></div>} />
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
