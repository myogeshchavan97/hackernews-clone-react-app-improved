import { useState, useEffect } from 'react';
import { getStories } from '../utils/apis';

const useDataFetcher = (type) => {
  const [stories, setStories] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stories[type]) {
      setIsLoading(true);
      getStories(type)
        .then((stories) => {
          setStories((prevState) => ({
            ...prevState,
            [type]: stories,
          }));
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [type, stories]);

  return { isLoading, stories: stories[type] };
};

export default useDataFetcher;
