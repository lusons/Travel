import React from "react";
import { Divider, Typography, Row, Col } from "antd";

import facebook from "../../assets/images/facebook-807588_640.png";
import follow from "../../assets/images/follow-826033_640.png";
import microsoft from "../../assets/images/microsoft-80658_640.png";
import icon from "../../assets/images/icon-720944_640.png";
import { useTranslation } from "react-i18next";

const imgs = [
  { src: facebook, title: "facebook" },
  { src: follow, title: "follow" },
  { src: microsoft, title: "microsoft" },
  { src: icon, title: "icon" },
];

const Paterners: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Divider orientation="left">
        <Typography.Title level={3} type="secondary">
          {t("home_page.joint_venture")}
        </Typography.Title>
      </Divider>
      <Row>
        {imgs.map((item, index, array) => {
          return (
            <Col span={6} key={index}>
              <img
                src={item.src}
                alt=""
                title={item.title}
                style={{ display: "block", width: "80%", margin: "0 auto" }}
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Paterners;
