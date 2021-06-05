import React, { useEffect } from "react";
import styles from "./index.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FilterArea } from "../../components/filter";
import { ProductList } from "../../components/productList";
import { useParams, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { searchProduct } from "../../store/toolkit/searchSlice";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { RootState } from "../../store/store";

const Search: React.FC = () => {
  const { keywords } = useParams<{ keywords: string }>();
  const dispatch = useDispatch();
  const Location = useLocation();

  const { loading, error, pagination, data } = useSelector(
    (state: RootState) => {
      return {
        loading: state.search.loading,
        error: state.search.error,
        pagination: state.search.pagination,
        data: state.search.data,
      };
    },
    shallowEqual
  );

  useEffect(() => {
    dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords: keywords }));
  }, [Location, dispatch, keywords]);

  const onPageChange = (nextPage, pageSize) => {
    dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords: keywords }));
  };

  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          position: "absolute",
          width: "100%",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      ></Spin>
    );
  }

  if (error) {
    return <h1 style={{ color: "red" }}>Error!!!</h1>;
  }

  return (
    <>
      <Header />
      <div className={styles["page-content"]}>
        {/* 分类过滤器 */}
        <div className={styles["product-list-container"]}>
          <FilterArea />
        </div>
        {/* 产品列表 */}
        <div className={styles["product-list-container"]}>
          <ProductList
            data={data}
            paging={pagination}
            onPageChange={onPageChange}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Search;
