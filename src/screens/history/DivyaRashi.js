import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useTransition } from 'react'
import { connect } from 'react-redux'
import * as HistoryActions from '../../redux/actions/HistoryActions'
import { Colors, Sizes, Fonts } from '../../assets/style'
import MyHeader from '../../components/MyHeader'
import MyStatusBar from '../../components/MyStatusbar'
import moment from 'moment'
import { showNumber } from '../../utils/services'
import { colors } from '../../config/Constants1'
import * as customerActions from '../../redux/actions/CustomerActions'
import { FontsStyle, normalize } from '../../config/constants'
import { useTranslation } from 'react-i18next'


const DivyaRashi = ({ dispatch, navigation, divyaHistory }) => {

    useEffect(() => {
        dispatch(customerActions.getDivyaHistory())
    }, [dispatch])

    console.log('divyaHistory', divyaHistory);

    const { t } = useTranslation();

    return (
        <View
            style={{ flex: 1, backgroundColor: Colors.white }}
        >
            <MyStatusBar backgroundColor={Colors.primaryLight} barStyle={'light-content'} />
            <MyHeader title={'Divya Rashi History'} navigation={navigation} />
            <FlatList
                ListHeaderComponent={<>
                    {walletHistoryInfo()}
                </>}
                contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2, paddingHorizontal: Sizes.fixPadding * 1.5 }}
            />
        </View>
    )



    function walletHistoryInfo() {
        const _listEmtpy = () => {
            return (
                <View style={{ alignSelf: 'center', paddingVertical: Sizes.fixPadding * 10 }}>
                    <Text style={{ color: 'black', ...FontsStyle.fontfamily }}>{t("No History")}</Text>
                </View>
            )
        }

        const renderItem = ({ item, index }) => {
            return (
                <View style={styles.itemContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ ...styles.text, fontWeight: 'bold', color: 'black' }}>
                            {item?.status == 'Add' && item?.type != 'vr'
                                ? t('congratulations_divya_rashi')
                                : item?.status == 'Add'
                                    ? t('add_divya_rashi', { price: item?.price, name: item?.name })
                                    : t('deduct_divya_rashi', { price: item?.price, name: item?.name })}
                        </Text>

                        <Text style={{ color: item?.status == 'Add' ? 'green' : 'red', fontSize: 18 }}>{`${item?.status == 'Add' ? '+' : '-'}${item?.price}`}</Text>
                    </View>
                    <Text style={styles.text}>{t("Date")}: {moment(item?.createdAt).format('DD/MM/YYYY')}</Text>
                    <Text style={styles.text}>{t("Time")}: {moment(item?.createdAt).format('hh:mm A')}</Text>


                </View>
            )
        }
        return (

            <View>
                <FlatList
                    data={divyaHistory}
                    renderItem={renderItem}
                    ListEmptyComponent={_listEmtpy}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    divyaHistory: state.customer.divyaHistory
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(DivyaRashi)

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: Colors.grayLight,
        marginBottom: Sizes.fixPadding * 2,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
    },
    invoiceId: {
        backgroundColor: Colors.white,
        paddingHorizontal: Sizes.fixPadding * 0.5,
        paddingVertical: Sizes.fixPadding * 0.3,
        borderRadius: 1000,
        elevation: 3,
        shadowColor: Colors.blackLight,
        alignSelf: 'flex-start',
        marginBottom: Sizes.fixPadding * 0.8
    },
    text: {
        ...FontsStyle.fontfamily,
        marginBottom: Sizes.fixPadding * 0.3,
        fontSize: normalize(10),
        color: 'black'
    },
    amountContainer: {
        position: 'absolute',
        top: Sizes.fixPadding,
        right: Sizes.fixPadding
    }
})