import api from './api'

export default {
    getAllMonsters () {
        return api().get('monsters/')
    },

    getMonsters(page, perPage, sortField, sortOrder, searchText, cr) {
        let sortPrefix = '-'
        if(sortOrder != 'desc') sortPrefix = ''
        let ordering = sortPrefix + sortField

        let params = {
            page: page,
            limit: perPage,
            ordering: ordering,
            search: searchText,
            challenge_rating: cr
        }
        return api().get('monsters/', {params: params})
    },

    getMonstersSearch(searchText){
        return this.getMonsters(1, 10, null, null, searchText, null)
    },

    getMonster(slug) {
        return api().get('monsters/' + slug)
    }
}
