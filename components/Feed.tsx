"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
type Posts = {
  _id: string;
  creator: {
    userName: string;
  };
  tag: string;
  prompt: string;
};
type PromptCardListProps = {
  data: Posts[];
  handleTagClick: (tagName: string) => void;
};
const PromptCardList: React.FC<PromptCardListProps> = ({
  data,
  handleTagClick,
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post: Posts) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  // serch text
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchData();
  }, []);
  const filterPrompts = (searchText: string) => {
    const regux = new RegExp(searchText, "i");
    // search
    return posts.filter(
      (item: any) =>
        regux.test(item?.creator?.username) ||
        regux.test(item.tag) ||
        regux.test(item.prompt)
    );
  };
  const handleSearchChage = (e: any) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };
  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChage}
          required
          className="search_input peer"
        />
      </form>
      {searchText.trim() ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
