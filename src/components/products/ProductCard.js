import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from './ProductCard.module.css';
import { CardBtn } from '../buttons/CardBtn';

export const ProductCard = ({ product }) => {
    const [showMore, setShowMore] = useState(false);
    const categories = product.categories.map((category) => category.name).join(', ');

    const handleToggleShowMore = () => {
        setShowMore(!showMore);
    };

    const shortDescription = product.short_description;
    const shouldShowMoreButton = shortDescription.length > 100;

    console.log(product);
    return (
        <Card style={{ height: '100%', backgroundColor: '#e1f7e3' }}>
            <Card.Img variant="top" src={product.images[0]?.src} alt={product.name} style={{ height: '300px', width: '300px', objectFit: 'contain', display: 'block', margin: '0 auto' }} />
            <Card.Body>
                <Card.Title className='text-center'>{product.name}</Card.Title>
                <div
                    className={`description-text ${showMore ? 'show-full' : ''}`}
                    dangerouslySetInnerHTML={{ __html: showMore ? product.short_description : (shouldShowMoreButton ? shortDescription.slice(0, 100) + '...' : shortDescription) }}
                />
                {shouldShowMoreButton && (
                    <Button variant="button" onClick={handleToggleShowMore}
                        className={`${styles['show-more-button']} ${showMore ? styles['show-less'] : ''}`}
                        style={{
                            marginTop: '-20px',
                            position: 'absolute',
                            right: '5px',
                        }}>
                        {showMore ? 'Скрий' : 'Още'}
                    </Button>
                )}
                <br/>
                <br/>
                <Card.Text>Категории: {categories}</Card.Text>
                <Card.Text>Цена:
                    {product.prices?.price}
                    {product.prices?.currency_symbol}
                </Card.Text>
                <CardBtn productId={product.id}/>
            </Card.Body>
        </Card>
    );
};
