import { useState } from "react";

export function usePagination(data, pageItems) {
    const [actualPage, setActualPage] = useState(1)
    const maxPages = Math.ceil(data.length / pageItems)

    function actualData() {
        const start = (actualPage - 1) * pageItems
        const end = start + pageItems
        return data.slice(start, end)
    }

    function next() {
        setActualPage(actualPage => Math.min(actualPage + 1, maxPages))
    }
    function previous() {
        setActualPage(actualPage => Math.max(actualPage - 1, 1))
    }
    function jump(page) {
        const pageNumber = Math.max(1, page)
        setActualPage(actualPage => Math.min(pageNumber, maxPages))
    }
    return { previous, next, jump, actualData, actualPage, maxPages }
}