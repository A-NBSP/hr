const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.user_info.username,
  userId: state => state.user.user_info.userIds,
  staffPhoto: state => state.user.user_info.staffPhoto,
  Timestamp: state => state.user.Timestamp
}
export default getters
