"use client"

import { useState } from "react";
import Link from "next/link";
import { Input } from "./ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "./ui/select";
import { useRouter } from "next/router";





export default function Search() {

    const [inputValue, setInputValue] = useState('');
    const handleChange = (event: any) => {
        setInputValue(event.target.value);
    }

    const [sortBy, setSortBy] = useState('');
    const handleSortByChange = (event: any) => {
        setSortBy(event.target.value);
    };

    const [sortOrder, setSortOrder] = useState('');
    const handleSortOrder = (event: any) => {
        setSortOrder(event.target.value);
    };

    return (
        <>
            <div className="p-4"> <input
                placeholder="Search by name or id..."
                value={inputValue}
                onChange={handleChange}
            /></div>

            <div className="p-4"><select value={sortBy}  onChange={handleSortByChange}>
                <option value="">Sort by...</option>
                <option value="id">ID</option>
                <option value="name">Name</option>
            </select></div>


            <div className="p-4">  <select value={sortOrder} onChange={handleSortOrder}>
                <option value="">Sort order...</option>
                <option value="asc">Asc.</option>
                <option value="desc">Desc.</option>
            </select></div>



            {/* <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Sort order..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="asc">Asc.</SelectItem>
                        <SelectItem value="desc">Desc.</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select> */}
            {/* {" inputValue:= " + inputValue}
            {" sortBy= " + sortBy}
            {" sortOrder= " + sortOrder} */}
            <Link
                href={{
                    pathname: '/',
                    query: {
                        query: inputValue,
                        sortBy: sortBy,
                        sortOrder: sortOrder
                    }
                }}
            >
                <u>Submit</u>
            </Link>
        </>
    )
}
