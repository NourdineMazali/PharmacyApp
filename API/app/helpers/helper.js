//Pagination Helper
exports.paginate = (page, perPage, count, url) => {
    let from = page > 1 ? (page*perPage) - perPage : 1;
    let _previous = page === 1 ? 1: parseInt(page) - 1;
    return {
        total: count,
        per_page: perPage,
        current_page: page,
        last_page: Math.ceil(count / perPage),
        next_page_url: `${url}?page=${ Math.ceil(count / perPage) !== parseInt(page) ?
            parseInt( Math.ceil(count / perPage)) + 1  :
            Math.ceil(count / perPage)}`,
        prev_page_url: `${url}?page=${_previous}`,
        from: from,
        to: (page*perPage)
    }
};

//Order Helper
exports.order = (query, is_object)=> {
    let orderBy = query || 'createdAt|desc';
    orderBy =  orderBy.split('|');

    return is_object ? {[orderBy[0]]: orderBy[1]} : orderBy;

};