import { useState } from "react";
import { useAppSelector } from "../stores/store";

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

      return {
        filter,
        setFilter,
        resetFilters
      }
}