import React from "react";

const Checkbox = ({ isSelected, onCheckboxChange }) => (
    <div className="form-check">
        <label>
            <input
                type="checkbox"
                checked={isSelected}
                onClick={onCheckboxChange}
                className="form-check-input"
            />
        </label>
    </div>
);

export default Checkbox;