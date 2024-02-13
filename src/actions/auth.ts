/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import create from 'zustand';

interface AccessTokenState {
  accessToken: string | null;
  setAccessToken: (newToken: string | null) => void;
}

const useAccessToken = create<AccessTokenState>((set) => ({
  accessToken: null, // 초기 상태 null
  setAccessToken: (newToken) => set({ accessToken: newToken }), // accessToken 업데이트 함수
}));

// accessToken을 가져오고 저장
const fetchAccessToken = async () => {
  const parsedHash = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = parsedHash.get('access_token');

  // accessToken 존재하면 스토어에 저장
  if (accessToken) {
    useAccessToken.setState({ accessToken });
  }
};
// OAuth
const postToOAuth = async () => {
  const { data } = await axios.post('oauth/google', { useAccessToken });
};
const getAccessToken = () => useAccessToken.getState().accessToken;
export {
  useAccessToken, fetchAccessToken, postToOAuth, getAccessToken,
};
