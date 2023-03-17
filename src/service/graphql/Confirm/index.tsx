import { gql } from '../../../__generated__';

export const CONFIRM_EMAIL = gql(`
mutation EditActive($editActiveId: ID) {
  editActive(id: $editActiveId) {
    message
    status
  }
}`);
