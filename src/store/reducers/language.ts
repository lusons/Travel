import i18n from 'i18next'

export interface LanguageState {
    language: 'en' | 'zh';
    languageList: {name: string, code: string}[]
}

const defaultState: LanguageState = {
    language: 'zh',
    languageList: [
        {name: 'English', code: 'en'},
        {name: '中文', code: 'zh'},
    ]
}
export default function languageReducer(preState=defaultState, action){
    const { type, payLoad } = action    
    switch (type) {
        case 'change':            
            i18n.changeLanguage(payLoad)
            return {...preState, language: payLoad}
    
        default:
            return preState;
    }
}