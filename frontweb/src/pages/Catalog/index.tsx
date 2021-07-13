import axios, { AxiosRequestConfig } from 'axios';
import ProductCard from '../../components/ProductCard';
import { Product } from '../../types/product';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import { useEffect, useState } from 'react';
import { SpringPage } from '../../util/vendor/spring';
import CardLoader from './CardLoader';
import { BASE_URL } from '../../util/requests';

import './styles.css';

const Catalog = () => {
  const [page, setPage] = useState<SpringPage<Product>>();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/products',
      baseURL: BASE_URL,
      params: {
        page: 0,
        size: 12,
      },
    };

    setIsLoading(true);

    axios(params)
      .then((response) => {
        setPage(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container my-4 catalag-container">
      <div className="row catalog-title-container">
        <h1>Catálago de produtos</h1>
      </div>

      <div className="row">
        {isLoading ? (
          <CardLoader />
        ) : (
          page?.content.map((product) => (
            <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            </div>
          ))
        )}
      </div>

      <div className="row">
        <Pagination />
      </div>
    </div>
  );
};

export default Catalog;
