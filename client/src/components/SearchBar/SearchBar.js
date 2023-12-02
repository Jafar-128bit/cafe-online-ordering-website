import './searchbar.css';
import searchIcon from '../../assets/icons/searchIcon.svg';
import IconContainer from "../IconContainer/IconContainer";

const SearchBar = () => {
    return (
        <div className="searchBar">
            <input type="text" placeholder="Search Here"/>
            <IconContainer src={searchIcon} alt="Search Icon svg" width={46} height={26} background={false}/>
        </div>
    );
}

export default SearchBar;