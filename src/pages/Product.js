import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import "../assets/css/product.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import PriceFilter from "../components/PriceFilter";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 12; // Số lượng sản phẩm tối đa trên mỗi trang
  const [loading, setLoading] = useState(true);
  const {subCategoryId}=useParams();
  const {keyword}=useParams();
  const [subCategory, setSubCategory] = useState("");

  

  const fetchSubCategory = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/subcategories/${subCategoryId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch subcategory");
      }
      const data = await response.json();
      setSubCategory(data.data); // Giả sử API trả về tên phân loại trong data.name
    } catch (error) {
      console.error("Error fetching subcategory:", error);
    }
  };

  const fetchProducts = async (page) => {
    console.log("Keyword:", keyword); 
    try {
      let response;
      if (subCategoryId) {
        response = await axios.get(
          `http://localhost:8080/api/products/subcategory/${subCategoryId}?page=${page}&limit=${limit}`
        );
      }else if(keyword){
        response = await axios.get(
          `http://localhost:8080/api/products/searchByName?name=${keyword}&page=${page}&limit=${limit}`
        );
      }else {
        response = await axios.get(`http://localhost:8080/api/products?limit=${limit}&page=${page}`);
      }
      const data = response.data.data;
      setProducts(data.content);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      console.error(
        "Error updating product price:",
        error.response ? error.response.data : error
      );
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const handleViewDetail = (productId) => {
    // Chuyển hướng đến trang chi tiết sản phẩm với productId
    navigate(`/productDetail/${productId}`);
  };

  useEffect(() => {
    console.log(subCategoryId);
    if(subCategoryId){
      fetchSubCategory();
    }
   
      fetchProducts(currentPage);
    
  }, [currentPage, subCategoryId,  keyword]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading...</div>; // Hiển thị thông báo đang tải
  }

  return (
    <div className="container-fluid px-0">
      <Header />
      <div className="product">
        <h3>{subCategory.subCategoryName}</h3>
          <PriceFilter/>
        <div className="row">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                className="product-card"
                key={product.productId}
                onClick={() => handleViewDetail(product.productId)}
              >
                <img
                  src={product.mainImageUrl}
                  alt={product.productName}
                  className="product-image"
                />
                <h3 className="product-name">{product.productName}</h3>
                <p className="product-price">
                  {product.currentPrice.newPrice.toLocaleString()} VND
                </p>
                <div className="overlay">
                  <h3 className="product-name">Xem chi tiết</h3>
                </div>
              </div>
            ))
          ) : (
            <div className="col">
              <p>Không có sản phẩm nào.</p>
            </div>
          )}
        </div>

        {/* Hiển thị thanh chọn trang nếu có nhiều hơn 1 trang */}
        {totalPages > 1 && (
          <nav aria-label="Page navigation">
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  className={`page-item ${
                    currentPage === index ? "active" : ""
                  }`}
                  key={index}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Product;
