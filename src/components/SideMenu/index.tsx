import React from "react";
import styles from "./index.module.css";
import { sideMenuList } from "../../mock/mock";
import { Menu } from "antd";
import { GiftOutlined } from "@ant-design/icons";

/**
 *侧边菜单栏
 *
 * @return {*}
 */
const SideMenu: React.FC = (props: any) => {
  return (
    <>
      <Menu mode="vertical" className={styles["side-menu"]}>
        {sideMenuList.map((item, index, array) => {
          return (
            <Menu.SubMenu
              key={`side-menu${index}`}
              title={
                <span>
                  <GiftOutlined />
                  {item.title}
                </span>
              }
            >
              {item.subMenu.map((sm, smIndex, snArray) => {
                return (
                  <Menu.SubMenu
                    key={`${item.title}-${sm.title}-${smIndex}`}
                    title={
                      <span>
                        <GiftOutlined />
                        {sm.title}
                      </span>
                    }
                  >
                    {sm.subMenu.map((sms, smsIndex) => {
                      return (
                        <Menu.Item key={`${item.title}-${sms}-${smsIndex}`}>
                          {
                            <span>
                              <GiftOutlined />
                              {sms}
                            </span>
                          }
                        </Menu.Item>
                      );
                    })}
                  </Menu.SubMenu>
                );
              })}
            </Menu.SubMenu>
          );
        })}
      </Menu>
    </>
  );
};

export default SideMenu;
