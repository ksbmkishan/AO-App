import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT } from '../../../config/Screen'
import { Fonts } from '../../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';

const HealthStone = ({ basicDetails, dispatch, HealthStonedata, Mynum2 }) => {
    const { i18n } = useTranslation();

    // Substone alias mapping
    const substoneAliases = {
        amethyst: ["amethyst", "katela"],
        lapis_lazuli: ["lapis lazuli", "lajward", "neeli"],
        turquoise: ["turquoise", "firoza"],
        garnet: ["garnet", "tamra", "raktamani"],
        peridot: ["peridot", "zabarjad"],
        onyx: ["onyx", "sulemani"],
        moonstone: ["moonstone", "chandramani"],
        citrine: ["citrine", "sunela"],
    };

    // Substone descriptions
    const substoneDescriptions = {
        amethyst: "Amethyst is a powerful stone of mental peace, clarity, and spiritual protection. Known for balancing the crown chakra, it helps reduce stress, anxiety, and insomnia. Ideal for those struggling with overthinking, addictions, or emotional imbalances. It enhances focus, intuition, and inner peace. Amethyst promotes sobriety and calm, making it perfect for meditation and spiritual growth. It also supports immunity and helps relieve headaches. It protects the wearer from negative energy and psychic attacks. Amethyst is recommended for those seeking tranquility, clarity, and protection in turbulent times.",

        lapis_lazuli: "Lapis Lazuli is a gemstone of wisdom, truth, and inner vision. It helps activate the throat and third eye chakras, improving communication and intuition. Ideal for counselors, therapists, or students, it aids intellectual abilities. It boosts confidence, mental clarity, and emotional stability. Spiritually, it deepens meditation and enhances connection to higher realms. Lapis supports the immune system and helps reduce blood pressure. It protects against psychic attacks and promotes harmony in relationships. A great stone for those dealing with stress, confusion, or anxiety.",

        turquoise: "Turquoise is a healing stone known for protection, luck, and emotional balance. It supports the immune system and detoxifies the body. This stone calms mood swings and balances emotions, especially for those under stress or emotional trauma. It fosters honest communication and strengthens friendships. Spiritually, it connects the heart and throat chakras, enabling soulful expression. It also enhances intuition and spiritual grounding. Turquoise is said to bring prosperity and shield the wearer from harmful energies.",

        garnet: "Garnet is the stone of vitality, passion, and health. It energizes the body, improves circulation, and supports the heart. Ideal for those lacking motivation, Garnet stimulates courage and drive. It enhances sexuality, passion, and love, while also helping in purification and detoxification. Emotionally, it helps overcome depression and boosts self-confidence. Spiritually, it awakens kundalini energy and brings grounding. Garnet is perfect for those facing health fatigue or emotional dullness.",

        peridot: "Peridot is a stone of positivity, healing, and cleansing. It aids in digestion, liver health, and toxin removal. It helps release guilt, anger, and jealousy, bringing emotional renewal. Spiritually, it aligns the heart chakra, encouraging compassion and self-love. Peridot promotes restful sleep, sharp thinking, and inner strength. It is also a powerful manifesting stone, bringing abundance and prosperity. A great choice for those needing emotional healing and physical cleansing.",

        onyx: "Onyx is a grounding stone that provides strength, stability, and protection. It absorbs negative energy, helping those who face emotional stress or anxiety. Onyx strengthens self-control, decision-making, and persistence. It helps in healing old emotional wounds and traumas. This stone is ideal during times of grief or transformation. Physically, it supports bone health and improves stamina. Spiritually, it helps maintain focus and discipline in meditation and prayer.",

        moonstone: "Moonstone is a calming and balancing stone, deeply connected to feminine energy and the Moon. It enhances intuition, emotional awareness, and hormonal balance. Moonstone helps reduce stress and emotional reactivity, especially during transitions. It is beneficial for reproductive health and hormonal cycles. Spiritually, it enhances dreams and divine connection. A protective stone for travelers, it encourages inner growth and strength. Ideal for those seeking peace, emotional healing, and spiritual insight.",

        citrine: "Citrine is the stone of abundance, joy, and confidence. It energizes every level of life, especially boosting self-esteem and creativity. Citrine cleanses the chakras and promotes positivity and motivation. It’s excellent for manifesting wealth, success, and personal power. Citrine aids digestion, improves metabolism, and boosts energy. Emotionally, it helps release fears and phobias. Spiritually, it carries solar energy that uplifts and empowers. Ideal for entrepreneurs, artists, and anyone seeking growth."
    };

    const apiStone = Mynum2?.numerlogy?.details?.subStone?.toLowerCase() || '';
    let matchedDescription = null;

    for (const key in substoneAliases) {
        if (substoneAliases[key].some(alias => apiStone.includes(alias))) {
            matchedDescription = substoneDescriptions[key];
            break;
        }
    }
    // useEffect(() => {
    //     const payload = {
    //         lat: basicDetails?.lat,
    //         lon: basicDetails?.lon
    //     };
    //     dispatch(KundliActions.getHealthStone(payload));
    // }, [dispatch]);

    return (
        <View style={{ padding: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9' }}>
            <View style={{ alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.02, gap: 10 }}>
                <Text style={{ ...Fonts.PoppinsBold, fontSize: responsiveFontSize(1.9), textAlign: "justify" }}>
                    Lucky sub - stone: 
                </Text>
                <Text style={{ ...Fonts.PoppinsBold, fontSize: responsiveFontSize(1.9), textAlign: "justify" }}>
                    Health Stone  :  {Mynum2?.numerlogy?.details?.subStone}
                </Text>
            </View>

            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.6), textAlign: "justify" }}>
                {HealthStonedata?.resp}
            </Text>

            {matchedDescription && (
                <Text style={{
                    ...Fonts.black11InterMedium,
                    fontSize: responsiveFontSize(1.6),
                    textAlign: "justify",
                    marginTop: SCREEN_HEIGHT * 0.015
                }}>
                    {matchedDescription}
                </Text>
            )}
        </View>
    );
};

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    HealthStonedata: state.kundli.HealthStonedata,
    Mynum2: state.kundli.Mynum2,

    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(HealthStone);

const styles = StyleSheet.create({
    textstyle: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.5)
    }
});