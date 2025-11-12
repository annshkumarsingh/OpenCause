"use client"

import FilterSection from '@/components/FilterSection';
import Searchbar from '@/components/Searchbar';
import CharityCard from '@/components/CharityCard';
import Pagination from '@/components/Pagination';
import { useEffect, useState } from 'react';

const CharityList = () => {

  const [filteredCharities, setFilteredCharities] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currPage, setCurrPage] = useState(1);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const getFilteredCharities = async () => {
    const params = new URLSearchParams({
      category,
      status,
      search: searchTerm,
      page: currPage
    });

    const res = await fetch(`/api/charities?${params.toString()}`)
    const data = await res.json();
    setFilteredCharities(Array.isArray(data.charities) ? data.charities : []);
    setTotalPages(data.totalPages || 1);

  }

  useEffect(() => {
    getFilteredCharities();
  }, [category, status, searchTerm, currPage])


  return (
    <div className='flex main justify-evenly min-h-[100vh] w-[100%] pb-[50px] pt-[50px]'>

      <FilterSection category={category} onCategoryChange={setCategory} status={status} onStatusChange={setStatus} />

      <div className='w-[100%] md:w-3/4 pb-[20px] pt-[20px]'>

        <Searchbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <div>
          {filteredCharities.map((charity) => (
            <CharityCard
              key={charity._id}
              title={charity.title}
              desc={charity.desc}
              website={charity.website}
              img={charity.img}
            />
          ))}
        </div>

        <Pagination currPage={currPage} totalPages={totalPages} onPageChange={setCurrPage} />

      </div>
    </div>
  )
}

export default CharityList
