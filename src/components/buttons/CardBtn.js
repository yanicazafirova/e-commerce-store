import { Button } from "react-bootstrap";

export const CardBtn = ({ productId }) => {
    const addToCart = (productId) => {
		window.location.href = `https://greet.bg/?add-to-cart=${productId}`;
	};
    return (
        <Button
            style={{
                position: 'absolute',
                bottom: '5px',
                right: '5px',
            }}
            onClick={() => addToCart(productId)}>
            Добави
        </Button>
    );
}
