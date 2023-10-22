import { Dropdown } from "react-bootstrap";

export const CategoryDropdown = function ({ categories, selectedCategory, onCategoryChange }) {
    return (
        <Dropdown style={{ paddingTop: '15px', marginLeft: '25px' }}>
            <Dropdown.Toggle variant="secondary" id="dropdown-category">
                Филтрирай по категория
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => onCategoryChange('')}>Всички</Dropdown.Item>
                {categories.map((category, index) => (
                    <Dropdown.Item key={index} onClick={() => onCategoryChange(category)}>{category}</Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}