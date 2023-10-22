import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductCard } from './components/products/ProductCard';
import { Col, Container, Row } from 'react-bootstrap';
import { CategoryDropdown } from './components/filtering/CategoryDropdown';
import './App.css';

const App = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [sortOption, setSortOption] = useState(null);
	const [page, setPage] = useState(1);

	useEffect(() => {
		axios
			.get(`https://greet.bg/wp-json/wc/store/products?page=${page}`)
			.then((response) => {
				setProducts([...products, ...response.data]);
				setCategories([...new Set(response.data.map((product) => product.categories[0].name))]);
			});
	}, [page]);

	const handleSortChange = (value) => {
		setSortOption(value);
	};

	const sortProducts = (products, sortOption) => {
		if (sortOption === 'name-asc') {
			return [...products].sort((a, b) => a.name.localeCompare(b.name));
		} else if (sortOption === 'name-desc') {
			return [...products].sort((a, b) => b.name.localeCompare(a.name));
		} else if (sortOption === 'price-asc') {
			return [...products].sort((a, b) => a.prices.price - b.prices.price);
		} else if (sortOption === 'price-desc') {
			return [...products].sort((a, b) => b.prices.price - a.prices.price);
		} else {
			return products;
		}
	};

	const filteredAndSortedProducts = sortProducts(
		products.filter((product) => selectedCategory === '' || product.categories.some((category) => category.name === selectedCategory)),
		sortOption
	);

	return (
		<Container fluid style={{ background: '#a7ccab' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<CategoryDropdown
					categories={categories}
					title={'Филтриране по категория'}
					selectedCategory={selectedCategory}
					onCategoryChange={setSelectedCategory}		
				/>
				<CategoryDropdown
					categories={['name-asc', 'name-desc', 'price-asc', 'price-desc']}
					title={'Сортиране'}
					selectedCategory={sortOption}
					onCategoryChange={handleSortChange}
				/>
			</div>
			<Row style={{ paddingTop: '60px' }}>
				{filteredAndSortedProducts.map((product, index) => (
					<Col key={index} sm={6} md={4} lg={4}>
						<div className="p-4" style={{ width: '100%', height: '100%' }}>
							<ProductCard product={product} key={index} />
						</div>
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default App;
