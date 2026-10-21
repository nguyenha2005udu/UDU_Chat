export type Message = { id: string; text: string; mine: boolean; time: string };
export type Chat = {
  id: string;
  name: string;
  initials: string;
  color: string;
  online: boolean;
  unread: number;
  messages: Message[];
};
export const initialChats: Chat[] = [
  {
    id: '1',
    name: 'Minh Anh',
    initials: 'MA',
    color: '#E8DFFC',
    online: true,
    unread: 2,
    messages: [
      {
        id: '11',
        text: 'Chào bạn! Dự án UDU Chat đến đâu rồi?',
        mine: false,
        time: '09:15',
      },
      {
        id: '12',
        text: 'Làm gì đó?',
        mine: true,
        time: '09:16',
      },
      {
        id: '13',
        text: 'Ê, Chiều học không vậy?',
        mine: false,
        time: '09:18',
      },
    ],
  },
  {
    id: '2',
    name: 'Nhóm thiết kế',
    initials: 'TK',
    color: '#DDF0E8',
    online: false,
    unread: 3,
    messages: [
      {
        id: '21',
        text: 'Mình vừa cập nhật bản thiết kế mới',
        mine: false,
        time: '08:45',
      },
    ],
  },
  {
    id: '3',
    name: 'Hoàng Nam',
    initials: 'HN',
    color: '#FFE6D6',
    online: true,
    unread: 0,
    messages: [
      { id: '31', text: 'Cảm ơn bạn, hẹn gặp lại!', mine: true, time: '08:30' },
    ],
  },
  {
    id: '4',
    name: 'Linh Nguyễn',
    initials: 'LN',
    color: '#DDEAFE',
    online: false,
    unread: 0,
    messages: [
      {
        id: '41',
        text: 'Cuối tuần đi cà phê nhá',
        mine: false,
        time: '07:50',
      },
    ],
  },
  {
    id: '5',
    name: 'Team UDU',
    initials: 'UD',
    color: '#FFF0C9',
    online: false,
    unread: 0,
    messages: [
      {
        id: '51',
        text: 'Chào mừng bạn đến với UDU Chat!',
        mine: false,
        time: '07:00',
      },
    ],
  },
];
