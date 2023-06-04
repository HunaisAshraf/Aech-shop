import React from "react";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../helper/apiUrl";

const SearchInput = () => {
  const [values, setValues] = useSearch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/api/search/${values.keyword}`);
      setValues({ ...values, results: res.data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control mx-2 rounded-5"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
      </form>
    </div>
  );
};

export default SearchInput;
