import React from "react";
import { Layout, Typography } from "antd";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout.Footer>
      <Typography.Title level={3} style={{ textAlign: "center" }}>
        {/* 版权所有 @ React 旅游网 */}
        {t("footer.detail")}
      </Typography.Title>
    </Layout.Footer>
  );
};

export default Footer;
