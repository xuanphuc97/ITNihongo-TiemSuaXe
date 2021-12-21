const baseUrl = "https://kamehouse.herokuapp.com";

export default {
  // uploadImg: `${baseUrl}/upload`,
  updateInfor: `${baseUrl}/users/update`,
  updatePassword: `${baseUrl}/auth/changepwd`,
  getGaragesOfUser(accountId) {
    return `${baseUrl}/api/user/${accountId}/garages`;
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
