import React, { useEffect, useState } from "react";
import "./SearchComponents.css";
import SearchUserCard from "./SearchUserCard";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAction } from "../../Redux/User/Action";

const SearchComponents = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Gọi hàm tìm kiếm sau khi người dùng dừng nhập trong khoảng thời gian
  const delayedSearch = (value) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchTimeout(
      setTimeout(() => {
        dispatch(searchUserAction({ jwt: token, query: value }));
      }, 1500) // Thời gian debounce là 1.5 giây
    );
  };

  useEffect(() => {
    delayedSearch(searchTerm);
  }, [searchTerm]);

  // Kiểm tra nếu không có kết quả tìm kiếm
  const noResults =
    !user?.searchUser ||
    !Array.isArray(user.searchUser) ||
    user.searchUser.length === 0;

  return (
    <div className="searchContainer">
      <div className="px-3 pb-5">
        <h1 className="text-xl pb-5">Search</h1>
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchInput"
          type="text"
          placeholder="Search..."
        />
      </div>
      <hr />
      <div className="px-3 pt-5">
        {noResults ? (
          <p>No result</p>
        ) : (
          user.searchUser?.map((item) => (
            <SearchUserCard user={item} key={item.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchComponents;
