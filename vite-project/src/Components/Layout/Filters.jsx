import React, { useState, useEffect } from 'react'
import './Filters.css'
import "./Search.css";
import '../Options.css'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Checkbox from '@mui/material/Checkbox';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ClearIcon from "@mui/icons-material/Clear";
import { clearErrors, getProductReviews } from '../../Actions/ReviewActions';
import { set } from 'mongoose';

const appVersion = [
  "1.0.0", "1.1.1", "2.1.1", "1.1.2"
]

const categories = [
  "T-Shirt",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Watch",
  "SmartPhones",
  "Tech",
  "Electronics"
];


const Filters = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { error, reviews } = useSelector(state => state.reviews)

  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState(false);
  const [sortChoosenOptions, setSortChoosenOptions] = useState([]);
  const [dateRange, setDateRange] = useState(false);
  const [dateChoosenOptions, setDateChoosenOptions] = useState([]);
  const [versions, setVersions] = useState(false);
  const [versionOptions, setVersionOptions] = useState([]);
  const [ratings, setRatings] = useState(false);
  const [ratingOptions, setRatingOptions] = useState([]);
  const [review, setReview] = useState(false);
  const [reviewOptions, setReviewOptions] = useState([]);
  const [deviceopt, setDeviceopt] = useState(false);
  const [deviceOptions, setDeviceOptions] = useState([]);
  const [like, setLike] = useState(false);
  const [likeOptions, setLikeOptions] = useState([]);
  const [applyFilters, setApplyFilters] = useState(false);



  // const device = params.device

  // Searching 
  const searchSubmitHandler = (e) => {
    e.preventDefault();
  }

  //  sorting 
  const SortingClickHandler = (e) => {
    e.preventDefault();
    sort ? setSort(false) : setSort(true);
  };
  const menuItemHandlerSorting = (e) => {
    e.preventDefault();
    const choice = e.target.innerText;
    if(sortChoosenOptions.includes(choice)){
      return ;
    }
    setSortChoosenOptions((prev) => [...prev, choice]);
  };
  const removeOptionSorting = (index) => {
    setSortChoosenOptions((prevOptions) =>
      prevOptions.filter((e, idx) => idx !== index)
    )
  };

  // Date Range
  const clickHandlerDateRange = (e) => {
    e.preventDefault();
    dateRange ? setDateRange(false) : setDateRange(true);
  };
  const menuItemHandlerDate = (e) => {
    const choice = e.target.innerText;
    if(dateChoosenOptions.includes(choice)){
      return ;
    }
    setDateChoosenOptions((prev) => [...prev, choice]);
    
  };
  const removeOptionDateChange = (index) => {
    setDateChoosenOptions((prevOptions) =>
      prevOptions.filter((_, idx) => idx !== index)
    )
  }

  // App Version
  const clickHandlerVersion = (e) => {
    e.preventDefault();
    versions ? setVersions(false) : setVersions(true);
  };
  const menuItemHandlerVersion = (e) => {
    const choice = e.target.innerText;
    if(versionOptions.includes(choice)){
      return ;
    }
    setVersionOptions((prev) => [...prev, choice]);

  };
  const removeOptionVerion = (index) => {
    setVersionOptions((prevOptions) =>
      prevOptions.filter((_, idx) => idx !== index)
    )
  }

  // Rating 

  const clickHandlerRating = (e) => {
    e.preventDefault();
    ratings ? setRatings(false) : setRatings(true);
  };
  const menuItemHandlerRating = (e) => {
    const choice = e.target.value;
    const checked = e.target.checked;
    if(ratingOptions.includes(choice)){
      return ;
    }
    if (checked) {
      setRatingOptions((prev) => [...prev, choice]);
    }

  };
  const removeOptionRaing = (index) => {
    setRatingOptions((prevOptions) =>
      prevOptions.filter((_, idx) => idx !== index)
    )

  };

  // Review 
  const clickHandlerReview = (e) => {
    e.preventDefault();
    review ? setReview(false) : setReview(true);
  };
  const menuItemHandlerReview = (e) => {
    e.preventDefault();
    const choice = e.target.innerText;
    if(reviewOptions.includes(choice)){
      return ;
    }
    setReviewOptions((prev) => [...prev, choice]);
    
  };
  const removeOptionReview = (index) => {
    setReviewOptions((prevOptions) =>
      prevOptions.filter((e, idx) => idx !== index)
    );
   
  };

  // Device 
  const clickHandlerDevice = (e) => {
    e.preventDefault();
    deviceopt ? setDeviceopt(false) : setDeviceopt(true);
  };
  const menuItemHandlerDevice = (e) => {
    e.preventDefault();

    const choice = e.target.innerText;
    if(deviceOptions.includes(choice)){
      return ;
    }
    setDeviceOptions((prev) => [...prev, choice]);
    
  };
  const removeOptionDevice = (index) => {
    setDeviceOptions((prevOptions) =>
      prevOptions.filter((e, idx) => idx !== index)
    );
    
  };


  // Likes 

  const clickHandlerLike = (e) => {
    e.preventDefault()
    like ? setLike(false) : setLike(true)
  }
  const menuItemHandlerLike = (e) => {
    e.preventDefault()
    const choice = e.target.innerText
    if(likeOptions.includes(choice)){
      return ;
    }
    setLikeOptions((prev) => [...prev, choice])
  };
  const removeOptionLike = (index) => {
    setLikeOptions((prevOptions) =>
      prevOptions.filter((e, idx) => idx !== index)
    )
  }
  function applyFilterHandler() {
    if (error) {
      return dispatch(clearErrors())
    }
    dispatch(getProductReviews(deviceOptions , ratingOptions , versionOptions , reviewOptions , likeOptions ,keyword ))
  }
  useEffect((e)=>{
    dispatch(getProductReviews(deviceOptions , ratingOptions , versionOptions , reviewOptions , likeOptions ,keyword  ))
  },[])
  function resetFilterHandler() {
    setSortChoosenOptions([])
    setDateChoosenOptions([])
    setVersionOptions([])
    setRatingOptions([])
    setReviewOptions([])
    setDeviceOptions([])
    setLikeOptions([])

  }

  return (
    <div className='filterContainer'>
      <>
        <form className="searchBox" onSubmit={searchSubmitHandler}>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="iconBox">
            <SearchIcon sx={{ fontSize: "2vmax", color: 'white' }} />
          </div>
        </form>
      </>
      <>
        <div className={sort ? "optionContainerHighlited" : "optionContainer"}>
          <div className="option">Sort</div>
          {!sort ? (
            <div className="arrowicon">
              <KeyboardArrowDownIcon
                sx={{ fontSize: "2vmax", color: "#49356C", paddingRight: "3px" }}
                onClick={SortingClickHandler}
              />
            </div>
          ) : (
            <div className="arrowicon">
              <KeyboardArrowUpIcon
                sx={{ fontSize: "2vmax", color: "#8246FF", paddingRight: "3px" }}
                onClick={SortingClickHandler}
              />
            </div>
          )}
        </div>
        {sort ? (
          <div className="manuItem" onClick={menuItemHandlerSorting}>
            <p>Likes</p>
            <p>Views</p>
            <p>Explanation</p>
            <p>Relevency</p>
          </div>
        ) : (
          <></>
        )}
        <div className="showSelecedOptions">
          {sortChoosenOptions.length > 0 ? (
            <>
              <div className="middleDivider"> </div>
              {sortChoosenOptions.map((ele, idx) => (
                <div className="selectedOptionsDiv" key={idx}>
                  <span
                    style={{ marginTop: "5px" }}
                    className="selectedOptions"

                  >
                    {ele}&nbsp;
                    {
                      <ClearIcon
                        onClick={() => removeOptionSorting(idx)}
                        sx={{ fontSize: 7 }}
                      />
                    }
                  </span>
                  <div className="middleDivider"> </div>
                </div>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </>
      <>
        <div className={dateRange ? "optionContainerHighlited" : "optionContainer"}>
          <div className="option">Date range</div>
          {!dateRange ? (
            <div className="arrowicon">
              <KeyboardArrowDownIcon
                sx={{ fontSize: "2vmax", color: "#49356C", paddingRight: "3px" }}
                onClick={clickHandlerDateRange}
              />
            </div>
          ) : (
            <div className="arrowicon">
              <KeyboardArrowUpIcon
                sx={{ fontSize: "2vmax", color: "#8246FF", paddingRight: "3px" }}
                onClick={clickHandlerDateRange}
              />
            </div>
          )}
        </div>
        {dateRange ? (
          <div className="manuItem" onClick={menuItemHandlerDate}>
            <p>Profile</p>
            <p>My account</p>
            <p>Logout</p>
          </div>
        ) : (
          <></>
        )}
        <div className="showSelecedOptions">
          {dateChoosenOptions.length > 0 ? (
            <>
              <div className="middleDivider"> </div>
              {dateChoosenOptions.map((ele, idx) => (
                <div className="selectedOptionsDiv">
                  <span
                    style={{ marginTop: "5px" }}
                    className="selectedOptions"
                    key={idx}
                  >
                    {ele}&nbsp;
                    {
                      <ClearIcon
                        onClick={() => removeOptionDateChange(idx)}
                        sx={{ fontSize: 7 }}
                      />
                    }
                  </span>
                  <div className="middleDivider"> </div>
                </div>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </>
      <>
        <div className={versions ? "optionContainerHighlited" : "optionContainer"}>
          <div className="option">Version Change</div>
          {!versions ? (
            <div className="arrowicon">
              <KeyboardArrowDownIcon
                sx={{ fontSize: "2vmax", color: "#49356C", paddingRight: "3px" }}
                onClick={clickHandlerVersion}
              />
            </div>
          ) : (
            <div className="arrowicon">
              <KeyboardArrowUpIcon
                sx={{ fontSize: "2vmax", color: "#8246FF", paddingRight: "3px" }}
                onClick={clickHandlerVersion}
              />
            </div>
          )}
        </div>
        {versions ? (
          <div className="manuItem" onClick={menuItemHandlerVersion}>
            {
              appVersion.map((ele) => (
                <p key={ele}>{ele}</p>
              ))
            }
          </div>
        ) : (
          <></>
        )}
        <div className="showSelecedOptions">
          {versionOptions.length > 0 ? (
            <>
              <div className="middleDivider"> </div>
              {versionOptions.map((ele, idx) => (
                <div className="selectedOptionsDiv">
                  <span
                    style={{ marginTop: "5px" }}
                    className="selectedOptions"
                    key={idx}
                  >
                    {ele}&nbsp;
                    {
                      <ClearIcon
                        onClick={() => removeOptionVerion(idx)}
                        sx={{ fontSize: 7 }}
                      />
                    }
                  </span>
                  <div className="middleDivider"> </div>
                </div>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </>
      <>
        <div className={ratings ? "optionContainerHighlited" : "optionContainer"}>
          <div className="option">Rating</div>
          {!ratings ? (
            <div className="arrowicon">
              <KeyboardArrowDownIcon
                sx={{ fontSize: "2vmax", color: "#49356C", paddingRight: "3px" }}
                onClick={clickHandlerRating}
              />
            </div>
          ) : (
            <div className="arrowicon">
              <KeyboardArrowUpIcon
                sx={{ fontSize: "2vmax", color: "#8246FF", paddingRight: "3px" }}
                onClick={clickHandlerRating}
              />
            </div>
          )}
        </div>
        {ratings ? (
          <div className="manuItem-ratings" onClick={menuItemHandlerRating}>
            <Checkbox value={5} />
            {
              Array.from({ length: 5 }).map((_, index) => (
                <span><StarIcon sx={{ color: '#160042' }} /></span>
              ))
            }
            <br />
            <Checkbox value={4} />{
              Array.from({ length: 4 }).map((_, index) => (
                <span><StarIcon sx={{ color: '#160042' }} /></span>
              ))
            }
            <br />
            <Checkbox value={3} />{
              Array.from({ length: 3 }).map((_, index) => (
                <span><StarIcon sx={{ color: '#160042' }} /></span>
              ))
            }
            <br />
            <Checkbox value={2} />{
              Array.from({ length: 2 }).map((_, index) => (
                <span><StarIcon sx={{ color: '#160042' }} /></span>
              ))
            }
            <br />
            <Checkbox value={1} />{
              Array.from({ length: 1 }).map((_, index) => (
                <span key={index}><StarIcon sx={{ color: '#160042' }} /></span>
              ))
            }
          </div>
        ) : (
          <></>
        )}
        <div className="showSelecedOptions">
          {
            ratingOptions.length > 0 ? (
              <>
                <div className="middleDivider"> </div>
                {
                  ratingOptions.map((ele, idx) => (
                    <div className="selectedOptionsDiv-selectedOptions">
                      {
                        Array.from({ length: ele }).map((_, index) => (
                          <span key={index} style={{ marginTop: "5px" }} ><StarIcon sx={{ color: '#160042' }} /></span>
                        ))
                      }
                      &nbsp;
                      {
                        <ClearIcon
                          onClick={() => removeOptionRaing(idx)}
                          sx={{ fontSize: 19 }}
                        />
                      }
                    </div>
                  ))}
              </>
            ) : (
              <></>
            )}
        </div>
      </>

      <>
        <div className={review ? "optionContainerHighlited" : "optionContainer"}>
          <div className="option">Review type</div>
          {!review ? (
            <div className="arrowicon">
              <KeyboardArrowDownIcon
                sx={{ fontSize: "2vmax", color: "#49356C", paddingRight: "3px" }}
                onClick={clickHandlerReview}
              />
            </div>
          ) : (
            <div className="arrowicon">
              <KeyboardArrowUpIcon
                sx={{ fontSize: "2vmax", color: "#8246FF", paddingRight: "3px" }}
                onClick={clickHandlerReview}
              />
            </div>
          )}
        </div>
        {review ? (
          <div className="manuItem" onClick={menuItemHandlerReview}>
            <p>Bug</p>
            <p>Feature request</p>
            <p>Appreciation</p>
          </div>
        ) : (
          <></>
        )}
        <div className="showSelecedOptions">
          {reviewOptions.length > 0 ? (
            <>
              <div className="middleDivider"> </div>
              {reviewOptions.map((ele, idx) => (
                <div className="selectedOptionsDiv" key={idx}>
                  <span
                    style={{ marginTop: "5px" }}
                    className="selectedOptions"

                  >
                    {ele}&nbsp;
                    {
                      <ClearIcon
                        onClick={() => removeOptionReview(idx)}
                        sx={{ fontSize: 7 }}
                      />
                    }
                  </span>
                  <div className="middleDivider"> </div>
                </div>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </>
      <>
        <div className={deviceopt ? "optionContainerHighlited" : "optionContainer"}>
          <div className="option">Device</div>
          {!deviceopt ? (
            <div className="arrowicon">
              <KeyboardArrowDownIcon
                sx={{ fontSize: "2vmax", color: "#49356C", paddingRight: "3px" }}
                onClick={clickHandlerDevice}
              />
            </div>
          ) : (
            <div className="arrowicon">
              <KeyboardArrowUpIcon
                sx={{ fontSize: "2vmax", color: "#8246FF", paddingRight: "3px" }}
                onClick={clickHandlerDevice}
              />
            </div>
          )}
        </div>
        {deviceopt ? (
          <div className="manuItem" onClick={menuItemHandlerDevice}>
            {
              categories.map((category) => (

                <p key={category}>{category}</p>
              ))
            }
          </div>
        ) : (
          <></>
        )}
        <div className="showSelecedOptions">
          {deviceOptions.length > 0 ? (
            <>
              <div className="middleDivider"> </div>
              {deviceOptions.map((ele, idx) => (
                <div className="selectedOptionsDiv" key={idx}>
                  <span
                    style={{ marginTop: "5px" }}
                    className="selectedOptions"

                  >
                    {ele}&nbsp;
                    {
                      <ClearIcon
                        onClick={() => removeOptionDevice(idx)}
                        sx={{ fontSize: 7 }}
                      />
                    }
                  </span>
                  <div className="middleDivider"> </div>
                </div>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </>
      <>
        <div className={like ? "optionContainerHighlited" : "optionContainer"}>
          <div className="option">Like</div>
          {!like ? (
            <div className="arrowicon">
              <KeyboardArrowDownIcon
                sx={{ fontSize: "2vmax", color: "#49356C", paddingRight: "3px" }}
                onClick={clickHandlerLike}
              />
            </div>
          ) : (
            <div className="arrowicon">
              <KeyboardArrowUpIcon
                sx={{ fontSize: "2vmax", color: "#8246FF", paddingRight: "3px" }}
                onClick={clickHandlerLike}
              />
            </div>
          )}
        </div>
        {like ? (
          <div className="manuItem" onClick={menuItemHandlerLike}>
            <p>1-250</p>
            <p>250-500</p>
            <p>500-750</p>
            <p>750-1000</p>
            <p> > 1000</p>
          </div>
        ) : (
          <></>
        )}
        <div className="showSelecedOptions">
          {likeOptions.length > 0 ? (
            <>
              <div className="middleDivider"> </div>
              {likeOptions.map((ele, idx) => (
                <div className="selectedOptionsDiv" key={idx}>
                  <span
                    style={{ marginTop: "5px" }}
                    className="selectedOptions"

                  >
                    {ele}&nbsp;
                    {
                      <ClearIcon
                        onClick={() => removeOptionLike(idx)}
                        sx={{ fontSize: 7 }}
                      />
                    }
                  </span>
                  <div className="middleDivider"> </div>
                </div>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </>

      <Button variant='contained' sx={{ width: '100%', borderRadius: '0px' }} onClick={applyFilterHandler}>Apply</Button>
      <Button color='success' sx={{ width: '100%', borderRadius: '0px' }} onClick={resetFilterHandler}>Reset all</Button>
    </div>
  )
}

export default Filters



