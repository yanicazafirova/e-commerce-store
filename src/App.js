import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductCard } from './components/products/ProductCard';
import { Col, Container, Row } from 'react-bootstrap';
import { CategoryDropdown } from './components/filtering/CategoryDropdown';
import './App.css';

const App = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [page, setPage] = useState(1);

	useEffect(() => {
		axios
			.get(`https://greet.bg/wp-json/wc/store/products?page=${page}`)
			.then((response) => {
				setProducts([...products, ...response.data]);
				setCategories([...new Set(response.data.map((product) => product.categories[0].name))]);
			});
	}, [page]);

	// const loadMore = () => {
	// 	setPage(page + 1);
	// };

	const filterByCategory = (category) => {
		setSelectedCategory(category);
	};

	return (
		<Container fluid style={{ background: '#a7ccab' }}>
			<CategoryDropdown
				categories={categories}
				selectedCategory={selectedCategory}
				onCategoryChange={filterByCategory}
			/>
			<Row style={{ paddingTop: '60px' }}>
				{products
					.filter((product) => selectedCategory === '' || product.categories.some((category) => category.name === selectedCategory))
					.map((product, index) => (
						<Col key={index} sm={6} md={4} lg={4}>
							<div className='p-4' style={{ width: '100%', height: '100%' }}>
								<ProductCard product={product} key={index} />
							</div>
						</Col>
					))
				}
			</Row>
		</Container>
	);
};

export default App;
