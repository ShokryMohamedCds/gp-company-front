export interface Posts {
  showcomment?: boolean;
  isLiked?: boolean;
  _id: string;
  text: string;
  reactions: {
    user: string;
    _id: string;
  }[];
  comments: {
    text: string;
    userId: string;
    name: string;
    email: string;
    image?: string;
    _id: string;
  }[];
  user: {
    _id: string;
    name: string;
    email: string;
    image: string;
  };
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  commentsUsers: {
    _id: string;
    name: string;
    email: string;
    image: string;
  }[];
  commentsCompany: {
    text: string;
    userId: string;
    name: string;
    email: string;
    image?: string;
    _id: string;
  }[];
  id: string;
}
