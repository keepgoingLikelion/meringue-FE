import instance from '../interface/instance';

interface UserInfo {
  email: 'string',
  nickname: 'string'
}
export async function fetchUserNickname() {
  try {
    const res: { data : UserInfo } = await instance.get('user/me');
    return res.data.nickname;
  } catch (error) {
    console.error('Error fetching nickname:', error);
    return null;
  }
}

export async function updateNickname(newNickname: string) {
  try {
    const response = await instance.post('updateNickname', { newNickname });
    if (response.status === 200) {
      console.log('Nickname updated successfully');
    } else {
      console.error('Failed to update nickname');
    }
  } catch (error) {
    console.error('Error updating nickname:', error);
  }
}