const baseUrl = "http://localhost:8080";

export default {
  //   getAllGarages: `${baseUrl}/api/garages`,
  //   getReview: `${baseUrl}/api/review/add`,
  // uploadImg: `${baseUrl}/upload`,
  // updateInfor: `${baseUrl}/users/update`,
  // updatePassword: `${baseUrl}/auth/changepwd`,
  getReviewsOfGarage(garageId) {
    return `${baseUrl}/reviewshopid/${garageId}`;
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
