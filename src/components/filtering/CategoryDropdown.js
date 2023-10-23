import { Dropdown } from "react-bootstrap";

export const CategoryDropdown = function ({ categories, title, onSelectedChange }) {
    return (
        <Dropdown style={{ paddingTop: '15px', marginLeft: '25px', marginRight: '25px' }}>
            <Dropdown.Toggle variant="secondary" id="dropdown-category">
                {title}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => onSelectedChange('')}>Всички</Dropdown.Item>
                {categories.map((category, index) => (
                    <Dropdown.Item key={index} onClick={() => onSelectedChange(category)}>{category}</Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}