import React from "react";
import { Comment, List } from "antd";

interface PropsType {
  data: {
    author: string;
    avatar: string;
    content: string;
    createDate: string;
  }[];
}

const Comments: React.FC<PropsType> = ({ data }) => {
  return (
    <List
      dataSource={data}
      itemLayout="horizontal"
      renderItem={(item) => {
        return (
          <li>
            <Comment
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.createDate}
            />
            <Comment
              author="easyCode"
              avatar={data[0].avatar}
              content="生而为人，我很抱歉"
              datetime={data[0].createDate}
            />
          </li>
        );
      }}
    ></List>
  );
};

export default Comments;
