/**
 * SPDX-FileCopyrightText: 2022 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { AxiosResponse } from '@nextcloud/axios';
import { httpInstance, createCancelTokenHandler } from './HttpApi.js';
import { Comment } from '../../stores/comments.js';

const comments = {
  getComments(
    inquiryId: number
  ): Promise<AxiosResponse<{ comments: Comment[] }>> {
    return httpInstance.request({
      method: 'GET',
      url: `inquiry/${inquiryId}/comments`,
      params: { time: +new Date() },
      cancelToken:
        cancelTokenHandlerObject[
          this.getComments.name
        ].handleRequestCancellation().token
    });
  },
  addComment(
    inquiryId: number,
    message: string,
    confidential: boolean = false
  ): Promise<AxiosResponse<{ comment: Comment }>> {
    return httpInstance.request({
      method: 'POST',
      url: `inquiry/${inquiryId}/comment`,
      data: { message, confidential },
      params: { time: +new Date() },
      cancelToken:
        cancelTokenHandlerObject[
          this.addComment.name
        ].handleRequestCancellation().token
    });
  },

  deleteComment(
    commentId: number
  ): Promise<AxiosResponse<{ comment: Comment }>> {
    return httpInstance.request({
      method: 'DELETE',
      url: `comment/${commentId}`,
      params: { time: +new Date() },

      cancelToken:
        cancelTokenHandlerObject[
          this.deleteComment.name
        ].handleRequestCancellation().token
    });
  },
  restoreComment(
    commentId: number
  ): Promise<AxiosResponse<{ comment: Comment }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `comment/${commentId}/restore`,
      params: { time: +new Date() },

      cancelToken:
        cancelTokenHandlerObject[
          this.restoreComment.name
        ].handleRequestCancellation().token
    });
  }
};

const cancelTokenHandlerObject = createCancelTokenHandler(comments);

export default comments;
