import { observable, computed, action, decorate } from 'mobx';

export default observable({
  requests: [],
  addRequest(data) {
    this.requests.push({
      _id: data.data.debugId,
      request: data,
    });
  },
  updateRequestResponse(data) {
    const req = this.requests.find(item => item._id === data.data.debugId);
    if (!req) return;
    req.response = data;
  },
  get resloved() {
    return this.requests.filter(item => item.response);
  },
  get pending() {
    return this.requests.filter(item => !item.response);
  },
});
