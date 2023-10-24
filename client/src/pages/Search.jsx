import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFilter } from "react-icons/fa";

export default function Search() {
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    temple: false,
    garden: false,
    pool: false,
    offer: false,
    sort: "created_at_desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const gardenFromUrl = urlParams.get("garden");
    const poolFromUrl = urlParams.get("pool");
    const templeFromUrl = urlParams.get("temple");

    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      poolFromUrl ||
      gardenFromUrl ||
      templeFromUrl ||
      offerFromUrl ||
      sortFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true",
        furnished: furnishedFromUrl === "true",
        garden: gardenFromUrl === "true",
        temple: templeFromUrl === "true",
        pool: poolFromUrl === "true",
        offer: offerFromUrl === "true",
        sort: sortFromUrl || "created_at_desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'garden' ||
      e.target.id === 'pool' ||
      e.target.id === 'temple' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("pool", sidebardata.pool);
    urlParams.set("temple", sidebardata.temple);
    urlParams.set("garden", sidebardata.garden);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  // Handle filter changes (e.g., types, amenities, sort)
  useEffect(() => {
    // Fetch and display filtered results based on selected filters
    // You can add your logic here to fetch and update the filtered listings
  }, [sidebardata]);

  // Toggle the filter options visibility
  const toggleFilters = (e) => {
    e.preventDefault();
    setShowFilters(!showFilters);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
            <button
              className="bg-gray-900 text-white p-3 rounded-lg uppercase hover:opacity-95"
              onClick={toggleFilters}
            >
              <FaFilter />
            </button>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              value={sidebardata.sort}
              id="sort"
              className="border rounded-lg p-3"
            >
              <option value="created_at_desc">Latest</option>
              <option value="created_at_asc">Oldest</option>
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
            </select>
          </div>
          <div className={showFilters ? "visible" : "hidden"}>
            <div className="flex flex-col gap-4">
              <div>
                <label className="font-semibold">Type:</label>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="all"
                    className="w-5"
                    onChange={handleChange}
                    checked={sidebardata.type === "all"}
                  />
                  <span>Rent & Sale</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="rent"
                    className="w-5"
                    onChange={handleChange}
                    checked={sidebardata.type === "rent"}
                  />
                  <span>Rent</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="sale"
                    className="w-5"
                    onChange={handleChange}
                    checked={sidebardata.type === "sale"}
                  />
                  <span>Sale</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="offer"
                    className="w-5"
                    onChange={handleChange}
                    checked={sidebardata.offer}
                  />
                  <span>Offer</span>
                </div>
              </div>
              <div>
                <label className="font-semibold">Amenities:</label>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="parking"
                    className="w-5"
                    onChange={handleChange}
                    checked={sidebardata.parking}
                  />
                  <span>Parking</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="temple"
                    className="w-5"
                    onChange={handleChange}
                    checked={sidebardata.temple}
                  />
                  <span>Temple</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="garden"
                    className="w-5"
                    onChange={handleChange}
                    checked={sidebardata.garden}
                  />
                  <span>Garden</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="pool"
                    className="w-5"
                    onChange={handleChange}
                    checked={sidebardata.pool}
                  />
                  <span>Swimming Pool</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="furnished"
                    className="w-5"
                    onChange={handleChange}
                    checked={sidebardata.furnished}
                  />
                  <span>Furnished</span>
                </div>
              </div>
            </div>
          </div>
          <button className="bg-gray-900 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Property results:
        </h1>
      </div>
    </div>
  );
}
