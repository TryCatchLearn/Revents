import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../stores/store";
import { CollectionOptions } from "../types";
import { setCollectionOptions } from "../firebase/firestoreSlice";

export const useEventFilters = () => {
  const dispatch = useAppDispatch();
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

  const resetFilters = () => {
    dispatch(setCollectionOptions({path: 'events', options: collectionOptions}))
    setFilter(initialFilterState)
  };

  const collectionOptions: CollectionOptions = useMemo(() => {
    return {
      queries: [{
        attribute: 'date', operator: '>=',
        value: new Date().toISOString(), isDate: true
      }],
      sort: { attribute: 'date', direction: 'asc' },
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