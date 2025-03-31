import { useMemo, useState } from "react";
import { useAppSelector } from "../stores/store";
import { CollectionOptions } from "../types";

export const useEventFilters = () => {
    const options = useAppSelector(state => state.firestore.options['events']);
    
      const startDateOpt = options?.queries?.find(q => q.attribute === 'date')?.value as string;
      const queryFilter = options?.queries?.find(q => ['attendeeIds', 'hostUid']
          .includes(q.attribute));
      const filterFromOpt = queryFilter?.attribute === 'attendeeIds' ? 'going' 
        : queryFilter?.attribute === 'hostUid' ? 'hosting' : 'all'; 
    
    
      const initialFilterState = {
        query: 'all',
        startDate: new Date().toISOString()
      }
    
      const [filter, setFilter] = useState({
        query: filterFromOpt || initialFilterState.query,
        startDate: startDateOpt || initialFilterState.startDate
      });
    
      const resetFilters = () => setFilter(initialFilterState);

      const collectionOptions: CollectionOptions = useMemo(() => {
        return {
          queries: [{attribute: 'date', operator: '>=', 
            value: new Date().toISOString(), isDate: true}],
          sort: {attribute: 'date', direction: 'asc'},
          limit: 3,
          pageNumber: 1
        }
      }, []);

      return {
        filter,
        setFilter,
        resetFilters,
        collectionOptions
      }
}