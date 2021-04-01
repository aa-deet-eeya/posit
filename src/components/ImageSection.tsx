/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { imgReducer } from "./utils/imgReducer";
import { imgStyle } from "./utils/imgStyle";
import { Loading } from "./utils/Loading";
import { pageReducer } from "./utils/pageReducer";

interface imgObj {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
  };
}

const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
const fetchConfig = {
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
};

export const ImageSection: React.FC = () => {
  const keywords = ["Random", "Doggo", "Pupper", "Kitty"];
  const [selected, setSelected] = useState<string>("Random");

  const setTab = (tab: string) => {
    setSelected(tab);
  };

  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 1 });
  const [imgData, imgDispatch] = useReducer(imgReducer, {
    images: [],
    fetching: true,
  });

  useEffect(() => {
    imgDispatch({ type: "FETCHING_IMAGES", fetching: true });
    const url = `https://api.unsplash.com/search/photos?per_page=12&page=${pager.page}&query=${selected}`;
    fetch(url, fetchConfig)
      .then((data) => data.json())
      .then((data) => {
        const results: imgObj[] = data.results;
        imgDispatch({ type: "STACK_IMAGES", images: results });
        imgDispatch({ type: "FETCHING_IMAGES", fetching: false });
      })
      .catch((err) => {
        console.log(err);
        imgDispatch({ type: "FETCHING_IMAGES", fetching: false });
        return err;
      });
  }, [imgDispatch, pager.page]);

  useEffect(() => {
    pagerDispatch({ type: "RESET_PAGE" });
    imgDispatch({ type: "FETCHING_IMAGES", fetching: true });
    const url = `https://api.unsplash.com/search/photos?per_page=12&page=${pager.page}&query=${selected}`;
    fetch(url, fetchConfig)
      .then((data) => data.json())
      .then((data) => {
        const results: imgObj[] = data.results;
        imgDispatch({ type: "NEW_IMAGES", images: results });
        imgDispatch({ type: "FETCHING_IMAGES", fetching: false });
      })
      .catch((err) => {
        console.log(err);
        imgDispatch({ type: "FETCHING_IMAGES", fetching: false });
        return err;
      });
  }, [selected]);

  let bottomBoundaryRef = useRef(null);
  const scrollObserver = useCallback(
    (node) => {
      new IntersectionObserver((enteries) => {
        enteries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            pagerDispatch({ type: "ADVANCE_PAGE" });
          }
        });
      }).observe(node);
    },
    [pagerDispatch]
  );

  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current);
    }
  }, [scrollObserver, bottomBoundaryRef]);

  return (
    <>
      <div className="container mx-auto">
        <div className="w-2/3 mx-auto flex mb-12">
          {keywords.map((key) => (
            <div
              key={key}
              className={`cursor-pointer font-josef text-lg mr-8 ${
                selected !== key && "text-gray-500"
              }`}
              onClick={() => {
                setTab(key);
              }}
            >
              {key}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap w-full">
        {imgData.images.map((img, index) => (
          <>
            <img
              key={img.id}
              className={`object-cover transform max-h-img ${imgStyle(
                index + 1
              )} hover:z-10 transition duration-500 hover:scale-90`}
              src={img.urls.regular}
              alt=" "
            ></img>
          </>
        ))}
      </div>
      {imgData.fetching && <Loading />}
      <div id="page-bottom-boundary" ref={bottomBoundaryRef}></div>
    </>
  );
};
