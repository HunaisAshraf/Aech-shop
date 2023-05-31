import React, { useState } from "react";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  let [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/search/${values.keyword}`);
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
            className="form-control me-2 rounded-5"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          />
        
        {/* <button className="btn p-0" type="submit">
          <AiOutlineSearch
            style={{ fontSize: "1.8rem", fontWeight: "900", color: "#ffffff" }}
          />
        </button> */}
      </form>
    </div>
  );
};

export default SearchInput;
