import { getUrlPrefix } from 'src/utils';

const BOARD_ITEM_BASE = '/board:boardId';
console.log(getUrlPrefix(BOARD_ITEM_BASE));

export const ROUTES = {
  ROOT_PAGE: '/',
  AUTH: {
    SIGN_UP: '/sing-up',
    LOGIN: '/login'
  },
  BOARDS: {
    LIST: '/boards-list',
    ITEM: BOARD_ITEM_BASE,
    SELECTED_ITEM: (boardId: string) => getUrlPrefix(BOARD_ITEM_BASE) + boardId
  },
  TASKS: {
    ITEM: '/task:taskId'
  }
};
