import React from "react";
import styles from "./index.module.css";
import logo from "../../logo.svg";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { LanguageState } from "../../store/reducers/language";
import { createChangeLanguageReducer } from "../../store/actions/language";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

interface languageState extends LanguageState {}

const Header: React.FC<languageState | any> = () =>
  // {language, changeLanguage,}
  {
    const history = useHistory();

    const { t } = useTranslation();
    // 函数式组件的mapStateToProps
    const { language } = useSelector((state: any) => {
      return {
        language: state.language,
      };
    }, shallowEqual);

    // 获取dispatch
    const dispatch = useDispatch();
    const changeLanguage = (num) => {
      dispatch(createChangeLanguageReducer(num));
    };

    // const [Language, setLanguage] = useState(language.language);

    return (
      <>
        <div className={styles["app-header"]}>
          {/* top-header */}
          <div className={styles["top-header"]}>
            <div className={styles.inner}>
              <Typography.Text>{t("header.slogan")}</Typography.Text>
              <Dropdown.Button
                style={{ marginLeft: 15 }}
                overlay={
                  <Menu>
                    {language.languageList.map((item, index, array) => {
                      return (
                        <Menu.Item
                          key={item.code}
                          onClick={() => {
                            changeLanguage(item.code);
                            // setLanguage(item.code);
                          }}
                        >
                          {item.name}
                        </Menu.Item>
                      );
                    })}
                  </Menu>
                }
                icon={<GlobalOutlined />}
              >
                {language.language === "zh" ? "中文" : "English"}
              </Dropdown.Button>
              <Button.Group className={styles["button-group"]}>
                <Button>{t("header.register")}</Button>
                <Button>{t("header.signin")}</Button>
              </Button.Group>
            </div>
          </div>
          <Layout.Header className={styles["main-header"]}>
            <img src={logo} alt="logo" className={styles["App-logo"]} />
            <Typography.Title level={3} className={styles.title}>
              {t("header.title")}
            </Typography.Title>
            <Input.Search
              placeholder={"请输入旅游目的地、主题、或关键字"}
              className={styles["search-input"]}
              onSearch={(keywords) => history.push("/Search/" + keywords)}
            />
          </Layout.Header>
        </div>
        <Menu mode={"horizontal"} className={styles["main-menu"]}>
          <Menu.Item key={1}>{t("header.home_page")}</Menu.Item>
          <Menu.Item key={2}>{t("header.weekend")}</Menu.Item>
          <Menu.Item key={3}>{t("header.group")}</Menu.Item>
          <Menu.Item key="4"> {t("header.backpack")} </Menu.Item>
          <Menu.Item key="5"> {t("header.private")} </Menu.Item>
          <Menu.Item key="6"> {t("header.cruise")} </Menu.Item>
          <Menu.Item key="7"> {t("header.hotel")}</Menu.Item>
          <Menu.Item key="8"> {t("header.local")} </Menu.Item>
          <Menu.Item key="9"> {t("header.theme")} </Menu.Item>
          <Menu.Item key="10"> {t("header.custom")} </Menu.Item>
          <Menu.Item key="11"> {t("header.study")} </Menu.Item>
          <Menu.Item key="12"> {t("header.visa")} </Menu.Item>
          <Menu.Item key="13"> {t("header.enterprise")} </Menu.Item>
          <Menu.Item key="14"> {t("header.high_end")} </Menu.Item>
          <Menu.Item key="15"> {t("header.outdoor")} </Menu.Item>
          <Menu.Item key="16"> {t("header.insurance")} </Menu.Item>
        </Menu>
      </>
    );
  };

// const mapStateToProps = (state) => {
//   return {
//     language: state.language,
//   };
// };

// const mapDispatchToProps = {
//   changeLanguage: createChangeLanguageReducer,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Header);

export default Header;
