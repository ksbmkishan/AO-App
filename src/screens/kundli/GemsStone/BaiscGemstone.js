import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT } from '../../../config/Screen'
import { Fonts } from '../../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import { t } from 'i18next'

const BaiscGemstone = ({ basicDetails, dispatch, Gemstonedata, Mynum2 }) => {

    const { i18n } = useTranslation();

    const apiStone = Mynum2?.numerlogy?.details?.stone?.toLowerCase() || '';

    const gemstoneAliases = {
        ruby: ["ruby", "manik", "manikya"],
        pearl: ["pearl", "moti"],
        yellow_sapphire: ["yellow sapphire", "pukhraj"],
        hessonite: ["hessonite", "gomed", "gomedak"],
        emerald: ["emerald", "panna"],
        diamond: ["diamond", "heera", "hiraka"],
        cats_eye: ["cat’s eye", "lehsunia", "vaidurya"],
        blue_sapphire: ["blue sapphire", "neelam"],
        red_coral: ["red coral", "moonga", "munga"]
    };

    const gemstoneDescriptions = {
        ruby: "Ruled by the powerful Sun, Ruby is a gemstone of confidence, strength, and leadership. It boosts self-esteem and helps the wearer gain recognition and respect in society. This stone is especially suited for those in politics, administration, or leadership roles. Ruby energizes the body and mind, clears self-doubt, and fights depression. Spiritually, it aligns you with your life purpose and strengthens your willpower. It brings clarity of thought and helps you take decisive action. Ruby also supports heart health and improves blood circulation. It is believed to protect the wearer from enemies and psychic attacks.",

        pearl: "Pearl, ruled by the Moon, is the gemstone of peace, purity, and emotional healing. It helps calm turbulent emotions, reduce anger, and promote mental clarity. Ideal for those who are sensitive, moody, or suffer from anxiety, Pearl nurtures a sense of calm and balance. It promotes healthy relationships, maternal instincts, and emotional intelligence. Spiritually, it helps one connect with divine feminine energy and enhances intuitive powers. Pearl is beneficial for sleep disorders, hormonal imbalance, and skin issues. It brings modesty, honesty, and integrity into one’s life. Traditionally associated with prosperity and long life, it is often worn for blessings and harmony.",

        yellow_sapphire: "Yellow Sapphire, ruled by Jupiter, is known for bringing wisdom, wealth, and spiritual enlightenment. It is ideal for teachers, philosophers, advisors, or those in finance and law. This stone enhances intellect, decision-making, and moral integrity. It attracts fortune, stable relationships, and overall positivity. Yellow Sapphire helps clear confusion, boosts confidence, and promotes generosity. It strengthens the liver, improves digestion, and boosts immunity. Spiritually, it expands one’s aura, attracts divine blessings, and enhances meditation and prayer practices. The stone is also said to protect marriages and bring peace to family life. It is one of the most auspicious gems in Vedic astrology.",

        hessonite: "Hessonite, also known as Gomed, is governed by Rahu and is a stone of mystery, transformation, and breakthrough. It is especially effective for those facing obstacles, delays, legal problems, or mental unrest. This gem removes fears, phobias, and negative energies that block progress. It helps in achieving sudden success, especially in fields like politics, media, IT, and foreign dealings. Hessonite enhances concentration and mental clarity while reducing anxiety and confusion. Spiritually, it helps deal with karmic debts and protects from evil spirits or psychic attacks. It’s excellent for those going through Rahu dasha or malefic influence. The stone is also believed to improve metabolism and relieve skin problems.",

        emerald: "Emerald, ruled by Mercury, is the gemstone of intellect, communication, and business acumen. It enhances memory, clarity of speech, and logical thinking, making it ideal for students, speakers, and professionals. Emerald promotes mental agility and reduces stress, nervousness, or speech-related issues. It strengthens relationships by encouraging honesty, understanding, and emotional balance. Spiritually, Emerald opens the heart chakra, encourages compassion, and helps in healing emotional wounds. It also enhances creativity and inspires new ideas. This gemstone is said to offer protection during travel and prevent financial loss. Physically, it supports brain and nervous system function and promotes good eyesight.",

        diamond: "Diamond, ruled by Venus, symbolizes luxury, beauty, love, and attraction. It amplifies one’s charm, sensuality, and artistic talents. Perfect for creative individuals, performers, and lovers, Diamond supports romantic relationships and emotional bonding. It brings clarity, focus, and balance in decision-making. Spiritually, it helps raise vibrations and remove inner negativity, enhancing divine connection. Diamond also strengthens the immune system, boosts energy levels, and calms anxiety. It’s said to protect from evil influences, jealousy, and emotional instability. In astrology, Diamond is recommended for those seeking pleasure, success, and a harmonious personal life. It also helps to overcome Venus-related doshas in one’s chart.",

        cats_eye: "Cat’s Eye, also called Lehsunia, is ruled by Ketu and known for its mystical, protective, and karmic properties. It shields the wearer from black magic, accidents, enemies, and hidden dangers. Cat’s Eye supports spiritual detachment and intuitive development. It’s ideal for those on a spiritual path or involved in research, occult studies, or healing practices. The stone helps one break free from past karmic patterns and enhances decision-making ability. It brings sudden wealth or success, especially during challenging planetary transits. Cat’s Eye improves willpower, focus, and resilience during setbacks. Physically, it benefits the nervous system and supports recovery from long-term illnesses.",

        blue_sapphire: "Blue Sapphire, governed by Saturn, is a high-energy gemstone that brings discipline, structure, and rapid success. It is suited for those who are hardworking, focused, and seeking transformation. The stone helps overcome financial problems, job delays, and mental blockages. It increases determination, clarity, and emotional stability. Blue Sapphire can bring sudden gains, but must be worn cautiously after testing. It strengthens bones, enhances digestion, and calms the nervous system. Spiritually, it grounds the wearer while accelerating spiritual progress. The stone also offers protection from negative energies, bad luck, and fear. It is especially effective during Sade Sati or Saturn dasha.",

        red_coral: "Red Coral, ruled by Mars, symbolizes energy, courage, and determination. It empowers the wearer to take bold actions and overcome fear, laziness, or indecision. Ideal for soldiers, athletes, entrepreneurs, and anyone needing physical and mental strength, Red Coral boosts stamina and willpower. It improves blood circulation, strengthens muscles, and helps with physical recovery. The stone is excellent for controlling anger, anxiety, and impulsive behavior. Spiritually, it activates the root chakra, grounds energy, and protects from evil influences or enemies. It is highly effective during Mars dasha or if Mars is weak in the birth chart. Red Coral is also believed to bring marital harmony and self-confidence."
    };


    // Match alias
    let matchedDescription = null;
    for (const key in gemstoneAliases) {
        if (gemstoneAliases[key].some(alias => apiStone.includes(alias))) {
            matchedDescription = gemstoneDescriptions[key];
            break;
        }
    }

    useEffect(() => {
        dispatch(KundliActions.getKundliBirthDetails({ lang: t('lang') }))
    }, [dispatch]);

    useEffect(() => {
        dispatch(KundliActions.getMyNumerology({
            lang: t('lang'),
            gender: basicDetails?.gender,
            name: basicDetails?.name,
            place: basicDetails?.place
        }))
    }, [dispatch]);

    return (
        <View style={{ padding: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9' }}>
            <View style={{ alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.02, gap: 10 }}>
                <Text style={{ ...Fonts.PoppinsBold, fontSize: responsiveFontSize(1.9), textAlign: "justify" }}>
                    Lucky Stone
                </Text>
                <Text style={{ ...Fonts.PoppinsBold, fontSize: responsiveFontSize(1.9), textAlign: "justify" }}>
                    Lucky Stone  :  {Mynum2?.numerlogy?.details?.stone}
                </Text>
            </View>

            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.6), textAlign: "justify" }}>
                {Gemstonedata?.resp}
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
    )
}

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    Gemstonedata: state.kundli.Gemstonedata,
    Mynum2: state.kundli.Mynum2,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(BaiscGemstone);

const styles = StyleSheet.create({
    textstyle: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.5)
    }
});