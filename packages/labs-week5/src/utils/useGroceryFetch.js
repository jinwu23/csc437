import React, { useState, useEffect } from "react"; 
import { groceryFetcher } from "../utils/groceryFetcher";

export function useGroceryFetch(dropdown) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [groceryData, setGroceryData] = useState([]);

    useEffect(() => {
        setGroceryData([]);
        let isStale = false;

        const fetchData = async () => {
            console.log("fetching data from " + dropdown);
            setError(null);
            setIsLoading(true);
            try {
                const theParsedData = await groceryFetcher.fetch(dropdown);
                if (!isStale) {
                    setGroceryData(theParsedData);
                }
            } catch (error) {
                console.error(`Could not fetch data from ${dropdown}`)
                setError("Could not fetch data")
            }
            setIsLoading(false);
        }
        fetchData(dropdown);

        return () => {
            isStale = true;
        }
    }, [dropdown])

    return { groceryData, isLoading, error };
}