const baseUrl = "http://localhost:8080";

export default {
  getAllGarages: `${baseUrl}/api/garages`,
  getAllUsers: `${baseUrl}/api/users`,
  addReview: `${baseUrl}/review/add`,
  getService(id) {
    return `${baseUrl}/serviceshopid/${id}`;
  },
  getGaragesByName(name) {
    return `${baseUrl}/api/garages/name/${name}`;
  }
  // uploadImg: `${baseUrl}/upload`,
  // updateInfor: `${baseUrl}/users/update`,
  // updatePassword: `${baseUrl}/auth/changepwd`,
  // getGaragesOfUser(accountId) {
  //   return `${baseUrl}/api/user/${accountId}/garages`;
  // },
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
