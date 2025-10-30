import { View } from 'react-native';
import React from 'react';
import {
    G,
    Line,
    Path,
    Polygon,
    Rect,
    Svg,
    SvgCss,
    SvgXml,
    Text,
} from 'react-native-svg';
import { colors } from '../../../config/Constants1';

const Moonsvgchart = ({ data }) => {

    console.log("jikiio", data)

    return (
        <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>
            {data && <Svg width="350" height="330">
                <G rotation="0" origin="100, 50">
                    <Path d="M10 10L175 10L92.5 87.5L10 10" fill="none" stroke="orange" />
                    <Path d="M175 10L340 10L257.5 87.5L175 10" fill="none" stroke="orange" />
                    <Path d="M92.5 87.5L10 165L10 10" fill="none" stroke="orange" />
                    <Path
                        d="M92.5 87.5L175 165L257.5 87.5L175 10"
                        fill="none"
                        stroke="orange"
                    />
                    <Path d="M257.5 87.5L340 165L340 10" fill="none" stroke="orange" />
                    <Path
                        d="M92.5,87.5L175,165L92.5,242.5L10,165"
                        fill="none"
                        stroke="orange"
                    />
                    <Path
                        d="M257.5,87.5L340,165L257.5,242.5L175,165"
                        fill="none"
                        stroke="orange"
                    />
                    <Path d="M92.5,242.5L10,320L10,165" fill="none" stroke="orange" />
                    <Path
                        d="M175,165L257.5,242.5L175,320L92.5,242.5"
                        fill="none"
                        stroke="orange"
                    />
                    <Path d="M92.5,242.5L175,320L10,320" fill="none" stroke="orange" />
                    <Path d="M92.5,242.5L175,320L10,320" fill="none" stroke="orange" />
                    <Path d="M257.5,242.5L340,320L175,320" fill="none" stroke="orange" />
                    <Path d="M340,165L340,320L257.5,242.5" fill="none" stroke="orange" />
                    {/* First trangle */}

                    <G x="-82" y="-210">
                        <Text color="black" fill="black" fontSize="12" x="253" y="350">
                            {data?.transitMoonChart[0]?.rashiIndex}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="240" y="325">
                            {data?.transitMoonChart[0]?.rashi}
                        </Text>
                        <Text color="black" fill={"red"} fontWeight={"500"} fontSize="12" x="230.25" y="295.1">
                            {data?.transitMoonChart[0]?.planets[0]?.name}
                        </Text>
                        <Text color="black" fill={"green"} fontWeight={"500"} fontSize="12" x="230.25" y="277.1">
                            {data?.transitMoonChart[0]?.planets[1]?.name}
                        </Text>
                        <Text color="black" fill={colors.background_theme2} fontWeight={"500"} fontSize="12" x="230.25" y="260.1">
                            {data?.transitMoonChart[0]?.planets[2]?.name}
                        </Text>

                        <Text color="black" fill="black" fontSize="12" x="260.25" y="295.1">
                            {data?.transitMoonChart[0]?.planets[0]?.degree?.deg}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="260.25" y="277.1">
                            {data?.transitMoonChart[0]?.planets[1]?.degree?.deg}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="260.25" y="260.1">
                            {data?.transitMoonChart[0]?.planets[2]?.degree?.deg}
                        </Text>




                    </G>

                    {/* second trangle */}

                    <G x="-165" y="-235">
                        <Text fill="black" fontSize="12" x="253.25" y="310.1">
                            {data?.transitMoonChart[1]?.rashiIndex}
                        </Text>

                        <Text color="black" fill={"orange"} fontWeight={"500"} fontSize="12" x="230.25" y="290.1">
                            {data?.transitMoonChart[1]?.planets[0]?.name}
                        </Text>
                        <Text color="black" fill={"blue"} fontWeight={"500"} fontSize="12" x="230.25" y="275.1">
                            {data?.transitMoonChart[1]?.planets[1]?.name}
                        </Text>
                        <Text color="black" fill={"green"} fontWeight={"500"} fontSize="12" x="230.25" y="260.1">
                            {data?.transitMoonChart[1]?.planets[2]?.name}
                        </Text>

                        <Text color="black" fill="black" fontSize="12" x="260.25" y="290.1">
                            {data?.transitMoonChart[1]?.planets[0]?.degree?.deg}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="260.25" y="275.1">
                            {data?.transitMoonChart[1]?.planets[1]?.degree?.deg}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="260.25" y="260.1">
                            {data?.transitMoonChart[1]?.planets[2]?.degree?.deg}
                        </Text>


                    </G>

                    {/* third trangle */}

                    <G x="-235" y="-210">
                        <Text fill="black" fontSize="12" x="310.25" y="299.1">
                            {data?.transitMoonChart[2]?.rashiIndex}
                        </Text>

                        <Text color="black" fill={"orange"} fontWeight={"500"} fontSize="12" x="249.25" y="290.1">
                            {data?.transitMoonChart[2]?.planets[0]?.name}
                        </Text>
                        <Text color="black" fill={"red"} fontWeight={"500"} fontSize="12" x="249.25" y="310.1">
                            {data?.transitMoonChart[2]?.planets[1]?.name}
                        </Text>
                        <Text color="black" fill={"green"} fontWeight={"500"} fontSize="12" x="249.25" y="330.1">
                            {data?.transitMoonChart[2]?.planets[2]?.name}
                        </Text>

                        <Text color="black" fill="black" fontSize="12" x="275.25" y="280.1">
                            {data?.transitMoonChart[2]?.planets[0]?.degree?.deg}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="275.25" y="300.1">
                            {data?.transitMoonChart[2]?.planets[1]?.degree?.deg}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="275.25" y="320.1">
                            {data?.transitMoonChart[2]?.planets[2]?.degree?.deg}
                        </Text>


                    </G>

                    {/* fourth trangle */}

                    <G x="-165" y="-125">
                        <Text fill="black" fontSize="12" x="310.25" y="292.1">
                            {data?.transitMoonChart[3]?.rashiIndex}
                        </Text>

                        <Text color="black" fill={"blue"} fontWeight={"500"} fontSize="12" x="220.25" y="270.1">
                            {data?.transitMoonChart[3]?.planets[0]?.name}
                        </Text>
                        <Text color="black" fill={"green"} fontWeight={"500"} fontSize="12" x="220.25" y="290.1">
                            {data?.transitMoonChart[3]?.planets[1]?.name}
                        </Text>
                        <Text color="black" fill={"red"} fontWeight={"500"} fontSize="12" x="220.25" y="310.1">
                            {data?.transitMoonChart[3]?.planets[2]?.name}
                        </Text>

                        <Text color="black" fill="black" fontSize="12" x="250.25" y="270.1">
                            {data?.transitMoonChart[3]?.planets[0]?.degree?.deg}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="250.25" y="290.1">
                            {data?.transitMoonChart[3]?.planets[1]?.degree?.deg}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="250.25" y="310.1">
                            {data?.transitMoonChart[3]?.planets[2]?.degree?.deg}
                        </Text>

                    </G>

                    {/* fifth trangle */}

                    <G x="-235" y="-70">
                        <Text fill="black" fontSize="12" x="305.25" y="315.1">
                            {data?.transitMoonChart[4]?.rashiIndex}
                        </Text>

                        <Text color="black" fill={"blue"} fontWeight={"500"} fontSize="12" x="250.25" y="290.1">
                            {data?.transitMoonChart[4]?.planets[0]?.name}
                        </Text>
                        <Text color="black" fill={"green"} fontWeight={"500"} fontSize="12" x="250.25" y="310.1">
                            {data?.transitMoonChart[4]?.planets[1]?.name}
                        </Text>
                        <Text color="black" fill={"red"} fontWeight={"500"} fontSize="12" x="250.25" y="330.1">
                            {data?.transitMoonChart[4]?.planets[2]?.name}
                        </Text>

                        <Text color="black" fill="black" fontSize="12" x="275.25" y="290.1">
                            {data?.transitMoonChart[4]?.planets[0]?.degree?.deg}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="275.25" y="310.1">
                            {data?.transitMoonChart[4]?.planets[1]?.degree?.deg}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="275.25" y="330.1">
                            {data?.transitMoonChart[4]?.planets[2]?.degree?.deg}
                        </Text>

                    </G>

                    {/* sixth trangle */}
                    <G x="-165">
                        <Text fill="black" fontSize="12" x="252.25" y="261.1">
                            {data?.transitMoonChart[5]?.rashiIndex}
                        </Text>

                        <Text color="black" fill={"pink"} fontWeight={"500"} fontSize="12" x="230.25" y="280.1">
                            {data?.transitMoonChart[5]?.planets[0]?.name}
                        </Text>
                        <Text color="black" fill={"green"} fontWeight={"500"} fontSize="12" x="230.25" y="295.1">
                            {data?.transitMoonChart[5]?.planets[1]?.name}
                        </Text>
                        <Text color="black" fill={"orange"} fontWeight={"500"} fontSize="12" x="230.25" y="310.1">
                            {data?.transitMoonChart[5]?.planets[2]?.name}
                        </Text>

                        <Text color="black" fill="black" fontSize="12" x="260.25" y="280.1">
                            {data?.transitMoonChart[5]?.planets[0]?.degree?.deg}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="260.25" y="295.1">
                            {data?.transitMoonChart[5]?.planets[1]?.degree?.deg}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="260.25" y="310.1">
                            {data?.transitMoonChart[5]?.planets[2]?.degree?.deg}
                        </Text>

                    </G>

                    {/* seventh trangle */}
                    <G x="-82" y="-50">
                        <Text fill="black" fontSize="12" x="255.25" y="235.1">
                            {data?.transitMoonChart[6]?.rashiIndex}
                        </Text>

                        <Text color="black" fill={"blue"} fontWeight={"500"} fontSize="12" x="220.25" y="270.1">
                            {data?.transitMoonChart[6]?.planets[0]?.name}
                        </Text>
                        <Text color="black" fill={colors.background_theme2} fontWeight={"500"} fontSize="12" x="220.25" y="290.1">
                            {data?.transitMoonChart[6]?.planets[1]?.name}
                        </Text>
                        <Text color="black" fill={colors.mybackground} fontWeight={"500"} fontSize="12" x="220.25" y="310.1">
                            {data?.transitMoonChart[6]?.planets[2]?.name}
                        </Text>

                        <Text color="black" fill="black" fontSize="12" x="250.25" y="270.1">
                            {data?.transitMoonChart[6]?.planets[0]?.degree?.deg}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="250.25" y="290.1">
                            {data?.transitMoonChart[6]?.planets[1]?.degree?.deg}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="250.25" y="310.1">
                            {data?.transitMoonChart[6]?.planets[2]?.degree?.deg}
                        </Text>

                    </G>

                    {/* eigth trangle */}
                    <G>
                        <Text fill="black" fontSize="12" x="255.25" y="261.1">
                            {data?.transitMoonChart[7]?.rashiIndex}
                        </Text>

                        <Text color="black" fill={"red"} fontWeight={"500"} fontSize="12" x="235.25" y="285.1">
                            {data?.transitMoonChart[7]?.planets[0]?.name}
                        </Text>
                        <Text color="black" fill={"yellow"} fontWeight={"500"} fontSize="12" x="235.25" y="300.1">
                            {data?.transitMoonChart[7]?.planets[1]?.name}
                        </Text>
                        <Text color="black" fill={"orange"} fontWeight={"500"} fontSize="12" x="235.25" y="315.1">
                            {data?.transitMoonChart[7]?.planets[2]?.name}
                        </Text>

                        <Text color="black" fill="black" fontSize="12" x="265.25" y="285.1">
                            {data?.transitMoonChart[7]?.planets[0]?.degree?.deg}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="265.25" y="300.1">
                            {data?.transitMoonChart[7]?.planets[1]?.degree?.deg}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="265.25" y="315.1">
                            {data?.transitMoonChart[7]?.planets[2]?.degree?.deg}
                        </Text>

                    </G>

                    {/* ninth trangle */}
                    <G x="70" y="-60">
                        <Text fill="black" fontSize="12" x="200.25" y="305.1">
                            {data?.transitMoonChart[8]?.rashiIndex}
                        </Text>
                        <Text color="black" fill={"orange"} fontWeight={"500"} fontSize="12" x="215.25" y="290.1">
                            {data?.transitMoonChart[8]?.planets[0]?.name}
                        </Text>
                        <Text color="black" fill={"green"} fontWeight={"500"} fontSize="12" x="215.25" y="305.1">
                            {data?.transitMoonChart[8]?.planets[1]?.name}
                        </Text>
                        <Text color="black" fill={"red"} fontWeight={"500"} fontSize="12" x="215.25" y="320.1">
                            {data?.transitMoonChart[8]?.planets[2]?.name}
                        </Text>

                        <Text color="black" fill="black" fontSize="12" x="245.25" y="290.1">
                            {data?.transitMoonChart[8]?.planets[0]?.degree?.deg}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="245.25" y="305.1">
                            {data?.transitMoonChart[8]?.planets[1]?.degree?.deg}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="245.25" y="320.1">
                            {data?.transitMoonChart[8]?.planets[2]?.degree?.deg}
                        </Text>

                    </G>

                    {/* tenth trangle */}
                    <G x="0" y="-125">
                        <Text fill="black" fontSize="12" x="190.25" y="292.1">
                            {data?.transitMoonChart[9]?.rashiIndex}
                        </Text>

                        <Text color="black" fill={"blue"} fontWeight={"500"} fontSize="12" x="225.25" y="260.1">
                            {data?.transitMoonChart[9]?.planets[0]?.name}
                        </Text>
                        <Text color="black" fill={"green"} fontWeight={"500"} fontSize="12" x="225.25" y="280.1">
                            {data?.transitMoonChart[9]?.planets[1]?.name}
                        </Text>
                        <Text color="black" fill={"red"} fontWeight={"500"} fontSize="12" x="225.25" y="300.1">
                            {data?.transitMoonChart[9]?.planets[2]?.name}
                        </Text>

                        <Text color="black" fill="black" fontSize="12" x="260.25" y="260.1">
                            {data?.transitMoonChart[9]?.planets[0]?.degree?.deg}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="260.25" y="280.1">
                            {data?.transitMoonChart[9]?.planets[1]?.degree?.deg}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="260.25" y="300.1">
                            {data?.transitMoonChart[9]?.planets[2]?.degree?.deg}
                        </Text>

                    </G>

                    {/* elevanth trangle */}
                    <G x="70" y="-215">
                        <Text fill="black" fontSize="12" x="200.25" y="305.1">
                            {data?.transitMoonChart[10]?.rashiIndex}
                        </Text>

                        <Text color="black" fill={"blue"} fontWeight={"500"} fontSize="12" x="220.25" y="285.1">
                            {data?.transitMoonChart[10]?.planets[0]?.name}
                        </Text>
                        <Text color="black" fill={"pink"} fontWeight={"500"} fontSize="12" x="220.25" y="300.1">
                            {data?.transitMoonChart[10]?.planets[1]?.name}
                        </Text>
                        <Text color="black" fill={"red"} fontWeight={"500"} fontSize="12" x="220.25" y="315.1">
                            {data?.transitMoonChart[10]?.planets[2]?.name}
                        </Text>

                        <Text color="black" fill="black" fontSize="12" x="248.25" y="285.1">
                            {data?.transitMoonChart[10]?.planets[0]?.degree?.deg}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="248.25" y="300.1">
                            {data?.transitMoonChart[10]?.planets[1]?.degree?.deg}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="248.25" y="315.1">
                            {data?.transitMoonChart[10]?.planets[2]?.degree?.deg}
                        </Text>

                    </G>

                    {/* twelth trangle */}

                    <G x="5" y="-235">
                        <Text fill="black" fontSize="12" x="245.25" y="310.1">
                            {data?.transitMoonChart[11]?.rashiIndex}
                        </Text>

                        <Text color="black" fill={"green"} fontWeight={"500"} fontSize="12" x="230.25" y="290.1">
                            {data?.transitMoonChart[11]?.planets[0]?.name}
                        </Text>
                        <Text color="black" fill={"darkgray"} fontWeight={"500"} fontSize="12" x="230.25" y="275.1">
                            {data?.transitMoonChart[11]?.planets[1]?.name}
                        </Text>
                        <Text color="black" fill={"red"} fontWeight={"500"} fontSize="12" x="230.25" y="260.1">
                            {data?.transitMoonChart[11]?.planets[2]?.name}
                        </Text>

                        <Text color="black" fill="black" fontSize="12" x="258.25" y="290.1">
                            {data?.transitMoonChart[11]?.planets[0]?.degree?.deg}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="258.25" y="275.1">
                            {data?.transitMoonChart[11]?.planets[1]?.degree?.deg}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="258.25" y="260.1">
                            {data?.transitMoonChart[11]?.planets[2]?.degree?.deg}
                        </Text>


                    </G>
                    <Path d="M340,165L340,320L257.5,242.5" fill="none" stroke="orange" />
                </G>
            </Svg>}
        </View>
    );
};

export default Moonsvgchart;
