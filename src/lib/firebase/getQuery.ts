import { collection, orderBy, query, Query, Timestamp, where } from "firebase/firestore";
import { CollectionOptions } from "../types";
import { db } from "./firebase";

export const getQuery = (path: string, options?: CollectionOptions): Query => {
    let q = collection(db, path) as Query;

    if (options?.queries) {
        options.queries.forEach(({attribute, operator, value, isDate}) => {
            if (isDate) value = Timestamp.fromDate(new Date(value as string));
            q = query(q, where(attribute, operator, value));
        });
    }

    if (options?.sort) {
        const {attribute, direction} = options.sort;
        q = query(q, orderBy(attribute, direction));
    }

    return q;
}