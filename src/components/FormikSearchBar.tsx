import React, {useState} from 'react'
import {Dimensions, View} from 'react-native';
import {Formik} from 'formik';
import FormikTextInput from './common/FormikTextInput';
import theme from '../theme';
import {Id, TokenListEntry} from '../types';
import TokenList from './TokenList';
import {getTokensByName, getTokensByID, transformUNIQuotesToTokenListEntry, getDailyQuotesByID} from '../utils';
import {RootStateOrAny, useSelector} from 'react-redux';
import CurrentPriceHeader from './CurrentPriceHeader';

const {height} = Dimensions.get('window')

const FormikSearchBar:React.FC = () => {
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [uniTokens,setUniTokens] = useState<TokenListEntry[]>([])
    const listPlaceholder = 'Please input a ticker in the searchbar...'
    const ethPriceInUSD = useSelector((state:RootStateOrAny) => state.ethPrice.price)
    const dailyBlockNumber = useSelector((state:RootStateOrAny) => state.dailyBlock.blockNumber)
    console.log(`Daily block from the state: ${dailyBlockNumber}`)

    return(
        <View style={{flex: 1, height: height}}>
            <Formik initialValues={{filterValue: ''}} onSubmit={() => {}}>
                {({handleSubmit}) =>
                    <View style={{flex: 1}}>
                        <CurrentPriceHeader/>
                        <FormikTextInput name='filterValue'
                                         placeholder='Input token ticker here'
                                         addOnChange={async (text) => {
                                            if (text === '') {
                                                setUniTokens([])
                                            } else {
                                                setIsLoading(true)
                                                const newTokenData = await getTokensByName(text.toUpperCase()).then(result => result)
                                                const tokenIds: Id[] = newTokenData.tokens.map(token => token.id)
                                                // console.log('Token ids:')
                                                // console.log(tokenIds)
                                                const newDailyTokenData = await getDailyQuotesByID(tokenIds, dailyBlockNumber).then(result => result)
                                                // console.log('New token data:')
                                                // console.log(newDailyTokenData)
                                                const formattedTokens = transformUNIQuotesToTokenListEntry(newTokenData,newDailyTokenData,ethPriceInUSD)
                                                setUniTokens(formattedTokens)
                                                setIsLoading(false)
                                            }
                                         }}
                        />
                        <TokenList tokens={uniTokens} placeholder={listPlaceholder} isLoading={isLoading}/>
                    </View>
                }
            </Formik>
        </View>
    )
}

export default FormikSearchBar
