const baseUrl = "https://kamehouse.herokuapp.com";

export default {
  // getPost: `${baseUrl}/garage`,
  // uploadImg: `${baseUrl}/upload`,
  //   updateInfor: `${baseUrl}/auth/user/update/info`,
  //   updatePassword: `${baseUrl}/auth/changepwd`,
  getGarageInfo(id) {
    return `${baseUrl}/api/garage/${id}`;
  },
  getService(id) {
    return `${baseUrl}/serviceshopid/${id}`;
  },
  createGarage: `${baseUrl}/api/user/garages`,
  deleteGarage(id) {
    return `${baseUrl}/api/garages/${id}`;
  },
  updateGarage(id) {
    return `${baseUrl}/api/garages/${id}/update`;
  },

  deleteService(id) {
    return `${baseUrl}/service/${id}`;
  },

  createService(id) {
    return `${baseUrl}/createService/${id}`;
  },
  updateService(id) {
    return `${baseUrl}/service/${id}/edit`;
  },

  //     getDraftsOfUser: `${baseUrl}/user/drafts`,
  //     deleteDraft(postId){
  //         return  `${baseUrl}/post/${postId}`
  //     },
  //     getUserInfor(id) {
  //         return `${baseUrl}/user/${id}`
  //     },
  //     followUser(id) {
  //         return  `${baseUrl}/user/follow/${id}`
  //     },
  //     getPostsOfAuthor(accountId){
  //         return `${baseUrl}/user/posts/${accountId}`
  //     },
  //     loadFollowerList(account_id) {
  //         return  `${baseUrl}/user/${account_id}/follow`
  //     }
};
