const baseUrl = "http://localhost:8080/api";

export default {
  // getPost: `${baseUrl}/garage`,
  // uploadImg: `${baseUrl}/upload`,
  //   updateInfor: `${baseUrl}/auth/user/update/info`,
  //   updatePassword: `${baseUrl}/auth/changepwd`,
  getGarageInfo(id) {
    return `${baseUrl}/garage/${id}`;
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
