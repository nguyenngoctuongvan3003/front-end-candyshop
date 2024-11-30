import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:9090/api/categories';

const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryImages = [
    '/assets/chocolatenhan.jpg',    
    '/assets/chocolatedacbiet.jpg', 
    '/assets/chocolatekethop.jpg',  
    '/assets/quatangchocolate.jpg', 
    '/assets/banhkeochocolate.jpg', 
    '/assets/chocolatechotreem.jpg',
    '/assets/chocolatenguyenchat.jpg' 
  ];

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_URL);
      setCategories(response.data.data); 
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Network error');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="App">
      <div className="container banner-container">
        <div className="navbar-links">
          <Link to="/signup" className="navbar-link">Sign Up</Link>
          <Link to="/signin" className="navbar-link">Sign In</Link>
        </div>
        <div className='row'>
          <div className='col-12'>
            <img src="/assets/banner_www.jpg" className='banner' alt='Special Offer Banner'/>
          </div>
        </div>
      </div>

      {/* Giới thiệu danh mục */}
      <div className="container intro-section">
        <h2>Chào Mừng Đến Với Cửa Hàng Socola Cao Cấp</h2>
        <p style={{ textAlign: 'center', fontSize: '1.2em' }}>
          Khám phá các danh mục sản phẩm chất lượng từ socola đen, socola sữa cho đến socola kết hợp hạt dinh dưỡng.
        </p>
      </div>

      {/* Liệt kê các danh mục socola */}
      <div className="container category-section">
        <h2>Danh Mục Socola</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {categories.map((category, index) => (
            <div key={category.categoryId} className="card" style={{ width: '18rem', margin: '10px' }}>
              <img
                src={categoryImages[index]} 
                alt={category.categoryName}
                className="card-img-top"
                style={{width: '100%', height: '350px'}}
              />
              <div className="card-body">
                <h5 className="card-title">{category.categoryName}</h5>
                <Link to={`/category/${category.categoryId}`} className="btn btn-primary">
                  Xem Sản Phẩm
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
